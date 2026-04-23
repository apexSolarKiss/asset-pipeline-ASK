# End-To-End Live Model Run Plan v1

## Purpose Of The First Live Model Run

This document defines one bounded first end-to-end live model attempt for the repo.

Its purpose is to test whether the current packet-and-seam model can carry one real generation attempt from declared packet burden through real candidate assets and bounded output evaluation without widening into schema revision, runtime architecture, or broader platform strategy.

This is a planning artifact only. It does not authorize immediate execution, Airtable mutation, schema/configuration change, code change, or generalized live-model rollout.

## Why This Is Now The Honest Next Move

Current `main` now has enough repo-local scaffolding to justify one bounded live generation attempt.

What is now true on `main`:

- SKU-driven Furniture v1 has the deepest and most stable Airtable proof history
- campaign / editorial has one clean bounded Cycle-1-equivalent proof
- collection / merchandising has one clean bounded Cycle-1-equivalent proof
- marketing / message-driven has one clean bounded Cycle-1-equivalent proof
- prompt-artifact continuity remains explicitly on hold rather than reopened

That means the next honest question is no longer only whether the repo can carry declared packet burdens and declared artifact chains inside Airtable.

The next honest question is whether one bounded packet can survive a real end-to-end model invocation attempt while preserving clear attribution about:

- what the packet declared
- what invocation surface was used
- what the model actually produced
- what later seams judged

This is therefore a bounded next move in the same proof discipline, not a declaration that the repo is ready for production and not a license to widen into runtime/orchestration design.

## Mode-Selection Decision

The first live model candidate should be:

- `SKU-driven Furniture v1`

This is the smallest honest choice on current repo-local truth because it has:

- the deepest proof history
- the narrowest burden
- the best attribution surface for a first live generation attempt

SKU mode keeps the first live question tight. The governing burden remains closest to single-item truth, repeatable sufficiency, and bounded variation. That makes it easier to interpret whether later failures belong primarily to:

- invocation-surface ambiguity
- prompt-composition ambiguity
- model behavior
- governed-output insufficiency
- or review/readiness judgment

Campaign, collection, and marketing all now have bounded proof coverage, but each introduces a broader or more relational burden that would make first-pass attribution noisier than the SKU-driven case.

## Bounded Scenario

The bounded first live attempt should use one narrow SKU-driven Furniture v1 packet only.

Recommended scenario:

- one existing SKU packet centered on `SKU-CHAIR-002`
- one bounded still-image request for a single governed hero asset
- one narrow product-fidelity burden with no multi-asset family requirement
- one packet-local burden only, not a second packet and not a second mode

The scenario should stay narrow enough that the live question is interpretable:

- can one well-bounded SKU packet produce one or more real candidate assets that can be judged cleanly through the current seams?

This first attempt should not widen into:

- a full asset-set program
- a multi-SKU run
- a campaign-family run
- grouped merchandising burden
- message-bearing promotional burden

## Packet Burden For The First Attempt

The packet burden should remain equivalent to the current SKU-driven Furniture v1 proof posture:

- one governed item
- one explicit rule layer
- any already-carried approved references or product-truth inputs needed for that packet
- one bounded output expectation
- one first-pass run only

The packet should be treated as the governing declaration layer, not as proof that the output is already sufficient.

## Governed-Output Definition

For this first live attempt, `governed output` should be defined narrowly and concretely.

### What Counts As A Candidate Output Entering `output_validation`

A candidate output entering `output_validation` is:

- a real model-produced still image artifact generated from the bounded live invocation path
- explicitly tied to the current packet and first transformation pass
- legible enough to inspect for product truth, bounded composition, and stated output purpose

Candidate outputs may be plausible, interesting, or partially compliant without yet counting as governed outputs.

### What Counts As Passing Bounded Output Sufficiency

Passing bounded output sufficiency for this first live run means:

- at least one candidate image exists as a real generated artifact
- the candidate remains legible as the intended governed item rather than a loose aesthetic approximation
- product-defining signals remain sufficiently intact that the output can still be judged as a SKU-driven result rather than a drifted creative artifact
- the output is usable enough to proceed to bounded release-readiness review for this first proof

For this first live run, passing sufficiency should stay narrow. It does not require proving broader production readiness, repeatable throughput, or stable batch behavior.

### What Remains Out Of Scope Even If The Model Produces Plausible Images

Even if the model produces plausible images, this attempt still does not settle:

- generalized quality across future runs
- prompt-composition architecture
- production-scale repeatability
- broader approval-policy automation
- model-provider selection doctrine
- runtime sequencing architecture

Plausibility alone is not enough. The output still needs to remain governable inside the bounded SKU burden.

## Live Seam-Trail Interpretation

The first live seam trail should remain:

1. `ingest_validation`
2. `transformation_check`
3. `output_validation`
4. `release_readiness`

This should remain one first-pass run only.

### `ingest_validation`

Under the live attempt, `ingest_validation` still verifies that the packet burden is present, bounded, and usable before generation starts.

At this seam, the key question is whether the packet carries enough declared product truth, constraints, references, and output intent to justify one bounded live invocation attempt.

This seam still stops before generation. It does not infer that the later invocation will succeed.

### `transformation_check`

Under the live attempt, `transformation_check` changes meaning in one important way.

It is no longer only a declared stage transition against placeholder or manually declared artifacts. It becomes the seam that records one actual model invocation pass and the immediate candidate artifacts produced by that pass.

For this first attempt, `transformation_check` should verify only that:

- one bounded live invocation was attempted from the declared packet burden
- the invocation surface used is explicitly named
- the candidate artifacts produced by that invocation are captured as first-pass outputs for later judgment

This seam still does not decide whether the candidates are governed outputs. It verifies that one bounded live generation transition happened and produced inspectable artifacts.

### `output_validation`

Under the live attempt, `output_validation` remains the seam for governed output sufficiency.

At this seam, the key question is whether the real generated candidates are sufficient governed outputs for this narrow SKU-driven burden, not merely whether the invocation returned something visually plausible.

This is where the first live run should force the distinction between:

- real generated artifact existence
- governed output sufficiency

### `release_readiness`

Under the live attempt, `release_readiness` remains bounded readiness to present for approval, not approval itself.

At this seam, the key question is whether the bounded live result and any supporting review context are coherent enough to cross into approval-facing review for this first proof.

This seam should stay narrower than any final judgment about whether the model is production-worthy.

## Intended Model Invocation Surface

The intended model invocation surface must be made explicit before execution.

This is required to avoid a second attribution gap of the same kind previously seen with Airtable write-surface provenance. If the invocation surface is not named cleanly, later findings will not be able to distinguish whether observed behavior belongs primarily to:

- the packet burden
- the invocation path
- the model itself
- prompt handling at the invocation boundary
- or later evaluation

For this planning pass, the invocation surface category should be named as:

- one explicit external still-image model invocation surface

The exact provider or tooling may remain provisional at planning time, but the execution artifact must later state the concrete invocation surface used.

The Airtable write surface used to capture seam runs, generated assets, asset references or URIs, and review-context records during the live run must also be named explicitly in the later execution artifact. This is required to avoid reopening the same attribution gap previously seen with Airtable write-surface provenance. Silent substitution among Airtable write surfaces during execution is not authorized either.

This plan does **not** authorize silent substitution among multiple invocation paths during execution.

## Pre-Registered Outcome Classes

This first live run should pre-register the same three narrow outcome classes used in the Airtable proof chain, adapted for the noisier end-to-end setting.

### `findings-only`

`findings-only` is earned if:

- one bounded live invocation path is explicitly named
- one bounded SKU packet is carried through the live seam trail
- real candidate artifacts are produced
- the resulting evidence is interpretable without requiring schema/configuration change or broader runtime redesign

This outcome may still include imperfect outputs. It means the run produced interpretable first-pass evidence without earning a larger structural move.

### `spec-earned pressure`

`spec-earned pressure` is earned only if the live run surfaces a localized burden specific enough to justify later options or decision discussion without authorizing implementation in the run itself.

Examples could include:

- a repeatable governed-output ambiguity that clearly localizes to a seam definition
- a repeatable attribution problem that the current planning shape cannot honestly carry
- a live evidence-preservation burden that is sharper than the current packet/seam records can represent

This should remain a narrow threshold, not a catch-all for disappointment with model quality.

### `insufficient evidence`

`insufficient evidence` is earned if the live run cannot be interpreted cleanly enough to say where the main burden sits.

In this noisier end-to-end setting, that includes cases where model behavior, invocation surface, prompt composition, and evaluation are all co-active and no clear attribution line can be maintained.

Examples include:

- the invocation surface is not explicit enough to attribute behavior honestly
- the model returns too little usable artifact evidence to support seam-level interpretation
- capture around the generated assets is too thin to distinguish candidate existence from governed sufficiency
- multiple confounders are active at once and no narrow reading is honest

## What Remains Explicitly Out Of Scope

This planning doc does not authorize:

- schema revision
- Airtable configuration revision
- governed-output automation
- multi-mode live attempts
- contradiction stress
- revision loop
- second pass
- broader runtime/orchestration architecture
- generalized model-routing doctrine
- reopening prompt-artifact continuity unless live evidence clearly hits the existing trigger conditions

It also does not authorize treating one bounded live run as proof that the repo is now production-ready.

## Recommended Next Artifact

The next artifact after this planning doc should be:

- one bounded end-to-end live model run execution plan

It should not be immediate execution.
