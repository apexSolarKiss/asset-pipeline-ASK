# Generated Visual Invariant Anchor Schema-Fit Findings // SKU-Driven Furniture v1

## Artifact Posture

This is a lean schema-fit findings note.

It records the observed result of the D2 schema-fit observation sequence after PR #122.

It is not an options note, decision note, probe plan, schema implementation plan, Airtable mutation plan, generation plan, or capture-mechanics decision.

It does **not** authorize Airtable mutation.
It does **not** authorize schema mutation.
It does **not** authorize field creation or deletion.
It does **not** authorize lookup creation.
It does **not** authorize AI field-agent configuration.
It does **not** authorize generation invocation.
It does **not** authorize `generated_assets` creation or linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize generated image capture.
It does **not** authorize full slot-set generation.

This note is bounded to SKU-driven Furniture v1 evidence.

## Why This Exists

PR #121 chose D2 // Generated Visual Invariant Anchor as the next probe direction only.

PR #122 defined the D2 schema-fit probe plan.

The live observation answered the cheapest structural feasibility question:

- can the current Airtable schema express the second-image-input test?

The answer was no.

This note preserves that durable blocker without opening a fresh options arc.

## Observation Summary

Terminal stop point reached:

- `second-image-input schema-fit observed`

Outcome class:

- `Reference-surface blocked`

Connector-observed schema facts:

- `reference_assets` exists.
- `reference_assets.asset_uri` is a URL field, not an attachment / image-bearing field.
- `reference_assets.workflow_packets` can associate references with packets.
- `output_slots` exists.
- `output_slots.product_image_lookup_lookup` is the existing product-truth image lookup path.
- `output_slots.slot_generated_image_v1` is the existing raw generated-image output field.
- `output_slots` has no second image-bearing lookup / input field for a visual invariant anchor.
- the connector cannot configure Airtable AI field-agent behavior and cannot prove second-image support without a field path.

## Outcome-Class Reconciliation

PR #122 pre-registered these outcome classes:

- Supported
- Not supported
- Unclear / manual-only
- Reference-surface blocked

Observed result:

- `Reference-surface blocked`

Reason:

- the current reference surface and output-slot field shape are insufficient as a temporary image-bearing reference surface without schema mutation

## Interpretation

The D2 architectural idea remains valid as a possible direction.

The no-mutation D2 schema-fit path is blocked by current schema shape.

The blocker is not an image-quality issue.

The blocker is not a generation-quality issue.

The blocker is structural:

- the system has no current slot / path to carry the second image input

This confirms that a real D2 test would require schema mutation or manual Airtable UI configuration beyond the current schema.

## Process Correction

This result should have been discovered by cheap schema inspection before the D2 probe-plan artifact was created.

For future Airtable schema-fit work, verify whether the current schema can express the proposed test before formalizing a probe plan.

Check possibility first, design second, document last.

Do not route an impossible schema-fit probe through a multi-artifact chain.

## What This Finding Does Not Authorize

- no Airtable mutation
- no schema mutation
- no field creation
- no field deletion
- no lookup creation
- no AI field-agent configuration
- no generation invocation
- no `generated_assets` creation
- no `generated_assets` linking
- no output-slot linking
- no `slot_status` mutation
- no generated image capture
- no capture-mechanics decision
- no architecture rewrite
- no milestone update
- no `PKT-SKU-007` backfill

## What This Finding Does Not Establish

- no final D2 doctrine
- no proof that visual invariant anchors improve images
- no proof that Airtable cannot support second image input after schema mutation
- no decision that multi-image input should become first-class
- no decision on `reference_assets` as permanent home
- no `generated_assets` capture-boundary decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no cross-mode generalization

## Recommended Next Step

Do not open a fresh options arc by default.

The next repo artifact, if ASK chooses to continue, should be a bounded structural decision about whether multi-image input should become first-class enough to justify schema mutation.

If yes, the later schema mutation plan should focus on the minimum viable relational image-bearing reference path, not a brittle fixed `image_2` field by default.

If no, pause D2 and keep text-only / D1 paths available.
