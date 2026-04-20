# Airtable Cycle 2 Wedge Test Findings // SKU-Driven Furniture v1

## Purpose

This document records the second bounded Airtable cycle against the `SKU-driven product imagery` proof build.

Its purpose is to capture the first live wedge test around prompt composition survival inside the current Airtable proof. It records what changed locally in the base, what the wedge test proved, what failed on the first pass, what recovered on the second pass, and what that now means for the current proof surface. It is a findings artifact, not an architecture rewrite.

## What Cycle 1 Had Already Proven

Cycle 1 had already proven that the live Airtable base could carry one bounded packet through the deterministic seam chain without requiring a wider record graph.

More specifically, cycle 1 had already shown that:

- one product, constraint set, reference set, packet, seam-run chain, generated-asset set, and review gate could all be recorded in the live base
- one bounded revision loop could occur after a failed `output_validation`
- candidate and governed outputs could remain distinct
- packet and gate state could remain legible without extra tables
- no current repo-local note had yet visibly failed to carry the burden of the first live cycle

That meant cycle 2 did not need to re-prove basic seam survivability. It could instead pressure-test one narrower open question.

## Why Cycle 2 Is The Wedge Test

Cycle 2 is the wedge test because it isolates one predicted pressure point that cycle 1 had not yet forced into the open: whether layered packet meaning survives prompt composition once the base must carry a more explicit composed prompt artifact.

The wedge question was not whether the overall seam chain exists. The wedge question was whether the current packet can carry enough layered meaning to produce a prompt artifact that remains faithful to SKU-specific product truth, scoped rules, reference-role distinctions, bounded creative discretion, and the required output set.

That is why cycle 2 stopped before `release_readiness` and before any gate step. The live question in this cycle was composition survival, not approval flow.

## Base State Before Cycle 2

Before cycle 2, the base already had the cycle-1 proof surface in place:

- the existing seven-table v1 record graph
- one live SKU-driven furniture packet flow already proven through one bounded revision loop
- packet, seam-run, generated-asset, and gate behavior already shown to be minimally legible

At the start of cycle 2, the base did not yet have a first-class place on `workflow_packets` to hold the locally composed prompt artifact or to capture packet-level composition notes about what the composition step preserved or lost.

That meant the base could carry packet inputs and seam results, but not yet the most direct local evidence of whether layered packet meaning survived prompt flattening.

## Minimal Schema Changes Made

Cycle 2 added two new packet-level fields on `workflow_packets`:

- `composed_prompt_output`
- `prompt_composition_notes`

No new table was added.

No broader graph change was introduced.

No release or gate structure was changed.

## Why Those Changes Were The Smallest Honest Wedge

Those two packet-level fields were the smallest honest wedge because they created a local place to inspect prompt composition directly without widening the proof into a larger composition subsystem.

The wedge did not require a new table because the live question was still packet-local: whether the packet could carry enough meaning into one composed prompt artifact and whether local notes could record what that composition step preserved, flattened, or lost.

That kept the remedy smaller than:

- a new composition table
- a larger revision graph
- a broader schema update across the full proof

The smallest working local remedy was therefore packet-level prompt artifact plus prompt composition notes, with no new table.

## What Was Tested

Cycle 2 tested whether one SKU-driven furniture packet could survive a prompt-composition step without flattening the layered meaning already carried by the packet.

The live wedge sequence was:

1. add the two new packet-level fields on `workflow_packets`
2. compose a first-pass prompt artifact from the live packet
3. run a transformation step against that first-pass prompt
4. perform `output_validation`
5. revise the prompt composition locally
6. run a second transformation step against the revised prompt
7. perform a second `output_validation`

No `release_readiness` run occurred in this cycle.

No gate step occurred in this cycle.

## What Worked Cleanly

The live base was able to absorb the wedge test without requiring a new table or a wider record graph.

The two new packet-level fields gave the base a concrete local place to hold both the composed prompt artifact and the notes explaining what the composition step was doing. That made the prompt-composition question inspectable inside the existing proof surface rather than leaving it implicit.

The second-pass prompt composition also worked cleanly enough to recover the wedge test. On the successful pass, the composed prompt explicitly carried:

- product-specific silhouette and finish
- scoped rules
- reference-role distinctions
- bounded creative discretion
- the required output set

Once those elements were carried explicitly, the second-pass transformation and second `output_validation` both succeeded.

Cycle 2 also worked cleanly in one other important sense: no current repo-local note visibly failed to carry the burden yet. The pressure surfaced inside the live build, but it did not yet invalidate the existing repo-local documentation posture.

## What Failed

The first-pass prompt artifact failed because it flattened layered packet meaning into generic studio-product language.

That failure was not just stylistic. It caused the first `output_validation` to fail because the packet's layered meaning did not survive composition strongly enough to preserve the intended output burden.

The first failed pass therefore showed that prompt composition had moved from a predicted pressure point to a live-tested pressure point.

The recovery step was a local revision of the composed prompt artifact. The second-pass prompt was revised to carry the packet's product-specific silhouette and finish, scoped rules, reference-role distinctions, bounded creative discretion, and required output set explicitly enough to survive transformation and validation.

This means cycle 2 did not fail because the base lacked a wider graph. It failed because the first local prompt artifact did not carry enough layered packet meaning.

## Connector Or Platform Limitations

Cycle 2 also surfaced connector or platform limitations around safety blocks and conservative URL handling.

These should be treated as request-surface or platform behavior rather than as schema failure.

The wedge question in this cycle was whether packet-level composition survival could be made visible in the live base. Safety blocks and conservative URL handling affected how easily assets and requests could move through that live surface, but they did not explain the first-pass flattening failure.

That distinction matters: the first failure belonged to prompt composition, while the safety and URL issues belonged to the connector or platform surface around the run.

## Where Meaning Became Ambiguous

Cycle 2 surfaced a narrower ambiguity than cycle 1.

The live ambiguity was not whether the packet had meaning. The ambiguity was whether the packet's layered meaning was still present once it was flattened into one composed prompt artifact.

The first-pass prompt made that ambiguity visible. The packet still held product truth, scoped rules, reference roles, bounded discretion, and required outputs, but the composed prompt did not carry those layers distinctly enough.

Cycle 2 also reinforced a second ambiguity: a packet-level prompt artifact is useful as a local remedy, but it still leaves open how much of prompt composition belongs to stable packet structure versus temporary local builder notes.

That ambiguity remains visible, but cycle 2 did not require resolving it yet.

## Narrow Conclusions

Cycle 2 counts as the first live wedge test for prompt composition inside the Airtable proof.

The narrow conclusion is not that the repo now needs a larger composition system. The narrow conclusion is that prompt composition has moved from predicted pressure to live-tested pressure, and that the smallest working local remedy was to add `workflow_packets.composed_prompt_output` and `workflow_packets.prompt_composition_notes` without adding a new table.

The first-pass failure showed that layered packet meaning can flatten into generic studio-product language during composition. In other words, naive flattening recreates the prompt-soup failure mode.

The second-pass recovery showed that layered packet meaning can survive composition, but only when composition is deliberate. The wedge can be carried locally if the composed prompt explicitly preserves product-specific silhouette and finish, scoped rules, reference-role distinctions, bounded creative discretion, and the required output set.

That means the current packet structure is necessary but not yet sufficient on its own. The structure can carry the right burden, but the composition step still has to preserve that burden intentionally.

No current repo-local note visibly failed to carry the burden yet.

No architecture rewrite is earned from this cycle alone.

## Follow-On Questions Before Cycle 3

- Should `composed_prompt_output` and `prompt_composition_notes` remain packet-local pragmatism, or do repeated cycles show pressure for a more stable composition surface?
- How repeatable is the second-pass recovery across more than one SKU-driven packet?
- Which prompt-composition failures should be treated as schema-adjacent pressure versus builder-local prompt craft?
- Which safety blocks and URL-handling behaviors are stable platform facts versus contingent request-surface constraints?
- What is the smallest next cycle that can test whether composition survival remains legible without widening into release or approval flow?
