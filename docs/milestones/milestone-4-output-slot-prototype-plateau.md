# Milestone 4 Output-Slot Prototype Plateau

This note records the plateau where output slots became first-class expected output obligations in the bounded SKU-driven Furniture v1 prototype.

## What This Milestone Established

- fresh-run multi-output pressure made output-set completeness visible
- packet-level generation and post-hoc mapping exposed role-mapping pressure
- first-class `output_slots` became the chosen structural direction for SKU-driven Furniture v1 multi-output representation
- slot-level generation proved cleaner than packet-level generation for role-specific output production
- `generated_assets` promotion boundary was decided for SKU-driven Furniture v1
- `slot_status` lifecycle was decided for SKU-driven Furniture v1
- asset-family coherence / reuse / derivative pressure was surfaced and recorded but not resolved
- explicitly recorded that `generated_assets` capture mechanics from raw slot attachments remain unresolved

Anchor docs:

- [`docs/multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md`](../multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md)
- [`docs/airtable-slot-level-generation-schema-fit-note-sku-driven-furniture-v1.md`](../airtable-slot-level-generation-schema-fit-note-sku-driven-furniture-v1.md)
- [`docs/generated-assets-promotion-boundary-structural-decision-note-sku-driven-furniture-v1.md`](../generated-assets-promotion-boundary-structural-decision-note-sku-driven-furniture-v1.md)
- [`docs/output-slot-status-lifecycle-structural-decision-note-sku-driven-furniture-v1.md`](../output-slot-status-lifecycle-structural-decision-note-sku-driven-furniture-v1.md)
- [`docs/asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md`](../asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md)

## What It Did Not Establish

- final schema doctrine
- production readiness
- asset-family or asset-applications schema
- a chosen `generated_assets` capture mechanic
- cross-mode generalization

## What Remains Out Of Scope

- Airtable mutation from this milestone note
- generated asset creation
- slot-status updates
- asset-family / reuse / derivative implementation
- generalized output-slot doctrine across all modes

## Next Pressure Point

The next pressure after this plateau is deciding how to address packet-level set coherence, `generated_assets` capture mechanics, and possible asset-family / reuse / derivative representation without prematurely hardening schema.
