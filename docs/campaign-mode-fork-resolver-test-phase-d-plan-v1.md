# Campaign-Mode Fork-Resolver Test // Phase D Plan v1

## 1. Header / Posture

- **Packet:** `PKT-CAMP-004-KITCHEN_PREP` (`recrqWoGXKEVtnh4I`)
- **Base:** Campaign-Driven D2C Home-Goods v1 (`appCAcRuA82SWj5h5`)
- **Scope:** synthesis of fork-resolver test evidence; recommendation of one of four pre-registered fork resolutions; durable-home decision for the Layer 1 and Layer 2 findings recorded in the Phase C SCS
- **Companion artifacts:** [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md), [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md), [`docs/campaign-mode-fork-resolver-test-phase-c-plan-v1.md`](campaign-mode-fork-resolver-test-phase-c-plan-v1.md), [`docs/campaign-mode-fork-resolver-test-phase-c-scs-v1.md`](campaign-mode-fork-resolver-test-phase-c-scs-v1.md)

This is a durable Phase D plan artifact. It does not authorize synthesis or durable-home actions by itself. The findings artifact will require its own structure approval before drafting.

## 2. Evidence set

Phase D synthesis draws from a bounded evidence set:

- **Phase A pre-registration** — the criterion source. The four resolutions and their pre-registered conditions live here; Phase D measures the test's evidence against those criteria, not against criteria invented at synthesis time.
- **Phase B SCS** — packet, slot, and product creation; preflight deviation and correction; the LIFE_IN_USE prompt-authoring authorship-bearing observation recorded in `slot_evaluation_notes`.
- **Phase C plan** — operational protocol (hard preflight; per-slot generation plan with named drift surfaces; observation frame; curation/provenance plan; hard stop between generation and curation; what is out of scope).
- **Phase C SCS** — preflight finding; generation execution per slot; curation/writeback record; deviations and observations including Layer 1 (prompt-architecture leak) and Layer 2 (AI field-agent grid-packaging artifact); preliminary fork-readable evidence stated as preliminary, not resolution.
- **Live Airtable state** — referenced only where a synthesis claim depends on current rather than recorded state. Default is to rely on the SCS records; live re-query only if a specific claim warrants it.

Nothing outside this evidence set enters Phase D synthesis without explicit justification.

## 3. Fork readout method

The four pre-registered resolutions are evaluated against the evidence, each as a separate match-or-not assessment rather than as a tournament.

- **holds** — the singular curation-seam premise carries: the curation seam is where the bounded creative discretion lives, and Phase C should show curation as the load-bearing site of operator judgment.
- **refines** — the singular curation-seam premise does not hold as stated, but the evidence still forms a coherent layered discretionary chain: upstream authorship-bearing translation/remediation moments shape the candidate set, and curation ratifies or rejects their output.
- **fragments** — authorship-bearing moments appear across multiple seams in a way that cannot be read as one coherent chain flowing toward curation / governance.
- **failure-to-resolve** — evidence is inconclusive or contradictory at the test's scope. Failure-to-resolve is not a weak fallback. It requires naming what evidence was missing or ambiguous and what a more decisive test would need.

### Central test (where the evidence appears ambiguous)

The observed evidence — confirmation-bearing curation across all three slots, with authorship-bearing moments at LIFE_IN_USE prompt-authoring and OBJECT_VIGNETTE prompt-remediation — could fit either `refines` or `fragments`. The central distinction:

> **Refines** if the upstream authored moments flow into curation/governance as a coherent chain.
>
> **Fragments** if those authored moments operate as independent authorship seams that do not resolve into one governance path.

The Layer 2 artifact-recognition moment (operator recognizing the v0 grid as a tooling artifact and revising the slot_prompt) is the hardest test case for the chain reading. It is feedback-loop authorship, not in-band prompt-authoring. Whether that reads as part of the chain or as a separate seam is the central judgment Phase D must record.

### Method discipline

- Each resolution evaluated against the Phase A criteria, in order, with the evidence cited explicitly per criterion.
- The central refines-vs-fragments test gets a dedicated subsection in the findings artifact; the chain test is named and answered, not assumed.
- The synthesis must distinguish what the test evidence supports from what would require additional pressure-testing. Bounded scope (one packet, three slots, single brand context) is named as a scope limit on any conclusion.

## 4. Treatment of upstream authorship

Two upstream authorial moments are recorded in the evidence:

- **LIFE_IN_USE prompt-authoring (Phase B).** Operator chose Option C (reinterpret as "evidence of recent use without active gesture") from three considered paths (Option A: no-hands strict / Option B: explicit-override hand at edge / Option C: reinterpret). The authorial moment is concentrated at the prompt-authoring layer, with the operator selecting among real alternatives whose existence and meaning the inputs did not narrow.
- **OBJECT_VIGNETTE prompt-remediation (Phase C).** Operator recognized the v0 grid as a tooling-layer artifact, traced the cause to enumerative slot_prompt phrasing, and revised the slot_prompt to commit to one subject. The authorial moment is at prompt-remediation, triggered by Layer 2 artifact discovery rather than by a pre-planned authoring step.

Phase D's treatment question: are these two moments at the same architectural layer, or at different layers?

- Same layer: both treat the slot_prompt as the authoring surface; the prompt-authoring vs prompt-remediation distinction is temporal (when in the lifecycle) rather than architectural (where in the pipeline)
- Different layers: prompt-authoring sits in Phase B carrier-state construction; prompt-remediation is feedback-driven response to downstream evidence and lives in a separate "operational recognition" layer

Phase D records which layer-reading the synthesis adopts and what that does to the chain test.

## 5. Treatment of curation evidence

All three Phase C curation events were `curation_pattern = confirmation-bearing` and `discretion_register_observation: configuration-shaped at curation`. This is unambiguous in the evidence. The synthesis must read this against each pre-registered resolution:

- **holds** is falsified in this test's scope — no authorship at the curation seam in any of the three slots
- **refines** is consistent with the curation evidence — curation ratifies upstream-authored material
- **fragments** is consistent with the curation evidence — curation is non-authorial because authorial seams sit elsewhere
- **failure-to-resolve** is consistent if the test's scope (one packet, three slots) is too narrow to distinguish refines from fragments

The synthesis records that `holds` is falsified at this scope and moves to the central refines-vs-fragments distinction.

## 6. Durable-home decision criteria

### Layer 1 — prompt-architecture leak

Phase D evaluates the durable-home options against these criteria:

- **No durable change** — if Phase D reads the leak as a one-off prompt-authoring lesson specific to OBJECT_VIGNETTE's enumerative phrasing, the Phase C SCS record is sufficient
- **Sibling artifact (new doc)** — if the slot-commits-to-one-composition rule earns explicit doctrine treatment as a recurring slot_prompt authoring discipline
- **Sibling artifact or synthesis-carried rule** — if framed as a Layer 1 architectural rule applying broadly to slot_prompt inputs

Synthesis test: does the leak pattern recur across the mode set (SKU-driven, collection, marketing, campaign), or is it specific to enumerative phrasing in a single slot's prompt? Evidence from this test alone does not answer that; the synthesis may earn one of the three options or may explicitly defer.

### Layer 2 — AI field-agent grid-packaging artifact

Phase D should first decide whether the behavior is:

- **a prompt-induced model-output artifact** captured sufficiently in the Phase C SCS — no further durable change earned
- **a recurring Airtable AI field-agent behavior** requiring its own narrow sibling note — distinct from connector limitations, scoped to AI field-agent behaviors
- **a broader Airtable-side tool limitation** — only if additional evidence shows it is not specific to this field-agent / model / prompt combination

The existing [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) is connector / tool-capability scoped; broadening it to cover AI field-agent behaviors would blur categories. Phase D must not pre-commit to that broadening.

### Discipline for both layers

For both Layer 1 and Layer 2: the criteria are tests for the synthesis to apply. The synthesis decides which option each layer earns. The actual durable artifact (if earned) is authored as a separate plan-before-execute step, not produced by Phase D synthesis itself.

## 7. What Phase D will not do

- No schema mutation
- No update to [`docs/structured-ia-model-v1.md`](structured-ia-model-v1.md)
- No amendment to [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md) authored by Phase D synthesis itself
- No `AGENTS.md` rule additions
- No Phase 3 framing unless separately earned (Phase D is bounded to the fork-resolver test's scope)
- No promotion of any fork resolution as architectural doctrine without separate pressure-testing
- No new doctrine artifacts for Layer 1 or Layer 2 authored by Phase D synthesis itself; any earned artifact is a separate plan-before-execute step

## 8. What Phase D will produce

A single repo artifact: `docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`.

Contents required:

- Per-resolution evaluation against the Phase A pre-registered criteria, with evidence citations
- Central refines-vs-fragments test answered (with the chain reading named and applied)
- Recommendation of one of the four resolutions
- Layer 1 durable-home decision (or deferral with reasoning)
- Layer 2 durable-home decision (or deferral with reasoning)
- Explicit statement of what is not resolved by this evidence and what would be needed to resolve it
- Statement that the recommendation is held for further pressure-testing; not architectural doctrine

## 9. Sequencing

1. Phase D plan-before-execute (this artifact) → Two Review Windows → merge
2. Phase D findings artifact structure approval (in-thread plan-before-execute)
3. Phase D findings artifact draft → exact scoped diff review → Two Review Windows → merge
4. Any earned durable artifact (Layer 1 sibling note, Layer 2 sibling note, etc.) is its own plan-before-execute step after Phase D synthesis lands

No auto-chaining between steps.

## 10. Anchor documents

- Phase A pre-registration: [`docs/campaign-mode-fork-resolver-test-setup-v1.md`](campaign-mode-fork-resolver-test-setup-v1.md)
- Phase B SCS: [`docs/campaign-mode-fork-resolver-test-phase-b-scs-v1.md`](campaign-mode-fork-resolver-test-phase-b-scs-v1.md)
- Phase C plan: [`docs/campaign-mode-fork-resolver-test-phase-c-plan-v1.md`](campaign-mode-fork-resolver-test-phase-c-plan-v1.md)
- Phase C SCS: [`docs/campaign-mode-fork-resolver-test-phase-c-scs-v1.md`](campaign-mode-fork-resolver-test-phase-c-scs-v1.md)
- Architecture § Held Questions § Curation-Premise Architectural Fork: [`docs/architecture.md`](architecture.md)
- Operator-judgment protocol sketch: [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md)
- Visual-identity-system → IA mapping: [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md)
- Airtable connector limitations (referenced, not amended): [`docs/airtable-connector-tool-capability-limitations-v1.md`](airtable-connector-tool-capability-limitations-v1.md)
- Grounding-note v55 (ex-repo, source-of-intent): §Prototype-Aesthetic Imagery Workflow + §Capture as selection
- Live prototype base: [Campaign-Driven D2C Home-Goods v1](https://airtable.com/appCAcRuA82SWj5h5)
