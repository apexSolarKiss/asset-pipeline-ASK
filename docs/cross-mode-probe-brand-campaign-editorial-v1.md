# Cross-Mode Probe // Brand Campaign / Editorial Mode v1

## Purpose

This artifact pressures the existing SKU-driven Furniture v1 schema and architecture against a concrete brand campaign / editorial scenario. It is the third and final cross-mode application probe in the v1 sweep, following the marketing / message-driven probe ([`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md)) and the collection / merchandising probe ([`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md)).

The architectural question: **does the current implementation hold when applied to a scenario where the load-bearing creative judgment is *campaign coherence at scale* with *editorial voice* as a structural element — and where individual assets may not have a SKU subject at all?**

Outcome: **Holds at the structural level — but with a sharper finding than either prior probe: `products` becomes peripheral in campaign mode, and the question of what an asset is *of* becomes structurally more interesting. The cross-mode sweep, taken together across all three probes, surfaces one consistent shape of strain: Layer 2's composite fidelity-anchor needs structured representation in three different mode-specific shapes (`messages` for marketing, `grouping_archetype` for collection, `campaign_concept` for campaign).**

This is a sketch, not doctrine. It does not authorize schema mutation, taxonomy settlement, or new Airtable work.

## Architectural Anchor

The cross-mode layered-input model ([`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md)) pressure-tested brand campaign mode on paper, surfacing:

- Layer 1 governing pressure: **campaign coherence, bounded latitude**
- Layer 2 fidelity anchor: **unitary (scene archetype)** — but the scene archetype itself is a composite of many directional elements
- Slot input plurality: **singular subject plus family-level continuity references**
- Curation: per-slot plus **heaviest** coherence verification
- Governed asset subject identity: **scene or moment in family**

The campaign packet example ([`docs/application/examples/campaign-workflow-packet-example.md`](application/examples/campaign-workflow-packet-example.md)) gives a generic "Example Lifestyle Brand / Early Autumn Reset" instance. This probe pivots both the brand context and the category — to a heritage refined-living brand archetype with a spring 2026 campaign — to test whether campaign coherence holds when the brand has an explicit editorial voice and the campaign scope is more elaborate than the example's three-asset set.

## Probe Setup

### Brand Archetype

A heritage refined-living brand whose core brand value is **preservation of craft + enduring design + aspirational restraint** — a different brand archetype space than the D2C everyday-essentials used in the marketing and collection probes, deliberately, to test category and brand-archetype variation in addition to mode.

The brand's editorial voice is structurally load-bearing — the campaign assets carry a recognizable brand voice as much as they carry the campaign concept. Visual language: warm, refined, generous light, textural detail, evidence of human presence without overt narrative.

Per repo brand-name avoidance: the archetype is described by its abstract qualities. It is informed by public-reference brands in the heritage refined-living space without naming them in this artifact.

### Concrete Scenario

A spring 2026 campaign — let's call it abstractly `THE LONG TABLE` — about gathering around enduring objects across the seasonal transition. The campaign frame is broader than a single product launch; it carries a brand-value narrative that surfaces in many touchpoints over an 8-week window.

Five distinct touchpoints sketched:

| Output slot | Aspect ratio | Role in campaign arc | Subject |
|---|---|---|---|
| **HERO_EDITORIAL** — catalog double-spread | 2400 × 1500 (wide-spread) | The campaign's defining image | A wide table scene at golden hour; specific furniture pieces present but not foregrounded |
| **HERO_EMAIL** — campaign-launch email hero | 1500 × 800 | First reader contact | A close-of-day still life: the table after gathering; one centerpiece piece visible |
| **STORY_MOMENT** — supporting editorial moment | 1080 × 1350 | Mid-campaign extension | A hand-and-vessel detail; no full furniture piece visible; carries brand voice through texture and gesture |
| **SOCIAL_TILE** — Instagram square | 1080 × 1080 | Social pacing | A cropped section of the hero scene; recognizably part of the same world |
| **BANNER_WEB** — homepage banner | 1920 × 800 | Sustained surface | Wide horizontal scene with copy-overlay region |

Five slots, all of which are *campaign-mode slots*. Subjects vary widely — only one slot (HERO_EDITORIAL) has a clear furniture-product subject, and even that is not the asset's purpose. The campaign coherence is what unifies them; the products are incidental to the campaign concept.

### Why This Probe

- **Tests the schema's most pressured campaign-mode strain point.** The "what is this asset *of*" question is most ambiguous in campaign mode, and the on-paper layered-input model named this without fully concretizing it.
- **Editorial voice as structurally load-bearing.** The brand's voice is itself a coherence axis. Tests whether the schema can carry voice as something other than packet-level prose.
- **Heritage refined-living archetype.** Different brand-archetype space than the prior two probes. Tests whether the schema's category-agnosticism extends to brand-archetype-agnosticism.
- **Five-slot scope with heaviest coherence pressure.** Per the on-paper model, campaign mode has the heaviest coherence verification weight. Five slots gives that pressure room to actually pressurize.
- **Unifies the cross-mode sweep.** Three probes, three modes, three ways the architecture either holds or strains. This probe is the synthesis pressure — does the strain pattern across three modes converge into one structural finding?

## Mapping Attempt

### `workflow_packets` (existing entity)

Maps cleanly. The packet represents `Spring 2026 / The Long Table`. The packet carries the bounded creative discretion declaration (broader than other modes — wider expressive range bounded by campaign frame), the approved references (campaign mood, prior heritage brand work, light direction, palette, voice), and the required output set.

The packet shape from SKU mode survives intact, but its `bounded_creative_discretion` text field carries more weight here than in any other mode. The campaign concept *itself* is what the packet must articulate — and that concept governs five different slots through an editorial voice that is implicit in the brand's history and explicit in the campaign frame.

### `products` (entity becomes peripheral)

This is where campaign mode diverges most sharply from SKU, marketing, and collection modes.

In SKU mode, every asset is *of* a SKU. In marketing mode, the asset is *of* a SKU plus carries a message. In collection mode, the asset is *of* multiple SKUs styled as a grouping. In campaign mode, the asset is *of* a **moment** — and that moment may or may not feature a specific catalog product.

Of the five sketched slots:
- HERO_EDITORIAL: products present but not foregrounded
- HERO_EMAIL: one product visible (centerpiece), but not the asset's purpose
- STORY_MOMENT: no specific product visible at all
- SOCIAL_TILE: same products as HERO_EDITORIAL through cropping
- BANNER_WEB: one product visible at the edge of frame

The `products` entity can still link to the packet — campaigns are usually loosely tied to product launches or seasonal merchandising. But the slot-product relationship that was structurally load-bearing in SKU mode (every slot anchored to one product) and modified-but-present in marketing and collection modes is now *optional*. Some slots have no product anchor at all.

This reveals a structural feature that the prior probes did not: **the slot's fidelity anchor is mode-bound, and in campaign mode the anchor is the campaign concept itself, not the product.**

### `output_slots` (entity strains in a campaign-specific way)

Strains differently than in marketing or collection modes.

The strain is not about plural product references (collection's strain) or message-bearing element structure (marketing's strain). It's about whether the slot's fidelity anchor can be **the campaign concept itself**, not a product or product subset.

Two possible mappings:

1. **Carry the campaign concept at the packet level via `bounded_creative_discretion` and references; let slots inherit it implicitly through packet membership.** This works but loses the structural traceability of "this slot's fidelity anchor is the campaign concept" — the concept is everywhere implicitly, nowhere explicitly.

2. **Introduce a packet-level `campaign_concept` first-class field (or entity) that slots reference explicitly.** This makes the campaign concept queryable, comparable across packets, and explicit as the load-bearing fidelity anchor for campaign-mode slots.

This finding parallels the marketing probe's `messages` / `briefs` question and the collection probe's `grouping_archetype` question. **Layer 2's composite fidelity-anchor needs structured representation in all three non-SKU modes.** The shape of that representation differs by mode (message archetype vs. grouping archetype vs. campaign concept), but the structural pattern is the same.

### `reference_assets` (entity holds; content is mode-specific in a campaign way)

Holds. The reference asset entity already accommodates plural references per slot. In campaign mode, references include:

- **brand voice references** — prior editorial work establishing the brand's voice
- **campaign-world references** — mood-board, light direction, palette, era cues
- **family-continuity references** — prior assets in the same campaign that this slot must continue
- **directional references** — composition, framing, emphasis exemplars
- (optionally) product references when a specific SKU appears

The structural pattern holds. What differs from SKU mode is that *brand voice* itself becomes a reference category, which is more abstract than any reference category that surfaces in SKU, marketing, or collection mode.

A possible refinement: a structured tag or category on `reference_assets` that classifies the reference type (voice / world / continuity / direction / product). Held; not earned by current pressure.

### `generated_assets` with five-axis curation provenance (entity holds — with the most expansive `capture_reason` content)

Holds cleanly. Same five fields. What changes again is the *content* of `capture_reason`. Campaign-mode reasons trend toward voice-and-arc language: "carries the brand's restrained voice," "advances the campaign arc without repeating HERO_EDITORIAL," "holds family continuity through light direction," "extends the world without re-stating it."

`asset_role` likely needs richer values still: `EDITORIAL_HERO`, `EMAIL_HERO`, `STORY_MOMENT`, `SOCIAL_TILE`, `WEB_BANNER` or similar. Or — usefully — `asset_role` could become more abstract in campaign mode: `OPENING_MOMENT`, `EXTENSION_MOMENT`, `RESONANCE_MOMENT`. The existing single-select holds either approach; this is content discipline, but the mode genuinely surfaces a richer role taxonomy than SKU mode required.

### `curation_pattern` (enum holds)

Holds. The five existing values are mode-independent. Campaign-mode curation primarily uses `human-cross-round-authorship-bearing-curation` because editorial voice and campaign arc are deeply hard to delegate algorithmically — but the pattern is mode-independent in form.

### `asset_attachment` (field holds cleanly)

Holds. Self-contained governed-asset pattern is mode-independent. A campaign asset's attachment carries the editorial moment with the same independence from slot mutation that SKU-mode, marketing-mode, and collection-mode assets have.

### Family Coherence (concept holds; content shifts heaviest)

Family coherence in campaign mode means: do all five slots' assets read as one campaign world, with the same brand voice, light direction, tonal restraint, and arc-position logic across the five touchpoints?

This is the heaviest coherence pressure across all four modes (per the on-paper layered-input model). The reviewer is asking simultaneously:
- Does each asset hold its own role in the arc?
- Do the five together advance the campaign concept?
- Does the brand voice survive across all five?
- Are family-continuity references honored?
- Is the bounded latitude *used* (not just *allowed*) — variation strengthening the campaign rather than weakening it?

The implementation-vs-conceptual goal distinction surfaces sharpest here: a campaign round can pass implementation (five slots filled with technically-plausible assets) while failing conceptual at every level — voice not coherent, arc not advancing, world feeling like five disconnected images.

## Hypothetical Curation Walk-Through

Sketching qualitatively (no actual generation performed):

### HERO_EDITORIAL (2400 × 1500)

The campaign's defining image. Candidates likely range across:
- Cand 1: wide table at golden hour, gathering people visible, rich color, but reads as lifestyle stock — voice not present
- Cand 2: wide table at golden hour, no people but evidence of recent presence (a chair pulled out, a glass left, soft late light), brand voice clearly carried
- Cand 3: tighter framing, voice present, but loses the "long table" scope of the campaign concept
- Cand 4: wide table, generous light, brand voice present, evidence of human presence subtle, products integrated naturally
- Cand 5: dramatic light, voice strong but skewed toward editorial-magazine rather than the brand's restraint

Curation event: pick Cand 4. `capture_reason`: "wide scene establishes campaign's long-table scope; brand voice carried through generous light and material restraint; products present but not the subject; evidence of presence without overt narrative; opens the arc."

### HERO_EMAIL (1500 × 800)

Different framing, same campaign world. Curation picks the candidate where the still life carries the brand voice into the email format without re-stating HERO_EDITORIAL.

### STORY_MOMENT (1080 × 1350)

Hand-and-vessel detail. No catalog product visible. Curation here is the most challenging because the asset's only fidelity anchor is the campaign concept and brand voice. `capture_reason`: "extends the campaign world through gesture and texture; voice present without product subject; advances the arc without repeating any prior touchpoint."

### SOCIAL_TILE + BANNER_WEB

Curation picks candidates that hold the campaign world at different aspect ratios and roles.

### Coherence Verification (heaviest review)

After per-slot curation: review-board step verifies that the five picked assets read as one campaign world, with voice and arc and continuity intact. This is the heaviest coherence verification across all four modes.

If coherence fails at any level (voice / arc / continuity): re-curate one or more slots. If coherence holds: governed asset family is sealed.

## Findings

### 1. Architectural shape holds across the mode shift, again

The six-layer model + curation seam + five-axis provenance + asset_attachment pattern survives translation into campaign mode without structural change. Same finding as the prior two probes.

### 2. `products` becomes peripheral — and that is a structural finding, not a content finding

Across the cross-mode sweep:
- SKU mode: product is the asset's purpose
- Marketing mode: product is the asset's subject; message is the asset's purpose
- Collection mode: products (plural) are the asset's purpose
- Campaign mode: product is **optional**; campaign concept is the asset's purpose

This reveals that the slot–product relationship is mode-bound. The current schema treats `output_slots.product_image_lookup_lookup` as load-bearing (via the lookup chain to packet → products). In campaign mode, that load-bearing relationship genuinely loosens, and the slot's fidelity anchor migrates to the campaign concept itself.

### 3. Layer 2's composite fidelity-anchor needs structured representation across three modes — and the cross-mode sweep makes this consistent

The marketing probe surfaced this as a possible `messages` or `briefs` entity. The collection probe surfaced it as a possible `grouping_archetype` representation. The campaign probe surfaces it as a possible `campaign_concept` first-class field or entity.

**The unifying finding is that all three non-SKU modes pressure the same structural absence: there is no first-class representation of Layer 2's composite anchor.** Each mode would benefit from one, in mode-specific shape. Whether to unify these into one polymorphic `composite_anchor` entity, three separate entities, or structured packet-level fields is a schema-design decision that current pressure does not force.

This is the most consistent strain across the cross-mode sweep.

### 4. Editorial voice is structurally load-bearing in campaign mode in a way it is not in other modes

Voice exists in every brand. But in SKU, marketing, and collection modes, voice is mostly carried *implicitly* through the brand's visual rules and the references attached to the packet. In campaign mode, voice becomes a **first-class coherence axis** — the reviewer judges it explicitly during family coherence verification.

This does not necessarily require a new schema element. It does require that `bounded_creative_discretion` and `reference_assets` carry voice as an explicit consideration in campaign packets. Content discipline within existing fields is sufficient if the discipline is rigorous.

### 5. Curation has heaviest coherence pressure here, confirming the on-paper model

The on-paper layered-input model said campaign mode has the heaviest coherence pressure. The probe confirms it: the reviewer is asking five coherence questions simultaneously (per-asset role, arc advancement, voice consistency, family continuity, latitude-use). This is more weight than any other mode produces.

Mechanism is uniform across modes (review-shaped per-slot-plus-coherence-verification). Weight is mode-shaped.

### 6. The implementation-vs-conceptual goal distinction is sharpest in campaign mode

Path A surfaced this in SKU mode. Marketing and collection probes confirmed it carries. Campaign mode surfaces it *most acutely* because:
- Implementation is easy (modern generation can produce technically-plausible imagery for any of the five touchpoints in many candidates)
- Conceptual is hard (voice + arc + continuity + latitude-use across five distinct moments is a multi-axis judgment)
- The gap between implementation success and conceptual success is widest in this mode

The distinction is structural to creative production, mode-independent in form, but most pronounced in campaign mode.

### 7. The cross-mode sweep has one consistent structural finding

Three probes, three modes, three brand archetypes, three categories. The single most consistent finding across all three is the Layer 2 composite-anchor pressure (Finding 3). Slot-input plurality is most acute in collection mode. Editorial voice is most load-bearing in campaign mode. Message-bearing structure is most acute in marketing mode. But the *unifying* schema implication that surfaces in all three is the absence of structured composite-anchor representation.

If a future schema mutation is opened from cross-mode application pressure, that is the highest-leverage place to start.

### 8. Category-agnostic and brand-archetype-agnostic

The probe used a heritage refined-living brand archetype, different from the D2C everyday-essentials archetype used in the prior two probes. Different category (home/refined-living rather than apparel). Different brand-voice register. No category-specific or brand-archetype-specific strain surfaced. The schema is robust to both axes.

## What This Probe Does Not Do

- authorize Airtable schema mutation
- stand up a campaign-mode Airtable base
- run actual generation against the brand archetype
- propose a unified `composite_anchor` entity (the cross-mode sweep surfaces the pressure for one; this artifact does not design it)
- supersede the cross-mode layered-input model note
- name any real brand in repo artifacts (per the brand-name avoidance rule)

## Open Questions / Next Pressure Points

1. **Whether to stand up a campaign-mode Airtable base for full-flow operational testing.** This probe is paper-only. A full-flow operational test would surface whether the `products`-becomes-peripheral shift becomes an operational blocker or remains a content-discipline matter.

2. **Whether a unified `composite_anchor` entity (or three mode-specific ones) should be opened as a schema mutation.** Held. Across three probes this is the most consistent strain — but no operational pressure has forced it.

3. **Whether `asset_role` should grow a richer or more abstract taxonomy in non-SKU modes.** Held; not earned by current pressure.

4. **Whether `reference_assets` should carry a structured reference-type tag (voice / world / continuity / direction / product).** Held; not earned by current pressure.

5. **The cross-mode application sweep is now closed at probe-depth.** Three modes (marketing, collection, campaign) probed at the same depth, on top of the SKU-driven Furniture v1 mode that has been operationally implemented. The next pressure is whether to operationalize any of these modes in a new Airtable base — and if so, which one. Collection mode produced the sharpest single-strain case for plural slot-input fields; campaign mode produced the most synthesis-rich finding (composite-anchor representation across three modes).

6. **Cross-mode synthesis artifact.** A possible follow-on artifact would synthesize the three probes' findings and the on-paper layered-input model into a unified cross-mode reading, surfacing the composite-anchor finding as the load-bearing structural pressure across the sweep. Held; the three probe artifacts already carry the synthesis individually, and a separate synthesis artifact may be ceremony.

## Anchor Documents

- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): first cross-mode probe (marketing / message-driven)
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): second cross-mode probe (collection / merchandising)
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that the probe series concretizes
- [`docs/application/examples/campaign-workflow-packet-example.md`](application/examples/campaign-workflow-packet-example.md): existing generic campaign-packet example
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): introduced the implementation-vs-conceptual goal distinction (carries fully cross-mode; sharpest in campaign mode)
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): introduced asset_attachment field (carries fully cross-mode)
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): original four-axis provenance schema move
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): SKU-driven Furniture v1 plateau
