# URL Reference Visual Anchor Schema-Fit Findings // SKU-Driven Furniture v1

## Artifact Posture

This is a lean schema-fit findings note.

It records the observed result of the D1 URL-reference input feasibility inspection.

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

PR #120 split visual invariant anchoring into D1 external visual references and D2 generated visual invariant anchors.

PR #123 recorded that the D2 image-bearing no-mutation path was Reference-surface blocked.

Before deciding whether multi-image / visual-reference input should become first-class enough to justify schema mutation, ASK checked the remaining cheap no-mutation path:

- whether a URL-based reference could be selected as an AI field-agent input

This note preserves that result without opening a fresh options arc.

## Observation Summary

Target field-agent surface:

- `output_slots.slot_generated_image_v1`

Observation method:

- manual Airtable UI inspection in the field-agent input picker

Candidate URL / reference paths:

- `workflow_packets.approved_reference_keys`
- `reference_assets.asset_uri`

Observed picker behavior:

- direct `output_slots` fields were offered
- `slot_prompt` was offered
- `product_image_lookup_lookup` was offered
- `slot_generated_image_v1` was offered
- `workflow_packets.approved_reference_keys` was not offered
- `reference_assets.asset_uri` was not offered

No field-agent configuration was saved.

No generation was invoked.

Terminal stop point:

- `url-reference-input schema-fit observed`

Outcome class:

- `Not supported`

URL / reference fields were not offered as acceptable inputs in the current `slot_generated_image_v1` field-agent input picker.

## Evidence Basis

Evidence came from manual Airtable UI screenshots surfaced in the control-surface thread.

Airtable connector inspection had already verified that `reference_assets.asset_uri` is a URL field and that `output_slots` lacks a second image-bearing input path.

The manual UI evidence is the basis for the field-agent input-picker claim.

No screenshots are committed to the repo.

## Outcome-Class Reconciliation

Because the compressed-recovery path skipped a separate probe-plan artifact, this findings note defines and reconciles the observation classes in one place:

- Supported: URL-based visual reference can be selected or used as an image / reference input.
- Not supported: URL / reference fields are not offered as acceptable inputs.
- Unclear / manual-only: UI behavior is ambiguous or inconclusive.

Observed result:

- `Not supported`

Reason:

- the candidate URL / reference paths were not offered by the Airtable AI field-agent input picker

## Interpretation

D1 via URL is blocked in the current Airtable field-agent input surface.

Together with the PR #123 D2 finding, the current no-mutation visual-reference paths are blocked:

- D2 image-bearing anchor path is blocked because no second image-bearing field / lookup exists.
- D1 URL-reference path is blocked because URL / reference paths are not offered as field-agent inputs.

The blocker is structural / configuration-surface fit, not image quality or generation quality.

This strengthens the basis for a bounded structural decision about whether multi-image / visual-reference input should become first-class enough to justify schema mutation.

It does not itself authorize schema mutation.

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

- no final D1 or D2 doctrine
- no proof that visual invariant anchors improve images
- no proof that Airtable cannot support visual references after schema mutation
- no decision that multi-image / visual-reference input should become first-class
- no decision on `reference_assets` as permanent home
- no `generated_assets` capture-boundary decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no cross-mode generalization

## Recommended Next Step

Do not open a fresh options arc by default.

The next repo artifact, if ASK chooses to continue, should be a bounded structural decision about whether multi-image / visual-reference input should become first-class enough to justify schema mutation.

If yes, the later schema mutation plan should focus on the minimum viable relational image-bearing reference path, not a brittle fixed `image_2` field by default.

If no, pause visual-reference input work and keep text-only higher-layer representation available.
