# tools/read

`read_gen.py` builds the site. It copies `docs/` as authored, except `docs/vercel.json`, hidden files, and hidden and symlinked directories, and adds the pages it generates under `read/`: one reading page per declared document and record, one read-only source view per declared source or data file, and a documents index.

The site root keeps the authored AP-ASK landing page, `docs/index.html`; `declared.json` names it as the home page and as a front door, and every generated page's breadcrumb links it.

The Markdown and the source files stay the only source. The generated pages are build output: they are written to the directory the build is given, never into `docs/`, and never committed. Editing a Markdown file is enough to change its page at the next build, with three exceptions, each of which needs `declared.json` changed in the same commit: a new Markdown file at the repository root needs a declared place; a new blockquote in a rendered document needs a declared role; and changing the opening words of a declared passage or block needs its declaration changed to match. Until then the build fails and nothing new is deployed.

A new Markdown file under `docs/` builds without error: the declared default hold keeps it unrendered, and pages link it on GitHub, until it is declared. The gates do apply to every rendered document: a new blockquote, raw HTML or an HTML comment, a second title, a link to a file that does not exist (a held file that is renamed or retired included) or a link in a table header fails the build, and a failed build deploys nothing in that commit, landing-page changes included.

The build changes nothing outside its output: `src/`, `scripts/`, `tests/` and the review-artifact renderer are separate from it.

The pages are static files. Each loads same-site stylesheets, fonts, icons and two scripts, `surface-shell.js` and `surface-document-overflow.js`; the shell script builds the responsive navigation panel from the page's own markup. No content is generated or fetched at runtime, and the site runs no server-side code.

GitHub stays the source of record. Every reading page and source view links its file on GitHub at `main` and its raw file. The raw `.md` and `.js` routes under the site are unchanged, and so are the diagram pages and the site's assets, which the build copies byte for byte; the two front doors, the diagram index and the landing page, differ from their authored bytes only as composed (below).

## Provenance

`read_gen.py`, `vercel-build.sh` and `requirements.txt` are adapted from [`apexSolarKiss/method-ASK`](https://github.com/apexSolarKiss/method-ASK) at `5e3a332164b2973d9eea2337ddeed825ae56ad4d` (`tools/read/`). The renderer, the gates and the page markup are method-ASK's. What differed by repository is declared in `declared.json` instead of written into the code: the repository's name and index copy, the stylesheet, script and wordmark paths, the site directory, the home page, the front doors, the document collections and their output names, default holds, and directory exclusions (`site_exclude` entries ending in `/`), inside which the build's output and report may land. Five behaviors were added: a link to a directory inside the site with no `index.html` of its own, to a Markdown file in the site that is not rendered, or to a hidden file opens on GitHub rather than as a raw file, a missing listing or a file the site does not serve; hidden files are not copied into the site; an authored home page is link-checked like a generated one; a word too long for its line breaks rather than widen the page at narrow widths; and the build's output may sit inside the site only within a directory the declaration excludes, matched case-exactly even before that directory exists, where method-ASK's refused any output inside the site. `requirements.txt` is method-ASK's, unchanged. This repository owns its adapted copy of `read_gen.py`, and `declared.json` supplies the repository-specific configuration. The copy reads declaration keys a site may not use — `home_page`, `held_under`, `collections` or a repository-root `site` — and a key absent from `declared.json` has no effect.

## The front doors

`docs/diagrams/index.html` and the landing page, `docs/index.html`, are each authored once, and they are the only authored files the build changes on their way into the site.

- **Opened from a clone**, without a build, each works as written: its relative links open the files they name, on the diagram page the raw source, data, document and README files included. Its root-absolute icons are the deployment's and do not load from a clone, as before.
- **In the composed site**, the build serves a copy in which each link to a declared source file opens its source view, and each link to a rendered document or record opens its page. A query or `#fragment` on the link is kept. The mapping is the declaration's own; there is no separate list to keep in step.
- **Build-only fragment.** Navigation whose destination exists only in a built site sits in a `<template data-read-build>` element. A template's content is inert, so a clone shows no dead link; the build removes the template tags, each with its line where it stands alone on one, so the content renders. The diagram page's documents route uses one, and the landing page's three links to the technical documentation, its title action, its closing panel and its navigation entry, use one each. The breadcrumb's `AP-ASK` already links the landing page.

Apart from the mapped `href` values and those template tags, the composed copies are the authored bytes, and nothing else under `docs/` is changed.

## Deployment

`docs/vercel.json` runs the build. With the Vercel project's root directory at `docs/`, Vercel runs `sh ../tools/read/vercel-build.sh` there and serves `../_site`. The script:

1. picks a Python 3.10 or later on the build machine, or stops;
2. installs the exact renderer pin into a temporary virtual environment, by hash, from wheels only;
3. runs `read_gen.py build --out _site` at the repository root.

A failed gate fails the build, so a broken document is never deployed. `docs/vercel.json` also carries the site's headers, the `noindex` header on `/images/`, the `/diagrams` redirect, and a `/read` to `/read/` redirect so the documents index, served from a directory, keeps its relative links; the build changes none of them.

## Setup

For local builds you need Python 3.10 or later, with the exact renderer pin installed in a virtual environment outside the repository:

```text
python3 -m venv <venv>
<venv>/bin/python -m pip install --require-hashes --only-binary=:all: -r tools/read/requirements.txt
```

Every mode checks the installed versions first. It exits 2, running nothing, unless they are exactly markdown-it-py 4.2.0, mdit-py-plugins 0.6.1 and mdurl 0.1.2.

## Use

From the repository root:

```text
<venv>/bin/python tools/read/read_gen.py build --out _site
<venv>/bin/python tools/read/read_gen.py check
<venv>/bin/python tools/read/read_gen.py links --site _site
```

- **build** writes the composed site to `--out`. That directory must not exist yet, or must be empty. It may not be the repository, sit inside `docs/` or `.git`, or contain the repository. These are judged by where `--out` physically lands: every symlink in the path, and any `..` after one, is followed first, and when the check fails nothing is staged. Open `_site/index.html`, `_site/diagrams/index.html` or `_site/read/index.html`, or serve `_site/`, to read the result. `--report <file>` writes the pages, link classes, headings and the front-door mapping after a successful build. It may not land inside `docs/` or `.git`, and it may not be `--out`, lie inside it or contain it, judged the same way. That holds whether `--out` exists yet or not: when it does not, the build creates its missing directories for the comparison, so the volume itself decides which spellings name the same directory, and removes them again before anything is staged.
- **check** runs the same build into a temporary directory, prints the digest and removes the directory.
- **links** runs the link check alone over a composed site.

Each successful build prints a digest of the composed tree. Identical inputs give identical digests.

## Gates

The build renders every page in memory first. It publishes nothing when any of these fails:

**The declaration.**
- `declared.json` is malformed: a path not normalized, with a `..` segment, or outside its place; two outputs on one path; a passage or block declaration on a file that is not rendered; an identity string, a chrome path or a front door missing; or an authored home page that is missing, is not the site's root `index.html`, or is declared beside a generated one.
- `docs/read/` exists in the source tree.
- A Markdown file at the repository root, or under `docs/` outside the declared default hold, has no declared place: rendered, a redirect, or held with a reason.

**Each document.**
- It does not have exactly one top-level H1, coming first.
- A relative link, anchor or image does not resolve in the source tree, or a link is root-absolute. A path resolves only if every segment matches its directory entry exactly, case included: a clone on a case-insensitive volume would otherwise accept a link the deployment serves as 404.
- An image names a remote file.
- Raw HTML is anything but the allowlisted image markup: lowercase `<img>` tags whose only attributes are a double-quoted `src` naming a hosted `.png` file in the site and a double-quoted `alt`, each at most once, separated only by spaces, tabs or newlines.
  - Every other element, end tag and attribute fails, `style` and `on*` event handlers included.
  - So do comments, CDATA sections, declarations, processing instructions, a `src` with a URL scheme, and raw text containing `<!`, `<?` or `</script` in any case.
  - HTML written inside a code span or a fenced block is literal text, not raw HTML.
- A blockquote has no declared role, or a passage or block declaration does not name exactly one blockquote or block.
- A declared structured block does not fit its shape.
- A table header holds a link, an image or raw HTML. At narrow widths the header row is hidden, so it would hold an interaction the reader cannot see.

**The front doors and the carriers.**
- An authored front door does not open from a clone. Outside a build-only fragment, a relative link (`<a>`, `<area>`) or resource reference (`href`, `src`, `srcset`) does not resolve, case-exactly, in the source tree, or a link is root-absolute. A root-absolute resource, such as the deployment-root icons, is the site's and is not checked here. A build-only fragment that opens inside another or never closes fails too.
- The front doors' source links, together, do not name exactly the declared source files: a declared source is not linked, or a `.js` file is linked that is not declared.
- The composed front doors do not link each declared source through its source view (`read/source/<file>.html`), link a page in that directory that maps to no declared source, or link a `.js` file directly, as a raw link in a build-only fragment would. A root-absolute link is resolved from the site root for this check. The raw file and GitHub are reached from the view.
- A composed front door leaves a link unclosed, or opens one inside another: a build-only fragment that keeps only one of a link's two tags would do this.
- A carrier a reading page loads does not match its declared sha256.

**After composing.** It then composes the site in a staging directory beside `--out`. It re-reads every written file against its source, and each front door against its composed bytes, and runs the link check over the staging tree:
- every relative `href`, `src` and `srcset` on a generated page, or a composed front door that stays inside the site must exist, case-exactly. One on a generated page that leaves the site is reported as a warning; one on a composed front door fails, because the deployment would not serve it;
- every `#fragment` must name an id in its target page;
- a GitHub fragment must name a heading of that file;
- no link may claim a fragment in a raw Markdown file;
- a composed front door may not link a rendered document as raw `.md`.

Only then does the staging tree become `--out`.

## The declaration

`declared.json` lists:

- `identity` — the name the breadcrumb and page titles use (`AP-ASK`), the documents index's copy, the source views' note, and the front link the pages' footers and navigation name (the diagrams);
- `chrome` — the stylesheets and scripts every generated page loads, in order, and the wordmark pair, as site paths;
- `documents` (under `docs/`) and `records` (the diagram folder's `README.md` and its token mirror's `MANIFEST.md`) — what is rendered: README.md's reader path, its concrete example, and the documents the diagram front door links. `collections` is empty here;
- `redirects`, `held` and `held_under` — what is not rendered, each with its target or reason. `held_under` holds every other Markdown file under `docs/`, the evidence trail, and the documents index lists it with its reason;
- `source_views` — the source and data files the diagram front door's source and data actions open;
- `site_exclude` — authored files under `docs/` that are configuration, not site: `docs/vercel.json`;
- `front_doors` — the authored pages the build composes: `docs/diagrams/index.html` and the landing page, `docs/index.html`;
- `home_page` — the authored landing page, `docs/index.html`, served at the site root;
- `passages` — the role of each blockquote;
- `blocks` — the shape of each structured preformatted block.

**Passages.** A blockquote carries no signal of whose words it holds, so each one is declared by the words it starts with, which must start exactly one blockquote in its document:

| role | meaning | markup |
| --- | --- | --- |
| `quotation` | represented voice: someone's words, quoted or introduced | `blockquote.doc-quote` |
| `callout` | the document's own thesis, question or contrast, set apart | `p.doc-body.surface-emphasis-rail`, or `div.doc-group.surface-emphasis-rail` around several blocks |
| `framing` | the statement that opens a whole part before its sections | the flat panel with a magenta-bordered chip, its word in `chip` |
| `synthesis` | the closing compression of a part | the same panel, its word in `chip` |

**Blocks.** Every fenced block is a plain `.doc-pre`, its text as written, unless `blocks` declares it a grouped diagram. Such a block is declared by the start of its first line, which must start exactly one block in its document, and by its shape:

- **`groups-rail`** — peer groups between blank lines. The unindented lines open each group, and the indented lines beneath them sit one hierarchy rail in, with their shared indentation removed. Any further indentation stays as written.
- **`groups-aligned`** — peer groups between blank lines, each opening on its first line. The lines after it keep every space, because their indentation aligns columns rather than marking a level.

Successive groups sit one line apart. A shape is never inferred from blank lines or capitals: an undeclared block stays plain.

## Links

| link in a rendered document | on the page |
| --- | --- |
| a rendered document, collection entry or record, with or without `#fragment` | its page, fragment kept |
| a `#fragment` into a Markdown file that is not rendered | the file on GitHub at `main`, with the anchor |
| a Markdown file in the site that is not rendered | the file on GitHub at `main`; its raw route stays served |
| another file in the site (a figure, a raster, a source file) | a relative link to that file |
| a directory in the site with no `index.html` | the directory on GitHub at `main` |
| a hidden file, or a file the declaration excludes from the site | the file on GitHub at `main` |
| a repository file or directory outside the site that is not rendered | the file or directory on GitHub at `main` |
| an external URL | unchanged |

Emitted paths are percent-encoded. Heading ids follow GitHub's slugs. Headings move down one level so the Markdown H1 sits under the page's breadcrumb title: H1 to H4 render as `h2` to `h5`, and H5 and H6 both render as `h6`. An image is contained to the column, keeps its aspect ratio and links to its full-resolution file, unless it already sits inside a link. A raw file outside `docs/` is linked on GitHub, since only `docs/` is part of the site.

## Carriers

The pages take design-system-ASK's document register from `carriers/`: `surface-text-link.css`, `surface-document.css`, `surface-treatments.css` and `surface-document-overflow.js`. These are byte-identical copies, never hand-edited here, and the build places them at `read/_dsa/`.

The pages also reuse the diagram folder's token and font mirror (`docs/diagrams/_dsa-tokens/`) and its `surface-panel`, `surface-action` and `surface-shell` carriers. Each file's `sha256` in `declared.json` is its operative identity, and the build checks every one. `carriers.pin` names the owner commit the hashes were read from; the build does not read it, so keeping all nine hashes from that one commit is the re-vendor's job.

When any of them moves — a diagram-carrier re-vendor included — re-vendor the register files from the same commit, then update every `sha256` and the pin in the same change. Until then the build stops.
