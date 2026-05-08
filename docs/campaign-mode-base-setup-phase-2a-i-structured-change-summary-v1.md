# Campaign Mode Base Setup // Phase 2A-i Structured Change Summary v1

## Purpose

This artifact records completion of the Phase 2A-i mutation — the inputs-prep records-and-imagery-only sub-cycle of Phase 2A, executed against the merged Phase 2A plan ([`docs/campaign-mode-base-setup-phase-2a-plan-v1.md`](campaign-mode-base-setup-phase-2a-plan-v1.md)) and the merged Phase 2A reference_role preflight (mapping confirmed: all Phase 2A reference records → `approved_directional_reference`).

Phase 2A-i covers Steps 2 + 3 + 4 of the merged Phase 2A plan: per-product content + imagery, brand-system reference records + imagery, packet-level atmosphere reference records + imagery. It does NOT cover Step 5 (per-packet content + linkages), Step 6 (slot prompts), or Step 7 (lookup-flow check) — those remain held for Phase 2A-ii.

It is not new doctrine, not Phase 2A-ii scope opening, and not a re-statement of the merged Phase 2A plan. It is the terminal record of Phase 2A-i.

## Posture

```text
one artifact (this completion summary)
no further airtable mutation in this artifact
no rewrite of the merged Phase 2A plan
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 2 operational plan / Phase 1 plan / Phase 1 amendments / Phase 1 SCS
no v2 apex
no Phase 2A-ii scope opening
```

## Mutation Target

| Field | Value |
|---|---|
| Base name | `asset-pipeline-ASK // Campaign-Driven D2C Home-Goods v1` |
| Base ID | `appCAcRuA82SWj5h5` |
| Phase 2A-i scope | products text fields + imagery; reference_assets records + imagery |
| Phase 2A-i out of scope | workflow_packets content + linkages; output_slots slot_prompt; lookup-flow check |

## Execution Record

Phase 2A-i mutation executed in three connector batches against the campaign base.

### Batch 1 — products text fields + product_image attachments (8 records updated)

Updated all 8 existing `products` records with `material_notes`, `finish_notes`, `identifying_details`, and `product_image` attachment per the Phase 2A plan §Step 2 proposed shapes.

| sku_key | material_notes | finish_notes | identifying_details |
|---|---|---|---|
| SKU-CAMP-BEDSHEET-001 | natural-fiber bedding (cotton, linen, or similar honest fiber) | woven texture, soft hand, low-sheen | sheet + pillowcase set; restrained edge stitch |
| SKU-CAMP-PLATE-001 | ceramic / stoneware tableware | matte or low-gloss glaze | round dinner-scale plate; restrained rim profile |
| SKU-CAMP-MUG-001 | ceramic / stoneware | matte or low-gloss glaze | upright cylindrical mug profile; restrained handle |
| SKU-CAMP-GLASS-001 | clear glass | smooth, untextured | tumbler or simple-stem profile |
| SKU-CAMP-SERVING-001 | ceramic / stoneware | matte or low-gloss glaze | shallow serving bowl or platter; generous footprint |
| SKU-CAMP-TOWEL-BATH-001 | natural-fiber terry or waffle weave | absorbent, low-sheen | full bath-scale towel; restrained edge |
| SKU-CAMP-TOWEL-HAND-001 | natural-fiber terry or waffle weave | absorbent, low-sheen | hand-scale towel; restrained edge |
| SKU-CAMP-VESSEL-001 | ceramic / stoneware | matte or low-gloss glaze | small upright vessel; bath-scale |

`product_image` attachment per SKU uploaded from the operator-curated Phase 2A imagery v3 batch (saved to `asset-pipeline-ASK-EXTERNAL/scratch/phase-2A-imagery/<SKU>.jpg`). Attachments cached to Airtable's CDN (`airtableusercontent.com`) — durable, no longer dependent on the Dropbox source URL.

`category`, `product_class`, `product_status`, and `workflow_packets` left unchanged per Phase 2A plan scope (Phase 1 SCS open question #2 — `category` / `product_class` enum mismatch held; `workflow_packets` link is Phase 2A-ii scope).

### Batch 2 — brand-system reference_assets created (5 records)

Created 5 new `reference_assets` records at brand-system scope. All `reference_role: approved_directional_reference` per the merged Phase 2A reference_role preflight.

| reference_key | conceptual carrier |
|---|---|
| REF-CAMP-BS-LIGHT-001 | Lighting register at brand-system scope |
| REF-CAMP-BS-PALETTE-001 | Palette register at brand-system scope |
| REF-CAMP-BS-MATERIAL-001 | Material register at brand-system scope |
| REF-CAMP-BS-HUMAN-001 | Human-presence register at brand-system scope |
| REF-CAMP-BS-RESTRAINT-001 | Restraint discipline at brand-system scope |

Each record carries: `reference_key`, `reference_role` = `approved_directional_reference`, `reference_note` per the Phase 2A plan §Step 3 proposed content, `reference_image` attachment from the operator-curated v3 batch. `asset_uri` left blank (operator-latitude per the Phase 2A plan; not earned for Phase 2A). `constraint_key` left blank. `workflow_packets` link left blank — Phase 2A-ii will write per-packet linkages with all 5 brand-system references linked to all 3 packets so they surface to every slot via the lookup chain.

### Batch 3 — packet-level atmosphere reference_assets created (3 records)

Created 3 new `reference_assets` records at packet-level scope. All `reference_role: approved_directional_reference`.

| reference_key | packet (linkage held for Phase 2A-ii) |
|---|---|
| REF-CAMP-001-BEDROOM-ATMOSPHERE-001 | PKT-CAMP-001-BEDROOM |
| REF-CAMP-002-TABLE-ATMOSPHERE-001 | PKT-CAMP-002-TABLE |
| REF-CAMP-003-BATH-ATMOSPHERE-001 | PKT-CAMP-003-BATH |

Same field structure as Batch 2. `workflow_packets` link held for Phase 2A-ii — packet-level atmosphere references will be linked only to their corresponding packet (not cross-linked).

### Validation

Post-mutation verification ran against the campaign base. Results per the Phase 2A-i scope's verification checklist:

| Check | Result |
|---|---|
| 8 `products` have expected `material_notes` / `finish_notes` / `identifying_details` populated | ✓ |
| 8 `products` have `product_image` attachment cached on Airtable CDN | ✓ |
| 8 `reference_assets` records exist (5 brand-system + 3 packet-atmosphere) | ✓ |
| All 8 `reference_assets` records have `reference_key` per spec | ✓ |
| All 8 `reference_assets` records have `reference_role` = `approved_directional_reference` | ✓ |
| All 8 `reference_assets` records have `reference_note` populated | ✓ |
| All 8 `reference_assets` records have `reference_image` attachment cached on Airtable CDN | ✓ |
| `asset_uri` on all 8 `reference_assets` empty (not in scope) | ✓ |
| `workflow_packets` records remain content-empty (no `business_intent` / `creative_intent` / `bounded_creative_discretion` / `required_output_set` writes) | ✓ |
| `workflow_packets.sku_key`, `.approved_reference_keys`, `.constraint_keys` all empty (no upstream linkages) | ✓ |
| `workflow_packets` reciprocal `output_slots` link unchanged from Phase 1 (3 slots per packet) | ✓ |
| `output_slots` `slot_prompt` empty across all 9 slots | ✓ |
| `output_slots.slot_status` = `planned` across all 9 slots (no status promotion) | ✓ |
| `products.category`, `.product_class`, `.product_status`, `.workflow_packets` link unchanged | ✓ |
| No unintended records or fields changed | ✓ |

## Structured Change Summary

**Why this change exists.** Phase 2A-i populates the input-carrier layer of the campaign-mode operational test before the system is semantically wired in Phase 2A-ii. Splitting the mutation this way preserves diagnostic isolation: if any later issue surfaces in Phase 2C generation or Phase 2D curation, the input layer (text fields + imagery + reference records) was created cleanly and separately from the wiring layer (packet content + linkages + slot prompts), so root-cause attribution stays sharp. The split was directly motivated by the Phase 2A plan's diagnostic-lens framing — Q5 (weak articulation / underbuilt setup) ambiguity is harder to disambiguate when records, imagery, linkages, and prompts all land in one cycle.

**What changed.** 8 `products` records updated with text fields and product_image attachments per the Phase 2A plan's §Step 2 proposed shapes. 8 new `reference_assets` records created (5 brand-system + 3 packet-atmosphere) with `reference_key`, `reference_role` = `approved_directional_reference`, `reference_note`, and `reference_image` attachment per the Phase 2A plan's §Step 3 + §Step 4 proposed content. All 16 imagery attachments uploaded via Dropbox-shared-URL fetch (Airtable's standard pattern) and cached to Airtable's CDN; the Dropbox token used to generate the share URLs has served its one-time purpose and can be revoked operator-side without affecting the durability of the mutation.

**What did not change.** `workflow_packets` records remain content-empty (no `business_intent` / `creative_intent` / `bounded_creative_discretion` / `required_output_set`) and unlinked (no `sku_key`, `approved_reference_keys`, or `constraint_keys` writes); the `output_slots` reciprocal link from Phase 1 is preserved. `output_slots.slot_prompt` remains empty across all 9 slots; `slot_status` remains `planned`. `products.category` and `.product_class` remain empty per Phase 1 SCS open question #2. The SKU-driven Furniture v1 base is not modified. The Phase 2A plan, Phase 2A reference_role preflight, Phase 1 plan + amendments + SCS, Phase 2 operational plan, architecture apex, predecessor architectural passes, D2 decision note, setup-decision note, setup-content artifact, and connector tool capability limitations doc are all unchanged. No Phase 2A-ii scope was opened.

**What remains out of scope.** The Phase 2A-ii sub-cycle: `workflow_packets` content fields (4 fields × 3 records = 12 writes), packet→product linkages (`workflow_packets.sku_key` per the Phase 2A plan §Step 5 product mix), packet→reference linkages (`workflow_packets.approved_reference_keys` — all 5 brand-system references linked to all 3 packets + 1 packet-specific atmosphere reference per packet), slot prompts (9 `output_slots.slot_prompt` writes per the Phase 2A plan §Step 6 proposed drafts), the lookup-flow check (Phase 2A plan §Step 7 verification of all 7 lookup chains end-to-end), and Phase 2A-ii structured change summary. Constraint records, AI field-agent configuration, generation invocation, candidate capture, curation, governed_assets writeback, status promotions beyond `planned` / `draft`, schema mutation, and SKU-base singleSelect cleanup also remain held.

## Pressure Points / Open Questions Carried Forward

1. **Lookup-chain end-to-end behavior** (Phase 1 SCS open question #1, Phase 2A plan §Step 7). Still unverified — Phase 2A-i did not write upstream linkages (`workflow_packets.sku_key`, `.approved_reference_keys`), so the lookup chains have nothing to surface yet. Phase 2A-ii is the first time the chained `output_slots` lookups will be exercised end-to-end.
2. **`category` and `product_class` enum mismatch** (Phase 1 SCS open question #2). Held; both fields remain empty across the 8 products. Decision deferred.
3. **SKU-base singleSelect option pollution** (Phase 1 SCS open question #3). Out of scope; remains a separate small mutation for a future scoped plan.
4. **Diagnostic caveat continues to apply.** Any Phase 2C / Phase 2D failure outcome must be diagnosed before being read as schema pressure or apex pressure. The Phase 2A plan's Diagnostic Lens classifies which category each observation falls into.
5. **Reference_role conceptual scope distinction lives in `reference_key` + `reference_note`, not in the enum** — confirmed in this mutation. All 8 reference records share the same `approved_directional_reference` role; brand-system vs. packet-level scope is encoded in the `REF-CAMP-BS-*` vs. `REF-CAMP-{packet}-ATMOSPHERE-*` key naming and in the `reference_note` text. Matches the Phase 2A reference_role preflight finding.
6. **Operator-side imagery generation pattern** — Phase 2A imagery prompts v3 (calibrated against v50 grounding-note D2C instance + first-batch evidence: bright daylit register + clean refined material register, NOT moody / NOT rustic) produced the imagery used here. Pattern is documented for Phase 2C if generation tooling needs the same lookup-chain references in a similar register.

## What This Note Does NOT Do

- Does not authorize Phase 2A-ii mutation or open Phase 2A-ii scope.
- Does not modify the SKU-driven Furniture v1 base.
- Does not validate the lookup chain end-to-end (Phase 2A-ii scope; nothing for the chain to surface yet).
- Does not write any `workflow_packets` content, packet linkages, slot prompts, AI configuration, generation, curation, or governed_assets records.
- Does not change architectural doctrine, the v1 apex, any predecessor pass, the v50 grounding note, or any Phase 2 / Phase 1 / Phase 2A planning artifact.
- Does not propose a `category` / `product_class` enum resolution, SKU-base singleSelect cleanup, or any schema mutation on either base.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-2a-plan-v1.md`](campaign-mode-base-setup-phase-2a-plan-v1.md): merged Phase 2A plan defining Steps 2–7; this artifact records execution of Steps 2 + 3 + 4 (records + imagery), with Steps 5 + 6 + 7 held for Phase 2A-ii
- [`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md): Phase 2 operational plan; Phase 2A is the inputs-prep sub-phase, decomposed into 2A-i + 2A-ii
- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): Phase 1 SCS; structural ground that Phase 2A-i populates. Open questions #1, #2 carried forward
- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): durable connector tool-capability reference; all Phase 2A-i operations were within the supported field-type union

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): operational arc shape (records + imagery + linkages + curation); Phase 2A-i is the records + imagery portion of that arc

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
