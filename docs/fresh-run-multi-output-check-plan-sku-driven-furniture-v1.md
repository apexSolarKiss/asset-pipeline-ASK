# Fresh-Run Multi-Output Check Plan // SKU-Driven Furniture v1

## Purpose

This document defines one bounded fresh-run multi-output check for `asset-pipeline-ASK // SKU-Driven Furniture v1`.

This plan follows the `PKT-SKU-003` robustness-check findings.

`PKT-SKU-003` produced counter-pressure because the rerun generated 2 new outputs instead of the expected 3 and appended rather than replaced prior outputs.

This plan is designed to isolate fresh-run multi-output behavior from rerun / append behavior.

This is not prototype buildout.
This is not cross-category expansion.
This is not structural adoption of attachment-backed input.

## Current Evidence Question

The bounded evidence question is:

- can Airtable-native attachment-backed generation produce a complete 3-view output set in a clean first-pass run, without rerun contamination?

This is a fresh-run check, not another reread of `PKT-SKU-003`.

## Run Shape

This check should remain inside:

- SKU-driven Furniture v1 only

The run should use:

- a fresh product
- a fresh packet
- preferably still the chair category

The required 3-view output set should be:

- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character

## Why This Shape Is The Narrowest Honest Check

Staying in the chair category keeps the test narrow.

Using a fresh product and fresh packet avoids rerun contamination.

A 3-view output set directly tests whether Airtable-native attachment-backed generation can produce a complete multi-output set in a clean first-pass run.

## Airtable Setup To Pre-Register

This check should pre-register the following Airtable setup:

- create a new product record, such as `SKU-CHAIR-003`
- add product-truth fields appropriate for a distinct chair
- add `products.product_image`
- create a new packet, such as `PKT-SKU-007`
- link it to `SKU-CHAIR-003`

The run should use the corrected input path:

- `products.product_image`
- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`

The run should use Airtable-native invocation through:

- `live_generated_image_v1`

This plan does **not** authorize running against an already-populated generated-image field for the packet.

## Evaluation Criteria

The bounded fresh-run reading should use the following criteria:

- output-set completeness:
  - did the run produce all 3 required views?
- cross-view product consistency:
  - do all generated views appear to describe the same product?
- product-truth fidelity:
  - does the generated set preserve the uploaded product-image anchor?
- finish/material fidelity
- detail-view usefulness
- contradictory invented detail
- capture-surface behavior:
  - did the field create a clean first-pass output set without append contamination?

These criteria should remain bounded to this one fresh-run check.

## Outcome Classes

This fresh-run check should use the following outcome classes.

### `insufficient evidence`

`insufficient evidence` applies if the run cannot be interpreted honestly.

Examples include:

- the output set is too incomplete or too confounded to compare cleanly
- the first-pass capture surface is too muddy to determine what actually happened
- the result cannot be tied clearly enough to the intended fresh packet and product

### `fresh-run counter-pressure`

`fresh-run counter-pressure` applies if a fresh attachment-backed run still fails output-set completeness or creates capture / governability problems.

This includes cases where:

- the required 3-view set is not produced
- the field surface still behaves in a way that undermines clean capture
- product-truth anchoring improves but output-set governability remains weak

### `bounded reinforcement of attachment-input viability`

`bounded reinforcement of attachment-input viability` applies if the fresh run produces a coherent 3-view set but still does not fire a reopen trigger from the current attachment-input decision note.

This would strengthen confidence that attachment-backed input may support clean multi-output SKU-mode generation, while still stopping short of reopening the hold decision.

### `trigger-fired pressure sufficient to reopen the hold decision`

`trigger-fired pressure sufficient to reopen the hold decision` applies only if the result clearly satisfies one of the trigger conditions from:

- `docs/attachment-input-decision-note-sku-driven-furniture-v1.md`

This is the only outcome class here that reopens the current hold decision.

## Trigger Alignment

This check remains aligned with the existing trigger standard from:

- `docs/attachment-input-decision-note-sku-driven-furniture-v1.md`

It does not invent a new threshold for reopening the hold decision.

## What This Run Would And Would Not Mean

If the fresh run produces a coherent 3-view set without capture contamination, that would matter because it isolates first-pass multi-output behavior more cleanly than the `PKT-SKU-003` rerun could.

It would still remain bounded:

- one workflow mode
- one category neighborhood
- one fresh product
- one fresh packet

This run would still not equal:

- broad prototype buildout
- structural adoption
- generalized doctrine

## Explicitly Out Of Scope

This plan does not authorize:

- broad prototype buildout
- sofas / tables / decor accessories
- cross-mode testing
- multi-category rollout
- generalized attachment-input doctrine
- schema redesign
- runtime/orchestration architecture
- rerunning `PKT-SKU-003`

## Next Step

After this note is landed, the next honest move is:

1. preserve this bounded fresh-run plan as repo-local truth
2. decide separately whether to execute the fresh product / fresh packet / 3-view check
3. if it is executed later, interpret the result only through the outcome classes defined here and the trigger standard already in force
