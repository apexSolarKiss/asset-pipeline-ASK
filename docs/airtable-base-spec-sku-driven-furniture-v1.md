# Airtable Base Spec // SKU-Driven Furniture v1

## Companion Artifacts

- [`docs/airtable-build-plan-sku-driven-furniture-v1.md`](airtable-build-plan-sku-driven-furniture-v1.md)
- [`docs/airtable-base-configuration-sku-driven-furniture-v1.md`](airtable-base-configuration-sku-driven-furniture-v1.md)

## Purpose

This document records one narrow execution proof for the current repo-local model: an Airtable base spec for the most elaborated current workflow track, `SKU-driven product imagery` in the placeholder furniture context.

Its purpose is not to settle the repository's architecture, schema, or future system shape. Its purpose is to pressure-test what the smallest honest record graph looks like once the repo is forced below planning-level abstractions and into one concrete implementation surface.

## Why This Proof Exists Now

The repository has deliberately stayed above implementation for most of its current life. That restraint has been useful because the shared model, seam boundaries, and cross-mode differences were not yet stable enough to justify concrete build decisions.

An Airtable build changes the pressure. Once the repo is asked to support a real base, the question is no longer only whether the abstractions are legible in prose. The question becomes what minimum set of records, links, statuses, and generated views can preserve the seam model without collapsing into one clever spreadsheet.

This is therefore a reopen condition triggered by execution pressure, not by completeness pressure.

SKU-driven furniture is the right first proof because it is the most elaborated current track and the least likely to force fake symmetry across the other workflow modes before the repo has earned that move.

## What This Spec Is And Is Not

This spec is:

- a narrow v1 execution proof
- a concrete schema-pressure test of the current abstractions
- specific to the SKU-driven placeholder furniture context
- intentionally provisional

This spec is not:

- a generalized multi-mode schema
- the final system architecture
- runtime or orchestration closure
- a claim that Airtable is the permanent home of the model
- a claim that the repo's full three-layer model is now settled

## Minimal Record Graph

The smallest honest record graph for this proof is:

- `products`
- `constraint_rules`
- `reference_assets`
- `workflow_packets`
- `seam_runs`
- `generated_assets`
- `review_gates`

That graph is meant to preserve the repo's current seam boundaries, record-carrying burden, and SKU-driven constraint layering without introducing a more elaborate object model than this first proof requires.

This v1 proof intentionally compresses the fuller furniture constraint layering described elsewhere in the repo. Brand-wide, category-level, product-class-level, and SKU-specific burden are not yet fully structurally distinguished here. That is a deliberate narrowing for the first proof, not a claim that the fuller layering question is now settled.

## Tables

### `products`

Purpose:
Carry SKU-driven product truth for one governed item.

Primary key:
- `sku_key`

Core fields:
- `sku_key`
- `product_name`
- `category`
- `product_class`
- `material_notes`
- `finish_notes`
- `identifying_details`
- `product_status`

Field type posture:
- source facts: `product_name`, `category`, `product_class`, `material_notes`, `finish_notes`, `identifying_details`
- constraint fields: none beyond the carried product truth itself in v1
- generated fields: optional display label only if needed for usability

### `constraint_rules`

Purpose:
Carry the governing rules that later work must remain within, with scope expressed explicitly as records rather than only as prose folded into packet fields.

Primary key:
- `constraint_key`

Core fields:
- `constraint_key`
- `scope_type`
- `scope_value`
- `rule_type`
- `rule_text`
- `priority`
- `active_status`

Field type posture:
- source facts: none required in v1
- constraint fields: `scope_type`, `scope_value`, `rule_type`, `rule_text`, `priority`, `active_status`
- generated fields: none required in v1

### `reference_assets`

Purpose:
Carry linked evidence and approved references that function as inputs or as constraint carriers for the packet.

Primary key:
- `reference_key`

Core fields:
- `reference_key`
- `constraint_key` -> linked to `constraint_rules`
- `reference_role`
- `asset_uri`
- `reference_note`

Field type posture:
- source facts: `asset_uri`, `reference_note`
- constraint fields: `reference_role`
- generated fields: none required in v1

### `workflow_packets`

Purpose:
Carry the ingest-facing packet for one SKU-driven asset request.

Primary key:
- `packet_key`

Core fields:
- `packet_key`
- `sku_key` -> linked to `products`
- `business_intent`
- `creative_intent`
- `constraint_keys` -> linked to `constraint_rules`
- `approved_reference_keys` -> linked to `reference_assets`
- `bounded_creative_discretion`
- `required_output_set`
- `packet_status`

Field type posture:
- source facts: `business_intent`, `creative_intent`
- constraint fields: `constraint_keys`, `approved_reference_keys`, `bounded_creative_discretion`, `required_output_set`
- generated fields: none required in v1

### `seam_runs`

Purpose:
Carry the current deterministic seam records without collapsing them into one generic workflow row.

Primary key:
- `seam_run_key`

Core fields:
- `seam_run_key`
- `packet_key` -> linked to `workflow_packets`
- `seam_name`
- `status`
- `input_references`
- `output_references`
- `notes`
- `run_timestamp`

Allowed `seam_name` values:
- `ingest_validation`
- `transformation_check`
- `output_validation`
- `release_readiness`

Field type posture:
- source facts: `input_references`, `output_references`, `notes`
- constraint fields: `seam_name`
- generated fields: `run_timestamp`

### `generated_assets`

Purpose:
Carry governed outputs and candidate assets without making review artifacts structurally primary.

Primary key:
- `asset_key`

Core fields:
- `asset_key`
- `packet_key` -> linked to `workflow_packets`
- `source_seam_run_key` -> linked to `seam_runs`
- `asset_role`
- `asset_uri`
- `governed_output_status`
- `review_artifact_flag`

Field type posture:
- source facts: `asset_role`, `asset_uri`
- constraint fields: `governed_output_status`, `review_artifact_flag`
- generated fields: none required in v1

### `review_gates`

Purpose:
Carry the one approval-facing gate without turning approval into automation.

Primary key:
- `gate_key`

Core fields:
- `gate_key`
- `packet_key` -> linked to `workflow_packets`
- `release_readiness_run_key` -> linked to `seam_runs`
- `gate_status`
- `gate_notes`
- `review_board_reference`

Field type posture:
- source facts: `gate_notes`, `review_board_reference`
- constraint fields: `gate_status`
- generated fields: none required in v1

## Primary Keys And Links

The key linked-record relationships in this proof are:

- one `product` to many `workflow_packets`
- one `product` to many `constraint_rules` where scope is SKU-specific
- one `constraint_rule` to many `reference_assets`
- one `workflow_packet` to many `constraint_rules`
- one `workflow_packet` to many `reference_assets`
- one `workflow_packet` to many `seam_runs`
- one `workflow_packet` to many `generated_assets`
- one `workflow_packet` to zero or one `review_gate`
- one `release_readiness` seam run to zero or one `review_gate`

This is intentionally narrower than a generalized asset pipeline graph. It is just enough linkage to preserve SKU truth, explicit constraint carriage, approved references, packet scope, seam progression, governed outputs, and one approval-facing gate.

## Status Enums

The minimum status enums in this proof are:

- `products.product_status`
  - `draft`
  - `approved_source`
  - `retired`

- `constraint_rules.active_status`
  - `active`
  - `inactive`

- `constraint_rules.scope_type`
  - `product`
  - `category`
  - `product_class`
  - `brand_context`

- `constraint_rules.rule_type`
  - `hard_requirement`
  - `fidelity_rule`
  - `presentation_rule`
  - `output_requirement`

- `reference_assets.reference_role`
  - `constraint_carrier`
  - `approved_directional_reference`
  - `supporting_input`

- `workflow_packets.packet_status`
  - `draft`
  - `ready_for_ingest`
  - `in_verification`
  - `blocked`
  - `release_ready`

- `seam_runs.status`
  - `pending`
  - `completed`
  - `failed`

- `generated_assets.governed_output_status`
  - `candidate`
  - `governed_output`
  - `rejected`

- `review_gates.gate_status`
  - `not_ready`
  - `ready_for_review`
  - `returned`
  - `approved`

These enums are not a universal status system. They are the minimum explicit commitments needed for this v1 proof.

## Source Facts vs Constraints vs Generated Fields

This proof should keep three kinds of fields distinct.

First, source facts are facts and approved references that enter the base from outside the generated workflow. Product identity, material notes, finish notes, approved references, and declared business or creative intent belong here.

Second, constraint fields carry what later work must remain within. In this proof, that burden is carried first-class through `constraint_rules`, then linked into `workflow_packets` and `reference_assets`. Scope, rule type, rule text, bounded creative discretion, required output expectations, seam identity, and release-readiness gate status belong here.

Third, generated fields record the outputs of work performed inside the workflow. Seam outputs, governed output status, asset URIs, and any timestamped run records belong here.

The point of that distinction is to keep the base from collapsing source truth, governing bounds, approved evidence, and workflow results into one flat record.

## Seam Mapping

The current deterministic seam chain maps into the base as follows:

- `ingest_validation`
  - validates that a `workflow_packet` is sufficiently declared to enter the chain
  - produces a `seam_run` with ingest-facing input references

- `transformation_check`
  - records one bounded stage transition against the packet
  - may produce candidate `generated_assets`

- `output_validation`
  - determines whether acceptable `governed_outputs` exist for the packet
  - updates candidate assets into governed outputs or rejects them

- `release_readiness`
  - determines whether the packet is ready to cross the approval-facing boundary
  - may create or update the packet's single `review_gate`

This mapping preserves the repo's seam asymmetry instead of turning the base into one monolithic production-status table.

## One Revision Loop

This v1 proof should support one narrow revision loop:

1. `output_validation` fails because candidate assets are not sufficient as governed outputs.
2. the packet remains open and a new `transformation_check` seam run is added against the same `workflow_packet`.
3. new candidate assets are linked to that later transformation run.
4. `output_validation` runs again against the same packet.

That is enough revision structure for the first proof. The base does not need generalized branching, parallel scenario trees, or multi-packet program management in v1.

## One Release-Readiness Gate

This proof should support one release-readiness gate per `workflow_packet`.

That gate exists to record bounded readiness to present for approval. It does not automate approval policy, and it does not imply a more complex governance subsystem than this first proof requires.

## What This Proof Does Not Settle

This spec does not yet exercise prompt composition from layered constraints. The current record graph is the first schema-pressure test, not yet the full wedge test. Once this graph is in place, the next pressure is whether prompt composition from layered constraints can be carried cleanly without collapsing the seam model.

This proof does not settle:

- the repo's full multi-mode schema
- the final universal-schema versus workflow-stream versus brand-overlay model
- generalized inheritance logic
- runtime or orchestration behavior
- whether Airtable is the long-term system surface
- richer revision graphs, branching review flows, or program-level planning structures

The strongest honest claim here is narrower: the repo's current abstractions are now being pressure-tested against one concrete Airtable base design in the most elaborated current mode, and this v1 spec is the minimum record graph that appears worth testing first.
