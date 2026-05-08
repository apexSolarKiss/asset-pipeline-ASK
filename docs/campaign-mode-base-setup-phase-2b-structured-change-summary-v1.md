# Campaign Mode Base Setup // Phase 2B Structured Change Summary v1

## Purpose

This artifact records completion of the Phase 2B configuration step — operator-side AI field-agent configuration on the campaign base's `output_slots` table, executed against the merged Phase 2B plan ([`docs/campaign-mode-base-setup-phase-2b-plan-v1.md`](campaign-mode-base-setup-phase-2b-plan-v1.md)). Phase 2B is the bridge between Phase 2A's content-ready / reference-wired terminal state ([`docs/campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md)) and Phase 2C's generation invocation.

This is the structured change summary required by AGENTS.md Airtable Mutation Discipline. It records the verbatim AI field-agent configuration applied, the configuration-supported / partial / blocked diagnostic categorization, and the involuntary auto-first-run side effect that field creation produced. It does not authorize Phase 2C; it records what Phase 2B configured and what Phase 2C must be a separate decision against.

## Posture

```text
one artifact (this completion summary)
phase 2B scope: AI field-agent configuration on output_slots; configuration verification; auto-first-run side-effect observation
no authorized generation invocation (auto-first-run is an involuntary configuration-side side effect, not authorized Phase 2C)
no candidate creation
no curation
no generated_assets records
no slot_status promotion
no packet_status promotion
no schema mutation
no new fields
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact / Phase 2 operational plan / Phase 2A plan / Phase 2A-i SCS / Phase 2A-ii SCS / Phase 1 plan / Phase 1 amendments / Phase 1 SCS / connector limitations doc / v50 grounding note / Phase 2B plan
no v2 apex
no Phase 2C / 2D / 2E / 2F scope opening
no Phase 2C authorization (held; remains a separate decision)
```

The diagnostic caveat from the setup-decision artifact, Phase 2A plan, and Phase 2B plan continues to apply. Phase 2A-i + Phase 2A-ii together satisfied the procedural minimum for Q5 (weak articulation / underbuilt setup) ambiguity reduction; Phase 2B configuration completion is the Q4 (tool / model failure) gating step that keeps Phase 2C diagnostically interpretable. Final Q5 interpretation still depends on Phase 2C / Phase 2D evidence.

## Mutation Target

| Field | Value |
|---|---|
| Base name | `asset-pipeline-ASK // Campaign-Driven D2C Home-Goods v1` |
| Base ID | `appCAcRuA82SWj5h5` |
| Phase 2B scope | AI field-agent configuration on `output_slots.slot_generated_image_v1`; configuration verification; auto-first-run side-effect observation |
| Phase 2B out of scope | authorized generation invocation; curation; `generated_assets`; status promotions; schema mutation; SKU base modifications |
| Tool surface | Airtable UI (operator-side); the connector cannot configure AI field-agents — Limitation #2 of the connector tool capability limitations doc |

## Execution Record

Phase 2B configuration was executed in three operator-side UI moves on the campaign base, plus one involuntary tool-side side effect.

### Move 1 — Replace static `slot_generated_image_v1` placeholder with AI field-agent Image field

The `output_slots.slot_generated_image_v1` field, created by the Phase 1 connector setup as a static `multipleAttachments` placeholder, was deleted via the Airtable UI and recreated as a fresh AI field-agent Image field with the same name. This is the only available mechanic per the connector tool capability limitations doc — Limitation #2 records that the Airtable UI does not expose a type-conversion path from `multipleAttachments` to AI field-agent, so an existing connector-created placeholder cannot be promoted in place. The placeholder was empty (Phase 2A scope did not write to it), so delete + recreate did not destroy data.

Post-creation schema verification confirmed the recreated field name is `slot_generated_image_v1`.

### Move 2 — Configure AI field-agent settings (verbatim)

| Setting | Value |
|---|---|
| Field name | `slot_generated_image_v1` |
| Type | Image (AI field-agent) |
| Model | Gemini 3 Pro Image |
| Preserve input details | ON |
| Automatic generation | OFF (see auto-first-run side effect, Move 4) |
| Inputs (3, in order) | `slot_prompt`, `packet_reference_image_lookup`, `product_image_lookup_lookup` |

The three inputs were inserted via the AI field-agent UI's input-picker chips, not as typed bracketed references. The picker accepted all three, including the two chained `multipleLookupValues` fields (`packet_reference_image_lookup` carrying image-bearing chained reference attachments, `product_image_lookup_lookup` carrying chained product-image attachments). **Configuration-supported categorization for the load-bearing input set is confirmed.**

The Phase 2B plan listed two additional candidate inputs (`expected_output_role`, `packet_key`) as operator-latitude. The operator opted to configure with the three-input set matching the SKU-driven Furniture v1 base's working configuration, treating the additional context fields as not load-bearing for the wrapper-driven role assignments.

### Move 3 — Paste prose wrapper (verbatim)

The AI field-agent's instruction area received the following prose wrapper, with each `[field_name]` reference inserted via the input-picker's field-chip mechanism:

```
Use the slot prompt as the role-specific generation instruction:
[slot_prompt]

Use this image lookup as the studio-world visual reference. Prioritize it for background, floor/wall plane, cove transition, lighting direction, and shadow behavior:
[packet_reference_image_lookup]

Use this image lookup as product identity/object truth. Preserve the product identity and proportions, but do not copy the product-image background:
[product_image_lookup_lookup]
```

The wrapper is a faithful mirror of the SKU-driven Furniture v1 base's working AI field-agent configuration, with one minimum-necessary adaptation: "chair identity and proportions" → "product identity and proportions" (the campaign base's 8 product classes span bedsheet, plate, mug, glass, serving, bath towel, hand towel, vessel — no single product-class noun applies; the generalization to "product" is the only word change). The wrapper assigns roles to each input: slot_prompt as role-specific instruction, packet_reference_image_lookup as studio-world visual reference, product_image_lookup_lookup as product identity/object truth.

### Move 4 — Auto-first-run side effect (involuntary)

**On AI field-agent field creation, an automatic first generation run executed across all 9 existing `output_slots` rows, despite "Automatic generation" being configured OFF.** This is the empirical reconfirmation of Limitation #6 of the connector tool capability limitations doc — the OFF setting governs subsequent generation triggers (input-field updates do not re-trigger), but does not suppress the initial run at the moment of field creation. The operator cannot opt out of this first run.

> Phase 2B configuration produced an automatic first-run v0 batch despite Automatic generation being OFF. The batch may be reviewed as baseline evidence, but Phase 2C authorization remains a separate decision.

The 9-slot v0 batch was generated as a side effect of Move 2 (field creation), not as an authorized Phase 2C generation pass. Phase 2C — operator-initiated regeneration runs, candidate evaluation, and capture into `generated_assets` — is held as a separate decision.

### v0 batch baseline observations

The auto-first-run produced one image per slot (9 slots total). Observed without Phase 2C-level evaluation discipline:

- Atmosphere reference resolved across all 9 slots — the warm-restraint envelope (per the v50 grounding-note D2C instance) reads in outputs across bedroom / table / bath packets.
- Per-packet atmosphere references appear to have surfaced their packet-specific tone (bedroom morning light, table midday light, bath afternoon light) without cross-packet bleed.
- No visible product-image bleed-through despite two of the eight product images being multi-object (hand towel image with bath towel in background; serving vessel image with plate in front). See product-image observation below.
- All 9 slot images render the slot's role framing (HERO_WORLD / LIFE_IN_USE / OBJECT_VIGNETTE) at a level coherent with the slot prompt and packet atmosphere reference.

**These are configuration-side baseline observations, not Phase 2C evaluation findings.** Phase 2C evaluation discipline — per-slot candidate ranking, defect classification, accept / reject / regenerate decisions, capture into `generated_assets` — is held until Phase 2C is authorized as a separate decision.

### Product-image observation

> Observed risk: multi-object product images can contaminate generation conditioning.
> Observed result: no visible bleed-through in the auto-first-run batch.
> Adopted forward policy: `products.product_image` should use clean isolated single-SKU images wherever possible.
> Backlog: replace hand towel and serving vessel product images with cleaner single-SKU imagery if future generation drift suggests contamination.

This is a Phase 2B observation + forward content-discipline policy. It does not branch into a separate decision-note artifact, A/B test milestone, or doctrine pass. It applies to future `products.product_image` curation in the campaign base and any subsequent prototype base.

## Structured Change Summary

**Why this change exists.** Phase 2B completes the AI field-agent configuration step of the campaign-mode operational test. After Phase 2A landed the inputs-wiring layer (records + imagery + content + linkages + lookup chains), Phase 2B configures the AI field-agent that consumes those inputs at slot-level generation. Configuration is operator-side via Airtable UI because the connector cannot configure AI field-agents (Limitation #2). The configuration step is a Q4 (tool / model failure) gating moment — if the AI field-agent picker could not consume the chained lookup inputs, Phase 2C interpretation would be confounded; this Phase 2B run resolves that ambiguity in the Configuration Supported direction, keeping subsequent Phase 2C evidence diagnostically interpretable.

**What changed.** One AI field-agent Image field configured on `output_slots.slot_generated_image_v1` in the campaign base (`appCAcRuA82SWj5h5`), replacing the static `multipleAttachments` placeholder created during Phase 1. The field-agent's settings — model (Gemini 3 Pro Image), Preserve input details (ON), Automatic generation (OFF), three inputs (`slot_prompt`, `packet_reference_image_lookup`, `product_image_lookup_lookup`), and the prose wrapper — are recorded verbatim above. As an involuntary side effect of field creation (Limitation #6), an automatic first generation run produced one v0 image per `output_slots` row across all 9 slots; those v0 attachments are now visible in the `slot_generated_image_v1` column. **The v0 batch is configuration-side baseline evidence, not authorized Phase 2C output.**

**What did not change.** `slot_status` remains `planned` across all 9 slots (the auto-first-run did not advance status; no operator-side promotion was performed). `packet_status` remains `draft` across all 3 packets. `generated_assets` table remains empty (no curation, no captures). `seam_runs`, `review_gates` tables remain empty. `slot_evaluation_notes`, `generation_attempt_reference`, `slot_sort_order` (already populated from Phase 2A), and all other `output_slots` fields beyond `slot_generated_image_v1` itself are unchanged. The `products`, `reference_assets`, `workflow_packets`, `constraint_rules` tables are unchanged from their Phase 2A terminal state. The SKU-driven Furniture v1 base is not modified. The Phase 2A plan, Phase 2A-i SCS, Phase 2A-ii SCS, Phase 2B plan, Phase 2 operational plan, Phase 1 plan + amendments + SCS, architecture apex, predecessor architectural passes, D2 decision note, setup-decision note, setup-content artifact, v50 grounding note, and connector tool capability limitations doc are all unchanged. No Phase 2C / 2D / 2E / 2F scope was opened. The static placeholder field was deleted and a fresh AI field-agent Image field was created with the intended name `slot_generated_image_v1`. This is a controlled field replacement required by Limitation #2, not a broader schema mutation.

**What remains out of scope.** Phase 2C authorization (operator-initiated regeneration runs against the configured AI field-agent, with full Phase 2C evaluation discipline). Per-slot curation with provenance writeback into `generated_assets` (Phase 2D). Cross-packet review-shaped coherence check (Phase 2E). Findings synthesis (Phase 2F). The wrapper-necessity probe milestone (testing whether the prose wrapper is necessary or can be replaced by an enriched slot_prompt that internalizes role assignments) — held for a separate probe planned against the SKU-driven Furniture v1 base on a new chair SKU, where the slot family within one product class would give cleaner A/B comparison than running it across the campaign base's varying product classes. Constraint records, AI configuration changes, schema mutation, SKU-base singleSelect cleanup, `category` / `product_class` enum mismatch resolution all remain held.

## Pressure Points / Open Questions Carried Forward

1. **Phase 2B configuration outcome: Configuration Supported.** The three load-bearing inputs (`slot_prompt`, `packet_reference_image_lookup`, `product_image_lookup_lookup`) are all selectable in the AI field-agent input picker, including the two chained `multipleLookupValues` fields. The output target `slot_generated_image_v1` is correctly set. The Phase 2B plan's three-outcome frame (Supported / Partial / Blocked) resolves to Supported. This was the load-bearing question of Phase 2B per the plan's pressure points — whether the campaign base's mirrored chained-lookup schema would behave the same as the SKU base's working configuration. It does. The campaign base's AI field-agent picker consumes chained lookups without the schema-fit friction the SKU base's earlier D1 / D2 history surfaced — the schema mutation that resolved that friction in the SKU base is what Phase 1's exact-mirror replication carried forward.
2. **Auto-first-run boundary preserved.** The v0 batch is recorded as an involuntary configuration-side side effect (Limitation #6), not as authorized Phase 2C generation. The boundary matters because the tool behavior (first run on creation) could otherwise collapse Phase 2B into Phase 2C — letting tool ergonomics, not architectural discipline, drive the phase boundary. Phase 2C authorization remains a separate decision.
3. **Wrapper-necessity probe held.** The prose wrapper assigns roles to each input, but whether the wrapper is necessary or whether an enriched slot_prompt could carry the same role assignments was not tested in Phase 2B. The faithful-mirror posture (Phase 2B as exact-mirror of SKU base configuration) does not test that question. A separate probe milestone is planned: A/B test on a new chair SKU in the SKU base, with two slot_prompts (one for arm-A with-wrapper, one for arm-B sans-wrapper) and two AI field-agent fields (one with wrapper, one without). Held until Phase 2B SCS lands.
4. **Wrapper "chair" → "product" generalization.** The campaign base wrapper differs from the SKU base wrapper by one word ("chair" → "product") because the campaign base's 8 product classes span varied product types. Whether this generalization is sufficient or whether per-product-class wrappers would produce stronger object-truth conditioning is an open question, deferable to a separate probe if Phase 2C evidence suggests product-identity drift on specific slots.
5. **Multi-object product images held as backlog.** Two product images (hand towel, serving vessel) contain secondary objects. The auto-first-run batch did not exhibit visible bleed-through, but the going-forward content-discipline policy is clean isolated single-SKU `products.product_image`. The two affected images are backlog candidates for cleaner re-uploads if future generation drift suggests contamination. No urgent action.
6. **Diagnostic caveat continues to apply.** Phase 2B configuration's Configuration Supported outcome reduces Q4 (tool / model failure) ambiguity for Phase 2C interpretation. Q5 (weak articulation / underbuilt setup) remains procedurally minimum-satisfied per Phase 2A-ii; final Q5 interpretation still depends on Phase 2C / Phase 2D evidence. Q1 / Q2 (schema carrying / prose compensating), Q3 (curator compensation), Q6 (earned campaign_concept), Q7 (earned brand_system), Q8 (composite-anchor) all remain held until Phase 2C+ evidence informs them.
7. **Phase 2A-ii open questions carry forward unchanged.** The `category` / `product_class` enum mismatch (Phase 1 SCS open question #2), SKU-base singleSelect option pollution (Phase 1 SCS open question #3), and the `asset_uri` empty-by-design state on reference records all remain held with no change from Phase 2B.

## What This Note Does NOT Do

- Does not authorize Phase 2C (generation), Phase 2D (curation), Phase 2E (cross-packet coherence check), or Phase 2F (findings synthesis). The auto-first-run v0 batch is not Phase 2C authorization.
- Does not promote `slot_status` beyond `planned` for any slot, even though the v0 batch attachments are visible on the field. Status promotion is a Phase 2C+ decision.
- Does not author Phase 2C-level evaluation findings about the v0 batch. Configuration-side baseline observations recorded above are not per-slot evaluation, candidate ranking, or accept / reject decisions.
- Does not modify the SKU-driven Furniture v1 base.
- Does not write `generated_assets` records, capture candidates, or perform curation.
- Does not change architectural doctrine, the v1 apex, any predecessor pass, the v50 grounding note, or any Phase 2 / Phase 1 / Phase 2A / Phase 2B planning artifact.
- Does not propose a `category` / `product_class` enum resolution, SKU-base singleSelect cleanup, multi-object product-image regeneration, or any schema mutation on either base.
- Does not open the wrapper-necessity probe milestone — held for a separate plan-before-execute artifact.

## Phase 2B Terminal State

With Phase 2B complete, the campaign base is now:

- **Content-ready** (from Phase 2A): 8 products with detail text + imagery; 3 packets with creative content; 9 slots with role-specific prompts; 8 reference records with content + imagery.
- **Reference-wired** (from Phase 2A): all 7 lookup chains flow values cleanly to every slot.
- **AI-configured** (Phase 2B): AI field-agent Image field configured on `output_slots.slot_generated_image_v1` with Gemini 3 Pro Image model, three load-bearing inputs (slot_prompt + two chained lookups), and a faithful-mirror prose wrapper.
- **v0-baseline-observed** (Phase 2B side effect): auto-first-run produced one image per slot (9 total) at field-creation time. Configuration-side baseline only; not authorized Phase 2C.
- **Phase-2C-pending**: no authorized generation invocation; no candidate evaluation; no curation; no `generated_assets` records.

Next decision moment is Phase 2C authorization (operator-initiated regeneration runs and Phase 2C evaluation discipline). Held.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-base-setup-phase-2b-plan-v1.md`](campaign-mode-base-setup-phase-2b-plan-v1.md): merged Phase 2B plan defining configuration scope, three-outcome frame, and verification steps; this artifact records execution against that plan
- [`docs/campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-ii-structured-change-summary-v1.md): Phase 2A-ii SCS — content-ready / reference-wired terminal state Phase 2B inherits
- [`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md): Phase 2A-i SCS — records + imagery state upstream of Phase 2A-ii
- [`docs/campaign-mode-base-setup-phase-2-operational-plan-v1.md`](campaign-mode-base-setup-phase-2-operational-plan-v1.md): Phase 2 operational plan; Phase 2B is the AI field-agent configuration sub-phase per §Phase 2B

### Operational pattern reference

- [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md): connector tool capability reference — Limitation #2 (AI field-agent field creation gap) governs the operator-side UI requirement; Limitation #6 (auto first generation on field creation) governs the Move 4 side effect recorded above
- [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](gate-2-image-bearing-reference-path-findings-pkt-sku-009.md): SKU base's Gate 2 Supported finding — the chained image-bearing lookup pattern Phase 2B replicates in the campaign base
- [`docs/visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md`](visual-reference-input-schema-mutation-plan-sku-driven-furniture-v1.md): SKU base's schema mutation that originally resolved the input-picker constraint Phase 1 mirror-replicated forward
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): operational arc shape; Phase 2B is the AI field-agent configuration step in the campaign-mode arc

### Workflow rules

- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)
- `AGENTS.md` Airtable Schema-Fit Rule
- v50 grounding note: scope discipline; proof-chain gravity well guard (Phase 2B observations belong in this Phase 2B SCS — a concise execution-record artifact — not a separate conceptual artifact, unless they materially change the model / schema pressure / carrier boundary / governance seam, which Configuration Supported + auto-first-run + product-image observations do not)
