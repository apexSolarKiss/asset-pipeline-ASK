# Intake Reference Rationale Operational Pressure Test v1

## Posture

```text
operational findings artifact
post-milestone-11 axis (intake-time reference rationale, distinct from Zone 6 / Option F trace)
follows PR #263 (intake-reference-rationale carrier decision surface v1, design-surface depth)
fresh-reader test against mocked R-B + R-D + R-E hybrid carriers
not Zone 4 reuse / derivative governance
not schema
not field design
not entity placement
not implementation
not structured IA v3
not validator / orchestration
not Airtable mutation
not held-candidate adjudication
not multi-reader replication
not cross-substrate generalization
not authorization of any specific carrier shape (R-C vs R-D vs hybrid)
not a symmetric R-C vs R-D comparison (only R-D was mocked; R-C judgment is reader-extrapolation from R-D experience)
self-superseding when multi-reader replication, cross-substrate test, growth-pressure substrate (more references, more rejection classes, conflicting evidence, partial selection rationales), or specific carrier-shape implementation move absorbs it
```

This artifact records the Stage C findings of the intake-reference-rationale operational pressure test. The test pressures PR #263's structurally-suggested R-B + R-D + R-E hybrid carrier-shape posture under a single-reader / single-substrate / mocked-shape condition. The test was designed to (a) demonstrate operational reconstructability of intake-time reference rationale and (b) generate a reader-judgment signal on whether the sub-field-on-decision-record shape (R-D) feels structurally adequate or strained for event-level rationale.

The artifact does NOT close PR #263's held carrier-shape choice. It reports operational support for the conceptual posture, names what the mocked shape supports, and surfaces the reader's carrier-shape pressure observation as a diagnostic signal that informs (without resolving) the R-C vs R-D question.

## What This Artifact Attempts

The artifact answers two questions:

1. **Does the mocked R-B + R-D + R-E hybrid carrier-shape posture preserve reconstruction of intake-time reference rationale at one-reader / one-substrate / mocked-shape depth?**
2. **Does the test surface carrier-shape pressure that favors R-C (separate reference-selection-rationale record), R-D (sub-field on intake decision record), or the hybrid posture?**

PR #263 named R-B for per-reference intrinsic rationale, R-D for event-level rationale tied to decision context, R-E for rejected-alternatives complement, and hybrid posture (R-B + R-C OR R-D + R-E) as structurally suggested. R-C and R-D were held pending operational pressure. This test mocked the R-D shape (not R-C) and asked the reader to judge whether R-D felt sufficient or strained.

**Important framing constraint:** The test does NOT compare R-C vs R-D symmetrically. Only R-D was mocked; R-C is judged by reader extrapolation from R-D experience, not by direct operational pressure. The strongest claim the test can support is: **R-D is sufficient / strained / inconclusive at this substrate depth**. It cannot support "R-D beat R-C" or "R-C is unnecessary."

## Test Design

### Substrate

- **Base substrate:** same kitchen-textiles SKU hero packet as the prior Zone 6 / Option F trace tests (PR #254 / PR #258 / PR #260). No new synthetic stack introduced.
- **Reference-rationale overlay:** four selected reference assets (REF-KT-001 through REF-KT-004) carried forward from prior tests. Three rejected candidate references (REF-KT-REJ-A / B / C) added to pressure the R-E rejected-alternatives carrier.
- **Downstream IA:** identical to prior Zone 6 substrates. The reference-rationale gap is invisible from the downstream IA alone; reconstructable only from the mocked carriers.

### Mocked carriers (R-B + R-D + R-E hybrid)

The mock implements PR #263's structurally-suggested hybrid posture:

- **R-B** (extension of `asset_metadata` on `reference_assets`) — per-reference `primary_function` (from PR #239's nine-fold reference-function taxonomy), `contribution`, `evidence_basis`, `target_ia_layers`, `articulation_state`.
- **R-D** (sub-field on intake decision record D3) — `reference_selection_rationale` with `event_id`, `selected_references_count`, `candidate_pool_size`, `selection_rationale` (free-text), `set_function`, `multi_function_references` (list), `multi_layer_references` (list), `rejected_alternatives_cross_reference` (list), `confidence`.
- **R-E** (separate `rejected_alternatives_log` carrier) — per-rejection rows with `reject_id`, `event_id`, `considered_function`, `candidate_content`, `rejection_rationale`, `rejection_rule`.

R-C (separate reference-selection-rationale record) was NOT mocked. The reader's Q-11 judgment generates the diagnostic signal for R-C as natural-fit alternative.

### Architectural distinctions designed into the substrate

The four selected references were designed with distinct architectural sub-dimensions to pressure reconstructability:

- **REF-KT-001:** single-function (lighting); multi-layer cross-layer (packet + slot)
- **REF-KT-002:** multi-function (visual-fidelity-exemplar + boundary-reference); multi-layer cross-layer (packet + slot)
- **REF-KT-003:** multi-function (atmosphere-reference + visual-fidelity-exemplar); multi-layer **within-packet** (creative_intent + bounded_creative_discretion)
- **REF-KT-004:** multi-function (context-reference + visual-fidelity-exemplar); **single-layer** (slot only)

Three rejected candidates with two distinct architectural rules:

- **REF-KT-REJ-A** (dramatic lighting) + **REF-KT-REJ-B** (tight-crop framing): visual-as-fidelity-strategy / prose-as-fallback (apex aesthetic-layering pass + Phase 2 photography style guide deepening)
- **REF-KT-REJ-C** (styled-context lifestyle): SKU-driven mode hero-pattern boundary (Phase 1 worked-example default; also explicit in `packet.bounded_creative_discretion`)

The two-rules-applied case tests whether the reader distinguishes multiple architectural rules applied to rejections.

### Test instruments

The Stage A scratch instruments lived outside the repo to preserve test-integrity isolation:

- Blind reader packet: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_intake-reference-rationale-test-blind-reader-packet_v1.md`
- Ground-truth key: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_intake-reference-rationale-test-ground-truth-key_v1.md`

The fresh reader received only the blind packet; the ground-truth key was held by the test author.

### Question structure

- **Q-1 through Q-4:** per-reference reconstruction (4 questions × 1.0 = 4.0)
- **Q-5:** set-level cross-axis convergence rationale (1.0)
- **Q-6:** multi-function attribution across the set (1.0)
- **Q-7:** multi-layer attribution across the set (1.0)
- **Q-8:** rejected alternatives identification (1.0)
- **Q-9:** per-rejection rationale (1.0)
- **Q-10:** rejection rule discrimination (1.0)
- **Q-11:** carrier-shape pressure observation — **UNSCORED reader judgment**
- **Q-C1:** unreconstructable aspects (1.0)

Total scored: 11 questions × 1.0 = 11.0 maximum. Q-11 unscored.

## Per-Question Scoring

Each row reports the fresh reader's answer against the ground-truth key's success criteria. Scoring grid: Success = 1.0; Partial = 0.5; Failure = 0.0.

| Question | Reader response (concise) | Key expected | Score | Notes |
|---|---|---|---|---|
| Q-1 | REF-KT-001: visual-fidelity-exemplar (lighting register); soft daylit ambient warmth; packet creative_intent + slot slot_prompt | single-function multi-layer | 1.0 Success | All four substantive fields match; multi-layer attribution captured |
| Q-2 | REF-KT-002: visual-fidelity-exemplar (framing) + boundary-reference (composition norms); breathing-room framing; packet + slot | multi-function multi-layer | 1.0 Success | BOTH functions identified; both layers identified |
| Q-3 | REF-KT-003: atmosphere-reference + visual-fidelity-exemplar (tone register); calm warm-tone register; packet creative_intent + packet bounded_creative_discretion | multi-function within-packet multi-layer | 1.0 Success | **Critical within-packet multi-layer attribution captured** (creative_intent + bounded_creative_discretion) |
| Q-4 | REF-KT-004: context-reference + visual-fidelity-exemplar (material legibility); soft kitchen-surface treatment; slot only | multi-function single-layer | 1.0 Success | **Multi-function ≠ multi-layer distinction captured** (multi-function but single-layer correctly distinguished) |
| Q-5 | four-axis cross-axis convergence (lighting/framing/tone/surface); no single reference would suffice; each ref contributes distinct axis | same | 1.0 Success | Set-level rationale + cardinality reasoning correctly reconstructed |
| Q-6 | REF-KT-002 (visual-fidelity + boundary); REF-KT-003 (atmosphere + visual-fidelity); REF-KT-004 (context + visual-fidelity); REF-KT-001 single-function | three multi-function refs identified | 1.0 Success | All three multi-function references identified with correct function pairs |
| Q-7 | REF-KT-001 (packet + slot); REF-KT-002 (packet + slot); REF-KT-003 (packet creative_intent + packet bounded_creative_discretion); REF-KT-004 slot only | three multi-layer refs; within-packet distinction captured | 1.0 Success | REF-KT-003's within-packet attribution explicitly named; REF-KT-001 + REF-KT-002 cross-layer attribution preserved; REF-KT-004 single-layer correctly identified |
| Q-8 | count = 3; REJ-A lighting reference, REJ-B framing reference, REJ-C context reference | same | 1.0 Success | All three rejections identified with considered functions |
| Q-9 | REJ-A: contradicts warm-tone register (contradiction); REJ-B: contradicts breathing-room convention (contradiction); REJ-C: contradicts SKU-driven hero pattern + bounded_creative_discretion (contradiction with mode pattern boundary) | same; classification flexibility allowed | 1.0 Success | All three rejection rationales reconstructed with classification consistent with carrier content |
| Q-10 | Q-10a YES, visual-as-fidelity-strategy applied to REJ-A + REJ-B (same rule, two axes); Q-10b YES, REJ-C used SKU-driven mode hero-pattern boundary + bounded_creative_discretion (different rule) | two-rules-applied case discriminated | 1.0 Success | **Critical two-rules-applied case discriminated correctly** — reader correctly distinguishes visual-as-fidelity-strategy from SKU-driven mode hero-pattern boundary |
| Q-11 | UNSCORED — see Section: Q-11 Carrier-Shape Pressure Signal | n/a | n/a | Reader observation captured as diagnostic signal |
| Q-C1 | six unreconstructable aspects including epistemic observation about mocked vocabulary stability | ≥2 aspects | 1.0 Success | Exceeds threshold by 3×; reader's vocabulary-stability observation is exactly the epistemic distinction the test surfaces |

**Aggregate raw count:** 11 Success / 0 Partial / 0 Failure (Q-11 not counted; reader-judgment).

**Aggregate score:** 11.0 / 11.0 = **100%**.

## Aggregate Result

Per the ground-truth key's threshold table:

- **Trace holds:** ≥ 8.8 (≥80%)
- **Trace partially holds:** 5.5–8.7 (50-79%)
- **Trace partially breaks:** 3.4–5.4 (31-49%)
- **Trace breaks:** < 3.4 (<31%)

The 11.0 aggregate score falls in the **trace holds** band by a wide margin (22.5 points above the 80% threshold).

## Reference-Rationale Sub-Aggregate

The per-reference and set-level reconstruction dimension (Q-1 + Q-2 + Q-3 + Q-4 + Q-5 + Q-6 + Q-7) is the primary load for this test.

**Reference-rationale sub-aggregate score:** 7.0 / 7.0 = **100%**.

Per per-reference sub-dimension:

- **Per-reference primary function** (Q-1a / Q-2a / Q-3a / Q-4a aggregated): SUCCESS for all four refs, including the three multi-function attributions
- **Per-reference contribution** (Q-1b / Q-2b / Q-3b / Q-4b): SUCCESS — all four contributions reconstructed substantively
- **Per-reference evidence basis** (Q-1c / Q-2c / Q-3c / Q-4c): SUCCESS — all four evidence bases captured
- **Per-reference downstream IA target** (Q-1d / Q-2d / Q-3d / Q-4d): SUCCESS — multi-layer, single-layer, cross-layer, within-packet attributions all distinguished
- **Set-level cross-axis convergence** (Q-5): SUCCESS
- **Multi-function attribution across the set** (Q-6): SUCCESS — three multi-function refs + one single-function ref distinguished
- **Multi-layer attribution across the set** (Q-7): SUCCESS — three multi-layer refs + one single-layer ref distinguished; within-packet multi-layer distinguished from cross-layer multi-layer

## Rejected-Alternatives Sub-Aggregate

The rejection identification + per-rejection rationale + rule discrimination dimension (Q-8 + Q-9 + Q-10) is the secondary load for this test.

**Rejected-alternatives sub-aggregate score:** 3.0 / 3.0 = **100%**.

Per rejection sub-dimension:

- **Rejection count + considered functions** (Q-8): SUCCESS — three rejections identified with correct considered functions
- **Per-rejection rationale** (Q-9): SUCCESS — all three rejection rationales reconstructed substantively with consistent classification
- **Rule discrimination** (Q-10): SUCCESS — two-rules-applied case correctly distinguished (visual-as-fidelity-strategy applied to REJ-A + REJ-B; SKU-driven mode hero-pattern boundary + bounded_creative_discretion applied to REJ-C)

## Q-11 Carrier-Shape Pressure Signal (Unscored)

The reader's Q-11 response is the test's primary carrier-shape pressure signal. Reported verbatim (per ground-truth key's framing protocol):

**Q-11a (R-D sub-field sufficient or strained):**

> "Sufficient for this test case, but visibly near the edge of structural strain. It carried the set rationale, multi-function attribution, multi-layer attribution, and rejected-alternatives cross-reference, but those are several different rationale jobs living inside one decision-record sub-field."

**Q-11b (R-C separate record more natural):**

> "Yes. A separate event-level reference-selection-rationale record would likely express the same trace more cleanly, especially because the event has selected references, rejected alternatives, set-level rationale, and cross-axis attribution."

**Q-11c (other observations):**

> "The R-B + R-D + R-E hybrid is reconstructable and works at this scale. The pressure signal is not information loss; it is object-boundary ambiguity. Per-reference intrinsic rationale feels natural on R-B, rejected alternatives feel natural in R-E, but event-level selection rationale feels substantial enough to justify its own R-C entity if this pattern repeats or grows."

**Reader's optional notes (additional Q-11 framing):**

> "The packet is reconstructable because the carriers are unusually explicit. The main architectural lesson is that reconstruction succeeds, but the event-level rationale is already doing enough work that R-D feels like a compact convenience shape rather than the most natural long-term carrier. If future cases include more references, more rejection classes, conflicting evidence, or partial selection rationales, R-C would likely become cleaner than expanding the D3 sub-field."

### Interpretation of the Q-11 signal

The reader's response carries three architecturally precise distinctions:

1. **"Sufficient ... but visibly near the edge of structural strain."** R-D worked at this case's complexity but was reading as densely packed. Not failure; not comfort.
2. **"Object-boundary ambiguity rather than information loss."** This is a structural observation, not a reconstructability observation. The information was preserved; what wasn't natural was the entity-boundary of the sub-field carrying event-level content that has its own structural identity.
3. **"R-C would likely become cleaner ... if this pattern repeats or grows."** Conditional framing — R-D sufficient at THIS depth; R-C cleaner UNDER GROWTH conditions (more refs; more rejection classes; conflicting evidence; partial selection rationales).

Per the ground-truth key's carrier-shape pressure framing, this is the **"R-D felt strained" signal that favors R-C as natural-fit alternative under growth conditions** — but does NOT constitute "R-D failed" or "R-C is required at this depth."

The signal aligns with PR #263's stance that R-C vs R-D remains held pending operational pressure. This test generates pressure evidence consistent with **R-C as natural-fit-for-growth** without closing the choice. The hybrid posture (R-B for per-reference + R-C OR R-D for event-level + R-E for rejected) remains architecturally coherent; the within-hybrid R-C vs R-D choice is sharpened by this test's reader signal without being resolved.

## Per-Trace-Dimension Performance

Beyond the aggregate score, the per-dimension reconstruction performance:

| Trace dimension | Question coverage | Score | Status |
|---|---|---|---|
| Per-reference primary function (single + multi-function) | Q-1a, Q-2a, Q-3a, Q-4a, Q-6 | 5.0 / 5.0 | SUCCESS (three multi-function attributions reconstructed) |
| Per-reference contribution | Q-1b, Q-2b, Q-3b, Q-4b | 4.0 / 4.0 | SUCCESS |
| Per-reference evidence basis | Q-1c, Q-2c, Q-3c, Q-4c | 4.0 / 4.0 | SUCCESS |
| Per-reference downstream IA target (single + multi-layer; within-packet vs cross-layer) | Q-1d, Q-2d, Q-3d, Q-4d, Q-7 | 5.0 / 5.0 | SUCCESS (within-packet distinguished from cross-layer; single-layer distinguished from multi-layer) |
| Set-level cross-axis convergence | Q-5 | 1.0 / 1.0 | SUCCESS |
| Rejected-alternatives identification | Q-8 | 1.0 / 1.0 | SUCCESS |
| Per-rejection rationale | Q-9 | 1.0 / 1.0 | SUCCESS |
| Rejection rule discrimination (two-rules case) | Q-10 | 1.0 / 1.0 | SUCCESS — distinguishes visual-as-fidelity-strategy from SKU-driven mode hero-pattern boundary |
| Carrier-shape pressure observation | Q-11 | UNSCORED | Reader signal: R-D sufficient at this depth, near structural strain edge; R-C natural-fit under growth |
| Epistemic honesty about reconstruction gaps | Q-C1 | 1.0 / 1.0 | SUCCESS |

All scored dimensions reconstructed without partial or failure marks.

## Where the Mocked Hybrid Succeeded

- **Intake-time reference-rationale conceptual posture is operationally supported** at this test depth. A fresh reader reconstructed all four per-reference attributions (including the three multi-function refs, the within-packet multi-layer case, and the multi-function single-layer case), the set-level cross-axis convergence rationale, all three rejected alternatives with their rationales, and the two-rules-applied rejection discrimination from the mocked R-B + R-D + R-E hybrid carriers alone.
- **The R-B + R-D + R-E hybrid posture is operationally adequate** at this case's complexity. The reader explicitly characterized it as "reconstructable and works at this scale."
- **Multi-function attribution distinguishable from multi-layer attribution.** REF-KT-004 (multi-function but single-layer) tested the architectural distinction; the reader correctly preserved it.
- **Within-packet multi-layer distinguishable from cross-layer multi-layer.** REF-KT-003 (creative_intent + bounded_creative_discretion — both packet-layer) vs REF-KT-001 / REF-KT-002 (packet + slot — cross-layer) tested the distinction; the reader correctly preserved it.
- **Two-rules-applied rejection discrimination held.** REJ-A + REJ-B (visual-as-fidelity-strategy) vs REJ-C (SKU-driven mode hero-pattern boundary + bounded_creative_discretion envelope) tested the architectural-rule distinction; the reader correctly preserved it. The two rules carry different normative force kinds (rule-of-evidence vs mode-pattern-boundary); the reader's discrimination demonstrates the rule-vocabulary distinction is reconstructable from the carriers.
- **PR #239's nine-fold reference-function taxonomy operationally exercised at per-instance scope.** Five function values applied across the four selected references (visual-fidelity-exemplar; atmosphere-reference; boundary-reference; context-reference) with multi-function attribution; the reader correctly mapped per-reference content to taxonomy values.
- **Reader's epistemic honesty demonstrated.** Q-C1's six-item unreconstructable list includes the architecturally sophisticated observation that "whether the mocked carrier field names or vocabularies are stable schema candidates" cannot be determined from the packet alone — exactly the boundary PR #263 preserves.

## Where the Mocked Hybrid Partially Succeeded

Nothing scored partial. The reader hit Success on all 11 scored questions.

## Where the Mocked Hybrid Still Failed

Nothing failed at this test depth. The reader's Q-11 observation flags R-D's structural strain as approaching the edge but explicitly characterizes the strain as "not information loss" — reconstruction held; the carrier-shape pressure is architectural, not operational.

## Where the Mocked Shape, Not the Conceptual Posture, May Be the Issue

The reader's Q-11 observation is the primary signal here. The framing "the pressure signal is not information loss; it is object-boundary ambiguity" is architecturally precise: the conceptual posture works (reconstruction succeeds; all eleven scored questions hit Success); the structural-shape question is about entity boundaries (whether event-level rationale, with selected references + rejected alternatives + cross-axis attribution + set rationale, belongs as a sub-field on the intake decision record or as its own first-class entity).

The mocked R-D sub-field at this case's complexity:

- Carried `selection_rationale` (free-text prose)
- Carried `set_function` (one-line)
- Carried `multi_function_references` (list)
- Carried `multi_layer_references` (list)
- Carried `rejected_alternatives_cross_reference` (list)
- Carried `confidence` (one-line)
- Plus cross-referenced the separate R-E `rejected_alternatives_log`

That is six structured sub-fields + one cross-reference inside a single sub-field on the intake decision record. The reader's "several different rationale jobs living inside one decision-record sub-field" observation is the structural strain signal.

**The strongest claim this test can support:** R-D is sufficient at this substrate depth and structurally near the edge per the reader's observation; the test does not close the R-C vs R-D choice in either direction.

The reader's growth-condition signal (more references; more rejection classes; conflicting evidence; partial selection rationales would favor R-C as natural-fit) is a directional reader observation, not a test verdict. It informs the carrier-shape choice without resolving it.

**The test cannot support:** "R-D beat R-C" or "R-C is unnecessary" or "R-C is required under any condition." Only R-D was mocked; R-C judgment is reader extrapolation from R-D experience, not direct operational pressure.

The R-C vs R-D choice from PR #263 remains held. This test sharpens the signal without closing the choice. The signal direction: under growth, R-C is the natural-fit alternative; at this depth, R-D suffices.

## Test Limits

The findings are honest about every limit:

- **One fresh reader.** Reader variability against this constraint set is unpressured. Multi-reader replication remains a candidate next surface.
- **One substrate.** Same kitchen-textiles substrate as PR #254 / #258 / #260; cross-substrate generalization is unpressured.
- **One intake event scale.** Four selected references + three rejected candidates is a moderate cardinality. Growth-pressure substrates (e.g., 8-12 selected references; 6-10 rejected candidates) would test the R-D sub-field shape under cardinality stress directly.
- **Single rejection-rule diversity case.** Two architectural rules applied across three rejections (visual-as-fidelity-strategy ×2; SKU-driven mode hero-pattern boundary ×1). Substrates with more rule diversity, conflicting-rule cases, or operator-judgment rejection rules would pressure the rejection_rule sub-field's value-vocabulary question more sharply.
- **No multi-event substrate.** The test scoped to a single intake event. Substrates where the same intake produces multiple reference-selection events across packets / slots / curation contexts would pressure the event-id scoping and the R-C-vs-R-D cardinality more sharply.
- **No contradiction-resolution overlap.** This test scoped to reference-rationale; it did not pressure how reference-rationale carriers interact with the contradiction-resolution carriers from PR #258 / PR #260. A combined substrate would test architectural seam coherence between the two carrier families.
- **No conflicting-evidence substrate.** Selected references in this substrate convergent on tone/framing/lighting/surface. Substrates where selected references conflict among themselves (some warm-tone; some cool-tone) would pressure the set-level rationale's coherence claim.
- **No partial-selection-rationale substrate.** All selected references have full per-reference rationale in the mock. Substrates where some refs have partial rationale (incomplete operator articulation) would pressure the `articulation_state` sub-field at per-reference level (parallel to Option F's at-decision level).
- **R-C alternative not mocked directly.** Only R-D was mocked; R-C judgment is reader extrapolation. A symmetric R-C-mocked test would generate direct operational pressure on R-C.
- **Mocked carrier shape.** The R-B + R-D + R-E hybrid; one of multiple possible operationalizations of PR #263's structurally-suggested constraints. Test does NOT earn the specific shape over alternatives.
- **No real implementation.** Pydantic / JSON Schema / Airtable / validator / orchestration not produced or tested.
- **No multi-reader replication.** Single reader; reader-specific facility not distinguished from robust posture.
- **No long-context / temporal-pressure.** Same-session reconstruction.

## Earned vs Held

### Earned at this test depth

- **Intake-time reference-rationale conceptual posture is operationally supported** at one-reader / one-substrate / four-references / three-rejections / two-rules / mocked R-B + R-D + R-E hybrid depth. The trace dimension is reconstructable from the carriers alone.
- **R-B + R-D + R-E hybrid posture is operationally adequate** at this case's complexity. The reader characterized it as "reconstructable and works at this scale."
- **PR #239's nine-fold reference-function taxonomy is operationally exercisable at per-instance scope** with multi-function attribution per reference. Five function values used across four references; multi-function attribution preserved.
- **Multi-function attribution distinguishable from multi-layer attribution** — REF-KT-004's multi-function-but-single-layer case was correctly reconstructed.
- **Within-packet multi-layer distinguishable from cross-layer multi-layer** — REF-KT-003's within-packet attribution (creative_intent + bounded_creative_discretion) was correctly distinguished from REF-KT-001/002's cross-layer attribution.
- **Two-rules-applied rejection discrimination held** — visual-as-fidelity-strategy vs SKU-driven mode hero-pattern boundary distinction correctly preserved.
- **Set-level cross-axis convergence rationale** reconstructable.
- **R-E rejected-alternatives complement** operationally supported as distinct from R-B and R-D.

### Not earned

- **Specific carrier shape selection between R-C and R-D for event-level rationale.** Only R-D was mocked; R-C judgment is reader extrapolation from R-D experience. The test signal is directional (R-D sufficient at this depth, R-C natural-fit under growth) but the choice remains held pending direct operational pressure on R-C.
- **Vocabulary scaling under higher-cardinality reference-selection events.** Four selected references + three rejected candidates is moderate; larger pools would pressure the sub-field cardinality more sharply.
- **Vocabulary scaling under more-rule-diversity rejection cases.** Two rules across three rejections is minimal diversity; substrates with 4-6 distinct rejection rules would pressure the rule-vocabulary question more sharply.
- **Multi-reader generalization.** Single reader.
- **Cross-substrate generalization.** Single substrate.
- **Conflicting-evidence generalization.** Convergent selected references; conflicting-evidence substrates remain held.
- **Partial-selection-rationale generalization.** All refs full rationale; partial-rationale substrates remain held.
- **Multi-event-per-intake generalization.** Single intake event; multi-event-per-intake remains held.
- **Architectural seam coherence with Option F's contradiction-resolution carriers.** Combined substrate remains held.
- **Specific carrier-shape implementation / field design / structured IA v3 absorption.** Held; the architecture's "structure earns its keep when operational pressure surfaces a need" posture argues against premature implementation. The carrier-shape-pressure signal exists but is not the carrier-shape-resolution evidence.
- **Validator / orchestration spec.** Held until an operational consumer surfaces the need.
- **Zone 4 reuse-time governed-output continuity / derivative governance.** Explicitly preserved as adjacent and held; this test is intake-time-scoped.

### Boundary preserved

- No schema / Airtable / JSON Schema / Pydantic / validator / orchestration earned
- No specific carrier-shape design (entity placement; field types; cross-entity relationships; rollup patterns) earned
- No structured IA v3 absorption move authored
- No milestone marker authored
- No held-candidate adjudication
- No Zone 1B / Zone 3 / Zone 4 / Zone 5 pressure
- No edits to `docs/architecture.md`, `docs/index.md`, `README.md`, `docs/method.md`, `AGENTS.md`, the grounding note, or any prior artifact in this Stage C scope (a separate orientation-layer absorption PR would route this finding)

## Whether the Mocked R-B + R-D + R-E Hybrid Held at This Test Depth

**Yes, at this substrate depth.** Aggregate 11.0 / 11.0 = 100%; reference-rationale sub-aggregate 7.0 / 7.0; rejected-alternatives sub-aggregate 3.0 / 3.0. All scored dimensions reconstructed without partial or failure marks. The hybrid posture's three carriers (R-B for per-reference intrinsic; R-D for event-level on decision record; R-E for rejected-alternatives complement) each held their assigned scope:

- **R-B** carried per-reference intrinsic rationale (function; contribution; evidence basis; target IA layers; articulation_state). Reconstruction of per-reference attributions was clean.
- **R-D** carried event-level rationale (selection rationale; set function; multi-function attribution; multi-layer attribution; rejection cross-reference; confidence). Reconstruction was successful at this complexity but the reader explicitly named it as "near the edge of structural strain."
- **R-E** carried rejected-alternatives content (per-rejection considered function; candidate content; rejection rationale; rejection rule). Reconstruction of rejection identification + rationale + rule discrimination was clean.

The hybrid posture is operationally supported at this depth. It does NOT scale-test to higher cardinality, more rule diversity, conflicting evidence, partial rationales, multi-event intakes, or cross-substrate variation. Those generalizations remain held.

## Whether R-D Was Sufficient, Strained, or Inconclusive at This Test Depth

**Sufficient and structurally near the edge.**

- **Sufficient:** R-D enabled full reconstruction. No information loss; no failure of the reconstruction the sub-field-on-decision-record shape was designed to support.
- **Structurally near the edge:** The reader explicitly observed R-D as "visibly near the edge of structural strain" with "several different rationale jobs living inside one decision-record sub-field." The strain framing is structural, not operational.
- **Conditional R-C signal:** Under growth conditions (more references; more rejection classes; conflicting evidence; partial selection rationales), R-C would likely become cleaner than expanding the D3 sub-field.

This is the strongest claim the test supports. The test does NOT support "R-D is the right long-term shape" or "R-D scales to growth substrates."

## Whether R-C Remains Materially Plausible

**Yes, materially plausible — and arguably strengthened by the reader's "object-boundary ambiguity" framing.** The reader's observation that event-level rationale "feels substantial enough to justify its own R-C entity if this pattern repeats or grows" is a directional signal favoring R-C under growth conditions. The signal is not a verdict — only R-D was directly tested — but the structural strain reader-observation does carry architectural weight for the R-C alternative.

Specifically, the reader named four growth conditions under which R-C would become cleaner:

1. More references (higher cardinality of selected references per event)
2. More rejection classes (higher rule-diversity across rejections)
3. Conflicting evidence (selected references not convergent on the same axes)
4. Partial selection rationales (some refs with full rationale, some with partial)

Each of those four growth conditions is a candidate next-pressure surface. A direct R-C mock against any of those would generate symmetric operational pressure between R-C and R-D and could close (or sharpen further) the choice. None is authorized by this test.

## Implications for Subsequent Pressure Surfaces

Implications only; no authorization.

- **Symmetric R-C-mocked test against the same substrate** would generate direct operational pressure on R-C and enable a symmetric R-C vs R-D comparison. Candidate; not authorized.
- **Growth-pressure substrate (higher reference cardinality + more rejection classes + conflicting evidence + partial rationales)** would test the R-D sub-field shape under cardinality stress and most directly differentiate R-C from R-D. The reader's Q-11 signal names exactly these conditions as the R-C-natural-fit case. Candidate; not authorized.
- **Multi-reader replication of this test** would test reader variability against the R-B + R-D + R-E hybrid mock. Single-reader 11/11 result invites replication; significant variance would itself be informative. Candidate; not authorized.
- **Cross-substrate generalization** would test the hybrid posture against richer / sparser / multi-mode content. Reader-flag signals from PR #254 / #258 / #260 + this test all suggest cross-substrate pressure remains the most well-documented architectural gap. Candidate; not authorized.
- **Combined substrate test** integrating reference-rationale carriers with Option F's contradiction-resolution carriers would test architectural seam coherence between the two carrier families (PR #260's contradiction-resolution + this test's reference-rationale). The two seams are independent here; combined pressure would test whether they integrate cleanly or strain each other. Candidate; not authorized.
- **Specific reference-rationale carrier implementation / field design / structured IA v3 absorption** would author concrete carrier shapes against PR #263's constraint vocabulary now operationally supported through this test. The R-C vs R-D selection question is sharpened but not closed; implementation choice would need adjudication informed by the Q-11 growth-condition signal. Candidate; not authorized.
- **Long-context / temporal-pressure test** remains unpressured. Candidate; not authorized.
- **Ambiguous-resolution-rule substrate test** for rejection rules where no directly-architectural rule applies (parallel to PR #260's framing for contradiction-resolution rules). The test substrate used directly-architectural rules for both rejection cases; substrates with fully-operator-judgment rejection rules remain unpressured. Candidate; not authorized.

## Self-Superseding Clause

This artifact is a v1 finding of a single-reader / single-substrate / four-references / three-rejections / two-rules / R-D-mocked test. It should be superseded by:

- A symmetric R-C-mocked test against the same substrate that generates direct operational pressure on R-C.
- A growth-pressure substrate test (higher reference cardinality; more rejection classes; conflicting evidence; partial selection rationales) that differentiates R-C from R-D more sharply.
- A multi-reader replication of this test that confirms or surfaces variability against the mocked hybrid.
- A cross-substrate test (richer / sparser / multi-mode content) that tests the hybrid posture under wider substrate variation.
- A combined substrate test integrating reference-rationale + Option F contradiction-resolution carriers (architectural seam coherence test).
- An ambiguous-resolution-rule substrate test for rejection rules where no directly-architectural rule applies.
- A long-context / temporal-pressure test.
- A specific reference-rationale carrier implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns — informed by the Q-11 growth-condition signal favoring R-C under growth.
- A structured IA model v3 that absorbs the reference-rationale operational support into the YAML appendix's held_questions list.
- A subsequent decision surface that resolves the R-C vs R-D selection based on operational evidence from growth-pressure or symmetric tests.
- A Zone 4 reuse-time governed-output continuity / derivative governance decision surface (separate scope; adjacent decision surface, held).
- A subsequent milestone marker (milestone 12, etc.) that absorbs intake-reference-rationale carrier evidence into a plateau.
- The eventual wholesale rewrite of [`docs/architecture.md`](architecture.md) that consolidates the intake-reference-rationale surface and its operational pressure at greater depth.

It does not supersede the intake-reference-rationale carrier decision surface v1 (PR #263; the constraint vocabulary this artifact reads against), the milestone-11 plateau marker, the Option F trace carrier shape design surface v1 (PR #256; parallel design-surface pattern for contradiction-resolution), the real multi-operator continuity-break test v1 (PR #254; the no-contradiction baseline reader flag), the Option F contradiction-present continuity-break test v1 (PR #258), the Option F multi-contradiction continuity-break test v1 (PR #260), the intake trace carrier decision surface v1 (PR #252), the continuity-breaking intake trace test v1 (PR #250), the brand-system carrier decision surface v2 (PR #248), the brand intake judgment-trace dry run v1, the asset-library deepening (which articulates references as visual fidelity anchors), the layered reference and discretion architecture v1 (PR #239; the nine-fold reference-function taxonomy this test exercises), the layered intake architecture v1 (PR #241), structured IA model v2, the apex definition-layer artifact, milestone 8, milestone 9, milestone 10, or milestone 11. Those remain authoritative for their content depth; this artifact reads them at intake-reference-rationale-operational-pressure-test depth.

## Anchor Documents

### Direct conceptual predecessor (the design surface this test pressures)

- [`docs/intake-reference-rationale-carrier-decision-surface-v1.md`](intake-reference-rationale-carrier-decision-surface-v1.md): PR #263 design surface; named R-A REJECTED, R-B / R-C / R-D STRUCTURALLY SUGGESTED in distinct roles, R-E COMPLEMENT, hybrid posture with R-C vs R-D HELD pending operational pressure (this test addresses that held question at one-reader / one-substrate / R-D-mocked depth)

### Direct plateau-marker predecessor

- [`docs/milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md`](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md): the Zone 6 / Option F plateau that named intake-reference-rationale carrier shape as the next post-milestone-11 architectural axis

### Direct empirical predecessors (the readers who flagged the gap)

- [`docs/real-multi-operator-continuity-break-test-v1.md`](real-multi-operator-continuity-break-test-v1.md): PR #254 reader flag on `asset_metadata` empty / per-reference rationale unreconstructable (first surfacing)
- [`docs/option-f-contradiction-present-continuity-break-test-v1.md`](option-f-contradiction-present-continuity-break-test-v1.md): PR #258 reader flag (second independent surfacing)
- [`docs/option-f-multi-contradiction-continuity-break-test-v1.md`](option-f-multi-contradiction-continuity-break-test-v1.md): PR #260 reader flag (third independent surfacing)

### Substrate this artifact reads against

- [`docs/option-f-trace-carrier-shape-design-surface-v1.md`](option-f-trace-carrier-shape-design-surface-v1.md): PR #256 design-surface pattern this artifact parallels for a distinct architectural seam
- [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md): PR #252 conceptual posture
- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 simulated baseline
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry-run substrate the test extends
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset-library deepening articulating references as visual fidelity anchors
- [`docs/architecture.md`](architecture.md): orientation-layer framing reads as premise

### Conceptual framing

- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 nine-fold reference-function taxonomy this test exercises at per-instance scope with multi-function attribution
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence within which reference-selection occurs (Stage 1 // Evidence)
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; positions asset library as evidence-shaped category
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this artifact's signal maps to (without mutating)

### Plateau markers

- [`docs/milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md`](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md): current plateau marker
- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): prior plateau marker

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
