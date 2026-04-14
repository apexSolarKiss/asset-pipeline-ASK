# Verification Record Shape Note

Current verification seams now show a small repeated record pattern, but that pattern remains provisional.

## Current Shared Pattern

- each seam is represented as one narrow record
- each record has a small required core
- some fields are optional and may be omitted cleanly where the seam allows it

## What Is Still Intentionally Non-Uniform

- records are intentionally not identical across stages
- output and release-readiness are adjacent but not the same record
- stage-specific meanings and field choices still remain local to each seam

## What This Note Does Not Do

- full schema design
- normative field catalogs
- typed interface design
- serialization or transport design
- generalized validation or record frameworks

## Working Rule

The repo should preserve the current minimal shared pattern while keeping stage-specific record shapes local until real pipeline pressure justifies sharper standardization.
