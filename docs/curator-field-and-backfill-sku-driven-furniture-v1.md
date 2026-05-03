# Curator Field And Backfill // SKU-Driven Furniture v1

## Purpose

This note records a bundled architectural move on the SKU-driven Furniture v1 base:

- **F —** add a new structural field `curator` to `generated_assets` that records *who* performed or authorized the curation event, completing the *who* axis of the curation event's structural provenance (alongside `capture_reason` for *why*, `captured_at` for *when*, `source_attachment_id` for *what*, and `curation_pattern` for *how*).
- **B —** backfill `curator` on four of the six existing governed-asset rows where curator identity is honestly known. Two rows (the PKT-SKU-007 Gate 6 rows) are deliberately left empty, consistent with their `curation_pattern = batch-output-no-curator-selection` — a curator never existed for those rows.

Outcome: **Supported** for the addition and backfill. The move surfaces a structural mirror of the three curation patterns through the curator value space.

## Architectural Anchor

The article [`The Creative Act of Selection`](../../ASK%20Dropbox/studio/studio%20ASK/2026%20studioASK/asset-pipeline-ASK-ZZZ/articles/The%20Creative%20Act%20of%20Selection.md) names five things the curation event has to record: what, why, when, by whom, and under what pattern of delegation. The schema landed in [#145](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/145) covered four of the five (what / why / when / how). The fifth — *by whom* — has been recorded only in `capture_notes` free text, not as a structured field.

This move closes that gap.

The grounding note's anchor on capture as selection (v42) makes the same case from the philosophical side: *who exercises the bounded discretion* is one of the load-bearing dimensions of the curation event. The architecture now records it as a first-class field rather than an interpretive textual hint.

## Plan (Stated Before Execution)

**F first (schema):**

- **Target:** `generated_assets` table (`tblizXSksDef9O70Z`) on `appoqJ25B6w4vSuX9`
- **Action:** create one new field, `curator` (singleLineText, defer enum, defer collaborator-typing)
- **Field description:** records the curator-of-record for the curation event; allows heterogeneous values uniformly (single human curator, agent-and-human compound, system process); empty when no curation event occurred

**B next (backfill):**

| Row | Slot | curator value | Reasoning |
|---|---|---|---|
| `recSS08Vhnw5RuuUc` | PKT-SKU-009 HERO (milestone-5) | `ASK` | Raw-pass curator selection during thin-bridge work |
| `recAGC8vFHTjvD5fH` | PKT-SKU-009 HERO (agentic) | `Claude (proposing); ASK (ratifying)` | Confirmation-bearing pattern; both roles recorded |
| `rec5IfLrRxQilTpDt` | PKT-SKU-009 PROFILE | `Claude (proposing); ASK (ratifying)` | Same |
| `recvyDFRJ13acUhFA` | PKT-SKU-009 DETAIL | `Claude (proposing); ASK (ratifying)` | Same |
| `recUhQzJCVVAVLGnx` | PKT-SKU-007 DETAIL | *(empty)* | No curator existed; consistent with `batch-output-no-curator-selection` |
| `recwXYcPKGfiKNxlg` | PKT-SKU-007 PROFILE | *(empty)* | Same |

**Choice reasoning for the field type.** `singleLineText` was chosen over `singleCollaborator` to handle non-human curators (Claude, system processes) uniformly with human curators in the same field. The Airtable `singleCollaborator` type cannot hold non-human values. A future schema move may split this into `curator_type` + `curator_id` if the value space stabilizes around a small set of types.

**Choice reasoning for the compound value on agentic rows.** The agentic curation event had two roles: Claude proposed a candidate, ASK ratified. Both are part of the curation event. Recording the compound value `Claude (proposing); ASK (ratifying)` honestly represents this dual structure. A single-curator value would erase the delegation pattern's signature.

**Choice reasoning for empty curator on PKT-SKU-007 rows.** The `curation_pattern = batch-output-no-curator-selection` already records that no curator selection event occurred. Leaving `curator` empty is internally consistent — there was no curator. Populating with a placeholder like `(none)` or `system` would be redundant or misleading.

**Non-actions:**

- no other schema changes
- milestone-5 HERO row's `curation_pattern` not touched (still unset; deferred per #151's open question)
- no AI field-agent configuration
- no generation invocation
- no other tables, modes, or bases
- no `governed_output_status` changes

**Terminal stop:** field exists; four rows populated; two rows deliberately empty.

## Execution Record

The schema move (F) succeeded on first attempt. New field `curator` exists with id `fldadSgPRBeGjbW17`.

The backfill move (B) succeeded on first attempt as a single batched call. Four rows populated. PKT-SKU-007 rows deliberately not included in the batch — leaving them empty preserves the no-curator semantic.

## Findings

### 1. The curator value space mirrors the curation_pattern value space

The curator field, populated honestly across the four rows where curators exist, surfaces three structurally distinct value classes that align with the three curation patterns recorded in `curation_pattern`:

| Curation pattern | Curator value class | Example |
|---|---|---|
| (unset, but structurally authorship-bearing) | Single human curator | `ASK` |
| `agent-proposed-human-ratified` | Compound (agent + human, with roles) | `Claude (proposing); ASK (ratifying)` |
| `batch-output-no-curator-selection` | Empty (no curator existed) | *(empty)* |

This is not a coincidence — the curator field and curation pattern field are joint metadata about the same event, surfacing complementary aspects (*who* and *how*). The mirror is structural, not stylistic.

### 2. Compound curator value honestly records delegated curation

The `Claude (proposing); ASK (ratifying)` value preserves the agentic delegation pattern's signature in the schema. A single-curator field with one of those names would have erased the pattern. The compound value is what makes the schema legible to a future reader trying to reconstruct *who actually did what* in the curation event.

This is exactly the legibility the article on creative authorship argues is required.

### 3. Empty curator on no-curation-event rows is a real signal

For the PKT-SKU-007 rows, `curator IS EMPTY` is a structurally meaningful query — it returns rows where no curation event occurred. This is consistent with `curation_pattern = batch-output-no-curator-selection` and reinforces the third class of asset production the prior PR ([#151](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/151)) surfaced.

### 4. The curation event's structural provenance is now structurally complete

Five of the five things the article names are now first-class schema fields:

| Article axis | Field | Status |
|---|---|---|
| What was selected (and from what) | `source_attachment_id` (and implicitly the slot's candidate set via `output_slot` link) | populated |
| Why | `capture_reason` (rationale) + `capture_notes` (justification) | populated |
| When | `captured_at` | populated |
| By whom | `curator` | newly populated |
| Under what pattern of delegation | `curation_pattern` | populated |

The schema is no longer carrying the *who* axis only in free text. Every governed-asset row now exposes the curation event as a first-class governance record.

### 5. Schema design choice — text over collaborator — earns its keep immediately

Two of the four populated rows have non-human content in the curator field (`Claude (proposing); ASK (ratifying)`). A `singleCollaborator` field could not have held this value. The decision to defer collaborator-typing was correct for this stage; pattern stabilization may justify a future split.

## Structured Change Summary

**Why this change exists.** The article on creative authorship names *by whom* as one of five required dimensions of the curation event's structural provenance. Prior schema work covered four of the five but left the curator dimension only in free-text `capture_notes`. Adding the `curator` field closes that gap and completes the curation event's structural provenance for v1.

**What changed.** New field `curator` on `generated_assets`. Four rows populated with honest curator values. Two rows deliberately left empty to preserve no-curation-event semantics.

**What did not change.** No other schema changes. No `governed_output_status` changes. No `curation_pattern` changes. milestone-5 HERO row's `curation_pattern` remains unset (deferred per #151). Other tables and modes untouched. No AI field-agent configuration. No generation invocation.

**What remains out of scope.**

- Backfill of milestone-5 HERO row's `curation_pattern` (still deferred)
- Splitting `curator` into `curator_type` + `curator_id` (deferred until value-space pressure earns it)
- Promotion of any field to singleSelect or collaborator types
- Vision-based agentic curation
- Full-flow generation + curation test
- Cross-mode application
- `asset_uri` writeback blocker resolution

## What This Mutation Resolves

- The curation event's structural provenance is now structurally complete for v1: all five dimensions named in the article have first-class schema fields.
- The curator value space surfaces a structural mirror of the curation pattern value space, reinforcing the three-class typology of asset production from #151.
- The architecture's ability to record *who curates* is now first-class, addressing one of the open questions consistently flagged across recent notes.

## Open Questions / Next Pressure Points

1. **Backfill of milestone-5 HERO row's `curation_pattern`.** Still deferred. With curator now populated as `ASK`, the pattern would naturally be `raw-pass-curator-selection` or `authorship-bearing-curation`. Trivial follow-on.
2. **Whether to split `curator` into type + id.** Two distinct value patterns exist (single human, compound agent-plus-human). One more pattern (e.g., a system-process curator like `Gate 6 batch executor`) could pressure for the split. Held until evidence earns it.
3. **Vision-based agentic curation.** Still untested; the natural richer counterpart to the metadata-based test in #149.
4. **Full-flow generation + curation test.** Still untested.
5. **Cross-mode application.** Still untested.
6. **The compound-curator value's enum readiness.** Two rows share `Claude (proposing); ASK (ratifying)`; one row has `ASK`. Three rows of two distinct values is not yet enough to evaluate enum promotion honestly. Stay-as-text remains correct.

## What This Note Does Not Do

- backfill milestone-5 HERO row's `curation_pattern`
- split `curator` into structured sub-fields
- promote any field to enum or collaborator types
- claim production-readiness
- close the v1 sweep — vision-based agentic, full-flow, and cross-mode moves remain

## Anchor Documents

- [`docs/governed-output-promotion-findings-pkt-sku-007.md`](governed-output-promotion-findings-pkt-sku-007.md): the prior promotion that completed the v1 evidence chain transition and surfaced the third curation pattern
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): the prior schema add for `curation_pattern`
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the original four-field schema move that this completes
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch
- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestones/milestone-6-curation-event-first-class-plateau.md): the plateau this builds from
