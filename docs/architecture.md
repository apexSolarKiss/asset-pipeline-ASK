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

## Where This File Sits

This file is the **current-architecture front door**: a concise statement of where the architecture currently sits, what it has earned, and where the substantive content lives. It is intentionally compact and routes to depth rather than reproducing detail.

Source-of-truth relationships across the load-bearing artifacts:

- **`docs/architecture.md` (this file)** — current front-door synthesis; the architecture's current shape, evidence depth, and held questions at orientation depth
- **`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`** — the current plateau marker; absorbs the trajectory since milestone 8
- **`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`** — the prior plateau marker
- **`docs/structured-ia-model-v1.md`** — the stable structured enumeration of the IA layered-content model (hybrid prose + YAML appendix); the canonical machine-readable form
- **`docs/architecture-apex-definition-layer-v1.md`** — the v1 apex definition-layer artifact at SKU + same-category-collection scope; depth-authority for synthesis-pass content and the three Named Limitations carried forward
- **`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`** — Phase D bounded `refines` reading at PKT-CAMP-004 scope; depth-authority for the curation-premise fork's current status and the curation semantic split
- **`docs/index.md`** — full navigation across all repo artifacts; this file does not replicate that navigation
- **Source artifacts (Phase 1 sketches, Phase 2 deepenings, operational findings, cross-mode probes)** — depth-authority for content; this file does not duplicate them

A returning reader landing here gets the architecture's current state and routes to depth. A reader needing per-mode IA content reads the Phase 1 mode sketches; per-input-category mapping reads the Phase 2 deepenings; per-packet operational findings reads the corresponding finding artifact; full repo navigation reads `docs/index.md`.

### Scope of current claims

This file scopes its own current-state claims to evidence depth, distinct from the project's target layer.

- **Target layer**: machine-usable normative structure / durable spec and orchestration layer above changing tools and models. This is the project's intent (see `README.md`).
- **Current state**: structured IA model v1 (hybrid prose + YAML appendix) plus drift detection equals a machine-*readable* enumeration with documentation-drift coverage. It is not yet a machine-*usable* orchestration spec — no code path or workflow currently consumes the YAML appendix as orchestration input.

The architecture's current-state claims below are scoped accordingly.

## Current Architecture Shape

The architecture's current shape, abbreviated:

**Layers.** Eight IA layers carry across the four worked-example modes:

- brand-system layer (currently unmodeled in IA; the brand platform and visual identity system deepenings concretize this as a real architectural gap — see Brand-System Layer Status below)
- category / product-class layer (signaled-only; not first-class)
- mode-specific layer (varies by mode; see below)
- packet layer (strongest current carrier)
- slot layer (role-specific narrowing)
- candidate generation layer (transient attachments)
- curation seam — two distinct senses observed:
  - **authorship-bearing discretion** (where creative judgment actually happens; site varies by mode and packet; appears concentrated at the seam in SKU-mode evidence; surfaced upstream at prompt-authoring and prompt-remediation in PKT-CAMP-004 campaign-mode evidence)
  - **governance-bearing curation** (where output becomes governed asset; always at the seam; carries five-axis provenance + curator + `curation_pattern`)
  - These may co-locate (SKU evidence appears to) or separate (campaign at PKT-CAMP-004 did). The architecture had been collapsing the two senses.
- governed asset layer (durable terminal output; carries `asset_attachment` self-contained writeback)

**Modes.** Four worked-example modes, each with a mode-specific layer between category and packet (SKU-driven mode has none; brand campaign / editorial mode has two):

- SKU-driven product imagery — no mode-specific layer; SKU is the anchor
- collection / merchandising — collection / grouping layer
- marketing / message-driven — message / offer / communication layer
- brand campaign / editorial — campaign concept layer + review-context / campaign-world coherence layer

**Carriers.** Five carrier types observed across the architecture: prose carriers; structural carriers; visual reference carriers; governance carriers; held candidates (paper-pressed but not earned). Carrier distribution varies by content category — prose-heavy for some inputs, structurally-explicit-heavy for others, almost entirely prose-carried with structural void for non-visual brand-system content.

**Implementation entry surface.** Brand discovery / digestion architecture is the surface where brand-system input enters the layered IA before any tool implementation begins. Six brand-system input categories named in the Phase 2 opening sketch; four deepened to date (photography / image style guide; asset library; brand platform; visual identity system); two remain unprobed at deepening depth (application guidelines; past campaigns).

**Fallback chain.** When brand-system input is sparse, contradictory, or absent, the architecture falls back through an ordered six-layer chain: asset library → photography style guide → brand platform → intra-category recency / specificity → Phase 1 worked-example defaults → operator-marked inferred-not-stated. Operator judgment becomes load-bearing under stress; the architecture surfaces options at each conflict point but does not auto-resolve.

**Structured form.** The structured IA model v1 carries the stable enumeration above as a machine-readable YAML appendix alongside prose for unresolved content. The YAML is intentionally small; held questions are encoded as markers, not as structural representations of question content. Held schema candidates remain in prose, not encoded.

The structured IA model v1 is the canonical form for stable enumeration. Anything not in its YAML appendix is either held in prose or earned only at synthesis-pass depth in the apex artifact and the Phase 1 / Phase 2 sketches.

## Evidence Depth

What's been earned at the current plateau:

**Operationally grounded (full-flow generation → curation → governance).** SKU-driven mode at PKT-SKU-007 / 009 / 010 (five-axis provenance + curator + `curation_pattern` + `asset_attachment` carry cleanly); collection / merchandising mode at PKT-COLL-001 (paper-strain composite-anchor mutation operationally deflated; prose discipline carried 1:N constituent enumeration + exclusion-by-name + cross-axis curation tradeoffs cleanly); brand campaign / editorial mode at PKT-CAMP-004-KITCHEN_PREP at bounded depth (one packet; three slots; three `generated_assets` rows; all three curation events `confirmation-bearing`; upstream authorship-bearing work at LIFE_IN_USE prompt-authoring and OBJECT_VIGNETTE prompt-remediation; Phase D recommendation `refines` as bounded read, held for further pressure-testing).

**Structurally proven; not full-flow operationally pressured.** Marketing / message-driven mode at PKT-MSG-001 (cycle 1, `findings-only`); brand campaign / editorial mode also at PKT-CAMP-001 (cycle 1 rerun; review-board context functioned as load-bearing for the bounded mini-family proof) plus the Phase 1 Campaign-Driven D2C Home-Goods v1 base setup (95-field schema mirror in a separate base). Campaign-mode's full-flow elevation comes from PKT-CAMP-004 above; cross-base + cross-brand evidence comes from the D2C base + Warm Restraint aesthetic instance.

**Paper-pressed; not yet operationally tested.** Cross-mode composite-anchor candidates (collection deflated; marketing held; campaign held + sharper); structured slot-message-element fields; selection-axis enum classification; reference-type tag (with two divergent category proposals from the visual pair); brand-platform first-class entity; brand-wide constants first-class entity (VIS-pressured); approval-state metadata; rejected-assets entity; articulation-state flag; derivation-basis field; fallback-chain-position annotation; worked-example-defaults carrier; contradiction-log entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints. None earned by operational pressure.

**Schema is mode-independent at structural level.** The same packet-and-seam schema carried SKU-driven, collection / merchandising, marketing / message-driven, and brand campaign / editorial workloads at first-pass depth, with further-flow operational depth varying per the rows above.

The visual-as-fidelity-strategy claim from the apex aesthetic-layering pass holds operationally (SKU + collection) and is reciprocally established on paper by the Phase 2 visual-input pair (photography style guide articulates conventions; asset library demonstrates them; when they diverge, the library carries); the VIS deepening adds that brand-wide visual *constants* (logo, typography, color, grid) carry articulated structure of their own that the IA has no first-class carrier for.

## Held Questions

Carried forward unresolved at this plateau. The architecture does not pretend to have settled them. Two are treated below as named structural concerns; the remaining held questions are inventoried.

### Curation-Premise Architectural Fork

The foundational premise that curation is the singular runtime creative-discretionary act and generation is mechanical was load-bearing across the architecture as previously stated. The PKT-CAMP-004 fork-resolver test has bounded-pressured the premise:

- **Phase D §3.1** falsified the `holds` reading at PKT-CAMP-004 scope: all three curation events were `confirmation-bearing`, and authorship-bearing work surfaced upstream at prompt-authoring (LIFE_IN_USE) and prompt-remediation (OBJECT_VIGNETTE). This falsifies the *unqualified* architecture-wide claim that curation always carries runtime authorship.
- **Phase D §4 + §7** recommended `refines` as the current best bounded read at PKT-CAMP-004 scope: upstream authorship-bearing moments shape the candidate set, and curation ratifies or rejects their output.
- **Phase D §9** preserved `fragments` as a named falsification path, not doctrine: a packet where upstream authored moments occur but do not flow into the slot's curation event would weaken `refines` in favor of `fragments`.

The substantive vocabulary refinement the bounded reading forces is the curation semantic split named in the Layers list above: authorship-bearing discretion (variable site) is distinct from governance-bearing curation (always at the curation seam).

**Mode-weighted current standing**:

- SKU-driven evidence (PKT-SKU-007 / 009 / 010 full-flow) continues to support curation as a strong authorship-bearing governance seam — authorship and governance appear to co-locate in SKU mode.
- Collection-mode evidence (PKT-COLL-001) does not contradict the SKU pattern at the depth tested, but it did not pressure the semantic split as directly as PKT-CAMP-004.
- Campaign-mode evidence (PKT-CAMP-004) showed the two senses separating: authorship upstream, governance at the seam.
- Marketing-mode and broader cross-brand / cross-category operational evidence remain unearned.

The architecture-wide framing is provisional. The singular-curation framing remains useful in SKU + collection scope where the two senses appear to co-locate; it is mode-weighted, not globally dispositive. The fork is not closed; the bounded `refines` read is held for further pressure-testing per Phase D §9.

### Brand-System Layer Status (Named Structural Decision)

The brand-system layer's unmodeled status is reframed at this plateau from "limitation" to "named unresolved structural decision."

The brand platform deepening (Phase 2 third) pressured this from the abstraction angle: positioning, voice, values, audience — almost entirely prose-carried with structural void. The visual identity system deepening (Phase 2 fourth) pressured it from the concrete-constants angle: logo references, typography assignments, color codes, grid systems — brand-wide articulated constants with no first-class IA home. Two-angle pressure makes the gap harder to defer.

The decision the architecture must eventually take is *not* binary. Three shapes remain live:

- **First-class structural carriers throughout.** The IA gains structural homes for brand platform, brand-wide constants, photography conventions, and applied guidelines.
- **Terminal operator-mediated translation.** The IA explicitly accepts prose + operator judgment as the resolution path for upstream normative content; downstream packet / slot carriers absorb what intake produces.
- **Hybrid (most likely on current evidence).** Structural carriers for stable brand-wide constants (logo references; typography assignments; color codes; grid systems; demonstrated reference imagery — much of which the IA already partially carries via `reference_assets` and related lookup chains); operator-mediated judgment for abstraction, conflict, sparsity, override, and application.

The decision is not pre-resolved at this plateau. It is named.

### Inventory

- **Apex Named Limitations.** Three carried forward from `docs/architecture-apex-definition-layer-v1.md`: (#1) specific aesthetic-carrier schema for brand-system, mode / category, or product-class — sharpened by the brand platform and VIS deepenings, status now named as a structural decision (above); (#2) precedence rule for inheritance and override — implicit-additive Model A holds where tested but no formal precedence rule earned; (#3) cross-base / cross-category / cross-brand pressure plus marketing-mode and campaign-mode operational evidence at full-flow depth — partially earned at this plateau (campaign-mode full-flow at PKT-CAMP-004 bounded depth; D2C base + Warm Restraint as cross-base + cross-brand evidence at bounded depth); remaining gaps named (marketing-mode full-flow; cross-category; broader cross-brand).
- **Composite-anchor structure.** Operationally deflated for collection mode; held for marketing and campaign modes; the unified `composite_anchor` polymorphic-entity question is unearned across the three non-SKU modes.
- **Inferred-not-stated structural representation.** Currently a prose discipline; surfaced by the sparse-articulation pressure note as a paper-pressed structural-carrier candidate (`derivation_basis` field; `articulation_state` flag); not earned.
- **Fallback-chain-position structural representation.** Chain order encoded in the structured IA model v1 YAML; chain semantics carried in prose; structural representation of operator-resolved chain position is paper-pressed but not earned.
- **Operator-judgment representation.** Procedural content; not data; not modeled in the structured form. Carried in prose throughout Phase 1 + Phase 2 work.
- **Validator integration.** The structured IA model v1's YAML appendix could be derived as Pydantic models for `src/asset_pipeline_ask/` consumption when an operational consumer surfaces the need; not earned by current pressure.
- **Remaining input-category deepenings.** Two of six brand-system input categories remain unprobed at deepening depth (application guidelines; past campaigns); held as candidates for future Phase 2 work.
- **Phase 3 demonstration.** All-four-workflow Airtable demonstration after the IA model is understood; held per the redirection's three-phase plan.

These boundaries are load-bearing. Any reading of the current architecture that elides them mis-reads it.

## Depth Documents

Entry points for content depth. Full repo navigation lives in `docs/index.md`; this list is the focused entry-point set.

- [`docs/index.md`](index.md): full navigation across all repo artifacts
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): current plateau marker
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): prior plateau marker
- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): stable structured enumeration of the IA layered-content model (hybrid prose + YAML appendix)
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex definition-layer artifact; three Named Limitations
- [`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md): Phase D bounded `refines` reading; depth-authority for the curation-premise fork's current status and the curation semantic split
- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md): VIS deepening; depth-authority for the brand-wide-constants angle of the brand-system layer structural decision
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening; depth-authority for the abstraction angle of the brand-system layer structural decision
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the IA layered-content redirection that opened the trajectory milestones 8 and 9 mark
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): Phase 1 cross-mode synthesis; carrier-status matrix; cross-mode layer map
- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; brand-system input categories; intake-to-IA mapping
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure; six-layer fallback chain
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): collection-mode operational deflation evidence
- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the milestone-7 plateau marker; v1 sweep closure
- [`AGENTS.md`](../AGENTS.md): single-node operating model + agent-agnostic workflow rules

The four Phase 1 mode sketches (B1–B4), the four Phase 2 input-category deepenings (photography / image style guide; asset library; brand platform; visual identity system), the structured IA model options note, the cross-mode probe series, the four-mode truth-and-constraint pressure note, the campaign-mode fork-resolver Phase A–D arc, and the full operational findings chain all live in `docs/index.md` for navigation.

This file is current as of milestone 9. It will need to be revised when the next architectural plateau is reached, when Phase 3 produces operational evidence, when one of the held questions earns resolution beyond bounded scope, or when a subsequent milestone marks a new plateau.
