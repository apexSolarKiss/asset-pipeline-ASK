# Curation Event Schema Mutation // SKU-Driven Furniture v1

## Purpose

This note records a bounded schema mutation on the SKU-driven Furniture v1 Airtable base that makes the curation event a first-class governance record. The mutation enriches `generated_assets` with four provenance fields. It is anchored to the v3 finding from [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md) that curation is uniform at the packet level across all four worked-example modes.

It is not new doctrine. It implements the smallest honest schema move that the cross-mode pressure-test surfaced as load-bearing.

## Architectural Anchor

The cross-mode layered-input model note identifies the curation event as the seam between layer 5 (raw candidates) and layer 6 (governed asset). The v3 pressure-test established that curation at the packet level is uniform across SKU, collection, marketing, and campaign modes — per-slot curation plus review-shaped coherence verification. Selection-from-selections recursion is architecturally possible at higher organizational levels (brand-system, portfolio) but is not pressured by the four mode packets.

That contraction matters for schema. A separate `curation_events` table would over-fit by pre-building for an organizational level not currently in scope. Enriching the existing `generated_assets` post-curation record with provenance fields is the smaller honest move and remains consistent with the v3 finding.

The fields chosen also discharge milestone 5's "What It Did Not Establish" gap, which named `capture_reason`, `captured_at`, `source_attachment_id`, and `capture_notes` as deferred provenance.

## Plan (Stated Before Execution)

**Target:** `generated_assets` table (id `tblizXSksDef9O70Z`) in base `appoqJ25B6w4vSuX9`.

**Action:** create four fields on `generated_assets`:

| Field | Type | Carries |
|---|---|---|
| `capture_reason` | singleLineText | Why this candidate was elevated. Held as text, not singleSelect, to avoid premature enum doctrine; promote to enum once values stabilize. |
| `captured_at` | dateTime (ISO date, 24-hour, viewer time zone) | Timestamp of the curation event. Editable so historical thin-bridge captures can be backfilled. |
| `source_attachment_id` | singleLineText | Pointer to which raw `slot_generated_image_v1` attachment became this asset. Stored as attachment ID rather than URL to sidestep the milestone 5 tool-layer blocker on attachment URL writes. |
| `capture_notes` | multilineText | Free-text justification for the curation event — what bounded discretion was exercised, what the curator was selecting against. |

**Non-actions (explicit):**

- no changes to existing `generated_assets` fields
- no other table touched
- no new tables
- no generation invocation
- no `generated_assets` row creation
- no `output_slot` linking
- no `slot_status` changes
- no field deletions
- no AI field-agent configuration

**Terminal stop:** after the four fields exist on `generated_assets` and post-state is verified.

## Execution Record

Three of four fields created cleanly on the first attempt. `captured_at` initially failed validation when `timeZone: "UTC"` was rejected as not in the accepted enum. Re-proposed with `timeZone: "client"` (Airtable's standard "viewer's timezone" value) and the field was created. No other deviations from the plan.

Final field IDs (post-mutation):

- `capture_reason` — `fldUgcefiVI3bCC0p`
- `captured_at` — `fldWEZ4KlJa1jKFx9`
- `source_attachment_id` — `fldXTqXwy9icVwe9O`
- `capture_notes` — `fldylUNsfKdvY1FFw`

## Structured Change Summary

**Why this change exists.** The cross-mode pressure-test found that the curation event is a uniform, load-bearing structural seam at the packet level across all four worked-example modes. Milestone 5 had already named the four provenance gaps but deferred them at the thin-bridge plateau. The architectural sketch demonstrates that those four fields carry the curation event's first-class identity in the schema, so the deferral is no longer the right posture.

**What changed.** Four new fields exist on `generated_assets` in the SKU-driven Furniture v1 base. Each carries a description that explains its role. No existing fields were altered.

**What did not change.** Existing `generated_assets` fields and their semantics are unchanged. `governed_output_status` continues to carry the candidate / governed_output / rejected lifecycle. The thin-bridge model from milestone 5 still works; the new fields enrich it but do not replace it. No other table was touched. No rows were created, deleted, or modified. No AI field-agent configuration was changed. No generation was invoked.

**What remains out of scope.** Backfill of the four new fields on existing `generated_assets` rows from `PKT-SKU-007`, `PKT-SKU-008`, or `PKT-SKU-009`. Promotion of `capture_reason` from singleLineText to singleSelect after values stabilize. A separate `curation_events` table for higher-level organizational curation. A `curator` identity field. A solution to the milestone 5 attachment URL writeback blocker. Any change to other modes' bases (none exist yet). Any cross-mode generalization claim — this mutation is bounded to the SKU-driven Furniture v1 base.

## What This Mutation Resolves

- Milestone 5's named "What It Did Not Establish" deferred provenance fields are now structurally present.
- The curation event has a recordable form: which candidate was selected, when, why, and what discretion was exercised.
- The "capture as selection" framing from the project grounding note has a structural home in the schema, not just in prose.
- Bounded creative discretion declared at the packet layer becomes traceable through to which discretion was exercised at the curation seam (via `capture_notes`).

## Pressure Points / Open Questions

1. **`source_attachment_id` may inherit the asset_uri tool-layer blocker.** Until a real curation event tries to populate this field with an actual attachment ID, we do not know whether the connector will accept the write. The field is structurally fine; practical population is a separate test.
2. **`capture_reason` enum readiness.** Held as text deliberately. Re-evaluate after one or two real curation events. If the value space stabilizes around a small number of strings, promote to singleSelect. If values stay heterogeneous, it likely should remain free-text or split into structured plus freeform.
3. **`curator` identity remains implicit.** Solo prototype operation makes this acceptable for now. If a multi-curator pattern emerges, or if review-board sign-off becomes a separate role, curator identity needs to be modeled — most likely as a singleCollaborator field rather than a free-text name.
4. **Backfill posture.** Existing `generated_assets` rows from the thin-bridge phase do not have these fields populated. A backfill sweep is one option; treating the new fields as forward-only is another. Either is defensible; not authorized in this mutation.

## What This Note Does Not Do

- finalize a curation-event ontology
- authorize backfill on existing `generated_assets` rows
- authorize AI field-agent configuration to populate the new fields
- generalize this schema move to other base modes (none exist yet)
- claim production-readiness
- supersede the cross-mode layered-input model note
- close milestone 5 — the thin-bridge plateau still stands; this mutation enriches the post-curation record but does not solve the attachment URL writeback blocker

## Anchor Documents

- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): cross-mode layered-input model that anchors this schema move
- [`docs/architecture.md`](architecture.md): high-level architecture stance
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): SKU-driven Furniture v1 prototype plateau, including the deferred provenance gap that this mutation discharges
- [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md): thin-bridge findings, including the tool-layer blocker on attachment URL writes
- [`docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md`](capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md): capture-mechanics pause decision
