# Pre-Composed Shared Invariant Prompt Probe Plan // SKU-Driven Furniture v1

## Artifact Posture

This is an implementation / probe plan.

It is not an execution record, findings note, options note, decision note, schema plan, or Airtable mutation record.

It does **not** authorize Airtable mutation.
It does **not** authorize prompt-field mutation.
It does **not** authorize generation invocation.
It does **not** authorize schema mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `generated_assets` linking.
It does **not** authorize `slot_status` changes.
It does **not** authorize generated image capture.

It defines the exact proposed probe shape to be separately authorized later.

## Why This Exists

PR #115 showed that post-hoc HERO-only prompt invariants improved standalone quality but failed set-level coherence.

PR #116 opened the options space for packet / family invariant constraint layering.

PR #117 chose the minimal next probe direction:

- pre-composed shared packet-level invariant block carried into all slot prompts before generation

This plan turns that chosen direction into an exact bounded probe plan without executing it.

## Current Verified / Expected Airtable Targets

The current target surface must be verified again before any later mutation.

Base:

- `asset-pipeline-ASK // SKU-Driven Furniture v1`
- base id: `appoqJ25B6w4vSuX9`

Table:

- `output_slots`

Target records:

- `SLOT-PKT-SKU-008-HERO` // `rec1TDGeMSPsSZwiC` // field: `slot_prompt`
- `SLOT-PKT-SKU-008-PROFILE` // `recNFWC3oZ35v3rhU` // field: `slot_prompt`
- `SLOT-PKT-SKU-008-DETAIL` // `rec6mKAGyY4WuKsu4` // field: `slot_prompt`

Current statuses expected before probe:

- HERO = `needs_retry`
- PROFILE = `needs_review`
- DETAIL = `needs_review`

Current raw generated output counts expected before probe:

- HERO has 3 attachments in `slot_generated_image_v1`
- PROFILE has 1 attachment in `slot_generated_image_v1`
- DETAIL has 1 attachment in `slot_generated_image_v1`

Current `generated_assets` expected before probe:

- no `generated_assets` links for these `PKT-SKU-008` output slots

Live Airtable verification is required before any later mutation.

## Probe Objective

The probe tests whether a shared packet-level invariant prompt block, composed into all three slot prompts before generation, produces stronger set-level coherence than the prior post-hoc HERO-only invariant retry.

Success is not merely three attractive images.

Success requires the three outputs to read as one governed asset family while preserving slot-specific roles.

## Shared Packet-Level Invariant Block

Proposed shared invariant block:

```text
SHARED PACKET / FAMILY INVARIANTS // PKT-SKU-008

Generate this image as one member of the same three-image product asset family for the Placeholder Sculpted Upholstered Dining Chair.

All slots must preserve the same product identity: a fully upholstered dining chair with a softly curved continuous back, slim seat cushion, restrained commercial proportions, refined legs, and quiet premium material presence.

All slots must share the same visual system: warm neutral woven upholstery, consistent upholstery tone and texture, the same low-sheen dark wood or dark metal leg finish, a calm warm-neutral studio world, soft controlled studio lighting, controlled floor-contact shadows, restrained architectural editorial tone, and consistent product scale.

Variation is allowed only where required by slot role:
- HERO = full-chair front three-quarter product view
- PROFILE = full-chair side / profile product view
- DETAIL = close crop of material, construction, back curve, cushion edge, seam behavior, or leg joinery

Do not allow background color, lighting temperature, product proportions, leg geometry, upholstery tone, upholstery texture, camera language, shadow behavior, or editorial styling to drift between slots.

Do not treat each output as a new chair, new studio, new campaign, or new style direction.

Avoid rustic farmhouse, cottage, country, bohemian, colorful retro-pop, atomic novelty, ornate hotel-luxury, glossy glam styling, cheap generic catalog styling, cluttered room scenes, lifestyle narrative, decorative props, extra furniture, visible labels, and unsupported brand cues.
```

## Planned Prompt Mutation // HERO

If later separately authorized, replace `SLOT-PKT-SKU-008-HERO.slot_prompt` with this exact text:

```text
Create the HERO image for the Placeholder Sculpted Upholstered Dining Chair.

Use the linked product image as the product-truth anchor.

SHARED PACKET / FAMILY INVARIANTS // PKT-SKU-008

Generate this image as one member of the same three-image product asset family for the Placeholder Sculpted Upholstered Dining Chair.

All slots must preserve the same product identity: a fully upholstered dining chair with a softly curved continuous back, slim seat cushion, restrained commercial proportions, refined legs, and quiet premium material presence.

All slots must share the same visual system: warm neutral woven upholstery, consistent upholstery tone and texture, the same low-sheen dark wood or dark metal leg finish, a calm warm-neutral studio world, soft controlled studio lighting, controlled floor-contact shadows, restrained architectural editorial tone, and consistent product scale.

Variation is allowed only where required by slot role:
- HERO = full-chair front three-quarter product view
- PROFILE = full-chair side / profile product view
- DETAIL = close crop of material, construction, back curve, cushion edge, seam behavior, or leg joinery

Do not allow background color, lighting temperature, product proportions, leg geometry, upholstery tone, upholstery texture, camera language, shadow behavior, or editorial styling to drift between slots.

Do not treat each output as a new chair, new studio, new campaign, or new style direction.

Avoid rustic farmhouse, cottage, country, bohemian, colorful retro-pop, atomic novelty, ornate hotel-luxury, glossy glam styling, cheap generic catalog styling, cluttered room scenes, lifestyle narrative, decorative props, extra furniture, visible labels, and unsupported brand cues.

SLOT-SPECIFIC VARIATION // HERO

Generate one clean full-chair front three-quarter product presentation.

The full chair should be clearly visible and centered as the primary product subject.

Show enough angle to reveal the curve of the back, seat volume, leg stance, and overall silhouette.

The image must read as the HERO member of the same product asset family as the PROFILE and DETAIL slots, not as a separate product rendering.

Output intent: one hero_front_three_quarter image for SLOT-PKT-SKU-008-HERO only.
```

## Planned Prompt Mutation // PROFILE

If later separately authorized, replace `SLOT-PKT-SKU-008-PROFILE.slot_prompt` with this exact text:

```text
Create the PROFILE image for the Placeholder Sculpted Upholstered Dining Chair.

Use the linked product image as the product-truth anchor.

SHARED PACKET / FAMILY INVARIANTS // PKT-SKU-008

Generate this image as one member of the same three-image product asset family for the Placeholder Sculpted Upholstered Dining Chair.

All slots must preserve the same product identity: a fully upholstered dining chair with a softly curved continuous back, slim seat cushion, restrained commercial proportions, refined legs, and quiet premium material presence.

All slots must share the same visual system: warm neutral woven upholstery, consistent upholstery tone and texture, the same low-sheen dark wood or dark metal leg finish, a calm warm-neutral studio world, soft controlled studio lighting, controlled floor-contact shadows, restrained architectural editorial tone, and consistent product scale.

Variation is allowed only where required by slot role:
- HERO = full-chair front three-quarter product view
- PROFILE = full-chair side / profile product view
- DETAIL = close crop of material, construction, back curve, cushion edge, seam behavior, or leg joinery

Do not allow background color, lighting temperature, product proportions, leg geometry, upholstery tone, upholstery texture, camera language, shadow behavior, or editorial styling to drift between slots.

Do not treat each output as a new chair, new studio, new campaign, or new style direction.

Avoid rustic farmhouse, cottage, country, bohemian, colorful retro-pop, atomic novelty, ornate hotel-luxury, glossy glam styling, cheap generic catalog styling, cluttered room scenes, lifestyle narrative, decorative props, extra furniture, visible labels, and unsupported brand cues.

SLOT-SPECIFIC VARIATION // PROFILE

Generate one clean full-chair side / profile product view.

The chair should be shown from the side enough to make the back angle, seat depth, leg stance, silhouette, and overall product profile easy to judge.

Keep the full product visible. Do not crop into a detail view.

The image must read as the PROFILE member of the same product asset family as the HERO and DETAIL slots, not as a separate product rendering.

Output intent: one profile_side image for SLOT-PKT-SKU-008-PROFILE only.
```

## Planned Prompt Mutation // DETAIL

If later separately authorized, replace `SLOT-PKT-SKU-008-DETAIL.slot_prompt` with this exact text:

```text
Create the DETAIL image for the Placeholder Sculpted Upholstered Dining Chair.

Use the linked product image as the product-truth anchor.

SHARED PACKET / FAMILY INVARIANTS // PKT-SKU-008

Generate this image as one member of the same three-image product asset family for the Placeholder Sculpted Upholstered Dining Chair.

All slots must preserve the same product identity: a fully upholstered dining chair with a softly curved continuous back, slim seat cushion, restrained commercial proportions, refined legs, and quiet premium material presence.

All slots must share the same visual system: warm neutral woven upholstery, consistent upholstery tone and texture, the same low-sheen dark wood or dark metal leg finish, a calm warm-neutral studio world, soft controlled studio lighting, controlled floor-contact shadows, restrained architectural editorial tone, and consistent product scale.

Variation is allowed only where required by slot role:
- HERO = full-chair front three-quarter product view
- PROFILE = full-chair side / profile product view
- DETAIL = close crop of material, construction, back curve, cushion edge, seam behavior, or leg joinery

Do not allow background color, lighting temperature, product proportions, leg geometry, upholstery tone, upholstery texture, camera language, shadow behavior, or editorial styling to drift between slots.

Do not treat each output as a new chair, new studio, new campaign, or new style direction.

Avoid rustic farmhouse, cottage, country, bohemian, colorful retro-pop, atomic novelty, ornate hotel-luxury, glossy glam styling, cheap generic catalog styling, cluttered room scenes, lifestyle narrative, decorative props, extra furniture, visible labels, and unsupported brand cues.

SLOT-SPECIFIC VARIATION // DETAIL

Generate one close, commercially useful detail image focused on material character or construction.

Prioritize upholstery texture, the curve and thickness of the back, seam behavior, cushion edge, leg joinery, or the transition between upholstered body and leg finish.

The image should read as a detail crop from the same chair and same studio system as the HERO and PROFILE slots, not as a separate product or separate style direction.

Output intent: one detail_crop image for SLOT-PKT-SKU-008-DETAIL only.
```

## Slot Prompt Composition Shape

Each target `slot_prompt` should preserve a legible two-part composition if a later mutation is authorized.

Shared section:

- the exact shared packet / family invariant block above

Slot-specific section:

- existing or revised slot-specific prompt language for the target slot
- explicit slot role
- slot-specific framing / crop / view instruction

The slot-specific section should not restate the shared invariant block differently per slot.

The shared block should remain identical across HERO, PROFILE, and DETAIL for this probe.

## Supporting Visual Reference Discipline

Option D is allowed only as supporting discipline.

Existing visual references may be used only if they are already available or can be used without schema mutation.

This plan does not authorize:

- adding visual-reference fields
- creating a visual-reference table
- uploading new references
- changing attachment provenance
- changing Airtable AI field-agent configuration

If visual references are used later, their role should be recorded as supporting evidence / input discipline, not as a chosen standalone schema layer.

## Non-Actions

This probe plan explicitly does not include:

- `generated_assets` creation
- `generated_assets` linking
- `slot_status` changes
- schema mutation
- field creation
- field deletion
- AI field-agent configuration
- `slot_generated_image_v1` cleanup
- attachment deletion
- generated image capture
- accepting HERO / PROFILE / DETAIL
- rejecting HERO / PROFILE / DETAIL
- `PKT-SKU-007` backfill

## Expected Observations

Across separately authorized mutation and generation stages, later records should capture as applicable:

- whether all three prompts contain the identical shared invariant block
- whether slot-specific instructions remain distinct and legible
- whether generation appends new raw outputs to `slot_generated_image_v1`
- whether HERO, PROFILE, and DETAIL preserve their slot roles
- whether the generated set reads as one governed asset family
- whether style proximity improves without object-family coherence
- whether object-family coherence improves materially
- whether visual references were used
- whether any unexpected Airtable UI or field-agent behavior occurs

## Visual Review Requirement

Set-level review must be based on direct visual evidence surfaced in the control-surface thread, not Airtable metadata alone.

Review should compare the generated outputs for:

- product identity
- material rendering
- upholstery tone and texture
- leg geometry and finish
- product proportions
- lighting temperature
- background / environment
- shadow behavior
- camera language
- editorial tone
- slot-role fidelity

The review should distinguish:

- isolated image quality
- role fidelity
- style proximity
- object-family coherence
- governed set coherence

## Success / Failure Classes

Pre-registered outcome classes for the future findings note:

- Success: all three generated outputs preserve slot roles and read as one coherent product asset family.
- Partial success: role fit holds and style proximity improves, but product identity, geometry, material rendering, or studio system still drifts.
- Failure: outputs remain attractive in isolation but fail set-level coherence.
- Inconclusive: generation or visual evidence is insufficient to judge.

## Forward / Reopen Triggers

The future findings note should reconcile the observed result against the pre-registered outcome classes above.

If the one-pass pre-composed shared invariant prompt probe fails set-level coherence, do not continue prompt-only retries by default.

Possible earned follow-up arcs if failure or partial success occurs:

- visual-reference anchoring becomes more strongly earned as a next probe path
- Option C // packet / family invariant field or record layer may become more strongly earned if duplicated prompt text proves useful but too implicit
- `asset_family`, `asset_applications`, or `generation_attempts` schema work remains deferred unless reuse, derivative, capture, or attempt-history pressure becomes independently load-bearing

## Later Airtable Mutation Shape // If Separately Authorized

Protected mutation sequence:

1. Verify current Airtable state.
2. Update exactly three `slot_prompt` fields:
   - HERO
   - PROFILE
   - DETAIL
3. Verify all three updated prompts.
4. Stop.

Terminal stop point:

- `slot_prompt fields updated only`

Non-actions:

- no generation
- no `slot_status` changes
- no `generated_assets` creation
- no `generated_assets` links
- no schema mutation
- no field creation
- no field deletion
- no AI field-agent configuration
- no output-slot link mutation
- no generated image capture
- no repo mutation during Airtable execution

Expected observation:

- all three slot prompts carry the same shared packet / family invariant block
- each slot also preserves explicit slot-specific variation
- no generated outputs are created by prompt mutation alone

## Later Generation Shape // If Separately Authorized After Prompt Mutation

Generation must be separately authorized after prompt fields are updated.

Generation will likely require manual Airtable UI invocation because the connector cannot invoke Airtable AI image-generation field agents.

Generate HERO, PROFILE, and DETAIL after the shared block has been applied to all three prompts.

Expected attachment counts after generation, if append behavior holds:

- HERO: 3 -> 4
- PROFILE: 1 -> 2
- DETAIL: 1 -> 2

Bounded generation scope:

- one generation pass across the three target slots: HERO, PROFILE, and DETAIL
- no additional retry generation after that pass without a stop-and-review decision
- if the one-pass set still fails set-level coherence, do not continue prompt-only retries by default

Terminal stop point:

- `generation invoked / outputs appended or invocation failure reported`

Non-actions:

- no `slot_status` change
- no `generated_assets` creation
- no `generated_assets` linking
- no schema mutation
- no capture mechanic decision
- no acceptance / rejection decision

## Future Execution Record Requirements

If either protected action is later executed, the execution record should include:

- verification timestamp / context
- verified target records
- verified pre-state statuses
- verified pre-state attachment counts
- exact fields mutated
- exact non-actions
- generation invocation notes, if authorized
- post-state attachment counts
- generated attachment IDs and filenames
- visual review basis
- terminal state

## Boundaries / Non-Claims

- no Airtable mutation authorized
- no prompt-field mutation authorized
- no generation invocation authorized
- no schema mutation authorized
- no `generated_assets` creation authorized
- no `generated_assets` linking authorized
- no `slot_status` update authorized
- no generated image capture authorized
- no capture-mechanics decision
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no final schema doctrine
- no production-readiness claim
- no cross-mode generalization

## Next Artifact

If ASK chooses to proceed, the next artifact should be a separately authorized execution record or findings note only after the live Airtable probe is explicitly authorized and performed.

This plan alone is not sufficient authorization to perform the probe.
