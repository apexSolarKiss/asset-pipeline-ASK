# Capture Mechanics Thin-Bridge Findings // PKT-SKU-009

## Artifact Posture

This is a findings note.

It records the first bounded capture-mechanics thin-bridge proof for `PKT-SKU-009`.

It is not a plan.

It is not a structural decision note.

It is not an execution record for generation.

It is not an Airtable mutation authorization.

It is not a schema mutation plan.

It is not production doctrine.

It is not cross-mode generalization.

It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize schema changes.
It does **not** authorize generation invocation.
It does **not** authorize a product-truth D-probe.

## Context

Capture / governance mechanics was chosen as the next primary repo chain after the Gate 2 image-bearing reference path landed as Supported.

`docs/capture-mechanics-plan-sku-driven-furniture-v1.md` defined the operational bridge:

```text
raw slot output -> review / capture action -> generated_assets record -> slot_status relationship
```

That plan pre-registered outcome classes:

- Supported
- Partial
- Blocked
- Not supported

This findings note records the first bounded thin-bridge proof for `PKT-SKU-009`.

## Manual / Connector Execution Context

Throughout the visual-reference chain, lookup field creation and AI field-agent configuration required manual Airtable UI by ASK.

The Airtable connector exposes attachment field creation and record mutation, but not lookup creation or field-agent configuration.

This was true for `packet_reference_asset_uri_lookup` in the URL path and `packet_reference_image_lookup` in the Gate 2 attachment path alike.

The thin-bridge proof itself was executed through the Airtable connector for record creation and bounded text update, but it depended on previously manual UI-created lookup and field-agent surfaces.

## Live Airtable State Inspected Before Mutation

Live schema / state inspection found that `output_slots` had:

- `slot_generated_image_v1`
- `slot_prompt`
- `packet_key`
- `generated_assets`
- `slot_status`
- `slot_evaluation_notes`
- `product_image_lookup_lookup`
- `packet_reference_image_lookup`

Live schema / state inspection found that `generated_assets` had:

- `asset_key`
- `packet_key`
- `output_slot`
- `asset_role`
- `asset_uri`
- `governed_output_status`
- `review_artifact_flag`

`PKT-SKU-009` existed and linked to:

- `SKU-CHAIR-004`
- `REF-PKT-SKU-009-VISUAL-INVARIANT-002`
- HERO / PROFILE / DETAIL slots

`SLOT-PKT-SKU-009-HERO` had multiple raw attachments in `slot_generated_image_v1`.

The selected source attachment for the proof was:

- attachment id: `attHhekFb8MWgcIFg`
- filename: `Image_May_1_2026_3_11_AM.jpeg`

## Authorized Airtable Mutation Performed

Exactly one `generated_assets` record was created.

Created record:

- record ID: `recSS08Vhnw5RuuUc`
- `asset_key`: `ASSET-PKT-SKU-009-GATE2-HERO-ATTEMPT1-attHhekFb8MWgcIFg`
- `packet_key`: `PKT-SKU-009` / `recMSvNkWSmYRCDiT`
- `output_slot`: `SLOT-PKT-SKU-009-HERO` / `recIqKWAFbndoyi4j`
- `asset_role`: `HERO`
- `governed_output_status`: `candidate`
- `review_artifact_flag`: `true`
- `asset_uri`: blank

No PROFILE capture was performed.

No DETAIL capture was performed.

No additional `generated_assets` record was created.

## Bounded Text Update Performed

`SLOT-PKT-SKU-009-HERO.slot_evaluation_notes` was updated to document:

- the capture event
- source attachment `attHhekFb8MWgcIFg`
- `asset_uri` intentionally left blank
- raw Airtable attachment URL writes are blocked at the connector safety layer
- this recurs the PR #106 tooling limitation
- provenance is carried by the embedded attachment ID in `asset_key`
- the full attachment remains recoverable from source slot `slot_generated_image_v1`

This was a bounded text update to preserve evidence interpretation.

It did not mutate `slot_status`.

## Outcome-Class Reconciliation

### Bridge Identity Sub-Result

Bridge identity sub-result:

- Supported

The following bridge identity fields were created successfully:

- packet link
- output-slot link
- `asset_key`
- `asset_role`
- `governed_output_status`
- `review_artifact_flag`

### `asset_uri` Sub-Result

`asset_uri` sub-result:

- Blocked at tool layer

The raw Airtable attachment URL write was rejected by the connector / safety layer before reaching Airtable.

### Overall Result

Overall result:

- Partial with specific tool-layer blocker

This is more precise than treating the entire probe as Supported, because the `asset_uri` capture surface did not succeed.

It is also more precise than treating the entire probe as Blocked, because the identity bridge did succeed and a bounded `generated_assets` record was created with packet, slot, role, status, and review-artifact state.

## PR #106 Recurrence

This is not a novel blocker.

Earlier generated-assets work around PR #106 also encountered raw Airtable attachment URL write blocking.

The recurrence matters because it shows `asset_uri` as a structurally weak capture surface for raw Airtable attachments when using the connector.

Do not retroactively edit older PR #106 artifacts or records.

This note carries the forward interpretation.

## Evidence / Thinness Observations

The current schema can express minimal governed asset identity.

The current schema does not cleanly carry:

- capture reason
- capture timestamp / event marker
- evidence rationale
- prompt reference
- source attachment ID as a first-class field
- captured attachment as an attachment field on `generated_assets`

Some context remains inferable through linked packet / slot records, but inference is weaker than explicit provenance.

`asset_key` is doing extra provenance work by embedding the source attachment ID.

`asset_uri` remaining blank should not be read as "no source URL exists."

It means the URL could not be written through the connector path.

## Non-Actions Preserved

This findings note preserves these non-actions:

- no `slot_status` mutation
- no schema mutation
- no generation invocation
- no PROFILE capture
- no DETAIL capture
- no additional `generated_assets` creation
- no output-slot status normalization
- no retroactive `PKT-SKU-007` or `PKT-SKU-008` mutation
- no production-readiness claim
- no cross-mode generalization
- no grounding-note refresh

## What This Earns Next

The thin-bridge proof earns a bounded next decision / options surface.

It does not earn immediate schema mutation.

Candidate next paths:

- accept and document the thin bridge for now
- schema mutation options for fuller provenance, such as adding `capture_reason`, `capture_notes`, `source_attachment_id`, `capture_event_marker`, or a `generated_assets` attachment field
- manual UI workaround for `asset_uri` if URL capture is still needed
- alternate capture mechanism outside the connector if durable asset URI becomes load-bearing
- pause capture mechanics until a real review / governance need requires fuller provenance

## Conclusion

The first `PKT-SKU-009` capture-mechanics thin-bridge proof landed as:

- Partial with specific tool-layer blocker

The bridge identity layer held.

The `asset_uri` write failed at the connector / safety layer.

The current Airtable shape is sufficient for thin governed asset identity, but weak for explicit capture provenance.

No additional work is authorized by this findings note.
