# Multi-Output Generation / Capture Options Note // SKU-Driven Furniture v1

## Purpose

This note records planning-stage options only for the multi-output generation / capture pressure surfaced by the fresh-run findings note for `PKT-SKU-007`.

It responds to:

- `docs/fresh-run-multi-output-check-findings-sku-driven-furniture-v1.md`

This is an options note only.

It does **not** authorize implementation.
It does **not** authorize Airtable mutation.
It does **not** authorize schema creation.
It does **not** establish generalized output doctrine.
It does **not** establish a cross-mode conclusion.

## Current Pressure

`PKT-SKU-007` was a fresh product / fresh packet / clean first-pass run.

It used:

- `products.product_image`
- `workflow_packets.product_image_lookup`
- `workflow_packets.composed_prompt_output`
- `workflow_packets.live_generated_image_v1`

The packet required three outputs:

- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character

Airtable produced one generated image.

The generated image corresponded most closely to the profile / side supporting view.

The front three-quarter hero and detail crop were missing.

The smallest honest outcome class remains:

- `fresh-run counter-pressure`

The structural issue now appears narrower than input-side attachment pressure alone.

The pressure has shifted from input-side attachment-backed generation toward output-side representation and capture.

The design question raised by the fresh-run result is:

- whether expected outputs need to be separately addressable before generation and separately evaluable after generation

## Boundary

This note stays inside current repo-local planning discipline.

It does **not** decide that output-slot architecture is correct.
It does **not** authorize any implementation path.
It does **not** authorize any Airtable mutation.
It does **not** establish a generalized multi-output doctrine.
It does **not** establish a cross-mode claim.

Screenshots and image assets remain outside the repo.

`PKT-SKU-003` remains a separate later credit-reset diagnostic and is not required before this options note.

## Evaluation Standard

Each option should be judged against the same narrow question:

- can the repo preserve the required multi-output burden from prompt through generated-asset capture without prematurely hardening an under-earned structure

Each option below is evaluated on:

- what it changes conceptually
- how clearly it preserves output identity
- how cleanly it supports later evaluation of hero / profile / detail expectations
- what local complexity it introduces
- whether it stays planning-sized or starts to imply a broader structural commitment

## Option A: Hold

### What It Means

Make no schema or Airtable implementation move yet.

Preserve the finding and wait for more evidence.

### Why It Remains Plausible

The repo has one clean fresh-run result, not a broad family of repeated failures.

That is enough to create real pressure.

It is not automatically enough to justify a structural move.

### What It Preserves

- planning discipline
- narrow interpretation of one bounded result
- freedom to compare later evidence before hardening the output surface

### What It Does Not Solve

This option does not remove the current ambiguity around output identity inside one generated-image bucket.

It also does not improve separate evaluation of hero / profile / detail expectations if the same failure reproduces.

## Option B: Separate Attachment Fields Per Expected Output Role

### What It Means

Represent the expected outputs as separate packet-level attachment fields.

Examples could include:

- hero image field
- profile image field
- detail image field

### What It Could Clarify

This option would make expected outputs separately addressable at the field level.

It would also make post-generation evaluation more legible because each expected role would have its own capture surface.

### What It Costs

This begins to push the packet toward a more explicit output-role structure.

It also risks hardening field-level output doctrine before the repo has decided whether fields are the right long-term abstraction.

### Why It Is Still Incomplete

Separate fields may improve capture clarity without resolving whether generation itself must be run separately per role.

This option may therefore clarify representation while leaving orchestration burden unresolved.

## Option C: Separate Packet-Local Generation Runs Per Expected Output Role

### What It Means

Keep the packet as the parent container, but run each required output role separately.

Under this pattern, the packet would still define the set, while:

- hero generation would run separately
- profile generation would run separately
- detail generation would run separately

### What It Could Clarify

This option separates the generation burden even if the packet remains the parent record.

It may reduce the risk that one run collapses the three-view burden into a single returned image.

### What It Costs

This starts to introduce orchestration logic around repeated packet-local runs.

It also raises identity and capture questions unless the separate runs land in clearly distinct output surfaces.

### Why It Is Still Incomplete

If separate runs still write into one attachment bucket, output identity may remain ambiguous after generation.

This option may therefore need a companion representation layer to stay governable.

## Option D: Separate Generation Containers Per Output Role

### What It Means

Create distinct generation surfaces or field-agent containers for each output role.

The separation would happen at the generation container level rather than only at the packet or prompt level.

### What It Could Clarify

This option makes the role burden explicit where generation is invoked and where output is captured.

It may provide cleaner separation between hero, profile, and detail responsibilities than one shared field-agent surface.

### What It Costs

This is heavier than a hold posture or a simple packet-field split.

It begins to imply a stronger structural model for how generation surfaces should be partitioned.

### Why It May Be Premature

Current repo-local truth has not yet established whether the problem is primarily packet representation, run structure, field-agent container design, or some interaction among them.

## Option E: First-Class Output-Slot Table / Output-Slot Layer

### What It Means

Represent expected assets as rows or first-class records before generation, then evaluate each slot after generation.

Under this pattern, each required output role becomes its own explicit output slot with its own identity.

### What It Could Clarify

This option appears promising because it directly addresses the pressure surfaced by the fresh-run note:

- each expected asset becomes separately addressable before generation
- each expected asset becomes separately evaluable after generation
- the required output set can remain explicit from prompt burden through capture burden

This is the cleanest direct response to output-identity pressure.

### What It Costs

This is also the heaviest structural option in the current set.

It starts to introduce first-class output-slot architecture before that architecture is actually decided.

### Why It Is Not Yet Decided

Output-slot architecture appears promising but is not yet decided.

The repo has not yet authorized implementation, Airtable mutation, or a first-class slot model.

This option should therefore be read as a strong candidate abstraction only, not as a chosen design.

## Option F: Another Explicit Output-Set Orchestration Pattern

### What It Means

Reserve space for another explicit output-set orchestration pattern if later repo-local evidence suggests a smaller honest abstraction than the options above.

### Current Status

No better minimal abstraction is yet clearly earned from current repo-local truth.

This placeholder remains open so the repo does not force a premature decision among today’s named options if a narrower pattern later becomes clearer.

## Narrow Comparison

Across current repo-local truth, the options sort roughly as follows:

- Option A preserves discipline but leaves the pressure unresolved
- Option B improves separate addressability at the field level
- Option C separates generation burden while keeping the packet as parent
- Option D separates generation containers more explicitly, but at higher structural cost
- Option E appears most directly aligned with the observed output-identity pressure, but is also the heaviest and remains undecided
- Option F stays open only as a placeholder for a later smaller honest abstraction if one emerges

At current evidence strength, the repo has earned the options discussion.

It has not yet earned an implementation decision.

## Reopen / Escalation Triggers

This question should be reopened or escalated if one or more of the following occurs:

- another fresh multi-output packet reproduces the same single-output failure
- a multi-output field-agent run continues to return only one image despite explicit multi-view burden
- append / replacement / capture behavior prevents reliable asset identity
- downstream destination mapping requires each expected asset to be separately addressable
- governed-output evaluation cannot reliably distinguish hero / profile / detail roles in one attachment bucket
- Airtable field or attachment behavior makes output identity ambiguous across reruns
- multi-output burden cannot be preserved from prompt to generated asset capture without slot-level representation

## What Remains Out Of Scope

This note does not authorize:

- implementation
- Airtable mutation
- schema creation
- rerunning `PKT-SKU-007`
- rerunning `PKT-SKU-003`
- importing screenshots or image assets into the repo
- generalized output doctrine
- cross-mode conclusion

## Current Honest Position

The current honest position is:

- preserve the fresh-run counter-pressure
- keep the question planning-stage only
- treat output-slot architecture as promising but not decided
- defer implementation unless later evidence clears a named reopen trigger
