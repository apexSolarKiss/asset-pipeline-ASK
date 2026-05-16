# Option F Contradiction-Present Continuity-Break Test v1

## Posture

```text
operational findings artifact
Zone 6 / intake-governance trace
follows PR #256 carrier-shape design surface (which held contradiction-resolution pending contradiction-present substrate)
fresh-reader test against mocked Option-F carriers + contradiction overlay
not schema
not field design
not entity placement
not implementation
not structured IA v3
not validator / orchestration
not held-candidate adjudication
not multi-reader replication
not cross-substrate generalization
not long-context / temporal-pressure test
not authorization of any specific carrier shape
self-superseding when multi-reader replication, cross-substrate test, multi-contradiction substrate, contradiction-with-ambiguous-resolution-rule substrate, long-context test, or implementation move absorbs it
```

This artifact records the Stage C findings of the contradiction-present Option-F trace test. The test pressures the contradiction-resolution trace dimension that PR #256 explicitly left HELD pending a contradiction-present substrate. The Stage A scratch instruments (blind reader packet + ground-truth key) introduced a minimal contradiction overlay on the existing dry-run substrate; the Stage B fresh-reader execution returned a completed response packet; this Stage C artifact scores that response against the key and reports findings at the test's bounded depth.

## What This Artifact Attempts

The artifact answers one question: **does Option F preserve reconstruction when the intake substrate includes a source-content contradiction that must be resolved?**

PR #256 named contradiction-resolution as a structurally-suggested constraint with carrier shape held pending operational pressure from a contradiction-present substrate. The conceptual posture proposed three structurally-suggested carrier-shape alternatives (sub-field on intake decision record; separate `contradiction_log` entity; annotation on inspection log entry). This test mocked one of the three (sub-field on intake decision record) and pressured whether a fresh reader can reconstruct the full contradiction-resolution event — presence; conflict sources; conflicting content; carried source; resolution rule; architectural basis — from the carriers alone.

The artifact does NOT earn a specific carrier shape. It pressures the conceptual posture and reports what's operationally supported at this test depth, what remains held, and what remains rejected.

## Test Design

### Substrate

- **Base substrate:** same kitchen-textiles SKU hero packet as the prior Zone 6 trace test sequence (PR #250 / PR #254). No new synthetic stack introduced.
- **Contradiction overlay:** single minimal addition — Layer 2 (`photography_style_guide`), previously `absent` in the base substrate, now articulates voice/tone register as "vibrant, saturated; high-contrast; energetic register" in prose. This contradicts Layer 1 (`asset_library`) evidence, which demonstrates convergent calm / warm-tone / accessible register across the four reference images.
- **Resolution path:** operator applies the architecture's foundational visual-as-fidelity-strategy / prose-as-fallback rule (depth-authority: [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md) Section IV; [`docs/architecture.md`](architecture.md) Evidence Depth section). Asset library carries; photography style guide articulation is rejected.
- **Downstream IA effect:** identical to the no-contradiction case. The contradiction-resolution event is invisible from the downstream IA alone; reconstructable only from the trace carriers.

### Mocked Option F carriers

The mock extended the PR #254 carrier set in two places:

1. **Inspection log:** `photography_style_guide` row changed from `articulation_state: absent` to `articulation_state: contradictory`, `content_produced: no (rejected via contradiction resolution; see D2.contradiction_resolution)`. The `articulation_state` value space gained an explicit interpretation of `contradictory` as "content present and contradicting another inspected source, with resolution captured in the carried decision's contradiction_resolution sub-field."
2. **Intake decision record D2 (the carried inference of "calm, warm-tone, accessible"):** `contradiction_resolution` sub-field populated with five structured sub-fields: `conflict_source`, `conflict_source_content`, `carried_source`, `resolution_rule`, `architectural_basis`.

The mocked sub-field-on-intake-decision-record shape is one of three structurally-suggested carrier-shape alternatives PR #256 named. The test pressures the conceptual posture of contradiction-resolution-as-trace-carrier, not the specific sub-field placement.

### Test instruments

The Stage A scratch instruments lived outside the repo to preserve test-integrity isolation:

- Blind reader packet: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_option-f-contradiction-test-blind-reader-packet_v1.md`
- Ground-truth key: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_option-f-contradiction-test-ground-truth-key_v1.md`

The fresh reader received only the blind packet; the ground-truth key was held by the test author.

### Question structure

- **Q-1 through Q-6:** per-content-piece reconstruction (six content pieces); preserved from the PR #254 question structure with Q-2 and Q-5 gaining new resilience-to-misattribution criteria under the contradiction overlay
- **Q-7, Q-8, Q-9:** new contradiction-specific questions (presence-of-contradiction; conflict-source content reconstruction; carried-source + resolution rule + architectural basis)
- **Q-C1 through Q-C4:** cross-cutting (inspection inventory; articulation-state per inspected layer with new four-state distinction; contradictions-surfaced summary; unreconstructable aspects)

Total: 13 questions × 1.0 = 13.0 maximum.

## Per-Question Scoring

Each row reports the fresh reader's answer against the ground-truth key's success criteria. Scoring grid: Success = 1.0; Partial = 0.5; Failure = 0.0.

| Question | Reader response (concise) | Key expected | Score | Notes |
|---|---|---|---|---|
| Q-1 | brand_platform / lifted-verbatim / brand platform audience field | brand_platform / lifted-verbatim / audience field | 1.0 Success | Exact match |
| Q-2 | asset_library / inferred-from-evidence / convergent warm-tone across four refs | asset_library / inferred-from-evidence / convergent warm-tone | 1.0 Success | Resilience-to-misattribution passed (did NOT attribute to photography_style_guide despite that layer's articulated competing claim) |
| Q-3 | asset_library / lifted-verbatim / four refs | asset_library / lifted-verbatim / four refs | 1.0 Success | Exact match |
| Q-4 | phase_1_worked_example_defaults / worked-example-default / role inventory | same | 1.0 Success | Exact match |
| Q-5 | phase_1_worked_example_defaults / worked-example-default / hero-slot composition pattern | same | 1.0 Success | Resilience-to-misattribution passed (slot_prompt composition language NOT attributed to rejected photography_style_guide) |
| Q-6 | none-operator-authored / operator-authored / none | same | 1.0 Success | Operator-authored vs inferred-from-evidence distinction preserved |
| Q-7 | yes; photography_style_guide and asset_library; high | yes; both layers correctly identified | 1.0 Success | Presence-of-contradiction reconstructed |
| Q-8 | rejected: "vibrant, saturated; high-contrast; energetic register"; carried: convergent warm-tone across four refs; high | both content sides quoted/close-paraphrased | 1.0 Success | Conflict-content reconstruction both directions |
| Q-9 | carried: asset_library; rule: visual-as-fidelity-strategy / prose-as-fallback (with full quote); basis: apex aesthetic-layering pass + Phase 2 photography style guide deepening; high | all three pieces correct | 1.0 Success | Carried-source + rule + architectural basis all reconstructed |
| Q-C1 | five inspected layers listed; inferred_not_stated implicitly excluded | 5 layers AND explicit non-inspection note for inferred_not_stated | 1.0 Success | Reader's explicit non-inspection note for inferred_not_stated appears in Q-C2 rather than Q-C1; functional completion (see Notes section below) |
| Q-C2 | four-state distinction: produced (3); contradictory-rejected (1); absent (1); not-inspected (1) | exact four-state distinction | 1.0 Success | New contradictory-vs-absent distinction reconstructed correctly |
| Q-C3 | yes + summary of contradicting layers + resolution outcome | yes + (a) contradicting layers + (b) carried source | 1.0 Success | Cross-cutting summary correct |
| Q-C4 | six unreconstructable aspects listed (visual content of refs; per-reference selection rationale; clause-by-clause prose derivation; full source layer content; full operator reasoning; whether mocked shape is sufficient as durable schema) | ≥2 aspects | 1.0 Success | Exceeds threshold by 3× and surfaces test-author-unanticipated epistemic aspect (durability-of-mocked-shape) |

**Aggregate raw count:** 13 Success / 0 Partial / 0 Failure.

**Aggregate score:** 13.0 / 13.0 = **100%**.

## Aggregate Result

Per the ground-truth key's threshold table:

- **Trace holds:** ≥10.4 (≥80%)
- **Trace partially holds:** 6.5–10.3 (50-79%)
- **Trace partially breaks:** 4.0–6.4 (31-49%)
- **Trace breaks:** <4.0 (<31%)

The 13.0 aggregate score falls in the **trace holds** band by a wide margin (24.6% above the 80% threshold).

## Contradiction-Resolution Sub-Aggregate

The contradiction-resolution dimension (Q-7 + Q-8 + Q-9 + Q-C3 = 4 questions × 1.0 = 4.0 maximum) is the primary load-bearing dimension for this test.

**Contradiction-resolution sub-aggregate score:** 4.0 / 4.0 = **100%**.

Per sub-dimension:

- **Presence-of-contradiction** (Q-7a): SUCCESS — reader identified `yes` from inspection log's `articulation_state: contradictory` marking and the cross-reference to D2.contradiction_resolution
- **Conflict-source identification** (Q-7b): SUCCESS — both photography_style_guide and asset_library correctly identified as the contradicting pair
- **Rejected-source content reconstruction** (Q-8a): SUCCESS — verbatim quote of "vibrant, saturated; high-contrast; energetic register" from the contradiction_resolution sub-field
- **Carried-source content reconstruction** (Q-8b): SUCCESS — convergent warm-tone register across four references correctly identified
- **Carried-source identification** (Q-9a): SUCCESS — asset_library correctly identified as the source that carried
- **Resolution rule reconstruction** (Q-9b): SUCCESS — visual-as-fidelity-strategy / prose-as-fallback rule articulated with full explanatory clause
- **Architectural basis reconstruction** (Q-9c): SUCCESS — apex aesthetic-layering pass and Phase 2 photography style guide deepening both cited
- **Cross-cutting summary** (Q-C3): SUCCESS — yes + both required summary pieces

All eight contradiction-resolution sub-dimensions reconstructed without partial or failure marks.

## Per-Dimension Performance

Beyond the contradiction-resolution dimension, the per-trace-dimension reconstruction performance:

| Trace dimension | Question coverage | Score | Status |
|---|---|---|---|
| Presence-of-inspection | Q-C1 | 1.0 / 1.0 | SUCCESS |
| Articulation-state | Q-C2 | 1.0 / 1.0 | SUCCESS (includes new contradictory-as-distinct-from-absent distinction) |
| Chain-position | Q-1a, Q-2a, Q-3a, Q-4a, Q-5a, Q-6a | 6.0 / 6.0 | SUCCESS |
| Derivation-basis | Q-1b, Q-2b, Q-3b, Q-4b, Q-5b, Q-6b | 6.0 / 6.0 | SUCCESS |
| Negative-space trace | Q-C2 | 1.0 / 1.0 | SUCCESS |
| Contradiction-resolution | Q-7, Q-8, Q-9, Q-C3 | 4.0 / 4.0 | SUCCESS (load-bearing for this test) |
| Operator-authored vs inferred-from-evidence distinction | Q-2b vs Q-6b | preserved | SUCCESS |
| Contradictory vs absent distinction in articulation_state | Q-C2 | preserved | SUCCESS (new sub-distinction this overlay surfaced) |

All trace dimensions held under the contradiction-overlay pressure.

## Where Option F Succeeded

- **The contradiction-resolution conceptual posture is operationally supported** at this test depth. A fresh reader reconstructed every sub-dimension of the contradiction-resolution event (presence; conflict-source identification; conflict-content for both sides; carried source; resolution rule; architectural basis; cross-cutting summary) from the mocked carriers alone, without operator continuity.
- **Resilience-to-misattribution under contradiction pressure held.** The two questions specifically designed to test whether the contradiction overlay might mislead reconstruction of the carried decisions (Q-2's "calm, warm-tone, accessible" and Q-5's slot_prompt composition language) both scored Success. The reader did not misattribute either to the rejected photography_style_guide source despite that layer's articulated competing claim.
- **The new `articulation_state: contradictory` value was reconstructable as architecturally distinct from `absent`.** Q-C2 correctly identified four distinct states (produced; contradictory-rejected; absent; not-inspected) where the prior test had only three (produced; absent; not-inspected). This sharpens PR #256's held vocabulary extension question with operational evidence that the additional value carries.
- **All base trace dimensions held under contradiction-overlay pressure.** The PR #254 result (trace holds at one-reader / one-substrate / no-contradiction depth) extended to one-reader / one-substrate / one-contradiction depth without any base-dimension regression.
- **The reader's epistemic honesty was preserved.** Q-C4 surfaced six unreconstructable aspects, including one the test author did not anticipate (the durability-of-mocked-shape epistemic limit).

## Where Option F Partially Succeeded

- **Q-C1's inferred_not_stated explicit non-inspection note was split across questions.** The ground-truth key expected the reader to note inferred_not_stated as not-inspected in Q-C1; the reader's Q-C1 answer listed only the 5 inspected layers (correctly excluding inferred_not_stated by omission) and provided the explicit non-inspection note in Q-C2. Functionally complete; structurally split. Scored Success on the basis of the holistic response covering both pieces. This is a test-design observation rather than a partial-failure of the trace dimension itself: the carrier shape supports the distinction, and the reader reconstructed it; the question-structure asked for it in two places.

## Where Option F Still Failed

Nothing at this test's depth. The reader's optional notes flagged two remaining weaknesses that are NOT failures of this test but ARE failure-mode candidates for subsequent pressure:

- **Granularity** (clause-level provenance for prose-rich fields): the reader noted that "continuous prose fields contain more clauses than the decision records individually account for, so reconstruction is strong for named phrases and weaker for full-field derivation." This is consistent with PR #254's reader-flagged granularity concern, now confirmed across two test substrates. The G-B clause-level granularity option remains HELD pending cross-substrate / prose-rich pressure per PR #256.
- **Inheritance pattern legibility** (`bounded_creative_discretion` inheriting D2's contradiction context without a separate decision record): the reader observed that "inherited contradiction context may be structurally recoverable, while clause-specific provenance remains thin." Inheritance is recoverable; per-clause derivation in the inheriting field is not.

Both are HELD design questions, not Option-F-concept failures.

## Where The Mocked Shape, Not Option F As A Concept, May Be The Issue

This test pressured the conceptual posture of contradiction-resolution-as-trace-carrier, not the specific carrier-shape mock used. The mocked sub-field-on-intake-decision-record shape (with five structured sub-fields: conflict_source; conflict_source_content; carried_source; resolution_rule; architectural_basis) worked operationally — but the test does NOT isolate whether it worked because the shape is correct or because the test substrate is simple enough that any of PR #256's three structurally-suggested alternatives would have worked.

Specifically:

- **Sub-field-on-intake-decision-record** (this test's mock): one D-record carries the full contradiction trace; reader navigates from D2 to its contradiction_resolution sub-field to reconstruct. Worked here.
- **Separate `contradiction_log` entity** (PR #256 alternative; PR #250's paper-pressed held candidate): a separate carrier per contradiction event with structured links to the conflict-source decision records. NOT tested here; almost certainly would have worked at this test's substrate complexity.
- **Annotation on inspection log entry** (PR #256 alternative): contradiction details captured on the inspection log row(s) of the contradicting layer(s). NOT tested here; would likely have worked at this test's substrate complexity.

The test's 4/4 contradiction-resolution score is informative for the conceptual posture, not for the carrier-shape choice. Discrimination between the three carrier-shape alternatives requires either a multi-contradiction substrate (where many-to-many contradiction-source relationships pressure the entity model), an ambiguous-resolution-rule substrate (where the resolution rule itself is contested), or operational pressure from validator / orchestration consumers (where the carrier's shape affects programmatic access patterns).

The test's reader-flagged epistemic observation (in Q-C4): "Whether the mocked Option F carrier shape is sufficient as durable schema cannot be determined from one packet alone." This is exactly the boundary the carrier-shape choice question requires further pressure to resolve.

## Test Limits

The findings are honest about every limit:

- **One fresh reader.** Reader variability against this constraint set is unpressured. Multi-reader replication remains a candidate next surface.
- **One substrate.** Cross-substrate reconstruction power is unpressured. Cross-substrate test remains a candidate next surface.
- **Single clean contradiction.** A multi-contradiction substrate would pressure many-to-many contradiction-source relationships and the contradiction_log-entity carrier-shape alternative more directly.
- **Directly-architecturally-grounded resolution rule.** This test used the visual-as-fidelity-strategy rule, which is directly named at the photography-style-guide / asset-library boundary in the architecture. A contradiction where the resolution rule is ambiguous (no directly-articulated architectural rule applies; operator must judge from first principles) would pressure the resolution_rule sub-field's value-vocabulary question more sharply.
- **Mocked carrier shape.** One of three PR #256-named structurally-suggested alternatives. Test does not earn the specific shape over the other two.
- **No real implementation.** Pydantic / JSON Schema / Airtable / validator / orchestration not produced or tested.
- **No cross-substrate generalization.** Substrate is the same dry-run kitchen-textiles synthetic stack with one overlay; richer / sparser / multi-mode substrates remain unpressured.
- **No multi-reader replication.** Single reader; reader-specific variability not pressured.
- **No long-context / temporal-pressure.** Same-session reconstruction; time-gap durability not pressured.
- **No bounded_creative_discretion inheritance test.** The mocked carrier ties bounded_creative_discretion to D2 without a separate decision record; the reader's note flagged inheritance as a thin spot but it was not test-questioned directly.
- **No clause-level granularity pressure.** Prose-rich fields' clause-by-clause derivation remained a HELD concern (PR #254 + this test both surface the granularity question but neither operationalizes it).

## Earned vs Held

### Earned at this test depth

- **Option F's contradiction-resolution conceptual posture is operationally supported** at one-reader / one-substrate / one-contradiction / clean-resolution-rule / mocked-shape depth. The trace dimension is reconstructable from the carriers alone.
- **The `articulation_state: contradictory` value as architecturally distinct from `absent`** is operationally supported. Reader correctly distinguished four states where the prior test had only three.
- **Resilience of base trace dimensions under contradiction-overlay pressure.** Chain-position; derivation-basis (five-value vocabulary including operator-authored vs inferred-from-evidence distinction); presence-of-inspection; articulation-state; negative-space trace all held without regression from PR #254's no-contradiction baseline.

### Not earned

- **Specific carrier shape for contradiction-resolution.** The mocked sub-field-on-intake-decision-record shape worked, but the test does not differentiate it from the other two structurally-suggested alternatives (separate `contradiction_log` entity; annotation on inspection log entry). PR #256's HELD posture on carrier-shape selection persists.
- **Vocabulary for contradiction-resolution sub-fields.** The mocked five-sub-field structure (conflict_source; conflict_source_content; carried_source; resolution_rule; architectural_basis) worked for this single-contradiction case. Multi-contradiction substrates would pressure cardinality (one-to-many conflict_sources? many-to-many?) and value-vocabulary for the resolution_rule sub-field.
- **Multi-reader generalization.** Single reader; no replication.
- **Cross-substrate generalization.** Single substrate.
- **Ambiguous-resolution-rule generalization.** Single contradiction with directly-architecturally-grounded resolution rule.
- **Multi-contradiction substrate generalization.** Single contradiction.
- **Long-context / temporal-pressure generalization.** Same-session.
- **Clause-level granularity.** Reader-flagged as remaining weakness; HELD pending cross-substrate / prose-rich pressure per PR #256.
- **Reference-selection-rationale carrier shape.** Not test-questioned; HELD per PR #256.

### Boundary preserved

- No schema / Airtable / JSON Schema / Pydantic / validator / orchestration earned
- No specific carrier-shape design (entity placement; field types; cross-entity relationships; rollup patterns) earned
- No structured IA v3 absorption move authored
- No milestone marker authored
- No held-candidate adjudication
- No Zone 1B / Zone 3 / Zone 4 / Zone 5 pressure
- No edits to `docs/architecture.md`, `docs/index.md`, `README.md`, `docs/method.md`, `AGENTS.md`, the grounding note, or any prior artifact in this Stage C scope (a separate orientation-layer absorption PR would route this finding)

## Implications for Subsequent Pressure Surfaces

Implications only; no authorization.

- **Multi-reader replication of the contradiction-present test** would test whether reader variability against this constraint set surfaces patterns not visible in this single-reader result. The strong 13/13 result from this reader sets a high bar; a multi-reader replication that found significant variance would itself be informative. Candidate; not authorized.
- **Multi-contradiction substrate test** would pressure many-to-many contradiction-source relationships, the cardinality of contradiction_resolution sub-fields, and the discrimination between PR #256's three structurally-suggested carrier-shape alternatives. The discrimination question is sharpest under multi-contradiction substrates because the simpler shape (sub-field on decision record) may not scale as gracefully as the entity-model alternative (separate `contradiction_log`). Candidate; not authorized.
- **Ambiguous-resolution-rule substrate test** would pressure the resolution_rule sub-field's value-vocabulary question. This test used a directly-architecturally-grounded rule; a contradiction without a directly-named architectural rule would force the resolution_rule sub-field to carry operator-judgment content rather than rule-citation content. Candidate; not authorized.
- **Cross-substrate / prose-rich granularity test** remains the open pressure for the clause-level granularity question PR #256 holds. Reader's notes flag this dimension as the remaining weakness across both PR #254 and this test. Candidate; not authorized.
- **Long-context / temporal-pressure test** remains unpressured. Candidate; not authorized.
- **Specific F-shaped carrier implementation / structured IA v3 absorption** is now stronger than before, with both the no-contradiction trace dimension (PR #254) and the contradiction-resolution dimension (this test) operationally supported at single-reader depth. However, the carrier-shape selection question among PR #256's three structurally-suggested alternatives remains HELD; the multi-contradiction substrate would directly inform this selection. Candidate; not authorized.
- **Reference governance pressure surface** (PR #256's R-B / R-C / R-D selection) remains a separate held question that this test did not pressure. Candidate; not authorized.

## Self-Superseding Clause

This artifact is a v1 finding of a single-reader / single-substrate / single-contradiction / clean-resolution-rule / mocked-shape test. It should be superseded by:

- A multi-reader replication of the contradiction-present substrate test that confirms or surfaces variability against the constraint set.
- A multi-contradiction substrate test that pressures the carrier-shape discrimination among PR #256's three structurally-suggested alternatives.
- An ambiguous-resolution-rule substrate test that pressures the resolution_rule sub-field's value-vocabulary question.
- A cross-substrate test (richer / sparser / multi-mode content) that pressures clause-level granularity and other carrier-shape sub-dimensions under wider substrate variation.
- A long-context / temporal-pressure test that pressures Option F's carrier durability across time gaps.
- A specific Option F implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns for the structurally-suggested constraints PR #256 named.
- A structured IA model v3 that absorbs the contradiction-resolution operational support into the YAML appendix's held_questions list.
- A subsequent decision surface that resolves the carrier-shape choice among PR #256's three alternatives based on the test results from multi-contradiction or implementation pressure.
- A subsequent milestone marker that absorbs Zone 6 carrier-shape evidence at the next plateau.
- The eventual rewrite of [`docs/architecture.md`](architecture.md) that consolidates Zone 6 carrier-shape evidence at greater depth.

It does not supersede the Option F trace carrier shape design surface v1 (PR #256; the constraint vocabulary this test reads against), the real multi-operator continuity-break test v1 (PR #254; the no-contradiction baseline), the intake trace carrier decision surface v1 (PR #252; the conceptual Option F identification), the continuity-breaking intake trace test v1 (PR #250; the simulated baseline), the brand-system carrier decision surface v2 (PR #248; located Zone 6 at intake / governance layer), the brand intake judgment-trace dry run v1 (the substrate), structured IA model v2, the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; this artifact reads them at contradiction-present-substrate operational-finding depth.

## Anchor Documents

### Direct conceptual predecessor (the held question this test addresses)

- [`docs/option-f-trace-carrier-shape-design-surface-v1.md`](option-f-trace-carrier-shape-design-surface-v1.md): PR #256 carrier-shape design surface; explicitly held contradiction-resolution carrier shape pending a contradiction-present substrate test (which this is)

### Direct empirical predecessor

- [`docs/real-multi-operator-continuity-break-test-v1.md`](real-multi-operator-continuity-break-test-v1.md): PR #254 fresh-reader test against no-contradiction substrate; baseline against which this test's contradiction-overlay results read

### Substrate this artifact reads against

- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry-run substrate the contradiction overlay extends
- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 simulated test against no-carriers; established the trace-dimension vocabulary
- [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md): PR #252 carrier-shape comparison; identified Option F as surviving conceptual posture
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 located Zone 6 at intake / governance layer
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): depth-authority for the visual-as-fidelity-strategy / prose-as-fallback resolution rule the test substrate's contradiction overlay uses
- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as premise; visual-as-fidelity-strategy claim cited in Evidence Depth section

### Conceptual framing

- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence; operator-authored vs inferred-from-evidence distinction this test's Q-2 vs Q-6 preserved under contradiction pressure
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; five-or-six-zone framing
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this test's contradiction-resolution operational support maps to (without mutating)
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary

### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
