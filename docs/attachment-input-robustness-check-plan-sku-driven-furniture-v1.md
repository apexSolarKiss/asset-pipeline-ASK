# Attachment-Input Robustness-Check Plan // SKU-Driven Furniture v1

## Purpose

This document defines one bounded robustness check for the attachment-input question in `asset-pipeline-ASK // SKU-Driven Furniture v1`.

The attachment-input question is currently at hold.

This note reopens that question narrowly for one bounded robustness check only.

Its purpose is not implementation or doctrine.

Its purpose is to test whether the attachment-backed improvement appears to reproduce under higher SKU-mode burden density.

This robustness-check evidence is relevant to a later prototype-buildout decision, but it is not itself part of that prototype-buildout phase.

This note does **not** pre-justify a future show-don't-tell prototype direction.
It defines only the bounded evidence question now being asked.

## Relationship To The Current Hold Decision

The current attachment-input decision is:

- hold

That hold remains in force unless this bounded robustness check produces pressure strong enough to satisfy the trigger standard already defined in:

- `docs/attachment-input-decision-note-sku-driven-furniture-v1.md`

This note therefore does not replace the hold decision.

It defines one bounded way to test whether the held pressure becomes stronger under denser SKU-mode burden.

## Current Evidence Question

The current evidence question is narrow:

- does the attachment-backed improvement observed in `PKT-SKU-006` appear to reproduce when the SKU-mode burden becomes denser?

This is not a strict reproduction of `PKT-SKU-006`.

It is a robustness / stress check under denser SKU-mode burden.

## Run Target

The bounded robustness-check packet should be:

- `PKT-SKU-003`

This run remains anchored inside SKU-driven Furniture v1.

## Run Setup

The robustness check should use the same corrected input path already established in the attachment-input comparison chain:

- `products.product_image`
- `workflow_packets.product_image_lookup`

The run should use:

- Airtable-native invocation through `live_generated_image_v1`
- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`

This plan does **not** authorize changing the packet burden itself beyond what is already carried in `PKT-SKU-003`.

## Comparison Intent

This robustness check should compare attachment-backed behavior against the existing prompt-only `PKT-SKU-003` behavior / outputs.

The comparison should focus on whether the attachment-backed improvement appears to hold under:

- multi-output burden
- hero / profile / detail set
- denser packet complexity

The purpose is not to restage `PKT-SKU-006`.

The purpose is to ask whether the earlier pressure still appears under a more complex SKU-mode packet.

## Evaluation Criteria

The bounded robustness-check reading should use the following criteria:

- product-truth preservation across the output set
- cross-view consistency
- finish/material fidelity
- detail-view usefulness
- contradictory invented detail
- overall governability under denser SKU-mode burden

These criteria should remain comparison-oriented and bounded to this one run.

## Outcome Classes

This robustness check should use the following outcome classes.

### `insufficient evidence`

`insufficient evidence` applies if attribution or comparison is too muddy to interpret honestly.

Examples include:

- the attachment-backed result cannot be tied cleanly to the intended packet and output set
- the comparison against prior prompt-only `PKT-SKU-003` behavior is too confounded to read narrowly
- the output set is too uneven or too thin to support an honest comparison

### `counter-pressure`

`counter-pressure` applies if attachment-backed input does not improve outcomes, improves unevenly, or degrades some important criteria under denser burden.

This includes cases where:

- some views improve while others become less governable
- contradictory detail falls in one output but rises elsewhere
- denser burden reveals tradeoffs that weaken the earlier `PKT-SKU-006` pressure rather than reinforcing it

### `bounded reinforcement of existing pressure`

`bounded reinforcement of existing pressure` applies if the result supports the existing pressure but does not fire a reopen trigger from the current decision note.

That means the run would strengthen the existing attachment-input concern while still stopping short of reopening the hold decision.

### `trigger-fired pressure sufficient to reopen the hold decision`

`trigger-fired pressure sufficient to reopen the hold decision` applies only if the result clearly satisfies one of the trigger conditions already named in:

- `docs/attachment-input-decision-note-sku-driven-furniture-v1.md`

This is the only outcome class here that reopens the current hold decision.

## Trigger Alignment

This robustness check uses the existing trigger list from:

- `docs/attachment-input-decision-note-sku-driven-furniture-v1.md`

The relevant triggers are:

- a second independent SKU-mode comparison reproduces the same directional improvement
- prompt-only generation demonstrably fails product-truth sufficiency while attachment-backed generation restores governability
- an attachment-backed input path becomes necessary to preserve candidate-output attribution or product-truth fidelity in a later bounded run
- a non-SKU mode shows the same pressure clearly enough to challenge SKU-only framing

This plan does **not** invent a new trigger standard.

Only trigger-fired pressure reopens the current hold decision.

## What This Run Would And Would Not Mean

If this robustness check reinforces the earlier pressure, that result would matter because it tests the attachment-input question under a denser SKU-mode burden than `PKT-SKU-006`.

It would still remain bounded:

- one packet
- one workflow mode
- one robustness-check question

This run is relevant to a later prototype-buildout decision, but it is not itself part of that prototype-buildout phase.

## Explicitly Out Of Scope

This plan does not authorize:

- generalized doctrine
- full prototype buildout
- cross-mode testing
- multi-category rollout
- structural adoption of `product_image_lookup`
- schema redesign
- treating the robustness check as part of the future prototype-buildout phase

It also does not authorize folding Run 1 collateral-generation behavior into the attachment-input pressure question.

## Next Step

After this note is landed, the next honest move is:

1. preserve this bounded robustness-check plan as repo-local truth
2. decide separately whether to execute the `PKT-SKU-003` robustness check
3. if it is executed later, interpret the result only through the outcome classes and trigger standard defined here
