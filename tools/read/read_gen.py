#!/usr/bin/env python3
"""read_gen.py -- builds a repository's site with reading pages generated from its Markdown.

Adapted from apexSolarKiss/method-ASK@5e3a332164b2973d9eea2337ddeed825ae56ad4d
tools/read/read_gen.py (PRG-023). The renderer, the gates and the page markup
are method-ASK's; what differed by repository moved into tools/read/declared.json:
the identity strings, the chrome's stylesheet, script and wordmark paths, the
site directory (docs/ or the repository root), an authored home page in place
of a generated one, several front doors, document collections, an explicit
output name per entry, a declared default hold for the Markdown under a
directory, and directory exclusions (site_exclude entries ending in /), inside
which the build's --out and --report may land. A link to a directory inside
the site with no index.html, to a Markdown file in the site that is not
rendered, or to a hidden file, opens on GitHub. Hidden files are not copied
into the site, and an authored home page is link-checked like a generated one.

The deployed site is the declared site directory as authored, plus a home page
at its root (index.html: generated from the declaration's home block, or the
authored page it names) and read/: one reading page per declared document,
collection entry and record, one read-only source view per declared source
file, and a documents index, all generated from tools/read/declared.json at
build time. The generated pages are build output. They are never committed.
They are static files: each loads same-site stylesheets, fonts, icons and two
scripts, one of which builds the responsive navigation panel from the page's own
markup. No content is generated or fetched at runtime.

Each front door is authored once, with links to the raw files, so it opens
from a clone. The composed site serves a copy whose links to declared source
files and rendered documents point at their source views and reading pages, and
whose build-only fragments (<template data-read-build>) render. Only those href
values and the fragments' template tags, each with its line where it stands
alone on one, differ from the authored bytes.

    build   python3 tools/read/read_gen.py build --out DIR [--root DIR] [--report FILE]
    check   python3 tools/read/read_gen.py check [--root DIR]
    links   python3 tools/read/read_gen.py links --site DIR [--root DIR]

--root  the source tree: the repository this file sits in by default
--out   where build writes the composed site. It must not exist or must be an
        empty directory, and it may not be the source tree, sit inside .git or
        inside the site directory (except inside a directory the declaration
        excludes from the site), or contain the source tree, judged by where it
        physically lands, every symlink resolved, before anything is staged
--report  after a successful build, a JSON report of pages, link classes,
        headings and the front-door mapping. It may not land inside the site
        directory or .git, and it may not be --out, lie inside it or contain
        it, judged the same way. When --out does not exist yet, build creates
        its missing directories for that comparison, so the volume itself
        decides which spellings name them, and removes them before anything
        is staged

build   renders every page in memory and runs every gate first: the exact
        renderer pin (exit 2 otherwise), a well-formed declaration, a declared
        disposition for every Markdown file under the site directory, each
        collection's directory and the repository root, the document structure
        (exactly one top-level H1, and it comes first), every relative link,
        anchor and image resolving case-exactly, raw HTML inside the image
        allowlist, a declared role for every blockquote, every declared
        structured block fitting its shape, no link or image in a table
        header, each authored front door opening from a clone (outside a
        build-only fragment, every relative link and resource reference
        resolving in the source tree, no root-absolute link, and its source
        links naming exactly the declared source files), each composed front
        door linking each declared source only through its source view and
        closing each link before the next opens, and every reading-page carrier
        matching its declared sha256. It then composes the site, with the front
        doors composed, and the generated pages in a staging directory beside
        --out, verifies every written file byte for byte and runs the link
        check over the staging tree. Only when all of that passes does the
        staging tree become
        --out; otherwise nothing is published and the staging tree is
        removed. It prints the composed tree's digest.
check   build into a temporary directory, print the digest and remove it.
links   the link check on its own, over an already composed site.

Renderer: markdown-it-py 4.2.0 + mdit-py-plugins 0.6.1 + mdurl 0.1.2 (tools/read/requirements.txt).
"""
import argparse
import hashlib
import html
import json
import os
import posixpath
import re
import shutil
import sys
import tempfile
from html.parser import HTMLParser
from urllib.parse import quote, unquote, urlsplit

PIN = (("markdown-it-py", "markdown_it", "4.2.0"), ("mdit-py-plugins", "mdit_py_plugins", "0.6.1"), ("mdurl", "mdurl", "0.1.2"))

try:
    import markdown_it
    import mdit_py_plugins
    import mdurl
    from markdown_it import MarkdownIt
    from mdit_py_plugins.anchors import anchors_plugin
    from mdit_py_plugins.gfm import gfm_plugin
    IMPORT_ERROR = None
except ImportError as e:  # reported by pin_problems()
    IMPORT_ERROR = e

PAGE_FORMAT = "read-page-v2"
HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
IGNORED_FILES = {".DS_Store"}
TOC_MIN_SECTIONS = 4
GATE_PREFIXES = ("UNRESOLVED", "UNSAFE-HTML", "STRUCTURE", "NO-TITLE", "UNSUPPORTED", "UNDECLARED")
ALLOWED_SCHEMES = ("http", "https", "mailto")
RAW_TEXT_MARKERS = ("<!", "<?", "</script")
OUTPUT_NAME = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*\.html$")
OUTPUT_DIR = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
# the declaration's identity strings: the repository's name in the breadcrumb and page titles, and the documents
# index's and source views' copy
IDENTITY_KEYS = ("name", "index_description", "index_lede", "documents_title", "records_intro", "source_note",
                 "source_card")
PASSAGE_ROLES = ("quotation", "callout", "framing", "synthesis")
BLOCK_SHAPES = ("groups-rail", "groups-aligned")

# Raw HTML allowlist. The only raw HTML the declared documents carry is an image tag with a src and an alt, and
# that is all raw HTML may be. RAW_HTML_GRAMMAR is the gate, a byte-level form checked without any HTML parser:
# lowercase <img> tags whose only attributes are double-quoted src and alt, separated by spaces, tabs or newlines,
# and nothing else. RawHtmlScan refuses a repeated attribute and names what a refused piece carries.
RAW_HTML_ALLOWED = {"img": ("src", "alt")}
RAW_IMG_TAG = r'<img(?:[ \t\n]+(?:src|alt)="[^"<>]*")+[ \t\n]*>'
RAW_HTML_GRAMMAR = re.compile(r"[ \t\n]*(?:%s[ \t\n]*)+" % RAW_IMG_TAG)
RAW_IMG = re.compile(RAW_IMG_TAG)
RAW_IMG_ATTR = re.compile(r'[ \t\n]+(src|alt)="([^"<>]*)"')
RAW_IMG_TYPES = (".png",)    # a raw <img src> names a regular file of one of these types; the corpus's raw images are .png


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def esc(text):
    return html.escape(text, quote=True)


def txt(text):
    """Declared copy as element text: & < and > escaped, quotes kept as written."""
    return html.escape(text, quote=False)


def exists_exact(base, segments):
    """True when base/segments exists and each segment equals a directory entry exactly. A clone may sit
    on a case-insensitive volume; the deployment's filesystem is case-sensitive."""
    here = base
    for seg in segments:
        try:
            names = os.listdir(here)
        except OSError:
            return False
        if seg not in names:
            return False
        here = os.path.join(here, seg)
    return os.path.exists(here)


def url_path(path):
    """Percent-encode a path for emission in an href or src."""
    return quote(path, safe="/")


def new_md():
    return MarkdownIt("commonmark", {"html": True}).use(gfm_plugin).use(anchors_plugin, min_level=1, max_level=6)


def plain_text(inline_token):
    return "".join(c.content for c in (inline_token.children or []) if c.type in ("text", "code_inline"))


def squash(text):
    return " ".join(text.split())


def indent_of(line):
    return len(line) - len(line.lstrip(" "))


def pin_problems():
    if IMPORT_ERROR is not None:
        return ["renderer not importable: %s" % IMPORT_ERROR]
    modules = {"markdown_it": markdown_it, "mdit_py_plugins": mdit_py_plugins, "mdurl": mdurl}
    out = []
    for dist, module, want in PIN:
        have = getattr(modules[module], "__version__", None)
        if have != want:
            out.append("%s %s, pin %s" % (dist, have, want))
    return out


def load_cfg(root):
    with open(os.path.join(root, "tools", "read", "declared.json"), encoding="utf-8") as f:
        return json.load(f)


def tree_digest(files):
    """files: {relative path: bytes}. One SHA-256 over the sorted path and content identities."""
    h = hashlib.sha256()
    for rel in sorted(files):
        h.update(("%s\0%s\n" % (rel, sha256(files[rel]))).encode("utf-8"))
    return h.hexdigest()


# ---------------------------------------------------------------------------
# the source tree


class Tree:
    """Read access to the source tree, the declaration, and where each output lands in the site."""

    def __init__(self, cfg, root):
        self.cfg = cfg
        self.root = root
        self.site = cfg["site"]                                   # docs, or "." for the repository root: the authored site
        self.read = cfg["read"]                                   # read: the generated pages, site-relative
        self.ident = cfg.get("identity") or {}
        self.documents = {d["path"]: d for d in cfg.get("documents", [])}
        self.collections = list(cfg.get("collections", []))
        self.collection_of = {e["path"]: c for c in self.collections for e in c.get("entries", [])}
        self.records = {r["path"]: r for r in cfg.get("records", [])}
        self.rendered = dict(self.documents, **{p: e for c in self.collections for e in c.get("entries", []) for p in [e["path"]]},
                             **self.records)
        self.redirects = {r["path"]: r["to"] for r in cfg.get("redirects", [])}
        self.held = {h["path"]: h for h in cfg.get("held", [])}
        self.held_under = list(cfg.get("held_under", []))
        self.front_doors = list(cfg.get("front_doors", []))
        self.home_page = cfg.get("home_page")                     # an authored home page, or None: generated from "home"
        self.excluded = list(cfg.get("site_exclude", []))
        self._ids = {}

    def abspath(self, repo_path):
        return os.path.join(self.root, *[s for s in repo_path.split("/") if s not in ("", ".")])

    def site_prefix(self):
        return "" if self.site == "." else self.site + "/"

    def is_hidden(self, repo_path):
        """A path with a segment that starts with '.': never copied into the site."""
        return any(seg.startswith(".") and seg not in (".", "..") for seg in repo_path.split("/"))

    def is_excluded(self, repo_path):
        """A declared site exclusion names a file, or a directory with a trailing slash."""
        return any(repo_path == x or (x.endswith("/") and repo_path.startswith(x)) for x in self.excluded)

    def exists(self, repo_path):
        """Case-exact: every segment below the root must equal a directory entry exactly, case included."""
        return exists_exact(self.root, [s for s in repo_path.split("/") if s not in ("", ".")])

    def read_bytes(self, repo_path):
        with open(self.abspath(repo_path), "rb") as f:
            return f.read()

    def heading_ids(self, repo_path):
        """Heading ids of a Markdown file, as the pinned renderer (and GitHub's rendered HTML) assigns them."""
        if repo_path not in self._ids:
            tokens = new_md().parse(self.read_bytes(repo_path).decode("utf-8"), {})
            self._ids[repo_path] = {t.attrGet("id") for t in tokens if t.type == "heading_open"}
        return self._ids[repo_path]

    def site_path(self, repo_path):
        """The site-relative path of a repository file in the site directory, or None."""
        prefix = self.site_prefix()
        return repo_path[len(prefix):] if repo_path.startswith(prefix) else None

    def page_path(self, doc_path):
        """The site-relative output path of a rendered Markdown file: a record's declared output; otherwise the
        entry's declared output, or its file name's stem, under read/ or under its collection's directory there."""
        if doc_path in self.records:
            return "%s/%s" % (self.read, self.records[doc_path]["output"])
        entry = self.rendered[doc_path]
        name = entry.get("output") or posixpath.splitext(posixpath.basename(doc_path))[0] + ".html"
        if doc_path in self.collection_of:
            return "%s/%s/%s" % (self.read, self.collection_of[doc_path]["output_dir"], name)
        return "%s/%s" % (self.read, name)

    def home_path(self):
        """The site's home page: the authored page the declaration names, or the generated index.html."""
        return self.site_path(self.home_page) if self.home_page else "index.html"

    def held_default(self, repo_path):
        """The declared default hold whose directory holds this file, or None."""
        for h in self.held_under:
            if repo_path.startswith(h["under"]):
                return h
        return None

    def source_view_path(self, path):
        return "%s/source/%s.html" % (self.read, posixpath.basename(path))

    def carrier_path(self, owner_path):
        return "%s/_dsa/%s" % (self.read, posixpath.basename(owner_path))

    def index_path(self):
        return self.read + "/index.html"

    def rel(self, from_page, site_target):
        return url_path(posixpath.relpath(site_target, posixpath.dirname(from_page)))

    def github(self, path, frag="", kind="blob"):
        return "https://github.com/%s/%s/%s/%s%s" % (self.cfg["repo"], kind, self.cfg["branch"], url_path(path), frag)

    def raw_href(self, page, repo_path):
        """The raw file: hosted on this site when it is in the site directory and not excluded, on GitHub otherwise."""
        site = self.site_path(repo_path)
        if site is not None and not self.is_excluded(repo_path) and not self.is_hidden(repo_path):
            return self.rel(page, site)
        return self.github(repo_path, kind="raw")

    def inventory(self):
        """Every Markdown file in the site directory and each collection's directory, and at the repository root.
        Hidden directories and the site's excluded directories are not walked."""
        found = set()
        for name in sorted(os.listdir(self.root)):
            if name.endswith(".md") and os.path.isfile(os.path.join(self.root, name)):
                found.add(name)
        for top in [self.site] + [c["dir"] for c in self.collections]:
            base = os.path.join(self.root, *[s for s in top.split("/") if s not in ("", ".")])
            for dp, dns, fns in os.walk(base):
                rel = os.path.relpath(dp, self.root).replace(os.sep, "/")
                pre = "" if rel == "." else rel + "/"
                dns[:] = sorted(d for d in dns if not d.startswith(".") and not self.is_excluded(pre + d + "/"))
                for fn in sorted(fns):
                    if fn.endswith(".md"):
                        found.add(pre + fn)
        return sorted(found)


# ---------------------------------------------------------------------------
# structural preconditions of the declaration


def config_problems(tree):
    """Fail-closed checks on declared.json and the source tree, before anything is rendered."""
    cfg = tree.cfg
    out = []

    def path_ok(p, what, under):
        parts = p.split("/")
        if (under and not p.startswith(under + "/")) or ".." in parts or posixpath.normpath(p) != p or p.startswith("/"):
            out.append("STRUCTURE-PATH  %s %s: a declared path must be normalized%s, with no '..' segment"
                       % (what, p, " and sit under %s/" % under if under else ""))
            return False
        return True

    site = "" if cfg["site"] == "." else cfg["site"]           # the prefix a site path sits under; "" for the root
    if not (cfg["site"] == "." or (re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]*", cfg["site"]) and cfg["site"] not in ("..", ".git"))) \
            or cfg["read"] != "read":
        out.append("STRUCTURE-PATH  site %r and read %r: the site is one top-level directory or the repository root (.), "
                   "and the generated pages sit in read/" % (cfg["site"], cfg["read"]))
        return out
    ident = cfg.get("identity") or {}
    for key in IDENTITY_KEYS:
        if not isinstance(ident.get(key), str) or not ident.get(key):
            out.append("STRUCTURE-IDENTITY  identity.%s: the declaration names it" % key)
    front_link = ident.get("front_link") or {}
    if not front_link.get("label") or not front_link.get("href"):
        out.append("STRUCTURE-IDENTITY  identity.front_link: a label and a site path")
    chrome = cfg.get("chrome") or {}
    for key in ("stylesheets", "scripts"):
        if not isinstance(chrome.get(key), list) or not chrome.get(key):
            out.append("STRUCTURE-CHROME  chrome.%s: the site paths every generated page loads" % key)
    for key in ("logo_light", "logo_dark"):
        if not chrome.get(key):
            out.append("STRUCTURE-CHROME  chrome.%s: the wordmark's site path" % key)
    if out:
        return out
    if os.path.lexists(tree.abspath(tree.site_prefix() + tree.read)):
        out.append("STRUCTURE-SOURCE-MIRROR  %s%s exists in the source tree: reading pages are build output and "
                   "are never committed beside the Markdown" % (tree.site_prefix(), tree.read))
    if not cfg.get("front_doors"):
        out.append("STRUCTURE-FRONT-DOOR  front_doors: the declaration names at least one authored front door")
    for fd in cfg.get("front_doors", []):
        if path_ok(fd, "front door", site) and not tree.exists(fd):
            out.append("UNRESOLVED  front door %s: no such file" % fd)
        elif tree.is_excluded(fd) or tree.is_hidden(fd):
            out.append("STRUCTURE-FRONT-DOOR  %s is excluded from the site or hidden, so it is never served" % fd)
    for p in cfg.get("site_exclude", []):
        bare = p.rstrip("/")
        if not path_ok(bare, "site exclusion", site):
            continue
        if posixpath.normpath(bare) in (".", "") or bare == cfg["site"]:
            out.append("STRUCTURE-PATH  site exclusion %r names the site itself" % p)
        elif p.endswith("/") and tree.exists(bare) and not os.path.isdir(tree.abspath(bare)):
            out.append("STRUCTURE-PATH  site exclusion %r ends in / but names a file" % p)
        elif not p.endswith("/") and os.path.isdir(tree.abspath(bare)):
            out.append("STRUCTURE-PATH  site exclusion %r names a directory; write it with a trailing /" % p)
    for d in cfg["documents"]:
        if path_ok(d["path"], "document", site) and not tree.exists(d["path"]):
            out.append("UNRESOLVED  document %s: no such file" % d["path"])
    for c in cfg.get("collections", []):
        if not c.get("dir") or not c.get("title") or not c.get("kind") or not OUTPUT_DIR.match(c.get("output_dir", "")):
            out.append("STRUCTURE-COLLECTION  %r: a collection names its dir, title, kind and a plain output_dir" % c.get("dir"))
            continue
        path_ok(c["dir"], "collection directory", "")
        for d in c.get("entries", []):
            if path_ok(d["path"], "collection entry", c["dir"]) and not tree.exists(d["path"]):
                out.append("UNRESOLVED  %s %s: no such file" % (c["kind"], d["path"]))
    for d in list(cfg["documents"]) + [e for c in cfg.get("collections", []) for e in c.get("entries", [])]:
        if "output" in d and not OUTPUT_NAME.match(d["output"] or ""):
            out.append("STRUCTURE-PATH  %s output %r: must be a plain .html file name" % (d["path"], d["output"]))
    for r in cfg.get("records", []):
        if path_ok(r["path"], "record", site) and not tree.exists(r["path"]):
            out.append("UNRESOLVED  record %s: no such file" % r["path"])
        if not OUTPUT_NAME.match(r.get("output", "")):
            out.append("STRUCTURE-PATH  record %s output %r: must be a plain .html file name" % (r["path"], r.get("output")))
    for r in cfg.get("redirects", []):
        if path_ok(r["path"], "redirect", site) and not tree.exists(r["path"]):
            out.append("UNRESOLVED  redirect %s: no such file" % r["path"])
        path_ok(r["to"], "redirect target", site)
        if r["to"] not in tree.documents:
            out.append("STRUCTURE-REDIRECT  %s redirects to %s, which is not a declared document" % (r["path"], r["to"]))
    for h in cfg.get("held", []):
        if path_ok(h["path"], "held file", "") and not tree.exists(h["path"]):
            out.append("UNRESOLVED  held file %s: no such file" % h["path"])
        if not h.get("reason"):
            out.append("STRUCTURE-HELD  %s: a held file names its reason" % h["path"])
    for h in cfg.get("held_under", []):
        u = h.get("under", "")
        if not u.endswith("/") or not path_ok(u.rstrip("/"), "default hold", "") or not tree.exists(u.rstrip("/")):
            out.append("STRUCTURE-HELD  default hold %r: a directory of the source tree, written with a trailing slash" % u)
        if not h.get("reason"):
            out.append("STRUCTURE-HELD  default hold %s: it names its reason" % u)
    if tree.home_page:
        if path_ok(tree.home_page, "home page", site) and not tree.exists(tree.home_page):
            out.append("UNRESOLVED  home page %s: no such file" % tree.home_page)
        elif tree.site_path(tree.home_page) != "index.html":
            out.append("STRUCTURE-HOME  the authored home page is the site's root index.html")
        if cfg.get("home"):
            out.append("STRUCTURE-HOME  the declaration names an authored home page and a generated one")
    home = cfg.get("home") or {}
    if not tree.home_page and (not home.get("description") or not home.get("lede") or not home.get("routes")):
        out.append("STRUCTURE-HOME  the home page declares its description, its lede and its routes")
    for r in home.get("routes", []):
        href = r.get("href", "")
        if not r.get("label") or not r.get("support"):
            out.append("STRUCTURE-HOME  route %r: a route declares its label and its support copy" % href)
        parts = urlsplit(href)
        if parts.scheme or parts.netloc:
            if parts.scheme != "https" or not parts.netloc:
                out.append("STRUCTURE-HOME  route %s: an external route is an https URL" % href)
        elif not href or parts.query or parts.fragment:
            out.append("STRUCTURE-HOME  route %r: a local route is a site path, with no query or fragment" % href)
        else:
            path_ok(href, "home route", "")
    for s in cfg["source_views"]:
        path_ok(s["path"], "source view", site)
        path_ok(s["figure"], "source view figure", site)
    for c in cfg["carriers"]["vendored"]:
        path_ok(c["path"], "vendored carrier", "tools/read/carriers")
    for c in cfg["carriers"]["reused"]:
        path_ok(c["path"], "reused carrier", site)
    for s in chrome["stylesheets"] + chrome["scripts"] + [chrome["logo_light"], chrome["logo_dark"], front_link["href"]]:
        if s.startswith("/") or ".." in s.split("/") or posixpath.normpath(s) != s or urlsplit(s).scheme:
            out.append("STRUCTURE-CHROME  %s: a chrome path is a normalized site path" % s)
    for c in cfg["carriers"]["vendored"] + cfg["carriers"]["reused"]:
        owner = c["owner_path"]
        if owner.startswith("/") or ".." in owner.split("/") or posixpath.normpath(owner) != owner:
            out.append("STRUCTURE-PATH  carrier owner_path %s: must be a normalized relative path with no '..' segment" % owner)
    for doc, decls in list(cfg.get("passages", {}).items()) + list(cfg.get("blocks", {}).items()):
        if doc not in tree.rendered:
            out.append("STRUCTURE-DECLARATION  %s carries passage or block declarations but is not rendered" % doc)
    for doc, decls in cfg.get("passages", {}).items():
        for d in decls:
            if d.get("role") not in PASSAGE_ROLES:
                out.append("STRUCTURE-PASSAGE  %s #%s: role %r is not one of %s" % (doc, d.get("n"), d.get("role"), ", ".join(PASSAGE_ROLES)))
            if d.get("role") in ("framing", "synthesis") and not d.get("chip"):
                out.append("STRUCTURE-PASSAGE  %s #%s: a %s names its chip" % (doc, d.get("n"), d.get("role")))
    for doc, decls in cfg.get("blocks", {}).items():
        for d in decls:
            if d.get("shape") not in BLOCK_SHAPES:
                out.append("STRUCTURE-BLOCK  %s #%s: shape %r is not one of %s" % (doc, d.get("n"), d.get("shape"), ", ".join(BLOCK_SHAPES)))
    if out:
        return out
    # every Markdown file in the inventory scope has exactly one declared disposition
    declared = {}
    listed = ([d["path"] for d in cfg.get("documents", [])]
              + [e["path"] for c in cfg.get("collections", []) for e in c.get("entries", [])]
              + [r["path"] for r in cfg.get("records", [])] + [r["path"] for r in cfg.get("redirects", [])]
              + [h["path"] for h in cfg.get("held", [])])
    for p in listed:
        declared.setdefault(p, 0)
        declared[p] += 1
    for p, n in sorted(declared.items()):
        if n > 1:
            out.append("STRUCTURE-DISPOSITION  %s is declared more than once" % p)
    for p in tree.inventory():
        if p not in declared and tree.held_default(p) is None:
            out.append("UNDECLARED  %s: every Markdown file is rendered, a redirect or held with a reason" % p)
    # no two outputs on one path
    owners = {}
    for p in tree.rendered:
        owners.setdefault(tree.page_path(p).casefold(), []).append(p)
    for s in cfg["source_views"]:
        owners.setdefault(tree.source_view_path(s["path"]).casefold(), []).append(s["path"])
    for c in cfg["carriers"]["vendored"]:
        owners.setdefault(tree.carrier_path(c["owner_path"]).casefold(), []).append(c["path"])
    owners.setdefault(tree.index_path().casefold(), []).append("the documents index")
    if not tree.home_page:
        owners.setdefault(tree.home_path().casefold(), []).append("the home page")
    for output, who in sorted(owners.items()):
        if len(who) > 1:
            out.append("STRUCTURE-COLLISION  %s is written by %s" % (output, " and ".join(who)))
    return out


# ---------------------------------------------------------------------------
# links


def rewrite(tree, from_path, page, href):
    """Return (new href, class) for a link in from_path rendered at site path page. UNRESOLVED fails the build."""
    parts = urlsplit(href)
    if parts.scheme or parts.netloc:
        return href, "external"
    if href.startswith("#"):
        return href, "same-document"            # verified against the page's ids later
    if href.startswith("/"):
        return href, "UNRESOLVED (root-absolute path)"
    path = unquote(parts.path)
    if path.startswith("/"):
        return href, "UNRESOLVED (root-absolute path once decoded)"
    frag_raw = parts.fragment
    frag = unquote(frag_raw)
    hash_part = ("#" + frag_raw) if frag_raw else ""
    query = ("?" + parts.query) if parts.query else ""
    target = posixpath.normpath(posixpath.join(posixpath.dirname(from_path), path)) if path else from_path
    if target == ".." or target.startswith("../"):
        return href, "UNRESOLVED (outside the repository)"
    if target in tree.rendered:
        if frag and frag not in tree.heading_ids(target):
            return href, "UNRESOLVED-ANCHOR (%s has no heading #%s)" % (target, frag)
        return tree.rel(page, tree.page_path(target)) + hash_part, "document-page"
    if target in tree.redirects:
        to = tree.redirects[target]
        dest = tree.rel(page, tree.page_path(to))
        if frag and frag in tree.heading_ids(to):
            return dest + hash_part, "redirect-to-document-page"
        return dest, "redirect-to-document-page-fragment-dropped" if frag else "redirect-to-document-page"
    if not tree.exists(target):
        return href, "UNRESOLVED (no such file)"
    is_dir = os.path.isdir(tree.abspath(target))
    if frag:
        if is_dir or not target.endswith(".md"):
            return href, "UNRESOLVED-ANCHOR (a fragment into %s cannot be verified)" % target
        if frag not in tree.heading_ids(target):
            return href, "UNRESOLVED-ANCHOR (%s has no heading #%s)" % (target, frag)
        return tree.github(target, hash_part), "raw-markdown-fragment-to-github"
    site = tree.site_path(target)
    if site is not None and not is_dir and target.endswith(".md"):
        return tree.github(target), "unrendered-markdown-to-github"    # its rendered view, not raw text
    if (site is not None and not tree.is_excluded(target) and not tree.is_hidden(target)
            and not (is_dir and tree.is_excluded(target + "/"))):
        if not is_dir or os.path.isfile(os.path.join(tree.abspath(target), "index.html")):
            return tree.rel(page, site) + ("/" if is_dir else "") + query, "hosted-file"
        return tree.github(target, "", "tree"), "site-directory-to-github"    # the site serves no listing of it
    return tree.github(target, "", "tree" if is_dir else "blob"), "repository-file-to-github"


def rewrite_img_tags(tree, from_path, page, content, record, in_link=False):
    """Rewrite src in allowlisted raw <img> tags; wrap each one not inside a Markdown link in a link to its
    full-resolution file. A tag outside the allowlist form is left alone: scan_raw_html fails the build on it."""

    def fix(match):
        tag = match.group(0)
        attrs, pos = [], len("<img")
        m = RAW_IMG_ATTR.match(tag, pos)
        while m:                                 # the attributes in order, exactly as the allowlist form reads them
            attrs.append(m)
            m = RAW_IMG_ATTR.match(tag, m.end())
        src_attrs = [a for a in attrs if a.group(1) == "src"]
        if not src_attrs:
            record.append(("", "", "UNRESOLVED-IMAGE (no src)"))
            return tag
        a = src_attrs[0]
        src = a.group(2)
        new, kind = rewrite_image_src(tree, from_path, page, html.unescape(src), raw=True)
        record.append((src, new, kind))
        tag = tag[:a.start(2)] + esc(new) + tag[a.end(2):]
        if not in_link:
            tag = '<a class="doc-image-link" href="%s">%s</a>' % (esc(new), tag)
        return tag

    return RAW_IMG.sub(fix, content)


def rewrite_image_src(tree, from_path, page, src, raw=False):
    parts = urlsplit(src)
    if parts.scheme or parts.netloc:
        if raw:                                  # a raw <img> names a hosted file; no scheme is allowlisted
            return src, "UNRESOLVED-SCHEME (raw <img> src %s)" % ("scheme %s:" % parts.scheme if parts.scheme else "is scheme-relative")
        return src, "UNRESOLVED-IMAGE (a remote image would be fetched at runtime)"
    path = unquote(parts.path)
    target = posixpath.normpath(posixpath.join(posixpath.dirname(from_path), path))
    site = tree.site_path(target)
    if (src.startswith("/") or path.startswith("/") or target.startswith("../") or site is None or tree.is_excluded(target)
            or tree.is_hidden(target) or not tree.exists(target)):
        return src, "UNRESOLVED-IMAGE (not a hosted file)"
    if raw and not os.path.isfile(tree.abspath(target)):
        return src, "UNRESOLVED-IMAGE (raw <img> src is not a regular file)"
    if raw and posixpath.splitext(target)[1] not in RAW_IMG_TYPES:
        return src, "UNRESOLVED-IMAGE (raw <img> src is not a %s file)" % " or ".join(RAW_IMG_TYPES)
    return tree.rel(page, site), "image-hosted"


def srcset_urls(value):
    return [c.strip().split()[0] for c in value.split(",") if c.strip()]


class RawHtmlScan(HTMLParser):
    """Name every construct in a piece of raw HTML that the allowlist does not admit.

    Admitted: the elements in RAW_HTML_ALLOWED, each carrying only its listed attributes, each at most once. Refused:
    every other element, every end tag, every other attribute (an on* handler named as such), and every comment,
    CDATA or marked section, declaration and processing instruction. URL-bearing attributes are classified as well,
    so a refusal also names a relative or disallowed URL. <img src> is checked and rewritten by rewrite_img_tags."""

    def __init__(self, found):
        super().__init__(convert_charrefs=True)
        self.found = found

    def handle_starttag(self, tag, attrs):
        self.tag(tag, attrs)

    def handle_startendtag(self, tag, attrs):
        self.tag(tag, attrs)

    def handle_endtag(self, tag):
        self.found.append(("</%s>" % tag, "", "UNSAFE-HTML (raw </%s> is not allowed)" % tag))

    # Comments, CDATA and other marked sections, declarations and processing instructions are refused
    # outright: html.parser and a browser's tokenizer disagree on where some of them end, so markup
    # hidden inside one here can be live markup in the page.
    def handle_comment(self, data):
        self.found.append(("<!--", "", "UNSAFE-HTML (raw HTML comment is not allowed)"))

    def unknown_decl(self, data):
        self.found.append(("<![", "", "UNSAFE-HTML (raw HTML CDATA or marked section is not allowed)"))

    def handle_decl(self, decl):
        self.found.append(("<!", "", "UNSAFE-HTML (raw HTML declaration is not allowed)"))

    def handle_pi(self, data):
        self.found.append(("<?", "", "UNSAFE-HTML (raw HTML processing instruction is not allowed)"))

    def tag(self, tag, attrs):
        allowed = RAW_HTML_ALLOWED.get(tag, ())
        if tag not in RAW_HTML_ALLOWED:
            self.found.append(("<%s>" % tag, "", "UNSAFE-HTML (raw <%s> is not allowed)" % tag))
        seen = set()
        for name, value in attrs:
            if name.startswith("on"):
                self.found.append((name, value or "", "UNSAFE-HTML (event-handler attribute %s on <%s>)" % (name, tag)))
            elif name not in allowed:
                self.found.append((name, value or "", "UNSAFE-HTML (attribute %s on <%s> is not allowed)" % (name, tag)))
            elif name in seen:
                self.found.append((name, value or "", "UNSAFE-HTML (attribute %s repeated on <%s>)" % (name, tag)))
            seen.add(name)
            if value is None:
                continue
            if name == "href":
                self.url(tag, name, value)
            elif name == "src" and tag != "img":
                self.url(tag, name, value)
            elif name in ("srcset", "poster"):
                for v in (srcset_urls(value) if name == "srcset" else [value]):
                    self.url(tag, name, v)

    def url(self, tag, attr, value):
        v = value.strip()
        parts = urlsplit(v)
        if parts.scheme:
            if parts.scheme in ALLOWED_SCHEMES:
                self.found.append((v, v, "external"))
            else:
                self.found.append((v, v, "UNRESOLVED-SCHEME (raw <%s %s> scheme %s: is not allowed)" % (tag, attr, parts.scheme)))
        elif parts.netloc:
            self.found.append((v, v, "UNRESOLVED-SCHEME (raw <%s %s> is scheme-relative)" % (tag, attr)))
        elif attr == "href" and v.startswith("#"):
            self.found.append((v, v, "same-document"))
        elif attr == "href":
            self.found.append((v, v, "UNRESOLVED (relative link inside raw HTML is not rewritten)"))
        else:
            self.found.append((v, v, "UNRESOLVED (relative %s on raw <%s> is not rewritten)" % (attr, tag)))


def raw_html_allowed(content):
    """The allowlist gate, independent of any HTML parser: the raw text is allowlisted <img> tags and whitespace only."""
    return RAW_HTML_GRAMMAR.fullmatch(content) is not None


def scan_raw_html(content, findings):
    if not raw_html_allowed(content):
        first = content.strip().split("\n", 1)[0]
        findings.append((first[:80], "", "UNSAFE-HTML (raw HTML outside the allowlist: only <img> tags with "
                                         "double-quoted src and alt attributes are allowed)"))
    # Named diagnostics beside the gate. The raw text may not open a comment, CDATA section, declaration or
    # processing instruction, or close a script, in any case; the parser names every other refused construct.
    lowered = content.lower()
    for marker in RAW_TEXT_MARKERS:
        if marker in lowered:
            findings.append((marker, "", "UNSAFE-HTML (raw HTML text contains '%s')" % marker))
    scan = RawHtmlScan(findings)
    scan.feed(content)
    scan.close()


# ---------------------------------------------------------------------------
# passages and structured blocks: declared, never inferred


def matching_close(tokens, i):
    depth = 0
    for j in range(i, len(tokens)):
        depth += tokens[j].nesting
        if depth == 0:
            return j
    return len(tokens) - 1


def direct_children(tokens, i, j):
    """The block-level children of the container opened at i and closed at j, as (start, end) spans."""
    out, k = [], i + 1
    while k < j:
        end = matching_close(tokens, k) if tokens[k].nesting == 1 else k
        out.append((k, end))
        k = end + 1
    return out


def classify_passages(tree, doc_path, tokens, findings):
    """Assign each blockquote its declared role. A blockquote carries no signal of whose words it holds, so the
    declaration names it by the words it starts with: quotation (represented voice), callout (the document's own
    point, set apart), or a section framing or synthesis panel. An undeclared blockquote fails the build, and so
    does a declaration that names no blockquote or more than one."""
    decls = tree.cfg.get("passages", {}).get(doc_path, [])
    quotes = []
    for i, t in enumerate(tokens):
        if t.type == "blockquote_open":
            j = matching_close(tokens, i)
            first = next((x for x in tokens[i:j] if x.type == "inline"), None)
            quotes.append((i, j, squash(plain_text(first)) if first is not None else ""))
    claimed = {}
    for d in decls:
        hits = [q for q in quotes if q[2].startswith(squash(d["starts"]))]
        if len(hits) != 1:
            findings.append((d["starts"][:60], "", "STRUCTURE-PASSAGE (the declared %r starts %d blockquotes; it must name exactly one)"
                             % (d["starts"], len(hits))))
            continue
        claimed.setdefault(hits[0][0], []).append(d)
    for i, j, text in quotes:
        ds = claimed.get(i, [])
        if not ds:
            findings.append((text[:60], "", "UNDECLARED-PASSAGE (a blockquote has no declared role: one of %s)" % ", ".join(PASSAGE_ROLES)))
            continue
        if len(ds) > 1:
            findings.append((text[:60], "", "STRUCTURE-PASSAGE (a blockquote is declared more than once)"))
            continue
        d = ds[0]
        role = d["role"]
        kids = direct_children(tokens, i, j)
        if role == "quotation":
            if any(tokens[a].type != "paragraph_open" for a, _ in kids):
                findings.append((text[:60], "", "UNSUPPORTED-PASSAGE (a quotation holds paragraphs only)"))
                continue
            tokens[i].attrSet("class", "doc-quote")
            for a, _ in kids:
                tokens[a].meta["role_set"] = True       # .doc-quote > p carries the quotation text role
        elif role == "callout":
            if len(kids) == 1 and tokens[kids[0][0]].type == "paragraph_open":
                tokens[i].hidden = tokens[j].hidden = True
                tokens[kids[0][0]].attrSet("class", "doc-body surface-emphasis-rail")
                tokens[kids[0][0]].meta["role_set"] = True
            else:
                tokens[i].tag = tokens[j].tag = "div"
                tokens[i].attrSet("class", "doc-group surface-emphasis-rail")
        else:
            tokens[i].tag = tokens[j].tag = "section"
            tokens[i].attrSet("class", "surface-separate surface-material-panel surface-attach-free "
                                       "surface-elevation-flush doc-group")
            tokens[i].meta["chip"] = d["chip"]


def split_groups(text):
    """Peer groups of a block declared grouped: runs of lines between blank lines."""
    groups, cur = [], []
    for line in text.split("\n"):
        if line.strip() == "":
            if cur:
                groups.append(cur)
                cur = []
        else:
            cur.append(line)
    if cur:
        groups.append(cur)
    return groups


def grouped_html(text, shape):
    """(html, problem). groups-rail: the unindented lines open the group and the indented lines beneath them sit in
    one hierarchy rail, their shared indentation removed and any further indentation kept as written.
    groups-aligned: the first line opens the group and the lines after it keep every space, because their
    indentation aligns columns and is not a level."""
    groups = split_groups(text)
    if len(groups) < 2:
        return "", "a grouped block has at least two peer groups; this one has %d" % len(groups)
    out = []
    for g in groups:
        if indent_of(g[0]) != 0:
            return "", "peer group %r does not open on an unindented label line" % g[0].strip()[:40]
        if shape == "groups-rail":
            k = 0
            while k < len(g) and indent_of(g[k]) == 0:
                k += 1
            label, rest = g[:k], g[k:]
            if any(indent_of(line) == 0 for line in rest):
                return "", "peer group %r has an unindented line after its indented lines" % g[0].strip()[:40]
            cut = min((indent_of(line) for line in rest), default=0)
            part = '<pre class="doc-pre-part">%s</pre>' % esc("\n".join(label))
            if rest:
                part += '<div class="doc-hierarchy"><pre class="doc-pre-part">%s</pre></div>' % esc("\n".join(line[cut:] for line in rest))
        else:
            part = '<pre class="doc-pre-part">%s</pre>' % esc(g[0])
            if len(g) > 1:
                part += '<pre class="doc-pre-part">%s</pre>' % esc("\n".join(g[1:]))
        out.append('<div class="doc-pre-group">%s</div>' % part)
    return '<div class="doc-pre doc-pre--structured">\n%s\n</div>\n' % "\n".join(out), None


def classify_blocks(tree, doc_path, tokens, findings):
    """Every fenced or indented block is a plain .doc-pre unless the declaration names its peer-group shape, by
    the block's first line. A declaration that names no block or more than one fails the build."""
    blocks = [t for t in tokens if t.type in ("fence", "code_block")]
    for d in tree.cfg.get("blocks", {}).get(doc_path, []):
        hits = [t for t in blocks if t.content.split("\n", 1)[0].startswith(d["starts"])]
        if len(hits) != 1:
            findings.append((d["starts"][:60], "", "STRUCTURE-BLOCK (the declared %r starts %d blocks; it must name exactly one)"
                             % (d["starts"], len(hits))))
            continue
        t = hits[0]
        body = t.content[:-1] if t.content.endswith("\n") else t.content
        markup, problem = grouped_html(body, d["shape"])
        if problem:
            findings.append((d["starts"][:60], "", "STRUCTURE-BLOCK (%s: %s)" % (d["shape"], problem)))
            continue
        if t.meta.get("structured"):
            findings.append((d["starts"][:60], "", "STRUCTURE-BLOCK (a block is declared more than once)"))
            continue
        t.meta["structured"] = markup


# ---------------------------------------------------------------------------
# document rendering

HEADING_ROLE = {1: "doc-title", 2: "doc-section-title", 3: "doc-subsection-title"}


class Node:
    def __init__(self, tag, cls):
        self.tag, self.cls, self.children = tag, cls, []

    def html(self):
        inner = "".join(c if isinstance(c, str) else c.html() for c in self.children)
        return '<%s class="%s">\n%s</%s>\n' % (self.tag, self.cls, inner, self.tag)


SLOT_META = "\x00meta\x00"
SLOT_TOC = "\x00toc\x00"


def annotate(tree, md, env, doc_path, page, tokens, links, images, findings):
    """Assign register roles, label table cells and rewrite links and images, in the token stream."""
    headings = []
    tables = []                                  # (header inline tokens, [(td_open, column)])
    in_head, col = False, 0
    passage_depth = 0
    for i, tok in enumerate(tokens):
        t = tok.type
        if t == "heading_open":
            level = int(tok.tag[1])
            tok.meta["level"] = level
            headings.append((level, tok.attrGet("id"), plain_text(tokens[i + 1])))
            new_tag = "h%d" % min(level + 1, 6)
            tok.tag = new_tag
            tokens[i + 2].tag = new_tag
            tok.attrSet("class", HEADING_ROLE.get(level, "doc-deep-title"))
            if passage_depth:
                findings.append((plain_text(tokens[i + 1])[:60], "", "UNSUPPORTED-PASSAGE (a heading inside a blockquote)"))
        elif t == "paragraph_open":
            if not tok.hidden and not tok.meta.get("role_set"):
                tok.attrSet("class", "doc-body")
        elif t in ("bullet_list_open", "ordered_list_open"):
            tok.attrSet("class", "read-list")
        elif t == "list_item_open":
            tok.attrSet("class", "doc-body")
        elif t == "blockquote_open":
            passage_depth += 1
        elif t == "blockquote_close":
            passage_depth -= 1
        elif t == "hr":
            tok.attrSet("class", "read-rule")
        elif t == "table_open":
            tok.attrSet("class", "read-table")
            tables.append(([], []))
        elif t == "thead_open":
            in_head = True
        elif t == "thead_close":
            in_head = False
        elif t == "tr_open":
            col = 0
        elif t in ("th_open", "td_open"):
            if in_head:
                tok.attrSet("class", "doc-label")
                tok.attrSet("scope", "col")
                header = tokens[i + 1]
                tables[-1][0].append(header)
                kinds = {c.type for c in header.children or []}
                if kinds & {"link_open", "image", "html_inline"}:
                    findings.append((header.content[:60], "", "UNSUPPORTED-TABLE-HEADER (a link, image or raw HTML in a "
                                     "table header; at narrow widths the header row is visually hidden, so it would "
                                     "hold an interaction the reader cannot see)"))
            else:
                tok.attrSet("class", "doc-body")
                tables[-1][1].append((tok, col))
            col += 1
        elif t == "html_block":
            scan_raw_html(tok.content, links)
            tok.content = rewrite_img_tags(tree, doc_path, page, tok.content, images)
        elif t == "inline":
            annotate_inline(tree, doc_path, page, tok, links, images)
    # the stacked layout repeats each column's header inside its cells, as rendered markup: code stays code
    for header, cells in tables:
        labels = [md.renderer.renderInline(h.children or [], md.options, env) for h in header]
        for td, c in cells:
            if c < len(labels) and labels[c].strip():
                td.meta["label"] = labels[c]
    return headings


def annotate_inline(tree, doc_path, page, tok, links, images):
    link_depth = 0
    out = []
    children = tok.children or []
    for k, child in enumerate(children):
        ct = child.type
        if ct == "link_open":
            link_depth += 1
            href = child.attrGet("href")
            new, kind = rewrite(tree, doc_path, page, href)
            links.append((href, new, kind))
            child.attrSet("href", new)
            inside = []
            for c in children[k + 1:]:
                if c.type == "link_close":
                    break
                inside.append(c)
            image_only = inside and all(c.type == "image" or (c.type == "text" and not c.content.strip()) for c in inside)
            child.attrSet("class", "doc-image-link" if image_only else "surface-text-link")
        elif ct == "link_close":
            link_depth -= 1
        elif ct == "code_inline":
            child.attrSet("class", "doc-code")
        elif ct == "image":
            src = child.attrGet("src")
            new, kind = rewrite_image_src(tree, doc_path, page, src)
            images.append((src, new, kind))
            child.attrSet("src", new)
            if link_depth == 0:
                a_open = type(child)("link_open", "a", 1)
                a_open.attrSet("class", "doc-image-link")
                a_open.attrSet("href", new)
                out += [a_open, child, type(child)("link_close", "a", -1)]
                continue
        elif ct == "html_inline":
            scan_raw_html(child.content, links)
            if "<img" in child.content.lower():
                child.content = rewrite_img_tags(tree, doc_path, page, child.content, images, link_depth > 0)
        out.append(child)
    tok.children = out


def top_level_blocks(tokens):
    i, n = 0, len(tokens)
    while i < n:
        tok = tokens[i]
        if tok.nesting == 1:
            j = matching_close(tokens, i)
            yield i, j + 1
            i = j + 1
        else:
            yield i, i + 1
            i += 1


def renderer_for(md):
    """Blocks are .doc-pre literal text, or a declared structured block; tables scroll or stack in their wrapper;
    each stacked cell repeats its header; a framing or synthesis panel opens on its chip."""

    def block(self, tokens, idx, options, env):
        tok = tokens[idx]
        if tok.meta.get("structured"):
            return tok.meta["structured"]
        text = tok.content[:-1] if tok.content.endswith("\n") else tok.content
        return '<pre class="doc-pre">%s</pre>\n' % esc(text)

    def table_open(self, tokens, idx, options, env):
        return '<div class="read-table-wrap">\n' + self.renderToken(tokens, idx, options, env)

    def table_close(self, tokens, idx, options, env):
        return self.renderToken(tokens, idx, options, env) + "</div>\n"

    def td_open(self, tokens, idx, options, env):
        out = self.renderToken(tokens, idx, options, env)
        label = tokens[idx].meta.get("label")
        return out + ('<span class="doc-label read-cell-label">%s</span>' % label if label else "")

    def blockquote_open(self, tokens, idx, options, env):
        out = self.renderToken(tokens, idx, options, env)
        chip = tokens[idx].meta.get("chip")
        return out + ('<p class="surface-emphasis-chip surface-emphasis--magenta">%s</p>\n' % esc(chip) if chip else "")

    md.add_render_rule("fence", block)
    md.add_render_rule("code_block", block)
    md.add_render_rule("table_open", table_open)
    md.add_render_rule("table_close", table_close)
    md.add_render_rule("td_open", td_open)
    md.add_render_rule("blockquote_open", blockquote_open)
    return md


def structure_problems(tokens):
    """A rendered document has exactly one top-level H1, and it is the first top-level heading."""
    levels = [int(t.tag[1]) for t in tokens if t.type == "heading_open" and t.level == 0]
    out = []
    h1 = levels.count(1)
    if h1 != 1:
        out.append(("", "", "STRUCTURE-H1-COUNT (%d top-level H1 headings; a rendered document needs exactly one)" % h1))
    if levels and levels[0] != 1:
        out.append(("", "", "STRUCTURE-FIRST-HEADING (the first top-level heading is H%d, not H1)" % levels[0]))
    return out


def render_body(tree, doc_path, page):
    md = renderer_for(new_md())
    env = {}
    tokens = md.parse(tree.read_bytes(doc_path).decode("utf-8"), env)
    findings = structure_problems(tokens)
    classify_passages(tree, doc_path, tokens, findings)
    classify_blocks(tree, doc_path, tokens, findings)
    # A document with no top-level H2: its header holds only the title, the provenance row and the lede; the
    # blocks after them sit in a body section of their own (a later H3 still opens its own section).
    no_h2 = not any(t.type == "heading_open" and t.level == 0 and t.tag == "h2" for t in tokens)
    links, images = [], []
    headings = annotate(tree, md, env, doc_path, page, tokens, links, images, findings)

    head = Node("header", "doc-titled")
    root = [head]
    stack = []
    container, prose, after_title, toc_placed, title, h1_seen = head, None, False, False, "", False
    for start, end in top_level_blocks(tokens):
        tok = tokens[start]
        if tok.type == "heading_open":
            level = tok.meta["level"]
            heading_html = md.renderer.render(tokens[start:end], md.options, env)
            if level == 1:
                title = plain_text(tokens[start + 1])
                head.children += [heading_html, SLOT_META]
                container, prose, after_title, h1_seen = head, None, True, True
                continue
            if not toc_placed:
                root.append(SLOT_TOC)
                toc_placed = True
            section = Node("section", "doc-section")
            while stack and stack[-1][0] >= level:
                stack.pop()
            (stack[-1][1].children if stack else root).append(section)
            stack.append((level, section))
            section.children.append(heading_html)
            container, prose, after_title = section, None, False
            continue
        if no_h2 and h1_seen and container is head and not (after_title and tok.type == "paragraph_open"):
            container, prose = Node("section", "doc-section"), None
            root.append(container)
        if after_title and tok.type == "paragraph_open" and container is head:
            tok.attrSet("class", "doc-lede")
            container.children.append(md.renderer.render(tokens[start:end], md.options, env))
            after_title = False
            continue
        if prose is None:
            prose = Node("div", "doc-prose")
            container.children.append(prose)
        prose.children.append(md.renderer.render(tokens[start:end], md.options, env))
        after_title = False
    body = "".join(n if isinstance(n, str) else n.html() for n in root)

    # same-document fragments resolve against this document's own ids
    ids = {h[1] for h in headings}
    for k, (href, new, kind) in enumerate(links):
        if kind == "same-document" and unquote(href[1:]) not in ids:
            links[k] = (href, new, "UNRESOLVED-ANCHOR (no heading %s in this document)" % href)
    return body, headings, title, links, images, findings


# ---------------------------------------------------------------------------
# page chrome

LOCAL_CSS = """
  /* Consumer-owned composition only: no type metric, foreground or rail here.
     Every value resolves through the foundation or the shell; the register
     supplies the text roles and the passage rails. */
  body { min-height: 100vh; }
  /* Reading measure on text; preformatted blocks, tables and figures keep the
     full column. 760px is a local literal: no measure token exists. */
  .doc-flow { --doc-measure: 760px; }
  /* Zero specificity, so an owner rule that sets its own width wins: the
     emphasis chip keeps the register's calc(100% - 2px). */
  :where(.doc-flow) :where(p, ul, ol, blockquote, h2, h3, h4, h5, h6, details, .doc-group) { max-width: var(--doc-measure); }
  /* Fragment clearance. A heading reached by #fragment clears the seated
     desktop mark, using the shell's own resting depth. */
  .doc-flow :where(h2, h3, h4, h5, h6)[id] { scroll-margin-top: var(--space-5); }
  /* A word too long for its line, such as a path or a long flag, breaks rather
     than widen the page at narrow widths. Preformatted blocks keep their lines
     and scroll in their own box. */
  :where(.doc-flow) { overflow-wrap: break-word; }
  :root[data-surface-nav-mode="desktop"] .doc-flow :where(h2, h3, h4, h5, h6)[id] { scroll-margin-top: calc(var(--surface-nav-top-depth) + var(--space-5)); }
  /* Lists: the register owns the item's text role, the consumer its geometry. */
  :where(.read-list) { margin: 0; padding-left: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
  :where(.read-list > li)::marker { color: var(--fg-3); }
  :where(.read-list .read-list) { margin-top: var(--space-2); }
  :where(.read-rule) { border: 0; border-top: 1px solid var(--line-1); margin: var(--space-2) 0; }
  /* Tables scroll inside their own box. The register sets the header's label
     role and the cells' body role; the geometry is this surface's, because it
     stacks rows at narrow widths, which the register's document table does
     not do. */
  :where(.read-table-wrap) { overflow-x: auto; }
  :where(.read-table) { border-collapse: collapse; }
  :where(.read-table) :where(th, td) { text-align: left; vertical-align: top; padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--line-1); }
  :where(.read-table) :where(td a, th a, .doc-code) { overflow-wrap: break-word; }
  :where(.read-cell-label) { display: none; }
  /* Narrow widths: each row stacks, and each cell opens on its column header,
     repeated as rendered markup so code in a header stays code. The full
     table returns at 840px: every table in the declared set fits its column
     from a 830px viewport, measured when this rule was set (839px is a local
     literal: media queries take no tokens). */
  @media (max-width: 839px) {
    :where(.read-table-wrap) { overflow-x: visible; }
    :where(.read-table), :where(.read-table) :where(tbody, tr, th, td) { display: block; }
    :where(.read-table thead) { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    :where(.read-table tr) { padding: var(--space-2) 0; border-bottom: 1px solid var(--line-1); }
    :where(.read-table) :where(th, td) { padding: var(--space-1) 0; border-bottom: 0; }
    :where(.read-cell-label) { display: block; }
  }
  /* Images never widen the page: contained, aspect ratio kept, linked to the
     full-resolution file. */
  :where(.doc-image-link) { display: block; border-bottom: 0; }
  :where(.doc-flow img) { display: block; max-width: 100%; height: auto; }
"""

CHROME_CSS = """
  /* Chrome text breaks between items, never inside one: a provenance item
     keeps its label, value, unit and separator together, and the repository
     name keeps its hyphen. A path item still breaks anywhere when it alone is
     wider than the column; its separator stays bound to its last character. */
  .doc-meta-item, .doc-nowrap { white-space: nowrap; }
  .doc-meta-item.doc-meta-path { white-space: normal; }
"""

SOURCE_CSS = """
  /* The reading measure on the title, provenance row and intro text; the code
     frame keeps the full column. File-name titles break anywhere rather than
     overflow. */
  .doc-flow { --doc-measure: 760px; }
  :where(.doc-flow) :where(p, ul, ol, blockquote, h2, h3, h4, h5, h6, details) { max-width: var(--doc-measure); }
  .doc-flow .doc-title { overflow-wrap: anywhere; }
  /* Two columns: a stationary line-number gutter and a horizontally scrolling
     code column. Lines are spans separated by literal newlines, so a copy of
     the code column returns the file's text, blank lines included. */
  .src-frame { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: start;
               font-family: var(--font-mono); font-size: var(--fs-caption); font-weight: var(--fw-light); line-height: 1.6; }
  .src-gutter, .src-view { font: inherit; line-height: inherit; margin: 0; white-space: pre; }
  .src-gutter { padding-right: 2ch; text-align: right; color: var(--fg-3); border-right: 1px solid var(--line-1);
                user-select: none; -webkit-user-select: none; }
  .src-view { padding-left: 2ch; color: var(--fg-1); overflow-x: auto; }
  .src-line { display: inline-block; min-width: 100%; }
  /* A blank line keeps a one-line box, so #L<n> lands on it and hits it. The
     zero-width space is generated content: a copy does not include it. */
  .src-line:empty::before { content: "\\200b"; }
  .src-line:target { background: var(--surface-glass-2); }
  /* Fragment clearance, as for document headings. */
  .src-line[id] { scroll-margin-top: var(--space-5); }
  :root[data-surface-nav-mode="desktop"] .src-line[id] { scroll-margin-top: calc(var(--surface-nav-top-depth) + var(--space-5)); }
"""

INDEX_CSS = """
  .doc-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 20px; }
  .doc-cards > .surface-panel { display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
  .doc-cards .surface-panel-support { color: var(--fg-2); }
  .doc-cards .doc-meta { overflow-wrap: anywhere; }
  .doc-index { --doc-measure: none; }
"""

HOME_CSS = """
  /* The home page's routes are the documents index's full-panel cards. A route's
     support copy may be a bare URL, so it breaks anywhere rather than widen its card. */
  .doc-cards .surface-panel-support { overflow-wrap: anywhere; }
"""

# The stylesheets and scripts every generated page loads, and the wordmark pair, are the declaration's "chrome":
# site-relative paths, the stylesheets in surface-document.html's order with the shell's two carriers around it.


def meta_row(items):
    """Provenance items as unbreakable spans; the separator stays with the item before it.

    items: (text, is_path) pairs. A path may break inside itself when it alone is wider than the column:
    it offers a break after each / _ and . (<wbr>), so its separator is bound to its last character instead."""
    spans = []
    for k, (text, is_path) in enumerate(items):
        last = k == len(items) - 1
        if is_path:
            tail = "" if last else '<span class="doc-nowrap">%s&nbsp;&middot;</span>' % esc(text[-1])
            spans.append('<span class="doc-meta-item doc-meta-path">%s%s</span>' % (wbr_path(text if last else text[:-1]), tail))
        else:
            spans.append('<span class="doc-meta-item">%s%s</span>' % (esc(text), "" if last else " &middot;"))
    return " ".join(spans)


def wbr_name(name):
    """A file name with a break opportunity after each _ . - and /."""
    return re.sub(r"([_./-])", r"\1<wbr>", esc(name))


def wbr_path(path):
    """A provenance path with a break opportunity after each / _ and . (a hyphen already offers one)."""
    return re.sub(r"([/_.])", r"\1<wbr>", esc(path))


def head_block(tree, page, title, description, css, metas):
    meta_lines = "".join('<meta name="%s" content="%s">\n' % (esc(k), esc(v)) for k, v in metas)
    links = "".join('<link rel="stylesheet" href="%s">\n' % esc(tree.rel(page, s)) for s in tree.cfg["chrome"]["stylesheets"])
    return ("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n"
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
            "<title>%s</title>\n<meta name=\"description\" content=\"%s\">\n"
            "<meta name=\"color-scheme\" content=\"light dark\">\n"
            "<meta name=\"generator\" content=\"tools/read/read_gen.py %s\">\n%s"
            "<!-- GENERATED at build time from tools/read/declared.json by tools/read/read_gen.py.\n"
            "     Build output: never committed; the Markdown is the source. -->\n"
            "<link rel=\"icon\" type=\"image/svg+xml\" href=\"%s\">\n"
            "<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"%s\">\n"
            "<link rel=\"apple-touch-icon\" href=\"%s\">\n"
            "%s<style>%s</style>\n</head>\n") % (
        esc(title), esc(description), PAGE_FORMAT, meta_lines, tree.rel(page, "favicon.svg"),
        tree.rel(page, "favicon-32.png"), tree.rel(page, "apple-touch-icon.png"), links, css)


def shell_open(tree, page, crumb_tail, lede=""):
    """The shell's header. The mark and the breadcrumb's repository name both link the home page; on the generated
    home page itself crumb_tail is None and the name is the current leaf."""
    name = tree.ident["name"]
    mark, mark_label = tree.home_path(), "%s home" % name
    if crumb_tail is None:
        here = '<span class="page doc-nowrap" aria-current="page">%s</span>' % esc(name)
    else:
        here = ('<a class="doc-nowrap" href="%s">%s</a> <span class="sep" aria-hidden="true">//</span> %s'
                % (esc(tree.rel(page, tree.home_path())), esc(name), crumb_tail))
    return ("<body>\n<div class=\"surface\">\n  <header class=\"surface-head\">\n    <div class=\"surface-head-main\">\n"
            "      <a class=\"surface-mark\" href=\"%(home)s\" aria-label=\"%(mark_label)s\">\n"
            "        <img class=\"surface-mark-light\" src=\"%(light)s\" alt=\"\" aria-hidden=\"true\" width=\"2160\" height=\"974\">\n"
            "        <img class=\"surface-mark-dark\" src=\"%(dark)s\" alt=\"\" aria-hidden=\"true\" width=\"2160\" height=\"974\">\n"
            "      </a>\n"
            "      <nav class=\"surface-breadcrumb\" aria-label=\"Breadcrumb\">\n"
            "        <h1 class=\"surface-title\"><a class=\"org\" href=\"https://a-s-k.studio/\">ASK</a> <span class=\"sep\" aria-hidden=\"true\">//</span> "
            "<a href=\"https://a-s-k.studio/apex-solar-kiss\">apex solar kiss</a> <span class=\"sep\" aria-hidden=\"true\">//</span> "
            "%(here)s</h1>\n"
            "      </nav>\n%(lede)s"
            "    </div>\n  </header>\n\n  <hr class=\"surface-rule\">\n\n  <main class=\"surface-payload\">\n") % {
        "home": esc(tree.rel(page, mark)), "mark_label": esc(mark_label),
        "light": esc(tree.rel(page, tree.cfg["chrome"]["logo_light"])),
        "dark": esc(tree.rel(page, tree.cfg["chrome"]["logo_dark"])),
        "here": here, "lede": lede}


def action(href, label, primary=False, external=False):
    cls = "surface-action" if primary else "surface-action surface-action--secondary"
    ext = ' target="_blank" rel="noopener"' if external else ""
    return '<a class="%s" href="%s"%s>%s</a>' % (cls, esc(href), ext, esc(label))


def shell_close(tree, page, footer_actions, nav_local, nav_utilities):
    return ("  </main>\n\n  <footer class=\"surface-footer\">\n    %s\n  </footer>\n\n"
            "  <template class=\"surface-nav-source\">\n    <ul class=\"surface-nav-local\">\n%s    </ul>\n"
            "    <p class=\"surface-nav-utilities\">\n      %s\n    </p>\n  </template>\n\n</div>\n%s</body>\n</html>\n") % (
        "\n    ".join(footer_actions), nav_local, "\n      ".join(nav_utilities),
        "".join('<script src="%s"></script>\n' % esc(tree.rel(page, s)) for s in tree.cfg["chrome"]["scripts"]))


def crumb(tree, page, label):
    return ('<a href="%s">documents</a> <span class="sep" aria-hidden="true">//</span> '
            '<span class="page" aria-current="page">%s</span>' % (esc(tree.rel(page, tree.index_path())), esc(label)))


def toc_html(headings):
    items = [(lvl, hid, txt) for (lvl, hid, txt) in headings if lvl in (2, 3)]
    if len([h for h in items if h[0] == 2]) < TOC_MIN_SECTIONS:
        return ""
    out = ['<details class="surface-disclosure surface-material-panel surface-attach-free surface-elevation-flush">',
           '<summary><span class="surface-disclosure-label">on this page</span>'
           '<span class="surface-disclosure-indicator" aria-hidden="true">&#9660;</span></summary>',
           '<nav class="surface-disclosure-body" aria-label="On this page">',
           '<ul class="doc-toc-list">']
    open_sub = open_li = False
    for lvl, hid, txt in items:
        link = '<a class="doc-toc-link surface-text-link" href="#%s">%s</a>' % (esc(hid), esc(txt))
        if lvl == 2:
            if open_sub:
                out.append("</ul>")
                open_sub = False
            if open_li:
                out.append("</li>")
            out.append("<li>" + link)
            open_li = True
        else:
            if not open_li:                    # an H3 before the first H2: its list still needs an item to sit in
                out.append("<li>")
                open_li = True
            if not open_sub:
                out.append('<ul class="doc-toc-list doc-hierarchy">')
                open_sub = True
            out.append("<li>%s</li>" % link)
    if open_sub:
        out.append("</ul>")
    if open_li:
        out.append("</li>")
    out.append("</ul>\n</nav>\n</details>\n")
    return "\n".join(out)


def siblings_of(tree, path):
    if path in tree.records:
        return tree.cfg["records"]
    if path in tree.collection_of:
        return tree.collection_of[path]["entries"]
    return tree.cfg["documents"]


def render_document(tree, entry, report):
    cfg = tree.cfg
    path = entry["path"]
    raw = tree.read_bytes(path)
    page = tree.page_path(path)
    body, headings, title, links, images, findings = render_body(tree, path, page)
    raw_href = tree.raw_href(page, path)
    raw_label = "raw .md"
    meta_html = ('<p class="doc-meta">%s</p>\n'
                 '<div class="doc-actions">%s %s</div>\n') % (
        meta_row([(path, True), ("%d B" % len(raw), False), ("source sha256 %s" % sha256(raw)[:12], False)]),
        action(tree.github(path), "GitHub // main", primary=True, external=True),
        action(raw_href, raw_label, external=raw_href.startswith("https:")))
    body = body.replace(SLOT_META, meta_html).replace(SLOT_TOC, toc_html(headings))
    siblings = []
    for d in siblings_of(tree, path):
        if d["path"] == path:
            siblings.append("      <li data-surface-nav-current></li>\n")
        else:
            siblings.append('      <li><a href="%s">%s</a></li>\n' % (esc(tree.rel(page, tree.page_path(d["path"]))), esc(d["label"])))
    doc = head_block(tree, page, tree.ident["name"] + " // " + entry["label"], title, LOCAL_CSS + CHROME_CSS,
                     [("source-path", path), ("source-sha256", sha256(raw))])
    doc += shell_open(tree, page, crumb(tree, page, entry["label"]))
    doc += '<article class="doc-flow">\n' + body + "</article>\n"
    index = tree.rel(page, tree.index_path())
    fl = tree.ident["front_link"]
    front = tree.rel(page, fl["href"])
    doc += shell_close(
        tree, page,
        [action(index, "documents"), action(front, fl["label"]), action(tree.github(path), "GitHub", external=True),
         action(raw_href, raw_label, external=raw_href.startswith("https:")),
         action("https://github.com/" + cfg["repo"], "repository", external=True)],
        "".join(siblings),
        [action(front, fl["label"]), action(tree.github(path), "source on GitHub", external=True),
         action(raw_href, raw_label, external=raw_href.startswith("https:")),
         action("https://github.com/" + cfg["repo"], "repository", external=True)])
    report[path] = {"links": links, "images": images, "headings": headings, "title": title, "findings": findings}
    if not title and not any(k.startswith("STRUCTURE") for _, _, k in findings):
        report[path]["findings"].append(("", "", "NO-TITLE (the H1 has no text)"))
    return doc


def render_source(tree, entry):
    cfg = tree.cfg
    path = entry["path"]
    raw = tree.read_bytes(path)
    text = raw.decode("utf-8").replace("\r\n", "\n").replace("\r", "\n")
    lines = text.split("\n")
    if lines and lines[-1] == "":
        lines = lines[:-1]
    page = tree.source_view_path(path)
    name = posixpath.basename(path)
    rel_raw = tree.rel(page, tree.site_path(path))
    rel_fig = tree.rel(page, tree.site_path(entry["figure"]))
    code = "\n".join('<span class="src-line" id="L%d">%s</span>' % (i, esc(l)) for i, l in enumerate(lines, 1))
    if text.endswith("\n"):
        code += "\n"
    gutter = "\n".join(str(i) for i in range(1, len(lines) + 1))
    fl = tree.ident["front_link"]
    diagrams = tree.rel(page, fl["href"])
    index = tree.rel(page, tree.index_path())
    doc = head_block(tree, page, tree.ident["name"] + " // " + name, "Read-only source view of " + path, SOURCE_CSS + CHROME_CSS,
                     [("source-path", path), ("source-sha256", sha256(raw))])
    doc += shell_open(tree, page, '<a href="%s">%s</a> <span class="sep" aria-hidden="true">//</span> '
                                  '<span class="page" aria-current="page">%s</span>'
                      % (esc(diagrams), txt(fl["label"]), esc(entry["label"])))
    doc += '<article class="doc-flow">\n<header class="doc-titled">\n'
    doc += '<h2 class="doc-title">%s</h2>\n' % wbr_name(name)
    doc += '<p class="doc-meta">%s</p>\n' % meta_row(
        [(path, True), ("%d B" % len(raw), False), ("%d lines" % len(lines), False), ("read-only", False),
         ("source sha256 %s" % sha256(raw)[:12], False)])
    doc += '<div class="doc-actions">%s %s %s</div>\n' % (
        action(rel_fig, "open figure", primary=True), action(tree.github(path), "GitHub // main", external=True),
        action(rel_raw, "raw file"))
    doc += ('<p class="doc-body">This view shows one file as text; %s. '
            'It is generated at build time, static and bounded: nothing here runs the code, and there is no '
            'browsing beyond this file.</p>\n</header>\n' % txt(tree.ident["source_note"]))
    doc += ('<div class="src-frame"><pre class="src-gutter" aria-hidden="true">%s</pre>'
            '<pre class="src-view" tabindex="0" aria-label="%s, %d lines">%s</pre></div>\n'
            % (gutter, esc(name), len(lines), code))
    doc += "</article>\n"
    doc += shell_close(
        tree, page,
        [action(index, "documents"), action(diagrams, fl["label"]),
         action(tree.github(path), "GitHub", external=True), action(rel_raw, "raw file")],
        '      <li data-surface-nav-current></li>\n',
        [action(index, "documents"), action(rel_fig, "open figure"),
         action(tree.github(path), "source on GitHub", external=True),
         action("https://github.com/" + cfg["repo"], "repository", external=True)])
    return doc


def render_index(tree, report):
    cfg = tree.cfg
    page = tree.index_path()

    def card(entry, kind):
        r = report[entry["path"]]
        sections = len([h for h in r["headings"] if h[0] == 2])
        items = [(entry["path"], True)] + ([("%d sections" % sections, False)] if sections else [])
        return ('<a class="surface-panel" href="%s"><span class="doc-label">%s</span>'
                '<span class="surface-panel-title">%s</span>'
                '<span class="surface-panel-support">%s</span>'
                '<span class="doc-meta">%s</span></a>'
                % (esc(tree.rel(page, tree.page_path(entry["path"]))), kind, esc(entry["label"]),
                   esc(r["title"]), meta_row(items)))

    def cards(entries, kind):
        return '<div class="doc-cards">\n' + "\n".join(card(e, kind) for e in entries) + "\n</div>\n"

    sources = []
    for s in cfg["source_views"]:
        sources.append('<a class="surface-panel" href="%s"><span class="doc-label">source view</span>'
                       '<span class="surface-panel-title">%s</span>'
                       '<span class="surface-panel-support">%s</span>'
                       '<span class="doc-meta">%s</span></a>'
                       % (esc(tree.rel(page, tree.source_view_path(s["path"]))), esc(s["label"]),
                          txt(tree.ident["source_card"]), meta_row([(s["path"], True)])))
    rest = []
    for p in sorted(tree.redirects):
        to = tree.redirects[p]
        rest.append('<li class="doc-body"><code class="doc-code">%s</code> &middot; a redirect to '
                    '<a class="surface-text-link" href="%s">%s</a> &middot; '
                    '<a class="surface-text-link" href="%s">raw .md</a></li>'
                    % (esc(p), esc(tree.rel(page, tree.page_path(to))), esc(tree.rendered[to]["label"]),
                       esc(tree.raw_href(page, p))))
    for h in cfg.get("held", []):
        rest.append('<li class="doc-body"><code class="doc-code">%s</code> &middot; %s &middot; '
                    '<a class="surface-text-link" href="%s" target="_blank" rel="noopener">GitHub</a></li>'
                    % (esc(h["path"]), esc(h["reason"]), esc(tree.github(h["path"]))))
    for h in tree.held_under:
        rest.append('<li class="doc-body">every other Markdown file under <code class="doc-code">%s</code> &middot; %s &middot; '
                    '<a class="surface-text-link" href="%s" target="_blank" rel="noopener">GitHub</a></li>'
                    % (esc(h["under"]), esc(h["reason"]), esc(tree.github(h["under"].rstrip("/"), kind="tree"))))
    name = tree.ident["name"]
    doc = head_block(tree, page, name + " // documents", tree.ident["index_description"],
                     LOCAL_CSS + CHROME_CSS + INDEX_CSS, [])
    doc += shell_open(tree, page, '<span class="page" aria-current="page">documents</span>',
                      '      <p class="surface-lede">%s</p>\n' % txt(tree.ident["index_lede"]))
    doc += '<div class="doc-flow doc-index">\n'
    doc += ('<section class="doc-section">\n<h2 class="doc-section-title">%s</h2>\n' % txt(tree.ident["documents_title"])
            + cards(cfg["documents"], "document") + "</section>\n")
    for c in tree.collections:
        doc += ('<section class="doc-section">\n<h2 class="doc-section-title">%s</h2>\n' % txt(c["title"])
                + ('<p class="doc-body">%s</p>\n' % txt(c["intro"]) if c.get("intro") else "")
                + cards(c["entries"], txt(c["kind"])) + "</section>\n")
    if cfg.get("records"):
        doc += ('<section class="doc-section">\n<h2 class="doc-section-title">records</h2>\n'
                '<p class="doc-body">%s</p>\n' % txt(tree.ident["records_intro"])
                + cards(cfg["records"], "record") + "</section>\n")
    if sources:
        doc += ('<section class="doc-section">\n<h2 class="doc-section-title">source views</h2>\n'
                '<div class="doc-cards">\n' + "\n".join(sources) + "\n</div>\n</section>\n")
    doc += ('<section class="doc-section">\n<h2 class="doc-section-title">not rendered</h2>\n'
            '<p class="doc-body">The declaration decides what is rendered, and every Markdown file in the '
            'repository\'s documentation has a declared place. These stay readable on GitHub, and nothing here '
            'is browsed at runtime.</p>\n'
            '<ul class="read-list">\n' + "\n".join(rest) + "\n</ul>\n</section>\n</div>\n")
    local = ["      <li data-surface-nav-current>\n        <ul>\n"]
    for d in cfg["documents"]:
        local.append('          <li><a href="%s">%s</a></li>\n' % (esc(tree.rel(page, tree.page_path(d["path"]))), esc(d["label"])))
    local.append("        </ul>\n      </li>\n")
    fl = tree.ident["front_link"]
    diagrams = tree.rel(page, fl["href"])
    doc += shell_close(
        tree, page,
        [action(diagrams, fl["label"]), action("https://github.com/" + cfg["repo"], "repository", external=True),
         action("https://a-s-k.studio/", "A-S-K.studio", external=True)],
        "".join(local),
        [action(diagrams, fl["label"]), action("https://github.com/" + cfg["repo"], "repository", external=True)])
    return doc


def render_home(tree):
    """The generated home page, at the site root: a short introduction, then one full-panel card per declared
    route, in declared order. Its text and destinations are declared.json's home block; a local route is a site
    path and is linked relative to the page, and an external route opens in a new tab."""
    cfg = tree.cfg
    home = cfg["home"]
    page = tree.home_path()
    cards, local = [], []
    for r in home["routes"]:
        external = bool(urlsplit(r["href"]).scheme)
        href = r["href"] if external else tree.rel(page, r["href"])
        cards.append('<a class="surface-panel" href="%s"%s><span class="surface-panel-title">%s</span>'
                     '<span class="surface-panel-support">%s</span></a>'
                     % (esc(href), ' target="_blank" rel="noopener"' if external else "", esc(r["label"]), esc(r["support"])))
        if not external:
            local.append('          <li><a href="%s">%s</a></li>\n' % (esc(href), esc(r["label"])))
    doc = head_block(tree, page, tree.ident["name"], home["description"], LOCAL_CSS + CHROME_CSS + INDEX_CSS + HOME_CSS, [])
    doc += shell_open(tree, page, None, '      <p class="surface-lede">%s</p>\n' % esc(home["lede"]))
    doc += '<div class="doc-cards">\n' + "\n".join(cards) + "\n</div>\n"
    repo = "https://github.com/" + cfg["repo"]
    doc += shell_close(
        tree, page,
        [action(repo, "repository", external=True), action("https://a-s-k.studio/", "A-S-K.studio", external=True)],
        "      <li data-surface-nav-current>\n        <ul>\n" + "".join(local) + "        </ul>\n      </li>\n",
        [action(repo, "repository", external=True)])
    return doc


# ---------------------------------------------------------------------------
# gates


class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        for k in ("href", "src"):
            if a.get(k) is not None:
                self.refs.append((tag, k, a[k]))
        if a.get("srcset"):
            for v in srcset_urls(a["srcset"]):
                self.refs.append((tag, "srcset", v))


class FrontDoorScan(HTMLParser):
    """The front door's navigation links (<a> and <area>), its other href, src and srcset references, and its
    build-only fragments, with the links' offsets in the authored text.

    A build-only fragment is a <template data-read-build> element. A template's content is inert, so in a clone
    the fragment neither renders nor offers a link; the build composes it into the page."""

    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.text = text
        self.starts = [0]                            # line starts as getpos() counts lines: at "\n" only
        at = text.find("\n")
        while at != -1:
            self.starts.append(at + 1)
            at = text.find("\n", at + 1)
        self.anchors, self.resources, self.fragments, self.problems = [], [], [], []
        self.open_fragment = None

    def position(self):
        line, col = self.getpos()
        return self.starts[line - 1] + col

    def handle_starttag(self, tag, attrs):
        at = self.position()
        raw = self.get_starttag_text()
        a = dict(attrs)
        if tag == "template" and "data-read-build" in a:
            if self.open_fragment is not None:
                self.problems.append("STRUCTURE-FRONT-DOOR  a build-only fragment opens inside another, at offset %d" % at)
            self.open_fragment = (at, at + len(raw))
        elif tag in ("a", "area") and a.get("href") is not None:
            self.anchors.append({"at": at, "raw": raw, "href": a["href"], "build_only": self.open_fragment is not None})
        else:
            for k in ("href", "src"):
                if a.get(k) is not None:
                    self.resources.append((tag, a[k], self.open_fragment is not None))
            if a.get("srcset"):
                self.resources += [(tag, v, self.open_fragment is not None) for v in srcset_urls(a["srcset"])]

    def handle_endtag(self, tag):
        if tag == "template" and self.open_fragment is not None:
            at = self.position()
            close = "</template>"
            if self.text[at:at + len(close)] != close:
                self.problems.append("STRUCTURE-FRONT-DOOR  a build-only fragment must close with %s, at offset %d" % (close, at))
            self.fragments.append((self.open_fragment, (at, at + len(close))))
            self.open_fragment = None

    def finish(self):
        self.close()
        if self.open_fragment is not None:
            self.problems.append("STRUCTURE-FRONT-DOOR  a build-only fragment never closes")
        return self


class AnchorBalance(HTMLParser):
    """Each <a> of a page closes before the next one opens. A build-only fragment may hold a link's opening tag and
    a later fragment its closing tag, so the check reads the composed front door, where both tags must survive."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.open, self.problems = None, []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            if self.open is not None:
                self.problems.append("STRUCTURE-FRONT-DOOR  composed: a link opens on line %d while the link from line %d "
                                     "is still open" % (self.getpos()[0], self.open))
            self.open = self.getpos()[0]

    def handle_endtag(self, tag):
        if tag == "a":
            if self.open is None:
                self.problems.append("STRUCTURE-FRONT-DOOR  composed: a link closes on line %d with no link open" % self.getpos()[0])
            self.open = None

    def finish(self):
        self.close()
        if self.open is not None:
            self.problems.append("STRUCTURE-FRONT-DOOR  composed: the link from line %d never closes" % self.open)
        return self.problems


HREF_ATTR = re.compile(r"""(\shref\s*=\s*)("[^"]*"|'[^']*'|[^\s"'=<>`]+)""")


def front_door_target(fd, href):
    """The repository path a relative href in front door fd names, or None for an external, root-absolute or
    same-page href."""
    parts = urlsplit(href)
    if parts.scheme or parts.netloc or href.startswith(("/", "#")) or not parts.path:
        return None
    return posixpath.normpath(posixpath.join(posixpath.dirname(fd), unquote(parts.path)))


def compose_front_door(tree, fd):
    """The front door as the composed site serves it, from the one authored file, by the declaration's own mapping:
    a link to a declared source file becomes its source view, and a link to a rendered document, example or
    record becomes its page. Every other byte is the authored byte, except that each
    build-only fragment's <template> tags are removed, so its content renders. Returns (composed text, the
    mapping applied as [authored href, composed href, kind], problems), the problems including any link the
    composed page leaves unclosed. A query or #fragment on a mapped link is kept."""
    text = tree.read_bytes(fd).decode("utf-8")
    scan = FrontDoorScan(text)
    scan.feed(text)
    scan.finish()
    problems = list(scan.problems)
    page = tree.site_path(fd)
    sources = {s["path"] for s in tree.cfg["source_views"]}
    edits, mapping = [], []
    for a in scan.anchors:
        if a["build_only"]:
            continue
        target = front_door_target(fd, a["href"])
        if target in sources:
            new, kind = tree.rel(page, tree.source_view_path(target)), "source-view"
        elif target in tree.rendered:
            new, kind = tree.rel(page, tree.page_path(target)), "reading-page"
        else:
            continue
        parts = urlsplit(a["href"])                  # a query or #fragment is kept; the link check verifies the fragment
        new += ("?" + parts.query if parts.query else "") + ("#" + parts.fragment if parts.fragment else "")
        found = list(HREF_ATTR.finditer(a["raw"]))
        if len(found) != 1 or html.unescape(found[0].group(2).strip("\"'")) != a["href"]:
            problems.append("STRUCTURE-FRONT-DOOR  %s: the href to map must be its tag's one href attribute" % a["href"])
            continue
        value = found[0].span(2)
        edits.append((a["at"] + value[0], a["at"] + value[1], '"%s"' % esc(new)))
        mapping.append([a["href"], new, kind])
    for (o0, o1), (c0, c1) in scan.fragments:
        for t0, t1 in ((o0, o1), (c0, c1)):
            line0 = text.rfind("\n", 0, t0) + 1
            line1 = text.find("\n", t1)
            if text[line0:t0].strip() == "" and line1 != -1 and text[t1:line1].strip() == "":
                t0, t1 = line0, line1 + 1               # a tag alone on its line takes the line with it
            edits.append((t0, t1, ""))
    out, at = [], 0
    for e0, e1, rep in sorted(edits):
        out.append(text[at:e0])
        out.append(rep)
        at = e1
    out.append(text[at:])
    composed = "".join(out)
    balance = AnchorBalance()
    balance.feed(composed)
    return composed, mapping, problems + balance.finish()


def authored_navigation_problems(tree, fd):
    """The authored front door, as a clone opens it. Outside a build-only fragment, every relative navigation link
    and every relative resource reference resolves case-exactly in the source tree, no navigation link is
    root-absolute, and the source links name exactly the declared source files. A root-absolute resource, such as
    the deployment-root icons, is served by the site and not checked here."""
    text = tree.read_bytes(fd).decode("utf-8")
    scan = FrontDoorScan(text)
    scan.feed(text)
    scan.finish()
    out, linked = [], set()
    for a in scan.anchors:
        if a["build_only"]:
            continue
        if a["href"].startswith("/"):
            out.append("UNRESOLVED  front door %s: a root-absolute link does not open from a clone" % a["href"])
            continue
        target = front_door_target(fd, a["href"])
        if target is None:
            continue
        if target == ".." or target.startswith("../") or not tree.exists(target):
            out.append("UNRESOLVED  front door %s: no such file in the source tree, so a clone cannot open it; a link "
                       "to a page that exists only after the build belongs in a build-only fragment" % a["href"])
        elif target.endswith(".js"):
            linked.add(target)
    for tag, v, build_only in scan.resources:
        target = None if build_only or v.startswith("/") else front_door_target(fd, v)
        if target is not None and (target == ".." or target.startswith("../") or not tree.exists(target)):
            out.append("UNRESOLVED  front door %s (<%s>): no such file in the source tree, so a clone cannot load it" % (v, tag))
    return out, linked


def authored_source_set_problems(tree, linked):
    """The authored front doors' source links, together, name exactly the declared source files."""
    declared = {s["path"] for s in tree.cfg["source_views"]}
    out = ["STRUCTURE-SOURCE-SET  declared, not linked by the authored front door as its source file: " + p
           for p in sorted(declared - linked)]
    out += ["STRUCTURE-SOURCE-SET  linked by the authored front door, not declared: " + p for p in sorted(linked - declared)]
    return out


def site_target(page, path):
    """The site path a link's path names from a site page, a root-absolute path from the site root."""
    path = unquote(path)
    if path.startswith("/"):
        return posixpath.normpath(path.lstrip("/"))
    return posixpath.normpath(posixpath.join(posixpath.dirname(page), path))


def front_door_sources(tree, fd, front):
    """The composed front door's source routes, read from its relative anchor hrefs through the declared mapping.

    Returns (views, raw, undeclared): the declared source files whose reading view the front door links; the .js
    files it links directly; and the pages it links under the source-view directory that no declared source maps to."""
    fd = tree.site_path(fd)
    by_view = {tree.source_view_path(s["path"]): s["path"] for s in tree.cfg["source_views"]}
    view_dir = posixpath.dirname(tree.source_view_path("x")) + "/"
    p = LinkCollector()
    p.feed(front)
    views, raw, undeclared = set(), set(), set()
    for tag, k, v in p.refs:
        parts = urlsplit(v)
        if tag not in ("a", "area") or k != "href" or parts.scheme or parts.netloc or not parts.path:
            continue
        target = site_target(fd, parts.path)
        if target in by_view:
            views.add(by_view[target])
        elif target.startswith(view_dir):
            undeclared.add(target)
        elif target.endswith(".js"):
            raw.add(tree.site_prefix() + target)
    return views, raw, undeclared


def source_set_problems(tree, composed):
    """The composed front doors, together, link exactly the declared source views, each through its reading view.
    composed: {front door: composed text}."""
    declared = {s["path"] for s in tree.cfg["source_views"]}
    views, raw, undeclared = set(), set(), set()
    for fd, front in composed.items():
        v, r, u = front_door_sources(tree, fd, front)
        views |= v
        raw |= r
        undeclared |= u
    out = ["STRUCTURE-SOURCE-SET  declared, not linked by the composed front door: %s (reading view %s)" % (p, tree.source_view_path(p))
           for p in sorted(declared - views)]
    out += ["STRUCTURE-SOURCE-SET  linked by the composed front door, not declared: " + p for p in sorted((raw - declared) | undeclared)]
    out += ["STRUCTURE-SOURCE-SET  linked by the composed front door as a raw file, where its reading view is required: " + p
            for p in sorted(raw & declared)]
    for s in tree.cfg["source_views"]:
        for key in ("path", "figure"):
            if not tree.exists(s[key]):
                out.append("UNRESOLVED  source view %s: no such file" % s[key])
    return out


def carrier_problems(tree):
    """Every carrier the declaration records matches its declared identity: the register files vendored for the
    reading pages, and the token, panel, action and shell mirrors they reuse from the site, all from one owner
    commit (carriers.pin)."""
    problems = []
    for kind in ("vendored", "reused"):
        for c in tree.cfg["carriers"][kind]:
            if not tree.exists(c["path"]):
                problems.append("STRUCTURE-CARRIER  %s carrier %s: missing" % (kind, c["path"]))
            elif sha256(tree.read_bytes(c["path"])) != c["sha256"]:
                problems.append("STRUCTURE-CARRIER  %s carrier %s: its bytes differ from declared.json (%s); re-vendor "
                                "the reading-page carriers together, from one owner commit" % (kind, c["path"], c["sha256"][:12]))
    return problems


def render_all(tree):
    """Every generated file in memory, keyed by site-relative path, plus the report and every gate failure."""
    report, out = {}, {}
    for d in (tree.cfg["documents"] + [e for c in tree.collections for e in c["entries"]]
              + tree.cfg.get("records", [])):
        out[tree.page_path(d["path"])] = render_document(tree, d, report).encode("utf-8")
    for s in tree.cfg["source_views"]:
        out[tree.source_view_path(s["path"])] = render_source(tree, s).encode("utf-8")
    out[tree.index_path()] = render_index(tree, report).encode("utf-8")
    if not tree.home_page:
        out[tree.home_path()] = render_home(tree).encode("utf-8")
    for c in tree.cfg["carriers"]["vendored"]:
        if tree.exists(c["path"]):
            out[tree.carrier_path(c["owner_path"])] = tree.read_bytes(c["path"])
    problems = []
    for doc, r in sorted(report.items()):
        for subject, _, kind in r["findings"] + r["links"] + r["images"]:
            if kind.startswith(GATE_PREFIXES):
                problems.append("%s  %s -> %s" % (kind, doc, subject))
    return out, report, problems


def site_files(tree):
    """The authored site: every file in the site directory except hidden files and directories and the declared
    exclusions, as {site path: repo path}."""
    base = tree.abspath(tree.site)
    files = {}
    for dp, dns, fns in os.walk(base):
        rel_dir = os.path.relpath(dp, base).replace(os.sep, "/")
        pre = tree.site_prefix() + ("" if rel_dir == "." else rel_dir + "/")
        dns[:] = sorted(d for d in dns if not d.startswith(".") and not tree.is_excluded(pre + d + "/"))
        for fn in sorted(fns):
            if fn in IGNORED_FILES or fn.startswith("."):
                continue
            site = fn if rel_dir == "." else rel_dir + "/" + fn
            repo = tree.site_prefix() + site
            if not tree.is_excluded(repo):
                files[site] = repo
    return files


def link_problems(tree, site):
    """Link and anchor check over the generated pages, the home page (generated or authored), and each front door of
    a composed site. Returns (problems, warnings, counts, pages read)."""
    read_root = os.path.join(site, tree.read)
    site_root = os.path.normpath(site)
    pages = {}
    targets = [os.path.join(dp, fn) for dp, _, fns in os.walk(read_root) for fn in fns if fn.endswith(".html")]
    if tree.home_path() not in {tree.site_path(fd) for fd in tree.front_doors}:   # a front door is added below
        targets.append(os.path.join(site, *tree.home_path().split("/")))
    for fd in tree.front_doors:
        targets.append(os.path.join(site, *tree.site_path(fd).split("/")))
    for p in sorted(targets):
        c = LinkCollector()
        with open(p, encoding="utf-8") as f:
            c.feed(f.read())
        pages[os.path.normpath(p)] = c
    gh_prefix = "https://github.com/%s/blob/%s/" % (tree.cfg["repo"], tree.cfg["branch"])
    problems, warnings, counts = [], [], {}

    def count(kind):
        counts[kind] = counts.get(kind, 0) + 1

    def ids_of(path):
        if path not in pages:
            c = LinkCollector()
            with open(path, encoding="utf-8") as f:
                c.feed(f.read())
            pages[path] = c
        return pages[path].ids

    fronts = {tree.site_path(fd) for fd in tree.front_doors}
    for page, c in sorted(pages.items()):
        rel_page = os.path.relpath(page, site).replace(os.sep, "/")
        for tag, attr, v in c.refs:
            parts = urlsplit(v)
            if parts.scheme in ("http", "https"):
                if v.startswith(gh_prefix) and parts.fragment:
                    repo_path = unquote(parts.path[len(urlsplit(gh_prefix).path):])
                    if not tree.exists(repo_path):
                        problems.append("%s: %s -> no such repository file" % (rel_page, v))
                    elif unquote(parts.fragment) not in tree.heading_ids(repo_path):
                        problems.append("%s: %s -> no such heading on GitHub" % (rel_page, v))
                    else:
                        count("github-anchor-ok")
                else:
                    count("external")
                continue
            if parts.scheme:
                count("other-scheme")
                continue
            if v.startswith("#"):
                if unquote(v[1:]) in c.ids:
                    count("in-page-anchor-ok")
                else:
                    problems.append("%s: %s -> no such id in this page" % (rel_page, v))
                continue
            if v.startswith("/"):
                target = os.path.normpath(os.path.join(site, unquote(parts.path).lstrip("/")))
            else:
                target = os.path.normpath(os.path.join(os.path.dirname(page), unquote(parts.path)))
            base = os.path.commonpath([target, site_root])      # given by the operator; below it, compare case-exactly
            below = os.path.relpath(target, base)
            outside = not (target == site_root or target.startswith(site_root + os.sep))
            if outside and rel_page in fronts:
                problems.append("%s: %s -> leaves the site, so the deployment does not serve it" % (rel_page, v))
                continue
            if outside:
                warnings.append("%s: %s -> outside the site root, so the deployment does not serve it" % (rel_page, v))
                count("WARNING-outside-site")
                continue
            if not exists_exact(base, [] if below == "." else below.split(os.sep)):
                problems.append("%s: %s -> missing file" % (rel_page, v))
                continue
            if os.path.isdir(target) and not os.path.isfile(os.path.join(target, "index.html")):
                problems.append("%s: %s -> a directory with no index.html" % (rel_page, v))
                continue
            if parts.fragment:
                if target.endswith(".md"):
                    problems.append("%s: %s -> fragment into a raw Markdown file" % (rel_page, v))
                    continue
                if not target.endswith(".html") or unquote(parts.fragment) not in ids_of(target):
                    problems.append("%s: %s -> no such id in the target page" % (rel_page, v))
                    continue
            count("cross-page-anchor-ok" if parts.fragment else "relative-ok")
        if rel_page in fronts:
            for tag, attr, v in c.refs:
                parts = urlsplit(v)
                if tag in ("a", "area") and not parts.scheme and not parts.netloc and parts.path.endswith(".md"):
                    target = site_target(rel_page, parts.path)
                    if (tree.site_prefix() + target) in tree.rendered:
                        problems.append("%s: %s -> a rendered document linked as raw Markdown" % (rel_page, v))
    return problems, warnings, counts, len(pages)


def physical(path):
    """The location a write to path actually reaches: every existing component resolved through any symlink, in
    order, so an alias and a '..' after it are followed as the filesystem follows them, and the nonexistent
    remainder appended as spelled."""
    return os.path.realpath(path)


def within(path, base):
    """True when the physical location of path is base or sits below it, compared by file identity rather than
    spelling: on a case-insensitive volume DOCS/read and docs/read name the same directory. path need not exist.
    Its physical location's nearest existing ancestor, and that ancestor's parents, are compared with base; once
    every existing component is resolved, each parent is a physical parent, so an alias cannot step outside the
    comparison. A base that does not exist yet contains nothing, so the result is then False: build() makes the
    output exist before it compares a report with it (report_overlap)."""
    if not os.path.exists(base):
        return False
    probe = physical(path)
    while not os.path.exists(probe):
        parent = os.path.dirname(probe)
        if parent == probe:
            return False
        probe = parent
    while True:
        if os.path.samefile(probe, base):
            return True
        parent = os.path.dirname(probe)
        if parent == probe:
            return False
        probe = parent


def report_overlap(out, report):
    """A report that is the output, lies inside it or contains it is refused. While the output does not exist yet,
    spelling cannot settle that: a case-insensitive volume equates names by its own Unicode tables. So the output's
    missing directories are created, the report is compared with the output by file identity (within), and the
    directories are removed again, deepest first, before anything is staged."""
    created = []
    try:
        missing, probe = [], out
        while not os.path.lexists(probe):
            missing.append(probe)
            probe = os.path.dirname(probe)
        for d in reversed(missing):
            os.mkdir(d)
            created.append(d)
        overlap = within(report, out) or within(out, report)
    except OSError as e:
        return ["STRUCTURE-OUT  %s: cannot create the output location to compare the report with it (%s)" % (out, e)]
    finally:
        for d in reversed(created):
            os.rmdir(d)
    if overlap:
        return ["STRUCTURE-OUT  report %s is the output, inside it or above it: the report and the published site "
                "never overlap" % report]
    return []


def in_excluded_dir(tree, path):
    """True when path lands inside a directory the declaration excludes from the site. An excluded directory that
    does not exist yet, such as the build's own output before its first build, is matched by its physical path,
    case-exactly, so a differently spelled path is not excused."""
    probe = physical(path)
    for x in tree.excluded:
        if not x.endswith("/"):
            continue
        base = tree.abspath(x.rstrip("/"))
        if within(path, base):
            return True
        spelled = physical(base)
        if probe == spelled or probe.startswith(spelled + os.sep):
            return True
    return False


def in_authored_site(tree, path):
    """True when path lands inside the site directory and outside every directory the declaration excludes from it."""
    if not within(path, tree.abspath(tree.site)):
        return False
    return not in_excluded_dir(tree, path)


def out_problems(tree, out):
    """out, the physical destination build() stages beside and publishes to, is a fresh directory outside the
    authored tree."""
    root = physical(tree.root)
    git = os.path.join(tree.root, ".git")
    if within(root, out):
        return ["STRUCTURE-OUT  %s is the source tree or contains it" % out]
    if in_authored_site(tree, out) or within(out, git):
        return ["STRUCTURE-OUT  %s is inside the site directory or .git: the output never lands in the authored site" % out]
    if os.path.lexists(out) and (not os.path.isdir(out) or os.listdir(out)):
        return ["STRUCTURE-OUT  %s already exists and is not an empty directory; remove it first" % out]
    return []


def write_report(tree, path, out, report, digest, copied, mapping):
    classes = {}
    for doc, r in sorted(report.items()):
        for _, _, kind in r["links"] + r["images"]:
            classes[kind] = classes.get(kind, 0) + 1
    data = {"format": PAGE_FORMAT, "digest": digest, "copied": len(copied) - len(tree.front_doors), "front_door_mapping": mapping,
            "generated": {k: sha256(v) for k, v in sorted(out.items())}, "classes": classes,
            "documents": {doc: {"links": [list(x) for x in r["links"]], "images": [list(x) for x in r["images"]],
                                "headings": [list(h) for h in r["headings"]]} for doc, r in sorted(report.items())}}
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
        f.write("\n")


def fail(mode, problems, written="nothing published"):
    print("%s: FAIL (%d problems; %s)" % (mode, len(problems), written))
    for p in problems:
        print("  " + p)
    return 1


def build(tree, out, report_path=None, mode="build"):
    problems = config_problems(tree)
    if problems:
        return fail(mode, problems)
    out = physical(out)                          # checked, staged beside and published to: one resolved path
    problems = out_problems(tree, out)
    if report_path:
        report_path = physical(report_path)
        if in_authored_site(tree, report_path) or within(report_path, os.path.join(tree.root, ".git")):
            problems.append("STRUCTURE-OUT  report %s is inside the site directory or .git: the report is never "
                            "written into the authored site" % report_path)
        if not problems:                         # out has passed its own guard, so its location may be created
            problems = report_overlap(out, report_path)
    if problems:
        return fail(mode, problems)
    generated, report, problems = render_all(tree)
    fronts, mapping, fd_problems, linked = {}, [], [], set()
    for fd in tree.front_doors:
        text, m, fdp = compose_front_door(tree, fd)
        nav, lk = authored_navigation_problems(tree, fd)
        fronts[fd] = text
        mapping += m
        fd_problems += fdp + nav
        linked |= lk
    problems = (fd_problems + authored_source_set_problems(tree, linked) + source_set_problems(tree, fronts)
                + carrier_problems(tree) + problems)
    if problems:
        return fail(mode, problems)
    parent = os.path.dirname(out)
    try:
        os.makedirs(parent, exist_ok=True)
        staging = tempfile.mkdtemp(prefix=".read-build-", dir=parent)
    except OSError as e:
        return fail(mode, ["STRUCTURE-OUT  %s: cannot stage beside it (%s)" % (out, e)])
    try:
        authored = site_files(tree)
        front_sites = {tree.site_path(fd): fd for fd in tree.front_doors}
        composed = {}
        for site, repo in sorted(authored.items()):
            if site.startswith(tree.read + "/"):
                problems.append("STRUCTURE-SOURCE-MIRROR  %s would be overwritten by generated pages" % repo)
                continue
            dest = os.path.join(staging, *site.split("/"))
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            if site in front_sites:                  # a composed authored file: its mapped links
                expected = fronts[front_sites[site]].encode("utf-8")
                with open(dest, "wb") as f:
                    f.write(expected)
            else:
                expected = tree.read_bytes(repo)
                shutil.copyfile(tree.abspath(repo), dest)
            with open(dest, "rb") as f:
                data = f.read()
            if data != expected:
                problems.append("STRUCTURE-COPY  %s differs from its source after copying" % site)
            composed[site] = data
        for site, data in sorted(generated.items()):
            if site in composed:
                problems.append("STRUCTURE-COLLISION  %s is both an authored file and a generated one" % site)
                continue
            dest = os.path.join(staging, *site.split("/"))
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as f:
                f.write(data)
            composed[site] = data
        if problems:
            return fail(mode, problems)
        bad, warnings, counts, pages = link_problems(tree, staging)
        if bad:
            return fail(mode, ["LINK  " + p for p in bad])
        digest = tree_digest(composed)
        if os.path.isdir(out):
            os.rmdir(out)                        # empty, checked by out_problems
        os.rename(staging, out)
        staging = None
    finally:
        if staging and os.path.isdir(staging):
            shutil.rmtree(staging)
    if report_path:
        write_report(tree, report_path, generated, report, digest, authored, mapping)
    if len(tree.front_doors) == 1:
        doors = "the front door composed"
    else:
        doors = "%d front doors composed" % len(tree.front_doors)
    print("%s: OK  %d authored files copied byte for byte and %s (%d links mapped), %d generated "
          "(%d pages, %d carriers) -> %s"
          % (mode, len(authored) - len(tree.front_doors), doors, len(mapping), len(generated),
             len(generated) - len(tree.cfg["carriers"]["vendored"]), len(tree.cfg["carriers"]["vendored"]), out))
    print("%s: links checked on %d pages: %s%s" % (mode, pages, json.dumps(counts, sort_keys=True),
                                                   "; %d warnings" % len(warnings) if warnings else ""))
    for w in warnings:
        print("  WARNING " + w)
    print("%s: digest %s" % (mode, digest))
    return 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("mode", choices=["build", "check", "links"])
    ap.add_argument("--root", default=DEFAULT_ROOT)
    ap.add_argument("--out", help="build: the directory to write the composed site to")
    ap.add_argument("--site", help="links: a composed site to check")
    ap.add_argument("--report", help="build: after a successful build, write a JSON report of pages, link classes and headings")
    a = ap.parse_args(argv)
    bad = pin_problems()
    if bad:
        print("read_gen.py: PIN-MISMATCH  %s; install tools/read/requirements.txt (nothing run)" % "; ".join(bad), file=sys.stderr)
        return 2
    root = os.path.abspath(a.root)
    tree = Tree(load_cfg(root), root)
    if a.mode == "build":
        if not a.out:
            ap.error("build needs --out")
        return build(tree, a.out, a.report)
    if a.mode == "check":
        tmp = tempfile.mkdtemp(prefix="read-check-")
        try:
            return build(tree, os.path.join(tmp, "site"), mode="check")
        finally:
            shutil.rmtree(tmp)
    if not a.site:
        ap.error("links needs --site")
    problems = config_problems(tree)
    if problems:
        return fail("links", problems, "nothing read")
    bad, warnings, counts, pages = link_problems(tree, os.path.abspath(a.site))
    print(json.dumps({"pages": pages, "counts": counts, "warnings": warnings, "problems": bad}, indent=1))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
