# Generated-Assets Promotion-Boundary Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

It is not an implementation plan.

It is not an execution record.

It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `slot_status` changes.
It does **not** authorize schema changes.
It does **not** establish generalized cross-mode doctrine.

## Evidence Basis

PR #106 landed the `PKT-SKU-007` Gate 6 execution record and findings.

PR #108 landed the Airtable slot-level generation schema-fit note.

`PKT-SKU-007` showed packet-level generation plus post-hoc mapping pressure.

`PKT-SKU-008` repeated packet-level pressure:

- packet-level generation produced 2 images from a 3-slot obligation

`PKT-SKU-008` then showed slot-level generation across all three output slots:

- `SLOT-PKT-SKU-008-HERO` generated at hero slot
- `SLOT-PKT-SKU-008-PROFILE` generated at profile slot
- `SLOT-PKT-SKU-008-DETAIL` generated at detail slot

The schema-fit note intentionally left open when `slot_generated_image_v1` should be promoted / captured into `generated_assets`.

This note resolves that bounded structural question for SKU-driven Furniture v1 only.

## Bounded Four-Layer Model

For the bounded SKU-driven Furniture v1 prototype, the working four-layer model is now formalized as:

- `output_slots` = expected output obligations
- `slot_prompt` = slot-level generation instruction
- `slot_generated_image_v1` = raw slot-level generated output
- `generated_assets` = promoted / captured asset record for review, acceptance / rejection, evidence preservation, release-readiness, or delivery

This formalizes the working distinction for the bounded SKU-driven Furniture v1 prototype.

It does **not** claim `generated_assets` is obsolete.

It does **not** claim final schema doctrine across all modes.

## Problem Statement

Before slot-level generation, `generated_assets` had to carry identity, role classification, slot linkage, and governance state after packet-level images landed in a shared packet bucket.

After slot-level generation, the slot itself already carries:

- expected role
- slot prompt
- raw generated image

`generated_assets` no longer needs to solve the "which slot does this image belong to?" problem for raw slot-level output.

`generated_assets` still matters as a deliberate capture / governance / review / delivery surface.

## Options

### Option 0: Deprecate `generated_assets` Entirely

Governance and capture state would live directly on `output_slots`.

This option is rejected because it collapses raw generation, review, governance, and delivery identity into the slot record and loses an asset-level surface.

### Option A: Auto-Create `generated_assets` For Every `slot_generated_image_v1`

Every slot-level generated image immediately becomes a `generated_assets` record.

This option is rejected because it bloats `generated_assets` with raw experiments and collapses raw generation into asset capture too early.

### Option B-Strict: Capture Only Explicitly Selected Candidates

Only selected / promising images become `generated_assets`.

This option is rejected in this strict form because it may lose evidence-bearing rejected outputs.

### Option B-Evidence: Capture After Explicit Review / Capture Action

`generated_assets` is created only when a human or future process intentionally captures the raw slot image as selected, rejected, or evidence-bearing.

This supports review, acceptance / rejection, governance, release-readiness, and delivery while avoiding automatic capture of every raw generation.

### Option C: Capture Only Accepted / Governed Outputs

`generated_assets` would be created only once an output is accepted or governed.

This option is rejected because it removes the candidate-review layer and prevents rejected-but-informative outputs from becoming durable evidence.

### Option D: Keep `generated_assets` For Release / Delivery Only

`generated_assets` would exist only for downstream delivery or release-readiness.

This option is rejected because it is too late for review workflows and weakens candidate tracking.

### Option E: Auto-Create `generated_assets` But Rely On `governed_output_status` Lifecycle

Every raw slot output would become `generated_assets`, and `governed_output_status` would carry `candidate` / reviewed / accepted / rejected / governed meaning.

This option is rejected for now because it still auto-captures raw generation and turns `generated_assets` into a noisy run log unless a fuller `generation_attempts` layer exists.

## Decision

Decision:

- Option B-evidence: create `generated_assets` only after an explicit review / capture action

That means:

- do not create `generated_assets` automatically after every slot-level generation
- create `generated_assets` only when a raw slot-generated image is intentionally promoted / captured as selected, rejected, evidence-bearing, review-facing, release-ready, or delivery-relevant

The rule defines when capture is appropriate.

It does **not** authorize any particular `generated_assets` creation event.

Airtable mutation remains default-deny, and per-action authorization is still required.

## Existing SKU-007 `generated_assets`

Existing `PKT-SKU-007` `generated_assets` records should remain as historical candidate records created under the packet-level capture-mapping model.

Do not delete them.

Do not reinterpret them as errors.

They predate the slot-level generation distinction and should be read in that historical context.

Do not retroactively apply the new promotion boundary to mutate them.

The existing records are:

- `recwXYcPKGfiKNxlg` // `ASSET-PKT-SKU-007-GATE6-PROFILE-ATTEMPT1-attlBw4Dy4BiXm7sE`
- `recUhQzJCVVAVLGnx` // `ASSET-PKT-SKU-007-GATE6-DETAIL-ATTEMPT1-att0lOda5z2lEXR6m`

## PKT-SKU-008 Current State

`PKT-SKU-008` slot-level outputs exist in `slot_generated_image_v1`.

No `generated_assets` records have been created for those slot-level outputs.

That remains correct under the chosen boundary until explicit review / capture action occurs.

## `slot_status` Lifecycle

This decision does not decide `slot_status` lifecycle.

`slot_status` remains a separate lifecycle question.

Raw slot generation may eventually require a `slot_status` state such as `generated`, `ready_for_review`, or `needs_review`, but this note does not choose that.

`generated_assets` promotion boundary should not be used as a substitute for `slot_status` lifecycle design.

## Reopen Triggers

This decision may need to be revisited if:

- another mode outside SKU-driven Furniture v1 produces slot-level generation evidence that conflicts with this boundary
- asset-level governance becomes load-bearing for a downstream system
- a future `generation_attempts` layer is opened, making Option E newly viable
- a use case exposes need for asset-record state that does not fit B-evidence
- `slot_status` lifecycle decisions require different asset-capture timing

## Boundaries / Non-Claims

- no Airtable mutation authorized
- no `generated_assets` creation authorized
- no `slot_status` update authorized
- no schema change authorized
- no claim that `generated_assets` is obsolete
- no final schema claim
- no production-readiness claim
- no cross-mode generalization
- no screenshots or generated images committed

## Next Questions

- What review action or UI should trigger promotion into `generated_assets`?
- What fields should be copied from `output_slots` into `generated_assets` at capture time?
- Should `generated_assets` capture rejected outputs when evidence-bearing?
- Should `slot_status` gain a post-generation / review-ready state?
- Should a future `generation_attempts` layer absorb raw generation history?
