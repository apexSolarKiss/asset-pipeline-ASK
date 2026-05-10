"""Unit tests for scripts/check_structured_ia_refs.py.

Loads the script as a module via importlib so tests do not require
adding scripts/ to sys.path globally.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

import pytest


_REPO_ROOT = Path(__file__).resolve().parent.parent
_SCRIPT_PATH = _REPO_ROOT / "scripts" / "check_structured_ia_refs.py"

_spec = importlib.util.spec_from_file_location("check_structured_ia_refs", _SCRIPT_PATH)
assert _spec is not None and _spec.loader is not None
checker = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(checker)


def test_extract_yaml_block_returns_block_contents():
    markdown = (
        "# Title\n\nSome prose.\n\n```yaml\nfoo:\n  - bar\n  - baz\n```\n\nMore prose.\n"
    )
    extracted = checker.extract_yaml_block(markdown)
    assert extracted == "foo:\n  - bar\n  - baz"


def test_extract_yaml_block_raises_when_missing():
    with pytest.raises(ValueError):
        checker.extract_yaml_block("# Title\n\nNo yaml here.\n")


def test_collect_names_by_key_lists_and_maps():
    model = {
        "ia_layers": ["brand_system", "packet"],
        "mode_specific_layers": {
            "sku_driven": [],
            "collection_merchandising": ["collection_grouping"],
            "brand_campaign_editorial": [
                "campaign_concept",
                "review_context_campaign_world_coherence",
            ],
        },
        "scalar_field": "ignored",
    }
    by_key = checker.collect_names_by_key(model)
    assert by_key["ia_layers"] == ["brand_system", "packet"]
    assert by_key["mode_specific_layers"] == [
        "collection_grouping",
        "campaign_concept",
        "review_context_campaign_world_coherence",
    ]
    assert by_key["scalar_field"] == []


def test_generate_variants_three_forms():
    assert checker.generate_variants("mode_specific") == [
        "mode_specific",
        "mode-specific",
        "mode specific",
    ]


def test_generate_variants_collapses_duplicates_for_single_word():
    assert checker.generate_variants("packet") == ["packet"]


def test_count_occurrences_case_insensitive():
    body = "The Packet layer carries packet-level inputs. PACKET appears too."
    assert checker.count_occurrences(body, "packet") == 3
    assert checker.count_occurrences(body, "Packet") == 3
    assert checker.count_occurrences(body, "") == 0


def test_check_model_groups_by_source_key(tmp_path: Path):
    doc = tmp_path / "doc.md"
    doc.write_text(
        "Discussion of brand-system layer and packet layer.",
        encoding="utf-8",
    )
    model = {
        "ia_layers": ["brand_system", "packet", "curation_seam"],
    }
    # check_model writes paths relative to REPO_ROOT; for an out-of-repo
    # tmp_path we patch REPO_ROOT to tmp_path.
    original_repo_root = checker.REPO_ROOT
    checker.REPO_ROOT = tmp_path
    try:
        result = checker.check_model(model, [doc])
    finally:
        checker.REPO_ROOT = original_repo_root

    assert "ia_layers" in result["by_key"]
    entries = {e["name"]: e for e in result["by_key"]["ia_layers"]}
    assert entries["brand_system"]["total_occurrences"] >= 1
    assert entries["packet"]["total_occurrences"] >= 1
    assert entries["curation_seam"]["total_occurrences"] == 0
    assert result["scanned_docs"] == ["doc.md"]


def test_format_report_includes_key_sections():
    result = {
        "scanned_docs": ["README.md"],
        "by_key": {
            "ia_layers": [
                {
                    "name": "packet",
                    "variants": {"packet": {"README.md": 2}},
                    "total_occurrences": 2,
                },
                {
                    "name": "curation_seam",
                    "variants": {
                        "curation_seam": {},
                        "curation-seam": {},
                        "curation seam": {},
                    },
                    "total_occurrences": 0,
                },
            ],
        },
    }
    report = checker.format_report(result)
    assert "# Structured IA Model // Reference Check" in report
    assert "## Scanned docs" in report
    assert "## Summary" in report
    assert "Total enumerated names: 2" in report
    assert "Names with no occurrences: 1" in report
    assert "## Names with no occurrences in scanned docs" in report
    assert "curation_seam (source: ia_layers)" in report
    assert "### ia_layers" in report
    assert "packet: 2 total occurrences" in report
