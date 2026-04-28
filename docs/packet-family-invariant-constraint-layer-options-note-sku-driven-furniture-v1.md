# Packet / Family Invariant Constraint Layer Options Note // SKU-Driven Furniture v1

## Artifact Posture

This is an options note.

It is not a decision note, implementation plan, schema plan, or Airtable mutation plan.

It does **not** authorize schema mutation.
It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `slot_status` changes.
It does **not** authorize additional generation.
It does **not** authorize an architecture rewrite.

This note is bounded to SKU-driven Furniture v1 evidence.

## Why This Exists

PR #115 recorded the threshold finding from the `PKT-SKU-008` HERO prompt-invariant retry probe:

- isolated image quality improved
- set-level coherence did not resolve
- post-hoc prompt-only invariants on one slot were insufficient
- structural-options work is now earned

The core issue is that slot-level generation improves role fidelity, but set-level coherence appears to need a higher shared layer above individual slot prompts.

That layer must distinguish invariant constraints from slot-specific variation.

This note enumerates the option space.

It does not choose an option.

## Evidence Basis

The asset-family coherence pressure note recorded that slot-level generation improves role fidelity but does not automatically guarantee packet-level visual coherence.

It also pre-registered this reopen trigger:

- `prompt-only invariant construction fails to solve set coherence after a bounded retry`

The HERO prompt-invariant retry findings note recorded that the trigger fired on `PKT-SKU-008`.

Observed `PKT-SKU-008` state included:

- HERO gen 3: `attP6CD309BmYXxt0` / `Image_April_27_2026_3_10_AM.jpeg` / `1024 × 1536`
- HERO remained `needs_retry`
- PROFILE remained `needs_review`
- DETAIL remained `needs_review`
- no `generated_assets` records were created
- no schema mutation occurred

The visual assessment came from direct visual evidence surfaced in the control-surface thread, not Airtable metadata alone.

## Problem Statement

A set can contain role-fit images that fail as a coherent family.

Consistency cannot be reliably imposed by isolated slot prompts after the fact.

Shared invariants likely need to be defined before generation and composed into every slot prompt.

Slot-specific variants still need to remain legible.

Possible shared invariants include:

- product identity
- material rendering
- background / environment
- lighting
- color temperature
- shadow behavior
- camera language
- scale / proportion
- editorial tone
- visual-reference anchors

Possible slot-specific variation includes:

- HERO front three-quarter
- PROFILE side view
- DETAIL crop
- crop / angle / framing
- detail emphasis

## Option A // Shared Packet-Level Invariant Prompt Block

Add or maintain a shared packet-level invariant block.

Manually or programmatically compose that block into each slot prompt before generation.

No new table is required initially.

Strengths:

- cheapest next probe
- keeps schema stable
- directly tests whether pre-composition is stronger than post-hoc HERO-only invariants

Limits:

- may remain too text-dependent
- may not preserve visual identity without references
- can become duplicated prompt text if not formalized

Best use:

- next minimal probe before schema expansion

## Option B // Existing Constraint Rules As Shared Invariant Carriers

Represent shared invariants through existing `constraint_rules`.

Link the same constraints into packet / slot prompt composition.

Strengths:

- uses existing table
- keeps invariants structured as constraints
- supports priority / active status

Limits:

- may overload `constraint_rules`
- current rules may not distinguish packet / family invariants from general product / brand constraints
- visual style consistency may need richer structure than rule text

Best use:

- when shared invariants are mostly textual governance constraints

## Option C // Packet / Family Invariant Field Or Record Layer

Add an explicit packet-level or family-level invariant layer.

That layer could be a field, linked record, or future table.

It would capture invariants once and compose them into all slots.

Strengths:

- makes the coherence layer first-class
- separates shared invariants from slot variation
- supports future family-level review

Limits:

- schema mutation is not yet authorized
- may be premature if a text-level pre-composition probe is enough
- needs clear boundary from `asset_family` / reuse / derivative work

Best use:

- if Option A proves useful but too implicit or duplicated

## Option D // Visual Reference Anchor Set

Use one or more visual references as the set / family anchor.

References could carry product identity, lighting, material, camera, and background behavior.

Strengths:

- likely stronger for visual coherence than text alone
- aligns with commercial creative workflows
- may reduce subjective drift across slot generations

Limits:

- reference provenance and role must be governed
- Airtable attachment / URL durability remains unresolved
- reference use still needs textual constraints around allowed variation

Best use:

- paired with Option A or C, not as a standalone schema decision

## Option E // Asset Family / Reuse Group Layer

Introduce a future `asset_family`, `reuse_group`, or similar structure.

The family layer would govern multiple slots and possibly multiple packets / SKUs / variants.

Strengths:

- strongest long-term structure for reuse, variants, derivatives, and colorways
- aligns with leverage / pickup pressure

Limits:

- likely premature from one packet's coherence failure
- risks bundling set coherence with reuse / derivative lineage too early
- should wait for stronger reuse or second-packet evidence unless ASK explicitly chooses the larger arc

Best use:

- later if coherence pressure recurs or reuse / variant pressure becomes load-bearing

## Option F // Generation Attempts / Generation Plan Layer

Distinguish raw attempts from accepted outputs.

Preserve prompt, inputs, image output, and evaluation per attempt.

Strengths:

- improves provenance and retry history
- may support evaluation discipline

Limits:

- does not itself create coherence
- remains separate from the invariant-layer problem
- could distract from the immediate structural question

Best use:

- later if attempt history becomes load-bearing

## Option Comparison

| Option | Cheapest Next Probe | Schema Burden | Coherence Strength | Reuse / Variant Readiness | Premature Hardening Risk |
| --- | --- | --- | --- | --- | --- |
| A. Shared packet-level invariant prompt block | High | Low | Medium | Low | Low |
| B. Existing constraint rules as carriers | Medium | Low to medium | Medium | Medium | Medium |
| C. Packet / family invariant field or record layer | Medium | Medium | Medium to high | Medium | Medium |
| D. Visual reference anchor set | Medium | Medium | High | Medium | Medium |
| E. Asset family / reuse group layer | Low | High | High | High | High |
| F. Generation attempts / generation plan layer | Low | High | Low by itself | Medium | Medium |

No final option is chosen here.

Option A is the lightest way to test whether the failure was caused by post-hoc one-slot prompt construction rather than by text-only invariants as a whole.

Option D may become important if text alone cannot carry visual identity across slots.

Options C, E, and F should remain available, but each adds structural weight that this single packet does not yet require by itself.

## Bounded Recommendation

The lightest honest next probe appears to be Option A, possibly paired with Option D.

That would mean:

- compose a shared packet-level invariant block into all three slot prompts before generation
- run a new bounded packet / slot set only if authorized
- preserve schema until the pre-composed invariant approach is tested

This is a recommendation, not a decision.

It does not authorize generation, mutation, or schema work.

## What This Does Not Establish

- no schema decision
- no implementation plan
- no Airtable mutation
- no new table decision
- no `generated_assets` capture mechanic
- no `slot_status` update
- no final `asset_family` doctrine
- no cross-mode generalization
- no claim that visual references are mandatory
- no claim that prompt-only approaches are impossible when applied before generation

## Out Of Scope

- creating fields / tables
- configuring Airtable AI field agents
- generation invocation
- `generated_assets` creation
- `generated_assets` linking
- changing `slot_status`
- capturing or accepting HERO / PROFILE / DETAIL
- `architecture.md` rewrite
- milestone updates
- `PKT-SKU-007` backfill

## Next Decision Point

The next decision is whether to run a minimal pre-composed shared invariant prompt probe before schema mutation.

Possible next artifacts after this options note:

- structural decision note choosing the next probe path
- implementation plan if ASK chooses a bounded Airtable mutation / probe
