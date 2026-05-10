# Milestone 8 // Phase 2 + Structured IA Model Plateau

## Posture

```text
plateau marker
not architecture.md rewrite
not Phase 3
not validator integration
not schema mutation
not Airtable mutation
not grounding-note update
does not resolve held questions
does not authorize any new substantive direction beyond what already exists on main
self-superseding when the architecture.md rewrite consolidates this plateau or when a subsequent milestone marks the next architectural plateau
```

This artifact marks the project's plateau after Phase 1 closure of the IA layered-content redirection, partial-depth Phase 2 progress on brand discovery / digestion architecture, and the landing of structured IA model v1 — the first machine-readable canonical representation of the IA layered-content model.

It is a plateau marker, not an architectural rewrite. It absorbs what's been earned, names what remains held, and identifies recommended next surfaces. It does not re-derive content from the Phase 1 / Phase 2 artifacts or the structured IA model v1; those remain authoritative for their content depth.

## What Milestone 8 Marks

The plateau identity is best stated as a single load-bearing claim:

**The project now has both a coherent prose synthesis of its layered IA content model and a first machine-readable canonical representation of that model — with the held content honestly held in prose rather than encoded structurally.**

This is a meaningful plateau. Before milestone 8, the IA architecture was prose-only across the apex artifact, the four mode sketches, and the cross-mode synthesis. After milestone 8, the architecture exists in two complementary forms: prose for narrative, uncertainty, operator judgment, and held questions; YAML for stable enumeration that future programmatic consumers can read.

The plateau is also bounded honestly:

- Phase 2 is partial-depth, not exhaustive. Three of six brand-system input categories are deepened; three remain unprobed.
- No Phase 2 surface has been operationally pressured at full-flow generation / curation / governance depth.
- Multiple held questions remain unresolved at this plateau (curation-premise pressure; apex Named Limitations #1, #2, #3; composite-anchor structure; inferred-not-stated / fallback-chain-position structural representation).
- No code path or workflow currently consumes the structured IA model v1's YAML appendix; validator integration is held.

The plateau is the evidence depth at which the architecture is honestly held, not at which it is finished.

## What Changed Since Milestone 7

Milestone 7 ([`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestone-7-v1-sweep-closure-plateau.md)) marked the v1 sweep closure plateau: SKU-driven Furniture v1 operationalized end-to-end; three non-SKU mode probes at probe-depth; cross-mode probe series surfacing composite-anchor as the most-consistent strain across all three non-SKU modes; named limitations held; single-node operating model canonical.

Between milestone 7 and milestone 8, four substantive arcs of work landed:

**Operational pressure on non-SKU modes.** The collection-mode operational test ran on PKT-COLL-001 and operationally deflated the composite-anchor strain hypothesis. Marketing-mode (PKT-MSG-001 cycle 1) and brand-campaign-mode (PKT-CAMP-001 cycle 1 rerun + Phase 1 Campaign-Driven D2C Home-Goods v1 base setup) added structural shape proofs at first-pass depth. The visual-as-fidelity-strategy claim is now reciprocally established by the visual-input pair.

**The IA layered-content redirection.** Further Airtable prototype mutation paused. The project's center re-articulated as the layered IA content model itself; the prototype is a pressure surface for that model. Three-phase plan named: Phase 1 on-paper IA layered-content articulation; Phase 2 brand discovery / digestion architecture; Phase 3 four-workflow Airtable demonstration after the IA model is understood.

**Phase 1 of the redirection.** Four mode sketches (SKU-driven; collection / merchandising; marketing / message-driven; brand campaign / editorial) plus the cross-mode synthesis. Closed.

**Phase 2 of the redirection (partial).** Opening sketch establishing the implementation entry surface; three deepening artifacts on photography / image style guide, asset library, and brand platform input categories; sparse-articulation fallback pressure note; structured IA model options note; and the v1 structured IA model. Plus two index hygiene PRs (Phase 1 closure routing; Phase 2 progress grouping).

The trajectory is substantial. Milestone 8 marks where it lands.

## Phase 1 Closure Summary

Phase 1 produced five artifacts on main:

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](../ia-layered-content-sketch-sku-driven-mode-v1.md) (B1) — SKU-driven mode IA content; PKT-SKU-009 + PKT-SKU-010 vertical slice; cleanest case for layered IA articulation
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](../ia-layered-content-sketch-collection-mode-v1.md) (B2) — collection / merchandising mode; PKT-COLL-001 vertical slice; introduces the collection / grouping mode-specific layer; carries the operational deflation evidence
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](../ia-layered-content-sketch-marketing-mode-v1.md) (B3) — marketing / message-driven mode; PKT-MSG-001 + cross-mode probe; introduces the message / offer / communication mode-specific layer; evidence depth weakest of the four
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](../ia-layered-content-sketch-campaign-mode-v1.md) (B4) — brand campaign / editorial mode; PKT-CAMP-001 + Phase 1 D2C base + cross-mode probe; introduces the campaign concept layer plus a second mode-specific layer (review-context / campaign-world coherence); surfaces the curation-premise pressure question
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](../ia-layered-content-cross-mode-synthesis-v1.md) (B5) — cross-mode synthesis; identifies stable shared layers, mode-specific layers, and the carrier-status matrix; surfaces composite-anchor as the cross-mode pattern (collection deflated; marketing held; campaign held + sharper); explicitly closes Phase 1 of the redirection

Key Phase 1 findings:

- The layered IA model has a stable shape: 8 IA layers, 4 worked-example modes, mode-specific layers per mode (with brand campaign mode adding two)
- Stable carriers across modes: packet, slot, candidate generation, curation seam, governed asset
- Five-axis curation provenance (`capture_reason`, `captured_at`, `source_attachment_id`, `capture_notes`, `curation_pattern`) plus `curator` and `asset_attachment` carry across modes operationally where tested
- Implementation-vs-conceptual goal distinction (Path A) is fully cross-mode; sharpest in campaign mode
- Curation premise pressure (B4): campaign-concept selection vs the foundational premise that curation is the singular runtime creative-discretionary act; three operational outcomes named (premise holds; refines; fragments); held
- Apex Named Limitations carried forward, not resolved

## Phase 2 Partial-Depth Summary

Phase 2 produced six artifacts on main (with three remaining input-category deepenings unprobed):

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](../brand-discovery-digestion-architecture-sketch-v1.md) — opening sketch; six brand-system input categories; intake-to-IA mapping; discovery sequence; fallback model
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](../brand-system-input-photography-style-guide-to-ia-mapping-v1.md) — first deepening; articulated visual conventions; ten style dimensions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](../brand-system-input-asset-library-to-ia-mapping-v1.md) — second deepening; demonstrated visual evidence; closes the visual-as-fidelity reciprocal relationship; surfaces that asset library is the input category most directly served by existing IA structural carriers
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](../brand-system-input-brand-platform-to-ia-mapping-v1.md) — third deepening; non-visual articulation-only; cross-domain generalization test; concretizes Named Limitation #1 (the brand-system layer's unmodeled status as a real architectural gap)
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](../brand-discovery-sparse-articulation-fallback-pressure-v1.md) — fallback-pressure artifact; five test conditions across the three deepened categories; six-layer fallback chain articulated and ordered; reframes structured IA model timing
- [`docs/structured-ia-model-options-note-v1.md`](../structured-ia-model-options-note-v1.md) — options note evaluating five structured-form options across seven criteria; recommends hybrid prose + structured appendix

Key Phase 2 findings:

- The deepening pattern generalizes structurally across three distinct input-category shapes: articulated visual conventions; demonstrated visual evidence; non-visual articulation-only
- Visual-as-fidelity-strategy from the apex aesthetic-layering pass holds reciprocally between photography style guide articulation and asset library demonstration
- Asset library is the input category most directly served by existing IA structural carriers (`reference_assets`, lookup chains, `asset_attachment`); photography style guide content lands predominantly in prose; brand platform content lands almost entirely in prose with structural void
- Sparse-articulation fallback pressure: model holds across five test conditions; operator-judgment burden scales under stress; five new structural-carrier candidates surfaced (none earned)
- Structured IA model timing reframed from "now or later?" to "what shape, given operator-judgment burden in stress conditions?"

What's not done:

- Three remaining input-category deepenings (visual identity system; application guidelines; past campaigns) unprobed
- No Phase 2 surface has been operationally pressured at full-flow depth in any mode
- No cross-category interaction test beyond the sparse-articulation pressure note's five conditions

## Structured IA Model v1 Summary

The Phase 2 work culminated in [`docs/structured-ia-model-v1.md`](../structured-ia-model-v1.md): the first machine-readable canonical representation of the IA layered-content model. Hybrid form per the options note's recommendation — prose primary, embedded YAML appendix secondary, single file.

The YAML appendix carries nine top-level keys of stable enumeration:

- `ia_layers` (8 layers)
- `worked_example_modes` (4 modes)
- `mode_specific_layers` (keyed map: SKU empty; collection has collection_grouping; marketing has message_offer_communication; campaign has campaign_concept and review_context_campaign_world_coherence)
- `carrier_types` (5 types)
- `brand_system_input_categories` (6 categories)
- `deepened_input_categories` (3 deepened to date)
- `fallback_chain` (6-layer ordered chain)
- `carrier_status_values` (5 values from cross-mode synthesis)
- `held_questions` (6 markers)

The prose carries everything else: layer-by-layer narrative, operator-judgment paths, inferred-not-stated semantics, fallback-chain interpretation, the held candidates with per-candidate reasoning, the curation-premise pressure question, and the apex Named Limitations.

This is not schema, not validator integration, not Pydantic, not JSON Schema, not a separate file. It is a hybrid documentation form that gives the project a structured representation of stable content while keeping unresolved content honestly in prose. Held candidates explicitly marked as held; held questions encoded as markers (not as structural representations of question content).

## What the Architecture Now Knows

Confidently established at this plateau:

- The layered IA content model has a stable shape: 8 IA layers, 4 worked-example modes, mode-specific layers per mode, 5 carrier types, 6 brand-system input categories, ordered fallback chain
- The visual-as-fidelity-strategy claim from the apex aesthetic-layering pass holds operationally (SKU + collection) and reciprocally on paper (photography style guide ↔ asset library)
- Five-axis curation provenance + `curator` + `curation_pattern` + `asset_attachment` carry cross-mode (operationally in SKU + collection)
- The schema is mode-independent at the structural level: PKT-COLL-001 ran inside the SKU-driven base; PKT-MSG-001 cycle 1 carried the bounded marketing burden at first-pass depth in the same base; PKT-CAMP-001 cycle 1 rerun carried the bounded campaign burden at first-pass depth in the same base; the Phase 1 Campaign-Driven D2C Home-Goods v1 base mirrors the schema in a separate base
- Mapping pattern in Phase 2 generalizes across three distinct input-category shapes
- Operator-judgment burden becomes load-bearing under sparse / contradictory / divergent input conditions; the architecture's fallback model surfaces options at each conflict point but does not auto-resolve

Less confidently / paper-only or operationally untested:

- Marketing-mode and campaign-mode at full-flow operational depth (per Named Limitation #3)
- Cross-base, cross-category, cross-brand operational pressure (per Named Limitation #3)
- The composite-anchor candidates' operational outcomes outside collection mode
- Any of the held structural-carrier candidates surfaced by Phase 2

## What Remains Held

Carried forward unresolved through milestone 8:

- **Apex Named Limitations** — #1 (specific aesthetic-carrier schema); #2 (inheritance / override precedence; implicit-additive Model A holds where tested but no formal precedence rule earned); #3 (cross-base, cross-category, cross-brand, marketing-mode, campaign-mode operational evidence at full-flow depth)
- **Curation-premise pressure question** — campaign-concept selection vs the foundational singular runtime creative-discretionary act premise; three operational outcomes named (holds, refines, fragments); resolution not authorized
- **Composite-anchor structure** — collection-mode operationally deflated; marketing-mode and campaign-mode held; unified `composite_anchor` polymorphic-entity question unearned
- **Inferred-not-stated structural representation** — surfaced by sparse-articulation pressure as a paper-pressed structural-carrier candidate (`derivation_basis` field; `articulation_state` flag); not earned
- **Fallback-chain-position structural representation** — surfaced by sparse-articulation pressure; chain order in YAML; semantics in prose; not earned
- **Operator-judgment representation** — procedural content; not data; not modeled in YAML; carried in prose
- **Held schema candidates** — fourteen paper-pressed candidates aggregated across Phase 1 + Phase 2 (composite-anchor mutations; reference-type tag with two divergent proposals; structured slot-message-element fields; selection_axis enum; brand_platforms entity; approval-state metadata; rejected_assets entity; articulation_state flag; derivation_basis field; fallback_chain_position annotation; worked_example_defaults carrier; contradiction_log entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints) — none authorized at this plateau
- **Three remaining input-category deepenings** — visual identity system; application guidelines; past campaigns — unprobed
- **Validator integration** — held; structured IA model v1's YAML appendix could be derived as Pydantic models for `src/asset_pipeline_ask/` consumption when an operational consumer surfaces the need
- **Architecture.md rewrite** — held; downstream of milestone 8 by design
- **Phase 3** (all-four-workflow Airtable demonstration) — held per the redirection's three-phase plan
- **Grounding-note v52** — held; separate hygiene track

## What Milestone 8 Does Not Authorize

Milestone 8 marks the plateau. It does not authorize any new substantive direction beyond what already exists on main. Specifically:

- Architecture.md rewrite — downstream of this milestone; not opened
- Phase 3 Airtable demonstration — held per the redirection's three-phase plan
- Validator integration — held; no operational consumer pressures it
- Resumption of Airtable mutation work outside Phase 3 framing — paused per redirection
- Schema mutation of any kind — all held candidates remain held
- Resolution of any held question — milestone-8 carries them forward, does not resolve
- Operationalizing brand-system intake — Phase 2 is on-paper; operational testing not authorized
- Grounding-note v52 — separate hygiene track; not part of this milestone
- Any artifact that would treat structured IA model v1 as a complete schema — it is a hybrid documentation form, not a schema; the prose context constrains its reading

## Recommended Next Surfaces After Milestone 8

The next direction is a discrete choice between several architecturally-relevant options. Naming them here for ASK directional input; not authorizing any of them.

1. **Architecture.md rewrite** — the natural downstream consolidation. The apex artifact, the Phase 1 sketches, the cross-mode synthesis, the Phase 2 artifacts (including structured IA model v1), and the operational evidence accumulate enough material that a single consolidated current-architecture document is a defensible next move. Inputs are ready.

2. **Remaining Phase 2 deepenings** — three categories unprobed (visual identity system; application guidelines; past campaigns). Visual identity system is the most distinct remaining shape (hybrid articulated brand-system constants + applied conventions); application guidelines and past campaigns are closer variations on tested shapes.

3. **Validator integration** — derive Pydantic models from the structured IA model v1's YAML appendix; integrate with `src/asset_pipeline_ask/`. Paper-pressed by structured form availability; not earned by operational pressure. Would benefit from a specific consumer use case.

4. **Phase 3 Airtable demonstration** — the all-four-workflow demonstration was held until the IA model is understood. Phase 1 + Phase 2 + structured IA model v1 collectively meet that precondition. Phase 3 would test the IA model in operation and would surface operational pressure on currently-held questions.

5. **Operational testing in marketing or campaign mode** — held since the redirection paused further Airtable mutation. Resuming would put the marketing-mode and campaign-mode strain points under operational pressure for the first time. Named Limitation #3 directly implicated.

6. **Grounding-note v52** — separate hygiene track; unrelated to the IA architecture work but accumulating its own pressure.

The choice between these is for ASK's directional input. Each is defensible at this plateau; none is forced.

## Self-Superseding Clause

This milestone is a plateau marker. It should be superseded by:

- the eventual `docs/architecture.md` rewrite when it consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, the structured IA model v1, and the operational evidence into a single current-architecture document
- a subsequent milestone (milestone 9, etc.) when the next architectural plateau is reached
- any operational test that resolves a held question (curation-premise pressure outcome; one of the apex Named Limitations earning resolution; one of the held structural-carrier candidates earning operational pressure)
- any Phase 3 demonstration findings that pressure or extend the IA model

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the Phase 1 sketches, the cross-mode synthesis, the Phase 2 artifacts, the structured IA model v1, the operational findings notes, or milestone 7. Those remain authoritative for their subject matter; this milestone reads them at plateau-marking depth.

## Anchor Documents

### Plateau-marking framing

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestone-7-v1-sweep-closure-plateau.md): the prior plateau; v1 sweep closure
- [`docs/ia-layered-content-redirection-note-v1.md`](../ia-layered-content-redirection-note-v1.md): the redirection that opened the trajectory milestone 8 closes the first stretch of

### Phase 1 outputs

- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](../ia-layered-content-sketch-sku-driven-mode-v1.md) (B1)
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](../ia-layered-content-sketch-collection-mode-v1.md) (B2)
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](../ia-layered-content-sketch-marketing-mode-v1.md) (B3)
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](../ia-layered-content-sketch-campaign-mode-v1.md) (B4)
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](../ia-layered-content-cross-mode-synthesis-v1.md) (B5)

### Phase 2 outputs

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](../brand-discovery-digestion-architecture-sketch-v1.md): opening sketch
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](../brand-system-input-photography-style-guide-to-ia-mapping-v1.md): photography deepening
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](../brand-system-input-asset-library-to-ia-mapping-v1.md): asset library deepening
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](../brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](../brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure
- [`docs/structured-ia-model-options-note-v1.md`](../structured-ia-model-options-note-v1.md): structured IA model options note
- [`docs/structured-ia-model-v1.md`](../structured-ia-model-v1.md): structured IA model v1 (hybrid prose + YAML appendix)

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](../architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitations carried forward
- [`docs/architecture-bounded-modeling-pass-v1.md`](../architecture-bounded-modeling-pass-v1.md): three-layer-vs-layered-operational reconciliation
- [`docs/architecture-vocabulary-pass-v1.md`](../architecture-vocabulary-pass-v1.md): vocabulary precision; "structure earns its keep over prose by observed operational pressure" doctrine
- [`docs/architecture-aesthetic-layering-pass-v1.md`](../architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy claim
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](../cross-mode-layered-input-model-and-curation-event-note.md): on-paper four-mode pressure-test that the Phase 1 sketches concretize
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](../four-mode-truth-and-constraint-pressure-note.md): four-mode comparison note

### Operational evidence the plateau reads against

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](../full-flow-path-a-findings-pkt-sku-009.md): SKU-driven Path A
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](../full-flow-path-b-findings-pkt-sku-010.md): SKU-driven Path B
- [`docs/collection-mode-operational-test-findings-v1.md`](../collection-mode-operational-test-findings-v1.md): collection-mode operational deflation
- [`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](../airtable-marketing-message-driven-cycle-1-findings-v1.md): marketing-mode structural shape proof
- [`docs/airtable-campaign-editorial-cycle-1-rerun-findings-v1.md`](../airtable-campaign-editorial-cycle-1-rerun-findings-v1.md): campaign-mode structural shape proof
- [`docs/campaign-mode-base-setup-phase-1-structured-change-summary-v1.md`](../campaign-mode-base-setup-phase-1-structured-change-summary-v1.md): cross-base schema mirroring
