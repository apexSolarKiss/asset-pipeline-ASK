# Campaign Mode Base Setup // Phase 2A Plan v1

## Purpose

This is the Phase 2A plan-before-execute artifact. Phase 2A is the inputs-prep sub-phase of Phase 2 per the merged Phase 2 operational plan ([`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md) §Phase 2A). It populates content fields, creates `reference_assets` records (including the procedural brand-system reference packet), drafts slot prompts, writes the upstream linkages, and verifies the lookup chains flow values end-to-end.

It is the plan-before-execute artifact required by AGENTS.md Airtable Mutation Discipline. It does not authorize Phase 2A mutation; it defines what Phase 2A mutation would do if ASK authorizes it. It does not pre-decide AI configuration, generation, curation, or any subsequent sub-phase.

The slot prompt drafts and packet content drafts in this plan are explicitly marked as **proposed Phase 2A content**. They are reviewable plan content, not yet authored into the base. Final authoring would happen at the mutation step against the proposed content here, with operator latitude for refinement before the actual write.

## Posture

```text
plan only — no airtable mutation in this artifact
phase 2A scope: inputs prep (content + references + linkages + lookup-flow check)
no AI field-agent configuration
no generation
no curation
no generated_assets records
no governed output
no schema mutation
no v2 apex
no findings synthesis
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 1 plan / Phase 1 amendments / Phase 1 SCS / Phase 2 operational plan
no external-reader doc
no authorization for Phase 2A mutation itself
```

The diagnostic caveat from the setup-decision artifact and Phase 2 operational plan is carried forward. Brand names stay operator-side per the v47 grounding-note rule, which extends to compressed external aesthetic dicta. The campaign concept is **Warm Restraint** per the setup-content artifact's Reading Notes.

## Load-Bearing Principle Preserved

```text
Phase 2 tests whether the mirrored schema carries campaign-mode structure,
not merely whether campaign-mode outputs can be produced inside the mirrored schema.
```

Phase 2A is the input layer of that test. The proposed slot prompts below are deliberately lean on cross-cutting brand-system framing and rely on packet-level `creative_intent` text plus reference-imagery linkages plus per-product `product_image` attachments to surface the warm-restraint envelope onto each slot via the schema's existing layered carriers. This is the schema-carries-structure shape under test.

If, after Phase 2C generation, the candidate pool drifts away from warm-restraint without per-slot brand-system prose, that is Q7 evidence (earned `brand_system` carrier). If, after Phase 2C, the curator at the seam has to ratify candidates against criteria the schema did not express upstream, that is Q3 evidence (curator compensation). If it carries cleanly via inheritance, that is Q1 evidence (schema carries). Phase 2A's job is to make this distinction observable in Phase 2C onward — not to pre-bake one outcome by repeating brand-system framing in every slot prompt.

## ASK Direction Recap

Per the relayed prompt opening Phase 2A:

- **Phase 2A scope** is inputs-only: packet content, per-product detail + imagery, `reference_assets` plan including the procedural brand-system reference packet, packet→product linkages, packet→reference linkages, 9 slot_prompt drafts, explicit lookup-flow check.
- **Out of scope** for Phase 2A: AI field-agent configuration, generation, curation, `generated_assets`, governed output, schema mutation, v2 apex, findings synthesis.
- **Operator-side (not connector) work** — gathering reference imagery and per-SKU product imagery — must happen before mutation begins, since the connector cannot produce imagery; it can only upload it.

## Live State Confirmed Before This Plan

Live state of campaign base `appCAcRuA82SWj5h5` (verified 2026-05-07):

- 8 tables / 95 fields per Phase 1 SCS — unchanged.
- 3 `workflow_packets` rows (`PKT-CAMP-001-BEDROOM`, `-002-TABLE`, `-003-BATH`) in `draft`, all four content fields empty, no upstream linkages (`sku_key`, `constraint_keys`, `approved_reference_keys`, `output_slots` reciprocal already populated, others empty).
- 9 `output_slots` rows (3 per packet) in `planned`, role values populated (`hero_world` / `life_in_use` / `object_vignette`), `slot_prompt` empty, `slot_generated_image_v1` empty.
- 8 `products` rows in `draft` (one canonical SKU per type), `product_name` populated, `material_notes` / `finish_notes` / `identifying_details` / `product_image` empty, `category` and `product_class` empty (per Phase 1 SCS open question #2 — held).
- `reference_assets` table present, 0 records.
- All 8 lookup fields present and chain-valid; all empty.

## What Phase 2A Will Do

Phase 2A executes as one bounded mutation cycle, in dependency order.

### Step 1 // Operator-side imagery gathering (pre-mutation)

Before connector mutation begins, the operator gathers two image sets:

- **Brand-system reference imagery** — 3–5 images encoding the warm-restraint envelope at brand-system scope (lighting register, palette register, material register, human-presence register, restraint discipline). Per Phase 2 operational plan §Brand-System Reference Path. Imagery sourced operator-side; not authored by connector.
- **Per-product imagery** — at minimum one canonical product photograph per SKU (8 SKUs total). Stylistically coherent across the 8 SKUs in lighting / framing register so that product-truth carriers don't smuggle conflicting brand-system signals into the test. If consistent imagery is not available for all 8 SKUs at minimum quality, the gap is recorded honestly and Phase 2A authorization decides whether to proceed (with the gap diagnostic-flagged) or to hold until imagery is available.

Operator-side gathering is not a mutation; it is the input that the mutation step uploads. This step's "completion" is the assembly of an image set ready for upload, not records in the base.

### Step 2 // Per-product content + imagery (8 product records)

Update each of the 8 existing `products` rows:

| SKU | Proposed material_notes shape | Proposed finish_notes shape | Proposed identifying_details shape |
|---|---|---|---|
| `SKU-CAMP-BEDSHEET-001` (Bed Sheet Set) | natural-fiber bedding (cotton, linen, or similar honest fiber) | woven texture, soft hand, low-sheen | sheet + pillowcase set; restrained edge stitch |
| `SKU-CAMP-PLATE-001` (Dinner Plate) | ceramic / stoneware tableware | matte or low-gloss glaze | round dinner-scale plate; restrained rim profile |
| `SKU-CAMP-MUG-001` (Mug) | ceramic / stoneware | matte or low-gloss glaze | upright cylindrical mug profile; restrained handle |
| `SKU-CAMP-GLASS-001` (Drinking Glass) | clear glass | smooth, untextured | tumbler or simple-stem profile |
| `SKU-CAMP-SERVING-001` (Serving Vessel) | ceramic / stoneware | matte or low-gloss glaze | shallow serving bowl or platter; generous footprint |
| `SKU-CAMP-TOWEL-BATH-001` (Bath Towel) | natural-fiber terry or waffle weave | absorbent, low-sheen | full bath-scale towel; restrained edge |
| `SKU-CAMP-TOWEL-HAND-001` (Hand Towel) | natural-fiber terry or waffle weave | absorbent, low-sheen | hand-scale towel; restrained edge |
| `SKU-CAMP-VESSEL-001` (Bath Vessel) | ceramic / stoneware | matte or low-gloss glaze | small upright vessel; bath-scale |

The shape is proposed; the actual text per SKU may be tightened or expanded at mutation time. `category` and `product_class` remain empty per Phase 1 SCS open question #2.

`product_image` attachment uploaded per SKU from the operator-gathered imagery.

`product_status` stays `draft`.

`workflow_packets` link not written here; written in Step 5.

### Schema preflight before Steps 3 and 4

Before Phase 2A mutation, inspect the existing `reference_assets.reference_role` singleSelect option set. Phase 2A must use only existing options unless ASK explicitly authorizes a scoped select-option mutation. Proposed reference-role language in this plan is conceptual; the actual Airtable values must be mapped to existing options or held pending a separate schema decision.

This preflight applies to both Step 3 (brand-system references) and Step 4 (packet-level atmosphere references). The conceptual role names in the tables below are reviewable plan content; the operator confirms the option mapping before the connector writes the records. If the existing option set does not cover the conceptual roles needed at procedural minimum (lighting / palette / material register), Phase 2A pauses and the gap becomes a separate scoped select-option decision.

### Step 3 // `reference_assets` records — brand-system reference packet

Create 3–5 `reference_assets` records at brand-system scope. Procedural minimum per Phase 2 operational plan:

| Proposed reference_key | Conceptual role | Carries |
|---|---|---|
| `REF-CAMP-BS-LIGHT-001` | brand-system atmosphere | natural-light register; soft daylight or low-direct-sun warmth |
| `REF-CAMP-BS-PALETTE-001` | brand-system atmosphere | warm-neutral palette register; material-honest tonality |
| `REF-CAMP-BS-MATERIAL-001` | material register | linen / wood / ceramic / cotton material visibility |
| `REF-CAMP-BS-HUMAN-001` (optional) | brand-system atmosphere | human-presence register (visible in-use, restrained gesture) |
| `REF-CAMP-BS-RESTRAINT-001` (optional) | brand-system atmosphere | restraint discipline (negative space, breathing room) |

3 records minimum (light + palette + material); 4–5 if human-presence and restraint are differentiated as their own references.

Each record:
- `reference_key`: as proposed above
- `reference_role`: mapped to an existing singleSelect option per the schema preflight above; the conceptual role names in the table are guidance for the mapping, not the literal values to write
- `reference_image`: the brand-system reference image attachment from Step 1
- `reference_note`: 1–2 sentences describing what the image carries that prose cannot
- `asset_uri`: optional; left blank unless an external URL is meaningful
- `constraint_key`, `workflow_packets`: empty here; the packet linkage is written in Step 5

The proposed role names above are conceptual labels. Actual `reference_role` values must be mapped to the existing singleSelect options verified before mutation, or deferred to a separate scoped schema decision.

### Step 4 // `reference_assets` records — packet-level atmosphere references

Create 1–2 `reference_assets` records per packet (3–6 total):

| Proposed reference_key | Conceptual role | Packet | Carries |
|---|---|---|---|
| `REF-CAMP-001-BEDROOM-ATMOSPHERE-001` | studio world | PKT-CAMP-001-BEDROOM | bedroom atmosphere; soft morning light; restrained bed-room composition |
| `REF-CAMP-002-TABLE-ATMOSPHERE-001` | studio world | PKT-CAMP-002-TABLE | table atmosphere; soft midday light; meal-for-two staging |
| `REF-CAMP-003-BATH-ATMOSPHERE-001` | studio world | PKT-CAMP-003-BATH | bath atmosphere; soft afternoon light; restrained surface |

Optional second packet-level reference per packet if operator has layered atmosphere references available.

These records are linked to their respective packets in Step 5; brand-system references from Step 3 are linked to ALL THREE packets in Step 5 so the lookup chain surfaces brand-system imagery onto every slot.

### Step 5 // Per-packet content + linkages (3 packet records)

Update each of the 3 existing `workflow_packets` rows.

#### PKT-CAMP-001-BEDROOM

| Field | Proposed content shape |
|---|---|
| `business_intent` | The bedroom packet supports the campaign's value proposition that fewer, considered things produce a more livable bedroom — visualized as one well-made bed in a calm, breathing room rather than a styled showroom set. |
| `creative_intent` | The bedroom reads as a single well-considered space with restraint at the bedding, surface, and palette layers. Soft natural morning light. The breathing room around the bed is part of the composition. Material visibility (sheet weave, pillowcase edge) carries the brand's material-honesty signature. |
| `bounded_creative_discretion` | The creative is bounded by the warm-restraint envelope: restraint that stays warm, not austerity. Allowed: soft styling adjustments, alternative camera distances within the establishing / human-presence / object-focus role-set. Not allowed: decorative pillow towers, styled clutter, over-layered textiles, hotel-luxury ornament, or any styling that contradicts the *fewer, considered things* discipline. |
| `required_output_set` | 3 governed assets: HERO_WORLD (establishing shot of restrained bedroom), LIFE_IN_USE (human-presence interaction with bedding), OBJECT_VIGNETTE (single-object material close-up). |

#### PKT-CAMP-002-TABLE

| Field | Proposed content shape |
|---|---|
| `business_intent` | The table packet supports the campaign's value proposition through the meal-for-two scenario — actual elements of a meal, no decorative additions, the table set for use rather than staged for display. |
| `creative_intent` | The table reads as set for use. Restraint at the place-setting, table-surface, and no-extras layers. Soft midday light. Human presence implied or visible (a meal about to begin or in progress). Material visibility (ceramic glaze, glass clarity, linen texture) carries the material-honesty signature. |
| `bounded_creative_discretion` | Bounded by the warm-restraint envelope. Allowed: place-setting variation within meal-for-two scope, alternative camera angles within the role-set. Not allowed: centerpieces, styled food arrangements, decorative additions, glossy glam-luxury styling, or any over-styling that contradicts the *set for use, not staged for display* discipline. |
| `required_output_set` | 3 governed assets: HERO_WORLD (establishing shot of restrained table), LIFE_IN_USE (human-presence interaction with tableware), OBJECT_VIGNETTE (single-object material close-up). |

#### PKT-CAMP-003-BATH

| Field | Proposed content shape |
|---|---|
| `business_intent` | The bath packet supports the campaign's value proposition through the restrained-bath scenario — towels and a single ceramic vessel, otherwise empty surfaces, the bath as a clean working surface rather than a styled vignette. |
| `creative_intent` | The bath reads as a clean working surface. Restraint at the surface, towel-arrangement, and palette layers. Soft afternoon light. The objects breathe in the empty space. Material visibility (towel weave, ceramic glaze) carries the material-honesty signature. |
| `bounded_creative_discretion` | Bounded by the warm-restraint envelope. Allowed: towel-arrangement variation within the restrained scope, alternative camera angles within the role-set. Not allowed: clustered toiletries, decorative arrangements, spa-styled vignettes, or any styling that contradicts the *clean working surface* discipline. |
| `required_output_set` | 3 governed assets: HERO_WORLD (establishing shot of restrained bath), LIFE_IN_USE (human-presence interaction with towels / vessel), OBJECT_VIGNETTE (single-object material close-up). |

#### Per-packet linkages

For each packet:
- `sku_key` → linked to the packet's specific products:
  - PKT-CAMP-001-BEDROOM → SKU-CAMP-BEDSHEET-001
  - PKT-CAMP-002-TABLE → SKU-CAMP-PLATE-001, SKU-CAMP-MUG-001, SKU-CAMP-GLASS-001, SKU-CAMP-SERVING-001
  - PKT-CAMP-003-BATH → SKU-CAMP-TOWEL-BATH-001, SKU-CAMP-TOWEL-HAND-001, SKU-CAMP-VESSEL-001
- `approved_reference_keys` → linked to the packet's references:
  - All 3 brand-system references (REF-CAMP-BS-*) — same set on all 3 packets, so brand-system imagery surfaces to every slot
  - The packet's own atmosphere reference (REF-CAMP-{packet}-ATMOSPHERE-001)
- `constraint_keys`: empty (held; constraint_rules records not created in Phase 2A unless surfaced as needed)

`packet_status` stays `draft`.

`composed_prompt_output`, `prompt_composition_notes`, `live_generated_image_v1`: empty (not Phase 2A scope; held for later sub-phases or never used in this test).

### Step 6 // Slot prompts (9 output_slots records)

Update `slot_prompt` on each of the 9 existing `output_slots` rows. The proposed slot prompts below are deliberately:

- Role-specific: HERO_WORLD compositional, LIFE_IN_USE behavioral, OBJECT_VIGNETTE focal.
- Packet-topical: bedroom / table / bath subject named.
- **Lean on cross-cutting brand-system framing** — they do not verbatim-repeat warm-restraint envelope language across all 9 slots. Brand-system framing is expected to surface via packet `creative_intent` text + packet `approved_reference_keys` reference imagery + per-product `product_image` attachments via the lookup chain.

This is the schema-carries-structure shape under test. If the slot prompts each verbatim-repeat warm-restraint framing, that pre-bakes Q2 (prose compensation) into the test. The proposed shape below relies on inheritance.

#### PKT-CAMP-001-BEDROOM slots

| Slot | Proposed slot_prompt shape |
|---|---|
| HERO_WORLD | Establishing shot of the restrained bedroom: one well-made bed, no decorative pillow tower, no styling clutter. The breathing room around the bed is part of the composition; the empty area in the frame matters as much as the bed itself. Soft natural morning light. Single point of focus. |
| LIFE_IN_USE | Closer-in human-presence shot in the restrained bedroom: hands smoothing a sheet, lifting a duvet corner, or arranging a single pillow. Visible in-use, restrained gesture, no over-styling. Soft morning light. |
| OBJECT_VIGNETTE | Single-object close-up in the restrained bedroom: the bed sheet's weave, a pillowcase edge stitch, or a folded corner. Generous negative space around the subject. Material visibility foreground; light-on-fabric is the subject. |

#### PKT-CAMP-002-TABLE slots

| Slot | Proposed slot_prompt shape |
|---|---|
| HERO_WORLD | Establishing shot of the restrained table: a meal for two, no centerpiece, no over-styling. Plate, glass, cup, serving piece — the elements of an actual meal. The table reads as set for use, not staged for display. Soft midday light. |
| LIFE_IN_USE | Closer-in human-presence shot at the restrained table: hands lifting a cup mid-meal, pouring from the serving piece, or reaching for a plate. Restrained gesture, mid-meal moment. Soft midday light. |
| OBJECT_VIGNETTE | Single-object close-up on the restrained table: a plate's rim, a glass's stem, the texture of a ceramic mug. Generous negative space. Material visibility foreground; the object's surface and edge are the subject. |

#### PKT-CAMP-003-BATH slots

| Slot | Proposed slot_prompt shape |
|---|---|
| HERO_WORLD | Establishing shot of the restrained bath: towels and one ceramic vessel, otherwise empty surfaces. No clustered toiletries, no decorative arrangement. The bath reads as a clean working surface. Soft afternoon light. |
| LIFE_IN_USE | Closer-in human-presence shot in the restrained bath: hands reaching for a towel, drying a hand, or lifting the ceramic vessel. Restrained gesture, post-bath moment. Soft afternoon light. |
| OBJECT_VIGNETTE | Single-object close-up in the restrained bath: the weave of a bath towel, the curve of the ceramic vessel, or a folded edge. Generous negative space. Material visibility foreground. |

**Reading note on the slot prompt drafts.** These are proposed Phase 2A content. The shape is what's being approved at plan-review time; minor wording adjustments at the mutation step are operator-latitude. If at mutation review the proposed slot prompt looks too lean to bind a candidate to the brand-system references, that is itself a Phase 2A finding worth recording — and the right move at that point is to keep the prompt lean and let Phase 2C generation surface the binding question, rather than thicken the prompt to pre-bake schema tolerance.

`slot_status` stays `planned`. `slot_generated_image_v1`, `generated_assets`, `slot_evaluation_notes`, `generation_attempt_reference` remain empty.

### Step 7 // Lookup-flow check (verification, no mutation)

After Steps 2–6 complete, verify each of the seven Phase 1 lookup chains flows values end-to-end. This is the first time the chained lookups are exercised after Phase 1 SCS open question #1.

Per-lookup verification:

| Field | Source link | Source attribute | Expected after Phase 2A |
|---|---|---|---|
| `workflow_packets.product_image_lookup` | `sku_key` → products | `products.product_image` | populated with the linked products' image attachments |
| `workflow_packets.product_status_lookup` | `sku_key` → products | `products.product_status` | populated with `draft` per linked product |
| `workflow_packets.approved_reference_asset_uri_lookup` | `approved_reference_keys` → reference_assets | `reference_assets.asset_uri` | populated with linked reference URIs (or empty if `asset_uri` not set on references — record honestly which) |
| `workflow_packets.approved_reference_image_lookup` | `approved_reference_keys` → reference_assets | `reference_assets.reference_image` | populated with linked reference image attachments |
| `output_slots.product_image_lookup_lookup` | `packet_key` → workflow_packets | `workflow_packets.product_image_lookup` (chained) | populated with the packet's product images surfaced to slot |
| `output_slots.packet_reference_asset_uri_lookup` | `packet_key` → workflow_packets | `workflow_packets.approved_reference_asset_uri_lookup` (chained) | populated with packet reference URIs |
| `output_slots.packet_reference_image_lookup` | `packet_key` → workflow_packets | `workflow_packets.approved_reference_image_lookup` (chained) | populated with packet reference images |

`review_gates.packet_status_lookup` is not exercised here — no `review_gates` records are created in Phase 2A.

#### What passing the lookup-flow check looks like

- All 7 lookups surface non-empty values where the underlying linked records exist and the source attribute is populated.
- The two chained lookups on `output_slots` (which depend on `workflow_packets` lookups, which depend on the link fields) cascade correctly.
- Where `asset_uri` is left empty on reference records (because operator chose attachment-only references), the corresponding lookup is empty — recorded as an expected absence, not a failure.

#### What lookup-flow failure looks like

- A lookup field configured per Phase 1 SCS but surfacing empty when its source has values, indicating a configuration defect masked by empty source data during Phase 1.
- A chained lookup that does not cascade after the first-tier lookup populates.
- Any Airtable AI-side opinion about whether the lookup chain is "consumable" by the field-agent — but that question is Phase 2B scope, not Phase 2A's. Phase 2A's lookup-flow check is connector-side only.

If the lookup-flow check passes, Phase 2A is complete. If it fails, Phase 2A pauses and the failure is diagnosed before any Phase 2B authorization.

## Brand-System Reference Packet — Specification

The procedural minimum from the Phase 2 operational plan §Brand-System Reference Path expanded into Phase 2A specifics:

- **Count**: 3 records minimum, 5 maximum at brand-system scope. Below 3, the test cannot rule out the *weak articulation* category (Q5) from the Phase 2 plan's diagnostic lens.
- **Coverage**: lighting register, palette register, and material register are required at minimum. Human-presence register and restraint discipline are encouraged as separate references; otherwise they should be observably present in the lighting / palette / material references.
- **Coherence**: the references must be stylistically coherent across all 3–5 images. If two references pull in conflicting aesthetic directions (e.g., one warm-natural-light + one cool-studio), the brand-system reference packet itself fails the procedural minimum.
- **Linkage**: all 3–5 brand-system references are linked to all 3 packets via `approved_reference_keys`, so brand-system imagery surfaces onto every slot via the lookup chain.
- **`reference_note` text**: each record carries 1–2 sentences describing what the image carries that prose cannot — per the grounding-note philosophical anchor on visual references.

The references are operator-sourced. The connector cannot author imagery; it can only upload. Operator-side gathering happens in Step 1, before mutation begins.

## Inputs Operator-Side Required Before Phase 2A Mutation

| Input | Source | Quantity |
|---|---|---|
| Brand-system reference imagery | operator-side; Apex Solar Kiss-style sourcing per the warm-restraint envelope | 3–5 images |
| Per-packet atmosphere reference imagery | operator-side; per-packet (bedroom / table / bath) | 1–2 per packet (3–6 total) |
| Per-product imagery | operator-side; one canonical per SKU | 8 images (one per SKU); honest gaps recorded if not all 8 are gatherable at consistent quality |

These are the minimum inputs. Without them, Phase 2A mutation cannot proceed at depth sufficient to support the diagnostic lens.

## Open Questions Held (Not Decided In Phase 2A)

- **`category` and `product_class` enum mismatch** (Phase 1 SCS open question #2). Held; both fields stay empty across the 8 products. Decision deferred until operational evidence informs it.
- **`constraint_rules` records.** Held; no constraint_rules records are created unless the campaign content surfaces a constraint that prose alone cannot carry (per Phase 2 operational plan).
- **`asset_uri` on reference records.** Operator latitude — populate where an external URL is meaningful, leave empty otherwise. The lookup-flow check records empty `approved_reference_asset_uri_lookup` honestly rather than treating it as a failure.
- **Lookup-flow check pass / fail outcome.** The check is Phase 2A's terminal verification; outcome is observed at execution, not predicted.
- **Imagery quality sufficiency.** Whether the operator-gathered imagery is sufficient to rule out Q5 (weak brand articulation / underbuilt setup) is a judgment call the operator makes during gathering and again at the mutation review step. Honest recording of imagery gaps is more useful than papering over them.

## What Phase 2A Does NOT Do

- Does not configure the Airtable AI field-agent on `output_slots`. That is Phase 2B operator-side UI work.
- Does not invoke generation. That is Phase 2C scope.
- Does not curate or write any `generated_assets` records. That is Phase 2D scope.
- Does not write `seam_runs` records. Held until Phase 2C authorization decides whether `seam_runs` is exercised in this test or held.
- Does not write `review_gates` records. Held.
- Does not promote any `output_slots` rows beyond `planned` status.
- Does not promote any `workflow_packets` rows beyond `draft` status.
- Does not promote any `products` rows beyond `draft` status.
- Does not mutate the campaign base schema. The exact-mirror posture is the test's control.
- Does not modify the SKU-driven Furniture v1 base. SKU-base singleSelect cleanup remains held.
- Does not author a v2 apex artifact, predecessor architectural pass, decision note, or findings synthesis.
- Does not authorize Phase 2A mutation itself. Re-authorization against this plan is required after this artifact merges.

## Sequencing

If ASK approves this plan and merges it:

1. Phase 2A mutation re-authorization is the next decision moment.
2. **Operator-side imagery gathering** (Step 1) happens before connector mutation begins. ASK confirms imagery-set readiness or flags gaps before the connector portion starts.
3. **Connector portion** executes Steps 2–6 in dependency order: per-product content + imagery uploads (Step 2), brand-system reference records + imagery (Step 3), packet-level reference records + imagery (Step 4), per-packet content + linkages (Step 5), slot prompts (Step 6). Each step is observable via record-listing for verification before moving to the next.
4. **Lookup-flow check** (Step 7) runs after Steps 2–6 complete. Connector-only; no mutation.
5. **Phase 2A structured change summary** authored after Step 7 passes. The SCS records what was created, what passed the lookup-flow check, what gaps were honestly recorded, and any operator-side imagery quality observations relevant to the diagnostic lens.
6. **Phase 2B authorization** is the next downstream decision moment after Phase 2A's SCS lands; it is held now.

If Step 7 fails, Phase 2A pauses and the lookup-flow failure is diagnosed before any Phase 2B authorization.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md): Phase 2 operational plan; Phase 2A is the inputs sub-phase per §Phase 2A. Diagnostic lens, brand-system reference path, and load-bearing principle live there.
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex; Named Limitation #3 is what the broader Phase 2 addresses; Phase 2A is the input layer that lets the test pressure that limitation.
- [`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md): setup-content artifact; Warm Restraint concept, packet-specific framings, and slot-role articulations come from there.
- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision artifact; minimum operational depth, diagnostic caveat.

### Phase 1 anchors

- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): Phase 1 SCS; structural ground that Phase 2A populates. Open questions #1 (lookup-flow end-to-end behavior) and #2 (`category` / `product_class` enum mismatch) are inherited and addressed (or held) here.
- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): durable connector tool-capability reference; Phase 2A connector operations are within the supported field-type union per Limitation #1.

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): operational arc shape; Phase 2A is the inputs-prep portion of that arc.
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-base collection-mode operational test; finding 5 (verbatim prose repetition for cross-slot consistency) is the pattern Phase 2A's lean slot prompts deliberately do not pre-bake.

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary).
- `AGENTS.md` Airtable Schema-Fit Rule (extended in spirit to tool-capability preflight per the v47 grounding note).
- v47 grounding note: prototype-aesthetic instances; proof-chain gravity well guard (Phase 2A's SCS records observations, not new conceptual artifacts unless they earn it); architecture-pass discipline.
