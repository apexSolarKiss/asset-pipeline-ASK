# Asset Attachment Backfill Findings // SKU-Driven Furniture v1

## Purpose

This note records the bounded backfill of `asset_attachment` on the prior 11 governed-asset rows that pre-existed Path B's introduction of the field. It also records a substantive architectural finding that the backfill operation surfaced: **the milestone-5 thin-bridge limitation had a real cost, not just an inconvenience — when the asset is text-referenced only and the source attachment is later deleted from the slot, the asset itself is structurally lost.**

Outcome: **Partial.** 9 of 11 rows backfilled successfully. 2 rows (PKT-SKU-007) cannot be backfilled — their source attachments no longer exist on the slot. Documented honestly as the cost of carrying the thin bridge for too long.

## Architectural Anchor

Path B ([#157](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/157)) added the `asset_attachment` field on `generated_assets` and validated attachment-copy writeback. Path B's "out of scope" explicitly listed backfill of prior rows as a separate small follow-on. This note is that follow-on.

The expected outcome: complete the `asset_attachment` population across all rows in one consistent state. The actual outcome surfaces a finding the architecture should absorb.

## Plan (Stated Before Execution)

**Target:** populate `asset_attachment` on the 11 prior governed-asset rows (those that pre-existed Path B):

| Row | Slot / context | Source attachment id |
|---|---|---|
| `recUhQzJCVVAVLGnx` | PKT-SKU-007 DETAIL | `att0lOda5z2lEXR6m` |
| `recwXYcPKGfiKNxlg` | PKT-SKU-007 PROFILE | `attlBw4Dy4BiXm7sE` |
| `recSS08Vhnw5RuuUc` | PKT-SKU-009 HERO (milestone-5 thin bridge) | `attHhekFb8MWgcIFg` |
| `recAGC8vFHTjvD5fH` | PKT-SKU-009 HERO (agentic metadata-based) | `attHhekFb8MWgcIFg` |
| `rec5IfLrRxQilTpDt` | PKT-SKU-009 PROFILE (agentic metadata-based) | `att7ZYkBhsCbDIGzj` |
| `recvyDFRJ13acUhFA` | PKT-SKU-009 DETAIL (agentic metadata-based) | `attP5XhJ5un2heqNW` |
| `recfFqzRz2sJzNpyP` | PKT-SKU-009 HERO (agentic vision-based) | `attHhekFb8MWgcIFg` |
| `rec7wPVVsGW7v0DOm` | PKT-SKU-009 PROFILE (agentic vision-based) | `att7ZYkBhsCbDIGzj` |
| `recTNmexj6IscCguj` | PKT-SKU-009 DETAIL (agentic vision-based) | `attP5XhJ5un2heqNW` |
| `recIfwRXLkLipYNkM` | PKT-SKU-009 PROFILE (Path A) | `attZ8URYSdBWBt2fF` |
| `reca3b1iPG9Mcb8r9` | PKT-SKU-009 DETAIL (Path A) | `attP5XhJ5un2heqNW` |

**Action:** for each row, fetch the source attachment's URL from its slot's `slot_generated_image_v1`, then write to `asset_attachment` via attachment-copy (the writeback path validated in Path B).

**Non-actions:**

- no schema changes
- no other field changes (only `asset_attachment` populated)
- no row creation or deletion
- no `governed_output_status` changes
- no other tables touched
- the Path A HERO row (`recNTHjyhXwDZJlMf`) and the three Path B rows already have `asset_attachment` populated — not retouched

**Terminal stop:** all rows that can be backfilled are backfilled; rows that cannot are documented honestly.

## Execution Record

**Pre-fetch revealed:** the PKT-SKU-007 slots (`SLOT-PKT-SKU-007-HERO`, `SLOT-PKT-SKU-007-DETAIL`, `SLOT-PKT-SKU-007-PROFILE`) have empty `slot_generated_image_v1` fields. The original source attachments referenced by the PKT-SKU-007 governed-asset rows (`att0lOda5z2lEXR6m`, `attlBw4Dy4BiXm7sE`) are no longer reachable through the slot.

The PKT-SKU-009 slots all have intact `slot_generated_image_v1` attachments including the source attachments for the prior governed-asset rows.

**Backfill executed on the 9 PKT-SKU-009 rows in a single batched call.** All succeeded. Each row's `asset_attachment` now carries a copy of the source attachment with a new attachment id distinct from the source — confirming Airtable ingested and copied the attachment for each row independently.

| Row | Source attachment id | New `asset_attachment` id |
|---|---|---|
| `recSS08Vhnw5RuuUc` | `attHhekFb8MWgcIFg` | `attAEKheNRYYB1Tf5` |
| `recAGC8vFHTjvD5fH` | `attHhekFb8MWgcIFg` | `attVthtBplJ1RVarU` |
| `rec5IfLrRxQilTpDt` | `att7ZYkBhsCbDIGzj` | `att2StTk72rXdyJ8G` |
| `recvyDFRJ13acUhFA` | `attP5XhJ5un2heqNW` | `att0K5v3fuhBzWJdZ` |
| `recfFqzRz2sJzNpyP` | `attHhekFb8MWgcIFg` | `attUmG55aNMStNTD5` |
| `rec7wPVVsGW7v0DOm` | `att7ZYkBhsCbDIGzj` | `attpteuok6OR82jzZ` |
| `recTNmexj6IscCguj` | `attP5XhJ5un2heqNW` | `attqJS1j0g5V2BN2N` |
| `recIfwRXLkLipYNkM` | `attZ8URYSdBWBt2fF` | `att8ysNaa9DMXHt19` |
| `reca3b1iPG9Mcb8r9` | `attP5XhJ5un2heqNW` | `attTzHDgw8sOGRTtH` |

**The 2 PKT-SKU-007 rows were not backfilled** because the source attachments are no longer present on the slot. The rows retain `source_attachment_id` as text — the historical record of what was once selected — but the assets themselves cannot be recovered through this path.

## Findings

### 1. Backfill of recoverable rows: Supported

The 9 PKT-SKU-009 rows backfilled cleanly via the attachment-copy writeback path validated in Path B. Each row now carries its own independent attachment copy. Where multiple rows reference the same source attachment (HERO `attHhekFb8MWgcIFg` is referenced by 3 rows; DETAIL `attP5XhJ5un2heqNW` is referenced by 3 rows; PROFILE `att7ZYkBhsCbDIGzj` is referenced by 2 rows), each row got its own distinct copy. Storage cost is real but predictable.

### 2. The milestone-5 thin-bridge had a real architectural cost — not just inconvenience

The 2 PKT-SKU-007 rows surface this finding cleanly. Originally created during Gate 6 packet-level work, they were text-references only (`source_attachment_id` carried the attachment id; no copy on the row). At some point after their creation, the source attachments were removed from the slot's `slot_generated_image_v1` — for reasons not captured in current evidence (cleanup, regeneration, accidental deletion).

**The result: the assets themselves are now structurally lost.** The rows retain provenance (we know what was selected, when, by whom, via which curation pattern) but the actual chosen images cannot be recovered through any path the architecture exposes. The `asset_attachment` field, had it existed at row-creation time, would have copied the attachments and preserved them independently of the slot's mutability.

This is the cost of carrying the thin-bridge state for too long. The architecture's intent (per #146 and #150 framing) was always for `generated_assets` rows to be self-contained. The text-reference-only workaround worked operationally but left the asset's existence dependent on slot stability — a dependency the architecture should not have.

### 3. Schema design implication: copy-on-curation is load-bearing

The Path B and asset_attachment-on-creation pattern (used in Path B's three rows and now backfilled to all PKT-SKU-009 rows) means: **the curation event creates an independent copy of the chosen attachment that survives any subsequent slot mutation.** This is what self-contained governed assets require.

Going forward, every new curation event should populate `asset_attachment` from the start (as Path B did). Rows created without it will face the same risk PKT-SKU-007 surfaced.

### 4. PKT-SKU-007 rows: documenting the loss honestly

The two PKT-SKU-007 rows are not deleted. Their text-reference provenance remains queryable (asset_key, source_attachment_id, capture_reason, capture_notes, curation_pattern, curator). What's lost is the actual asset image. This is recorded honestly rather than papered over: the `asset_attachment` field stays empty for these rows, and queries for "rows with no recoverable asset" can identify them via `asset_attachment IS EMPTY AND source_attachment_id IS NOT EMPTY`.

If the source attachments are ever recovered (e.g., from backups or by re-running the original Gate 6 work), the rows can be backfilled later. Until then, they stand as a documented architectural lesson.

### 5. State across all 13 rows after this backfill

| Subset | Count | `asset_attachment` state |
|---|---|---|
| PKT-SKU-010 Path B rows | 3 | populated on creation |
| PKT-SKU-009 Path A HERO row | 1 | populated as Path B validation test |
| PKT-SKU-009 prior rows (milestone-5 + agentic-metadata + agentic-vision + Path A PROFILE/DETAIL) | 9 | populated by this backfill |
| PKT-SKU-007 rows | 2 | empty — sources no longer on slot |
| **Total governed-asset rows** | **15** | **13 with asset_attachment, 2 documented as unrecoverable** |

The thin-bridge limitation is now fully resolved for all rows where resolution is possible. Where it isn't, the limitation is documented as a closed architectural lesson.

## Structured Change Summary

**Why this change exists.** Path B introduced `asset_attachment` and populated it on Path B's three new rows plus Path A's HERO row as a validation test. The remaining 11 prior governed-asset rows needed backfill to bring the field's population to a consistent state. The backfill was deliberately deferred from Path B's PR for scope discipline.

**What changed.** 9 PKT-SKU-009 governed-asset rows had `asset_attachment` populated via attachment-copy. Each row received its own independent copy of the source attachment.

**What did not change.** Schema. Other field values. PKT-SKU-007 rows (deliberately not backfilled — source attachments no longer recoverable). PKT-SKU-010 rows (already had asset_attachment from creation). Path A HERO row (already had asset_attachment from Path B validation). Other tables and modes. AI field-agent configuration. AGENTS.md. Grounding note.

**What remains out of scope.**

- Recovery of PKT-SKU-007 source attachments from any backup or regeneration (separate operational decision)
- Deletion or restructuring of the PKT-SKU-007 rows (kept as documented lessons)
- `asset_uri` deprecation (still flagged as future direction)
- Cross-mode application
- Generation tuning

## Open Questions / Next Pressure Points

1. **Cross-mode application to a new base.** Now the only remaining v1 sweep direction.
2. **Whether to attempt PKT-SKU-007 source recovery.** If the original Gate 6 generation data exists in any backup, the rows could be backfilled. Operational decision; not architectural.
3. **Whether to add a `source_recoverable` flag or formula on `generated_assets`** to make the lost-source-attachment state queryable as a structured signal rather than via a compound query. Held; not earned by current pressure.
4. **Generation tuning to fix the May 3 warmth pattern** (still flagged from Path A and Path B).

## What This Note Does Not Do

- attempt PKT-SKU-007 recovery
- delete or restructure PKT-SKU-007 rows
- introduce new schema fields
- claim that text-reference-only is acceptable for new curation events going forward (it is not — every new event should populate `asset_attachment`)
- close the v1 sweep (cross-mode application remains)

## Anchor Documents

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): introduced `asset_attachment` and validated the writeback path
- [`docs/full-flow-evidence-synthesis-pkt-sku-009.md`](full-flow-evidence-synthesis-pkt-sku-009.md): Path C synthesis
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): Path A findings
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): the original four-field provenance schema move that asset_attachment extended
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): the milestone whose thin-bridge limitation this backfill resolves where possible and documents honestly where not
