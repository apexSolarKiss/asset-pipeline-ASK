# Campaign Mode Base Setup // Phase 1 Structural Plan v1

## Purpose

This is the Phase 1 plan for the campaign-mode base setup that ASK directionally chose as Option 1B (two-phase structural / operational split) following the [campaign-mode setup-content artifact](campaign-mode-operationalization-setup-content-v1.md) and the [setup-decision note](campaign-mode-operationalization-setup-decision-note-v1.md). Phase 1 covers structural setup only: new base creation, schema (mirror SKU-driven Furniture v1 base), core identity records (workflow_packets / output_slots / products), and validation that the v1 apex shape carries cleanly to a new base.

It is the plan-before-execute artifact required by AGENTS.md Airtable Mutation Discipline. It does not authorize Phase 1 mutation; it defines what Phase 1 mutation would do if ASK authorizes it.

## Posture

```text
plan only — no airtable mutation in this artifact
phase 1 scope: schema + identity records only
phase 2 scope (held): content text + reference imagery + AI configuration + generation
no slot_prompt drafts
no creative_intent / business_intent / bounded_creative_discretion content
no material_notes / finish_notes / identifying_details content
no reference_assets records (per ASK refinement: schema in scope, no empty placeholder records)
no constraint_rules records (Phase 2 if used at all)
no AI field-agent configuration
no generation
no governed_assets records
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact
no v2 apex
no authorization for Phase 1 mutation itself
```

The diagnostic caveat from the setup-decision artifact is carried forward. Brand names stay operator-side per grounding-note rule.

## Reading Note

This Phase 1 structural plan is narrowed by two amendments:

1. [`docs/campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md`](campaign-mode-base-setup-phase-1-preflight-discrepancy-amendment-v1.md) — corrects the treatment of accidental singleSelect option pollution in `constraint_rules.scope_type` and `constraint_rules.rule_type`. For those two fields, use the amendment's clean intentional mirror option sets rather than raw polluted live SKU-base options.
2. [`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md) — adopts hybrid (connector + manual Airtable UI) execution because the connector tool cannot create 10 fields of unsupported types (`multipleLookupValues`, `rollup`, `createdTime`) present in the source schema. See [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) for the durable connector-limitations reference.

## ASK Direction Recap

ASK has confirmed **Option 1B** — two-phase split:
- **Phase 1 (this plan):** structural setup. New base + schema (mirror SKU-driven Furniture v1) + identity-level workflow_packets / output_slots / products records. Inspect whether the v1 apex shape carries cleanly to a new base.
- **Phase 2 (held):** operational setup. Content text (slot_prompts, creative_intent, bounded_creative_discretion, material_notes, finish_notes, identifying_details) + reference_assets records with imagery + AI field-agent configuration + generation arcs.

ASK refinement carried into Phase 1: `reference_assets` schema is in scope; `reference_assets` records are NOT in scope for Phase 1 (no empty placeholder records that would create thin-bridge noise before reference evidence exists). The same care extends to other tables that exist primarily to carry content (`constraint_rules`).

## New Base Name

**Proposed: `asset-pipeline-ASK // Campaign-Driven D2C Home-Goods v1`**

Mirrors the existing base's naming structure (`asset-pipeline-ASK // SKU-Driven Furniture v1`):
- `asset-pipeline-ASK` — same project namespace
- `Campaign-Driven` — mode (parallel to `SKU-Driven`)
- `D2C Home-Goods` — abstract brand-archetype + category descriptor (parallel to `Furniture`); no named brands per grounding-note rule
- `v1` — first iteration of this base

Alternative considered and rejected: shorter names like `Campaign D2C v1` — clearer parallel structure with verbose name preferred.

## Schema Mirror Approach

The architectural claim being tested is that the v1 apex layered shape carries cleanly to a new base. The cleanest test is an **exact schema mirror** of the SKU-driven Furniture v1 base — same tables, same fields, same field types, same field names, same select-option enums, same lookup field structures. No additions. No mutations. No renames.

Three reasons to mirror exactly rather than mutate during Phase 1:
1. **Preserves the cross-base shape comparison cleanly.** Any architectural finding about cross-base + cross-brand pressure should be attributable to the brand-context shift, not to schema-mutation noise.
2. **Avoids pre-supposing the schema mutations the test is designed to surface need for.** Adding (e.g.) a `campaign_concept` field would presuppose Q4 (cross-packet continuity carrier) is earned, which the test should answer operationally not by anticipation.
3. **Follows the setup-decision's Diagnostic Caveat.** Schema mutation in Phase 1 would risk under-depth findings being attributed to the wrong cause.

One naming caveat carried forward: the `workflow_packets` table has a field named `sku_key` (multipleRecordLinks to `products`, description "Link to products"). The name is SKU-mode-specific but the field's role generalizes. **Mirror the name as-is** rather than rename to `linked_products` — the architecture claim is that the same schema carries; renaming would break shape consistency. If the misleading name surfaces operationally as an issue, that becomes a post-test naming consideration, not a Phase 1 schema mutation.

## Per-Table Schema Plan

All 8 tables from the SKU-driven Furniture v1 base mirror directly into the new base. No omissions. No additions. No renames.

| # | Table | Field count | Decision | Phase 1 identity records? |
|---|---|---|---|---|
| 1 | `products` | 11 | Mirror exactly (no select-option additions) | Yes — identity records (sku_key + product_name + product_status:draft). `category` and `product_class` left blank because existing furniture-specific options don't honestly fit campaign-mode home-goods |
| 2 | `constraint_rules` | 9 | Mirror exactly | No — held for Phase 2 (or skipped if not used) |
| 3 | `reference_assets` | 7 | Mirror exactly | **No — held for Phase 2** (per ASK refinement: schema in scope, no empty placeholder records) |
| 4 | `workflow_packets` | 21 | Mirror exactly (including `sku_key` field name) | Yes — identity records (packet_key + packet_status:draft). **`sku_key` linkage to products held for Phase 2** |
| 5 | `seam_runs` | 10 | Mirror exactly | No — operational table, populated during Phase 2 generation arcs |
| 6 | `generated_assets` | 17 | Mirror exactly (incl. all curation provenance fields, asset_attachment, etc.) | No — populated during Phase 2 governance arcs |
| 7 | `review_gates` | 7 | Mirror exactly | No — populated after curation in Phase 2+ |
| 8 | `output_slots` | 14 | Mirror exactly (incl. `slot_prompt`, lookup fields) | Yes — identity records (output_slot_key + expected_output_role + slot_status:planned + packet_key link + slot_sort_order) |

### Per-table mirror details

**`products`** (11 fields)
- Mirror: sku_key (primary), product_name, category (singleSelect), product_class (singleSelect), material_notes, finish_notes, identifying_details, product_status (singleSelect: draft / approved_source / retired), workflow_packets (multipleRecordLinks), display_label (formula), product_image (multipleAttachments)
- **Live SKU base singleSelect options (mirror exactly, no additions in Phase 1):**
  - `category`: chair, table, sofa, storage, bed, lighting (furniture-specific)
  - `product_class`: accent, dining, lounge, office, bedroom (furniture-room-specific)
  - `product_status`: draft, approved_source, retired
- **Campaign-mode implication:** existing `category` and `product_class` options are furniture-specific. Campaign-mode home-goods products (bedsheet sets, towels, dinnerware, ceramic vessels) don't honestly fit any of these options. Per the exact-mirror posture, Phase 1 leaves `category` and `product_class` **blank** on campaign product records rather than adding new options. This is a schema-inspection observation surfaced by the mirror posture; whether it becomes an architectural finding depends on operational evidence in Phase 2.

**`constraint_rules`** (9 fields)
- Mirror: constraint_key (primary), scope_type (singleSelect: product / category / product_class / brand_context), scope_value, rule_type (singleSelect), rule_text, priority (number), active_status (singleSelect: active / inactive), reference_assets (multipleRecordLinks), workflow_packets (multipleRecordLinks)
- All enum options mirror as-is

**`reference_assets`** (7 fields)
- Mirror: reference_key (primary), constraint_key (multipleRecordLinks), reference_role (singleSelect), asset_uri (url), reference_note, workflow_packets (multipleRecordLinks), reference_image (multipleAttachments)
- All enum options mirror as-is
- **No records created in Phase 1** per ASK refinement

**`workflow_packets`** (21 fields)
- Mirror all fields including: packet_key (primary), sku_key (multipleRecordLinks → products; mirror name), product_image_lookup (multipleLookupValues), business_intent, creative_intent, constraint_keys (multipleRecordLinks → constraint_rules), approved_reference_keys (multipleRecordLinks → reference_assets), bounded_creative_discretion, required_output_set, packet_status (singleSelect: draft / ready_for_ingest / in_verification / blocked / release_ready), product_status_lookup, governed_output_count (rollup), seam_runs (multipleRecordLinks), generated_assets (multipleRecordLinks), review_gates (multipleRecordLinks), composed_prompt_output, prompt_composition_notes, live_generated_image_v1 (multipleAttachments), output_slots (multipleRecordLinks), approved_reference_asset_uri_lookup (multipleLookupValues), approved_reference_image_lookup (multipleLookupValues)
- **Live SKU base singleSelect options (mirror exactly):**
  - `packet_status`: draft, ready_for_ingest, in_verification, blocked, release_ready

**`seam_runs`** (10 fields)
- Mirror: seam_run_key (primary), packet_key (multipleRecordLinks), seam_name (singleSelect: ingest_validation / transformation_check / output_validation / release_readiness), status (singleSelect: pending / completed / failed), input_references, output_references, notes, run_timestamp (createdTime), generated_assets (multipleRecordLinks), review_gates (multipleRecordLinks)

**`generated_assets`** (17 fields)
- Mirror all fields including the full five-axis curation provenance set: asset_key (primary), packet_key (multipleRecordLinks), source_seam_run_key (multipleRecordLinks), asset_role, asset_uri (url), governed_output_status (singleSelect: candidate / governed_output / rejected), review_artifact_flag (checkbox), governed_output_flag (formula), output_slot (multipleRecordLinks), capture_reason, source_attachment_id, capture_notes, captured_at (dateTime), curation_pattern, curator, asset_attachment (multipleAttachments)
- All enum options and field descriptions mirror as-is

**`review_gates`** (7 fields)
- Mirror: gate_key (primary), packet_key (multipleRecordLinks), release_readiness_run_key (multipleRecordLinks), gate_status (singleSelect: not_ready / ready_for_review / returned / approved), gate_notes, review_board_reference, packet_status_lookup

**`output_slots`** (14 fields)
- Mirror all fields including: output_slot_key (primary), expected_output_role, expected_output_description, slot_status (singleSelect — mirror options exactly), slot_evaluation_notes, generation_attempt_reference, slot_sort_order (number), packet_key (multipleRecordLinks), generated_assets (multipleRecordLinks), product_image_lookup_lookup (multipleLookupValues), slot_prompt (multilineText), slot_generated_image_v1 (multipleAttachments), packet_reference_asset_uri_lookup (multipleLookupValues), packet_reference_image_lookup (multipleLookupValues)
- **Live SKU base singleSelect options (mirror exactly):**
  - `slot_status`: planned, ready_for_generation, generated, missing, needs_retry, needs_review, accepted, rejected
  - Phase 1 records use `slot_status: planned`

## Records To Create In Phase 1

Identity-level records only. No content text. No reference imagery. Each record is the minimum needed to establish identity + structural linkage; content fields stay empty for Phase 2 to fill.

### `workflow_packets` — 3 identity records

| packet_key | packet_status | All other fields |
|---|---|---|
| `PKT-CAMP-001-BEDROOM` | `draft` | empty |
| `PKT-CAMP-002-TABLE` | `draft` | empty |
| `PKT-CAMP-003-BATH` | `draft` | empty |

Specifically held empty in Phase 1: `business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`, `composed_prompt_output`, `prompt_composition_notes`, `approved_reference_keys` (links), `constraint_keys` (links).

**`sku_key` linkage to products held for Phase 2.** Per ASK refinement: link products to packets in Phase 1 only if the identity records are final enough to make the link meaningful. Campaign product records in Phase 1 are placeholder-named with no material/finish/identifying-details and no imagery — not final enough. Phase 2 creates content + linkage simultaneously. This means Phase 1 workflow_packets records have no `sku_key` link populated.

### `output_slots` — 9 records (3 per packet × 3 packets)

| output_slot_key | expected_output_role | slot_status | packet_key (link) | slot_sort_order | All other fields |
|---|---|---|---|---|---|
| `SLT-CAMP-001-HERO_WORLD` | `HERO_WORLD` | `planned` | PKT-CAMP-001-BEDROOM | 1 | empty |
| `SLT-CAMP-001-LIFE_IN_USE` | `LIFE_IN_USE` | `planned` | PKT-CAMP-001-BEDROOM | 2 | empty |
| `SLT-CAMP-001-OBJECT_VIGNETTE` | `OBJECT_VIGNETTE` | `planned` | PKT-CAMP-001-BEDROOM | 3 | empty |
| `SLT-CAMP-002-HERO_WORLD` | `HERO_WORLD` | `planned` | PKT-CAMP-002-TABLE | 1 | empty |
| `SLT-CAMP-002-LIFE_IN_USE` | `LIFE_IN_USE` | `planned` | PKT-CAMP-002-TABLE | 2 | empty |
| `SLT-CAMP-002-OBJECT_VIGNETTE` | `OBJECT_VIGNETTE` | `planned` | PKT-CAMP-002-TABLE | 3 | empty |
| `SLT-CAMP-003-HERO_WORLD` | `HERO_WORLD` | `planned` | PKT-CAMP-003-BATH | 1 | empty |
| `SLT-CAMP-003-LIFE_IN_USE` | `LIFE_IN_USE` | `planned` | PKT-CAMP-003-BATH | 2 | empty |
| `SLT-CAMP-003-OBJECT_VIGNETTE` | `OBJECT_VIGNETTE` | `planned` | PKT-CAMP-003-BATH | 3 | empty |

Specifically held empty in Phase 1: `expected_output_description`, `slot_prompt`, `slot_evaluation_notes`, `slot_generated_image_v1`, `generation_attempt_reference`. All Phase 2.

Note: the `slot_status` enum currently includes `planned` per the SKU base's lifecycle decision. Mirror that option. If a different starting status is needed for campaign mode, that would surface in Phase 2 as content discipline, not Phase 1 schema mutation.

### `products` — 8 identity records

Each record carries minimal identity (key + descriptive name + draft status). All other fields — including `category` and `product_class` — are intentionally blank because the existing furniture-specific singleSelect options don't honestly fit campaign-mode home-goods, and the exact-mirror posture rules out adding new options in Phase 1.

| sku_key | product_name (descriptive identity) | product_status | category | product_class | All other fields |
|---|---|---|---|---|---|
| `SKU-CAMP-BEDSHEET-001` | Bedsheet set (sheets + pillowcases) | `draft` | **blank** (no fitting option) | **blank** (no fitting option) | empty |
| `SKU-CAMP-PLATE-001` | Dinner plate | `draft` | **blank** | **blank** | empty |
| `SKU-CAMP-GLASS-001` | Drinking glass | `draft` | **blank** | **blank** | empty |
| `SKU-CAMP-MUG-001` | Ceramic mug | `draft` | **blank** | **blank** | empty |
| `SKU-CAMP-SERVING-001` | Serving piece | `draft` | **blank** | **blank** | empty |
| `SKU-CAMP-TOWEL-BATH-001` | Bath towel | `draft` | **blank** | **blank** | empty |
| `SKU-CAMP-TOWEL-HAND-001` | Hand towel | `draft` | **blank** | **blank** | empty |
| `SKU-CAMP-VESSEL-001` | Ceramic vessel | `draft` | **blank** | **blank** | empty |

Final count: **8 product identity records.** This sits within the setup-content artifact's committed ~6–8 product range. The optional bedroom throw / extra pillow from earlier drafts is omitted from Phase 1 to keep the campaign's restraint discipline visible at the product-selection layer.

Specifically held empty in Phase 1 across all product records: `material_notes`, `finish_notes`, `identifying_details`, `product_image`, `workflow_packets` link, `category`, `product_class`. All Phase 2.

**Why category and product_class are blank, not added as new options:**
- Existing `category` options: chair, table, sofa, storage, bed, lighting (furniture-specific). None honestly fit a bedsheet set, towel, dinner plate, ceramic vessel, etc.
- Existing `product_class` options: accent, dining, lounge, office, bedroom (furniture-room-specific). Some adjacent fits ("bedroom" for bedding, "dining" for plates/glasses/mugs) but "bath" / "kitchen" / "drinkware" have no fit.
- Adding new options in Phase 1 would be schema mutation (singleSelect option expansion is mutation, not just configuration). Per the exact-mirror posture, Phase 1 declines this.
- **Schema-inspection observation:** the mirrored `products.category` and `products.product_class` enums are SKU-Furniture-shaped and do not honestly fit several campaign-mode home-goods products. Phase 1 records this by leaving those fields blank rather than adding options. Whether this becomes an architectural finding depends on operational evidence in Phase 2.

**Records held entirely for Phase 2:** none in `products`. All 8 records are created in Phase 1 as identity records.

### `reference_assets` — 0 records

Per ASK refinement: schema in scope, no empty placeholder records. Phase 2 will create reference_assets records as actual reference evidence (imagery, URLs, or both) is selected.

### `constraint_rules` — 0 records

Held for Phase 2 if used at all. Constraint discipline (restraint per setup-content artifact) may be carried by packet-level prose in Phase 2 rather than by structured constraint_rules records. The setup-content artifact's "restraint as architectural mechanism" framing operates at product-selection / packet / slot / curation layers; whether constraint_rules carries any of that or whether prose carries it is itself an operational question, deferred.

### `seam_runs`, `generated_assets`, `review_gates` — 0 records

Operational tables. Records created during Phase 2 generation / curation / governance arcs.

## Validation Method

After Phase 1 mutation completes, validate:

1. **Base exists.** `list_bases` returns the new base with the proposed name.
2. **Tables exist.** `list_tables_for_base` returns 8 tables with the expected names.
3. **Field count per table.** `list_tables_for_base` shows the expected field counts (11 / 9 / 7 / 21 / 10 / 17 / 7 / 14 — matching SKU base table-by-table).
4. **Field names per table.** `get_table_schema` confirms field names mirror SKU base exactly.
5. **Field types per table.** `get_table_schema` confirms field types match (singleLineText, multilineText, singleSelect, multipleRecordLinks, multipleAttachments, formula, rollup, lookup, etc.).
6. **singleSelect option lists per field.** Match SKU base option lists exactly. No additions in Phase 1; campaign products leave `category` and `product_class` blank rather than introducing new options.
7. **Records exist.** `list_records_for_table` returns: 3 workflow_packets records, 9 output_slots records, 8 products records. 0 records in reference_assets, constraint_rules, seam_runs, generated_assets, review_gates.
8. **Records carry only Phase 1 fields.** Spot-check: workflow_packets records have packet_key + packet_status only (other fields empty, including no sku_key link); output_slots records have output_slot_key + expected_output_role + slot_status + packet_key link + slot_sort_order only; products records have sku_key + product_name + product_status only (category / product_class blank by design).
9. **Linkages resolve.** Each output_slot's packet_key link resolves to the correct workflow_packet. **No workflow_packet → product linkage validation in Phase 1** — sku_key links are intentionally not created (held for Phase 2). No orphan records, no broken links among the linkages that ARE created.
10. **Lookup fields are expected empty in Phase 1.** Because workflow_packets.sku_key links are not created (held for Phase 2) and reference_assets has no records, the following lookup fields will be empty by design and should NOT be flagged as validation failures: workflow_packets.product_image_lookup, workflow_packets.product_status_lookup, workflow_packets.approved_reference_asset_uri_lookup, workflow_packets.approved_reference_image_lookup, output_slots.product_image_lookup_lookup, output_slots.packet_reference_asset_uri_lookup, output_slots.packet_reference_image_lookup. These populate in Phase 2 when their underlying linkages and content are created.
11. **No unintended tables / fields / records.** No tables exist beyond the 8 mirrored. No fields exist beyond the mirrored set per table. No records exist beyond the planned 3 workflow_packets + 9 output_slots + 8 products.

## Terminal State For Phase 1

**`structurally ready for Phase 2, not content-ready or generation-ready`.**

After validation passes, the new base is structurally complete:
- base exists with the proposed name
- mirrored schema exists (8 tables, all fields, all field types, all singleSelect options)
- approved identity records exist (3 workflow_packets, 9 output_slots, 8 products)
- the only links explicitly included in Phase 1 are output_slots.packet_key → workflow_packets (the slot-to-packet structural linkage); all those links resolve cleanly
- all lookup fields are expected empty in Phase 1 because their upstream linkages (workflow_packets.sku_key links to products; reference_assets records and links) are held for Phase 2 — empty lookups are not failures
- all tables that should be empty are empty: no records in `constraint_rules`, `reference_assets`, `seam_runs`, `generated_assets`, `review_gates`
- no `workflow_packets.sku_key` linkages to products (held for Phase 2)
- no slot_prompts exist
- no reference imagery is selected; no `reference_assets` records exist (per ASK refinement)
- no AI field-agent is configured
- no business_intent / creative_intent / bounded_creative_discretion text populated
- no material_notes / finish_notes / identifying_details exist on products
- no product_image attachments
- no `products.category` or `products.product_class` values populated (per exact-mirror posture)
- no generation has been invoked
- no governed_assets exist
- no review_gates exist

The base is **not content-ready and not generation-ready** at the end of Phase 1. A future operator looking at the base should see scaffolded identity but recognize immediately that no operational content is in place. Phase 2, conditional on ASK authorization, layers content + references + linkages + AI configuration + generation onto the Phase 1 scaffold.

## What This Artifact Is NOT

- Not Phase 1 mutation itself. No Airtable connector calls have been made for this artifact (only read-only schema inspection of the SKU base for plan grounding).
- Not authorization for Phase 1 mutation. Merging this plan artifact does not itself execute or authorize Airtable mutation. Phase 1 mutation requires separate explicit ASK authorization after this plan is merged.
- Not a Phase 2 plan. Phase 2 is a separate scope of work with its own plan-before-execute artifact + structured change summary, conditional on Phase 1 success.
- Not a schema-mutation proposal for the SKU base. The SKU-driven Furniture v1 base is unchanged by this plan.
- Not a v2 apex artifact.
- Not a rewrite of [`docs/architecture.md`](architecture.md), the apex artifact, predecessor passes, the D2 decision note, the setup-decision note, or the setup-content artifact.
- Not a name commitment for the new base; the proposed name is open to ASK adjustment before Phase 1 mutation.
- Not a proposal for new `category` / `product_class` options. Phase 1 mirrors existing options exactly; campaign product records leave both fields blank.

## What Comes After

If ASK authorizes Phase 1, the next step is Phase 1 mutation execution:
- Create the new base via Airtable connector
- Create the 8 tables in correct dependency order (products + constraint_rules + reference_assets first, then workflow_packets, then output_slots, then seam_runs, then generated_assets, then review_gates)
- Add fields per table per the mirror plan
- Add singleSelect options per field, mirroring the SKU base exactly (no additions; campaign product records leave `category` / `product_class` blank)
- Create the records per the §Records To Create In Phase 1 specification
- Run the validation method
- If validation passes, write the structured change summary artifact

If Phase 1 succeeds and ASK authorizes Phase 2, the next plan is the Phase 2 operational plan: slot_prompt drafts + content text population + reference imagery selection + reference_assets records + AI field-agent configuration + first generation arcs.

If Phase 1 surfaces unexpected schema-fit issues during mutation (e.g., a field type can't be created via the connector, an enum option can't be added programmatically), the plan stops at the issue and a re-propose step happens before any further mutation.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md): setup-content artifact this plan implements; defines the campaign concept ("Less, but Better"), packet trio, slot role inventory, product range
- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision artifact defining test shape; primary architectural questions Q1/Q2/Q3 and secondary Q4/Q5/Q6 the operational test will pressure once Phase 2 generation begins
- [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md): D2 decision note that surfaced the choice path (D2-Campaign + cross-base + cross-brand)
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex; Named Limitation #3 is what this test (and this Phase 1 setup) addresses

### Schema reference

- SKU-driven Furniture v1 base (`appoqJ25B6w4vSuX9`): the source schema being mirrored. Live state inspected via Airtable connector for this plan.
- [`docs/airtable-base-spec-sku-driven-furniture-v1.md`](airtable-base-spec-sku-driven-furniture-v1.md): historical SKU base spec
- [`docs/airtable-base-configuration-sku-driven-furniture-v1.md`](airtable-base-configuration-sku-driven-furniture-v1.md): historical SKU base field-by-field configuration

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): the operational arc shape Phase 2 will mirror per packet (generation → curation → governed asset writeback)
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-base same-category collection-mode operational test, demonstrating what an operationalization at depth produces

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary requirements)
- `AGENTS.md` Airtable Schema-Fit Rule (live inspection before authoring; honored by inspecting SKU base for this plan)
