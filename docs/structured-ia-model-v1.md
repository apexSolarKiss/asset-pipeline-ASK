# Structured IA Model v1

## Posture

```text
hybrid prose + structured appendix artifact
first structured IA model artifact
prose primary, structured appendix secondary
not milestone-8
not architecture.md rewrite
not validator integration
not Pydantic implementation
not JSON Schema
not Airtable
not schema mutation
does not resolve held candidates
does not resolve apex Named Limitations
self-superseding once milestone-8 and architecture.md rewrite absorb the model
```

This artifact is the v1 hybrid structured IA model, authored per the recommendation in [`docs/structured-ia-model-options-note-v1.md`](structured-ia-model-options-note-v1.md). It carries a prose narrative as the primary surface plus a small, intentionally-stable YAML appendix as the secondary surface.

It is not the architecture rewrite, not milestone-8, not a Pydantic schema, not a validator integration, and not a resolution of any held question. It is the stable enumeration of what Phase 1 + Phase 2 work has earned, lifted into a compact structured form that future work can consume programmatically when consumption is needed — and a prose articulation of everything the structured form intentionally does not carry.

## What This Model Represents

The model represents the stable enumeration of the IA layered-content architecture as it stands after Phase 1 closure (mode sketches B1–B4 + cross-mode synthesis B5) and Phase 2 progress (opening sketch + three input-category deepenings + sparse-articulation fallback pressure + structured-IA-model options note).

Specifically, the structured appendix carries:

- The eight IA layer names that hold across the four worked-example modes
- The four worked-example mode names (SKU-driven; collection / merchandising; marketing / message-driven; brand campaign / editorial)
- The mode-specific layer mapping (which mode adds which mode-specific layer; SKU-driven adds none)
- The five carrier types observed across the architecture (prose; structural; visual-reference; governance; held-candidate)
- The six brand-system input categories from the Phase 2 opening sketch
- The three input categories that have been deepened to date
- The six-layer fallback chain from the sparse-articulation pressure note
- The five carrier-status values from the Phase 1 cross-mode synthesis
- The named held-question categories — entries here are markers that the question is *held* in prose; they are not encoded structurally

The prose carries everything else: the layer-by-layer narrative; the carrier-status matrix's content distribution per category; the operator-judgment paths; the inferred-not-stated semantics; the fallback-chain interpretation; the held candidates with their reasoning; the curation-premise pressure question; the apex Named Limitations.

This is the hybrid the options note recommended. Rigor where it's earned; prose where it isn't.

## What This Model Does Not Represent

The structured appendix intentionally omits content that has not earned structural form by the v51 doctrine ("structure earns its keep over prose by observed operational pressure"). The omissions are deliberate, not gaps:

- **Operator-judgment paths.** Procedural content (operator weighs candidates against criteria; operator resolves cross-source conflict; operator marks inferred-not-stated). Not data; not modeled.
- **Inferred-not-stated semantics.** A discipline currently carried as prose convention. Surfaced by the sparse-articulation pressure note as a paper-pressed structural-carrier candidate; not earned.
- **Fallback-chain interpretation.** The chain's *order* is in the appendix; the chain's *semantics* (what each level means; when the operator escalates; what marking-as-derived requires) is in prose.
- **Held / unearned schema candidates.** Composite-anchor mutations (collection deflated; marketing held; campaign held + sharper); structured slot-message-element fields; selection_axis enum; reference-type tag (with two divergent category proposals from the visual pair); brand-platform first-class entity; approval-state metadata; rejected_assets entity; articulation_state flag; derivation_basis field; fallback_chain_position annotation; worked_example_defaults carrier; contradiction_log entity. Held in prose; not encoded.
- **Curation-premise pressure question.** B4 / B5 architectural concern with three operational outcomes (premise holds; refines; fragments). Held in prose; not encoded.
- **Apex Named Limitations.** Three limitations carried forward (#1 specific aesthetic-carrier schema; #2 inheritance / override precedence; #3 cross-base / marketing / campaign operational evidence). Held in prose; not encoded.
- **Per-category carrier-status distribution.** The Phase 2 deepenings produced detailed carrier-status matrices per input category. The aggregated detail lives in those artifacts. The structured appendix carries only the *categories* themselves, not their per-layer distributions.
- **Mode-specific content per layer.** The Phase 1 sketches carry rich mode-specific content per layer (slot_role enums per mode; cross-axis curation tradeoffs per mode; etc.). The structured appendix carries only the *layer names* and the *mode-specific layer mapping*, not the contents.

The omissions are not aspirational placeholders for future structuring. They are content that the architecture has decided, by current evidence, is more honestly held in prose.

## Relationship to Phase 1 and Phase 2 Artifacts

This artifact does not replace any prior artifact. The Phase 1 sketches, cross-mode synthesis, Phase 2 opening sketch, three deepenings, sparse-articulation pressure note, and options note remain authoritative for their subject matter at content depth. This artifact is a *structured form companion* to that prose synthesis — the stable enumeration extracted; the substantive content kept where it is.

A returning reader needing per-mode IA content reads B1–B4. A returning reader needing input-category-to-layer mapping reads the relevant deepening. A returning reader needing the architecture's stable shape and the held-question state reads this artifact. All three are valid entry points for different questions.

## How to Read the Structured Appendix

The appendix is data, not interpretation. Each top-level key carries a list (or, for `mode_specific_layers`, a map). The lists are not exhaustive in absolute terms — they are exhaustive of *what's stable enough to enumerate at this evidence depth*.

When the appendix lists an item, that item is stable enough to be referenced by name without further qualification. When the appendix omits something, the omission is deliberate — either the content is held in prose (per the section above) or it is not yet earned by Phase 1 + Phase 2 evidence.

The appendix's `held_questions` list is a special case: each entry names a category of question that is held in prose, not encoded structurally. The entry is a *marker that the question exists*, not a structural representation of the question's content.

The appendix is intentionally small. Growing it requires earning structural form for additional content per the v51 doctrine — observed operational pressure surfaces a need; paper prediction does not. Future work should resist adding speculative structure here and instead add prose where uncertainty lives.

## Operator-Judgment and Inferred-Not-Stated Limitations

Two architectural realities make pure structural representation incomplete on its own:

**Operator judgment is structurally load-bearing in stress conditions.** The sparse-articulation fallback pressure note's findings: when articulation is sparse / contradictory / divergent across multiple input categories, the fallback model surfaces options at every conflict point but does not auto-resolve. Operator judgment becomes the load-bearing layer. The structured form cannot encode operator judgment as data because operator judgment is procedural — it depends on context the structured form does not carry. The prose carries this; the appendix does not.

**Inferred-not-stated content is currently a discipline, not a structural carrier.** When a brand's articulation is sparse, operator practice marks derived content as inferred-not-stated to preserve the gap honestly. Phase 2 surfaced this as a paper-pressed structural-carrier candidate (a `derivation_basis` field; a `articulation_state` flag) but neither is earned. The prose carries the discipline; the appendix does not.

The structured form's value is its stability. Operator judgment and inferred-not-stated content are not yet stable in shape. Encoding them now would commit to a representation the architecture has not pressured.

## Held Candidates and Unearned Structure

The Phase 1 + Phase 2 work surfaced a substantial number of paper-pressed structural-carrier candidates. Each is held; none is in the appendix. The list, kept here in prose so it remains visible without being encoded:

- **Composite-anchor representation across modes.** Three mode-specific candidates from the cross-mode probe series (`messages` / `briefs` for marketing; `grouping_archetype` for collection; `campaign_concept` for campaign). Collection's was operationally deflated; marketing's and campaign's are held; the unified `composite_anchor` polymorphic-entity question is unearned.
- **Reference-type tag on `reference_assets`.** Photography artifact proposes 5 categories (lighting / composition / styling / continuity / product); asset library artifact proposes 6 categories (product / lifestyle / campaign / editorial / moodboard / continuity). Both paper-only. Divergence not resolved.
- **Structured slot-message-element fields** (offer text; brand identifier presence; callout emphasis; copy-overlay region) for marketing-mode slots. Paper-pressed; held.
- **`selection_axis` enum** classifying curation events by judgment dimension. Surfaced in cross-mode probe; held.
- **`brand_platforms` first-class entity** carrying values / voice / stance as structured fields. Surfaced in brand platform deepening; held; concretizes Named Limitation #1.
- **Approval-state metadata** on `reference_assets` (who approved; when; for what scope; supersession). Surfaced in asset library deepening; held.
- **`rejected_assets` first-class entity** for negative-evidence boundary signal. Surfaced in asset library deepening; held.
- **`articulation_state` flag** distinguishing rich / sparse / generic / contradictory articulation states. Surfaced in sparse-articulation pressure note; held.
- **`derivation_basis` field** on packet-level / slot-level prose carriers. Surfaced in sparse-articulation pressure note; held.
- **`fallback_chain_position` annotation** on resolved content. Surfaced in sparse-articulation pressure note; held.
- **`worked_example_defaults` first-class carrier**. Surfaced in sparse-articulation pressure note; held.
- **`contradiction_log` first-class entity** tracking operator-resolved contradictions. Surfaced in sparse-articulation pressure note; held.
- **Aspect-ratio-as-attribute on slots.** Paper-pressed in marketing and campaign mode sketches; held.
- **Per-mode role-typical aesthetic constraints attached to `slot_role`**. Paper-pressed in Phase 1 mode sketches; held.

Each candidate is held by the v51 doctrine: structure earns its keep when observed operational pressure surfaces a need; paper prediction does not. None has been operationally pressured at full-flow depth in any non-SKU mode (collection mode's deflation showed the deflation pattern can apply; marketing and campaign modes are paper-only at full-flow depth). The candidates remain available for future operational test outcomes to either deflate or earn.

## Curation-Premise Pressure Held

The B4 campaign-mode sketch and B5 cross-mode synthesis surfaced a load-bearing architectural concern: campaign-concept selection happens upstream of generation but is the dominant creative act in campaign mode. The current posture treats it as upstream setup; campaign-mode operationalization will test whether the foundational premise (curation as the singular runtime creative-discretionary act) holds, refines, or fragments.

The brand platform deepening sharpened this question by clarifying that brand platform articulation is the upstream source material that campaign-concept selection draws on. Whichever operational outcome the question reaches (premise holds → upstream setup; premise refines → concept seam alongside curation seam; premise fragments → multiple discretionary acts at different layers), brand platform is structurally implicated.

The structured appendix lists `curation_premise_pressure` in its `held_questions` row. The prose here is the substantive carrier of the question's content. No operational evidence has earned a resolution; the question remains held.

## Apex Named Limitations Carried Forward

Three limitations from the apex definition-layer artifact remain unresolved. The structured appendix lists them in `held_questions` as `apex_named_limitations`. Prose is the carrier:

1. **Specific schema for brand-system, mode / category, or product-class aesthetic carriers.** The brand-system layer in the appendix's `ia_layers` enumeration is named but currently has no structural carriers in the IA. The brand platform deepening's most concrete finding was that this layer's unmodeled status is a real architectural gap. Held.
2. **Precedence rule for inheritance and override.** The inheritance / override behavior across IA layers remains implicit-additive (Model A in the apex aesthetic-layering pass). No formal precedence rule earned. Held.
3. **Marketing-mode and campaign-mode operational evidence; cross-base / cross-category / cross-brand pressure.** Both modes have structural shape proofs (PKT-MSG-001 cycle 1; PKT-CAMP-001 cycle 1 rerun; Phase 1 campaign D2C base setup) but neither has been operationally pressured at full-flow generation / curation / governance depth. Held.

These limitations are load-bearing: any reading of this model that elides them mis-reads it. The appendix's stability does not imply the architecture has resolved its unresolved questions; it implies the appendix is honest about which questions are settled and which are not.

## Self-Superseding Clause

This artifact is a v1 structured form. It should be superseded by:

- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs and any operational evidence — milestone-8 may revise the structured form, fold in newly-earned candidates, or restructure the held-questions row
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, and any operational evidence — the rewrite may absorb this artifact's structured appendix as its canonical model
- any operational test that earns one of the held candidates (which would migrate from the prose held-list into the structured appendix as a new carrier)
- any operational test that resolves one of the held questions (`curation_premise_pressure`; any of the apex Named Limitations) — resolution would reshape the appendix accordingly
- a v2 structured form when Phase 2's remaining input-category deepenings (visual identity system; application guidelines; past campaigns) accumulate enough content to extend the model

It does not supersede the apex definition-layer artifact, the three predecessor architectural passes, the Phase 1 sketches, the cross-mode synthesis, the Phase 2 opening sketch, the three input-category deepenings, the sparse-articulation fallback pressure note, or the options note. Those remain authoritative for their subject matter; this artifact extracts their stable enumeration into structured form while preserving prose for the substantive content they carry.

## Structured Appendix

The YAML below is the v1 structured form. It is intentionally small. Growing it requires earning structural form for additional content per the v51 doctrine.

```yaml
# Structured IA model v1 — appendix
# Carries only stable / earned-enough enumeration extracted from
# Phase 1 + Phase 2 prose work.
#
# Held questions and paper-pressed structural-carrier candidates remain
# in the prose above; this YAML does not encode them.
#
# Growing this appendix requires the v51 doctrine criterion: observed
# operational pressure surfaces a need.

ia_layers:
  - brand_system
  - category_product_class
  - mode_specific
  - packet
  - slot
  - candidate_generation
  - curation_seam
  - governed_asset

worked_example_modes:
  - sku_driven
  - collection_merchandising
  - marketing_message_driven
  - brand_campaign_editorial

mode_specific_layers:
  sku_driven: []
  collection_merchandising:
    - collection_grouping
  marketing_message_driven:
    - message_offer_communication
  brand_campaign_editorial:
    - campaign_concept
    - review_context_campaign_world_coherence

carrier_types:
  - prose_carrier
  - structural_carrier
  - visual_reference_carrier
  - governance_carrier
  - held_candidate

brand_system_input_categories:
  - brand_platform
  - visual_identity_system
  - photography_image_style_guide
  - asset_library
  - application_guidelines
  - past_campaigns

deepened_input_categories:
  - photography_image_style_guide
  - asset_library
  - brand_platform

# Ordered: most authoritative first; deepest fallback last.
fallback_chain:
  - asset_library
  - photography_image_style_guide
  - brand_platform
  - intra_category_recency_specificity
  - phase_1_worked_example_defaults
  - inferred_not_stated

carrier_status_values:
  - prose_carried
  - structurally_explicit
  - structurally_suggested_not_earned
  - operationally_deflated
  - operationally_untested

# Each entry names a question category whose substantive content is held
# in prose, not encoded structurally. The entry is a marker that the
# question exists; it is not a structural representation of the
# question's content.
held_questions:
  - apex_named_limitations
  - curation_premise_pressure
  - composite_anchor_structure
  - inferred_not_stated_structural_representation
  - fallback_chain_position_structural_representation
  - operator_judgment_representation
```

## Anchor Documents

### Phase 2 outputs

- [`docs/structured-ia-model-options-note-v1.md`](structured-ia-model-options-note-v1.md): the options note that recommended this hybrid form
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure; reframed the structured-form question and surfaced five paper-pressed structural-carrier candidates
- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; six brand-system input categories
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): photography style guide deepening — articulated visual conventions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset library deepening — demonstrated visual evidence
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening — non-visual articulation-only

### Phase 1 outputs

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; carrier-status matrix
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): redirection note framing the redirection
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode IA content
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode IA content
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; three Named Limitations carried forward in `held_questions` as `apex_named_limitations`
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback claim that grounds the fallback chain's first three positions
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; "structure earns its keep when operational pressure surfaces a need" doctrine that bounds the structured appendix's growth

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
