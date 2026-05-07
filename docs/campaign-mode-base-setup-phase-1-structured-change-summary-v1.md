# Campaign Mode Base Setup // Phase 1 Structured Change Summary v1

## Purpose

This artifact records completion of the Phase 1 mutation defined by the merged Phase 1 structural plan ([`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md)) as narrowed by both prior amendments — the preflight discrepancy amendment ([`docs/campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md`](campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md)) and the tool capability amendment ([`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md)). It is the structured change summary required by the AGENTS.md Airtable Mutation Discipline rule.

It is not new doctrine, not a Phase 2 scope opening, and not a re-statement of the merged plan. It is the terminal record of Phase 1.

## Posture

```text
one artifact (this completion summary)
no further airtable mutation in this artifact
no rewrite of the merged Phase 1 plan or either prior amendment
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact
no v2 apex
no Phase 2 scope opening
```

## Mutation Target

| Field | Value |
|---|---|
| Base name | `asset-pipeline-ASK // Campaign-Driven D2C Home-Goods v1` |
| Base ID | `appCAcRuA82SWj5h5` |
| Workspace | `wspYlvdEkntqcDMLR` |
| Source schema being mirrored | SKU-driven Furniture v1 base (`appoqJ25B6w4vSuX9`) |

## Execution Record

Phase 1 mutation executed in two portions per the tool capability amendment.

### Portion 1 — connector portion (Claude executed)

- Created the new base via `create_base`.
- Created the 8 mirrored tables: `products`, `constraint_rules`, `reference_assets`, `workflow_packets`, `seam_runs`, `generated_assets`, `review_gates`, `output_slots`.
- Created all 85 connector-supported fields across the 8 tables (incl. text, attachments, links, formulas, singleSelect).
- Applied singleSelect option lists exactly mirroring the SKU base, EXCEPT `constraint_rules.scope_type` and `constraint_rules.rule_type`, which used the clean intentional 4-option mirror per the preflight discrepancy amendment.
- Created the 11 link pairs (counting each bidirectional link as one pair, matching SKU base topology).
- Created the 20 identity records: 3 `workflow_packets`, 9 `output_slots` (linked 3-per-packet via `packet_key`), 8 `products`.

### Portion 2 — manual UI portion (ASK executed)

ASK manually created the 10 unsupported field types via the Airtable UI in the dependency-correct order (workflow_packets lookups before output_slots lookups, so chained lookups resolved on creation):

- 4 multipleLookupValues on `workflow_packets`: `product_image_lookup`, `product_status_lookup`, `approved_reference_asset_uri_lookup`, `approved_reference_image_lookup`
- 1 rollup on `workflow_packets`: `governed_output_count`
- 1 multipleLookupValues on `review_gates`: `packet_status_lookup`
- 1 createdTime on `seam_runs`: `run_timestamp`
- 3 multipleLookupValues on `output_slots`: `product_image_lookup_lookup`, `packet_reference_asset_uri_lookup`, `packet_reference_image_lookup`

### Validation

The merged plan's 11-point validation method was run against the assembled base (both portions combined). Result: **PASS** on all 11 points.

- Base name + ID + workspace correct
- 8 tables present with correct names and primary fields
- All 95 fields present with correct names
- All 95 field types match (incl. 8 multipleLookupValues, 1 rollup, 1 createdTime, 2 formula)
- All singleSelect option lists match SKU base except the two intentional clean-mirror deviations on `constraint_rules.scope_type` and `constraint_rules.rule_type` per the preflight discrepancy amendment
- All 11 link pairs present and correctly directed
- Both formula expressions (`products.display_label`, `generated_assets.governed_output_flag`) match SKU base logic
- All 8 lookup chains valid; rollup chain valid; createdTime configured
- 20 identity records present and correct (`packet_status: draft`, `slot_status: planned`, `product_status: draft`)
- All lookup fields and the rollup are empty as expected in Phase 1 (no upstream linkages between packets and products / reference_assets / generated_assets exist by design)
- output_slots ↔ workflow_packets bidirectional link integrity verified from both sides; no orphans, no cross-packet contamination

## Structured Change Summary

**Why this change exists.** Phase 1 mutation creates the structural ground for the campaign-mode operational test defined by the setup-decision note ([`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md)) and setup-content artifact ([`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md)). It addresses Named Limitation #3 of the v1 apex ([`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md)) by giving campaign-mode a base of its own to be tested in. Phase 1 is structural-only; it does not yet exercise the architecture's mode behaviors.

**What changed.** A new Airtable base exists at `appCAcRuA82SWj5h5` with a 95-field schema mirroring the SKU-driven Furniture v1 base across 8 tables, 11 link pairs, 8 lookup fields, 1 rollup, 1 createdTime, and 2 formulas. 20 identity records exist (3 packets in `draft`, 9 output slots in `planned`, 8 products in `draft`). Output slots are linked to packets 3-per-packet via `packet_key`. No other linkages exist. No content fields are populated.

**What did not change.** The SKU-driven Furniture v1 base is unmodified — preflight surfaced four accidental options each on `constraint_rules.scope_type` and `rule_type` in that base, and the preflight discrepancy amendment explicitly held SKU-base cleanup as a separate future scope. The merged Phase 1 plan, both amendments, the architecture apex, predecessor architectural passes, the D2 decision note, the setup-decision note, the setup-content artifact, and the connector tool capability limitations doc are all unchanged. No Phase 2 scope was opened.

**What remains out of scope.** Slot prompts, packet `business_intent` / `creative_intent` / `bounded_creative_discretion` / `required_output_set` content, constraint records, reference records, seam_runs records, generated_assets records, review_gates records, packet→product links (`workflow_packets.sku_key`), packet→constraint links (`workflow_packets.constraint_keys`), packet→reference links (`workflow_packets.approved_reference_keys`), product imagery, reference imagery, AI configuration, generation invocation, output slot generation, curation events, output_slot↔generated_assets linkage, slot_status transitions beyond `planned`, packet_status transitions beyond `draft`, and product_status transitions beyond `draft`. `category` and `product_class` enum additions for non-furniture campaign products are also held — the SKU-base furniture-specific options do not fit campaign home-goods and the exact-mirror posture forbids smuggling option additions in Phase 1; a future scoped decision note may add campaign-fit options to those enums (or split the field, or hold the fields blank in campaign mode). SKU-base singleSelect option-pollution cleanup also remains held per the preflight discrepancy amendment.

## Narrative Corrections Surfaced During Validation

Two items in earlier in-flight reporting were tightened during validation. Neither indicates a live schema defect; both are recorded here so the completion record is precise.

1. **Field count: 95, not 96.** Earlier in-flight reporting cited the merged plan's per-table counts as `11 / 9 / 7 / 21 / 10 / 17 / 7 / 14` (96 total) and reported `generated_assets` as 17 fields. The live SKU-driven Furniture v1 base reads 16 fields on `generated_assets` (95 total). The campaign base also reads 16 fields on `generated_assets` (95 total). Both bases match. The `17 / 96` figure was carried over from a stale narrative summary; it is not a live schema defect on either side.

2. **`seam_runs.run_timestamp` display format: ISO date / 24-hour, vs SKU base's `local` date / 24-hour.** This is presentation-only. The underlying value of a `createdTime` field is always a full ISO timestamp; display format does not affect schema fit, lookup chains, rollups, downstream behavior, or any of the 11-point validation checks. Operator preference applied without re-mirror cost.

## Intentional Schema Deviations From the SKU Base (Already Documented)

These are not defects; they are documented intentional deviations carried into Phase 1 by the preflight discrepancy amendment. Recorded here for completion-record completeness.

- `constraint_rules.scope_type` campaign options: `product`, `category`, `product_class`, `brand_context` (4) — clean intentional mirror. SKU base also carries 4 accidental options (`early_autumn_reset`, `output_requirement`, a long sentence, and `2`) that were not propagated.
- `constraint_rules.rule_type` campaign options: `hard_requirement`, `fidelity_rule`, `presentation_rule`, `output_requirement` (4) — clean intentional mirror. SKU base also carries 2 accidental options (a long sentence and `2`) that were not propagated.

## Terminal State

Phase 1 mutation is complete. The campaign base is **structurally ready for Phase 2** — the schema and identity records are in place. It is **not content-ready** (no slot prompts, no packet intent text, no constraint or reference records, no product detail, no imagery) and **not generation-ready** (no AI configuration, no slot prompts populated, no run-side connectivity).

Phase 1 does not exercise any architecture mode behavior. It also does not validate the Airtable AI field-agent's behavior on campaign-mode lookup surfaces (the 8 lookups are configured and chain-valid but empty until upstream linkages are created in a later phase). What Phase 1 establishes is the schema-shape claim that the SKU-driven Furniture v1 base's structure mirrors cleanly into a fresh campaign base, with the two intentional `constraint_rules` deviations carried as documented decisions rather than silent corrections, and with the 10 unsupported field types created via the hybrid execution shape per the tool capability amendment.

## Pressure Points / Open Questions Carried Forward

1. **Lookup-chain empty validity is a configuration claim, not a behavior claim.** All 8 lookups validate as chain-correct in the connector schema, but until packets are linked to products and reference_assets, none of them surface values. A later phase that populates the upstream links will be the first time we observe whether the chained `output_slots` lookups (which depend on `workflow_packets` lookups, which depend on link fields) actually flow values end-to-end. This is the expected Phase 1 hold per the merged plan; it is recorded here so the next phase can plan an explicit lookup-flow check.
2. **`category` and `product_class` enum mismatch is held, not resolved.** The SKU-base options are furniture-specific; campaign products are home-goods (bedding, dinnerware, bath). A scoped future decision note can choose between (a) adding campaign-fit options to the enums, (b) splitting the fields per mode, or (c) leaving the fields blank in campaign mode and recording the absence as part of mode behavior. Out of scope for Phase 1.
3. **SKU-base singleSelect pollution remains.** The four accidental options on `constraint_rules.scope_type` and two on `rule_type` in the SKU base are still present. Cleaning them is a separate small mutation with its own plan-before-execute discipline. Out of scope here.
4. **Diagnostic caveat from the setup-decision note continues to apply.** Any Phase 2 failure outcome must be diagnosed before being read as schema pressure or apex pressure.

## What This Note Does NOT Do

- Does not authorize Phase 2 mutation or open Phase 2 scope.
- Does not modify the SKU-driven Furniture v1 base.
- Does not propose a tool-capability fix; the connector limitations remain documented in [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) for future reference.
- Does not validate any architecture mode behavior; Phase 1 is structural-only.
- Does not propose a `category` / `product_class` enum resolution for campaign mode.
- Does not propose SKU-base singleSelect pollution cleanup.
- Does not change architectural doctrine, the v1 apex, or any predecessor pass.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan (PR #181)
- [`docs/campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md`](campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md): preflight discrepancy amendment (PR #182)
- [`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md): tool capability amendment (PR #183)
- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): durable connector tool-capability reference (PR #183)

### Plan / decision chain context

- [`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md): setup-content artifact carrying the campaign-mode content commitments (PR #180)
- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision note defining the test shape (PR #179)
- [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md): D2 decision note that surfaced the choice path (PR #178)
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex; Named Limitation #3 is what Phase 1 addresses by giving campaign mode a base of its own (PR #176)

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
- `AGENTS.md` Airtable Schema-Fit Rule
