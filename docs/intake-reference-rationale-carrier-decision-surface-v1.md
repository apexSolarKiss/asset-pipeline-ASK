# Intake Reference Rationale Carrier Decision Surface v1

## Posture

```text
architecture-decision surface
intake-time reference-rationale pressure
not Zone 4 reuse / derivative governance
not Zone 6 trace test (Zone 6 / Option F arc is plateau per milestone 11)
not schema
not Airtable
not JSON Schema
not Pydantic
not validator / orchestration
not structured IA v3
not implementation
not milestone
not held-candidate adjudication
not new fresh-reader test
not authorization of next pressure surface
does not author field types, entity placement, cross-entity relationships, or rollup patterns
does not collapse intake-time and reuse-time reference governance
self-superseding when operational pressure test against mocked rationale carriers, multi-substrate generalization, or a specific carrier-shape implementation move absorbs it
```

This artifact pressures the **specific carrier-shape constraints** any future intake-time reference-rationale carrier would need to satisfy, given three reader-flag signals across the Zone 6 / Option F trace arc that named reference opacity as a real architectural weakness. It is the bounded design-surface successor surface, parallel to the Option F trace carrier shape design surface v1 (PR #256) for contradiction-resolution but addressing a distinct architectural seam: reference selection as governed judgment at intake time.

The artifact does NOT author schema, entity placement, field types, cross-entity relationships, or rollup patterns. It defines conceptual constraints any future carrier-shape design must satisfy or address. It explicitly preserves the boundary between intake-time reference-rationale (this artifact) and reuse-time governed-output continuity / derivative governance (Zone 4; held as adjacent decision surface).

## What This Artifact Attempts

Three Option F trace tests (PR #254, PR #258, PR #260) consistently demonstrated that mocked Option F carriers preserve intake-time judgment trace at one-reader / mocked-shape depth. Each of those tests also returned a reader-flag observation that has not been addressed by Option F's carrier-shape work: **the architecture structurally carries selected references but not why they were selected, what each contributes, or what alternatives were considered**.

The current architecture has structural carriers for reference identity:

- `reference_assets` records (with `asset_id`, `asset_uri`, `asset_metadata`)
- `packet.approved_reference_keys` (linkage from packet to references)
- Slot-level reference inheritance (via packet-to-slot lookup chain)
- `asset_attachment` for governed output writeback

What it does NOT have: structural carriers for the **rationale of reference selection** at intake time. The `asset_metadata` field has been empty across all three Option F test substrates. Reader notes flagged this as load-bearing across three substrates and three reads.

The architectural question this surface pressures:

> When references are selected during intake, what carrier shape is needed so a non-author operator can reconstruct *why* these references were selected, *what each contributes*, *what alternatives were rejected*, and *how* the reference should constrain downstream IA content?

The question is constraint-naming, not implementation. The artifact narrows the design space without authoring the design.

**Boundary preserved explicitly.** Reference-rationale at intake time (which references the operator chose at the moment of intake, why those vs alternatives, what each contributes to intake-stage IA content) is the scope of this artifact. Reference-rationale at reuse time (which previously-governed assets become references for derivative packets, under what governance) is Zone 4 — a separate held decision surface, not collapsed into this artifact's scope.

## Reader-Flag Evidence from the Option F Arc

Three reader-flag observations across the Zone 6 / Option F arc converge on the same gap:

### PR #254 reader observation

The real multi-operator continuity-break test v1 (no-contradiction substrate) reader noted in unreconstructable aspects: per-reference selection rationale is not reconstructable because `asset_metadata` is empty; iteration history (which references were considered and rejected) is not captured. PR #254's depth-authority artifact named this as a "shape-design concern distinct from Option-F-conceptual-level": Option F's conceptual posture does not preclude `asset_metadata` extension; the empty state was a mocked-shape choice, not a conceptual posture failure.

### PR #258 reader observation

The Option F contradiction-present continuity-break test v1 reader repeated the observation: per-reference selection rationale unreconstructable; `asset_metadata` empty. This is consistent with PR #254's flag despite the contradiction-overlay change in substrate — confirming the gap is substrate-independent at this depth.

### PR #260 reader observation

The Option F multi-contradiction continuity-break test v1 reader carried the same observation forward: "Per-reference selection rationale; asset_metadata is empty and no per-reference rationale is captured." This is the third independent surfacing of the same architectural gap. The reader's optional notes from this test also engaged epistemically with carrier-shape questions, suggesting the rationale-carrier shape is reader-legible as a structural question even when not addressed.

### Distinguishing reference-rationale opacity from Option F trace failure

The three reader flags are **not Option F trace failures**. The Option F carriers (per-source-layer inspection log + intake decision records + contradiction-resolution carrier) preserve the trace dimensions Option F was designed to address — chain-position, derivation-basis, articulation-state, contradiction-resolution, presence-of-inspection, negative-space. All three tests' aggregate results held.

What the flags name is a distinct architectural seam: **reference-rationale-as-trace** sits at the per-reference granularity within the broader intake-decision trace. The Option F intake decision record carries `source_content` (e.g., "the four asset library references") at the decision level; it does not carry per-reference rationale or per-reference contribution at the reference level. The Option F inspection log carries presence/articulation-state at the layer level; it does not carry per-reference content.

The gap is real and architecturally distinct from what Option F addresses.

### Why the gap is now architecturally material

Three reasons:

1. **Three independent reader-flag signals.** The same observation surfaced across three substrates, three readers' independent passes. The signal pattern is stable.
2. **Visual references are normative anchors.** Per the grounding-note premise, visual references carry high-bandwidth normative information that prose carriers cannot encode. If the architecture preserves the *object* (the reference) but loses the *judgment* (why this reference was chosen), it has preserved part of the brand-system signal but discarded the structured judgment that made the object architectural.
3. **Pattern-match to Option F's pre-test situation.** Pre-PR #250, the architecture's stance on intake-time judgment trace was "operator continuity is load-bearing." That state was named, pressured, and operationally addressed across PR #250 → #260. Intake-time reference rationale currently sits in the same pre-pressure state: operator continuity bridges the rationale; no structural carrier preserves it. The Zone 6 arc's pattern argues for moving this gap from "operator continuity load-bearing" to "carrier-shape constraints articulated."

The arc has *generated* the pressure for this surface. Addressing it converts existing empirical evidence into architectural decisions rather than letting the gap persist.

## Reference-Rationale Requirements

What a future intake-time reference-rationale carrier must preserve. Per-component minimum requirements, derived from the reader-flag observations + the Option F trace dimensions + the project's reference-as-normative-anchor premise.

### Selected reference identity

The carrier must preserve the identity of each selected reference. Currently achieved via `reference_assets` records + `packet.approved_reference_keys`. No new structural work required for identity; this requirement is met by existing carriers and is named here for completeness.

### Source layer

The carrier must preserve the source layer from which the reference was selected (asset_library, photography_style_guide visual examples, past_campaigns assets, brand_platform visual exhibits, etc.). Aligns with Option F's `source_layer` attribute on intake decision records. Currently captured implicitly when references come from asset_library (the dominant case in the Zone 6 substrates); not captured systematically across all six brand-system input categories.

### Selection rationale

The carrier must preserve the rationale for selecting *this* reference: what about this reference made it selected at this intake event. Currently not captured (the reader-flag observations). Reconstructable categories include (without exhaustively prescribing):

- Convergence with other evidence (this reference reinforces what other references demonstrate)
- Divergence-as-illustration (this reference shows what we want to NOT do)
- Coverage of a specific aspect (lighting; composition; tone; product material)
- Recency / specificity (this reference is the most-recent / most-specific evidence available)
- Brand-platform alignment (this reference demonstrates a brand-platform value)
- Operator judgment (operator selected this reference based on first-principles judgment without an articulable rule)

### Contribution / function of each reference

The carrier must preserve what each selected reference contributes to the intake decision. PR #239's nine-fold reference-function taxonomy (visual fidelity / exemplar / counter-example / atmosphere / context / boundary / abstraction / governed-output continuity / aesthetic-coherence-check) provides the vocabulary; the per-reference attribution requires structural representation.

A reference may carry multiple functions simultaneously (e.g., a single asset_library image may serve as both visual-fidelity exemplar and atmosphere reference). The carrier must accommodate multi-function attribution per reference.

### Target IA layer

The carrier must preserve the IA layer at which the reference's contribution applies. Aligns with Option F's `target_ia_layer` attribute (brand_system / category_product_class / mode_specific / packet / slot / candidate_generation / curation_seam / governed_asset). A single reference may apply across multiple IA layers; the carrier must accommodate multi-layer attribution.

### Reference function taxonomy alignment

The carrier must align with PR #239's nine-fold reference-function taxonomy without re-deriving it. A reference's function should be expressible as one or more values drawn from that taxonomy; carrier-shape design must accommodate vocabulary extension if a future test surfaces a missing function-kind.

### Evidence basis

The carrier must preserve the evidence basis for the rationale: *why* the operator selected this reference. Aligns with Option F's `source_content` attribute on intake decision records but at finer granularity (per-reference, not per-content-piece). Evidence basis may itself be cross-source: e.g., "this reference selected because brand_platform articulates 'accessible' AND this reference demonstrates accessibility AND past_campaigns shows this register has carried before."

### Rejected / unselected alternatives where relevant

The carrier must preserve, where applicable, references the operator considered but did not select, with the rejection rationale. Not every intake event will have explicit rejected alternatives; the carrier must accommodate the case where rejected alternatives are captured AND the case where they are not (the absence of captured rejections does not imply zero alternatives were considered).

Particularly important: when the operator's selection is *defended* against a plausible alternative (e.g., "this asset library image was selected over that one because..."), the carrier must preserve the defense. Pattern parallel to PR #260's Event 2 contradiction_resolution sub-field structure.

### Relation to downstream packet / slot / curation criteria

The carrier must preserve the relation between the reference and downstream IA content that depends on the reference. Examples:

- A reference may anchor `packet.creative_intent` voice/tone
- A reference may constrain `slot.slot_prompt` framing
- A reference may inform curation criteria at the curation seam
- A reference may constrain `bounded_creative_discretion` in a specific dimension

The carrier must enable reconstructing the chain from selected-reference to downstream-constraint without requiring operator continuity.

### Negative / avoid reference handling

The carrier must accommodate the "negative reference" case: references the brand wants to NOT look like. Two sub-cases:

- **Rejected-during-selection** (R-E territory): references the operator considered but rejected for *this* intake event
- **Explicit anti-references** (held question): references that are persistent counter-examples — "the brand explicitly does NOT do this style" — which may need their own structural treatment distinct from per-event rejection

Whether explicit anti-references deserve a separate carrier or fit within `reference_assets` with a polarity attribute is a held design question this artifact names but does not resolve.

### Confidence / articulation state

The carrier should accommodate (without requiring) confidence or articulation-state metadata at the per-reference-rationale level, parallel to Option F's `articulation_state` on inspection log entries. Particularly relevant when the operator's selection rationale is inferred-from-evidence rather than lifted-verbatim (parallel to the five-value `derivation_basis` distinction at the decision-record level).

## Carrier-Shape Options

Five carrier-shape options compared. Each option named; decision posture labeled (matching the PR #256 vocabulary patterns).

### Option R-A — Prose-only rationale

Selection rationale stays in `packet.capture_notes` or `creative_intent` prose or operator side notes; no structural carrier per reference.

**Reconstruction coverage:** poor — same failure mode as Option F's pre-test situation for intake-time judgment trace. The reader-flag observations across PR #254 + #258 + #260 are exactly the empirical failure of this option.

**Decision posture: REJECTED.** Three independent reader-flag signals across the Option F arc empirically established that prose-only handling does not preserve per-reference rationale for non-author operators. Continuing prose-only is the explicit gap this artifact addresses.

This rejection is consistent with PR #256's R-A rejection. The two artifacts converge on the same finding for the same reason.

### Option R-B — Extension of `asset_metadata`

The existing `reference_assets` entity carries `asset_metadata` (currently empty). Extend to include per-reference rationale sub-fields: function (drawn from PR #239's taxonomy); contribution-to-this-intake-event; evidence basis; confidence/articulation-state.

**Reconstruction coverage:** strong for per-reference intrinsic rationale (what each reference demonstrates; what function it carries). Reference-asset-attached: the rationale travels with the reference across intake events.

**Reconstruction limit:** weak for event-level selection rationale (why these references were chosen *at this intake event* vs alternatives) and for rejected alternatives (which by definition are not in `reference_assets` for this event).

**Operator burden:** moderate. Per-reference rationale entry once-per-reference rather than once-per-event; reusable.

**Compatibility with `reference_assets`:** highest of all options — extends existing structure.

**Compatibility with Option F:** orthogonal. Option F lives at the intake-decision and inspection-log level; `asset_metadata` lives at the reference-asset level. Both can coexist.

**Separation from Zone 4:** tight at the carrier level. `asset_metadata` describes the reference; reuse-time governance describes the *flow* of governed outputs back into references. The two are about different things.

**Decision posture: STRUCTURALLY SUGGESTED** for per-reference intrinsic rationale (function, contribution-categories that travel with the reference across uses).

### Option R-C — Separate reference-selection-rationale record

A new entity (or structured sub-record) per reference-selection event, capturing which references were considered, which were chosen, what axes were evaluated, what rationale tied the selection to the intake event.

**Reconstruction coverage:** strong for event-level rationale (why this set of references at this intake event); naturally accommodates multi-reference selection events; naturally accommodates rejected alternatives as record content.

**Reconstruction limit:** decoupled from `reference_assets`; reader must navigate from intake-decision to selection-record to reference-record (more hops than R-D's attachment pattern).

**Operator burden:** higher than R-B. Per-event new record-keeping. Mitigated if the record's value-vocabulary is bounded (e.g., function from PR #239 taxonomy + rationale categories + evidence basis).

**Compatibility with `reference_assets`:** moderate — adds a related entity that links to references.

**Compatibility with Option F:** high. Parallel structural shape to Option F's intake-decision-record-per-content-piece pattern: one reference-selection record per intake-event, with links to selected refs + rejected refs.

**Separation from Zone 4:** design-dependent. The selection record must be explicitly intake-time scoped (intake-event-id required) to avoid drift into reuse-time governance.

**Decision posture: STRUCTURALLY SUGGESTED** for event-level rationale and multi-reference selection events with rejected alternatives.

### Option R-D — Attachment to intake decision record

Extend the existing intake decision record (Option F's E component) with a sub-field for reference-rationale when the decision involves reference selection. Parallel to PR #256's contradiction_resolution sub-field on the carried decision record.

**Reconstruction coverage:** strong for tying reference selection to the decision context that produced it. The reader navigates from intake-decision to its reference-rationale sub-field without a separate entity.

**Reconstruction limit:** per-reference detail at the sub-field level can become unwieldy when a single decision selects many references (e.g., PR #254's four-reference selection). Sub-field structure must accommodate multi-reference attribution; parallel strain to PR #260's duplication-under-1:many for contradiction_resolution.

**Operator burden:** low-to-moderate. Rationale becomes sub-field on existing record.

**Compatibility with `reference_assets`:** low — decoupled from reference-asset records. The rationale lives at decision-record level; reference-asset records remain identity-only (or get R-B's per-reference attribution separately).

**Compatibility with Option F:** highest. Same pattern as the mocked sub-field-on-decision-record shape PR #258 and PR #260 exercised for contradiction-resolution. Architecturally consistent with the Option F decision-record-as-trace-anchor posture.

**Separation from Zone 4:** tight (intake decision records are intake-time by definition).

**Decision posture: STRUCTURALLY SUGGESTED** for event-level rationale tied to specific intake decisions; parallel to PR #256's contradiction_resolution carrier-shape alternative #1 (sub-field on intake decision record).

### Option R-E — Rejected / unselected alternatives complement

A separate carrier (or sub-record) capturing references the operator considered but did not select for this intake event, with rejection rationale. Pairs with R-B / R-C / R-D rather than substituting.

**Reconstruction coverage:** closes the "what was rejected" half of the reader's flagged gap (the "why these specifically" half is addressed by R-B / R-C / R-D).

**Reconstruction limit:** by itself, does not address selection rationale for chosen references; structurally requires pairing with one or more of R-B / R-C / R-D.

**Operator burden:** additional. Operator must explicitly capture rejected refs that would not otherwise be persisted in `reference_assets` or `approved_reference_keys`.

**Compatibility with `reference_assets`:** low — rejected refs aren't in `reference_assets` (since they weren't selected). May share the reference-identity schema if rejected refs come from a known catalog of candidates.

**Compatibility with Option F:** complementary. Parallels PR #256's R-E complement framing for the reference-rationale R-options.

**Decision posture: STRUCTURALLY SUGGESTED AS COMPLEMENT** to whichever of R-B / R-C / R-D the implementation chooses. Not a substitute for the rationale-of-selected-refs carrier; pairs with it.

### Hybrid posture

The four non-rejected options address different scopes:

- **R-B** addresses per-reference intrinsic rationale (function, contribution-categories that travel with the reference)
- **R-C** addresses event-level multi-reference selection rationale with rejected alternatives naturally accommodated
- **R-D** addresses event-level rationale tied to specific intake decisions in the Option F decision-record pattern
- **R-E** addresses rejected alternatives specifically

A hybrid that combines R-B (per-reference intrinsic) + (R-C OR R-D for event-level) + R-E (rejected-alternatives complement) covers all the reference-rationale requirements without overbuilding any single carrier. The hybrid does not commit to R-C vs R-D — that choice remains held pending operational pressure (parallel to PR #256's stance on the contradiction-resolution carrier-shape choice).

**Decision posture: STRUCTURALLY SUGGESTED** as the conceptual posture. The hybrid covers the requirements; the specific R-C vs R-D selection between event-level alternatives is HELD pending operational pressure (analogous to PR #256's three-alternatives-for-contradiction-resolution stance).

## Decision Criteria

Each option evaluated against nine decision criteria. Criteria framed for comparison, not for individual scoring.

### Reconstructability by non-author operator

- R-A: poor (the empirical failure)
- R-B: strong for intrinsic rationale; weak for event-level + rejected
- R-C: strong for event-level + rejected; weak for intrinsic rationale that travels across uses
- R-D: strong for decision-context tied rationale; partial for per-reference detail; weak for rejected-not-on-this-decision
- R-E: addresses rejected specifically; non-substitutable for selected-rationale
- Hybrid: strong across all (covers each option's strength + each option's weakness with another)

### Burden on intake operator

- R-A: lowest (no structural carrier)
- R-B: moderate (per-reference; reusable across events)
- R-C: higher (per-event new record)
- R-D: low-to-moderate (sub-field extension on existing decision record)
- R-E: additional (rejected-ref capture)
- Hybrid: moderate-to-high (multiple carriers); offset by per-carrier role specificity

### Ability to preserve per-reference contribution

- R-A: no (prose conflates)
- R-B: yes (natural per-reference)
- R-C: yes (record content can articulate per-reference contribution)
- R-D: partial (decision-record sub-field accommodates per-reference but with growing strain at high cardinality)
- R-E: per-rejected-reference reason
- Hybrid: yes (R-B for intrinsic per-reference + R-C/R-D for event-level)

### Ability to preserve rejected alternatives

- R-A: no
- R-B: no (rejected refs not in `reference_assets` by definition)
- R-C: high (naturally accommodates)
- R-D: partial (sub-list within decision record)
- R-E: primary (this is the carrier's purpose)
- Hybrid: yes (R-E complement; or R-C primary)

### Compatibility with existing `reference_assets`

- R-A: passive
- R-B: highest (extends existing)
- R-C: moderate (related entity)
- R-D: low (decoupled)
- R-E: low (rejected refs may share identity schema)
- Hybrid: tight at R-B layer; moderate at R-C/R-D/R-E layer

### Compatibility with Option F inspection-log / decision-record posture

- R-A: weak (Option F's whole point was to move beyond prose)
- R-B: orthogonal (lives at different scope; coexists)
- R-C: high (parallel structural shape; per-event)
- R-D: highest (same shape as PR #256's mocked contradiction_resolution sub-field)
- R-E: complementary
- Hybrid: high (R-B orthogonal + R-D/R-C parallel + R-E complement)

### Separation from Zone 4 reuse-time governance

- R-A: prose lives in intake-time content (tight separation)
- R-B: `asset_metadata` is reference-asset-attached and may be reused across events; intrinsic-vs-event-specific rationale must be distinguished to avoid Zone 4 drift
- R-C: design-dependent; record must be explicitly intake-event-scoped
- R-D: tight (intake decision records are intake-time)
- R-E: tight (intake-time rejection)
- Hybrid: tight if R-B distinguishes intrinsic-vs-event-specific carefully

### Risk of schema overbuild

- R-A: zero (no new structure) — but rejected for inadequacy
- R-B: low (extends existing field with bounded sub-vocabulary)
- R-C: moderate-to-high (new entity)
- R-D: low (extends existing decision record)
- R-E: moderate (new carrier specifically for rejected refs)
- Hybrid: moderate (multiple carriers); mitigated if each carrier's value-vocabulary is bounded

### Usefulness for downstream packet / slot / curation decisions

- R-A: weak (rationale not carrier-attached; not queryable per-reference)
- R-B: high (per-reference rationale queryable from `asset_metadata` across uses)
- R-C: high (event-level rationale queryable from selection record)
- R-D: moderate (rationale at decision-record level; per-reference detail strained)
- R-E: limited to "what didn't carry"
- Hybrid: high across reference-level and decision-level queries

## Recommended Conceptual Posture

Consolidated constraint list using ASK's five labels.

### Required by reader-flag evidence

These constraints any future reference-rationale carrier MUST satisfy because three independent reader-flag observations across the Option F arc demonstrated the gap:

- **Selection rationale must be carrier-attached, not prose-only.** R-A is rejected.
- **Per-reference contribution must be reconstructable** for any reference whose function carries normative weight downstream.
- **Rejected alternatives, where captured, must be reconstructable** as distinct from selected references.
- **Reference function (from PR #239's nine-fold taxonomy) must be reconstructable** for each selected reference.
- **Evidence basis for the selection rationale must be reconstructable** (parallel to Option F's `source_content` attribute).

### Structurally suggested

These constraints are not required by reader-flag evidence alone but are surfaced as load-bearing for any real carrier shape:

- **R-B `asset_metadata` extension** for per-reference intrinsic rationale (function; contribution-categories that travel with the reference across uses; confidence/articulation-state at per-reference level).
- **R-C separate reference-selection-rationale record** OR **R-D attachment to intake decision record** for event-level rationale (why these references at this intake event; defense against rejected alternatives). Choice between R-C and R-D held pending operational pressure (parallel to PR #256's stance on contradiction-resolution carrier-shape choice).
- **R-E rejected-alternatives complement carrier** for capturing references considered but not selected at this intake event.
- **Hybrid posture** combining R-B + (R-C OR R-D) + R-E as the conceptual posture, with the R-C vs R-D selection deferred to operational pressure.
- **Multi-function attribution per reference** (a reference may carry multiple functions simultaneously from PR #239's taxonomy).
- **Multi-layer attribution per reference** (a reference may apply across multiple IA layers).

### Held pending operational pressure

These constraints await operational pressure (fresh-reader reconstruction test with mocked rationale carriers, parallel to PR #254 / #258 / #260 for Option F):

- **R-C vs R-D selection** for event-level rationale carrier shape.
- **Vocabulary for selection-rationale categories** (the example categories named in Section 4 — convergence; divergence-as-illustration; coverage-of-aspect; recency/specificity; brand-platform-alignment; operator-judgment — are illustrative, not closed).
- **Articulation-state value space at per-reference level** (whether parallel to Option F's articulation_state on inspection log or distinct).
- **Confidence vocabulary at per-reference-rationale level** (parallel to the five-value `derivation_basis` distinction; whether the same vocabulary applies or a separate per-reference vocabulary is needed).
- **Multi-reference event handling** (how the carrier shape scales when a single intake event selects many references; parallel strain to PR #260's multi-event-per-decision case for contradiction-resolution).

### Held pending cross-substrate pressure

These constraints await pressure against substrates with explicit anti-references or persistent counter-examples:

- **Negative / avoid reference handling** (explicit anti-references as architecturally distinct from per-event rejection): whether negative references deserve a separate carrier, fit within `reference_assets` with a polarity attribute, or live in the R-E complement carrier.
- **Reference-rationale durability across reuse contexts** (held pending cross-substrate generalization; partially scoped out by the intake-time vs reuse-time Zone 4 boundary).

### Rejected / Insufficient

These constraints / options are explicitly out of consideration:

- **R-A prose-only reference rationale** — fails the three reader-flag observations across PR #254 + #258 + #260.
- **R-B as sole carrier** — covers intrinsic rationale but does not address event-level selection rationale or rejected alternatives; insufficient alone.
- **R-C OR R-D as sole carrier (without R-B complement)** — covers event-level but loses per-reference intrinsic rationale that travels across events; insufficient alone.
- **R-E as sole carrier (without R-B / R-C / R-D)** — addresses only rejected references; non-substitutable for selected-reference rationale.

### Adjacent Zone 4 question, not decided here

- **Reuse-time governed-output continuity / derivative governance.** When governed outputs become references for derivative packets (Zone 4 per PR #248's brand-system carrier decision surface v2), the governance shape for that reuse flow is distinct from intake-time reference rationale. The two surfaces share carrier-shape patterns potentially (a rationale carrier per intake event vs per reuse event), but the architectural decisions are different. Zone 4 remains a held decision surface; this artifact does not collapse into it.

## Relationship to Existing Architecture

Implications only; no authorization of further work.

### Reference-function taxonomy

PR #239's nine-fold reference-function taxonomy provides the vocabulary this surface aligns with for per-reference function attribution. The taxonomy was articulated without per-instance carrier; this surface's R-B + R-C/R-D shapes provide the carrier-shape posture per-instance function attribution would live in. No mutation of the taxonomy is implied; the taxonomy carries.

### Brand digestion / reference-selection discretion site

PR #239's nine-site creative-discretion decomposition named reference-selection as one of the nine sites of authorship-bearing discretion. PR #241's seven-stage extraction sequence has reference-selection occurring within Stage 1 // Evidence (from asset library). This surface's reference-rationale carrier sits at that stage's structured output. The discretion site is named; the carrier-shape for its trace is articulated here.

### Option F trace carrier posture

The Option F trace carrier posture (per-source-layer inspection log + intake decision records + contradiction-resolution carrier) addresses decision-level rationale at the per-content-piece granularity. The intake reference rationale carrier sits at finer granularity (per-reference within a decision that selects references). The two are orthogonal at the conceptual posture level: Option F preserves *what decisions were made*; intake reference rationale preserves *why these references were chosen for the decisions that selected references*. R-D's posture (sub-field on intake decision record) is the tightest structural coupling between the two; R-B and R-C/R-E sit at orthogonal carriers.

### `reference_assets`

`reference_assets` is the existing carrier for reference identity + (currently empty) `asset_metadata`. R-B extends `asset_metadata` directly; the other options sit elsewhere. No mutation of `reference_assets` schema is authorized by this surface; the structural posture is articulated for future carrier-shape design.

### Packet-level `approved_reference_keys`

`packet.approved_reference_keys` provides the structural linkage from packet to selected references. The carrier shape for *why* these specific keys were selected at the intake event that produced this packet is what this surface pressures. R-C/R-D would attach the event-level rationale at the packet-or-decision level; R-B would attach per-reference rationale that informs but does not duplicate the per-event rationale.

### Slot-level reference inheritance

Slot-level references inherit from packet-level via the lookup chain. The intake reference rationale carrier sits at packet-level (or decision-level); slot-level inheritance carries the rationale via reference inheritance. No new structural work is required at the slot level; the inheritance pattern is preserved.

### Negative / avoid references

Explicit anti-references are a held architectural question this surface names but does not resolve. The current architecture has no first-class concept of "references the brand explicitly does NOT do." Whether this fits within `reference_assets` with a polarity attribute, within R-E's rejected-alternatives carrier expanded to persistence, or in a separate `anti_reference_assets` entity is a held design question.

### Governed-output continuity as separate Zone 4 surface

PR #256 explicitly preserved reuse-time reference governance as Zone 4 territory. PR #248's brand-system carrier decision surface v2 located Zone 4 at the governed-asset / reference-linkage layer. This surface preserves that boundary: the intake reference rationale carrier addresses intake-time selection; Zone 4 addresses reuse-time governance. The two surfaces may share carrier patterns (event-level rationale per event) but the decisions are different. Zone 4 remains held as an adjacent decision surface, not collapsed into this artifact's scope.

## Earned vs Held

### What this surface narrows at this evidence depth

- **Required-by-reader-flag-evidence constraints** are named explicitly. Any future reference-rationale carrier that does not satisfy them would fail the reconstruction the three Option F readers flagged.
- **Structurally-suggested constraints** are named with the hybrid posture (R-B + R-C/R-D + R-E) as the conceptual posture. The R-C vs R-D selection is held — pattern parallel to PR #256's stance on contradiction-resolution carrier-shape choice.
- **Held constraints** are named with the specific operational pressure each would require to earn or refine (mocked-rationale-carrier fresh-reader test; cross-substrate pressure; explicit-anti-reference substrate).
- **Rejected constraints** are named with specific failure reasoning grounded in the Zone 6 arc's empirical evidence.
- **Zone 4 boundary is preserved** — reuse-time governance is named adjacent and held, not collapsed into intake-time rationale.

### What remains held — unchanged by this surface

- **Exact carrier shape.** Field types (string / enum / reference / blob); cross-entity relationships; rollup patterns; required-vs-optional flags; cardinality constraints; null handling; default values.
- **Schema.** Airtable; JSON Schema; Pydantic; validator integration.
- **Structured IA model v3.** The constraint list could inform v3 absorption; v3 itself remains held.
- **R-C vs R-D selection** for event-level rationale carrier shape. Held pending operational pressure.
- **Selection-rationale category vocabulary.** Held pending operational pressure.
- **Articulation-state value space at per-reference level.** Held.
- **Confidence vocabulary at per-reference-rationale level.** Held.
- **Multi-reference event scaling.** Held pending operational pressure (parallel to PR #260's multi-event pressure for contradiction-resolution).
- **Negative / avoid reference handling.** Held pending cross-substrate pressure or explicit substrate test.
- **Zone 4 reuse-time governance decision surface.** Held as adjacent decision surface.
- **Operational test of mocked rationale carriers.** Held; would parallel PR #254 / #258 / #260 for Option F.
- **Validator / orchestration consumer surfacing.** Held.
- **Architecture front-door wholesale rewrite.** Held; bounded absorption pattern continues.

### What this artifact explicitly does not do

- Author any Airtable field shape, schema mutation, JSON Schema, Pydantic model, or validator logic
- Author any entity placement decision (where rationale-carrier records live structurally)
- Author any cross-entity relationship design
- Promote any held carrier candidate to structural form
- Adjudicate the held-candidate inventory
- Mutate structured IA model v2's appendix
- Author structured IA model v3
- Modify [`docs/architecture.md`](architecture.md), [`docs/index.md`](index.md), [`README.md`](../README.md), [`docs/method.md`](method.md), [`AGENTS.md`](../AGENTS.md), any milestone marker, or any prior artifact
- Modify the grounding note
- Author milestone 12
- Authorize a Zone 4 governed-output continuity / reuse-derivative governance decision surface
- Authorize operational pressure tests (fresh-reader; cross-substrate; multi-reference event scaling)
- Authorize multi-reader replication of any test
- Authorize validator / orchestration spec
- Resolve any held question
- Resolve the R-C vs R-D selection

## Self-Superseding Clause

This artifact is a v1 decision surface. It should be superseded by:

- An operational pressure test that mocks reference-rationale carriers (parallel to PR #254 / #258 / #260 for Option F) and tests fresh-reader reconstruction of per-reference rationale, event-level rationale, and rejected alternatives.
- A multi-reference scaling test (high-cardinality reference-selection events) that pressures the carrier-shape choice between R-C (separate record) and R-D (sub-field on decision record) more sharply.
- A cross-substrate test against substrates with explicit anti-references or persistent counter-examples.
- A specific intake-reference-rationale implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns for the structurally-suggested constraints.
- A structured IA model v3 that absorbs the reference-rationale operational support into the YAML appendix's held_questions list.
- A subsequent decision surface that resolves the R-C vs R-D selection based on operational evidence.
- A Zone 4 governed-output continuity / reuse-derivative governance decision surface that addresses reuse-time reference governance (separate scope; held as adjacent surface).
- A subsequent milestone marker (milestone 12, etc.) that absorbs intake-reference-rationale carrier evidence into a plateau.
- The eventual wholesale rewrite of [`docs/architecture.md`](architecture.md) that consolidates the intake-reference-rationale surface at greater depth.

It does not supersede the Option F trace carrier shape design surface v1 (PR #256; the constraint vocabulary this artifact parallels), the real multi-operator continuity-break test v1 (PR #254; the no-contradiction Option F baseline), the Option F contradiction-present continuity-break test v1 (PR #258), the Option F multi-contradiction continuity-break test v1 (PR #260), the intake trace carrier decision surface v1 (PR #252; the Option F conceptual posture identification), the continuity-breaking intake trace test v1 (PR #250), the brand-system carrier decision surface v2 (PR #248; which preserves Zone 4 as adjacent and located the intake-time vs reuse-time boundary), the brand intake judgment-trace dry run v1 (the substrate), the layered reference and discretion architecture v1 (PR #239; the nine-fold reference-function taxonomy this surface aligns with), structured IA model v2, the apex definition-layer artifact, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings (particularly the asset library deepening which articulates references as visual fidelity anchors), the layered intake architecture v1 (PR #241; the seven-stage extraction sequence within which reference-selection occurs), the cross-category synthesis v1 (PR #244), the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, milestone 10, or milestone 11. Those remain authoritative for their content depth; this artifact reads them at intake-reference-rationale-carrier-decision-surface depth.

## Anchor Documents

### Direct conceptual predecessor (parallel design surface)

- [`docs/option-f-trace-carrier-shape-design-surface-v1.md`](option-f-trace-carrier-shape-design-surface-v1.md): PR #256 design-surface pattern this artifact parallels for a distinct architectural seam (contradiction-resolution carrier shape there; intake-time reference-rationale carrier shape here); R-options for reference-selection rationale named there are the starting vocabulary this artifact pressures with explicit decision criteria

### Direct empirical predecessor (the readers who flagged the gap)

- [`docs/real-multi-operator-continuity-break-test-v1.md`](real-multi-operator-continuity-break-test-v1.md): PR #254 reader-flag observation on `asset_metadata` empty / per-reference rationale unreconstructable
- [`docs/option-f-contradiction-present-continuity-break-test-v1.md`](option-f-contradiction-present-continuity-break-test-v1.md): PR #258 reader-flag observation (second independent surfacing)
- [`docs/option-f-multi-contradiction-continuity-break-test-v1.md`](option-f-multi-contradiction-continuity-break-test-v1.md): PR #260 reader-flag observation (third independent surfacing)

### Direct plateau-marker predecessor

- [`docs/milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md`](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md): the Zone 6 / Option F plateau marker that explicitly named reference-rationale carrier shape (R-B / R-C / R-D / R-E) as held; this artifact addresses that held design question

### Substrate this artifact reads against

- [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md): PR #252 conceptual posture (Option F as surviving carrier posture; this artifact's R-D coupling pattern references the decision-record-as-trace-anchor posture)
- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 simulated baseline; established the trace-dimension vocabulary
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 located Zone 6 at intake / governance layer + Zone 4 as adjacent reuse-time decision surface
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry-run substrate the Option F arc reads against
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset-library deepening; articulates references as visual fidelity anchors
- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as premise

### Conceptual framing

- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 nine-fold reference-function taxonomy; nine-site creative-discretion decomposition naming reference-selection as authorship-bearing-discretion site
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence within which reference-selection occurs (Stage 1 // Evidence)
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; positions asset library as evidence-shaped category and reference governance across six-category set
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this artifact's R-options map to (without mutating)

### Plateau markers

- [`docs/milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md`](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md): current plateau marker
- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): prior plateau marker

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
