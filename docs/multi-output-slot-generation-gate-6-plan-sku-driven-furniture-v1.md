# Multi-Output Slot Generation Gate 6 Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a Gate 6 plan.

It is not execution.
It is not a findings note.
It is not an implementation plan.

This plan does **not** authorize generation until reviewed and approved.
It does **not** authorize schema changes.
It does **not** authorize Airtable mutation outside the bounded generation / capture steps a later approved execution plan may define.
It does **not** authorize prompt-composition redesign.
It does **not** authorize prototype buildout.

## Grounding

The output-side thread is now artifact-complete through the execution record.

The current execution-time state recorded in the repo is:

- `output_slots` schema exists
- three `PKT-SKU-007` expected output-slot records exist
- `SLOT-PKT-SKU-007-HERO` exists
- `SLOT-PKT-SKU-007-PROFILE` exists
- `SLOT-PKT-SKU-007-DETAIL` exists
- all three are status `planned`
- no `generated_assets` are linked
- no generation rerun has happened

Gate 6 is required before any generation rerun or field-agent change.

The relevant source artifacts are:

- `docs/multi-output-slot-representation-structural-decision-note-sku-driven-furniture-v1.md`
- `docs/multi-output-slot-representation-implementation-plan-sku-driven-furniture-v1.md`
- `docs/multi-output-slot-representation-implementation-execution-record-sku-driven-furniture-v1.md`

## Test Question

The Gate 6 test question is:

- can the seeded `output_slots` structure preserve the three-view output burden through a bounded generation / capture pass, with expected obligations remaining separate from actual generated / captured assets

This plan distinguishes:

- `output_slots` = expected output obligations before generation
- `generated_assets` = actual generated / captured assets after generation
- `live_generated_image_v1` = existing Airtable image-generation / capture surface

## Planning Problem

Gate 6 must decide how generation should interact with `output_slots` without silently collapsing back into the old single-field packet-level burden.

The current repo-local record does not prove that `live_generated_image_v1` can natively write to `generated_assets` or `output_slots`.

That must be verified later before execution.

Any generated-image output should be treated as evidence requiring capture mapping.

It should not be treated as automatic fulfillment of an output slot.

The core problem is not only whether an image can be generated.

The core problem is whether a generated image can be captured as an actual asset and linked to the correct expected slot without confusing:

- what was owed
- what was produced
- which expected obligation the produced result may satisfy

## Gate 6 Invocation Patterns

### Pattern A: Single Packet-Level Generation Rerun

Run one packet-level generation attempt using the current `live_generated_image_v1` field, then manually evaluate whether `output_slots` can classify the returned result.

Potential value:

- smallest direct comparison against the original `PKT-SKU-007` failure mode
- uses the existing generation surface
- may show whether the current field still collapses a three-view burden into one image

Limit:

- risks repeating the original single-output ambiguity
- does not prove how a returned image becomes a `generated_assets` record
- does not prove how an actual asset links to the right `output_slot`
- may leave hero/profile/detail evaluation dependent on manual interpretation after the fact

Pattern A is not chosen as the Gate 6 direction.

It is structurally weaker than the current moment requires because the repo has already created expected output slots and now needs to preserve the slot-to-asset boundary through capture.

### Pattern B: One Generation Attempt Per Output Slot Role

Run one generation attempt per `output_slot` role using role-specific prompt text derived from each seeded slot.

Potential value:

- addresses each expected view before generation
- aligns better with the first-class slot direction than a single packet-level rerun
- may reduce the chance that one generation call collapses the three-view burden

Limit:

- still requires a clear capture mapping from generated image output to `generated_assets`
- still requires a clear link from each `generated_assets` record to the relevant `output_slot`
- may create role-specific generated outputs without proving the actual capture path

Pattern B remains a plausible future execution pattern.

It is not chosen as the immediate next step because capture mapping has not yet been defined tightly enough.

### Pattern C: Capture-Mapping Plan Before Generation

Do not run generation yet.

First create a narrow capture-mapping plan that defines how generated output should become `generated_assets` linked to `output_slots`.

Potential value:

- directly addresses the unproven handoff between `live_generated_image_v1`, `generated_assets`, and `output_slots`
- keeps expected obligations and actual assets separate before generation begins
- prevents generated-image output from being treated as slot fulfillment without explicit mapping
- lets a later generation execution test both generation and capture identity, not just image production

Limit:

- delays the generation rerun
- requires one additional planning artifact before live execution

Pattern C is chosen as the Gate 6 plan direction.

## Gate 6 Direction Decision

Chosen Gate 6 direction:

- Pattern C first: capture-mapping plan before generation

Rationale:

- `output_slots` now represent expected obligations, but no current artifact proves how generated image output should become `generated_assets` linked to slots
- running generation before defining capture mapping risks repeating the original single-output ambiguity
- Gate 6 should not only test image generation
- Gate 6 should test whether expected slots and actual assets remain separable through capture
- a capture-mapping plan can define how `live_generated_image_v1` output, `generated_assets` records, and `output_slots` links should relate before a generation call is made

This decision does not authorize generation.

This decision does not authorize Airtable mutation.

This decision only chooses the next planning artifact before Gate 6 execution.

## Required Next Artifact

The next artifact should be:

- `docs/multi-output-slot-capture-mapping-plan-sku-driven-furniture-v1.md`

That artifact should define the mapping between:

- generated image output from `live_generated_image_v1`
- actual `generated_assets` records
- expected `output_slots`
- any planned slot-status interpretation
- any required stop points before live generation

That artifact should not run generation by itself.

## Criteria For Future Gate 6 Generation Execution

Any future Gate 6 generation execution must test:

- whether each `output_slot` can be addressed before generation
- whether generated output can be attached to the correct `output_slot`
- whether `generated_assets` records are needed for each output
- whether `slot_status` transitions can be used without lifecycle ambiguity
- whether missing outputs can remain explicit as `planned` or `missing`
- whether profile output can be linked without falsely satisfying hero/detail slots
- whether no generation result should ever be treated as fulfillment unless slot mapping is explicit

These criteria should be preserved before any live execution.

They are the reason capture mapping needs to come before generation.

## Out Of Scope

This Gate 6 plan does not authorize:

- generation rerun
- Airtable schema mutation
- creation of `generated_assets` records
- linking `generated_assets` to `output_slots`
- updating `slot_status` values
- changing `live_generated_image_v1`
- changing `composed_prompt_output`
- changing `product_image_lookup`
- changing product records
- changing constraint records
- changing review gates
- prototype buildout
- cross-mode claims
- generalized output doctrine

It also does not authorize rerunning:

- `PKT-SKU-003`
- `PKT-SKU-007`

## Conclusion

- chosen Gate 6 direction: Pattern C first, capture-mapping plan before generation
- generation authorized: no
- capture mapping required before generation: yes
- next artifact: `docs/multi-output-slot-capture-mapping-plan-sku-driven-furniture-v1.md`
- future live execution must be gated and recorded
