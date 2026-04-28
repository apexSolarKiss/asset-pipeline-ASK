# Pre-Composed Shared Invariant Prompt Probe Findings // SKU-Driven Furniture v1

## Artifact Posture

This is a findings note.

It is not a decision note, options note, schema plan, implementation plan, Airtable mutation plan, or generation plan.

It records the observed result of the bounded PR #118 probe.

It does **not** authorize Airtable mutation.
It does **not** authorize generation.
It does **not** authorize schema mutation.
It does **not** authorize `generated_assets` creation or linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize generated image capture.
It does **not** authorize additional retries.

This note is bounded to SKU-driven Furniture v1 and `PKT-SKU-008` evidence only.

## Why This Exists

PR #115 showed that post-hoc HERO-only prompt invariants improved standalone quality but did not solve set-level coherence.

PR #116 opened the packet / family invariant option space.

PR #117 chose Option A // Shared Packet-Level Invariant Prompt Block as the next probe path.

PR #118 defined exact shared-invariant prompt mutations and pre-registered success / failure classes.

This findings note records what happened when the shared invariant block was applied across HERO / PROFILE / DETAIL before one bounded generation pass.

## Probe Execution Summary

Target base:

- `asset-pipeline-ASK // SKU-Driven Furniture v1`
- base id: `appoqJ25B6w4vSuX9`

Table:

- `output_slots`

Target records:

- `SLOT-PKT-SKU-008-HERO` // `rec1TDGeMSPsSZwiC`
- `SLOT-PKT-SKU-008-PROFILE` // `recNFWC3oZ35v3rhU`
- `SLOT-PKT-SKU-008-DETAIL` // `rec6mKAGyY4WuKsu4`

Prompt mutation:

- HERO `slot_prompt` updated by connector
- DETAIL `slot_prompt` updated by connector
- PROFILE `slot_prompt` manually pasted in Airtable UI after connector write was blocked by tool safety checks

Generation:

- one manual Airtable UI generation pass across HERO / PROFILE / DETAIL

Expected append behavior:

- HERO: 3 -> 4
- PROFILE: 1 -> 2
- DETAIL: 1 -> 2

Observed from screenshot:

- append behavior appeared to hold
- no `generated_assets` links appeared populated in the `PKT-SKU-008` rows
- no `slot_status` mutation was observed in the visual evidence

No screenshots or generated images are committed to the repo.

## Evidence Basis

Visual observations are based on direct visual evidence surfaced in the control-surface thread:

- Airtable grid screenshot after generation
- new HERO image
- new PROFILE image
- new DETAIL image

Airtable metadata alone is not the basis for visual-quality or set-coherence claims.

## Pre-Registered Outcome-Class Reconciliation

PR #118 pre-registered these outcome classes:

- Success: all three generated outputs preserve slot roles and read as one coherent product asset family.
- Partial success: role fit holds and style proximity improves, but product identity, geometry, material rendering, or studio system still drifts.
- Failure: outputs remain attractive in isolation but fail set-level coherence.
- Inconclusive: generation or visual evidence is insufficient to judge.

Observed result:

- Partial success

Reason:

- HERO, PROFILE, and DETAIL preserve their slot roles.
- The set is materially more coherent than the prior HERO-only retry.
- Chair identity, upholstery tone, wood leg language, and material direction are much closer across the three outputs.
- The DETAIL crop reads plausibly as coming from the same chair family.
- HERO still does not perfectly align with PROFILE and DETAIL at the background / studio-plane level.
- The set improves from style proximity toward object-family coherence, but it does not yet justify a clean "fully governed asset family" success claim.

## Observed Visual Result

HERO is much closer than previous attempts and reads as the correct chair family.

PROFILE is role-fit and consistent with the shared material / leg language.

DETAIL is role-fit and materially coherent with the family.

Upholstery tone, texture, and wood finish are materially more consistent than before.

Slot roles are preserved.

Remaining drift is concentrated in background / studio-plane alignment and overall set polish.

The result is stronger than post-hoc HERO-only invariants, but it is not perfect.

## Interpretation

Pre-composed shared invariants across all slot prompts are materially stronger than post-hoc one-slot invariant injection.

The result supports the repo's thesis that set coherence depends on information architecture above the image model and above isolated slot prompts.

Manual duplication of the shared invariant block solved enough of the problem to validate the direction, but it also exposes a next structural pressure.

The shared invariant layer likely should be represented at a higher packet / family layer and pulled through dynamically into slot prompts, instead of being manually copied into each slot prompt.

This finding strengthens Option C // packet / family invariant field or record layer, but it does not authorize schema mutation.

Visual-reference anchoring remains available as a later probe path, but this result does not prove it is mandatory.

## What This Finding Does Not Authorize

- no Airtable mutation
- no additional generation
- no prompt retries
- no `generated_assets` creation
- no `generated_assets` linking
- no `slot_status` changes
- no schema mutation
- no field creation
- no field deletion
- no AI field-agent configuration
- no capture-mechanics decision
- no generated image capture
- no architecture rewrite
- no milestone update
- no `PKT-SKU-007` backfill

## What This Finding Does Not Establish

- no final schema doctrine
- no cross-mode generalization
- no proof that text-only invariants are always enough
- no proof that visual references are unnecessary
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no `generated_assets` capture mechanic
- no production-readiness claim

## Forward / Reopen Triggers

Because the result is Partial success, do not continue prompt-only retries by default.

A higher-layer invariant representation is now more strongly earned as an option to examine.

Option C // packet / family invariant field or record layer is more strongly earned because manual duplicated prompt text proved useful but too implicit / operationally brittle.

Visual-reference anchoring remains available if future probes show text-composed invariants cannot close the remaining drift.

The PROFILE prompt write also surfaced an Airtable connector pressure: the connector repeatedly blocked the exact PROFILE `slot_prompt` write while allowing HERO and DETAIL writes, requiring manual UI paste for PROFILE. This is distinct from already documented Airtable limitations around lookup-field creation, AI field-agent configuration, generation invocation, and raw attachment URL durability. It is not enough by itself to open tooling work, but it should remain visible as execution evidence if future prompt-field writes show similar connector fragility.

Asset-family, `asset_applications`, and `generation_attempts` schema work remain deferred unless reuse, derivative, capture, or attempt-history pressure becomes independently load-bearing.

## Recommended Next Artifact

The next repo artifact should likely be a narrow structural-options or decision note around how to represent shared invariants above slot prompts if ASK chooses to continue this chain.

Possible narrow next question:

- should the shared invariant block remain manual prompt text, move into a packet-level field, move into an existing `constraint_rules` pattern, or become a first-class packet / family invariant record?

This findings note itself does not choose that structure.
