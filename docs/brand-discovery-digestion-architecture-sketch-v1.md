# Brand Discovery / Digestion Architecture Sketch v1

## Posture

```text
Phase 2 opening sketch
on-paper architecture
not an intake form
not a UI
not Airtable
not schema mutation
not brand-specific
not milestone-8
not architecture.md rewrite
self-superseding once Phase 2 produces a fuller model
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md), Phase 2 of the redirection is brand discovery / digestion architecture — the structured intake from a brand system into the layered IA before any tool implementation begins. This artifact opens Phase 2 at sketch depth.

The sketch articulates *what brand discovery / digestion is, conceptually, as an architectural surface*. It does not design the intake mechanics, propose a schema, or stand up a base. It does not articulate any brand-specific intake. It does not assume a UI. It does not author what a Phase 2 milestone synthesis would consolidate.

## Why Phase 2 Exists After Phase 1

Phase 1 articulated *what content lives at each layer in each worked-example mode* (per [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md)). The four mode sketches surfaced a stable shared layer set (packet, slot, candidate, curation seam, governed asset) plus mode-specific layers (collection / grouping; message / offer / communication; campaign concept; review-context / campaign-world coherence). Two layers — brand-system and category / product-class — were named across all four modes as currently unmodeled / implicit.

Phase 1 left a question Phase 1 could not answer: *how does brand-system content get into the IA in the first place?*

Phase 2 is that question's surface. It articulates how an existing brand system's content gets resolved into the layered IA that Phase 1 articulated. The IA is the destination shape; brand discovery / digestion is the architectural entry surface where brand-system input lands and gets distributed across the layers.

The cross-mode synthesis explicitly flagged Phase 2's role: *Phase 1 articulates what content lives at each layer in each mode; Phase 2 articulates how an existing brand system's content gets resolved into that layered IA.* This artifact opens that articulation at sketch depth.

## What Counts as Brand-System Input

A brand system, for the purpose of this architectural surface, is the structured articulation a brand has already produced of its own identity, voice, visual rules, asset library, application conventions, and operating history. Brand-system input is the source material brand discovery / digestion processes.

Six categories of brand-system input are conceptually distinct, even when a particular brand's articulation collapses several into one document or none into structured form at all:

### Brand platform

The brand's articulation of what it *is* — values, voice, the brand's stance toward its subject. Often the most abstract layer; often the layer most under-articulated by the brand itself; often the layer whose absence is felt most in downstream coherence judgments.

### Visual identity system

Palette, type, marks, treatment rules, color semantics, mark application contexts. Usually the most explicitly articulated component because it is the most systematized in brand-management practice.

### Photography / image style guide

Light direction, composition conventions, subject treatment rules, model direction, set conventions, post-production rules. Often partially explicit (in style guides) and partially implicit (in the existing image library's collective gestalt).

### Asset library

Existing approved imagery — product photography, lifestyle imagery, campaign work, editorial work — that the brand has already produced and approved. The library carries voice and aesthetic implicitly even where prose articulations are sparse.

### Application guidelines

How the brand applies itself across surfaces — web, email, social, print, retail, packaging, environment. Carries the brand's working assumptions about which modes (per Phase 1's worked-example mode framing) it actually operates in.

### Past campaigns

Historical examples showing the brand in operation. Carries voice continuity, arc-bearing patterns, family-coherence patterns that prose and individual references cannot fully articulate.

The six categories are conceptually distinct but overlap in practice. A brand's photography style guide may be implicit in the asset library; visual identity rules may overlap application guidelines; past campaigns may be the only articulation of voice that exists.

## Intake-to-IA Mapping

Brand-system input does not map 1:1 to IA layers. Each input category contributes to multiple layers, and each layer draws from multiple input categories. The mapping is many-to-many, with input categories carrying *kinds* of content that resolve to specific layer carriers.

### Brand-system layer (currently unmodeled in IA)

**Receives:** brand platform (values, voice, stance); visual identity system (the brand-level constants — palette, type, marks); photography style (the brand-level conventions distinct from per-mode adaptations); asset library (existing imagery as reference precedents).

**Resolution shape:** brand-system content is the layer Phase 1 named as not-currently-modeled with first-class carriers. Phase 2 inherits this gap. The intake architecture articulates *what* brand-system content needs to be captured and how it would flow into the IA without prejudging *how* it should be carried structurally — that resolution belongs to a future schema move when operational pressure earns it.

### Category / product-class layer (currently signaled-only in IA)

**Receives:** application guidelines (which categories the brand operates in); asset library (per-category imagery establishing category conventions); past campaigns (cross-category voice continuity examples).

**Resolution shape:** category presence is signaled per-SKU and via worked-example naming in current IA. Intake identifies the brand's category set and the category-typical conventions the brand applies; it does not resolve the apex Named Limitation #1 question of whether category should become a first-class carrier.

### Mode-specific layer (varies per mode)

**Receives:** application guidelines (which modes the brand operates in — SKU product imagery, collection / merchandising, marketing / message-driven, campaign / editorial); past campaigns (mode-specific patterns; the brand's working repertoire); photography style (mode-shaped adaptations of brand-level conventions); asset library (mode-specific reference precedents).

**Resolution shape:** intake identifies the brand's active mode set and the per-mode templates the brand uses. The four worked-example modes from Phase 1 are the comparison frame; not every brand uses all four, and some brands may operate in modes the four-mode framing does not yet cover. Intake names the brand's mode set; Phase 1's per-mode IA content articulation tells intake what content each mode-specific layer needs.

### Packet layer (the strongest current IA carrier)

**Receives:** application guidelines (recurring packet shapes — "we always need a hero plus three companions per email"); past campaigns (packet templates the brand has used historically); photography style (packet-level aesthetic conventions); asset library (packet-level reference candidates).

**Resolution shape:** intake produces packet-template content per mode. This is not yet packet *instantiation* (specific PKT-XXX-YYY records) — it is the recurring shape the brand uses. The packet layer is currently over-loaded with aesthetic, intent, and (mode-specific) overlay responsibility per Phase 1; intake provides the source material that fills those carriers without prejudging whether the over-load should later split into separate carriers.

### Slot layer (the role-specific narrowing carrier)

**Receives:** application guidelines (per-touchpoint role rules — aspect ratios, attention-budget conventions, copy-overlay rules); past campaigns (slot-role patterns the brand uses); asset library (slot-role reference precedents).

**Resolution shape:** intake produces slot-role inventory per mode plus role-typical conventions. Not slot *instantiation* (specific SLOT-XXX records) — the role inventory and conventions the brand uses across packets. Phase 1's per-mode role taxonomies (HERO / PROFILE / DETAIL for SKU; HERO_GROUP / HERO_GROUP_ALT / DETAIL_ADJACENCY for collection; hero / tight / supporting + check-board / annotation-layer for marketing; campaign-arc role candidates for campaign) are the comparison frame.

### Curation / governance layer

**Receives:** brand platform (decision authority, approval boundaries, override conventions); application guidelines (review-board conventions, sign-off chains); past campaigns (curation patterns the brand has practiced).

**Resolution shape:** intake identifies the brand's governance shape — who has authority over what, how approvals chain, where review-context functions as load-bearing (per the campaign-mode evidence) versus useful-but-not-primary (per the marketing-mode evidence). The five `curation_pattern` values from Phase 1 are the comparison frame for what delegation patterns the brand exercises.

The intake-to-IA mapping is the architectural shape. The intake mechanics — what questions to ask, in what order, by what method — are the discovery sequence.

## Discovery Sequence

Discovery / digestion proceeds from broad to specific, resolving brand-system content from highest-stability layers downward. The sequence is conceptual; particular brands may have richer or thinner articulation at different layers, and the sequence accommodates that without forcing it.

### 1. Start broad — brand platform

Elicit values, voice, stance, the brand's working articulation of what it is. Even partial articulation here anchors lower-layer interpretation. Where articulation is absent, mark as inferred-not-stated and proceed; later layers will surface evidence to feed back.

### 2. Resolve visual system

Palette, type, marks, treatment, color semantics. Usually the most explicit category. Resolve the brand-level constants distinct from per-mode adaptations.

### 3. Resolve workflow-mode needs

Identify which of the four worked-example modes (SKU-driven, collection / merchandising, marketing / message-driven, brand campaign / editorial) the brand operates in, plus any modes the four-mode framing does not yet cover. Identify the centrality of each mode (central vs occasional vs absent). The mode set bounds the rest of the discovery.

### 4. Resolve category / product-class differences

Identify the brand's category set (what it produces or services), the product-class subdivisions within categories, and any category-typical conventions the brand has articulated. Where a brand operates across categories, identify whether one category is canonical and others adapt, or whether each category is treated independently.

### 5. Resolve packet / slot specificity per mode

For each active mode, resolve the brand's recurring packet shape (what content typically appears in a packet of this mode) and the slot-role inventory (which roles recur; what role-typical conventions apply). Phase 1's per-mode IA content articulation is the comparison frame.

### 6. Identify gaps / fallbacks

Surface what the brand has not articulated explicitly, what is articulated implicitly through asset library or past campaigns, and what is genuinely absent. Mark each gap with a fallback choice (see next section). Some gaps are productive — the brand may not have needed to articulate something until intake surfaces the question.

The sequence is iterative: gaps surfaced at step 6 may prompt re-resolution at earlier steps. The sequence is also non-exhaustive — particular brands may need additional resolution layers (sub-brand inheritance; product-line-specific overlays; cross-market adaptations) that this sketch does not yet articulate.

## Fallback Model

Brand systems are rarely fully articulated. Intake encounters several recurring shapes of incompleteness; each has a default fallback at sketch depth.

### When the brand has not specified something

**Default fallback:** mark as inferred-not-stated; derive from available evidence (asset library, past campaigns); record both the inference and its evidence chain. Inferred-not-stated content is operationally usable but flagged so that later operator review can confirm or revise.

**Why this fallback:** demanding full articulation up front would block intake on most brand systems. Inferred-not-stated content is honest about its evidence basis and reversible.

### When visual references contradict prose

**Default fallback:** visual carries. The foundational architectural premise (per the apex artifact's *visual inputs as fidelity strategy vs prose as fallback*) is that visual is the strategic primitive; prose is fallback and pressure-relief. When prose says one thing and the visual library demonstrates another, the visual library is the honest read.

**Why this fallback:** prose articulations of a brand's visual system are abstractions of the visual system; the system itself is what the brand has done. Where they diverge, the doing is the truth.

### When past campaigns contradict current guidelines

**Default fallback:** current guidelines are the operating frame; past campaigns are continuity references whose deviation is noted, not authoritative. If past-campaign deviation is actually the intended evolution (rather than drift), the brand should re-articulate the guideline to reflect the new posture.

**Why this fallback:** without this fallback, intake cannot distinguish brand evolution from inconsistency. Putting the asymmetry in favor of current guidelines makes drift visible.

### When category guidance is absent

**Default fallback:** derive category-typical conventions from same-mode evidence in the brand's other categories where present; otherwise default to systemic patterns from Phase 1's worked-example mode evidence. Mark the derivation explicitly.

**Why this fallback:** category guidance absence is common; doing nothing leaves the layer empty. Default-with-flag preserves the gap honestly while letting intake proceed.

### When touchpoint rules are absent

**Default fallback:** default per-mode patterns from Phase 1's worked-example evidence (HERO / PROFILE / DETAIL for SKU mode; HERO_GROUP / DETAIL_ADJACENCY for collection mode; etc.). Mark as default-not-specified. Operator can revise.

**Why this fallback:** touchpoint rules are often unspecified because they are assumed. Defaulting from worked-example patterns provides a working frame without forcing premature articulation.

### When governance / approval shape is absent

**Default fallback:** default to the foundational premise (curation as the singular runtime creative-discretionary act, per Phase 1) with the curator field populated by the operator's actual judgment. Mark as default-curation-shape. The campaign-mode premise pressure question (carried forward from the cross-mode synthesis) remains held; intake does not resolve it.

**Why this fallback:** governance shape is typically the most under-articulated brand-system input. Defaulting to the foundational premise is operationally usable while leaving the premise pressure open.

The fallback model is illustrative, not exhaustive. New shapes of incompleteness will surface as Phase 2 operationalizes; the model accommodates extension without authorizing schema mutation.

## What Must Remain Systemic

Brand discovery / digestion architecture is an architectural surface bounded the same way Phase 1's IA layered-content articulation was bounded.

- **No brand-specific doctrine.** The sketch articulates intake architecture as a system. It does not name particular brands as exemplars, does not pivot to specific brand archetypes, and does not adopt the language of a particular brand's articulation. Concrete instantiation (a specific brand's intake) is operator-side work, distinct from the architecture sketch.
- **No implementation UI assumptions.** Intake mechanics — specific elicitation questions, interview structures, document templates, software interfaces — are out of scope. The architecture sketch articulates *what intake resolves*, not *how the resolution is collected from the source*.
- **The source object is the brand system itself.** Its identity, voice, visual rules, asset library, application conventions, and operating history are the architectural inputs.
- **No prejudgment of schema mutation.** The intake-to-IA mapping articulates how content flows into existing layer carriers; it does not propose new carriers. Schema mutation is held across all of Phase 2 the same way it was held across Phase 1.

## Open Questions

These questions arise from opening the brand discovery / digestion architecture surface and become more pointed as Phase 2 produces additional artifacts.

1. **What is the right granularity for the brand-system layer's eventual structural carriers?** Phase 1 named the brand-system layer as currently unmodeled. Intake provides source material for it. Whether the layer should eventually become first-class entities (a `brand_systems` table), attribute overlays (brand-level fields on existing entities), structured packet-level fields, or remain implicit is a schema-design question the four-mode synthesis explicitly held. Phase 2 sharpens the question (intake demonstrates the layer has real content) without resolving it.

2. **How does intake handle brand-system updates over time?** A brand's articulation evolves; new campaigns introduce voice extensions; visual systems get refreshed. The sketch articulates intake as if the brand-system input is static; in operation it is not. How intake architecture accommodates updates — re-intake, incremental revision, versioned brand-system content — is open.

3. **How does intake handle inheritance for sub-brands or product lines?** A parent brand may have sub-brands; a brand may have product lines with their own visual systems within the parent's brand platform. The sketch articulates a single brand-system source; the multi-system case is unprobed.

4. **How does intake handle multi-mode brands?** Phase 1 articulated four modes as worked examples; most brands operate in some subset, possibly with modes the four-mode framing does not yet cover. How intake resolves a brand whose mode set is non-canonical is unprobed.

5. **How does intake interact with Phase 3 (the all-four-workflow Airtable demonstration)?** Phase 3 (per the redirection note's three-phase plan) is held until the IA model is understood. Phase 2's intake architecture is a precondition for Phase 3 — Phase 3 demonstrates the IA in operation, which presupposes brand-system content has been intake-resolved. The handoff shape between Phase 2 outputs and Phase 3 demonstration is unprobed.

6. **Does the fallback model generalize across brand archetypes?** The default fallbacks articulated are reasonable for brands with substantial existing articulation. Brands with minimal articulation (early-stage; in-revision; legacy with sparse documentation) may pressure the fallback model. Whether the model bends or breaks under sparse-articulation pressure is unprobed.

7. **What is the right shape of the next Phase 2 artifact?** This sketch opens the surface. Subsequent Phase 2 artifacts could deepen any of the six brand-system input categories, articulate the intake-to-IA mapping at finer resolution, or operationalize fallback decisions. Sequencing is held for ASK direction.

## Self-Superseding Clause

This sketch is a Phase 2 opening artifact. It should be superseded by:

- subsequent Phase 2 artifacts that deepen any of the surfaces this sketch opens (brand-system input categories at finer resolution; intake-to-IA mapping with concrete worked examples; fallback model under sparse-articulation pressure)
- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, and any operational evidence into a single current-architecture document
- any future Phase 3 demonstration that operationalizes the IA model under brand-system intake

It does not supersede the apex definition-layer artifact, the four Phase 1 mode sketches, the Phase 1 cross-mode synthesis, or the redirection note. Those remain authoritative for their subject matter; this sketch reads them as Phase 1's closing state and articulates the Phase 2 entry surface that follows.

## Anchor Documents

### Phase 2 framing

- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that names Phase 2 as brand discovery / digestion architecture and frames it as the implementation entry surface where brand-system input enters the layered IA

### Phase 1 outputs (the IA Phase 2 feeds into)

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; identifies stable shared layers, mode-specific layers, carrier-status matrix; flags Phase 2 as next active surface
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode IA content; collection-mode operational deflation evidence
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode IA content
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content; surfaces curation-premise pressure

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact at SKU + same-category-collection scope; Named Limitations carried forward
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback foundational claim that the fallback model applies

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau preceding Phase 1; Phase 2 is the next architectural surface past Phase 1 closure
