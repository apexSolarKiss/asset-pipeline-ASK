"""Unit tests for scripts/render_review_artifact.py.

Loads the script as a module via importlib. The design-system inputs are
small stand-ins, so the tests need no design-system checkout; figure
payloads are generated PNG bytes, so no binary fixture is committed.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import re
import shutil
import struct
import subprocess
import sys
import zlib
from pathlib import Path

import pytest


_REPO_ROOT = Path(__file__).resolve().parent.parent
_SCRIPT_PATH = _REPO_ROOT / "scripts" / "render_review_artifact.py"
_FIXTURES = _REPO_ROOT / "tests" / "fixtures" / "review-artifact"

_spec = importlib.util.spec_from_file_location("render_review_artifact", _SCRIPT_PATH)
assert _spec is not None and _spec.loader is not None
rra = importlib.util.module_from_spec(_spec)
sys.modules[_spec.name] = rra  # dataclasses resolve their module by name
_spec.loader.exec_module(rra)

SOURCE = (_FIXTURES / "source.md").read_text(encoding="utf-8")
RECORD = (_FIXTURES / "record.md").read_text(encoding="utf-8")


def png(seed: int) -> bytes:
    """A 2x2 PNG whose pixel values depend on seed."""
    raw = b"".join(b"\x00" + bytes([seed % 256, 40, 90] * 2) for _ in range(2))
    def chunk(kind: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", 2, 2, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b""))


PAYLOADS = {f"F10{n}": png(n) for n in (1, 2, 3)}


def config(**extra) -> dict:
    cfg = {
        "record_section": "Review marks",
        "key_pattern": "[A-Z]{2}-[0-9.]+",
        "basis_values": ["our test design"],
        "meta_before": [["Prepared for", "Sample reviewer"]],
        "colophon": [["Static freeze", "frozen at render time"]],
        "figures": {"id_pattern": r"F\d{3}", "entries": {
            fid: {"path": f"{fid}.png", "sha256": hashlib.sha256(b).hexdigest(), "width": 2, "height": 2,
                  "media_type": "image/png"} for fid, b in PAYLOADS.items()}},
        "exclusions": [{"name": "internal figure ID", "pattern": r"\bF\d{3}\b"}],
    }
    cfg.update(extra)
    return cfg


def ds_files() -> dict:
    fonts = "".join(f"@font-face{{font-family:x;src:url('fonts/{f}') format('woff2');}}\n" for f in rra.FONTS)
    files = {rra.FOUNDATION: (":root{--fg-1:#000}\n" + fonts).encode(),
             rra.TEMPLATE: ("<html><head><style>\n    .artifact{}\n" + rra.TIER3_MARK + " */\n  </style></head></html>").encode()}
    files.update({f"fonts/{f}": b"stub-" + f.encode() for f in rra.FONTS})
    files.update({m: f"/* stand-in for {m} */\n".encode() for m in rra.REGISTER + rra.SEMANTIC})
    return files


def sha(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def cfg_sha(cfg: dict) -> str:
    return sha(json.dumps(cfg, sort_keys=True))


def render(source: str = SOURCE, record: str = RECORD, cfg: dict | None = None, payloads: dict = PAYLOADS):
    cfg = cfg or config()
    src = rra.parse_source(source, cfg)
    glosses, rows = rra.parse_record(record, cfg["record_section"])
    files = ds_files()
    r = rra.Renderer(src, glosses, rows, "XX", cfg, lambda rel: files[rel], "a" * 40, "2026-01-01", lambda fid: payloads[fid])
    page = r.render("2026-01-01T00:00:00+00:00")
    build = {"artifact": "XX", "out": "sample.html", "out_sha256": sha(page), "out_bytes": len(page.encode("utf-8")),
             "source_sha256": sha(source), "record_sha256": sha(record), "record_section": cfg["record_section"],
             "config_sha256": cfg_sha(cfg), "renderer_sha256": "r" * 64, "commit": "a" * 40, "commit_date": "2026-01-01",
             "rendered": "2026-01-01T00:00:00+00:00", "figures": r.figs_log, "deps": r.deps, "applied": r.applied,
             "foundation_sha256": r.foundation_sha, "overlay_sha256": r.overlay_sha}
    return page, build, r


def check(page: str, build: dict, cfg: dict | None = None, source: str = SOURCE, record: str = RECORD,
          bind: bool = True) -> dict:
    """With bind, the build record is made to describe exactly these bytes and inputs, as a renderer that
    emitted them would record it, so a semantic test is never satisfied by an identity mismatch alone."""
    cfg = cfg or config()
    if bind:
        build = dict(build, out_sha256=sha(page), out_bytes=len(page.encode("utf-8")), source_sha256=sha(source),
                     record_sha256=sha(record), config_sha256=cfg_sha(cfg))
    return rra.check_artifact(source, record, "XX", cfg, page, build, config_sha256=cfg_sha(cfg))


def edit(text: str, old: str, new: str) -> str:
    assert text.count(old) == 1, old
    return text.replace(old, new)


# ---------------------------------------------------------------- rendering

def test_render_seals_owner_modules_in_order_and_embeds_fonts():
    page, _, r = render()
    order = re.findall(r"/\* === SEALED design-system-ASK (\S+)", page)
    assert order == [rra.FOUNDATION, *rra.REGISTER, *rra.SEMANTIC]
    assert "url('fonts/" not in page and page.count("data:font/woff2;base64,") == 4
    assert "<link" not in page
    assert set(r.deps) >= {rra.FOUNDATION, rra.TEMPLATE, *rra.REGISTER, *rra.SEMANTIC}


def test_passage_mark_and_its_note_follow_the_owner_markup():
    page, _, _ = render()
    assert '<mark class="doc-passage-mark" data-review="proposed" aria-describedby="review-note-1">two props or fewer</mark>' in page
    note = re.search(r'<div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-1">(.*?)</div></div>', page).group(1)
    assert 'data-review="proposed">Proposed</span><span class="doc-meta">on “two props or fewer”</span>' in note


def test_a_tables_row_follows_the_table_before_its_figures():
    page, _, _ = render()
    group = re.search(r'<div class="doc-group"><div class="doc-table-scroll".*?</table></div>(<div class="doc-annotations">.*?</div>)<div class="review-figures">', page, re.S).group(1)
    assert group.index("Basis") < group.index('data-review="accepted"') < group.index('data-review="proposed"')


def test_a_list_items_row_follows_its_text_as_a_block():
    page, _, r = render()
    li = re.search(r"<li><p class=\"doc-body\">detail photographs.*?</li>", page).group(0)
    assert li.startswith('<li><p class="doc-body">detail photographs are optional and are added only by explicit choice;</p><div class="doc-annotations">')
    assert "on “" not in li
    assert any(a["key"] == "XX-2.2" and a["anchor"] == "unit" for a in r.applied)


def test_a_decided_passage_is_quoted_in_full_and_once():
    rec = edit(RECORD, '| XX-1.2 | "Every image starts from a photograph of the room." | review |',
               '| XX-1.2 | "Every image starts from a photograph of the room." | basis | | | our test design |\n'
               '| XX-1.2 | "Every image starts from a photograph of the room." | review |')
    page, _, _ = render(record=rec)
    row = re.search(r'<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-label">Basis</span>.*?</div>', page).group(0)
    assert row.count("on “Every image") == 1
    assert "on “Every image starts from a photograph of the room.” · studio lead · this test" in row


def test_a_note_follows_its_blocks_row():
    rec = edit(RECORD, '| XX-1.3 | whole |', '| XX-1.2 | whole | review | open | Open question | the frame rule · the reviewer |\n| XX-1.3 | whole |')
    rec = edit(rec, '| XX-1.2 | "Every image starts from a photograph of the room." | review | accepted | Accepted | studio lead · this test |\n', '')
    page, _, _ = render(record=rec)
    group = re.search(r'<div class="doc-group"><p class="doc-body">The frame keeps.*?</div></div>', page, re.S).group(0)
    assert group.index('data-review="open"') < group.index("doc-annotation-note")


def test_a_paragraph_with_only_a_note_is_grouped_with_it():
    rec = edit(RECORD, '| XX-1.2 | "Every image starts from a photograph of the room." | review | accepted | Accepted | studio lead · this test |\n', '')
    page, _, _ = render(record=rec)
    assert '<div class="doc-group"><p class="doc-body">The frame keeps <mark' in page


def test_statement_is_neutral_metadata_after_its_block():
    page, _, _ = render()
    assert '<p class="doc-meta review-statement">Uses “target view”. If the reviewer leaves that term open, read “real or approved”.</p>' in page


def test_document_row_and_key_section():
    page, _, _ = render()
    head = page.split('<section class="doc-section" id="marks">')[0]
    assert 'data-review="none">No decision recorded</span><span class="doc-meta">adoption of this guide · the reviewer</span>' in head
    key = re.search(r'id="marks">(.*?)</section>', page, re.S).group(1)
    assert key.count("doc-mark") == 4 and "Basis" in key


def test_state_evidence_check_and_declined_items_render_in_the_owners_order():
    rec = edit(RECORD, "| basis | Basis | Where a marked statement comes from. | always |\n",
               "| basis | Basis | Where a marked statement comes from. | always |\n"
               "| review:declined | Declined | A decision recorded against it, by the party and for the scope named beside it. | used |\n"
               "| evidence:supported | Supported | The evidence named beside it supports the statement. | used |\n"
               "| state:earned | Earned | Established by the work named beside it. | used |\n"
               "| check | Check | A check that was run, and its result. | used |\n")
    rec = edit(rec, "| XX-1.3 | whole |", "| XX-1.1 | whole | check | | Contrast | passed |\n"
               "| XX-1.1 | whole | evidence | supported | Supported | the input photographs |\n"
               "| XX-1.1 | whole | state | earned | Earned | two test passes |\n"
               "| XX-0.1 | whole | review | declined | Declined | the opening statement · studio lead · this test |\n"
               "| XX-1.3 | whole |")
    rec = edit(rec, "| proposed | Proposed | the roles and figures |", "| proposed | Correction requested | the roles and figures |")
    page, build, _ = render(record=rec)
    row = re.search(r'<strong>Light:</strong>.*?<div class="doc-annotations">(.*?)</div>', page, re.S).group(1)
    assert row.index('data-state="earned"') < row.index('data-evidence="supported"') < row.index('<span class="doc-label">Check</span>')
    assert '<span class="doc-meta">Contrast · passed</span>' in row
    assert 'data-review="declined">Declined</span><span class="doc-meta">the opening statement · studio lead · this test</span>' in page
    assert 'data-review="proposed">Correction requested</span>' in page
    assert check(page, build, record=rec)["fails"] == []


def test_figures_are_numbered_by_first_reference_and_embedded():
    page, build, _ = render()
    assert '<a class="surface-text-link review-figref" href="#fig-1">fig. 1</a>' in page
    assert '<a class="surface-text-link review-figref" href="#fig-2">figs. 2–3</a>' in page
    assert [f["id"] for f in build["figures"]] == ["F101", "F102", "F103"]


def test_alignment_separators_are_not_rows():
    src = edit(SOURCE, "|---|---|---|---|", "|:---|:---:|---|---:|")
    page, build, _ = render(source=src)
    assert ":---" not in page
    assert check(page, build, source=src)["fails"] == []


def test_an_escaped_pipe_is_a_literal_pipe():
    rec = edit(RECORD, "| the roles and figures |", "| the roles \\| figures |")
    page, _, _ = render(record=rec)
    assert "the roles | figures" in page


# ---------------------------------------------------------------- the source fails closed

@pytest.mark.parametrize("line", [
    "> Someone's words.",
    "### A subsection",
    "* first",
    "```",
    "  indented",
    "A [link](https://example.com) here.",
    "A *slanted* word.",
    "<!-- editor: confirm -->A note.",
    "<!-- XX-9.9a -->A malformed key.",
    "A _slanted_ word.",
    "Fish &amp; chips.",
    "1) first",
    "See <https://example.com>.",
    "A [reference][a] link.",
    "[a]: https://example.com",
    "An escaped \\_ underscore.",
])
def test_unsupported_source_markdown_fails(line):
    src = SOURCE + "\n" + line + "\n"
    with pytest.raises(rra.RecordError):
        render(source=src)


def test_markup_in_the_title_fails():
    with pytest.raises(rra.RecordError, match="title"):
        render(source=edit(SOURCE, "# Sample image guide", "# Sample **image** guide"))


def test_a_rule_directly_under_text_fails():
    with pytest.raises(rra.RecordError, match="directly under text"):
        render(source=edit(SOURCE, "Rooms are shown with their structure legible, in calm light.\n\n---",
                           "Rooms are shown with their structure legible, in calm light.\n---"))


def test_a_table_needs_its_delimiter_row_and_only_one():
    with pytest.raises(rra.RecordError, match="delimiter"):
        render(source=edit(SOURCE, "|---|---|---|---|\n", ""))
    with pytest.raises(rra.RecordError, match="delimiter row inside"):
        render(source=edit(SOURCE, "| P-02 |", "|---|---|---|---|\n| P-02 |"))


def test_a_short_delimiter_row_is_a_delimiter():
    src = edit(SOURCE, "|---|---|---|---|", "|-|:-:|-|-|")
    page, build, _ = render(source=src)
    assert check(page, build, source=src)["fails"] == []


def test_a_key_before_a_later_table_row_fails():
    with pytest.raises(rra.RecordError, match="not the first"):
        render(source=edit(SOURCE, "| P-02 |", "<!-- XX-2.5 -->| P-02 |"))


def test_a_paragraph_continued_on_the_next_line_fails():
    src = edit(SOURCE, "**Light:** warm inside, bright outside.", "**Light:** warm inside,\nbright outside.")
    with pytest.raises(rra.RecordError, match="continues a block"):
        render(source=src)


def test_a_figure_referenced_only_outside_body_text_fails():
    src = edit(SOURCE, "## 2. Plan", "## 2. Plan `F109`")
    with pytest.raises(rra.RecordError, match="outside body text|section heading"):
        render(source=src)


def test_a_reversed_figure_range_fails():
    src = edit(SOURCE, "`F102`–`F103`", "`F103`–`F102`")
    with pytest.raises(rra.RecordError, match="ascending"):
        render(source=src)


# ---------------------------------------------------------------- the record fails closed

def test_a_blank_line_inside_the_annotation_table_fails():
    with pytest.raises(rra.RecordError, match="no delimiter row"):
        render(record=edit(RECORD, "| XX-1.3 | whole |", "\n| XX-1.3 | whole |"))


def test_a_record_row_without_its_leading_pipe_or_indented_fails():
    last = '| XX-2.4 | "A move appears only where the target view includes it." | statement |'
    with pytest.raises(rra.RecordError, match="not a '\\|' row"):
        render(record=edit(RECORD, last, last[2:]))
    with pytest.raises(rra.RecordError, match="indented"):
        render(record=edit(RECORD, last, "  " + last))


def test_a_second_record_section_fails():
    with pytest.raises(rra.RecordError, match="exactly once"):
        render(record=RECORD + "\n## Review marks\n")


def test_rows_for_another_artifact_follow_their_own_configuration():
    rec = edit(RECORD, "| XX-1.3 | whole |", "| YY-1.1 | whole | basis | | | another basis |\n| XX-1.3 | whole |")
    page, build, _ = render(record=rec)
    assert "another basis" not in page and check(page, build, record=rec)["fails"] == []
    with pytest.raises(rra.RecordError, match="declared artifacts"):
        render(record=rec, cfg=config(artifacts=["XX"]))


def test_a_key_entry_must_be_a_role_the_renderer_draws():
    with pytest.raises(rra.RecordError, match="key entry"):
        render(record=edit(RECORD, "| review:none |", "| review:nonsense |"))


def test_a_second_review_item_on_a_passage_needs_its_own_what():
    rec = edit(RECORD, '| XX-1.2 | "two props or fewer" | review | proposed | Proposed | |',
               '| XX-1.2 | "two props or fewer" | review | proposed | Proposed | |\n'
               '| XX-1.2 | "two props or fewer" | review | accepted | Accepted | studio lead · this test |')
    with pytest.raises(rra.RecordError, match="needs 3 fields"):
        render(record=rec)


def test_a_bare_identifier_after_a_code_span_is_text():
    src = edit(SOURCE, "warm inside, bright outside.", "warm inside, bright outside; see `code` and then F102 bare.")
    page, _, _ = render(source=src)
    assert "F102 bare" in page


def test_an_unknown_table_in_the_section_fails():
    with pytest.raises(rra.RecordError, match="unknown header"):
        render(record=edit(RECORD, "## Not read by the renderer", "| Key | Value |\n|---|---|\n| a | b |\n\n## Not read by the renderer"))


def test_a_key_outside_the_key_pattern_fails():
    with pytest.raises(rra.RecordError, match="key pattern"):
        render(record=edit(RECORD, "| XX-1.3 | whole |", "| Xx-1.3 | whole |"))


def test_a_key_table_row_needs_a_known_show_value():
    with pytest.raises(rra.RecordError, match="Show"):
        render(record=edit(RECORD, "| basis | Basis | Where a marked statement comes from. | always |",
                           "| basis | Basis | Where a marked statement comes from. | Always |"))


def test_whole_on_part_of_a_unit_fails():
    rec = edit(RECORD, '| XX-2.4 | "A move appears only where the target view includes it." | statement |', "| XX-2.4 | whole | statement |")
    with pytest.raises(rra.RecordError, match="covers part of a unit"):
        render(record=rec)


def test_passage_must_occur_exactly_once():
    with pytest.raises(rra.RecordError, match="exactly once"):
        render(record=edit(RECORD, '| XX-1.2 | "two props or fewer" |', '| XX-1.2 | "three props" |'))


@pytest.mark.parametrize("passage", ["keeps two props", "props"])
def test_overlapping_or_nested_pending_passages_fail(passage):
    rec = edit(RECORD, '| XX-1.2 | "two props or fewer" | review | proposed | Proposed | |',
               '| XX-1.2 | "two props or fewer" | review | proposed | Proposed | |\n'
               f'| XX-1.2 | "{passage}" | review | open | Open question | the count · the reviewer |')
    with pytest.raises(rra.RecordError, match="overlaps"):
        render(record=rec)


@pytest.mark.parametrize("key,passage", [("XX-1.1", "Light:** warm"), ("XX-2.1", "`F102`")])
def test_a_passage_may_not_cut_through_markup(key, passage):
    rec = edit(RECORD, "| XX-1.3 | whole |", f'| {key} | "{passage}" | review | proposed | Proposed | |\n| XX-1.3 | whole |')
    with pytest.raises(rra.RecordError):
        render(record=rec)


def test_shown_decision_needs_what_who_and_scope():
    with pytest.raises(rra.RecordError, match="needs 3 fields"):
        render(record=edit(RECORD, "the registers in this plan · studio lead · this test only", "studio lead"))


def test_a_passage_that_is_a_whole_unit_needs_the_full_record():
    with pytest.raises(rra.RecordError, match="needs 3 fields"):
        render(record=edit(RECORD, "the optional detail photographs · studio lead · this test", "studio lead · this test"))


def test_review_words_must_be_the_owners():
    with pytest.raises(rra.RecordError, match="owner's wording"):
        render(record=edit(RECORD, "| review | open | Open question |", "| review | open | Pending |"))


def test_basis_outside_the_declared_set_fails():
    with pytest.raises(rra.RecordError, match="outside the declared set"):
        render(record=RECORD.replace("| basis | | | our test design |", "| basis | | | something else |", 1))


def test_basis_needs_a_declared_set():
    cfg = config()
    del cfg["basis_values"]
    with pytest.raises(rra.RecordError, match="declared basis_values"):
        render(cfg=cfg)


def test_a_check_item_takes_no_mark():
    rec = edit(RECORD, "| XX-1.3 | whole |", "| XX-1.1 | whole | check | accepted | contrast | passed |\n| XX-1.3 | whole |")
    with pytest.raises(rra.RecordError, match="takes no mark"):
        render(record=rec)


def test_one_pending_mark_per_passage():
    rec = edit(RECORD, '| XX-1.2 | "two props or fewer" | review | proposed | Proposed | |',
               '| XX-1.2 | "two props or fewer" | review | proposed | Proposed | |\n'
               '| XX-1.2 | "two props or fewer" | review | open | Open question | the count · the reviewer |')
    with pytest.raises(rra.RecordError, match="one pending review mark"):
        render(record=rec)


def test_figure_payload_must_match_its_manifest():
    with pytest.raises(rra.RecordError, match="does not match its manifest"):
        render(payloads=dict(PAYLOADS, F102=png(99)))


def test_unknown_key_fails():
    with pytest.raises(rra.RecordError, match="no such statement key"):
        render(record=edit(RECORD, "| XX-1.3 | whole |", "| XX-9.9 | whole |"))


# ---------------------------------------------------------------- the checker and its negative controls

def test_check_passes_on_a_fresh_render():
    page, build, _ = render()
    res = check(page, build)
    assert res["fails"] == [], res["fails"]
    assert res["passage_marks"] == 1 and res["figures"] == 3 and res["statements"] == 1


def test_check_detects_reworded_body_text():
    page, build, _ = render()
    res = check(page.replace("warm inside, bright outside", "warm inside, bright outdoors"), build)
    assert any(f.startswith("source fidelity") for f in res["fails"])


def test_check_detects_a_changed_header_or_a_missing_title():
    page, build, _ = render()
    assert any(f.startswith("header") for f in check(page.replace("v2 · 2026-01-01", "v2 · adopted"), build)["fails"])
    assert any(f.startswith("title") for f in check(re.sub(r"<h1[^>]*>.*?</h1>", "", page), build)["fails"])


def test_check_detects_a_missing_annotation():
    page, build, _ = render()
    gone = re.sub(r'<span class="doc-annotation-item"><span class="doc-mark doc-label" data-review="open">.*?</span></span>', "", page, count=1)
    assert any("missing, changed or not at its scope" in f for f in check(gone, build)["fails"])


def test_check_detects_items_out_of_order():
    page, build, _ = render()
    basis = '<span class="doc-annotation-item"><span class="doc-label">Basis</span><span class="doc-meta">our test design</span></span>'
    accepted = ('<span class="doc-annotation-item"><span class="doc-mark doc-label" data-review="accepted">Accepted</span>'
                '<span class="doc-meta">the registers in this plan · studio lead · this test only</span></span>')
    swapped = edit(page, basis + accepted, accepted + basis)
    assert any("owner's order" in f for f in check(swapped, build)["fails"])


def test_check_detects_an_item_moved_to_another_row():
    page, build, _ = render()
    accepted = ('<span class="doc-annotation-item"><span class="doc-mark doc-label" data-review="accepted">Accepted</span>'
                '<span class="doc-meta">the registers in this plan · studio lead · this test only</span></span>')
    moved = edit(page, accepted, "")
    moved = moved.replace("<strong>Light:</strong> warm inside, bright outside.</p>",
                          f'<strong>Light:</strong> warm inside, bright outside.</p><div class="doc-annotations">{accepted}</div>', 1)
    fails = check(moved, build)["fails"]
    assert any("not in the record" in f for f in fails) and any("missing, changed or not at its scope" in f for f in fails)


def test_check_detects_a_shifted_passage_or_another_role():
    page, build, _ = render()
    shifted = page.replace('aria-describedby="review-note-1">two props or fewer</mark>',
                           'aria-describedby="review-note-1">two props</mark> or fewer')
    assert any("passage mark" in f for f in check(shifted, build)["fails"])
    role = page.replace('<mark class="doc-passage-mark" data-review="proposed"', '<mark class="doc-passage-mark" data-review="open"')
    assert any("another role" in f for f in check(role, build)["fails"])
    unpaired = page.replace('aria-describedby="review-note-1"', 'aria-describedby="review-note-9"')
    assert any("passage note" in f for f in check(unpaired, build)["fails"])


def test_check_detects_an_orphan_note_or_a_row_in_the_key():
    page, build, _ = render()
    orphan = edit(page, "<strong>Light:</strong> warm inside, bright outside.</p>",
                  '<strong>Light:</strong> warm inside, bright outside.</p><div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-7"><div class="doc-annotations">'
                  '<span class="doc-annotation-item"><span class="doc-mark doc-label" data-review="accepted">Accepted</span>'
                  '<span class="doc-meta">the whole plan · the reviewer · production</span></span></div></div>')
    fails = check(orphan, build)["fails"]
    assert any("no passage mark points to" in f for f in fails) and not any(f.startswith("structure") for f in fails), fails
    in_key = page.replace("</tbody></table></div>\n    </section>",
                          '</tbody></table></div><div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-label">Basis</span>'
                          '<span class="doc-meta">our test design</span></span></div>\n    </section>', 1)
    fails = check(in_key, build)["fails"]
    assert any("key section differs" in f for f in fails), fails


def test_check_detects_a_changed_key_section():
    page, build, _ = render()
    assert any("key section" in f for f in check(page.replace("A question for the reviewer to answer.", "A question."), build)["fails"])


def test_check_detects_a_passage_mark_or_note_moved_elsewhere():
    page, build, _ = render()
    mark = '<mark class="doc-passage-mark" data-review="proposed" aria-describedby="review-note-1">two props or fewer</mark>'
    moved = edit(page, mark, "two props or fewer")
    moved = moved.replace("warm inside, bright outside.", f"warm inside, {mark}.", 1)
    src = edit(SOURCE, "warm inside, bright outside.", "warm inside, two props or fewer.")
    fails = check(moved, build, source=src)["fails"]
    assert any("passage mark missing, moved" in f for f in fails)
    note = re.search(r'<div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-1">.*?</div></div>', page).group(0)
    away = edit(edit(page, note, ""), "<strong>Light:</strong> warm inside, bright outside.</p>",
                "<strong>Light:</strong> warm inside, bright outside.</p>" + note)
    fails = check(away, build)["fails"]
    assert any("not after its block" in f for f in fails) and not any(f.startswith("structure") for f in fails), fails


# ---------------------------------------------------------------- placement: the exact scope, not the wording

TWINS = ("# Sample guide\n\n**Version:** v1\n\n## Requirements\n\n"
         "<!-- XX-1.1 -->Room A must keep all of its fixed furniture.\n\n"
         "<!-- XX-1.2 -->Room B must keep all of its fixed furniture.\n")
ROOM_B = "<p class=\"doc-body\">Room B must keep all of its fixed furniture.</p>"


def twin_record(rows: str) -> str:
    return ("# Record\n\n## Review marks\n\n| Entry | Words | Gloss | Show |\n|---|---|---|---|\n"
            "| review:accepted | Accepted | A scoped decision. | used |\n"
            "| review:proposed | Proposed | Put to the reviewer. | used |\n"
            "| basis | Basis | Where it comes from. | used |\n\n"
            "| Key | Applies to | Item | Mark | Words | Value |\n|---|---|---|---|---|---|\n" + rows)


def plain_cfg() -> dict:
    return config(figures=None, exclusions=[])


def placed(page: str, build: dict, source: str, record: str) -> list:
    """The failures of a page whose build record describes it exactly: only placement can fail it."""
    fails = check(page, build, cfg=plain_cfg(), source=source, record=record)["fails"]
    assert not any(f.startswith("identity") for f in fails), fails
    return fails


ACCEPT_A = "| XX-1.1 | whole | review | accepted | Accepted | this requirement · reviewer · this production |\n"


def test_repeated_wording_keeps_a_decision_where_the_record_puts_it():
    page, build, _ = render(source=TWINS, record=twin_record(ACCEPT_A), cfg=plain_cfg())
    assert placed(page, build, TWINS, twin_record(ACCEPT_A)) == []
    assert page.index('data-review="accepted"') < page.index("Room B")


def test_a_decision_moved_to_an_identically_worded_statement_fails():
    rec = twin_record(ACCEPT_A)
    page, build, _ = render(source=TWINS, record=rec, cfg=plain_cfg())
    row = re.search(r'<div class="doc-annotations">.*?</div>', page).group(0)
    moved = edit(page, row, "").replace(ROOM_B, ROOM_B + row, 1)
    fails = placed(moved, build, TWINS, rec)
    assert any("not at its scope" in f and "XX-1.1" in f for f in fails), fails
    assert any("not in the record at this place" in f for f in fails), fails


def test_a_decided_passage_row_moved_to_identical_words_fails():
    rec = twin_record('| XX-1.1 | "fixed furniture" | review | accepted | Accepted | reviewer · this production |\n')
    page, build, _ = render(source=TWINS, record=rec, cfg=plain_cfg())
    row = re.search(r'<div class="doc-annotations">.*?</div>', page).group(0)
    assert "on “fixed furniture”" in row
    moved = edit(page, row, "").replace(ROOM_B, ROOM_B + row, 1)
    assert any("not at its scope" in f for f in placed(moved, build, TWINS, rec))


PEND_A = '| XX-1.1 | "fixed furniture" | review | proposed | Proposed | |\n'


def test_a_pending_passage_moved_to_identical_words_fails():
    rec = twin_record(PEND_A)
    page, build, _ = render(source=TWINS, record=rec, cfg=plain_cfg())
    assert placed(page, build, TWINS, rec) == []
    mark = re.search(r'<mark class="doc-passage-mark"[^>]*>fixed furniture</mark>', page).group(0)
    moved = edit(page, mark, "fixed furniture").replace(
        ROOM_B, ROOM_B.replace("fixed furniture.", mark + "."), 1)
    assert any("passage mark missing, moved" in f for f in placed(moved, build, TWINS, rec))


def test_a_passage_note_moved_after_an_identical_block_fails():
    rec = twin_record(PEND_A)
    page, build, _ = render(source=TWINS, record=rec, cfg=plain_cfg())
    note = re.search(r'<div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-1">.*?</div></div>', page).group(0)
    moved = edit(page, note, "").replace(ROOM_B, ROOM_B + note, 1)
    assert any("passage note is not after its block" in f for f in placed(moved, build, TWINS, rec))


def test_a_statement_moved_after_an_identical_block_fails():
    rec = twin_record(ACCEPT_A + "| XX-1.1 | whole | statement | | | Applies to the fixed furniture in room A. |\n")
    page, build, _ = render(source=TWINS, record=rec, cfg=plain_cfg())
    stm = re.search(r'<p class="doc-meta review-statement">.*?</p>', page).group(0)
    moved = edit(page, stm, "").replace(ROOM_B, ROOM_B + stm, 1)
    assert any("statement missing or not at its scope" in f for f in placed(moved, build, TWINS, rec))


LIST = ("# Sample guide\n\n## Points\n\n<!-- XX-2.1 -->**Points:**\n"
        "- <!-- XX-2.2 -->show the floor finish;\n- <!-- XX-2.3 -->show the floor finish;\n")


def test_a_list_items_row_moved_to_an_identical_item_fails():
    rec = twin_record("| XX-2.2 | whole | review | accepted | Accepted | this item · reviewer · this production |\n")
    page, build, _ = render(source=LIST, record=rec, cfg=plain_cfg())
    assert placed(page, build, LIST, rec) == []
    row = re.search(r'<div class="doc-annotations">.*?</div>', page).group(0)
    first = '<li><p class="doc-body">show the floor finish;</p>' + row + "</li>"
    second = '<li class="doc-body">show the floor finish;</li>'
    moved = edit(page, first + second, '<li class="doc-body">show the floor finish;</li>'
                 '<li><p class="doc-body">show the floor finish;</p>' + row + "</li>")
    assert any("not at its scope" in f for f in placed(moved, build, LIST, rec))


def test_a_rows_scope_is_its_cell_or_its_block_not_both():
    # the fixture's XX-1.3 row is for the lead paragraph and its whole list: inside the last item it is the item's
    page, build, _ = render()
    row = re.search(r'<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-mark doc-label" '
                    r'data-review="open">.*?</div>', page).group(0)
    last = '<li class="doc-body">the door color to show.</li>'
    moved = edit(edit(page, row, ""), last, '<li><p class="doc-body">the door color to show.</p>' + row + "</li>")
    fails = check(moved, build)["fails"]
    assert any("not at its scope" in f and "XX-1.3" in f for f in fails), fails


def test_a_groups_row_outside_or_before_the_last_row_of_its_group_fails():
    src = ("# Sample guide\n\n## Plan\n\n<!-- XX-3.1 -->The first paragraph.\n\nThe second paragraph.\n\n"
           "<!-- XX-3.2 -->A closing paragraph.\n")
    rec = twin_record("| XX-3.1 | whole | review | accepted | Accepted | both paragraphs · reviewer · this production |\n"
                      '| XX-3.1 | "The second paragraph." | basis | | | our test design |\n')
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    group = re.search(r'<div class="doc-group">(.*?)</div>\s*<p class="doc-body">A closing', page, re.S).group(1)
    own, whole = re.findall(r'<div class="doc-annotations">.*?</span></span></div>', group)
    swapped = edit(page, own + whole, whole + own)
    assert any("out of the composition's order" in f for f in placed(swapped, build, src, rec))
    outside = edit(page, whole + "</div>", "</div>" + whole)
    assert any("not at its scope" in f for f in placed(outside, build, src, rec))


def test_a_row_moved_across_a_section_boundary_fails():
    src = ("# Sample guide\n\n## One\n\n<!-- XX-1.1 -->Room A must keep all of its fixed furniture.\n\n"
           "## Two\n\n<!-- XX-2.1 -->Room B must keep all of its fixed furniture.\n")
    page, build, _ = render(source=src, record=twin_record(ACCEPT_A), cfg=plain_cfg())
    row = re.search(r'<div class="doc-annotations">.*?</div>', page).group(0)
    moved = edit(page, row, "").replace('<section class="doc-section">\n      <h2 class="doc-section-title">Two',
                                        '<section class="doc-section">' + row + '\n      <h2 class="doc-section-title">Two', 1)
    assert any("not at its scope" in f for f in placed(moved, build, src, twin_record(ACCEPT_A)))


def test_a_cells_item_moved_to_an_identical_cell_fails():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-4.1 -->| Kept |\n|---|\n| <!-- XX-4.2 -->Yes |\n| <!-- XX-4.3 -->Yes |\n"
    rec = twin_record("| XX-4.2 | whole | review | accepted | Accepted | this cell · reviewer · this production |\n")
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    item = re.search(r' <span class="doc-annotations">.*?</span></span></span>', page).group(0)
    moved = edit(page, '<td class="doc-body">Yes' + item + "</td></tr><tr><td class=\"doc-body\">Yes</td>",
                 '<td class="doc-body">Yes</td></tr><tr><td class="doc-body">Yes' + item + "</td>")
    assert any("not at its scope" in f for f in placed(moved, build, src, rec))


def test_check_detects_a_missing_decision_qualifier():
    page, build, _ = render()
    stripped = page.replace("the registers in this plan · studio lead · this test only", "studio lead")
    assert any("decision record incomplete" in f for f in check(stripped, build)["fails"])


def test_check_detects_broken_delivery():
    page, build, _ = render()
    for tampered, reason in [
        (page.replace("</title>", '</title>\n  <link rel="stylesheet" href="https://example.com/x.css">'), "style blocks"),
        (page.replace("<main ", '<main style="background:red" '), "inline style"),
        (page.replace("</main>", "<script>1</script></main>"), "script"),
        (page.replace("</main>", "<img src=https://example.com/x.png></main>"), "leaves the file"),
        (page.replace('href="#fig-1"', 'href="#fig-9"'), "dead internal link"),
        (page.replace("/* stand-in for review-semantics.css */", "/* emptied */"), "review-semantics.css"),
        (page.replace("    .artifact{}", "    .artifact{} :root{--review-accepted:#00ff00}"), "overlay"),
        (page.replace(":root{--fg-1:#000}", ":root{--fg-1:#000} .x{background:url('fonts/x.woff2')}"), "URL"),
    ]:
        fails = check(tampered, build)["fails"]
        assert any(f.startswith("delivery") and reason in f for f in fails), (reason, fails)


def test_check_applies_consumer_exclusions_and_their_options():
    page, build, _ = render()
    assert any("internal figure ID" in f for f in check(page.replace("Rooms are shown", "Rooms (F101) are shown"), build)["fails"])
    cfg = config(exclusions=[{"name": "studio", "pattern": r"\bstudio\b", "exclude_footer": True},
                             {"name": "version", "pattern": r"\bv\d+\b", "allow_source_versions": True}])
    assert any(f.startswith("exclusion 'studio'") for f in check(page, build, cfg=cfg)["fails"])
    footer_only = page.replace('<dd class="doc-meta">frozen at render time</dd>', '<dd class="doc-meta">studio freeze</dd>')
    footer_only = footer_only.replace("studio lead", "lead")
    assert not any(f.startswith("exclusion 'studio'") for f in check(footer_only, build, cfg=cfg)["fails"])
    assert not any(f.startswith("exclusion 'version'") for f in check(page, build, cfg=cfg)["fails"])


# ---------------------------------------------------------------- the closed grammar: what a browser shows is what is read

ROW_2_1 = re.compile(r'<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-label">Basis</span>.*?</div>')
LIGHT = "<strong>Light:</strong> warm inside, bright outside.</p>"


def _row(page):
    return ROW_2_1.search(page).group(0)


GRAMMAR_CASES = [
    # (name, mutation of the fixture page, expected failure)
    ("hidden attribute", lambda p: p.replace('<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-label">Basis',
                                             '<div class="doc-annotations" hidden><span class="doc-annotation-item"><span class="doc-label">Basis', 1), "structure"),
    ("row between the list's last item and its end", lambda p: edit(edit(p, re.search(
        r'<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-mark doc-label" data-review="open">.*?</div>', p).group(0), ""),
        '<li class="doc-body">the door color to show.</li></ul>',
        '<li class="doc-body">the door color to show.</li>' + re.search(
        r'<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-mark doc-label" data-review="open">.*?</div>', p).group(0) + "</ul>"), "structure"),
    ("row inside a table after its body", lambda p: edit(p, "</tbody></table></div>" + _row(p), "</tbody>" + _row(p) + "</table></div>"), "structure"),
    ("repeated attribute", lambda p: p.replace('data-review="accepted">Accepted</span><span class="doc-meta">the registers',
                                               'data-review="declined" data-review="accepted">Accepted</span><span class="doc-meta">the registers', 1), "repeats an attribute"),
    ("template element", lambda p: edit(p, LIGHT, LIGHT.replace("warm inside", "warm <template>never shown</template>inside")), "structure"),
    ("free text in a row", lambda p: p.replace('<div class="doc-annotations"><span class="doc-annotation-item"><span class="doc-label">Basis',
                                               '<div class="doc-annotations">Superseded: <span class="doc-annotation-item"><span class="doc-label">Basis', 1), "text where the grammar has none"),
    ("strikethrough", lambda p: edit(p, "</mark>. Every image starts from a photograph of the room.</p>", "</mark>. <s>Every image starts from a photograph of the room.</s></p>"), "structure"),
    ("unclosed paragraph", lambda p: edit(p, LIGHT, LIGHT[:-4]), "structure"),
    ("marked section", lambda p: edit(p, LIGHT, LIGHT + "<![CDATA[Accepted for all productions]]>"), "marked section"),
    ("removed bold", lambda p: edit(p, "<strong>Light:</strong>", "Light:"), "bold, code or figure links differ"),
    ("list kind", lambda p: p.replace("<div class=\"doc-prose\"><ul>", '<div class="doc-prose"><ol start="4">', 1).replace("</ul></div>", "</ol></div>", 1), "blocks differ from the source"),
    ("link to another figure", lambda p: p.replace('href="#fig-1">fig. 1', 'href="#fig-3">fig. 1', 1), "figure links differ"),
    ("caption of another figure", lambda p: p.replace('<figcaption class="caption">Fig. 1</figcaption>', '<figcaption class="caption">Fig. 2</figcaption>', 1), "caption"),
    ("zero-size figure", lambda p: re.sub(r'(<figure id="fig-1"><img src="[^"]+") width="2" height="2"', r'\1 width="1" height="1"', p, count=1), "size or caption"),
    ("srcset", lambda p: re.sub(r'(<figure id="fig-1"><img src="[^"]+")', r'\1 srcset="data:image/png;base64,AAAA 1x"', p, count=1), "structure"),
    ("title element", lambda p: p.replace("<title>Sample image guide</title>", "<title>Approved image guide</title>"), "<title>"),
    ("declared charset", lambda p: p.replace('<meta charset="utf-8">', '<meta charset="windows-1252">'), "structure"),
    ("direction override", lambda p: edit(p, LIGHT, LIGHT.replace("warm inside", "warm \u202einside")), "invisible"),
    ("bdo element", lambda p: edit(p, LIGHT, LIGHT.replace("warm inside", '<bdo dir="rtl">warm inside</bdo>')), "structure"),
    ("end tag with a space before its name", lambda p: p.replace('two props or fewer</mark>', 'two props or fewer</ mark>', 1), "not written as the renderer writes it"),
    ("end tag with a space after its name", lambda p: p.replace('two props or fewer</mark>', 'two props or fewer</mark >', 1), "not written as the renderer writes it"),
    ("no doctype", lambda p: p.replace("<!doctype html>\n", "", 1), "quirks mode"),
    ("class split on a non-ASCII space", lambda p: edit(p, 'class="doc-mark doc-label" data-review="open">Open question</span><span class="doc-meta">the points',
                                                        'class="doc-mark\u00a0doc-label" data-review="open">Open question</span><span class="doc-meta">the points'), "structure"),
    ("a control character", lambda p: edit(p, LIGHT, LIGHT.replace("warm inside", "warm\u001dinside")), "invisible"),
    ("four-figure modifier on three figures", lambda p: p.replace('<div class="review-figures">', '<div class="review-figures review-figures--four">', 1), "structure"),
    ("a header term with extra colons", lambda p: p.replace('<dt class="doc-label">Version:</dt>', '<dt class="doc-label">Version:::</dt>', 1), "header differs"),
    ("a table's region named otherwise", lambda p: p.replace('aria-label="Key"', 'aria-label="Accepted by the reviewer"', 1), "table name"),
    ("CSS in a module banner", lambda p: p.replace("surface-panel.css (upstream aaaaaaa, verbatim) === */",
                                                   "surface-panel.css */ .doc-annotations{display:none} /* (upstream aaaaaaa, verbatim) === */", 1), "exact banners"),
    ("a character reference the renderer does not write", lambda p: edit(p, LIGHT, LIGHT.replace("warm inside", "warm&#x1;inside")), "character reference"),
    ("a hair space", lambda p: edit(p, LIGHT, LIGHT.replace("warm inside", "warm\u200ainside")), "invisible"),
    ("an invisible character in the key section", lambda p: p.replace("Put to the reviewer to confirm, correct or reject.", "Put to the reviewer to confirm,\u001dcorrect or reject.", 1), "invisible"),
    ("a space before the doctype", lambda p: "\u00a0" + p, "does not open with <!doctype html>"),
    ("non-canonical base64", lambda p: re.sub(r'(<figure id="fig-1"><img src="data:image/png;base64,[A-Za-z0-9+/]+)(=*)"', r'\1\2=="', p, count=1), "canonical base64"),
    ("a table row boundary moved", lambda p: edit(p, '<td class="doc-body">Atmosphere</td>', '<td class="doc-body">Atmosphere</td></tr><tr>'), "a table row holds"),
    ("bold added to a header value", lambda p: edit(p, '<dd class="doc-meta">Sample reviewer</dd>', '<dd class="doc-meta"><strong>Sample reviewer</strong></dd>'), "header differs"),
    ("the commit's code span removed from the colophon", lambda p: re.sub(r'commit <code class="doc-code">(\w+)</code>', r'commit \1', p, count=1), "colophon differs"),
    ("an uppercase CSS URL", lambda p: p.replace(":root{--fg-1:#000}", ":root{--fg-1:#000} .x{background:URL(https://example.com/x.png)}", 1), "URL"),
    ("a comment", lambda p: edit(p, LIGHT, LIGHT + "<!-- approved -->"), "comment"),
    ("a frame", lambda p: edit(p, LIGHT, LIGHT + '<iframe src="data:text/html,x"></iframe>'), "structure"),
    ("statement inside a note", lambda p: p.replace('</span></span></div></div>', '</span></span></div><p class="doc-meta review-statement">Uses “target view”. If the reviewer leaves that term open, read “real or approved”.</p></div>', 1), "structure"),
]


@pytest.mark.parametrize("name,mutate,expect", GRAMMAR_CASES, ids=[c[0] for c in GRAMMAR_CASES])
def test_the_closed_grammar_refuses_what_a_browser_would_show_differently(name, mutate, expect):
    page, build, _ = render()
    changed = mutate(page)
    assert changed != page, name
    fails = check(changed, build)["fails"]
    assert any(expect in f for f in fails), (name, fails)
    assert not any(f.startswith("identity") for f in fails), (name, fails)


def test_words_regrouped_between_cells_fail_though_the_word_stream_is_the_same():
    page, build, _ = render()
    moved = edit(page, '<td class="doc-body">Evening</td><td class="doc-body">Atmosphere</td>',
                 '<td class="doc-body">Evening Atmosphere</td><td class="doc-body"></td>')
    fails = check(moved, build)["fails"]
    assert any("text units differ" in f for f in fails) and not any(f.startswith("source fidelity") for f in fails), fails


def test_merged_paragraphs_fail():
    page, build, _ = render()
    merged = edit(page, 'warm inside, bright outside.</p>\n      <div class="doc-group"><p class="doc-body">The frame keeps ',
                  'warm inside, bright outside. The frame keeps ')
    fails = check(merged, build)["fails"]
    assert any("text units differ" in f or "blocks differ" in f for f in fails), fails


def test_a_mark_moved_within_a_hyphenated_word_fails():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Room A keeps its two-tone <!-- XX-1.2 -->tone throughout.\n"
    rec = twin_record('| XX-1.2 | "tone" | review | proposed | Proposed | |\n')
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    mark = re.search(r'<mark class="doc-passage-mark"[^>]*>tone</mark>', page).group(0)
    moved = edit(page, "two-tone " + mark, "two-" + mark + " tone")
    assert any("passage mark missing, moved" in f for f in placed(moved, build, src, rec))


def test_a_note_before_its_blocks_row_fails_the_composition_order():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Room A keeps its fixed furniture.\n"
    rec = twin_record(ACCEPT_A + '| XX-1.1 | "fixed furniture" | review | proposed | Proposed | |\n')
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    row = re.search(r'<div class="doc-annotations">.*?</div>', page).group(0)
    note = re.search(r'<div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-1">.*?</div></div>', page).group(0)
    swapped = edit(page, row + note, note + row)
    assert any("out of the composition's order" in f for f in placed(swapped, build, src, rec))


def test_a_quote_that_differs_only_in_spacing_is_refused():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Room A: keep the fixed furniture. <!-- XX-1.2 -->Room B: keep the fixed  furniture.\n"
    rec = twin_record('| XX-1.2 | "keep the fixed  furniture." | review | accepted | Accepted | reviewer · this production |\n')
    with pytest.raises(rra.RecordError, match="more than once"):
        render(source=src, record=rec, cfg=plain_cfg())


def test_a_check_on_a_passage_names_its_words():
    rec = edit(RECORD, "| basis | Basis | Where a marked statement comes from. | always |\n",
               "| basis | Basis | Where a marked statement comes from. | always |\n| check | Check | A check and its result. | used |\n")
    rec = edit(rec, "| XX-1.3 | whole |", '| XX-1.1 | "warm inside" | check | | Contrast | passed |\n| XX-1.3 | whole |')
    page, build, _ = render(record=rec)
    assert '<span class="doc-meta">on “warm inside” · Contrast · passed</span>' in page
    assert check(page, build, record=rec)["fails"] == []


def test_a_phantom_owner_file_in_the_build_record_fails():
    page, build, _ = render()
    phantom = dict(build, deps=dict(build["deps"], **{"patterns/never-inlined.css": {"sha256": "0" * 64, "bytes": 1}}))
    assert any("other files than the owner's" in f for f in check(page, phantom)["fails"])


def test_the_record_refuses_markdown_that_would_hide_or_move_a_table():
    hidden = RECORD.replace("## Not read by the renderer", "<!--\n| XX-1.1 | whole | review | declined | Declined | x · y · z |\n-->\n\n## Not read by the renderer")
    with pytest.raises(rra.RecordError, match="HTML comment"):
        rra.parse_record(hidden, "Review marks")
    setext = RECORD + "\nReview marks\n------------\n\n| Key | Applies to | Item | Mark | Words | Value |\n|---|---|---|---|---|---|\n"
    with pytest.raises(rra.RecordError, match="setext heading"):
        rra.parse_record(setext, "Review marks")
    spaced = RECORD + "\n## Review  marks\n\n| Key | Applies to | Item | Mark | Words | Value |\n|---|---|---|---|---|---|\n"
    with pytest.raises(rra.RecordError, match="exactly once"):
        rra.parse_record(spaced, "Review marks")
    raw = RECORD.replace("## Not read by the renderer", "<script>\n\n| XX-1.1 | whole | review | declined | Declined | x · y · z |\n\n</script>\n\n## Not read by the renderer")
    with pytest.raises(rra.RecordError, match="raw HTML"):
        rra.parse_record(raw, "Review marks")


def test_the_source_refuses_markdown_a_reader_would_read_differently():
    cases = [
        ("## Plan <!-- XX-1.1 -->\n\nRoom A keeps its sofa.\n", "key in a section heading"),
        ("## Plan\n\n<!-- XX-1.1 -->Room A keeps its ~old~ sofa.\n", "single-tilde"),
        ("## Plan\n\n<!-- XX-1.1 -->Room A keeps `its **sofa**`.\n", "bold markers inside a code span"),
        ("## Plan\n\n<!-- XX-1.1 -->| Kept |\n|---|\n| sofa |\nthe lamp too\n", "directly after a table"),
        ("## Plan\n\n<!-- XX-1.1 -->Room A keeps:\n2. its sofa\n", "not starting at 1"),
    ]
    for body, why in cases:
        with pytest.raises(rra.RecordError):
            rra.parse_source("# Sample guide\n\n" + body, plain_cfg())


def test_annotations_on_a_table_heading_are_refused_not_dropped():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->| Room kept | State |\n|---|---|\n| <!-- XX-1.2 -->A | kept |\n"
    rec = twin_record('| XX-1.1 | "Room kept" | review | proposed | Proposed | |\n')
    with pytest.raises(rra.RecordError, match="table heading"):
        render(source=src, record=rec, cfg=plain_cfg())


def test_a_quote_found_twice_by_overlap_or_by_invisible_characters_is_refused():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Show it red <!-- XX-1.2 -->red red now.\n"
    rec = twin_record('| XX-1.2 | "red red" | review | accepted | Accepted | reviewer · this production |\n')
    with pytest.raises(rra.RecordError, match="more than once"):
        render(source=src, record=rec, cfg=plain_cfg())
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Keep the so\u00adfa. <!-- XX-1.2 -->Keep the sofa.\n"
    rec = twin_record('| XX-1.2 | "Keep the sofa." | review | accepted | Accepted | reviewer · this production |\n')
    with pytest.raises(rra.RecordError, match="more than once"):
        render(source=src, record=rec, cfg=plain_cfg())


def test_a_figure_range_must_cover_consecutive_figures():
    src = edit(SOURCE, "| P-01 | Evening | Atmosphere | `F101` |", "| P-01 | Evening | Atmosphere | `F102` |")
    with pytest.raises(rra.RecordError, match="not numbered consecutively"):
        render(source=edit(src, "`F102`–`F103`", "`F101`–`F103`"))


def test_a_figure_shown_at_another_size_than_its_own_fails():
    cfg = config()
    cfg["figures"]["entries"]["F101"] = dict(cfg["figures"]["entries"]["F101"], width=3, height=3)
    page, build, _ = render(cfg=cfg)
    assert any("image, size or caption" in f for f in check(page, build, cfg=cfg)["fails"])


def test_recorded_strings_cannot_forge_manifest_rows(tmp_path):
    page, build, _ = render()
    out, checks, res = manifest_files(tmp_path, page, build)
    b = json.loads((tmp_path / "out.html.build.json").read_text(encoding="utf-8"))
    forged = "x |\n| Owner checker | `owner.json` · pass | hashed from the file"
    (tmp_path / "out.html.build.json").write_text(json.dumps(dict(b, source=forged, renderer=forged)), encoding="utf-8")
    res["build_sha256"] = hashlib.sha256((tmp_path / "out.html.build.json").read_bytes()).hexdigest()
    checks.write_text(json.dumps(res), encoding="utf-8")
    text = rra.manifest(out, checks, [], [])
    assert "\n| Owner checker |" not in text and "\\|" in text
    assert any("render time" in f for f in check(page, dict(build, rendered="x | y"), bind=True)["fails"])


def test_the_source_refuses_more_markdown_a_reader_would_read_differently():
    cases = [
        "## Plan\n\n<!-- XX-1.1 -->Room A keeps its sofa.\n- \n",
        "## Plan\n\n<!-- XX-1.1 -->Room A keeps its sofa.\n===\n",
        "## Plan\n\n- <!-- XX-1.1 -->sofa\n\n- <!-- XX-1.2 -->lamp\n",
        "## Plan\n\n- <!-- XX-1.1 -->sofa\n<!-- XX-1.2 -->| Keep |\n|---|\n| rug |\n",
        "## Plan ##\n\n<!-- XX-1.1 -->Room A keeps its sofa.\n",
        "## Plan\n\n<!-- XX-1.1 -->The rate is 2 ** 10 and the cap is 3 ** 4.\n",
        "## Plan\n\n<!-- XX-1.1 -->Room A keeps its \u202esofa.\n",
    ]
    refused = []
    for body in cases:
        try:
            rra.parse_source("# Sample guide\n\n" + body, plain_cfg())
        except rra.RecordError:
            refused.append(body)
    assert len(refused) == len(cases), [c for c in cases if c not in refused]
    with pytest.raises(rra.RecordError, match="joined by a dash"):
        rra.parse_source(edit(SOURCE, "`F102`–`F103`", "`F102` – `F103`"), config())


def test_more_quote_and_passage_edges_are_refused():
    for a, b in [("Keep the fixed\u2009furniture.", "Keep the fixed furniture."), ("Keep the so\u034ffa.", "Keep the sofa.")]:
        src = f"# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->{a} <!-- XX-1.2 -->{b}\n"
        rec = twin_record(f'| XX-1.2 | "{b}" | review | accepted | Accepted | reviewer · this production |\n')
        with pytest.raises(rra.RecordError, match="more than once"):
            render(source=src, record=rec, cfg=plain_cfg())
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Keep the cafe\u0301 tables.\n"
    rec = twin_record('| XX-1.1 | "Keep the cafe" | review | proposed | Proposed | |\n')
    with pytest.raises(rra.RecordError, match="accented character"):
        render(source=src, record=rec, cfg=plain_cfg())
    with pytest.raises(rra.RecordError, match="not written like its start"):
        rra.expand_range("F101", "F0103")


def test_an_unusual_space_moved_to_another_unit_fails():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Room A keeps its sofa.\n\n<!-- XX-1.2 -->Room B keeps\u200aits lamp.\n"
    rec = twin_record(ACCEPT_A)
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    moved = edit(edit(page, "Room B keeps\u200aits", "Room B keeps its"), "Room A keeps its", "Room A keeps\u200aits")
    assert any("unusual space" in f for f in placed(moved, build, src, rec))


def test_the_probe_reads_only_an_html_file(tmp_path):
    with pytest.raises(SystemExit, match="html"):
        rra.probe(tmp_path / "copy.txt")


def test_a_jpegs_size_is_read_by_the_marker_grammar():
    sof = b"\xff\xc0\x00\x11\x08\x00\x02\x00\x03\x03\x01\x22\x00\x02\x11\x01\x03\x11\x01"
    real = b"\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00" + sof + b"\xff\xd9"
    assert rra.image_size(real) == (3, 2)
    trick = b"\xff\xd8\xff\x01\x00\x04" + sof + b"\xff\xd9\xff\xc0\x00\x11\x08\x10\x00\x10\x00"
    assert rra.image_size(trick) is None


def test_a_git_tree_with_a_non_canonical_mode_is_refused(tmp_path):
    ds = tmp_path / "ds"
    git = ["git", "-C", str(ds), "-c", "user.email=t@example.com", "-c", "user.name=t"]
    subprocess.run(["git", "init", "-q", str(ds)], check=True)
    blob = subprocess.run(git + ["hash-object", "-w", "--stdin"], input="x", capture_output=True, text=True, check=True).stdout.strip()
    inner = subprocess.run(git + ["mktree"], input=f"100644 blob {blob}\tf.css\n", capture_output=True, text=True, check=True).stdout.strip()
    raw = b"040000 d\0" + bytes.fromhex(inner)
    tree = subprocess.run(git + ["hash-object", "-t", "tree", "--literally", "-w", "--stdin"], input=raw, capture_output=True, check=True).stdout.decode().strip()
    commit = subprocess.run(git + ["commit-tree", tree, "-m", "x"], capture_output=True, text=True, check=True).stdout.strip()
    with pytest.raises(rra.RecordError, match="malformed"):
        rra.git_tree(str(ds), commit)


def test_a_report_of_another_file_name_is_refused(tmp_path):
    page, build, _ = render()
    out, checks, _res = manifest_files(tmp_path, page, build)
    report = tmp_path / "probe.json"
    report.write_text(json.dumps({"tool": "probe", "out": "copy.txt", "out_sha256": sha(page), "views": {}, "fails": []}), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="names another file"):
        rra.manifest(out, checks, [str(report)], [])
    text = rra.manifest(out, checks, [], [("Revision", "r2 |\n| Owner checker | pass")])
    assert "\n| Owner checker |" not in text


def test_the_source_refuses_the_last_markdown_forms_a_reader_would_read_differently():
    bodies = [
        "<!-- XX-1.1 -->> Accepted for all productions.\n", "<!-- XX-1.1 -->### Approved\n", "<!-- XX-1.1 -->+ first\n",
        "<!-- XX-1.1 -->1) first\n", "<!-- XX-1.1 -->[a]: https://example.com\n", "<!-- XX-1.1 -->A \\| B.\n",
        "<!-- XX-1.1 -->Keep ` <!-- XX-1.2 --> ` here.\n", "<!-- XX-1.1 -->Room A.\n\n___\n", "<!-- XX-1.1 -->Room A.\n\n- - -\n",
        "-\t<!-- XX-1.1 -->sofa\n", "<!-- XX-1.1 -->Sofas** are kept; **see the plan.\n", "<!-- XX-1.1 -->Keep **the frame **as is.\n",
        "<!-- XX-1.1 -->Room A keeps its \u200esofa.\n",
    ]
    for body in bodies:
        with pytest.raises(rra.RecordError):
            rra.parse_source("# Sample guide\n\n## Plan\n\n" + body, plain_cfg())
    with pytest.raises(rra.RecordError, match="closing"):
        rra.parse_source("# Sample guide\n\n## Plan\t##\n\n<!-- XX-1.1 -->Room A.\n", plain_cfg())
    for joined in ("`F102`-`F103`", "`F102` to `F103`", "`F102`—`F103`"):
        with pytest.raises(rra.RecordError, match="joined by a dash"):
            rra.parse_source(edit(SOURCE, "`F102`–`F103`", joined), config())
    with pytest.raises(rra.RecordError, match="outside body text"):
        rra.parse_source(edit(SOURCE, "**Uses:** sample production profile v1", "**Uses:** sample production profile v1 `F101`"), config())


def test_boundaries_and_quotes_fold_as_a_reader_sees_them():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Keep \u1100\u1161 here.\n"
    rec = twin_record('| XX-1.1 | "Keep \u1100" | review | proposed | Proposed | |\n')
    with pytest.raises(rra.RecordError, match="accented character"):
        render(source=src, record=rec, cfg=plain_cfg())
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->keep the \u3131\u1161 chairs.\n"
    rec = twin_record('| XX-1.1 | "keep the \u3131" | review | proposed | Proposed | |\n')
    with pytest.raises(rra.RecordError, match="accented"):
        render(source=src, record=rec, cfg=plain_cfg())
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->keep the \ufb01xed furniture. <!-- XX-1.2 -->keep the fixed furniture.\n"
    rec = twin_record('| XX-1.2 | "keep the fixed furniture." | review | accepted | Accepted | reviewer · this production |\n')
    with pytest.raises(rra.RecordError, match="more than once"):
        render(source=src, record=rec, cfg=plain_cfg())


def test_the_record_refuses_markup_and_heading_spellings_that_hide_rows():
    for extra in ("\n## Review **marks**\n", "\n## Review&#32;marks\n", "\n## Review `marks`\n"):
        with pytest.raises(rra.RecordError, match="exactly once"):
            rra.parse_record(RECORD + extra, "Review marks")
    with pytest.raises(rra.RecordError, match="inline HTML or a quotation"):
        rra.parse_record(RECORD.replace("studio lead · this test only", "<del>studio lead</del> · this test only"), "Review marks")
    with pytest.raises(rra.RecordError, match="inline HTML or a quotation"):
        rra.parse_record(RECORD.replace("## Not read by the renderer", "> | XX-1.1 | whole | review | declined | Declined | x · y · z |\n\n## Not read by the renderer"), "Review marks")
    with pytest.raises(rra.RecordError, match="found 0"):
        rra.parse_record(RECORD.replace("## Review marks", "## Other marks"), "Review marks")
    with pytest.raises(rra.RecordError, match="5 cells"):
        rra.parse_record(RECORD.replace("| XX-1.3 | whole | review | open | Open question | the points listed · the reviewer |",
                                        "| XX-1.3 | whole | review | open | Open question |"), "Review marks")
    with pytest.raises(rra.RecordError, match="needs 2 fields"):
        render(record=RECORD.replace("the points listed · the reviewer", "the points listed"))


def test_unusual_spaces_are_compared_where_they_stand():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Show the sofa\u00a0— in direct light.\n"
    rec = twin_record(ACCEPT_A + "| XX-1.1 | whole | statement | | | Applies to the sofa in room A. |\n")
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    moved = edit(page, "sofa\u00a0— in direct", "sofa — in\u00a0direct")
    assert any("unusual space" in f for f in placed(moved, build, src, rec))
    spaced = edit(page, "Applies to the sofa in room A.", "Applies to the sofa in\u00a0room A.")
    assert any("statement" in f for f in placed(spaced, build, src, rec))


def test_a_build_record_without_its_annotations_fails():
    page, build, _ = render()
    stale = dict(build)
    del stale["applied"]
    assert any("applied annotations" in f for f in check(page, stale)["fails"])


def test_the_manifest_refuses_a_failing_check(tmp_path):
    page, build, _ = render()
    out, checks, res = manifest_files(tmp_path, page, build)
    checks.write_text(json.dumps(dict(res, fails=["source fidelity: x"])), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="the check failed"):
        rra.manifest(out, checks, [], [])


def test_the_render_time_is_a_full_timestamp():
    page, build, _ = render()
    for bad in ("2026-01-01", "20260101", "x | y"):
        assert any("render time" in f for f in check(page, dict(build, rendered=bad))["fails"]), bad


def test_a_long_pending_passage_is_shortened_in_its_note():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Keep one two three four five six seven eight nine ten here.\n"
    rec = twin_record('| XX-1.1 | "one two three four five six seven eight nine ten" | review | proposed | Proposed | |\n')
    cfg = config(figures=None, exclusions=[], quote_words=3)
    page, build, _ = render(source=src, record=rec, cfg=cfg)
    assert "on “one two three…”" in page
    assert check(page, build, cfg=cfg, source=src, record=rec)["fails"] == []


def test_notes_in_items_and_cells_must_stay_in_them():
    src = ("# Sample guide\n\n## Plan\n\n<!-- XX-2.1 -->**Points:**\n- <!-- XX-2.2 -->show the floor finish;\n"
           "- <!-- XX-2.3 -->show the door;\n\n<!-- XX-4.1 -->| Kept |\n|---|\n| <!-- XX-4.2 -->the blue sofa |\n")
    rec = twin_record('| XX-2.2 | "floor" | review | proposed | Proposed | |\n| XX-4.2 | "blue" | review | proposed | Proposed | |\n')
    page, build, _ = render(source=src, record=rec, cfg=plain_cfg())
    assert placed(page, build, src, rec) == []
    note = re.search(r'<div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-1">.*?</div></div>', page).group(0)
    out_of_item = edit(edit(page, note, ""), "<li class=\"doc-body\">show the door;</li>", "<li><p class=\"doc-body\">show the door;</p>" + note + "</li>")
    assert any("note" in f for f in placed(out_of_item, build, src, rec))
    cell_note = re.search(r'<div class="doc-hierarchy doc-group doc-annotation-note" id="review-note-2">.*?</div></div>', page).group(0)
    out_of_cell = edit(page, cell_note + "</td>", "</td>").replace("</table></div>", "</table></div>" + cell_note, 1)
    assert placed(out_of_cell, build, src, rec) != []


def test_a_figure_grid_moved_under_another_block_fails():
    page, build, _ = render()
    grid = re.search(r'<div class="review-figures">.*?</div>', page).group(0)
    moved = edit(edit(page, grid, ""), "warm inside, bright outside.</p>", "warm inside, bright outside.</p>" + grid)
    assert any("not after the block that first references them" in f for f in check(moved, build)["fails"])


@pytest.mark.skipif(shutil.which("node") is None, reason="node is needed to stand in for the owner checker")
def test_owner_check_refuses_a_stale_build_record_and_an_extra_tool(tmp_path):
    ds = tmp_path / "ds"
    (ds / "tools").mkdir(parents=True)
    run = '{"scheme":"%s","status":"pass","governed":1,"findings":[],"unmapped":[],"counts":{"doc-mark":0,"doc-passage-mark":0,"doc-annotation-note":0}}'
    (ds / rra.OWNER_TOOL).write_text("console.log(JSON.stringify({tool:'check-role-conformance',pass:true,runs:["
                                     + run % "dark" + "," + run % "light" + "]}));\n", encoding="utf-8")
    git = ["git", "-C", str(ds), "-c", "user.email=t@example.com", "-c", "user.name=t"]
    subprocess.run(["git", "init", "-q", str(ds)], check=True)
    subprocess.run(git + ["add", "."], check=True)
    subprocess.run(git + ["commit", "-qm", "stand-in"], check=True)
    pin = subprocess.run(git + ["rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    out = tmp_path / "out.html"
    out.write_text("<!doctype html><title>x</title>", encoding="utf-8")
    (tmp_path / "out.html.build.json").write_text(json.dumps({"commit": pin, "out_sha256": "0" * 64}), encoding="utf-8")
    assert any("describes other bytes" in f for f in rra.owner_check(out, str(ds))["fails"])
    (tmp_path / "out.html.build.json").write_text(json.dumps({"commit": pin, "out_sha256": hashlib.sha256(out.read_bytes()).hexdigest()}), encoding="utf-8")
    (ds / "tools" / "extra.mjs").write_text("export {};\n", encoding="utf-8")
    assert any("tools/extra.mjs" in f for f in rra.owner_check(out, str(ds))["fails"])


def test_the_command_line_refuses_a_render_time_without_a_time():
    assert rra.main(["render", "--source", "s.md", "--record", "r.md", "--artifact", "XX", "--config", "c.json",
                     "--out", "o.html", "--design-system", ".", "--commit", "HEAD", "--rendered", "2026-01-01"]) == 2


def test_the_source_refuses_block_syntax_in_items_links_and_direction_marks():
    bodies = ["- > Someone said this.\n", "- ### Approved for all\n", "+\tfirst item\n", "1)\tfirst item\n", "- + nested\n",
              "-      code here\n", "1. > Accepted for all.\n", "- 1. nested\n", "- [ ] floor finish\n", "0. first\n",
              "<!-- XX-1.1 -->A _foo_bar_ word.\n", "<!-- XX-1.1 -->A [x [y] z](https://example.com) link.\n",
              "<!-- XX-1.1 -->See https://example.com now.\n", "<!-- XX-1.1 -->See www.example.com now.\n",
              "<!-- XX-1.1 -->| | Kept |\n|---|---|\n| a | b |\n"]
    for body in bodies:
        with pytest.raises(rra.RecordError):
            rra.parse_source("# Sample guide\n\n## Plan\n\n" + body, plain_cfg())
    with pytest.raises(rra.RecordError, match="direction"):
        rra.parse_source("# Sample \u202eguide\n\n## Plan\n\n<!-- XX-1.1 -->Room A.\n", plain_cfg())
    with pytest.raises(rra.RecordError, match="direction"):
        rra.parse_source("# Sample guide\n\n**Version:** v1 \u202e\n\n## Plan\n\n<!-- XX-1.1 -->Room A.\n", plain_cfg())
    with pytest.raises(rra.RecordError, match="direction"):
        rra.parse_record(RECORD.replace("studio lead · this test only", "studio \u202elead · this test only"), "Review marks")
    for cfg in (config(meta_before=[["Prepared for", "Sample \u202ereviewer"]]), config(meta_before=[["Prepared for", "see `F101`"]]),
                config(lang="en_US")):
        with pytest.raises(rra.RecordError):
            render(cfg=cfg)


def test_a_passage_may_not_split_an_emoji():
    for text, passage in (("Keep the \U0001F44D\U0001F3FD sign.", "Keep the \U0001F44D"), ("Keep the \u2764\ufe0f sign.", "Keep the \u2764"),
                          ("Keep the \U0001F1EB\U0001F1F7 flag.", "Keep the \U0001F1EB"), ("Keep the \U0001F468\u200d\U0001F469 sign.", "Keep the \U0001F468")):
        src = f"# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->{text}\n"
        rec = twin_record(f'| XX-1.1 | "{passage}" | review | proposed | Proposed | |\n')
        with pytest.raises(rra.RecordError, match="accented or composed|accented character"):
            render(source=src, record=rec, cfg=plain_cfg())


def test_the_build_records_times_and_dates_are_real():
    page, build, _ = render()
    assert any("render time" in f for f in check(page, dict(build, rendered="2026-99-99T99:99Z"))["fails"])
    assert any("date" in f for f in check(page, dict(build, commit_date="2026-02-30"))["fails"])


def test_the_title_is_compared_without_folding_unusual_spaces():
    src = edit(SOURCE, "<!-- XX-0.1 -->Rooms are shown", "<!-- XX-0.1 -->Rooms\u00a0are shown")
    page, build, _ = render(source=src)
    spaced = page.replace("<h1 class=\"doc-title\">Sample image guide</h1>", "<h1 class=\"doc-title\">Sample\u00a0image guide</h1>", 1)
    assert any(f.startswith("title") for f in check(spaced, build, source=src)["fails"])


def test_the_record_holds_one_key_table_and_one_annotation_table():
    second = RECORD.replace("## Not read by the renderer", "| Key | Applies to | Item | Mark | Words | Value |\n|---|---|---|---|---|---|\n"
                            "| XX-1.1 | whole | review | declined | Declined | x · y · z |\n\n## Not read by the renderer")
    with pytest.raises(rra.RecordError, match="second key or annotation table"):
        rra.parse_record(second, "Review marks")


def test_the_manifest_escapes_strikethrough_and_names_the_checked_file(tmp_path):
    page, build, _ = render()
    out, checks, res = manifest_files(tmp_path, page, build)
    text = rra.manifest(out, checks, [], [("Revision", "~~r1 approved~~")])
    assert "\\~\\~r1 approved\\~\\~" in text
    checks.write_text(json.dumps(dict(res, out="another.html")), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="describes output"):
        rra.manifest(out, checks, [], [])


def test_figures_are_numbered_from_the_source_not_the_build_record():
    page, build, _ = render()
    swapped = dict(build, figures=[dict(build["figures"][1], fig=1), dict(build["figures"][0], fig=2), build["figures"][2]])
    fails = check(page, swapped)["fails"]
    assert any("first references" in f for f in fails), fails


def test_the_build_records_applied_annotations_are_the_records():
    page, build, _ = render()
    fails = check(page, dict(build, applied=build["applied"][1:]))["fails"]
    assert any("applied annotations" in f for f in fails), fails


def test_a_quote_that_names_two_places_is_refused():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Room A: keep the fixed furniture. <!-- XX-1.2 -->Room B: keep the fixed furniture.\n"
    rec = twin_record('| XX-1.1 | "keep the fixed furniture." | review | accepted | Accepted | reviewer · this production |\n')
    with pytest.raises(rra.RecordError, match="more than once in the text the row follows"):
        render(source=src, record=rec, cfg=plain_cfg())


def test_a_key_inside_a_word_is_refused():
    src = "# Sample guide\n\n## Plan\n\n<!-- XX-1.1 -->Room A keeps its furni<!-- XX-1.2 -->ture.\n"
    with pytest.raises(rra.RecordError, match="inside a word"):
        rra.parse_source(src, plain_cfg())


# ---------------------------------------------------------------- identity: this receipt describes this output

def test_check_refuses_a_build_record_that_describes_other_bytes():
    page, build, _ = render()
    changed = page.replace("frozen at render time", "a different colophon after the checked build")
    fails = check(changed, build, bind=False)["fails"]
    assert any(f.startswith("identity: the build record's output is") for f in fails), fails


def test_check_refuses_stale_input_identities_and_reports_both_tools():
    page, build, _ = render()
    stale = dict(build, source_sha256="0" * 64, record_sha256="1" * 64, config_sha256="2" * 64,
                 renderer_sha256="3" * 64, out_sha256="4" * 64)
    res = check(page, stale, bind=False)
    for name in ("output", "source", "record", "configuration"):
        assert any(f.startswith(f"identity: the build record's {name} is") for f in res["fails"]), name
    assert res["renderer_sha256"] == "3" * 64
    assert res["checker_sha256"] == hashlib.sha256(_SCRIPT_PATH.read_bytes()).hexdigest()
    other = dict(build, artifact="YY", figures=[dict(build["figures"][0], sha256="5" * 64)] + build["figures"][1:])
    fails = check(page, other, bind=False)["fails"]
    assert any("for artifact 'YY'" in f for f in fails) and any("figure F101" in f for f in fails)


def test_check_result_names_the_exact_output_and_inputs():
    page, build, _ = render()
    res = check(page, build, bind=False)
    assert res["fails"] == [] and res["out_sha256"] == sha(page) and res["out_bytes"] == len(page.encode("utf-8"))
    assert res["inputs"] == {"source_sha256": sha(SOURCE), "record_sha256": sha(RECORD), "config_sha256": cfg_sha(config())}


def test_check_compares_the_colophon_and_the_page_language():
    page, build, _ = render()
    fails = check(page.replace("frozen at render time", "a different colophon"), build)["fails"]
    assert any(f.startswith("colophon differs") for f in fails) and not any(f.startswith("identity") for f in fails)
    assert any("colophon differs" in f for f in check(page.replace("commit <code class=\"doc-code\">aaaaaaa", "commit <code class=\"doc-code\">bbbbbbb"), build)["fails"])
    assert any(f.startswith("page language") for f in check(page.replace('<html lang="en">', '<html lang="pt">'), build)["fails"])


def manifest_files(tmp_path, page: str, build: dict, reproduced: bool = True) -> tuple:
    """The output, its build record and a check result made of them, on disk. Reproduction needs a
    design-system checkout, so here it is recorded as the command line records it; the command-line test
    reproduces for real."""
    out = tmp_path / "out.html"
    out.write_text(page, encoding="utf-8")
    build = dict(build, source="source.md", record="record.md", config="config.json", renderer="render_review_artifact.py")
    (tmp_path / "out.html.build.json").write_text(json.dumps(build), encoding="utf-8")
    res = rra.check_artifact(SOURCE, RECORD, "XX", config(), page, build, config_sha256=cfg_sha(config()),
                             build_sha256=hashlib.sha256((tmp_path / "out.html.build.json").read_bytes()).hexdigest())
    res.update(out=out.name, reproduced=reproduced, owner_files_verified=reproduced, commit_on_origin_main=False)
    checks = tmp_path / "checks.json"
    checks.write_text(json.dumps(res), encoding="utf-8")
    return out, checks, res


def test_manifest_round_trip_records_the_files_own_identity(tmp_path):
    page, build, _ = render()
    out, checks, _res = manifest_files(tmp_path, page, build)
    report = tmp_path / "probe.json"
    report.write_text(json.dumps({"tool": "probe", "out": "out.html", "out_sha256": sha(page), "views": {}, "fails": []}), encoding="utf-8")
    text = rra.manifest(out, checks, [str(report)], [])
    assert f"`{sha(page)}`" in text and "Renderer checks** (`check`): pass" in text and "**Layout probe:**" in text
    assert hashlib.sha256(checks.read_bytes()).hexdigest() in text and "NOT reachable" in text


def test_manifest_refuses_a_check_that_did_not_reproduce_the_file(tmp_path):
    page, build, _ = render()
    out, checks, _res = manifest_files(tmp_path, page, build, reproduced=False)
    with pytest.raises(rra.EvidenceError, match="did not reproduce"):
        rra.manifest(out, checks, [], [])


def test_manifest_refuses_a_changed_output_with_its_old_records(tmp_path):
    page, build, _ = render()
    out, checks, _res = manifest_files(tmp_path, page, build)
    out.write_text(page.replace("frozen at render time", "a different colophon after the checked build"), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="the build record describes output"):
        rra.manifest(out, checks, [], [])
    # a build record brought up to date does not rescue a check result made of other bytes
    changed = out.read_text(encoding="utf-8")
    b = json.loads((tmp_path / "out.html.build.json").read_text(encoding="utf-8"))
    (tmp_path / "out.html.build.json").write_text(json.dumps(dict(b, out_sha256=sha(changed), out_bytes=len(changed.encode()))),
                                                  encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="the check result describes output"):
        rra.manifest(out, checks, [], [])


def test_manifest_refuses_evidence_of_another_output_or_build(tmp_path):
    page, build, _ = render()
    out, checks, res = manifest_files(tmp_path, page, build)
    other = tmp_path / "other.json"
    other.write_text(json.dumps(dict(res, build_sha256="0" * 64)), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="another build record"):
        rra.manifest(out, other, [], [])
    other.write_text(json.dumps(dict(res, inputs=dict(res["inputs"], source_sha256="0" * 64))), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="source_sha256"):
        rra.manifest(out, other, [], [])
    report = tmp_path / "owner.json"
    report.write_text(json.dumps({"tool": "owner-check", "out_sha256": "0" * 64, "runs": [], "fails": []}), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="owner.json describes output"):
        rra.manifest(out, checks, [str(report)], [])
    report.write_text(json.dumps({"tool": "check", "out_sha256": sha(page)}), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="not an owner-check or probe report"):
        rra.manifest(out, checks, [str(report)], [])
    report.write_text(json.dumps({"tool": "owner-check", "out_sha256": sha(page), "build_sha256": res["build_sha256"],
                                  "design_system": {"pin": "b" * 40}, "runs": [], "fails": []}), encoding="utf-8")
    with pytest.raises(rra.EvidenceError, match="another build record or design-system commit"):
        rra.manifest(out, checks, [str(report)], [])


def bound_reports(tmp_path, page: str, build_sha: str, pin: str, failing: bool = True) -> tuple:
    """An owner-check and a probe report, each bound to this output, its name and its build record, in the
    shape the tools write, reduced to the fields the manifest reads. With failing, each records a failure: the
    owner checker ran from a checkout whose tools/ is not the pin's, and the probe found page overflow."""
    run = lambda scheme: {"scheme": scheme, "status": "pass", "governed": 1, "findings": [], "unmapped": []}
    owner = {"tool": "owner-check", "out": "out.html", "out_sha256": sha(page), "build_sha256": build_sha,
             "design_system": {"checkout_head": "c" * 40, "pin": pin, "tools_identical_to_pin": not failing},
             "runs": [{"viewport": "1440x900", "exit": 0, "report": {"runs": [run("dark"), run("light")]}}],
             "fails": [f"the checkout's tools/ is not the build's pinned commit {pin}: ['tools/check-role-conformance.mjs']"]
             if failing else []}
    view = {"pageOverflow": failing, "broken": 0, "deadLinks": 0, "tablesScrolling": 0}
    probe = {"tool": "probe", "out": "out.html", "out_sha256": sha(page), "views": {"desktop_light": view},
             "fails": ["desktop_light: page overflow, a wide element, a broken image or a dead link"] if failing else []}
    paths = []
    for name, rep in (("owner-check.json", owner), ("probe.json", probe)):
        (tmp_path / name).write_text(json.dumps(rep), encoding="utf-8")
        paths.append(tmp_path / name)
    return tuple(paths)


def verdict(text: str, label: str, path) -> str:
    """The overall result the manifest gives a report: the word after its file name and hash."""
    digest = hashlib.sha256(Path(path).read_bytes()).hexdigest()
    m = re.search(r"^- \*\*" + re.escape(label) + r":\*\* " + re.escape(Path(path).name) + " · `" + digest + r"`: (\w+);", text, re.M)
    assert m, (label, text)
    return m.group(1)


def test_a_correctly_bound_failing_report_is_recorded_as_fail_not_refused(tmp_path):
    page, build, _ = render()
    out, checks, res = manifest_files(tmp_path, page, build)
    owner, probe = bound_reports(tmp_path, page, res["build_sha256"], build["commit"])
    text = rra.manifest(out, checks, [str(owner), str(probe)], [])
    assert verdict(text, "Owner checker", owner) == "FAIL" and verdict(text, "Layout probe", probe) == "FAIL"
    assert f"tools/ at the pin {build['commit'][:7]}: no (checkout ccccccc)" in text
    # the primary check passed and is recorded as such; the failing reports stay failures beside it
    assert "Renderer checks** (`check`): pass" in text
    # control: the same reports without their failures are recorded as passes
    owner, probe = bound_reports(tmp_path, page, res["build_sha256"], build["commit"], failing=False)
    text = rra.manifest(out, checks, [str(owner), str(probe)], [])
    assert verdict(text, "Owner checker", owner) == "pass" and verdict(text, "Layout probe", probe) == "pass"


# ---------------------------------------------------------------- the command line

def test_command_line_round_trip(tmp_path):
    ds = tmp_path / "ds"
    for rel, data in ds_files().items():
        (ds / rel).parent.mkdir(parents=True, exist_ok=True)
        (ds / rel).write_bytes(data)
    git = ["git", "-C", str(ds), "-c", "user.email=t@example.com", "-c", "user.name=t"]
    subprocess.run(["git", "init", "-q", str(ds)], check=True)
    subprocess.run(git + ["add", "."], check=True)
    subprocess.run(git + ["commit", "-qm", "stand-in"], check=True)
    for fid, data in PAYLOADS.items():
        (tmp_path / f"{fid}.png").write_bytes(data)
    cfg = config()
    entries = cfg["figures"].pop("entries")
    (tmp_path / "figures.json").write_text(json.dumps({"figures": entries}), encoding="utf-8")
    cfg["figures"]["manifest"] = "figures.json"
    (tmp_path / "config.json").write_text(json.dumps(cfg), encoding="utf-8")
    (tmp_path / "source.md").write_text(SOURCE, encoding="utf-8")
    (tmp_path / "record.md").write_text(RECORD, encoding="utf-8")
    out = tmp_path / "out.html"
    common = ["--source", str(tmp_path / "source.md"), "--record", str(tmp_path / "record.md"),
              "--artifact", "XX", "--config", str(tmp_path / "config.json"), "--out", str(out)]
    assert rra.main(["render", *common, "--design-system", str(ds), "--commit", "HEAD"]) == 0
    checks = tmp_path / "checks.json"
    assert rra.main(["check", *common, "--json", str(checks), "--design-system", str(ds)]) == 0
    res = json.loads(checks.read_text(encoding="utf-8"))
    built = (tmp_path / "out.html.build.json").read_bytes()
    assert res["reproduced"] is True and res["build_sha256"] == hashlib.sha256(built).hexdigest()
    assert res["out_sha256"] == hashlib.sha256(out.read_bytes()).hexdigest()
    assert rra.main(["manifest", "--out", str(out), "--checks", str(checks),
                     "--note", "Revision=r1", "--manifest", str(tmp_path / "MANIFEST.md")]) == 0
    text = (tmp_path / "MANIFEST.md").read_text(encoding="utf-8")
    assert "**Revision:** r1" in text and "Renderer checks** (`check`): pass" in text
    assert "reproduced this file byte for byte" in text and hashlib.sha256(out.read_bytes()).hexdigest() in text
    assert hashlib.sha256(checks.read_bytes()).hexdigest() in text

    # an input changed after the build: its stale identity fails the check
    (tmp_path / "record.md").write_text(RECORD.replace("studio lead · this test only", "studio lead · all tests"), encoding="utf-8")
    assert rra.main(["check", *common, "--json", str(tmp_path / "stale.json")]) == 1
    assert any(f.startswith("identity: the build record's record is")
               for f in json.loads((tmp_path / "stale.json").read_text(encoding="utf-8"))["fails"])
    (tmp_path / "record.md").write_text(RECORD, encoding="utf-8")

    # a changed output with a build record rewritten to match: identity agrees, reproduction does not
    page = out.read_bytes().replace(b"frozen at render time", b"frozen at render time.")
    out.write_bytes(page)
    b = json.loads(built)
    (tmp_path / "out.html.build.json").write_text(json.dumps(dict(b, out_sha256=hashlib.sha256(page).hexdigest(),
                                                                  out_bytes=len(page))), encoding="utf-8")
    assert rra.main(["check", *common, "--json", str(tmp_path / "forged.json"), "--design-system", str(ds)]) == 1
    forged = json.loads((tmp_path / "forged.json").read_text(encoding="utf-8"))
    assert forged["reproduced"] is False and any(f.startswith("reproduction") for f in forged["fails"])

    # the old passing check result cannot certify the changed output; nothing is written
    assert rra.main(["manifest", "--out", str(out), "--checks", str(checks),
                     "--manifest", str(tmp_path / "STALE.md")]) == 1
    assert not (tmp_path / "STALE.md").exists()


def test_command_line_manifest_with_failing_reports_succeeds_and_records_fail(tmp_path):
    # writing the record succeeds; it does not make either failing report a pass
    page, build, _ = render()
    out, checks, res = manifest_files(tmp_path, page, build)
    owner, probe = bound_reports(tmp_path, page, res["build_sha256"], build["commit"])
    record = tmp_path / "MANIFEST.md"
    assert rra.main(["manifest", "--out", str(out), "--checks", str(checks), "--report", str(owner),
                     "--report", str(probe), "--manifest", str(record)]) == 0
    text = record.read_text(encoding="utf-8")
    assert verdict(text, "Owner checker", owner) == "FAIL" and verdict(text, "Layout probe", probe) == "FAIL"
    # a report bound to another build record, or to another design-system pin, is still refused, and
    # nothing is written
    bound = json.loads(owner.read_text(encoding="utf-8"))
    for name, stale in (("build", dict(bound, build_sha256="0" * 64)),
                        ("pin", dict(bound, design_system=dict(bound["design_system"], pin="b" * 40)))):
        owner.write_text(json.dumps(stale), encoding="utf-8")
        refused = tmp_path / f"REFUSED-{name}.md"
        assert rra.main(["manifest", "--out", str(out), "--checks", str(checks), "--report", str(owner),
                         "--manifest", str(refused)]) == 1, name
        assert not refused.exists(), name


@pytest.mark.skipif(shutil.which("node") is None, reason="node is needed to stand in for the owner checker")
def test_owner_check_is_bound_to_the_output_and_the_pinned_tools(tmp_path):
    ds = tmp_path / "ds"
    (ds / "tools").mkdir(parents=True)
    run = '{"scheme":"%s","status":"pass","governed":1,"findings":[],"unmapped":[],"counts":{"doc-mark":0,"doc-passage-mark":0,"doc-annotation-note":0}}'
    (ds / rra.OWNER_TOOL).write_text("console.log(JSON.stringify({tool:'check-role-conformance',pass:true,runs:["
                                     + run % "dark" + "," + run % "light" + "]}));\n", encoding="utf-8")
    git = ["git", "-C", str(ds), "-c", "user.email=t@example.com", "-c", "user.name=t"]
    subprocess.run(["git", "init", "-q", str(ds)], check=True)
    subprocess.run(git + ["add", "."], check=True)
    subprocess.run(git + ["commit", "-qm", "stand-in"], check=True)
    pin = subprocess.run(git + ["rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    out = tmp_path / "out.html"
    out.write_text("<!doctype html><title>x</title>", encoding="utf-8")
    (tmp_path / "out.html.build.json").write_text(json.dumps({"commit": pin, "out_sha256": hashlib.sha256(out.read_bytes()).hexdigest()}),
                                                  encoding="utf-8")
    res = rra.owner_check(out, str(ds))
    assert res["fails"] == [] and res["out_sha256"] == hashlib.sha256(out.read_bytes()).hexdigest()
    assert res["design_system"]["tools_identical_to_pin"] is True
    # a run that governs nothing, or two runs in one scheme, is not a pass
    for bad in (run % "dark" + "," + run % "dark", run.replace('"governed":1', '"governed":0') % "dark" + "," + run % "light"):
        (ds / rra.OWNER_TOOL).write_text("console.log(JSON.stringify({tool:'check-role-conformance',pass:true,runs:[" + bad + "]}));\n",
                                         encoding="utf-8")
        subprocess.run(git + ["commit", "-qam", "variant"], check=True)
        newpin = subprocess.run(git + ["rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
        (tmp_path / "out.html.build.json").write_text(json.dumps({"commit": newpin, "out_sha256": hashlib.sha256(out.read_bytes()).hexdigest()}),
                                                      encoding="utf-8")
        assert any("light and dark" in f for f in rra.owner_check(out, str(ds))["fails"])
    subprocess.run(git + ["checkout", "-q", pin, "--", "tools"], check=True)
    subprocess.run(git + ["commit", "-qam", "restore"], check=True)
    pin = subprocess.run(git + ["rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    (tmp_path / "out.html.build.json").write_text(json.dumps({"commit": pin, "out_sha256": hashlib.sha256(out.read_bytes()).hexdigest()}),
                                                  encoding="utf-8")
    assert rra.owner_check(out, str(ds))["fails"] == []
    lenient = "console.log(JSON.stringify({pass:true,runs:[]}));\n"
    # a replace ref on the pin's tools/ tree makes git list other bytes as the pin's: the verified objects ignore it
    blob = subprocess.run(git + ["hash-object", "-w", "--stdin"], input=lenient, capture_output=True, text=True, check=True).stdout.strip()
    real = subprocess.run(git + ["rev-parse", f"{pin}:{rra.OWNER_TOOL}"], capture_output=True, text=True, check=True).stdout.strip()
    tools_tree = subprocess.run(git + ["rev-parse", f"{pin}:tools"], capture_output=True, text=True, check=True).stdout.strip()
    fake_tree = subprocess.run(git + ["mktree"], input=f"100644 blob {blob}\tcheck-role-conformance.mjs\n",
                               capture_output=True, text=True, check=True).stdout.strip()
    subprocess.run(git + ["replace", tools_tree, fake_tree], check=True)
    (ds / rra.OWNER_TOOL).write_text(lenient, encoding="utf-8")
    listed = subprocess.run(git + ["ls-tree", "-r", pin, "--", rra.OWNER_TOOL], capture_output=True, text=True, check=True).stdout
    assert blob in listed  # git itself now lists the lenient bytes as the pin's
    assert rra.owner_check(out, str(ds))["design_system"]["tools_identical_to_pin"] is False
    subprocess.run(git + ["replace", "-d", tools_tree], check=True)
    # a symlink would make node load a file from elsewhere
    (ds / rra.OWNER_TOOL).unlink()
    (tmp_path / "elsewhere.mjs").write_bytes(subprocess.run(git + ["cat-file", "blob", real], capture_output=True, check=True).stdout)
    (ds / rra.OWNER_TOOL).symlink_to(tmp_path / "elsewhere.mjs")
    assert rra.owner_check(out, str(ds))["design_system"]["tools_identical_to_pin"] is False
    (ds / rra.OWNER_TOOL).unlink()
    subprocess.run(git + ["checkout", "--", rra.OWNER_TOOL], check=True)
    subprocess.run(git + ["update-index", "--skip-worktree", rra.OWNER_TOOL], check=True)
    (ds / rra.OWNER_TOOL).write_text("console.log(JSON.stringify({pass:true,runs:[]}));\n", encoding="utf-8")
    assert subprocess.run(git + ["diff", "--quiet", pin, "--", "tools"]).returncode == 0  # git itself sees no change
    res = rra.owner_check(out, str(ds))
    assert res["design_system"]["tools_identical_to_pin"] is False
    assert any("not the build's pinned commit" in f for f in res["fails"])


@pytest.mark.skipif(shutil.which("node") is None, reason="node is needed to stand in for the owner checker")
def test_owner_check_compares_tools_not_the_checkout_head(tmp_path):
    # a checkout that has moved past the pin, with tools/ byte-identical to the pin's, passes
    ds = tmp_path / "ds"
    (ds / "tools").mkdir(parents=True)
    run = '{"scheme":"%s","status":"pass","governed":1,"findings":[],"unmapped":[],"counts":{"doc-mark":0,"doc-passage-mark":0,"doc-annotation-note":0}}'
    (ds / rra.OWNER_TOOL).write_text("console.log(JSON.stringify({tool:'check-role-conformance',pass:true,runs:["
                                     + run % "dark" + "," + run % "light" + "]}));\n", encoding="utf-8")
    git = ["git", "-C", str(ds), "-c", "user.email=t@example.com", "-c", "user.name=t"]
    subprocess.run(["git", "init", "-q", str(ds)], check=True)
    subprocess.run(git + ["add", "."], check=True)
    subprocess.run(git + ["commit", "-qm", "pin"], check=True)
    pin = subprocess.run(git + ["rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    (ds / "notes.md").write_text("a later change outside tools/\n", encoding="utf-8")
    subprocess.run(git + ["add", "notes.md"], check=True)
    subprocess.run(git + ["commit", "-qm", "later"], check=True)
    head = subprocess.run(git + ["rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    assert head != pin
    out = tmp_path / "out.html"
    out.write_text("<!doctype html><title>x</title>", encoding="utf-8")
    (tmp_path / "out.html.build.json").write_text(json.dumps({"commit": pin, "out_sha256": hashlib.sha256(out.read_bytes()).hexdigest()}),
                                                  encoding="utf-8")
    res = rra.owner_check(out, str(ds))
    assert res["fails"] == []
    assert res["design_system"] == {"checkout_head": head, "pin": pin, "tools_identical_to_pin": True}
