# IA Layered-Content Sketch // SKU-Driven Mode v1

## Posture

```text
on-paper IA content articulation
SKU-driven mode only
first of four mode sketches
not a final IA model
not an architecture rewrite
not a milestone
not an Airtable / schema / prototype task
self-superseding once the four mode sketches and cross-mode synthesis land
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md), Phase 1 of the redirection is on-paper IA layered-content work across the four worked-example modes. This sketch is the first such sketch, on the SKU-driven mode at PKT-SKU-007 / PKT-SKU-009 / PKT-SKU-010 operational depth.

The sketch does not re-derive the apex layer-shape; that lives in [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md). It populates the apex layer-shape with mode-specific content articulation, anchored against a concrete worked vertical slice.

## What This Sketch Does Not Do

- propose schema mutations
- resolve any of the apex Named Limitations (specific aesthetic-carrier schema; inheritance/override precedence; cross-base / marketing / campaign evidence)
- re-derive the layer-shape from the apex artifact
- attempt cross-mode synthesis (deferred to the eventual cross-mode synthesis sketch)
- cover collection / marketing / campaign mode (deferred to the three remaining mode sketches)
- close any open question; questions are surfaced for later cross-mode comparison

## Vertical Slice — PKT-SKU-009 + PKT-SKU-010

The slice walks the same SKU-driven mode flow on two packets that together cover the breadth of the mode's behavior:

- **PKT-SKU-009** — existing packet, heavy iteration history, cross-round authorship-bearing curation. Source of the implementation-vs-conceptual goal distinction, the fifth `curation_pattern` value, and the family-coherence-on-approved-set framing. ([`full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md))
- **PKT-SKU-010** — fresh packet, no iteration baggage, single-round generation, ratification-only curation. Source of the `asset_attachment` thin-bridge resolution and the simple-case convergence between within-round coherence and approved-set coherence. ([`full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md))

Together they prevent overfitting to either pattern. PKT-SKU-009 surfaces what the architecture must support when generation rounds disagree; PKT-SKU-010 shows what the simple case looks like when generation behaves.

The slice is walked layer-by-layer below. Each layer section names the concrete content carried at that layer in both packets, distinguishes what is structurally explicit from what is implicit or unmodeled, flags content that should not be promoted to schema doctrine yet, and notes how the layer constrains layers beneath it.

### Brand-System Layer

**Slice content.** No first-class carrier in either packet. The brand-system context for these worked examples is implicit in the worked-example naming convention and in the externally supplied prototype-aesthetic scaffolding; it is not represented as a first-class repo / prototype carrier.

**Explicit.** Nothing.

**Implicit / unmodeled.** Brand identity, brand-level aesthetic posture, brand-level governance authority, brand-level approval boundaries — all carried by setup decisions outside the schema. A returning operator infers brand-system context from the worked-example naming convention and externally supplied prototype-aesthetic context, not from any schema content.

**Not-yet-doctrine.** Whether brand-system content should become first-class entities, attribute overlays, or remain implicit is a Named Limitation in the apex (#1 — specific schema for brand-system aesthetic carriers). SKU-driven mode does not pressure this layer enough on its own to settle the question. The layer is named so the cross-mode synthesis has something to compare against; not filled.

**Inheritance behavior.** Currently nil — there is nothing structural at this layer to inherit from. Lower-layer content is authored without reference to brand-system carriers, even when the authoring decision is plausibly brand-shaped.

### Category / Product-Class Layer

**Slice content.** Both packets sit in the furniture category and the chair product-class. Category presence is signaled by the worked-example name (sku-driven-furniture-v1) and by the slot-role pattern (HERO / PROFILE / DETAIL) which is appropriate for furniture and would differ for, say, apparel or food.

**Explicit.** Nothing first-class. Category is signaled-only.

**Implicit / unmodeled.** The category-shaped expectations — what kinds of slot roles are typical, what kinds of fidelity anchors are typical, what typical product-class aesthetic burdens look like (chair-as-furniture vs chair-as-art-object vs chair-as-functional-prop) — live in the slot-role conventions and the packet-level reference content rather than as a layer carrier.

**Not-yet-doctrine.** Whether category becomes first-class as an entity, an attribute overlay on packets, or a per-mode convention layer remains held under Named Limitation #1. The SKU-driven slice shows category as a useful organizing notion, not as a structurally active carrier.

**Inheritance behavior.** Implicit. The category context shapes what a packet operator considers reasonable input at packet and slot layers, but the architecture does not enforce category-bound constraints. PKT-SKU-009 and PKT-SKU-010 inherit furniture-category conventions through operator practice, not through structure.

### Packet Layer

**Slice content.** The strongest current carrier in SKU-driven mode. Both packets carry:

- `business_intent` (text) — what the asset is meant to achieve
- `creative_intent` (text) — how that purpose is expressed
- `required_output_set` — the slot-role expectation
- `bounded_creative_discretion` (text) — scoped freedom shaped by intent and bounded by other constraints
- `products` (relation) — links to the SKU(s) the packet covers; in SKU-driven mode this is 1:1 with the packet
- packet-level visual references — `REF-PKT-SKU-009-VISUAL-INVARIANT-002` (REF-002, studio-world binding) is surfaced into both packets via packet-reference linkage; PKT-SKU-010 explicitly reused REF-002 as a single-variable test against PKT-SKU-009

PKT-SKU-010 was mirrored from PKT-SKU-009's structural fields and reused REF-002 directly, demonstrating that the packet's content shape is portable across SKUs in the same mode.

**Explicit.** business_intent / creative_intent / bounded_creative_discretion text fields; packet-level reference linkages; products relation. All schema-modeled.

**Implicit / unmodeled.** The internal substructure of intent (business vs creative ordering); the substructure of constraints (hard requirements vs bounded discretion vs exclusion vs reference-as-constraint); the operator's reasoning that links a chosen reference to a chosen creative_intent. These are knowable from a careful read of the text fields but not structurally separated.

**Not-yet-doctrine.** Per the apex artifact, the packet layer is currently over-loaded with aesthetic responsibility because higher-layer carriers (brand-system, category) do not exist. Splitting packet aesthetic into separate sub-fields, separate entities, or separate overlays is not earned by SKU-driven mode evidence alone; the over-load is real but the right relief shape remains underdetermined. Held.

**Inheritance behavior.** Packet content sets the bounds within which slot content narrows. References surface from packet to slot via lookup fields (`packet_reference_image_lookup`). Constraints written as packet-level prose are inherited by all slots of the packet without explicit per-slot restatement. Cross-packet inheritance is not modeled — PKT-SKU-009 and PKT-SKU-010 share REF-002 by deliberate operator choice, not by inheritance structure.

### Slot Layer

**Slice content.** Both packets have three slots: HERO, PROFILE, DETAIL. Each slot carries:

- `slot_role` (HERO / PROFILE / DETAIL) — the role-specific framing obligation
- `slot_prompt` (text) — role-specific aesthetic and compositional language
- `slot_status` (lifecycle value)
- `product_image_lookup_lookup` — surfaces the SKU's product_image into the slot
- `packet_reference_image_lookup` — surfaces packet references into the slot

PKT-SKU-010 mirrored PKT-SKU-009's slot_prompts directly. PKT-SKU-010's PROFILE slot achieved a clean 90° side profile that PKT-SKU-009 never produced across multiple iteration rounds, suggesting prompt-drift across iteration history can compromise slot fidelity in ways the slot layer itself does not protect against.

**Explicit.** slot_role enum; slot_prompt text; slot_status lifecycle; lookup-based reference surfacing.

**Implicit / unmodeled.** The role-specific aesthetic burden distinct from the prompt text (HERO carries different framing burden than DETAIL, but the schema does not encode role-specific aesthetic expectations beyond the role label). Slot-specific reference linkage (the slot inherits packet references via lookup but cannot bind a slot-only reference). The interaction between slot prompt and packet reference (which one wins when they conflict) is delegated to agent interpretation, per the implicit-additive Model A in the apex.

**Not-yet-doctrine.** Whether slot_role should become a richer first-class entity (with role-typical aesthetic constraints, role-typical fidelity anchors, role-typical exclusion patterns) is not earned. The current slot_role enum + slot_prompt text combination handles SKU-driven mode at evidence depth without breaking. Holding.

**Inheritance behavior.** Slot content narrows packet bounds with role-specific framing. Slot-prompt text is the operator's primary carrier for role-specific narrowing. Lookups carry packet-level content (product_image, packet references) into the slot's input set. The slot does not currently override packet-level content; it adds.

### Candidate Generation Layer

**Slice content.** Transient. Each generation event produces N candidates per slot per round; candidates are stored as Airtable attachments on the slot. PKT-SKU-009 accumulated multiple rounds of candidates across iteration history; PKT-SKU-010 has a single round with one candidate per slot. The May 3 generation pass produced backgrounds warmer than REF-002 across both packets, indicating generation-side conditions can drift independently of any single packet's setup.

**Explicit.** Attachments on slots. Generation invocation is human-side (Airtable UI), per the tooling limitation noted in the Path A findings — not an architectural feature.

**Implicit / unmodeled.** No first-class candidate entity. No round-level identity beyond the timestamp on the attachment. No structural distinction between rounds. Generation provenance (model, prompt-version, reference-version) is not carried at the candidate layer.

**Not-yet-doctrine.** Whether candidates should be first-class entities (with round identity, generation provenance, round-level coherence claims) is not earned. The current attachment-on-slot pattern carries SKU-driven mode at evidence depth. Generation-tuning concerns (prompt-input hierarchy stability, reference-binding consistency, model + seed determinism) are flagged in the Path A / Path B findings as separate future work, not as candidate-layer schema needs.

**Inheritance behavior.** Candidates inherit slot inputs (slot_prompt, surfaced packet references, surfaced product_image) by being generated under those conditions. The candidate carries no schema-explicit inheritance trace; the trace is implicit in the generation invocation context.

### Curation Seam

**Slice content.** Both packets passed through the curation seam, with different patterns:

- **PKT-SKU-009 (Path A):** cross-round authorship-bearing curation. Three rows created with `curation_pattern = human-cross-round-authorship-bearing-curation`. Curator field records ASK as authorship-bearing and the agent's vision-based fresh-bias proposal as the rejected baseline. Source attachments span three rounds (May 1 03:11, May 3 19:50). Capture provenance fully populated.
- **PKT-SKU-010 (Path B):** ratification-only curation. Three rows created with `curation_pattern = agent-vision-proposed-human-ratified`. Single round, single candidate per slot, family coherence achieved by within-round identity. Curator field records the agent's vision-based proposal and ASK's ratification.

Five `curation_pattern` values are now visible in the SKU-driven mode dataset:

- `algorithmic-curation`
- `agent-proposed-human-ratified`
- `batch-output-no-curator-selection`
- `agent-vision-proposed-human-ratified`
- `human-cross-round-authorship-bearing-curation`

**Explicit.** Five-axis provenance: `capture_reason`, `capture_notes`, `source_attachment_id`, `captured_at`; plus `curator` and `curation_pattern`. All schema-modeled.

**Implicit / unmodeled.** The relationship between the curator's actual judgment process and the cardinality of available candidates is partially captured by `curation_pattern` but not enforceable. The Path A finding established that `curation_pattern` is determined by the curator's judgment process, not by proposal cardinality — single-candidate-per-slot can produce authorship-bearing curation if the curator weighs against alternatives independently. This is a doctrine point lodged in findings notes, not in schema constraint.

**Not-yet-doctrine.** Whether `curation_pattern` should be enum-promoted (currently text). Whether the curation event should become a first-class entity (`curation_events` table) rather than fields on `generated_assets`. Both held — the value space is heterogeneous across three structural classes (authorship-bearing, confirmation-bearing, no-curation-event), and SKU-driven evidence has not pressured the field-vs-entity question to a resolution.

**Inheritance behavior.** Curation does not author upstream content. It judges candidates against upstream content (slot_prompt, surfaced packet references, surfaced product_image) and elevates one into governed asset identity. Curated assets can later become references for downstream packets; that is a separate move not exercised in this slice.

The seam is the architecture's singular runtime creative-discretionary act per the foundational premise. Generation invocation is mechanical; setup discretion (packet authoring, slot prompt authoring) is upstream and authorship-bearing in its own way but not the governed-capture event.

### Governed Asset Layer

**Slice content.** Both packets produced governed assets carrying the asset itself, post the `asset_attachment` schema move from Path B:

- **PKT-SKU-009 (Path A):** three rows initially as `candidate` (parallel-ratified pattern, since prior governed_output rows existed for these slots from earlier rounds). Path A HERO row populated with `asset_attachment` as the schema-move validation test. Going forward, governed assets carry `asset_attachment`.
- **PKT-SKU-010 (Path B):** three rows promoted directly to `governed_output` on creation, with `asset_attachment` populated from the start. No competing prior rows; promotion-on-creation worked cleanly.

**Explicit.** `asset_attachment` (multipleAttachments, copy-write) — the asset itself; `governed_output_status`, `governed_output_flag`, all five curation provenance axes, `curator`. All schema-modeled.

**Implicit / unmodeled.** The relationship between governed-asset rows and downstream consumption surfaces (catalog page, brand portfolio, governance review board) is conceptual only — the architecture does not encode what consumes the governed set or what the consumer's coherence criterion looks like. Family coherence on the approved set is a load-bearing architectural criterion (per Path A finding 2) but is not validated in schema; it is the curator's ambient pressure.

**Not-yet-doctrine.** Reuse / derivative rules — when a governed asset becomes a reference for a later packet, what governance applies to the derivative — are not modeled. Decision ownership and approval / override boundaries are partially carried by curation provenance but not by formal authority. Both held as adjacent not-yet-hardenable concerns from the apex.

**Inheritance behavior.** Governed assets are downstream-terminal in the current architecture: they are the durable output. Whether they then become inputs to later packets (as references) is a separate operational move, not a structural inheritance. The slice does not exercise that move.

## SKU-Driven Mode Characteristics That Emerge from the Slice

Walking the slice surfaces several characteristics that appear to be SKU-driven-specific (vs structural to the architecture across modes):

**The SKU is the anchor.** Packet-to-SKU is 1:1 in PKT-SKU-009 and PKT-SKU-010. The packet's `products` relation points to a single SKU; the slot's `product_image_lookup_lookup` surfaces that SKU's image as the load-bearing fidelity carrier. Other modes will have different anchor relationships — collection mode's 1:N slot-product strain is the cleanest contrast already operational; marketing and campaign modes will have looser anchor relationships with conceptual or message-driven primitives layered above the SKU.

**Per-product `product_image` carries fidelity.** The SKU's image attachment is the architecture's primary fidelity strategy in SKU-driven mode. Prose alone is fallback per the foundational premise; SKU-driven mode honors this by making the per-SKU image structurally surfaced into every slot.

**Slot roles are role-typical for the category.** HERO / PROFILE / DETAIL is appropriate for furniture; CONTACT-SHEET, HERO_GROUP, HERO_GROUP_ALT, DETAIL_ADJACENCY appear in earlier work as same-category role expansions. The role pattern is signaled by the role label and shaped by slot_prompt text; not encoded as role-typical aesthetic constraint at slot-role level.

**No conceptual overlay.** SKU-driven mode does not carry a campaign concept, a message, a collection-grouping aesthetic, or a brand-narrative driver. Generation runs from product_truth + packet-level reference + slot-prompt text without an additional overlay layer. Other modes will introduce overlays at different layers; SKU-driven mode is the cleanest case for understanding the layered IA without overlay pressure.

**The implementation-vs-conceptual goal distinction is fully in scope.** Both packets exercise the same architectural criterion (family coherence on the approved set) under different conditions. PKT-SKU-009 demonstrates the criterion when implementation falls short; PKT-SKU-010 demonstrates the criterion when implementation succeeds. The criterion is mode-agnostic but its operational shape in SKU-driven mode is anchored by the per-SKU image and the role-pattern slot-set.

## Open Questions Surfaced for Cross-Mode Comparison

These questions arise specifically from articulating the SKU-driven mode IA content and become more pointed when compared against the other three modes once they are sketched.

1. **What replaces the per-SKU `product_image` as fidelity carrier when the mode is not SKU-anchored?** Collection mode's already-operational evidence (PKT-COLL-001) points at one direction (constituent products with their own product_images plus a composite-anchor question). Marketing / campaign modes are not yet operationalized; how their fidelity strategy looks remains paper-only.

2. **Where does conceptual overlay content live when overlays exist?** SKU-driven mode has no overlay. Marketing mode introduces messages; campaign mode introduces campaign concepts. The apex Named Limitation #1 (specific aesthetic-carrier schema) and the redirection-note flag on campaign-concept selection (whether it is upstream setup, a different runtime creative-discretionary act, or a premise that fragments) both pressure this.

3. **Does the packet layer's current over-load on aesthetic specification get worse, lighter, or different in non-SKU-driven modes?** SKU-driven mode shows the over-load is real but tractable; whether other modes amplify it (because they carry overlays) or relieve it (because higher-layer carriers earn their place) is open.

4. **Does slot-specific reference linkage become necessary when slot roles diverge more sharply across modes?** SKU-driven mode's HERO / PROFILE / DETAIL pattern is internally similar; campaign mode's editorial slot roles may diverge enough that lookup-based reference surfacing from a single packet-level reference set becomes insufficient.

5. **How does cross-round authorship-bearing curation operate when the rounds are not generating against the same anchor?** PKT-SKU-009's cross-round selection depends on each round being a candidate-set against the same SKU + REF-002 + slot prompts. If a non-SKU-anchored mode varies its anchor across iterations (campaign mode varying campaign concept; marketing mode varying message), "cross-round" may have a different shape.

6. **Does the curation pattern value space exhaust the modes that are not yet operationalized?** The five values cover SKU + same-category collection observed patterns. Marketing, campaign, and cross-base modes are paper-only; new patterns may need to be added as they operationalize.

7. **What happens to the `asset_attachment` self-contained governed-asset model when downstream consumption becomes mode-specific?** The current model treats governed assets as durable terminal output; reuse / derivative rules are unmodeled. Modes that produce governed assets intended for cross-pollination across packets (collection composites; campaign-derivative materials) may pressure this.

These questions feed forward into the collection-mode, marketing-mode, and campaign-mode sketches, and ultimately into the cross-mode synthesis sketch.

## Self-Superseding Clause

This sketch is a Phase 1 artifact. It should be superseded by:

- the eventual cross-mode synthesis sketch once the four mode sketches exist and the comparison surfaces a consolidated cross-mode IA content model
- whatever later milestone-8 synthesis absorbs the redirection alongside the other Phase 1 / Phase 2 outputs
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact and the Phase 1 sketches into a single current-architecture document

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, or the operational findings notes. Those remain authoritative for their subject matter; this sketch reads them at SKU-driven mode column depth and articulates content there.

## Anchor Documents

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact at SKU + same-category-collection scope
- [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md): three-layer-vs-layered-operational reconciliation; matrix
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; Model A vs Model B
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): layered operational model and curation event as first-class governance act

### Worked vertical slice — operational evidence

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): PKT-SKU-009 cross-round authorship-bearing curation; implementation-vs-conceptual goal distinction; fifth `curation_pattern` value
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): PKT-SKU-010 ratification-only curation; `asset_attachment` thin-bridge resolution; promotion-on-creation
- [`docs/full-flow-evidence-synthesis-pkt-sku-009.md`](full-flow-evidence-synthesis-pkt-sku-009.md): Path C synthesis preceding Paths A and B
- [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](asset-attachment-backfill-findings-sku-driven-furniture-v1.md): backfill outcome; thin-bridge limitation context
- [`docs/asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md`](asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md): family-coherence and reuse pressure surface
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): curator field move
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): curation_pattern field move

### Phase 1 framing

- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that places this sketch as the first of four Phase 1 mode sketches

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau this sketch reads against
