# Gate 2 Image-Bearing Reference Path Probe Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a Gate 2 probe plan.

It is also a bounded schema mutation plan for the minimum Airtable structure needed to test image-bearing visual reference input.

It is not an execution record, findings note, Airtable mutation record, generation record, or production doctrine.

It does **not** execute Airtable mutation.
It does **not** execute schema mutation.
It does **not** authorize generation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize production-readiness claims.
It does **not** authorize cross-mode generalization.

It does not fold product-truth drift into Gate 2.

Each gate below requires separate explicit authorization before execution.

## Background

The URL-reference path did not behave as binding visual input across the C-test and B-test diagnostics in this Airtable AI field-agent surface.

C-test / reference-image specificity landed as Not supported.

B-test / instruction-canvas hierarchy landed as Not supported.

The adjacent model-sensitivity probe also landed as Not supported.

The Gate 2 structural decision chose the image-bearing reference path as the next bounded test.

The question now is whether an attachment / image-bearing reference input behaves differently from surfaced URL lookup.

This plan does not claim that URL references fail everywhere. The claim remains bounded to the tested SKU-driven Furniture v1 Airtable AI field-agent surface and the recorded diagnostics.

## Gate 2 Question

Question:

- Can an image-bearing reference path make the visual invariant behave as a binding input where URL lookup did not?

The test should evaluate:

- background / studio-world fidelity
- floor / wall plane
- cove transition
- lighting direction
- shadow behavior
- preservation of slot role
- preservation of product truth

## Minimum Airtable Structure

Target base:

- `asset-pipeline-ASK // SKU-Driven Furniture v1`
- `appoqJ25B6w4vSuX9`

Target tables:

- `reference_assets`
- `workflow_packets`
- `output_slots`

Minimum proposed schema change:

- add one attachment field to `reference_assets`, likely named `reference_image`

Purpose:

- image-bearing visual invariant input for Gate 2 only

Structural limits:

- do not create new tables
- do not alter `generated_assets`
- do not alter `slot_status`

Expected surfacing path:

1. `reference_assets.reference_image`
2. linked through `workflow_packets.approved_reference_keys`
3. surfaced to `output_slots` through a lookup field, likely `packet_reference_image_lookup`

Important connector limitation:

- ChatGPT can create normal attachment fields.
- ChatGPT may not be able to create lookup fields through the connector.
- Airtable UI may be required for the lookup field and AI field-agent configuration.
- A normal attachment field is storage; it does not prove the AI field-agent can use it.
- Field-agent configuration and generation remain separate states.

Known baseline:

- `output_slots.product_image_lookup_lookup` already proves that the Airtable AI field-agent can accept an attachment lookup as an input.
- Gate 2 is not testing whether attachment lookups are possible in general.
- Gate 2 is testing whether a second image-bearing lookup, sourced from `reference_assets` rather than products, can function as a distinct visual-reference input.

Unknowns:

- whether a second attachment lookup sourced from `reference_assets.reference_image`, surfaced through `workflow_packets.approved_reference_keys` to `output_slots.packet_reference_image_lookup`, can be selected and used alongside `product_image_lookup_lookup`
- whether the field-agent treats that second image-bearing lookup as a distinct visual reference rather than another product / source image
- whether the UI exposes the new lookup once created

## Proposed Execution Gates

These gates are planned stop points only.

They do not execute anything by being listed here.

### Gate 2.1 // Create Storage Only

If later separately authorized:

- create `reference_assets.reference_image` attachment field
- stop

Terminal state:

- `reference image storage exists only`

### Gate 2.2 // Populate Image Reference

If later separately authorized:

- attach `REF-PKT-SKU-009-VISUAL-INVARIANT-002` image to `REF-PKT-SKU-009-VISUAL-INVARIANT-002.reference_image`
- stop

Terminal state:

- `image-bearing reference populated only`

### Gate 2.3 // Surface Attachment Lookup To `output_slots`

If later separately authorized:

- create lookup from `output_slots` through `workflow_packets.approved_reference_keys` to `reference_assets.reference_image`
- use proposed field name `packet_reference_image_lookup`
- expect this likely requires manual Airtable UI
- stop after lookup creation / observation

Pre-registered Gate 2.3 structural outcomes:

1. Second image lookup creatable and visible in `slot_generated_image_v1` field-agent picker:
   - continue to Gate 2.4.

2. Second image lookup creatable but not offered in the picker:
   - stop.
   - classify as `Second-lookup-not-offered`.
   - Gate 2 terminates before generation because the Airtable AI field-agent surface does not expose the second image-bearing reference input.

3. Lookup not creatable through available UI / connector path:
   - stop.
   - classify as `Reference-surface-blocked`.

Terminal state:

- `image-bearing reference surfaced to slots only`
- or `Second-lookup-not-offered`
- or `Reference-surface-blocked`

### Gate 2.4 // Configure Field-Agent

If later separately authorized:

- update `output_slots.slot_generated_image_v1` AI field-agent configuration to include:
  - `slot_prompt`
  - `packet_reference_image_lookup`
  - `product_image_lookup_lookup`
- do not include the old URL lookup for this test unless explicitly justified
- stop

Rationale:

- excluding the URL lookup isolates whether the image-bearing attachment path changes behavior
- keeping both URL and attachment inputs would make attribution ambiguous

Suggested instruction hierarchy:

- `slot_prompt` = role / task
- `packet_reference_image_lookup` = studio-world visual reference
- `product_image_lookup_lookup` = product identity / object truth

Terminal state:

- `field-agent configured only`

### Gate 2.5 // One Generation Pass

If later separately authorized:

- run one manual generation pass on:
  - `SLOT-PKT-SKU-009-HERO`
  - `SLOT-PKT-SKU-009-PROFILE`
  - `SLOT-PKT-SKU-009-DETAIL`
- stop

Terminal state:

- `generation invoked only`

### Gate 2.6 // Visual Review

Require side-by-side comparison before classification.

Surface in the control-surface thread:

- Gate 2.5 outputs
- `PKT-SKU-009` retry outputs / URL-reference baseline
- `PKT-SKU-009` B-test instruction-canvas outputs
- `REF-PKT-SKU-009-VISUAL-INVARIANT-002`
- `SKU-CHAIR-004` product image

Classify only after direct visual comparison.

Do not create `generated_assets`.

Do not mutate `slot_status`.

## Test Packet

Use:

- `PKT-SKU-009`
- `SKU-CHAIR-004`
- existing HERO / PROFILE / DETAIL slots

Rationale:

- it is the packet where URL-reference failure was observed
- it has the cleanest comparison baseline
- do not use `SKU-CHAIR-005` for the Gate 2 diagnostic

## Pre-Registered Outcome Classes

Supported:

- image-bearing reference materially improves studio-world binding to `REF-PKT-SKU-009-VISUAL-INVARIANT-002` while preserving role separation and product truth

Partial:

- image-bearing reference improves some visual-system properties, but visible drift remains or product-truth drift worsens

Not supported:

- image-bearing reference does not materially improve binding over the URL-reference / B-test baseline

Second-lookup-not-offered:

- Airtable already supports the product-truth attachment lookup, but the new reference-image lookup is not offered to the field-agent picker as a selectable input
- stop before generation

Reference-surface-blocked:

- the image-bearing lookup / surface cannot be created through the available Airtable UI / connector path

Inconclusive:

- attachment path cannot be configured cleanly, field-agent behavior cannot be observed, or outputs are too noisy to attribute

## Post-Gate-2 Decision Expectations

If Supported:

- write findings note
- image-bearing reference path becomes the leading candidate for SKU-driven Furniture v1 visual-reference architecture
- still avoid cross-mode generalization

If Partial:

- write findings note
- follow with bounded structural decision: accept attachment path as partial improvement, refine, pause, or pursue another discriminator

If Not supported:

- write findings note
- Pause becomes the active candidate for the visual-reference binding chain
- D-probe remains orthogonal

If Second-lookup-not-offered or Reference-surface-blocked:

- write findings note
- classify the Airtable AI field-agent surface as structurally blocked for this reference path
- choose whether to pause or consider non-Airtable surfaces later

If Inconclusive:

- write findings note only if the ambiguity is durable
- otherwise propose a narrower discriminator

## Non-Actions

This plan does not authorize:

- execution without separate authorization
- Airtable mutation
- schema mutation
- field creation
- lookup creation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- D-probe execution
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine
