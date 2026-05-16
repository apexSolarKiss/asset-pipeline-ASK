# Intake Trace Carrier Decision Surface v1

## Posture

```text
decision-surface artifact
Zone 6 / intake-governance trace
milestone-10 / structured-IA-v2 depth
follows operational pressure from PR #250
not schema
not Airtable
not JSON Schema
not Pydantic
not validator / orchestration implementation
not UI / intake-form design
not structured IA v3
not milestone
not implementation plan
not field list
not held-candidate adjudication map
not real multi-operator continuity-break test (named as natural successor; held)
not architecture front-door wholesale rewrite
does not promote any carrier shape to schema
self-superseding when a real multi-operator continuity-break test or a subsequent decision surface absorbs it
```

This artifact pressures candidate trace-carrier shapes against the reconstruction-failure points the Zone 6 continuity-breaking intake trace test v1 ([`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md)) earned. The test's aggregate finding (trace partially breaks) sharpened the held trace candidates from paper-pressed to operationally-pressed. This artifact converts those failure points into a comparison of carrier shapes — without authoring a field list, without promoting any shape to schema, and without authorizing implementation.

The artifact follows the v1-doctrine bound preserved across structured IA model v2 and brand-system carrier decision surface v2: *structure earns its keep when operational pressure or substantively-earned conceptual claims accumulate*. The operational pressure now exists for trace dimensions. The substantively-earned conceptual claim this artifact attempts is at the carrier-shape comparison layer — naming which conceptual carrier shape would address PR #250's failure points without overbuilding — not at the field-design layer.

## What This Artifact Attempts

PR #250 demonstrated that intake-time judgment trace partially breaks under simulated continuity break. Most trace dimensions fail across most content pieces; enum-shaped content tied to mode-anchored vocabulary and structurally-explicit linkage preserve partial success; the architecture relies on operator continuity for intake-reasoning preservation in nearly all free-form prose content.

The question this artifact pressures: **given those reconstruction failures, what minimum trace carrier shape would preserve downstream reconstruction of intake reasoning without overbuilding schema?**

The goal is to convert PR #250's failure points into a comparison of candidate carrier shapes — naming which is conceptually earned, which is structurally suggested but held, which is rejected as overbuilt or insufficient, and which remains prose-only with the consequence that operator continuity is load-bearing.

### Distinction from brand-system carrier design

The brand-system carrier decision surface v2 ([`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md)) narrowed the brand-system carrier decision to Zones 1 and 2 (with Zone 1B residual held). This artifact pressures **Zone 6 carrier design**, which v2 explicitly relocated from the brand-system layer to the intake / governance layer. The two decision surfaces are at adjacent architectural locations:

- **Brand-system carrier design** asks: what carrier shape holds the brand-system *content* (constants, references, abstractions)?
- **Trace carrier design** asks: what carrier shape holds the *reasoning about how that content got there* — the intake event, the layer inspected, the derivation basis?

The trace carrier is a property of the intake event, not the brand-system content. The two decisions can hold or move independently. This artifact does not pressure brand-system carrier design.

### Distinction from intake UI and from schema implementation

This artifact is decision-surface scope. It does NOT:

- Design an intake form, UI, or workflow tool
- Author specific field shapes (data types; cardinality; required/optional flags; reference relationships)
- Author Pydantic models, JSON Schema, or Airtable schema mutation
- Specify carrier placement (which table; which entity; cross-table foreign keys)
- Resolve implementation tradeoffs (per-decision row vs per-packet rollup vs per-intake-session record)

It compares carrier shapes at the conceptual layer and names what is conceptually earned vs held. Implementation design is a separate move, downstream of either a real multi-operator continuity-break test that earns specific shapes operationally, or a structured IA v3 absorption move that follows that earning.

## Failure Points from PR #250

PR #250's reconstruction exercise walked six content pieces from the brand intake judgment-trace dry run v1's intake against six trace dimensions. Aggregate findings the test earned:

| PR #250 reconstruction failure | What the simulated downstream reader could not recover |
|---|---|
| **Presence-of-inspection** failure across nearly all content pieces | Whether each fallback chain layer (asset library; photography style guide; brand platform; intra-category recency; Phase 1 worked-example defaults; inferred-not-stated) was inspected at all |
| **Articulation-state** failure across nearly all content pieces | Whether each source layer was articulated, partial, generic, contradictory, divergent, or absent at intake time |
| **Chain-position** failure across most content pieces (partial success only for enum-shaped content tied to mode-anchored vocabulary like `slot_role`) | Which fallback chain position resolved each piece of content |
| **Derivation-basis** failure across nearly all free-form prose content | Whether each piece was lifted verbatim, inferred from evidence, applied as worked-example default, operator-authored, or unresolved-marked |
| **Contradiction-resolution** not pressured by PR #250 substrate (no contradictions in dry-run synthetic stack) | By symmetry: how source conflicts were resolved would also fail at reconstruction |
| **Operator-authored vs inferred-not-stated** sub-distinction (PR #241) failure across all free-form prose content | Whether content was authored without evidence or derived from evidence |
| **Negative-space trace** failure (newly surfaced sub-dimension of presence-of-inspection) | Whether intake reached a layer and found it empty vs intake never reached the layer |
| **Five-value derivation-basis sub-classification** (newly surfaced by PR #250) | Sub-distinction within derivation-basis: lifted-verbatim / inferred-from-evidence / worked-example-default / operator-authored / unresolved-marked |

PR #250's partial-success cases:

- **`slot_role` enum** tied to Phase 1 mode-anchored vocabulary (HERO / PROFILE / DETAIL etc.): chain-position partially reconstructable because the enum vocabulary is mode-anchored; derivation-basis partially reconstructable because enum choice is from a fixed vocabulary
- **`reference_assets` via `approved_reference_keys`** structurally-explicit linkage: the linkage itself preserves which references are attached to a packet; derivation-basis for the linkage is partial (lifted via linkage; inspection axes not preserved)

The pattern PR #250 surfaced: **structurally-explicit content carriers (enums; structural linkages) preserve some trace by virtue of being structurally explicit; free-form prose content carriers preserve no trace beyond operator continuity.**

## Carrier-Shape Options

Six carrier-shape options pressured against the failure points above. Each option named, described, and assessed in Section 5 against decision criteria.

### Option A — no new carrier; prose discipline only

The architecture continues current state: the intake operator writes derivation notes into existing prose carriers (`creative_intent`, `bounded_creative_discretion`, `capture_reason`, `capture_notes`) where they want to preserve trace. No structural addition.

**Carrier change:** none.

**What it addresses:** nothing new beyond what current prose discipline already addresses.

**What it fails to address:** all PR #250 reconstruction failures (since this is the current state PR #250 tested).

### Option B — inline annotations on existing prose fields

The architecture adopts a convention: derivation notes are written inline in existing prose fields using a structured annotation vocabulary (e.g., `[lifted from brand platform audience field]`; `[inferred from asset library convergent tone]`; `[applied from SKU-driven worked-example default]`). No new fields; annotation is parsable by convention.

**Carrier change:** annotation convention only (still prose-carried).

**What it addresses:** derivation-basis partially (if operator applies annotation reliably); chain-position partially (annotations name source); contradiction-resolution partially (annotations can note resolved conflict).

**What it fails to address:** presence-of-inspection (annotations only exist on present content); negative-space trace (cannot annotate absence); articulation-state (annotations don't address layer-level state); operator burden of applying annotations reliably.

### Option C — per-content trace annotations (per-clause structured tags)

The architecture adopts a structured per-content annotation: each clause or content piece in the prose carriers gets an adjacent structured trace tag (e.g., a sub-field or parsed annotation block carrying derivation_basis, chain_position, source_layer values for that specific clause).

**Carrier change:** structured per-content tagging convention or sub-field structure within existing prose carriers.

**What it addresses:** derivation-basis (per content piece, structurally); chain-position (per content piece); source_layer per content piece; partial contradiction-resolution.

**What it fails to address:** presence-of-inspection (tags only on present content); negative-space trace; articulation-state at layer level; operator burden per-clause is heavy.

### Option D — per-source-layer inspection log

The architecture adds an inspection-log entity (or per-intake-event sub-record): for each fallback chain layer, the operator logs whether the layer was inspected, whether it was found articulated / partial / generic / contradictory / divergent / absent, and whether content was produced.

**Carrier change:** new entity / sub-record per intake event capturing layer-by-layer inspection state.

**What it addresses:** presence-of-inspection (directly); articulation-state at layer level (directly); negative-space trace (directly — captures layer-not-inspected vs layer-inspected-and-empty as distinct states); partial chain-position (which layer produced content vs which layer was empty).

**What it fails to address:** per-content derivation-basis (the inspection log addresses layer-level state, not per-content derivation); contradiction-resolution per content piece.

### Option E — intake decision record / judgment event record

The architecture adds an intake-decision entity: per piece of resolved content, a record captures source_layer, derivation_basis (per the five-value vocabulary: lifted-verbatim / inferred-from-evidence / worked-example-default / operator-authored / unresolved-marked), evidence reference (which specific source content was lifted or inferred from), target_ia_layer (which downstream IA carrier received the result), and any contradiction-resolution note.

**Carrier change:** new entity per intake decision (per-content-piece record).

**What it addresses:** derivation-basis (per content piece, with five-value vocabulary); chain-position (per record); source_layer (per record); contradiction-resolution (per record where applicable); evidence reference for inferred content.

**What it fails to address:** presence-of-inspection at layer level (the decision-record captures decisions, not non-decisions); negative-space trace (records of decisions, not non-decisions); operator burden of per-decision record-keeping is heavy.

### Option F — hybrid minimal trace carrier (D + E)

The architecture combines per-source-layer inspection log (Option D, covering inspection-trace dimensions) + intake decision record (Option E, covering per-content derivation dimensions). Each intake event produces a layer-inspection log (D component) and one or more intake-decision records (E component, one per piece of resolved content).

**Carrier change:** two carriers — inspection log per intake event AND intake decision record per content piece.

**What it addresses:** all six trace dimensions across both layer-level state (D covers presence-of-inspection, articulation-state, negative-space trace) and per-content derivation (E covers chain-position, derivation-basis with five-value vocabulary, contradiction-resolution).

**What it fails to address:** operator burden is the highest of the options (operator must log inspection AND record each decision); compatibility with structured IA model v2's appendix would require additional top-level keys.

## Decision Criteria

Nine criteria, per ASK direction. Each option evaluated.

| Criterion | A — prose only | B — inline annotation | C — per-clause tags | D — inspection log | E — decision record | F — hybrid (D + E) |
|---|---|---|---|---|---|---|
| **Reconstruction power** | Low (PR #250 confirmed break) | Low–medium (depends on annotation discipline) | Medium (per-clause) | Medium (layer-level only) | Medium–high (per-content only) | **High** (covers both axes) |
| **Operator burden** | **Lowest** | Moderate (annotation discipline) | High (per-clause tagging) | Moderate (per-intake-event log) | High (per-decision record) | Highest (D + E) |
| **Schema risk** | **None** | Very low (convention only) | Low–moderate (parsing convention) | Moderate (new entity) | Moderate (new entity) | Moderate–high (two new entities) |
| **Scale legibility** (per PR #239 + PR #241 scale-legibility test) | Low (operator continuity required) | Low–medium (annotation discipline brittle at scale) | Medium (parsing brittle) | High for inspection-trace | High for derivation-trace | **High across both axes** |
| **Negative-space trace preservation** | None | None | None | **Yes** (directly addresses) | None | **Yes** (via D component) |
| **Lifted / inferred / defaulted / authored / unresolved distinction** | None | Partial (annotation only) | Partial (per-clause) | None | **Yes** (per-record five-value) | **Yes** (via E component) |
| **Contradiction-resolution trace** | None | Partial (annotation) | Partial (per-clause) | Partial (layer-level note) | **Yes** (per-record) | **Yes** (via E component) |
| **Compatibility with structured IA model v2** | Yes (no change) | Yes (no change) | Stretches prose-primary posture | Additive (one new entity / top-level key) | Additive (one new entity / top-level key) | Additive (two new entities / top-level keys; the most v2 absorption work) |
| **Tool-agnostic** | Yes | Yes (convention only) | Yes if convention; less if sub-field | Yes (entity shape is tool-independent) | Yes | Yes |

Reading the matrix:

- **A (prose only)** is the current state. PR #250 confirmed reconstruction-power is low. Operator-burden is lowest, schema-risk is none, but scale-legibility is low and no failure points are addressed beyond what operator continuity carries. Acceptable as long as operator continuity is acceptable.
- **B (inline annotation)** trades a modest operator-burden increase for a modest reconstruction-power increase. The annotation discipline is brittle at scale; the convention is parsable but unreliable. The cost-benefit is poor — modest burden for modest gain without the structural earn.
- **C (per-clause structured tags)** is operator-heavy without preserving negative-space trace or articulation-state at layer level. The per-clause granularity stretches the prose-primary posture without giving clean structural reconstruction across all dimensions.
- **D (per-source-layer inspection log)** is the cleanest single addition for the inspection-trace dimensions specifically. It addresses presence-of-inspection, articulation-state, and negative-space trace directly. It does not address per-content derivation.
- **E (intake decision record)** is the cleanest single addition for the per-content derivation dimensions specifically. It addresses derivation-basis (with the five-value vocabulary), chain-position, source_layer, and contradiction-resolution. It does not address presence-of-inspection or negative-space trace.
- **F (hybrid D + E)** is the only option that addresses all six dimensions PR #250 surfaced. Operator burden is highest; schema risk is moderate-high; reconstruction power is high across both axes; scale legibility is high across both axes; both PR #241-named sub-distinctions (operator-authored vs inferred-not-stated; worked-example-default vs operator-authored) are addressable via E's five-value derivation_basis vocabulary.

The cost-benefit asymmetry across the options is meaningful. A and B preserve operator-continuity-load-bearing without earning structural reconstruction. C is operator-heavy without complete coverage. D and E each address one axis cleanly but leave the other axis uncovered. F addresses both axes but with the highest operator burden and most schema absorption work.

## Recommended Carrier Posture

Per ASK direction: clear labels per option. The artifact decides only what PR #250 earns; no full field list authorized.

### Option A — no new carrier; prose discipline only

**Label: PROSE-ONLY INSUFFICIENT.**

PR #250 demonstrated that this option's reconstruction power is operationally insufficient for non-author readers under continuity break. The architecture's current default. Acceptable as long as the architecture is committed to one-operator continuous-context scale (per the Scale-of-Operation Held Question's reframe). NOT a path that earns intake-trace preservation beyond operator continuity.

### Option B — inline annotations on existing prose fields

**Label: REJECTED / OVERBUILT-BY-UNDERBUILDING.**

The annotation convention adds operator burden without delivering reconstruction reliability. The convention is brittle: an annotation is only useful if the operator reliably applies it, and there is no structural way to verify reliable application. The cost-benefit is poor — annotation discipline incurs much of an operator-burden cost similar to lighter structural options without earning their structural reconstruction power. Underbuilds the carrier while overbuilding the prose discipline. Not earned.

### Option C — per-content trace annotations (per-clause structured tags)

**Label: REJECTED.**

The per-clause granularity is operator-heavy without addressing the layer-level dimensions PR #250 surfaced as critical (presence-of-inspection; negative-space trace; articulation-state). It addresses per-content derivation partially but at high operator cost. The trade-off is poor across the criterion matrix. Not earned.

### Option D — per-source-layer inspection log

**Label: STRUCTURALLY SUGGESTED for inspection-trace dimensions specifically.**

D directly addresses presence-of-inspection, articulation-state, and negative-space trace — the three dimensions PR #250 demonstrated as most consistently failing. Operator burden is moderate (one log per intake event, six entries at most for the six-layer fallback chain). Schema risk is moderate (one new entity). Suggested at the carrier-shape comparison layer; specific carrier shape held pending operational pressure that would earn the shape concretely.

### Option E — intake decision record / judgment event record

**Label: STRUCTURALLY SUGGESTED for per-content derivation dimensions specifically.**

E directly addresses derivation-basis (with the five-value vocabulary PR #250 sharpened), chain-position, source_layer, and contradiction-resolution. Operator burden is high (per-decision record-keeping). Schema risk is moderate. Suggested at the carrier-shape comparison layer; specific carrier shape held pending operational pressure that would earn the shape concretely.

### Option F — hybrid minimal trace carrier (D + E)

**Label: STRUCTURALLY SUGGESTED as the surviving conceptual posture.**

F is the only option that addresses all six PR #250 trace dimensions. The decision surface earns the conceptual claim that F is the surviving posture — the carrier shape that would honestly address PR #250's failure points without dropping any dimension. The decision surface does NOT promote F to schema. Specific carrier-shape design (entity placement; field types; cross-entity relationships; rollup vs per-row; sub-record vs first-class entity) is held pending one of two surfaces:

1. A real multi-operator continuity-break test that earns the specific shapes operationally (would either confirm F's reconstruction-power gain at multi-operator scale or surface unanticipated reconstruction failures the simulation missed)
2. A structured IA v3 absorption move that follows from operational earning (would absorb F into the structured form once carrier shapes are operationally pressured)

The conceptual commitment: if intake-trace preservation beyond operator continuity matters, F is the carrier shape the architecture would need. The held question: whether the architecture commits to that scope, and which of the two paths above earns the specific shapes.

## Minimum Trace Vocabulary

Per ASK direction: if earned, define only the minimum conceptual vocabulary, not implementation schema. The vocabulary below is **conceptual** — names for the dimensions a carrier shape would need to address. It is NOT a field list, NOT a schema, NOT an entity proposal. Specific field design remains held.

Under Option F (the structurally-suggested surviving posture), the minimum conceptual vocabulary is:

- **`presence_of_inspection`** — for each fallback chain layer per intake event, whether the layer was inspected. Covered by D component.
- **`articulation_state`** — for each layer inspected, the state of the source content at inspection time (articulated / partial / generic / contradictory / divergent / absent). Covered by D component.
- **`fallback_chain_position`** — for each piece of resolved content, which fallback chain position produced it (asset library / photography style guide / brand platform / intra-category recency / Phase 1 worked-example defaults / operator-marked inferred-not-stated). Covered by E component.
- **`derivation_basis`** — for each piece of resolved content, the basis of derivation per the five-value vocabulary PR #250 sharpened: `lifted-verbatim` / `inferred-from-evidence` / `worked-example-default` / `operator-authored` / `unresolved-marked`. Covered by E component.
- **`contradiction_resolution`** — when sources conflict at intake time, how the conflict was resolved (which source carried; what fallback rule applied; what was rejected). Covered by E component or by D component if encoded as layer-level annotation; placement is held.
- **`negative_space_trace`** — distinct from `presence_of_inspection`'s positive case (layer-inspected-and-empty), the negative case (layer-not-inspected) is also carried as a distinct value. Covered by D component via the value space of `presence_of_inspection`.
- **`source_layer`** — for each intake-decision record, which fallback chain layer the source content came from. Redundant with `fallback_chain_position` if both encoded; held whether to consolidate. Covered by E component.
- **`resolved_content_piece`** — for each intake-decision record, a reference to or identifier of the downstream content piece the decision produced. Held whether this is a back-reference, an inline identifier, or a structural relationship. Covered by E component.
- **`target_ia_layer`** — for each intake-decision record, which IA layer the resolved content was placed in (brand-system / category / mode-specific / packet / slot / candidate-generation / curation-seam / governed-asset per structured IA model v2's `ia_layers`). Covered by E component.

**Temporal-state trace** is intentionally NOT in this vocabulary. Per PR #248 and v2's zone framing, temporal-state belongs to Zone 5 (reference-asset lifecycle / past-campaigns) rather than Zone 6 (intake-time judgment trace). The two zones are adjacent and may share carrier patterns, but they are distinct decision surfaces. A separate Zone 5 decision surface would pressure temporal-state carrier design; this artifact does not.

The vocabulary is held as a conceptual reference. Each named dimension is what a carrier shape would need to address; specific carrier-shape design (whether to encode `derivation_basis` as an enum or a controlled vocabulary; whether `presence_of_inspection` lives on the inspection-log entity or as a flag on each layer reference; whether `source_layer` is redundant with `fallback_chain_position`) is held pending operational pressure or a v3 absorption move.

## Relationship to Future Tests

Implications only; no authorization.

- **Real multi-operator continuity-break test.** This artifact identifies F (hybrid D + E) as the surviving conceptual carrier posture. A real multi-operator test would now have a sharper substrate: instead of pressuring the absence of intake-trace carriers (which PR #250 already did and which would predictably reproduce the same break), a real test could pressure a candidate F-shaped carrier set in mocked form. Whether the test earns F's reconstruction-power gain at multi-operator scale or surfaces unanticipated reconstruction failures is the empirical question the test would answer. Candidate; not authorized.
- **Zone 5 temporal-state pressure.** Adjacent decision surface. Temporal-state is intentionally not in this artifact's minimum vocabulary because Zone 5 lives at reference-asset lifecycle layer, not intake / governance layer. A Zone 5 decision surface would pressure temporal-state carrier design separately. The two decisions may share carrier patterns (both are trace-shaped) or may not; the cross-Zone interaction is held. Candidate; not authorized.
- **Validator / orchestration spec.** Sharpened: this artifact demonstrates that current carriers preserve content but not trace. Validator design that consumes the structured IA model v2 YAML appendix would consume content but not intake trace. Orchestration consumers would have the same gap. Validator / orchestration is more honestly downstream of trace-carrier design (this surface) plus a real multi-operator test that earns specific shapes — not upstream of either. Candidate; not authorized.
- **Structured IA v3.** Sharpened: v3 could absorb earned trace carriers if Option F's shapes are operationally pressured into concrete form. The structured IA model v2's `held_questions` enumeration currently includes `articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`, and the operator-authored-vs-inferred-not-stated carrier question; v3 could promote these from held markers to top-level keys with enumerated value spaces if Option F is earned operationally. Candidate; not authorized.
- **Architecture front-door wholesale rewrite.** The narrowing this artifact earns may eventually inform a rewrite at a future plateau. Not authorized.

## Earned vs Held

What this decision surface narrows at this evidence depth:

- **Six carrier-shape options compared against PR #250's reconstruction-failure points across nine decision criteria.** The comparison surfaces a clear posture distribution: A (prose only) is the current state, demonstrated insufficient by PR #250 for scale beyond operator continuity; B and C are rejected (overbuilt-by-underbuilding for B; high operator-burden without complete coverage for C); D and E each address one axis cleanly but leave the other axis uncovered; F (hybrid D + E) is the surviving conceptual posture that addresses all six PR #250 dimensions.
- **The minimum conceptual trace vocabulary is named** without authoring schema: presence_of_inspection; articulation_state; fallback_chain_position; derivation_basis (five-value); contradiction_resolution; negative_space_trace; source_layer; resolved_content_piece; target_ia_layer. Each is a conceptual dimension a carrier shape would need to address; specific carrier-shape design is held.
- **Temporal-state trace is explicitly NOT in the Zone 6 vocabulary** — it belongs to Zone 5 (reference-asset lifecycle) and is a separate decision surface candidate.
- **The path from this decision surface to a v3 absorption move is named.** v3 could absorb earned trace carriers if Option F's shapes are operationally pressured into concrete form via a real multi-operator continuity-break test; v3 is not authorized by this artifact, and the operational pressure path is the predecessor.

What remains held — unchanged or sharpened by this artifact:

- **Specific carrier-shape design for Option F.** Entity placement (inspection log as standalone entity vs sub-record of packet vs first-class table; intake decision record as per-content-piece row vs sub-structure within packet vs first-class table); field types; cross-entity relationships; rollup patterns; required-vs-optional flags. All held pending operational pressure.
- **The held trace candidates** (`articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`) carried forward in v2's `held_questions`. These remain held; this artifact maps them to Option F's components but does not promote them to structural form.
- **Operator-authored vs inferred-not-stated** as PR #241's sub-distinction (now sharpened to a five-value derivation_basis by PR #250 + this artifact). Held; carried as conceptual vocabulary, not schema.
- **Worked-example-default vs operator-authored** as PR #250's sharpened sub-distinction. Held; same status as above.
- **Whether the architecture commits to scale beyond operator continuity.** Per the architecture front door's Scale-of-Operation Held Question, scale beyond operator continuity is treated as an architectural premise of the project. This artifact reads that premise as the operational pressure that would authorize Option F's design move (since operator-continuity-only scale would accept Option A's posture). The decision to act on the premise — to authorize a real multi-operator test or a v3 absorption move that would earn Option F's shapes — remains held.
- **Cross-Zone interaction.** Whether Zone 6 trace carriers (this artifact's vocabulary) and Zone 5 temporal-state carriers (the adjacent decision surface) share carrier patterns is held until both decision surfaces have stand-alone treatment.
- **All other Zone-related candidate next-pressure surfaces** (Zone 1B operational test; Zone 3 application-guidelines cross-touchpoint test; Zone 4 governed-output continuity / reuse-derivative governance decision surface; Zone 5 past-campaigns temporal-state operational test; architecture front-door wholesale rewrite). None advanced by this artifact.

What this artifact explicitly does not do:

- Author any Airtable field shape
- Author any Pydantic model
- Author any JSON Schema
- Author any validator integration
- Author any orchestration spec
- Author any UI / intake-form design
- Promote Option F (or any option) to schema
- Adjudicate any held candidate beyond the Option F carrier comparison
- Mutate structured IA model v2's appendix
- Author structured IA v3
- Modify [`docs/architecture.md`](architecture.md), [`docs/index.md`](index.md), [`README.md`](../README.md), [`docs/method.md`](method.md), [`AGENTS.md`](../AGENTS.md), any milestone marker, or any prior artifact
- Modify the grounding note
- Author milestone 11 or any subsequent plateau marker
- Authorize Airtable mutation, schema mutation, real multi-operator continuity-break test, Zone 5 decision surface, or any other operational test
- Resolve the Zone 6 / intake-time judgment trace carrier question
- Resolve the Scale-of-Operation Held Question
- Resolve any Apex Named Limitation

## Self-Superseding Clause

This artifact is a v1 decision surface. It should be superseded by:

- A real multi-operator continuity-break test that pressures a candidate Option F-shaped carrier set in mocked form (would either earn F's reconstruction-power gain at multi-operator scale or surface unanticipated reconstruction failures)
- A subsequent decision surface that proposes specific carrier-shape design for Option F (entity placement; field types; cross-entity relationships) once operational pressure earns the shapes
- A Zone 5 temporal-state carrier decision surface that pressures whether the two zones share carrier patterns
- An adjacent decision surface that addresses the Zone 4 governed-output continuity / reuse-derivative governance question (the per-record trace patterns may overlap)
- A structured IA model v3 that absorbs earned trace carriers from Option F into the structured form
- A subsequent milestone marker that absorbs Zone 6 carrier-design decisions into a plateau
- The eventual rewrite of [`docs/architecture.md`](architecture.md) that consolidates Zone 6 carrier-design evidence into a single current-architecture document

It does not supersede the Zone 6 continuity-breaking intake trace test v1 (the operational pressure this decision surface reads against), the brand-system carrier decision surface v2 (which located Zone 6 at the intake / governance layer this artifact pressures), the brand intake judgment-trace dry run v1 (the substrate PR #250 walked and PR #250's findings rest on), structured IA model v2 (the appendix this artifact does not mutate), the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; this artifact reads them at trace-carrier-design decision-surface depth.

## Anchor Documents

### Direct operational predecessor

- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 Zone 6 continuity-breaking intake trace test v1; provides the reconstruction-failure points this decision surface pressures candidate carrier shapes against; aggregate finding (trace partially breaks) is the operational pressure that warrants this surface

### Substrate this artifact reads against

- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry run whose synthetic stack PR #250 walked; named the five trace dimensions
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): the surface that located Zone 6 at the intake / governance layer where this artifact pressures
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): current canonical structured form; held_questions includes the trace-carrier candidates this artifact's vocabulary maps to
- [`docs/architecture.md`](architecture.md): current architecture front door; Scale-of-Operation Held Question framing reads as the operational pressure that would authorize Option F

### Conceptual framing this artifact reads against

- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 layered intake architecture; named seven-stage extraction sequence and operator-authored vs inferred-not-stated distinction (PR #250 sharpened to five-value derivation_basis)
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; named five-or-six-zone framing carrier decision surface v2 narrowed
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 layered reference and discretion architecture; per-site trace-gap analysis (brand-digestion site)
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary; per-criterion evaluation pattern this artifact's Section 5 reads against
- [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md): operator-judgment protocol sketch; eight-step protocol shape that intersects E (intake decision record)'s record content
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): six-layer fallback chain; PR #250's `fallback_chain_position` dimension reads against
- [`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md): v1 of the carrier-decision-surface pattern this artifact follows at adjacent location (intake / governance layer rather than brand-system layer)

### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau (named brand-system structural decision)
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): milestone-8 plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
