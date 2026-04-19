# Airtable Base Configuration // SKU-Driven Furniture v1

## Purpose

This document is a field-by-field manual build sheet for the SKU-driven furniture v1 Airtable proof.

It is the closest thing to a copy-pasteable setup guide for the base without pretending to be importable schema code.

## Table Configuration

### `products`

Purpose:
Carry SKU-driven product truth for one governed item.

Primary field:
- `sku_key` — Single line text — source fact — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `sku_key` | Single line text | source fact | required | Primary field |
| `product_name` | Single line text | source fact | required | Human-readable product name |
| `category` | Single select | source fact | required | See enum vocabularies |
| `product_class` | Single select | source fact | required | See enum vocabularies |
| `material_notes` | Long text | source fact | optional | Freeform material detail |
| `finish_notes` | Long text | source fact | optional | Freeform finish detail |
| `identifying_details` | Long text | source fact | optional | Distinguishing physical details |
| `product_status` | Single select | status | required | `draft`, `approved_source`, `retired` |
| `display_label` | Formula | generated | optional | Optional usability field combining SKU and product name |

### `constraint_rules`

Purpose:
Carry governing rules as first-class records.

Primary field:
- `constraint_key` — Single line text — constraint — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `constraint_key` | Single line text | constraint | required | Primary field |
| `scope_type` | Single select | constraint | required | `product`, `category`, `product_class`, `brand_context` |
| `scope_value` | Single line text | constraint | required | Concrete value for the scope target |
| `rule_type` | Single select | constraint | required | See enum vocabularies |
| `rule_text` | Long text | constraint | required | Governing rule text |
| `priority` | Number | constraint | required | Use simple integer ordering |
| `active_status` | Single select | status | required | `active`, `inactive` |

### `reference_assets`

Purpose:
Carry approved references and supporting evidence.

Primary field:
- `reference_key` — Single line text — reference — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `reference_key` | Single line text | reference | required | Primary field |
| `constraint_key` | Link to another record | reference | optional | Link to `constraint_rules`; use when the asset acts as a constraint carrier |
| `reference_role` | Single select | reference | required | See enum vocabularies |
| `asset_uri` | URL | reference | required | Approved asset location |
| `reference_note` | Long text | reference | optional | Why this reference matters |

### `workflow_packets`

Purpose:
Carry one ingest-facing SKU workflow request.

Primary field:
- `packet_key` — Single line text — generated identifier / reference — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `packet_key` | Single line text | reference | required | Primary field |
| `sku_key` | Link to another record | source fact | required | Link to `products` |
| `business_intent` | Long text | source fact | required | Business objective |
| `creative_intent` | Long text | source fact | required | Creative framing |
| `constraint_keys` | Link to another record | constraint | required | Multi-link to `constraint_rules` |
| `approved_reference_keys` | Link to another record | constraint | optional | Multi-link to `reference_assets` |
| `bounded_creative_discretion` | Long text | constraint | required | Declared creative freedom within constraints |
| `required_output_set` | Long text | constraint | required | Required output expectations |
| `packet_status` | Single select | status | required | `draft`, `ready_for_ingest`, `in_verification`, `blocked`, `release_ready` |
| `product_status_lookup` | Lookup | generated | optional | Lookup from linked `products.product_status` if helpful |
| `governed_output_count` | Rollup | generated | optional | Count governed outputs from `generated_assets` |

### `seam_runs`

Purpose:
Carry deterministic seam records for one packet.

Primary field:
- `seam_run_key` — Single line text — generated identifier / reference — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `seam_run_key` | Single line text | reference | required | Primary field |
| `packet_key` | Link to another record | generated | required | Link to `workflow_packets` |
| `seam_name` | Single select | constraint | required | `ingest_validation`, `transformation_check`, `output_validation`, `release_readiness` |
| `status` | Single select | status | required | `pending`, `completed`, `failed` |
| `input_references` | Long text | generated | optional | Human-readable list of inputs used |
| `output_references` | Long text | generated | optional | Human-readable list of outputs produced |
| `notes` | Long text | generated | optional | Seam-local notes |
| `run_timestamp` | Created time or Date/time | generated | required | Prefer automatic capture if easy |

### `generated_assets`

Purpose:
Carry candidate and governed outputs linked back to packet and seam.

Primary field:
- `asset_key` — Single line text — generated identifier / reference — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `asset_key` | Single line text | reference | required | Primary field |
| `packet_key` | Link to another record | generated | required | Link to `workflow_packets` |
| `source_seam_run_key` | Link to another record | generated | required | Link to `seam_runs` |
| `asset_role` | Single line text | generated | required | Keep flexible in v1 rather than forcing a premature enum |
| `asset_uri` | URL | generated | required | Asset location |
| `governed_output_status` | Single select | status | required | `candidate`, `governed_output`, `rejected` |
| `review_artifact_flag` | Checkbox | generated | optional | Flag assets that exist only as review artifacts |

### `review_gates`

Purpose:
Carry the one approval-facing gate for a packet.

Primary field:
- `gate_key` — Single line text — reference — required

Fields:

| Field name | Airtable field type | Classification | Required | Notes |
| --- | --- | --- | --- | --- |
| `gate_key` | Single line text | reference | required | Primary field |
| `packet_key` | Link to another record | generated | required | Link to `workflow_packets` |
| `release_readiness_run_key` | Link to another record | generated | required | Link to the release-readiness row in `seam_runs` |
| `gate_status` | Single select | status | required | `not_ready`, `ready_for_review`, `returned`, `approved` |
| `gate_notes` | Long text | generated | optional | Approval-facing notes |
| `review_board_reference` | Single line text | reference | optional | Human-facing review board or destination reference |
| `packet_status_lookup` | Lookup | generated | optional | Lookup from linked packet for convenience |

## Relationship Summary

Minimum relationships:

- `workflow_packets.sku_key` -> `products`
- `reference_assets.constraint_key` -> `constraint_rules`
- `workflow_packets.constraint_keys` -> `constraint_rules`
- `workflow_packets.approved_reference_keys` -> `reference_assets`
- `seam_runs.packet_key` -> `workflow_packets`
- `generated_assets.packet_key` -> `workflow_packets`
- `generated_assets.source_seam_run_key` -> `seam_runs`
- `review_gates.packet_key` -> `workflow_packets`
- `review_gates.release_readiness_run_key` -> `seam_runs`

## Enum Vocabularies

Recommended enum vocabularies for v1:

- `products.category`
  - `chair`
  - `table`
  - `sofa`
  - `storage`
  - `bed`
  - `lighting`

- `products.product_class`
  - `accent`
  - `dining`
  - `lounge`
  - `office`
  - `bedroom`

- `products.product_status`
  - `draft`
  - `approved_source`
  - `retired`

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

- `constraint_rules.active_status`
  - `active`
  - `inactive`

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

- `seam_runs.seam_name`
  - `ingest_validation`
  - `transformation_check`
  - `output_validation`
  - `release_readiness`

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

## Revision-Loop Note

This base only needs one narrow revision loop:

- failed `output_validation`
- another `transformation_check` against the same packet
- new candidate assets linked to the later seam run
- another `output_validation`

Do not configure branching review trees or multi-packet revision logic in v1.

## Release-Readiness Gate Note

This base should support one release-readiness gate per packet.

That gate records bounded readiness to present for approval. It does not automate approval policy and should not be expanded into a larger governance subsystem in this first build.

## Prompt-Composition Note

Prompt composition is not yet configured here.

Once the record graph is instantiated, the next real pressure is whether layered constraints can be composed cleanly into prompt-ready structure without collapsing the seam model.
