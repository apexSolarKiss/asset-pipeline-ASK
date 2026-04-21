# Prompt-Artifact Continuity Options Note

## Purpose

This note evaluates the smallest honest remedy options for the prompt-artifact continuity pressure surfaced by Cycle 4 in the SKU-driven Furniture v1 Airtable proof.

The question here is narrow:

- how can v1 preserve first-pass and revised-second-pass prompt artifacts as separate authoritative evidence with the smallest possible change?

This is an options note only.

It does not authorize a schema change, configuration change, implementation move, or broader composition-system claim.

## Current Earned Pressure

Repo-local truth now supports a narrower conclusion than the earlier Cycle 4 planning and findings documents alone.

What has been earned is:

- graph adequacy still held
- the contradiction packet `PKT-SKU-004` could be declared and carried without graph failure
- the completion-pass blocker localized to prompt-artifact continuity inside the packet-local composition surface
- one prompt field plus one notes field did not cleanly preserve first-pass and revised-second-pass prompt artifacts as separately authoritative evidence

What has not been earned is:

- a general claim that the v1 graph is inadequate
- a general claim that prompt composition requires a broader subsystem
- a cross-mode generalization claim
- an implementation move inside this note

That means the repo has earned a narrow spec/configuration discussion, but not a decision yet.

## Boundary

This note stays inside current repo-local discipline.

It does not propose:

- a generalized composition subsystem
- a cross-mode abstraction
- a new workflow class
- a runtime orchestration design
- an external control-surface solution

The burden is strictly local: preserve prompt-artifact continuity for one bounded revision loop in the current v1 proof surface.

## Evaluation Standard

Any minimal remedy should be judged against the same question:

- can the system preserve first-pass and revised-second-pass prompt artifacts as separately authoritative evidence without making the v1 proof surface heavier than the evidence has earned?

Each option below is evaluated on:

- what it changes
- what evidentiary continuity it preserves
- what it costs in local complexity
- whether it stays inside current v1 discipline or begins to push toward heavier structure
- what new ambiguity it introduces

## Option A: Second Prompt Field On `workflow_packets`

### What It Changes

Add one second prompt-bearing field on `workflow_packets`, so the packet can carry:

- one authoritative first-pass prompt artifact
- one authoritative revised second-pass prompt artifact

This is the smallest direct extension of the current packet-local surface.

### What Evidentiary Continuity It Preserves

This option preserves the most direct continuity for the exact Cycle 4 problem:

- the first-pass prompt remains visible on the packet
- the revised second-pass prompt remains visible on the same packet
- the revision loop stays packet-local and inspectable without overwriting the first artifact

It therefore solves the specific continuity problem with minimal movement.

### What It Costs In Local Complexity

The complexity cost is low but real:

- one more field
- one more naming decision
- one more question about which prompt field is authoritative in later reads

This is still lighter than introducing a new table or moving prompt evidence into seam-local records.

### Whether It Stays Inside Current v1 Discipline

This option stays closest to current v1 discipline.

It keeps the burden packet-local, which matches the current proof posture and the cycle-2 remedy.

It begins to push toward heavier structure only if repeated revisions start to imply a larger prompt-history surface than two packet-local fields can honestly carry.

### What New Ambiguity It Introduces

This option introduces one new ambiguity:

- is the packet still the right place for prompt-history evidence, or is it beginning to absorb too much seam-local revision history?

It also risks a naming ambiguity if the field pair sounds permanent or general before that claim is earned.

## Option B: Prompt Artifact Captured On `seam_runs`

### What It Changes

Capture the prompt artifact on the relevant `seam_runs` records instead of, or rather than, on `workflow_packets`.

Under this option:

- the first-pass prompt would live with `SR4-TRANSFORM-001`
- the revised second-pass prompt would live with `SR4-TRANSFORM-002`

### What Evidentiary Continuity It Preserves

This option preserves revision continuity more explicitly across the seam trail:

- each prompt artifact is tied to the exact transformation pass that used it
- first-pass and second-pass artifacts no longer compete for the same packet-local surface
- prompt evidence and seam evidence become more tightly aligned

This is stronger for historical traceability than Option A.

### What It Costs In Local Complexity

The complexity cost is moderate:

- prompt-bearing burden shifts from packet-local structure to seam-local structure
- `seam_runs` begins to carry richer artifact content, not just run-level notes and references
- the current v1 seam record shape would become denser

This is still a narrow move compared with a child table, but it is structurally heavier than one extra packet field.

### Whether It Stays Inside Current v1 Discipline

This option still fits inside v1 discipline, but less comfortably than Option A.

It begins to lean toward a stronger interpretation of `seam_runs` as evidence-bearing records rather than narrow run records.

That may be correct later, but current repo-local truth has not yet made that move obvious.

### What New Ambiguity It Introduces

This option introduces a different ambiguity:

- is the authoritative prompt artifact a packet property or a seam-run property?

It may also blur whether prompt composition belongs to packet declaration or to transformation execution.

## Option C: Child Prompt-Artifact Table

### What It Changes

Add a dedicated child table for prompt artifacts, likely linked to packets and possibly to the relevant seam runs.

Under this option, prompt artifacts become first-class records rather than long-text fields.

### What Evidentiary Continuity It Preserves

This option preserves the richest continuity:

- each prompt artifact can exist independently
- first-pass and revised-second-pass prompt artifacts are naturally separate
- further revision history could be preserved without overwriting or field inflation

If the problem were already clearly larger than one bounded revision loop, this would be the cleanest evidence surface.

### What It Costs In Local Complexity

The complexity cost is the highest of the three options:

- a new table
- new links
- new naming and lifecycle questions
- higher interpretation burden for the v1 proof

This is a meaningful structural lift compared with the current Airtable proof surface.

### Whether It Stays Inside Current v1 Discipline

This option is the weakest fit with current v1 restraint.

It does not automatically become wrong, but it begins to push the proof toward heavier structure before the repo has shown repeated evidence that such structure is necessary.

At current evidence strength, this option looks more like a candidate later remedy than the smallest honest next move.

### What New Ambiguity It Introduces

This option introduces the biggest structural ambiguity:

- has the repo merely solved continuity, or has it quietly started building a broader composition subsystem?

That risk matters because the repo has not yet earned that broader claim.

## Narrow Comparison

Across current repo-local truth, the options sort as follows:

- Option A is the smallest direct remedy to the exact continuity problem
- Option B is stronger on seam-level evidentiary traceability, but it shifts the burden toward a heavier reading of `seam_runs`
- Option C is structurally cleanest in the abstract, but currently looks under-earned for v1

That does not make the decision automatic.

It does mean the burden of proof now sits with any option heavier than Option A.

## What Would Justify A Later Narrow v1.1-Style Change

A later narrow v1.1-style spec/configuration change would be justified if repo-local evidence becomes strong enough to show all of the following:

- the continuity problem recurs as a real blocker rather than as a one-off Cycle 4 artifact
- the blocker still localizes to prompt-artifact continuity rather than graph inadequacy
- the chosen remedy can be stated narrowly as evidence preservation rather than as a generalized composition redesign
- the lighter option immediately below it is no longer honest enough to preserve authoritative first-pass versus revised-second-pass evidence

In practical terms:

- Option A would be justified if one additional packet-local prompt field is enough to preserve the needed continuity without generating new confusion
- Option B would be justified only if packet-local prompt continuity is clearly too thin, but the burden still remains seam-local rather than table-worthy
- Option C would be justified only if repeated continuity failures show that field-based remedies are no longer honest and the repo needs first-class prompt-artifact records even within the narrow v1 proof

## What Evidence Would Still Be Insufficient

The following would still be insufficient to justify a v1.1-style move:

- one incomplete cycle without a localized blocker
- aesthetic preference for structural symmetry
- a general intuition that prompt artifacts “should” be records
- cross-mode extrapolation from the SKU-driven Furniture v1 proof
- a desire to future-proof the system before repeated evidence exists

None of those are strong enough on their own.

## What Keeps The Repo At Findings-Only / Planning-Only Posture

The repo should remain at findings-only / planning-only posture if:

- no new execution evidence is produced
- the current evidence still comes from one localized Cycle 4 continuity blocker
- the lighter remedies have not yet been pressure-tested even in planning terms
- the choice still depends more on structural preference than on earned empirical pressure

Under current repo-local truth, this is still the correct posture.

## Current Lean

The smallest honest current lean is:

- Option A deserves first consideration if a later v1.1-style decision is earned

That lean is narrow, not decisive.

It follows from current evidence only because:

- the blocker is local
- the graph did not fail
- the burden is continuity between two prompt artifacts, not general prompt-system management
- the repo has not yet earned a heavier structural move

That means the present note should be read as a restraint document, not as a pre-approval for change.
