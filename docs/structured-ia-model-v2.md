# Structured IA Model v2

## Posture

```text
hybrid prose + structured appendix artifact
v2 of the canonical structured IA model
prose primary, structured appendix secondary
structured-form attempt at milestone 10 absorption depth
not schema
not JSON Schema
not Pydantic
not validator integration
not Airtable
not orchestration spec
not architecture.md rewrite
not brand-system carrier-decision resolution
not held-candidate adjudication
not milestone
not final doctrine
does not resolve held questions
does not resolve apex Named Limitations
self-superseding once a subsequent operational test, structured form, or front-door rewrite absorbs it
```

This artifact is v2 of the hybrid structured IA model. It supersedes [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md) at the structured-form layer while preserving v1's posture and discipline (hybrid prose + small YAML appendix; structure earns its keep when operational pressure or substantively-earned conceptual claims accumulate; held content stays prose).

Per ASK direction following milestone 10, the v2 question is not "build schema?" but **what can the structured appendix now carry without lying?** v1 predates the post-milestone-9 pressure sequence (PR #235–#238), the layered reference and discretion architecture (PR #239), the layered intake architecture (PR #241), the application-guidelines and past-campaigns deepenings (PR #242 + #243), the six-category cross-category synthesis (PR #244), and the milestone-10 absorption (PR #245). v2 absorbs the stable enumeration that work has earned without overcommitting on what remains held.

It is not the architecture rewrite, not a Pydantic schema, not a validator integration, and not a resolution of any held question. It is the stable enumeration of what Phase 1 + Phase 2 work has earned through milestone 10, lifted into a compact structured form that future work can consume programmatically when consumption is needed — and a prose articulation of everything the structured form intentionally does not carry.

## What v1 Carried

### v1 structured appendix scope

v1's YAML appendix encoded:

- The eight IA layer names (`ia_layers`)
- The four worked-example mode names (`worked_example_modes`)
- The mode-specific layer mapping (`mode_specific_layers`)
- The five carrier types (`carrier_types`)
- The six brand-system input categories (`brand_system_input_categories`)
- The three then-deepened input categories (`deepened_input_categories`)
- The six-layer fallback chain (`fallback_chain`)
- The five carrier-status values (`carrier_status_values`)
- Six held-question category markers (`held_questions`)

### v1 prose explicitly carried (and v2 preserves)

v1's prose narrative carried what the appendix could not honestly encode at v1 evidence depth:

- **Operator-judgment paths.** Procedural content not data; not modeled.
- **Inferred-not-stated semantics.** Discipline carried as prose convention; paper-pressed structural-carrier candidates not earned.
- **Fallback-chain interpretation.** The chain's *order* is in the appendix; the chain's *semantics* (when the operator escalates; what marking-as-derived requires) is in prose.
- **Held / unearned schema candidates** — fourteen-plus candidates (composite-anchor mutations; reference-type tag with two divergent proposals; structured slot-message-element fields; selection_axis enum; brand_platforms entity; approval-state metadata; rejected_assets entity; articulation_state flag; derivation_basis field; fallback_chain_position annotation; worked_example_defaults carrier; contradiction_log entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints).
- **Curation-premise pressure question** — held as a marker; substantive content in prose.
- **Apex Named Limitations** — held as a marker; substantive content in prose.
- **Per-category carrier-status distribution** — detail lives in the Phase 2 deepenings; only the categories themselves in the appendix.
- **Mode-specific content per layer** — detail lives in the Phase 1 sketches; only the layer names + mapping in the appendix.

### Why v1 is now conceptually behind milestone 10

Five things have changed since v1 in ways that affect what the structured form can honestly carry:

1. **Six-kind normative-force vocabulary** earned via the post-milestone-9 normative-force pass v1 ([`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md)). Pressured against PKT-SKU-009, PKT-COLL-001, PKT-CAMP-004; survived; absorbed into the architecture front door.
2. **Nine-fold reference-function taxonomy + nine-site discretion decomposition** earned via PR #239 ([`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md)). Pressured against PKT-SKU-009, PKT-COLL-001, PKT-CAMP-004, PKT-MSG-001; survived the four pressure cases plus a dining-vs-bedroom conceptual contrast; absorbed via PR #240.
3. **Seven-stage extraction sequence + operator-authored vs inferred-not-stated distinction** earned via PR #241 ([`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md)). The sequence behaves as a default graph with conditional jump-points and back-feedback edges per the PR #244 refinement.
4. **Two further input-category deepenings** earned via PR #242 + PR #243; all six brand-system input categories are now at deepening depth.
5. **Four-bucket category function classification + nine-relation cross-category vocabulary** earned via PR #244 ([`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md)). The brand-system structural decision's hybrid implication sharpened from three zones to five or six zones; absorbed at milestone 10.

v1's appendix omits all five additions. The omissions were honest at v1 time; they are no longer.

## What Milestone 10 May Have Made Structurally Stable

The v2 question for each candidate vocabulary: *is this stable enough to enumerate by name without further qualification?* The answer differs across the candidates.

### Stable enough to enumerate (v2 adds)

**Six-kind normative-force vocabulary.** Earned via the normative-force pass v1; pressured against three PKTs at current evidence depth and survived. The six kinds (descriptive / directive / constraint / reference / judgment / governance) are referenced by name across architecture.md and across PR #239 + PR #244 without disambiguation. Each kind is sufficiently distinct from the others that enumeration carries information beyond the names. **Add to v2 as `normative_force_kinds`.**

**Nine-fold reference-function taxonomy.** Earned via PR #239; pressured against four PKTs plus a cross-category conceptual contrast and survived. The nine functions (brand-system reference; category / product-class reference; collection / family-coherence reference; campaign-world reference; marketing / message reference; product-truth image; slot-level composition / crop / role reference; negative / avoid reference; governed-output continuity reference) are distinct in the carriers they currently use, the layers they live at, and the confusion patterns they avoid. The taxonomy is conceptual cut, not carrier modeling — encoding the names is honest; encoding their carrier shapes would be premature schema. **Add to v2 as `reference_functions`.**

**Nine-site discretion decomposition.** Earned via PR #239; per-site trace-gap analysis pressured against the same four PKTs. The nine sites (brand digestion; reference selection; layer translation; packet authorship; slot authorship; prompt remediation; candidate selection; governance-bearing curation; override / exception handling) are distinct in the kinds of decisions they involve and the trace they currently leave. The decomposition is conceptual cut, not procedure modeling — encoding the names is honest. **Add to v2 as `discretion_sites`.**

**Discretion classification (four kinds).** PR #239 classified each discretion site as authorship-bearing / confirmation-bearing / governance-bearing / procedural. The four-way split is the curation semantic split (per milestone 9 + Phase D fork-resolver test) generalized across the nine discretion sites. **Add to v2 as `discretion_kinds`** — small enumeration that pairs with `discretion_sites`.

**Seven-stage extraction sequence.** Earned via PR #241 with the seven stages (`evidence → articulated conventions → abstraction → application → validation → defaults → inference/authorship`). PR #244 refined the sequence's behavior to *default graph with conditional jump-points and back-feedback edges* (Stage 5 // Validation may move earlier under stale-articulation or more-operationally-credible cases; Stage 7 // Inference/Authorship operates as per-condition back-stop, not only final-stage fallback). **Add to v2 as `extraction_sequence` with `default_order` (the seven stages) and `behavior` (the default-graph descriptor).**

**Four-bucket category function classification.** Earned via PR #244. The six brand-system input categories map onto four buckets: evidence (asset library; past campaigns); articulation (brand platform; visual identity system; photography style guide); application (application guidelines); validation (past campaigns operates here too — past campaigns occupies both evidence AND validation buckets per its dual role). The classification is conceptual function cut, not content shape. **Add to v2 as `category_function_buckets`** — the four bucket names — plus a per-category-bucket mapping that handles past campaigns' dual occupancy.

**Nine-relation cross-category vocabulary.** Earned via PR #244. The relations (validates / contradicts / supersedes / operationalizes / demonstrates / abstracts / constrains / inherits / defers / fails-to-answer) describe how categories bear on one another in the intake architecture. The vocabulary is conceptual relation set, not pair modeling — encoding the relation names is honest; encoding the specific pairs (e.g., asset-library validates photography-style-guide) would be carrier modeling that the synthesis explicitly declined. **Add to v2 as `cross_category_relations`.**

**Five trace dimensions (named at PR #241 dry run).** Earned via the brand intake judgment-trace dry run v1 ([`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md)). The five dimensions (presence-of-inspection; articulation-state; chain-position; derivation-basis; contradiction-resolution) emerged from one walk on one synthetic stack and survived as named dimensions across PR #241 + PR #243 + PR #244. The dimension names are stable; carrier representations remain held. **Add to v2 as `trace_dimensions.named_at_dry_run`** — names only.

**One trace-dimension candidate surfaced post-dry-run (temporal-state).** Surfaced via PR #243 past-campaigns deepening as a candidate sixth trace dimension distinct from the five. Past-campaigns intake stresses scale-legibility at a dimension the dry run's five dimensions do not cleanly cover — current vs historical vs superseded classification per content piece. The candidate is paper-pressed across PR #243 + PR #244 trace requirements + milestone 10. **Add to v2 as `trace_dimensions.candidates_surfaced_post_dry_run` — temporal_state**, marked explicitly as candidate (held; not promoted to a primary trace dimension).

### Updated v1 keys

**`deepened_input_categories`.** v1 listed three. With PRs #242 + #243 + the four prior deepenings, all six brand-system input categories are now at deepening depth. Update v1's three-entry list to all six.

**`carrier_types`.** v1's five carrier types (prose; structural; visual-reference; governance; held-candidate) carry forward. The Phase 2 work and the cross-category synthesis did not surface a new carrier type that warrants enumeration here; the five hold.

**`held_questions`.** Add new markers for milestone-10-era held architectural questions:
- `brand_system_structural_decision` — sharpened from three-zone to five-or-six-zone hybrid implication; held.
- `extraction_sequence_jump_point_behavior_under_operational_pressure` — the default-graph behavior is articulated in `extraction_sequence.behavior` but its operational behavior under stress is unearned.
- `temporal_state_trace_carrier` — the candidate sixth trace dimension is enumerated under `trace_dimensions.candidates_surfaced_post_dry_run`; carrier shape held.
- `operator_authored_vs_inferred_not_stated_carrier_question` — PR #241 articulated the architectural distinction; whether and how to encode it as a derivation-basis sub-classification is held.

### Stable but explicitly not added

**Five-or-six-zone hybrid implication for the brand-system layer.** This is the synthesis pressure-analysis OF the brand-system structural decision, not stable doctrine. The decision itself is held; the zones are descriptive analysis of what hybrid would imply IF hybrid is the surviving shape. The architecture has not chosen hybrid; encoding the zones structurally would imply more carrier-shape commitment than the architecture has earned. **Stays in prose** (per architecture.md's Brand-System Layer Status section + PR #244 + this artifact's Section 4).

**Specific cross-category relation pairs (e.g., asset-library validates photography-style-guide).** The relation vocabulary (`cross_category_relations`) is enumerated; the specific pairs the synthesis named are paper claims at conceptual depth, not earned through operational pressure. Encoding pair-by-pair would imply an asserted dependency graph the architecture has not operationally validated. **Stays in prose** (in PR #244 Section 4).

## What Should Remain Prose / Held

Per the v1 doctrine ("structure earns its keep over prose by observed operational pressure"), v2 carries forward all of v1's omissions plus the new candidates surfaced through milestone 10.

### Carried forward from v1 (unchanged)

- **Operator-judgment paths.** Procedural content; not data.
- **Inferred-not-stated semantics.** Discipline carried as prose convention.
- **Fallback-chain interpretation.** Order in appendix; semantics in prose.
- **All v1 held / unearned schema candidates.** Composite-anchor mutations; reference-type tag (with two divergent proposals); structured slot-message-element fields; selection_axis enum; brand_platforms entity; approval-state metadata; rejected_assets entity; articulation_state flag; derivation_basis field; fallback_chain_position annotation; worked_example_defaults carrier; contradiction_log entity; aspect-ratio-as-attribute; per-mode role-typical aesthetic constraints.
- **Curation-premise pressure question.** Bounded `refines` reading at PKT-CAMP-004 scope per milestone 9; held.
- **Apex Named Limitations.** All three carried forward; status sharpened by Phase 2 deepenings + PR #244 cross-category angle.
- **Per-category carrier-status distribution.** Lives in deepenings.
- **Mode-specific content per layer.** Lives in Phase 1 sketches.

### New held content surfaced through milestone 10

- **Brand-system structural carrier decision.** Three live shapes (first-class throughout / terminal operator-mediated / hybrid; hybrid most likely on current evidence). Hybrid implication sharpened from three zones (PR #241) to five or six zones (PR #244). Decision held.
- **Specific carrier shapes for any of the five-or-six zones.** Stable brand-wide constants + approved references; prose / operator-mediated translation for abstraction and articulated conventions; per-touchpoint and per-mode constraint structural representation; governed-output continuity reference elevation; temporal-state trace dimension; intake-time judgment trace zone. Each zone names a carrier-pressure region; carrier shape held in each.
- **Temporal-state trace carrier.** Candidate sixth trace dimension (current / historical / superseded classification) for past-campaigns content. Enumerated under `trace_dimensions.candidates_surfaced_post_dry_run`; carrier shape held.
- **Derivation-basis sub-classification including operator-authored.** PR #241 named operator-authored as architecturally distinct from inferred-not-stated. Whether to encode as a fifth derivation-basis value (lifted-verbatim / inferred-from-evidence / worked-example-default / unresolved-marked / operator-authored) is held; sub-classification not promoted in v2.
- **Per-touchpoint schema** for application-guidelines content. Aspect-ratio-as-attribute and per-touchpoint approval-rule candidates paper-pressed in PR #242; held.
- **Governed-output continuity carrier.** Past-campaigns content uniquely contributes structurally-recognizable content at the governed-asset layer via PR #239's ninth reference function. Whether to elevate `reference_assets` linkage with a continuity-reference-as-derivative-input carrier is held.
- **Continuity-breaking intake trace.** The architecture's scale-legibility frontier at the brand-digestion site relies on operator-continuous interpretation. PR #241's dry run named the conditional pressure path bound to a multi-operator or continuity-breaking scale condition untested. Carrier shape held.
- **Held-candidate adjudication.** With the v2 expansion, the held-candidate inventory now spans 16+ candidates. No adjudication map; each candidate remains paper-pressed.
- **Operationally untested claims.** The cross-category relation pairs PR #244 names are paper claims at conceptual depth. The seven-stage extraction sequence's default-graph behavior is paper claim at synthesis depth. Neither has been operationally pressured at full-flow depth across multiple modes.

The omissions are not aspirational placeholders. They are content that current evidence treats more honestly in prose than in structure.

## Candidate Structured Appendix Shape

The YAML below is v2's proposed structured appendix. It preserves v1's nine top-level keys (with `deepened_input_categories` updated and `held_questions` extended) and adds eight new top-level keys for the milestone-10-stable enumerations.

```yaml
# Structured IA model v2 — appendix
# Carries only stable / earned-enough enumeration extracted from
# Phase 1 + Phase 2 work through milestone 10.
#
# Held questions and paper-pressed structural-carrier candidates remain
# in the prose above; this YAML does not encode them.
#
# Growing this appendix requires the v51 doctrine criterion: observed
# operational pressure surfaces a need OR substantively-earned conceptual
# claims accumulate at synthesis depth.
#
# v2 changes from v1:
#   - deepened_input_categories: now all six (PR #242 + PR #243)
#   - held_questions: extended with milestone-10-era markers
#   - new keys: normative_force_kinds; reference_functions; discretion_sites;
#     discretion_kinds; extraction_sequence; category_function_buckets;
#     category_function_assignments; cross_category_relations;
#     trace_dimensions

# === v1 keys (carried forward) ===

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

# v2 update: all six now deepened.
deepened_input_categories:
  - photography_image_style_guide
  - asset_library
  - brand_platform
  - visual_identity_system
  - application_guidelines
  - past_campaigns

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

# === v2 additions ===

# PR #239 / normative-force pass v1.
# Each kind names a kind of authority a piece of information carries
# across the architecture.
normative_force_kinds:
  - descriptive       # what is true
  - directive         # what should happen
  - constraint        # what must not be violated
  - reference         # what visually anchors interpretation
  - judgment          # what was resolved by a human, operator, or agent
  - governance        # what elevates output into governed asset identity

# PR #239 — nine-fold taxonomy. Each function names what the reference
# carries, what it constrains, where it lives in the layered model,
# and what it must not be confused with. Carrier shapes per function
# are held in prose.
reference_functions:
  - brand_system
  - category_product_class
  - collection_family_coherence
  - campaign_world
  - marketing_message
  - product_truth
  - slot_level_composition_crop_role
  - negative_avoid
  - governed_output_continuity

# PR #239 — nine-site decomposition. Each site names a place where
# creative judgment enters the architecture. Per-site trace-gap analysis
# in prose.
discretion_sites:
  - brand_digestion
  - reference_selection
  - layer_translation
  - packet_authorship
  - slot_authorship
  - prompt_remediation
  - candidate_selection
  - governance_bearing_curation
  - override_exception_handling

# PR #239 — four-kind classification per discretion site.
# Authorship-bearing / confirmation-bearing / governance-bearing /
# procedural. Per-site classification (and how it varies by mode) lives
# in prose.
discretion_kinds:
  - authorship_bearing
  - confirmation_bearing
  - governance_bearing
  - procedural

# PR #241 default order; PR #244 default-graph behavior refinement.
# The sequence is the production-side on-ramp from a brand-system stack
# into the layered IA. Conditional jump-points and back-feedback edges
# are described in prose.
extraction_sequence:
  default_order:
    - evidence
    - articulated_conventions
    - abstraction
    - application
    - validation
    - defaults
    - inference_authorship
  behavior: default_graph_with_conditional_jump_points_and_back_feedback_edges

# PR #244 — four-bucket function classification of the six brand-system
# input categories.
category_function_buckets:
  - evidence
  - articulation
  - application
  - validation

# PR #244 — per-category bucket assignment. Past campaigns occupies
# both evidence and validation per its dual role (campaign imagery
# is evidence; campaign-as-execution-unit envelope validates the other
# articulation-shaped categories).
category_function_assignments:
  brand_platform:                  [articulation]
  visual_identity_system:          [articulation]
  photography_image_style_guide:   [articulation]
  asset_library:                   [evidence]
  application_guidelines:          [application]
  past_campaigns:                  [evidence, validation]

# PR #244 — nine-relation vocabulary describing how categories bear
# on one another in the intake architecture. Specific pair instances
# (e.g., asset library validates photography style guide) live in
# prose; encoding pair-by-pair would imply an asserted dependency graph
# the architecture has not operationally validated.
cross_category_relations:
  - validates
  - contradicts
  - supersedes
  - operationalizes
  - demonstrates
  - abstracts
  - constrains
  - inherits
  - defers
  - fails_to_answer

# PR #241 dry run named five trace dimensions; PR #243 surfaced
# temporal_state as a candidate sixth dimension distinct from the five.
# Carrier representation for any dimension remains held.
trace_dimensions:
  named_at_dry_run:
    - presence_of_inspection
    - articulation_state
    - chain_position
    - derivation_basis
    - contradiction_resolution
  candidates_surfaced_post_dry_run:
    - temporal_state

# Each entry names a question category whose substantive content is held
# in prose, not encoded structurally. The entry is a marker that the
# question exists; it is not a structural representation of the
# question's content.
held_questions:
  # Carried forward from v1
  - apex_named_limitations
  - curation_premise_pressure
  - composite_anchor_structure
  - inferred_not_stated_structural_representation
  - fallback_chain_position_structural_representation
  - operator_judgment_representation
  # New at v2 (milestone-10-era held architectural questions)
  - brand_system_structural_decision
  - extraction_sequence_jump_point_behavior_under_operational_pressure
  - temporal_state_trace_carrier
  - operator_authored_vs_inferred_not_stated_carrier_question
  - reuse_derivative_governance
  - five_or_six_zone_hybrid_implication
```

The appendix grew from nine top-level keys (v1) to seventeen (v2). Each addition was tested against the v1 doctrine: the conceptual claim is substantively earned through PR #239 + PR #241 + PR #244 + the milestone-10 absorption, and enumeration of the names carries information beyond the names. Held content (carrier shapes; per-pair relations; specific zone implications; sub-classifications) remains prose.

## v2 vs Options Decision

Per ASK direction: the artifact may be `structured-ia-model-v2.md` directly, or it may need to compare possible v2 shapes in an options note before committing. v1 was preceded by `docs/structured-ia-model-options-note-v1.md` (per v1's Posture); the precedent for an options pass exists.

This artifact is published as **v2 directly** rather than as a v2 options note. Three reasons:

1. **Shape is settled.** v1 chose hybrid prose + small YAML appendix per the options note's recommendation. v2 inherits that shape. The decision an options note would re-pose is not in flight.

2. **Content scope is the substantive question, and the answer is articulable.** The newly-earned vocabularies (six-kind force; nine-fold reference-function taxonomy; nine-site discretion decomposition; four-kind discretion classification; seven-stage extraction sequence with default-graph behavior; four-bucket category function classification; nine-relation cross-category vocabulary; five trace dimensions plus temporal-state candidate) are well-articulated in their source artifacts (PR #239, PR #241, PR #244, the dry run, and the milestone-10 marker). For each, the question *should this be in the appendix?* has a defensible answer at this evidence depth, and Section 3 of this artifact answers it inline. An options note would re-pose the same question with less concrete commitment.

3. **The held / not-promoted boundary is the harder analytical work, and v2 does it inline.** Section 4 (What Should Remain Prose / Held) carries the boundary explicitly. An options note would surface the boundary as an open question; v2 surfaces the boundary as a held position with reasoning. The latter is more useful at this evidence depth because the architecture's stance on what stays prose is itself substantively held (not under live deliberation).

What blocks a v2 directly *would* look like: a substantive disagreement about whether one of the additions is genuinely stable enough to enumerate. None of the additions are operationally pressured at full-flow depth across multiple modes; if ASK reads any of them as paper-only conceptual claims that should not yet be structured, v2 should be reverted to a v2 options note that surfaces the disagreement explicitly. The exact-scoped-diff gate is the surface where that disagreement would land. Pre-empting it with an options note for inclusion-decisions that have defensible answers would be ceremony.

## Relationship to Future Pressure Surfaces

v2 may clarify the surfaces PR #244 named as candidate next pressure. Implications only; **no authorization**.

- **Brand-system carrier-decision successor.** v2's `held_questions` list explicitly names `brand_system_structural_decision`, `five_or_six_zone_hybrid_implication`, and several adjacent held-candidate questions (`temporal_state_trace_carrier`; `operator_authored_vs_inferred_not_stated_carrier_question`; `reuse_derivative_governance`). A successor artifact pressuring the structural decision would have a sharper substrate to work from — the held inventory is more complete, the conceptual hierarchy among the held items is articulated. Candidate; not authorized.
- **Continuity-breaking intake test.** v2's `trace_dimensions` enumeration (five named dimensions plus the temporal-state candidate) names what a continuity-break test would need to instrument. The test design becomes cleaner because the dimension vocabulary is structured rather than scattered across PR #241 + PR #243 + milestone-10 prose. Candidate; not authorized.
- **Application-guidelines cross-touchpoint operational test.** v2 does not directly clarify this surface beyond what milestone-10 already absorbed; the test would pressure Zone 3 of the five-or-six-zone hybrid implication, which v2 leaves in prose under `held_questions` as `five_or_six_zone_hybrid_implication`. Candidate; not authorized.
- **Past-campaigns temporal-state operational test.** Same pattern as application-guidelines; v2 enumerates the temporal-state candidate trace dimension under `trace_dimensions.candidates_surfaced_post_dry_run`, which sharpens what an operational test would test. Candidate; not authorized.
- **Validator integration.** v2's structured appendix is a more substantive substrate for a Pydantic / JSON Schema derivation than v1 was, because the appendix now encodes cross-category vocabulary that downstream code paths could consume. Whether validator integration is still premature is a strategic decision. Candidate; not authorized.
- **Orchestration spec.** v2's `extraction_sequence` key encodes a default-order seven-stage sequence with a named graph-behavior descriptor. An orchestration consumer could read this as an intake-graph specification. Whether the architecture is ready to author orchestration semantics for the durable layer (the gap between machine-readable enumeration plus drift detection — current state — and machine-usable orchestration spec — target — named in [`docs/architecture.md`](architecture.md)) is a strategic decision. Candidate; not authorized.
- **Architecture front-door wholesale rewrite.** v2 is a structured-form companion to the current front door, not a successor to it. A wholesale rewrite is held for a future plateau. Candidate; not authorized.

The architecture's seven candidate next-pressure surfaces from PR #244 + milestone 10 are not flattened or ranked by v2. v2 is itself one of those seven (Structured IA v2). Its landing does not authorize the others.

## Earned vs Held

What v2 clarifies at this evidence depth:

- **The structured form has substantively grown.** v1's nine top-level appendix keys become seventeen at v2 by absorbing the post-milestone-9 normative-force vocabulary, the PR #239 reference-function and discretion decomposition, the PR #241 extraction sequence and default-graph behavior, the PR #244 cross-category function classification and relation vocabulary, and the PR #241 dry run plus PR #243 trace dimension enumeration.
- **The held / not-promoted boundary is sharper.** v2's `held_questions` list grows from six markers to twelve. Each addition names an architectural question at substantively earned depth without resolving it.
- **The five-or-six-zone hybrid implication is a held question, not stable doctrine.** v2 declines to encode the zones structurally even though they are useful prose analysis. The brand-system structural decision remains held; the zone analysis is preserved in `architecture.md` and PR #244 + this artifact's Section 4.
- **The cross-category relation vocabulary is encoded as a list, not a graph.** v2 enumerates the nine relations without encoding specific pair instances. The pair-by-pair claims PR #244 names are paper claims at conceptual depth; encoding them would imply an asserted dependency graph the architecture has not operationally validated.
- **The trace-dimension vocabulary is encoded with explicit candidate distinction.** v2 separates `named_at_dry_run` (five operationally-walked dimensions) from `candidates_surfaced_post_dry_run` (one paper-pressed candidate). The distinction preserves the difference between dimensions that emerged from a walk and dimensions that emerged from subsequent pressure.
- **The category function classification handles past-campaigns' dual occupancy honestly.** Past campaigns occupies both evidence and validation buckets per its dual role; v2 encodes the dual occupancy in `category_function_assignments` rather than forcing a single-bucket choice that would lose information.

What remains held — unchanged by v2:

- **Brand-system layer structural decision.** Three live shapes (first-class throughout / terminal operator-mediated / hybrid). Five-or-six-zone hybrid implication if hybrid is the surviving shape. Held.
- **Apex Named Limitations.** All three carried forward.
- **All paper-pressed structural-carrier candidates.** Sixteen-plus candidates aggregated across Phase 1 + Phase 2 + the milestone-10 absorption. None promoted by v2.
- **Operator-judgment representation.** Procedural content; not data; carried in prose.
- **Specific carrier shapes for any of the five-or-six zones.** Held.
- **Cross-category relation pair instances.** Conceptual claims at synthesis depth; no operational validation; encoding pair-by-pair would imply asserted dependency.
- **Default-graph behavior of the extraction sequence under operational stress.** v2 encodes the descriptor; the operational behavior is unearned and held.
- **Temporal-state trace carrier.** Candidate dimension enumerated; carrier shape held.
- **Operator-authored vs inferred-not-stated carrier question.** Distinction articulated in PR #241; sub-classification not promoted in v2.
- **Reuse / derivative governance.** Held across all four modes per the apex artifact.
- **Validator integration.** Held until an operational consumer surfaces the need.
- **Orchestration spec.** Held.

What v2 explicitly does not do:

- Resolve the brand-system layer structural decision, the curation-premise architectural fork, the reuse / derivative governance question, or any Apex Named Limitation
- Promote any held candidate to a structural carrier
- Adjudicate the held-candidate inventory
- Modify [`docs/architecture.md`](architecture.md), [`docs/index.md`](index.md), [`README.md`](../README.md), [`docs/method.md`](method.md), [`AGENTS.md`](../AGENTS.md), any milestone marker, or any prior artifact
- Modify the grounding note
- Author orchestration semantics for the durable layer
- Author validator integration (Pydantic / JSON Schema derivation)
- Author intake-form / UI design
- Authorize Airtable mutation, schema mutation, or any operational test
- Author milestone 11 or any subsequent plateau marker
- Authorize a brand-system carrier-decision successor or any other next-pressure surface PR #244 named
- Encode the five-or-six-zone hybrid implication structurally
- Encode specific cross-category relation pair instances structurally
- Encode the extraction sequence's conditional jump-points or back-feedback edges as a graph data structure (the `behavior` descriptor names the behavior in prose-shape; the graph data is held)

## Self-Superseding Clause

This artifact is v2 of the structured form. It should be superseded by:

- A subsequent operational test that earns one of the held candidates (which would migrate from the prose held-list into the structured appendix as a new carrier in v3)
- A subsequent operational test that resolves one of the held questions (`curation_premise_pressure`; `brand_system_structural_decision`; any of the apex Named Limitations; any of the milestone-10 held questions) — resolution would reshape the appendix accordingly
- A brand-system carrier-decision successor that resolves the structural decision (would reshape the appendix's brand-system-related held entries and potentially elevate one of the five-or-six zones)
- A continuity-breaking intake test that operationally pressures the temporal-state trace candidate or the named trace dimensions (would migrate dimensions between `named_at_dry_run` and `candidates_surfaced_post_dry_run` or earn a carrier)
- A validator integration that derives Pydantic models from this appendix (would shift the appendix from machine-readable to machine-consumable; v3 would update accordingly)
- An orchestration consumer that reads the `extraction_sequence` key as an intake-graph specification (would shift the appendix from machine-readable enumeration to machine-usable orchestration substrate)
- A subsequent milestone marker that absorbs operational evidence and authorizes a v3
- The eventual rewrite of [`docs/architecture.md`](architecture.md) that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 deepenings, the structured IA model, the post-milestone-9 pressure sequence, the Phase 2 six-category completion arc, and any operational evidence into a single current-architecture document — the rewrite may absorb v2's structured appendix as its canonical model

It does not supersede v1's content scope (v2 preserves all v1 keys), the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the brand-system hybrid carrier decision surface v1, the brand intake judgment-trace dry run v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; v2 extracts their stable enumeration into structured form while preserving prose for the substantive content they carry.

## Anchor Documents

### Direct predecessor

- [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md): v1 of the structured IA model; v2 preserves v1's posture and v1's nine top-level appendix keys (with `deepened_input_categories` and `held_questions` updated)

### Milestone-10 absorption surface

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): the milestone-10 plateau marker that this artifact reads against
- [`docs/architecture.md`](architecture.md): the architecture front door at milestone-10 currency
- [`docs/index.md`](index.md): the docs navigation at milestone-10 currency

### Earned-since-v1 architectural framing

- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary that v2 encodes as `normative_force_kinds`
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): nine-fold reference-function taxonomy that v2 encodes as `reference_functions`; nine-site discretion decomposition that v2 encodes as `discretion_sites`; four-kind discretion classification that v2 encodes as `discretion_kinds`
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): seven-stage extraction sequence that v2 encodes as `extraction_sequence.default_order`; operator-authored vs inferred-not-stated distinction (held; not encoded)
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): four-bucket category function classification that v2 encodes as `category_function_buckets` + `category_function_assignments`; nine-relation cross-category vocabulary that v2 encodes as `cross_category_relations`; default-graph behavior descriptor that v2 encodes as `extraction_sequence.behavior`
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): five trace dimensions that v2 encodes as `trace_dimensions.named_at_dry_run`
- [`docs/brand-system-input-past-campaigns-to-ia-mapping-v1.md`](brand-system-input-past-campaigns-to-ia-mapping-v1.md): temporal-state trace candidate that v2 encodes as `trace_dimensions.candidates_surfaced_post_dry_run`

### The six Phase 2 input-category deepenings

- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md)
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md)
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md)
- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)
- [`docs/brand-system-input-application-guidelines-to-ia-mapping-v1.md`](brand-system-input-application-guidelines-to-ia-mapping-v1.md)
- [`docs/brand-system-input-past-campaigns-to-ia-mapping-v1.md`](brand-system-input-past-campaigns-to-ia-mapping-v1.md)

### Phase 1 + Phase 2 framing

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): six-layer fallback chain (carried in v1; v2 preserves)
- [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md): operator-judgment protocol sketch (held; not encoded in v2)
- [`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md): three-shape brand-system structural decision (held; v2's `held_questions` includes `brand_system_structural_decision`)
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection that opened the Phase 1 + Phase 2 trajectory
- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): Phase 1 cross-mode synthesis
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md)
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md)
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md)
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md)

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; three Named Limitations carried forward in `held_questions` as `apex_named_limitations`
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy claim that grounds the fallback chain's first three positions
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; "structure earns its keep when operational pressure surfaces a need" doctrine that bounds appendix growth
- [`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md): bounded `refines` reading at PKT-CAMP-004 scope; carried in `held_questions` as `curation_premise_pressure`

### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau (this artifact reads against)
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): milestone-8 plateau (v1's plateau context)

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
