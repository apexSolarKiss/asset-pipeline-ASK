# Structured IA Model v2 Consumer Preflight v1

## Posture

```text
architecture-hardening preflight
reads structured IA model v2 against possible structured consumers
not structured IA v3
not schema
not JSON Schema
not Pydantic
not validator implementation
not orchestration spec
not Airtable mutation
not architecture.md rewrite
not held-candidate adjudication map
not milestone marker
not a candidate-next-pressure-surface enumeration
self-superseding when a structured consumer surfaces and operational pressure earns either v3 or a deliberate park
```

This preflight assesses what would count as a structured consumer for structured IA model v2 ([`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md)), and what v2 currently can and cannot support. It is analytical preparation, not implementation. No structured form is authored; no consumer is built; no held question is closed.

## 1. Question Named

The architecture has carried structured IA model v2 since milestone 10 as a hybrid prose + seventeen-key YAML appendix. The architecture front door and the consumer-pressure pass (PR #275) both name a recurring observation: the YAML appendix awaits a structured consumer. Its claim — that the architecture can be expressed in structured form — survives because the prose articulations of the same content are consumed. The structural form's distinctive value awaits a structurally distinct consumer.

The question this preflight asks: *what would count as a structured consumer for v2, and what can v2 actually support today?*

A consumer is **conceptual** when it reads the enumerations by name and reasons in prose. PR #274's artifact grammar is a conceptual consumer: it consumes the layered IA model, the reference-function taxonomy, the discretion decomposition, the curation semantic split, the carrier types, and the operator-authored versus inferred-not-stated distinction as reasoning substrate, with translation rules rendering author-side labels into audience-facing prose. The YAML appendix is read as a list of names; the structural form is not load-bearing.

A consumer is **structured** when it programmatically reads the YAML and produces structured output. A structured consumer treats appendix keys as data, traverses the enumerations, and emits a downstream artifact whose shape depends on what the YAML carries. Whether that downstream artifact is itself structured (an Airtable base plan with entities and fields) or rendered (an HTML map; a documentation page) varies; what makes the consumer structured is the programmatic ingestion of the appendix.

The distinction matters because it sets the threshold for what would justify structured IA v3. Conceptual consumers can be served by v2's current shape without modifying the appendix; structured consumers may surface gaps the appendix would have to close before producing reliable output.

## 2. Candidate Structured Consumers

Seven consumers are named here. The list is not exhaustive; it names plausible substrates that have been implied by current architecture-hardening work or by the experience-architecture reframe.

- **Artifact grammar generator.** A consumer that reads v2 + an artifact-grammar specification (such as the PR #274 implementation-roadmap + system-map grammar) + ingested deployment context, and produces an instance of the generated artifact.
- **Validator / linting pass.** A consumer that reads v2 and validates whether a candidate artifact (or a candidate intake input, or a candidate generated output) conforms to the architecture's enumerations: every reference cites a valid reference function; every discretion site is named with a valid discretion kind; trace dimensions are populated; held-question markers are surfaced honestly.
- **Airtable base-plan generator.** A consumer that reads v2 + an artifact-grammar specification + deployment context, and produces an Airtable base specification: entities, tables, fields, views, automations. The base plan itself is structured output; v2 is its conceptual input.
- **Python scaffold generator.** A consumer that reads v2 + an artifact-grammar specification + deployment context, and produces a Python scaffold: folder scanner; metadata extractor; manifest generator; naming validator; QA checks.
- **DAM taxonomy generator.** A consumer that reads v2 + intake content and produces a DAM taxonomy: folder structure; naming conventions; metadata schema; search facets; role assignments. The consumer would need v2's layer enumeration plus brand-system input categories plus mode-specific layer mapping to ground its taxonomy.
- **Provenance / confidence checker.** A consumer that reads v2's `trace_dimensions` and validates that any generated artifact carries provenance fields covering the five named dimensions plus the temporal-state candidate where applicable; flags artifacts that omit required provenance.
- **Documentation / HTML map generator.** A consumer that reads v2 and renders the layered IA model visually (an HTML or SVG map of the eight layers, their inputs, their flows, their decision and governance points). Could supplement the existing architecture-tree diagram cadence or serve a different rendering surface.

## 3. Consumer Depth Classification

Each consumer is classified by the form of ingestion it performs. The same consumer concept can sit at different depths depending on how it actually reads v2.

| Consumer | Depth | What v2 ingestion looks like |
|---|---|---|
| Artifact grammar generator (e.g., PR #274 grammar) | Conceptual | Read enumeration names; reason in prose; translate to audience-facing terms; produce a Markdown deliverable |
| Documentation / HTML map generator (simple render) | Semi-structured | Programmatically pull layer names, mode mappings, trace dimensions, brand-system categories; render an HTML map; no semantic enforcement |
| Provenance / confidence checker (linting only) | Semi-structured | Programmatically read `trace_dimensions`; check that a candidate artifact's provenance section names the five dimensions; produce a pass/warn report |
| DAM taxonomy generator | Structured | Programmatically read `ia_layers` + `brand_system_input_categories` + `mode_specific_layers` + intake content; produce a structured taxonomy document |
| Airtable base-plan generator | Structured | Programmatically read v2 keys + an artifact-grammar specification + intake content; produce a structured Airtable base specification |
| Python scaffold generator | Structured | Programmatically read v2 keys + artifact-grammar specification + intake content; produce a Python folder/module scaffold |
| Validator / linting pass (enforcing) | Runtime / orchestration | Programmatically read v2 keys; validate downstream artifacts or intake inputs with pass/fail semantics; enforce conformance |
| Orchestration spec (full intake-to-output) | Runtime / orchestration | Programmatically read v2 keys + an orchestration semantics layer that v2 does not currently carry; execute intake → diagnosis → generation as a runtime workflow |

The classification is descriptive, not prescriptive. Some consumers (like the documentation generator) could be built at semi-structured depth as a near-term move; others (validator with pass/fail; orchestration) require semantics v2 does not currently provide.

## 4. v2 YAML Appendix Read Against the Consumers

Each top-level appendix key is read against the candidate consumers. The question per key: *what kind of consumer can read this honestly, and what kind cannot?*

### Readily consumable as enumeration

These keys carry a stable, bounded list of names. A semi-structured or structured consumer can read them as lookup tables without requiring prose interpretation.

- `ia_layers` — eight layer names; consumed by every candidate consumer
- `worked_example_modes` — four mode names; consumed by every candidate consumer that does anything mode-aware
- `mode_specific_layers` — per-mode layer mappings; consumed by mode-aware consumers (artifact grammar generator; DAM taxonomy generator if mode-aware; Airtable base-plan generator)
- `carrier_types` — five carrier types; consumed by any consumer that classifies content by carriage
- `brand_system_input_categories` — six categories; consumed by intake-aware consumers
- `deepened_input_categories` — same six categories at deepening depth; mostly equivalent to the prior key from a consumer's perspective; useful for documentation generators distinguishing surface from depth
- `carrier_status_values` — five status values; consumed by linting / status-reporting consumers
- `normative_force_kinds` — six force kinds; consumed by consumers that classify content by authority type
- `reference_functions` — nine reference functions; consumed by consumers that classify reference content
- `discretion_sites` — nine sites; consumed by consumers that characterize where judgment enters
- `discretion_kinds` — four kinds; pair-consumed alongside `discretion_sites`
- `category_function_buckets` — four buckets; consumed alongside `category_function_assignments`
- `category_function_assignments` — per-category bucket mapping; consumed by intake-graph consumers
- `cross_category_relations` — nine relations; consumed by consumers that characterize cross-category dependencies (but see ambiguity below)

### Ambiguous: structurally present, semantically prose-dependent

These keys are encoded but a consumer that ingests them as raw data will produce gaps that only prose can fill.

- `fallback_chain` — encoded as ordered list. The chain's order is structurally legible; the chain's semantics (when the operator escalates; what marking-as-derived requires) is prose-only per v2's explicit decision. A consumer that traverses the chain order will execute the steps but cannot know what each step means without the prose.
- `extraction_sequence` — encoded as `default_order` (seven stages) plus `behavior` (a descriptor string: `default_graph_with_conditional_jump_points_and_back_feedback_edges`). The default order is consumable; the behavior descriptor is a label that requires prose to interpret. A consumer reading the sequence as an intake graph cannot determine when jump-points fire or where back-feedback edges connect without prose.
- `cross_category_relations` — the relation names are enumerable; specific pair instances (which category validates which; which contradicts which) are explicitly held in prose. A consumer that wants to characterize category dependencies has a vocabulary but no graph data.
- `trace_dimensions` — encoded as `named_at_dry_run` (five dimensions) plus `candidates_surfaced_post_dry_run` (one dimension). The dimension names are consumable; the carriers for each dimension are prose-held. A provenance checker can require that an artifact name the five dimensions; it cannot validate the carriers are present in a specific structural form.

### Markers only — labels without structural content

These keys are placeholders. A consumer cannot ingest them as data because there is no data behind them.

- `held_questions` — twelve markers. Each entry is a label naming an architectural question whose substantive content is held in prose. A consumer reading `held_questions` learns that twelve questions exist; it cannot read the questions' content or check anything against them.

The held-questions markers are the clearest case of v2's deliberate restraint. The architecture chose markers over structured representations to preserve honest enumeration without overcommitting on carrier shapes.

### Held questions that block stronger consumption

Several of the held-question markers, if resolved, would directly enable structured consumers v2 cannot currently support:

- `brand_system_structural_decision` — until resolved, brand-system content has no first-class carrier; a structured consumer producing brand-system output must either skip the brand layer or rely on prose conventions
- `temporal_state_trace_carrier` — until resolved, the candidate sixth trace dimension cannot be enforced by a provenance checker
- `operator_authored_vs_inferred_not_stated_carrier_question` — until resolved, the derivation-basis sub-classification is prose-only; a structured consumer enforcing provenance has no field-level discrimination
- `composite_anchor_structure` — until resolved, mode-specific composite anchors have no first-class carrier; cross-mode structured consumers cannot uniformly represent fidelity anchors
- `reuse_derivative_governance` — until resolved, structured consumers cannot fully represent how generated outputs become reused governed assets
- `five_or_six_zone_hybrid_implication` — until resolved (or formally declined), the hybrid carrier-shape choice for the brand-system layer remains in prose, blocking some structured forms of brand-system content
- `fallback_chain_position_structural_representation` — until resolved, the chain semantics cannot be machine-checked for an instance

Other held questions (`apex_named_limitations`; `curation_premise_pressure`; `inferred_not_stated_structural_representation`; `operator_judgment_representation`; `extraction_sequence_jump_point_behavior_under_operational_pressure`) constrain specific kinds of structured consumption but do not block it categorically.

## 5. What v2 Supports Now

v2's structured form supports the following consumer behaviors at current evidence depth:

- **Stable enumeration lookup.** Any consumer can look up "what are the IA layers?", "what reference functions exist?", "what trace dimensions matter?", "what discretion sites does the architecture name?" against v2 and receive a reliable list.
- **Vocabulary lookup for translation surfaces.** Consumers that translate from author-side labels to audience-facing prose (PR #274 grammar; documentation generators) have a canonical source for the source-side labels.
- **Author-side reasoning support.** Conceptual consumers can use v2's enumerations as substrate for their own reasoning without ingesting the structural form. PR #274 demonstrates this depth.
- **Documentation generation support.** A semi-structured consumer can generate a navigable representation of the layered IA (an HTML map; a structured navigation index; a glossary) by traversing the enumerations. The resulting artifact would be derived-from-v2 without being a runtime consumer of v2.
- **Weak linting / drift detection.** A consumer can check that a candidate artifact mentions each layer, names a valid reference function when referencing one, classifies discretion sites with a valid discretion kind, and surfaces the five named trace dimensions. The linting is enforcement against the *vocabulary*, not against the *content*; pass/fail semantics are weak (an artifact can pass the lint while saying nothing substantive).
- **Held-question surfacing.** A consumer can produce a report of which architectural questions are currently held by reading the `held_questions` list. This supports candor surfaces (audit reports; release-readiness notes; engagement scoping) without requiring the questions to be resolved.

These behaviors are achievable today against v2's current shape. No appendix change is required.

## 6. What v2 Does Not Support Now

v2's structured form does not support the following consumer behaviors at current evidence depth:

- **Runtime orchestration.** No semantics for how layers connect at runtime; no callable interface; no execution model. `extraction_sequence` names a sequence but does not specify how a runtime would traverse it.
- **Field / entity placement.** v2 enumerates architectural concepts but does not map them to entity / field structures in a target substrate. An Airtable base-plan generator reading v2 would need additional logic — held in the artifact grammar or elsewhere — to translate v2's concepts into Airtable entities and fields.
- **Schema generation.** No Pydantic models or JSON Schema can be derived from v2 without semantic gap-filling. The fields a schema would need (data types; constraints; relationships) are not encoded in v2.
- **Validator rules with pass / fail semantics.** v2 supports weak linting (against vocabulary) but not validator rules that enforce content correctness. A held-question marker cannot be validated against; a held carrier shape cannot be instantiated.
- **Carrier-shape instantiation.** Carrier shapes are explicitly held in prose. v2 enumerates carrier types as a taxonomy but does not provide instantiable carrier shapes for any specific architectural surface.
- **Mode-complete implementation generation.** v2's `mode_specific_layers` entries name layers but do not fully specify per-mode content rules. A consumer attempting to generate a mode-specific implementation would need per-mode content articulation that lives in the Phase 1 mode sketches, not in v2's appendix.
- **Cross-category dependency-graph traversal.** v2 enumerates the nine cross-category relations but does not encode specific pair instances. A consumer reading cross-category dependencies has a vocabulary but no graph data to traverse.
- **Extraction-sequence behavior enforcement.** The behavior descriptor is a label; a consumer cannot determine when conditional jump-points fire or where back-feedback edges connect from the YAML alone.

The gaps above are the held questions' practical consequences. Each gap could be closed by resolving one or more held questions and absorbing the resolution into a structured form.

## 7. Implications

Observational. This section does not enumerate next-pressure-surface candidates and does not authorize any specific repo move.

### v2 is sufficient for the artifact grammar path

The PR #274 artifact grammar consumes v2 as a conceptual consumer with translation rules. The consumer-pressure pass (PR #275) confirmed this depth empirically: v2's appendix is read in prose form; specific YAML keys do not surface as label vocabulary in the generated artifact. For the artifact-grammar path's current substrate (implementation roadmap + system map hybrid), v2 supports the consumer it needs to support. No v2 appendix change is required for additional application-layer artifact grammars at the same conceptual-consumer depth.

### A preflight can harden without committing to schema

This document is itself the answer to the embedded question. By naming what v2 supports, what v2 does not support, and which held questions block stronger consumption, the architecture earns clarity about its structural form's reach without authoring schema, validator, or orchestration. The hardening is achieved through legibility, not through commitment.

### What would justify structured IA v3

A v3 absorption would be justified when a structured consumer surfaces that requires v2 to close one or more of its held questions. The relevant pattern: an operational consumer — not a conceptual one — depends on a structural representation v2 currently leaves prose. The current architecture has not surfaced such a consumer.

Candidate triggers that would meet this threshold (descriptive, not prescriptive): an operational substrate consumer (an actual Airtable base generation; a working Python scaffold generator) that demands field-level discipline v2 does not currently provide; a validator implementation that enforces pass/fail semantics against intake or output instances; an orchestration runtime that traverses the extraction sequence with operational consequences (not just reasoning).

Until such a consumer surfaces, v2's structured form is hardened against an empty consumer surface for structured-runtime-level demands. That is honest, not a defect.

### The conceptual-versus-structured split matters

PR #275 surfaced the conceptual-vs-vocabular split as a real architectural category at the application-grammar layer (some concepts surface as audience-facing vocabulary; some stay author-side). This preflight surfaces a parallel split at the structured-form layer: some content surfaces as structurally consumable (the enumerations); some content surfaces as semantically prose-dependent (the held questions; the chain semantics; the relation pairs). The architecture has two such distinctions now operating at different layers; they are not the same distinction, but they may reflect the same underlying disposition — the architecture's preference for naming content honestly at the form depth that current evidence supports.

### Held questions have differential consumer-blocking weight

Not all held questions block consumption equally. `brand_system_structural_decision` blocks any structured consumer working with brand-system content. `operator_judgment_representation` blocks any provenance checker requiring derivation-basis discrimination. `extraction_sequence_jump_point_behavior_under_operational_pressure` blocks orchestration consumers but not documentation generators. A held-question adjudication map — were one ever authored — could sort held questions by consumer-blocking weight; this preflight does not produce that map.

### The preflight may inform later routing

This preflight surfaces observations the architecture may want to absorb in future moves. It does not enumerate or pre-commit to those moves. Each architectural surface that might evolve in response to these observations — the front door's structured-form description; the held-question inventory's sort; the candidate consumers that might surface as live; the v3 threshold itself — is a discretionary move whose authorization belongs elsewhere.

## 8. Non-Actions

The following do not happen as a result of this preflight:

- No structured IA model v3.
- No schema (no Pydantic models, no JSON Schema, no YAML schema validation rules).
- No validator implementation.
- No orchestration specification.
- No `docs/architecture.md` rewrite or compression.
- No `docs/structured-ia-model-v2.md` modification.
- No held-candidate adjudication map.
- No Airtable mutation.
- No grounding-note v59 opening.
- No memory write.
- No `design-system-ASK` implementation.
- No `docs/method.md` or `docs/problem-and-approach.md` refresh.
- No candidate-next-pressure-surface enumeration. Future moves the architecture might earn in response to this preflight's observations remain discretionary; this preflight does not pre-commit to any specific one.
- No claim that v2 is insufficient. The preflight names what v2 does and does not support at current evidence depth; insufficiency is consumer-conditional, not absolute.
- No claim that any candidate consumer is ready to build. The seven candidates are illustrative substrates; building any of them is a separate authorization.

## Scope marker

This preflight reads v2 against possible structured consumers at current evidence depth. Its assessment of what v2 supports and does not support is scoped to v2's current shape and to the candidate consumers named above. A different consumer not named here may surface different demands; v2's response would need to be assessed against that consumer separately.

When a structured consumer surfaces as live, the assessment here becomes input to whatever absorption move that consumer earns — whether v3, schema, validator, orchestration, or deliberate park.
