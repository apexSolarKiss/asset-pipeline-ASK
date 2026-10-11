"""Render a review artifact: one semantic source plus its review record,
sealed as one self-contained HTML file on design-system-ASK's Class B
output-artifact contract, with review presentation drawn in the Review
Semantics composition.

Usage contract: docs/application/review-artifact-rendering.md.

The renderer converts the source mechanically and authors no statement.
Every review mark, basis value, note and decision record comes from the
record; the renderer only places it. It never infers authority from
wording, an actor or a color. It refuses source Markdown it does not
represent and any record row it cannot place exactly.

Subcommands:

    render       source + record + config + design-system checkout -> sealed HTML
                 and a build record (<out>.build.json)
    check        checks of a rendered artifact against its source, record,
                 configuration and build record: identities, title, header,
                 body and colophon fidelity, every annotation's content,
                 pairing and exact place, and sealed delivery; with
                 --design-system it also renders again and compares every byte
    probe        rendered layout probe in headless Chrome (desktop and narrow,
                 light and dark), bound to the file's bytes
    owner-check  design-system-ASK's role-conformance checker, run from a
                 checkout whose tools/ is the build's commit, bound to the
                 file's bytes
    manifest     compose the artifact's MANIFEST from its build record, check
                 result and reports, refusing any that describe other bytes

Usage:

    python scripts/render_review_artifact.py render --source S.md \\
        --record R.md --artifact XX --config C.json \\
        --design-system DS_CHECKOUT --commit SHA --out OUT.html
    python scripts/render_review_artifact.py check --source S.md \\
        --record R.md --artifact XX --config C.json --out OUT.html \\
        [--design-system DS_CHECKOUT] [--json CHECKS.json]
    python scripts/render_review_artifact.py probe --out OUT.html [--json P.json]
    python scripts/render_review_artifact.py owner-check --out OUT.html \\
        --design-system DS_CHECKOUT [--json O.json]
    python scripts/render_review_artifact.py manifest --out OUT.html \\
        --checks CHECKS.json [--report REPORT.json ...] [--note LABEL=TEXT ...] \\
        --manifest M.md

Exit code: 0 on success; 1 when a check fails, the source or record
cannot be placed, or evidence does not describe the output; 2 on a usage
error.
"""

from __future__ import annotations

import argparse
import base64
import collections
import datetime as _dt
import difflib
import hashlib
import html
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Callable

E = html.escape

# ---------------------------------------------------------------- owner inputs
FOUNDATION = "colors_and_type.css"
FONTS = ("InterVariable.woff2", "InterVariable-Italic.woff2",
         "JetBrainsMono.woff2", "JetBrainsMono-Italic.woff2")
REGISTER = ("surface-panel.css", "surface-text-link.css",
            "surface-document.css", "surface-treatments.css")
SEMANTIC = ("spectral-state.css", "evidence-state.css", "review-semantics.css")
TEMPLATE = "patterns/output-artifact/static-output-artifact.html"
TIER3_MARK = "    /* ====================================================================\n       TIER 3 OVERLAY SLOT"
BANNER = "/* === SEALED design-system-ASK "

# ---------------------------------------------------------------- vocabulary
WORDS = {
    "review": {"proposed": ("Proposed", "Correction requested"), "open": ("Open question",),
               "accepted": ("Accepted",), "declined": ("Declined",),
               "none": ("No decision recorded",)},
    "evidence": {"supported": ("Supported",), "partially-supported": ("Partially supported",),
                 "unresolved": ("Unresolved",), "weakened": ("Weakened",)},
    "state": {r: (r.capitalize(),) for r in ("earned", "structural", "partial", "deflated",
                                             "held", "external", "proposed", "neutral")},
}
PENDING = ("proposed", "open")
# Fields a shown decision carries, split on " · ": what, who, scope (an open
# question: what, who decides). For a passage the quoted words stand for "what".
MIN_FIELDS = {"accepted": 3, "declined": 3, "none": 2, "open": 2}
ORDER = {"state": 0, "basis": 1, "evidence": 2, "review": 3, "check": 4}
ITEMS = set(ORDER) | {"statement"}
SHOW = ("used", "always")
SEP = " · "

LOCAL_CSS = """    /* ---------- Figures: this artifact's own geometry ---------- */
    .review-figures {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      align-items: start;
      gap: var(--space-5) var(--space-4);
      margin: 0;
    }
    .review-figures--four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .review-figures > figure { margin: 0; display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
    .review-figures img { display: block; width: 100%; height: auto; border-radius: var(--radius-sm); }
    @media (max-width: 640px) {
      .review-figures, .review-figures--four { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-4) var(--space-3); }
    }
    .review-figref { white-space: nowrap; }

"""


class RecordError(Exception):
    """The source or record cannot be placed exactly."""


def sha(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def words(t: str) -> list:
    return re.findall(r"\S+", t)


# ================================================================ Markdown subset
def split_row(line: str) -> list:
    """Cells of a Markdown table row; '\\|' is a literal pipe."""
    body = line.strip()
    body = body[1:] if body.startswith("|") else body
    body = body[:-1] if body.endswith("|") and not body.endswith("\\|") else body
    return [c.strip().replace("\\|", "|") for c in re.split(r"(?<!\\)\|", body)]


SEPARATOR = re.compile(r":?-+:?")


def key_regex(cfg: dict) -> re.Pattern:
    return re.compile(r"<!-- (" + cfg.get("key_pattern", r"[A-Z]+-[0-9.]+") + r") -->")


INLINE_REFUSED = [
    (r"(?<!~)~[^~\s][^~]*~(?!~)", "single-tilde strikethrough"),
    (r"\[[^\]]*\]\([^)]*\)", "a Markdown link"),
    (r"\[[^\]]*\]\[|\[\^", "a reference link or footnote"),
    (r"<", "raw HTML or an autolink"),
    (r"&#?\w+;", "an HTML entity"),
    (r"~~", "strikethrough"),
    (r"__|(?<![\w_])_(?=\S)[^_]*?(?<=\S)_(?![\w_])", "underscore emphasis"),
    (r"\\(?!\|)[!-/:-@\[-`{-~]", "a backslash escape"),
]


def check_inline(t: str, where: str, keyre: re.Pattern, cell: bool = False) -> None:
    """Refuse inline Markdown this renderer does not represent."""
    if not cell and "\\|" in t:
        raise RecordError(f"{where}: '\\|' outside a table is a backslash escape in Markdown")
    for k in keyre.finditer(t):
        if t[:k.start()].count("`") % 2:
            raise RecordError(f"{where}: a statement key inside a code span")
    for m in re.finditer(r"<!--.*?-->|<!--", t):
        if not keyre.fullmatch(m.group(0)):
            raise RecordError(f"{where}: an HTML comment that is not a statement key: {m.group(0)[:40]!r}")
    if re.search(r"(?:^|\s)\*\*(?:\s|$)", re.sub(r"`[^`]*`", "", keyre.sub("", t))):
        raise RecordError(f"{where}: '**' with spaces on both sides is literal text in Markdown, not bold")
    if re.search(r"`[^`]*\*\*[^`]*`", keyre.sub("", t)):
        raise RecordError(f"{where}: bold markers inside a code span are not supported")
    rest = re.sub(r"`[^`]*`", "", keyre.sub("", t))
    for m in re.finditer(r"\*\*(.+?)\*\*", rest):
        if m.group(1)[0].isspace() or m.group(1)[-1].isspace():
            raise RecordError(f"{where}: '**' that does not touch its words is literal text in Markdown, not bold")
    if re.search(r"(?<![\w])_(?=\S)", rest):
        raise RecordError(f"{where}: an underscore at the start of a word can open emphasis in Markdown")
    if "](" in rest or re.search(r"https?://|www\.", rest, re.I):
        raise RecordError(f"{where}: a link or a bare URL, which Markdown readers show as a link")
    for pattern, name in INLINE_REFUSED:
        if re.search(pattern, rest):
            raise RecordError(f"{where}: {name} is not supported")
    if rest.count("`"):
        raise RecordError(f"{where}: an unclosed code span")
    if rest.count("**") % 2:
        raise RecordError(f"{where}: an unclosed bold span")
    if "*" in rest.replace("**", ""):
        raise RecordError(f"{where}: single-asterisk emphasis is not supported")


@dataclass
class Block:
    type: str                     # p | ul | ol | table
    text: str = ""
    items: list = field(default_factory=list)
    start: int = 1
    lead: str = ""
    head: list = field(default_factory=list)
    rows: list = field(default_factory=list)
    open: bool = True
    delimited: bool | None = None


@dataclass
class Source:
    title: str
    meta: list
    sections: list                # [{"title": str | None, "blocks": [Block]}]
    units: list                   # [[section, block, address, text]]
    segments: dict                # key -> [[unit, start, end]]


def parse_source(text: str, cfg: dict) -> Source:
    keyre = key_regex(cfg)
    lines = text.split("\n")
    if not lines or not lines[0].startswith("# "):
        raise RecordError("the source opens with a '# ' title line")
    title, i, meta = lines[0][2:], 1, []
    while i < len(lines) and lines[i].strip() == "":
        i += 1
    while i < len(lines) and re.match(r"^\*\*[^*]+:\*\* ", lines[i]):
        k, v = re.match(r"^\*\*([^*]+):\*\* (.*)$", lines[i]).groups()
        meta.append((k, v))
        i += 1
    if re.search(r"\*|`", title):
        raise RecordError("title: markup in the title is not supported")
    for where, t in [("title", title)] + [(f"header {k}", v) for k, v in meta]:
        check_inline(t, where, keyre)
        if figure_codes(cfg) is not None and figure_codes(cfg).search(t):
            raise RecordError(f"{where}: a figure reference outside body text")
        if keyre.search(t):
            raise RecordError(f"{where}: a statement key outside the body")
    sections = [{"title": None, "blocks": []}]
    lead_re = re.compile(r"^((?:" + keyre.pattern + r")+)(\|.*)$")
    prev = ""
    for where, t in [("title", title)] + [(f"header {k}", f"{k} {v}") for k, v in meta]:
        if DIRECTION.search(t):
            raise RecordError(f"{where}: a direction mark, override, embedding or isolate reorders what a reader sees")
    if re.search(r"[ \t]#+[ \t]*$", title):
        raise RecordError("title: a closing '#' sequence is not shown by Markdown; remove it")
    codes = figure_codes(cfg)
    for n, ln in enumerate(lines[i:], start=i + 1):
        where = f"source line {n}"
        last, prev = prev, ln
        if re.search("[\u202a-\u202e\u2066-\u2069\u200e\u200f\u061c]", ln):
            raise RecordError(f"{where}: a direction override, embedding or isolate reorders what a reader sees; remove it")
        if codes is not None:
            one = cfg["figures"]["id_pattern"]
            for jm in re.finditer("`(?:" + one + ")`\\s*(?:[-\u2013\u2014]|to)\\s*`(?:" + one + ")`", ln):
                if not codes.fullmatch(jm.group(0)):
                    raise RecordError(f"{where}: two figure references joined by a dash or 'to' read as a range; write a "
                                      f"range as `A`{cfg['figures'].get('range', '–')}`B`")
        if ln.strip() == "---" and last.strip() and not last.startswith("|"):
            raise RecordError(f"{where}: '---' directly under text is a heading in Markdown; leave a blank line before it")
        if ln.startswith("## "):
            check_inline(ln[3:], where, keyre)
            if re.search(r"[ \t]#+[ \t]*$", ln):
                raise RecordError(f"{where}: a closing '#' sequence is not shown by Markdown; remove it")
            if codes is not None and codes.search(ln):
                raise RecordError(f"{where}: a figure reference in a section heading; reference figures in body text")
            if keyre.search(ln):
                raise RecordError(f"{where}: a statement key in a section heading; put it at the start of a paragraph, list item or table cell")
            sections.append({"title": ln[3:], "blocks": []})
            continue
        blocks = sections[-1]["blocks"]
        if blocks and blocks[-1].open and blocks[-1].type == "p" and re.fullmatch(r"(?:=+|-+)[ \t]*", ln) and ln.strip() != "---":
            raise RecordError(f"{where}: a line of dashes or equals signs directly under text makes it a heading in Markdown")
        if ln.strip() in ("", "---"):
            if blocks:
                blocks[-1].open = False
            continue
        behind = re.sub("^(?:" + keyre.pattern + ")+", "", ln)
        if behind != ln and re.match(r"^(#|>|\* |\+ |- |\d+[.)] |```|~~~|\s|\[[^\]]+\]:|\|)", behind) and not lead_re.match(ln):
            raise RecordError(f"{where}: Markdown block syntax behind a statement key: {ln[:50]!r}")
        if re.fullmatch(r" {0,3}([-_*])(?:[ \t]*\1){2,}[ \t]*", ln) and ln.strip() != "---":
            raise RecordError(f"{where}: a thematic break other than '---'")
        if re.match(r"^(?:-|\d+\.)\t", ln):
            raise RecordError(f"{where}: a tab after a list marker")
        if re.match(r"^(#|>|\*[ \t]|\+[ \t]|```|~~~|\s|\d+\)[ \t]|\[[^\]]+\]:)", ln):
            raise RecordError(f"{where}: unsupported Markdown (heading level, quotation, '*', '+' or '1)' list, "
                              f"code fence, link definition, or indented line): {ln[:50]!r}")
        lead = ""
        m = lead_re.match(ln)
        if m:
            lead, ln = m.group(1), m.group(m.lastindex)
        table_open = bool(blocks and blocks[-1].type == "table" and blocks[-1].open)
        if table_open and blocks[-1].delimited and not ln.startswith("|"):
            raise RecordError(f"{where}: a line directly after a table continues it in Markdown; leave a blank line")
        if blocks and blocks[-1].open and blocks[-1].type == "p" and re.match(r"^\d+\. ", ln) and not ln.startswith("1. ") and not lead:
            raise RecordError(f"{where}: a numbered item not starting at 1 directly under a paragraph continues it in Markdown; "
                              "leave a blank line")
        if table_open and blocks[-1].delimited is False:
            if not (ln.startswith("|") and not lead and all(SEPARATOR.fullmatch(c) for c in split_row(ln))):
                raise RecordError(f"{where}: a table's header row is followed by its delimiter row (|---|)")
            if len(split_row(ln)) != len(blocks[-1].head):
                raise RecordError(f"{where}: the delimiter row has {len(split_row(ln))} cells, the header {len(blocks[-1].head)}")
            blocks[-1].delimited = True
            continue
        if ln.startswith("|") and blocks and blocks[-1].open and blocks[-1].type in ("ul", "ol"):
            raise RecordError(f"{where}: a table directly under a list item continues that item in Markdown; leave a blank line")
        if ln.startswith("|"):
            cells = split_row(ln)
            for c in cells:
                check_inline(c, where, keyre, cell=True)
            if table_open:
                if lead:
                    raise RecordError(f"{where}: a statement key before a table row that is not the first; "
                                      "put the key in a cell")
                if all(SEPARATOR.fullmatch(c) for c in cells):
                    raise RecordError(f"{where}: a delimiter row inside a table")
                if len(cells) != len(blocks[-1].head):
                    raise RecordError(f"{where}: a table row has {len(cells)} cells, its header {len(blocks[-1].head)}")
                blocks[-1].rows.append(cells)
            else:
                if not keyre.sub("", cells[0]).strip():
                    raise RecordError(f"{where}: a table's first heading is empty; it names the table for screen readers")
                blocks.append(Block("table", lead=lead, head=cells, delimited=False))
            continue
        if table_open and blocks[-1].delimited is False:
            raise RecordError(f"{where}: a table's header row is followed by its delimiter row (|---|)")
        check_inline(ln, where, keyre)
        if re.fullmatch(r"(?:- |\d+\. )\s*", ln + " ") or ln.rstrip() == "-":
            raise RecordError(f"{where}: an empty list item")
        if re.match(r"^0+\. ", ln):
            raise RecordError(f"{where}: a numbered list starting at 0")
        item = re.match(r"^(?:- |\d+\. )(.*)$", ln)
        if item:
            inner = re.sub("^(?:" + keyre.pattern + ")+", "", item.group(1))
            if re.match(r"^(?:#|>|\*[ \t]|\+[ \t]|-[ \t]|\d+[.)][ \t]|```|~~~|\s|\[[ xX]\][ \t])", inner):
                raise RecordError(f"{where}: Markdown block syntax or a task box inside a list item: {ln[:50]!r}")
        kind = "ul" if ln.startswith("- ") else "ol" if re.match(r"^\d+\. ", ln) else None
        if kind and blocks and blocks[-1].type == kind and not blocks[-1].open:
            raise RecordError(f"{where}: a blank line between list items makes one loose list in Markdown; remove the "
                              "blank line, or separate the lists with a paragraph")
        if ln.startswith("- "):
            if blocks and blocks[-1].type == "ul" and blocks[-1].open:
                blocks[-1].items.append(ln[2:])
            else:
                blocks.append(Block("ul", items=[ln[2:]]))
        elif re.match(r"^\d+\. ", ln):
            num, t = re.match(r"^(\d+)\. (.*)$", ln).groups()
            if blocks and blocks[-1].type == "ol" and blocks[-1].open:
                blocks[-1].items.append(t)
            else:
                blocks.append(Block("ol", items=[t], start=int(num)))
        else:
            if blocks and blocks[-1].open and blocks[-1].type in ("p", "ul", "ol"):
                raise RecordError(f"{where}: a paragraph continues a block on the next line; keep each "
                                  "paragraph on one line and separate blocks with a blank line")
            blocks.append(Block("p", text=ln))
        for b in blocks[:-1]:
            b.open = False
    for sec in sections:
        for b in sec["blocks"]:
            if b.type == "table" and not b.delimited:
                raise RecordError(f"a table headed {b.head[:2]} has no delimiter row")
    units = []
    for si, sec in enumerate(sections):
        for bi, b in enumerate(sec["blocks"]):
            if b.type == "p":
                units.append([si, bi, ("p",), b.text])
            elif b.type in ("ul", "ol"):
                units += [[si, bi, ("li", n), t] for n, t in enumerate(b.items)]
            else:
                if b.lead:
                    units.append([si, bi, ("lead",), b.lead])
                units += [[si, bi, ("th", c), t] for c, t in enumerate(b.head)]
                for r, row in enumerate(b.rows):
                    units += [[si, bi, ("td", r, c), t] for c, t in enumerate(row)]
    # A key at the start of a unit owns text to the next key at a unit start,
    # or to the section end. A key inside a unit owns text to the end of that
    # unit, or to the next key; ownership then returns to the unit's owner.
    segments, seen, owner = {}, set(), None
    for ui, (si, _bi, _addr, t) in enumerate(units):
        if ui and units[ui - 1][0] != si:
            owner = None
        pos, base, cur = 0, owner, owner
        for h in keyre.finditer(t):
            if h.start() and not t[h.start() - 1].isspace() and keyre.sub("", t[:h.start()]).strip():
                raise RecordError(f"statement key {h.group(1)} sits inside a word; put it before the word")
            if cur and h.start() > pos:
                segments.setdefault(cur, []).append([ui, pos, h.start()])
            k = h.group(1)
            if k in seen:
                raise RecordError(f"duplicate statement key {k}")
            seen.add(k)
            if keyre.sub("", t[:h.start()]).strip() == "":
                base = k
            cur, pos = k, h.end()
        if cur and pos < len(t):
            segments.setdefault(cur, []).append([ui, pos, len(t)])
        elif cur:
            segments.setdefault(cur, [])
        owner = base
    return Source(title, meta, sections, units, segments)


# ================================================================ record
GLOSS_HEAD = ["entry", "words", "gloss", "show"]
ROW_HEAD = ["key", "applies to", "item", "mark", "words", "value"]


def parse_record(text: str, section: str) -> tuple[list, list]:
    """(glosses, rows) from the record's review-marks section. Any other table there is an error."""
    if "<!--" in text or re.search(r"^ {0,3}(```|~~~|<)", text, re.M):
        raise RecordError("the record holds an HTML comment, raw HTML or a code fence, which a Markdown reader would hide "
                          "or show differently; remove it")
    lines = text.split("\n")
    for i in range(1, len(lines)):
        if re.fullmatch(r" {0,3}(?:=+|-+)[ \t]*", lines[i]) and lines[i - 1].strip() and not lines[i - 1].lstrip().startswith("|"):
            raise RecordError(f"the record has a setext heading ({lines[i - 1][:40]!r}); use '#' headings only")
    name = re.escape(section)
    norm = " ".join(section.split()).lower()
    fold = lambda h: visible_form(re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", re.sub(r"[*_`\\]", "", html.unescape(h)))).lower()
    forms = [h for h in re.findall(r"^ {0,3}#{1,6}[ \t]+(.*?)[ \t#]*$", text, re.M) if fold(h) == norm]
    found = list(re.finditer(r"^## " + name + r"[ \t]*$", text, re.M))
    if len(found) != 1 or len(forms) != 1:
        raise RecordError(f"record section '## {section}' must occur exactly once, as that heading; found {len(forms)}")
    m = found[0]
    nxt = re.search(r"^ {0,3}#{1,2}[ \t]|^.+\n {0,3}(?:=+|-+)[ \t]*$", text[m.end():], re.M)
    body = text[m.end(): m.end() + nxt.start()] if nxt else text[m.end():]
    if DIRECTION.search(body):
        raise RecordError("the record section holds a direction mark, override, embedding or isolate")
    if re.search(r"<[A-Za-z/!?]", body) or re.search(r"^ {0,3}>", body, re.M):
        raise RecordError("the record section holds inline HTML or a quotation, which a Markdown reader would show differently")
    tables, cur = [], None
    for ln in body.split("\n"):
        if ln.startswith("|"):
            cells = split_row(ln)
            if cur is None:
                cur = {"head": [c.lower() for c in cells], "rows": [], "delimited": None}
                tables.append(cur)
            elif cur["delimited"] is None:
                cur["delimited"] = all(SEPARATOR.fullmatch(c) for c in cells)
                if not cur["delimited"]:
                    raise RecordError(f"a record table headed {cur['head'][:2]} has no delimiter row, so Markdown shows it as text")
            elif not all(SEPARATOR.fullmatch(c) for c in cells):
                cur["rows"].append(cells)
        elif ln.lstrip().startswith("|"):
            raise RecordError(f"an indented table row in the record section: {ln[:60]!r}")
        elif cur is not None and ln.strip():
            raise RecordError(f"a line inside a record table is not a '|' row (end a table with a blank line): {ln[:60]!r}")
        else:
            cur = None
    kinds = [t["head"] for t in tables]
    if kinds.count(GLOSS_HEAD) > 1 or kinds.count(ROW_HEAD) > 1:
        raise RecordError("the record section holds a second key or annotation table")
    glosses, rows = [], []
    for t in tables:
        if t["head"] == GLOSS_HEAD:
            for r in t["rows"]:
                if len(r) != 4 or r[3] not in SHOW:
                    raise RecordError(f"key-table row needs 4 cells and Show 'used' or 'always': {r}")
                glosses.append(dict(zip(["entry", "words", "gloss", "show"], r)))
        elif t["head"] == ROW_HEAD:
            for r in t["rows"]:
                if len(r) != 6:
                    raise RecordError(f"annotation row has {len(r)} cells, expected 6: {r}")
                rows.append(dict(zip(["key", "applies", "item", "mark", "words", "value"], r)))
        else:
            raise RecordError(f"a table in the record section has an unknown header (a blank line inside a "
                              f"table also starts a new one): {t['head']}")
    if not rows:
        raise RecordError("no annotation table (| Key | Applies to | Item | Mark | Words | Value |) in the record section")
    return glosses, rows


def validate_row(row: dict, cfg: dict) -> None:
    item, mark, words_, value = row["item"], row["mark"], row["words"], row["value"]
    where = f"{row['key']} / {row['applies']} / {item}"
    if not (re.fullmatch(cfg.get("key_pattern", r"[A-Z]+-[0-9.]+"), row["key"])
            or re.fullmatch(r"[A-Z]+-\*", row["key"])):
        raise RecordError(f"{where}: the key does not match the key pattern")
    if item not in ITEMS:
        raise RecordError(f"{where}: unknown item '{item}'")
    if item in WORDS:
        roles = WORDS[item]
        if mark not in roles:
            raise RecordError(f"{where}: '{mark}' is not a {item} role this renderer draws")
        if words_ not in roles[mark]:
            raise RecordError(f"{where}: '{words_}' is not the owner's wording for {item} {mark}")
    elif mark:
        raise RecordError(f"{where}: a {item} item takes no mark")
    if item in ("basis", "statement") and words_:
        raise RecordError(f"{where}: a {item} item takes no words")
    if item == "check" and not words_:
        raise RecordError(f"{where}: a check item names the check in Words")
    if item in ("basis", "statement", "check") and not value:
        raise RecordError(f"{where}: a {item} item needs a value")
    if item == "basis":
        allowed = cfg.get("basis_values")
        if allowed is None:
            raise RecordError(f"{where}: basis rows need the configuration's declared basis_values")
        if value not in allowed:
            raise RecordError(f"{where}: basis value '{value}' is outside the declared set {allowed}")


def check_fields(row: dict, quoted: bool) -> None:
    if row["item"] != "review":
        return
    need = MIN_FIELDS.get(row["mark"], 0) - (1 if quoted else 0)
    fields = [f for f in row["value"].split(SEP) if f.strip()] if row["value"] else []
    if len(fields) < need:
        raise RecordError(f"{row['key']} / {row['applies']}: a shown '{row['words']}' needs {need} fields separated "
                          f"by ' · ' ({'who · scope' if quoted else 'what · who · scope'}); got {fields}")


# ================================================================ inline text
def figure_codes(cfg: dict):
    f = cfg.get("figures")
    if not f:
        return None
    one = f["id_pattern"]
    return re.compile("`(" + one + ")`(?:" + re.escape(f.get("range", "–")) + "`(" + one + ")`)?")


def expand_range(a: str, b: str | None) -> list:
    if not b:
        return [a]
    ma, mb = re.match(r"^(\D*)(\d+)$", a), re.match(r"^(\D*)(\d+)$", b)
    if not (ma and mb and ma.group(1) == mb.group(1) and int(mb.group(2)) > int(ma.group(2))):
        raise RecordError(f"figure range {a}–{b} is not an ascending range of one prefix")
    width = len(ma.group(2))
    ids = [f"{ma.group(1)}{n:0{width}d}" for n in range(int(ma.group(2)), int(mb.group(2)) + 1)]
    if ids[-1] != b:
        raise RecordError(f"figure range {a}–{b}: its end is not written like its start")
    return ids


def protected(t: str, codere) -> list:
    """Spans a passage boundary may not fall inside: bold pairs, code spans, figure references."""
    spans = [(m.start(), m.end()) for m in re.finditer(r"\*\*.+?\*\*", t)]
    spans += [(m.start(), m.end()) for m in re.finditer(r"`[^`]*`", t)]
    if codere is not None:
        spans += [(m.start(), m.end()) for m in codere.finditer(t)]
    return spans


def visible_form(t: str) -> str:
    """Text as a reader compares it: normalized, without invisible characters, every kind of space one space."""
    t = ODD_SPACE.sub(" ", unicodedata.normalize("NFKC", t))
    return " ".join(words(IGNORABLE.sub("", CONTROL.sub("", t))))


def plain(t: str, keyre: re.Pattern, figno: dict, codere) -> str:
    """The words a reader sees for a span of source Markdown."""
    t = keyre.sub("", t)
    if codere is not None:
        def code(m):
            ids = expand_range(m.group(1), m.group(2))
            if ids[0] not in figno or ids[-1] not in figno:
                raise RecordError(f"figure {ids[0]} is not numbered")
            return f"fig. {figno[ids[0]]}" if len(ids) == 1 else f"figs. {figno[ids[0]]}–{figno[ids[-1]]}"
        t = codere.sub(code, t)
    return t.replace("**", "").replace("`", "")


# ================================================================ rendering
class Renderer:
    def __init__(self, src: Source, glosses: list, rows: list, artifact: str, cfg: dict,
                 read_ds: Callable[[str], bytes], commit: str, commit_date: str,
                 figure_reader: Callable[[str], bytes] | None):
        self.src, self.cfg, self.artifact = src, cfg, artifact
        self.glosses = glosses
        declared = cfg.get("artifacts")
        for r in rows:
            if not (re.fullmatch(cfg.get("key_pattern", r"[A-Z]+-[0-9.]+"), r["key"])
                    or re.fullmatch(r"[A-Z]+-\*", r["key"])):
                raise RecordError(f"{r['key']}: the key does not match the key pattern")
            if declared is not None and r["key"].split("-")[0] not in declared:
                raise RecordError(f"{r['key']}: the key's artifact prefix is not among the declared artifacts {declared}")
        for k in ("meta_before", "colophon"):
            for pair in cfg.get(k, []):
                if any(DIRECTION.search(str(x)) for x in pair):
                    raise RecordError(f"configuration {k}: a direction mark, override, embedding or isolate")
                if figure_codes(cfg) is not None and figure_codes(cfg).search(str(pair[-1])):
                    raise RecordError(f"configuration {k}: a figure reference outside body text")
        if not re.fullmatch(r"[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*", cfg.get("lang", "en")):
            raise RecordError(f"configuration lang {cfg.get('lang')!r} is not a language tag")
        self.rows = [r for r in rows if r["key"].split("-")[0] == artifact]
        for r in self.rows:
            validate_row(r, cfg)
        if not self.rows:
            raise RecordError(f"the record has no row for artifact {artifact}")
        self.read_ds, self.commit, self.commit_date = read_ds, commit, commit_date
        self.figure_reader = figure_reader
        self.keyre = key_regex(cfg)
        self.codere = figure_codes(cfg)
        self.figcfg = cfg.get("figures") or {}
        self.deps, self.figs_log, self.applied = {}, [], []
        self.note_seq = 0
        self.figno, self.figs_by_block = {}, {}

    # ------------------------------------------------------------ anchors
    def unit_body(self, ui: int) -> tuple[int, int]:
        t = self.src.units[ui][3]
        stripped = self.keyre.sub(lambda m: " " * len(m.group(0)), t)
        return len(stripped) - len(stripped.lstrip()), len(stripped.rstrip())

    def covers_unit(self, ui: int, a: int, b: int) -> bool:
        ua, ub = self.unit_body(ui)
        t = self.src.units[ui][3]
        return self.keyre.sub("", t[ua:a]).strip() == "" and self.keyre.sub("", t[b:ub]).strip() == ""

    def resolve(self, key: str, applies: str):
        """('doc',) | ('blocks', si, b0, b1) | ('unit', ui) | ('passage', ui, a, b)."""
        if key.endswith("-*"):
            if applies != "whole":
                raise RecordError(f"{key}: a whole-artifact row applies to 'whole'")
            return ("doc",)
        if key not in self.src.segments:
            raise RecordError(f"{key}: no such statement key in the source")
        units = self.src.units
        segs = [s for s in self.src.segments[key] if self.keyre.sub("", units[s[0]][3][s[1]:s[2]]).strip()]
        if not segs:
            raise RecordError(f"{key}: the key owns no text")
        if applies == "whole":
            if not all(self.covers_unit(*s) for s in segs):
                raise RecordError(f"{key}: 'whole' covers part of a unit; name the exact words as a passage")
            uis = [s[0] for s in segs]
            si = {units[u][0] for u in uis}
            if len(si) != 1:
                raise RecordError(f"{key}: 'whole' crosses a section boundary")
            si = si.pop()
            blocks = sorted({units[u][1] for u in uis})
            if blocks != list(range(blocks[0], blocks[-1] + 1)):
                raise RecordError(f"{key}: 'whole' covers non-adjacent blocks")
            whole_blocks = all({u for u, x in enumerate(units) if x[0] == si and x[1] == b
                                and self.keyre.sub("", x[3]).strip()} <= set(uis) for b in blocks)
            if whole_blocks:
                return ("blocks", si, blocks[0], blocks[-1])
            if len(uis) == 1:
                return self.check_unit(key, ("unit", uis[0]))
            raise RecordError(f"{key}: 'whole' covers several units without their whole block; name a passage or one unit")
        if not (len(applies) > 2 and applies[0] == applies[-1] == '"'):
            raise RecordError(f"{key}: 'Applies to' is whole or an exact passage in double quotes")
        passage = applies[1:-1]
        found = []
        for ui, a, b in segs:
            t = units[ui][3]
            p = t.find(passage, a)
            while p != -1 and p + len(passage) <= b:
                found.append((ui, p))
                p = t.find(passage, p + 1)
        if len(found) != 1:
            raise RecordError(f"{key}: the passage must occur exactly once in the key's text; found {len(found)}: {passage[:70]!r}")
        ui, p = found[0]
        q = p + len(passage)
        t = units[ui][3]
        nfc = lambda x: unicodedata.normalize("NFC", x)
        nfkc = lambda x: unicodedata.normalize("NFKC", x)
        joins = re.compile("[\u200d\ufe0e\ufe0f\u20e3\U0001F3FB-\U0001F3FF\U000E0020-\U000E007F]")
        regional = lambda c: "\U0001F1E6" <= c <= "\U0001F1FF"
        cut = lambda i: 0 < i < len(t) and (joins.match(t[i]) or t[i - 1] == "\u200d" or (regional(t[i - 1]) and regional(t[i])))
        if (p < len(t) and unicodedata.combining(t[p])) or (q < len(t) and unicodedata.combining(t[q])) or \
                cut(p) or cut(q) or any(norm(t[:p]) + norm(t[p:q]) + norm(t[q:]) != norm(t) for norm in (nfc, nfkc)):
            raise RecordError(f"{key}: the passage starts or ends inside an accented character: {passage[:60]!r}")
        for x, y in protected(units[ui][3], self.codere):
            if x < p < y or x < q < y:
                raise RecordError(f"{key}: the passage starts or ends inside bold, code or a figure reference: {passage[:60]!r}")
        if self.covers_unit(ui, p, q):
            return self.check_unit(key, ("unit", ui))
        self.check_unit(key, ("unit", ui))
        return ("passage", ui, p, q)

    def check_unit(self, key: str, anchor: tuple) -> tuple:
        if self.src.units[anchor[1]][2][0] in ("th", "lead"):
            raise RecordError(f"{key}: a table heading cannot carry an annotation")
        return anchor

    def plan(self) -> dict:
        """Resolve every row of this artifact. Shared by render and check."""
        units = self.src.units
        groups = {}
        for r in self.rows:
            groups.setdefault((r["key"], r["applies"]), []).append(r)
        plan = {"doc": [], "entries": {}, "unit_rows": {}, "unit_tail": {}, "marks": {}, "passages": [], "applied": []}
        for (key, applies), rows in groups.items():
            anchor = self.resolve(key, applies)
            carrier = None
            if anchor[0] == "passage":
                pend = [r for r in rows if r["item"] == "review" and r["mark"] in PENDING]
                shown = self.ordered(rows)
                carrier = pend[0] if pend else next((r for r in shown if r["item"] == "review"), shown[0] if shown else None)
            for r in rows:
                check_fields(r, quoted=r is carrier)
            plan["applied"].append({"key": key, "applies": applies, "anchor": anchor[0],
                                    "items": [f"{r['item']}:{r['mark']}" if r["mark"] else r["item"] for r in rows]})
            if anchor[0] == "doc":
                plan["doc"] += rows
                continue
            if anchor[0] == "blocks":
                plan["entries"].setdefault(anchor[1:], []).append((rows, None))
                continue
            ui = anchor[1]
            si, bi, addr = units[ui][0], units[ui][1], units[ui][2]
            if anchor[0] == "unit":
                if addr[0] == "p":
                    plan["entries"].setdefault((si, bi, bi), []).append((rows, None))
                else:
                    plan["unit_rows"].setdefault(ui, []).extend(rows)
                continue
            _, ui, a, b = anchor
            pending = [r for r in rows if r["item"] == "review" and r["mark"] in PENDING]
            if len(pending) > 1:
                raise RecordError(f"{key}: one passage carries one pending review mark")
            rest = rows
            if pending:
                for (x, y, _role, _nid) in plan["marks"].get(ui, []):
                    if a < y and x < b:
                        raise RecordError(f"{key}: a pending passage overlaps another one: {applies[:60]}")
                self.note_seq += 1
                nid = f"review-note-{self.note_seq}"
                plan["marks"].setdefault(ui, []).append((a, b, pending[0]["mark"], nid))
                plan["passages"].append({"ui": ui, "a": a, "b": b, "role": pending[0]["mark"], "nid": nid,
                                         "rows": [r for r in rows if r["item"] != "statement"], "pending": pending[0],
                                         "quote": self.quote_of(ui, a, b, full=False)})
                rest = [r for r in rows if r["item"] == "statement"]
                quote = None
            else:
                quote = self.quote_of(ui, a, b, full=True)
                shown = visible_form(plain(units[ui][3], self.keyre, self.figno, self.codere))
                quoted = visible_form(plain(units[ui][3][a:b], self.keyre, self.figno, self.codere))
                if len(re.findall("(?=" + re.escape(quoted) + ")", shown)) != 1:
                    raise RecordError(f"{key}: the quoted words occur more than once in the text the row follows, so a "
                                      f"reader could not tell which; quote a longer passage: {applies[:60]}")
            if rest:
                if addr[0] == "p":
                    plan["entries"].setdefault((si, bi, bi), []).append((rest, quote))
                else:
                    plan["unit_tail"].setdefault(ui, []).append((rest, quote))
        multi = sorted(k for k in plan["entries"] if k[1] != k[2])
        for x, y in zip(multi, multi[1:]):
            if x[0] == y[0] and y[1] <= x[2]:
                raise RecordError(f"annotation scopes overlap in section {x[0]}: blocks {x[1]}–{x[2]} and {y[1]}–{y[2]}")
        plan["inner"], plan["outer"] = {}, {}
        for k, v in plan["entries"].items():
            host = None if k[1] != k[2] else next((m for m in multi if m[0] == k[0] and m[1] <= k[1] <= m[2]), None)
            if host:
                plan["inner"][(k[0], k[1])] = v
            else:
                plan["outer"][k] = v
        return plan

    # ------------------------------------------------------------ items
    def item_html(self, row: dict, quote: str | None = None) -> str:
        item, value = row["item"], row["value"]
        meta = value
        if quote is not None:
            meta = f"on “{quote}”" + (SEP + value if value else "")
        meta_html = f'<span class="doc-meta">{E(meta, quote=False)}</span>' if meta else ""
        if item == "basis":
            return f'<span class="doc-annotation-item"><span class="doc-label">Basis</span>{meta_html}</span>'
        if item == "check":
            meta = (f"on “{quote}”" + SEP if quote is not None else "") + row["words"] + SEP + value
            return (f'<span class="doc-annotation-item"><span class="doc-label">Check</span>'
                    f'<span class="doc-meta">{E(meta, quote=False)}</span></span>')
        return (f'<span class="doc-annotation-item"><span class="doc-mark doc-label" data-{item}="{row["mark"]}">'
                f'{E(row["words"], quote=False)}</span>{meta_html}</span>')

    @staticmethod
    def ordered(rows: list) -> list:
        return sorted((r for r in rows if r["item"] != "statement"), key=lambda r: ORDER[r["item"]])

    def row_items(self, rows: list, quote: str | None = None) -> list:
        """[(row, quote-or-None)] in display order. A quoted row names its words once: on its
        review item, where they stand for the decision's "what", or else on its first item."""
        items = self.ordered(rows)
        if not items:
            return []
        quoted = next((r for r in items if r["item"] == "review"), items[0]) if quote is not None else None
        return [(r, quote if r is quoted else None) for r in items]

    def row_html(self, rows: list, quote: str | None = None, inline: bool = False) -> str:
        items = self.row_items(rows, quote)
        if not items:
            return ""
        tag = "span" if inline else "div"
        return f'<{tag} class="doc-annotations">' + "".join(self.item_html(r, q) for r, q in items) + f"</{tag}>"

    def statements_html(self, rows: list) -> str:
        return "".join(f'<p class="doc-meta review-statement">{E(r["value"], quote=False)}</p>'
                       for r in rows if r["item"] == "statement")

    @staticmethod
    def note_rows(p: dict) -> list:
        own = dict(p["pending"], value=f"on “{p['quote']}”" + (SEP + p["pending"]["value"] if p["pending"]["value"] else ""))
        return [r for r in p["rows"] if r is not p["pending"]] + [own]

    def note_html(self, p: dict) -> str:
        return (f'<div class="doc-hierarchy doc-group doc-annotation-note" id="{p["nid"]}">'
                + self.row_html(self.note_rows(p)) + "</div>")

    def quote_of(self, ui: int, a: int, b: int, full: bool) -> str:
        """A pending passage is tinted and points to its note, so its note may shorten the quote.
        A row that is not tied to tinted words quotes them in full."""
        ws = words(plain(self.src.units[ui][3][a:b], self.keyre, self.figno, self.codere))
        limit = self.cfg.get("quote_words", 8)
        return " ".join(ws) if full or len(ws) <= limit else " ".join(ws[:limit]) + "…"

    # ------------------------------------------------------------ inline Markdown
    def inline(self, t: str, marks: list) -> str:
        """marks: [(start, end, role, note id)], non-overlapping, in source offsets of t."""
        ins, opens = [], {}
        for n, (a, b, role, nid) in enumerate(marks):
            # at one position a close is inserted after an open, so it lands before it
            ins.append((a, 0, f"\ue000{n}\ue000"))
            ins.append((b, 1, "\ue001"))
            opens[str(n)] = f'<mark class="doc-passage-mark" data-review="{role}" aria-describedby="{nid}">'
        for pos, _order, s in sorted(ins, key=lambda x: (-x[0], x[1])):
            t = t[:pos] + s + t[pos:]
        t = self.keyre.sub("", t)
        if self.codere is not None:
            def code(m):
                ids = expand_range(m.group(1), m.group(2))
                if ids[0] not in self.figno or ids[-1] not in self.figno:
                    raise RecordError(f"figure {ids[0]} is referenced outside body text")
                n0, n1 = self.figno[ids[0]], self.figno[ids[-1]]
                if [self.figno[c] for c in ids] != list(range(n0, n0 + len(ids))):
                    raise RecordError(f"figure range {m.group(0)} covers figures that are not numbered consecutively; list them")
                label = f"fig. {n0}" if len(ids) == 1 else f"figs. {n0}–{n1}"
                return f"\ue002{label}\ue003{n0}\ue004"
            t = self.codere.sub(code, t)
            for span in re.finditer(r"`([^`]*)`", t):
                if re.search(self.figcfg["id_pattern"], span.group(1)):
                    raise RecordError(f"an unresolved figure identifier: {span.group(0)[:60]!r}")
        t = E(t, quote=False)
        t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
        t = re.sub(r"`([^`]+)`", r'<code class="doc-code">\1</code>', t)
        t = re.sub("\ue002(.*?)\ue003(\\d+)\ue004", r'<a class="surface-text-link review-figref" href="#fig-\2">\1</a>', t)
        t = re.sub("\ue000(\\d+)\ue000", lambda m: opens[m.group(1)], t)
        t = t.replace("\ue001", "</mark>")
        if re.search("[\ue000-\ue0ff]", t):
            raise RecordError(f"an internal marker survived inline conversion: {t[:80]!r}")
        return t

    # ------------------------------------------------------------ figures
    def number_figures(self) -> None:
        if self.codere is None:
            return
        for si, sec in enumerate(self.src.sections):
            for bi, b in enumerate(sec["blocks"]):
                texts = [b.text] + b.items + [b.lead] + b.head + [c for r in b.rows for c in r]
                new = []
                for t in texts:
                    for m in self.codere.finditer(t or ""):
                        for c in expand_range(m.group(1), m.group(2)):
                            if c not in self.figno:
                                self.figno[c] = len(self.figno) + 1
                                new.append(c)
                if new:
                    self.figs_by_block[(si, bi)] = new

    def figure_grid(self, ids: list) -> str:
        if self.figure_reader is None or "entries" not in self.figcfg:
            raise RecordError("the source references figures but no figure manifest was given")
        man = self.figcfg["entries"]
        out = []
        for c in ids:
            if c not in man:
                raise RecordError(f"figure {c} is not in the figure manifest")
            f = man[c]
            data = self.figure_reader(c)
            digest = sha(data)
            if digest != f["sha256"]:
                raise RecordError(f"figure {c}: payload hash {digest} does not match its manifest")
            n = self.figno[c]
            self.figs_log.append({"id": c, "fig": n, "sha256": digest, "bytes": len(data),
                                  "pixels": f"{f['width']}x{f['height']}", "media_type": f["media_type"],
                                  **{k: v for k, v in f.items() if k in ("source", "source_sha256", "how")}})
            out.append(f'<figure id="fig-{n}"><img src="data:{f["media_type"]};base64,'
                       f'{base64.b64encode(data).decode("ascii")}" width="{f["width"]}" height="{f["height"]}" '
                       f'alt="Fig. {n}"><figcaption class="caption">Fig. {n}</figcaption></figure>')
        mod = " review-figures--four" if len(ids) >= 4 else ""
        return f'<div class="review-figures{mod}">' + "".join(out) + "</div>"

    # ------------------------------------------------------------ seal
    def dep(self, rel: str) -> bytes:
        b = self.read_ds(rel)
        self.deps[rel] = {"sha256": sha(b), "bytes": len(b)}
        return b

    def sealed_css(self) -> tuple[str, str]:
        short = self.commit[:7]
        css = self.dep(FOUNDATION).decode("utf-8")
        for fn in FONTS:
            uri = "data:font/woff2;base64," + base64.b64encode(self.dep("fonts/" + fn)).decode("ascii")
            css, n = re.subn(r"src:[^;]*fonts/" + re.escape(fn) + r"[^;]*;",
                             lambda _m: "src: url('" + uri + "') format('woff2');", css, flags=re.S)
            if n != 1:
                raise RecordError(f"font {fn} is referenced {n} times in {FOUNDATION}, expected once")
        if re.search(r"url\((?!['\"]?data:)", css):
            raise RecordError("a URL other than an embedded font survived in the foundation")
        self.foundation_sha = sha(css.encode("utf-8"))
        parts = [f"{BANNER}{FOUNDATION} (upstream {short}) + base64 fonts === */\n{css}"]
        for m in REGISTER + SEMANTIC:
            parts.append(f"{BANNER}{m} (upstream {short}, verbatim) === */\n{self.dep(m).decode('utf-8')}")
        tpl = self.dep(TEMPLATE).decode("utf-8")
        overlay = re.search(r"<style>\n(.*?)\n  </style>", tpl, flags=re.S)
        if not overlay or overlay.group(1).count(TIER3_MARK) != 1:
            raise RecordError("the template's overlay or its Tier 3 slot was not found exactly once")
        overlay = overlay.group(1).replace(TIER3_MARK, LOCAL_CSS + TIER3_MARK)
        self.overlay_sha = sha(overlay.encode("utf-8"))
        return "\n".join(parts), overlay

    # ------------------------------------------------------------ assemble
    def render(self, rendered_at: str) -> str:
        self.number_figures()
        plan = self.plan()
        self.applied = plan["applied"]
        units = self.src.units
        block_notes, unit_notes = {}, {}
        for p in sorted(plan["passages"], key=lambda q: (q["ui"], q["a"])):
            u = units[p["ui"]]
            target = block_notes.setdefault((u[0], u[1]), []) if u[2] == ("p",) else unit_notes.setdefault(p["ui"], [])
            target.append(self.note_html(p))

        def rows_html(entry_list) -> str:
            whole = [r for rs, q in entry_list if q is None for r in rs]
            out = self.row_html(whole)
            out += "".join(self.row_html(rs, quote=q) for rs, q in entry_list if q is not None)
            out += "".join(self.statements_html(rs) for rs, _q in entry_list)
            return out

        def unit_html(tag: str, ui: int) -> str:
            body = self.inline(units[ui][3], sorted(plan["marks"].get(ui, [])))
            whole = plan["unit_rows"].get(ui, [])
            tails = plan["unit_tail"].get(ui, [])
            stm = self.statements_html(whole) + "".join(self.statements_html(rs) for rs, _q in tails)
            notes = "".join(unit_notes.get(ui, []))
            if tag == "td":
                # an item in a cell sits in the cell, as the owner's composition places it
                inline = self.row_html(whole, inline=True) + "".join(self.row_html(rs, quote=q, inline=True) for rs, q in tails)
                text = body + (" " + inline if inline else "")
                if not (notes or stm):
                    return f'<td class="doc-body">{text}</td>'
                return f'<td><p class="doc-body">{text}</p>{notes}{stm}</td>'
            # a list item's text is a block; its row and notes follow it inside the item
            rows = self.row_html(whole) + "".join(self.row_html(rs, quote=q) for rs, q in tails)
            if not (rows or notes or stm):
                return f'<li class="doc-body">{body}</li>'
            return f'<li><p class="doc-body">{body}</p>{rows}{notes}{stm}</li>'

        def block_body(si: int, bi: int, b: Block) -> str:
            base = [ui for ui, u in enumerate(units) if u[0] == si and u[1] == bi]
            if b.type == "p":
                return f'<p class="doc-body">{self.inline(b.text, sorted(plan["marks"].get(base[0], [])))}</p>'
            if b.type in ("ul", "ol"):
                st = f' start="{b.start}"' if b.type == "ol" and b.start != 1 else ""
                return (f'<div class="doc-prose"><{b.type}{st}>' + "".join(unit_html("li", ui) for ui in base)
                        + f"</{b.type}></div>")
            if b.lead and self.keyre.sub("", b.lead).strip():
                raise RecordError("table lead text is not supported")
            head = [ui for ui in base if units[ui][2][0] == "th"]
            cells = {units[ui][2][1:]: ui for ui in base if units[ui][2][0] == "td"}
            hd = "".join(f'<th class="doc-label" scope="col">{self.inline(units[ui][3], [])}</th>' for ui in head)
            bd = "".join("<tr>" + "".join(unit_html("td", cells[(r, c)]) for c in range(len(row))) + "</tr>"
                         for r, row in enumerate(b.rows))
            name = html.unescape(re.sub(r"<[^>]+>", "", self.inline(b.head[0], [])))
            return (f'<div class="doc-table-scroll" role="region" aria-label="{E(name)}" tabindex="0">'
                    f'<table class="doc-table"><thead><tr>{hd}</tr></thead><tbody>{bd}</tbody></table></div>')

        def figures(si: int, bi: int) -> str:
            return self.figure_grid(self.figs_by_block[(si, bi)]) if (si, bi) in self.figs_by_block else ""

        sections = []
        for si, sec in enumerate(self.src.sections):
            parts, bi, blocks = [], 0, sec["blocks"]
            while bi < len(blocks):
                span = next((k for k in plan["outer"] if k[0] == si and k[1] == bi), None)
                b0, b1 = (span[1], span[2]) if span else (bi, bi)
                inner = ""
                for x in range(b0, b1 + 1):
                    # a block, its own row, the group's row after the last block, then notes, then figures
                    inner += block_body(si, x, blocks[x]) + rows_html(plan["inner"].get((si, x), []))
                    if x == b1 and span:
                        inner += rows_html(plan["outer"][span])
                    inner += "".join(block_notes.get((si, x), [])) + figures(si, x)
                parts.append(f'<div class="doc-group">{inner}</div>' if span or block_notes.get((si, b0)) else inner)
                bi = b1 + 1
            body = "\n      ".join(parts)
            if sec["title"] is None:
                if body:
                    sections.append(f'    <section class="doc-section">\n      {body}\n    </section>')
            else:
                sections.append(f'    <section class="doc-section">\n      <h2 class="doc-section-title">'
                                f'{self.inline(sec["title"], [])}</h2>\n      {body}\n    </section>')

        sealed, overlay = self.sealed_css()
        meta_pairs = [tuple(x) for x in self.cfg.get("meta_before", [])] + list(self.src.meta)
        meta = "".join(f'<div><dt class="doc-label">{E(k)}:</dt><dd class="doc-meta">{self.inline(v, [])}</dd></div>'
                       for k, v in meta_pairs)
        doc_row = self.row_html(plan["doc"]) + self.statements_html(plan["doc"])
        colophon = "".join(f'\n        <dt class="doc-label">{E(k)}</dt>\n        <dd class="doc-meta">{E(v, quote=False)}</dd>'
                           for k, v in self.cfg.get("colophon", []))
        self.rendered_at = rendered_at
        return f"""<!doctype html>
<html lang="{E(self.cfg.get('lang', 'en'))}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{E(self.src.title)}</title>
  <style>
{sealed}
  </style>
  <style>
{overlay}
  </style>
</head>
<body>
  <main class="artifact doc-flow">

    <header class="doc-titled">
      <h1 class="doc-title">{E(self.src.title)}</h1>
    </header>

    <dl class="meta">{meta}</dl>
    {doc_row}

{self.key_html()}

{chr(10).join(sections)}

    <footer class="provenance" id="provenance">
      <dl>
        <dt class="doc-label">design-system-ASK</dt>
        <dd class="doc-meta">commit <code class="doc-code">{self.commit[:7]}</code> · {self.commit_date}</dd>{colophon}
      </dl>
    </footer>

  </main>
</body>
</html>
"""

    def key_html(self) -> str:
        used = {f"{r['item']}:{r['mark']}" if r["item"] in WORDS else r["item"] for r in self.rows}
        rows = []
        for g in self.glosses:
            entry = g["entry"]
            facet_role = entry.split(":", 1)
            if not (entry in ("basis", "check") or (len(facet_role) == 2 and facet_role[1] in WORDS.get(facet_role[0], {}))):
                raise RecordError(f"key entry '{entry}' is not basis, check or a facet:role the renderer draws")
            if not (g["show"] == "always" or entry in used):
                continue
            if ":" in entry:
                facet, role = entry.split(":", 1)
                if g["words"] not in WORDS.get(facet, {}).get(role, ()):
                    raise RecordError(f"key entry {entry}: '{g['words']}' is not the owner's wording")
                cell = f'<span class="doc-mark doc-label" data-{facet}="{role}">{E(g["words"])}</span>'
            else:
                cell = f'<span class="doc-label">{E(g["words"])}</span>'
            rows.append(f'<tr><td class="doc-body">{cell}</td><td class="doc-body">{E(g["gloss"], quote=False)}</td></tr>')
        if not rows:
            return ""
        heading = self.cfg.get("key_heading", "Marks in this review copy")
        return (f'    <section class="doc-section" id="marks">\n      <h2 class="doc-section-title">{E(heading)}</h2>\n'
                f'      <div class="doc-table-scroll" role="region" aria-label="{E(heading)}" tabindex="0">'
                f'<table class="doc-table"><thead><tr><th class="doc-label" scope="col">Mark</th>'
                f'<th class="doc-label" scope="col">In this copy</th></tr></thead><tbody>{"".join(rows)}</tbody></table></div>\n'
                f'    </section>')


# ================================================================ reading a page back
VOID = {"img", "meta", "br", "hr", "link", "input", "wbr", "source", "area", "base", "col", "embed", "param", "track"}
# Unicode default-ignorable code points: drawn as nothing, or reordering what is drawn
IGNORABLE = re.compile("[\u00ad\u034f\u061c\u115f\u1160\u17b4\u17b5\u180b-\u180f\u200b-\u200f\u202a-\u202e\u2060-\u206f\u3164\ufe00-\ufe0f\ufeff\uffa0\ufff0-\ufff8\U0001bca0-\U0001bca3\U0001d173-\U0001d17a\U000e0000-\U000e0fff]")
# spaces other than the ordinary one, which a browser may draw narrow or keep from breaking
ODD_SPACE = re.compile("[\xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]")
CONTROL = re.compile("[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]")
# characters that change what is shown or how it reads without being words: allowed only where the inputs have them
INVISIBLE = re.compile("|".join(x.pattern for x in (IGNORABLE, ODD_SPACE, CONTROL)))


def image_size(data: bytes) -> tuple | None:
    """(width, height) read from a PNG's or JPEG's own header, or None."""
    if data[:8] == b"\x89PNG\r\n\x1a\n" and data[12:16] == b"IHDR":
        return int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big")
    if data[:2] == b"\xff\xd8":
        sof = (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF)
        segments = sof + (0xC4, 0xCC, 0xDB, 0xDD, 0xFE) + tuple(range(0xE0, 0xF0))
        i = 2
        while i < len(data):
            if data[i] != 0xFF:
                return None
            while i < len(data) and data[i] == 0xFF:
                i += 1
            if i + 2 >= len(data):
                return None
            marker = data[i]
            if marker not in segments:
                return None
            length = int.from_bytes(data[i + 1:i + 3], "big")
            if length < 2 or i + 1 + length > len(data):
                return None
            if marker in sof:
                return (int.from_bytes(data[i + 6:i + 8], "big"), int.from_bytes(data[i + 4:i + 6], "big")) if length >= 8 else None
            i += 1 + length
    return None


class Node:
    __slots__ = ("tag", "attrs", "kids", "parent", "line")

    def __init__(self, tag: str, attrs: dict, parent, line: int):
        self.tag, self.attrs, self.kids, self.parent, self.line = tag, attrs, [], parent, line

    def cls(self) -> frozenset:
        return frozenset(c for c in ASCII_SPACE.split(self.attrs.get("class") or "") if c)

    def els(self) -> list:
        return [k for k in self.kids if isinstance(k, Node)]

    def text(self) -> str:
        return "".join(k if isinstance(k, str) else k.text() for k in self.kids)


class Tree(HTMLParser):
    """The page as a tree. What a browser would build differently from the tag order is refused: an implicit,
    missing or misnested end tag, a repeated attribute, a declaration other than the doctype, a marked section,
    a processing instruction and a comment."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = self.cur = Node("#root", {}, None, 0)
        self.errors, self.doctype = [], False

    def handle_decl(self, decl):
        if decl.lower() == "doctype html" and not self.doctype and not self.root.els():
            self.doctype = True
        else:
            self.errors.append(f"declaration <!{decl[:30]}>")

    def unknown_decl(self, data):
        self.errors.append(f"marked section <![{data[:30]}")

    def handle_pi(self, data):
        self.errors.append("processing instruction")

    def handle_comment(self, data):
        self.errors.append("comment")

    def handle_starttag(self, tag, attrs):
        names = [k for k, _v in attrs]
        if len(set(names)) != len(names):
            self.errors.append(f"<{tag}> repeats an attribute (line {self.getpos()[0]})")
        n = Node(tag, {k: (v if v is not None else "") for k, v in attrs}, self.cur, self.getpos()[0])
        self.cur.kids.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.errors.append(f"<{tag}/> is not a void element (line {self.getpos()[0]})")
            self.cur = self.cur.parent

    def handle_endtag(self, tag):
        if tag in VOID or self.cur.tag != tag:
            self.errors.append(f"</{tag}> does not close the open <{self.cur.tag}> (line {self.getpos()[0]})")
            n = self.cur
            while n is not self.root and n.tag != tag:
                n = n.parent
            if n is not self.root:
                self.cur = n.parent
            return
        self.cur = self.cur.parent

    def handle_data(self, d):
        self.cur.kids.append(d)

    def close(self):
        super().close()
        if self.cur is not self.root:
            self.errors.append(f"<{self.cur.tag}> is never closed")


FIGURE_SRC = r"data:image/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+"
DIRECTION = re.compile("[\u202a-\u202e\u2066-\u2069\u200e\u200f\u061c]")


def timestamp_ok(t: str) -> bool:
    """A full timestamp with a time and an offset that names a real moment."""
    if not TIMESTAMP.fullmatch(t):
        return False
    try:
        _dt.datetime.fromisoformat(re.sub(r"([+-]\d{2})(\d{2})$", r"\1:\2", t.replace("Z", "+00:00")))
    except ValueError:
        return False
    return True


TIMESTAMP = re.compile(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})")
# every tag the renderer writes is one of these; anything else could tokenize differently in a browser
CANONICAL_TAG = re.compile(r'<(?:!doctype html|/[a-z][a-z0-9]*|[a-z][a-z0-9]*(?: [a-z][a-z0-9-]*="[^"<>]*")*)>')
ASCII_SPACE = re.compile(r"[ \t\n\f\r]+")


def token_errors(page: str) -> list:
    """Tags outside the two style blocks must be written as the renderer writes them, so html.parser and a
    browser read the same tokens: no space after '<' or '</', no attribute on an end tag, lower-case ASCII names,
    double-quoted values, and no NUL."""
    errors = ["a NUL character"] if "\0" in page else []
    if not page.startswith("<!doctype html>\n"):
        errors.append("the page does not open with <!doctype html>")
    bare = re.sub(r"<style>.*?</style>", "<style></style>", page, flags=re.S)
    for m in re.finditer("&", bare):
        if not re.match(r"&(?:amp|lt|gt|quot|#x27);", bare[m.start():m.start() + 7]):
            errors.append(f"a character reference the renderer does not write: {bare[m.start():m.start() + 12]!r}")
    for m in re.finditer("<", bare):
        if not CANONICAL_TAG.match(bare, m.start()):
            errors.append(f"a tag not written as the renderer writes it: {bare[m.start():m.start() + 40]!r}")
    return errors[:20]


class Page:
    """A rendered artifact read back under the renderer's closed grammar: only the elements, classes and
    attributes it emits, nested where it nests them, with text only where it puts text. Anything else is an
    error. So the order read here is the tree a browser builds, and nothing is shown that is not read.

    Each row, passage mark, note, statement and figure grid gets a place: the number of content words before
    it, with the section, block group and list item or table cell it sits in. With the page's words equal to
    the source's, a place names one point in the source."""

    def __init__(self, page: str):
        t = Tree()
        t.feed(page)
        t.close()
        self.errors = list(t.errors) + token_errors(page)
        if not t.doctype:
            self.errors.append("no <!doctype html>, so a browser renders the page in quirks mode")
        self.parts, self.span = [], {}
        self.open = {"section": None, "group": None, "cell": None}
        self.rows, self.passages, self.statements, self.grids = [], [], [], []
        self.notes, self.note_places, self.ids = {}, {}, {}
        self.units, self.blocks, self.sections = [], [], []   # per unit: span and inline structure; per block: kind and span
        self.title = self.h1 = self.lang = self.key = None
        self.meta, self.foot, self.texts, self.all_texts, self.seq, self.value_marks = [], [], [], [], 0, {}
        self.document(t.root)
        stack = [t.root]
        while stack:
            n = stack.pop()
            for k in n.kids:
                if isinstance(k, str):
                    if n.tag != "style":
                        self.all_texts.append(k)
                else:
                    stack.append(k)

    # ---------------------------------------------------------- helpers
    def bad(self, n: Node, why: str) -> None:
        self.errors.append(f"{why}: <{n.tag}{(' class=' + repr(n.attrs['class'])) if n.attrs.get('class') else ''}> (line {n.line})")

    def shape(self, n: Node, tag: str, classes=(), need: dict | None = None, may: dict | None = None) -> bool:
        """The element's tag, exact class set and attributes; each attribute value must match its pattern."""
        need, may = need or {}, may or {}
        ok = n.tag == tag and n.cls() == frozenset(classes) and (bool(classes) or "class" not in n.attrs)
        if "class" in n.attrs and not re.fullmatch(r"[a-z0-9-]+(?: [a-z0-9-]+)*", n.attrs["class"]):
            ok = False
        for k, v in n.attrs.items():
            if k == "class":
                continue
            pat = need.get(k, may.get(k))
            if pat is None or not re.fullmatch(pat, v):
                ok = False
        if not set(need) <= set(n.attrs):
            ok = False
        if "id" in n.attrs:
            if n.attrs["id"] in self.ids:
                self.bad(n, f"the id {n.attrs['id']!r} occurs twice")
            self.ids[n.attrs["id"]] = n
        if not ok:
            self.bad(n, f"not the grammar's <{tag}> here")
        return ok

    def no_text(self, n: Node) -> None:
        if any(isinstance(k, str) and k.strip(" \t\n\f\r") for k in n.kids):
            self.bad(n, "text where the grammar has none")

    def text_only(self, n: Node) -> str:
        for k in n.els():
            self.bad(k, "an element where the grammar has only text")
        t = "".join(k for k in n.kids if isinstance(k, str))
        self.texts.append(t)
        return t

    def pos(self) -> int:
        """Non-space characters of content before this point: words can be cut, positions cannot."""
        return len(re.sub(r"\s", "", "".join(self.parts)))

    def place(self) -> dict:
        self.seq += 1
        return {"pos": self.pos(), "seq": self.seq, **self.open}

    def framed(self, kind: str, n: Node, fn) -> None:
        prev = self.open[kind]
        self.open[kind] = n
        start = self.pos()
        fn()
        self.span[id(n)] = (start, self.pos())
        self.open[kind] = prev

    # ---------------------------------------------------------- the document
    def document(self, root: Node) -> None:
        self.no_text(root)
        els = root.els()
        if [e.tag for e in els] != ["html"]:
            self.bad(root, "the document is not one <html> element")
            return
        h = els[0]
        self.shape(h, "html", need={"lang": r"[A-Za-z0-9-]+"})
        self.lang = h.attrs.get("lang")
        self.no_text(h)
        kids = h.els()
        if [e.tag for e in kids] != ["head", "body"]:
            self.bad(h, "<html> holds other than <head> and <body>")
            return
        head, body = kids
        self.shape(head, "head")
        self.no_text(head)
        hk = head.els()
        if [e.tag for e in hk] != ["meta", "meta", "title", "style", "style"]:
            self.bad(head, "the head is not charset, viewport, title and the two sealed styles")
        else:
            self.shape(hk[0], "meta", need={"charset": "utf-8"})
            self.shape(hk[1], "meta", need={"name": "viewport", "content": re.escape("width=device-width, initial-scale=1")})
            self.shape(hk[2], "title")
            self.title = self.text_only(hk[2])
            for st in hk[3:]:
                self.shape(st, "style")
        self.shape(body, "body")
        self.no_text(body)
        bk = body.els()
        if [e.tag for e in bk] != ["main"]:
            self.bad(body, "the body is not one <main>")
            return
        self.main(bk[0])

    def main(self, m: Node) -> None:
        self.shape(m, "main", ("artifact", "doc-flow"))
        self.no_text(m)
        kids = m.els()
        i = 0

        def take(tag, classes, **kw):
            nonlocal i
            if i < len(kids) and kids[i].tag == tag and kids[i].cls() == frozenset(classes) and \
                    all(kids[i].attrs.get(k) == v for k, v in kw.items()):
                i += 1
                return kids[i - 1]
            return None

        hd = take("header", ("doc-titled",))
        if not hd:
            self.bad(m, "no title header first in <main>")
            return
        self.shape(hd, "header", ("doc-titled",))
        self.no_text(hd)
        if [(e.tag, e.cls()) for e in hd.els()] != [("h1", frozenset({"doc-title"}))]:
            self.bad(hd, "the header is not one title")
        else:
            self.shape(hd.els()[0], "h1", ("doc-title",))
            self.h1 = self.text_only(hd.els()[0])
        dl = take("dl", ("meta",))
        if not dl:
            self.bad(m, "no header list after the title")
            return
        self.shape(dl, "dl", ("meta",))
        self.meta = self.pairs(dl, wrapped=True)
        while i < len(kids) and kids[i].cls() in (frozenset({"doc-annotations"}), frozenset({"doc-meta", "review-statement"})):
            self.flow(kids[i], in_group=False, top=True)
            i += 1
        key = take("section", ("doc-section",), id="marks")
        if key:
            self.shape(key, "section", ("doc-section",), need={"id": "marks"})
            self.key = key
        while i < len(kids) and kids[i].tag == "section":
            self.framed("section", kids[i], lambda n=kids[i]: self.section(n))
            self.sections.append(self.span[id(kids[i])])
            i += 1
        ft = take("footer", ("provenance",), id="provenance")
        if not ft:
            self.bad(m, "no provenance footer last in <main>")
        else:
            self.shape(ft, "footer", ("provenance",), need={"id": "provenance"})
            self.no_text(ft)
            fk = ft.els()
            if [e.tag for e in fk] != ["dl"] or not self.shape(fk[0], "dl"):
                self.bad(ft, "the footer is not one list")
            else:
                self.foot = self.pairs(fk[0], wrapped=False)
        for k in kids[i:]:
            self.bad(k, "an element after the footer")

    def pairs(self, dl: Node, wrapped: bool) -> list:
        """Header (dt/dd in a div each) or footer (bare dt/dd) pairs; values hold text, bold and code."""
        self.no_text(dl)
        items = []
        if wrapped:
            for d in dl.els():
                if self.shape(d, "div"):
                    self.no_text(d)
                    items += d.els()
        else:
            items = dl.els()
        out = []
        if len(items) % 2:
            self.bad(dl, "a term without its value")
        for dt, dd in zip(items[0::2], items[1::2]):
            self.shape(dt, "dt", ("doc-label",))
            self.shape(dd, "dd", ("doc-meta",))
            out.append((self.text_only(dt), self.inline_text(dd), self.value_marks.get(id(dd), [])))
        return out

    def inline_text(self, n: Node, marks: list | None = None) -> str:
        """Text with bold and code only (header and footer values); no links or marks. Bold and code spans are
        recorded in marks as (kind, offset in non-space characters, text)."""
        out, marks = [], (self.value_marks.setdefault(id(n), []) if marks is None else marks)
        for k in n.kids:
            if isinstance(k, str):
                out.append(k)
                self.texts.append(k)
            elif k.tag in ("strong", "code") and self.shape(k, k.tag, ("doc-code",) if k.tag == "code" else ()):
                marks.append((k.tag, chars("".join(out)), " ".join(words(k.text()))))
                inner = self.inline_text(k, [])
                out.append(inner)
            else:
                self.bad(k, "not text, bold or code")
        return "".join(out)

    # ---------------------------------------------------------- content
    def section(self, n: Node) -> None:
        self.shape(n, "section", ("doc-section",))
        self.no_text(n)
        kids = n.els()
        if kids and kids[0].tag == "h2":
            self.shape(kids[0], "h2", ("doc-section-title",))
            self.unit(kids[0], marks=False, kind=("h2",))
            kids = kids[1:]
        for k in kids:
            self.flow(k, in_group=False)

    def flow(self, k: Node, in_group: bool, top: bool = False) -> None:
        c = k.cls()
        if top and c not in (frozenset({"doc-annotations"}), frozenset({"doc-meta", "review-statement"})):
            self.bad(k, "not a document row or statement")
        elif k.tag == "p" and c == {"doc-body"}:
            self.shape(k, "p", ("doc-body",))
            start = self.pos()
            self.unit(k, marks=True, kind=("p",))
            self.blocks.append((("p",), (start, self.pos())))
        elif k.tag == "div" and c == {"doc-prose"}:
            self.shape(k, "div", ("doc-prose",))
            start = self.pos()
            kind = self.listing(k)
            self.blocks.append((kind, (start, self.pos())))
        elif k.tag == "div" and c == {"doc-table-scroll"}:
            self.shape(k, "div", ("doc-table-scroll",), need={"role": "region", "aria-label": r".+", "tabindex": "0"})
            start = self.pos()
            self.table(k)
            self.blocks.append((("table", " ".join(words(k.attrs.get("aria-label", "")))), (start, self.pos())))
        elif k.tag == "div" and c == {"doc-group"} and not in_group:
            self.shape(k, "div", ("doc-group",))
            self.no_text(k)
            self.framed("group", k, lambda: [self.flow(x, in_group=True) for x in k.els()])
        elif c == {"doc-annotations"} and k.tag == "div":
            self.row(k)
        elif k.tag == "p" and c == {"doc-meta", "review-statement"}:
            self.statement(k)
        elif k.tag == "div" and c == {"doc-hierarchy", "doc-group", "doc-annotation-note"}:
            self.note(k)
        elif k.tag == "div" and c in ({"review-figures"}, {"review-figures", "review-figures--four"}):
            self.figures(k)
        else:
            self.bad(k, "not part of the review-artifact grammar here")

    def listing(self, k: Node) -> None:
        self.no_text(k)
        kids = k.els()
        if len(kids) != 1 or kids[0].tag not in ("ul", "ol"):
            self.bad(k, "the list wrapper does not hold one list")
            return ("list?",)
        lst = kids[0]
        if lst.tag == "ul":
            self.shape(lst, "ul")
            kind = ("ul",)
        else:
            self.shape(lst, "ol", may={"start": r"[1-9][0-9]*"})
            kind = ("ol", int(lst.attrs.get("start", "1") or 1))
        self.no_text(lst)
        for n, li in enumerate(lst.els()):
            if li.tag != "li":
                self.bad(li, "not a list item")
            elif li.cls() == {"doc-body"}:
                self.shape(li, "li", ("doc-body",))
                self.framed("cell", li, lambda li=li, n=n: self.unit(li, marks=True, kind=("li", n)))
            else:
                self.shape(li, "li")
                self.framed("cell", li, lambda li=li, n=n: self.composite(li, ("li", n)))
        return kind

    def composite(self, n: Node, kind: tuple) -> None:
        """A list item or cell whose text is a paragraph, followed by rows, notes and statements."""
        self.no_text(n)
        kids = n.els()
        if not kids or kids[0].tag != "p" or kids[0].cls() != {"doc-body"}:
            self.bad(n, f"a {kind[0]} with annotations does not open with its text")
            return
        self.shape(kids[0], "p", ("doc-body",))
        self.unit(kids[0], marks=True, kind=kind, cell_row=kind[0] == "td")
        for x in kids[1:]:
            c = x.cls()
            if x.tag == "div" and c == {"doc-annotations"} and kind[0] == "li":
                self.row(x)
            elif x.tag == "div" and c == {"doc-hierarchy", "doc-group", "doc-annotation-note"}:
                self.note(x)
            elif x.tag == "p" and c == {"doc-meta", "review-statement"}:
                self.statement(x)
            else:
                self.bad(x, f"not a row, note or statement in a {kind[0]}")

    def table(self, k: Node) -> None:
        self.no_text(k)
        kids = k.els()
        if len(kids) != 1 or not self.shape(kids[0], "table", ("doc-table",)):
            self.bad(k, "the table wrapper does not hold one table")
            return
        t = kids[0]
        self.no_text(t)
        if [e.tag for e in t.els()] != ["thead", "tbody"]:
            self.bad(t, "a table is not one head and one body")
            return
        thead, tbody = t.els()
        self.shape(thead, "thead")
        self.shape(tbody, "tbody")
        for part in (thead, tbody):
            self.no_text(part)
        hrows = thead.els()
        if len(hrows) != 1 or not self.shape(hrows[0], "tr"):
            self.bad(thead, "the table head is not one row")
            return
        self.no_text(hrows[0])
        width = len(hrows[0].els())
        for c, th in enumerate(hrows[0].els()):
            self.shape(th, "th", ("doc-label",), need={"scope": "col"})
            self.unit(th, marks=False, kind=("th", c))
        for r, tr in enumerate(tbody.els()):
            if not self.shape(tr, "tr"):
                continue
            self.no_text(tr)
            if len(tr.els()) != width:
                self.bad(tr, f"a table row holds {len(tr.els())} cells, its head {width}")
            for c, td in enumerate(tr.els()):
                if td.tag != "td":
                    self.bad(td, "not a table cell")
                elif td.cls() == {"doc-body"}:
                    self.shape(td, "td", ("doc-body",))
                    self.framed("cell", td, lambda td=td, r=r, c=c: self.unit(td, marks=True, kind=("td", r, c), cell_row=True))
                else:
                    self.shape(td, "td")
                    self.framed("cell", td, lambda td=td, r=r, c=c: self.composite(td, ("td", r, c)))

    def unit(self, n: Node, marks: bool, kind: tuple, cell_row: bool = False) -> None:
        """One content unit: its words, its bold, code and figure links, and its passage marks."""
        info = {"kind": kind, "strong": [], "code": [], "links": [], "start": None, "raw": []}
        self.parts.append(" ")
        info["start"] = self.pos()
        kids = list(n.kids)
        tail = None
        if cell_row:
            els = [x for x in kids if isinstance(x, Node)]
            if els and els[-1].tag == "span" and els[-1].cls() == {"doc-annotations"}:
                tail = els[-1]
                after = kids[kids.index(tail) + 1:]
                if any(isinstance(x, Node) or x.strip() for x in after):
                    self.bad(tail, "text after a cell's items")
                kids = kids[:kids.index(tail)]
        self.inline(kids, info, marks, in_mark=False)
        self.parts.append(" ")
        info["span"] = (info["start"], self.pos())
        self.units.append(info)
        if tail is not None:
            self.row(tail, inline=True)

    def inline(self, kids: list, info: dict, marks: bool, in_mark: bool) -> None:
        for k in kids:
            if isinstance(k, str):
                self.parts.append(k)
                self.texts.append(k)
                info["raw"].append(k)
                continue
            c = k.cls()
            at = self.pos() - info["start"]
            if k.tag == "strong" and self.shape(k, "strong"):
                info["strong"].append((at, " ".join(words(k.text()))))
                self.inline(k.kids, info, marks, in_mark)
            elif k.tag == "code" and self.shape(k, "code", ("doc-code",)):
                info["code"].append((at, " ".join(words(k.text()))))
                self.inline(k.kids, info, False, in_mark)
            elif k.tag == "a" and c == {"surface-text-link", "review-figref"} and \
                    self.shape(k, "a", ("surface-text-link", "review-figref"), need={"href": r"#fig-[1-9][0-9]*"}):
                info["links"].append((at, " ".join(words(self.text_only(k))), k.attrs["href"]))
                self.parts.append(k.text())
                info["raw"].append(k.text())
            elif k.tag == "mark" and marks and not in_mark and \
                    self.shape(k, "mark", ("doc-passage-mark",), need={"data-review": r"proposed|open",
                                                                       "aria-describedby": r"[A-Za-z0-9_-]+"}):
                self.passages.append({"role": k.attrs["data-review"], "note": k.attrs["aria-describedby"],
                                      "text": k.text(), **self.place()})
                self.inline(k.kids, info, marks, in_mark=True)
            else:
                self.bad(k, "not text, bold, code, a figure link or a passage mark")

    # ---------------------------------------------------------- annotations
    def row(self, n: Node, inline: bool = False, note: str | None = None) -> None:
        self.shape(n, "span" if inline else "div", ("doc-annotations",))
        self.no_text(n)
        items = []
        for it in n.els():
            if not self.shape(it, "span", ("doc-annotation-item",)):
                continue
            parts = it.els()
            if any(isinstance(x, str) for x in it.kids) or not 1 <= len(parts) <= 2:
                self.bad(it, "an item is not a label and its metadata")
                continue
            lab, kind = parts[0], ""
            facets = [f for f in WORDS if f"data-{f}" in lab.attrs]
            if lab.cls() == {"doc-mark", "doc-label"} and len(facets) == 1:
                self.shape(lab, "span", ("doc-mark", "doc-label"), need={f"data-{facets[0]}": r"[a-z-]+"})
                kind = f"{facets[0]}:{lab.attrs[f'data-{facets[0]}']}"
            else:
                self.shape(lab, "span", ("doc-label",))
            label = self.text_only(lab)
            meta = ""
            if len(parts) == 2:
                self.shape(parts[1], "span", ("doc-meta",))
                meta = self.text_only(parts[1])
            items.append({"kind": kind or label.strip().lower(), "words": label, "meta": meta})
        r = {"items": items, **self.place()}
        if note is not None:
            self.notes.setdefault(note, []).append(r)
        else:
            self.rows.append(r)

    def statement(self, n: Node) -> None:
        self.shape(n, "p", ("doc-meta", "review-statement"))
        self.statements.append({"text": self.text_only(n), **self.place()})

    def note(self, n: Node) -> None:
        if not self.shape(n, "div", ("doc-hierarchy", "doc-group", "doc-annotation-note"), need={"id": r"[A-Za-z0-9_-]+"}):
            return
        nid = n.attrs["id"]
        self.note_places[nid] = self.place()
        self.notes.setdefault(nid, [])
        self.no_text(n)
        for r in n.els():
            if r.tag == "div" and r.cls() == {"doc-annotations"}:
                self.row(r, note=nid)
            else:
                self.bad(r, "a note holds other than its row")

    def figures(self, n: Node) -> None:
        self.no_text(n)
        grid = {"figures": [], **self.place()}
        want = ("review-figures", "review-figures--four") if len(n.els()) >= 4 else ("review-figures",)
        self.shape(n, "div", want)
        for f in n.els():
            if not self.shape(f, "figure", need={"id": r"fig-[1-9][0-9]*"}):
                continue
            self.no_text(f)
            k = f.els()
            if [e.tag for e in k] != ["img", "figcaption"]:
                self.bad(f, "a figure is not one image and its caption")
                continue
            num = int(f.attrs["id"][4:])
            self.shape(k[0], "img", need={"src": FIGURE_SRC, "width": r"[1-9][0-9]*", "height": r"[1-9][0-9]*",
                                          "alt": re.escape(f"Fig. {num}")})
            self.shape(k[1], "figcaption", ("caption",))
            cap = self.text_only(k[1])
            src = k[0].attrs.get("src", "")
            try:
                text = src.split(",", 1)[1] if "," in src else ""
                payload = base64.b64decode(text, validate=True)
                if base64.b64encode(payload).decode("ascii") != text:
                    raise ValueError
            except ValueError:
                payload = b""
                self.bad(k[0], "a figure's payload is not canonical base64")
            grid["figures"].append({"fig": num, "sha256": sha(payload), "media_type": src[5:src.find(";")] if ";" in src else "",
                                    "measured": image_size(payload),
                                    "width": k[0].attrs.get("width"), "height": k[0].attrs.get("height"),
                                    "caption": " ".join(words(cap))})
        self.grids.append(grid)

    @property
    def content(self) -> list:
        return words("".join(self.parts))


def source_words(src_text: str, cfg: dict, figno: dict) -> list:
    """The source's body words as a reader sees them, by a transform separate from the renderer's."""
    keyre = key_regex(cfg)
    codere = figure_codes(cfg)
    body, started = [], False
    for ln in src_text.split("\n")[1:]:
        if not started and (ln.strip() == "" or re.match(r"^\*\*[^*]+:\*\* ", ln)):
            continue
        started = True
        if ln.strip() in ("", "---"):
            continue
        bare = keyre.sub("", ln)
        if bare.startswith("|") and all(SEPARATOR.fullmatch(c) for c in split_row(bare)):
            continue
        t = plain(ln, keyre, figno, codere)
        t = t[3:] if t.startswith("## ") else re.sub(r"^(- |\d+\. )", "", t)
        body.append(" ".join(split_row(t)) if t.startswith("|") else t)
    return words("\n".join(body))


def item_sig(r: dict, quote: str | None) -> tuple:
    """How an item reads on the page: (kind, label words, metadata)."""
    if r["item"] in WORDS:
        kind, label = f"{r['item']}:{r['mark']}", r["words"]
    elif r["item"] == "check":
        return ("check", "Check", (f"on “{quote}”" + SEP if quote is not None else "") + r["words"] + SEP + r["value"])
    else:
        kind, label = "basis", "Basis"
    meta = (f"on “{quote}”" + (SEP + r["value"] if r["value"] else "")) if quote is not None else r["value"]
    return (kind, label, meta)


def aw(t: str) -> str:
    """Text with ASCII whitespace collapsed and nothing else folded: an unusual space stays visible to the comparison."""
    return " ".join(x for x in ASCII_SPACE.split(t) if x)


def invisible_at(t: str) -> list:
    """Each invisible or unusual character with its place: the number of non-space characters before it."""
    return [(chars(t[:m.start()]), m.group(0)) for m in INVISIBLE.finditer(t)]


def as_items(row: dict) -> list:
    return [(i["kind"], aw(i["words"]), aw(i["meta"])) for i in row["items"]]


def norm_items(items: list) -> list:
    return [(k, aw(lbl), aw(m)) for k, lbl, m in items]


def chars(t: str) -> int:
    return len(re.sub(r"\s", "", t))


def layout(src: Source, keyre: re.Pattern, figno: dict, codere) -> dict:
    """Each section, block and unit as its span of content, counted in non-space characters, in reading
    order. Headings count; the header, key section, annotations and figure captions do not, as on the page."""
    pos, seq, sec, blk, unit, order = 0, [], {}, {}, {}, []
    for si, s in enumerate(src.sections):
        s0 = pos
        if s["title"] is not None:
            t = plain(s["title"], keyre, figno, codere)
            seq += words(t)
            order.append((("h2",), s["title"], (pos, pos + chars(t))))
            pos += chars(t)
        for bi in range(len(s["blocks"])):
            b0 = pos
            for ui, u in enumerate(src.units):
                if u[0] == si and u[1] == bi:
                    t = plain(u[3], keyre, figno, codere)
                    unit[ui] = (pos, pos + chars(t))
                    seq += words(t)
                    if u[2][0] != "lead":
                        order.append((tuple(u[2]), u[3], unit[ui]))
                    pos += chars(t)
            blk[(si, bi)] = (b0, pos)
        if s["title"] is not None or s["blocks"]:
            sec[si] = (s0, pos)
    return {"words": seq, "section": sec, "block": blk, "unit": unit, "order": order}


def source_figures(src: Source, codere) -> tuple:
    """Figure numbers by first reference in reading order, and which block first references each, read from
    the source independently of the build record."""
    figno, first = {}, {}
    if codere is None:
        return figno, first
    for si, sec in enumerate(src.sections):
        for bi, b in enumerate(sec["blocks"]):
            for t in [b.text] + b.items + [b.lead] + b.head + [c for r in b.rows for c in r]:
                for m in codere.finditer(t or ""):
                    for c in expand_range(m.group(1), m.group(2)):
                        if c not in figno:
                            figno[c] = len(figno) + 1
                            first.setdefault((si, bi), []).append(figno[c])
    return figno, first


def source_inline(t: str, keyre: re.Pattern, figno: dict, codere) -> dict:
    """A unit's bold and code texts and figure links, each with its offset in the unit's non-space characters,
    read from its Markdown."""
    t = keyre.sub("", t)
    pieces, links, i = [], [], 0
    if codere is not None:
        for m in codere.finditer(t):
            ids = expand_range(m.group(1), m.group(2))
            n0, n1 = figno.get(ids[0], 0), figno.get(ids[-1], 0)
            lab = f"fig. {n0}" if len(ids) == 1 else f"figs. {n0}–{n1}"
            pieces.append(t[i:m.start()])
            links.append(("".join(pieces), lab, f"#fig-{n0}"))
            pieces.append(lab)
            i = m.end()
    pieces.append(t[i:])
    shown = "".join(pieces)
    offset = lambda before: chars(before.replace("**", "").replace("`", ""))
    return {"strong": [(offset(shown[:m.start()]), " ".join(words(m.group(1).replace("`", ""))))
                       for m in re.finditer(r"\*\*(.+?)\*\*", shown)],
            "code": [(offset(shown[:m.start()]), " ".join(words(m.group(1).replace("**", ""))))
                     for m in re.finditer(r"`([^`]+)`", shown)],
            "links": [(offset(before), " ".join(words(lab)), href) for before, lab, href in links]}


def same_tree(a: Node, b: Node) -> bool:
    if a.tag != b.tag or a.attrs != b.attrs:
        return False
    ka = [k if isinstance(k, Node) else aw(k) for k in a.kids if isinstance(k, Node) or aw(k)]
    kb = [k if isinstance(k, Node) else aw(k) for k in b.kids if isinstance(k, Node) or aw(k)]
    return len(ka) == len(kb) and all(same_tree(x, y) if isinstance(x, Node) and isinstance(y, Node) else x == y
                                      for x, y in zip(ka, kb))


def span(frame, page: Page) -> tuple | None:
    return page.span.get(id(frame)) if frame is not None else None


def place_of(x: dict, page: Page) -> tuple:
    """(position, section span, cell, group span) of an element the page was read for."""
    cell = (x["cell"].tag, *page.span[id(x["cell"])]) if x["cell"] is not None else None
    return (x["pos"], span(x["section"], page), cell, span(x["group"], page))


def at(want: dict, got: tuple) -> bool:
    """Whether a read place is the expected one. A group is 'exact' (the element sits in the group of
    exactly those blocks), 'own' (in no group, or a group of only its own block) or 'any'."""
    pos, sec, cell, group = got
    if (pos, sec, cell) != (want["pos"], want["section"], want["cell"]):
        return False
    kind, g = want["group"]
    return kind == "any" or group == g or (kind == "own" and group is None)


def expected_sequence(r: Renderer, plan: dict, src: Source, lay: dict, first_ref: dict) -> list:
    """Every row, statement, note and figure grid the page must show, in the order the composition sets:
    the document's row and statements; then in each block, an item's or cell's rows (or items), notes and
    statements; after the block, its own rows, then its group's when it ends one, then their statements,
    then the block's notes, then its figures."""
    units, out = src.units, []

    def where(sp: tuple) -> str:
        n, acc = 0, 0
        for w in lay["words"]:
            if acc + len(w) > sp[1]:
                break
            acc += len(w)
            n += 1
        return "…" + " ".join(lay["words"][max(0, n - 6):n]) + f" (characters {sp[0]}–{sp[1]})"

    hosts = {(k[0], b): k for k in plan["outer"] if k[1] != k[2] for b in range(k[1], k[2] + 1)}

    def block_place(si: int, b0: int, b1: int) -> dict:
        end = lay["block"][(si, b1)][1]
        if b0 != b1:
            group = ("exact", (lay["block"][(si, b0)][0], end))
        elif (si, b0) in hosts:
            h = hosts[(si, b0)]
            group = ("exact", (lay["block"][(si, h[1])][0], lay["block"][(si, h[2])][1]))
        else:
            group = ("own", lay["block"][(si, b0)])
        return {"pos": end, "section": lay["section"][si], "cell": None, "group": group,
                "what": where((lay["block"][(si, b0)][0], end))}

    def unit_place(ui: int) -> dict:
        s0, s1 = lay["unit"][ui]
        return {"pos": s1, "section": lay["section"][units[ui][0]], "cell": (units[ui][2][0], s0, s1),
                "group": ("any", None), "what": where((s0, s1))}

    def rows_of(entries: list, pl: dict, statements: bool = True) -> None:
        keys = sorted({x["key"] for rs, _q in entries for x in rs})
        pl = dict(pl, what=f"{', '.join(keys)}, after {pl['what']}")
        whole = [x for rs, q in entries if q is None for x in rs]
        if r.ordered(whole):
            out.append({"kind": "row", "items": norm_items([item_sig(x, q) for x, q in r.row_items(whole)]), "place": pl})
        for rs, q in entries:
            if q is not None and r.ordered(rs):
                out.append({"kind": "row", "items": norm_items([item_sig(x, qq) for x, qq in r.row_items(rs, q)]), "place": pl})
        if statements:
            stm_of(entries, pl)

    def stm_of(entries: list, pl: dict) -> None:
        for rs, _q in entries:
            for x in rs:
                if x["item"] == "statement":
                    out.append({"kind": "stm", "text": aw(x["value"]), "place": pl})

    passages = sorted(plan["passages"], key=lambda q: (q["ui"], q["a"]))

    def notes_for(cond, pl: dict) -> None:
        for p in passages:
            if cond(p):
                out.append({"kind": "note", "passage": p, "place": pl})

    if plan["doc"]:
        rows_of([(plan["doc"], None)], {"pos": 0, "section": None, "cell": None, "group": ("exact", None), "what": "its header"})
    for si, sec in enumerate(src.sections):
        for bi, b in enumerate(sec["blocks"]):
            for ui, u in enumerate(units):
                if u[0] != si or u[1] != bi or u[2][0] not in ("li", "td"):
                    continue
                pl = unit_place(ui)
                rows_of([(plan["unit_rows"].get(ui, []), None)] + plan["unit_tail"].get(ui, []), pl, statements=False)
                notes_for(lambda p, ui=ui: p["ui"] == ui, pl)
                stm_of([(plan["unit_rows"].get(ui, []), None)] + plan["unit_tail"].get(ui, []), pl)
            pl = block_place(si, bi, bi)
            rows_of(plan["inner"].get((si, bi), []) + plan["outer"].get((si, bi, bi), []), pl)
            span_key = next((k for k in plan["outer"] if k[0] == si and k[2] == bi and k[1] != k[2]), None)
            if span_key:
                rows_of(plan["outer"][span_key], block_place(si, span_key[1], bi))
            notes_for(lambda p, si=si, bi=bi: units[p["ui"]][:2] == [si, bi] and units[p["ui"]][2] == ("p",), pl)
            if (si, bi) in first_ref:
                out.append({"kind": "figs", "nums": first_ref[(si, bi)], "place": pl})
    return out


def check_artifact(src_text: str, record_text: str, artifact: str, cfg: dict, page: str, build: dict, *,
                   config_sha256: str, build_sha256: str | None = None) -> dict:
    """Read the page back under the renderer's closed grammar and compare it with what the source, record
    and configuration say it must show, and with the build record that claims to describe it. Fidelity
    uses its own source transform and the page's own markup. Placement re-resolves the record with the
    renderer's reader (see the usage contract) and compares each annotation's read place and order with the
    source span it concerns."""
    fails = []
    page_bytes = page.encode("utf-8")
    identity = {"out_sha256": sha(page_bytes), "out_bytes": len(page_bytes), "source_sha256": sha(src_text.encode("utf-8")),
                "record_sha256": sha(record_text.encode("utf-8")), "config_sha256": config_sha256}
    names = {"out_sha256": "output", "out_bytes": "output size", "source_sha256": "source",
             "record_sha256": "record", "config_sha256": "configuration"}
    for k, name in names.items():
        if build.get(k) != identity[k]:
            fails.append(f"identity: the build record's {name} is {build.get(k)!r}; the {name} checked is {identity[k]!r}")
    if build.get("artifact") != artifact:
        fails.append(f"identity: the build record is for artifact {build.get('artifact')!r}, not {artifact!r}")
    if build.get("record_section") != cfg["record_section"]:
        fails.append(f"identity: the build record read record section {build.get('record_section')!r}, "
                     f"the configuration names {cfg['record_section']!r}")
    if not re.fullmatch(r"[0-9a-f]{40}", str(build.get("commit", ""))):
        fails.append(f"identity: the build record's design-system commit {build.get('commit')!r} is not a full commit")
    if not timestamp_ok(str(build.get("rendered"))):
        fails.append(f"identity: the build record's render time {str(build.get('rendered'))[:40]!r} is not a timestamp")
    result = {"tool": "check", "out": Path(build.get("out", "")).name, **identity,
              "inputs": {k: identity[k] for k in ("source_sha256", "record_sha256", "config_sha256")},
              "build_sha256": build_sha256, "renderer_sha256": build.get("renderer_sha256"),
              "checker_sha256": sha(Path(__file__).read_bytes()), "reproduced": None, "owner_files_verified": False}
    src = parse_source(src_text, cfg)
    keyre, codere = key_regex(cfg), figure_codes(cfg)
    figno, first_ref = source_figures(src, codere)
    fig_entries = (cfg.get("figures") or {}).get("entries") or {}
    if codere is not None:
        for m in codere.finditer(src_text):
            nums = [figno.get(c) for c in expand_range(m.group(1), m.group(2))]
            if None in nums or nums != list(range(nums[0], nums[0] + len(nums))):
                fails.append(f"figures: the range {m.group(0)} does not cover consecutively numbered figures")
    if [{"id": f.get("id"), "fig": f.get("fig")} for f in build.get("figures", [])] != [{"id": c, "fig": n} for c, n in figno.items()]:
        fails.append("figures: the build record's figure numbers are not the source's first references")
    for f in build.get("figures", []):
        e = fig_entries.get(f.get("id"))
        if not e or e["sha256"] != f.get("sha256") or f.get("pixels") != f"{e['width']}x{e['height']}" \
                or f.get("media_type") != e["media_type"] or any(f.get(k) != e.get(k) for k in ("source", "source_sha256", "how")):
            fails.append(f"identity: figure {f.get('id')} in the build record is not the figure manifest's")
    pg = Page(page)
    fails += [f"structure: {e}" for e in pg.errors]
    unit_raw = "".join("".join(u["raw"]) for u in pg.units)
    other = collections.Counter(INVISIBLE.findall("".join(pg.all_texts))) - collections.Counter(INVISIBLE.findall(unit_raw))
    try:
        read = parse_record(record_text, cfg["record_section"])
    except RecordError:
        read = ([], [])
    allowed = set(INVISIBLE.findall(src_text + json.dumps(read, ensure_ascii=False)
                                    + json.dumps([cfg.get(k) for k in ("meta_before", "colophon", "key_heading")], ensure_ascii=False)))
    if set(other) - allowed:
        fails.append(f"invisible or direction characters the inputs do not have: {sorted('U+%04X' % ord(c) for c in set(other) - allowed)}")
    if aw(pg.h1 or "") != aw(src.title):
        fails.append(f"title: {pg.h1!r} is not the source title {src.title!r}")
    if aw(pg.title or "") != aw(src.title):
        fails.append(f"title: the page's <title> {pg.title!r} is not the source title")
    def value_marks(v: str) -> list:
        inl = source_inline(v, keyre, figno, codere)
        return sorted([("strong", o, t) for o, t in inl["strong"]] + [("code", o, t) for o, t in inl["code"]])
    want_meta = [(words(k + ":"), words(plain(v, keyre, figno, codere)), value_marks(v)) for k, v in
                 [tuple(x) for x in cfg.get("meta_before", [])] + list(src.meta)]
    want_meta = [(k, v, aw(raw), m) for (k, v, m), raw in zip(want_meta, [plain(v, keyre, figno, codere) for _k, v in
                 [tuple(x) for x in cfg.get("meta_before", [])] + list(src.meta)])]
    if [(words(k), words(v), aw(v), sorted(m)) for k, v, m in pg.meta] != want_meta:
        fails.append(f"header differs from the source and configuration: {[(k, v) for k, v, _m in pg.meta]}")
    commit = str(build.get("commit") or "")
    try:
        _dt.date.fromisoformat(str(build.get("commit_date", "")))
        real_date = re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(build.get("commit_date", ""))) is not None
    except ValueError:
        real_date = False
    if not real_date:
        fails.append(f"identity: the build record's design-system date {str(build.get('commit_date'))[:20]!r} is not a date")
    want_foot = [(["design-system-ASK"], words(f"commit {commit[:7]} · {build.get('commit_date', '')}"), [("code", 6, commit[:7])])]
    want_foot += [(words(k), words(v), []) for k, v in cfg.get("colophon", [])]
    want_foot = [(k, v, " ".join(v), m) if i == 0 else (k, v, aw(cfg["colophon"][i - 1][1]), m) for i, (k, v, m) in enumerate(want_foot)]
    if [(words(k), words(v), aw(v), sorted(m)) for k, v, m in pg.foot] != want_foot or \
            [aw(k) for k, _v, _m in pg.foot] != ["design-system-ASK"] + [aw(k) for k, _v in cfg.get("colophon", [])]:
        fails.append(f"colophon differs from the build record and configuration: {[(k, v) for k, v, _m in pg.foot]}")
    if pg.lang != cfg.get("lang", "en"):
        fails.append(f"page language is not the configured {cfg.get('lang', 'en')!r}")
    want = source_words(src_text, cfg, figno)
    if want != pg.content:
        d = list(difflib.unified_diff(want, pg.content, lineterm="", n=2))[:40]
        fails.append("source fidelity: " + " ".join(d))
    try:
        glosses, rows = parse_record(record_text, cfg["record_section"])
        r = Renderer(src, glosses, rows, artifact, cfg, lambda _rel: b"", "", "", None)
        r.figno = figno
        plan = r.plan()
        lay = layout(src, keyre, figno, codere)
    except RecordError as e:
        return {**result, "fails": fails + [f"record: {e}"]}
    if build.get("applied") != plan["applied"]:
        fails.append("identity: the build record's applied annotations are not the record's")
    if lay["words"] != want:
        fails.append("placement: the record reader and the fidelity transform read the source's words differently")
    # every unit, block and section where the source puts it
    want_units = [(kind, sp) for kind, _t, sp in lay["order"]]
    if [(u["kind"], u["span"]) for u in pg.units] != want_units:
        fails.append("text units differ from the source: a paragraph, list item, heading or cell holds other text, "
                     "or one is missing, merged or moved")
    want_blocks = []
    for si, sec in enumerate(src.sections):
        for bi, b in enumerate(sec["blocks"]):
            kind = (("p",) if b.type == "p" else ("ul",) if b.type == "ul" else ("ol", b.start) if b.type == "ol"
                    else ("table", " ".join(words(plain(b.head[0], keyre, figno, codere)))))
            want_blocks.append((kind, lay["block"][(si, bi)]))
    if pg.blocks != want_blocks:
        fails.append(f"blocks differ from the source in kind, extent or table name: {[k for k, _s in pg.blocks][:10]}")
    if pg.sections != [lay["section"][si] for si in sorted(lay["section"])]:
        fails.append("sections differ from the source")
    for got_u, (kind, text, _sp) in zip(pg.units, lay["order"]):
        if invisible_at("".join(got_u["raw"])) != invisible_at(plain(text, keyre, figno, codere)):
            fails.append(f"invisible or unusual space characters differ from the source in: {' '.join(words(plain(text, keyre, figno, codere)))[:70]!r}")
        exp = source_inline(text, keyre, figno, codere)
        if any(got_u[k] != exp[k] for k in ("strong", "code", "links")):
            fails.append(f"bold, code or figure links differ from the source in: {' '.join(words(plain(text, keyre, figno, codere)))[:70]!r}")
    # every row, statement, note and figure grid: at its exact place, in the composition's order
    units = src.units
    shown_kinds = ("p", "li", "td")
    if any(units[q["ui"]][2][0] not in shown_kinds for q in plan["passages"]) or \
            any(units[ui][2][0] not in shown_kinds[1:] for ui in list(plan["unit_rows"]) + list(plan["unit_tail"])):
        fails.append("the record annotates a unit the composition does not show annotations on")
    seq = expected_sequence(r, plan, src, lay, first_ref)
    pool = {"row": list(pg.rows), "stm": list(pg.statements), "figs": list(pg.grids)}
    got_pass, used_notes, order = list(pg.passages), set(), []
    for e in seq:
        pl = e["place"]
        if e["kind"] == "row":
            hit = next((g for g in pool["row"] if as_items(g) == e["items"] and at(pl, place_of(g, pg))), None)
            if not hit:
                fails.append(f"annotation row missing, changed or not at its scope: {[i[0] for i in e['items']]} for {pl['what']}")
                continue
        elif e["kind"] == "stm":
            hit = next((g for g in pool["stm"] if aw(g["text"]) == e["text"] and at(pl, place_of(g, pg))), None)
            if not hit:
                fails.append(f"statement missing or not at its scope: {e['text'][:60]} for {pl['what']}")
                continue
        elif e["kind"] == "figs":
            hit = next((g for g in pool["figs"] if [f["fig"] for f in g["figures"]] == e["nums"] and at(pl, place_of(g, pg))), None)
            if not hit:
                fails.append(f"figures {e['nums']} are not after the block that first references them ({pl['what']})")
                continue
            by_num = {n: c for c, n in figno.items()}
            for f in hit["figures"]:
                fe = fig_entries.get(by_num.get(f["fig"]), {})
                if f["sha256"] != fe.get("sha256") or f["media_type"] != fe.get("media_type") or \
                        (f["width"], f["height"]) != (str(fe.get("width")), str(fe.get("height"))) or f["caption"] != f"Fig. {f['fig']}" \
                        or f["measured"] != (fe.get("width"), fe.get("height")):
                    fails.append(f"figure {f['fig']}: its image, size or caption is not the manifest's {by_num.get(f['fig'])}")
        else:
            p = e["passage"]
            ui, unit = p["ui"], units[p["ui"]]
            text = " ".join(words(plain(unit[3][p["a"]:p["b"]], keyre, figno, codere)))
            s0, s1 = lay["unit"][ui]
            in_cell = unit[2][0] in ("li", "td")
            mark_place = {"pos": s0 + chars(plain(unit[3][:p["a"]], keyre, figno, codere)), "section": lay["section"][unit[0]],
                          "cell": (unit[2][0], s0, s1) if in_cell else None, "group": ("any", None)}
            match = next((x for x in got_pass if " ".join(words(x["text"])) == text and x["role"] == p["role"]
                          and at(mark_place, place_of(x, pg))), None)
            if not match:
                fails.append(f"passage mark missing, moved, shifted or with another role: {p['role']} on {text[:60]!r} in {pl['what']}")
                continue
            got_pass.remove(match)
            if match["note"] in used_notes:
                fails.append(f"two passage marks name one note: {match['note']}")
            used_notes.add(match["note"])
            note = pg.notes.get(match["note"], [])
            want_items = norm_items([item_sig(rr, q) for rr, q in r.row_items(r.note_rows(p))])
            if len(note) != 1 or as_items(note[0]) != want_items:
                fails.append(f"passage note missing or not this passage's record: {text[:60]!r}")
                continue
            hit = pg.note_places[match["note"]]
            if not at(pl, place_of(hit, pg)):
                fails.append(f"passage note is not after its block and row: {text[:60]!r} in {pl['what']}")
                continue
            order.append((hit["seq"], len(order), f"the note on {text[:40]!r}"))
            continue
        pool[e["kind"]].remove(hit)
        order.append((hit["seq"], len(order), f"{e['kind']} for {pl['what']}"))
    by_page = sorted(order)
    for (s1, o1, w1), (s2, o2, w2) in zip(by_page, by_page[1:]):
        if o2 < o1:
            fails.append(f"annotations out of the composition's order: {w2} comes after {w1}")
    for g in pool["row"]:
        fails.append(f"annotation row not in the record at this place: {[i['kind'] for i in g['items']]} at character {g['pos']}")
    for g in pool["stm"]:
        fails.append(f"statement not in the record at this place: {g['text'][:60]}")
    for g in pool["figs"]:
        fails.append(f"figures not in the source at this place: {[f['fig'] for f in g['figures']]}")
    for x in got_pass:
        fails.append(f"passage mark not in the record at this place: {x['role']} on {x['text'][:60]!r} at character {x['pos']}")
    for nid in set(pg.notes) - used_notes:
        fails.append(f"annotation note no passage mark points to: {nid}")
    for row in pg.rows + [rw for rs in pg.notes.values() for rw in rs]:
        kinds = [ORDER.get(i["kind"].split(":")[0], 9) for i in row["items"]]
        if kinds != sorted(kinds):
            fails.append(f"annotation items out of the owner's order: {[i['kind'] for i in row['items']]}")
        for i in row["items"]:
            role = i["kind"].split(":")[1] if i["kind"].startswith("review:") else ""
            if role in MIN_FIELDS and len([f for f in i["meta"].split(SEP) if f.strip()]) < MIN_FIELDS[role]:
                fails.append(f"decision record incomplete ({role}): {i['meta'][:70]}")
    if pg.key is None:
        if r.key_html():
            fails.append("the key section is missing")
    else:
        want_key = Tree()
        want_key.feed(r.key_html())
        want_key.close()
        if len(want_key.root.els()) != 1 or not same_tree(pg.key, want_key.root.els()[0]):
            fails.append("the key section differs from the record's key table")
    fails += delivery_fails(page, build)

    def visible(text: str) -> str:
        text = re.sub(r"<style.*?</style>", " ", text, flags=re.S)
        text = re.sub(r"</?(?:strong|code|a|mark|span)\b[^>]*>", "", text)
        return html.unescape(re.sub(r"<[^>]+>", " ", text))
    allvis = visible(page)
    body_only = visible(re.sub(r'<footer class="provenance".*?</footer>', " ", page, flags=re.S))
    allowed_versions = set(re.findall(r"\bv\d+\b", " ".join(v for _k, v in src.meta)))
    for ex in cfg.get("exclusions", []):
        hits = re.findall(ex["pattern"], body_only if ex.get("exclude_footer") else allvis)
        if ex.get("allow_source_versions"):
            hits = [h for h in hits if h not in allowed_versions]
        if hits:
            fails.append(f"exclusion '{ex['name']}': {hits[:5]}")
    marks = {}
    for row in pg.rows + [rw for rs in pg.notes.values() for rw in rs]:
        for i in row["items"]:
            if ":" in i["kind"]:
                marks[i["kind"]] = marks.get(i["kind"], 0) + 1
    return {**result, "words": len(pg.content), "rows": len(pg.rows), "passage_marks": len(pg.passages),
            "statements": len(pg.statements), "marks": dict(sorted(marks.items())),
            "figures": sum(len(g["figures"]) for g in pg.grids), "fails": fails}


def delivery_fails(page: str, build: dict) -> list:
    """Sealed delivery: the owner files the build recorded, in order, and nothing that leaves the file."""
    fails = []
    if "<body" not in page:
        return ["delivery: no body"]
    head = page[:page.index("<body")]
    styles = re.findall(r"<style>\n(.*?)\n  </style>", head, flags=re.S)
    if re.search(r"(?i)<link\b|@import", page) or len(re.findall(r"(?i)<style", page)) != 2 or len(styles) != 2:
        return ["delivery: the page must hold exactly the two sealed style blocks in its head, with no link or import"]
    if re.search(r"(?i)(?:url|image-set|src)\(\s*(?!['\"]?\s*data:)|@import", page):
        fails.append("delivery: a URL other than an embedded resource")
    if re.search(r"(?i)<(script|iframe|object|embed|base|form)\b|<meta[^>]*http-equiv|\sstyle=", page):
        fails.append("delivery: a script, frame, embedded object, base, form, refresh or inline style")
    sealed, overlay = styles
    short = str(build.get("commit", ""))[:7]
    banners = [f"{BANNER}{FOUNDATION} (upstream {short}) + base64 fonts === */"]
    banners += [f"{BANNER}{m} (upstream {short}, verbatim) === */" for m in REGISTER + SEMANTIC]
    parts = re.split("(?m)^(" + "|".join(re.escape(b) for b in banners) + ")\n", sealed)
    names = [x[len(BANNER):].split(" ")[0] for x in parts[1::2]]
    deps = build.get("deps", {})
    want_deps = {FOUNDATION, TEMPLATE, *("fonts/" + f for f in FONTS), *REGISTER, *SEMANTIC}
    if set(deps) != want_deps:
        fails.append(f"delivery: the build record lists other files than the owner's: {sorted(set(deps) ^ want_deps)}")
    if parts[0] != "" or parts[1::2] != banners or "".join(f"{b}\n{x}" for b, x in zip(parts[1::2], parts[2::2])) != sealed:
        fails.append(f"delivery: the sealed block is not the owner files under their exact banners, in the owner order: {names}")
    else:
        bodies = dict(zip(names, parts[2::2]))
        for m in (FOUNDATION,) + REGISTER + SEMANTIC:
            body = bodies[m] if m == SEMANTIC[-1] else bodies[m][:-1]
            want = build.get("foundation_sha256") if m == FOUNDATION else deps.get(m, {}).get("sha256")
            if sha(body.encode("utf-8")) != want or (m != FOUNDATION and deps.get(m, {}).get("bytes") != len(body.encode("utf-8"))):
                fails.append(f"delivery: {m} is not the file the build recorded")
        embedded = [base64.b64decode(x) for x in re.findall(r"data:font/woff2;base64,([A-Za-z0-9+/=]+)", bodies[FOUNDATION])]
        if sorted((sha(x), len(x)) for x in embedded) != sorted((deps.get("fonts/" + f, {}).get("sha256", ""),
                                                                 deps.get("fonts/" + f, {}).get("bytes")) for f in FONTS):
            fails.append("delivery: the embedded fonts are not the owner fonts the build recorded")
    if sha(overlay.encode("utf-8")) != build.get("overlay_sha256"):
        fails.append("delivery: the template overlay differs from the build")
    if re.search(r"""(?i)\s(?:src|href|srcset|poster|action|data)=(?!["']?(?:data:|#))""", page):
        fails.append("delivery: a resource or link that leaves the file")
    if "<!--" in page:
        fails.append("delivery: an HTML comment survived")
    for pat in (r"\[placeholder\]", r"\b0000000\b"):
        if re.search(pat, page):
            fails.append(f"delivery: template marker {pat}")
    for m in re.finditer(r'href="#([^"]+)"', page):
        if not re.search(rf'id="{re.escape(m.group(1))}"', page):
            fails.append(f"delivery: dead internal link #{m.group(1)}")
    byfig = {f["fig"]: f for f in build.get("figures", [])}
    pays = re.findall(r'<figure id="fig-(\d+)"><img src="data:[^;]+;base64,([A-Za-z0-9+/=]+)"', page)
    if [int(n) for n, _ in pays] != list(range(1, len(pays) + 1)) or len(pays) != len(byfig):
        fails.append("delivery: figures are not numbered contiguously as the build recorded")
    for n, p in pays:
        if int(n) not in byfig or sha(base64.b64decode(p)) != byfig[int(n)]["sha256"]:
            fails.append(f"delivery: figure {n} payload does not match the build record")
    return fails


# ================================================================ probe
PROBE_JS = r"""<script>
window.addEventListener('load', () => { setTimeout(() => {
  const f = document.getElementById('f'); const d = f.contentDocument; const w = f.contentWindow;
  const se = d.scrollingElement; const imgs = [...d.images];
  const refs = [...d.querySelectorAll('a[href^="#"]')];
  const out = {sw: se.scrollWidth, cw: se.clientWidth, pageOverflow: se.scrollWidth > se.clientWidth,
    height: se.scrollHeight, dark: w.matchMedia('(prefers-color-scheme: dark)').matches,
    images: imgs.length, broken: imgs.filter(i => !i.complete || i.naturalWidth === 0).length,
    fonts: [...d.fonts].filter(x => x.status === 'loaded').map(x => x.family).filter((v, i, a) => a.indexOf(v) === i),
    marks: d.querySelectorAll('main .doc-mark').length, passages: d.querySelectorAll('mark.doc-passage-mark').length,
    notes: d.querySelectorAll('.doc-annotation-note').length, rows: d.querySelectorAll('.doc-annotations').length,
    statements: d.querySelectorAll('.review-statement').length,
    internalLinks: refs.length, deadLinks: refs.filter(a => !d.getElementById(a.getAttribute('href').slice(1))).length,
    contentType: d.contentType, main: !!d.querySelector('main.artifact'),
    tablesScrolling: [...d.querySelectorAll('.doc-table-scroll')].filter(t => t.scrollWidth > t.clientWidth + 1).length,
    wideElements: [...d.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > se.clientWidth + 1 && !e.closest('.doc-table-scroll')).length};
  document.title = JSON.stringify(out);
}, 2500); });
</script>"""


def chrome() -> str:
    for c in (os.environ.get("CHROME"), "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
              "/usr/bin/google-chrome", "/usr/bin/chromium"):
        if c and Path(c).exists():
            return c
    raise SystemExit("Chrome not found; set $CHROME")


def probe(out: Path) -> dict:
    """Layout views of the file, bound to its bytes: the hash before and after must agree, and the browser must
    have rendered it as the artifact's HTML."""
    if out.suffix != ".html":
        raise SystemExit("probe reads an .html file, so the browser renders it as HTML")
    before = sha(out.read_bytes())
    views = {}
    for scheme in ("light", "dark"):
        for name, (w, h) in (("desktop", (1440, 900)), ("narrow", (390, 844))):
            with tempfile.TemporaryDirectory() as td:
                wrap = Path(td) / "probe.html"
                wrap.write_text(f'<!doctype html><html><head><meta charset="utf-8"><title>x</title>'
                                f'<style>html,body{{margin:0}}</style></head><body><iframe id="f" src="{out.resolve().as_uri()}" '
                                f'style="width:{w}px;height:{h}px;border:0"></iframe>{PROBE_JS}</body></html>', encoding="utf-8")
                flag = "--blink-settings=preferredColorScheme=" + ("1" if scheme == "light" else "0")
                dom = subprocess.run([chrome(), "--headless=new", "--disable-gpu", flag, "--allow-file-access-from-files",
                                      "--virtual-time-budget=20000", f"--window-size={w + 30},{h}", "--dump-dom",
                                      wrap.as_uri()], capture_output=True, text=True, timeout=180).stdout
            t = re.search(r"<title>(.*?)</title>", dom, re.S)
            views[f"{name}_{scheme}"] = json.loads(html.unescape(t.group(1))) if t else {"error": "no probe result"}
    fails = [f"{k}: {'no probe result' if 'error' in v else 'page overflow, a wide element, a broken image or a dead link'}"
             for k, v in views.items()
             if "error" in v or v["pageOverflow"] or v["broken"] or v["deadLinks"] or v["wideElements"]
             or v.get("contentType") != "text/html" or not v.get("main") or v.get("dark") != k.endswith("_dark")]
    after = sha(out.read_bytes())
    if after != before:
        fails.append("the file changed while it was probed")
    return {"tool": "probe", "out": out.name, "out_sha256": before, "views": views, "fails": fails}


OWNER_TOOL = "tools/check-role-conformance.mjs"
OWNER_VIEWS = (("1440x900", ["--width", "1440", "--height", "900"]),
               ("390x844 mobile", ["--width", "390", "--height", "844", "--mobile"]))


def tools_at(ds: str, pin: str) -> tuple:
    """(identical, differing paths): every file under the checkout's tools/, byte for byte against the pin's
    verified tree. An index flag, a replace ref, a rewritten object, an untracked file or a symlink (which would
    make node load a file from elsewhere) cannot stand in for it."""
    try:
        tree = {p: v for p, v in git_tree(ds, pin).items() if p.startswith("tools/")}
    except (RecordError, subprocess.CalledProcessError) as e:
        return False, [f"the pin cannot be read: {e}"]
    root = Path(ds) / "tools"
    if root.is_symlink():
        return False, ["tools/ is a symlink"]
    disk, differ = set(), []
    for p in root.rglob("*"):
        rel = str(p.relative_to(ds))
        if p.is_symlink():
            differ.append(rel + " (a symlink)")
        elif p.is_file():
            disk.add(rel)
    differ += sorted(disk ^ set(tree))
    for path in sorted(disk & set(tree)):
        data = (Path(ds) / path).read_bytes()
        if tree[path][0] not in ("100644", "100755") or \
                hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest() != tree[path][1]:
            differ.append(path)
    return (bool(tree) and not differ), differ


def owner_check(out: Path, ds: str) -> dict:
    """The owner's role-conformance checker, run from a design-system-ASK checkout whose tools/ is the
    build's pinned commit byte for byte, in light and dark at desktop and narrow widths, bound to the file's
    bytes and its build record."""
    before = sha(out.read_bytes())
    build_bytes = Path(str(out) + ".build.json").read_bytes()
    build = json.loads(build_bytes)
    pin = str(build.get("commit", ""))
    fails = []
    if build.get("out_sha256") != before:
        fails.append("the build record beside the file describes other bytes")
    head = subprocess.run(GIT + ["-C", ds, "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    same, differ = tools_at(ds, pin)
    t = Tree()
    t.feed(out.read_text(encoding="utf-8"))
    t.close()
    nodes, stack = [], [t.root]
    while stack:
        n = stack.pop()
        nodes.append(n)
        stack += n.els()
    want_counts = {"doc-mark": sum(1 for n in nodes if n.cls() == {"doc-mark", "doc-label"}),
                   "doc-passage-mark": sum(1 for n in nodes if n.tag == "mark" and "doc-passage-mark" in n.cls()),
                   "doc-annotation-note": sum(1 for n in nodes if "doc-annotation-note" in n.cls())}
    if not same:
        fails.append(f"the checkout's tools/ is not the build's pinned commit {pin}: {differ[:5]}")
    runs = []
    for label, args in OWNER_VIEWS:
        p = subprocess.run(["node", str(Path(ds) / OWNER_TOOL), "--url", out.resolve().as_uri(), "--scheme", "both", *args],
                           capture_output=True, text=True, timeout=900)
        try:
            rep = json.loads(p.stdout)
        except ValueError:
            rep = {"error": (p.stdout + p.stderr)[-500:]}
        runs.append({"viewport": label, "exit": p.returncode, "report": rep})
        bad = [x for x in rep.get("runs", []) if x.get("status") != "pass" or x.get("findings") or x.get("unmapped")
               or not x.get("governed") or any((x.get("counts") or {}).get(c) != n for c, n in want_counts.items())]
        if p.returncode or "error" in rep or not rep.get("pass") or bad or \
                sorted(x.get("scheme") for x in rep.get("runs", [])) != ["dark", "light"]:
            fails.append(f"{label}: the owner checker did not pass in light and dark, governing every mark, passage and note")
    if sha(out.read_bytes()) != before:
        fails.append("the file changed while it was checked")
    return {"tool": "owner-check", "out": out.name, "out_sha256": before, "build_sha256": sha(build_bytes),
            "design_system": {"checkout_head": head, "pin": pin, "tools_identical_to_pin": same},
            "runs": runs, "fails": fails}


# ================================================================ manifest
class EvidenceError(Exception):
    """A build record or report does not describe the output being manifested."""


def summary(rep: dict) -> str:
    if rep.get("tool") == "owner-check":
        runs = [(r["viewport"], x.get("scheme"), x.get("status"), x.get("governed"), len(x.get("findings", [])),
                 len(x.get("unmapped", []))) for r in rep["runs"] for x in r["report"].get("runs", [])]
        ds = rep["design_system"]
        return (f"{'pass' if not rep['fails'] else 'FAIL'}; tools/ at the pin {ds['pin'][:7]}: "
                f"{'yes' if ds['tools_identical_to_pin'] else 'no'} (checkout {ds['checkout_head'][:7]}); "
                + "; ".join(f"{v} {sc}: {st}, {g} governed, {fi} findings, {u} unmapped" for v, sc, st, g, fi, u in runs))
    if rep.get("tool") == "probe":
        v = rep["views"]
        return (f"{'pass' if not rep['fails'] else 'FAIL'}; " + "; ".join(
            f"{k}: overflow {x.get('pageOverflow')}, broken {x.get('broken')}, dead links {x.get('deadLinks')}, "
            f"scrolling tables {x.get('tablesScrolling')}" for k, x in v.items()))
    return "recorded"


REPORT_NAMES = {"owner-check": "Owner checker", "probe": "Layout probe"}


def md(v) -> str:
    """A recorded value made inert in a Markdown table cell: no pipe, backtick, newline or markup."""
    return re.sub(r"[|`*_<>\[\]\\~]", lambda m: "\\" + m.group(0), " ".join(str(v).split()))


def manifest(out: Path, checks_path: Path, reports: list, notes: list) -> str:
    """The artifact's provenance record. Every identity is recomputed or matched against the file itself. A
    build record, check result or report that describes other bytes is refused, and so is a check that did not
    reproduce the file from its inputs, because only reproduction verifies the owner files."""
    out_bytes = out.read_bytes()
    current = sha(out_bytes)
    build_bytes = Path(str(out) + ".build.json").read_bytes()
    b = json.loads(build_bytes)
    checks_raw = Path(checks_path).read_bytes()
    checks = json.loads(checks_raw)
    if b.get("out_sha256") != current or b.get("out_bytes") != len(out_bytes):
        raise EvidenceError(f"the build record describes output {b.get('out_sha256')}, not this file ({current})")
    if checks.get("tool") != "check":
        raise EvidenceError("the checks are not a check result")
    if checks.get("out_sha256") != current or checks.get("out") != out.name:
        raise EvidenceError(f"the check result describes output {checks.get('out')} {checks.get('out_sha256')}, not this file ({current})")
    if checks.get("build_sha256") != sha(build_bytes):
        raise EvidenceError("the check result was made against another build record")
    for k in ("source_sha256", "record_sha256", "config_sha256"):
        if (checks.get("inputs") or {}).get(k) != b.get(k):
            raise EvidenceError(f"the check result's {k} is not the build record's")
    if checks.get("reproduced") is not True or checks.get("owner_files_verified") is not True:
        raise EvidenceError("the check did not reproduce the file and its owner files (run check with --design-system)")
    if checks.get("fails"):
        raise EvidenceError(f"the check failed: {str(checks['fails'][0])[:100]}")
    loaded = []
    for path in reports:
        raw = Path(path).read_bytes()
        rep = json.loads(raw)
        if rep.get("out_sha256") != current:
            raise EvidenceError(f"report {Path(path).name} describes output {rep.get('out_sha256')}, not this file ({current})")
        if rep.get("tool") not in REPORT_NAMES:
            raise EvidenceError(f"report {Path(path).name} is not an owner-check or probe report")
        if rep["tool"] == "owner-check" and (rep.get("build_sha256") != sha(build_bytes)
                                             or (rep.get("design_system") or {}).get("pin") != b.get("commit")):
            raise EvidenceError(f"report {Path(path).name} was made against another build record or design-system commit")
        if rep.get("out") != out.name:
            raise EvidenceError(f"report {Path(path).name} names another file: {str(rep.get('out'))[:60]!r}")
        loaded.append((REPORT_NAMES[rep["tool"]], Path(path).name, sha(raw), rep))
    same = checks.get("checker_sha256") == b.get("renderer_sha256")
    reach = ("reachable from the checkout's origin/main" if checks.get("commit_on_origin_main")
             else "NOT reachable from the checkout's origin/main")
    lines = [f"# Artifact manifest // {md(b['artifact'])} / {md(out.name)}", "",
             f"Provenance record for {md(out.name)}, a static output artifact on the design-system-ASK Class B "
             "`output-artifact` pattern, sealed to one self-contained file, with review presentation in the "
             "Review Semantics composition. Every check and report below was matched to this file's bytes.", "",
             "## Identities", "", "| Item | Value | How it is known |", "| --- | --- | --- |",
             f"| Render | {md(out.name)} · `{current}` · {len(out_bytes):,} bytes | hashed from the file |",
             f"| Build record | {md(out.name + '.build.json')} · `{sha(build_bytes)}` | hashed from the file |",
             f"| Check result | {md(Path(checks_path).name)} · `{sha(checks_raw)}` | hashed from the file |",
             f"| Semantic source | {md(Path(b['source']).name)} · {md(b['source_sha256'])} | hash checked; name as recorded |",
             f"| Review record | {md(Path(b['record']).name)} · {md(b['record_sha256'])} (section {md(b['record_section'])}) | hash checked; name as recorded |",
             f"| Configuration | {md(b['config'])} · {md(b['config_sha256'])} | hash checked; name as recorded |",
             f"| Design system | https://github.com/apexSolarKiss/design-system-ASK at {md(b['commit'])} ({md(b['commit_date'])}) | "
             f"owner files reproduced from this commit's verified objects; {reach} |",
             f"| Checker | render\\_review\\_artifact.py · {md(checks.get('checker_sha256'))} | hashed by the check, which reproduced this file byte for byte |",
             f"| Renderer that built it | {md(b['renderer'])} · `{md(b['renderer_sha256'])}` | "
             f"{'the checker itself' if same else 'as recorded; the checker above reproduced its output'} |",
             f"| Rendered | {md(b['rendered'])} | as recorded; not part of the file |", ""]
    if notes:
        lines += ["## Notes", ""] + [f"- **{md(k)}:** {md(v)}" for k, v in notes] + [""]
    lines += ["Inlined design-system files, each read from the commit above and reproduced:", "", "| Path | SHA-256 | Bytes |",
              "| --- | --- | ---: |"]
    lines += [f"| {md(p)} | {md(d['sha256'])} | {md(d['bytes'])} |" for p, d in b["deps"].items()]
    lines += ["", "## Review presentation applied", "", "| Key | Applies to | Anchor | Items |", "| --- | --- | --- | --- |"]
    lines += [f"| {md(a['key'])} | {md(a['applies'][:60])} | {md(a['anchor'])} | {md(', '.join(a['items']))} |" for a in b["applied"]]
    if b["figures"]:
        lines += ["", f"## Figures ({len(b['figures'])})", "", "Each payload and size was checked against the figure manifest and the image's own header.", "",
                  "| Fig. | ID | Payload SHA-256 | Pixels | Source |",
                  "| ---: | --- | --- | --- | --- |"]
        lines += [f"| {md(f['fig'])} | {md(f['id'])} | {md(f['sha256'])} | {md(f['pixels'])} | {md(f.get('source', ''))} |" for f in b["figures"]]
    lines += ["", "## Checks", "", f"- **Renderer checks** (`check`): pass; {md(checks.get('words'))} words; rows "
              f"{md(checks.get('rows'))}; passage marks {md(checks.get('passage_marks'))}; statements {md(checks.get('statements'))}; "
              f"marks {md(json.dumps(checks.get('marks')))}; figures {md(checks.get('figures'))}."]
    lines += [f"  - {md(x)}" for x in checks["fails"]]
    for label, name, digest, rep in loaded:
        lines += [f"- **{label}:** {md(name)} · `{digest}`: {md(summary(rep))}"]
    lines += ["", "## Freeze", "", "Frozen at render time; it reads no live URL. A reviewed or shared copy is never "
              "regenerated in place: a later render is a new artifact under a new name.", ""]
    return "\n".join(lines)


# ================================================================ CLI
GIT = ["git", "--no-replace-objects", "-c", "core.useReplaceRefs=false"]


def git_object(ds: str, oid: str, kind: str) -> bytes:
    """One object's bytes, refused unless they hash to its id: a rewritten object cannot stand in for it."""
    data = subprocess.run(GIT + ["-C", ds, "cat-file", kind, oid], check=True, capture_output=True).stdout
    if hashlib.sha1(f"{kind} {len(data)}\0".encode() + data).hexdigest() != oid:
        raise RecordError(f"design-system object {oid} does not hash to its id")
    return data


def git_tree(ds: str, commit: str) -> dict:
    """{path: (mode, blob id)} of a commit, every commit and tree object verified on the way."""
    body = git_object(ds, commit, "commit")
    tree = re.match(rb"tree ([0-9a-f]{40})\n", body)
    if not tree:
        raise RecordError(f"design-system commit {commit} has no tree")
    out = {}

    def walk(oid: str, prefix: str) -> None:
        data, i, seen, names = git_object(ds, oid, "tree"), 0, [], set()
        while i < len(data):
            sp, nul = data.index(b" ", i), data.index(b"\0", i)
            mode, name, sub = data[i:sp].decode(), data[sp + 1:nul].decode(), data[nul + 1:nul + 21].hex()
            i = nul + 21
            key = name + ("/" if mode == "40000" else "")
            if mode not in ("100644", "100755", "120000", "40000", "160000") or name in ("", ".", "..") or "/" in name \
                    or name in names or (seen and key <= seen[-1]):
                raise RecordError(f"design-system tree {oid} is malformed at {name!r}")
            seen.append(key)
            names.add(name)
            if mode == "40000":
                walk(sub, prefix + name + "/")
            else:
                out[prefix + name] = (mode, sub)
    walk(tree.group(1).decode(), "")
    return out


def git_reader(ds: str, commit: str) -> Callable[[str], bytes]:
    tree = git_tree(ds, commit)

    def read(rel: str) -> bytes:
        if rel not in tree or tree[rel][0] not in ("100644", "100755"):
            raise RecordError(f"{rel} is not a file at design-system commit {commit}")
        return git_object(ds, tree[rel][1], "blob")
    return read


def load_config(path: str) -> dict:
    raw = Path(path).read_bytes()
    cfg = json.loads(raw)
    cfg["_sha256"] = sha(raw)
    if not cfg.get("record_section"):
        raise SystemExit("the configuration names its record_section")
    figs = cfg.get("figures")
    if figs:
        if "manifest" not in figs:
            raise SystemExit("figures need a manifest file")
        mp = (Path(path).parent / figs["manifest"]).resolve()
        figs["entries"] = json.loads(mp.read_text(encoding="utf-8"))["figures"]
        figs["_dir"] = str(mp.parent)
        figs["_manifest_sha256"] = sha(mp.read_bytes())
    return cfg


def build_page(src_text: str, rec_text: str, artifact: str, cfg: dict, ds: str, commit: str, rendered: str):
    """(page, renderer, full commit, commit date): the one render path, shared by render and check."""
    commit = subprocess.run(GIT + ["-C", ds, "rev-parse", "--verify", commit + "^{commit}"], check=True,
                            capture_output=True, text=True).stdout.strip()
    stamp = re.search(rb"\ncommitter [^\n]*> (\d+) ([+-]\d{4})\n", git_object(ds, commit, "commit"))
    secs, tz = int(stamp.group(1)), stamp.group(2).decode()
    offset = (1 if tz[0] == "+" else -1) * (int(tz[1:3]) * 60 + int(tz[3:]))
    date = _dt.datetime.fromtimestamp(secs, _dt.timezone(_dt.timedelta(minutes=offset))).strftime("%Y-%m-%d")
    figs = cfg.get("figures")
    reader = (lambda fid: (Path(figs["_dir"]) / figs["entries"][fid]["path"]).read_bytes()) if figs else None
    src = parse_source(src_text, cfg)
    glosses, rows = parse_record(rec_text, cfg["record_section"])
    r = Renderer(src, glosses, rows, artifact, cfg, git_reader(ds, commit), commit, date, reader)
    return r.render(rendered), r, commit, date


def cmd_render(a) -> int:
    if a.rendered and not TIMESTAMP.fullmatch(a.rendered):
        print(f"usage error: --rendered {a.rendered!r} is not a timestamp with a time and an offset", file=sys.stderr)
        return 2
    cfg = load_config(a.config)
    src_bytes, rec_bytes = Path(a.source).read_bytes(), Path(a.record).read_bytes()
    try:
        page, r, commit, date = build_page(src_bytes.decode("utf-8"), rec_bytes.decode("utf-8"), a.artifact, cfg,
                                           a.design_system, a.commit,
                                           a.rendered or _dt.datetime.now().astimezone().isoformat(timespec="seconds"))
    except RecordError as e:
        print(f"record error: {e}", file=sys.stderr)
        return 1
    out = Path(a.out)
    pb = page.encode("utf-8")
    out.write_bytes(pb)
    build = {"artifact": a.artifact, "out": str(out), "out_sha256": sha(pb), "out_bytes": len(pb),
             "source": a.source, "source_sha256": sha(src_bytes), "record": a.record,
             "record_sha256": sha(rec_bytes), "record_section": cfg["record_section"],
             "config": a.config, "config_sha256": cfg["_sha256"], "renderer": Path(__file__).name,
             "renderer_sha256": sha(Path(__file__).read_bytes()), "commit": commit, "commit_date": date,
             "rendered": r.rendered_at, "deps": r.deps, "foundation_sha256": r.foundation_sha,
             "overlay_sha256": r.overlay_sha, "applied": r.applied, "figures": r.figs_log}
    Path(str(out) + ".build.json").write_text(json.dumps(build, indent=1, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"out": out.name, "sha256": build["out_sha256"], "bytes": len(pb),
                      "annotations": len(r.applied), "figures": len(r.figs_log)}))
    return 0


def cmd_check(a) -> int:
    cfg = load_config(a.config)
    out_bytes = Path(a.out).read_bytes()
    build_bytes = Path(a.out + ".build.json").read_bytes()
    build = json.loads(build_bytes)
    src_text = Path(a.source).read_bytes().decode("utf-8")
    rec_text = Path(a.record).read_bytes().decode("utf-8")
    try:
        res = check_artifact(src_text, rec_text, a.artifact, cfg, out_bytes.decode("utf-8"), build,
                             config_sha256=cfg["_sha256"], build_sha256=sha(build_bytes))
        res["out"] = Path(a.out).name
    except RecordError as e:
        res = {"tool": "check", "out": Path(a.out).name, "out_sha256": sha(out_bytes), "fails": [f"source: {e}"]}
    if a.design_system and "inputs" in res:
        # Reproduce: render again from these inputs at the recorded commit and time; compare every byte.
        try:
            page2, r2, commit2, date2 = build_page(src_text, rec_text, a.artifact, cfg, a.design_system,
                                                   build.get("commit", ""), build.get("rendered", ""))
            again = page2.encode("utf-8")
            res["reproduced"] = again == out_bytes
            recorded = {"commit": commit2, "commit_date": date2, "deps": r2.deps, "foundation_sha256": r2.foundation_sha,
                        "overlay_sha256": r2.overlay_sha, "applied": r2.applied, "figures": r2.figs_log}
            drift = [k for k, v in recorded.items() if build.get(k) != v]
            res["owner_files_verified"] = res["reproduced"] and not drift
            res["commit_on_origin_main"] = subprocess.run(GIT + ["-C", a.design_system, "merge-base", "--is-ancestor", commit2,
                                                                 "refs/remotes/origin/main"], capture_output=True).returncode == 0
            if drift:
                res["fails"].append(f"reproduction: the build record's {', '.join(drift)} differ from a render of its inputs")
            if again != out_bytes:
                at = next((i for i, (x, y) in enumerate(zip(again, out_bytes)) if x != y), min(len(again), len(out_bytes)))
                res["fails"].append(f"reproduction: this renderer does not reproduce the output from its inputs "
                                    f"(first difference at byte {at})")
        except (RecordError, subprocess.CalledProcessError) as e:
            res["reproduced"] = False
            res["fails"].append(f"reproduction: the output could not be rendered again: {e}")
    text = json.dumps(res, ensure_ascii=False, indent=1)
    if a.json:
        Path(a.json).write_text(text, encoding="utf-8")
    print(text)
    return 1 if res["fails"] else 0


def cmd_probe(a) -> int:
    res = probe(Path(a.out))
    text = json.dumps(res, indent=1)
    if a.json:
        Path(a.json).write_text(text, encoding="utf-8")
    print(text)
    return 1 if res["fails"] else 0


def cmd_owner_check(a) -> int:
    res = owner_check(Path(a.out), a.design_system)
    text = json.dumps(res, indent=1)
    if a.json:
        Path(a.json).write_text(text, encoding="utf-8")
    print(json.dumps({k: res[k] for k in ("out", "out_sha256", "design_system", "fails")}, indent=1))
    return 1 if res["fails"] else 0


def cmd_manifest(a) -> int:
    notes = [tuple(x.split("=", 1)) for x in a.note]
    try:
        text = manifest(Path(a.out), Path(a.checks), a.report, notes)
    except EvidenceError as e:
        print(f"evidence error: {e}", file=sys.stderr)
        return 1
    Path(a.manifest).write_text(text, encoding="utf-8")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = p.add_subparsers(dest="cmd", required=True)
    for name in ("render", "check"):
        s = sub.add_parser(name)
        s.add_argument("--source", required=True)
        s.add_argument("--record", required=True)
        s.add_argument("--artifact", required=True, help="statement-key prefix of this artifact, e.g. XX")
        s.add_argument("--config", required=True)
        s.add_argument("--out", required=True)
        if name == "render":
            s.add_argument("--design-system", required=True, help="a design-system-ASK checkout")
            s.add_argument("--commit", required=True, help="the owner commit to seal from")
            s.add_argument("--rendered", help="render timestamp to record")
        else:
            s.add_argument("--json", help="also write the result here")
            s.add_argument("--design-system", help="a design-system-ASK checkout: also render again and compare every byte")
    s = sub.add_parser("probe")
    s.add_argument("--out", required=True)
    s.add_argument("--json")
    s = sub.add_parser("owner-check")
    s.add_argument("--out", required=True)
    s.add_argument("--design-system", required=True, help="a design-system-ASK checkout whose tools/ is the build's commit")
    s.add_argument("--json")
    s = sub.add_parser("manifest")
    s.add_argument("--out", required=True)
    s.add_argument("--checks", required=True)
    s.add_argument("--report", action="append", default=[], help="an owner-check or probe report of this output")
    s.add_argument("--note", action="append", default=[], help="LABEL=TEXT, recorded under Notes")
    s.add_argument("--manifest", required=True)
    a = p.parse_args(argv)
    return {"render": cmd_render, "check": cmd_check, "probe": cmd_probe, "owner-check": cmd_owner_check,
            "manifest": cmd_manifest}[a.cmd](a)


if __name__ == "__main__":
    sys.exit(main())
