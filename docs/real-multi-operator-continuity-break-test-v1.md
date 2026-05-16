# Real Multi-Operator Continuity-Break Test v1 // Findings

## Posture

```text
operational-pressure test findings artifact
Stage C of the Zone 6 trace test sequence
real-reader successor to the simulated continuity-break test v1 (PR #250)
pressures Option F surviving conceptual posture (PR #252) with a mocked Option-F-shaped carrier set
single-reader test against the dry-run synthetic stack
not schema
not field design
not Airtable
not JSON Schema
not Pydantic
not validator / orchestration implementation
not structured IA v3
not milestone
not README / index / architecture cleanup
not grounding-note edit
not held-candidate adjudication map
does not earn structural-carrier shapes beyond what the test result supports
self-superseding when a multi-reader real-implementation test, an n-reader replication, or a subsequent decision surface absorbs it
```

This artifact reports the findings from the real multi-operator continuity-break test conducted with a single fresh reader, against the existing dry-run synthetic stack, with a mocked Option-F-shaped carrier set. It is the Stage C deliverable for the test sequence initiated when ASK authorized the real-reader pressure surface following PR #253.

The test pressures the Option F conceptual posture identified in [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md) (PR #252) — hybrid per-source-layer inspection log + intake decision record — against the reconstruction-failure points the simulated continuity-break test v1 ([`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md); PR #250) earned at simulated depth. The hypothesis: do Option F's carriers shift the simulated finding ("trace partially breaks") toward "trace holds" — and where does the mocked shape's limits show through?

The honest summary: **trace holds at this test.** The fresh reader scored 10/10 against the ground-truth key, including the two architecturally-distinct sub-distinction cases (inferred-from-evidence vs operator-authored; worked-example-default vs operator-authored). Two substantive observations about the mocked carrier shape — granularity (content-piece-level only) and reference opacity (asset_metadata empty) — surfaced from the reader as scope-of-shape concerns distinct from Option-F-as-concept.

## What This Artifact Reports

The Zone 6 trace test sequence proceeded in three stages, all per ASK direction:

- **Stage A (test instrument preparation).** Blind reader packet + ground-truth key authored to scratch, not the repo, for test-integrity reasons:
  - `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-blind-reader-packet_v1.md` (273 lines)
  - `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-ground-truth-key_v1.md` (268 lines)
- **Stage B (fresh-reader execution).** A genuinely cold reader received only the blind reader packet; no repo access; no prior thread context; no exposure to the ground-truth key. The reader completed Section 5 of the blind packet (the response template) and returned the completed responses, which now live at `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-reader-response_v1.md`.
- **Stage C (this artifact).** Compares the fresh reader's Section 5 responses against the ground-truth key per the rubric the key documents; reports findings; preserves test limits; states Option F's status; preserves held boundaries.

This artifact records the test result. It does not promote any carrier shape to schema, does not author specific carrier-shape design, does not mutate any structural form, and does not authorize subsequent operational tests.

## Test Design Recap

The test pressured six content pieces from the dry-run intake plus four cross-cutting trace dimensions. The dry-run substrate (synthetic kitchen-textiles brand stack with sparse articulation across most input categories) is from [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md). The reconstruction task: given the post-intake IA view (packet + slot + reference records) plus the mocked Option F trace carriers (per-source-layer inspection log + intake decision records), reconstruct intake reasoning without access to the dry-run narrative, prior threads, or the ground-truth key.

Six per-content-piece question sets:

- **Q-1** "everyday households" phrase in `packet.creative_intent`
- **Q-2** "calm, warm-tone, accessible" phrase in `packet.creative_intent`
- **Q-3** four references in `packet.approved_reference_keys`
- **Q-4** `slot.slot_role` = HERO
- **Q-5** `slot.slot_prompt` content
- **Q-6** `packet.business_intent` content

Four cross-cutting questions:

- **Q-C1** which fallback chain layers were inspected
- **Q-C2** inspected-and-absent vs not-inspected distinction (negative-space trace)
- **Q-C3** contradictions surfaced and resolved
- **Q-C4** unreconstructable aspects

Scoring rubric per the ground-truth key: per-question success / partial-success / failure = 1.0 / 0.5 / 0.0. Aggregate thresholds: trace holds ≥ 8.0 of 10.0; trace partially breaks 4.0–7.9; trace breaks < 4.0.

## Reader Response Summary

The fresh reader returned Section 5 with all 10 questions answered (6 per-content-piece sets + 4 cross-cutting). The reader reported high confidence on all six per-content-piece questions. The reader also flagged two substantive carrier-shape observations distinct from the scoring questions: granularity (content-piece-level only, not clause-level) and reference opacity (asset_metadata empty, so reference-selection rationale unreconstructable).

The full reader response is at `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-reader-response_v1.md`. The relevant per-question and reader-notes content is incorporated below for Stage C scoring; the full file remains in scratch as Stage B's record.

## Per-Question Scoring Against Ground-Truth Key

For each question, the reader's answer is scored per the criteria the ground-truth key documents.

| Question | Reader answer (key fields) | Expected (per key) | Score |
|---|---|---|---|
| **Q-1** "everyday households" | source_layer = `brand_platform`; derivation_basis = `lifted-verbatim`; evidence_basis = brand platform audience field "everyday households"; confidence = high | source_layer = `brand_platform`; derivation_basis = `lifted-verbatim`; evidence_basis references brand platform audience field | **SUCCESS** (1.0) |
| **Q-2** "calm, warm-tone, accessible" | source_layer = `asset_library`; derivation_basis = `inferred-from-evidence`; evidence_basis = convergent warm-tone register across REF-KT-001–004; confidence = high | source_layer = `asset_library`; derivation_basis = `inferred-from-evidence`; evidence_basis references asset library convergent tone | **SUCCESS** (1.0) |
| **Q-3** 4 references in `approved_reference_keys` | source_layer = `asset_library`; derivation_basis = `lifted-verbatim`; evidence_basis = the four asset library references REF-KT-001–004; confidence = high | source_layer = `asset_library`; derivation_basis = `lifted-verbatim` | **SUCCESS** (1.0) |
| **Q-4** `slot_role` = HERO | source_layer = `phase_1_worked_example_defaults`; derivation_basis = `worked-example-default`; evidence_basis = SKU-driven mode role inventory (HERO/PROFILE/DETAIL); confidence = high | source_layer = `phase_1_worked_example_defaults`; derivation_basis = `worked-example-default` | **SUCCESS** (1.0) |
| **Q-5** `slot_prompt` content | source_layer = `phase_1_worked_example_defaults`; derivation_basis = `worked-example-default`; evidence_basis = SKU-driven mode hero-slot composition pattern; confidence = high | source_layer = `phase_1_worked_example_defaults`; derivation_basis = `worked-example-default` | **SUCCESS** (1.0) |
| **Q-6** `business_intent` content | source_layer = `none-operator-authored`; derivation_basis = `operator-authored`; evidence_basis = none (operator-authored); confidence = high | source_layer = `none-operator-authored`; derivation_basis = `operator-authored` | **SUCCESS** (1.0) |
| **Q-C1** layers inspected | five layers named (asset_library; photography_style_guide; brand_platform; intra_category_recency_specificity; phase_1_worked_example_defaults); `inferred_not_stated` not in inspected list (correctly addressed in Q-C2) | five inspected layers; `inferred_not_stated` not-inspected explicitly identified | **SUCCESS** (1.0) — the not-inspected status of `inferred_not_stated` is correctly identified in the Q-C2 response (the reader chose to address it in the more-granular Q-C2 rather than duplicate in Q-C1; the test criterion is satisfied across the two responses) |
| **Q-C2** inspected-and-absent vs not-inspected | clean three-way split: inspected-with-content-produced (3 layers); inspected-and-absent (2 layers); not-inspected (1 layer) | three-way split correctly identified | **SUCCESS** (1.0) — this is the negative-space trace dimension PR #250 surfaced; reader recovered the distinction in full |
| **Q-C3** contradictions surfaced | "no" | no contradictions; correct negative finding | **SUCCESS** (1.0) — substrate had no contradictions; reader honestly reported the negative finding |
| **Q-C4** unreconstructable aspects | 9 distinct unreconstructable aspects named (selection rationale; per-reference rationale; actual visual content; brand platform content beyond audience; cross-influence on prose; photography style guide unavailable-vs-unusable; intra-category absent-vs-not-relevant; bounded_creative_discretion derivation; clause-level derivation in prose carriers) | reader identifies ≥ 2 unreconstructable aspects | **SUCCESS** (1.0) — reader exceeded the criterion by identifying ≥ 4 of the key's anticipated aspects plus additional aspects the key did not anticipate (visual content; unavailable-vs-unusable distinction at the layer level; intra-category absent-vs-not-relevant distinction) |

## Aggregate Result + Per-Dimension Breakdown

**Aggregate score: 10.0 / 10.0 = 100%.**

Per the ground-truth key's rubric:

- Trace holds: ≥ 8.0 (≥ 80%)
- Trace partially breaks: 4.0–7.9 (40–79%)
- Trace breaks: < 4.0 (< 40%)

**Result: trace holds.** Option F's mocked-shape carriers shifted the outcome from PR #250's simulated "trace partially breaks" (which pressured the architecture's absence of trace carriers) to "trace holds" (which pressures the architecture's presence of Option F-shaped trace carriers). The shift is the test's intended pressure direction.

### Per-trace-dimension reconstruction performance

| Trace dimension | Coverage in this test | Performance |
|---|---|---|
| **Presence-of-inspection** | Q-C1 + Q-C2 | **SUCCESS.** Reader correctly identified all 6 layer states (5 inspected + 1 not inspected). Option F's inspection log (D component) preserved the dimension structurally. |
| **Articulation-state** | Q-C2 implicit (layer-by-layer state) | **SUCCESS.** Reader correctly distinguished `partial` (asset_library, brand_platform), `absent` (photography_style_guide, intra_category_recency_specificity), `applied` (phase_1_worked_example_defaults), and `not_applicable` (inferred_not_stated). The articulation_state values were recoverable from the inspection log. |
| **Chain-position** | Q-1a through Q-6a aggregated | **SUCCESS.** Six of six source_layer attributions correct, including the critical Q-2 case (attributed to `asset_library` not `brand_platform` — the inference-from-Layer-1-evidence case that pressures the PR #241 distinction). |
| **Derivation-basis** | Q-1b through Q-6b aggregated | **SUCCESS.** Six of six derivation_basis values correct across the five-value vocabulary PR #250 sharpened: `lifted-verbatim` (Q-1, Q-3), `inferred-from-evidence` (Q-2), `worked-example-default` (Q-4, Q-5), `operator-authored` (Q-6). No value confused with another. |
| **Contradiction-resolution** | Q-C3 | **SUCCESS** (but non-pressured). Substrate had no contradictions; reader correctly reported negative. The dimension's reconstructability under contradiction-present substrates is not tested by this test. Held for a future test that pressures the dimension explicitly. |
| **Negative-space trace** (sub-dimension of presence-of-inspection) | Q-C2 | **SUCCESS.** Reader cleanly distinguished inspected-and-absent (2 layers) from not-inspected (1 layer). This is PR #250's surfaced sub-dimension; Option F's inspection log carried the distinction structurally. |
| **Operator-authored vs inferred-not-stated distinction** (PR #241 sub-distinction; PR #250 sharpened) | Q-2b vs Q-6b | **SUCCESS — the critical test point.** Reader correctly attributed Q-2 (the inferred-from-evidence case) and Q-6 (the operator-authored case) to their architecturally-distinct derivation values without confusing them. The architectural distinction is recoverable through Option F's intake decision records, which keep the derivation_basis value explicit per content piece. |
| **Worked-example-default vs operator-authored distinction** (PR #250 sharpened) | Q-4b/Q-5b vs Q-6b | **SUCCESS.** Reader correctly attributed Q-4 + Q-5 (worked-example-default) and Q-6 (operator-authored) to their architecturally-distinct derivation values. Both PR #250-sharpened sub-distinctions are recoverable through Option F's five-value derivation_basis vocabulary. |

Every dimension Option F's carriers were designed to address scored success at this test. The only dimension non-pressured is contradiction-resolution (the substrate had no contradictions); the dimension's reconstructability under contradiction-present substrates is the natural successor test pressure.

## Reader-Flagged Carrier-Shape Observations

Two substantive observations the reader flagged in Section 5's optional notes. These are not failures of the scoring questions; they are scope-of-shape observations about what the mocked Option F carriers do and do not preserve.

### Granularity: content-piece-level, not clause-level

> "The main weakness is granularity. It works at the content-piece level, but not at the clause level. Fields like creative_intent, bounded_creative_discretion, and slot_prompt contain multiple semantic clauses, only some of which are explicitly traceable. That means the carrier can prove the major decision lineage, but not the full prose derivation."

The mocked Option F design uses one intake decision record per *content piece* (e.g., one record for the entire `creative_intent` field's authoring, but Q-1 and Q-2 are about specific phrases *within* `creative_intent`). The current decision records cover Q-1 (one decision = lift "everyday households") and Q-2 (one decision = infer "calm, warm-tone, accessible") as distinct decisions producing distinct phrases in the same prose carrier. That granularity worked for the six test questions because each piece had a distinct decision. But the reader correctly identifies that this approach generalizes only as long as each prose-carrier-internal clause aligns with a distinct intake decision. Where a single intake decision produces multi-clause prose, or where two decisions blend within a single clause, content-piece-level decision records leave the per-clause derivation unreconstructable.

This is a meaningful observation about the mocked shape. PR #252's Section 7 acknowledged the question implicitly via the `resolved_content_piece` dimension being held without specific granularity commitment. The reader's observation surfaces granularity choice as a load-bearing design decision in any specific F-shaped implementation — distinct from Option F's conceptual posture, which is granularity-agnostic.

### Reference opacity: `asset_metadata` empty

> "The packet can reconstruct that REF-KT-001 through REF-KT-004 came from the asset_library, but not why those four were acceptable, what each contributed, or whether any alternatives were rejected. For visual-reference governance, that may be a meaningful gap rather than a cosmetic one."

The mocked Option F design preserved the `reference_assets` records with only the image attachment (the `asset_metadata` field was deliberately empty in the blind reader packet, reflecting the dry-run substrate's state). The reader correctly identifies that reference governance — knowing which references the operator considered, on what axes they evaluated convergence/divergence, whether alternatives were rejected — is uncovered by Option F's two-carrier set. The reference is in the IA via `approved_reference_keys` (decision D3 = lifted-verbatim from asset library); the reasoning behind selecting *those four* references over alternatives is not.

The reader's flagging of this as "may be a meaningful gap rather than a cosmetic one" is the substantive observation. For visual-reference governance use cases (which the architecture's brand-system and governance work pressures), reference opacity could be operationally limiting. Option F's conceptual posture does not preclude extending `asset_metadata` to carry selection rationale (axes-of-convergence notes; rejected-alternatives log); the mocked shape simply did not do so.

### What these observations mean

The two reader observations sit at the carrier-shape design layer, not the Option-F-conceptual layer. Both are honest acknowledgments that the mocked carrier shape (which PR #252 explicitly marked illustrative-only) has specific scope limits. Both would be addressable in a future implementation move:

- Granularity: clause-level decision records or sub-record structure within content-piece-level records
- Reference opacity: extended `asset_metadata` carrying selection rationale, axes-of-convergence/divergence notes, rejected-alternatives reference

Neither observation weakens Option F's conceptual posture. Both extend the surface area of work an eventual carrier-shape design would need to address.

## Option F Status

**Option F is operationally supported by this test.**

The test pressures whether Option F's conceptual posture (hybrid per-source-layer inspection log + intake decision record) enables a fresh non-author reader to reconstruct intake reasoning without operator continuity. The result is unambiguous at this test's scope: trace holds. Every trace dimension Option F's carriers were designed to address scored success. The two PR #241/PR #250-sharpened sub-distinctions (inferred-from-evidence vs operator-authored; worked-example-default vs operator-authored) — which simulated reconstruction in PR #250 demonstrated were uncovered without trace carriers — were recovered cleanly with Option F's mocked carriers in place.

The honest qualifier: this is one test with one reader against one synthetic substrate with one mocked carrier shape. The conceptual posture is supported at this depth. The architecture's commitment to scale beyond operator continuity (per the Scale-of-Operation Held Question's reframe in [`docs/architecture.md`](architecture.md)) is the premise the test reads against; the test's positive result supports the posture as one path to honoring that commitment.

### Where Option F succeeded

- All six per-content-piece reconstruction questions
- All four cross-cutting questions
- Both architecturally-distinct sub-distinctions (inferred-from-evidence vs operator-authored; worked-example-default vs operator-authored)
- Negative-space trace (inspected-and-absent vs not-inspected)
- Articulation-state (per-layer state)
- Reader high confidence on all per-content-piece questions

### Where Option F partially succeeded

None at the per-question level. The reader's confidence was uniformly high; per-question scoring was uniformly success.

### Where Option F still failed

None at the per-question level. The 10/10 aggregate covers every dimension the test pressured.

### Where the mocked shape, not Option F as a concept, may be the issue

Two reader observations sit here, named in detail above:

1. **Granularity:** content-piece-level decision records work for cases where each content piece has a single intake decision behind it; insufficient for prose-rich carriers with multi-clause content where clauses derive from different decisions or blended decisions. The conceptual posture is granularity-agnostic; specific shape design choices about granularity were mocked at content-piece level and that mock has limits.
2. **Reference opacity:** the mocked shape carried `reference_assets` with empty `asset_metadata`. Reference governance — selection rationale, convergence/divergence axes, rejected alternatives — is uncovered. The conceptual posture does not preclude `asset_metadata` extension; the mocked shape simply did not include it.

Both are mocked-shape-level concerns to address in any specific implementation move, not concerns that weaken Option F's conceptual posture.

### Where the test does not pressure

- **Contradiction-resolution dimension.** Substrate has no contradictions across the inspected layers. The reader correctly returned a negative finding for Q-C3. Whether contradiction-resolution remains reconstructable under contradiction-present substrates is the natural successor test direction.
- **Multi-reader / n-reader replication.** This is one reader. A second or third reader against the same blind packet would either confirm the result or surface inter-reader variability. The current test demonstrates one reader's reconstruction succeeded; it does not demonstrate that all qualified readers would succeed.
- **Cross-substrate generalization.** This is the dry-run synthetic stack. The reader's reconstruction success generalizes to similar substrate shapes; whether it holds against substrates with richer / sparser / contradictory / multi-mode content is unpressured.
- **Real implementation.** No carrier-shape design was authored. The mocked shapes are illustrative; specific field types, entity placement, cross-entity relationships, granularity choices, and metadata extensions all remain held design decisions for a future move.
- **Long-context / temporal pressure.** This is a same-session reconstruction. Whether Option F's carriers preserve reconstructability across long time gaps (when context is fully gone) is unpressured.

## Test Limits Preserved

The findings above hold within the test's bounds. The bounds are:

- **One fresh reader.** The reader was genuinely cold (no exposure to the dry-run narrative, prior threads, or the ground-truth key). The test reports one reader's reconstruction performance, not multi-reader validation.
- **Existing dry-run synthetic stack.** The test substrate is the brand intake judgment-trace dry run v1's synthetic kitchen-textiles brand stack — sparse articulation; no past campaigns; no contradictions across the inspected layers. The substrate's limits constrain what dimensions the test could pressure (per Q-C3's non-pressure of contradiction-resolution).
- **Mocked Option F carrier shape.** The blind reader packet carried Option F's conceptual posture as illustrative markdown tables (inspection log + intake decision records). Specific carrier-shape design (field types; entity placement; rollup patterns; granularity decisions) was mocked; specific design moves remain held.
- **No real implementation.** Neither Airtable nor schema nor Pydantic nor JSON Schema nor validator nor orchestration was authored. The test pressured a conceptual posture using illustrative shapes; it did not pressure an implemented carrier set.
- **No held-candidate adjudication.** The five-value `derivation_basis` vocabulary used in the mocked carriers (lifted-verbatim / inferred-from-evidence / worked-example-default / operator-authored / unresolved-marked) carries forward as held conceptual vocabulary; the test does not promote it to a structural field.

Any reading of this artifact that extends the findings beyond these bounds extends them outside the evidence.

## Earned vs Held

What this test earns:

- **Option F's conceptual posture is operationally supported at this depth.** The simulated finding from PR #250 ("trace partially breaks" against no carriers) shifts to "trace holds" against mocked Option F carriers. The trace dimensions Option F was designed to address are reconstructable when the carriers are present.
- **The architecturally-distinct sub-distinctions are recoverable.** Inferred-from-evidence vs operator-authored; worked-example-default vs operator-authored. The PR #241 + PR #250 sharpenings carry through the carriers cleanly.
- **Negative-space trace and articulation-state are recoverable with the inspection log component.** PR #250 surfaced both as currently-uncovered; Option F's D component recovers them.
- **Per-content-piece derivation-basis trace is recoverable with the intake decision record component.** PR #250 demonstrated this dimension's failure under absence of carriers; Option F's E component recovers it.
- **Two carrier-shape design considerations are sharpened.** Granularity (content-piece-level vs clause-level vs sub-clause); reference opacity (asset_metadata content). Both surface as load-bearing in any specific carrier-shape implementation; both extend the surface area of an eventual design move.

What this test does NOT earn:

- **No specific carrier shape is authorized.** The mocked shapes (inspection log table + decision record table) are illustrative; specific entity placement, field types, cross-entity relationships, granularity choices, and metadata extensions remain held design decisions.
- **No schema, JSON Schema, Pydantic, validator, or orchestration is earned.** The test pressures conceptual reconstruction power; it does not pressure implementation form.
- **No structured IA model v3 is authorized.** The structured IA model v2's `held_questions` list still carries `articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log` as held markers; this test sharpens the operational pressure on each but does not promote them to top-level YAML keys.
- **No held-candidate adjudication is authorized.** The held carrier candidates remain held; the test gives them a positive reconstruction signal but does not commit the architecture to encoding any of them.
- **No multi-reader generalization is earned.** The result is single-reader. An n-reader replication would either earn cross-reader generalization or surface reader-specific variability.
- **No cross-substrate generalization is earned.** The substrate is sparse-articulation; results may or may not hold against richer, more contradictory, or multi-mode substrates.
- **No long-context / temporal-pressure generalization is earned.** Same-session reconstruction may or may not generalize to time-displaced reconstruction.

What remains held — unchanged or sharpened by this test:

- **Brand-system carrier decision** (Zone 1B residual question per PR #248). Independent surface; not pressured by this test.
- **Zone 3 / Zone 4 / Zone 5 operational pressure.** Unchanged.
- **Specific F-shaped carrier implementation / field design.** Now operationally supported as a conceptual direction; specific design held.
- **Structured IA model v3 absorption.** Now has stronger operational signal that Option F's carriers could earn structural form; v3 absorption itself remains held pending specific design.
- **Validator integration / orchestration spec.** Unchanged.
- **Architecture front-door wholesale rewrite.** Unchanged.
- **Granularity decision for any specific Option F implementation.** Newly named held question (content-piece-level vs clause-level vs sub-clause).
- **Reference metadata extension / reference governance carriers.** Newly named held question (whether `asset_metadata` extends to carry selection rationale; whether rejected-alternatives gets a structural carrier).

## Relationship to Future Pressure Surfaces

Implications only; no authorization.

- **Multi-reader replication of this test.** An n-reader replication against the same blind packet would either confirm single-reader generalization or surface reader-specific variability. Candidate; not authorized.
- **Contradiction-present substrate test.** A new test against a substrate with source-content contradictions would pressure the contradiction-resolution dimension this test could not pressure. Candidate; not authorized.
- **Cross-substrate test.** Pressure Option F's reconstruction power against substrates with richer / sparser / multi-mode content. Candidate; not authorized.
- **Long-context / temporal-pressure test.** Pressure reconstructability across time gaps. Candidate; not authorized.
- **Specific F-shaped carrier-shape design surface.** Now has stronger operational support to begin (Option F conceptually supported by this test); design decisions (granularity; reference governance metadata; entity placement; cross-entity relationships) are the load-bearing scope. Candidate; not authorized.
- **Structured IA model v3.** Now has stronger operational signal to absorb earned trace carriers if specific carrier-shape design lands. Candidate; not authorized.
- **Granularity-pressure test.** Specifically pressure whether content-piece-level granularity is sufficient or whether clause-level granularity is required. Candidate; not authorized.
- **Reference governance pressure surface.** Specifically pressure whether `asset_metadata` extension is needed for reference-governance use cases. Candidate; not authorized.
- **Architecture front-door wholesale rewrite.** The narrowing this test contributes may eventually inform a rewrite at a future plateau. Not authorized.

The test does not authorize any of the surfaces above. Strategic decision about which surface to pressure next is a fresh ASK move.

## Self-Superseding Clause + Anchor Documents

### Self-Superseding Clause

This artifact is a v1 single-reader test findings document. It should be superseded by:

- A multi-reader replication that pressures cross-reader generalization
- A contradiction-present substrate test that pressures the contradiction-resolution dimension this test could not pressure
- A cross-substrate test that pressures generalization beyond the dry-run synthetic stack
- A long-context / temporal-pressure test that pressures reconstructability across time gaps
- A specific F-shaped carrier-shape design surface that proposes concrete carrier shapes (entity placement; field types; granularity; reference metadata)
- A structured IA model v3 that absorbs earned trace carriers from a specific implementation
- A subsequent operational test that pressures the granularity choice or the reference-governance metadata question the reader surfaced
- A subsequent milestone marker that absorbs Option F's operational support into a plateau
- The eventual rewrite of [`docs/architecture.md`](architecture.md) that consolidates Zone 6 trace-carrier evidence at greater depth

It does not supersede the blind reader packet (Stage A scratch), the ground-truth key (Stage A scratch), the fresh reader's response (Stage B scratch), the intake trace carrier decision surface v1 (PR #252; the surface this test pressures), the Zone 6 continuity-breaking intake trace test v1 (PR #250; the simulated predecessor), the brand-system carrier decision surface v2 (PR #248; located Zone 6 at intake / governance layer), the brand intake judgment-trace dry run v1 (the substrate), structured IA model v2 (the appendix this artifact does not mutate), the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the operator-judgment protocol sketch v1, milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; this artifact reads them at single-reader-operational-test findings depth.

### Anchor Documents

#### Direct operational substrate (Stage A + B scratch artifacts)

- `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-blind-reader-packet_v1.md`: blind reader packet (Stage A); contains post-intake IA view + mocked Option F carriers + reconstruction questions + reader instructions; delivered to the fresh reader without ground-truth key or repo access
- `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-ground-truth-key_v1.md`: ground-truth key (Stage A); contains expected answers per question + dry-run-derived basis + success / partial / failure criteria + aggregate scoring rubric; not delivered to the reader
- `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-16_asset-pipeline-ASK_zone-6-trace-test-reader-response_v1.md`: fresh reader's completed Section 5 (Stage B); the response this artifact scores against the ground-truth key

#### Direct conceptual predecessors

- [`docs/intake-trace-carrier-decision-surface-v1.md`](intake-trace-carrier-decision-surface-v1.md): PR #252 decision surface; identifies Option F as the surviving conceptual posture this test pressures
- [`docs/continuity-breaking-intake-trace-test-v1.md`](continuity-breaking-intake-trace-test-v1.md): PR #250 simulated continuity-break test; the prior pressure surface this real-reader test successors at real-reader depth
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 decision surface; located Zone 6 at the intake / governance layer this test pressures
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): the dry run whose synthetic stack + intake decisions provided the substrate

#### Architectural framing this artifact reads against

- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as the premise this test reads against
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this test sharpens (does not mutate)
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 layered intake architecture; seven-stage extraction sequence the dry-run substrate exercised
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; named the five-or-six-zone framing
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 layered reference and discretion architecture; per-site trace-gap analysis
- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary

#### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau

#### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
