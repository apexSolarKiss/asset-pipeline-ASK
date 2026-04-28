# HERO Prompt-Invariant Retry Probe Findings // SKU-Driven Furniture v1

## Artifact Posture

This is a findings note.

It is not an options note, decision note, schema plan, or implementation plan.

It is an evidence-chain artifact, not a navigation artifact.

It does **not** authorize Airtable mutation.
It does **not** authorize additional generation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `slot_status` updates.
It does **not** establish final schema doctrine or generalized cross-mode doctrine.

## Why This Exists

This probe marks a major threshold in the bounded SKU-driven Furniture v1 output-slot chain.

The repo exists to test whether structured information architecture can produce quality and consistency at scale, not whether an image model can produce a visually pleasing isolated image.

`PKT-SKU-008` already showed that slot-level generation improves role fidelity.

This probe shows that role fidelity and isolated image quality are not enough to guarantee set-level coherence.

A model can generate a plausible or beautiful image in isolation while the asset set still fails as a governed family.

That failure is the architectural pressure this repo exists to make visible.

This threshold is bounded to SKU-driven Furniture v1 evidence only.

## Evidence Context

PR #108 landed the slot-level generation schema-fit note.

PR #109 landed the generated-assets promotion-boundary decision.

PR #110 landed the output-slot status lifecycle decision.

PR #111 landed the asset-family coherence and reuse pressure note.

The asset-family coherence pressure note pre-registered the reopen trigger:

- `prompt-only invariant construction fails to solve set coherence after a bounded retry`

## Probe Definition

This probe was performed manually in the Airtable UI after PR #114.

Target:

- `SLOT-PKT-SKU-008-HERO` (`rec1TDGeMSPsSZwiC`)

Field updated:

- `slot_prompt`

Status:

- HERO `slot_status` remained `needs_retry`

Mutation:

- revised HERO prompt added a `PACKET-LEVEL SET INVARIANTS` block referencing PROFILE and DETAIL as provisional visual-family anchors

Generation invocation:

- manual Airtable UI generation, separately authorized

Bounded retry threshold pre-defined:

- one prompt-invariant retry was authorized as the bounded retry
- more than two prompt-only retries would require separate justification and would exceed the bounded prompt-only retry posture

Coupling note:

- `SLOT-PKT-SKU-008-PROFILE` (`recNFWC3oZ35v3rhU`) remained at `slot_status = needs_review` with one attachment, `attz3KHWORLJ3KMKB`
- `SLOT-PKT-SKU-008-DETAIL` (`rec6mKAGyY4WuKsu4`) remained at `slot_status = needs_review` with one attachment, `attkOBU15YchOTlra`
- PROFILE and DETAIL are not `accepted`
- they were used as provisional visual-family anchors
- if either is later rejected, the HERO prompt-invariant reference may need to be revised or invalidated

## What Was Tested Vs What Was Not Tested

What was tested:

- post-hoc prompt-only invariant construction on the HERO slot only
- revised HERO prompt referenced PROFILE and DETAIL as provisional visual-family anchors
- manual Airtable UI generation appended HERO gen 3 to the same attachment field

What was not tested:

- pre-composed shared invariant layer across all slots before generation
- structural representation of packet / family invariants
- visual-reference anchoring as a shared layer
- schema support for asset family, reuse group, variant constraints, or generation attempts

## Observed Result

Airtable post-state:

- `SLOT-PKT-SKU-008-HERO.slot_generated_image_v1` count went from 2 to 3 attachments

New attachment:

- `attP6CD309BmYXxt0`
- filename: `Image_April_27_2026_3_10_AM.jpeg`
- dimensions: `1024 × 1536`
- classification: HERO gen 3 / prompt-invariant retry probe

Prior attachments preserved:

- `attRUdOsChonSc1fb` (`gen 2`)
- `attBhsY0LAnmaPXMT` (`gen 1`)

Other observed Airtable state:

- `slot_status` remained `needs_retry`
- no `slot_status` changes were made
- no `generated_assets` records were created for `PKT-SKU-008`
- no `generated_assets` links were created
- no capture mechanic was chosen
- no schema mutation occurred

Visual-evidence observations below are based on direct visual evidence surfaced in the control-surface thread, not Airtable metadata alone:

- HERO gen 3 was a cleaner, calmer standalone product image than gen 1 or gen 2
- HERO gen 3 was less beige-rustic than prior attempts
- HERO gen 3 still did not visually cohere with PROFILE and DETAIL as a governed asset family
- the mismatch was not just orientation; the prompt did not specify left- vs right-facing
- the deeper mismatch was that HERO appeared like a different product rendering / studio setup; proportions and silhouette did not lock to sibling outputs; upholstery tone and lighting were closer but not identical; leg stance and object geometry did not feel governed by a shared asset identity

The bounded result is:

- the probe improved style proximity, not object-family coherence

## Reopen Trigger Fired

The asset-family coherence pressure note pre-registered the reopen trigger:

- `prompt-only invariant construction fails to solve set coherence after a bounded retry`

That trigger has now fired.

Per the pre-registered reopen-trigger discipline, structural-options work around shared invariant / variant constraint layering is now earned.

Earned does **not** mean authorized.

Explicit authorization is still required for any subsequent options note, decision note, or schema mutation.

## Interpretation

Post-hoc prompt-invariant injection on one slot is insufficient to create set coherence on this bounded probe.

The observed failure is not a failure of slot-level generation role fit by itself.

True coherence likely requires a shared packet-level or family-level invariant layer that is composed into every slot prompt before generation, possibly supported by visual references.

This is consistent with the asset-family coherence pressure note's enumeration of possible future responses, but this probe alone does not select among them.

The threshold crossed here is bounded:

- in this SKU-driven Furniture v1 packet, slot-level generation now appears to need a higher-order coherence layer above individual slot prompts

## Boundaries / Non-Claims

- no Airtable mutation authorized
- no `generated_assets` creation authorized
- no `slot_status` update authorized
- no schema change authorized
- no `generated_assets.governed_output_status` lifecycle decision
- no claim that structural-options work is authorized; only that it is earned
- no final schema claim
- no production-readiness claim
- no cross-mode generalization
- no claim that a particular invariant-layer architecture is correct
- no claim that PROFILE and DETAIL are accepted; they remain `needs_review`
- no screenshots or generated images committed to the repo

## Out Of Scope

This findings note does not authorize:

- structural-options note authoring
- decision-note authoring
- schema mutation
- new tables, fields, lookups, or AI field-agent configuration
- continued HERO retries
- `generated_assets` capture mechanics decision
- `generated_assets.governed_output_status` lifecycle decision
- README updates
- architecture rewrites
- milestone file changes
- `PKT-SKU-003` work
- `PKT-SKU-007` backfill

Separate explicit authorization would still be required for any of those.

## Reopen And Forward Triggers

The next earned, but not authorized, artifact is a structural-options note around shared invariant / variant constraint layering for multi-slot generation coherence.

Additional triggers for later artifacts:

- a second packet exhibits the same set-coherence failure under any new approach
- a colorway or variant test surfaces invariant / variant constraint pressure
- a leveraged-pickup case surfaces multi-slot reuse pressure
- visual-reference anchoring becomes load-bearing for any new probe
- prompt-only retries beyond two on any slot occur without explicit justification

## Next Questions

- What does a shared invariant constraint layer look like in this prototype?
- Where should it live: separate field, separate table, computed prompt, or visual-reference set?
- How should invariant vs variant constraints be distinguished?
- Should visual references be part of the layer?
- Does this earn an `asset_family` or `asset_applications` table, a packet-level invariant block, or shared prompt construction only?
- What relationship does this layer have to `generated_assets` and `generation_attempts`?
