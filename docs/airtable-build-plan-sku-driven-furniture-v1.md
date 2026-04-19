# Airtable Build Plan // SKU-Driven Furniture v1

## Purpose

This document is the operational build plan derived from [`docs/airtable-base-spec-sku-driven-furniture-v1.md`](airtable-base-spec-sku-driven-furniture-v1.md).

It exists to turn the proof spec into a concrete Airtable build sequence without widening the build into a generalized multi-mode rollout.

## Scope Of The v1 Build

This build is intentionally narrow.

It covers only the SKU-driven placeholder furniture proof and only the minimum Airtable structure needed to instantiate the record graph, wire the seams, and run one bounded manual cycle.

This build does not settle:

- cross-mode rollout
- generalized inheritance
- runtime automation design
- prompt-composition behavior beyond what the record graph must carry

## Preconditions

Before building the base:

- the current proof spec is treated as the governing schema-pressure document
- one narrow SKU-driven furniture packet is available for manual test use
- one small set of approved references is available
- one product record can be entered with enough truth to drive the packet
- the builder accepts that some formulas, views, and automations will remain intentionally minimal

## Build Order By Table

Build the tables in this order:

1. `products`
2. `constraint_rules`
3. `reference_assets`
4. `workflow_packets`
5. `seam_runs`
6. `generated_assets`
7. `review_gates`

Why this order:

- `products` anchors SKU truth
- `constraint_rules` and `reference_assets` establish the governing context
- `workflow_packets` can then link to product truth, constraints, and approved references
- `seam_runs` depend on packets
- `generated_assets` depend on packets and seam runs
- `review_gates` depend on packets and the release-readiness seam

## Relationship Wiring Order

Wire relationships in this order:

1. `constraint_rules.scope_value` usage is decided record-by-record, but SKU-scoped rules should first link conceptually back to the target product
2. `reference_assets.constraint_key` links to `constraint_rules`
3. `workflow_packets.sku_key` links to `products`
4. `workflow_packets.constraint_keys` links to `constraint_rules`
5. `workflow_packets.approved_reference_keys` links to `reference_assets`
6. `seam_runs.packet_key` links to `workflow_packets`
7. `generated_assets.packet_key` links to `workflow_packets`
8. `generated_assets.source_seam_run_key` links to `seam_runs`
9. `review_gates.packet_key` links to `workflow_packets`
10. `review_gates.release_readiness_run_key` links to the `release_readiness` row in `seam_runs`

Do not wire speculative relationships beyond this first graph.

## Minimum Formulas / Rollups / Linked-Record Behaviors

Minimum behaviors for v1:

- `products`
  - optional formula: display label combining `sku_key` and `product_name`

- `workflow_packets`
  - linked-record behavior: allow multiple linked `constraint_keys`
  - linked-record behavior: allow multiple linked `approved_reference_keys`

- `seam_runs`
  - generated behavior: `run_timestamp` should default at creation time if Airtable setup makes that easy
  - linked-record behavior: one packet may carry many seam runs

- `generated_assets`
  - linked-record behavior: allow many assets per packet
  - linked-record behavior: allow many assets per seam run

- `review_gates`
  - linked-record behavior: constrain practical use to one gate per packet

Minimum structural rollups or lookups:

- packet-level lookup of `products.product_status` into `workflow_packets` if useful for review
- gate-level lookup of `workflow_packets.packet_status` into `review_gates` if useful for approval readiness
- optional rollup count of governed outputs on `workflow_packets`

No larger formula layer is required for v1.

## Minimum Automations

Minimum automation posture:

- none is required for the base to exist
- one optional automation may stamp `run_timestamp` or create a default timestamp when a `seam_runs` record is added
- one optional automation may notify that a packet reached `ready_for_review`

Avoid automation that tries to infer approval policy, branch revision logic, or prompt composition.

## Minimum Interfaces / Views

Minimum useful views:

- `products / active source`
- `constraint_rules / active`
- `reference_assets / approved directional reference`
- `workflow_packets / ready for ingest`
- `workflow_packets / in verification`
- `seam_runs / by packet`
- `generated_assets / candidates`
- `generated_assets / governed outputs`
- `review_gates / ready for review`

Minimum useful interface posture:

- one packet-centric interface is enough if Airtable Interfaces are used
- it should surface product truth, linked constraints, approved references, latest seam runs, candidate assets, governed outputs, and release-readiness gate state

## Acceptance Checks By Seam

Acceptance checks for `ingest_validation`:

- packet links to exactly one product
- packet links to at least the governing constraints needed for the SKU
- packet links to approved references where required
- packet status can move to `ready_for_ingest`

Acceptance checks for `transformation_check`:

- a seam run can be recorded against the packet
- input references and notes can be captured without inventing extra schema
- one or more candidate assets can link back to the seam run

Acceptance checks for `output_validation`:

- candidate assets can be reviewed without collapsing candidates and governed outputs
- governed output status can distinguish acceptable outputs from rejected ones
- the packet can remain open for one bounded revision loop

Acceptance checks for `release_readiness`:

- one release-readiness seam run can be recorded
- one review gate can be opened against the packet
- the gate can remain clearly separate from approval-policy automation

## First Manual Test Run

Use one manually entered SKU packet:

1. create one `products` record
2. create a small set of active `constraint_rules`
3. add at least one supporting `reference_assets` record and one approved directional reference
4. create one `workflow_packets` record linked to the product, constraints, and references
5. create an `ingest_validation` seam run
6. create a `transformation_check` seam run
7. attach at least one candidate `generated_assets` record
8. create an `output_validation` seam run
9. if the first candidate fails, run one bounded revision loop with a second transformation run
10. create a `release_readiness` seam run
11. open one `review_gates` record

If that cycle is legible without extra tables, the v1 build is carrying its intended burden.

## Risks / Likely Pressure Points

- `constraint_rules` may quickly reveal pressure for fuller scope layering than v1 currently distinguishes
- `reference_assets` may blur input evidence versus constraint-carrying evidence if roles are not used carefully
- `workflow_packets` may absorb too much implicit prompt-composition burden before the next pressure test is ready
- `seam_runs` may need more structured outputs once repeated runs accumulate
- `generated_assets` may expose pressure for richer review-artifact handling than this v1 build carries
- `review_gates` may expose pressure for more than one approval-facing state transition

## What This Build Still Does Not Settle

This build still does not settle:

- prompt composition from layered constraints
- generalized schema behavior across multiple workflow modes
- runtime orchestration or agent routing
- richer revision graphs
- program-level planning
- whether Airtable should remain the long-term system surface
