# Packet / Family Invariant Constraint Layer Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

It chooses the next probe direction only.

It is not a schema decision, implementation plan, Airtable mutation plan, generation plan, capture-mechanics decision, or architecture rewrite.

It does **not** authorize Airtable mutation.
It does **not** authorize schema mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `slot_status` changes.
It does **not** authorize generation invocation.
It does **not** authorize generated image capture.

This note is bounded to SKU-driven Furniture v1 evidence.

## Why This Exists

PR #115 documented the threshold finding that post-hoc prompt-only invariants improved HERO standalone quality but failed set-level coherence.

PR #116 opened the options space for shared packet / family invariant constraint layering.

The repo now needs a narrow decision about the next probe path, not a schema leap.

The purpose is to decide the smallest honest next step that tests whether pre-composed shared invariants can carry set coherence before creating new schema.

## Evidence Basis

Slot-level generation improved role fidelity.

HERO gen 3 proved that a one-slot post-hoc invariant block was insufficient.

The options note identified Option A as the lightest next probe and Option D as potentially important.

Current bounded state:

- no `generated_assets` records have been created for `PKT-SKU-008`
- HERO remains `needs_retry`
- PROFILE remains `needs_review`
- DETAIL remains `needs_review`
- no capture mechanic has been chosen
- no schema mutation has occurred

## Decision

Decision:

- choose Option A // Shared Packet-Level Invariant Prompt Block as the next probe path

Allowed supporting discipline:

- Option D // Visual Reference Anchor Set may support the probe only if existing visual references are already available or can be used without schema mutation

The next probe should test pre-composition of shared invariants into all slot prompts before generation.

The shared invariant block should be authored once, then carried into HERO, PROFILE, and DETAIL prompts.

Slot-specific prompt sections should remain separate and explicit.

The probe should not add a new table or field yet.

The probe should not choose `asset_family`, `asset_applications`, or `generation_attempts`.

## Rationale

Option A is the lightest honest test because it directly addresses the failure mode: post-hoc HERO-only invariants.

It avoids prematurely hardening schema from one packet's coherence failure.

It preserves the distinction between shared invariants and slot-specific variation.

It gives the repo a clean before / after comparison:

- post-hoc one-slot invariants
- pre-composed all-slot invariants

Option D may improve visual coherence, but it should not become a standalone schema choice yet.

## Required Probe Shape If Later Authorized

If a later probe is separately authorized, its conceptual shape should be:

- create or identify one shared invariant block for the packet / set
- compose that invariant block into all three slot prompts
- preserve separate slot-specific variation sections
- generate a new bounded set only after separate Airtable authorization
- evaluate set-level coherence from direct visual evidence
- leave `generated_assets` and `slot_status` untouched unless separately authorized

The separate slot-specific variation sections should include:

- HERO front three-quarter
- PROFILE side view
- DETAIL crop

## What This Decision Does Not Authorize

- Airtable mutation
- prompt field mutation
- generation invocation
- schema mutation
- field creation
- field deletion
- AI field-agent configuration
- `generated_assets` creation
- `generated_assets` linking
- `slot_status` update
- accepting or rejecting HERO / PROFILE / DETAIL
- generated image capture
- `architecture.md` rewrite
- milestone update
- `PKT-SKU-007` backfill

## What This Decision Does Not Establish

- no final schema doctrine
- no cross-mode generalization
- no claim that text-only invariants will solve coherence
- no claim that visual references are mandatory
- no `asset_family` decision
- no `asset_applications` decision
- no `generation_attempts` decision
- no `generated_assets` capture mechanic
- no production-readiness claim

## Out Of Scope

- implementation plan details
- exact Airtable field writes
- exact prompt text
- image generation
- capture mechanics
- lifecycle status transitions
- reuse / derivative / colorway schema

## Next Artifact

The next repo artifact, if ASK chooses to proceed, should be a bounded implementation / probe plan for the pre-composed shared invariant prompt probe.

That plan should define exact Airtable records, fields, mutations, non-actions, expected observations, terminal stop point, and visual-review requirement before any mutation occurs.
