# Option F Trace Carrier Shape Design Surface v1

## Posture

```text
carrier-shape design surface
Zone 6 / intake-governance trace
follows PR #254 empirical support (trace holds at one-reader / one-substrate / mocked-shape depth)
defines conceptual carrier-shape constraints only
not schema
not Airtable
not JSON Schema
not Pydantic
not validator / orchestration implementation
not structured IA v3
not implementation plan
not field list
not entity placement decision
not held-candidate adjudication map
not new reader test
not milestone
does not promote any carrier shape to schema
does not author specific field types, cross-entity relationships, or rollup patterns
self-superseding when contradiction-present substrate test, cross-substrate test, multi-reader replication, or a subsequent implementation move absorbs it
```

This artifact pressures the **specific carrier-shape constraints** any future Option-F implementation would need to satisfy, given PR #254's successful fresh-reader reconstruction against mocked Option-F carriers. It is the next architectural step between conceptual posture (PR #252) and any specific carrier-shape implementation move — neither, per the v1 doctrine, is yet earned. The artifact names what's *required* by PR #254's empirical findings, what's *structurally suggested* by the reader-flagged observations, what's *held* pending future tests, and what's explicitly *rejected* as overbuilt.

The artifact does NOT author schema. It defines conceptual constraints that any future carrier-shape design must satisfy or address. Specific field types, entity placement, cross-entity relationships, rollup patterns, value-space sizing decisions, and validator integration all remain held design moves.

## What This Artifact Attempts

Option F's status after the Zone 6 sequence:

- **PR #250:** trace partially breaks against no carriers (intake-time judgment trace is operator-continuous; non-author readers cannot reconstruct intake reasoning).
- **PR #252:** Option F (hybrid per-source-layer inspection log + intake decision record) identified as the surviving conceptual posture for addressing all six PR #250 trace dimensions.
- **PR #254:** mocked Option F carriers + fresh reader → trace holds at this test (10/10 reconstruction success). Option F is operationally supported at one-reader / one-substrate / mocked-shape depth.
- **PR #255:** routed the finding into the architecture front door and index.

Option F is now **conceptually and one-reader operationally supported**. Specific carrier shape is still held. The architectural question this surface pressures:

> What must any future Option-F carrier shape preserve, support, or address — given PR #254's empirical findings and the reader-flagged shape concerns — without overbuilding schema?

The question is constraint-naming, not implementation. The artifact narrows the design space without authoring the design.

## PR #254 Findings That Shape Design Must Answer

Six findings from PR #254 that this design surface reads against:

1. **10/10 fresh-reader reconstruction success.** The mocked carrier set enabled full reconstruction of intake reasoning for six content pieces and four cross-cutting dimensions. The specific attributes the mock encoded (per-source-layer inspection log with `inspected` / `articulation_state` / `content_produced`; intake decision records with source_layer / fallback_chain_position / derivation_basis / source_content / resolved_content_piece / target_ia_layer) are the load-bearing minimum for reconstruction at this depth.
2. **Five-value `derivation_basis` vocabulary preserved the architecturally-distinct sub-distinctions.** The reader correctly distinguished inferred-from-evidence (Q-2) from operator-authored (Q-6), and worked-example-default (Q-4, Q-5) from operator-authored (Q-6). The PR #241 + PR #250-sharpened sub-distinctions are recoverable through this specific five-value vocabulary; conflation of values would have failed the test.
3. **Negative-space trace was recoverable** via the inspection log's value space — the reader distinguished inspected-and-absent (2 layers) from not-inspected (1 layer). This dimension was previously a paper-pressed candidate; PR #254 demonstrated structural recoverability.
4. **Granularity concern (reader-flagged).** The mocked content-piece-level granularity worked because each test content piece had a single intake decision behind it. The reader explicitly flagged that prose-rich carriers with multi-clause derivation, where multiple semantic clauses within a single content piece derive from different decisions, are not covered by content-piece-level granularity.
5. **Reference opacity concern (reader-flagged).** The mocked `reference_assets` carried only the image attachment with empty `asset_metadata`. The reader explicitly flagged this as "may be a meaningful gap rather than a cosmetic one" for visual-reference governance use cases: which references the operator considered, the convergence/divergence axes evaluated, whether alternatives were rejected — none reconstructable from the mocked shape.
6. **Test limits.** One reader; one substrate; mocked shape; no contradiction-present substrate; no cross-substrate generalization; no long-context / temporal pressure. The constraints below honor these limits — what's required is what PR #254 demonstrated as load-bearing; what's structurally suggested is what the reader's observations surfaced; what's held is what the substrate or test design could not pressure.

## Carrier-Shape Requirements

Per-component minimum constraints. Each component named, with required / structurally-suggested / held / rejected labels per ASK's vocabulary.

### Per-source-layer inspection log

**REQUIRED by PR #254:**

- One record per fallback chain layer per intake event (the test mock used six rows for the six-layer chain; the structure scales with whatever fallback chain depth applies to a given intake).
- `inspected` attribute with value space `{yes, no}` — preserves presence-of-inspection trace.
- `articulation_state` attribute with value space covering at minimum `{rich, partial, generic, contradictory, divergent, absent, applied, not_applicable}` — preserves articulation-state trace at layer level.
- `content_produced` attribute with value space `{yes, no}` — preserves the inspection-log-to-decision-record linkage signal.

**STRUCTURALLY SUGGESTED:**

- Bidirectional linkage from inspection log entries to intake decision records (so a reader can navigate from "layer N produced content" to "which content pieces specifically came from layer N").
- Per-intake-event identifier shared across the inspection log and the intake decision records (so all D + E records for one intake event can be co-retrieved).

**HELD:**

- Whether the inspection log is a separate first-class entity, a sub-record of the intake event, or some other structural shape.
- Whether per-layer rows are separate records or a single composite record per intake event.
- Whether the `articulation_state` value space can extend (e.g., to capture `partial-with-evolution-flag` or other compound states).

### Intake decision record

**REQUIRED by PR #254:**

- One record per piece of resolved content (at minimum — see Section 5 for granularity decision).
- `source_layer` attribute with value space matching the six brand-system input categories plus `none` for operator-authored — preserves chain-position trace.
- `fallback_chain_position` attribute with value space matching positions 1–6 plus 7 for operator-authored — redundant with `source_layer` but preserves the ordered-chain trace explicitly.
- `derivation_basis` attribute with the **five-value vocabulary** `{lifted-verbatim, inferred-from-evidence, worked-example-default, operator-authored, unresolved-marked}` — preserves both PR #241 + PR #250 sub-distinctions.
- `source_content` attribute (text or reference) — preserves evidence-basis trace.
- `resolved_content_piece` attribute (reference into IA view) — preserves the decision-to-IA-output linkage.
- `target_ia_layer` attribute with value space matching the eight IA layers from structured IA model v2 — preserves layer-level placement trace.

**STRUCTURALLY SUGGESTED:**

- `contradiction_resolution` attribute on records where applicable (held vocabulary pending contradiction-present substrate test; placement may be sub-field on decision record OR separate carrier — Section 7 decides).
- Linkage to operator-judgment protocol sketch v1's eight-step shape (some attributes overlap: source_content ≈ evidence basis; derivation_basis ≈ confidence/articulation state; this artifact does not commit to the alignment).

**HELD:**

- Granularity (Section 5 addresses).
- Whether records are per-content-piece (one record per piece) or per-decision (one record per upstream decision, potentially producing multiple content pieces).
- Whether the `derivation_basis` value space can extend (e.g., for cross-source-blend, hybrid derivation, partially-inferred-partially-authored).
- Whether `source_content` is a free-text reference or a structured pointer; what kind of evidence reference is honored (citation; URL; file pointer; layer-relative identifier).

**REJECTED:**

- Collapsing the five-value `derivation_basis` to fewer values (e.g., merging operator-authored with worked-example-default; merging lifted-verbatim with inferred-from-evidence). PR #254 demonstrated each distinction as load-bearing; collapse would fail the architecturally-distinct sub-distinction recovery.

### Relationship between inspection log and decision records

**REQUIRED:**

- Shared intake-event identifier so all D + E records can be co-retrieved as a single intake event's trace.

**STRUCTURALLY SUGGESTED:**

- Bidirectional linkage from inspection log entries (per layer) to the intake decision records produced from that layer (so navigating from "layer N produced content" to "specifically these decisions" is structural rather than join-by-attribute).

**HELD:**

- Whether the two carriers remain two distinct entity types or collapse into a single "intake event" entity model with two sub-structures (the D and E components as nested record collections).
- Whether the inspection log is read as a per-event summary that the decision records elaborate, or as an independent per-event record whose value-space the decision records mirror.

### Resolved content piece granularity

This is the design decision Section 5 addresses. Summary:

**STRUCTURALLY SUGGESTED:** content-piece-level granularity as floor (sufficient for PR #254 cases).

**HELD pending cross-substrate pressure:** clause-level granularity for prose-rich carriers where a single content piece's prose includes multiple semantic clauses each derived from different decisions.

### Derivation basis

Covered above under intake decision record. Five-value vocabulary REQUIRED; collapse REJECTED; extension HELD.

### Fallback chain position

Covered above under intake decision record. Value space 1–6 + 7 REQUIRED.

### Source layer

Covered above under intake decision record. Value space matching six brand-system input categories + `none` REQUIRED.

### Target IA layer

Covered above under intake decision record. Value space matching eight IA layers from structured IA v2 REQUIRED.

### Contradiction-resolution

**STRUCTURALLY SUGGESTED:** carrier for contradiction-resolution trace.

**HELD pending contradiction-present substrate test:** specific carrier shape (sub-field on intake decision record vs separate `contradiction_log` entity per PR #250's paper-pressed held candidate vs annotation on inspection log entry); value vocabulary; relationship to the conflict-source decision records.

PR #254 substrate had no contradictions; the test could not pressure this dimension. The contradiction-present substrate test (now a candidate next-pressure surface) would directly pressure the contradiction-resolution carrier-shape question. Until then, contradiction-resolution carrier-shape design remains held.

### Negative-space trace

**REQUIRED:** carriable via the inspection log's `inspected` + `content_produced` value space (the negative case `inspected=no, content_produced=no` distinguishes structurally from `inspected=yes, content_produced=no`).

**HELD:** whether negative-space trace needs additional carrier beyond the inspection log (e.g., for tracking *why* a layer was not inspected — out of scope; out of budget; deliberately skipped).

### Reference-selection rationale

This is the design decision Section 6 addresses. Summary:

**STRUCTURALLY SUGGESTED:** carrier for reference-selection rationale at intake time (PR #254 reader explicitly flagged the gap).

**HELD pending implementation choice:** specific placement among three alternatives (extend `asset_metadata` vs separate reference-selection-rationale record vs sub-field on intake decision record).

### Rejected / unselected alternatives

**STRUCTURALLY SUGGESTED:** carrier for rejected alternatives (overlap with paper-pressed `rejected_assets` held candidate in structured IA model v2's held_questions list).

**HELD:** whether the carrier is the existing held `rejected_assets` candidate or a sub-field on intake decision records or inspection log. The decision is properly Section 6's reference-opacity surface plus the held-candidate-adjudication question — neither of which this artifact resolves.

## Granularity Decision Surface

Five granularity options compared. Each option named; decision posture labeled.

### Option G-A — Content-piece-level trace

One decision record per piece of resolved IA content (the PR #254 mock). The granularity that worked for the six PR #254 test cases.

**Reconstruction coverage:** sufficient for cases where each content piece has a single intake decision behind it.

**Reconstruction failure case:** prose-rich content pieces where a single field (e.g., `creative_intent`) contains multiple semantic clauses each derived from different decisions.

**Operator burden:** moderate (one record per content piece).

**Decision posture: STRUCTURALLY SUGGESTED as floor.** PR #254 demonstrated content-piece-level as sufficient for the test substrate; this is the minimum any real Option-F implementation must support.

### Option G-B — Clause-level trace

One decision record per clause within content piece. Each prose-rich field is decomposed into clauses; each clause gets its own decision record.

**Reconstruction coverage:** full coverage including the reader-flagged prose-rich case.

**Reconstruction failure case:** clause-identification itself becomes an open question (what counts as a clause? do clause boundaries reliably align with derivation boundaries?).

**Operator burden:** high (per-clause record-keeping; clause-identification step).

**Decision posture: HELD pending real prose-rich content pressure.** PR #254 substrate did not pressure this; reader's observation flagged the gap but did not test it. A cross-substrate test against prose-rich content with multi-clause derivation would either earn clause-level granularity as required or surface alternative resolutions (e.g., chunked clause groupings; pre-decomposed prose authoring).

### Option G-C — Mixed granularity

Different IA carrier types get different granularity (content-piece-level for some; clause-level for others; possibly per-carrier-type configuration). For example: `creative_intent` (prose-rich) might use clause-level; `slot_role` (enum) uses content-piece-level (single decision per enum value).

**Reconstruction coverage:** full coverage if per-carrier-type granularity is well-chosen.

**Reconstruction failure case:** granularity-choice consistency across implementations; per-carrier-type granularity decisions become themselves a design surface.

**Operator burden:** variable per carrier type.

**Decision posture: STRUCTURALLY SUGGESTED as an implementation pattern** if specific Option-F implementation needs per-carrier-type granularity. The decision of *which* carriers get *which* granularity is itself a design move; held.

### Option G-D — Event-level trace

One decision record per intake event (not per content piece). All resolved content for an intake event grouped under a single record with structured per-content-piece sub-structure.

**Reconstruction coverage:** would lose per-content-piece atomic traceability that PR #254 demonstrated as load-bearing.

**Reconstruction failure case:** Q-1 vs Q-2 in the PR #254 test would be indistinguishable if one event-level record encompassed both decisions; reconstruction would have to navigate the sub-structure which is more brittle than per-record retrieval.

**Decision posture: REJECTED.** Loses the per-content-piece atomic traceability PR #254 demonstrated as load-bearing. The decision record is the per-content-piece carrier; collapsing to event-level inverts the structural shape that enabled the 10/10 reconstruction.

### Option G-E — Field-level trace

One decision record per IA field (not per content piece). Each IA field — even if the field contains one content piece — gets its own decision record; multi-piece fields get one record per field, not per piece.

**Reconstruction coverage:** per-field rather than per-piece; would conflate multi-piece fields.

**Reconstruction failure case:** Q-1 and Q-2 are both in `packet.creative_intent` — a single IA field that PR #254 demonstrated requires two distinct decision records (one for "everyday households"; one for "calm, warm-tone, accessible"). Field-level trace would collapse them.

**Decision posture: REJECTED.** Too granular in one sense (over-volume of records for fields with multiple semantic clauses each derived differently) and not granular enough in another (collapses multi-piece fields into single records). Wrong axis.

### Granularity decision posture summary

| Option | Posture |
|---|---|
| G-A — Content-piece-level | STRUCTURALLY SUGGESTED as floor |
| G-B — Clause-level | HELD pending real prose-rich content pressure |
| G-C — Mixed granularity | STRUCTURALLY SUGGESTED as implementation pattern; per-carrier-type choice HELD |
| G-D — Event-level | REJECTED (loses per-content-piece atomic traceability) |
| G-E — Field-level | REJECTED (wrong axis) |

The decision surface narrows the granularity question without resolving it. Content-piece-level is the floor (PR #254 demonstrated); clause-level vs mixed granularity is the open question for prose-rich carriers; event-level and field-level are out of consideration.

## Reference Opacity Decision Surface

Five options for reference-selection rationale. Each option named; decision posture labeled. Care taken not to collapse into full Zone 4 reuse / derivative governance — see clarification at end of section.

### Option R-A — Leave reference rationale prose-only

Reference-selection rationale stays in `capture_notes` or `creative_intent` text or operator side notes; no structural carrier.

**Decision posture: REJECTED.** PR #254 reader explicitly flagged this as "may be a meaningful gap rather than a cosmetic one" for visual-reference governance use cases. The architecture's existing prose carriers are already operator-continuity-load-bearing for non-trace content; adding reference rationale to the same prose carriers preserves the gap PR #250 demonstrated breaks.

### Option R-B — Extend `asset_metadata` on `reference_assets`

The existing `reference_assets` entity carries `asset_metadata` (currently empty in the mock; potentially populated in real cases). Extend to include selection rationale per reference (axes of convergence/divergence noted; comparative judgments; provenance for the rationale).

**Reconstruction coverage:** preserves rationale at the reference level (per-reference notes that travel with the reference across packets).

**Reconstruction failure case:** the rationale is reference-attached, not intake-event-attached; the same reference selected for different intake events might have different rationales each time, requiring per-event vs per-reference distinction.

**Decision posture: STRUCTURALLY SUGGESTED.** Lightest-weight option; uses existing entity. Per-event vs per-reference distinction is HELD design decision.

### Option R-C — Separate reference-selection-rationale record

A new entity (or sub-record) per reference-selection decision, capturing which references were considered, which were chosen, what axes were evaluated.

**Reconstruction coverage:** preserves rationale at intake-decision level (each reference-selection decision has its own record).

**Reconstruction failure case:** creates additional entity; potential overlap with intake decision record (which already captures source_content for the four references chosen).

**Decision posture: STRUCTURALLY SUGGESTED as alternative to R-B.** Heavier shape; preserves intake-event-attached rationale explicitly.

### Option R-D — Tie reference rationale to intake decision record

Extend the existing intake decision record (the D3 record in the PR #254 mock — "lift 4 asset library references") with sub-fields capturing selection rationale (axes considered; alternatives rejected).

**Reconstruction coverage:** preserves rationale at intake-decision level (same as R-C) within existing entity structure.

**Reconstruction failure case:** intake decision record becomes more complex; the relationship between a decision-record extension and `reference_assets` metadata extension may overlap.

**Decision posture: STRUCTURALLY SUGGESTED as alternative to R-B and R-C.** No new entity; extends the existing intake decision record.

### Option R-E — Log rejected alternatives

A separate `rejected_assets` carrier (per the paper-pressed held candidate in structured IA model v2's held_questions list) or sub-field on inspection log capturing references considered-but-not-selected.

**Reconstruction coverage:** addresses the "what alternatives were rejected" half of the reader's flagged gap (the "why these specifically" half is addressed by R-B / R-C / R-D).

**Reconstruction failure case:** doesn't address selection rationale on its own; pairs with R-B / R-C / R-D rather than replacing them.

**Decision posture: STRUCTURALLY SUGGESTED as complementary carrier** to whichever of R-B / R-C / R-D the implementation chooses.

### Reference opacity decision posture summary

| Option | Posture |
|---|---|
| R-A — Leave prose-only | REJECTED |
| R-B — Extend `asset_metadata` | STRUCTURALLY SUGGESTED (lightest) |
| R-C — Separate reference-selection-rationale record | STRUCTURALLY SUGGESTED (heavier) |
| R-D — Tie reference rationale to intake decision record | STRUCTURALLY SUGGESTED (extends existing) |
| R-E — Log rejected alternatives | STRUCTURALLY SUGGESTED as complement |

The specific placement among R-B / R-C / R-D is HELD as a real-implementation choice; multiple shapes are defensible. R-E pairs with whichever is chosen. R-A is rejected because PR #254 reader flagged the prose-only state as the gap to address.

### Clarification — Zone 4 boundary

Reference-selection rationale at intake time (which references the operator chose at the moment of intake, why those vs alternatives) is Zone 6 (intake / governance trace). The artifact above addresses Zone 6.

Reference-selection rationale at reuse time (which previously-governed assets become references for derivative packets, under what governance) is Zone 4 (governed-output continuity / reuse-derivative governance), per PR #248's narrowing. The two zones may share carrier patterns or may not; this artifact does not collapse Zone 6 into Zone 4 territory.

The held adjacent question — whether reference governance at intake-time and reference governance at reuse-time share structural carriers — is for a separate decision surface (a Zone 4 decision surface, currently held). This artifact stays at Zone 6.

## Recommended Option-F Shape Constraints

Consolidated constraint list per ASK's five labels.

### Required by PR #254

These constraints any future Option-F implementation MUST satisfy because PR #254 demonstrated them as load-bearing for the 10/10 reconstruction:

- Per-source-layer inspection log: one record per fallback chain layer per intake event; `inspected` + `articulation_state` + `content_produced` attributes; vocabularies matching PR #254 mock or equivalent.
- Intake decision record: one record per piece of resolved content (at minimum content-piece-level granularity per Section 5); six required attributes (source_layer, fallback_chain_position, derivation_basis, source_content, resolved_content_piece, target_ia_layer).
- `derivation_basis` five-value vocabulary preserved without collapse: `lifted-verbatim` / `inferred-from-evidence` / `worked-example-default` / `operator-authored` / `unresolved-marked`.
- Shared intake-event identifier across inspection log and decision records for one intake event.
- Negative-space trace carriable via inspection log's value space (inspected-and-empty vs not-inspected distinguished).

### Structurally Suggested

These constraints are not required by PR #254 alone but are surfaced by the reader-flagged observations as load-bearing for any real implementation:

- Bidirectional linkage from inspection log entries to intake decision records produced from that layer.
- Content-piece-level granularity as floor (G-A); mixed granularity (G-C) as implementation pattern if needed per-carrier-type.
- Reference-selection rationale carrier somewhere (R-B / R-C / R-D — implementation choice among three structural alternatives).
- Rejected alternatives carrier (R-E) as complement to whichever reference-rationale carrier is chosen.

### Held pending contradiction-present substrate

These constraints await a substrate where contradictions exist to be resolved:

- `contradiction_resolution` carrier shape (sub-field on intake decision record vs separate `contradiction_log` entity vs annotation on inspection log entry).
- Value vocabulary for contradiction-resolution.
- Relationship between contradiction-resolution carrier and the conflict-source decision records.

### Held pending cross-substrate pressure

These constraints await pressure against substrates richer / sparser / more complex than the dry-run synthetic stack:

- Clause-level granularity (G-B) for prose-rich content with multi-clause derivation.
- Behavior under contradictory / divergent multi-source articulation.
- Long-context / temporal-pressure carrier durability.
- Whether the `articulation_state` value space scales (e.g., needs `partial-with-evolution`, `superseded`, etc.).
- Whether the five-value `derivation_basis` vocabulary can extend (e.g., for cross-source-blend, hybrid derivation).

### Rejected / Overbuilt

These constraints / options are explicitly out of consideration:

- Prose-only reference rationale (R-A) — fails PR #254 reader-flagged gap.
- Event-level granularity (G-D) — loses per-content-piece atomic traceability that enabled the 10/10 reconstruction.
- Field-level granularity (G-E) — wrong axis; conflates multi-piece fields.
- Collapsing the five-value `derivation_basis` to fewer values — fails the PR #241 + PR #250 sub-distinction recovery.

## Relationship to Future Pressure Surfaces

Implications only; no authorization.

- **Multi-reader replication of the Zone 6 test.** With this constraint surface in hand, a replication can now test reader variability against the specific constraint set rather than against the implicit mock. Readers' divergence patterns become analyzable against the constraint vocabulary. Candidate; not authorized.
- **Contradiction-present substrate test.** Would directly pressure the contradiction-resolution carrier-shape design decision (held pending). Sharper than before because the question is now "which structural shape carries contradiction-resolution," not just "is contradiction-resolution trace needed." Candidate; not authorized.
- **Cross-substrate test.** Would directly pressure the granularity choice (specifically clause-level G-B vs mixed G-C). The test substrate would need prose-rich content with multi-clause derivation. Candidate; not authorized.
- **Structured IA model v3.** This surface gives v3 a sharper substrate — the constraint list could absorb into v3's YAML appendix as held carrier-constraint markers (without promoting them to structural carriers themselves; the appendix's held_questions list could grow with the new sub-categories). v3 itself remains held. Candidate; not authorized.
- **Validator / orchestration spec.** Still downstream of carrier-shape design + operational earning. This surface clarifies what constraints validators would need to verify (e.g., five-value `derivation_basis`; required attributes on inspection log) but does not author validator logic. Candidate; not authorized.
- **Architecture front-door wholesale rewrite.** May eventually need to integrate the constraint vocabulary as part of a broader architecture rewrite; not authorized.
- **Specific carrier-shape implementation move (one notch beyond this surface).** Would author specific field types, entity placement, cross-entity relationships, and rollup patterns — the design decisions this surface explicitly leaves held. The path from this surface to implementation passes through either operational earning (contradiction-present + cross-substrate tests) or explicit authorization to implement against the structurally-suggested constraints with implementation-choice held. Not authorized by this surface.

## Earned vs Held

What this surface narrows at this evidence depth:

- **Required-by-PR-#254 constraints** are named explicitly. Any future Option-F implementation that does not preserve these five required constraints would fail the reconstruction the test demonstrated.
- **Structurally-suggested constraints** are named with multiple structural alternatives where alternatives exist (granularity G-A / G-C; reference rationale R-B / R-C / R-D). The decision surface does not force a single shape where multiple shapes are defensible.
- **Held constraints** are named with the specific test pressure each would require to earn or refine (contradiction-present substrate for contradiction-resolution; cross-substrate for clause-level granularity; long-context for temporal preservation).
- **Rejected constraints** are named with specific failure reasoning grounded in PR #254 evidence (event-level loses per-content-piece atomic traceability; field-level wrong axis; prose-only fails reader-flagged gap; vocabulary collapse fails sub-distinction recovery).
- **Zone 6 vs Zone 4 boundary is preserved** — reference rationale at intake time is Zone 6 (this artifact); reference rationale at reuse time is Zone 4 (separate decision surface, held).

What remains held — unchanged by this artifact:

- **All specific implementation choices.** Entity placement (separate entity vs sub-record vs nested structure); field types (string / enum / reference / blob); cross-entity relationships (one-to-one / one-to-many / many-to-many); rollup patterns; required vs optional flags; cardinality constraints; null handling; default values.
- **All schema / JSON Schema / Pydantic / validator authorship.** This artifact preserves the v1 doctrine — structure earns its keep when operational pressure surfaces a need; constraint articulation is not schema.
- **Structured IA model v3.** The constraint list could inform v3 absorption; v3 itself remains held.
- **Reference-rationale specific placement (R-B vs R-C vs R-D).** Implementation choice held.
- **Contradiction-resolution carrier shape.** Held pending contradiction-present substrate test.
- **Clause-level granularity authorization.** Held pending cross-substrate pressure.
- **Brand-system carrier decision (Zone 1B residual question per PR #248).** Independent; not pressured by this surface.
- **Zone 3 / Zone 4 / Zone 5 operational pressure.** Unchanged.
- **Operator-judgment protocol sketch v1's eight-step shape alignment.** The two structures overlap conceptually; whether they merge or remain distinct is held.
- **Multi-reader replication / cross-substrate / long-context generalization.** Unchanged.

What this artifact explicitly does not do:

- Author any Airtable field shape, schema mutation, JSON Schema, Pydantic model, or validator logic.
- Author any entity placement decision (where carrier records live structurally).
- Author any cross-entity relationship design.
- Promote any held carrier candidate to structural form.
- Adjudicate the held-candidate inventory.
- Mutate structured IA model v2's appendix.
- Author structured IA model v3.
- Modify [`docs/architecture.md`](architecture.md), [`docs/index.md`](index.md), [`README.md`](../README.md), [`docs/method.md`](method.md), [`AGENTS.md`](../AGENTS.md), any milestone marker, or any prior artifact.
- Modify the grounding note.
- Author milestone 11.
- Authorize multi-reader replication, contradiction-present substrate test, cross-substrate test, long-context test, validator integration, orchestration spec, architecture front-door wholesale rewrite, or any other operational pressure surface.
- Resolve any held question, named limitation, or architectural decision.
- Resolve Zone 6 carrier-shape implementation question.

## Self-Superseding Clause

This artifact is a v1 carrier-shape design surface. It should be superseded by:

- A contradiction-present substrate test that pressures the contradiction-resolution carrier-shape decision held above.
- A cross-substrate test that pressures the clause-level granularity (G-B) vs mixed granularity (G-C) decision held above.
- A multi-reader replication test that pressures reader variability against the specific constraint set this surface defines.
- A long-context / temporal-pressure test that pressures the constraint set's durability across time gaps.
- A specific Option-F carrier implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns for the structurally-suggested constraints.
- A subsequent decision surface that resolves the held design decisions (granularity choice; reference rationale placement; contradiction-resolution placement) with operational evidence.
- A structured IA model v3 that absorbs the constraint vocabulary into the structured form.
- A Zone 4 governed-output continuity / reuse-derivative governance decision surface that addresses the reuse-time reference rationale question (Zone 6 / Zone 4 boundary).
- A subsequent milestone marker that absorbs Zone 6 carrier-shape constraints into a plateau.
- The eventual rewrite of [`docs/architecture.md`](architecture.md) that consolidates Zone 6 carrier-shape evidence at greater depth.

It does not supersede the real multi-operator continuity-break test v1 findings (PR #254; the empirical support this surface reads against), the intake trace carrier decision surface v1 (PR #252; the conceptual Option F identification), the continuity-breaking intake trace test v1 (PR #250; the simulated baseline), the brand-system carrier decision surface v2 (PR #248; located Zone 6 at intake / governance layer), the brand intake judgment-trace dry run v1 (the substrate), structured IA model v2 (the appendix this artifact does not mutate), the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; this artifact reads them at carrier-shape design surface depth.

## Anchor Documents

### Direct empirical predecessor

- [`docs/real-multi-operator-continuity-break-test-v1.md`](real-multi-operator-continuity-break-test-v1.md): PR #254 findings; provides the 10/10 fresh-reader reconstruction empirical support this surface reads against; surfaced the granularity + reference opacity reader observations

### Direct conceptual predecessor

- [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md): PR #252 decision surface; identified Option F as surviving conceptual posture

### Substrate this artifact reads against

- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 simulated test; established the trace-dimension vocabulary
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 located Zone 6 at intake / governance layer
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): original dry run substrate
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this artifact's constraint vocabulary maps to (without mutating)
- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as premise for the design surface

### Conceptual framing

- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence; operator-authored vs inferred-not-stated distinction
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; five-or-six-zone framing
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 reference-function taxonomy; per-site trace-gap analysis
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary
- [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md): operator-judgment protocol sketch (eight-step shape; conceptual overlap with intake decision record content)

### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
