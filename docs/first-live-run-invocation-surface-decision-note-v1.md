# First-Live-Run Invocation-Surface Decision Note v1

## Purpose

This note records the resolution of the first bounded invocation-surface decision gate for `asset-pipeline-ASK // SKU-Driven Furniture v1`.

It preserves the decision and the narrow evidence needed to justify that decision.

It does **not** establish permanent runtime doctrine.

## Decision

For the first bounded end-to-end live run, the invocation surface should be:

- **Airtable-native invocation**

The fallback external invocation path remains available, but it is no longer the default first-run path.

## Why This Gate Existed

The repo had reached the point where the next honest move was no longer another broad planning artifact.

The next question was whether the first disciplined live run could proceed through the intended Airtable-native invocation path without creating too much opacity around:

- composed prompt visibility
- invocation-path inspectability
- generated-asset capture
- later seam interpretation

If that path proved too opaque, the first live run would need to move to a more explicit fallback invocation surface.

## Bounded Evidence

A narrow external feasibility check was run against a disposable test surface.

That check was limited to the invocation pattern only.

It was not a full workflow proof and it did not test:

- the full packet/seam model
- multiple products
- review doctrine
- release-readiness doctrine
- generalized model quality

The relevant evidence from that bounded check was:

- a composed prompt could be generated from structured upstream fields
- the image-generation field could consume the composed prompt through direct field reference
- the generated result reflected the composed prompt strongly enough to preserve attribution
- the generated result was stored as a persistent inspectable artifact rather than only transient UI output

This was sufficient to clear the first-order concern that the Airtable-native path would be too opaque for a disciplined first live run.

## What This Decision Does And Does Not Mean

### What it means

- the first bounded live run may proceed through Airtable-native invocation
- Airtable-native invocation is legible enough for the first proof-oriented run
- the composed-prompt-to-generated-asset path is interpretable enough to support later seam judgment

### What it does not mean

- Airtable is now the permanent runtime surface
- Airtable-native invocation is automatically the best long-term architecture
- all future invocation paths should route through Airtable
- the prototype has earned broader runtime or platform doctrine

## Caveat

This decision clears the gate at the level required for the first bounded live run.

It does **not** settle the stronger long-term question of whether Airtable-native invocation remains the preferred surface once scale, repeatability, richer attribution, or broader runtime control become more important.

That remains a later question.

## Operational Implication

The durable prototype surface for `asset-pipeline-ASK // SKU-Driven Furniture v1` should remain the owned Airtable base rather than the disposable test surface used for the gate check.

The disposable test surface served only to resolve bounded invocation feasibility.

## Next Step

The next honest move is:

1. preserve this decision as a bounded repo artifact
2. proceed with the first bounded end-to-end live model run through Airtable-native invocation
3. interpret that result narrowly before widening into any later schema, runtime, or platform decision
