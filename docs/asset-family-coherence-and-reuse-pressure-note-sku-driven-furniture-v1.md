# Asset-Family Coherence And Reuse Pressure Note // SKU-Driven Furniture v1

## Artifact Posture

This is a pressure note.

It is not a decision note.

It is not a schema plan.

It is not an implementation plan.

It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `slot_status` updates.
It does **not** establish final schema doctrine.

## Evidence Basis

PR #108 landed the Airtable slot-level generation schema-fit note.

PR #109 landed the generated-assets promotion-boundary structural decision note.

PR #110 landed the output-slot status lifecycle structural decision note.

`PKT-SKU-008` showed that slot-level generation can generate HERO, PROFILE, and DETAIL at their own slots.

After review, HERO was visually warmer / more beige than PROFILE and DETAIL.

HERO was regenerated once.

The regenerated HERO moved closer but still remained insufficiently consistent with PROFILE and DETAIL.

HERO gen 1:

- `attBhsY0LAnmaPXMT`
- `Image_April_26_2026_7_18_PM.jpeg`

HERO gen 2:

- `attRUdOsChonSc1fb`
- `Image_April_26_2026_11_49_PM.jpeg`

HERO gen 1 was previously recorded in PR #108's schema-fit note; this pressure note adds HERO gen 2 to the same evidence trail.

PROFILE:

- `attz3KHWORLJ3KMKB`
- `Image_April_26_2026_7_29_PM.jpeg`

DETAIL:

- `attkOBU15YchOTlra`
- `Image_April_26_2026_7_36_PM.jpeg`

Visual consistency observation is based on direct visual evidence surfaced in the control-surface thread, not connector metadata.

## Core Pressure

Slot-level generation improves role fidelity.

Slot-level generation does not automatically guarantee packet-level visual coherence.

A coherent output set requires more than each slot satisfying its individual role.

The set must read as one consistent family unless the style guide intentionally specifies differences.

## Cross-Slot Consistency Pressure

HERO / PROFILE / DETAIL may each satisfy role intent but still fail as a coherent set.

Consistency can include:

- product color
- material rendering
- lighting
- background
- crop
- camera angle
- shadow behavior
- scale
- propping
- editorial tone

Some differences may be intentional if defined by style guide or slot rules.

The architecture needs a way to distinguish intentional slot variation from accidental drift.

## `generated_assets` Mapping And Capture-Mechanics Pressure

`generated_assets` should not be assumed to be 1:1 with `output_slots`.

Simple cases may be:

- 1 `output_slot` -> 1 `generated_asset`

Retry cases may be:

- 1 `output_slot` -> multiple `generated_assets`, such as rejected candidate and accepted candidate

Leverage / pickup cases may be:

- multiple `output_slots` -> 1 `generated_asset`

Derivative cases may require:

- source asset -> derivative asset relationships

`output_slots.slot_generated_image_v1` currently stores raw slot-level generated attachments.

`slot_generated_image_v1` can append multiple raw attempts in the same field.

`generated_assets` currently carries asset-level metadata and uses `asset_uri` as a URL field.

The current schema does not yet cleanly define how a specific attachment from `slot_generated_image_v1` is promoted into a `generated_assets` record.

This is a capture-mechanics pressure, not a solved implementation.

Possible capture mechanics, not chosen:

### A. `generated_assets.asset_uri` Points To The Airtable Attachment URL

Limitation:

- raw Airtable attachment URLs have already surfaced safety / durability / connector limitations

### B. `generated_assets` Gains Its Own Attachment Field And The Selected Slot Image Is Copied / Attached There

Limitation:

- duplicates files and requires explicit capture mechanics

### C. `generated_assets` Links Back To `output_slot` And Preserves `source_attachment_id` / filename / lookup metadata Without Duplicating The File

Limitation:

- may be weaker for downstream delivery / export and still requires attachment-level provenance

## Leverage Pickups

In physical photography, leveraged pickups avoided duplicate capture and duplicate processing.

Example:

- the same detail shot may serve multiple rug sizes

In genAI, marginal generation cost is lower, but duplicate generation still creates consistency risk.

Reuse remains valuable for visual truth, coherence, and governance.

The pressure here is that the architecture likely needs to represent one asset satisfying multiple output obligations across related SKUs / packets / variants.

## Colorway / Derivative Pressure

In physical workflows, one approved asset could act as donor for colorway changes or Frankenstein modifications.

In genAI workflows, it may be more efficient to generate multiple assets from relevant product inputs.

But consistency still requires shared constraints across:

- background
- propping
- camera
- lighting
- crop
- composition
- scale
- editorial tone

Colorway and variant workflows therefore require distinguishing invariant constraints from variant constraints.

Invariant constraints are what must stay the same across a family.

Variant constraints are what is allowed or required to change per SKU, colorway, size, material, finish, or product truth.

## Constraint Modularity Pressure

Constraints may need to be modularized across:

- slot
- packet
- product family
- SKU variant / colorway
- reuse group
- derivative asset family

This note does not decide whether that becomes tables, fields, linked records, a future `asset_family` layer, or a `generation_attempts` extension.

## Possible Future Response Directions, Not Chosen

- better invariant prompt construction before schema change
- prompt templates that carry shared packet / family constraints into every slot prompt
- `asset_applications` table mapping one asset to many output obligations
- `source_asset` / `derivative_asset` relationship on `generated_assets`
- `asset_family` or `reuse_group` identifier
- `reuse_type` field such as `original` / `reused` / `derivative` / `colorway_variant` / `crop_variant`
- `invariant_constraints` and `variant_constraints` representation
- packet-level coherence review field or gate
- `generation_attempts` layer that distinguishes attempts from captured assets

Prompt engineering may solve part of the immediate consistency problem.

Schema may still be needed if reuse, derivative lineage, or family-level governance becomes load-bearing.

This note chooses neither.

## Boundaries / Non-Claims

- no Airtable mutation authorized
- no `generated_assets` creation authorized
- no `slot_status` update authorized
- no schema change authorized
- no decision about `asset_applications`
- no decision about source / derivative asset relationships
- no decision about colorway-generation workflow
- no final schema claim
- no production-readiness claim
- no cross-mode generalization
- no screenshots or generated images committed

## Reopen Triggers

- a second packet or mode shows the same cross-slot consistency issue
- leveraged pickup / multi-SKU reuse becomes required in the Airtable prototype
- a colorway or variant test requires shared visual constraints across multiple generated outputs
- `generated_assets` needs to map one asset to multiple output obligations
- slot-level accepted outputs still fail packet-level coherence
- downstream delivery requires asset-family or derivative lineage
- prompt-only invariant construction fails to solve set coherence after a bounded retry

## Next Questions

- How should packet-level set coherence be represented?
- When is variation between slots intentional vs drift?
- Is set coherence primarily a prompt-engineering problem, a schema problem, or both?
- Should `generated_assets` support many-to-many output-slot applications?
- Should source / derivative relationships live on `generated_assets`?
- Do colorways need invariant and variant constraint layers?
- Does this pressure earn a future `asset_family` or `asset_applications` layer?
- What capture mechanic should preserve the exact attachment promoted from `slot_generated_image_v1` into `generated_assets`?
