# Curation Event Population Findings // PKT-SKU-007

## Purpose

This note records the parallel backfill that populated the four curation-event provenance fields on the two existing `PKT-SKU-007` Gate 6 governed-asset records, extending the test landed for `PKT-SKU-009` in [`docs/curation-event-population-findings-pkt-sku-009.md`](curation-event-population-findings-pkt-sku-009.md).

It also records the first cross-packet evaluation of `capture_reason` enum readiness, now that three populated rows give two distinct values to compare.

Outcome: **Supported** for the writeback. **Not yet ready** for `capture_reason` enum promotion.

## Plan (Stated Before Execution)

**Target:** two `generated_assets` rows in base `appoqJ25B6w4vSuX9`:

| Row | asset_key | Slot |
|---|---|---|
| `recUhQzJCVVAVLGnx` | `ASSET-PKT-SKU-007-GATE6-DETAIL-ATTEMPT1-att0lOda5z2lEXR6m` | DETAIL |
| `recwXYcPKGfiKNxlg` | `ASSET-PKT-SKU-007-GATE6-PROFILE-ATTEMPT1-attlBw4Dy4BiXm7sE` | PROFILE |

**Action:** populate the four curation-event provenance fields with values reconstructed from the historical Gate 6 packet-level execution context. Both rows share `capture_reason` and `captured_at` (single execution event, two slots); `source_attachment_id` and `capture_notes` differ per row.

**Non-actions:**

- no schema change
- no row creation or deletion
- `PKT-SKU-008` has no `generated_assets` rows (verified by query); nothing to backfill there
- `PKT-SKU-009` row already populated; not retouched
- no `governed_output_status` change
- no `review_artifact_flag` change
- no `asset_uri` write (the original blocker is not retried)
- no AI field-agent configuration
- no generation invocation

**Terminal stop:** after both rows populated and verified.

## Execution Record

Both updates succeeded in a single batched call. Existing values (`asset_key`, `governed_output_status` = `candidate` for both, link fields, `asset_role`) unchanged. No tool-layer issues — consistent with the `PKT-SKU-009` finding that text-typed provenance writes are not subject to the milestone-5 attachment-URL blocker.

Post-state confirmed for both rows in the same call.

## Cross-Packet `capture_reason` Enum Readiness Analysis

Three populated rows now exist:

| Row | Packet | `capture_reason` | `captured_at` |
|---|---|---|---|
| `recSS08Vhnw5RuuUc` | PKT-SKU-009 | `thin-bridge-gate-2-attempt-1` | 2026-05-01T05:26:47Z |
| `recUhQzJCVVAVLGnx` | PKT-SKU-007 | `gate-6-packet-level-attempt-1` | 2026-04-26T05:47:00Z |
| `recwXYcPKGfiKNxlg` | PKT-SKU-007 | `gate-6-packet-level-attempt-1` | 2026-04-26T05:47:00Z |

Two distinct `capture_reason` values. The values are structurally asymmetric:

- `thin-bridge-gate-2-attempt-1` reads concept-first, then gate, then attempt
- `gate-6-packet-level-attempt-1` reads gate-first, then concept, then attempt

Both contain the same three components (work-phase concept, gate identifier, attempt number) but in different orders. This asymmetry reflects how the two work phases were named in their original context — the Gate 2 work was framed as a "thin bridge" (concept-led), while the Gate 6 work was framed as "Gate 6 packet-level" (gate-led). The asymmetry was preserved deliberately in the backfill to be honest about the historical naming, not massaged for surface uniformity.

**Verdict on enum promotion: not yet ready.** Two of three populated values being structurally asymmetric is a strong signal that singleSelect promotion would either:

1. Force a normalization that erases honest historical context
2. Lock in a value space that has not yet stabilized through enough real curation events to know what its natural shape is

**Two paths forward, neither authorized in this scope:**

- *Path A — standardize naming.* Pick one structural template (e.g., always `gate-<N>-<context>-attempt-<M>`) and update existing values to match. Risks retrofitting evidence about how the work was originally named.
- *Path B — split into structured fields.* If the gate / context / attempt structure proves load-bearing, separate `capture_gate`, `capture_context`, and `capture_attempt_number` fields would carry the structure cleanly while `capture_reason` could remain free-text or be retired. Heavier; not earned by current pressure.

**Recommendation:** keep `capture_reason` as singleLineText. Re-evaluate after at least one *fresh* (non-historical) curation event populates a 4th value organically. Historical backfill values reflect how the work was framed at the time, not how a future controlled curation event would describe itself.

## Other Findings

1. **`PKT-SKU-008` has zero `generated_assets` rows.** Notable absence — `PKT-SKU-007` (Gate 6) and `PKT-SKU-009` (Gate 2 thin bridge) produced governed-asset records, but `PKT-SKU-008` did not. The repo's evidence chain has packet records for `PKT-SKU-008` but the curation event never produced a bridged governed-asset identity. This is itself a curation-event data point: the absence of curation is also a state.

2. **`review_artifact_flag` differs across the populated rows.** `PKT-SKU-009` HERO has `review_artifact_flag=true`; both `PKT-SKU-007` rows have it unset (false). The two work phases treated curation outcomes differently — the Gate 2 thin bridge framed its output as a review artifact, while the Gate 6 packet-level work treated its outputs as candidate-grade governed assets without the review-artifact special status. This inconsistency is recorded but not corrected here.

3. **`asset_role` value style varies.** `PKT-SKU-009` HERO uses uppercase `HERO`; `PKT-SKU-007` rows use lowercase snake_case (`detail_crop`, `profile_side`). Cosmetic inconsistency in the v1 evidence chain. Out of scope to normalize.

4. **`source_attachment_id` writeback continues to be Supported.** Two more rows confirm the `PKT-SKU-009` finding. Not in question anymore.

## Structured Change Summary

**Why this change exists.** The `PKT-SKU-009` findings note in [#146](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/146) flagged `capture_reason` enum readiness as not yet evaluable from a single populated row. Backfilling the two `PKT-SKU-007` rows was the cheapest route to a second distinct `capture_reason` value, enabling honest enum-readiness assessment without requiring a new curation event.

**What changed.** Two existing `generated_assets` rows had their four curation-event provenance fields populated. No schema change. No other rows touched.

**What did not change.** All other `generated_assets` fields and rows. `governed_output_status` remains `candidate` on both rows. `asset_uri` remains empty on both. `review_artifact_flag` unchanged. Other tables and modes are not affected.

**What remains out of scope.** `PKT-SKU-008` `generated_assets` row creation (no rows exist; absence is recorded as a finding, not corrected). Creation of new `generated_assets` rows for any of the unbridged slots in any packet. Promotion of any row's `governed_output_status` from `candidate` to `governed_output`. Retry of `asset_uri` writeback. Promotion of `capture_reason` to singleSelect (the analysis here recommends against it). Normalization of `capture_reason` value structure across populated rows. Normalization of `asset_role` casing. Reconciliation of `review_artifact_flag` semantics across work phases.

## What This Mutation Resolves

- The `capture_reason` enum-readiness question is now evaluable: not yet ready, with a clear path forward and the open questions named.
- Two more curation events from the v1 evidence chain now have first-class provenance. The cross-mode v3 finding's claim that curation is uniform at the packet level has 3 populated reference examples spanning two distinct work phases.
- The narrowed scope of the milestone-5 blocker (URL/attachment-typed writes only, not text-holding-attachment-id) is confirmed across multiple records.

## Open Questions / Next Pressure Points

1. **Capture-mechanics reopen trigger weight.** Now that three rows have first-class provenance and the writeback path is confirmed Supported, the trigger flagged in the `PKT-SKU-009` findings note carries a bit more weight. Still not acted on here.
2. **Fresh curation event vs more backfill.** The honest next data point would come from a *fresh* (non-historical) curation event, where the curator describes their reason organically. That would require new generation, candidate selection, and bridge-row creation. Heavier; not opened here.
3. **`review_artifact_flag` semantics inconsistency.** The two work phases used the flag differently. Worth a future structural decision about what the flag means and which historical rows should carry it; not opened here.
4. **`PKT-SKU-008` absence.** Why no governed-asset bridge? Worth understanding before any future "complete the v1 evidence chain" pass; not opened here.

## What This Note Does Not Do

- create new `generated_assets` rows
- backfill `PKT-SKU-008` (it has no rows to backfill)
- promote any row's `governed_output_status`
- retry `asset_uri` writeback
- promote `capture_reason` to singleSelect (explicitly recommends against it for now)
- normalize `capture_reason` value structure
- normalize `asset_role` casing
- reconcile `review_artifact_flag` semantics
- reopen capture-mechanics formally
- claim production-readiness

## Anchor Documents

- [`docs/curation-event-population-findings-pkt-sku-009.md`](curation-event-population-findings-pkt-sku-009.md): the prior backfill that established the writeback verdict and flagged the enum-readiness question
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the schema mutation that stood up the four provenance fields
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch that anchors the curation-event work
- [`docs/multi-output-slot-generation-findings-sku-driven-furniture-v1.md`](multi-output-slot-generation-findings-sku-driven-furniture-v1.md): historical Gate 6 findings that produced the `PKT-SKU-007` `generated_assets` rows backfilled here
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): the milestone that named the deferred provenance gap
