# Campaign Mode Base Setup // Phase 1 Tool Capability Amendment v1

## Purpose

This amendment narrows the execution shape of the merged Phase 1 structural plan ([`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md)) in response to a tool-capability discrepancy surfaced during the actual mutation step. The merged plan called for exact-mirror schema replication via the Airtable connector. The connector tool cannot create three field types present in the source schema: `multipleLookupValues`, `rollup`, and `createdTime`. ASK directed: try Option D (alternative connector) first, fall back to Option B (hybrid: connector + manual Airtable UI completion). Option D returned empty (no alternative connector in the MCP registry); this amendment adopts Option B.

It is not a rewrite of the merged Phase 1 plan. The plan's schema mirror, identity records, validation method, terminal state, two-step authorization framing, and prior preflight-discrepancy amendment all remain exactly as merged. This amendment changes only the execution shape — splitting Phase 1 mutation into a connector portion and a manual UI portion — and names the 10 specific fields that the manual portion must add.

## Posture

```text
one artifact (this amendment)
no airtable mutation in this artifact
no campaign base creation
no rewrite of the merged Phase 1 plan or the prior preflight-discrepancy amendment (PR #181 + PR #182 stand)
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact
no v2 apex
no authorization for Phase 1 mutation; re-authorization required after this amendment merges
```

The diagnostic caveat from the setup-decision artifact and the brand-name-avoidance discipline are preserved. This amendment relies on [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) as the durable reference describing the tool-capability gap.

## ASK Direction Recap

ASK has directed: clearly document Airtable connector tool capability limitations in the repo (this is now [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md)), try Option D (alternative connector) first, fall back to Option B (hybrid: connector + manual Airtable UI completion) if Option D fails.

Option D was attempted: the MCP registry was searched for alternative Airtable connectors with broader field-type support. The available MCP registry search did not surface a suitable alternative Airtable connector with broader field-type support.

This amendment adopts Option B for Phase 1 mutation execution.

## The Tool-Capability Discrepancy

Per [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) Limitation #1, the Airtable connector cannot programmatically create the following field types: `multipleLookupValues`, `rollup`, `createdTime`, `createdBy`, `lastModifiedTime`, `lastModifiedBy`.

The merged Phase 1 plan calls for exact-mirror replication of the SKU-driven Furniture v1 base schema. The source schema includes 10 fields across 4 tables of 3 unsupported types:

### `multipleLookupValues` fields — 8 total

| Table | Field | Looks up via | Looks up at |
|---|---|---|---|
| `workflow_packets` | `product_image_lookup` | `sku_key` link to products | `products.product_image` |
| `workflow_packets` | `product_status_lookup` | `sku_key` link to products | `products.product_status` |
| `workflow_packets` | `approved_reference_asset_uri_lookup` | `approved_reference_keys` link to reference_assets | `reference_assets.asset_uri` |
| `workflow_packets` | `approved_reference_image_lookup` | `approved_reference_keys` link to reference_assets | `reference_assets.reference_image` |
| `output_slots` | `product_image_lookup_lookup` | `packet_key` link to workflow_packets | `workflow_packets.product_image_lookup` |
| `output_slots` | `packet_reference_asset_uri_lookup` | `packet_key` link to workflow_packets | `workflow_packets.approved_reference_asset_uri_lookup` |
| `output_slots` | `packet_reference_image_lookup` | `packet_key` link to workflow_packets | `workflow_packets.approved_reference_image_lookup` |
| `review_gates` | `packet_status_lookup` | `packet_key` link to workflow_packets | `workflow_packets.packet_status` |

### `rollup` field — 1 total

| Table | Field | Rollup config |
|---|---|---|
| `workflow_packets` | `governed_output_count` | rollup of governed_assets matching governed_output_status |

### `createdTime` field — 1 total

| Table | Field |
|---|---|
| `seam_runs` | `run_timestamp` |

**Total unsupported fields: 10** (8 lookups + 1 rollup + 1 createdTime).

## The Hybrid Execution Plan

Phase 1 mutation splits into two portions:

### Portion 1 — Connector portion (Claude executes)

Claude executes everything the connector supports:

- Create the new base via `create_base`
- Create the 8 mirrored tables via `create_table`
- Create all supported fields per table via `create_field` (text fields, attachments, links, formulas, singleSelect, etc. — 86 fields total)
- Apply the singleSelect option lists exactly mirroring the SKU base, EXCEPT `constraint_rules.scope_type` and `constraint_rules.rule_type` which use the clean intentional option sets per the prior preflight-discrepancy amendment
- Create the 3 + 9 + 8 = 20 identity records per the merged plan
- Set up the `output_slots.packet_key` link to workflow_packets (the only structural linkage Phase 1 creates)

### Portion 2 — Manual Airtable UI portion (ASK executes)

ASK manually adds the 10 unsupported fields via the Airtable UI:

- 4 lookup fields on `workflow_packets`: `product_image_lookup`, `product_status_lookup`, `approved_reference_asset_uri_lookup`, `approved_reference_image_lookup`
- 1 rollup field on `workflow_packets`: `governed_output_count`
- 3 lookup fields on `output_slots`: `product_image_lookup_lookup`, `packet_reference_asset_uri_lookup`, `packet_reference_image_lookup`
- 1 lookup field on `review_gates`: `packet_status_lookup`
- 1 createdTime field on `seam_runs`: `run_timestamp`

Each lookup field requires the source link field and source attribute field to exist (which they will, after Portion 1 completes). Each rollup requires its source linked records and rollup expression. The createdTime field is configured per Airtable defaults.

The exact field names, types, and source link/source attribute relationships per the table above. ASK can use the merged Phase 1 plan's per-table mirror specification as the authoritative reference for what each field looks up / rolls up.

### Validation

Validation runs after BOTH portions complete (not after Portion 1 alone). The merged plan's 11-point validation method applies as written. Specifically:

- Point 4 (field names per table): all 96 fields exist with expected names
- Point 5 (field types per table): all 96 field types match (including the 10 manually added)
- Point 10 (lookup fields expected empty in Phase 1): all 8 lookup fields exist and are empty by design (no upstream linkages); the rollup field exists and is empty (no upstream generated_assets); the `run_timestamp` createdTime field exists on `seam_runs`, but because Phase 1 creates no `seam_runs` records it has no populated values yet — it will auto-populate on future `seam_runs` record creation

## What This Amendment Does NOT Do

- Does not authorize Phase 1 mutation. Re-authorization against the amended plan is required after this amendment merges.
- Does not change the merged plan's schema posture beyond the execution-shape split.
- Does not change records-to-create. 3 + 9 + 8 = 20 identity records remain unchanged.
- Does not change the merged plan's terminal state ("structurally ready for Phase 2, not content-ready or generation-ready").
- Does not extend Phase 1 scope to Phase 2 work. Slot prompts, content text, reference imagery, AI configuration, generation, generated_assets, review_gates, seam_runs records all remain held.
- Does not authorize cleanup of the SKU base (the prior preflight-discrepancy amendment also preserved this hold).
- Does not propose a tool-capability fix. The Airtable connector limitations are noted as durable reference until tooling evolves.
- Does not require Claude to perform the manual UI step. That portion is ASK's to execute.

## Sequencing

If ASK approves this amendment and merges it, the next step is Phase 1 mutation re-authorization with the hybrid execution shape:

1. **Claude executes Portion 1** (connector creates supported schema + 20 identity records). Reports completion with a list of what was created.
2. **ASK manually executes Portion 2** (10 unsupported fields via Airtable UI). Reports completion or any UI-side issue.
3. **Claude runs the 11-point validation method** on the assembled base (both portions combined). Reports validation results.
4. **If validation passes:** Claude writes the structured change summary artifact. PR for approval.
5. **If validation fails:** Claude stops and reports the discrepancy before any repair.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan this amendment narrows the execution shape of
- [`docs/campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md`](campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md): prior amendment narrowing the constraint_rules option mirror; both amendments apply to Phase 1 mutation
- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): durable reference doc consolidating connector tool-capability limitations; Limitation #1 is what this amendment addresses

### Plan / decision chain context

- [`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md): setup-content artifact carrying the campaign-mode content commitments
- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision artifact defining the test shape
- [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md): D2 decision note that surfaced the choice path
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex; Named Limitation #3 is what this test (when Phase 1 mutates) addresses

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
- `AGENTS.md` Airtable Schema-Fit Rule
