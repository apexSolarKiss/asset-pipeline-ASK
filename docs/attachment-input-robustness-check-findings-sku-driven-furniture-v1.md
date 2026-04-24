# Attachment-Input Robustness-Check Findings // SKU-Driven Furniture v1

## Purpose

This document records the bounded robustness-check execution result for `PKT-SKU-003` in `asset-pipeline-ASK // SKU-Driven Furniture v1`.

It should be read as one bounded Airtable execution result only.

This robustness check was executed under the already-landed robustness-check plan.

It does **not** authorize structural change.
It does **not** reopen the attachment-input decision note by itself unless the evidence actually clears a named trigger.

## Bounded Setup

The robustness-check run was executed through Airtable.

The result was inspected through the control-surface process using Airtable access / observation.

This provenance is load-bearing for the findings record because the execution surface and the capture surface are part of what this run revealed.

The run used the corrected input path:

- `products.product_image`
- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`

No attachment-input robustness check was executed against the earlier wrong packet-local image-field path.

## What Was Run

The bounded robustness-check target was:

- `PKT-SKU-003`

`live_generated_image_v1` was rerun only for `PKT-SKU-003`.

This remained a reopened bounded check under the already-landed robustness-check plan, not a broader implementation move.

## Observed Result

The rerun generated:

- 2 new outputs, not the expected 3

The new outputs appeared to align with the attachment-backed product image input.

The two new outputs were effectively:

- one side / profile-supporting view
- one detail crop

The expected front three-quarter / hero-like view was missing.

## Capture-Surface Finding

Rerunning did **not** replace prior generated outputs.

Airtable appended the new outputs into the same field instead:

- `live_generated_image_v1`

This created a mixed-output capture surface inside `live_generated_image_v1`.

That append behavior is a material finding, not an incidental note, because it degrades later comparison clarity and output-set governability.

## Outcome Class

Recommended outcome class:

- `insufficient evidence`

Why `insufficient evidence` is the smallest honest reading:

- some comparison criteria improved
- 2 new outputs were produced
- the expected front three-quarter / hero-like output was missing
- Airtable appended new outputs rather than replacing prior outputs
- the two new outputs appeared aligned with the attachment-backed product image input

The append-not-replace behavior remains a valid capture-surface finding.

But the incomplete-output conclusion now has to be downgraded, because Airtable AI credits were later discovered to be exhausted around this run.

That means the missing third output can no longer be cleanly interpreted as model, prompt, or capture behavior on its own.

This run should therefore not be read as clean counter-pressure against attachment-backed input under denser SKU-mode burden.

It also should not be overcorrected into reinforcement.

Attachment-backed input still appeared to help product-truth anchoring, while the observed capture-surface behavior remained real.

## What This Does And Does Not Mean

This result does **not** prove that attachment-backed input should be adopted structurally.

It also does **not** prove that attachment-backed input fails generally.

It does show a more mixed but now more confounded picture than `PKT-SKU-006` alone:

- product-truth anchoring appears to benefit
- append behavior introduces real capture-surface pressure
- output-set completeness can no longer be interpreted cleanly because of the credit-exhaustion confound

This run does not settle whether the missing hero view was due to:

- random generation variance
- rerun / append mechanics
- denser packet burden
- or some interaction among those factors

The observed append behavior also raises a later capture-surface question around Airtable field output handling.

This findings note does **not** resolve that question here, and it does **not** widen into a settings-analysis artifact.

## Next Honest Move

The next honest move is not another rerun of `PKT-SKU-003`.

The next fresh-run multi-output check remains the correct next test.

But it should not be executed until Airtable AI credits are available again.

The next honest move is therefore a new bounded plan for a fresh packet on a fresh product, with a required 3-view output set, so the project can test attachment-backed multi-output behavior without rerun-append contamination.

Staying in the chair category first is the narrowest honest way to do that.
