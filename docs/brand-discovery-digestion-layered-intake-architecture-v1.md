# Brand Discovery / Digestion // Layered Intake Architecture v1

## Posture

```text
architecture attempt
production-side on-ramp from a brand-system stack into the layered IA
conceptual integration of Phase 2 + PR #239 surfaces
not Airtable
not schema mutation
not validator integration
not Pydantic
not orchestration spec
not UI / intake-form design
not prompt engineering
not held-candidate adjudication
not minimum-trace specification
not a new milestone marker
not architecture.md rewrite
not structured-ia-model-v1 extension
not method.md update
not README / index update
not grounding-note edit
does not introduce a new synthetic brand-system stack
self-superseding once operational pressure earns or refutes the integration
```

This artifact integrates the Phase 2 brand-discovery / digestion work and the post-milestone-9 layered reference and discretion architecture into a single conceptual surface: the layered intake architecture that an existing brand-system stack passes through on its way into the IA articulated in Phase 1 + PR #239.

The integration is conceptual. It does not propose carriers, does not adjudicate held candidates, and does not pre-commit the architecture to any of the held shapes the brand-system layer's structural decision still spans.

## What This Artifact Attempts

The IA layered-content redirection named brand discovery / digestion as the implementation entry surface where brand-system input enters the layered IA before any tool implementation begins. The Phase 2 opening sketch ([`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md)) opened that surface at sketch depth. Subsequent Phase 2 work pressed each side of the surface separately — the four input-category deepenings articulated per-category structural mapping, the sparse-articulation fallback pressure note ([`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md)) pressured the model under cross-category stress and surfaced a six-layer fallback chain, the brand intake judgment-trace dry run v1 ([`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md)) walked one sparse stack through the fallback chain and surfaced five trace dimensions, and the operator-judgment protocol sketch v1 ([`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md)) named an eight-step protocol shape for the translation work between upstream brand-system inputs and downstream constraints.

PR #239 ([`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md)) then attempted the conceptual model the prior work pressed toward: a nine-fold reference-function taxonomy, an eight-layer normative hierarchy, and a nine-site creative-discretion decomposition with per-site trace-gap analysis. The first of those nine discretion sites is brand digestion itself.

This artifact reads above all of those and attempts the *intake architecture* as a layered object — not a procedural intake script, not a per-category mapping repeated, not another walk through one synthetic stack. It asks:

> What is the architectural shape of the surface that takes an existing brand-system stack on the upstream side and produces content occupying the eight IA layers on the downstream side, given the layered IA articulated in Phase 1 + PR #239 and the per-category and fallback work the Phase 2 deepenings + sparse-articulation note + dry run produced?

The artifact's claim is that intake itself is layered — it has shape that maps onto the IA's layered structure, and that shape is articulable independently of any particular brand's stack, any particular intake-form mechanics, and any particular UI surface. The shape integrates rather than replaces the prior artifacts: it does not re-derive per-category mapping (which lives in the four deepenings), does not re-derive the fallback chain (which lives in the sparse-articulation note), and does not re-derive the reference-function taxonomy or discretion decomposition (which live in PR #239).

The dry run's synthetic stack is referenced once as established precedent for what the fallback chain looks like under sparse articulation. No new synthetic stack is introduced; this artifact is not a second walk.

## Input-Category Map

The six brand-system input categories named in the Phase 2 opening sketch carry different content shapes and arrive at intake with different articulation-density expectations. The map below names each category's contribution, its limits, the articulation density intake should expect at first encounter, and the predecessor depth-authority for category content. It does not re-derive the per-category mappings; those live in the four deepenings.

### Brand platform

- **What it contributes.** The brand's propositional identity: values, voice, stance, audience / use context, promise / value proposition, authority / decision posture, narrative themes, exclusion boundaries. Most upstream input; shapes interpretation at every downstream layer.
- **What it cannot contribute.** Visual demonstration, operational specificity, application detail, validation evidence. Brand platform articulates intent; it does not show execution.
- **Articulation density at first encounter.** Often performative or aspirational rather than descriptive. Frequently the result of strategic workshops or external agency engagements rather than operating-reality observation. Sparseness or staleness common; full articulation rare.
- **Depth-authority.** [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md) — eight-component breakdown; asymmetric distribution to brand-system layer (unmodeled) and to curation seam (judgment criteria); concretizes Named Limitation #1 from the abstraction angle.

### Visual identity system

- **What it contributes.** Brand-wide constants: logo references, typography assignments, color codes, grid systems, iconography style, motion principles, application guides for the constants. The most rigorously articulated component in most brand systems because design-system-grade articulation is required for cross-channel consistency.
- **What it cannot contribute.** Subject-specific reference imagery, photographic conventions, or category-specific application beyond the constants' application guides. VIS articulates *how the brand appears* at the structural level; it does not articulate *how the brand photographs its subject*.
- **Articulation density at first encounter.** Highest of the six categories on average. VIS content typically arrives in pre-structured form (PDFs, design tokens, style references, Figma libraries) rather than as discovery-elicited prose. Sparsity uneven across components: logo and color highly articulated; motion often absent or partial.
- **Depth-authority.** [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md) — six-to-seven-component breakdown; hybrid-shape input (articulated constants AND applied conventions); concretizes Named Limitation #1 from the concrete-constants angle.

### Photography / image style guide

- **What it contributes.** Articulated conventions for the brand's image production: lighting, composition, camera distance / angle, cropping, background / environment, material and surface treatment, styling / prop logic, model or human-presence rules, post-production / color treatment, channel or touchpoint adaptations. Closest Phase 2 equivalent to the project's core visual-production problem.
- **What it cannot contribute.** Demonstration of the conventions in operation. Articulated rules carry intent; the asset library carries execution. The visual-as-fidelity-strategy claim from the apex aesthetic-layering pass makes execution the honest read when articulation diverges.
- **Articulation density at first encounter.** Variable. Some brands have substantial articulated photography guides; many have implicit conventions documented only through the asset library's collective gestalt. When sparse, derivation from the asset library is the standard fallback.
- **Depth-authority.** [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md) — ten-dimension breakdown; mostly prose-carried distribution across packet, slot, and curation-seam layers.

### Asset library

- **What it contributes.** The brand's accumulated, approved, in-operation visual work: approved product imagery, approved lifestyle / environmental imagery, prior campaign imagery, editorial / brand-world imagery, reference boards / moodboards, retouching / final master files, rejected or superseded imagery, metadata / usage / approval state. Demonstrated evidence rather than articulated rules.
- **What it cannot contribute.** Articulation of the conventions the imagery demonstrates, except through interpretive reading of the collective gestalt. Asset library shows; it does not tell.
- **Articulation density at first encounter.** Varies by brand maturity: established brands with rich DAM systems present comprehensive libraries; early-stage brands present sparse libraries or none. Approval metadata is often partially captured.
- **Depth-authority.** [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md) — eight-type breakdown; the input category most directly served by existing structural carriers (`reference_assets`; packet-level reference linkage; slot-level lookup chain; `asset_attachment`).

### Application guidelines

- **What it contributes.** Per-touchpoint application rules: how the brand applies its constants and conventions across surfaces (web, email, social, print, retail, packaging, environment). Carries the brand's working assumptions about which workflow modes (per Phase 1) it actually operates in and the operational constraints each touchpoint imposes (aspect ratios; attention budgets; copy-overlay tolerance).
- **What it cannot contribute.** Subject-specific conventions or campaign-specific overlays beyond the per-touchpoint application rules. Application guidelines mediate between brand-system constants and per-touchpoint output requirements; they do not author packet-level content.
- **Articulation density at first encounter.** Variable. Often partially documented (digital touchpoints more than print; specific touchpoints more than systemic application principles). Touchpoint rules are often assumed rather than written.
- **Depth-authority.** Not yet deepened at Phase 2 depth. The Phase 2 opening sketch named this category; no input-category deepening exists. Treated here at category-map depth only.

### Past campaigns

- **What it contributes.** Historical execution evidence: campaign-shaped imagery with arc continuity, voice continuity, family-coherence patterns across slots. The brand's working repertoire of in-operation campaign work. Particularly load-bearing for campaign-mode IA content per Phase 1's campaign-mode sketch and the Phase 2 cross-mode probe series.
- **What it cannot contribute.** Forward-looking direction beyond what the historical work demonstrates. Past campaigns carry what the brand has done; they do not commit the brand to continuing.
- **Articulation density at first encounter.** Highly variable. Established brands with multi-year campaign histories present rich evidence; pre-launch brands present none. Operational metadata about each campaign (scope, audience, success criteria, retrospective) is often missing.
- **Depth-authority.** Not yet deepened at Phase 2 depth. The Phase 2 opening sketch named this category; no input-category deepening exists. Treated here at category-map depth only.

The six categories overlap in practice — a campaign hero shot is simultaneously prior campaign imagery and asset library content; visual identity system application guides overlap photography style guide channel adaptations and application-guidelines per-touchpoint rules. Intake handles each category for what it carries; cross-category overlap surfaces additively rather than as conflict requiring resolution.

## Extraction Sequence

The Phase 2 opening sketch articulated a six-step discovery sequence starting broad (brand platform) and moving toward specific. That sequence was reasonable at sketch depth; the Phase 2 deepenings and PR #239 pressure it.

The deepenings showed that the input categories distribute asymmetrically against the layered IA's structural carriers. The asset library is the input category most directly served by existing structural carriers (`reference_assets`; packet-level reference linkage; slot-level lookup chain). Visual identity system constants are concretely defined but have no first-class IA home; they flow downstream as operator-interpretive guidance into prose. Photography style guide content is mostly prose-carried at packet and slot layers. Brand platform content is overwhelmingly upstream and flows downstream as interpretive guidance into prose with no first-class home. PR #239 named this asymmetry as the brand-system layer's named structural decision (three live shapes; hybrid most likely; no single shape carrying the criterion set cleanly).

Given the asymmetry, the natural extraction order under the architecture's current structural-carrier distribution is evidence-first, not abstraction-first. The reordered sequence below names this. The reorder is not a doctrine change — both orderings are defensible — but it tracks the structural-carrier distribution more legibly.

Each stage names what it produces, what it depends on from earlier stages, what content remains deferred when its evidence is sparse, and what makes the stage iterative when later stages pressure earlier ones.

### Stage 1 // Evidence

**Produces.** Population of the IA's existing structural carriers from concrete brand-system content: `reference_assets` populated from the asset library; brand-wide constants (color codes, typeface assignments, logo references) extracted from VIS into whatever structural form the brand-system layer's eventual decision allows (currently: held content for operator-mediated translation downstream).

**Depends on.** Asset library content; VIS constants content.

**Defers when sparse.** When asset library content is thin or absent, Stage 1 cannot populate `reference_assets` directly; the architecture's primary fidelity strategy (visual-as-fidelity per the apex aesthetic-layering pass) loses its operational anchor. Stage 1 still completes structurally — but the produced content is sparse, and the architecture relies more heavily on subsequent stages plus first-generation cycles to bootstrap visual grounding.

**Iterative when.** Stage 4 surfaces application requirements that pressure which library imagery is operationally usable (e.g., a touchpoint requires landscape framings that the library's portrait-dominant imagery does not carry); the operator returns to Stage 1 to mark library segments as touchpoint-appropriate.

### Stage 2 // Articulated conventions

**Produces.** Photography style guide content translated into the IA layers' prose carriers: brand-system-layer photography conventions (currently unmodeled; flows downstream as interpretive guidance); category-typical photography adaptations (signaled-only; flows into per-SKU descriptive fields and slot-prompt prose); slot-role conventions (`slot_prompt` text); packet-level aesthetic conventions (`bounded_creative_discretion` text); curation-seam selection criteria (`capture_reason` / `capture_notes` text). Asset-library content from Stage 1 cross-validates the articulated conventions where they overlap.

**Depends on.** Stage 1 evidence (for cross-validation when both prose and library are present); photography style guide content (when articulated).

**Defers when sparse.** When photography style guide is sparse or absent and the asset library is rich, Stage 2 derives conventions from Stage 1 (the cleanest condition surfaced by sparse-articulation pressure condition 2). When both are sparse, Stage 2's content is thin and falls through to later stages.

**Iterative when.** Stage 5 application-context surfaces brand-platform / asset-library divergence (e.g., articulated values diverge from library register); the operator returns to Stage 2 to reconcile articulated conventions against asset-library demonstration, with asset library carrying per the visual-as-fidelity-strategy claim.

### Stage 3 // Abstraction

**Produces.** Brand platform content translated downstream into prose carriers: voice register, stance, audience, promise, narrative themes, exclusion boundaries flow into packet-level `creative_intent` / `bounded_creative_discretion` text and curation-seam judgment criteria. The brand-system layer receives the upstream platform content (currently unmodeled; held as operator-mediated translation pending the brand-system layer's structural decision).

**Depends on.** Stage 1 evidence (for cross-validation; asset-library register and past-campaigns demonstration validate articulated platform content where they overlap); Stage 2 conventions (which carry brand-platform-derived stance into operational specificity).

**Defers when sparse.** When brand platform is sparse and visual evidence is rich, voice register and visual stance are derivable from Stage 1 + Stage 2 (sparse-articulation condition 1); values, authority / decision posture, and promise are not visually derivable and remain inferred-not-stated or fall through to Stage 6 / Stage 7.

**Iterative when.** Brand-platform divergence from asset library surfaces during Stage 2 cross-validation (sparse-articulation condition 4's articulated-vs-demonstrated case); the operator returns to Stage 3 to resolve which articulation carries (per the visual-as-fidelity-strategy claim, asset library carries; brand-platform content is then marked as performative-or-aspirational rather than operational).

### Stage 4 // Application

**Produces.** Per-touchpoint and per-mode application content from application guidelines: which workflow modes the brand operates in, recurring packet shapes per mode, per-touchpoint role inventory and aspect-ratio / attention-budget / copy-overlay rules. Populates mode-specific layer content (the collection / grouping; message / offer / communication; campaign concept layers) where the brand operates in those modes.

**Depends on.** Stage 1 evidence (to validate that the brand's application matches its stated touchpoints); Stage 2 conventions (to surface where touchpoint adaptations modulate brand-wide photography conventions); Stage 3 abstraction (to bind application choices to brand-platform authority posture).

**Defers when sparse.** When application guidelines are sparse or absent, the brand's active mode set is derivable from past campaigns (Stage 5) or from inference against Stage 1 asset-library segmentation (some libraries segment by touchpoint, exposing the implicit application set). When all three are sparse, Stage 4 falls through to defaults (Stage 6).

**Iterative when.** Stage 5 past-campaigns evidence shows the brand operating in a mode that application guidelines do not name; the operator returns to Stage 4 to either expand the brand's application set or mark the past-campaign work as historical-not-continued.

### Stage 5 // Validation

**Produces.** Past-campaigns evidence cross-validates Stages 1–4: does the brand's accumulated execution match its stated brand-system content? Does voice continuity hold across campaigns? Do family-coherence patterns map to Phase 1's worked-example mode-specific layers? Are there campaign-shaped patterns the deepenings have not surfaced? Where validation surfaces evolution (newer campaigns showing the brand moving in a direction the older articulation does not name), the operator marks the older articulation as superseded or flags the divergence.

**Depends on.** Stages 1–4 outputs (validation requires content to validate against).

**Defers when sparse.** When past campaigns are absent (pre-launch brand; new-launch brand without campaign history), Stage 5 cannot validate. The architecture's content for the campaign-world reference function (per PR #239) is then unconfirmed by historical evidence and must rely on Stages 1–4 plus first-execution validation when the brand begins running campaigns.

**Iterative when.** Stage 5 surfaces evolution that contradicts earlier stages (sparse-articulation condition 4's past-vs-current case); the operator returns to whichever earlier stage holds the contradicted content and resolves per the layered fallback chain (current guidelines carry; past campaigns become continuity references whose deviation is noted, not authoritative — except when past-campaign deviation is the intended evolution, in which case the operator re-articulates the guideline).

### Stage 6 // Defaults

**Produces.** Phase 1 worked-example defaults populate IA carriers where Stages 1–5 produced sparse or empty content: HERO / PROFILE / DETAIL slot roles for SKU mode; HERO_GROUP / DETAIL_ADJACENCY for collection mode; per-mode role taxonomies; cleanest-case packet shapes; default curation patterns (per the foundational premise that governance-bearing curation always lives at the seam). The defaults are brand-agnostic systemic-pattern content; they give the IA structural shape without supplying brand-distinctive content.

**Depends on.** Stages 1–5 outputs (defaults populate where prior stages did not).

**Defers when sparse.** Defaults are deepest-layer fallback by construction; there is no further deferral.

**Iterative when.** Operator-authored content (Stage 7) replaces a default with brand-distinctive content; the operator marks the replacement and may use the difference as feedback to refine the brand-platform or photography-style-guide articulation upstream (a feedback path back to Stages 2–3 the dry run did not pressure but the architecture allows).

### Stage 7 // Inference / authorship

**Produces.** Two distinct outputs the predecessors blurred:

- **Inferred-not-stated content.** Operator marks content derived from Stages 1–5 evidence (where evidence existed but articulation did not) as inferred-not-stated. The derivation has an evidence basis; the inference has reasoning; both are reconstructable per the dry run's derivation-basis trace dimension.
- **Operator-authored content.** Operator marks content created where Stages 1–5 produced no usable evidence *and* the brand-system layer has no articulated content to fall back on (early-stage brands; pre-launch brands; brands in mid-rebrand without consolidated articulation). The operator authors brand-system content from worked-example defaults plus systemic patterns plus interpretive judgment. The authorship has reasoning but no upstream evidence basis to anchor it.

The two outputs are architecturally distinct (see [Fallback Behavior](#fallback-behavior) below). Inferred-not-stated content has a derivation chain back to evidence; operator-authored content does not. Treating them as the same case obscures where the architecture is functioning as digestion of existing brand content versus where it is functioning as authorship of brand content from scratch.

**Depends on.** Stages 1–6 outputs (Stage 7 names what those stages did not produce).

**Defers when sparse.** Stage 7 is the final stage; it does not defer further. Its output marks where the architecture has reached the limit of its current carriers.

**Iterative when.** Subsequent operational evidence (a brand running its first campaign cycles; an asset library accumulating from generation work; brand-platform articulation completing later) feeds back into Stages 1–5, and the operator returns to Stage 7 to demote previously-authored or previously-inferred content to its newly-evidenced equivalent.

### Dependencies and deferred items at-a-glance

The sequence is not strictly linear. Each stage depends on outputs from earlier stages but may iterate when later stages surface pressure. The deferred-item pattern is consistent across stages: when a stage's primary input is sparse, the stage produces thin content that subsequent stages compensate for, with Stages 6 and 7 catching what cannot be compensated by evidence- or articulation-based pathways.

The sequence integrates the six-layer fallback chain from the sparse-articulation pressure note rather than replacing it. The fallback chain is the *resolution mechanism within and across stages*; the extraction sequence is the *traversal order across stages*. The two compose:

- The fallback chain's `asset_library → photography_style_guide → brand_platform → intra_category_recency_specificity → phase_1_worked_example_defaults → inferred_not_stated` ordering describes which input carries when sources conflict at a single layer's content resolution.
- The extraction sequence's `evidence → articulated_conventions → abstraction → application → validation → defaults → inference/authorship` ordering describes which intake stage produces which IA content.

A given piece of IA content may pass through both: extracted at one stage's primary phase, validated at another stage, resolved against conflicting sources via the fallback chain, and ultimately marked with its derivation-basis if Stage 7's discipline holds.

## IA Layer Mapping

Each of the eight IA layers (per [`docs/architecture.md`](architecture.md) and [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md)) receives intake output. The mapping below names what intake produces at each layer using PR #239's reference-function taxonomy and normative-hierarchy framing, plus the Phase 2 deepenings' per-category contribution patterns.

The mapping does not propose new carriers. It articulates *what intake produces* at each layer given the carriers that exist (some structural, some prose, some unmodeled awaiting structural-decision resolution).

### Brand-system layer

**What intake produces.** Brand-system reference content (per PR #239's reference-function taxonomy first row): brand-wide visual logic, lighting register, tonal register, material rendering posture, color and finish behavior, photography conventions, applied imagery from the asset library, visual identity system constants. Also: brand platform's stance, voice register, exclusion boundaries — the abstract content that shapes downstream interpretation.

**Where it lives.** The brand-system layer carries no first-class structural carrier in the current IA; its structural decision is named at milestone 9 and unresolved. Intake output for this layer currently distributes as: VIS constants and approved-reference imagery held operator-side and surfaced into downstream packets via the existing lookup chain; brand-platform abstractions and photography-conventions prose held operator-side and absorbed downstream into prose carriers (`creative_intent`; `bounded_creative_discretion`; `slot_prompt`).

**Intake's job.** Capture the brand-system content honestly even though no first-class carrier exists. The brand-system hybrid carrier decision surface ([`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md)) named three live shapes for this layer; intake does not pre-commit to one. The architecture's three-zone implication (if hybrid is the surviving shape) — structural carriers for stable brand-wide constants + approved references; operator-mediated translation for prose-rich directive content; an unresolved third zone of intake-time judgment trace — defines the boundary intake operates within.

### Category / product-class layer

**What intake produces.** Category-typical photography adaptations, category-specific styling logic, category-typical environments, category-typical role inventories, product-class subdivision conventions. Per PR #239's dining-vs-bedroom conceptual contrast: lighting register plausibly inherits from brand-system layer cross-category under shared brand-system aesthetic; environment composition and product-class proportions are category-local.

**Where it lives.** Currently signaled-only in the IA — carried by worked-example naming convention and by per-SKU descriptive fields (`material_notes`; `finish_notes`; `identifying_details`). No first-class category-aesthetic carrier.

**Intake's job.** Identify the brand's category set, the product-class subdivisions within categories, and the category-specific adaptations of brand-system content. Mark what inherits from brand-system layer (lighting register) and what is category-local (environment composition; product-class proportions). Intake does not resolve the apex Named Limitation #1 question of whether category should become a first-class carrier; it surfaces the partial-inheritance behavior as content for the unmodeled-but-signaled layer.

### Mode-specific layer

**What intake produces.** Per-mode application content from application guidelines and past campaigns: which of the four worked-example modes the brand operates in (SKU-driven product imagery; collection / merchandising; marketing / message-driven; brand campaign / editorial); the per-mode templates and recurring patterns the brand uses; mode-specific overlay content for collection-grouping logic, marketing-message conventions, and campaign-concept articulation.

**Where it lives.** Each non-SKU mode carries at least one mode-specific layer between category and packet: collection adds a collection / grouping layer; marketing adds a message / offer / communication layer; campaign adds a campaign-concept layer plus a review-context / campaign-world coherence layer. Carriers vary per mode (some prose; some signaled via mode-specific fields; some paper-pressed as held composite-anchor candidates).

**Intake's job.** Resolve the brand's active mode set, the centrality of each mode (central / occasional / absent), and the per-mode templates the brand uses. Stage 5's past-campaigns validation often supplies the cleanest signal for mode-active status when application guidelines are sparse.

### Packet layer

**What intake produces.** Packet-template content per mode: recurring packet shapes ("we always need a hero plus three companions per email"); packet-level business_intent, creative_intent, and bounded_creative_discretion content; packet-level reference linkage (`approved_reference_keys`); packet-level constraint rules. Not packet *instantiation* (specific PKT-XXX-YYY records); the recurring shape the brand uses across its work.

**Where it lives.** The packet layer is the strongest current IA carrier — structural fields for intent and discretion plus reference linkage and constraint linkage. The packet layer carries the over-load named in the Phase 2 deepenings: aesthetic, intent, and (mode-specific) overlay responsibility concentrate here without structural separation.

**Intake's job.** Produce packet-template content for each active mode. Brand platform, photography style guide, and application guidelines all contribute (per the deepenings' per-category mapping). Intake produces the source material that fills the packet's existing carriers without pre-committing to whether the over-load should later split into separate carriers.

### Slot layer

**What intake produces.** Slot-role inventory per mode plus role-typical conventions: which roles recur per mode (HERO / PROFILE / DETAIL for SKU mode; HERO_GROUP / DETAIL_ADJACENCY for collection mode; hero / tight / supporting for marketing mode; per-arc roles for campaign mode); what role-typical composition, framing, and lighting conventions apply; per-touchpoint aspect-ratio and attention-budget rules.

**Where it lives.** `slot_role` enum carries role identity; `slot_prompt` text carries role-specific composition instructions; packet-level reference imagery surfaces into slot inputs via lookup. No slot-specific reference attachment is structurally first-class.

**Intake's job.** Produce slot-role inventory per mode from application guidelines and past campaigns; produce role-typical conventions from photography style guide and asset library. The slot-level composition / crop / role reference function (per PR #239) draws from photography conventions + role inheritance + per-touchpoint application — none of which has a slot-specific structural carrier; intake produces prose that absorbs into `slot_prompt`.

### Candidate generation layer

**What intake produces.** Nothing directly. Candidate generation is transient by design and produces no first-class entity; it operates downstream of intake.

**Where it lives.** Transient attachments resolved at the curation seam.

**Intake's job.** Surface the brand's stated tolerance for candidate volume and the brand's stated preference for curator narrowing patterns (single-round vs cross-round; agent-narrowed vs operator-direct) where the brand has articulated such preferences. Most brands have not; defaults to Phase 1 patterns.

### Curation seam

**What intake produces.** Judgment criteria for curation events: brand-value-fit criteria from brand platform; message-fit / family-coherence / campaign-concept-fit criteria from mode-specific content; product-truth-fidelity criteria from product-truth image content; exclusion criteria from brand platform exclusion boundaries and from photography style guide negative-direction content. Also: the brand's governance shape — who has authority over what, how approvals chain, where review-context functions as load-bearing versus useful-but-not-primary.

**Where it lives.** The curation seam carries clean structural carriers: five-axis provenance + `curator` + `curation_pattern` for candidate selection; `governed_output_status` + `governed_output_flag` + `asset_attachment` + `slot_status` lifecycle for governance-bearing curation. Reasoning content lives in `capture_reason` / `capture_notes` prose.

**Intake's job.** Produce the criteria content that downstream curation events apply, plus the governance-shape content that determines who exercises bounded discretion. Per PR #239's curation semantic split, intake produces criteria for both authorship-bearing discretion (variable site by mode) and governance-bearing curation (always at the seam); the split is not collapsed at intake time.

### Governed asset layer

**What intake produces.** Nothing directly. Governed assets are durable terminal outputs of the pipeline; they are produced downstream of intake.

**Where it lives.** `asset_attachment` carries the asset itself self-contained; `governed_output_status` and `governed_output_flag` carry lifecycle.

**Intake's job.** Surface the brand's stated reuse / derivative rules where the brand has articulated them — when a governed asset becomes a reference for a later packet, what governance applies to the derivative. The governed-output continuity reference function (per PR #239's ninth reference function) is currently unmodeled at first-class depth; intake produces prose that the architecture absorbs without a structural carrier.

## Fallback Behavior

The sparse-articulation fallback pressure note articulated five test conditions and a six-layer fallback chain. The dry run validated one walk on one sparse stack and produced an Outcome class 2 read (prose discipline sufficient under one-operator continuous context) plus a conditional pressure path bound to a scale condition untested.

This section integrates those findings and names six conditions intake encounters in operation. The first five extend the sparse-articulation note's conditions; the sixth is the case the predecessors only partially handled — operator-authored content as architecturally distinct from inferred-not-stated.

### Condition 1 // Sparse

Some input categories are present; others are thin or missing. The architecture's response: route through the six-layer fallback chain (`asset_library → photography_style_guide → brand_platform → intra_category_recency_specificity → phase_1_worked_example_defaults → inferred_not_stated`); cross-validate present sources; mark derived content with its evidence basis.

Predecessor depth-authority: sparse-articulation conditions 1–3.

The dry run walked one sparse case end-to-end. Trace dimensions surfaced: articulation-state at each layer; chain-position for each piece of resolved content; derivation-basis for each piece. None are structurally carried; prose discipline absorbs them. Outcome class 2 (prose discipline sufficient under one-operator continuous context) carries at current evidence depth.

### Condition 2 // Absent

An input category is entirely absent. The architecture's response: fall through to later chain positions; mark the absence at the layer level.

Predecessor depth-authority: sparse-articulation pressure note's discussion of partial-absence within conditions 1–3 + the dry run's Layer 2 + Layer 4 walks where the synthetic stack's photography style guide and intra-category-recency layers were absent.

The dry run surfaced *presence-of-inspection trace* as a fifth dimension not cleanly covered by the named held candidates: at each layer, did the operator inspect the layer? Absence of the layer's content does not distinguish "layer was checked and was empty" from "layer was not checked." Could compose into a broadened reading of `articulation_state` if that candidate is interpreted to include "layer not inspected" as a distinct value, or could surface as a separate candidate. Held.

### Condition 3 // Contradictory

Sources within a single input category disagree (e.g., multiple visual identity system documents with overlapping scopes); or sources across input categories disagree (e.g., brand platform values diverge from photography style guide register).

The architecture's response: route through the layered authority chain — most-recent + most-scope-specific articulation typically carries within an input category; visual-as-fidelity-strategy claim resolves cross-category prose-vs-image divergence (asset library carries). The operator-judgment protocol's eight-step shape supports the resolution work.

Predecessor depth-authority: sparse-articulation condition 4 (the operationally messiest condition); operator-judgment protocol Case 3 (conflicting VIS documents).

The dry-run's contradiction-resolution trace dimension was not pressured by the sparse-only walk; held for a contradictory-articulation walk that has not yet been authored.

### Condition 4 // Generic

Articulation is present but bland — values that could describe many brands ("authentic"; "premium"; "approachable"); photography conventions that name common practice without brand-distinctive specificity; asset library that demonstrates broad market norms rather than brand identity. Generic articulation provides little authoring signal beyond "don't violate it."

The architecture's response: derive brand-distinctive content from the most-distinctive available source (typically asset library if it has any distinctive segments; otherwise past campaigns if they exist); mark generic-articulation content as inferred-not-stated against the more-distinctive evidence; let operator authoring layered over the defaults supply brand-distinctive content if no distinctive source exists.

Predecessor depth-authority: sparse-articulation condition 4's generic-brand-platform case.

The architectural cost of generic articulation is that the IA's value-add becomes operational scaffolding rather than brand-distinctive carrying. The architecture holds; brand distinctiveness shifts to operator authoring.

### Condition 5 // Divergent

Sources within a category diverge stylistically rather than logically — different stylistic eras in the asset library; different sub-team work in the same library; photography style guide articulating one era while the most recent campaigns demonstrate another. The case differs from contradiction in that the divergence is real and meaningful (the brand is evolving) rather than a documentation inconsistency.

The architecture's response: operator identifies which register is current and operational; treats older registers as continuity references, not authority; surfaces the divergence as evolution-not-inconsistency.

Predecessor depth-authority: sparse-articulation condition 4's divergent-library-registers case; operator-judgment protocol Case 2 (brand platform divergence from asset library).

The divergent case sharpens the question of how intake handles brand-system updates over time (named as Open Question 2 in the Phase 2 opening sketch). Intake architecture as articulated treats the brand-system input as if it is static; in operation it is not. Whether intake architecture eventually accommodates versioned brand-system content, incremental revision, or re-intake cycles is unprobed.

### Condition 6 // Operator-authored

No brand-system articulation exists *and* no asset library exists *and* no past campaigns exist. Early-stage brands; pre-launch brands; brands in mid-rebrand without consolidated articulation. The architecture has no evidence and no articulation to digest; the operator authors brand-system content from scratch using worked-example defaults plus systemic patterns plus interpretive judgment.

This case is *architecturally distinct from inferred-not-stated*. Inferred-not-stated content is derived from evidence under sparsity (e.g., voice register inferred from the asset library's convergent tone in sparse-articulation condition 1's brand-platform-sparse case). The inference has an evidence basis even when articulation does not; the architecture's trace dimensions (presence-of-inspection; articulation-state; chain-position; derivation-basis) all apply.

Operator-authored content has no evidence basis. The operator authors *what the brand-system content should be*, drawing on worked-example defaults and interpretive judgment. The authorship has reasoning; the reasoning has no upstream anchor in articulation or evidence.

The predecessors handled operator-authored implicitly. Sparse-articulation condition 5 ("all three sparse") named the case operationally but framed it as "operator authors substantial brand-system content from scratch using systemic patterns" without distinguishing it architecturally from inferred-not-stated. The Phase 2 opening sketch's fallback model treated everything that fell through to the sixth chain position as inferred-not-stated. The dry run's synthetic stack was sparse but had partial articulation in three categories (audience cue in brand platform; logo + two colors in VIS; four product images in asset library); the walk did not pressure operator-authored as a distinct case.

Naming the case architecturally distinct surfaces the operating mode question: the architecture currently functions as **digestion** of existing brand-system content (Conditions 1–5); under Condition 6 it functions as **authoring** of brand-system content from scratch. Both are valid operating modes for the same intake architecture; the architecture does not currently distinguish them in its trace carriers.

The trace implication: derivation-basis as a dimension (per the dry run's fourth trace dimension) wants sub-classification as the dry run noted (lifted-verbatim / inferred-from-evidence / worked-example-default / unresolved-marked). The operator-authored case adds a fifth derivation-basis value: *operator-authored*. The fifth value is distinct from worked-example-default in that worked-example-default applies systemic patterns from Phase 1's worked-example evidence (e.g., "use the SKU-driven sketch's hero-slot pattern"); operator-authored applies operator interpretive judgment that extends beyond worked-example patterns into brand-distinctive content the operator originates.

The architectural posture: surface the distinction. Do not propose a structural carrier. The architecture's discipline is to mark operator-authored content honestly so that subsequent operational evidence (the brand actually running campaigns; the asset library accumulating from generation work; brand-platform articulation completing later) can demote previously-authored content to its newly-evidenced equivalent, with the demotion legible. Without the distinction, the demotion is invisible — operator-authored content reads identically to inferred-not-stated content even though their epistemic registers are different.

## Trace Requirements

PR #239 named brand digestion as the first of nine creative-discretion sites. Its per-site trace-gap analysis: *trace currently carried — none load-bearing in repo; intake decisions live operator-side. Trace missing / operator-continuous — why this brand-system content moved into this IA layer at this specificity; what was articulated vs inferred-not-stated.* Classification: authorship-bearing (under sparse articulation); confirmation-bearing (under rich articulation).

The dry run surfaced five trace dimensions, of which four map to milestone-9 held candidates and one is uncovered by named candidates:

1. **Presence-of-inspection trace.** At each layer, did the operator inspect the layer? Currently absent. Uncovered by named held candidates. May compose into `articulation_state` if interpreted broadly.
2. **Articulation-state trace.** At each layer, was the layer articulated, partial, generic, contradictory, divergent, or absent? Currently absent. Covered by milestone-9 held candidate `articulation_state` flag.
3. **Chain-position trace.** For each piece of resolved content, which fallback chain position produced it? Currently absent. Covered by milestone-9 held candidate `fallback_chain_position` annotation.
4. **Derivation-basis trace.** For each piece of resolved content, was it lifted, inferred from evidence (which evidence?), applied as worked-example default, or *operator-authored* (per Condition 6's architectural distinction above)? Currently absent. Covered by milestone-9 held candidate `derivation_basis` field; wants sub-classification.
5. **Contradiction-resolution trace.** When sources conflict, how was the conflict resolved? Not pressured by the sparse-only dry run. Covered by milestone-9 held candidate `contradiction_log` entity.

Integrating PR #239's brand-digestion site classification with the dry run's five dimensions plus the operator-authored Condition 6 distinction: the architecture's scale-legibility frontier upstream of operational testing concentrates at this site. Per PR #239's scale-legibility test criterion, a non-author operator should be able to reconstruct why a given reference, constraint, or piece of brand-system content applies at the layer it does, from the architecture alone. At one-operator continuous-context scale, the operator carries the trace verbally; prose discipline absorbs whatever the architecture's carriers do not. Beyond one-operator continuous context, the trace is structurally absent at all five dimensions.

The architecture does not commit to closing the trace gap. Scale beyond operator continuity is treated as an architectural premise of the project (per [`docs/architecture.md`](architecture.md)'s Scale-of-Operation Held Question reframe and grounding-note v58); scale legibility is the test criterion applied per layer and site. At the brand-digestion site specifically, the trace gap is named, the candidates that could close it are held without adjudication, and the operational pressure that would earn or deflate them (multi-operator or continuity-breaking intake) remains untested.

This artifact does not propose minimum-trace fields, does not propose schema, and does not adjudicate the held candidates. It integrates the prior work into a single trace-requirement statement: brand digestion as a site has five trace dimensions currently uncovered by structural carriers, four of which map to milestone-9 held candidates and one of which (presence-of-inspection) remains uncovered. The derivation-basis dimension wants sub-classification including operator-authored as a distinct value.

## Four-Mode Pressure

Each of the four worked-example modes (per Phase 1) draws on intake output differently. The patterns below are light, not deep — they name what intake produces for each mode without re-deriving per-mode IA content (which lives in the Phase 1 mode sketches and the cross-mode synthesis). Evidence depth is uneven across the modes (full-flow operational at SKU and collection; bounded full-flow at campaign; structural-proof-only at marketing) and the patterns reflect that asymmetry honestly.

### SKU-driven mode

**What intake produces for this mode.** Product-truth image content per SKU; per-SKU material / finish / identifying-details notes; brand-system aesthetic content as evidence-based context (asset library + photography style guide carries the primary load); packet-level reference imagery establishing the studio world; HERO / PROFILE / DETAIL slot-role inventory plus role-typical conventions.

**Intake's primary load.** Stage 1 (evidence) carries heaviest: the asset library populates `reference_assets` directly; per-SKU `product_image` content is the architecture's primary fidelity strategy. Stage 4 (application) is lightest — SKU-driven mode adds no mode-specific layer between category and packet.

**Mode-specific intake risks.** When the asset library is sparse for the specific product category, the architecture's visual-as-fidelity-strategy is operationally weaker; Stage 7 inferred-not-stated content fills the gap, but per-SKU product-truth must be supplied by the brand directly (no fallback substitutes for it).

Evidence depth: full-flow operational at PKT-SKU-007 / 009 / 010.

### Collection / merchandising mode

**What intake produces for this mode.** Family-coherence reference content (per PR #239's third reference function) derived from asset library segments where multi-SKU collections appear; collection-axis intake (constituent set; grouping logic; cross-axis selection criteria); HERO_GROUP / DETAIL_ADJACENCY role inventory; collection-mode-specific overlay content (the collection / grouping layer's content).

**Intake's primary load.** Stage 1 (evidence) plus Stage 2 (articulated conventions) carry the family-coherence reference content; Stage 4 (application) supplies the collection-axis intake and per-touchpoint application of the grouping; Stage 5 (validation) is load-bearing when past campaigns include collection-shaped work.

**Mode-specific intake risks.** The 1:N slot-product cardinality strain (collection-mode operational test finding) is sharpest under intake conditions where the asset library does not include multi-SKU collection imagery; intake must produce cross-axis selection criteria from photography style guide + brand platform without operational evidence. Currently prose-carried; held composite-anchor candidate was operationally deflated.

Evidence depth: full-flow operational at PKT-COLL-001.

### Marketing / message-driven mode

**What intake produces for this mode.** Message-bearing reference content (per PR #239's fifth reference function); per-touchpoint application content from application guidelines (aspect ratios; attention-budget conventions; copy-overlay rules; brand-identifier presence rules); marketing-mode-specific overlay content (the message / offer / communication layer's content).

**Intake's primary load.** Stage 4 (application) carries heaviest: marketing mode is touchpoint-shaped at every slot, and application guidelines articulate the touchpoint-specific constraints. Stage 1 (evidence) is partial — the asset library typically includes marketing-mode imagery, but message-bearing conventions are often implicit rather than demonstrated as a separable segment. Stage 2 (articulated conventions) is variable — photography style guide may articulate touchpoint adaptations or may not.

**Mode-specific intake risks.** Marketing-mode IA content has not been operationally pressured at full-flow depth (cycle-1 structural-proof only at PKT-MSG-001); the held composite-anchor candidate (`messages` / `briefs` first-class entity), structured slot-message-element fields, and `selection_axis` enum are all paper-pressed and operationally untested. Intake produces content that absorbs into existing prose carriers; what would change under marketing-mode full-flow operational pressure is unprobed.

Evidence depth: structural-proof only at PKT-MSG-001 cycle 1; full-flow untested.

### Brand campaign / editorial mode

**What intake produces for this mode.** Campaign-world reference content (per PR #239's fourth reference function); campaign-concept articulation (paper-pressed as held candidate `campaign_concept`); campaign-mode-specific overlay content (the campaign concept layer's content plus the review-context / campaign-world coherence layer's content); per-product campaign-shaped imagery; the heaviest cross-category abstraction content of any mode.

**Intake's primary load.** Stage 5 (validation via past campaigns) carries heaviest when the brand has campaign history; Stage 3 (abstraction) is load-bearing because campaign-world reference draws on brand platform stance and exclusion boundaries; Stage 1 (evidence) supplies the campaign-world reference imagery from the asset library's editorial / campaign segments.

**Mode-specific intake risks.** PR #239's curation semantic split (authorship-bearing discretion variable site; governance-bearing curation always at the seam) was articulated by the campaign-mode fork-resolver test (PKT-CAMP-004) where authorship-bearing discretion surfaced upstream at prompt-authoring (LIFE_IN_USE) and prompt-remediation (OBJECT_VIGNETTE) rather than at the curation seam. Intake for campaign mode produces the campaign-world reference content that *upstream* authorship-bearing work operates against; the trace gap for prompt-authoring and prompt-remediation as discretion sites (PR #239's seventh and eighth sites) compounds with the brand-digestion site's trace gap, since both feed campaign-mode IA content with operator-continuous interpretation.

Evidence depth: bounded full-flow at PKT-CAMP-004; structural-proof at PKT-CAMP-001; schema-mirror at the Campaign-Driven D2C Home-Goods v1 base.

### What four-mode pressure clarifies

The four-mode pressure clarifies what intake's stage-load and risk distribution looks like across modes without proposing per-mode intake mechanics. Stage 1 (evidence) is load-bearing in SKU and collection modes where asset library content most directly populates structural carriers. Stage 4 (application) is load-bearing in marketing mode where touchpoint constraints dominate. Stages 3 (abstraction) + 5 (validation) are load-bearing in campaign mode where brand platform stance feeds campaign-concept articulation and past-campaigns validate.

The pressure does not propose full-flow intake-to-output operational claims for any mode beyond the depth the Phase 1 + Phase 2 work already earned. Marketing mode in particular has only structural-proof depth; intake claims for it remain paper.

## Earned vs Held

What the integration clarifies at this evidence depth:

- **Intake itself is layered.** The intake architecture has shape that maps onto the IA's layered structure: input categories of differing content shapes feed an extraction sequence of differing stage loads, producing content at each of the eight IA layers via reference functions of differing carrier coverage, resolved against fallback conditions of differing operator-judgment burden, with trace requirements of differing structural coverage. The shape is articulable independently of any particular brand's stack, any particular intake mechanic, and any particular UI.
- **Evidence-first extraction tracks the architecture's structural-carrier distribution more legibly than abstraction-first.** The Phase 2 opening sketch's broad-to-specific sequence was reasonable at sketch depth; the deepenings and PR #239 surface that structural carriers concentrate at the evidence layer (`reference_assets`; product-truth `product_image`; per-SKU descriptive fields), with brand-platform abstraction and photography-style-guide articulated conventions flowing downstream as operator-interpretive guidance into prose. Evidence-first extraction populates the structural carriers before loading operator-interpretive burden; abstraction-first loads operator-interpretive burden before the evidence-based grounding that would anchor it.
- **Operator-authored content is architecturally distinct from inferred-not-stated.** Inferred-not-stated content has an evidence basis; operator-authored content does not. Treating them as the same case obscures whether the architecture is functioning as digestion of existing brand content or as authoring of brand content from scratch. The derivation-basis trace dimension wants sub-classification including operator-authored as a fifth value.
- **Brand digestion's trace gap carries the architecture's scale-legibility frontier upstream of operational testing.** PR #239 named brand digestion as the first of nine discretion sites; its trace gap currently relies on operator-continuous interpretation. The five trace dimensions surfaced by the dry run plus the operator-authored distinction compose into a complete trace-requirement statement at this site; closing the gap would require operational pressure beyond one-operator continuous context.

What remains held — unchanged by this artifact:

- **Brand-system layer structural decision.** Three live shapes (first-class throughout / terminal operator-mediated / hybrid; hybrid most likely on current evidence per the hybrid carrier decision surface v1). The integration above describes how content flows under each of the three shapes without pre-committing.
- **Apex Named Limitations.** All three carried forward unchanged. The integration does not earn aesthetic-carrier schema (#1), formal precedence rule for inheritance / override (#2), or cross-base / cross-category / cross-brand pressure plus marketing- and campaign-mode operational evidence at full-flow depth beyond the bounded depth already earned (#3).
- **Held composite-anchor and structural-carrier candidates.** Marketing-mode `messages` / `briefs`; campaign-mode `campaign_concept`; structured slot-message-element fields; `selection_axis` enum; reference-type tag with two divergent category proposals; `brand_platforms` first-class entity; brand-wide constants first-class entity; approval-state metadata; `rejected_assets` entity; `articulation_state` flag; `derivation_basis` field; `fallback_chain_position` annotation; `worked_example_defaults` carrier; `contradiction_log` entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints. None earned by this artifact. The fifth derivation-basis value (operator-authored) is articulated as a content distinction without proposing it as a structural carrier or sub-field.
- **Upstream judgment trace minimum.** The architecture's minimum-trace question for brand digestion (and for the other upstream authorship-bearing sites named in PR #239 — reference selection, layer translation, packet authorship, slot authorship, prompt remediation, override / exception handling) remains open. No held candidate is adjudicated.
- **Application guidelines and past-campaigns deepenings.** Two of six brand-system input categories remain unprobed at deepening depth. The category map above treats them at category-map depth only.
- **Brand-system updates over time.** How intake handles versioned brand-system content, incremental revision, or re-intake cycles is unprobed (Phase 2 opening sketch Open Question 2). Condition 5 (divergent) sharpens the question without resolving it.
- **Sub-brand inheritance and multi-system brands.** How intake handles parent-brand + sub-brand inheritance, product-line-specific overlays, or cross-market adaptations is unprobed (Phase 2 opening sketch Open Question 3).

What this artifact explicitly does not do:

- Propose schema mutations
- Adjudicate any held candidate, including the five-derivation-basis-value sub-classification surfaced under Condition 6
- Resolve the brand-system layer structural decision, the curation-premise architectural fork, or any Apex Named Limitation
- Modify the structured IA model v1 or its YAML appendix
- Modify `docs/architecture.md`, `docs/index.md`, `README.md`, `docs/method.md`, `AGENTS.md`, or any milestone marker
- Modify the grounding note
- Author orchestration semantics for the durable layer
- Authorize Airtable mutation, schema mutation, validator integration, Pydantic implementation, or intake-form / UI design
- Introduce a new synthetic brand-system stack (the dry run's stack is referenced once as established precedent for fallback-chain traversal under sparse articulation; no new stack is authored)
- Operationalize any non-SKU mode beyond the depth already earned
- Pressure the brand-system structural decision, the curation-premise fork, or the Scale-of-Operation Held Question beyond the integration above

## Self-Superseding Clause

This artifact is a v1 integration attempt. It should be superseded by:

- An operational test that pressures the extraction sequence against a real brand-system stack at any non-trivial depth (would surface where the evidence-first ordering holds or strains under operational pressure)
- An operational test that pressures Condition 6 (operator-authored) directly — intake against a stack with no articulation, no asset library, and no past campaigns — and surfaces whether the architectural distinction from inferred-not-stated carries or collapses
- An operational test that resolves the brand-digestion site's trace gap by pressuring multi-operator or continuity-breaking intake (would operationally earn or deflate the conditional pressure path the dry run named)
- A subsequent input-category deepening for application guidelines or past campaigns that pressures the category map's depth-authority pattern
- A subsequent milestone marker that absorbs this integration into the architecture front door alongside any operational evidence that earns it
- The eventual rewrite of `docs/architecture.md` that consolidates the apex artifact, the Phase 1 mode sketches, the Phase 2 deepenings, the structured IA model v1, the post-milestone-9 pressure sequence, PR #239, and this artifact into a single current-architecture document

It does not supersede the Phase 2 opening sketch, the four deepenings, the sparse-articulation fallback pressure note, the brand intake judgment-trace dry run v1, the operator-judgment protocol sketch v1, the structured IA model v1, the normative-force pass v1, the brand-system hybrid carrier decision surface v1, the layered reference and discretion architecture v1, the Phase 1 mode sketches, the Phase 1 cross-mode synthesis, the apex definition-layer artifact, milestone 8, or milestone 9. Those remain authoritative for their subject matter; this artifact reads them at integration depth without re-deriving content.

## Anchor Documents

### Direct framing predecessors (Phase 2 brand-discovery / digestion chain)

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; six input categories; intake-to-IA mapping at sketch depth; discovery sequence; fallback model
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): depth-authority for photography style guide as articulated visual conventions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): depth-authority for asset library as demonstrated visual evidence; surfaces input category most directly served by existing structural carriers
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): depth-authority for brand platform as non-visual articulation-only abstraction; concretizes Named Limitation #1 from abstraction angle
- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md): depth-authority for visual identity system as hybrid-shape constants + applied conventions; concretizes Named Limitation #1 from concrete-constants angle
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): six-layer fallback chain; five sparse-articulation conditions; five paper-pressed structural-carrier candidates
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): one walk on one synthetic sparse stack; five trace dimensions; Outcome class 2 read at current evidence depth; conditional pressure path Outcome class 1 bound to scale condition untested
- [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md): eight-step protocol shape for operator translation work; three anchored cases (sparse VIS articulation; brand platform divergence from asset library; conflicting VIS documents)

### Architectural integration predecessors

- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): nine-fold reference-function taxonomy; eight-layer normative hierarchy; nine-site creative-discretion decomposition with per-site trace-gap analysis; scale-legibility test criterion; brand digestion as first of nine discretion sites
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary; three-row conversion-criteria pressure
- [`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md): three-shape comparison for the brand-system layer's structural decision; three-zone implication if hybrid is the surviving shape
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): IA layered-content redirection that opened the Phase 1 + Phase 2 trajectory

### Architectural framing this artifact reads against

- [`docs/architecture.md`](architecture.md): current-architecture front door; Brand-System Layer Status; Curation-Premise Architectural Fork; Scale-of-Operation Held Question; layered IA as normative hierarchy
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; three Named Limitations carried forward
- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): canonical structured form (prose primary + YAML appendix); held candidates inventoried in prose
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): Phase 1 cross-mode synthesis; carrier-status matrix
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode layered-content articulation
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode layered-content articulation
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode layered-content articulation
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode layered-content articulation

### Operational evidence the integration reads against

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): PKT-SKU-009 full-flow operational evidence
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): PKT-SKU-010 full-flow operational evidence
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): PKT-COLL-001 full-flow operational evidence; composite-anchor candidate operationally deflated
- [`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md): PKT-CAMP-004 bounded `refines` reading; curation semantic split surfaced
- [`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md): PKT-MSG-001 structural-proof depth

### Plateau markers

- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): current plateau
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): prior plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
