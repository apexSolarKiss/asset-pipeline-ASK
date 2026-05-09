# IA Layered-Content Sketch // Brand Campaign / Editorial Mode v1

## Posture

```text
on-paper IA content articulation
brand campaign / editorial mode only
fourth of four mode sketches
not a final IA model
not an architecture rewrite
not a milestone
not an Airtable / schema / prototype task
self-superseding once the four mode sketches and cross-mode synthesis land
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md), Phase 1 of the redirection is on-paper IA layered-content work across the four worked-example modes. This sketch is the fourth and final such sketch, on the brand campaign / editorial mode at the evidence depth currently available — which sits between collection-mode operational depth and marketing-mode evidence depth.

The sketch does not re-derive the apex layer-shape; that lives in [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md). It populates the apex layer-shape with mode-specific content articulation, anchored against the available evidence and contrasted against the SKU-driven mode sketch ([`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md)), the collection-mode sketch ([`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md)), and the marketing-mode sketch ([`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md)).

## Evidence-Depth Posture

Carrying the discipline established in B3: the sketch reads against multiple evidence sources at distinct depths. The depth available for campaign mode is between collection's and marketing's.

| Mode | Evidence depth available |
|---|---|
| **SKU-driven** | Operationally grounded end-to-end across PKT-SKU-007 / PKT-SKU-009 / PKT-SKU-010 — full generation → curation (five-axis provenance) → governed assets with `asset_attachment`. |
| **Collection / merchandising** | Operationally grounded end-to-end on PKT-COLL-001 — full generation → curation (with curator override) → governed assets with `asset_attachment`. Paper-strain hypothesis (composite-anchor schema mutation) was operationally **deflated**. |
| **Brand campaign / editorial** | **Structurally proven at two depths; operationally weaker than collection but stronger than marketing.** Three evidence sources: (a) the richest paper probe of the three non-SKU modes; (b) the PKT-CAMP-001 Cycle-1-equivalent rerun in the SKU-driven base, which carried the bounded structural chain cleanly *and* established review-board context as load-bearing for that bounded mini-family proof; (c) the Phase 1 base setup, which created a separate `Campaign-Driven D2C Home-Goods v1` base with mirrored 95-field schema and 20 identity records. **None of these exercise full generation → curation → governance with five-axis provenance + `asset_attachment`.** Phase 2 operational work in the new base was paused per the redirection note. The probe's strain points (composite fidelity-anchor representation; `products` peripherality; editorial voice as structurally load-bearing) remain operationally untested. |
| **Marketing / message-driven** | Structural shape proof (PKT-MSG-001 cycle 1) plus paper probe; weakest of the four. |

The right read of B4 is: the campaign-mode IA content can be sketched from a richer paper-content anchor plus two structural shape proofs, but operational deflation of any strain point has *not* been earned. Therefore composite-anchor and `products`-peripherality questions stay held more strongly here than they do in the collection-mode sketch — though less strongly than marketing-mode's analogous strain (which has only one structural proof depth + paper probe).

The cross-mode probe artifact also identified campaign mode as the source of the **strongest single cross-mode synthesis finding**: Layer 2's composite fidelity-anchor needs structured representation in three different mode-specific shapes (`messages` for marketing; `grouping_archetype` for collection; `campaign_concept` for campaign). The collection-mode operational test deflated the collection version of this finding under prose discipline; the marketing version is operationally untested; the campaign version is operationally untested *and* sharper because campaign-mode's `products` becomes peripheral in a way no other mode's anchor does.

## What This Sketch Does Not Do

- propose schema mutations
- resolve any of the apex Named Limitations (specific aesthetic-carrier schema; inheritance / override precedence; cross-base / marketing / campaign evidence)
- re-derive the layer-shape from the apex artifact
- attempt cross-mode synthesis (deferred to the eventual cross-mode synthesis sketch)
- operationalize campaign mode or unpause Phase 2 work in the campaign base
- reopen campaign-mode proof work or modify any prior cycle / Phase 1 outputs
- claim that any campaign-mode paper-probe strain has been deflated by operational pressure
- close the curation-premise pressure question raised by the redirection note (campaign-concept selection vs the foundational premise that curation is the singular runtime creative-discretionary act); the question is named, not resolved
- close any open question; questions are surfaced for later cross-mode comparison

## Vertical Slice — PKT-CAMP-001 (Structural Shape Proof) + Phase 1 Base (Schema Mirror) + Cross-Mode Probe (Paper-Content Anchor)

The slice draws on three complementary anchors at distinct evidence depths:

- **PKT-CAMP-001 in the SKU-driven Furniture v1 base** — bounded campaign / editorial Cycle-1-equivalent rerun. Anchor product `SKU-CHAIR-002`, packet name `PKT-CAMP-001`, 2 constraint rules (CR-CAMP-001 brand-context coherence rule, CR-CAMP-002 output-requirement rule), 1 reference (`REF-CAMP-DIRECTION-001`), 4 seam runs (ingest_validation / transformation_check / output_validation / release_readiness), 3 promotional generated-asset rows (campaign_hero_landing_v1 + campaign_promo_crop_v1 + campaign_supporting_variant_v1), 2 review-context generated-asset rows (campaign-review-board-v1 + campaign-annotation-layer-v1), 1 review gate (GATE-CAMP-001). Final result classification `findings-only`. **Review-board context functioned as load-bearing for this bounded mini-family proof — the narrow specific result of the rerun.** Not a Phase-2-equivalent generation/curation/governance run. ([`airtable-campaign-editorial-cycle-1-rerun-findings-v1.md`](airtable-campaign-editorial-cycle-1-rerun-findings-v1.md), with the prior insufficient-evidence first attempt at [`airtable-campaign-editorial-cycle-1-findings-v1.md`](airtable-campaign-editorial-cycle-1-findings-v1.md))
- **`Campaign-Driven D2C Home-Goods v1` base (Phase 1)** — a separate Airtable base created to operationalize campaign mode out from the SKU-driven base. 95-field schema mirroring the SKU-driven base across 8 tables, 11 link pairs, 8 lookups, 1 rollup, 1 createdTime, 2 formulas. 20 identity records (3 packets in `draft`, 9 output_slots in `planned`, 8 products in `draft`). Schema-only; no content, no generation. Phase 2 work that would carry the operational test in this base was paused per the redirection note. ([`campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md))
- **Cross-mode probe** — paper-only pressure test of the SKU-driven schema against an apparel-archetype `THE LONG TABLE` campaign with five touchpoints (HERO_EDITORIAL 2400×1500 / HERO_EMAIL 1500×800 / STORY_MOMENT 1080×1350 / SOCIAL_TILE 1080×1080 / BANNER_WEB 1920×800), each carrying the same brand value (preservation of craft + enduring design + aspirational restraint) at different aspect ratios, arc positions, and subject specificities. **Paper-only; no Airtable mutation, no generation, no curation events recorded.** Multiple strain points anticipated. ([`cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md))

The slice is walked layer-by-layer below. Where evidence depth varies across layers, the depth available is named explicitly. The collection-mode operational deflation pattern is not assumed for any campaign-mode strain point.

### Brand-System Layer

**Slice content.** No first-class carrier across either of the structural-proof anchors. The brand-system context for these worked examples is implicit in the worked-example naming convention (PKT-CAMP-001 inherits the Furniture v1 base context; Phase 1 base inherits a "Campaign-Driven D2C Home-Goods v1" identity; the probe pivots to an apparel heritage refined-living archetype on paper) and in the externally supplied prototype-aesthetic scaffolding; it is not represented as a first-class repo / prototype carrier.

**Explicit.** Nothing.

**Implicit / unmodeled.** Brand identity, brand-level aesthetic posture, brand-level governance authority, brand-level approval boundaries — same posture as prior slices. Campaign mode introduces the *sharpest* version of the brand-system question across the four modes: the probe identified editorial voice as a structurally load-bearing coherence axis distinct from any other mode, and editorial voice is fundamentally a brand-system property carried at the campaign layer. PKT-CAMP-001 cycle 1 rerun did not exercise editorial-voice coherence operationally; it carried structural-proof scope.

**Not-yet-doctrine.** Same Named Limitation #1 as prior slices. Campaign mode's editorial-voice pressure is the strongest *paper* candidate across the four modes for sharper brand-system carriers; not an operational candidate.

**Inheritance behavior.** Currently nil. Cross-base reuse (the Phase 1 campaign base mirrors the SKU-driven base's schema, suggesting brand-system content can be operator-replicated across bases) is structurally demonstrated at schema depth, paper-described at content depth, and operationally untested at full-flow depth.

### Category / Product-Class Layer

**Slice content.** PKT-CAMP-001 cycle 1 rerun sits in the furniture category, anchored on SKU-CHAIR-002. The Phase 1 campaign base is named for D2C Home-Goods (bedding, dinnerware, bath) rather than furniture — but the Phase 1 structured change summary explicitly held `category` and `product_class` enum mismatch as a Phase-2 question, deferring whether to extend the SKU-base furniture-specific options or split the fields. The probe scenario is paper-pivoted to an apparel heritage refined-living archetype.

**Explicit.** Schema-mirrored category and product_class enum fields exist in the new campaign base, currently inheriting furniture-specific options that don't fit campaign D2C home-goods. The Phase 1 change summary explicitly names this as held.

**Implicit / unmodeled.** Same as prior slices. The category mismatch surfaced by the Phase 1 base setup is the **first concrete operational-pressure point** on category/product-class enum representation across the four-mode evidence chain. SKU mode and collection mode never pressured the enum (both operate in furniture); marketing mode's PKT-MSG-001 inherits furniture context (anchored on SKU-CHAIR-002). Campaign mode's Phase 1 base setup, by deliberately separating campaign-mode workspace from furniture-mode content, surfaces the question structurally without resolving it.

**Not-yet-doctrine.** Three options are explicitly held by the Phase 1 change summary: (a) add campaign-fit options to the enums; (b) split the fields per mode; (c) leave the fields blank in campaign mode and record the absence as part of mode behavior. None is earned; the operational test that would distinguish them was paused.

**Inheritance behavior.** Implicit, same as prior slices. The mode-specific addition: schema mirroring across bases preserves enum shape; whether enum *content* should be mirrored, extended, or branched per mode is held.

### Campaign Concept Layer

This layer is the **load-bearing distinguishing layer for brand campaign / editorial mode** — the analog of collection mode's collection / grouping layer and marketing mode's message / offer / communication layer.

**Slice content.** Across the three anchors:

PKT-CAMP-001 cycle 1 rerun carries the campaign-concept content as packet attributes plus a directional reference:

- bounded campaign / editorial mini-family intent — populated in `business_intent`
- one campaign-family coherence rule (CR-CAMP-001) with `scope_type: brand_context`, `scope_value: early_autumn_reset`, `rule_type: presentation_rule`
- one output-requirement rule (CR-CAMP-002)
- one explicit directional reference (REF-CAMP-DIRECTION-001) — the only reference of this kind across the four-mode evidence chain at structural-proof depth

The Phase 1 campaign base carries the structural placeholders (3 packets in `draft`, all empty of content) — schema-ready for campaign-concept content but not populated.

The cross-mode probe describes campaign-concept content in finer detail (paper only):

- the campaign concept itself (`THE LONG TABLE`) as the dominant fidelity anchor — *not* the products
- bounded creative discretion as a wider expressive frame than other modes
- five-touchpoint arc (opening / extension / resonance / pacing / sustained) as a structural campaign-arc pattern
- references at four classes: brand voice / campaign world / family continuity / direction (per the probe's reference-type tag candidate); plus optional product references when a SKU appears

**Explicit.** PKT-CAMP-001 makes campaign-concept identity explicit through `business_intent` + the brand-context constraint rule + the directional reference. The directional-reference pattern is novel relative to SKU/collection/marketing structural proofs at this evidence depth. No first-class `campaign_concept` entity; no structured reference-type tag.

**Implicit / unmodeled.** The substructure of the campaign concept itself (concept name vs concept arc vs concept voice vs concept latitude bounds) is structurally absent. The composite Layer 2 anchor structure (campaign concept + scene archetype + voice register + arc position) is carried by packet text + slot prose + directional-reference linkage; not as a first-class composite carrier. The relationship between the campaign concept and the anchor product (SKU-CHAIR-002 in PKT-CAMP-001 cycle 1 rerun; product peripherality in the probe scenario) is implicit.

**Not-yet-doctrine.** This is where campaign mode's paper-probe strain accumulates *most sharply* across the cross-mode sweep. The probe surfaced the strongest cross-mode synthesis finding: Layer 2's composite fidelity-anchor needs structured representation in three different mode-specific shapes, with `campaign_concept` as the campaign-mode shape. Candidate mutations the probe surfaced:

1. a packet-level `campaign_concept` first-class field or entity that slots reference explicitly
2. a structured reference-type tag on `reference_assets` (voice / world / continuity / direction / product)
3. a richer or more abstract `asset_role` taxonomy in non-SKU modes (`OPENING_MOMENT` / `EXTENSION_MOMENT` / `RESONANCE_MOMENT` rather than touchpoint-typed roles)

**All three remain operationally untested.** The cycle 1 rerun's structural proof did not exercise campaign-concept-coherence verification at curation depth; did not exercise the heaviest-coherence-pressure mechanism the probe described; did not exercise the implementation-vs-conceptual goal divergence at campaign scale.

**This is the load-bearing methodological asymmetry vs the collection-mode sketch.** Collection mode had analogous paper-probe strain (composite-anchor schema mutation) that the operational test on PKT-COLL-001 *deflated* — prose discipline carried the strain cleanly under real generation/curation/governance pressure. Campaign mode has *not* earned that deflation, and the campaign version of the strain is *sharper* than the collection version because `products` peripherality genuinely loosens the slot–product structural relationship in a way collection mode's 1:N constituent linkage does not.

The cross-mode probe also explicitly named campaign mode as the source of the most-consistent strain finding across the cross-mode sweep. Whether prose discipline can carry it (the collection-mode pattern) or whether structural representation is genuinely needed (the probe's paper claim) is the open operational question.

**Inheritance behavior.** The campaign-concept layer's content sets the bounds within which packet, slot, and curation content narrows — paper-only at the probe, structurally-carried-but-not-operationally-exercised at PKT-CAMP-001, schema-ready but content-empty in the Phase 1 campaign base. Whether the inheritance can be carried via packet text + slot prose + directional-reference linkage under operational pressure (the collection-mode pattern) or whether `products`-peripherality forces structural representation is the open operational question.

### Packet Layer

**Slice content.** PKT-CAMP-001 cycle 1 rerun carries packet shape mostly mirroring the prior modes' pattern, with some campaign-specific variations:

- anchor product link to SKU-CHAIR-002 (singular, like SKU-driven and marketing modes) — but with the probe-named caveat that products are conceptually *peripheral* in campaign mode even when present
- 2 constraint rules at the rule-layer (one brand-context coherence rule, one output-requirement rule)
- 1 directional reference (the first explicit directional reference across the four-mode evidence chain at structural-proof depth)
- 4 seam runs (full first-pass seam trail)
- 3 promotional + 2 review-context generated-asset rows
- 1 review gate
- packet-status final state `release_ready`

The Phase 1 campaign base provides 3 empty packet identity rows in `draft` status; ready for campaign-mode content authoring.

The cross-mode probe describes a parallel packet shape with mode-specific content — `Spring 2026 / The Long Table` packet with five-touchpoint required-output set, bounded creative discretion declared at wider expressive scope, references including brand voice / campaign world / family continuity / direction.

**Explicit.** Same packet fields as prior modes — `business_intent`, `creative_intent`, `bounded_creative_discretion`, `required_output_set`, `products` relation (singular at PKT-CAMP-001), packet-level reference linkage. PKT-CAMP-001 populated these structurally; Phase 1 base has them empty; full-flow operational generation/curation has not exercised them.

**Implicit / unmodeled.** Same packet over-load as marketing mode — packet-level fields carry campaign-concept burden + aesthetic burden + intent burden + reference-binding burden. The campaign-mode addition: editorial voice as a packet-level coherence axis, beyond what marketing-mode `business_intent` / `creative_intent` carry. The probe identified voice as structurally load-bearing in a way it is not in other modes; PKT-CAMP-001 cycle 1 rerun did not exercise voice-coherence operationally.

**Not-yet-doctrine.** Packet over-load is sharpest in campaign mode across the four-mode evidence. Whether to split packet aesthetic vs concept vs voice vs intent into separate carriers is a paper-pressed question with no operational test. Held — but the strain is sharper here than in any other mode.

**Inheritance behavior.** Same general posture as prior slices. The mode-specific addition: directional-reference linkage at the packet level is carried into all slots via the lookup chain (per the structural proof); whether directional-reference content scales to campaign-arc-coherence verification operationally is untested.

### Slot Layer

**Slice content.** Across the three anchors:

PKT-CAMP-001 cycle 1 rerun does not have `output_slots` rows of the SKU/collection-mode shape; the structural proof carried slot-equivalent role identity through `generated_assets` row naming (campaign_hero_landing_v1 / campaign_promo_crop_v1 / campaign_supporting_variant_v1 + the two review-context rows). Same pattern as marketing mode's PKT-MSG-001 cycle 1.

The Phase 1 campaign base provides 9 empty `output_slots` rows linked 3-per-packet in `planned` status; ready for slot_prompt content authoring under Phase 2 work that was paused.

The cross-mode probe describes slot-level content for the apparel scenario:

- five distinct slots with role-typical aspect ratios (HERO_EDITORIAL / HERO_EMAIL / STORY_MOMENT / SOCIAL_TILE / BANNER_WEB)
- per-slot subjects varying widely — some with products, some without; campaign concept is the unifying anchor not products
- references including brand voice + campaign world + family continuity + direction; product references *optional*
- the probe's most pressured architectural finding lives at this layer: when no slot has a product subject (STORY_MOMENT in the probe), the slot's only fidelity anchor is the campaign concept itself

**Explicit.** Phase 1 base has `output_slots` rows ready for content; PKT-CAMP-001 cycle 1 rerun carried slot-equivalent role identity at the generated-assets layer. No structural slot-level treatment of `products`-peripherality has been exercised.

**Implicit / unmodeled.** The substructure of the slot's campaign-concept-bearing content (what arc-position the slot occupies; what voice register the slot carries; what continuity-reference content the slot inherits) is implicit. The aspect-ratio-as-attribute question and the abstract-role-taxonomy question are paper-only candidates.

**Not-yet-doctrine.** Whether `output_slots` can carry the campaign-concept-as-fidelity-anchor pattern via packet-inherited content + slot_prompt prose (the collection-mode pattern) or whether structural representation is needed when products are peripheral or absent is **untested**. Held more strongly than collection's analogous strain because no operational deflation has been earned.

**Inheritance behavior.** Slot content narrows packet bounds with role-specific framing. Lookups carry packet-level content. The mode-specific question: when a slot has no product subject (STORY_MOMENT), the lookup chain to product images is effectively empty; the slot's fidelity anchor depends entirely on packet-level reference content (brand voice + campaign world + family continuity + direction). Whether this carries operationally is untested.

### Candidate Generation Layer

**Slice content.** **Not operationally exercised at campaign-mode evidence depth.**

PKT-CAMP-001 cycle 1 rerun was a structural carrying-test. No generation pass was invoked. The 5 generated-asset rows (3 promotional + 2 review-context) are placeholder rows analogous to PKT-MSG-001's marketing-mode placeholders and PKT-COLL-001's 2026-04-22 historical placeholders — created without curation events, without source attachments, without `asset_attachment` populated.

The Phase 1 campaign base has no generated-asset content at all (Phase 2 paused).

The cross-mode probe describes hypothetical 5-candidates-per-touchpoint generation sets in qualitative prose. No actual generation was run.

**Explicit.** Nothing operationally exercised.

**Implicit / unmodeled.** Same as prior slices structurally. Mode-specific generation-tooling questions (whether text-to-image generation reliably honors editorial-voice specifications; whether campaign-concept-coherence steers reliably across five touchpoints with varied subjects; whether generations can carry brand voice as a coherence axis when products are peripheral) are *all paper-only*. The collection-mode-style operational findings (constituent cropping; arrangement-non-preservation) have no campaign-mode analog yet because the generation has not been run at campaign scope.

**Not-yet-doctrine.** Same as prior slices — no first-class candidate entity is earned. Campaign-mode candidate layer surfaces no novel doctrine question at this evidence depth beyond the others.

**Inheritance behavior.** Same as prior slices structurally; not operationally exercised.

### Curation Seam

**Slice content.** **Not operationally exercised at full-flow evidence depth.**

PKT-CAMP-001 cycle 1 rerun's 5 generated-asset rows do not carry five-axis curation provenance. No `asset_attachment` is populated. The cycle's structural proof confirmed that the schema accommodates the row shape and that the seam-run chain reaches `release_readiness`; it did not exercise curation as a creative-discretionary act.

The cross-mode probe describes hypothetical curation events qualitatively for each touchpoint. Curation is described as *primarily* judging campaign-concept-fit + editorial-voice continuity + arc advancement (with subordinate axes for product credibility when products appear, aspect-ratio fit, attention-budget fit, copy-overlay tolerance). The probe also identifies campaign mode as having the **heaviest coherence verification pressure** across all four modes — five coherence questions asked simultaneously per slot.

**Explicit.** Nothing operationally exercised. The cycle 1 rerun evidence does not include any populated five-axis provenance for campaign-mode rows.

**Implicit / unmodeled.** Same as marketing-mode slice structurally. The probe's paper claim that campaign-mode curation primarily uses `human-cross-round-authorship-bearing-curation` (the most authorship-bearing pattern) reflects the depth of judgment required — but is paper-only.

**The premise pressure.** Per the redirection note flag (carried forward from earlier in this Phase 1 chain): *campaign / editorial mode is the strongest pressure point for whether "curation as the singular runtime creative-discretionary act" remains sufficient, because campaign-concept selection may prove to be upstream setup, a different runtime creative-discretionary act, or a premise that needs refinement.*

This is the load-bearing architectural concern surfaced by walking the campaign-mode slice. In SKU mode, curation is unambiguously the singular runtime creative-discretionary act — generation-invocation is mechanical; curator selects from candidates. In collection mode, the same posture held under operational pressure — curator override on PKT-COLL-001 confirmed authorship-bearing curation as a judgment-process category. In marketing mode, the probe predicts the same posture holds — message-fit judgment at curation, paper-asserted only. **In campaign mode, the premise comes under sharper pressure**: campaign-concept selection happens *upstream* of generation (operator authors the concept before any candidates exist) but is the dominant creative act in the entire campaign. The current posture treats it as upstream setup; campaign-mode operationalization will test whether that holds.

The premise has three possible operational outcomes when campaign mode is operationalized:

1. **Premise holds.** Campaign-concept selection is upstream setup; curation remains the singular runtime creative-discretionary act, with the heaviest-coherence-pressure mechanism at the seam. Collection-mode-style deflation pattern.
2. **Premise refines.** Campaign-concept selection is itself a runtime creative-discretionary act in a different shape — perhaps a "concept seam" that sits before generation alongside the curation seam.
3. **Premise fragments.** The singular runtime creative-discretionary act fragments into multiple distinct discretionary acts at different layers (concept selection; generation steering; candidate curation).

**This sketch does not resolve the premise pressure.** It surfaces it as a load-bearing architectural concern that campaign-mode operationalization will test.

**Not-yet-doctrine.** All three of the probe's strain-related candidates (`campaign_concept` first-class entity; structured reference-type tag; richer abstract `asset_role` taxonomy) plus the curation-premise pressure question itself **remain held more strongly than collection mode's analogous strain**, because no operational deflation has been earned. They may yet earn schema mutation when operationally pressured; they may not.

**Inheritance behavior.** Curation does not author upstream content — *if the premise holds*. Whether campaign-concept selection counts as upstream content authoring or as a creative-discretionary act in a different shape is the premise pressure question above. Operationally untested.

### Governed Asset Layer

**Slice content.** **Not operationally exercised at full-flow evidence depth.** PKT-CAMP-001 cycle 1 rerun's 5 generated-asset rows passed `release_ready` status without carrying `asset_attachment`, without populated five-axis provenance, without exercising the Path-B-shape full flow that PKT-SKU-010 and PKT-COLL-001 demonstrated for their respective modes.

This is the same artifact-state pattern as marketing-mode's PKT-MSG-001 placeholders and collection-mode's 3 historical placeholders from 2026-04-22 — structural row identity without governed-capture-event content.

The Phase 1 campaign base has no generated-asset rows at all (Phase 2 paused).

**Explicit.** PKT-CAMP-001 cycle 1 rerun carried 5 row identities (3 promotional + 2 review-context), packet linkage, gate-passage status. The structural-shape carrying-test passed at first-pass depth.

**Implicit / unmodeled.** The full governed-asset model is **structurally available** but **not operationally exercised** at campaign-mode evidence depth. Mode-specific governance questions — whether campaign-mode governed assets become inputs to downstream packets (e.g., a marketing-mode packet lifting a campaign hero as a brand-voice reference); whether campaign-arc continuity adds reuse / derivative pressure beyond what the apex artifact's reuse / derivative concerns name — are paper-only.

**Not-yet-doctrine.** Whether campaign-mode governed assets need any structural feature beyond what the SKU-driven, collection-mode, and marketing-mode rows already carry is held. The cycle 1 rerun shows the row shape carries the burden structurally at first-pass depth; full-flow operational pressure has not been applied. Held.

**Inheritance behavior.** Governed assets are downstream-terminal at first-pass depth. Whether campaign-mode governed assets become cross-packet references (the campaign-arc continuity case the probe describes) is unprobed.

### Review-Context / Campaign-World Coherence Layer

This layer is the **second campaign-mode-specific addition to the apex layer-shape**, alongside the campaign-concept layer. It is supported by evidence — the cycle 1 rerun's narrow specific result was that review-board context functioned as load-bearing for the bounded mini-family proof, not merely optional support. Marketing mode's PKT-MSG-001 introduced an analogous review-context category but the cycle 1 findings characterized it as "useful and appropriate, but not structurally primary." Campaign mode's evidence supports treating review-context as load-bearing.

**Slice content.** PKT-CAMP-001 cycle 1 rerun carries two review-context generated-asset rows:

- `campaign-review-board-v1` — side-by-side review board for the campaign mini-family
- `campaign-annotation-layer-v1` — light annotation overlay supporting brand-context coherence judgment

Both flowed through `SR-CAMP-OUTPUT-001` and remained legible to `SR-CAMP-RELEASE-001` and `GATE-CAMP-001`. The cycle 1 rerun frames this carrying as: "for this bounded mini-family proof, reviewable side-by-side context was not merely optional support. It functioned as part of the carried readiness burden."

The cross-mode probe describes the campaign-mode review mechanism as the heaviest coherence verification across all four modes — five coherence questions asked simultaneously (per-asset role / arc advancement / voice consistency / family continuity / latitude-use). The verification is review-board-shaped per the probe's paper-content treatment.

**Explicit.** PKT-CAMP-001 cycle 1 rerun makes review-board and annotation-layer artifacts explicit at the generated-assets layer, with explicit linkage through the seam-run chain. No first-class `review_context` entity; no structured separation of review-context artifacts from primary deliverables.

**Implicit / unmodeled.** The structural distinction between review-context artifacts (which support coherence judgment) and primary deliverable artifacts (which carry the campaign content) is implicit in row naming convention rather than enforced by schema. The relationship between review-context carriers at the slot/governed-asset layer and the review-board verification mechanism at the curation seam is implicit.

**Not-yet-doctrine.** Whether review-context should become a first-class category (with structural separation from primary deliverables) is paper-pressed by the probe's heaviest-coherence finding and structurally-supported by the cycle 1 rerun's load-bearing-review-context narrow result, but **not operationally tested at full-flow depth** — the cycle 1 rerun did not exercise review-board functioning under generation/curation pressure, only under structural seam-run chain pressure.

The marketing-mode sketch named useful-review-context as a potential category but characterized it as not-structurally-primary at marketing-mode evidence depth. The campaign-mode sketch lifts this: at campaign-mode evidence depth, review-context is structurally-primary for the bounded mini-family proof. Whether this generalizes to campaign-mode full-flow operational depth is held.

**Inheritance behavior.** Review-context artifacts inherit from the primary deliverable set — they review the family they accompany. The cycle 1 rerun showed this linkage carries through the seam-run chain at structural depth. Whether the linkage carries through curation and governance under generation pressure is untested.

## Brand Campaign / Editorial Mode Characteristics That Emerge from the Slice

Walking the slice surfaces several characteristics, keyed to evidence depth (structural-proof / paper / structural-and-paper / untested):

**Cross-base schema mirroring is structurally demonstrated (structural-proof).** The Phase 1 campaign base mirrors the SKU-driven base's 95-field schema with 11 link pairs, 8 lookups, 1 rollup, 1 createdTime, 2 formulas. This is the first cross-base schema-mirror evidence in the project. Whether the mirrored schema carries campaign-mode operational pressure was the Phase 2 question that was paused per the redirection note.

**Review-board context functions as load-bearing for bounded mini-family proofs (structural-proof, narrow scope).** The cycle 1 rerun's narrow specific result. Marketing mode's analogous category is structural-but-not-primary at evidence depth; campaign mode's is structural-and-primary at evidence depth. Whether review-context generalizes to load-bearing at full-flow depth is untested.

**`products` becomes peripheral as the campaign-mode structural finding (paper).** The probe's sharpest cross-mode finding. SKU mode's product-as-asset-purpose, marketing mode's product-as-subject-message-as-purpose, and collection mode's products-as-asset-purpose all keep `products` structurally load-bearing. Campaign mode genuinely loosens the slot–product structural relationship — some campaign slots have no product subject at all. PKT-CAMP-001 cycle 1 rerun anchored on SKU-CHAIR-002 but the probe scenario describes peripheral or absent product subjects across most touchpoints. Operationally untested.

**Editorial voice as a structurally load-bearing coherence axis (paper).** The probe finding. Voice exists in every brand but only in campaign mode does it become a first-class coherence axis distinct from visual rules and references. PKT-CAMP-001 cycle 1 rerun carried voice implicitly via packet-level content; full-flow voice-coherence verification is untested.

**Campaign-concept selection as the dominant upstream creative act (paper).** The probe describes campaign-concept articulation as carrying more weight than any other mode's upstream content authoring. PKT-CAMP-001 cycle 1 rerun carried minimal campaign-concept content; the Phase 1 campaign base is concept-empty; the probe's hypothetical concept content is paper-only. **Operationally untested, and pressing the curation premise.**

**Heaviest coherence verification weight across the four modes (paper, mechanism-confirmed-structurally).** The probe asserts campaign mode's curation-time coherence pressure is heaviest. PKT-CAMP-001 cycle 1 rerun's structural seam-run chain reached `release_readiness`; the seam-run chain mechanism is mode-independent (per the apex). Whether the curation-event content scales to the heaviest weight is untested.

**Implementation-vs-conceptual goal distinction sharpest in campaign mode (paper).** The probe's claim. Implementation is technically tractable (modern generation can produce plausible imagery for any of five touchpoints); conceptual is hard (voice + arc + continuity + latitude-use across five distinct moments). Operationally untested at campaign scope.

**Cycle 1 rerun result classification `findings-only` for one bounded mini-family proof (structural-proof, bounded scope).** The result is intentionally narrow: one bounded campaign / editorial Cycle-1-equivalent proof can be carried cleanly on the current Airtable surface. It is not a generalized claim about all future campaign / editorial work, and not a Phase-2-equivalent operational result.

**Mode-independence of structural shape (structural-proof, two depths).** PKT-CAMP-001 cycle 1 rerun ran inside the SKU-driven Furniture v1 base, structurally. The Phase 1 campaign base mirrors the same schema in a separate base, structurally. The schema's structural mode-independence claim — already operationally confirmed for SKU and collection modes at full-flow depth — is **structurally confirmed** for campaign mode at first-pass cycle depth and at cross-base schema depth. Operational confirmation at full-flow depth has not been earned.

**Paper-probe strain points remain held — collection-mode-style deflation has not been earned.** Same load-bearing methodological asymmetry as B3, sharpened: the campaign-mode strain points are structurally richer (composite-anchor; `products` peripherality; editorial voice; review-context as load-bearing; curation premise pressure) and the operational deflation absence cuts across all of them. Collection mode's prose-discipline deflation pattern may transfer; may partially transfer; may not transfer. The repo evidence does not yet say.

**Phase 2 operational work is paused, not abandoned (operational gap).** The redirection note made the deliberate call to pause further Airtable mutation in favor of on-paper IA layered-content work — the Phase 1 chain that this sketch closes. Campaign-mode operational testing in the new D2C Home-Goods base is the most concrete deferred operational direction. When (or if) it resumes, it will test the strain points, the curation premise pressure, and the cross-base schema-mirroring claim simultaneously.

## Open Questions Surfaced for Cross-Mode Comparison

These questions arise specifically from articulating the campaign-mode IA content. Many sharpen questions surfaced by B2 and B3, and some are unique to campaign mode.

1. **Does the curation premise hold under campaign-mode operational pressure?** The load-bearing architectural concern from the redirection note flag, sharpened by walking the campaign-mode slice. Three operational outcomes possible: premise holds (campaign-concept selection is upstream setup); premise refines (campaign-concept selection is a different-shape runtime act); premise fragments (multiple discretionary acts at different layers). Untested.

2. **Does the collection-mode operational deflation pattern transfer to campaign mode under operational pressure?** Same question as B3 sharpened: collection's prose-discipline deflation worked for grouping-archetype + relational-rules paper-pressed mutations. Campaign's analogous mutations (composite anchor; `products` peripherality; editorial voice; review-context as load-bearing) are structurally richer and the deflation may not transfer cleanly. Untested.

3. **How does `products` peripherality behave operationally?** The probe's sharpest cross-mode finding. PKT-CAMP-001 cycle 1 rerun anchored on a SKU but did not exercise a no-product-subject slot at full-flow depth. When (or if) campaign mode is operationalized, this is the central architectural pressure point.

4. **Does the heaviest-coherence-verification mechanism scale operationally?** The probe predicts five simultaneous coherence questions per slot at curation. The cycle 1 rerun reached `release_readiness` structurally without exercising the curation-content depth. Whether the existing `capture_reason` / `capture_notes` text carriers and the `human-cross-round-authorship-bearing-curation` pattern handle this load operationally (the collection-mode pattern) is untested.

5. **Does review-context-as-load-bearing generalize from bounded mini-family proof to campaign-scale full-flow?** The cycle 1 rerun's narrow specific result. The probe's heaviest-coherence finding suggests it should generalize. Operationally untested.

6. **Does cross-base schema mirroring carry mode-specific operational pressure?** The Phase 1 campaign base is structurally ready for Phase 2; the category/product_class enum mismatch is held; the lookup-chain empty-validity claim is structural-only until upstream linkages are populated. Whether the mirrored schema carries campaign-mode operational pressure or surfaces cross-base-specific strain is unprobed.

7. **What does cross-pollination across modes look like in the governed-asset layer?** Campaign-mode governed assets may serve as references for downstream marketing-mode or collection-mode packets (a campaign hero shot lifted as brand-voice reference). The reuse / derivative governance question is held across all four modes; campaign mode is the strongest case for it because campaign-arc continuity introduces structural cross-packet pressure beyond what the other modes exercise.

8. **How does the Phase-1-paused-but-not-abandoned posture interact with future operational work?** When (or if) Phase 2 work in the campaign D2C Home-Goods base resumes, it will absorb the IA-content articulation from this sketch, the cross-mode synthesis sketch (B5), and any subsequent grounding-note revisions. The operational test will then be informed by the full Phase 1 IA-content chain — a different starting posture than collection mode's operational test had (which preceded the IA-content articulation).

These questions feed forward into the cross-mode synthesis sketch, where the four modes' patterns can finally be compared against each other on consistent ground.

## Self-Superseding Clause

This sketch is the final of four Phase 1 mode sketches. It should be superseded by:

- the cross-mode synthesis sketch — the next Phase 1 artifact, which will compare the four mode sketches against each other and surface the consolidated cross-mode IA content model
- whatever later milestone-8 synthesis absorbs the redirection alongside the Phase 1 outputs and any Phase 2 outputs
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact and the Phase 1 sketches into a single current-architecture document
- any future operational deflation (or operational confirmation of strain) earned by a Phase-2-equivalent campaign-mode test on PKT-CAMP-001 or in the campaign D2C Home-Goods base

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the three prior mode sketches, the cross-mode probe, the cycle 1 rerun findings, or the Phase 1 base-setup change summary. Those remain authoritative for their subject matter; this sketch reads them at brand campaign / editorial mode column depth and articulates content there, while preserving the evidence-depth distinctions that distinguish campaign from SKU, collection, and marketing modes.

## Anchor Documents

### Phase 1 sketch series

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): the SKU-driven mode sketch; baseline for SKU-anchored 1:1 content with operational deflation depth
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): the collection / merchandising mode sketch; contrast for 1:N grouping and operational deflation of paper-strain
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): the marketing / message-driven mode sketch; contrast for message-bearing carriers at structural-proof + paper-content depth without operational deflation
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that places this sketch as the fourth and final Phase 1 mode sketch; carries the curation-premise pressure flag this sketch surfaces in the curation-seam treatment

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitation #3 explicitly holds campaign-mode operational evidence as not-yet-earned
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that the campaign-mode probe concretizes
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md): four-mode comparison across single-item truth, relational truth, message-bearing discipline, and campaign coherence

### Worked vertical slice — paper-content anchor and structural shape proofs

- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): primary paper-content evidence; THE LONG TABLE five-touchpoint scenario; sharpest paper-probe across the cross-mode sweep; surfaces composite-anchor as the most-consistent strain across all three non-SKU modes
- [`docs/airtable-campaign-editorial-cycle-1-rerun-findings-v1.md`](airtable-campaign-editorial-cycle-1-rerun-findings-v1.md): structural shape proof; PKT-CAMP-001 carries the bounded campaign / editorial mini-family at first-pass depth; review-board context functioned as load-bearing for the bounded proof; result classification `findings-only`
- [`docs/airtable-campaign-editorial-cycle-1-findings-v1.md`](airtable-campaign-editorial-cycle-1-findings-v1.md): the prior insufficient-evidence first attempt at the same bounded proof; preserved per artifact discipline
- [`docs/airtable-campaign-editorial-proof-plan-v1.md`](airtable-campaign-editorial-proof-plan-v1.md): proof plan that the cycle 1 rerun executed against
- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): Phase 1 base-setup completion record; cross-base schema mirroring at structural depth in the new Campaign-Driven D2C Home-Goods v1 base; surfaces category/product_class enum mismatch as held
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): SKU-driven Path A; established the implementation-vs-conceptual goal distinction (sharpest in campaign mode per the probe)
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): SKU-driven Path B; established the asset_attachment self-contained governed-asset pattern
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): the operational deflation of paper-strain pattern that campaign mode has not yet earned

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau this sketch reads against
