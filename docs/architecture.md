# Architecture

The goal of this repository is to define a structured information architecture for scalable visual asset production systems, with particular emphasis on how style guides, creative rules, and other governing constraints can become machine-usable normative structure for production workflows that include AI generation.

At this stage, the correct architecture is the smallest honest architecture: enough structure to support disciplined design, but not so much structure that it hardens assumptions that have not yet earned permanence.

The architecture is intentionally high-level and leaves major design questions open, including:

- workflow taxonomy
- ontology for intent, inputs, constraints, orchestration, outputs, and governance
- where creative discretion enters
- where constraints bound that discretion
- where approvals and override points live
- whether campaign-concept selection pressures the foundational premise that curation is the singular runtime creative-discretionary act
- how the system extends from still image to video
- how deterministic layers relate to agent-assisted layers

The repository is expected to support still-image workflows first. Video should be treated as an extension path, not as a reason to prematurely over-generalize the initial architecture.

## Where This File Sits

This file is the **current-architecture front door**: a concise statement of where the architecture currently sits, what it has earned, and where the substantive content lives. It is intentionally compact and routes to depth rather than reproducing detail.

Source-of-truth relationships across the load-bearing artifacts:

- **`docs/architecture.md` (this file)** — current front-door synthesis; the architecture's current shape, evidence depth, and held questions at orientation depth
- **`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`** — the current plateau marker; absorbs the trajectory since milestone 7
- **`docs/structured-ia-model-v1.md`** — the stable structured enumeration of the IA layered-content model (hybrid prose + YAML appendix); the canonical machine-readable form
- **`docs/architecture-apex-definition-layer-v1.md`** — the v1 apex definition-layer artifact at SKU + same-category-collection scope; depth-authority for synthesis-pass content and the three Named Limitations carried forward
- **`docs/index.md`** — full navigation across all repo artifacts; this file does not replicate that navigation
- **Source artifacts (Phase 1 sketches, Phase 2 deepenings, operational findings, cross-mode probes)** — depth-authority for content; this file does not duplicate them

A returning reader landing here gets the architecture's current state and routes to depth. A reader needing per-mode IA content reads the Phase 1 mode sketches; per-input-category mapping reads the Phase 2 deepenings; per-packet operational findings reads the corresponding finding artifact; full repo navigation reads `docs/index.md`.

## Current Architecture Shape

The architecture's current shape, abbreviated:

**Layers.** Eight IA layers carry across the four worked-example modes:

- brand-system layer (currently unmodeled in IA; concretized as a real architectural gap by the brand platform deepening — Named Limitation #1)
- category / product-class layer (signaled-only; not first-class)
- mode-specific layer (varies by mode; see below)
- packet layer (strongest current carrier)
- slot layer (role-specific narrowing)
- candidate generation layer (transient attachments)
- curation seam (singular runtime creative-discretionary act per the foundational premise; carries five-axis provenance + curator + curation_pattern)
- governed asset layer (durable terminal output; carries `asset_attachment` self-contained writeback)

**Modes.** Four worked-example modes, each with a mode-specific layer between category and packet (SKU-driven mode has none; brand campaign / editorial mode has two):

- SKU-driven product imagery — no mode-specific layer; SKU is the anchor
- collection / merchandising — collection / grouping layer
- marketing / message-driven — message / offer / communication layer
- brand campaign / editorial — campaign concept layer + review-context / campaign-world coherence layer

**Carriers.** Five carrier types observed across the architecture: prose carriers; structural carriers; visual reference carriers; governance carriers; held candidates (paper-pressed but not earned). Carrier distribution varies by content category — prose-heavy for some inputs, structurally-explicit-heavy for others, almost entirely prose-carried with structural void for non-visual brand-system content.

**Implementation entry surface.** Brand discovery / digestion architecture is the surface where brand-system input enters the layered IA before any tool implementation begins. Six brand-system input categories named in the Phase 2 opening sketch; three deepened to date (photography / image style guide; asset library; brand platform); three remaining unprobed at deepening depth (visual identity system; application guidelines; past campaigns).

**Fallback chain.** When brand-system input is sparse, contradictory, or absent, the architecture falls back through an ordered six-layer chain: asset library → photography style guide → brand platform → intra-category recency / specificity → Phase 1 worked-example defaults → operator-marked inferred-not-stated. Operator judgment becomes load-bearing under stress; the architecture surfaces options at each conflict point but does not auto-resolve.

**Structured form.** The structured IA model v1 carries the stable enumeration above as a machine-readable YAML appendix alongside prose for unresolved content. The YAML is intentionally small; held questions are encoded as markers, not as structural representations of question content. Held schema candidates remain in prose, not encoded.

The structured IA model v1 is the canonical form for stable enumeration. Anything not in its YAML appendix is either held in prose or earned only at synthesis-pass depth in the apex artifact and the Phase 1 / Phase 2 sketches.

## Evidence Depth

What's been earned at the current plateau:

**Operationally grounded (full-flow generation → curation → governance).** SKU-driven mode at PKT-SKU-007 / 009 / 010 (five-axis provenance + curator + curation_pattern + asset_attachment carries cleanly); collection / merchandising mode at PKT-COLL-001 (paper-strain composite-anchor mutation operationally deflated; prose discipline carried 1:N constituent enumeration + exclusion-by-name + cross-axis curation tradeoffs cleanly).

**Structurally proven; not full-flow operationally pressured.** Marketing / message-driven mode at PKT-MSG-001 (cycle 1, `findings-only`); brand campaign / editorial mode at PKT-CAMP-001 (cycle 1 rerun; review-board context functioned as load-bearing for the bounded mini-family proof) plus the Phase 1 Campaign-Driven D2C Home-Goods v1 base setup (95-field schema mirror in a separate base; Phase 2 paused per redirection).

**Paper-pressed; not yet operationally tested.** Cross-mode composite-anchor candidates (collection deflated; marketing held; campaign held + sharper); structured slot-message-element fields; selection-axis enum classification; reference-type tag (with two divergent category proposals from the visual pair); brand-platform first-class entity; approval-state metadata; rejected-assets entity; articulation-state flag; derivation-basis field; fallback-chain-position annotation; worked-example-defaults carrier; contradiction-log entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints. None earned by operational pressure.

**Schema is mode-independent at structural level.** The same packet-and-seam schema carried SKU-driven, collection / merchandising, marketing / message-driven, and brand campaign / editorial workloads at first-pass depth (varying further-flow operational depth per the rows above).

The visual-as-fidelity-strategy claim from the apex aesthetic-layering pass holds operationally (SKU + collection) and is reciprocally established on paper by the Phase 2 visual-input pair (photography style guide articulates conventions; asset library demonstrates them; when they diverge, the library carries).

## Held Questions

Carried forward unresolved at this plateau. The architecture does not pretend to have settled them:

- **Apex Named Limitations.** Three carried forward from `docs/architecture-apex-definition-layer-v1.md`: (#1) specific aesthetic-carrier schema for brand-system, mode / category, or product-class; (#2) precedence rule for inheritance and override (implicit-additive Model A holds where tested but no formal precedence rule earned); (#3) cross-base / cross-category / cross-brand pressure plus marketing-mode and campaign-mode operational evidence at full-flow depth.
- **Curation-premise pressure question.** Surfaced in the brand campaign / editorial mode sketch and the cross-mode synthesis. Campaign-concept selection happens upstream of generation but is the dominant creative act in campaign mode. Three operational outcomes named (premise holds; refines; fragments); resolution requires campaign-mode operational testing that has been paused per the redirection.
- **Composite-anchor structure.** Operationally deflated for collection mode; held for marketing and campaign modes; the unified `composite_anchor` polymorphic-entity question is unearned across the three non-SKU modes.
- **Inferred-not-stated structural representation.** Currently a prose discipline; surfaced by the sparse-articulation pressure note as a paper-pressed structural-carrier candidate (`derivation_basis` field; `articulation_state` flag); not earned.
- **Fallback-chain-position structural representation.** Chain order encoded in the structured IA model v1 YAML; chain semantics carried in prose; structural representation of operator-resolved chain position is paper-pressed but not earned.
- **Operator-judgment representation.** Procedural content; not data; not modeled in the structured form. Carried in prose throughout Phase 1 + Phase 2 work.
- **Validator integration.** The structured IA model v1's YAML appendix could be derived as Pydantic models for `src/asset_pipeline_ask/` consumption when an operational consumer surfaces the need; not earned by current pressure.
- **Remaining input-category deepenings.** Three of six brand-system input categories remain unprobed at deepening depth (visual identity system; application guidelines; past campaigns); held as candidates for future Phase 2 work.
- **Phase 3 demonstration.** All-four-workflow Airtable demonstration after the IA model is understood; held per the redirection's three-phase plan.

These boundaries are load-bearing. Any reading of the current architecture that elides them mis-reads it.

## Depth Documents

Entry points for content depth. Full repo navigation lives in `docs/index.md`; this list is the focused entry-point set.

- [`docs/index.md`](index.md): full navigation across all repo artifacts
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): current plateau marker
- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): stable structured enumeration of the IA layered-content model (hybrid prose + YAML appendix)
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex definition-layer artifact; three Named Limitations
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the IA layered-content redirection that opened the trajectory milestone 8 marks
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): Phase 1 cross-mode synthesis; carrier-status matrix; cross-mode layer map
- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; brand-system input categories; intake-to-IA mapping
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure; six-layer fallback chain
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode operational deflation evidence; the load-bearing operational claim that paper-strain hypothesis was carried by prose discipline
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the prior plateau marker; v1 sweep closure
- [`AGENTS.md`](../AGENTS.md): single-node operating model + agent-agnostic workflow rules

The four Phase 1 mode sketches (B1–B4), the three Phase 2 input-category deepenings (photography / image style guide; asset library; brand platform), the structured IA model options note, the cross-mode probe series, the four-mode truth-and-constraint pressure note, and the full operational findings chain all live in `docs/index.md` for navigation.

This file is current as of milestone 8. It will need to be revised when the next architectural plateau is reached, when Phase 3 produces operational evidence, when one of the held questions earns resolution, or when a subsequent milestone marks a new plateau.
