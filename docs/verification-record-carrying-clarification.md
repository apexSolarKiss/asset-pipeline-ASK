# Verification Record Carrying Clarification

## Purpose

This note narrows the current question from `record shape` to `record carrying burden`.

Its purpose is to state only what the current SKU and campaign examples now support across the four seams without turning that support into schema, field catalogs, or stronger record-shape claims than the repo has earned.

## Why A Carrying Clarification Is Narrower Than A Shape Claim

The current examples now support a slightly clearer statement about what seam records must continue to carry forward, but they do not yet support a stronger statement that seam records should converge on one shared shape.

That distinction matters because the current seam chain is intentionally asymmetrical. Ingest, transformation, output, and release-readiness do not appear to own the same kind of information in the same way, even where some continuity now appears necessary across cases.

## What Now Appears Stable Across Cases

Several small carrying expectations now appear stable across the current SKU and campaign examples.

First, records remain seam-local rather than identical. The current evidence supports continuity of burden, not uniformity of structure.

Second, ingest-side records appear to need enough room to carry declared context, references, and boundaries forward so that later seams do not have to reconstruct them implicitly.

Third, later seams appear to need enough continuity to preserve what must still be respected across the chain, even where the exact form of that continuity remains seam-specific.

Fourth, required subject-defining, identifier-bearing, message-bearing, or review-relevant signals must not silently disappear as work moves across the chain.

Fifth, output-side records appear to need enough context to support governed sufficiency rather than mere artifact existence.

Sixth, release-readiness remains about bounded readiness for approval rather than automated approval itself.

## What Remains Provisional

The current examples do not yet justify:

- a shared field list
- fixed required versus optional field behavior
- a stronger claim about how much continuity should be explicit versus inferred
- a decision about whether review artifacts deserve sharper record treatment
- a decision about whether mode-specific differences justify more than seam-local variation
- typed interfaces, schema, serialization, or transport claims

## What This Does Not Do

- replace `docs/verification-record-shape-note.md`
- define a record schema
- introduce field catalogs or inheritance logic
- imply symmetric seam ownership
- introduce validator-framework design
- widen into runtime or orchestration language
