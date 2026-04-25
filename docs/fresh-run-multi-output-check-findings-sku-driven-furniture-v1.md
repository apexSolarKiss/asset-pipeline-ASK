# Fresh-Run Multi-Output Check Findings // SKU-Driven Furniture v1

## Purpose

This document records the bounded fresh-run multi-output check result for `PKT-SKU-007` in `asset-pipeline-ASK // SKU-Driven Furniture v1`.

It should be read as one bounded Airtable execution result only.

This findings note records a clean first-pass run on a fresh product and a fresh packet.

It was **not** a rerun of `PKT-SKU-003`.

It does **not** authorize structural adoption of attachment-backed input.
It does **not** start prototype buildout.
It does **not** add screenshots or image assets to the repo.

## Run Identity

The bounded fresh-run target was:

- packet: `PKT-SKU-007`
- product: `SKU-CHAIR-003`
- product name: `Placeholder Sculpted Upholstered Dining Chair`

The invocation surface was:

- Airtable-native

The image-generation field agent was:

- `live_generated_image_v1`

The model was:

- `gpt-image-1`

The Airtable write / capture surface for this run was:

- GPT Airtable connector
- user-observed Airtable UI

## Bounded Setup

The run used the corrected input path:

- `products.product_image`
- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`

The setup facts for this run were:

- `products.product_image` was manually populated for `SKU-CHAIR-003`
- `workflow_packets.product_image_lookup` was populated for `PKT-SKU-007`
- `workflow_packets.composed_prompt_output` was populated and asked for a 3-view output set
- `live_generated_image_v1` was empty before the run
- automatic generation was off
- the run was triggered only for `PKT-SKU-007`

The field-agent inputs for the run were:

- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`

## Airtable Setup And Capture Provenance

Airtable record truth was checked directly through the Airtable connector where possible.

Image-fidelity judgment and screenshot evidence remained outside the repo and were reviewed through the control-surface thread.

That distinction is load-bearing for this findings note:

- Airtable record state was verified through Airtable
- screenshot evidence and visual-quality judgment were not imported into repo artifacts

One setup provenance fact from earlier in the attachment-input chain also remains relevant here:

- `workflow_packets.product_image_lookup` had been created manually in Airtable UI earlier after connector-based setup was not used for that lookup-field schema step

That should be distinguished from ordinary linked-record handling:

- existing linked-record fields were usable through the connector
- the manually created lookup field is a schema/setup provenance fact only

This findings note should therefore **not** be read as proof that linked records are unsupported through the Airtable connector.

Some later Airtable connector mutations during `PKT-SKU-007` setup also required retry.

But the final `PKT-SKU-007` record state was verified through Airtable before the run.

This note does **not** widen those setup observations into permanent Airtable connector doctrine.

It also does **not** treat connector setup behavior as the reason generation produced only one output.

Setup provenance and generation behavior should remain distinct.

## Required Output Set

The required output set for this fresh-run check was:

- one front three-quarter hero view
- one profile / side supporting view
- one detail crop focused on construction or material character

## Observed Result

The actual Airtable result was:

- one generated image

The generated image corresponded most closely to:

- one profile / side supporting view

The expected front three-quarter hero view was missing.

The expected detail crop was missing.

No screenshots or image files are being added to the repo.

Evidence for the observed result was reviewed through Airtable UI and the control-surface process only.

## Interpretation

Product-image conditioning appears to have worked at the single-image level.

The fresh-run capture was clean in the narrow sense that this was not a rerun / append case.

But output-set completeness failed because the field produced only 1 of the 3 required views.

That result suggests fresh-run multi-output generation is not satisfied by the current single image field-agent container.

This should **not** be overclaimed as generalized failure of attachment-backed input.

It also should **not** be overcorrected into reinforcement.

The narrow honest reading is:

- the product-image anchor appears usable
- the first-pass capture surface was clean
- the required multi-output set was still not produced

## Outcome Class

Recommended outcome class:

- `fresh-run counter-pressure`

Why `fresh-run counter-pressure` is the smallest honest reading:

- the run is interpretable
- it was a clean first-pass fresh packet
- the product-image anchor appears usable
- the generated output did not satisfy the required 3-view output set
- the result creates pressure around output-container design for multi-output SKU packets

This result therefore differs from the later-credit-confounded `PKT-SKU-003` robustness check.

It is a readable fresh-run result, but it is still counter-pressure because completeness failed inside a clean first-pass packet.

## Structural Pressure

The emerging pressure from this result is stronger than a choice among implementation mechanisms.

Multi-output burden may need first-class output-slot representation.

Each expected asset may need to be:

- separately addressable before generation
- separately evaluable after generation

The next design question raised by this result is therefore:

- whether multi-output SKU packets should be represented through separate output fields, separate packet-local runs, separate generation containers, an output-slot table / output-slot layer, or another explicit output-set orchestration pattern

This findings note does **not** decide that question.
It preserves the pressure as structural pressure only.

## What This Does And Does Not Mean

This result does **not** prove that attachment-backed input should be adopted structurally.

It also does **not** prove that attachment-backed input fails generally.

It does show a narrower and cleaner pressure than the confounded rerun case:

- single-image product anchoring appears workable
- clean first-pass capture was possible
- the current container did not satisfy the required 3-view output set

That is pressure on multi-output generation / capture design, not settled doctrine on attachment-backed input in general.

## Explicitly Out Of Scope

This note does not authorize:

- rerunning `PKT-SKU-007`
- rerunning `PKT-SKU-003`
- adding screenshots or image assets to the repo
- switching Airtable attachment format from Files to Versions
- adopting product-image lookup structurally
- schema redesign
- full prototype buildout
- cross-mode testing
- generalized attachment-input doctrine
- broad Airtable connector limitations doctrine

## Next Honest Move

The next honest move is:

1. preserve this findings note first
2. if continued work is desired, make a narrow options note about multi-output generation / capture design the next repo artifact
3. keep the `PKT-SKU-003` credit-reset diagnostic separate from this clean fresh-run finding

The breadcrumb for that separation is:

- `PKT-SKU-003` remains a separate diagnostic question about whether prior incompleteness was caused by credit exhaustion
- `PKT-SKU-003` is still append-contaminated because its generated-image field already contains accumulated outputs
- `PKT-SKU-007` provides cleaner evidence for the main question because it was a fresh product, fresh packet, and clean first-pass run
- `PKT-SKU-003` therefore does not need to be rerun before opening the multi-output generation / capture design options note

`PKT-SKU-003` may still be rerun later as a separate credit-reset diagnostic if needed.
