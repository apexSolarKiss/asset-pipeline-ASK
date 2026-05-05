# Architecture // Apex Definition-Layer v1 // SKU + Same-Category-Collection Scope

## Purpose

This is a v1 apex definition-layer artifact at SKU + same-category-collection scope. It consolidates the prior three architectural passes — [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md) (matrix and reconciliation), [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md) (vocabulary precision), and [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md) (aesthetic layer-shape sketch) — into one narrow definition-layer artifact, with three named limitations carried explicitly.

Those three predecessor passes remain authoritative for their subject matter. This artifact synthesizes; it does not re-derive.

## Posture

This artifact is **not**:

- a final ontology
- production readiness for any mode
- universal cross-mode doctrine
- a rewrite of [`docs/architecture.md`](architecture.md), the cross-mode layered-input note, or the predecessor passes
- a schema specification
- a prototype direction
- an authorization for any next path

It is what the grounding note describes as the project's durable target: the structured definition of intent, inputs, constraints, outputs, governance, and the carriers that hold them. At this stage, it is bounded by the operational evidence available — SKU-driven Furniture v1 operationalized end-to-end, same-category collection mode operationalized in the same base, marketing and campaign modes paper-probed only — and by three named limitations the prior passes surfaced and held.

Permission to be wrong is preserved. A v2 apex artifact will write itself when operational evidence at marketing or campaign mode, or at cross-base / cross-category / cross-brand pressure, accumulates enough to extend the model. That is not authorized from this artifact.

## Scope

This artifact covers:

- the SKU-driven Furniture v1 mode, operationalized end-to-end across PKT-SKU-007, PKT-SKU-009, PKT-SKU-010
- the collection / merchandising mode, operationalized end-to-end on PKT-COLL-001 in the same base, at four-constituent scale, in the furniture category, in the same brand context

It does not cover:

- marketing / message-driven mode (paper-probed only)
- brand campaign / editorial mode (paper-probed only)
- cross-base / cross-category / cross-brand pressure
- larger-scale composite anchors (collection at four constituents only)

## Named Limitations

Per [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md) §10, three blockers are held explicitly:

1. **Specific schema for brand-system, mode/category, or product-class aesthetic carriers.** The aesthetic-layering pass sketched conceptual carriers; this artifact does not specify them. They are not earned by current operational pressure.
2. **A precedence rule for inheritance and override.** Conflict scenarios have not been operationally tested. The carrier-flow model is implicit-additive in current evidence (Model A); layered-precedence with explicit override (Model B) is a candidate alternative not yet earned. This artifact characterizes both without settling.
3. **Marketing-mode and campaign-mode operational evidence; cross-base / cross-category / cross-brand pressure.** All paper-probed only. This artifact does not extend to those modes; future v2 apex work would.

These limitations are load-bearing. Any reading of this artifact that elides them mis-reads it.

## The Spine // Schema Organization × Operational Flow

The architecture's spine is the matrix introduced in [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md) §1. Two orthogonal dimensions:

**Schema organization** (three tiers from [`docs/architecture.md`](architecture.md)):
- universal schema
- workflow-stream variants
- brand-specific policy overlays

**Operational flow** (approximately seven layers + one curation seam, with structure of inheritance more important than cardinality per [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md) §5):
- brand-system context
- mode / category
- fidelity anchor + rules
- packet
- slot
- candidates
- (curation seam)
- governed asset

Each cell of the matrix is a place information *can* live. Most cells are empty in any given implementation. The matrix is descriptive of where structure can sit, not a checklist that any future schema must populate.

The schema-organization dimension answers: where does this concept live across universal / mode-shaped / brand-shaped tiers? The operational-flow dimension answers: where does this datum live as it flows toward a governed asset?

Compact view of the operational-flow dimension at current v1 carrier depth:

| Operational layer       | Current v1 carrier depth                                                          |
| ----------------------- | --------------------------------------------------------------------------------- |
| Brand-system context    | conceptual / unmodeled                                                            |
| Mode / category         | worked-example naming and conventions                                             |
| Fidelity anchor + rules | product / collection grouping at operational depth; marketing/campaign paper-only |
| Packet                  | strong current carrier                                                            |
| Slot                    | strong current carrier                                                            |
| Candidates              | transient generation outputs                                                      |
| Curation seam           | strong current carrier                                                            |
| Governed asset          | strong current carrier                                                            |

## First-Class Architectural Concerns

The grounding note names the durable definition layer as the structured definition of: product truth, business intent, creative intent, constraints, required outputs, slot-specific variation, visual references / invariant anchors, decision ownership, approval / override boundaries, capture / governance rules, reuse / derivative / family-coherence rules. Each is located in the spine below.

### Intent

Intent enters the system at the packet layer in current evidence, with two sub-concerns:

- **Business intent** — what the asset is meant to *achieve*. Carried by the packet's `business_intent` text field. Brand-system-level business intent (overall brand goals) is currently unmodeled; it would inherit downward in a future apex artifact when brand-system carriers are earned.
- **Creative intent** — how that purpose is meant to be *expressed*. Carried by the packet's `creative_intent` text field, plus packet-level reference linkages. Creative intent is the layer where most aesthetic specification currently happens (see Aesthetic concern below).

Ordering of business and creative intent is descriptive, not yet a formal precedence rule. An explicit tradeoff rule between them is held as a future concern.

### Inputs

Inputs live across multiple layers:

- **Product truth** — what each product *is*: material composition, dimensions, finish, identifying construction details, function. Carried per SKU by `material_notes`, `finish_notes`, `identifying_details`, plus the `product_image` attachment as the durable visual carrier of product identity. Linked into packets via the `products` relation; surfaced into slots via `product_image_lookup_lookup`.
- **Visual references** — approved imagery linked into the system as structural carriers. Currently live at packet level (packet-level studio-world references, packet-level visual-invariant anchors) and at product level (per-product `product_image`). References are the architecture's primary high-bandwidth aesthetic carrier.
- **Contextual / supplied parameters** — slot-level prose instructions, role-specific framing, exclusion language, and combinations. Carried by `slot_prompt` text.

Inputs are distinct in *kind* even when the underlying data overlaps. Per [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md) §3, visual inputs are the architecture's fidelity strategy; prose is fallback / pressure-relief, not the strategic primitive.

### Constraints

Constraints currently trend toward four sub-concerns:

- **Hard requirements** — inviolable conventions. Currently carried at the packet layer in prose form (`bounded_creative_discretion` text or as exclusion language inside `slot_prompt`); brand-level hard rules are unmodeled.
- **Bounded creative discretion** — the scoped freedom shaped by intent and bounded by other constraints. Carried at the packet layer by `bounded_creative_discretion` text. The grounding note's *creative discretion as bounded zone* framing locates this as a primary structural concern.
- **Exclusion rules** — what must not appear, must not happen. Carried as prose inside `slot_prompt` or `bounded_creative_discretion`. Operationalized in the collection-mode test ("the lamp and bench should NOT appear in frame at all").
- **Reference artifacts as constraint carriers** — when a reference is supplied not as input but as a binding (do this kind of thing) or exclusion (do not do this kind of thing) anchor. Currently same carriers as visual references; constraint role is conceptual.

The substructure is provisional. Whether each becomes a separate field, a separate entity, or remains carried by prose is not earned by current operational pressure.

### Aesthetic // Layer-Shape Sketch

Aesthetic is how the visual system *frames* product-truth and intent. Distinct from product-truth even where carriers overlap (per [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md) §Aesthetic vs Product-Truth Distinction).

Aesthetic is currently carried at layer-shape depth across the spine:

- **Brand-system context (currently unmodeled).** No first-class carriers in the current schema. Implicit, carried by setup discretion at lower layers.
- **Mode / category (currently unmodeled structurally).** Mode aesthetic emerges from packet/slot conventions. The closest current carrier is mode naming in worked-example artifacts and packet conventions, not a first-class mode aesthetic carrier in the active Airtable schema.
- **Product / product-class (partial).** Product-truth fields imply product-class aesthetic burden but do not carry aesthetic claims directly. The `product_image` per SKU encodes some aesthetic information implicitly through the existing studio treatment, but is not separated into product-class-aesthetic-claim vs product-truth-image.
- **Packet (strong, currently over-loaded).** The packet's `bounded_creative_discretion`, `creative_intent`, `business_intent` text fields plus packet-level reference linkages do most of the aesthetic-specification work in current evidence. Per the aesthetic-layering pass §4, this layer is over-loaded with aesthetic responsibility because higher-layer carriers do not exist.
- **Slot (strong).** `slot_prompt` text carries slot-specific aesthetic and compositional language; `product_image_lookup_lookup` and packet-reference lookup fields are surfaced onto the slot. Direct slot-specific reference linkage is not present in the active schema; future schema could add role-specific reference carriers if earned.
- **References (cross-cutting carriers).** Approved imagery linked into the system as structural carriers. The architecture's primary high-bandwidth aesthetic carrier. References can live at any layer; current evidence has them at product, packet, and (via lookup surfacing) slot.
- **Curation / governance.** Curation does not author upstream aesthetic specification; it judges candidates against it and elevates one into governed asset identity. If governed assets later become references or precedents, curation can also shape future aesthetic evidence.

The layer-shape sketch is the apex artifact's current depth on aesthetic. Specific carriers are held under Named Limitation #1; inheritance precedence and override authority are held under Named Limitation #2.

### Required Outputs

Required outputs are first-class obligations expressed at the slot layer. Per the bounded `output_slots` decision in SKU-driven Furniture v1, each slot is an *expected output obligation* with a role (HERO, PROFILE, DETAIL, CONTACT-SHEET, HERO_GROUP, HERO_GROUP_ALT, DETAIL_ADJACENCY, etc.), a `slot_status` lifecycle, structural lookups to product images and packet references, and a `slot_prompt` text carrier.

Slot-specific variation is the form required outputs take. Each role carries different aesthetic burden, different framing burden, different fidelity burden. The slot is where role-specific narrowing happens within packet bounds (per the corrected §5 wording in the aesthetic-layering pass).

### Curation Seam

Curation is the singular runtime creative-discretionary act per the grounding note's *capture as selection* premise. Per [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md) §1, curation is the moment a candidate is selected from a set of possibilities and elevated into governed asset identity. It is distinct from upstream setup / configuration / prompt-authoring discretion, which can be creative and authorship-bearing but is not the governed capture seam unless it elevates a candidate into governed asset identity.

Curation provenance fields record the curation event, not setup discretion:

- `capture_reason` — what motivated the elevation
- `capture_notes` — text narrative of the curation reasoning
- `source_attachment_id` — which raw candidate was elevated
- `captured_at` — timestamp of the curation event
- `curator` — *by whom* the judgment was exercised
- `curation_pattern` — the kind of judgment process

The `curation_pattern` value space currently includes five surfaced values from real test work:
- `algorithmic-curation`
- `agent-proposed-human-ratified`
- `batch-output-no-curator-selection`
- `agent-vision-proposed-human-ratified`
- `human-cross-round-authorship-bearing-curation`

Per the curator-override correction recorded in [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md), `curation_pattern` is determined by the curator's actual judgment process across the candidate space available, not by proposal cardinality. Single-candidate-per-slot proposals can produce authorship-bearing curation if the curator weighs candidates against alternatives independently.

### Governed Assets

Governed assets are the durable output of the curation seam. Each governed-asset row carries:

- the five curation provenance axes named above
- the `curator` field (closing the *by whom* axis as first-class)
- the `asset_attachment` field (multipleAttachments with attachment-copy writeback, resolving the milestone-5 thin-bridge limitation per [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md))
- the `governed_output_status` status value distinguishing governed output from candidate / rejected rows (historical placeholder rows are a separate artifact-state issue, not a status value)

Governed assets carry the asset itself self-contained, independent of any later mutation of source slots or raw candidates. The architectural cost of the prior thin-bridge limitation is documented — text-reference-only assets are structurally lost when source attachments are deleted (PKT-SKU-007 backfill case in [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](asset-attachment-backfill-findings-sku-driven-furniture-v1.md)).

### Family Coherence

Family coherence is the architecture's pressure to produce coherent asset families across the slots of a packet. Per [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md), family coherence has two senses:

- **Implementation goal** — slots filled with plausible assets
- **Conceptual goal** — coherent governed asset family with cross-slot consistency

The implementation-vs-conceptual distinction is fully cross-mode in current evidence (sharpest in campaign mode at probe-depth, where the gap between technically-plausible imagery and conceptually-coherent campaign world is widest).

In current evidence, family coherence is achievable via slot_prompt-anchored consistency, packet-level reference attachments, and (where present) per-product `product_image` attachments. Cross-slot consistency for prose-only constituents requires verbatim prose repetition, per finding 5 of the collection-mode operational test. Arrangement preservation across independent slot generations is not tractable per current text-to-image generation tooling (collection-mode operational test finding 6).

Decision ownership and approval/override boundaries for family coherence are partly carried by the curator at the curation seam and partly by setup discretion upstream. Formal ownership, approval authority, and reuse / derivative rules remain only partially modeled. Inheritance/override precedence is held under Named Limitation #2; decision ownership and reuse / derivative governance remain adjacent not-yet-hardenable concerns.

### Decision Ownership / Approval-Override / Reuse-Derivative Boundaries

Decision ownership is currently carried most concretely at the curation seam through `curator`, `curation_pattern`, `capture_reason`, and `capture_notes`; upstream setup ownership is only inconsistently recorded and remains a watchpoint.

Approval / override boundaries are partially carried by curation provenance and by the inheritance/override discussion, but formal override authority is not modeled. Named Limitation #2 covers inheritance/override precedence; decision authority remains adjacent but not identical.

Reuse / derivative rules are not modeled in this v1 apex. The repo has captured asset-family coherence / reuse / derivative pressure, but not resolved it into schema or doctrine. This remains not-yet-hardenable.

## Carrier Boundaries

Per [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md), four carrier boundaries shape what the architecture commits to:

### Disciplined Prose vs Structural Representation

Both are legitimate carriers of architectural information. Prose is high-bandwidth for nuance, exclusion, novel constraint formulation, and combinations that would be over-engineered to schematize. Structural representation is machine-readable, validatable, queryable, and refactor-safe across implementations. The boundary moves with mode, scale, and observed pressure.

Decision criterion for when structural representation earns its keep: observed operational pressure (cross-output coherence brittleness under verbatim-replication burdens; scale where prose enumeration becomes unmanageable; recurrence of mode-specific anchoring patterns enough to amortize schema cost; validation/governance/release-readiness checks that need machine-readable structure; specific operational failure that disciplined prose did not prevent). *Not* paper prediction. This rules out designing-ahead-of-pressure for marketing/campaign-mode anchors that have not been operationalized.

### Visual Inputs as Fidelity Strategy vs Prose as Fallback

Visual inputs (per-product `product_image` attachments, packet-level reference assets, packet-level studio-world references) are the architecture's fidelity strategy. Prose is fallback and pressure-relief, not the strategic primitive. The grounding note's foundational premise — prose alone is too lossy for high-fidelity visual systems — holds.

Prose-only success (e.g., the collection-mode test's three constituents without `product_image`) is recorded honestly as an incidental capability of the architecture, not as evidence that prose suffices generally. Future operationalization defaults to product_image attachments per constituent.

### Scoped "Mode-Independent" Language

The defensible claim about cross-mode generalization in current evidence is: "the same layered shape and the same v1 schema carried a same-category collection-mode operational test in the same base without structural mutation." Cross-base, cross-category, cross-brand, larger-scale, marketing-mode, and campaign-mode pressure remain untested.

The architecture has held under each pressure point so far. It has not been pressured at every boundary that would be required to call it mode-independent in general. This artifact uses scoped claims throughout; readers should not infer settled mode-independence from the architecture's survival of the available evidence.

### Approximate Layer Count vs Load-Bearing Inheritance Structure

The exact count and naming of operational layers is approximate. The load-bearing claim is the *structure of inheritance and override* across layers, not the cardinality. Layers should be named by what they carry (brand-system context, mode/category, fidelity anchor, packet, slot, candidate, governed asset), not by a numbered progression.

## Inheritance and Override Behavior

Per [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md) §8, two candidate models are visible:

**Model A: Implicit-additive accumulation.** Each layer's content (prose, references) is supplied to generation as input. Conflicts are resolved by the agent's interpretation, supported by prose discipline at the lower layers. No formal precedence; everything available is used. **This is approximately the current model in current evidence.**

**Model B: Layered precedence with explicit override.** Higher layers set bounds; lower layers add specificity. In a conflict, an explicit override must state which inherited carrier is being narrowed, varied, or suppressed. A possible authority order could be `brand > mode > product-class > packet > slot`, but current evidence has not earned that order. **This model is closer to how style-guide / brand-overlay systems typically work in real client implementations.**

Current evidence is consistent with Model A. The model has not been pressure-tested where layers would actually disagree. The architecture currently delegates conflict resolution to agent interpretation; whether this scales beyond the same-base same-category evidence available is unknown.

Override authority — the question of *who* can override *what* at *which* layer — is not formally modeled. Capability to override is unconstrained at every layer because the architecture does not enforce inheritance precedence. Whether override authority should become first-class is a governance question intersecting with the aesthetic model and held as a watchpoint.

This is the load-bearing question Named Limitation #2 holds. A future apex v2 will need to settle Model A vs Model B (or commit to a hybrid) when conflict scenarios accumulate operationally.

## Stable / Provisional / Not-Yet-Hardenable Summary

Consolidated across the three predecessor passes and this artifact's synthesis. Snapshot of where the architecture currently sits, not a finalization.

### Stable

- The orthogonal three-layer schema organization × layered operational flow matrix is the architecture's spine
- Aesthetic and product-truth are distinct concerns that can share underlying data
- The curation seam is a first-class governance act, with five-axis provenance + `curator` + `curation_pattern` + `asset_attachment` carriers
- Curation pattern is determined by the curator's actual judgment process, not by proposal cardinality
- Curation does not author upstream aesthetic specification, though curated assets can become future references or precedents
- Required outputs are first-class obligations expressed at the slot layer (`output_slots` as expected obligations, not as containers for raw outputs)
- The implementation-vs-conceptual goal distinction for family coherence is fully cross-mode at probe-depth + same-category-collection operational depth
- Both disciplined prose and structural representation are legitimate carriers; structure is earned by observed operational pressure, not paper prediction
- Visual inputs are the architecture's fidelity strategy; prose is fallback / pressure-relief
- The same layered shape has held across all four modes at probe-depth and across SKU + same-category collection operationally; per-mode differences currently appear to be content / pressure differences, not structural breaks (within the scoped claim)

### Provisional

- The exact count and naming of operational layers (approximate; structure of inheritance is the load-bearing claim)
- The substructure of each universal-schema concept (intent → business / creative; inputs → product-truth / references / contextual; constraints → hard / bounded-discretion / exclusion / reference; governance → validation / approval / override)
- The Layer 2 "fidelity anchor + rules" representation across non-SKU modes (composite-anchor pressure surfaced and partially deflated by collection operational evidence; marketing/campaign untested)
- Whether composite anchors require structured representation, for which modes, at what scale
- Whether brand-system, mode/category, and product/product-class aesthetic carriers should be first-class entities, attributes, overlays, or remain implicit
- Whether the architecture's inheritance/override model should remain implicit-additive (Model A) or move toward layered-precedence (Model B)
- Whether override authority needs first-class modeling
- Whether the current `curation_pattern` value space is exhaustive across modes that have not been operationalized
- Whether the curation event remains modeled as fields on `generated_assets` or migrates to a first-class entity
- The four worked-example modes themselves; they are exemplars under which the architecture has been pressured, not a closed taxonomy

### Not Yet Hardenable

- A canonical layer count or sealed set of universal-schema sub-elements
- A first-class `grouping_archetype` schema (weakened by collection operational evidence); first-class `messages` or `campaign_concept` entities (paper-predicted only — neither strengthened enough for schema, neither operationally deflated)
- A general doctrine of when structure earns its keep over prose (boundary moves)
- A precedence rule for inheritance/override (Named Limitation #2)
- A specific schema for brand-system, mode/category, or product-class aesthetic carriers (Named Limitation #1)
- A `curation_events` first-class entity table
- A `curator_aesthetic_criteria` field or similar structuring of curation aesthetic
- The link between proposal cardinality and curation pattern (override correction proved this is not real)
- Any marketing- or campaign-specific schema element (Named Limitation #3)
- Cross-base / cross-category / cross-brand schema generalization (Named Limitation #3)
- The four worked-example modes as a closed taxonomy
- A v2 apex artifact at broader scope than this v1 carries

## What This Artifact Is NOT

- **Not a final ontology.** It is the v1 apex at the current evidence depth. A v2 apex will write itself when operational evidence at marketing or campaign mode, or at cross-base / cross-category / cross-brand pressure, accumulates.
- **Not production readiness for any mode.** No claim of release-ready quality, performance, or completeness is made.
- **Not universal cross-mode doctrine.** Scope is SKU + same-category-collection. Marketing and campaign mode are paper-probed only and explicitly not covered.
- **Not a rewrite of [`docs/architecture.md`](architecture.md), the cross-mode layered-input note, or the predecessor passes.** Those remain authoritative for their subject matter.
- **Not a schema specification.** No carriers are proposed at field/table specificity. The aesthetic-layer carrier sketches in §First-Class Architectural Concerns / Aesthetic are conceptual, not schema proposals.
- **Not a prototype direction.** No new prototype chain is opened.
- **Not an authorization for any next path.** Workstream B (README/index rebalance), Workstream D (D1/D2/D3 strategic fork), Workstream E (PKT-COLL-001 noisy rows), continued aesthetic refinement (aesthetic pass §10 Option 2), cross-base operationalization (Option 3) all remain held for separate ASK directional input.
- **Not a freeze on future pressure-surface work.** Per the grounding note, prototypes remain pressure surfaces, not the project center. This apex artifact consolidates the current definition layer at v1 scope; it does not prevent future prototype work from pressuring, revising, or extending it.

## Anchor Documents

### Architectural pass predecessors

- [`docs/architecture.md`](architecture.md): three-layer architecture model and current ontology direction
- [`docs/architecture-bounded-modeling-pass-v1.md`](architecture-bounded-modeling-pass-v1.md): three-layer-vs-layered-operational reconciliation; matrix for where structure can live
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; five distinctions; Partial exit criterion answer
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layering modeling pass; Model A vs Model B; Partial-with-aesthetic-sketched exit criterion
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): layered operational model and curation event as first-class governance act

### Operational evidence carrying the artifact's claims

- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-category collection-mode operationalization; curator-override correction; ten operational findings on prose / structural / visual / family-coherence dimensions
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): coordinated fresh-generation full-flow on PKT-SKU-009; implementation-vs-conceptual goal distinction; introduced `human-cross-round-authorship-bearing-curation` curation_pattern value
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): coordinated fresh-generation full-flow on PKT-SKU-010; `asset_attachment` field; resolves milestone-5 thin-bridge
- [`docs/asset-attachment-backfill-findings-sku-driven-furniture-v1.md`](asset-attachment-backfill-findings-sku-driven-furniture-v1.md): backfill outcome; surfaces real architectural cost of the thin-bridge limitation
- [`docs/curation-event-schema-mutation-sku-driven-furniture-v1.md`](curation-event-schema-mutation-sku-driven-furniture-v1.md): five-axis provenance schema mutation
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): curator field + backfill; closes the *by whom* axis of curation provenance

### Cross-mode probe references (paper-only, scope held)

- [`docs/cross-mode-probe-marketing-message-driven-v1.md`](cross-mode-probe-marketing-message-driven-v1.md): marketing-mode paper probe
- [`docs/cross-mode-probe-collection-merchandising-v1.md`](cross-mode-probe-collection-merchandising-v1.md): collection-mode paper probe (whose strain hypothesis the operational test partially deflated)
- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): campaign-mode paper probe

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): v1 sweep closure plateau; the operational + paper evidence base this apex artifact consolidates from
