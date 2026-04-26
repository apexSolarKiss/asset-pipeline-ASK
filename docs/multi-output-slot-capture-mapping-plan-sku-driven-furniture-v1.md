# Multi-Output Slot Capture-Mapping Plan // SKU-Driven Furniture v1

## Artifact Posture

This is a capture-mapping plan.

It defines the handoff between generation output, `generated_assets`, and `output_slots`.

It does **not** authorize generation.
It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `generated_assets` / `output_slots` linking.
It does **not** authorize `slot_status` updates.
It does **not** authorize prompt-composition redesign.
It does **not** authorize prototype buildout.

It does not include screenshots or image files.

## Grounding

The Gate 6 plan chose:

- Pattern C: capture-mapping plan before generation

The output-side thread is artifact-complete through the implementation execution record.

Current repo-recorded state:

- `output_slots` schema exists
- three `PKT-SKU-007` output slot records exist
- `SLOT-PKT-SKU-007-HERO` exists
- `SLOT-PKT-SKU-007-PROFILE` exists
- `SLOT-PKT-SKU-007-DETAIL` exists
- all three slots are status `planned`
- no `generated_assets` are linked
- no generation rerun has happened

Gate 6 generation execution remains unauthorized.

## Conceptual Split

This plan treats three sub-questions separately.

### 1. Capture Mechanism

How does a generated image output become a `generated_assets` record?

### 2. Mapping Mechanism

How does a `generated_assets` record attach to the correct `output_slot`?

### 3. Integration

How do capture and mapping work together end-to-end without collapsing expected obligation and actual asset identity?

The distinction matters because `output_slots` represent expected obligations before generation, while `generated_assets` represent actual generated / captured assets after generation.

## Architectural Directions

### Direction 1: `output_slots` Consume `live_generated_image_v1` Output

Meaning:

- `live_generated_image_v1` remains the existing generation / capture surface
- generated image output is interpreted after capture
- `generated_assets` records are manually or procedurally created from the returned attachment / output
- `generated_assets` are then mapped to `output_slots`

Pros:

- preserves current generation surface
- smaller execution change
- easier to compare against prior `PKT-SKU-007` behavior

Cons:

- mapping may remain manual or interpretive
- `live_generated_image_v1` remains packet-level
- risks preserving some old single-field ambiguity unless capture mapping is strict

### Direction 2: `output_slots` Drive A New Generation Surface

Meaning:

- each `output_slot` becomes the invocation unit
- generation is role-specific from the start
- generated output is captured per slot rather than interpreted after a packet-level run

Pros:

- cleaner slot-driven invocation
- stronger alignment with first-class expected obligations
- less risk of collapsing all roles into one packet-level result

Cons:

- requires more execution-surface change
- may require field-agent changes or additional Airtable setup
- heavier than current evidence may justify before one capture-mapping proof

## Direction Decision

Chosen capture-mapping direction:

- Direction 1 now: `output_slots` consume `live_generated_image_v1` output through explicit post-generation capture mapping

Rationale:

- it preserves the existing generation surface for the first Gate 6 proof
- it avoids adding another execution-surface change before capture mapping is understood
- it lets the project test whether slot-aware mapping can make the existing packet-level output legible
- it keeps Direction 2 available later if Direction 1 proves insufficient

Required caveat:

- Direction 1 must not allow generated output to count as slot fulfillment automatically
- every mapping from `live_generated_image_v1` output to `generated_assets` to `output_slots` must be explicit and reviewable

## Capture Mechanism

In a future execution plan, an image returned through `live_generated_image_v1` should become a `generated_assets` record only through an explicit capture step.

Planned `generated_assets` values / concepts:

### `asset_key`

The `asset_key` should be explicit and tied to packet, role, and attempt.

Examples:

- `GA-PKT-SKU-007-HERO-A1`
- `GA-PKT-SKU-007-PROFILE-A1`
- `GA-PKT-SKU-007-DETAIL-A1`

### `packet_key`

The `packet_key` should link to:

- `PKT-SKU-007`

### `source_seam_run_key`

Leave `source_seam_run_key` unset unless a relevant `seam_run` is created or reused in a future execution plan.

Do not create `seam_runs` in this capture-mapping plan.

### `asset_role`

The `asset_role` should mirror or derive from `expected_output_role` when role assignment is clear.

Examples:

- `hero_front_three_quarter`
- `profile_side`
- `detail_crop`
- `unmapped_candidate` if role assignment is unclear

### `asset_uri`

The `asset_uri` should capture generated attachment / file URI or an approved asset location if available.

If `live_generated_image_v1` only stores attachment data and no durable URI is available, future execution must record how `asset_uri` is populated or leave it explicitly unresolved.

### `governed_output_status`

The `governed_output_status` should start as:

- `candidate`

Do not mark an asset as `governed_output` without evaluation.

### `review_artifact_flag`

The `review_artifact_flag` should remain false unless the asset is explicitly only a review artifact.

### `output_slot`

The `output_slot` link should be set only after mapping determination is made.

## Mapping Mechanism

Each `generated_assets` record should attach to an `output_slot` only through explicit mapping.

Mapping should be based on:

- `expected_output_role`
- visual / content interpretation of generated output
- generated output prompt role, if role-specific prompt was used
- explicit human / control-surface judgment where needed

Mapping rules:

- if generated output clearly matches one expected slot, link `generated_assets.output_slot` to that slot
- if generated output is ambiguous between slots, do not link it automatically
- if generated output is ambiguous, use `asset_role = unmapped_candidate` or equivalent and record ambiguity
- if generated output matches `profile_side`, do not let it satisfy `hero_front_three_quarter` or `detail_crop`
- if no output exists for a slot, leave that slot without `generated_assets`
- if no output exists for a slot, keep status `planned` or change to `missing` only if a future execution plan explicitly authorizes status updates
- do not update `slot_status` in this mapping plan
- status transitions belong to a future execution plan

## Integration Sequence

A future capture-mapped Gate 6 execution sequence should be:

1. Verify `PKT-SKU-007` and its three `output_slots`.
2. Verify `live_generated_image_v1` current state.
3. Run or inspect generation only under a future approved execution plan.
4. For each generated image, determine candidate role.
5. Create `generated_assets` record with `asset_key`, `packet_key`, `asset_role`, `asset_uri` if available, and `governed_output_status = candidate`.
6. Link `generated_assets.output_slot` only when mapping is clear.
7. Verify each `output_slot` has zero or more `generated_assets`.
8. Stop before `slot_status` transitions unless explicitly authorized.
9. Record evidence in a Gate 6 execution record.
10. Interpret evidence in a Gate 6 findings note.

This sequence is planned only.

It is not executed here.

## Criteria Preservation

### Whether each `output_slot` can be addressed before generation

Capture mapping can preserve this criterion by requiring every future generation or inspection step to identify the relevant expected slot before output is evaluated.

If execution uses a packet-level generation call, this remains partly unresolved because the invocation itself may not be slot-specific.

The future Gate 6 execution plan must preserve this as an unresolved risk if it chooses a packet-level call.

### Whether generated output can be attached to the correct `output_slot`

Capture mapping addresses this by requiring an explicit `generated_assets.output_slot` link only after role determination.

This remains unresolved when the generated image role is visually ambiguous.

### Whether `generated_assets` records are needed for each output

Capture mapping treats `generated_assets` as the actual asset surface for captured outputs.

The future execution plan should test whether every generated image needs a `generated_assets` record before it can be evaluated against a slot.

### Whether `slot_status` transitions can be used without lifecycle ambiguity

Capture mapping alone cannot resolve this fully.

The implementation plan already flagged lifecycle ambiguity in `slot_status`.

The future Gate 6 execution plan must preserve this as an unresolved risk and must not update `slot_status` unless that action is explicitly authorized.

### Whether missing outputs can remain explicit as planned or missing

Capture mapping can preserve missing outputs by leaving slots without linked `generated_assets`.

Changing a missing slot from `planned` to `missing` requires explicit authorization in a future execution plan.

### Whether profile output can be linked without falsely satisfying hero/detail slots

Capture mapping directly addresses this criterion by requiring role-specific mapping and by forbidding a `profile_side` output from satisfying `hero_front_three_quarter` or `detail_crop`.

### Whether no generation result should ever be treated as fulfillment unless slot mapping is explicit

Capture mapping directly addresses this criterion.

No generated result should count as slot fulfillment unless a `generated_assets` record exists and is explicitly linked to the relevant `output_slot`.

## Likely Failure Modes

- `live_generated_image_v1` produces one image again
- generated image role is ambiguous
- generated image does not correspond to any seeded slot
- generated output cannot be converted into a durable `asset_uri`
- `generated_assets` record can be created but cannot be confidently linked to an `output_slot`
- `slot_status` lifecycle remains ambiguous
- `generated_assets` / `output_slot` links work technically but evidence remains visually ambiguous
- image-fidelity judgment requires direct visual evidence in chat, not Airtable record truth alone

## Required Next Artifact

The next artifact should be:

- `docs/multi-output-slot-generation-execution-plan-sku-driven-furniture-v1.md`

The execution plan should later decide:

- whether to use one packet-level generation rerun or one generation attempt per slot
- what exact Airtable actions are authorized
- whether `generated_assets` records may be created
- whether `slot_status` may be updated
- how visual evidence will be surfaced for judgment
- what gates and stop points govern execution
- what execution record and findings note will follow

## Out Of Scope

This capture-mapping plan does not authorize:

- generation rerun
- Airtable schema mutation
- `generated_assets` creation
- `output_slots` updates
- `slot_status` updates
- `generated_assets` / `output_slot` linking
- changes to `live_generated_image_v1`
- changes to `composed_prompt_output`
- changes to `product_image_lookup`
- prompt-composition redesign
- prototype buildout
- cross-mode claims
- generalized output doctrine
- screenshots or image files

It also does not authorize rerunning:

- `PKT-SKU-003`
- `PKT-SKU-007`

## Conclusion

- chosen capture-mapping direction: Direction 1 now, `output_slots` consume `live_generated_image_v1` output through explicit post-generation capture mapping
- capture mechanism: generated image output may become `generated_assets` only through an explicit future capture step
- mapping mechanism: `generated_assets.output_slot` may be linked only when role mapping is clear and reviewable
- generation authorized: no
- `generated_assets` creation authorized: no
- `output_slot` linking authorized: no
- next artifact: multi-output slot generation execution plan
- future execution must be gated, recorded, and followed by findings
