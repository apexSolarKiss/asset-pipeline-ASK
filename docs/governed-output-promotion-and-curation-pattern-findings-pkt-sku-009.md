# Governed Output Promotion And Curation Pattern Findings // PKT-SKU-009

## Purpose

This note records a bundled architectural move on the SKU-driven Furniture v1 base:

- **B —** resolve the multiple-rows-per-slot semantics surfaced in [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md), by promoting the three agentic `PKT-SKU-009` rows from `candidate` to `governed_output`.
- **F —** add a new structural field `curation_pattern` to `generated_assets` that records the curation pattern that produced each governed-asset row, per the grounding note's philosophical anchor on capture as selection.

Both moves were executed in this scope. The bundling is justified because the promotion event is the natural moment to record the curation pattern that produced the governed asset.

Outcome: **Supported** for the forward promotion path; multiple-rows-per-slot semantics resolved for `PKT-SKU-009` HERO.

## Architectural Anchor

Two architectural pressure points motivated this move.

**Multiple-rows-per-slot semantics.** The agentic test ([#149](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/149)) surfaced the architectural reality that a slot can have multiple governed-asset rows under different curation contexts. `PKT-SKU-009` HERO had two: the milestone-5 thin-bridge row (`recSS08Vhnw5RuuUc`) and the agentic row (`recAGC8vFHTjvD5fH`), both with `governed_output_status = candidate`. A downstream consumer asking "what's the HERO?" had no clean answer.

**The authorship-vs-confirmation distinction.** Grounding note v42's philosophical anchor on capture as selection asks: when curation is delegated to algorithmic or agentic processes, does the human's residual approval preserve the authorship character of the curation event, or does it shift authorship into the narrowing layer? The architecture must remain legible enough to distinguish these patterns and record which one produced any given governed asset. The current `capture_reason` and `capture_notes` fields carry textual hints but no structured field exists.

The bundled B → F move resolves the first pressure point while installing structural capacity to start answering the second.

## Plan (Stated Before Execution)

**F first (schema):**

- **Target:** `generated_assets` table (`tblizXSksDef9O70Z`) on `appoqJ25B6w4vSuX9`
- **Action:** create one new field, `curation_pattern` (singleLineText, defer enum)
- **Field description:** records how this row was produced — distinguishing authorship-bearing curation (raw-pass selection) from confirmation-bearing approval (ratification of a pre-narrowed default)

**B next (promotion):**

- **Targets:**
  - `recAGC8vFHTjvD5fH` (HERO agentic)
  - `rec5IfLrRxQilTpDt` (PROFILE agentic)
  - `recvyDFRJ13acUhFA` (DETAIL agentic)
- **Action per row:** `governed_output_status` → `governed_output`; `curation_pattern` = `agent-proposed-human-ratified`

**Choice reasoning for the HERO multiple-rows question.** The milestone-5 thin-bridge HERO row (`recSS08Vhnw5RuuUc`) has `review_artifact_flag = true`. Per that field's description ("Flag assets that exist only as review artifacts"), the row is semantically *not* a candidate for governed-output promotion — it's a thin-bridge review artifact. The agentic HERO row has the flag unset, marking it as a real governed-output candidate. Promoting the agentic row resolves the multiple-rows question by *honoring the existing semantic signal* on the milestone-5 row, not overriding it.

**Non-actions:**

- milestone-5 HERO row not touched (stays `candidate` + `review_artifact_flag=true`)
- PKT-SKU-007 rows not touched (separate move if it earns weight)
- `curation_pattern` only populated on the three rows being promoted
- no other fields, tables, or modes touched
- no AI field-agent configuration
- no generation invocation
- no `asset_uri` writeback retry

**Terminal stop:** field exists; three rows are `governed_output` with `curation_pattern` populated.

## Execution Record

The schema move (F) succeeded on first attempt. New field `curation_pattern` exists with id `fldkXgiCAGPmSo424`.

The promotion move (B) succeeded on first attempt as a single batched call. Three rows promoted; `governed_output_flag` formula updated from 0 to 1 for each promoted row, confirming the promotion propagates through derived fields correctly.

## Findings

### 1. Multiple-rows-per-slot semantics resolved for PKT-SKU-009 HERO

The HERO slot's two governed-asset rows are now operationally distinguishable:

| Row | `governed_output_status` | `review_artifact_flag` | `curation_pattern` | Operational meaning |
|---|---|---|---|---|
| `recSS08Vhnw5RuuUc` (milestone-5) | candidate | true | (empty) | thin-bridge review artifact |
| `recAGC8vFHTjvD5fH` (agentic) | governed_output | (false) | agent-proposed-human-ratified | the chosen HERO output |

Downstream consumers asking "what's the HERO governed output?" can now query `governed_output_status = governed_output AND (review_artifact_flag IS NULL OR review_artifact_flag = false)` and get a clean single answer. The existing semantic signal on `review_artifact_flag` was honored rather than overridden.

### 2. Forward promotion path: Supported

The `governed_output_status` singleSelect transition from `candidate` to `governed_output` accepted cleanly via the connector. No tool-layer issues. The `governed_output_flag` formula field updated correctly to 1 for promoted rows, confirming derived field propagation works through the promotion event.

### 3. First populated `curation_pattern` values

All three promoted rows share `agent-proposed-human-ratified`. This is a single data point of a single structural pattern. Not yet enough for enum readiness — matching the established `capture_reason` posture (singleLineText, defer enum until value space stabilizes).

### 4. `curation_pattern` complements `capture_reason` rather than replaces it

The two fields capture different aspects of the curation event:

- `capture_reason` records *why* this particular candidate was chosen (the rationale, e.g., `agentic-curation-attempt-1`)
- `curation_pattern` records *how* the curation event was structured (the delegation pattern, e.g., `agent-proposed-human-ratified`)

Both are needed for full provenance. The pattern is a structural description; the reason is a substantive description.

### 5. `review_artifact_flag` semantic drift narrows but persists

Within `PKT-SKU-009`, the flag now has clear operational semantics:

- `true` = thin-bridge review artifact, not for downstream consumption
- `false` (or unset) = governed-output candidate or governed output

But PKT-SKU-007's rows have `review_artifact_flag` unset *and* `governed_output_status = candidate`. Under the new convention, they would be governed-output candidates that have not yet been promoted. That reading is consistent — they're awaiting promotion, not review artifacts. The cross-packet inconsistency is narrower than the agentic-test note suggested.

## Structured Change Summary

**Why this change exists.** The agentic test ([#149](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/149)) created two coexisting governed-asset rows for `PKT-SKU-009` HERO with no structural way to distinguish "the chosen one." Grounding note v42 raised the parallel question of whether the architecture distinguishes authorship-bearing curation from confirmation-bearing approval. Bundling the resolution (promotion) with the structural capacity (the new field) lets one move address both pressures cleanly.

**What changed.** New field `curation_pattern` on `generated_assets`. Three `PKT-SKU-009` agentic rows promoted from `candidate` to `governed_output` with `curation_pattern = agent-proposed-human-ratified`. `governed_output_flag` formula updated automatically.

**What did not change.** Existing fields and their semantics. milestone-5 HERO row (stays `candidate` + `review_artifact_flag=true`). PKT-SKU-007 rows (stay `candidate`, no `curation_pattern` value). Other tables and other modes. AI field-agent configuration. No generation invocation.

**What remains out of scope.** Promotion of PKT-SKU-007 rows (separate move; would require a `curation_pattern` value chosen for that work phase). Change to milestone-5 HERO row's status. Promotion of `curation_pattern` to singleSelect. Change to the `review_artifact_flag` semantics or its values on existing rows. A first-class `curator` field. Vision-based agentic curation. Full-flow (generation + curation) testing. Cross-mode application.

## What This Mutation Resolves

- The multiple-rows-per-slot question now has a clean operational answer for `PKT-SKU-009` HERO, achieved by honoring the existing `review_artifact_flag` signal rather than overriding it.
- The architecture now has structural capacity to record curation patterns (authorship-bearing vs confirmation-bearing) per row, addressing the grounding-note v42 anchor.
- The forward `candidate → governed_output` promotion path is verified Supported.
- `governed_output_flag` formula behavior under promotion is verified.

## Open Questions / Next Pressure Points

1. **PKT-SKU-007 rows promotion.** They are now operationally ambiguous: `governed_output_status = candidate` but no longer review artifacts under the narrowed semantics. Promoting them would complete the v1 evidence chain's transition. Their `curation_pattern` value would need a chosen descriptor for Gate 6 packet-level work — possibly `auto-linked-from-batch-execution` or similar. Flagged; not opened.
2. **Single-row slots in the agentic test.** PROFILE and DETAIL each had only one governed-asset row, so promotion was straightforward — but the multiple-rows-per-slot test was only run on HERO. The pattern hasn't been pressure-tested against a slot that genuinely has two competing candidate rows from different curation events.
3. **Vision-based agentic curation.** Still untested; the natural richer counterpart to the metadata-based test in #149.
4. **Full-flow generation + curation test.** Still untested; would pull in AI field-agent configuration and generation invocation.
5. **First-class `curator` field.** Slightly more pressured now: `curation_pattern` records *how* the delegation happened but `curator` would record *who* (agent, human, agent-name, human-name). Currently implicit in `capture_notes` text.
6. **`asset_uri` writeback blocker.** Still applies. Not addressed in this scope.
7. **Enum readiness for `curation_pattern`.** With one populated value across three rows, the field has a single-pattern dataset. More data needed — most likely from PKT-SKU-007 promotion or future fresh curation events — before enum promotion can be evaluated honestly.

## What This Note Does Not Do

- promote PKT-SKU-007 rows
- modify the milestone-5 HERO row
- formally reopen capture-mechanics work
- claim that `review_artifact_flag` semantics are fully reconciled across packets
- promote `curation_pattern` to singleSelect
- introduce a `curator` field
- claim production-readiness

## Anchor Documents

- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md): the agentic test that surfaced the multiple-rows-per-slot question
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the prior schema mutation establishing the four provenance fields
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch
- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestones/milestone-6-curation-event-first-class-plateau.md): the plateau this builds from
- [`docs/curation-event-population-findings-pkt-sku-009.md`](curation-event-population-findings-pkt-sku-009.md): the milestone-5 HERO row backfill that established `review_artifact_flag = true` for that row
