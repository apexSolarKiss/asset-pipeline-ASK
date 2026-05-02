# Milestone 6 // Curation Event First-Class Plateau

This note records the plateau where the curation event reached first-class structural status across the layered-input model and was populated with first-class provenance on the SKU-driven Furniture v1 base. It builds on the milestone 5 thin-bridge plateau by discharging the deferred provenance gap that milestone 5 explicitly named.

## What This Milestone Established

**Workflow:**

- Airtable Mutation Discipline replaces per-action ASK authorization, anchored on plan-before-execute and structured change summary; project grounding note bumped to reflect the same.

**Architecture:**

- Cross-mode layered-input model attempted against all four worked-example modes, with v1 → v3 evolution recorded as method.
- v3 finding: at the packet level, curation is uniform across all four modes — per-slot curation plus review-shaped coherence verification. Selection-from-selections recursion belongs at higher organizational levels not currently in scope.
- Layer 2 reframed as the *fidelity-bearing layer* (anchor plus rules); anchor can be unitary or composite, with named composition kinds per mode.
- Aesthetic representation varies on two axes: per-layer and per-mode.
- Bounded-discretion vocabulary is mode-shaped.
- Slot input plurality is a general pattern with mode-specific contents.

**Schema (SKU-driven Furniture v1 base):**

- Four provenance fields added to `generated_assets`: `capture_reason`, `captured_at`, `source_attachment_id`, `capture_notes`.
- `source_attachment_id` writeback verified Supported — text holding attachment id sidesteps the milestone 5 URL/attachment-typed blocker.

**Population (SKU-driven Furniture v1 base):**

- Three governed-asset records populated with first-class provenance across two work phases (Gate 2 thin bridge plus Gate 6 packet-level).
- `capture_reason` enum readiness evaluated: not yet ready; recommended to stay as text and revisit after a fresh organic curation event.
- Several inconsistencies in the v1 evidence chain recorded honestly: `PKT-SKU-008` absence of `generated_assets` rows, `review_artifact_flag` semantic differences across work phases, `asset_role` casing variation.

## What It Did Not Establish

- A fresh, non-historical curation event populating `capture_reason` with a 4th organic value.
- Resolution of the original `asset_uri` URL/attachment-typed writeback blocker — narrowed in scope, not solved.
- Backfill of all `generated_assets` rows in the SKU base — only `PKT-SKU-009` HERO and `PKT-SKU-007` DETAIL/PROFILE were populated.
- Promotion of `governed_output_status` from `candidate` to `governed_output` for any populated row.
- Standardization of `capture_reason` naming, or split into structured fields (`capture_gate`, `capture_context`, `capture_attempt_number`).
- Reconciliation of `review_artifact_flag` semantics across work phases.
- Cross-mode application of the schema move beyond the SKU-driven Furniture v1 base — no other mode bases exist.
- Curator identity as a first-class field.
- Rejected-candidates record (unchosen candidates from a curation event are not recorded as rejected).
- Production-readiness for any mode.
- Final layer ontology, final curation-depth taxonomy, or closed worked-example-mode taxonomy.

## What Remains Out Of Scope

- reopening any closed chain artifact
- retroactive mutation of historical documentary evidence (the curation-event row backfills modify live row data, not historical artifacts)
- cross-mode application without separate evidence
- production-readiness claims
- architecture rewrite
- formal reopen of capture-mechanics work — the trigger has been flagged in two findings notes; acting on it remains a separate decision

## Next Pressure Point

Whether a fresh organic curation event is now justified — to give `capture_reason` a 4th non-historical data point, test the full curation flow end-to-end, and weigh formally reopening capture-mechanics — or whether the plateau can hold while attention pivots to other thesis-relevant work such as cross-mode investigation outside the SKU base, external positioning, or the product-truth D-probe.

## Anchor Documents

- [`AGENTS.md`](../../AGENTS.md): Airtable Mutation Discipline section
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](../cross-mode-layered-input-model-and-curation-event-note.md): cross-mode v3 architecture sketch
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](../curation-event-schema-mutation-sku-driven-furniture-v1.md): schema mutation establishing the four provenance fields
- [`docs/curation-event-population-findings-pkt-sku-009.md`](../curation-event-population-findings-pkt-sku-009.md): first backfill, writeback verdict Supported
- [`docs/curation-event-population-findings-pkt-sku-007.md`](../curation-event-population-findings-pkt-sku-007.md): parallel backfill, cross-packet enum-readiness analysis
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestone-5-sku-driven-furniture-v1-prototype-plateau.md): prior plateau
