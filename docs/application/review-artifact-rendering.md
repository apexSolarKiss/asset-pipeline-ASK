# Review-Artifact Rendering

## Posture

The usage contract for `scripts/render_review_artifact.py`, the maintained way this repository renders a review artifact: a reader-facing copy of one intake output, with its review presentation, sealed as one self-contained HTML file. It is a bounded renderer, not a publishing framework, a generation runtime, a schema for the evidence-and-authority record, or a validator of authority.

## Owners

Three owners meet here, and the renderer takes the side of none of them:

- **Content and authority:** [`brand-intake-artifact-contract-v1.md`](brand-intake-artifact-contract-v1.md). It decides what each artifact says, where each statement belongs, how authority survives transmission, and what a reviewer is asked to judge. The renderer applies its rule that review presentation is "composed from the content and the record, and never written into the content source".
- **Presentation:** [design-system-ASK](https://github.com/apexSolarKiss/design-system-ASK). Its Class B `output-artifact` contract (`patterns/output-artifact/`) governs the sealed file. Its document register, Spectral State, Evidence State and Review Semantics (`review-semantics.md`) govern how review state is drawn, including the shared bordered label a review mark carries and the labeled range an annotation range draws (`surface-treatments.css`). Read them at the commit the artifact's manifest records.
- **This document:** the build interface, the compositions the renderer supports, and how a rendered artifact is verified.

## Inputs

- **The semantic source:** one Markdown file per artifact.
  - It has a plain `# ` title, then `**Key:** value` header lines, then `## ` sections.
  - Sections hold one-line paragraphs, `- ` and `1. ` lists and tables, separated by blank lines. A table's header row is followed by its delimiter row (`|---|`), and a statement key on a table goes before the header row or inside a cell. Inline, `**bold**` and code spans are supported.
  - Detected and refused, not passed through: a deeper heading, a quotation, a `*`, `+` or `1)` list, a code fence, an indented or continued line (including a line directly after a table, a table directly under a list item, and a numbered item not starting at 1 directly under a paragraph), list items of one kind split by a blank line (one loose list in Markdown), an empty list item, a line of dashes or equals signs directly under text, a closing `#` sequence on a heading, a thematic break other than `---`, a tab after a list marker, block syntax (a heading, quotation, list marker, table row or link definition) directly behind a leading statement key or a list marker, a task box, a numbered list starting at 0, a table whose first heading is empty, a link, a bare URL, a reference link or footnote, raw HTML or an autolink, an HTML entity, strikethrough (double or single tilde), underscore emphasis or an underscore at the start of a word, single-asterisk emphasis, `**` that does not touch the words it marks (an opener before a space, a closer after one), bold markers inside a code span, `\|` outside a table, a statement key inside a code span, figure references joined by a dash or "to" other than as a range, a figure reference in a section heading or a header line, direction marks, overrides, embeddings and isolates (in the title and header too), a backslash escape other than `\|`, an HTML comment that is not a statement key, and a statement key in a section heading. Other text is carried as written, and the fidelity check compares it word for word.
  - Each statement carries a stable key as an HTML comment, such as `<!-- XX-1.2 -->`. A key at the start of a paragraph, list item or table cell owns the text up to the next such key, or the end of its section. A key inside a unit starts a word and owns the text to the end of that unit, or to the next key in it.
- **The review record:** a Markdown file holding the evidence-and-authority record. The renderer reads one section of it, named by the configuration's required `record_section`, and two tables in that section:
  - **the key table,** `| Entry | Words | Gloss | Show |`. One row per mark or key the copy explains at its head, such as `review:proposed` or `basis`. `Show` is `used` or `always`;
  - **the annotation table,** `| Key | Applies to | Item | Mark | Words | Value |`. One row per item; `\|` is a literal pipe.

  The section occurs once, as that `## ` heading and in no other heading form, and holds one key table and one annotation table, each with its delimiter row. Any other table in it is refused, including one started by a blank line inside a table, and so is a line inside a table that is not a `|` row. An HTML comment, raw HTML, a code fence or a setext heading anywhere in the record, and inline HTML, a quotation or a direction mark in its section, are refused, because a Markdown reader would hide, show or divide them differently; a heading that reads as the section's name in any other form (spacing, emphasis, code, a link, a character reference or an invisible character) is refused too. The table form is this renderer's input. It does not settle the form of the evidence-and-authority record, which the intake contract holds open.
- **The configuration:** a JSON file. It holds:
  - the record section's heading and the key pattern, and optionally `artifacts`, the artifact prefixes the record may use. Rows of other artifacts are checked against the key pattern only; their vocabulary is checked when their own artifact is rendered;
  - the declared set of basis values, required when the record shows a basis;
  - header and colophon lines, supplied as instance values, with no figure reference or direction mark, and the page language as a language tag;
  - the heading of the key section (`key_heading`), the page language (`lang`, default `en`), the number of words a note's quote keeps before it is shortened (`quote_words`, default 8), and the figure settings (`id_pattern`, the range separator `range`, default an en dash, and `manifest`);
  - exclusions: patterns that must not appear in the visible text. `exclude_footer` leaves the colophon out of an exclusion's scope, and `allow_source_versions` allows the version tokens the source's own header names.
- **Figures:** optional. Identifiers in backticks, matching a configured pattern, resolve to numbered figures. A figure manifest lists each identifier's payload file, SHA-256, pixel size and media type. The renderer embeds declared payloads and checks their hashes. It does not derive, crop or retouch images.
- **The design system:** a design-system-ASK checkout and one commit. Every owner file is read from that commit, verbatim. A deployed documentation mirror is not a build input.
  - The commit must carry what the renderer's markup needs: the bordered label on review marks and the annotation range, which design-system-ASK first carries together at #183 (`aa88830`). `render` refuses a commit whose `surface-treatments.css` or `review-semantics.css` lacks them. That is a compatibility preflight on the owner's source, not proof that the sealed file conforms; the owner's checker and the rendered proof are.
  - A file built from an earlier commit is verified with a renderer revision that reproduces it byte for byte at its recorded commit, not reinterpreted by this one.

## Annotation rows

| Column | Values |
| --- | --- |
| Key | a statement key matching the key pattern, or `XX-*` for the whole artifact `XX` |
| Applies to | `whole`, or an exact passage of the key's source text in double quotes |
| Item | `review`, `evidence`, `state`, `basis`, `check` or `statement`. A check names itself in Words and takes no mark; it is shown as its name, ` // `, then its result |
| Mark | the role: for review `proposed`, `open`, `accepted`, `declined`, `none` |
| Words | the owner's wording for that role: Proposed or Correction requested, Open question, Accepted, Declined, No decision recorded |
| Value | the item's metadata. A shown decision names what · who · scope, and an open question what · who decides; on a passage, the quoted words stand for "what". A basis value comes from the declared set. A statement is a full sentence that names what it concerns |

## Placement

- **`whole`** covers the key's text when that text is whole blocks, or one list item or table cell. The items follow that content as one row, in the owner's order: state, basis, evidence, review, then any check, unless they open an annotation range.
- **An annotation range** opens where a review judgment covers several whole blocks of one key, or one whole list, because placement alone would leave its extent unclear. It is `.doc-annotation-range.surface-labeled-range` with `.doc-group`:
  - its first child is the row naming its one review judgment, the review item first, then state, basis, evidence and any check;
  - the blocks it covers follow, each with its own rows and figures in place, and the range's statements stand after its last block, where its row would;
  - every note on words inside it, in a paragraph, list item or cell, follows the range.

  A single paragraph or table judged whole keeps its row after it, and a whole-artifact row takes no range. The scope rail, its color and the lane the host keeps for it are the owner's; the renderer adds no rail or label CSS.
- **A passage** must occur exactly once in the key's text. It may not start or end inside bold, a code span or a figure reference.
  - A pending review item (Proposed, Open question) on a passage tints those words. An annotation note after the block and its row (after the range, for words inside one) quotes them, shortened past `quote_words` words; the tint and the note's link carry the exact scope. Pending passages may not overlap. Every other item on that passage goes into the same note, unquoted, and a review item among them names its own what, who and scope.
  - Items on a passage with no pending review item sit in a row that quotes the words in full, once, a check included. Because a quote names words, not a place, those words must occur only once in the text the row follows, as a reader sees it: every kind of space counts as one space, compatibility normalization (NFKC) and default-ignorable characters are ignored, and overlapping occurrences count. A passage may not start or end inside a character a reader sees as one: an accent, a composed character or an emoji sequence.
  - A passage that is a whole paragraph, list item or table cell is that unit's row.
- **Where rows and notes sit:**
  - After a paragraph: the paragraph, its row, any notes, then the figures it references. In a group of blocks, each block is followed by its own row, notes and figures, and the group's row follows the last block, before that block's notes and figures.
  - In a table cell, items sit in the cell, as the owner's composition places them. A note or statement for words in a cell sits in the cell too, after the cell's text.
  - In a list item, the item's text is set as its own paragraph inside the item, and its row and notes follow that paragraph inside the item. This is the renderer's reading of "after the block" for list items; the owner's checker accepts it.
  - In an annotation range, the row opens the range, and the notes on words inside it follow the range, including notes that would otherwise sit in a list item or cell.
- **A whole-artifact row** (`XX-*`) follows the header.
- **A statement** is a neutral sentence in the metadata role, after its content's row. It carries no mark and is shown in the record's words, unquoted, so a statement on a passage names the words it concerns itself. Use it for a condition on the operative use of a statement that keeps its authority, or to say which part of a marked statement is not the proposal.
- **Document roles stay as they are:** a quotation stays a quotation and a list stays a list. No rail, panel or underline is drawn on content to show review state. An annotation range's scope rail, the owner's, sits in the outer margin and shows only which blocks one judgment covers.

## The renderer fails closed

It stops, naming the line, key, row or figure concerned, when:

- the source uses Markdown outside the subset above;
- the record section is missing or repeated, or holds an unknown table, a malformed or indented row, a key outside the key pattern, or a prefix outside the declared artifacts;
- a key-table entry is not `basis`, `check` or a role the renderer draws;
- a key is unknown or sits inside a word, or a passage is missing, occurs more than once, sits in a table heading, or cuts through bold, code or a figure reference;
- a decided passage's quoted words occur more than once in the text its row follows;
- `whole` covers only part of a unit, or several units without their whole block;
- a role, its words or a basis value is outside its vocabulary or declared set;
- a check item carries a mark, or a key-table row's `Show` is not `used` or `always`;
- a shown decision has fewer fields than what, who and scope, or an open question fewer than what and who decides (the fields' contents are the record's);
- one passage would carry two pending marks, pending passages overlap, or annotation scopes overlap;
- a judgment on several whole blocks or a whole list carries more than one review item, or a decided review judgment, or one on a whole paragraph, list item or cell, sits inside the blocks its range covers, since a range carries one judgment (pending words inside it keep their passage mark, and its note follows the range);
- the design-system commit lacks the bordered label or the annotation range;
- a figure payload differs from its manifest, a figure range is not ascending, does not cover consecutively numbered figures or ends with an identifier not written like its start, or a figure is referenced outside body text;
- the render time given is not a timestamp.

It never infers authority from wording, an actor or a color. Which content carries which mark, and why, is decided in the record and reviewed there.

## Supported and unexercised compositions

Supported:

- every item kind, in the owner's order: state, basis, evidence, review and check;
- every review role and its words: Proposed, Correction requested, Open question, Accepted, Declined and No decision recorded, each review mark drawn as the shared bordered label;
- rows after paragraphs, lists, tables and groups of blocks;
- annotation ranges over several whole blocks of one key or one whole list, opened by their row, including blocks that hold lists, tables and figures;
- items inside table cells, and rows after a list item's text;
- passage marks with their notes;
- whole-artifact rows;
- statements;
- figures.

Not emitted: collapsible sections, framing or synthesis panels, quotations, the Not yet testable evidence role, and annotation ranges over one of several statements in a table cell (so the owner's first-column range lane, `.doc-table-scroll--range-lane`, is not used). Annotations on those compositions are therefore unexercised by this renderer. Of the evidence and state roles, the tests exercise Supported and Earned; the others are checked for their words only. Extending to them means verifying them against the owner checker at the pinned commit, including any owner correction that concerns them; it does not mean refusing them as a rule.

## Verifying a rendered artifact

1. **`check`** reads the rendered file back under the renderer's closed grammar and compares it with its source, its record, its configuration and its build record:
   - **the grammar:** a doctype, then only the elements, classes and attributes the renderer emits, nested where it nests them, with text only where it puts text, every tag written as the renderer writes it and no character reference it does not write (so Python's parser and a browser read the same tokens), every end tag explicit and no attribute repeated. Anything else fails: a hidden or template element, free text in a row, an element a browser would move (such as a row inside a list but outside its items, or inside a table but outside its cells), a comment, a marked section or a processing instruction. A review mark in a row or note carries exactly the bordered label's classes, and an evidence or state mark does not; the key section is compared element by element. An annotation range sits only in a section's flow, opens with its row, and holds no group, other range, note or second review mark. So the order `check` reads is the tree a browser builds, and nothing is shown that is not read. Invisible, control, direction-changing or unusual space characters must stand exactly where the source has them in each text unit; elsewhere they appear only where the strings the renderer reads have them, and rows, notes, statements, the key section, the header and the colophon are compared with only ordinary spaces folded;
   - **identity:** the build record must name this file's exact bytes and size, and the exact source, record and configuration given, the same artifact and record section, a full design-system commit and a real date, a real render time with its offset, the annotations the record resolves to, and the figure manifest's payloads. A build record that describes other bytes or other inputs fails, however well the page reads;
   - the title (heading and `<title>`), the header lines and their bold and code, the body word for word (apart from keys removed and identifiers resolved), every paragraph, list item, heading and cell holding exactly its source text, each list item at its index and each cell at its row and column (every row as wide as the head), each unit's bold, code and figure links at their positions, each block's kind and extent (paragraph, list, numbered list and its start, table and its name), the sections, the colophon (the design-system commit line, with its commit as code, and the configured lines) and the page language. The body comparison uses its own transform of the source;
   - **figures:** numbered by their first reference in the source, each after the block that first references it, with the figure manifest's image (as canonical base64), caption and size, the size also measured from the image's own header, read by the PNG or JPEG format's grammar;
   - **placement:** every annotation row's items, and every passage mark's words and role, every note's pairing, every statement and every figure grid, at its exact place and in the composition's order;
   - items in the owner's order (the review item first in the row that opens a range), and every shown decision whole;
   - the key section, element by element;
   - sealed delivery:
     - exactly the two style blocks, in the head;
     - the sealed block exactly the owner files under their banners, in the owner order, each module, the foundation, the fonts and the template overlay identical to what the build recorded, and no other file recorded;
     - the embedded fonts the owner's;
     - no link, import (`@import`), outside URL in a CSS `url()`, `image-set()` or `src()` written in any letter case without CSS escapes, script, frame, embedded object, base, form, refresh, inline style, comment or template marker. Other CSS is verified byte for byte only by reproduction;
     - internal links resolving, and figure payloads matching;
   - the configured exclusions.

   With `--design-system`, `check` also renders the artifact again from the same inputs, at the build record's commit and render time, and compares every byte, and every owner file, annotation and figure the build record lists. That is the only claim that this renderer produces this file, and the only verification of the owner files against the design system itself; without it, the owner files are checked against the build record only. The check result names the output, the inputs, the build record (by the hash of its file), the renderer the build record names, the checker that ran, and whether the file was reproduced.

2. **`owner-check`** runs `tools/check-role-conformance.mjs` from a design-system-ASK checkout, in light and dark, at desktop and narrow widths. It fails when any file under the checkout's `tools/` differs, byte for byte, from the build record's commit as read from hash-verified objects (so no index flag, replace ref or rewritten object can stand in), when `tools/` holds a symlink or an extra file, or when the build record beside the file describes other bytes. Its report names the file's hash, taken before and after the run, and the build record's hash. The checkout's HEAD need not be the build record's commit: what must match is the bytes of `tools/`. The report records the checkout's HEAD, the recorded pin (the build record's commit) and whether `tools/` is identical to the pin's tree. A pass has one run in each scheme, light and dark, at each width, each with no finding, nothing unmapped, governed elements, and as many marks, passage marks, notes and annotation ranges as the file holds, counted as the owner counts them: every element with the class. The owner reports a count only for what it found, so a count it does not report is zero; a run that reports no counts at all is not a pass. Only `tools/` is verified; the rest of the checkout is not.
3. **`probe`** renders an `.html` file in headless Chrome at desktop and narrow widths, in light and dark, and fails unless the browser rendered it as the artifact's HTML in the scheme asked for. It reports overflow, broken images, loaded fonts, dead links, scrolling tables and annotation counts, under the file's hash and name.
4. **`manifest`** writes the artifact's provenance record only from evidence that describes the file. It recomputes the file's hash and refuses, writing nothing:
   - a build record that names other bytes;
   - a check result made of other bytes, against another build record, or with other inputs, one that did not reproduce the file (`check --design-system`), or one that failed;
   - A report whose output hash or file name differs from the artifact's, whose kind is neither owner-check nor probe, or an owner-check report whose recorded build-record identity or recorded design-system pin differs from the artifact's build record.

   A correctly bound owner-check or probe report may record a failure. `manifest` includes that report with its FAIL result rather than refusing the provenance record. Successful manifest creation means the record was written; it does not mean every reported check passed and does not authorize delivery. An omitted optional report supplies no evidence that its check passed. The applicable delivery gate still requires its own checks and approvals.

   Each identity it records says how it is known: hashed from the file, checked, reproduced, or as recorded. Every recorded value, file name and note is escaped, so none can add a row, a cell, emphasis or strikethrough. The check result must name this file. It records the check result's own hash, names each report by its kind, and says whether the design-system commit is reachable from the checkout's `origin/main`. Notes passed with `--note` are recorded under their labels.

**How placement is checked.** An annotation's place is the number of non-space content characters before it, with the section, block group and list item or table cell it sits in, each as its span of content characters. The check reads that from the page. It compares it with the span the record's key and *Applies to* resolve to in the source:
- a row or statement for blocks must follow the last of them, in the group of exactly those blocks when there are several, with the group's row last in it;
- a row that opens an annotation range must sit before its first block, in the range of exactly those blocks, and the range's statements after its last block, inside it. The rows, statements and figures of the blocks it covers must sit in that range, and a plain group over the same blocks does not stand in for it;
- a row for a list item or table cell must sit in that item or cell;
- a passage mark must start at its words;
- a note must follow its block and row, or sit in its item or cell; a note on words inside a range must follow the range, outside any group.

Because every unit holds exactly its source text, a place names one point in the source, even inside a word. Repeated wording cannot carry a decision to another statement. Rows, statements, notes and figure grids must also come in the composition's order: a range's row before its first block; an item's or cell's rows, notes and statements; after a block, its own rows and statements, then its group's when it ends one, then its notes, then its figures; after a range, the notes on words inside it. So a range that has been moved, extended or shortened fails, though its row and words are unchanged.

**Limits.**
- The placement checks re-resolve the record with the renderer's own reader. They confirm that each annotation sits at the span the reader resolves; they do not independently re-derive which text a key owns. The tests cover the reader, and the check confirms that the reader and the fidelity transform agree on every word's position.
- The grammar is the renderer's present output. A change to what the renderer emits is a change to `check`.
- Without `--design-system`, the page's CSS is checked against the hashes in the build record only, so text drawn by a stylesheet is verified only by reproduction. That is why a manifest needs a reproduced check.
- A row for a group of blocks with no review judgment sits in a wrapper the reader does not see, so on screen it follows the group's last block; its decision record's *what* must name the group. A review judgment on a group or a list shows its extent with a range. A statement names its own subject, because its place shows only the block, item or cell it follows.
- The renderer opens a range only for a judgment on several whole blocks of one key or one whole list. Neither `check` nor the owner's checker judges whether that is the extent the judgment should cover; that belongs to the record's review.
- Homoglyphs (letters from other scripts that look alike) are not folded when a quote's uniqueness is tested, and direction marks are refused, so right-to-left text is not supported.
- Markdown's emphasis rules are approximated: `**` must touch its words on the inside; finer cases of punctuation next to `**` follow the renderer's pairing. The refusals cover GitHub-flavoured Markdown's core syntax; other extensions a particular reader adds are not tested.
- Characters a reader sees as one are recognized for accents, composition and the common emoji sequences, not by full Unicode segmentation.
- A URL in a note or a recorded value may still be shown as a link by a reader that links bare URLs.
- Whether the design-system commit is published is not proved offline: the manifest reports whether the checkout's `origin/main` reaches it, and anyone can confirm the commit against the published repository.
- A hash shows which bytes were checked, not that they are right; a renderer check confirms what was transmitted. Neither can confirm that a statement's assigned authority is right; that judgment belongs to the record's review.

## Lifecycle

A reviewed or shared review artifact is frozen. A later render is a new artifact under a new name, with its own manifest. Earlier renders, sources and records stay unchanged. The renderer does not enforce this: it writes to the path it is given, so choosing a new name is part of making a later render.
