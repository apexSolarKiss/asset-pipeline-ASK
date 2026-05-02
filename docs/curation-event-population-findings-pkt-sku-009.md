# Curation Event Population Findings // PKT-SKU-009

## Purpose

This note records the bounded backfill that populated the four curation-event provenance fields on the existing `PKT-SKU-009` HERO governed-asset record, as the first practical test of the schema move landed in [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md).

Outcome: **Supported.**

The load-bearing question that this test resolved was whether `source_attachment_id` (held as singleLineText) inherits the milestone-5 attachment-URL writeback blocker. It does not.

## Plan (Stated Before Execution)

**Target:** `generated_assets` row `recSS08Vhnw5RuuUc` (asset_key `ASSET-PKT-SKU-009-GATE2-HERO-ATTEMPT1-attHhekFb8MWgcIFg`) in base `appoqJ25B6w4vSuX9`.

**Action:** populate four curation-event provenance fields with values reconstructed from existing thin-bridge evidence:

| Field | Value | Source |
|---|---|---|
| `capture_reason` | `thin-bridge-gate-2-attempt-1` | Historical context: Gate 2 image-bearing reference path proof, Attempt 1 |
| `captured_at` | `2026-05-01T05:26:47.000Z` | Matches the bridge row's `createdTime` — the moment the curation was recorded |
| `source_attachment_id` | `attHhekFb8MWgcIFg` | Extracted from the `asset_key` naming convention, which encoded the source attachment id implicitly |
| `capture_notes` | descriptive backfill text | Reconstructs why this candidate was chosen and why review_artifact_flag is true |

**Non-actions:**

- no schema change
- no row creation or deletion
- no other rows touched (PKT-SKU-007 and PKT-SKU-008 backfill out of scope)
- no `governed_output_status` change (stays `candidate`)
- no `review_artifact_flag` change (stays `true`)
- no `asset_uri` write (the known blocker is not retried in this scope)
- no DETAIL or PROFILE slot bridging (the only existing `generated_assets` row for `PKT-SKU-009` is the HERO row)
- no AI field-agent configuration
- no generation invocation

**Terminal stop:** after the four fields are populated and verified.

## Execution Record

The update succeeded on the first attempt. All four fields accepted the writes. Existing values on the row (`asset_key`, `governed_output_status`, `review_artifact_flag`, link fields) were unchanged, as expected.

Post-state of `recSS08Vhnw5RuuUc` confirmed by the same call:

- `capture_reason`: `thin-bridge-gate-2-attempt-1`
- `captured_at`: `2026-05-01T05:26:47.000Z`
- `source_attachment_id`: `attHhekFb8MWgcIFg`
- `capture_notes`: present (full descriptive text)
- `governed_output_status`: `candidate` (unchanged)
- `review_artifact_flag`: `true` (unchanged)
- `asset_key`: unchanged

## Findings

1. **Writeback verdict for `source_attachment_id`: Supported.** The connector accepted a text write of the Airtable attachment id (`attHhekFb8MWgcIFg`) into the singleLineText field. No tool-layer block. The deliberate design choice in the schema mutation note (hold `source_attachment_id` as text rather than as URL or attachment type) is validated as a viable route around the milestone-5 blocker.

2. **Tool-layer blocker scope clarified.** The milestone-5 blocker applies to URL-format writes targeting attachment-typed fields (where `asset_uri` is type `url`, and writes attempting to push attachment URLs into attachment fields fail under the same connector path). Text fields holding attachment ids are not blocked. This is a useful narrowing of the blocker's scope for future capture-mechanics work.

3. **Provenance was implicit in `asset_key`.** The pre-existing naming convention `ASSET-PKT-SKU-009-GATE2-HERO-ATTEMPT1-attHhekFb8MWgcIFg` carried the source attachment id as a primary-key suffix. Useful as a fallback, but not first-class. The backfill promotes the same information to a structured field that downstream consumers can read without parsing a key.

4. **First data point for `capture_reason` enum readiness.** One value populated: `thin-bridge-gate-2-attempt-1`. Not enough to evaluate enum stabilization. More real curation events are needed before a singleSelect promotion can be evaluated honestly.

5. **`captured_at` round-trips correctly.** ISO 8601 timestamp string write was accepted and stored. The `timeZone: client` configuration from the schema mutation works as intended for a backfill where the absolute moment is what matters.

## Structured Change Summary

**Why this change exists.** The schema mutation in PR #145 stood up the four provenance fields but did not test that they were practically writable against the milestone-5 thin-bridge blocker. The backfill on `PKT-SKU-009`'s only existing `generated_assets` row was the cleanest available test target — a real historical curation event with a known source attachment id encoded in the asset_key.

**What changed.** One existing `generated_assets` row (`recSS08Vhnw5RuuUc`) had its four curation-event provenance fields populated with values reconstructed from existing evidence. No schema change. No other rows touched.

**What did not change.** All other `generated_assets` fields and rows. `governed_output_status` remains `candidate`. `review_artifact_flag` remains `true`. `asset_uri` remains empty (the known blocker is unchanged; not retried). Other tables and other modes are not affected.

**What remains out of scope.** Backfill of `PKT-SKU-007` or `PKT-SKU-008` `generated_assets` rows (a separate, narrow move now justified if useful). Creation of new `generated_assets` rows for the DETAIL or PROFILE slots on `PKT-SKU-009`. Promotion of `governed_output_status` from `candidate` to `governed_output`. Any retry of the `asset_uri` writeback. Any change to `capture_reason` enum readiness — the value was held as text and remains so.

## What This Mutation Resolves

- The first deferred-provenance gap from milestone 5 is now populated with real values, not just structurally present.
- The writeback risk that was flagged in the schema mutation note's "Pressure Points" section is now resolved as Supported, narrowing the milestone-5 blocker's scope.
- The implicit source-attachment-id encoding in `asset_key` is no longer the only way to recover that provenance.

## Open Questions / Next Pressure Points

1. **Capture-mechanics reopen trigger.** Milestone 5 paused capture mechanics pending a concrete reopen trigger. The fact that `source_attachment_id` is writable as text — and one row now has populated provenance — is one such trigger. Whether to reopen formally is a separate decision; this note flags the trigger but does not act on it.
2. **`capture_reason` enum readiness.** Need at least 2-3 more populated curation events with diverse reasons before stabilization can be evaluated. A backfill of `PKT-SKU-007` and `PKT-SKU-008` rows would produce that data cheaply.
3. **Rejected candidates not recorded.** The HERO slot had 7 candidate attachments; one was elevated. The other 6 are not recorded as "rejected candidates" anywhere — they remain in the slot's `slot_generated_image_v1` attachment list with no provenance distinguishing chosen from unchosen. A future schema move could model rejected candidates explicitly; out of scope here.
4. **`asset_uri` blocker still applies.** This backfill did not test the original blocker. `asset_uri` remains empty on this row, and writeback to that field continues to be tool-layer-blocked per milestone 5.

## What This Note Does Not Do

- backfill `PKT-SKU-007` or `PKT-SKU-008` rows
- create new `generated_assets` rows
- promote `governed_output_status` to `governed_output`
- retry `asset_uri` writeback
- promote `capture_reason` to singleSelect
- reopen capture-mechanics formally (the trigger is flagged, not acted on)
- claim production-readiness for any mode

## Anchor Documents

- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the schema mutation that stood up the four provenance fields
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch that anchors the curation-event work
- [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md): the original thin-bridge findings recording the curation event that this backfill makes first-class
- [`docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md`](capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md): the capture-mechanics pause decision that this finding may pressure to reopen
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): the milestone that named the deferred provenance gap
