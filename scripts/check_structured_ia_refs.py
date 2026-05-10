"""Check that names enumerated in the structured IA model v1 YAML appendix
appear in the repo's curated front-door / plateau documents.

This is documentation-drift detection, not architecture validation. The
checker reads the YAML appendix from the structured IA model, walks each
top-level enumeration key, generates spelling variants for every
enumerated name, and scans a small curated doc set for occurrences.
Missing names and per-variant breakdowns are reported descriptively.
The script never asserts the architecture itself is invalid.

Source of truth: docs/structured-ia-model-v1.md (single fenced ```yaml
block under the "Structured Appendix" section).

Default scan set:

  README.md
  docs/architecture.md
  docs/structured-ia-model-v1.md
  docs/milestones/milestone-8-phase-2-structured-model-plateau.md

Usage:

    python scripts/check_structured_ia_refs.py
    python scripts/check_structured_ia_refs.py --model PATH
    python scripts/check_structured_ia_refs.py --docs DOC [DOC ...]

Exit code: 0 unless the model file cannot be read, the YAML cannot be
parsed, or a default / requested doc is missing. Drift signals are
informational; they do not change the exit code.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Iterable

import yaml


REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MODEL_PATH = REPO_ROOT / "docs" / "structured-ia-model-v1.md"
DEFAULT_DOC_PATHS: list[Path] = [
    REPO_ROOT / "README.md",
    REPO_ROOT / "docs" / "architecture.md",
    REPO_ROOT / "docs" / "structured-ia-model-v1.md",
    REPO_ROOT / "docs" / "milestones" / "milestone-8-phase-2-structured-model-plateau.md",
]

YAML_BLOCK_RE = re.compile(r"```yaml\s*\n(.*?)\n```", re.DOTALL)


def extract_yaml_block(markdown: str) -> str:
    """Return the contents of the first fenced ```yaml block in markdown."""
    match = YAML_BLOCK_RE.search(markdown)
    if match is None:
        raise ValueError("No fenced ```yaml block found in source markdown")
    return match.group(1)


def collect_names_by_key(model: dict) -> dict[str, list[str]]:
    """Flatten enumerated string names per top-level key.

    List values contribute their string items directly. Map values
    (e.g. `mode_specific_layers`) contribute the string items of each
    list-valued sub-entry; map keys are skipped because they typically
    duplicate names already enumerated under another top-level key.
    """
    by_key: dict[str, list[str]] = {}
    for key, value in model.items():
        names: list[str] = []
        if isinstance(value, list):
            names = [item for item in value if isinstance(item, str)]
        elif isinstance(value, dict):
            for sub_value in value.values():
                if isinstance(sub_value, list):
                    names.extend(item for item in sub_value if isinstance(item, str))
        by_key[key] = names
    return by_key


def generate_variants(name: str) -> list[str]:
    """Return snake_case, kebab-case, and space-separated forms of name.

    Duplicates are collapsed (a name without underscores produces only
    one variant).
    """
    forms = [name, name.replace("_", "-"), name.replace("_", " ")]
    seen: list[str] = []
    for form in forms:
        if form not in seen:
            seen.append(form)
    return seen


def count_occurrences(body: str, variant: str) -> int:
    """Case-insensitive substring count of variant in body."""
    if not variant:
        return 0
    return body.lower().count(variant.lower())


def check_model(model: dict, doc_paths: Iterable[Path]) -> dict:
    """Run the full check. Return a structured result for reporting."""
    by_key = collect_names_by_key(model)
    doc_paths = list(doc_paths)
    doc_bodies: dict[Path, str] = {p: p.read_text(encoding="utf-8") for p in doc_paths}

    result_by_key: dict[str, list[dict]] = {}
    for source_key, names in by_key.items():
        entries: list[dict] = []
        for name in names:
            variants = generate_variants(name)
            per_variant: dict[str, dict[str, int]] = {}
            total = 0
            for variant in variants:
                per_doc: dict[str, int] = {}
                for path, body in doc_bodies.items():
                    count = count_occurrences(body, variant)
                    if count > 0:
                        per_doc[str(path.relative_to(REPO_ROOT))] = count
                        total += count
                per_variant[variant] = per_doc
            entries.append(
                {"name": name, "variants": per_variant, "total_occurrences": total}
            )
        result_by_key[source_key] = entries

    return {
        "by_key": result_by_key,
        "scanned_docs": [str(p.relative_to(REPO_ROOT)) for p in doc_paths],
    }


def format_report(result: dict) -> str:
    """Format a check result as human-readable text."""
    lines: list[str] = []
    lines.append("# Structured IA Model // Reference Check")
    lines.append("")

    lines.append("## Scanned docs")
    lines.append("")
    for path in result["scanned_docs"]:
        lines.append(f"  - {path}")
    lines.append("")

    total_names = sum(len(entries) for entries in result["by_key"].values())
    missing: list[tuple[str, str]] = [
        (key, entry["name"])
        for key, entries in result["by_key"].items()
        for entry in entries
        if entry["total_occurrences"] == 0
    ]

    lines.append("## Summary")
    lines.append("")
    lines.append(f"  Total enumerated names: {total_names}")
    lines.append(f"  Names with at least one occurrence: {total_names - len(missing)}")
    lines.append(f"  Names with no occurrences: {len(missing)}")
    lines.append("")

    if missing:
        lines.append("## Names with no occurrences in scanned docs")
        lines.append("")
        for source_key, name in missing:
            lines.append(f"  - {name} (source: {source_key})")
        lines.append("")

    lines.append("## Per-source-key reference detail")
    lines.append("")
    for source_key, entries in result["by_key"].items():
        lines.append(f"### {source_key}")
        lines.append("")
        if not entries:
            lines.append("  (no enumerated names)")
            lines.append("")
            continue
        for entry in entries:
            name = entry["name"]
            total = entry["total_occurrences"]
            if total == 0:
                lines.append(f"  - {name}: no occurrences")
                continue
            lines.append(f"  - {name}: {total} total occurrences")
            for variant, per_doc in entry["variants"].items():
                if not per_doc:
                    continue
                doc_summary = ", ".join(
                    f"{path} ({count})" for path, count in per_doc.items()
                )
                lines.append(f"      \"{variant}\": {doc_summary}")
        lines.append("")

    return "\n".join(lines)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Check that structured IA model v1 names appear in curated "
            "front-door docs. Documentation-drift detection only; not "
            "architecture validation."
        )
    )
    parser.add_argument(
        "--model",
        type=Path,
        default=DEFAULT_MODEL_PATH,
        help=(
            "Path to the structured IA model file (default: "
            f"{DEFAULT_MODEL_PATH.relative_to(REPO_ROOT)})."
        ),
    )
    parser.add_argument(
        "--docs",
        type=Path,
        nargs="+",
        default=DEFAULT_DOC_PATHS,
        help="One or more doc files to scan (default: curated front-door / plateau set).",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    try:
        markdown = args.model.read_text(encoding="utf-8")
        yaml_text = extract_yaml_block(markdown)
        model = yaml.safe_load(yaml_text)
    except FileNotFoundError as exc:
        print(f"error: model file not found: {exc}", file=sys.stderr)
        return 1
    except (ValueError, yaml.YAMLError) as exc:
        print(f"error: cannot parse structured IA model: {exc}", file=sys.stderr)
        return 1

    if not isinstance(model, dict):
        print("error: parsed model is not a mapping", file=sys.stderr)
        return 1

    missing_docs = [path for path in args.docs if not path.exists()]
    if missing_docs:
        for path in missing_docs:
            print(f"error: scan doc not found: {path}", file=sys.stderr)
        return 1

    result = check_model(model, args.docs)
    print(format_report(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
