# Governed Output Promotion Findings // PKT-SKU-007

## Purpose

This note records the bounded promotion of the two existing `PKT-SKU-007` Gate 6 governed-asset rows from `candidate` to `governed_output`, with the new `curation_pattern` field populated. It is the first follow-on move in the v1 sweep that begins after [#150](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/150).

Outcome: **Supported** for the promotion path. The move surfaces a meaningful third curation pattern beyond the two articulated in [#149](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/149) and the project grounding note (v42).

## Architectural Anchor

[#150](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/150) flagged the `PKT-SKU-007` rows as operationally ambiguous: `governed_output_status = candidate` but no longer review artifacts under the narrowed `review_artifact_flag` semantics. Promoting them would complete the v1 evidence chain's transition from candidate-only to governed-output for the historical work.

The deeper architectural question this surfaces is what `curation_pattern` value to record for these rows. Gate 6 packet-level execution produced one output per slot in a batch. There was no per-slot curator selection event — the system output was treated as the slot's candidate directly. This is *neither* authorship-bearing curation (curator over full candidate space) *nor* confirmation-bearing approval (ratification of a pre-narrowed default).

It is a third pattern. One the architecture should be able to record honestly.

## Plan (Stated Before Execution)

**Target:** two `generated_assets` rows in `appoqJ25B6w4vSuX9`:

| Row | asset_key |
|---|---|
| `recUhQzJCVVAVLGnx` | `ASSET-PKT-SKU-007-GATE6-DETAIL-ATTEMPT1-att0lOda5z2lEXR6m` |
| `recwXYcPKGfiKNxlg` | `ASSET-PKT-SKU-007-GATE6-PROFILE-ATTEMPT1-attlBw4Dy4BiXm7sE` |

**Action per row:**

- `governed_output_status` → `governed_output`
- `curation_pattern` = `batch-output-no-curator-selection`

**Choice reasoning for the new `curation_pattern` value.** Gate 6 packet-level execution produced one output per slot in a batch. There was no per-slot curator selection event. Recording this honestly via `batch-output-no-curator-selection` makes the absence-of-curation visible in the schema, which is the legibility the architecture needs in order to distinguish assets produced by real curation events from assets produced by default acceptance of system output.

**Non-actions:**

- no schema change (`curation_pattern` already exists from #150)
- milestone-5 HERO row (`recSS08Vhnw5RuuUc`) not touched
- PKT-SKU-009 agentic rows not touched (already promoted in #150)
- no new `generated_assets` rows
- no `asset_uri` writeback retry
- no `review_artifact_flag` change
- no other modes or bases
- no AI field-agent configuration
- no generation invocation

**Terminal stop:** two rows are `governed_output` with `curation_pattern` populated.

## Execution Record

The promotion succeeded on first attempt as a single batched call. `governed_output_status` updated from `candidate` to `governed_output` for both rows; `curation_pattern` populated as `batch-output-no-curator-selection` for both. `governed_output_flag` formula updated 0 → 1 for each, confirming the promotion propagates through derived fields correctly.

## Findings

### 1. Third curation pattern surfaced

The dataset now contains three distinct `curation_pattern` values across three structurally different patterns:

| Pattern | Description | Rows |
|---|---|---|
| (unset) | The milestone-5 thin-bridge HERO row was produced by a real curator selection from N candidates, but its `curation_pattern` has not been populated; its semantic place is "authorship-bearing curation" but not yet recorded. | `recSS08Vhnw5RuuUc` (HERO milestone-5) |
| `agent-proposed-human-ratified` | Confirmation-bearing approval: an algorithmic process narrowed N candidates to one, the curator approved. | 3 PKT-SKU-009 agentic rows |
| `batch-output-no-curator-selection` | Neither authorship-bearing nor confirmation-bearing: no per-slot curator selection event occurred; the system's batch output became the candidate directly. | 2 PKT-SKU-007 Gate 6 rows |

The third pattern is genuinely new conceptually relative to the article's framing in [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection). The article's binary distinction (authorship-bearing vs confirmation-bearing) implicitly assumed a curation event occurred. `PKT-SKU-007` reveals a third class: assets whose governed status comes from the *absence* of curation, not from curation.

This is a meaningful refinement. It does not contradict the article's argument — it sharpens it. The architecture's ability to distinguish "no curation event happened" from "curation event happened, in this delegation pattern" is part of the legibility the article argues is required.

### 2. Forward promotion path: Supported (multi-row)

`governed_output_status` singleSelect transitioned cleanly for both rows in a single batched call. `governed_output_flag` formula updated correctly. No tool-layer issues.

### 3. Enum readiness verdict reinforced

`curation_pattern` now has three structurally distinct values across three different patterns of asset production. Forcing enum normalization at this stage would either erase the structural distinctions or invent placeholder values. Stay-as-text remains the right posture.

### 4. milestone-5 HERO row's `curation_pattern` is now visibly empty

The milestone-5 thin-bridge HERO row has no `curation_pattern` populated. Under the patterns now in evidence, its honest value would be something like `raw-pass-curator-selection` (authorship-bearing) — the curator selected from N candidates during the thin-bridge work. Backfilling it would complete the v1 evidence chain's curation-pattern provenance.

That's a small follow-on move. Out of scope here; flagged.

### 5. The v1 evidence chain's transition from candidate to governed_output is now complete

All `generated_assets` rows in the v1 evidence chain (`PKT-SKU-007` and `PKT-SKU-009`) that were ever promotable have now been promoted, except the milestone-5 HERO row which stays `candidate` + `review_artifact_flag = true` deliberately as a thin-bridge review artifact.

| Row | Slot | Status | curation_pattern |
|---|---|---|---|
| `recSS08Vhnw5RuuUc` | PKT-SKU-009 HERO (milestone-5) | candidate (review artifact) | (unset) |
| `recAGC8vFHTjvD5fH` | PKT-SKU-009 HERO (agentic) | governed_output | agent-proposed-human-ratified |
| `rec5IfLrRxQilTpDt` | PKT-SKU-009 PROFILE | governed_output | agent-proposed-human-ratified |
| `recvyDFRJ13acUhFA` | PKT-SKU-009 DETAIL | governed_output | agent-proposed-human-ratified |
| `recUhQzJCVVAVLGnx` | PKT-SKU-007 DETAIL | governed_output | batch-output-no-curator-selection |
| `recwXYcPKGfiKNxlg` | PKT-SKU-007 PROFILE | governed_output | batch-output-no-curator-selection |

## Structured Change Summary

**Why this change exists.** [#150](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/150) flagged the `PKT-SKU-007` rows as operationally ambiguous after the `review_artifact_flag` semantics narrowed. Promoting them completes the v1 evidence chain's transition. The promotion event is the natural moment to record `curation_pattern`, which surfaces a third pattern beyond the two named in #149 and the article.

**What changed.** Two `PKT-SKU-007` rows promoted from `candidate` to `governed_output` with `curation_pattern = batch-output-no-curator-selection`. `governed_output_flag` formula updated automatically.

**What did not change.** No schema mutation. No other rows touched. milestone-5 HERO row retained as `candidate` + `review_artifact_flag = true`. PKT-SKU-009 agentic rows retained as already-promoted. Other tables and modes untouched. AI field-agent configuration unchanged. No generation invoked.

**What remains out of scope.**

- Backfill of `curation_pattern` for the milestone-5 HERO row
- Promotion of `curation_pattern` to singleSelect (analysis recommends against — three structurally different values across three patterns)
- Introduction of a `curator` field
- Reconciliation of `asset_role` casing across packets
- Vision-based agentic curation
- Full-flow generation + curation test
- Cross-mode application
- `asset_uri` writeback blocker resolution

## What This Mutation Resolves

- The v1 evidence chain's transition from candidate to governed_output is now complete (with the milestone-5 HERO row deliberately retained as a thin-bridge review artifact).
- A third `curation_pattern` is now visible in the dataset, surfacing the architectural distinction between *curation event happened* and *no curation event happened* for governed assets — exactly the legibility the article on creative authorship argues is required.
- The `curation_pattern` enum-readiness verdict is reinforced: stay as text.

## Open Questions / Next Pressure Points

1. **Backfill of milestone-5 HERO row's `curation_pattern`.** Honest value would be something like `raw-pass-curator-selection` or `authorship-bearing-curation`. Small follow-on move.
2. **First-class `curator` field.** Now slightly more pressured: three distinct curation patterns, but the curator-of-record is still implicit in `capture_notes` text. Next concrete move in the v1 sweep.
3. **Vision-based agentic curation.** Still untested; the natural richer counterpart to #149's metadata-based test.
4. **Full-flow generation + curation test.** Still untested.
5. **Cross-mode application.** Still untested; would test layer 2 composite content from the cross-mode model in practice.

## What This Note Does Not Do

- backfill milestone-5 HERO row's `curation_pattern`
- introduce a `curator` field
- promote `curation_pattern` to singleSelect
- claim production-readiness
- close the v1 sweep — first-class `curator`, vision-based agentic, full-flow, and cross-mode moves remain

## Anchor Documents

- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): the prior promotion + `curation_pattern` field move
- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md): the agentic test that articulated the authorship-vs-confirmation distinction
- [`docs/curation-event-population-findings-pkt-sku-007.md`](curation-event-population-findings-pkt-sku-007.md): the prior PKT-SKU-007 backfill that established `capture_reason` for these rows
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch
- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestones/milestone-6-curation-event-first-class-plateau.md): the plateau this builds from
