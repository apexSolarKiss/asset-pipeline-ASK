# Architecture

The goal of this repository is to define a structured information architecture for scalable visual asset production systems, with particular emphasis on how style guides, creative rules, and other governing constraints can become machine-usable normative structure for production workflows that include AI generation.

At this stage, the correct architecture is the smallest honest architecture: enough structure to support disciplined design, but not so much structure that it hardens assumptions that have not yet earned permanence.

The architecture is intentionally high-level and leaves major design questions open, including:

- workflow taxonomy
- ontology for intent, inputs, constraints, orchestration, outputs, and governance
- where authorship-bearing discretion enters and where governance-bearing curation resolves
- where constraints bound that discretion
- where approvals and override points live
- whether the brand-system layer eventually carries first-class structural representation, terminal operator-mediated translation, or a hybrid
- how the system extends from still image to video
- how deterministic layers relate to agent-assisted layers

The campaign-mode fork-resolver test (`PKT-CAMP-004`; Phase D bounded `refines` reading) and the visual identity system deepening have pressured several of these open questions at bounded depth; the architecture has absorbed the pressure into the current shape below but has not closed any of them.

The repository is expected to support still-image workflows first. Video should be treated as an extension path, not as a reason to prematurely over-generalize the initial architecture.

## Purpose / Current Posture

This file is the **current-architecture front door**: a concise statement of where the architecture currently sits, what it has earned, and where the substantive content lives. It routes to depth rather than reproducing detail. Two statuses, kept distinct: the **latest evidence plateau** is [milestone 15](milestones/milestone-15-resolution-calculus-and-instantiation-consumer-evidence-plateau.md); the **governing architecture posture** remains [milestone 14](milestones/milestone-14-portability-frontier-separation.md)'s portability-frontier separation (package recovery / auditability / consumability — the consuming-artifact run found the current application grammar is the wrong consumer for a package instance, redirecting the frontier to the open question *what consumes a package, and is one needed*). Milestone 15 adds bounded resolution-calculus evidence (determinate at tested A1 depth) and one calibrated package-instantiation planning consumer (one known-achievable filesystem target); it explicitly earns no consuming grammar, general converter, repeatable consumer, schema, validator, or runtime. Read against both for the architecture's full state.

This file's claims are scoped to evidence depth, distinct from the project's target layer.

- **Target layer**: machine-usable normative structure / durable spec layer above changing tools and models (per `README.md`).
- **Current state**: structured IA model v2 (hybrid prose + YAML appendix) is a machine-*readable* enumeration. It is not a machine-*usable* runtime spec — no code path currently consumes the YAML appendix as orchestration input. The application-layer artifact grammar (see Application-Layer Outputs below) is the first concrete internal consumer; it consumes v2 conceptually, not structurally. The structured-consumer preflight ([structured-ia-v2-consumer-preflight-v1.md](structured-ia-v2-consumer-preflight-v1.md)) names what would justify v2 advancing to a structured-consumer-bearing form.
- **Portability**: the durable-layer-above-tools claim now carries the first bounded portability evidence outside Airtable shape — a data-shape extraction, one proven package instance re-expressed and walked to instantiation-plan depth, and that one package now **held in a second substrate (a file-bundle worked package store) and recovered from it** by a fresh-reader recovery test (see Portability / Extractability below). The earned claim stays narrow — one package, one second substrate, recovered from that store — and stops short of runtime machine-usability. One bounded package-instantiation planning consumer has been calibrated on one known-achievable filesystem target; no runtime consumer, reusable consuming grammar, general converter, validator, or operational cross-substrate executor exists.

For routing to specific depth artifacts, see Source-of-Truth Routing below. For full repo navigation, see [docs/index.md](index.md).

## Current Architecture Shape

**Layers.** Eight IA layers carry across the four worked-example modes. The layered IA is a normative hierarchy: each layer carries normative authority over downstream layers; the inheritance / override / combination / conflict behavior between layers is the normative-hierarchy mechanism the architecture implements (depth: [layered-reference-and-discretion-architecture-v1.md](layered-reference-and-discretion-architecture-v1.md)). These eight span two different meanings of "layer" — five **scope / inheritance layers** (where content lives; how it inherits and overrides) and three **runtime / process layers** (stages in the generation-to-governance flow). The eight-layer count is preserved for continuity; the two meanings are labeled below and disambiguated in [layer-disambiguation-note-v1.md](layer-disambiguation-note-v1.md).

*Scope / inheritance layers (Axis B):*

- **brand-system layer** — currently unmodeled in IA; the brand platform and visual identity system deepenings concretize this as a real architectural gap; substantively narrowed by the brand-system carrier decision surface v2 (see Brand-System Layer Status below)
- **category / product-class layer** — signaled-only; not first-class; inheritance from brand-system is partial (lighting register plausibly inherits cross-category under shared brand-system aesthetic; environment composition and product-class proportions are category-local)
- **mode-specific layer** — varies by mode
- **packet layer** — strongest current carrier
- **slot layer** — role-specific narrowing

*Runtime / process layers (Axis D):*

- **candidate generation layer** — transient attachments
- **curation seam** — three acts, which may co-locate or separate:
  - **authorship-bearing discretion** (where creative judgment actually happens; site varies by mode and packet; appears concentrated at the seam in SKU-mode evidence; surfaced upstream at prompt-authoring and prompt-remediation in campaign-mode evidence)
  - **selection** (the adjudicative act: choosing one candidate and making it true to the intent — the decision)
  - **governance-bearing curation** (artifact governance — the mechanism binding the accepted artifact to its claim, use, and answerability; output becomes governed asset; always at the seam. Its **governance record** — five-axis provenance + curator + `curation_pattern` — is the durable trace and stated basis, not the governance function itself)
  - These may co-locate (SKU evidence appears to) or separate (campaign-mode evidence at PKT-CAMP-004 did)
- **governed asset layer** — durable terminal output; carries `asset_attachment` self-contained writeback

**Definition-layer chain.** The runtime layers above carry the tail of one ordered chain the definition layer exists to keep distinct: **creative intent** (the aim) → the **standards** that envelope it (constraints, references, output role, decision owner) → **creative discretion** (the bounded, reviewable judgment that opens the aperture and is exercised at selection to close it) → the **aperture** of permitted variance → **generation / execution** (fills the aperture with candidate variance) → **selection** (the adjudicative transition that chooses one candidate and makes it true to the intent) → **governance** (artifact governance — the mechanism binding the accepted artifact; its **governance record** is the durable trace and stated basis). The correction this makes architectural: **selection sits between generation and governance** — selection is the adjudicative transition, distinct from both; the governance record is governance's durable trace, not the governance function itself, and not the selection. This names the distinctions the open questions above flag ("where discretion enters," "where approvals live"); what remains open is which carrier holds each link, not whether the links are distinct. Stated at doctrine altitude in [creative-discretion-doctrine-v1.md](creative-discretion-doctrine-v1.md).

**Modes.** Four worked-example modes, each with a mode-specific layer between category and packet (SKU-driven mode has none; brand campaign / editorial mode has two):

- SKU-driven product imagery — no mode-specific layer; SKU is the anchor
- collection / merchandising — collection / grouping layer
- marketing / message-driven — message / offer / communication layer
- brand campaign / editorial — campaign concept layer + review-context / campaign-world coherence layer

**Carriers.** Five carrier types observed: prose carriers; structural carriers; visual reference carriers; governance carriers; held candidates (paper-pressed but not earned). Carrier distribution varies by content category.

**Normative-force vocabulary.** Six kinds of normative force articulate what kind of authority each piece of information carries: **descriptive** (what is true); **directive** (what should happen); **constraint** (what must not be violated); **reference** (what visually anchors interpretation); **judgment** (what was resolved by a human, operator, or agent); **governance** (what elevates output into governed asset identity). Depth: [normative-force-and-durable-layer-pressure-v1.md](normative-force-and-durable-layer-pressure-v1.md).

**Implementation entry surface.** Brand discovery / digestion is the surface where brand-system input enters the layered IA before any tool implementation begins. All six brand-system input categories (photography / image style guide; asset library; brand platform; visual identity system; application guidelines; past campaigns) are at deepening depth. Modeled as a layered intake architecture and synthesized across the six categories. Depth: [brand-discovery-digestion-layered-intake-architecture-v1.md](brand-discovery-digestion-layered-intake-architecture-v1.md) + [brand-system-input-cross-category-synthesis-v1.md](brand-system-input-cross-category-synthesis-v1.md).

**Fallback chain.** When brand-system input is sparse, contradictory, or absent, the architecture falls back through an ordered six-layer chain: asset library → photography style guide → brand platform → intra-category recency / specificity → Phase 1 worked-example defaults → operator-marked inferred-not-stated. Operator judgment becomes load-bearing under stress; the architecture surfaces options at each conflict point but does not auto-resolve.

## Evidence Depth

What's been earned at the current plateau:

**Operationally grounded (full-flow generation → curation → governance).** SKU-driven mode at PKT-SKU-007 / 009 / 010 (five-axis provenance + curator + `curation_pattern` + `asset_attachment` carry cleanly); collection / merchandising mode at PKT-COLL-001 (paper-strain composite-anchor mutation operationally deflated; prose discipline carried 1:N constituent enumeration cleanly); brand campaign / editorial mode at PKT-CAMP-004-KITCHEN_PREP at bounded depth (three slots; three `generated_assets` rows; all three curation events `confirmation-bearing`; upstream authorship-bearing work at LIFE_IN_USE prompt-authoring and OBJECT_VIGNETTE prompt-remediation; Phase D recommendation `refines` as bounded read, held for further pressure-testing); marketing / message-driven mode at PKT-MSG-HG-001 / SLOT-MSG-HG-001-HERO at bounded message-hero-slot depth in the integrated four-workflow base (in-base generation → candidate accumulation → authorship-bearing selection → governed `ASSET-MSG-HG-001-HERO-001`; no external import; the 2c proof — support slot held; full marketing mode not closed).

**Structurally proven; not full-flow operationally pressured.** Marketing / message-driven mode's earlier PKT-MSG-001 probe (cycle 1, `findings-only`) — distinct from the PKT-MSG-HG-001 message-hero full-flow above; brand campaign / editorial mode at PKT-CAMP-001 (cycle 1 rerun) plus the Phase 1 Campaign-Driven D2C Home-Goods v1 base setup (95-field schema mirror in a separate base; cross-base + cross-brand evidence at bounded depth).

**Paper-pressed; not yet operationally tested.** Cross-mode composite-anchor candidates; structured slot-message-element fields; selection-axis enum classification; reference-type tag; brand-platform first-class entity; brand-wide constants first-class entity (VIS-pressured); approval-state metadata; rejected-assets entity; articulation-state flag; derivation-basis field; fallback-chain-position annotation; worked-example-defaults carrier; contradiction-log entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints. None earned by operational pressure.

**Schema is mode-independent at structural level.** The same packet-and-seam schema carried all four worked-example modes at first-pass depth, with full-flow operational depth varying per the rows above.

The visual-as-fidelity-strategy claim from the apex aesthetic-layering pass holds operationally (SKU + collection) and is reciprocally established on paper by the Phase 2 visual-input pair (photography style guide articulates conventions; asset library demonstrates them; when they diverge, the library carries). The VIS deepening adds that brand-wide visual *constants* (logo, typography, color, grid) carry articulated structure of their own that the IA has no first-class carrier for.

## Structured Form and Consumers

**Canonical structured form.** The structured IA model v2 ([structured-ia-model-v2.md](structured-ia-model-v2.md)) carries the stable enumeration as a machine-readable YAML appendix (17 top-level keys) alongside prose for unresolved content. The YAML is bounded: held questions are encoded as markers, not as structural representations of question content; held schema candidates remain in prose. v2 supersedes v1 at the structured-form layer; [v1](structured-ia-model-v1.md) is preserved as predecessor structured form.

**Structured-consumer preflight.** The preflight ([structured-ia-v2-consumer-preflight-v1.md](structured-ia-v2-consumer-preflight-v1.md)) reads v2 against seven candidate structured consumers (artifact grammar generator; validator / linting pass; Airtable base-plan generator; Python scaffold generator; DAM taxonomy generator; provenance / confidence checker; documentation / HTML map generator) at four depth bands (conceptual; semi-structured; structured; runtime / orchestration). v2 currently supports stable enumeration lookup, vocabulary lookup for translation surfaces, author-side reasoning support, documentation generation, weak linting against vocabulary, and held-question surfacing. v2 does not currently support runtime orchestration, field / entity placement, schema generation, validator rules with pass / fail semantics, carrier-shape instantiation, mode-complete implementation generation, cross-category dependency-graph traversal, or extraction-sequence behavior enforcement. v2 is sufficient for the artifact-grammar path at conceptual-consumer depth. Advancing v2 to a structured-consumer-bearing form (v3 absorption) is justified when an operational consumer demands a structural representation v2 currently leaves prose; no such consumer is currently live.

## Portability / Extractability

The headline target is a durable definition layer above changing tools and models. Two bounded legs now pressure whether that layer is expressible outside Airtable shape; they are complementary, not redos of each other.

- **Data-shape extraction (SKU slice).** [non-airtable-extraction-attempt-v1.md](non-airtable-extraction-attempt-v1.md) extracted a representative SKU-driven slice into JSON Schema plus a minimal JSON instance. Finding: the relational data shape is portable; the interpretive / procedural layer (inheritance, override, the curation semantic split, held questions, operator judgment) is not yet portable.
- **Package extraction (proven 2c instance).** [portable-package-extraction-2c-marketing-hero-v1.md](portable-package-extraction-2c-marketing-hero-v1.md) re-expresses the proven 2c marketing-hero package — the one chain proven end to end in-base — outside Airtable as a hybrid prose walk + tool-agnostic YAML package-instance appendix, walked to instantiation-plan depth (a second substrate must *represent / preserve / support* named capabilities — conceptual, not entity design). The full creative intent → creative discretion → variance → selection → governance chain reads without Airtable; the Airtable-shaped couplings (the attachment-id candidate→asset link, the candidate attachment-array, the Path-B capture copy) are surfaced and quarantined as substrate detail, not package content.
- **Package instantiation (worked package store evidence).** [docs/worked-package-store-2c-marketing-hero/](worked-package-store-2c-marketing-hero/) holds the proven 2c package as data in a file-bundle second substrate (no image bytes — references / filenames / empty hash slots), and a fresh-reader recovery test recovered the full creative intent → creative discretion → variance → selection → governance chain from the store alone (8/8, PASS; evidence in the store's `_recovery-test.md`). This is the instantiation-evidence surface: the couplings the package extraction flagged are replaced by substrate-neutral keys (a synthetic phase-explicit candidate id; the selected-candidate → governed-asset link; generation settings held apart from prompt text), and the store's own mechanics are quarantined from package content. The claim stays narrow — one package, one second substrate, recovered from that store.

**Claim boundary.** Earned: the data shape is portable; one proven package instance is re-expressible outside Airtable and walkable to instantiation-plan depth; and that one package is now **held in a second substrate** (the file-bundle worked package store) and **recovered from it** by a fresh-reader recovery test — the first bounded portability evidence outside Airtable shape. Not earned / not authorized: additional package stores by default; a reusable package grammar; a runtime consumer that reads a package instance; a schema / validator / orchestrator / structured IA model v3; an all-mode system; image-byte storage; new generation proof.

## Application-Layer Outputs

**One generated-output substrate currently has an artifact grammar.** The implementation roadmap + system map hybrid grammar ([implementation-roadmap-system-map-artifact-grammar-v1.md](application/implementation-roadmap-system-map-artifact-grammar-v1.md)) fixes a ten-section skeleton, per-section content rules, source-to-section mapping from the brand-system input categories to artifact sections, repo-concept consumption map, translation rules from repo vocabulary to generated-artifact prose, provenance / confidence grammar (inline tag plus appendix table), system-map grammar, roadmap grammar, substrate-recommendation grammar, and application-consumer-distance guidance.

**One application-consumer pressure pass surfaces an architectural category.** The pressure pass ([artifact-grammar-consumer-pressure-v1.md](application/artifact-grammar-consumer-pressure-v1.md)) reads the grammar back into the architecture at one-consumer depth and surfaces the **conceptual-vs-vocabular split** as a real architectural category: some repo content earns its keep as reasoning substrate but does not become consumer-facing vocabulary commitment. The pass sorts repo concepts into near-seam (cleanly consumed), conditional, downstream (post-generation), and indefinite-park (no foreseeable consumer at this grammar) buckets — observational guidance, not closure.

**Sibling substrates implied but not authored.** Airtable base-plan grammar, Python scaffold grammar, DAM taxonomy grammar, operating-documentation grammar, hybrid grammars — each would be a separate application-layer artifact at the same depth as the implementation-roadmap-system-map grammar. None authorized.

Application sub-tree navigation: [docs/application/README.md](application/README.md).

## Held Questions / Parked Surfaces

Carried forward unresolved at this plateau. Three are treated as named structural concerns; the remaining held items are inventoried.

### Curation-Premise Architectural Fork

The foundational premise that curation is the singular runtime creative-discretionary act and generation is mechanical was load-bearing across the architecture as previously stated. The PKT-CAMP-004 fork-resolver test bounded-pressured the premise (depth: [campaign-mode-fork-resolver-test-phase-d-findings-v1.md](campaign-mode-fork-resolver-test-phase-d-findings-v1.md)): all three curation events were `confirmation-bearing`, and authorship-bearing work surfaced upstream at prompt-authoring and prompt-remediation. The bounded reading at PKT-CAMP-004 scope is `refines`: upstream authorship-bearing moments shape the candidate set; curation ratifies or rejects their output. `fragments` is preserved as a named falsification path.

The substantive refinement is the **curation semantic split**: authorship-bearing discretion (variable site by mode and packet) is distinct from governance-bearing curation (always at the seam). The normative-force pass v1 articulates this as judgment-force-kind appearing at multiple sites of authorship-bearing form, with governance-force-kind always at the seam.

Mode-weighted standing: SKU-driven and collection evidence continue to support curation as a strong authorship-bearing governance seam (authorship and governance appear to co-locate). Campaign-mode evidence (PKT-CAMP-004) showed the two senses separating. Marketing-mode and broader cross-brand / cross-category operational evidence remain unearned. The fork is not closed; the bounded `refines` read is held for further pressure-testing.

### Brand-System Layer Status (Named Structural Decision)

The brand-system layer's unmodeled status is a named structural decision, not a deferred limitation. The brand platform and visual identity system deepenings pressured it from two angles: abstraction (positioning, voice, values, audience — almost entirely prose-carried with structural void) and concrete constants (logo, typography, color codes, grid — brand-wide articulated constants with no first-class IA home).

The brand-system carrier decision surface v2 ([brand-system-carrier-decision-surface-v2.md](brand-system-carrier-decision-surface-v2.md)) substantively narrows the decision. Of the surfaced zones:

- **Zone 1A** (approved reference imagery) — structurally earned via the existing `reference_assets` + lookup chain + `asset_attachment` carriers (operationally tested across SKU + collection mode)
- **Zone 1B** (brand-wide constants beyond approved references: color codes, typeface assignments, logo files as URLs, grid systems) — structurally suggested but **held**; this is the residual brand-system-layer carrier question
- **Zone 2** (prose / operator-mediated translation for abstraction and articulated conventions) — deliberate prose at current depth, not a deferred decision
- **Zones 3–6** (per-touchpoint constraint representation; governed-output continuity reference elevation; temporal-state trace; intake-time judgment trace) — real held architectural questions but **rerouted to adjacent architectural locations** (packet/slot layer; governed-asset / reference-linkage layer; reference-asset lifecycle layer; intake / governance layer respectively) — not brand-system-layer carrier questions

Hybrid is essentially already in operation at the brand-system layer (Zone 1A structural + Zone 2 prose). The residual structural decision has narrowed to whether to extend Zone 1's structural coverage to constants beyond approved references.

### Scale-of-Operation Held Question

Scale beyond operator continuity is an architectural premise of the project per the grounding note's stated purpose (scalable production pipelines for commercial visual assets), not a strategic fork. The held question is what trace and layer structure makes that generalization legible — not whether scale matters. Scale legibility is a test criterion applied per layer and per discretion site.

At current evidence depth, prose discipline carries the intake-time judgment trace under one-operator continuous-context scale: operator continuity provides the bridge that structural carriers would otherwise have to provide. The same operator-continuity-vs-structural-trace pattern may apply at curation seam, at packet authorship, and at any judgment site where operator continuity has been the load-bearing carrier.

Post-milestone-10, operational pressure on this question accumulated through three architecturally-distinct seams — intake-time judgment trace; intake-time reference rationale; reuse-time governed-output governance. Each produced a design-surface → operational-pressure → high-reconstruction-success → carrier-shape **sharpened-not-closed** pattern at one-reader / one-substrate / mocked-shape depth. [Milestone 11](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md) absorbed the first axis; [milestone 12](milestones/milestone-12-post-milestone-11-multi-axis-carrier-pattern-plateau.md) absorbed the multi-axis recurrence as the plateau finding. Specific carrier-shape constraint vocabularies, per-test sub-aggregate findings, and reader-judgment signals live in the milestone markers and the source artifacts each PR shipped.

Posture: named, not resolved. No carrier shape, schema, structured IA v3, validator, or orchestration is earned by any axis. The conceptual learning (what kinds of trace, rationale, and governance carriers matter under various pressure shapes) is carried forward at conceptual depth; specific carrier-shape labels remain author-side.

### Inventory

- **Apex Named Limitations** (three; depth: [architecture-apex-definition-layer-v1.md](architecture-apex-definition-layer-v1.md)) — (#1) specific aesthetic-carrier schema for brand-system, mode / category, or product-class — sharpened by brand-system carrier decision surface v2's narrowing; (#2) precedence rule for inheritance and override — implicit-additive Model A holds where tested but no formal precedence rule earned; (#3) cross-base / cross-category / cross-brand pressure plus marketing-mode and campaign-mode operational evidence at full-flow depth — partially earned; remaining gaps named.
- **Composite-anchor structure.** Operationally deflated for collection mode; held for marketing and campaign modes; the unified `composite_anchor` polymorphic-entity question is unearned across the three non-SKU modes.
- **Inferred-not-stated structural representation.** Currently a prose discipline; paper-pressed structural-carrier candidates (`derivation_basis` field; `articulation_state` flag) not earned.
- **Fallback-chain-position structural representation.** Chain order encoded in structured IA model v2 YAML; chain semantics carried in prose; structural representation of operator-resolved chain position paper-pressed but not earned.
- **Operator-judgment representation.** Procedural content; not data; not modeled in the structured form. Carried in prose throughout Phase 1 + Phase 2 work.
- **Validator integration.** v2's YAML appendix could derive Pydantic models when an operational consumer surfaces the need; not earned by current pressure. The structured-consumer preflight names the threshold.
- **Phase 3 demonstration.** All-four-workflow Airtable demonstration after the IA model is understood; held per the redirection's three-phase plan.

These boundaries are load-bearing. Any reading of the current architecture that elides them mis-reads it.

## Source-of-Truth Routing

Entry points to depth. Full repo navigation lives in [docs/index.md](index.md); this list is the focused entry-point set.

- [docs/index.md](index.md) — full navigation across all repo artifacts
- [docs/diagrams/asset-pipeline-ASK_architecture-tree.html](diagrams/asset-pipeline-ASK_architecture-tree.html) — visual architecture tree at orientation depth; refreshed through milestone-triggered diagram-surface passes and may lag a newly landed plateau marker; the prose docs are authoritative if the two diverge
- [docs/diagrams/interactive/asset-pipeline-ASK_ia-state-spine.html](diagrams/interactive/asset-pipeline-ASK_ia-state-spine.html) — interactive maturity / evidence **state** surface (the static diagrams assert no state); orientation aid only, the prose docs (this Evidence Depth section especially) are authoritative if the two diverge
- [docs/milestones/milestone-15-...](milestones/milestone-15-resolution-calculus-and-instantiation-consumer-evidence-plateau.md) — **latest evidence plateau**; absorbs two bounded evidence boundaries — the slot-resolution calculus determinate at tested A1 depth, and one package-instantiation planning consumer calibrated on one known-achievable filesystem target; earns no consuming grammar, general converter, repeatable consumer, schema, validator, or runtime
- [docs/milestones/milestone-14-...](milestones/milestone-14-portability-frontier-separation.md) — **governing architecture posture** (prior plateau marker); the portability frontier separates into recovery (earned) + auditability (carrier-class) + consumability (the current application grammar is the wrong consumer for a package instance, 10/10 category-mismatch); redirects to the open question *what consumes a package, and is one needed*; down-ranks visual-payload work as premature; package-shaped consumer design unauthorized
- [docs/milestones/milestone-13-...](milestones/milestone-13-portability-evidence-plateau.md) — prior plateau marker; the 2c in-base transition event + the portability evidence arc (data-shape extraction, package extraction, worked package store + recovery) + Phase 3 translation / portability / instantiation as the active frontier
- [docs/milestones/milestone-12-...](milestones/milestone-12-post-milestone-11-multi-axis-carrier-pattern-plateau.md) — prior plateau marker; absorbs the multi-axis recurrence finding and the post-milestone-9 carrier-shape arc at plateau depth
- [docs/milestones/milestone-11-...](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md) — prior plateau marker (Zone 6 / intake-time judgment trace carrier shape arc)
- [docs/milestones/milestone-10-...](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md) — Phase 2 six-category brand-system input synthesis plateau
- [docs/milestones/milestone-9-...](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md), [milestone-8](milestones/milestone-8-phase-2-structured-model-plateau.md), [milestone-7](milestones/milestone-7-v1-sweep-closure-plateau.md) — earlier plateau markers
- [docs/structured-ia-model-v2.md](structured-ia-model-v2.md) — canonical machine-readable structured enumeration (17-key YAML appendix)
- [docs/structured-ia-v2-consumer-preflight-v1.md](structured-ia-v2-consumer-preflight-v1.md) — structured-consumer preflight; what v2 supports, does not support, threshold for v3 absorption
- [docs/non-airtable-extraction-attempt-v1.md](non-airtable-extraction-attempt-v1.md) — portability leg 1: SKU-slice / JSON-Schema data-shape extraction; data shape portable, interpretive layer not yet
- [docs/portable-package-extraction-2c-marketing-hero-v1.md](portable-package-extraction-2c-marketing-hero-v1.md) — portability leg 2: proven 2c package instance re-expressed as prose walk + tool-agnostic YAML instance, walked to instantiation-plan depth
- [docs/worked-package-store-2c-marketing-hero/](worked-package-store-2c-marketing-hero/) — portability leg 3 (instantiation evidence): the proven 2c package held in a file-bundle second substrate and recovered from the store alone (fresh-reader recovery test in `_recovery-test.md`, 8/8 PASS)
- [docs/architecture-front-door-compression-brief-v1.md](architecture-front-door-compression-brief-v1.md) — the brief this file's compression executes
- [docs/architecture-apex-definition-layer-v1.md](architecture-apex-definition-layer-v1.md) — v1 apex definition-layer artifact; three Named Limitations carried forward
- [docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md](campaign-mode-fork-resolver-test-phase-d-findings-v1.md) — bounded `refines` reading at PKT-CAMP-004 scope; depth for the curation-premise fork and the curation semantic split
- [docs/normative-force-and-durable-layer-pressure-v1.md](normative-force-and-durable-layer-pressure-v1.md) — six-kind normative-force vocabulary
- [docs/layered-reference-and-discretion-architecture-v1.md](layered-reference-and-discretion-architecture-v1.md) — nine-fold reference-function taxonomy; normative-hierarchy framing; nine-site discretion decomposition
- [docs/brand-system-carrier-decision-surface-v2.md](brand-system-carrier-decision-surface-v2.md) — current brand-system carrier decision surface; zone-by-zone narrowing
- [docs/brand-discovery-digestion-layered-intake-architecture-v1.md](brand-discovery-digestion-layered-intake-architecture-v1.md) — layered intake architecture; seven-stage extraction sequence; operator-authored vs inferred-not-stated distinction
- [docs/brand-system-input-cross-category-synthesis-v1.md](brand-system-input-cross-category-synthesis-v1.md) — six-category synthesis; nine-relation cross-category vocabulary
- [docs/brand-intake-judgment-trace-dry-run-v1.md](brand-intake-judgment-trace-dry-run-v1.md) — sparse-articulation walk that surfaced the Scale-of-Operation Held Question
- [docs/application/README.md](application/README.md) — application sub-tree map
- [docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md](application/implementation-roadmap-system-map-artifact-grammar-v1.md) — first generated-output artifact grammar
- [docs/application/artifact-grammar-consumer-pressure-v1.md](application/artifact-grammar-consumer-pressure-v1.md) — application-consumer pressure pass; conceptual-vs-vocabular split
- [AGENTS.md](../AGENTS.md) — single-node operating model and agent-agnostic workflow rules

Predecessor artifacts at content depth (Phase 1 mode sketches, Phase 2 input-category deepenings, brand-system hybrid carrier decision surface v1, structured IA model v1, the post-milestone-9 carrier-shape arc source artifacts, the cross-mode probe series, the operational findings chain) are routed via [docs/index.md](index.md) and the milestone markers above.

## What Remains Out of Scope

This file does not do the following:

- PR-by-PR chronology. The full chronological absorption of post-milestone-9 carrier-shape work lives in milestone 11, milestone 12, and the source artifacts each PR shipped — not here.
- Candidate-next-pressure-surface enumeration. Per the milestone-12 plateau marker's posture, subsequent pressure is a fresh strategic decision against the current state, not a pre-committed queue.
- Held-candidate adjudication. The held inventory above is at orientation depth; no adjudication map is authorized.
- Schema / validator / orchestration commitment. The structured-consumer preflight names the threshold; no commitment is made here.
- Application substrate implementation. Generated-output artifact grammars exist at planning depth; substrate builds are not authorized here.
- Additional package stores, package grammar, and runtime consumer. One second substrate (the file-bundle worked package store) has been instantiated and recovered; building *further* package stores by default, authoring a reusable package grammar, or wiring a runtime consumer that reads a package instance is not authorized here.
- Operator-side source-of-intent. Grounding-note content remains operator-side per the grounding-note's externality discipline; this file does not reproduce it.
- Mode-specific content per layer. Lives in the Phase 1 mode sketches; this file does not duplicate them.
- Per-input-category mapping. Lives in the Phase 2 deepenings; this file does not duplicate them.
- Per-packet operational findings. Live in the corresponding finding artifacts.

This file is current as of [milestone 15](milestones/milestone-15-resolution-calculus-and-instantiation-consumer-evidence-plateau.md) (latest evidence plateau); [milestone 14](milestones/milestone-14-portability-frontier-separation.md)'s portability-frontier separation remains the governing architecture posture. It will need revision when the next architectural plateau is reached, when one of the held questions earns resolution beyond bounded scope, or when an authorized next-pressure surface lands content that materially shifts the current state.
