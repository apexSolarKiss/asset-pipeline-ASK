# End-To-End Live Model Run Findings // SKU-Driven Furniture v1

## Purpose

This document records the first bounded end-to-end live model run findings for `asset-pipeline-ASK // SKU-Driven Furniture v1`.

It is a findings artifact only.

Its purpose is to capture what actually occurred in the first live run attempt, what remained interpretable, what collateral behavior appeared during execution, and what narrow next question is now earned.

It does **not** revise the execution plan.
It does **not** authorize schema change, code change, or broader Airtable reconfiguration.

## What Was Executed

Run 1 should be read as:

- one bounded Airtable-native live run
- one prompt-only invocation posture
- one packet under intended evaluation: `PKT-SKU-005`
- one first-pass-only run shape

This findings artifact should **not** retroactively fold later image-input experimentation into Run 1.

Run 1 was not a mixed prompt-plus-attachment-input run.

## Actual Execution Surface Used

The actual execution surface used in Run 1 was:

- the owned Airtable base `asset-pipeline-ASK // SKU-Driven Furniture v1`
- an Airtable-native invocation container in `workflow_packets`
- authoritative prompt source: `workflow_packets.composed_prompt_output`

The owned Airtable base remained the canonical packet / seam / evidence surface for the run.

## Actual Packet Under Evaluation

The intended packet under evaluation for Run 1 was:

- `PKT-SKU-005`

This remained the expected one-packet first run defined by the execution artifact chain.

## Actual Observed Collateral Behavior

Run 1 also surfaced unexpected collateral behavior at field-creation time.

When the Airtable-native invocation container was created, generation did not remain isolated to the intended live-run packet only.

Other eligible rows also generated:

- `PKT-SKU-002`
- `PKT-SKU-003`

That means the run should be interpreted with a distinction preserved between:

- the expected one-packet first run on `PKT-SKU-005`
- the unexpected field-creation backfill behavior affecting other eligible rows

This collateral behavior should be treated as part of the execution findings, not silently folded into the intended run design.

## Actual Observed Cardinality Behavior

Observed output cardinality was:

- `PKT-SKU-002 -> 2 images`
- `PKT-SKU-003 -> 3 images`
- `PKT-SKU-005 -> 1 image`

The narrow observable pattern is that output cardinality appeared to follow packet-local required-output wording in the prompt-bearing packet surface.

This should be kept as a narrow observation rather than over-read as a finalized Airtable-native generation rule.

## Narrow Evaluation Of `PKT-SKU-005`

For the intended run packet, `PKT-SKU-005`, the narrow evaluative result is:

- one image was generated
- the run remained interpretable enough to count as a real first live attempt
- the generated result appeared directionally strong as a restrained studio dining-chair hero image
- the result should still be read as prompt-only Airtable-native behavior

What this result does **not** yet establish:

- exact rear-leg splay
- visible rear-leg joinery
- full silhouette fidelity versus close-enough approximation
- how generation behavior changes once product image input is added
- whether prompt-only generation is sufficient for the longer-run SKU-driven burden
- whether the collateral backfill behavior is stable Airtable-native behavior or one-time field-creation behavior

The narrow `PKT-SKU-005` result is therefore real but incomplete.

## Outcome-Class Recommendation

Recommended outcome class:

- `findings-only`

Why `findings-only` is the smallest honest reading:

- the run produced real interpretable Airtable-native evidence
- `PKT-SKU-005` did generate a bounded first-pass output
- the collateral behavior is noteworthy but still interpretable
- the evidence does not yet require schema/configuration change inside this findings artifact

This run does **not** cleanly earn:

- `spec-earned pressure`
- `insufficient evidence`

It does not earn `spec-earned pressure` because the current result still reads primarily as a bounded live finding rather than as a localized structural burden that clearly requires a new options discussion.

It does not earn `insufficient evidence` because the run did produce interpretable packet-local output behavior, even though collateral field-creation behavior also occurred.

## What Remains Unresolved

Several important questions remain unresolved after Run 1:

- whether Airtable-native prompt-only behavior is enough for the intended SKU-driven burden
- whether the field-creation backfill behavior will recur once the invocation container already exists
- whether output cardinality will continue to follow packet-local required-output wording under later runs
- how much of the observed behavior belongs to Airtable-native container setup versus steady-state invocation behavior

These questions are unresolved, but they are now narrower than they were before Run 1.

## Explicit Next Question

The next explicit question earned by Run 1 is:

- whether attachment-backed product image input materially changes Airtable-native generation behavior

That question should be treated as the next narrow evidence question, not as a license to widen into broader runtime doctrine.

## Explicitly Out Of Scope

This findings artifact does **not** authorize:

- another Airtable test inside this artifact
- Airtable mutation inside this artifact
- schema or configuration change
- execution-plan revision
- broader runtime or platform doctrine
- folding later image-input experimentation back into Run 1

It records only the bounded first-run findings as they actually occurred.
