# Architecture // Aesthetic Layering Modeling Pass v1

## Purpose

This is a bounded aesthetic-layering modeling pass. Its narrow goal is to attempt a model of where aesthetic lives across the layered architecture, with inheritance and override behavior as the load-bearing question.

It is not the apex definition-layer artifact. It is not a rewrite of [`docs/architecture.md`](architecture.md), [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md), [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md), or [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md). Those remain authoritative for their subject matter.

The repo is aesthetic-agnostic by design. This pass models the *shape* of aesthetic representation, not aesthetic content. The grounding note's prototype-aesthetic guidance is repo-external and does not appear here. Each deployment supplies its own visual system through whatever architectural slots this pass and its successors specify.

## Posture

The corrective principles this pass operates under:

```text
architecture attempt before prototype ceremony
vocabulary deconstruction before architectural commitment
aesthetic representation modeled as shape, not content
```

```text
one artifact
no schema
no airtable
no prototype
no canonization
no rewrite of architecture.md / cross-mode-layered-input note / prior passes
no apex artifact
```

Permission to be wrong is part of the method. Aesthetic layering is the deepest unresolved architectural problem named in the grounding note and named again in the vocabulary precision pass v1 watchpoint section. A first pass at it is unlikely to settle the question; the goal is to attempt the model honestly enough that the next move is informed.

## Architectural Question

Where does aesthetic live across the layered architecture? At each layer, what kind of aesthetic representation could be carried, what carriers currently exist, and what is missing? How does aesthetic inherit, override, and combine across layers?

The repo carries aesthetic through packet/slot prose and references, but it does not yet distinguish brand-system, mode/category, or product/product-class aesthetic as first-class layered concerns. This pass attempts the layer-shape sketch that lets the next architectural move be specific.

## Aesthetic vs Product-Truth Distinction

Before the per-layer attempt, one boundary needs clarity:

**Product-truth** is what a product *is*: material composition, dimensions, finish, identifying construction details, function. Carried by `material_notes`, `finish_notes`, `identifying_details`, `product_image` per SKU.

**Aesthetic** is how the visual system *frames* those facts: composition language, lighting language, atmospheric register, compositional principles, surface-treatment conventions, cropping conventions, palette and tonal register, image-quality and finish-rendering conventions.

Same data can be carried in service of different functions. "Warm walnut" can be product-truth (this chair *is* warm walnut) or aesthetic claim (the brand's visual system *favors* warm walnut tonal register across its catalog). The architecture must not collapse the two.

This pass treats aesthetic as a separate concern from product-truth, even where current carriers overlap.

## 1 // Brand-System Context Layer

### What aesthetic could live here

The overarching visual system that defines a brand-system aesthetic identity, independent of any specific mode or product. This is what a brand style guide encodes: photography style, lighting language, palette conventions, compositional principles, material vocabulary, surface-treatment conventions, image-quality standards, exclusion language ("the brand never does X"), bounded creative discretion ("within these limits, vary freely").

In the grounding note's *creative discretion as bounded zone* framing, this layer carries the outer envelope of allowed variation for the entire system.

### Carriers in current schema

**None at this layer.** The grounding note's prototype aesthetic lives external to the repo by design, but in a deployment-context implementation, brand-system aesthetic would need first-class carriers. The repo does not currently model:

- a brand entity with aesthetic-relevant fields
- brand-level approved-reference imagery
- brand-level hard rules / exclusion language
- brand-level bounded creative discretion language
- brand-level surface-treatment / palette / lighting conventions

Brand-system aesthetic is currently implicit, carried (when present) by setup discretion at lower layers.

### What carriers might look like (sketch, not specification)

At brand-system scope, the conceptual carriers would include:

- a brand-defining reference set
- brand-level hard rules / exclusion language
- a brand-level bounded-discretion envelope
- brand-level aesthetic anchors (whether expressed as references, prose conventions, or both)

These are conceptual carriers, not field or table proposals. Whether they would become entities, attributes, overlays, or some other shape is a schema question that would have to be earned by operational pressure.

### Inheritance role

Brand-system aesthetic is the outermost envelope. Everything below inherits from it by default. Overriding brand-system aesthetic at a lower layer requires explicit specification because brand-level conventions are usually inviolable.

## 2 // Mode / Category Layer

### What aesthetic could live here

Mode-shaped aesthetic conventions. The same brand expressed through SKU-driven product imagery looks structurally different from the same brand expressed through marketing/message-driven work or campaign/editorial work, even within identical brand-system constraints.

- **SKU-driven mode aesthetic:** product-as-subject conventions. Product centered, generally even lighting, neutral or controlled background, role-specific framing (HERO / PROFILE / DETAIL / CONTACT-SHEET).
- **Collection / merchandising mode aesthetic:** relational composition. Multiple subjects in coherent context, environmental or studio-environment cues, family-coherence pressure across slots.
- **Marketing / message-driven mode aesthetic:** message-bearing visual language. Callouts, brand-identifier emphasis, offer-relevant visual cues, message-archetype-shaped composition.
- **Brand campaign / editorial mode aesthetic:** atmospheric / world-building. Editorial framing, narrative atmosphere, family-level continuity across the campaign world, peripheral product treatment.

These are shape claims about mode aesthetics; they are not brand-specific. A heritage furniture brand and a contemporary tech brand both have SKU-mode aesthetics — they just realize different surface-treatment / composition / lighting conventions inside the SKU-mode shape.

### Carriers in current schema

**None at this layer structurally.** Mode/category aesthetic emerges from packet-level and slot-level conventions but is not modeled as a first-class concern. The closest current carrier is mode naming in worked-example artifacts and packet conventions, not a first-class mode aesthetic carrier in the active Airtable schema.

The four worked-example modes have produced mode-shape evidence (slot patterns, role conventions, reference-asset behavior), but that evidence lives in worked-example artifacts and packet conventions, not in mode-level aesthetic carriers.

### What carriers might look like (sketch)

At mode/category scope, the conceptual carriers would include:

- mode-default aesthetic conventions (composition / framing / atmospheric defaults that hold across packets within the mode)
- mode-typical reference patterns (the kinds of references this mode usually carries, structurally)
- slot-role aesthetic patterns (the role-shaped aesthetic burden of a HERO vs DETAIL vs CONTEXT slot, where role recurs across packets)

Or, alternatively, mode aesthetic could remain implicit and emerge from convention rather than structure. The architecture has not yet earned an answer to which is right.

### Inheritance role

Mode/category aesthetic shapes how brand-system aesthetic is realized for the kind of work being done. Brand says "this is the visual envelope"; mode says "for this kind of work, here is how the envelope is realized in practice." Conflicts are usually resolved in favor of brand (mode is a realization of brand, not a competitor to it).

## 3 // Product / Product-Class Layer

### What aesthetic could live here

The aesthetic burden shaped by what the product itself *is* and what product-class it belongs to. A chair has different lighting needs than a watch; a sofa has different scale needs than a lamp; an upholstered piece has different surface-treatment needs than a polished-metal piece.

Product-class aesthetic is the bridge between product-truth (what the thing is) and the visual system's treatment of that thing (how the brand renders this kind of thing).

### Carriers in current schema

**Partial.** Product-truth fields (`material_notes`, `finish_notes`, `identifying_details`) carry facts that *imply* aesthetic burden but do not carry aesthetic claims directly. A product's `material_notes: "warm walnut, slim tapered legs, linen upholstery"` is product-truth; it does not say *how* warm-walnut-ness should be lit, framed, or surfaced visually.

The `product_image` attachment per SKU carries one durable visual reference, which encodes some aesthetic information implicitly (the existing studio treatment of this product), but is not separated into product-class-aesthetic-claim vs product-truth-image.

### What carriers might look like (sketch)

Product-class aesthetic conventions could be carried either on product records (refining the existing product-truth carriers with class-level aesthetic claims) or in a separate class-level carrier if later earned by operational pressure where many products share class-level aesthetic and per-product specification would duplicate.

The architecture has not earned a choice between these. They are named here as the conceptual options.

### Inheritance role

Product-class aesthetic is shaped by brand-system aesthetic and mode/category aesthetic. It can refine but typically does not contradict either. A product belongs to a product class; the class belongs to the brand's product taxonomy; the taxonomy is shaped by the brand's aesthetic. Conflicts are unusual and would usually be resolved in favor of the higher layer.

## 4 // Packet Layer

### What aesthetic could live here

Packet-level aesthetic specifies the aesthetic identity of one specific work unit: this group of slots, for this product or product set, with this creative intent. Packet aesthetic refines mode and product-class aesthetic for the specific work being produced.

This is the layer where most aesthetic *specification* currently happens in the repo, not because it is the right layer for it conceptually but because higher layers have no structural carriers.

### Carriers in current schema

**Strong (relative to other layers).** The packet entity carries:
- `bounded_creative_discretion` — text field carrying allowed-variation language for this packet
- `creative_intent` — text field carrying creative direction for this packet
- `business_intent` — text field carrying business-purpose framing
- packet-level `reference_assets` linkages — including studio-world reference attachments like `REF-PKT-SKU-009-VISUAL-INVARIANT-002`

These are real, durable, used in evidence chains. They do most of the aesthetic-specification work in current operational evidence.

### Architectural concern

The packet layer is currently *over-loaded* with aesthetic responsibility. Brand-system aesthetic, mode/category aesthetic, and product-class aesthetic all currently flow through packet-level carriers because no higher-layer carriers exist. This compresses the layered model into "everything aesthetic happens at the packet."

That compression is operationally workable for SKU-driven Furniture v1 evidence (where the brand context is implicit and uniform) but would not generalize cleanly to a deployment-context implementation with multiple modes, multiple product classes, and explicit brand-system aesthetic.

### Inheritance role

Packet aesthetic refines the upper layers (brand, mode, product-class) for one specific work unit. It can override upper-layer defaults but typically does not contradict them. A packet that openly contradicts its brand's aesthetic envelope would be a packet that should not be authored without explicit brand exception.

## 5 // Slot Layer

### What aesthetic could live here

Slot-level aesthetic is role-specific aesthetic for one specific output slot inside a packet. A HERO slot has different aesthetic burden than a DETAIL slot or a CONTACT-SHEET slot or a CONTEXT slot, even within the same packet, because the slot's role in the asset family is different.

### Carriers in current schema

**Strong.** The slot entity (output_slots) carries:
- `slot_prompt` — text field carrying slot-specific aesthetic and compositional language
- `product_image_lookup_lookup` — structural lookup to the product's product_image attachment
- packet-reference lookup fields surfaced onto the slot, plus slot_prompt language carrying role-specific reference instructions

The slot is a primary aesthetic-specification surface in current evidence. Slot prompts in operational tests have carried role-specific framing language, exclusion language, and aesthetic refinements at this layer.

### Inheritance role

Slot aesthetic refines packet aesthetic for one role. In current evidence, slot-level variation is carried by `slot_prompt` language and surfaced packet/product lookups; a future schema could add role-specific reference carriers if earned. Whether lower-layer slot carriers formally override packet-level aesthetic, or merely add specificity within packet bounds, remains part of the unresolved inheritance/override question.

Role-specific narrowing at the slot layer is common operationally because slot role is a normal concern; formal override authority is not yet modeled.

## 6 // References as Cross-Cutting Aesthetic Carriers

### What references carry

Reference assets — approved imagery linked into the system as structural carriers — are the architecture's primary high-bandwidth aesthetic carrier. Prose can describe aesthetic; images encode it.

References can live at any layer:
- Brand-level (currently unmodeled): brand-defining reference imagery
- Mode/category-level (currently unmodeled): mode-typical reference patterns
- Product/product-class-level: per-product `product_image` attachments
- Packet-level: packet-level studio-world references, packet-level visual-invariant anchors
- Slot-level (possible / future): role-specific reference attachments or role-specific reference instructions

### How references currently behave

In current evidence:
- Packet-level references are implicitly visible to all slots in the packet through surfaced lookup fields (additive availability, not formal inheritance)
- Slot-level prompt/reference instructions can supplement packet-level references; direct slot-specific reference linkage is not present in the active schema
- Product-level references via `product_image_lookup_lookup` flow through to slots structurally

The reference layer is cross-cutting because aesthetic claims at any other layer can be carried by reference linkages at that layer, not only by prose at that layer.

### Architectural concern

The current reference behavior is *additive accumulation* rather than *layered precedence*. If packet-level reference says "warm walnut studio world" and slot-level reference says "cool steel detail close-up," both are supplied to generation; the agent resolves the conflict by interpretation. There is no architectural rule that says "slot-level reference takes precedence" or "packet-level reference is the constraint, slot-level is the variation."

Whether the architecture should make precedence explicit, or accept additive accumulation as the model and rely on prose discipline to resolve conflicts, is open.

## 7 // Curation / Governance Layer

### What aesthetic lives here

The curation seam is where aesthetic judgment is exercised against generated candidates. The five-axis curation provenance fields (`capture_reason`, `capture_notes`, `source_attachment_id`, `captured_at`, `curation_pattern`) plus `curator` carry the record of the aesthetic judgment that elevated a candidate into governed asset identity.

Curation does not author the upstream aesthetic specification; it judges candidates against it and elevates one into governed asset identity. If governed assets later become references or precedents, curation can also shape the system's future aesthetic evidence. The curator's aesthetic criteria (e.g., "hero-product chair fully lit") are the governance act on aesthetic.

### Carriers in current schema

**Strong.** Five-axis provenance + curator + curation_pattern + asset_attachment cover the curation seam comprehensively for the SKU-driven Furniture v1 base.

### Inheritance role

Curation does not inherit aesthetic; it judges aesthetic against the criteria the upstream layers specified. The architecture's clarity at this layer depends on the upstream layers being legible — if upstream aesthetic is implicit or ambiguous, the curator's judgment criteria become less defensible. Strong upstream aesthetic specification produces stronger curation provenance.

The curator-override correction proved that curation_pattern follows judgment process, not proposal cardinality. Aesthetic-layering pressure on this layer is therefore: does the architecture record *what aesthetic criteria the curator applied* with enough specificity to be honest about the judgment? Currently `capture_reason` and `capture_notes` are the carriers; whether they need structuring (e.g., a `curator_aesthetic_criteria` field) is a watchpoint, not earned by current pressure.

## 8 // Inheritance and Override Behavior

This is the load-bearing question.

### Two candidate models

**Model A: Implicit-additive accumulation.** Each layer's aesthetic content (prose, references) is supplied to generation as input. Conflicts are resolved by the agent's interpretation, supported by prose discipline at the lower layers (e.g., a slot says "use the packet studio world but with a tighter crop"). No formal precedence; everything available is used.

This is approximately the current model in the SKU-driven Furniture v1 base.

**Model B: Layered precedence with explicit override.** Higher layers set bounds; lower layers add specificity. In a conflict, an explicit override must state which inherited carrier is being narrowed, varied, or suppressed. A possible authority order could be brand > mode > product-class > packet > slot, but current evidence has not earned that order.

This model is closer to how style-guide / brand-overlay systems typically work in deployment-context implementations.

### What the evidence says

Current evidence is consistent with Model A: packet-level studio-world reference REF-PKT-SKU-009-VISUAL-INVARIANT-002 was supplied alongside slot-level slot_prompt language; both carried into generation. No formal override.

But evidence is also thin on conflict scenarios. The collection-mode operational test had aesthetic alignment between packet and slots; the SKU-driven evidence packets had no inter-layer aesthetic conflict. The model has not been pressure-tested where layers would actually disagree.

### What the architecture can claim now

- Inheritance behavior is **implicit and additive** in current evidence.
- Override behavior is **unmodeled formally**; slot prompts can carry exclusion or substitution prose, but no architectural rule formally suppresses an inherited carrier.
- Conflict resolution is **delegated to agent interpretation**, supported by prose discipline.

### What the architecture cannot claim now

- That additive accumulation is sufficient for cross-base / cross-category / cross-brand pressure
- That layered precedence is unnecessary
- That conflict resolution by agent interpretation scales beyond the same-base same-category evidence available
- That brand-system aesthetic and mode/category aesthetic, currently unmodeled, would integrate cleanly into the additive model when added

### Where override authority lives

In current evidence, override authority lives implicitly with whoever authors the lower-layer content. A slot author can write slot_prompt language that supersedes packet creative_intent for that slot; a packet author can wire packet-level references that supersede mode defaults (where mode defaults exist).

The architecture does not currently distinguish between *authority to override* and *capability to override*. A slot's capability to override is unconstrained because the architecture does not enforce inheritance precedence; whether the slot author *should* override at that point is a content-discipline matter, not a structural one.

Whether override authority should be modeled (e.g., "only brand-level edits can suppress brand-level rules; packet-level edits cannot") is a governance question that intersects with the aesthetic model. Held as a watchpoint.

## 9 // Stable / Provisional / Not-Yet-Hardenable

### Stable

- Aesthetic and product-truth are distinct concerns that can share underlying data.
- Aesthetic pressure is visible across multiple conceptual layers; operational evidence currently carries it most concretely through product images, packet prose/reference carriers, slot prompts/lookups, and curation notes.
- The packet layer is currently over-loaded with aesthetic responsibility because higher-layer carriers do not exist.
- References are the primary high-bandwidth aesthetic carrier; prose carries lower-bandwidth aesthetic information at any layer.
- Curation does not author upstream aesthetic specification, though curated assets can become future references or precedents.

### Provisional

- Whether brand-system aesthetic should be a separate first-class entity, an overlay attached to existing entities, or remain implicit until operational pressure forces it.
- Whether mode/category aesthetic should be structured (mode-default carriers) or remain emergent from convention.
- Whether product/product-class aesthetic should live on the products entity or in a separate product_classes entity.
- Whether the architecture's inheritance/override model should remain implicit-additive (Model A) or move toward layered-precedence (Model B).
- Whether override authority needs first-class modeling.

### Not yet hardenable

- A specific schema for brand-system aesthetic carriers. No operational evidence; cross-base / cross-category / cross-brand pressure absent.
- A specific schema for mode-default aesthetic carriers. No operational evidence in marketing or campaign mode; SKU and same-category collection do not pressure this.
- A specific precedence rule for inheritance/override behavior. Conflict scenarios have not been operationally tested.
- A `curator_aesthetic_criteria` field or similar structuring of curation aesthetic. Not earned by current pressure.

## 10 // Exit Criterion // Is The Apex Definition-Layer Artifact Now Writable In One Pass?

**Answer: Partial, with the aesthetic blocker now sketched at layer-shape depth.**

After this aesthetic-layering modeling pass, the apex definition-layer artifact is now writable in one pass at SKU + same-category-collection scope, **with aesthetic layering carried as a layer-shape sketch** rather than a fully specified model. The apex artifact would carry:

- The matrix from bounded modeling pass v1 §1
- The five distinctions from vocabulary precision pass v1
- This pass's layer-shape sketch of where aesthetic lives, with inheritance/override behavior characterized as **implicit-additive in current evidence** and **layered-precedence as a candidate alternative not yet earned**

What still cannot be carried at depth in a one-pass apex artifact:

1. **Specific schema for brand-system, mode/category, or product-class aesthetic carriers.** This pass's sketch named what carriers might look like; it did not specify them. A specification would be premature without operational evidence at those layers.
2. **A precedence rule for inheritance and override.** Conflict scenarios have not been operationally tested. The apex artifact can name Model A vs Model B as candidates and characterize current evidence, but cannot settle the question.
3. **Marketing-mode and campaign-mode operational evidence.** Unchanged from vocabulary pass v1 — both modes are paper-probed only.
4. **Cross-base / cross-category / cross-brand pressure.** Unchanged from vocabulary pass v1.

The aesthetic blocker has moved from "deepest unresolved architectural problem, completely held" to "sketched at layer-shape depth, with inheritance/override behavior named as the next-level question." That is enough to unblock a narrow apex artifact (A1) that names aesthetic at layer-shape depth without claiming to have solved it.

### What ASK chooses between (the directional fork carried forward from vocabulary pass v1, refined here)

- **Option 1: Write the v1 apex definition-layer artifact now** at SKU + same-category-collection scope, with aesthetic layering carried at the layer-shape sketch depth this pass produced, and the three remaining limitations (specific aesthetic carriers, inheritance/override precedence, marketing/campaign + cross-base evidence) explicitly held as named limitations.
- **Option 2: Continue aesthetic refinement before apex.** Run a second aesthetic pass attempting to settle Model A vs Model B, or attempting to specify carriers for one or two layers (e.g., brand-system aesthetic carrier sketch, or mode-default carrier sketch). Defers apex further.
- **Option 3: Operationalize marketing/campaign/new-base pressure before apex.** Cross-base/cross-category/cross-brand and mode-aesthetic pressure both become available; the apex artifact then carries more.
- **Option 4: Sequenced combination.** Examples include: narrow apex now then cross-base pressure later; continued aesthetic refinement then apex; or cross-base pressure before apex.

This is for ASK directional input, not pre-decided.

## What This Pass Did NOT Do

- Did not author the apex definition-layer artifact.
- Did not specify a schema for brand-system, mode/category, or product-class aesthetic carriers; only sketched what carriers might look like.
- Did not settle Model A (implicit-additive) vs Model B (layered-precedence) for inheritance and override.
- Did not introduce any aesthetic content. The repo remains aesthetic-agnostic. The grounding note's prototype-aesthetic guidance does not appear in this artifact.
- Did not mutate any schema.
- Did not mutate Airtable.
- Did not open a new prototype chain.
- Did not rewrite [`docs/architecture.md`](architecture.md), [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md), [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md), or [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md).
- Did not edit the README, the index, or any worked-example artifact.
- Did not authorize any next path; the directional fork in §10 remains held for ASK input.
- Did not finalize the layer count (still approximate per vocabulary pass v1 §5), the universal-schema sub-element list, or the worked-example mode taxonomy.

## Anchor Documents

- [`docs/architecture.md`](architecture.md): three-layer architecture model and current ontology direction
- [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md): three-layer-vs-layered-operational reconciliation; matrix for where structure can live
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; named aesthetic layering as the deepest unresolved architectural problem and the next watchpoint
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): layered operational model
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): operational evidence for packet-level + slot-level aesthetic carriers; no inter-layer conflict surface in this test
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): operational evidence for asset_attachment carrier at the curation/governance layer
- [`docs/url-visual-reference-set-generation-findings-sku-driven-furniture-v1.md`](url-visual-reference-set-generation-findings-sku-driven-furniture-v1.md): URL visual-reference set evidence — packet-level reference carrier behavior
- [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](gate-2-image-bearing-reference-path-findings-pkt-sku-009.md): image-bearing reference path evidence — slot-level reference carrier behavior
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): v1 sweep closure plateau
