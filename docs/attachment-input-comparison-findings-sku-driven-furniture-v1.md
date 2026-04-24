# Attachment-Input Comparison Findings // SKU-Driven Furniture v1

## Purpose

This document records the findings of the bounded attachment-input comparison run for `asset-pipeline-ASK // SKU-Driven Furniture v1`.

Its purpose is to preserve the evidence from that comparison run and the narrow interpretation now earned from it.

It does **not** establish broad runtime doctrine.
It does **not** authorize broader Airtable or platform conclusions from one comparison result.

## Run Identity

The bounded comparison run should be identified as:

- comparison packet: `PKT-SKU-006`
- anchored SKU: `SKU-CHAIR-002`
- invocation surface: Airtable-native
- Airtable write / capture surface: `GPT Airtable connector`
- image-generation field agent: `live_generated_image_v1`
- model: `gpt-image-1`

This run should be read as a follow-up comparison against Run 1, not as a reinterpretation of Run 1 itself.

## Corrected Input Path

The corrected input path used for this comparison run was put in place before execution.

No attachment-input comparison run was executed against the earlier packet-local `workflow_packets.product_image` path.

The path actually used for the completed comparison run was:

- canonical product-truth image field: `products.product_image`
- packet-level access path: `workflow_packets.product_image_lookup`

The field-agent inputs used for the run were:

- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`

This preserved the intended information architecture boundary:

- stable product-truth image input remained on the product record
- the packet accessed that image through the linked SKU surface

## Setup Finding

The bounded setup gate cleared for this comparison run.

Specifically:

- Airtable allowed `workflow_packets.product_image_lookup` to be added as an input to the image-generation field agent
- saving the field configuration did not trigger collateral auto-generation

This matters because Run 1 surfaced collateral behavior at field-creation time, while this comparison setup did not.

This findings note does not settle why that behavioral difference appeared; it records only that the earlier collateral behavior was not observed in this bounded comparison setup.

## Execution Finding

`PKT-SKU-006` was run successfully.

Observed bounded execution result:

- the run produced one generated image
- no other packets generated as a side effect of this run

This means the comparison run remained isolated to the intended packet.

## Evidence Captured

The evidence preserved for this bounded comparison run included:

- `PKT-SKU-006` record-open screenshot
- large-view generated image
- grid-state screenshot showing no collateral generation
- field-agent configuration screenshot showing:
  - `workflow_packets.product_image_lookup`
  - `workflow_packets.composed_prompt_output`

These artifacts are sufficient to support a narrow comparison reading against Run 1.

## Narrow Interpretation Against The Pre-Registered Criteria

Against the pre-registered comparison criteria, the bounded reading is:

- product-defining silhouette preservation: better than the prompt-only run
- finish/material accuracy: better
- identifying-detail preservation: better
- contradictory invented detail: fewer
- overall governability as `SKU-CHAIR-002`: better

This interpretation should remain explicitly bounded.

It is based on:

- one comparison packet
- one generated result

It should therefore be read as evidence that attachment-backed product image input materially improved control in this one bounded case, not as generalized doctrine about all packets, modes, or future runs.

All five pre-registered criteria moved in the same positive direction in this one comparison, which supports the bounded pressure finding, while finer-grained dimensional analysis would require a multi-comparison setup.

## Outcome-Class Recommendation

Recommended outcome class:

- `spec-earned pressure`

Why `spec-earned pressure` is the smallest honest reading:

- the result appeared to materially improve control in this one bounded comparison
- the result localizes a concrete pressure point: prompt-only versus attachment-backed input did not appear behaviorally equivalent here
- the evidence remains too narrow to justify broad doctrine, but it is now strong enough to earn a focused next-options question, not a broader implementation decision

The result also suggests that visual anchoring may be load-bearing for product-truth fidelity in this kind of SKU-driven case, while still remaining an earned pressure rather than a settled rule.

This run does **not** justify a broad conclusion that attachment-backed input is always required or always superior.

## What This Does Not Mean

This result does **not** mean:

- attachment-backed input is proven superior across all packets or workflow modes
- long-term runtime doctrine is now settled
- the repo should widen immediately from this one bounded comparison result

It also does **not** mean that later robustness checking can be folded back into the meaning of this run.

## Next Honest Move

The next honest move is:

1. preserve this findings artifact as the bounded record of the completed comparison run
2. then decide separately whether to run a follow-up robustness check, such as a rerun on a different packet
3. keep any later robustness check separate from the meaning of this run

This findings note records one bounded comparison result only.
