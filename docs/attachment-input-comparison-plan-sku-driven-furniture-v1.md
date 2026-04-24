# Attachment-Input Comparison Plan // SKU-Driven Furniture v1

## Purpose

This document defines one bounded follow-up comparison experiment for `asset-pipeline-ASK // SKU-Driven Furniture v1`.

Its purpose is to test one explicit next question earned by Run 1:

- whether attachment-backed product image input materially changes Airtable-native generation behavior

This is a comparison-plan artifact only.

It does **not** continue Run 1.
It does **not** authorize Airtable mutation, experiment execution, schema redesign, or broader runtime doctrine.

## Relationship To Run 1

Run 1 is already frozen as:

- a prompt-only Airtable-native invocation
- centered on `PKT-SKU-005`
- recorded in `docs/end-to-end-live-model-run-findings-sku-driven-furniture-v1.md`

This experiment should be read as a follow-up comparison against Run 1, not as a reinterpretation of Run 1 and not as permission to fold attachment-input behavior back into that earlier findings artifact.

## Bounded Comparison Packet

The attachment-input comparison packet should be pre-registered as:

- `workflow_packets / PKT-SKU-006`

This packet should remain anchored on:

- `SKU-CHAIR-002`

`PKT-SKU-006` exists only to isolate the attachment-input comparison burden cleanly from the already-frozen `PKT-SKU-005` result.

## Single-Variable Discipline

This experiment should hold the following elements constant relative to Run 1:

- same model: `gpt-image-1`
- same Airtable-native invocation container: `live_generated_image_v1`
- same Airtable write surface: `GPT Airtable connector`
- same prompt logic
- same normative packet burden

The only intended changed variable in this experiment should be:

- attachment-backed product image input

This comparison should not widen into a second variable test.

## Product Image Input Test

This experiment pre-registers one new attachment field in `workflow_packets`:

- `product_image`

Before any comparison execution is attempted, the experiment must first check one bounded setup question:

- can the existing Airtable-native invocation container `live_generated_image_v1` actually consume `workflow_packets.product_image` cleanly as input

That capability must **not** be assumed as already proven.

It must first be checked honestly in the Airtable UI.

If the existing container cannot consume the attachment input cleanly, execution must stop and record that result as:

- bounded setup failure for this experiment

That outcome should not be treated as permission to widen into new tooling surfaces, alternate invocation paths, or broader Airtable reconfiguration.

## Comparison Criteria

The side-by-side comparison against Run 1 should be pre-registered using the following narrow criteria:

- product-defining silhouette preservation: `better` / `equivalent` / `worse`
- finish/material accuracy: `better` / `equivalent` / `worse`
- identifying-detail preservation: `better` / `equivalent` / `worse`
- model-invented contradictory detail: `more` / `equivalent` / `fewer`

The overall comparison question should be:

- does the attachment-input result remain governable as `SKU-CHAIR-002` more cleanly than Run 1

These criteria should remain narrow and comparison-oriented rather than expanding into a generalized aesthetic review.

## Outcome Classes

This experiment carries forward the same three outcome classes already used in the live-run artifact chain:

- `findings-only`
- `spec-earned pressure`
- `insufficient evidence`

These outcome classes should not be widened or redefined in this experiment-plan note.

## Capture Note

Run 1 already established one specific asset-capture posture.

For this comparison experiment:

- any deviation from Run 1 asset-capture mechanics must be recorded explicitly
- no capture adaptation should occur silently

That applies especially if attachment-input handling changes:

- invocation behavior
- generated artifact shape
- stored artifact reference shape
- or later seam evidence shape

## Explicitly Out Of Scope

This experiment plan does **not** authorize:

- broad runtime doctrine
- schema redesign
- widening beyond one comparison experiment
- follow-up doctrine about Airtable-native generation as a whole
- multiple comparison packets
- broader Airtable AI-field expansion

It also does **not** authorize mutating `PKT-SKU-005`.

## Next Step

After this note is landed, the next honest move is:

1. prepare `PKT-SKU-006` as the attachment-input comparison packet anchored on `SKU-CHAIR-002`
2. check whether `live_generated_image_v1` can actually consume `workflow_packets.product_image` cleanly
3. stop immediately and record bounded setup failure if it cannot
4. if it can, execute one bounded comparison run against the pre-registered criteria above
