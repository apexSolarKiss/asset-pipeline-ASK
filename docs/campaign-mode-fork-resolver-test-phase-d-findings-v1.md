# Campaign-Mode Fork-Resolver Test // Phase D Findings v1

## 1. Posture — findings, not doctrine

Phase D synthesis of the campaign-mode fork-resolver test's evidence; a recommended fork readout; durable-home decisions for the Layer 1 and Layer 2 findings recorded in the Phase C SCS.

This artifact is **not** architectural doctrine, not pressure-tested beyond this single test (one packet, three slots, single brand context, single mode), not a Phase 3 framing, and not authorization for any new doctrine artifact. The recommendation is held for further pressure-testing.

- **Packet:** `PKT-CAMP-004-KITCHEN_PREP` (`recrqWoGXKEVtnh4I`)
- **Base:** Campaign-Driven D2C Home-Goods v1 (`appCAcRuA82SWj5h5`)
- **Companion artifacts:** Phase A pre-registration, Phase B SCS, Phase C plan, Phase C SCS, Phase D plan (see §10)

## 2. Evidence set actually used

- **Phase A pre-registration** ([`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)) — the source of the four resolution criteria
- **Phase B SCS** ([`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md)) — packet/slot/product/reference creation; preflight deviation and correction; the LIFE_IN_USE authorship-bearing PROTOCOL_RECORD in `slot_evaluation_notes`
- **Phase C plan** ([`docs/campaign-mode-fork-resolver-test-phase-c-plan-v1.md`](campaign-mode-fork-resolver-test-phase-c-plan-v1.md)) — operational protocol
- **Phase C SCS** ([`docs/campaign-mode-fork-resolver-test-phase-c-scs-v1.md`](campaign-mode-fork-resolver-test-phase-c-scs-v1.md)) — preflight finding (§2); generation execution (§3); curation/writeback (§4); deviations and observations including Layer 1 and Layer 2 (§5); preliminary fork evidence (§6)
- **Phase D plan** ([`docs/campaign-mode-fork-resolver-test-phase-d-plan-v1.md`](campaign-mode-fork-resolver-test-phase-d-plan-v1.md)) — synthesis method and the central chain test

Live Airtable state was not re-queried for this synthesis; all claims resolve to the SCS records. The three `generated_assets` rows (`ASSET-CAMP-004-HERO_WORLD-001`, `ASSET-CAMP-004-LIFE_IN_USE-001`, `ASSET-CAMP-004-OBJECT_VIGNETTE-001`) and the packet `governed_output_count = 3` are referenced as recorded in the Phase C SCS §4.

Nothing outside this evidence set entered the synthesis.

## 3. Per-resolution evaluation

Each resolution evaluated against its Phase A criterion, as a separate match-or-not assessment.

### 3.1 `holds`

**Criterion:** curation carried the load-bearing bounded creative discretion in this test's scope.

**Evidence:** Phase C SCS §4 records `curation_pattern = confirmation-bearing` on all three `generated_assets` rows; Phase C SCS §6 records `discretion_register_observation: configuration-shaped at curation` for all three slots. The Phase B PROTOCOL_RECORD for LIFE_IN_USE expected the premise-holds reading to require entirely configuration-shaped Phase B authorship, and explicitly observed that the prompt-authoring moment for LIFE_IN_USE was not configuration-shaped — it was authorship-bearing (Phase B SCS §6).

**Status:** **Falsified at this scope.** The curation seam did not carry authorship in any of the three slots. Real authorial moments existed in the test arc but surfaced at prompt-authoring (LIFE_IN_USE) and prompt-remediation (OBJECT_VIGNETTE), not at curation.

### 3.2 `refines`

**Criterion:** the singular curation-seam premise does not hold as stated, but the evidence still forms a coherent layered discretionary chain — upstream authorship-bearing translation/remediation moments shape the candidate set, and curation ratifies or rejects their output.

**Evidence:**

- LIFE_IN_USE: Phase B authorship-bearing prompt decision (reinterpret as evidence-of-use; three considered paths recorded in Phase B PROTOCOL_RECORD) → Phase C single candidate from Path A field-agent matches the authored framing (Phase C SCS §3) → Phase C curation ratifies (Phase C SCS §4, `source_attachment_id = attjh0vniPAE7dx6X`)
- OBJECT_VIGNETTE: Phase C operational authorship at prompt-remediation (operator recognized v0 grid as Layer 2 tooling artifact, traced to Layer 1 enumerative phrasing, revised slot_prompt) → Phase C re-run single candidate v1 matches the committed-composition prompt → Phase C curation ratifies v1 and explicitly excludes v0 (Phase C SCS §4, `source_attachment_id = attMQDGMhrOGNuJiZ`; v0 `attqTOa50gBYbf7kJ` held alongside as non-curatable evidence)
- HERO_WORLD: no upstream authorship-bearing observation; Phase B prompt-authoring was configuration-shaped; Phase C curation ratified mechanically. The chain reading does not require authorship at every slot; it requires that when upstream authorship occurs, it flows into curation as a single resolution.

**Status:** **Consistent.** The chain reading is the load-bearing claim and is tested in §4 explicitly.

### 3.3 `fragments`

**Criterion:** authorship-bearing moments appear across multiple seams in a way that cannot be read as one coherent chain flowing toward curation / governance.

**Evidence:** the two upstream authorial moments in this test (LIFE_IN_USE prompt-authoring; OBJECT_VIGNETTE prompt-remediation) sit at different lifecycle points but on related architectural surfaces (both treat `output_slots.slot_prompt` as the carrier of authorial intent that the downstream pipeline consumes). Each upstream moment has a single, traceable downstream resolution at the curation event for that slot. No evidence of authorial moments that did not flow into the slot's curation event.

**Status:** **Not supported by this test's evidence at the chain-test threshold defined in §4.** The fragments reading would require an authorial moment that does not resolve into the slot's curation event, or multiple independent seams whose discretion cannot be traced through to one governance path. Neither condition is satisfied by this evidence.

### 3.4 `failure-to-resolve`

**Criterion:** evidence is inconclusive or contradictory at the test's scope; the synthesis cannot defend a bounded read, and must name what evidence was missing or ambiguous and what a more decisive test would need.

**Evidence:** the test's scope is bounded — one packet, three slots, single brand context, single mode. The chain test in §4 can be defended from this evidence, but the defense is genuinely bounded: a second packet might surface an authorial moment that does not flow into curation, which would weaken the refines reading. The bounded-scope concern is real and is recorded in §9.

**Status:** Live, but **not selected**. The chain test can be defended from this evidence (see §4); the bounded-scope concern is preserved in §9 as a named falsification path. Failure-to-resolve would have been the correct call if §4's chain test could not be defended at all from one packet; it can.

## 4. Central refines-vs-fragments chain test

This is the load-bearing judgment of this artifact.

**Two readings as testable claims:**

- **Chain reading:** the upstream authored moments (LIFE_IN_USE prompt-authoring; OBJECT_VIGNETTE prompt-remediation) each have a single, traceable resolution at the curation event for that slot. Authorship surfaces upstream; curation ratifies. The pipeline reads as one coherent path with discretion at multiple layers, all resolving into one governance point.
- **Independent-seams reading:** the upstream authored moments are seams of their own that do not resolve into one governance path. Curation is non-authorial because the actual authorial work is happening at multiple uncoordinated sites.

**Hardest test case:** the Layer 2 artifact-recognition moment in OBJECT_VIGNETTE. The operator recognized the v0 grid as a tooling-layer artifact and revised the slot_prompt. This is feedback-loop authorship, not in-band prompt-authoring. Whether it reads as part of the chain or as a separate seam is the central judgment.

**Argument for the chain reading at OBJECT_VIGNETTE:** the artifact-recognition moment was about correcting the tooling-layer expression of authorial intent (the slot_prompt). The same operational moment that recognized v0 as artifact also revised the prompt and held v0 as evidence rather than candidate. These are facets of one authorial recognition, not two seams. The downstream curation event then ratifies the corrected candidate. The chain holds.

**Argument against the chain reading at OBJECT_VIGNETTE:** the v0 grid is in `slot_generated_image_v1` as a real attachment alongside v1; the synthesis cannot pretend it doesn't exist. Excluding it from curation is a second authorial move sitting between upstream prompt-remediation and curation, suggesting more than one seam.

**Answer:** the chain reading holds. The v0/v1 distinction is downstream consequence of one operational recognition, not a separate seam. The chain at OBJECT_VIGNETTE reads:

> Layer 2 artifact recognition → Layer 1 prompt remediation → corrected slot_prompt → v1 candidate → curation ratifies v1 → governance.

v0 is held alongside as evidence of the Layer 2 finding (Phase C SCS §5 Layer 2), not as a competing creative candidate; its exclusion from curation is part of the same operational recognition, not an independent seam.

**For LIFE_IN_USE**, the chain holds cleanly: prompt-authoring decision → candidate generation → curation ratification.

**For HERO_WORLD**, no upstream authorship; the entire path was configuration-shaped from prompt-authoring through curation. HERO_WORLD doesn't test the chain in either direction — it tests what happens when no upstream authorship occurs (which is: configuration-shaped curation ratifying configuration-shaped generation, with no chain to evaluate).

**Bounded-scope acknowledgment:** the chain test is answered from one packet's evidence. A second packet could surface an upstream authorial moment that does not flow into curation (e.g., authorship at constraint composition that bypasses the slot_prompt entirely). That would weaken the refines reading. The bounded-scope concern is preserved in §9 as a named falsification path.

## 5. Treatment of upstream authorship moments

Two authorial moments, two questions: are they at the same architectural layer, and how do they relate to the chain?

**LIFE_IN_USE prompt-authoring (Phase B).** Authorial moment at `output_slots.slot_prompt` authoring time. Three considered alternatives recorded (Option A: no-hands strict; Option B: explicit-override hand at edge; Option C: reinterpret as evidence-of-use). Operator chose Option C. The authorship is concentrated at the prompt-as-input layer.

**OBJECT_VIGNETTE prompt-remediation (Phase C).** Authorial moment also at `output_slots.slot_prompt`, but triggered by downstream tooling-layer evidence (v0 grid). The operator recognized the Layer 2 artifact, traced the cause to Layer 1 enumerative phrasing, and revised the prompt to commit to one composition.

**Layer-reading question:** are these at the same architectural layer (slot_prompt-as-authoring-surface, with the prompt-authoring vs prompt-remediation distinction merely temporal — when in the lifecycle), or at different architectural layers (in-band prompt-authoring vs feedback-driven operational-recognition layer)?

**Answer:** the synthesis adopts the **same-layer reading**. Both moments treat the slot_prompt as the carrier of authorial intent that the downstream pipeline consumes. The prompt-remediation moment is temporally downstream of prompt-authoring but architecturally on the same surface — it edits the same field that the original authoring populated. The Layer 2 artifact triggered the moment, but the moment itself resolved into a revision of the same authoring surface.

This same-layer reading is what makes the chain test answerable. If the two moments sat at different architectural layers, the chain reading would be harder to defend.

## 6. Treatment of confirmation-bearing curation evidence

All three Phase C curation events were `curation_pattern = confirmation-bearing` (per the §7.2 binary enum) and `discretion_register_observation: configuration-shaped at curation` (per the §6 three-value framing). Unambiguous in the evidence.

**This falsifies `holds` at this scope** — no authorship at the curation seam in any of the three slots.

**This is consistent with `refines`** — curation ratifies upstream-authored material; the absence of authorship at curation is what the chain reading expects when authorship has surfaced upstream.

**This is also consistent with `fragments`** — curation would be non-authorial if the authorial work were happening at uncoordinated sites that don't flow into governance. The chain test in §4 is what distinguishes refines from fragments here, not the curation evidence alone.

**This is consistent with `failure-to-resolve`** if the chain test cannot be defended; the chain test can be defended (see §4), so this resolution is not selected.

## Decision posture

The findings artifact may recommend `refines`, `fragments`, or `failure-to-resolve`; it should not soften the recommendation merely to avoid choosing. If the evidence supports a bounded read, name it. If it does not, name precisely what is missing.

The evidence in this test supports `refines` as a bounded read. The synthesis recommends it explicitly in §7 with the scope limits named in §9.

## 7. Recommended fork readout

**Recommendation: `refines`.**

The singular curation-seam premise does not hold as stated. The evidence in this test forms a coherent layered discretionary chain: upstream authorship-bearing moments (at LIFE_IN_USE prompt-authoring and OBJECT_VIGNETTE prompt-remediation) shape the candidate set; downstream curation ratifies. The chain test in §4 is answered for both slots that have upstream authorial moments; HERO_WORLD doesn't test the chain in either direction (no upstream authorship to chain).

**Load-bearing pieces of evidence:**

- LIFE_IN_USE Phase B authorship-bearing PROTOCOL_RECORD + Phase C confirmation-bearing curation that ratified the authored framing
- OBJECT_VIGNETTE Phase C prompt-remediation + Phase C confirmation-bearing curation on v1 (with v0 held as non-curatable evidence per the same operational moment)
- All three Phase C curation events configuration-shaped, falsifying `holds` at this scope
- §4's same-layer reading of the two authorial moments, which makes the chain test answerable from this evidence

**This is a bounded read.** It is the honest synthesis of one packet's evidence; it is not architectural doctrine. The recommendation is held for further pressure-testing.

## 8. Durable-home decisions

### Layer 1 — prompt-architecture leak

**Decision: defer durable-home action.**

The Phase C SCS §5 capture is the current durable record. The slot-commits-to-one-composition rule has not yet earned sibling-artifact or synthesis-carried-rule status from one packet's evidence. The leak pattern is observed once, in one slot, with one specific phrasing failure mode (enumerative subject list).

**Conditions for promotion (future Phase D-adjacent work):**

- If the leak pattern recurs across the mode set (SKU-driven, collection, marketing, campaign) → may earn a synthesis-carried rule in the structured IA model or its operational documentation, subject to a separate plan-before-execute step
- If a second occurrence appears in any mode with phrasing that is not visibly enumerative → earn a sibling artifact (slot_prompt authoring discipline note)

Until then, the Phase C SCS record is sufficient.

### Layer 2 — AI field-agent grid-packaging artifact

**Decision: no further durable change earned at this time.**

The Phase C SCS §5 Layer 2 capture is sufficient. The behavior in this test was prompt-induced; prompt remediation closed the trigger; the v0 grid is preserved as durable evidence. Without further occurrences, the connector limitations doc should not be broadened, and a new sibling note for AI field-agent behaviors is not earned from one observation.

**Conditions for promotion:**

- If the grid-packaging behavior recurs on a non-enumerative prompt (one that does not list alternatives) → earn a narrow sibling note scoped to AI field-agent behaviors, distinct from connector limitations
- If multiple Airtable-side AI tooling behaviors accumulate as a category → consider a separate AI-field-agent limitations document (not an amendment to the connector doc)

The connector limitations doc remains scoped to connector / tool-capability concerns and is not broadened by this finding.

## 9. What remains unresolved

**Scope-bound limits of this synthesis:**

- Single packet (`PKT-CAMP-004-KITCHEN_PREP`) in a single base; single brand context; single mode (campaign)
- Three slots; no cross-mode pressure within the test
- Single Path (A); no Path B comparison
- Single Run agent invocation per slot (with one re-run on OBJECT_VIGNETTE); no candidate-pool-of-N curation event tested at this volume

**Named falsification paths for the `refines` recommendation:**

- A packet where authorship clearly surfaces at curation (curator selecting from a genuinely open candidate space, not ratifying a near-default) — would weaken refines in favor of either `holds` or `fragments`
- A packet where upstream authored moments occur but do not flow into the slot's curation event (e.g., authorship at constraint composition that bypasses slot_prompt and is consumed only by a non-curation governance step) — would weaken refines in favor of `fragments`
- A packet where Path A's grid-packaging behavior recurs on a non-enumerative prompt — would force the Layer 2 durable-home decision to be revisited

**What further pressure would sharpen the readout:**

- A second campaign-mode packet under different content (non-kitchen-prep) to test whether the chain holds under different subject matter
- A cross-mode test against SKU-driven, collection, or marketing modes to test whether the chain reading generalizes
- A Path B (Flow / Nano Banana Pro) comparison to test whether tool-layer behavior is what produced the configuration-shaped curation, vs the chain reading being independent of tool path
- An intentional cross-brand-system packet to test the chain under heterogeneous brand inputs

These are not next-step commitments; they are named tests that, if run, would resolve the bounded-scope concerns recorded above.

## 10. Anchor documents

- Phase A pre-registration: [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)
- Phase B SCS: [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md)
- Phase C plan: [`docs/campaign-mode-fork-resolver-test-phase-c-plan-v1.md`](campaign-mode-fork-resolver-test-phase-c-plan-v1.md)
- Phase C SCS: [`docs/campaign-mode-fork-resolver-test-phase-c-scs-v1.md`](campaign-mode-fork-resolver-test-phase-c-scs-v1.md)
- Phase D plan: [`docs/campaign-mode-fork-resolver-test-phase-d-plan-v1.md`](campaign-mode-fork-resolver-test-phase-d-plan-v1.md)
- Architecture § Held Questions § Curation-Premise Architectural Fork: [`docs/architecture.md`](architecture.md)
- Operator-judgment protocol sketch: [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md)
- Visual-identity-system → IA mapping: [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)
- Airtable connector limitations (referenced, not amended): [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md)
- Grounding-note v55 (ex-repo, source-of-intent): §Prototype-Aesthetic Imagery Workflow + §Capture as selection
- Live prototype base: [Campaign-Driven D2C Home-Goods v1](https://airtable.com/appCAcRuA82SWj5h5)
