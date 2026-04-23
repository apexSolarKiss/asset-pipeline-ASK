# End-To-End Live Model Run Execution Plan v1

## Purpose Of The Execution Plan

This document translates the already-landed end-to-end live model run planning doc into one bounded execution plan for the first live attempt.

Its purpose is to define how the first live run should later be executed in a way that preserves interpretable attribution across:

- declared packet burden
- invocation surface
- generated candidate artifacts
- output sufficiency judgment
- release-readiness judgment

This is not execution. It does not authorize Airtable mutation, model invocation, schema/configuration change, code change, or immediate live running.

## Bounded Execution Scenario

The bounded execution scenario for the first live run is:

- chosen mode: `SKU-driven Furniture v1`
- one bounded packet centered on `SKU-CHAIR-002`
- one first-pass-only attempt
- one real invocation
- one candidate-output capture path
- one output-validation judgment path
- one release-readiness judgment path

This remains a one-packet, one-pass execution shape only.

It does not authorize:

- a second packet
- a second mode
- a revision loop
- contradiction stress
- a second pass

## Execution Prerequisites

Before any live run is attempted, the execution plan assumes the following prerequisites are satisfied:

- one bounded SKU-driven Furniture v1 packet is selected and treated as the governing declaration surface
- the packet remains narrow enough to preserve first-pass attribution
- the intended model invocation surface is checked through the decision gate below
- the intended Airtable write surface for later execution recording is explicit
- the planned candidate asset capture path is explicit before generation begins

The execution should not begin if those prerequisites are still ambiguous.

## Invocation Surface Decision Gate

The model invocation surface is the one remaining concrete decision variable for this first live run.

### Preferred Path

Airtable-native invocation is preferred for the first prototype **if** a sandbox verification confirms all of the following:

- a composed prompt can be passed or interpolated cleanly into the image-generation field
- the prompt remains inspectable per row
- generated assets are captured as stable inspectable artifacts
- the invocation is transparent enough to support bounded seam interpretation

This is the preferred path only because it may keep the first live run closer to the current SKU-driven proof surface.

### Fallback Path

If the Airtable-native path fails or proves too opaque, execution must stop before the live run and switch to a more explicit invocation surface.

The acceptable fallback category is:

- one explicit external still-image invocation path with clearer prompt and artifact provenance

This execution plan does not authorize silent drift from Airtable-native invocation into an external path without explicitly naming that switch.

It also does not authorize treating the fallback path as a generalized provider doctrine.

## Preferred Airtable Write Surface

Preferred Airtable write surface for the intended execution artifact:

- `GPT Airtable connector`

This dependency should remain explicit in the later execution artifact. The execution artifact must also explicitly name the Airtable write surface actually used if execution occurs.

This plan does not widen that requirement into a broader control-surface doctrine. It exists only to preserve attribution for the later live run evidence.

## Asset-Capture Mechanics

The generated image artifact must be captured in a way that preserves one stable inspectable identity for later seam interpretation.

### Where The Generated Image Artifact Is Expected To Live

For this first run, the generated image artifact is expected to live in one stable capture location associated with the later execution record, such as:

- an Airtable attachment
- a stable asset URI
- another explicit inspectable artifact reference recorded with the packet and seam run

### How Stable Reference Identity Is Preserved

The later execution artifact must preserve:

- the stable reference, URI, or attachment identity of each candidate output
- the packet association for that artifact
- the transformation-pass association for that artifact
- the later output-validation judgment tied to that same artifact

### How The Artifact Ties Back To The Run

Each candidate artifact must tie back explicitly to:

- the packet
- the first transformation pass
- the later output-validation judgment

That linkage is required so the run can distinguish:

- invocation occurred
- artifact exists
- artifact was judged

### Why Transient-Only Output Is Insufficient

Transient-only model output is insufficient for this execution because it would leave later seam interpretation too thin.

If the artifact exists only transiently inside the model response and is not preserved as one stable inspectable reference, the later execution artifact will not be able to support honest judgment about:

- what the model produced
- what entered `output_validation`
- what `release_readiness` actually considered

That kind of capture failure should bias the run toward `insufficient evidence`, not toward over-reading plausibility.

## Live Execution Sequence

The first live run should be executed as one bounded sequence only.

### 1. Bounded Run Setup

The run setup should:

- select one bounded SKU-driven packet centered on `SKU-CHAIR-002`
- confirm that the packet carries enough declared burden for one first-pass run
- confirm the chosen invocation surface through the decision gate
- confirm the intended Airtable write surface
- confirm the artifact-capture path before generation starts

### 2. Transformation Execution

Transformation execution should:

- attempt one real invocation only
- use the explicitly named invocation surface
- produce one or more candidate still-image artifacts from that first pass
- record that those artifacts came from the one bounded first-pass transformation attempt

This step should not include:

- a rerun
- prompt iteration
- contradiction injection
- a second model path

### 3. Candidate Asset Capture

Candidate asset capture should:

- preserve one stable inspectable reference or URI for each candidate image
- tie each candidate back to the packet and first transformation pass
- record enough capture detail that later `output_validation` can inspect the same artifact rather than a paraphrase of it

### 4. Output-Validation Check

The output-validation check should ask one narrow question:

- did at least one captured candidate artifact satisfy bounded governed-output sufficiency for this first SKU-driven run?

At this seam, the run should distinguish clearly between:

- candidate artifact existence
- bounded governed-output sufficiency

Plausible imagery alone should not be treated as a passing governed output.

### 5. Release-Readiness Check

The release-readiness check should ask one narrow question:

- is the bounded first-pass result ready to be presented for approval review inside the current repo-local meaning of release-readiness?

This should remain narrower than approval itself and narrower than any claim of production readiness.

### 6. Outcome Recording

After those steps, the run should record one of the pre-registered outcome classes below.

The result should be recorded narrowly, without widening into schema/configuration proposals unless the evidence truly earns that move.

## Outcome-Class Pre-Registration

This execution plan carries forward the same three outcome classes from the live-run planning doc, but now in operational form.

### `findings-only`

`findings-only` is earned if:

- the invocation surface is explicitly named
- the Airtable write surface is explicitly named
- one bounded SKU packet is carried through the first-pass sequence
- one or more candidate artifacts are captured as stable inspectable references
- the result is interpretable without requiring schema/configuration change or broader runtime redesign

### `spec-earned pressure`

`spec-earned pressure` is earned only if the live run surfaces a localized burden specific enough to justify later options or decision discussion.

Operationally, that means the burden must localize clearly enough that the repo can say where the current execution shape stopped being honest, without confusing:

- model behavior
- capture behavior
- invocation opacity
- or seam-definition ambiguity

### `insufficient evidence`

`insufficient evidence` is earned if opacity or capture failure prevents honest seam-level interpretation.

Operationally, this includes cases where:

- the Airtable-native path proves too opaque to show what prompt was actually used
- generated artifacts are not preserved as stable inspectable references
- the capture path is too thin to tie candidate artifacts back to packet and transformation pass
- invocation behavior, prompt handling, and later evaluation are too entangled to interpret honestly
- the write surface used for recording the run is not explicit enough to preserve provenance

## Required Provenance Fields In The Later Execution Artifact

The later execution artifact must explicitly name, at minimum:

- the packet used
- the chosen mode
- the model invocation surface actually used
- the Airtable write surface actually used
- the first transformation pass identifier
- the stable artifact reference or URI for each candidate output
- the output-validation judgment applied to those candidates
- the release-readiness judgment applied after output validation
- the final pre-registered outcome class

This list is not a schema change. It is the minimum provenance burden needed for the later execution artifact to remain interpretable.

## What Remains Explicitly Out Of Scope

This execution-plan doc does not authorize:

- immediate live execution
- schema revision
- Airtable configuration revision
- governed-output automation
- multi-mode live attempts
- contradiction stress
- revision loop
- second pass
- broader runtime/orchestration architecture
- generalized model-routing doctrine
- reopening prompt-artifact continuity unless live evidence clearly hits existing trigger conditions

It also does not authorize assuming the Airtable-native invocation path is already confirmed before sandbox-style viability checking has actually been run.

## Recommended Next Artifact

The next artifact after this execution-plan doc should be:

- one bounded live model run findings artifact after execution

It should not be another planning note.
