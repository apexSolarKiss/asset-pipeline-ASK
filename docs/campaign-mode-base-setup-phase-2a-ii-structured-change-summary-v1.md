# Campaign Mode Base Setup // Phase 2A-ii Structured Change Summary v1

## Purpose

This artifact records completion of the Phase 2A-ii mutation — the semantic-wiring sub-cycle of Phase 2A, executed against the merged Phase 2A plan ([`docs/campaign-mode-base-setup-phase-2a-plan-v1.md`](campaign-mode-base-setup-phase-2a-plan-v1.md)). Phase 2A-ii covers Steps 5 + 6 + 7 of the merged Phase 2A plan: per-packet content + linkages, slot prompts, and lookup-flow check.

It is the second and final structured change summary for Phase 2A. Phase 2A-i (Steps 2 + 3 + 4) landed in PR #189 ([`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md)). With this artifact, the full Phase 2A scope as defined in the merged plan is complete and Phase 2A's terminal state is reached.

It is not new doctrine, not Phase 2B / 2C / 2D / 2E / 2F scope opening, and not a re-statement of the merged Phase 2A plan. It is the terminal record of Phase 2A-ii (and of Phase 2A overall).

## Posture

```text
one artifact (this completion summary)
no further airtable mutation in this artifact
no rewrite of the merged Phase 2A plan or the Phase 2A-i SCS
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 2 operational plan / Phase 1 plan / Phase 1 amendments / Phase 1 SCS
no v2 apex
no Phase 2B / 2C / 2D / 2E / 2F scope opening
```

## Mutation Target

| Field | Value |
|---|---|
| Base name | `asset-pipeline-ASK // Campaign-Driven D2C Home-Goods v1` |
| Base ID | `appCAcRuA82SWj5h5` |
| Phase 2A-ii scope | workflow_packets content + linkages; output_slots slot_prompt; lookup-flow check |
| Phase 2A-ii out of scope | AI field-agent configuration; generation; curation; generated_assets; status promotions; schema mutation |

## Execution Record

Phase 2A-ii mutation executed in three connector batches against the campaign base.

### Batch 1 — workflow_packets content + linkages (3 records updated)

Updated all 3 existing `workflow_packets` records with `business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`, `sku_key` linkages, and `approved_reference_keys` linkages per the Phase 2A plan §Step 5 proposed shapes.

#### PKT-CAMP-001-BEDROOM

- `business_intent`: bedroom packet supports the campaign's value proposition that fewer, considered things produce a more livable bedroom — visualized as one well-made bed in a calm, breathing room rather than a styled showroom set.
- `creative_intent`: single well-considered space with restraint at the bedding, surface, and palette layers; soft natural morning light; breathing room around the bed is part of the composition; material visibility carries the brand's material-honesty signature.
- `bounded_creative_discretion`: bounded by the warm-restraint envelope (per the v50 grounding-note D2C instance); allowed and not-allowed framings articulated.
- `required_output_set`: 3 governed assets (HERO_WORLD, LIFE_IN_USE, OBJECT_VIGNETTE).
- `sku_key`: linked to SKU-CAMP-BEDSHEET-001 (1 product).
- `approved_reference_keys`: linked to all 5 brand-system references (REF-CAMP-BS-LIGHT/PALETTE/MATERIAL/HUMAN/RESTRAINT) + REF-CAMP-001-BEDROOM-ATMOSPHERE-001 (6 references total).

#### PKT-CAMP-002-TABLE

- `business_intent`: table packet supports the campaign's value proposition through the meal-for-two scenario — actual elements of a meal, no decorative additions, the table set for use rather than staged for display.
- `creative_intent`: table reads as set for use; restraint at the place-setting, table-surface, and no-extras layers; soft midday light; human presence implied or visible; material visibility carries the material-honesty signature.
- `bounded_creative_discretion`: bounded by the warm-restraint envelope; allowed and not-allowed framings articulated.
- `required_output_set`: 3 governed assets (HERO_WORLD, LIFE_IN_USE, OBJECT_VIGNETTE).
- `sku_key`: linked to SKU-CAMP-PLATE-001, SKU-CAMP-MUG-001, SKU-CAMP-GLASS-001, SKU-CAMP-SERVING-001 (4 products).
- `approved_reference_keys`: 5 brand-system references + REF-CAMP-002-TABLE-ATMOSPHERE-001 (6 references total).

#### PKT-CAMP-003-BATH

- `business_intent`: bath packet supports the campaign's value proposition through the restrained-bath scenario — towels and a single ceramic vessel, otherwise empty surfaces, the bath as a clean working surface rather than a styled vignette.
- `creative_intent`: bath reads as a clean working surface; restraint at the surface, towel-arrangement, and palette layers; soft afternoon light; objects breathe in the empty space; material visibility carries the material-honesty signature.
- `bounded_creative_discretion`: bounded by the warm-restraint envelope; allowed and not-allowed framings articulated.
- `required_output_set`: 3 governed assets (HERO_WORLD, LIFE_IN_USE, OBJECT_VIGNETTE).
- `sku_key`: linked to SKU-CAMP-TOWEL-BATH-001, SKU-CAMP-TOWEL-HAND-001, SKU-CAMP-VESSEL-001 (3 products).
- `approved_reference_keys`: 5 brand-system references + REF-CAMP-003-BATH-ATMOSPHERE-001 (6 references total).

`packet_status` left unchanged at `draft` for all 3 packets per Phase 2A scope (no status promotion).
`constraint_keys`, `composed_prompt_output`, `prompt_composition_notes`, `live_generated_image_v1`, `seam_runs`, `generated_assets`, `review_gates` all left empty per Phase 2A scope (Phase 2A-ii covers the inputs-wiring layer; downstream phases handle generation / curation / governance arcs).

### Batch 2 — output_slots slot_prompt updated (9 records)

Updated `slot_prompt` on all 9 existing `output_slots` rows per the Phase 2A plan §Step 6 proposed slot-prompt drafts. Per-slot prompts authored deliberately lean on cross-cutting brand-system framing — relying on packet-level inheritance via the lookup chain rather than verbatim cross-slot brand-system repetition. This preserves the schema-carries-structure vs schema-tolerance distinction (v50 grounding-note framing).

| output_slot_key | slot_prompt length |
|---|---|
| SLOT-CAMP-001-HERO_WORLD | 287 chars |
| SLOT-CAMP-001-LIFE_IN_USE | 208 chars |
| SLOT-CAMP-001-OBJECT_VIGNETTE | 226 chars |
| SLOT-CAMP-002-HERO_WORLD | 233 chars |
| SLOT-CAMP-002-LIFE_IN_USE | 197 chars |
| SLOT-CAMP-002-OBJECT_VIGNETTE | 212 chars |
| SLOT-CAMP-003-HERO_WORLD | 215 chars |
| SLOT-CAMP-003-LIFE_IN_USE | 187 chars |
| SLOT-CAMP-003-OBJECT_VIGNETTE | 181 chars |

`slot_status` left unchanged at `planned` for all 9 slots per Phase 2A scope (no status promotion). `slot_generated_image_v1`, `generated_assets`, `slot_evaluation_notes`, `generation_attempt_reference` all left empty per Phase 2A scope (downstream phases).

### Batch 3 — Lookup-flow check (verification only, no mutation)

After Steps 5 + 6 mutations completed, verified all 7 lookup chains end-to-end. This is the first time the chained `output_slots` lookups (which depend on `workflow_packets` lookups, which depend on link fields) were exercised after Phase 1 created the chain configuration.

#### First-tier lookups on workflow_packets (4 chains)

| Lookup field | Source | Result per packet (BEDROOM / TABLE / BATH) |
|---|---|---|
| `product_image_lookup` | `sku_key` → `products.product_image` | 1 / 4 / 3 product images surfaced ✓ |
| `product_status_lookup` | `sku_key` → `products.product_status` | `draft` per linked product ✓ |
| `approved_reference_asset_uri_lookup` | `approved_reference_keys` → `reference_assets.asset_uri` | empty (asset_uri held empty per Phase 2A scope; not a failure) ✓ |
| `approved_reference_image_lookup` | `approved_reference_keys` → `reference_assets.reference_image` | 6 reference images surfaced per packet (5 brand-system + 1 packet-atmosphere) ✓ |

`governed_output_count` rollup also verified = `0` per packet (no `generated_assets` records yet, as expected for Phase 2A scope).

#### Chained lookups on output_slots (3 chains)

| Lookup field | Chain | Result per slot |
|---|---|---|
| `product_image_lookup_lookup` | `packet_key` → `workflow_packets.product_image_lookup` (chained) | packet's product images surfaced to every slot (1 / 4 / 3 images depending on packet) ✓ |
| `packet_reference_asset_uri_lookup` | `packet_key` → `workflow_packets.approved_reference_asset_uri_lookup` (chained) | empty (cascades from upstream empty); not a failure ✓ |
| `packet_reference_image_lookup` | `packet_key` → `workflow_packets.approved_reference_image_lookup` (chained) | 6 reference images per slot (cascades cleanly through the chain) ✓ |

#### review_gates lookup (held)

`review_gates.packet_status_lookup` was not exercised — no `review_gates` records exist (out of Phase 2A scope). The chain is configured per Phase 1; verification deferred until a downstream phase creates `review_gates` records.

#### Lookup-flow check verdict

**PASS for all 7 exercised chains.** The chained `output_slots` lookups cascade correctly. Where source attributes are populated, lookups surface values; where source attributes are deliberately empty (`asset_uri` per Phase 2A scope), lookups are empty — recorded as expected absences, not failures. **Resolves Phase 1 SCS open question #1** (lookup-chain end-to-end behavior was unverified after Phase 1 because there was nothing for the chains to surface; this is the first end-to-end exercise and it works as configured).

## Structured Change Summary

**Why this change exists.** Phase 2A-ii completes the inputs-wiring layer of the campaign-mode operational test. After Phase 2A-i landed the input carriers (records + imagery), Phase 2A-ii wires the semantic relationships: packet content text articulates the per-packet creative intent and bounded discretion, packet→product linkages connect each packet to its specific products, packet→reference linkages connect each packet to all 5 brand-system references plus 1 packet-specific atmosphere reference, slot prompts encode role-specific compositional framings, and the lookup chain end-to-end verification confirms that upstream values flow correctly to every slot. With Phase 2A complete, the campaign base is now content-ready and reference-wired — what remains is Phase 2B (AI field-agent configuration) and Phase 2C onward (generation, curation, governance).

**What changed.** 3 `workflow_packets` records updated with 4 content fields each (`business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`) per the Phase 2A plan's §Step 5 proposed shapes. Per-packet linkages written: `sku_key` (1 / 4 / 3 products per packet), `approved_reference_keys` (6 references per packet — all 5 brand-system references linked to every packet so they surface to every slot via the lookup chain, plus the packet's own atmosphere reference). 9 `output_slots` records updated with `slot_prompt` per the Phase 2A plan's §Step 6 proposed drafts (181–287 chars per slot, role-specific compositional framing leaning on packet-level inheritance rather than verbatim cross-slot brand-system repetition). All 7 lookup chains verified end-to-end.

**What did not change.** `packet_status` remains `draft` across all 3 packets; `slot_status` remains `planned` across all 9 slots (no status promotion is part of Phase 2A scope). `constraint_keys`, `composed_prompt_output`, `prompt_composition_notes`, `live_generated_image_v1`, `seam_runs` link, `generated_assets` link, `review_gates` link all remain empty on `workflow_packets`. `slot_generated_image_v1`, `generated_assets` link, `slot_evaluation_notes`, `generation_attempt_reference` all remain empty on `output_slots`. The `products` table content from Phase 2A-i is unchanged. The `reference_assets` table from Phase 2A-i is unchanged (the records gained inbound `workflow_packets` reciprocal-link references, which is the natural consequence of the packet→reference linkages, but no fields on the reference records were rewritten). `asset_uri` on all 8 reference records remains empty by design. The SKU-driven Furniture v1 base is not modified. The Phase 2A plan, Phase 2A-i SCS, Phase 2 operational plan, Phase 1 plan + amendments + SCS, architecture apex, predecessor architectural passes, D2 decision note, setup-decision note, setup-content artifact, v50 grounding note, and connector tool capability limitations doc are all unchanged. No Phase 2B / 2C / 2D / 2E / 2F scope was opened.

**What remains out of scope.** AI field-agent configuration on `output_slots` for slot-level generation (Phase 2B; operator-side Airtable UI step). Generation invocation per packet (Phase 2C). Per-slot curation with full provenance writeback into `generated_assets` (Phase 2D). Cross-packet review-shaped coherence check (Phase 2E). Findings synthesis (Phase 2F). Constraint records, AI configuration, generation, candidate capture, curation, governed_assets writeback, status promotions, schema mutation, SKU-base singleSelect cleanup, `category` / `product_class` enum mismatch resolution all remain held.

## Pressure Points / Open Questions Carried Forward

1. **Phase 1 SCS open question #1 (lookup-chain end-to-end behavior) is RESOLVED.** First end-to-end exercise this Phase 2A-ii — all 7 chains flow values correctly. The chained `output_slots` lookups cascade through the `workflow_packets` lookup tier without configuration defects. This was the longest-standing operational uncertainty about the campaign base's mirrored schema.
2. **`category` and `product_class` enum mismatch** (Phase 1 SCS open question #2) remains held. Both fields stay empty across the 8 products. Decision deferred until operational evidence informs it.
3. **SKU-base singleSelect option pollution** (Phase 1 SCS open question #3) remains out of scope; separate small mutation with its own plan-before-execute discipline if/when earned.
4. **Diagnostic caveat continues to apply.** Any Phase 2C / Phase 2D failure outcome must be diagnosed before being read as schema pressure or apex pressure. The Phase 2A plan's Diagnostic Lens classifies which category each observation falls into. Phase 2A-i + Phase 2A-ii together satisfy the procedural minimum intended to reduce **Q5 (weak articulation / underbuilt setup)** ambiguity — imagery, references, content, and linkages are populated at the procedural minimum or above. Final Q5 interpretation remains dependent on Phase 2C / Phase 2D evidence (whether the references and content actually bind at generation time).
5. **Inbound reciprocal links on `reference_assets`.** The Phase 2A-ii packet→reference linkages caused all 8 reference records to gain `workflow_packets` reciprocal links (5 brand-system reference records linked to all 3 packets; 3 packet-atmosphere reference records each linked to their corresponding packet only). This is the natural Airtable reciprocal-link behavior, not a separate field write. No surprise.
6. **`approved_reference_asset_uri_lookup` empty on workflow_packets and `packet_reference_asset_uri_lookup` empty on output_slots** — both lookups cascade from `reference_assets.asset_uri` which is empty across all 8 records by Phase 2A scope (operator-latitude per the Phase 2A plan; not earned for Phase 2A). The chains are configured correctly; they cascade nothing because the source is deliberately empty. If a later phase populates `asset_uri` on any reference record, the lookups will surface those values without further configuration.
7. **`governed_output_count` rollup** = 0 per packet, as expected. Will increment as `generated_assets` records with `governed_output_status: governed_output` are created in Phase 2D and beyond.

## What This Note Does NOT Do

- Does not authorize Phase 2B (AI field-agent configuration), Phase 2C (generation), Phase 2D (curation), Phase 2E (cross-packet coherence check), or Phase 2F (findings synthesis) mutation.
- Does not modify the SKU-driven Furniture v1 base.
- Does not write any AI configuration, generation, candidate capture, curation, or `generated_assets` records.
- Does not promote `packet_status` beyond `draft` or `slot_status` beyond `planned`.
- Does not change architectural doctrine, the v1 apex, any predecessor pass, the v50 grounding note, or any Phase 2 / Phase 1 / Phase 2A planning artifact.
- Does not propose a `category` / `product_class` enum resolution, SKU-base singleSelect cleanup, or any schema mutation on either base.
- Does not author findings about generation, curation, or family coherence — those depend on Phase 2C and beyond.

## Phase 2A Terminal State

With Phase 2A-i and Phase 2A-ii both complete, **Phase 2A scope as defined in the merged Phase 2A plan is fully landed.** The campaign base is now:

- **Content-ready**: 8 products with detail text + imagery; 3 packets with creative content; 9 slots with role-specific prompts; 8 reference records with content + imagery.
- **Reference-wired**: all 3 packets linked to their products and to the full set of brand-system + packet-atmosphere references; the 7 lookup chains flow values cleanly to every slot.
- **Generation-pending**: AI field-agent not yet configured (Phase 2B); no generation invoked; no candidates captured; no `generated_assets` records.

Next decision moment is Phase 2B authorization (operator-side AI field-agent configuration in the Airtable UI). Held.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-2a-plan-v1.md`](campaign-mode-base-setup-phase-2a-plan-v1.md): merged Phase 2A plan defining Steps 2–7; this artifact records execution of Steps 5 + 6 + 7
- [`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md): Phase 2A-i SCS recording Steps 2 + 3 + 4 (records + imagery)
- [`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md): Phase 2 operational plan; Phase 2A is the inputs-prep sub-phase, decomposed into 2A-i + 2A-ii
- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): Phase 1 SCS; structural ground that Phase 2A populated. Open question #1 (lookup-chain end-to-end behavior) is now RESOLVED by Phase 2A-ii

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): operational arc shape; Phase 2A is the inputs-prep portion, Phase 2B–F continue the arc

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
