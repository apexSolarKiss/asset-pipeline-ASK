# Visual-Reference Input Schema Mutation Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a bounded schema mutation plan.

It defines a staged mutation and observation sequence for surfacing visual-reference input to the `output_slots` generation surface.

It is not an execution record, findings note, decision note, Airtable mutation record, generation plan, capture-mechanics decision, or architecture rewrite.

It does **not** authorize Airtable mutation.
It does **not** authorize schema mutation execution.
It does **not** authorize field creation or deletion.
It does **not** authorize lookup creation.
It does **not** authorize AI field-agent configuration.
It does **not** authorize generation invocation.
It does **not** authorize `generated_assets` creation or linking.
It does **not** authorize output-slot linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize generated image capture.

This plan is bounded to SKU-driven Furniture v1 evidence.

## Why This Exists

PR #125 judged multi-image / visual-reference input first-class enough to justify schema mutation planning.

However, the D1 URL-reference finding only proved that unsurfaced URL / reference paths were not visible to the `output_slots.slot_generated_image_v1` picker.

It did not prove that a URL lookup surfaced directly onto `output_slots` would fail.

Therefore the cheapest next mutation should test a surfaced URL lookup before adding heavier image-bearing attachment structure.

## Current Structural Facts

- `reference_assets.asset_uri` exists and is URL-typed.
- `workflow_packets.approved_reference_keys` links workflow packets to `reference_assets`.
- `output_slots.packet_key` links output slots to workflow packets.
- `output_slots.product_image_lookup_lookup` carries the existing product-truth image lookup.
- `output_slots` has no current visual-reference URL or image field.
- Airtable connector cannot create lookup fields.
- Airtable connector cannot configure AI field-agent behavior.
- Airtable AI field-agent picker behavior requires manual UI inspection.

## Plan Overview

This plan is staged:

- Gate 1 // surfaced URL lookup path
- Gate 2 // image-bearing reference path, conditional only if Gate 1 fails or is insufficient

Gate 1 must run before Gate 2.

Gate 2 is not authorized by Gate 1.

Each gate requires separate per-action authorization before execution.

This plan itself does not execute either gate.

## Gate 1 // Surface Existing Reference URL To Output Slots

Goal:

- expose existing `reference_assets.asset_uri` values onto `output_slots` through an explicit lookup path that the `slot_generated_image_v1` field-agent picker can inspect

Preferred mechanism:

- use the existing packet association path:
  - `output_slots.packet_key`
  - `workflow_packets.approved_reference_keys`
  - `reference_assets.asset_uri`

Planned field mechanism:

1. If not already present, create a lookup field on `workflow_packets` that surfaces `approved_reference_keys -> asset_uri`.
2. Create a lookup field on `output_slots` through `packet_key` that surfaces the workflow-packet-level reference URI lookup.
3. Name fields descriptively but treat exact field names as implementation-plan details to be confirmed before mutation.

This mechanism is preferred because:

- it preserves packet association
- it avoids direct slot-to-reference linking before slot-level reference governance is earned
- it tests the cheapest existing URL-based reference path before adding image-bearing structure

Terminal stop point for Gate 1:

- `surfaced URL lookup field created and picker visibility observed`

## Gate 1 // Expected Observations

Pre-registered outcome classes:

- Supported: picker offers the surfaced URL lookup field and accepts it as an image / reference input.
- Not supported / URL-not-image-format: picker offers the field but rejects or cannot use URL content as image-bearing input.
- Lookup-not-offered: picker does not show the surfaced lookup field at all.
- Unclear / manual-only: UI behavior is ambiguous or inconclusive.

`Lookup-not-offered` is especially load-bearing because it may indicate Airtable field-agent picker cannot use lookup-derived reference inputs from related tables.

If `Lookup-not-offered` occurs, do not automatically proceed to Gate 2. Pause and reassess whether Airtable-native visual-reference input is viable.

If `Supported` occurs, do not proceed to Gate 2 by default. A no-additional-image-field URL-reference path may be sufficient for the next live visual-reference test.

If `Not supported / URL-not-image-format` occurs, Gate 2 becomes more strongly earned.

## Gate 1 // Non-Actions

Gate 1 does not authorize:

- AI field-agent configuration beyond picker inspection
- generation invocation
- `generated_assets` creation
- `generated_assets` linking
- output-slot linking
- `slot_status` mutation
- generated image capture
- capture-mechanics decision
- permanent schema doctrine
- Gate 2 execution

## Gate 2 // Conditional Image-Bearing Reference Path

Gate 2 is conditional. It should only be considered if Gate 1 fails, is insufficient, or proves that URL lookup is not acceptable as image / reference input.

Possible Gate 2 direction:

- make `reference_assets` image-bearing with an attachment field
- surface eligible image-bearing references onto `output_slots` through an explicit field / lookup path
- inspect whether the field-agent picker offers that surfaced image-bearing path

Gate 2 is not authorized by this plan.

Gate 2 requires separate planning or at minimum separate per-action authorization after Gate 1 result is known.

Do not create brittle fixed fields such as `image_2` by default.

## What This Plan Does Not Authorize

- no Airtable mutation
- no schema mutation execution
- no field creation
- no field deletion
- no lookup creation
- no AI field-agent configuration
- no generation invocation
- no full HERO / PROFILE / DETAIL generation pass
- no `generated_assets` creation
- no `generated_assets` linking
- no output-slot linking
- no `slot_status` mutation
- no generated image capture
- no capture-mechanics decision
- no architecture rewrite
- no milestone update
- no `PKT-SKU-007` backfill

## What This Plan Does Not Establish

- no final schema doctrine
- no final D1 or D2 doctrine
- no proof that URL lookup fields will work
- no proof that visual invariant anchors improve images
- no decision on `reference_assets` as permanent home
- no `generated_assets` capture-boundary decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no cross-mode generalization
- no production-readiness claim

## Recommended Execution Sequence If Later Authorized

If later separately authorized:

1. Verify current Airtable schema.
2. Confirm exact field names and target tables.
3. Manually create the minimum Gate 1 lookup path in Airtable UI because connector cannot create lookup fields.
4. Inspect `output_slots.slot_generated_image_v1` field-agent picker.
5. Record outcome against Gate 1 outcome classes.
6. Stop.

Terminal stop point:

- `surfaced URL lookup field created and picker visibility observed`
