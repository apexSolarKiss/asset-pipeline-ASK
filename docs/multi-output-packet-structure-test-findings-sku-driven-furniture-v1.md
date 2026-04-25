# Multi-Output Packet Structure Test Findings // SKU-Driven Furniture v1

## Purpose

This is a findings note only.

It applies the bounded no-mutation structure test defined in:

- `docs/multi-output-packet-structure-test-plan-sku-driven-furniture-v1.md`

This note does **not** authorize implementation.
It does **not** authorize Airtable mutation.
It does **not** authorize schema creation.
It does **not** authorize image generation.

The multi-output generation / capture decision note remains in force unless this findings note concludes that a design trigger likely fired.

Even if this findings note concludes that a design trigger likely fired, Airtable should not be mutated immediately.

The next artifact would need to be an implementation plan or narrower structural decision note.

## Evidence Source

This findings note uses `PKT-SKU-007` only.

The preserved evidence is:

- fresh product / fresh packet / clean first-pass run
- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character
- those three views formed the required output set
- Airtable produced one generated image
- the generated image corresponded most closely to the profile / side supporting view
- hero and detail crop were missing
- outcome pressure: `fresh-run counter-pressure`

## Test Application

The bounded test question was:

- can a multi-output SKU-driven packet preserve a three-view output obligation from planning through generation / capture / evaluation using current packet and `generated_assets` concepts, or does it require first-class expected output slots

The same three representations were evaluated:

- Representation A: current packet-only structure
- Representation B: current packet plus `generated_assets` interpretation
- Representation C: explicit expected-output-slot structure

The same trigger-bearing and descriptive criteria were applied to all three.

Descriptive criteria are useful, but they do not by themselves fire a design trigger unless they expose failure in a trigger-bearing criterion.

## Representation A

Current packet-only structure.

### Structure

The three-view obligation lives in `workflow_packets.required_output_set` and `workflow_packets.composed_prompt_output`.

Captured results live back on the packet-level generation/capture surface.

The main ambiguity is that the packet can declare a three-view burden, but it does not appear to turn that burden into separately addressable units.

### Trigger-Bearing Criteria

- separately addressed before generation: weak
- separately evaluated after generation: weak
- governed-output status attaches to the right unit: weak
- downstream destination mapping distinguishes hero / profile / detail: weak
- expected output slot distinguished from actual generated asset: weak
- packet remains legible without relying on prompt text alone: weak

Why this result is weak:

- the three-view burden is declared, but it remains mostly packet-level and prompt-level
- the packet can say that three views are owed, but it does not appear to name three separately governable units
- once only one image returns, the packet can record incompleteness, but it does not clearly localize hero, profile, and detail as separate governable targets

### Descriptive Criteria

- missing hero view recorded without ambiguity: partial
- missing detail crop recorded without ambiguity: partial
- retries or appended outputs avoid corrupting asset identity: weak

These descriptive weaknesses matter, but they only support trigger pressure because they expose failure in the trigger-bearing unit-of-governance problem.

## Representation B

Current packet plus `generated_assets` interpretation.

### Structure

The three-view obligation still begins at the packet level, while `generated_assets` is treated as the adjacent conceptual surface for expected roles and later captured assets without adding new fields.

Captured results would live across `workflow_packets` plus linked `generated_assets`.

The main ambiguity is that this representation improves proximity to actual assets, but it still blurs expected output obligation versus actual captured asset.

### Trigger-Bearing Criteria

- separately addressed before generation: partial
- separately evaluated after generation: partial
- governed-output status attaches to the right unit: partial
- downstream destination mapping distinguishes hero / profile / detail: partial
- expected output slot distinguished from actual generated asset: weak
- packet remains legible without relying on prompt text alone: partial

Why this result is only partial:

- `generated_assets` is adjacent to the right problem because it is asset-facing
- that helps with actual captured-result interpretation more than Representation A does
- but without additional structure, the representation still does not clearly show whether the unit is an expected role, an actual generated asset, or a mixed role-plus-asset record

That unresolved distinction is load-bearing.

If the same conceptual surface must carry both obligation and artifact without explicitly separating them, the three-view burden remains structurally blurred.

### Descriptive Criteria

- missing hero view recorded without ambiguity: partial
- missing detail crop recorded without ambiguity: partial
- retries or appended outputs avoid corrupting asset identity: partial-to-weak

These descriptive results are better than packet-only interpretation in the narrow sense that actual assets are more visible.

They are still not clean enough to resolve the trigger-bearing distinction between what is owed and what was actually produced.

## Representation C

Explicit expected-output-slot structure.

### Structure

The three-view obligation lives in first-class expected output slots that exist before generation as explicit hero / profile / detail obligations.

Captured results live as actual generated assets after generation.

The main ambiguity is lower because expected obligation and actual asset are treated as different conceptual units.

### Trigger-Bearing Criteria

- separately addressed before generation: strong
- separately evaluated after generation: strong
- governed-output status attaches to the right unit: strong
- downstream destination mapping distinguishes hero / profile / detail: strong
- expected output slot distinguished from actual generated asset: strong
- packet remains legible without relying on prompt text alone: strong

Why this result is stronger:

- each expected view can exist as its own obligation before generation
- each returned asset can be evaluated against a specific obligation after generation
- governed-output status can attach to the relevant unit without collapsing expectation and artifact into the same ambiguous layer

This is structurally cleaner.

That does **not** mean it is already chosen or authorized.

### Descriptive Criteria

- missing hero view recorded without ambiguity: strong
- missing detail crop recorded without ambiguity: strong
- retries or appended outputs avoid corrupting asset identity: stronger in concept

This remains conceptual only.

It is not an implementation finding.

## Cross-Representation Reading

Representation A can declare the three-view burden, but it cannot preserve that burden cleanly enough as separately governable units.

Representation B improves connection to actual captured assets, but it still blurs expected output obligation versus actual generated asset.

Representation C resolves that distinction most cleanly at the conceptual level.

This does **not** make Representation C automatically correct in implementation terms.

It does mean A and B performed weakly enough on trigger-bearing criteria that the current packet-only and packet-plus-`generated_assets` concepts do not appear sufficient to preserve the three-view obligation cleanly from planning through capture and evaluation.

## Outcome Class

Recommended outcome class:

- `design trigger likely fired`

Why this outcome is the smallest honest reading:

- the test was applied to the same evidence source only
- Representation A failed multiple trigger-bearing criteria
- Representation B improved asset adjacency but still failed the key expected-slot-versus-actual-asset distinction
- those failures are not merely descriptive neatness problems
- they reach trigger-bearing questions around separate addressability, separate evaluability, governed-output attachment, downstream mapping, and packet legibility without prompt-text dependence

## Trigger Reading

The design trigger that likely fired is:

- `multi-output burden cannot be preserved from prompt to generated asset capture without slot-level representation`

This findings note does **not** say that only one implementation is possible.

It does say that current packet-only and packet-plus-`generated_assets` concepts do not appear structurally sufficient on the bounded `PKT-SKU-007` evidence.

## What This Does And Does Not Mean

This findings note does **not** authorize:

- immediate Airtable mutation
- schema creation
- implementation
- generalized output doctrine
- cross-mode conclusion

It does **not** prove a generalized system law.

It does **not** choose an exact schema implementation.

It does preserve a narrower finding:

- on this bounded structure test, current packet/generated-assets concepts do not preserve the three-view obligation cleanly enough under the trigger-bearing criteria

## Required Conclusion

- outcome class: `design trigger likely fired`
- design trigger likely fired: yes
- trigger likely fired: `multi-output burden cannot be preserved from prompt to generated asset capture without slot-level representation`
- no implementation is authorized by this findings note
- if the trigger fired, the next artifact should be an implementation plan or narrower structural decision note
- Airtable mutation remains out of scope until an implementation plan is approved
