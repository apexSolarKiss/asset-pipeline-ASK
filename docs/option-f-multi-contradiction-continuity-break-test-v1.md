# Option F Multi-Contradiction Continuity-Break Test v1

## Posture

```text
operational findings artifact
Zone 6 / intake-governance trace
follows PR #258 (single-contradiction operational support for contradiction-resolution dimension)
follows PR #256 (held: specific contradiction-resolution carrier shape among three structurally-suggested alternatives)
fresh-reader test against mocked Option-F carriers + multi-contradiction overlay
not schema
not field design
not entity placement
not implementation
not structured IA v3
not validator / orchestration
not held-candidate adjudication
not multi-reader replication
not cross-substrate generalization
not ambiguous-resolution-rule test
not long-context / temporal-pressure test
not authorization of any specific carrier shape
self-superseding when multi-reader replication, cross-substrate test, more-than-two-contradiction substrate, ambiguous-resolution-rule substrate, long-context test, or implementation move absorbs it
```

This artifact records the Stage C findings of the multi-contradiction Option-F trace test. The test extends PR #258's single-contradiction baseline to a two-event substrate and pressures whether the mocked sub-field-on-intake-decision-record carrier shape (one of PR #256's three structurally-suggested alternatives) handles multi-contradiction reconstruction coherently — particularly the structural patterns that emerge under multi-event load: list-valued contradiction_resolution sub-fields; events affecting more than one decision (1:many); event content duplicated across affected decision records.

## What This Artifact Attempts

The artifact answers two questions:

1. **Does Option F preserve reconstruction when the intake substrate includes more than one source-content contradiction?**
2. **Does the mocked sub-field-on-intake-decision-record carrier shape (extended with list-valued contradiction_resolution + affected_decisions cross-reference + multi-source carried_source) feel natural under multi-contradiction load, or does the strain surface signals that one of PR #256's other two carrier-shape alternatives might be more apt?**

PR #258 confirmed Option F's contradiction-resolution conceptual posture at single-contradiction depth with a clean-resolution-rule substrate. PR #256 left the carrier-shape choice held among three structurally-suggested alternatives: sub-field on intake decision record; separate `contradiction_log` entity; annotation on inspection log entry. A single contradiction can be carried by any of the three; the discrimination question requires multi-contradiction load.

The artifact does NOT earn a specific carrier shape. It pressures the conceptual posture under multi-contradiction load and reports what's operationally supported, what remains held, and what carrier-shape signals the test surfaces.

## Test Design

### Substrate

- **Base substrate:** same kitchen-textiles SKU hero packet as the prior Zone 6 trace test sequence (PR #250 / PR #254 / PR #258). No new synthetic stack introduced.
- **Multi-contradiction overlay:** two narrowly-scoped contradiction events on the existing substrate:
  - **Event 1** (carried from PR #258 baseline): photography_style_guide articulates voice/tone register as "vibrant, saturated; high-contrast; energetic register" — contradicts asset_library convergent calm / warm-tone / accessible evidence. Operator applies the architecturally-grounded visual-as-fidelity-strategy / prose-as-fallback rule. Asset_library carries; photography_style_guide articulation is rejected. Affects D2 only (1:1 structure).
  - **Event 2** (NEW — partial contradiction with multi-source convergent carriage and 1:many decision impact): brand_platform articulates positioning as "premium / aspirational / elevated" alongside its audience field ("everyday households"). The two fields within brand_platform are internally inconsistent (accessibility-coded audience vs inaccessibility-coded positioning). The positioning field also contradicts asset_library's accessible warm-tone evidence. Operator extends the visual-as-fidelity-strategy rule to source-internal-inconsistency: the part of the layer's content that converges with asset_library evidence (audience field) carries; the divergent part (positioning field) is rejected. **Carried sources: [brand_platform.audience + asset_library]** (convergent set; multi-source carriage). **Affects D1 AND D2** (1:many decision impact). Resolution rule has **partial architectural grounding** — visual-as-fidelity-strategy is directly architectural; the extension to source-internal-inconsistency is operator-judgment.
- **Downstream IA effect:** identical to PR #258's contradiction-present case. Both contradiction events are invisible from the downstream IA alone; reconstructable only from the trace carriers.

### Mocked Option F carriers (extended from PR #258 mock)

The mock extends the PR #258 carrier set in three structural ways to handle multi-contradiction load:

1. **Inspection log:** new `articulation_state` value `partial-with-internal-conflict` for layers whose content is partly carried and partly rejected via layer-internal inconsistency. New `content_produced: partial` value for the same case. brand_platform now carries this state; photography_style_guide remains `contradictory` / `content_produced: no`.
2. **Intake decision record `contradiction_resolution` sub-field is list-valued:** a single decision record can carry multiple contradiction events. D2 carries [Event 1, Event 2]; D1 carries [Event 2]; other decisions carry n/a.
3. **`affected_decisions` cross-reference:** each event includes a list of decision_ids it affects, so multi-decision events can be reconstructed across affected records.
4. **Multi-source `carried_source` representation:** `carried_source` in Event 2 is a list `[brand_platform.audience, asset_library]` representing the convergent set rather than a single layer.

The structural consequence: Event 2's full content is **duplicated across D1.contradiction_resolution and D2.contradiction_resolution** because the sub-field-on-decision-record shape places the resolution trace on each affected decision. This duplication is the diagnostic signal the test was designed to surface.

These extensions are explicitly held per PR #256's posture on contradiction-resolution carrier shape. The test specifically pressures whether the extended sub-field-on-decision-record approach handles multi-contradiction substrates coherently or whether the cardinality and duplication strain point toward one of the other PR #256-named alternatives.

### Test instruments

The Stage A scratch instruments lived outside the repo to preserve test-integrity isolation:

- Blind reader packet: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_option-f-multi-contradiction-test-blind-reader-packet_v1.md`
- Ground-truth key: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_option-f-multi-contradiction-test-ground-truth-key_v1.md`

The fresh reader received only the blind packet; the ground-truth key was held by the test author.

### Question structure

- **Q-1 through Q-6:** per-content-piece reconstruction (six content pieces; framing preserved from PR #258 with adjusted resilience criteria for double-contradiction overlay on D2 and 1:many overlay on D1)
- **Q-7:** contradiction event count + per-event source identification — gateway question for multi-contradiction handling
- **Q-8:** Event 1 details (six sub-fields a-f) — baseline 1:1 event
- **Q-9:** Event 2 details (six sub-fields a-f) — **discriminating event** for multi-source convergent carriage + partial architectural grounding + 1:many decision impact
- **Q-10:** cross-event structural relationships (four sub-fields a-d) — **load-bearing for carrier-shape pressure** (multi-event-per-decision; 1:many event-to-decisions; duplication identification)
- **Q-C1 through Q-C4:** cross-cutting (Q-C2 adds the new `partial-with-internal-conflict` distinction)

Total: 14 questions × 1.0 = 14.0 maximum.

## Per-Question Scoring

Each row reports the fresh reader's answer against the ground-truth key's success criteria. Scoring grid: Success = 1.0; Partial = 0.5; Failure = 0.0.

| Question | Reader response (concise) | Key expected | Score | Notes |
|---|---|---|---|---|
| Q-1 | brand_platform / lifted-verbatim / brand platform audience field | brand_platform / lifted-verbatim / audience field | 1.0 Success | Exact match; D1's contradiction_resolution Event 2 entry did not destabilize the base reading |
| Q-2 | asset_library / inferred-from-evidence / convergent warm-tone across four refs | asset_library / inferred-from-evidence / convergent warm-tone | 1.0 Success | Resilience under DOUBLE-contradiction (both Event 1 and Event 2 attached to D2); reader did NOT misattribute to either rejected source |
| Q-3 | asset_library / lifted-verbatim / four refs | asset_library / lifted-verbatim / four refs | 1.0 Success | Exact match |
| Q-4 | phase_1_worked_example_defaults / worked-example-default / role inventory | same | 1.0 Success | Exact match |
| Q-5 | phase_1_worked_example_defaults / worked-example-default / hero-slot composition pattern | same | 1.0 Success | Resilience-to-misattribution under multi-contradiction overlay |
| Q-6 | none-operator-authored / operator-authored / none | same | 1.0 Success | Operator-authored vs inferred-from-evidence distinction preserved |
| Q-7 | count = 2; Event 1 = photography_style_guide vs asset_library; Event 2 = brand_platform.positioning vs brand_platform.audience + asset_library (internal + external) | count = 2; both event source pairs distinctly | 1.0 Success | Reader explicitly named Event 2's dual nature (internal to brand_platform + against asset_library) — captures the structural complexity of the event |
| Q-8 | rejected: vibrant/saturated/high-contrast/energetic; carried: convergent warm-tone across four refs; rule: visual-as-fidelity-strategy with full clause; basis: apex aesthetic-layering pass + Phase 2 photography deepening; affected: D2 | all five substantive fields | 1.0 Success | Event 1 fully reconstructed |
| Q-9 | rejected: brand_platform.positioning "premium / aspirational / elevated"; carried: brand_platform.audience "everyday households" + asset_library accessible warm-tone evidence as convergent set; rule: source-internal-inconsistency extension; basis: PARTIALLY architectural with operator-judgment extension explicitly named; affected: D1, D2 | all five fields including multi-source carriage, partial-grounding nuance, and 1:many decision impact | 1.0 Success | **Discriminating event fully reconstructed.** Reader identified BOTH carried sources, captured the partial-architectural-grounding distinction precisely ("foundational ... grounds the visual-evidence-carries direction; the extension ... is operator judgment, not directly architecturally named"), and identified BOTH affected decisions |
| Q-10 | D2 carries both events; Event 2 affects D1 and D2; Event 2 duplicated across D1 and D2 | all three structural patterns | 1.0 Success | All three carrier-shape pressure signals correctly identified including the duplication observation |
| Q-C1 | five inspected layers listed; inferred_not_stated explicitly noted in Q-C2 | 5 layers AND explicit non-inspection note for inferred_not_stated | 1.0 Success | Functional completion split across Q-C1 + Q-C2 — same pattern as PR #258 |
| Q-C2 | all five inspected states + not-inspected correctly identified with content_produced for each | five-state distinction including new partial-with-internal-conflict + content_produced sub-states | 1.0 Success | Reader correctly distinguished the new `partial-with-internal-conflict` value from `contradictory` and from `partial`; the new `content_produced: partial` value was also correctly identified |
| Q-C3 | yes + detailed two-event summary covering both contradicting sources + rejected/carried content + resolution direction for each | yes + two-event summary covering minimum source/outcome description per event | 1.0 Success | Cross-cutting summary substantially exceeds threshold |
| Q-C4 | seven unreconstructable aspects listed including the test-author-not-anticipated observation about directly-architectural source text for the source-internal-inconsistency extension | ≥2 aspects | 1.0 Success | Exceeds threshold by 3.5×; reader's observation about the extension rule's non-direct-architectural grounding is exactly the epistemic distinction the test surfaced |

**Aggregate raw count:** 14 Success / 0 Partial / 0 Failure.

**Aggregate score:** 14.0 / 14.0 = **100%**.

## Aggregate Result

Per the ground-truth key's threshold table:

- **Trace holds:** ≥11.2 (≥80%)
- **Trace partially holds:** 7.0–11.1 (50-79%)
- **Trace partially breaks:** 4.3–6.9 (31-49%)
- **Trace breaks:** <4.3 (<31%)

The 14.0 aggregate score falls in the **trace holds** band by a wide margin (25.0 points above the 80% threshold).

## Multi-Contradiction Sub-Aggregate

The multi-contradiction dimension (Q-7 + Q-8 + Q-9 + Q-10 + Q-C3 = 5 questions × 1.0 = 5.0 maximum) is the primary load-bearing dimension for this test.

**Multi-contradiction sub-aggregate score:** 5.0 / 5.0 = **100%**.

### Per-event sub-scores

- **Event 1 sub-score** (Q-8 alone, baseline 1:1 case): 1.0 / 1.0 — fully reconstructed
- **Event 2 sub-score** (Q-9 alone, discriminating event): 1.0 / 1.0 — fully reconstructed including the partial-architectural-grounding nuance, multi-source carriage, and 1:many decision impact
- **Cross-event sub-score** (Q-7 + Q-10, structural patterns): 2.0 / 2.0 — count + sources + multi-event-per-decision + 1:many event-to-decision + duplication all identified

### Per-multi-contradiction-sub-dimension breakdown

- **Event count + identification** (Q-7): SUCCESS — count = 2; both event source pairs correctly identified
- **Event 1 1:1 case reconstruction** (Q-8): SUCCESS — rejected/carried content, rule, architectural basis, affected decision all correct
- **Event 2 multi-source convergent carriage** (Q-9b): SUCCESS — both carried sources (brand_platform.audience + asset_library) identified, not just one
- **Event 2 partial-architectural-grounding** (Q-9d): SUCCESS — reader explicitly named "partially architectural with operator-judgment extension"; the foundational rule was identified AND the source-internal-inconsistency extension was identified as operator judgment, not directly architecturally named
- **Event 2 1:many decision impact** (Q-9e): SUCCESS — both D1 and D2 identified
- **Multi-event-per-decision pattern** (Q-10a): SUCCESS — D2 identified as carrying both Event 1 and Event 2
- **1:many event-to-decisions pattern** (Q-10b): SUCCESS — Event 2 identified as affecting D1 and D2
- **Duplication observation** (Q-10c): SUCCESS — reader explicitly identified that Event 2 is duplicated across D1.contradiction_resolution and D2.contradiction_resolution

All eight multi-contradiction sub-dimensions reconstructed without partial or failure marks.

## Per-Trace-Dimension Performance

Beyond the multi-contradiction dimension, the per-trace-dimension reconstruction performance:

| Trace dimension | Question coverage | Score | Status |
|---|---|---|---|
| Presence-of-inspection | Q-C1 | 1.0 / 1.0 | SUCCESS |
| Articulation-state | Q-C2 | 1.0 / 1.0 | SUCCESS (includes new partial-with-internal-conflict distinct from contradictory and from partial) |
| Chain-position | Q-1a, Q-2a, Q-3a, Q-4a, Q-5a, Q-6a | 6.0 / 6.0 | SUCCESS |
| Derivation-basis | Q-1b, Q-2b, Q-3b, Q-4b, Q-5b, Q-6b | 6.0 / 6.0 | SUCCESS |
| Negative-space trace | Q-C2 | 1.0 / 1.0 | SUCCESS |
| Contradiction-resolution | Q-7, Q-8, Q-9, Q-10, Q-C3 | 5.0 / 5.0 | SUCCESS (load-bearing for this test) |
| Operator-authored vs inferred-from-evidence distinction | Q-2b vs Q-6b | preserved | SUCCESS |
| Contradictory vs partial-with-internal-conflict vs absent vs partial distinction | Q-C2 | preserved | SUCCESS (this test pressures a four-state distinction the prior tests did not) |

All trace dimensions held under multi-contradiction-overlay pressure.

## Where Option F Succeeded

- **Multi-contradiction conceptual posture is operationally supported** at this test depth. A fresh reader reconstructed both contradiction events including the discriminating Event 2 (multi-source convergent carriage; partial architectural grounding; 1:many decision impact) from the mocked carriers alone, without operator continuity.
- **The extended sub-field-on-intake-decision-record shape works operationally for this multi-contradiction case.** List-valued contradiction_resolution sub-fields, affected_decisions cross-reference, multi-source carried_source list, and the new `partial-with-internal-conflict` articulation_state value all enabled reconstruction. PR #258's single-contradiction operational support extends to two-contradiction substrates with mixed 1:1 and 1:many event structures.
- **Resilience under multi-contradiction overlay held.** Both Q-2 (D2 carries BOTH events) and Q-5 (slot_prompt unaffected by overlay) scored Success. The reader did not misattribute carried content to any rejected source despite the increased complexity.
- **The new `partial-with-internal-conflict` articulation_state value is operationally supported as a distinct value** from `contradictory` (used for photography_style_guide where the whole layer was rejected) and `partial` (used for asset_library which carried without conflict). Q-C2 reconstructed all four inspected-layer states correctly. This sharpens PR #256's held vocabulary extension question with operational evidence that the additional value carries.
- **The partial-architectural-grounding distinction was reconstructable** (Q-9d). The reader correctly named the rule as "partially architectural with operator-judgment extension" and identified the foundational claim AND the operator-judgment extension separately. This is structurally important because it preserves the architectural-vs-operator-judgment distinction under multi-contradiction load — a distinction that may matter for any future implementation where rule citation differs from rule synthesis.
- **All carrier-shape pressure signals were surfaced.** Q-10 fully identified the three structural patterns (multi-event-per-decision; 1:many event-to-decisions; duplication of Event 2 across D1+D2) the test was designed to expose. Reader's optional notes explicitly named D2 as "the pressure point" — direct epistemic engagement with where the carrier shape strains.
- **The reader's optional notes are epistemically sophisticated.** Reader observed: (1) "D2 is the pressure point: it carries more than one contradiction event, while Event 2 spans more than one decision and is duplicated across D1 and D2"; (2) "The partial-with-internal-conflict articulation_state is doing meaningful work because it prevents brand_platform from being treated as simply rejected or simply carried; it allows one field to carry while another field is rejected." Both observations directly diagnose the structural pressure points the test was designed to surface.

## Where Option F Partially Succeeded

- **Q-C1's inferred_not_stated non-inspection note was split across questions** (same pattern as PR #258). The reader's Q-C1 listed only the 5 inspected layers (correctly excluding inferred_not_stated by omission); the explicit non-inspection note appeared in Q-C2. Functionally complete; structurally split. Scored Success on the basis of holistic response, consistent with PR #258 scoring. This is a test-design observation rather than a partial-failure of the trace dimension.

## Where Option F Still Failed

Nothing at this test's depth. The reader's optional notes do flag a structural strain point — duplication of Event 2 across D1 and D2 — but this is a **carrier-shape observation**, not an Option-F-concept failure. The duplication is reconstructable (the reader explicitly identified it), but the reader's framing of D2 as "the pressure point" and the explicit identification of the duplication suggest that the sub-field-on-decision-record shape is not the structurally cleanest expression of 1:many events. See the next section.

## Where The Mocked Shape, Not Option F As A Concept, May Be The Issue

The 14/14 result operationally supports the **conceptual posture** of multi-contradiction handling — but the test's 5/5 sub-aggregate does NOT close the carrier-shape choice among PR #256's three alternatives. Per the ground-truth key's carrier-shape discrimination framing, "the test does NOT narrow the choice but does support one of the three (and by extension the conceptual posture)." Specifically:

- **The extended sub-field-on-intake-decision-record shape works** but exhibits the structural pattern the test was designed to surface: Event 2's full content is duplicated across D1.contradiction_resolution and D2.contradiction_resolution. The reader explicitly named this duplication. Functionally the duplication is harmless; structurally it is a redundancy the shape requires.
- **A separate `contradiction_log` entity** (PR #256's second structurally-suggested alternative) would naturally dedupe what the sub-field shape duplicates. Each contradiction event would be a first-class record with links to one or more affected decisions; Event 2's content would live in one place; D1 and D2 would each reference the same event via foreign key rather than carrying a copy. This shape handles 1:many event-to-decision structurally rather than by duplication.
- **An annotation on inspection log entry** (PR #256's third structurally-suggested alternative) would express cross-layer relationships at the inspection layer rather than at the decision layer. For Event 2's internally-inconsistent brand_platform case, the annotation on brand_platform's inspection log row could express the audience-carried-but-positioning-rejected directly at the inspection state, with the decisions inheriting the resolution by reference. This shape handles source-internal-inconsistency structurally rather than by carrying the resolution context to each affected decision.

The test result therefore reads as:

- **Conceptual posture: supported.** Multi-contradiction handling is operationally tractable.
- **Sub-field-on-intake-decision-record shape: strengthened, with named structural strain.** Works operationally; carries duplication overhead under 1:many; reader explicitly flagged the duplication as a structural feature of this shape.
- **Separate `contradiction_log` entity: materially plausible, not weakened.** The test surfaces exactly the structural cases (1:many; duplication; cross-decision references) where a separate entity dedupes more naturally. The case for `contradiction_log` is structurally stronger after this test than before, not weaker.
- **Annotation on inspection log entry: materially plausible, not weakened.** The test surfaces source-internal-inconsistency as a case where annotation at the inspection layer captures the structural shape more directly than carrying resolution context per-decision.

The carrier-shape choice question PR #256 holds is **not closed by this test**. It is sharpened: any of the three alternatives can carry the trace this test pressured; the distinguishing factors among them are structural (duplication overhead vs entity proliferation vs cross-layer annotation complexity) rather than reconstructability-of-trace.

The reader's optional notes also surface one further observation worth carrying: "The partial-with-internal-conflict articulation_state is doing meaningful work because it prevents brand_platform from being treated as simply rejected or simply carried." This supports the held vocabulary extension PR #256 named — the articulation_state value space may need extension to handle partial-carry cases (not collapse into the binary contradictory/absent distinction).

## Test Limits

The findings are honest about every limit:

- **One fresh reader.** Reader variability against this constraint set is unpressured. Multi-reader replication remains a candidate next surface.
- **One substrate.** Cross-substrate reconstruction power is unpressured. Cross-substrate test remains a candidate.
- **Two contradictions.** A three-or-more-contradiction substrate would pressure the duplication / cardinality strain on the sub-field-on-decision-record shape more sharply; this test demonstrates the pattern at minimum-multi-contradiction depth.
- **Single source-internal-inconsistency case.** Event 2 is the only source-internal-inconsistency test point; the value of `partial-with-internal-conflict` was pressured by exactly one substrate.
- **Clean-or-partially-architectural resolution rules.** Event 1 used a directly-architectural rule; Event 2 used a partial-architectural-grounding rule. Neither was a fully operator-judgment case where no architectural anchor exists — that remains the held ambiguous-resolution-rule substrate test.
- **Mocked carrier shape.** The extended sub-field-on-intake-decision-record shape; one of PR #256's three structurally-suggested alternatives. Test does NOT differentiate the three; it adds operational support to the conceptual posture and surfaces structural strain in the specific mocked shape.
- **No real implementation.** Pydantic / JSON Schema / Airtable / validator / orchestration not produced or tested.
- **No cross-substrate generalization.** Same dry-run kitchen-textiles substrate with multi-contradiction overlay; richer / sparser / multi-mode substrates remain unpressured.
- **No multi-reader replication.** Single reader; reader-specific variability not pressured. The strong 14/14 result is informative but a single-reader test cannot distinguish robust conceptual posture from reader-specific facility.
- **No long-context / temporal-pressure.** Same-session reconstruction; time-gap durability not pressured.
- **No clause-level granularity pressure.** Prose-rich fields' clause-by-clause derivation remains a HELD concern (PR #254 + PR #258 + this test all surface the granularity question but none operationalize it).

## Earned vs Held

### Earned at this test depth

- **Option F's multi-contradiction conceptual posture is operationally supported** at one-reader / one-substrate / two-contradiction / mixed-1:1-and-1:many / clean-and-partial-architectural-grounding / mocked-shape depth. The trace dimension is reconstructable from the carriers alone under multi-contradiction load.
- **The `articulation_state: partial-with-internal-conflict` value as architecturally distinct** from `contradictory`, `partial`, and `absent` is operationally supported. Reader correctly distinguished all four states.
- **Multi-source carried_source representation** (list-valued) is operationally supported. Reader identified both carried sources of Event 2's convergent set.
- **Partial-architectural-grounding distinction** (foundational rule directly architectural vs extension operator-judgment) is reconstructable from the carriers and was correctly named by the reader.
- **1:many event-to-decision structure** is reconstructable from `affected_decisions` cross-reference.
- **Resilience of base trace dimensions under multi-contradiction overlay.** Chain-position; derivation-basis (five-value vocabulary including operator-authored vs inferred-from-evidence distinction); presence-of-inspection; articulation-state; negative-space trace all held without regression from PR #258's contradiction-present baseline.

### Not earned

- **Specific contradiction-resolution carrier shape.** The mocked extended sub-field-on-intake-decision-record shape worked, but the test does not differentiate it from the other two PR #256-named structurally-suggested alternatives (separate `contradiction_log` entity; annotation on inspection log entry). The test in fact strengthens the case for the entity alternative because the surfaced duplication signal is exactly what that alternative dedupes. PR #256's HELD posture on carrier-shape selection persists, with carrier-shape signals now more informative than before.
- **Vocabulary for multi-event handling.** The list-valued contradiction_resolution sub-field worked for two events; cardinality scaling under three-or-more contradictions is unpressured.
- **Multi-reader generalization.** Single reader; no replication.
- **Cross-substrate generalization.** Single substrate.
- **Ambiguous-resolution-rule generalization.** Resolution rules were directly-architectural or partially-architectural-with-operator-judgment-extension; fully operator-judgment-without-architectural-anchor cases remain unpressured.
- **Three-or-more-contradiction substrate generalization.** Two-contradiction case only.
- **Long-context / temporal-pressure generalization.** Same-session.
- **Clause-level granularity.** Reader-flagged across PR #254 + PR #258 + this test; HELD pending cross-substrate / prose-rich pressure per PR #256.
- **Reference-selection-rationale carrier shape.** Not test-questioned; HELD per PR #256.

### Boundary preserved

- No schema / Airtable / JSON Schema / Pydantic / validator / orchestration earned
- No specific carrier-shape design (entity placement; field types; cross-entity relationships; rollup patterns) earned
- No structured IA v3 absorption move authored
- No milestone marker authored
- No held-candidate adjudication
- No Zone 1B / Zone 3 / Zone 4 / Zone 5 pressure
- No edits to `docs/architecture.md`, `docs/index.md`, `README.md`, `docs/method.md`, `AGENTS.md`, the grounding note, or any prior artifact in this Stage C scope (a separate orientation-layer absorption PR would route this finding)

## Whether Option F's Multi-Contradiction Posture Is Supported, Weakened, or Needs Revision

**Supported.** The conceptual posture of Option F handling multi-contradiction reconstruction via the per-source-layer inspection log + intake decision record + contradiction-resolution carrier(s) holds at this test depth. All four sub-dimensions specific to multi-contradiction (presence + count; per-event 1:1; per-event 1:many with multi-source convergent carriage; cross-event structural patterns) were reconstructed without partial or failure marks.

This is a non-trivial extension of PR #258. Where PR #258 supported the contradiction-resolution dimension at single-contradiction depth, this test extends to multi-contradiction depth with mixed event structures (1:1 + 1:many), mixed resolution-rule groundings (directly-architectural + partial-grounding-with-operator-judgment), and a new articulation_state sub-value (`partial-with-internal-conflict`). All extensions remained reconstructable.

The posture is supported at this depth; it is NOT supported at three-or-more-contradiction substrates, multi-reader replication, cross-substrate generalization, ambiguous-resolution-rule substrates, or long-context contexts — those remain held.

## Whether the Sub-Field-on-Decision-Record Mock Is Strengthened, or Whether Separate `contradiction_log` Remains Materially Plausible

**Both.** This is the load-bearing carrier-shape finding of the test:

- **Sub-field-on-intake-decision-record is strengthened in narrow operational support** — it does work for this multi-contradiction case. List-valued contradiction_resolution + affected_decisions cross-reference + multi-source carried_source list + the new partial-with-internal-conflict articulation_state value all enabled reconstruction.
- **Sub-field-on-intake-decision-record is NOT strengthened in structural-shape preference** — the test surfaced the exact structural strain the shape exhibits (Event 2 duplicated across D1.contradiction_resolution and D2.contradiction_resolution). Reader explicitly identified this duplication and framed D2 as "the pressure point" of the shape.
- **Separate `contradiction_log` entity remains materially plausible** — the structural cases the test surfaced (1:many event-to-decisions; duplication; cross-decision references) are exactly the cases the entity alternative dedupes. The case for `contradiction_log` is structurally stronger after this test than before, not weaker. The entity alternative was not tested directly; it is the structural shape the test SIGNALS as natural-fit-for-1:many.
- **Annotation on inspection log entry remains materially plausible** — the source-internal-inconsistency case (Event 2's brand_platform.audience-carried + brand_platform.positioning-rejected) is exactly the case where annotation at the inspection layer captures the structural shape directly. This alternative also was not tested; it is signaled as natural-fit-for-source-internal-inconsistency.

The discriminating signal — duplication of Event 2 across D1 and D2 — was correctly identified by the reader and explicitly flagged as a structural pressure point. This is the diagnostic the test was designed to surface, and it tells the architecture that:

1. The sub-field-on-decision-record shape works under multi-contradiction load.
2. But it carries duplication overhead under 1:many event-to-decision structure.
3. The structural strain is functionally invisible (reconstruction succeeds) but architecturally legible (the duplication is reconstructable, named, and observed).

The carrier-shape choice among PR #256's three alternatives is **sharpened, not closed**. The test result supports the conceptual posture across all three alternatives; the choice among them remains a structural design decision that operational pressure can inform but has not earned.

## Implications for Subsequent Pressure Surfaces

Implications only; no authorization.

- **Multi-reader replication of the multi-contradiction test** would test whether reader variability against this specific constraint set surfaces patterns not visible in this single-reader result. The strong 14/14 result with the reader's epistemic sophistication invites replication; a multi-reader replication that found significant variance would itself be highly informative. Candidate; not authorized.
- **Three-or-more-contradiction substrate test** would pressure the duplication / cardinality strain on the sub-field-on-decision-record shape more sharply. Three contradictions with overlapping affected_decisions would create cubic-or-greater duplication overhead in the sub-field shape; the entity alternative would scale linearly. This pressure would meaningfully differentiate the three carrier-shape alternatives. Candidate; not authorized.
- **Ambiguous-resolution-rule substrate test** would pressure the resolution_rule sub-field where no architectural anchor exists and operator-judgment carries the resolution alone. PR #258 used directly-architectural; this test used directly-architectural + partial-architectural-with-extension; the fully-operator-judgment case remains unpressured. Candidate; not authorized.
- **Cross-substrate / prose-rich granularity test** remains the open pressure for clause-level granularity. Reader notes across PR #254 + PR #258 + this test consistently flag this dimension as the remaining weakness. Candidate; not authorized.
- **Long-context / temporal-pressure test** remains unpressured. Candidate; not authorized.
- **Specific F-shaped carrier implementation / structured IA v3 absorption** is now stronger than before, with three operational support points (PR #254 no-contradiction; PR #258 single-contradiction; this test multi-contradiction) plus PR #256's bounded constraint vocabulary. The carrier-shape selection among PR #256's three alternatives for contradiction-resolution is now more informed by structural-strain signals but remains a design choice. Candidate; not authorized.
- **Reference governance pressure surface** (PR #256's R-B / R-C / R-D selection) remains a separate held question that this test did not pressure. Candidate; not authorized.

## Self-Superseding Clause

This artifact is a v1 finding of a single-reader / single-substrate / two-contradiction / mixed-1:1-and-1:many / partial-architectural-grounding / mocked-shape test. It should be superseded by:

- A multi-reader replication of the multi-contradiction substrate test that confirms or surfaces variability against the constraint set.
- A three-or-more-contradiction substrate test that pressures the carrier-shape discrimination among PR #256's three alternatives more sharply through higher-cardinality duplication overhead.
- An ambiguous-resolution-rule substrate test that pressures the resolution_rule sub-field where no architectural anchor exists.
- A cross-substrate test (richer / sparser / multi-mode content) that pressures clause-level granularity and other carrier-shape sub-dimensions under wider substrate variation.
- A long-context / temporal-pressure test that pressures Option F's carrier durability across time gaps.
- A specific Option F implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns for the structurally-suggested constraints PR #256 named — informed by the structural-strain signals this test surfaced.
- A structured IA model v3 that absorbs the multi-contradiction operational support and the carrier-shape signals into the YAML appendix's held_questions list.
- A subsequent decision surface that resolves the carrier-shape choice among PR #256's three alternatives based on the operational pressure these tests have surfaced.
- A subsequent milestone marker that absorbs Zone 6 carrier-shape evidence at the next plateau.
- The eventual rewrite of [`docs/architecture.md`](architecture.md) that consolidates Zone 6 carrier-shape evidence at greater depth.

It does not supersede the Option F contradiction-present continuity-break test v1 (PR #258; the single-contradiction baseline this extends), the Option F trace carrier shape design surface v1 (PR #256; the constraint vocabulary this test reads against), the real multi-operator continuity-break test v1 (PR #254; the no-contradiction baseline), the intake trace carrier decision surface v1 (PR #252; the conceptual Option F identification), the continuity-breaking intake trace test v1 (PR #250; the simulated baseline), the brand-system carrier decision surface v2 (PR #248), the brand intake judgment-trace dry run v1 (the substrate), structured IA model v2, the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; this artifact reads them at multi-contradiction-substrate operational-finding depth.

## Anchor Documents

### Direct empirical predecessor (extended by this test)

- [`docs/option-f-contradiction-present-continuity-break-test-v1.md`](option-f-contradiction-present-continuity-break-test-v1.md): PR #258 single-contradiction baseline; this test extends to multi-contradiction substrate

### Direct conceptual predecessor

- [`docs/option-f-trace-carrier-shape-design-surface-v1.md`](option-f-trace-carrier-shape-design-surface-v1.md): PR #256 carrier-shape design surface; three structurally-suggested alternatives for contradiction-resolution carrier shape held pending operational pressure (which multi-contradiction substrates supply)

### Substrate this artifact reads against

- [`docs/real-multi-operator-continuity-break-test-v1.md`](real-multi-operator-continuity-break-test-v1.md): PR #254 no-contradiction baseline
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry-run substrate the multi-contradiction overlay extends
- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 simulated test; established the trace-dimension vocabulary
- [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md): PR #252 carrier-shape comparison; identified Option F as surviving conceptual posture
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 located Zone 6 at intake / governance layer
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): depth-authority for visual-as-fidelity-strategy rule (Event 1's directly-architectural resolution rule + Event 2's partial-grounding extension foundation)
- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as premise; visual-as-fidelity-strategy claim cited in Evidence Depth section

### Conceptual framing

- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence; operator-authored vs inferred-from-evidence distinction preserved under multi-contradiction overlay
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this test's multi-contradiction operational support maps to (without mutating)
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary

### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
