# IA Layered-Content Sketch // Collection / Merchandising Mode v1

## Posture

```text
on-paper IA content articulation
collection / merchandising mode only
second of four mode sketches
not a final IA model
not an architecture rewrite
not a milestone
not an Airtable / schema / prototype task
self-superseding once the four mode sketches and cross-mode synthesis land
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md), Phase 1 of the redirection is on-paper IA layered-content work across the four worked-example modes. This sketch is the second such sketch, on the collection / merchandising mode at PKT-COLL-001 operational depth.

The sketch does not re-derive the apex layer-shape; that lives in [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md). It populates the apex layer-shape with mode-specific content articulation, anchored against a concrete worked vertical slice and contrasted explicitly against the SKU-driven mode sketch ([`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md)).

## What This Sketch Does Not Do

- propose schema mutations
- resolve any of the apex Named Limitations (specific aesthetic-carrier schema; inheritance / override precedence; cross-base / marketing / campaign evidence)
- re-derive the layer-shape from the apex artifact
- attempt cross-mode synthesis (deferred to the eventual cross-mode synthesis sketch)
- cover marketing / campaign mode (deferred to the two remaining mode sketches)
- reopen the collection-mode operational test or modify any of its outputs
- close any open question; questions are surfaced for later cross-mode comparison

## Vertical Slice — PKT-COLL-001 (with PKT-SKU-009 / PKT-SKU-010 as Contrast)

The slice walks the collection / merchandising mode flow on the single operational packet that carries the mode end-to-end:

- **PKT-COLL-001** — collection / merchandising packet for a calm living-room grouping; four constituents (SKU-CHAIR-003 sculpted upholstered dining chair, SKU-TABLE-001 walnut side table, SKU-LAMP-001 floor lamp, SKU-BENCH-001 low storage bench); three slots (HERO_GROUP, HERO_GROUP_ALT, DETAIL_ADJACENCY). Run inside the existing SKU-driven Furniture v1 base as a deliberate mode-isolation test. Source of the operational deflation of the collection-mode paper-strain hypothesis: paper said the 1:N slot-product cardinality strain would push toward composite-anchor schema mutation; operational evidence showed it carries cleanly via content discipline. ([`collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md), [`collection-mode-operational-test-setup-v1.md`](collection-mode-operational-test-setup-v1.md))

The slice is walked layer-by-layer below. Where collection / merchandising mode behaves differently from SKU-driven mode, the contrast is named explicitly; the SKU-driven sketch holds the baseline interpretation.

### Brand-System Layer

**Slice content.** No first-class carrier. Same posture as the SKU-driven slice — the brand-system context is implicit in the worked-example naming convention and in the externally supplied prototype-aesthetic scaffolding; it is not represented as a first-class repo / prototype carrier.

**Explicit.** Nothing.

**Implicit / unmodeled.** Brand-level identity, brand-level aesthetic posture, brand-level governance authority — same as the SKU-driven slice. PKT-COLL-001 inherited the calm-living-room aesthetic and the same studio-world reference (REF-002) that PKT-SKU-009 / 010 use, but this inheritance happens through operator decisions, not through structural carriers.

**Not-yet-doctrine.** Same Named Limitation #1 as the SKU-driven slice. Collection mode does not pressure brand-system carriers any more sharply than SKU-driven mode does on its own.

**Inheritance behavior.** Currently nil. The deliberate reuse of REF-002 across SKU-driven and collection packets is the strongest signal that brand-system / studio-world reference content can carry across modes without structural enforcement, but the architecture treats this as operator practice, not as inheritance.

### Category / Product-Class Layer

**Slice content.** Furniture category (same as the SKU-driven slice). Product-class is heterogeneous within the packet — chair + table + lamp + bench — rather than single-class as in PKT-SKU-009 / 010.

**Explicit.** Nothing first-class. Category is signaled through the worked-example naming convention; product-class is signaled per-SKU through `material_notes` / `finish_notes` / `identifying_details`.

**Implicit / unmodeled.** The expectation that a collection groups multiple product-classes under one aesthetic logic. Calm-living-room grouping logic is encoded in `bounded_creative_discretion` and `creative_intent` text; it is not encoded as category-level convention or as a first-class grouping-aesthetic carrier.

**Not-yet-doctrine.** Whether per-mode category conventions (collection mode's typical multi-class grouping vs SKU-driven mode's typical single-class focus) should become first-class is held under Named Limitation #1. The collection slice surfaces a sharper version of the question (because heterogeneity is real here) but does not earn the carrier.

**Inheritance behavior.** Implicit, same as SKU-driven slice. Category context shapes operator practice, not structural enforcement.

### Collection / Grouping Layer

This layer is **structurally absent in SKU-driven mode** (which has no grouping concept above the single SKU). It is the load-bearing layer that distinguishes collection / merchandising mode from the SKU-driven baseline.

**Slice content.** PKT-COLL-001 carries the grouping content at the packet layer rather than as a separate structural layer:

- four-constituent set defined by `products` relation (1:N rather than the 1:1 SKU-driven pattern)
- grouping intent (calm living-room four-item merchandising arrangement) carried as packet `business_intent` / `creative_intent` text
- relational rules (preserve adjacency; preserve grouped coherence; allow gentle positional variation) carried as packet `bounded_creative_discretion` text
- subset selection within the grouping (DETAIL_ADJACENCY = chair + side table only) carried as slot-level prose in `slot_prompt`
- exclusion logic (DETAIL_ADJACENCY excludes lamp and bench from frame) carried as slot-level prose

**Explicit.** The packet's `products` relation is the only structurally explicit grouping carrier — it enumerates the constituents. Everything else (grouping logic, relational rules, subset selection, exclusion) is prose.

**Implicit / unmodeled.** The grouping archetype itself (calm-living-room vs gallery vs styled-flat-lay vs pairing); the relational structure between constituents (which is subject vs peripheral; which pairs adjacently with which); the grouping-aesthetic claims that distinguish this collection from another. All carried by packet and slot prose; none as first-class carriers.

**Not-yet-doctrine.** The cross-mode probe for collection / merchandising ([`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md)) predicted this layer would push hardest toward a composite-anchor schema mutation — a structured representation of grouping archetype + relational rules + constituent roles. The PKT-COLL-001 operational test deflated that prediction: prose enumeration of constituents in `slot_prompt`, prose-named subject / peripheral roles, and prose exclusion language all carried operationally. The composite-anchor mutation is *less* earned by operational pressure, not more.

What should NOT yet be promoted to schema doctrine:
- a `grouping_archetype` enum or entity
- a `constituent_roles` structured field on slots
- a `relational_rules` first-class entity
- per-constituent `inclusion_role` or `exclusion_role` slot fields

These were the candidate mutations the paper probe surfaced. The operational test showed each is deferrable to prose for the patterns the slice covers.

**Inheritance behavior.** Grouping intent at the packet sets the bounds within which slot content narrows. The `products` relation flows from packet to slot via lookup. Constituent details flow from per-SKU `product_image` / `material_notes` / etc. fields, surfaced to the slot via `product_image_lookup_lookup` (when product_images exist) or via verbatim prose repetition in `slot_prompt` (when they do not — see Slot Layer). Subset selection and exclusion are slot-local; they do not inherit from packet.

### Packet Layer

**Slice content.** Same general shape as SKU-driven mode, with two structural differences and one carrier shift:

- `business_intent` (text), `creative_intent` (text), `bounded_creative_discretion` (text), `required_output_set` — all populated and shape-mirrored against PKT-SKU-009 / 010 structure
- `products` relation — **1:N rather than 1:1** (the cardinality difference). Four constituents linked: SKU-CHAIR-003, SKU-TABLE-001, SKU-LAMP-001, SKU-BENCH-001
- packet-level visual reference — REF-PKT-SKU-009-VISUAL-INVARIANT-002 (REF-002), the same studio-world reference used in PKT-SKU-009 and PKT-SKU-010. Wired in mid-test by deliberate operator decision to isolate the mode variable from the reference-quality variable
- 4 `constraint_keys` linked (CR-COLL-001 through CR-COLL-004); 4 seam runs; 1 review gate. SKU-driven packets exercise the same shape but with different content

**Explicit.** Same fields as SKU-driven mode, with `products` carrying multiple links rather than one. All schema-modeled.

**Implicit / unmodeled.** Same as the SKU-driven slice — the substructure of intent, the substructure of constraints, the operator's reasoning that links references to creative intent. The collection slice adds: the grouping intent's relationship to constituent multiplicity is implicit in the prose framing of `business_intent` / `creative_intent`, not structured.

**Not-yet-doctrine.** The packet layer's over-load on aesthetic responsibility (per the apex artifact) is sharper here than in SKU-driven mode because the packet now also carries grouping logic on top of the per-SKU aesthetic burden. Whether this calls for splitting the packet into separate aesthetic / grouping / intent carriers is *not* earned by collection-mode operational evidence — the over-load is real but tractable. Held.

**Inheritance behavior.** Packet content sets the bounds within which slot content narrows. The `products` relation flows to slot lookups; the packet-level reference flows to `packet_reference_image_lookup`. The cross-packet reuse of REF-002 across SKU-driven and collection packets demonstrates that packet-level references are not packet-bound by inheritance — they are independently linked, and a single reference asset can serve multiple packets.

### Slot Layer

**Slice content.** Three slots on PKT-COLL-001, each carrying the mode-specific role pattern:

- **HERO_GROUP** — all four constituents in one composition; `slot_prompt` enumerates each constituent with its identifying details inline; framing requirement for all four to be fully within frame
- **HERO_GROUP_ALT** — same four constituents from a different angle; `slot_prompt` reframed mid-test from "same arrangement different angle" (which the tooling cannot honor) to "second view of the same grouping concept with a different camera position" (which it can)
- **DETAIL_ADJACENCY** — two-item subject pairing (chair + side table); `slot_prompt` explicitly excludes the lamp and bench from frame

Each slot's `slot_prompt` carries the load-bearing mode-specific content:
- **prose enumeration of all four constituents** (the 1:N slot-product cardinality workaround)
- **per-constituent identifying-detail prose** (verbatim across slots when product_image is absent — see below)
- **subject / peripheral role labeling** (DETAIL_ADJACENCY's chair + table as subject vs lamp + bench as excluded)
- **exclusion-by-name** (DETAIL_ADJACENCY)

Of the four constituents:
- SKU-CHAIR-003 has a `product_image` attachment ✓
- SKU-TABLE-001, SKU-LAMP-001, SKU-BENCH-001 do NOT have `product_image` attachments ✗

Operational evidence: the agent rendered the table, lamp, and bench credibly using `material_notes` / `finish_notes` / `identifying_details` text fields surfaced via `slot_prompt` prose alone, with no per-constituent visual reference. **Prose-only fidelity carried for the calm-living-room composition** — an incidental capability, not the operational target.

**Explicit.** Same as SKU-driven mode — `slot_role` enum (HERO_GROUP / HERO_GROUP_ALT / DETAIL_ADJACENCY rather than HERO / PROFILE / DETAIL); `slot_prompt` text; `slot_status` lifecycle; lookup-based reference surfacing. All schema-modeled.

**Implicit / unmodeled.** The mode-specific role-typical aesthetic burden (HERO_GROUP carries different framing burden than DETAIL_ADJACENCY, distinct from the SKU-driven HERO / PROFILE / DETAIL burden) is signaled by role label and shaped by `slot_prompt` text; not encoded as role-typical aesthetic constraint. The relationship between slot-role and the grouping layer (HERO_GROUP fronts all constituents; DETAIL_ADJACENCY narrows to a subset) is implicit in the slot-role naming convention.

The **cross-slot consistency requirement for prose-only constituents** is implicit in operator practice rather than structurally enforced: when a constituent has no `product_image`, every slot that includes it must repeat the same prose verbatim, because the agent has no memory across slot generations and abbreviated prose gives more interpretive latitude (per finding 5 of the operational test).

**Not-yet-doctrine.** A richer first-class `slot_role` entity with role-typical aesthetic constraints, role-typical framing requirements, role-typical inclusion / exclusion patterns is not earned. The current `slot_role` enum + `slot_prompt` text combination handled collection-mode pressure operationally without breaking. Slot-specific reference linkage (binding a per-constituent reference to a slot directly, rather than inheriting via packet lookup) is not earned for collection mode at evidence depth — the prose workaround held.

**Inheritance behavior.** Slot content narrows packet bounds with role-specific framing and subset / exclusion logic. Lookups carry packet-level content into the slot's input set. The slot's prose carries grouping-layer content (constituent enumeration, subject / peripheral roles, exclusion) that has no structural carrier above the slot. Slots do not currently override packet-level content; they add and they narrow.

### Candidate Generation Layer

**Slice content.** Transient, same structural posture as SKU-driven mode. PKT-COLL-001 accumulated multiple rounds across all three slots during the operational test (HERO_GROUP went to round 3 due to bench-cropping; HERO_GROUP_ALT and DETAIL_ADJACENCY landed at round 2). Generation invocation was human-side (Airtable UI), per the same tooling limitation noted in the SKU-driven slice.

A mode-specific generation-tooling observation: **text-to-image generation does not reliably honor "all items fully in frame" instructions when one constituent's natural proportions are dramatically different from the others.** HERO_GROUP's bench cropping persisted across three rounds despite progressively stronger framing language, including an explicit FRAMING REQUIREMENT block enumerating resolution options. This is a generation-tooling reality, not a schema or candidate-layer issue.

A second mode-specific observation: **arrangement preservation across independent generations is not tractable.** HERO_GROUP_ALT's original prompt asked for the "same arrangement viewed from a different angle"; the tool produced a fresh composition with the same constituents. The reframe was to be honest about what the tooling can do — same grouping concept with different camera position — and the tool then produced a coherent second view sharing studio world, lighting, and tonal register with HERO_GROUP, even though the spatial arrangement is independently generated.

**Explicit.** Attachments on slots, same as SKU-driven mode.

**Implicit / unmodeled.** Same as SKU-driven slice — no first-class candidate entity, no round identity beyond the timestamp, no schema-explicit generation provenance. Mode-specific generation-tooling limitations (constituent cropping; arrangement non-preservation) are recorded in operational findings, not as candidate-layer schema constraints.

**Not-yet-doctrine.** Same as SKU-driven slice. Collection mode does not pressure the candidate layer toward first-class entity carriers any more sharply than SKU-driven mode does.

**Inheritance behavior.** Same as SKU-driven slice — candidates inherit slot inputs by being generated under those conditions.

### Curation Seam

**Slice content.** PKT-COLL-001 produced three governed-asset rows after a curator override correction. The corrected final state:

- **HERO_GROUP** (`recMhoTi2kccfmwPB`): round-1 candidate (chair fully lit, slight bench-cropping accepted as documented generation-tooling limitation)
- **HERO_GROUP_ALT** (`recKeKpAYcjF3a8rb`): round-2 candidate (clean composition; all four constituents fully visible)
- **DETAIL_ADJACENCY** (`recM5mJ9E6GvBZiFY`): round-1 candidate (chair fully lit, lamp at far left as soft contextual presence accepted as tradeoff for chair-lighting priority)

All three rows: `curation_pattern = human-cross-round-authorship-bearing-curation`, `curator = ASK (cross-round authorship-bearing); Claude (vision-based proposing baseline)`, full five-axis provenance, `asset_attachment` populated as copy-write attachments.

**The curation_pattern was corrected from the executor's initial framing.** The executor (Claude) initially recorded `agent-proposed-human-ratified` based on the proposal cardinality (one candidate per slot per round). ASK overrode 2 of 3 picks based on independent judgment criteria (lead-product chair fully lit, prioritized over the executor's family-coherence + framing-cleanliness weighting). The override demonstrated that **`curation_pattern` is determined by the curator's actual judgment process across the full candidate space, regardless of the executor's framing of the candidate set.** Single-candidate-per-slot proposals can still produce authorship-bearing curation if the curator weighs the candidate against alternative rounds independently.

This finding is mode-agnostic in principle — Path A on PKT-SKU-009 had already established the same pattern in the SKU-driven mode — but the collection-mode operational test sharpened it by surfacing the executor's mis-framing as a procedural finding alongside the substantive curation correction.

**Explicit.** Same five-axis provenance + `curator` + `curation_pattern` carriers as SKU-driven mode.

**Implicit / unmodeled.** Same enforcement gap as SKU-driven slice — the relationship between proposal cardinality and curation pattern is not enforced; the doctrine (judgment process determines pattern) lives in findings notes, not schema.

A mode-specific gap: collection mode introduces **curation criteria with cross-axis tradeoffs** (lead-product lighting vs family coherence vs framing cleanliness vs exclusion fidelity). The five-axis provenance fields can record the criteria a curator weighed via `capture_reason` / `capture_notes` text, but the cross-axis tradeoff structure is not carried as schema content.

**Not-yet-doctrine.** Whether collection-mode curation needs a richer `selection_axis` enum (per the cross-mode probe's finding 4) is not earned. The text-field carriers handled the cross-axis tradeoffs operationally. Holding.

**Inheritance behavior.** Curation does not author upstream content. Same as SKU-driven slice.

### Governed Asset Layer

**Slice content.** Three governed-asset rows on PKT-COLL-001, all carrying `asset_attachment` (copy-write), all promoted to `governed_output` status, all with full five-axis provenance. Mirrors the Path B pattern from PKT-SKU-010 exactly — the architecture's full-flow shape carried mode-independently from SKU-driven into collection / merchandising at the operational level, not just on paper.

The 3 historical placeholder `generated_assets` rows on PKT-COLL-001 (created 2026-04-22, predating the curation-event provenance schema) remain untouched per artifact discipline. PKT-COLL-001's `governed_output_count` is therefore 6 — 3 historical placeholders + 3 new operational-test outputs. The historical placeholders are an artifact-discipline artifact, not a content-articulation concern.

**Explicit.** Same as SKU-driven mode — `asset_attachment`, `governed_output_status`, `governed_output_flag`, all five curation provenance axes, `curator`. All schema-modeled. The mode-independence claim is concretely confirmed at this layer.

**Implicit / unmodeled.** Same as SKU-driven slice — the relationship between governed-asset rows and downstream consumption surfaces is conceptual only. **Family coherence on the approved set holds across the three slots** (per finding 9 of the operational test): all three governed assets share the same studio world, the same chair fidelity, the same tonal register, the same lighting direction. The set reads as one curated capsule. This was achievable via slot_prompt-anchored consistency, even without arrangement preservation.

**Not-yet-doctrine.** Same reuse / derivative concerns as SKU-driven slice — when a collection-mode governed asset becomes a reference for a downstream packet (e.g., a marketing-mode packet lifting the hero composition), what governance applies to the derivative is not modeled. Held.

**Inheritance behavior.** Same downstream-terminal posture as SKU-driven slice. The slice does not exercise cross-packet reuse of governed assets.

## Collection / Merchandising Mode Characteristics That Emerge from the Slice

Walking the slice surfaces several characteristics that distinguish collection / merchandising mode from the SKU-driven baseline:

**1:N slot-product cardinality is the structural signature.** PKT-COLL-001's `products` relation links four SKUs rather than one. The slot's `product_image_lookup_lookup` surfaces multiple images (where present) or none (where absent); the slot_prompt prose carries enumeration, role, and exclusion. The cardinality difference is the cleanest contrast against the SKU-driven 1:1 anchor.

**Prose enumeration carries grouping content cleanly.** The cross-mode probe predicted this would strain. The operational test deflated the prediction. Prose enumeration in `slot_prompt` carried 1:N constituents, role assignments (subject vs peripheral), and exclusion logic without structural representation. The composite-anchor schema mutation is *less* earned by operational pressure now than it was after the paper probe.

**Prose-only constituents (without product_image) are renderable.** Three of four PKT-COLL-001 constituents have no `product_image` attachment. The agent rendered them credibly from `material_notes` / `finish_notes` / `identifying_details` text fields surfaced via slot_prompt prose. This is an incidental capability of the architecture, not the operational target — the SKU-mode discipline (every constituent has a product_image) remains the right operational default.

**Cross-slot consistency for prose-only constituents requires verbatim prose repetition.** SKU mode's `product_image_lookup_lookup` automatically anchors visual identity across slots when product_image attachments exist; collection mode without product_image attachments must replicate the prose. This is a content-discipline finding, not a schema-mutation finding.

**Exclusion-by-name works at the slot prose layer.** DETAIL_ADJACENCY explicitly named the lamp and bench as "should NOT appear in frame at all" and the agent honored the exclusion cleanly. Subset selection within a packet's constituent set, expressed in prose, was rendered structurally absent in the generated output.

**Arrangement preservation across independent generations is not tractable.** Text-to-image generation cannot preserve spatial arrangement across independent slot generations. The reframe is to be honest about what the tooling can do — same grouping concept with different camera position, not "same arrangement different angle." This is a generation-tooling reality; the architecture is unaffected.

**Family coherence is achievable without arrangement preservation.** All three PKT-COLL-001 governed assets share studio world, chair fidelity, tonal register, and lighting direction even though spatial arrangement is independently generated per slot. Slot_prompt-anchored consistency carries family coherence in collection mode at evidence depth.

**Generation-tooling has constituent-cropping limitations under composite framing.** HERO_GROUP's bench-cropping persisted across three rounds despite progressively stronger framing language. This is a generation-tooling limitation when one constituent's natural proportions diverge sharply from the others; it is not a schema or layer-shape issue.

**Mode-independence is concretely demonstrated at the operational level, not just on paper.** PKT-COLL-001 ran inside the same SKU-driven Furniture v1 base as PKT-SKU-007 / 009 / 010, sharing REF-002 as packet-level studio-world reference, producing governed assets via the same Path-B-shape full flow. The same schema carried both modes end-to-end without structural mutation.

**Paper-strain deflated into content-discipline under operational pressure.** This is the load-bearing methodological finding the slice surfaces. The cross-mode probe identified collection mode's slot-input plurality strain as the strongest schema-mutation candidate across the cross-mode sweep. The operational test showed that the workaround (prose enumeration in slot_prompt) carries the discipline cleanly. Schema mutation candidates that look earned on paper may not be earned operationally; the right test is the operational one.

## Open Questions Surfaced for Cross-Mode Comparison

These questions arise specifically from articulating the collection-mode IA content and become more pointed when compared against the marketing and campaign sketches once they exist.

1. **Does the prose-enumeration-carries-1:N pattern generalize to overlay-bearing modes?** Collection mode's grouping carrier is multi-constituent visual coherence anchored by slot_prompt prose. Marketing mode introduces messages; campaign mode introduces campaign concepts. Whether prose carries those overlay layers as cleanly as it carried collection-mode grouping is open.

2. **Does the prose-only-fidelity capability generalize to non-physical-product content?** The PKT-COLL-001 incidental finding (table, lamp, bench rendered credibly without product_image) depends on the agent inferring product identity from material / finish / identifying-detail text. Marketing-mode messages and campaign-mode concepts are not physical objects with material descriptions; the analog of "prose-only fidelity" may take a different shape.

3. **What replaces grouping-as-fidelity-anchor when the unifying axis is not a visual collection?** Collection mode's family coherence is anchored by visual elements (studio world, chair fidelity, tonal register, lighting). Campaign mode's family coherence may need to be anchored by conceptual or narrative elements; marketing mode's by message-fit. How this changes the operational shape of family coherence is open.

4. **Does the executor-vs-curator framing-divergence pattern repeat across modes?** The collection-mode operational test surfaced an executor mis-framing (initial `agent-proposed-human-ratified` reading) corrected by the curator's actual judgment process. Whether this is a procedural pattern that generalizes (executor agents trend toward proposal-cardinality framing; curators with different criteria override) is worth pressuring in marketing and campaign mode tests when they operationalize.

5. **Does the cross-axis curation tradeoff structure (lead-product lighting vs family coherence vs framing cleanliness vs exclusion fidelity) take a different shape in modes with overlay content?** Collection mode's tradeoffs are visual-aesthetic. Marketing mode's tradeoffs may include message-fit-vs-aesthetic; campaign mode's may include concept-fit-vs-product-truth. The current `capture_reason` / `capture_notes` text carriers handled collection-mode tradeoffs; whether they scale to richer tradeoff structures is open.

6. **Does the cross-packet reuse of packet-level references (REF-002 used by PKT-SKU-009, PKT-SKU-010, PKT-COLL-001) generalize to mode-spanning reference shares?** A campaign-mode packet might want to lift a collection-mode hero composition as a reference; a marketing-mode packet might want to lift a campaign-mode hero shot. The architecture currently treats reference assets as independently linkable, but the mode-spanning case is not exercised yet.

7. **Where does the historical-placeholder artifact-discipline pattern (PKT-COLL-001's 3 untouched 2026-04-22 rows) generalize across modes?** Other modes that operationalize after paper-probe periods may also accumulate historical placeholder rows; the artifact-discipline rule (do not retrofit) is mode-agnostic but its operational consequence (legacy rows persist alongside new operational outputs) is worth naming as a recurring pattern.

These questions feed forward into the marketing-mode and campaign-mode sketches, and ultimately into the cross-mode synthesis sketch.

## Self-Superseding Clause

This sketch is a Phase 1 artifact. It should be superseded by:

- the eventual cross-mode synthesis sketch once the four mode sketches exist and the comparison surfaces a consolidated cross-mode IA content model
- whatever later milestone-8 synthesis absorbs the redirection alongside the other Phase 1 / Phase 2 outputs
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact and the Phase 1 sketches into a single current-architecture document

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the SKU-driven mode sketch, or the operational findings notes. Those remain authoritative for their subject matter; this sketch reads them at collection / merchandising mode column depth and articulates content there.

## Anchor Documents

### Phase 1 sketch series

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): the SKU-driven mode sketch that this sketch contrasts against; first of four mode sketches
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that places this sketch as the second of four Phase 1 mode sketches

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact at SKU + same-category-collection scope
- [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md): three-layer-vs-layered-operational reconciliation; matrix
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; Model A vs Model B
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): layered operational model and curation event as first-class governance act

### Worked vertical slice — operational evidence

- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): primary operational evidence; verdict that the architecture is mode-independent at the operational level; ten findings including the deflation of the paper-strain hypothesis
- [`docs/collection-mode-operational-test-setup-v1.md`](collection-mode-operational-test-setup-v1.md): Phase 1 setup; iterative slot_prompt tightening; SKU swap and reference wire-up adjustments
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): paper-only probe whose strain hypothesis the operational test validated and partially deflated
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): SKU-driven Path A; established the implementation-vs-conceptual goal distinction and the curation_pattern-from-judgment-process doctrine that this sketch carries forward
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): SKU-driven Path B; established the asset_attachment self-contained governed-asset pattern that the collection-mode test mirrored

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau this sketch reads against; the collection-mode operational test was the first move past
