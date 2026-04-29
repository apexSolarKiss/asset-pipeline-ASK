# Generated Visual Invariant Anchor Schema-Fit Probe Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a schema-fit probe plan.

It is not a findings note, decision note, options note, schema implementation plan, Airtable mutation record, generation plan, or capture-mechanics decision.

It defines the exact proposed schema-fit observation path for the D2 next-probe direction chosen in PR #121.

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

The next load-bearing unknown is not whether D2 produces better images.

The next load-bearing unknown is whether Airtable AI field-agent generation can consume a second image input alongside the existing product-truth image.

This plan defines a bounded way to observe that schema-fit question before any schema hardening or full generation pass.

## Probe Objective

The probe tests whether current Airtable UI / field-agent configuration can accept a second image input for slot-level generation.

The probe does not test final image quality.

The probe does not test set coherence.

The probe does not generate a new HERO / PROFILE / DETAIL slot set.

Success is schema-fit only:

- the system can be configured or observed to accept product-truth image plus visual invariant anchor image as inputs to a slot-level AI generation field-agent

## Exact Anchor Image Source

The visual invariant anchor image should be created or selected manually outside this probe before Airtable schema-fit inspection.

For this schema-fit probe, the anchor source should be:

- one manually selected or generated environment / studio-world image supplied by ASK in the control-surface thread or Airtable UI

This probe assumes the visual invariant anchor is created externally or uploaded directly, not generated through an Airtable AI field-agent inside this probe.

The anchor should represent:

- shared studio world
- background / floor plane
- lighting behavior
- shadow behavior
- camera language
- overall family-world feel

The anchor should not be treated as:

- final slot output
- `generated_assets` capture object
- accepted production asset
- final doctrine for visual invariant structure

If no suitable anchor image is available at execution time, the probe should stop before Airtable mutation or configuration.

## Airtable Target Surface To Verify Before Use

Known base:

- `asset-pipeline-ASK // SKU-Driven Furniture v1`
- base id: `appoqJ25B6w4vSuX9`

Candidate temporary reference table:

- `reference_assets`

Required pre-use verification:

- verify `reference_assets` exists
- inspect its fields before using it
- identify whether it can store or point to an image reference
- identify whether it can link or otherwise associate the image with `PKT-SKU-008`
- identify whether the field shape can be surfaced to `output_slots` or field-agent configuration without schema mutation
- stop if the current shape is insufficient and schema mutation would be required

Candidate downstream surface:

- `output_slots`
- likely `PKT-SKU-008` slot-level generation surface
- specifically the existing `slot_generated_image_v1` AI image-generation field-agent surface, if manually inspectable in Airtable UI

Required pre-use verification:

- verify current `output_slots` field shape
- verify current product-truth image input path used by the slot-level generation field-agent
- verify whether any existing reference / lookup / attachment field can carry a visual invariant anchor without schema mutation

## Proposed Probe Sequence If Later Authorized

This is a proposed sequence only.

1. Verify Airtable base and table shape.
2. Verify `reference_assets` field shape.
3. Verify whether a visual invariant anchor image can be placed or represented in the current `reference_assets` shape without schema mutation.
4. Verify whether the visual invariant anchor can be associated with `PKT-SKU-008` without schema mutation.
5. Inspect Airtable UI / field-agent configuration path for `output_slots.slot_generated_image_v1`.
6. Observe whether the AI field-agent configuration can accept:
   - product-truth image input
   - visual invariant anchor image input
7. Stop.

Terminal stop point:

- `second-image-input schema-fit observed`

## Exact Connector / Manual UI Boundary

The Airtable connector may be able to inspect base, table, field, and record state.

The Airtable connector is not expected to configure Airtable AI field-agent behavior.

The Airtable connector is not expected to invoke generation.

The second-image-input acceptance check may require manual Airtable UI inspection by ASK.

The probe should record which observations came from:

- Airtable connector inspection
- manual Airtable UI inspection
- direct visual evidence in the control-surface thread

The probe should not fake or infer UI configuration support from record metadata alone.

## Expected Observations

Pre-registered outcome classes:

- Supported: Airtable field-agent configuration can consume a second image input alongside the product-truth image.
- Not supported: Airtable field-agent configuration cannot consume a second image input alongside the product-truth image.
- Unclear / manual-only: configuration path is unclear, connector cannot observe it, or manual UI behavior is required and inconclusive.
- Reference-surface blocked: `reference_assets` or current field shape is insufficient as a temporary reference surface without schema mutation.

## Non-Actions

This probe plan does not authorize:

- Airtable mutation
- schema mutation
- field creation
- field deletion
- lookup creation
- AI field-agent configuration
- anchor generation via Airtable AI field-agent at packet scope; if eventually pursued, that requires separate authorization
- generation invocation
- full HERO / PROFILE / DETAIL generation pass
- `generated_assets` creation
- `generated_assets` linking
- output-slot linking
- `slot_status` mutation
- generated image capture
- capture-mechanics decision
- architecture rewrite
- milestone update
- `PKT-SKU-007` backfill

## What This Probe Would Not Establish

- no final D2 doctrine
- no proof that visual invariant anchors improve images
- no set-coherence finding
- no production-readiness claim
- no decision on `reference_assets` as permanent home
- no `generated_assets` capture-boundary decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no cross-mode generalization

## Future Findings Requirement

If this probe is later executed, a findings note should reconcile the observed result against the expected observations above.

The findings note should distinguish:

- connector-observed state
- manual UI-observed configuration behavior
- direct visual evidence, if any

## Recommended Next Step After This Plan

If this plan lands and ASK chooses to proceed, the next action should be a separately authorized Airtable / manual UI schema-fit observation sequence.

That sequence should stop at:

- `second-image-input schema-fit observed`

No generation should occur during that observation sequence unless separately authorized after the schema-fit result is known.
