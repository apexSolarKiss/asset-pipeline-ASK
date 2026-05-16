# Brand-System Carrier Decision Surface v2

## Posture

```text
decision-surface successor (v2) to docs/brand-system-hybrid-carrier-decision-surface-v1.md
conceptual IA
milestone-10 / structured-IA-v2 depth
not schema
not Airtable
not validator integration
not Pydantic
not orchestration spec
not structured IA v3 (does not mutate v2)
not milestone
not implementation plan
not held-candidate adjudication map
not architecture front-door rewrite
not README / index update in this PR
not grounding-note edit
not operational test authorization
not a final structural decision
does not commit the architecture to any carrier shape
self-superseding when operational pressure or a subsequent decision surface absorbs it
```

This artifact is v2 of the brand-system carrier decision surface. It supersedes v1 ([`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md)) at the carrier-decision-surface layer while preserving v1 as historical record. v1 was authored at four-of-six Phase 2 deepening depth and pre-PR-#244 cross-category synthesis; v2 reads against the milestone-10 plateau (PR #245) and the structured IA model v2 (PR #246) as the current substrate.

The v2 question: given the completed six-category synthesis and structured IA model v2, what carrier posture can the architecture honestly take for the brand-system layer now? The artifact does not assume the answer is full carrier commitment. It decides, narrows, or explicitly holds each zone of the five-or-six-zone hybrid implication PR #244 sharpened.

## What This Artifact Attempts

v1's decision surface was authored at a substrate that has since shifted in three load-bearing ways:

1. **Phase 2 input-category deepening completed.** v1 worked at four-of-six (photography style guide; asset library; brand platform; visual identity system). PR #242 + PR #243 added application guidelines and past campaigns. The sixth-category set is now complete at deepening depth.
2. **Cross-category synthesis (PR #244) reframed the hybrid implication.** v1's "if hybrid is the surviving shape, the surface implies three zones" became PR #244's "five or six zones" — a sharper read, but also one that conflated brand-system-layer carriers with adjacent-layer questions that share the brand-system layer's space without being its carriers.
3. **Structured IA model v2 (PR #246) enumerated stable vocabulary.** v2's 17-key YAML appendix encodes the normative-force vocabulary, reference-function taxonomy, discretion decomposition, extraction sequence, category function classification, cross-category relations, and trace dimensions that the brand-system carrier decision now reads against.

Given that substrate, the question is no longer "is hybrid likely?" (v1's question, answered with "hybrid is most likely on current evidence; no shape carries the criterion set cleanly"). The question is **zone-by-zone carrier posture**, plus a logically prior question v1 could not yet ask: **which of the zones in the five-or-six-zone implication are actually brand-system-layer carrier questions, and which are adjacent-layer questions that interact with brand-system content but live elsewhere in the architecture?**

The artifact's analytical move: pressure each zone individually, name its decision posture, and surface (per ASK's section-6 prompts) which zones are properly brand-system-layer carriers versus which belong at packet/slot, governed-asset/reference, or trace/governance layers. The brand-system structural decision then narrows substantially — without resolving the residual open questions.

## Prior Decision Surface Recap

v1 tested three live shapes from milestone 9 against the Phase 1 force-kind criterion set on four-of-six Phase 2 deepenings plus the sparse-articulation fallback pressure conditions:

- **Shape A — First-class structural carriers throughout.** Every input category lands in dedicated structural carriers; operator judgment is bounded to filling structural fields per intake protocol.
- **Shape B — Terminal operator-mediated translation.** The IA explicitly accepts prose + operator judgment as the resolution path for all upstream normative content; structural carriers serve packet-and-below, not brand-system content.
- **Shape C — Hybrid.** Structural carriers for stable brand-wide constants; operator-mediated judgment for abstraction, conflict, sparsity, override, and application.

v1's read: **no single shape carries the criterion set cleanly.** Shape A breaks under sparse / contradictory / divergent articulation; Shape B under-uses naturally structural content (logo references; color codes; approved reference assets); Shape C carries articulated content cleanly *and* handles stress conditions gracefully — but inherits Shape B's intake-time judgment-trace gap that has no current carrier.

v1's posture: hybrid most likely, but uncommitted. Three-zone implication if hybrid is the surviving shape: (1) stable brand-wide constants + approved references → structural carriers; (2) prose-rich directive content → operator-mediated translation; (3) intake-time judgment trace → currently uncovered.

What v1 could not yet know:

- v1 worked at four-of-six deepening depth. Application guidelines and past campaigns deepenings (PR #242 + #243) have since added two more angles of pressure that v1 could not factor in.
- v1 did not yet have the cross-category synthesis (PR #244) that lifted the per-category content into a relational view across the six categories and identified the four-bucket function classification (evidence / articulation / application / validation).
- v1 did not have structured IA model v2's stable enumeration as a substrate to read against — the carrier decision was discussed against an evidence base that did not yet have a structured-form companion.
- v1's three-zone implication did not yet anticipate that the Phase 2 completion arc would surface additional zones (per-touchpoint constraint representation; governed-output continuity; temporal-state trace) that the cross-category synthesis would ultimately fold into a five-or-six-zone framing.

The five-or-six-zone framing is what this v2 reads against.

## Five-or-Six-Zone Pressure Table

PR #244's cross-category synthesis sharpened v1's three-zone implication into a five-or-six-zone implication. Each zone is pressured below across eight columns. The table is a comparison surface; per-zone decision posture follows in Section 5; cross-zone implications and proper-layer-location questions follow in Section 6.

| Zone | Content | Source categories | Force type | Current carrier behavior | Evidence depth | Structural risk | Prose / operator-mediated risk |
|---|---|---|---|---|---|---|---|
| **1. Stable brand-wide constants + approved references** | Logo references; color codes; typography assignments; grid systems; iconography; motion principles; approved reference imagery from asset library; brand-wide style constants from photography style guide | VIS (constants); asset library (approved references); photography style guide (brand-wide constants) | Descriptive + reference | **PARTIAL.** `reference_assets` carries approved imagery + supports cross-packet reuse via lookup chain. Brand-wide constants beyond approved references (color codes; typeface names; logo files as URLs) have no first-class home; live in operator-side practice + external VIS docs surfaced via prose | Operationally well-tested for approved references via `reference_assets` across SKU + collection mode (REF-002 cross-packet reuse). Brand-wide constants beyond approved references operationally untested | **LOW** for approved references (already structurally carried). **MEDIUM** for brand-wide constants (a `brand_constants` carrier would risk premature schema if encoded before operational pressure surfaces a need; cross-brand vocabulary unification not earned) | **HIGH** for brand-wide constants beyond approved references (operator continuity is currently load-bearing for ensuring the right typography / color / logo file is applied per packet; cross-packet repetition has no audit) |
| **2. Prose / operator-mediated translation for abstraction and articulated conventions** | Brand platform abstractions (values; voice; stance; audience; promise; authority; narrative themes; exclusion boundaries); photography style guide articulated conventions; VIS applied conventions (the "how to apply the constants" layer) | Brand platform; photography style guide; VIS (applied conventions only) | Directive + descriptive | **ENTIRELY prose-carried** downstream into `creative_intent`, `bounded_creative_discretion`, `slot_prompt`, `capture_reason`, `capture_notes`. No structural carrier exists; brand-platform deepening explicitly held this content as prose-distributed | Operationally well-tested across SKU + collection mode + bounded campaign at PKT-CAMP-004; prose discipline carries | **HIGH.** Encoding brand-platform abstractions structurally would commit to representations the architecture has not pressured (per-brand vocabulary differs; sparse articulation collapses to empty fields without graceful fallback) | **ACCEPTABLE at current scale.** Operator continuity bridges; PR #241 named this as the architecture's normal-case zone (Stage 3 // Abstraction → prose carriers downstream) |
| **3. Per-touchpoint and per-mode constraint structural representation** | Aspect ratios per touchpoint; copy-overlay tolerance per touchpoint; attention-budget assumptions per touchpoint; brand-identifier presence rules per touchpoint; per-touchpoint approval rules; per-mode constraint conventions | Application guidelines (primary); past campaigns (validation) | Constraint + directive | **Prose-carried** in `slot_prompt` + `constraint_rules`. Aspect-ratio-as-attribute and per-touchpoint approval-rule held candidates paper-pressed; not earned | Marketing-mode at structural-proof depth only (PKT-MSG-001 cycle 1); cross-touchpoint operational pressure unearned across all four modes | **MEDIUM.** Paper-pressed candidates exist per the application-guidelines deepening; operational pressure on marketing-mode full-flow with application-guidelines-shaped intake content would likely earn aspect-ratio-as-attribute | **HIGH for cross-touchpoint scale** (operator must remember per-touchpoint constraints across packets without structural enforcement) |
| **4. Governed-output continuity reference elevation** | Past-campaign governed assets reused as references for derivative packets; reuse / derivative governance rules; cross-packet continuity-reference lineage | Past campaigns (primary); application guidelines (reuse rules where articulated) | Reference (governed-output as upstream descriptive anchor) + governance (derivative authority) | `reference_assets` flat-linkage works for any approved asset including past-campaign output. **No carrier distinguishes** "governed-output reused as reference" from "approved imagery as reference"; reuse / derivative governance question held across all four modes per the apex artifact | Cross-packet reference reuse demonstrated operationally (REF-002 across PKT-SKU-009 / PKT-SKU-010 / PKT-COLL-001) but not specifically as past-campaign governed-output continuity at full-flow depth | **LOW–MEDIUM.** A `derivative_governance` or `continuity_reference_lineage` field would be speculative at current evidence depth | **MEDIUM at scale.** Without trace, downstream readers cannot reconstruct which references are derivative reuse vs originally approved |
| **5. Temporal-state trace dimension** | Current vs historical vs superseded classification per past-campaign content piece (and potentially per any input category that evolves over time) | Past campaigns (primary; the dimension is past-campaigns-specific in current evidence) | Judgment (operator classifies temporal state) + reference (the classified content surfaces as reference) | **ENTIRELY operator-continuous.** No carrier; PR #243 surfaced `temporal_state` as a candidate sixth trace dimension distinct from the five PR #241 dry run named | Untested operationally; past-campaigns deepening surfaced the candidate from cross-time pressure | **MEDIUM.** A `temporal_state` field on `reference_assets` is paper-pressed; encoding without operational evidence would commit to a specific temporal-classification vocabulary | **HIGH for cross-time scale.** Operator memory of which campaigns are current vs superseded breaks under multi-operator continuity |
| **6. Intake-time judgment trace zone** | Presence-of-inspection per intake layer; articulation-state per intake layer; chain-position per piece of resolved content; derivation-basis per piece of resolved content; contradiction-resolution at conflict points; (PR #241's operator-authored vs inferred-not-stated distinction sub-classification) | Applies across all six brand-system input categories at intake time | Judgment + governance | **ENTIRELY operator-continuous.** Held candidates surfaced (`articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`); v1 named this as the third zone with no current carrier; PR #241 dry run pressured but did not earn | Untested under multi-operator scale. Continuity-break test would pressure | **MEDIUM–HIGH.** Encoding now without operational evidence would commit to a specific trace shape | **HIGH for multi-operator scale** (the conditional pressure path PR #241 named is bound to a scale condition untested) |

## Decision Posture by Zone

Each zone gets one of the following labels per ASK's section-5 spec:

- **STRUCTURALLY EARNED** — operational evidence + existing carriers support; no decision needed beyond preserving current behavior
- **STRUCTURALLY SUGGESTED BUT HELD** — paper-pressed; operational pressure would earn or deflate
- **PROSE / OPERATOR-MEDIATED AT CURRENT DEPTH** — explicitly not structural; this is the architecture's deliberate choice, not deferred
- **OPERATIONAL PRESSURE REQUIRED** — cannot be decided from current substrate; named operational test is the path to earn or deflate
- **EXPLICITLY NOT STRUCTURAL (BELONGS ELSEWHERE)** — the carrier question is real but does not properly live at the brand-system layer; reroutes to its proper architectural location

### Zone 1 — Stable brand-wide constants + approved references

**Posture: SPLIT.** Two distinct sub-zones with different decision postures.

- **Approved reference imagery: STRUCTURALLY EARNED.** The asset library content (per the asset-library deepening: "the input category most directly served by existing structural carriers") flows into `reference_assets` + lookup chain + `asset_attachment` cleanly. Operationally tested across SKU + collection mode. No structural decision pending; the carrier already exists. v1's Shape A is already operative for this sub-zone, and has been since before milestone 8.
- **Brand-wide constants beyond approved references (color codes; typeface assignments; logo files as URLs; grid systems): STRUCTURALLY SUGGESTED BUT HELD.** A `brand_constants` carrier or per-constant-type structural fields are paper-pressed. Operational pressure that would earn the carrier: a real or simulated brand-deployment test where cross-packet repetition of constants without structural enforcement breaks coordination at scale. None earned. Prose / operator-side carrying continues at current evidence depth.

The two sub-zones have substantively different decision postures and should not be conflated. v1's Shape C ("structural carriers for stable brand-wide constants") was correct in *direction* for the second sub-zone but treated both sub-zones as one. v2 separates them.

### Zone 2 — Prose / operator-mediated translation for abstraction and articulated conventions

**Posture: PROSE / OPERATOR-MEDIATED AT CURRENT DEPTH.**

This is not a deferred decision. It is the architecture's deliberate choice, named explicitly by the brand-platform deepening (the "most likely to be ghostwritten or aspirational" observation), the photography style guide deepening (articulated conventions distribute via prose downstream), and PR #244's category function classification (the three articulation-shaped categories — brand platform, VIS applied conventions, photography style guide — feed Stage 3 // Abstraction whose downstream landing is prose carriers per PR #241's extraction sequence).

Operational evidence at SKU + collection mode + PKT-CAMP-004 supports prose discipline carrying this content cleanly under one-operator continuous-context scale. Encoding structurally would commit to a per-brand vocabulary the architecture has not pressured cross-brand (a brand's "warm but not sentimental" voice attribute does not unify with another brand's "approachable" without structural assertion the architecture has no evidence for).

The only condition under which Zone 2's posture would change: scale-of-operation pressure that breaks operator continuity for prose-rich content specifically. Even then, the structural form would more likely be **trace** (Zone 6's carriers) than **content carriers** for the abstractions themselves. Zone 2's content stays prose; what could become structural is the trace of how prose was produced.

### Zone 3 — Per-touchpoint and per-mode constraint structural representation

**Posture: OPERATIONAL PRESSURE REQUIRED + PROBABLY NOT BRAND-SYSTEM LAYER.**

Two interlocked observations:

- **Operational pressure required.** Aspect-ratio-as-attribute and per-touchpoint approval-rule candidates are paper-pressed in the application-guidelines deepening. The cleanest single operational test that would pressure these (per PR #244 + this artifact's Section 8) is marketing-mode full-flow with application-guidelines-shaped intake content. Until that test runs, the carriers remain paper-pressed. Prose discipline at packet + slot carries the content under current evidence depth.
- **Probably not brand-system layer.** Aspect-ratio-as-attribute, copy-overlay tolerance, and per-touchpoint approval rules are properties OF the slot or packet, not of the brand-system layer. The brand-system informs the constraints (application guidelines articulate them; brand platform shapes authority posture) but the carriers — if earned — would live ON the slot (`aspect_ratio` field on `output_slots`) or ON the packet (`per_touchpoint_approval_chain` field) rather than on a brand-system entity. The brand-system layer is upstream content; Zone 3 is downstream constraint.

So Zone 3 is two things at once: a real candidate-carrier question (held pending operational pressure), AND a question that properly lives at packet/slot layer rather than brand-system layer. Whichever way operational pressure resolves it, the resolution shapes packet/slot carriers, not brand-system layer carriers. This frees the brand-system structural decision from carrying Zone 3 as one of its open questions.

### Zone 4 — Governed-output continuity reference elevation

**Posture: EXPLICITLY NOT STRUCTURAL (BELONGS ELSEWHERE).**

The reuse / derivative governance question — when a past-campaign governed asset becomes a reference for a derivative packet, what governance applies — is real and held across all four modes per the apex artifact. But it is not a brand-system-layer carrier question. The carriers, if earned, would live on:

- The derivative packet's reference linkage (a `reference_lineage` field on `approved_reference_keys` linking back to the source governed asset and noting derivative status)
- The source governed asset's lifecycle metadata (a `derivative_authority` field on `generated_assets` or governed-output records noting whether and how the asset can be reused)

Both carrier locations are downstream of the brand-system layer. The brand-system layer informs reuse rules through application guidelines content (when those exist), but the brand-system layer itself does not carry the lineage data structurally. Zone 4 is properly a separate decision surface — *governed-output continuity / reuse-derivative governance decision* — that interacts with the brand-system layer but is not its carrier shape.

### Zone 5 — Temporal-state trace dimension

**Posture: EXPLICITLY NOT STRUCTURAL AT BRAND-SYSTEM LAYER (BELONGS ELSEWHERE).**

Current / historical / superseded classification per past-campaign content piece is a property of the asset's lifecycle, not of the brand-system content the asset carries. The carrier, if earned, would live on the reference asset itself (a `temporal_state` field on `reference_assets` with values like `current` / `historical_continuity` / `superseded`) or on past-campaign records.

The brand-system layer informs what makes a campaign current vs historical (brand-platform stance shifts; visual-identity refreshes; new brand campaigns superseding old ones), but the temporal-state classification is asset-level metadata, not brand-system-layer content. Zone 5 is properly a separate decision surface — *reference-asset lifecycle / temporal-state trace decision* — overlapping with Zone 4's governance work but distinct in carrier location.

The one nuance Zone 5 carries beyond Zone 4: temporal-state generalizes beyond past campaigns to any input category that evolves over time. A brand platform document gets superseded by a new brand-platform iteration; a photography style guide gets refreshed; VIS constants get updated. The temporal-state trace dimension could apply broadly. But the carrier still lives on the per-source-document or per-asset record, not on a brand-system-layer entity.

### Zone 6 — Intake-time judgment trace zone

**Posture: EXPLICITLY NOT STRUCTURAL AT BRAND-SYSTEM LAYER (BELONGS ELSEWHERE).**

Intake-time judgment trace (presence-of-inspection, articulation-state, chain-position, derivation-basis, contradiction-resolution per intake decision) is a property of the intake event, not of the brand-system content the intake produced. The carriers, if earned, would live on intake records or judgment-event records that capture WHEN the intake decision was made, BY WHOM, against WHAT source, with WHAT reasoning.

The brand-system content the intake produces flows into prose carriers (per Zone 2) or into structural carriers where applicable (Zone 1's approved references). The trace of HOW that content got there is a separate carrier layer — a governance / audit layer — that the architecture currently does not carry structurally because operator continuity bridges it under one-operator scale.

Zone 6 is properly a separate decision surface — *intake-time judgment trace decision* — that the continuity-break test (named candidate next-pressure surface; not authorized) would pressure. The decision involves whether to encode the four held trace candidates (`articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`) as structural carriers — but those carriers would live on intake records, not on brand-system entities.

v1 named Zone 6 (then "the third zone") as "currently uncovered" if hybrid was the surviving shape, accurately. v2's clarification: the zone is real, but its carriers live elsewhere. The brand-system carrier decision does not need to resolve Zone 6 to honestly stand.

## Cross-Zone Implications

The decision postures above name what each zone is. Cross-zone implications name how the zones relate and what the per-zone postures imply for the brand-system carrier decision overall.

### What happens if Zone 1 is structural (in part) but Zone 2 remains prose

The split posture in Zone 1 (approved references structurally earned; brand-wide constants beyond approved references held) plus Zone 2's prose / operator-mediated posture is the architecture's *current* honest carrier shape for the brand-system layer. The split is not a transitional state awaiting resolution; it is what the brand-system layer carriers actually look like at milestone 10. The remaining open question is one sub-zone within Zone 1 (brand-wide constants beyond approved references), not the brand-system layer's overall shape.

This is a substantively narrower brand-system structural decision than the milestone-9 + PR #244 framing implied. v1's three live shapes (first-class throughout / terminal operator-mediated / hybrid) framed the choice as if the entire brand-system layer needed one of three commitments. The cross-category synthesis surfaced enough vocabulary to see that Shape C (hybrid) was correct in direction, but its hybrid-ness is essentially already in operation: approved references via `reference_assets` (structural); abstraction via prose downstream (operator-mediated). The hybrid implementation is what the architecture already does at the brand-system layer.

What hybrid does NOT yet do at the brand-system layer: carry brand-wide constants beyond approved references structurally. That sub-zone is the residual open question — and it's a single carrier-candidate question, not a multi-zone hybrid commitment.

### Whether Zone 3 pressures packet/slot rather than brand-system layer

Per the Zone 3 decision posture above: yes. Aspect-ratio-as-attribute, per-touchpoint approval rules, and per-mode constraint structural representation are properties of the packet or slot, not of the brand-system layer. The brand-system layer informs the constraints (via application guidelines content); the carriers — if earned — live downstream.

This means the brand-system structural decision does not need to resolve Zone 3 to honestly stand. Zone 3 is a parallel decision-surface candidate at the packet/slot layer that interacts with brand-system content but is not part of the brand-system layer's carrier shape.

### Whether Zone 4 belongs in governed asset / reference layer rather than brand-system

Per the Zone 4 decision posture above: yes. Governed-output continuity reference elevation is a property of the reference linkage and the source asset's lifecycle, not of the brand-system layer. The brand-system layer informs reuse rules (via application guidelines content where those exist); the carriers — if earned — live on the derivative packet's reference fields and on the source governed asset's lifecycle metadata.

The brand-system structural decision does not need to resolve Zone 4 to honestly stand. Zone 4 is a parallel decision-surface candidate at the governed-asset / reference-linkage layer.

### Whether Zones 5–6 are trace/governance problems rather than brand-system content carriers

Per the Zone 5 and Zone 6 decision postures above: yes. Temporal-state classification is a property of the asset's lifecycle (Zone 5); intake-time judgment trace is a property of the intake event (Zone 6). Neither lives at the brand-system layer.

The brand-system structural decision does not need to resolve Zones 5 or 6 to honestly stand. Both are parallel decision-surface candidates at the trace / governance layer.

### Cross-zone synthesis

The narrowing the surface earns: **the brand-system carrier decision is essentially a one-sub-zone question.** The other zones are real architectural questions, but they are not brand-system-layer carrier questions:

- **Approved references (Zone 1, sub-zone A):** STRUCTURALLY EARNED via existing carriers; no decision pending.
- **Brand-wide constants beyond approved references (Zone 1, sub-zone B):** structurally suggested but held; the residual open question.
- **Abstraction and articulated conventions (Zone 2):** PROSE / OPERATOR-MEDIATED AT CURRENT DEPTH; deliberate choice; no decision pending unless scale-of-operation pressure breaks operator continuity.
- **Per-touchpoint constraints (Zone 3):** packet/slot-layer question; parallel surface; not brand-system carrier.
- **Governed-output continuity (Zone 4):** governed-asset / reference-linkage layer question; parallel surface; not brand-system carrier.
- **Temporal-state trace (Zone 5):** reference-asset lifecycle layer question; parallel surface; not brand-system carrier.
- **Intake-time judgment trace (Zone 6):** intake / governance layer question; parallel surface; not brand-system carrier.

The brand-system structural decision (named at milestone 9; sharpened at PR #244 to a five-or-six-zone implication) narrows to: should brand-wide constants beyond approved references earn a structural carrier? The honest answer at current evidence depth is *not yet* — operational pressure has not surfaced a need; encoding cross-brand vocabulary unification is premature.

The five-or-six-zone framing was useful for surfacing the full pressure surface around the brand-system layer. v2's clarification is that most of those zones do not pressure the brand-system layer's carriers — they pressure adjacent layers' carriers. The brand-system layer's own structural decision was over-scoped at the milestone-9 / PR #244 framing.

## Relationship to Structured IA Model v2

Structured IA model v2 (PR #246) enumerated the stable vocabulary milestone-10 earned. v2's seventeen YAML keys carry the conceptual claims as enumeration without committing to carrier shapes for the brand-system layer beyond what `brand_system_input_categories` and `held_questions` already enumerate.

This artifact does not mutate v2. The narrowing v2's `held_questions` lists (`brand_system_structural_decision`; `five_or_six_zone_hybrid_implication`) earned by the analytical move above does not change v2's enumeration — v2's appendix correctly preserves both as held markers. What v2's prose articulates ("the brand-system structural decision remains held; the surface is laid sharper") is reframed by this artifact's analytical move into "the surface is laid sharper *and narrower*: most of the five-or-six zones are adjacent-layer questions that don't pressure brand-system-layer carriers."

What would need to happen before v3 (or schema work):

- **Operational pressure on Zone 1 sub-zone B** (brand-wide constants beyond approved references) — would either earn a `brand_constants` carrier (or equivalent) or deflate the candidate. Without this, encoding any structural commitment beyond what already exists is premature.
- **Resolution of one or more of the parallel decision surfaces** (Zone 3 packet/slot constraint carriers; Zone 4 governed-output continuity carriers; Zone 5 reference-asset temporal-state carriers; Zone 6 intake-time judgment trace carriers) — each of these is a separate decision surface that, if resolved, would update v2's `held_questions` enumeration accordingly. None of them is a brand-system-layer carrier resolution.
- **Continuity-break operational test** (held; named candidate next-pressure surface) — would pressure Zone 6 carriers and might earn one or more of `articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`. Resolution would update v2's `held_questions` and potentially add new top-level keys for trace dimensions earned beyond the candidate sixth.

v3 would likely involve absorbing whichever of the above operational tests earned new carriers into the structured form. v3 is not authorized; this artifact does not move it.

Schema work — Pydantic model derivation; JSON Schema; validator integration; orchestration spec — remains held per v2's own posture and per the architecture front door's machine-readable vs machine-usable boundary. The narrowing this artifact earns does not change schema readiness.

## Relationship to Future Operational Pressure

Per ASK's section-8 spec: name which zone each candidate operational test would pressure; do not authorize them.

- **Continuity-breaking intake test** — pressures **Zone 6 (intake-time judgment trace zone)**. Multi-operator or continuity-breaking intake conditions would surface whether downstream readers can reconstruct enough trace from current carriers without intake-session memory. Would earn or deflate the four held trace-carrier candidates (`articulation_state`, `derivation_basis`, `fallback_chain_position`, `contradiction_log`). Does not pressure Zones 1–5. Not authorized.
- **Application-guidelines cross-touchpoint operational test** — pressures **Zone 3 (per-touchpoint and per-mode constraint structural representation)**. Marketing-mode full-flow with application-guidelines-shaped intake content would directly pressure aspect-ratio-as-attribute and per-touchpoint approval-rule candidates. Resolution would shape packet/slot-layer carriers, not brand-system carriers. Does not pressure Zones 1, 2, 4, 5, or 6. Not authorized.
- **Past-campaign temporal-state operational test** — pressures **Zone 5 (temporal-state trace dimension)**. Campaign-mode cross-campaign continuity test (multi-campaign rather than within-Warm-Restraint-envelope) would pressure the temporal-state trace carrier candidate. Resolution would shape reference-asset / lifecycle-layer carriers, not brand-system carriers. Does not pressure Zones 1, 2, 3, 4, or 6. Not authorized.
- **Governed-output continuity / reuse test** — pressures **Zone 4 (governed-output continuity reference elevation)**. A test that exercises past-campaign governed asset reuse as reference for derivative packets, with concrete reuse rules from application guidelines, would pressure the `reference_lineage` and `derivative_authority` carrier candidates. Resolution would shape governed-asset / reference-linkage layer carriers, not brand-system carriers. Does not pressure Zones 1, 2, 3, 5, or 6. Not authorized.

A fifth operational test — pressuring **Zone 1 sub-zone B (brand-wide constants beyond approved references)** — has not yet been named as a candidate next-pressure surface in PR #244 or elsewhere. The candidate test shape: a real or simulated brand-deployment scenario where cross-packet repetition of brand-wide constants without structural enforcement breaks coordination at scale. This is the operational test that would directly pressure the residual open question of the brand-system carrier decision. Surfaced here as implication only; not authorized.

The four named operational tests pressure four different zones, none of which is the brand-system layer's residual question. The brand-system layer's residual question (Zone 1 sub-zone B) does not have an authorized operational test on the candidate list. Whether this gap matters operationally is a strategic decision out of scope for this artifact.

## Earned vs Held

What the decision surface narrows at this evidence depth:

- **The brand-system carrier decision is substantively narrower than the five-or-six-zone framing implied.** Of the six zones in PR #244's framing, only Zone 1 and Zone 2 are properly brand-system-layer carrier questions. Zones 3–6 are adjacent-layer questions that interact with brand-system content but live at packet/slot, governed-asset / reference-linkage, reference-asset lifecycle, or intake / governance layers respectively.
- **Zone 1 sub-zone A (approved references) is structurally earned.** No decision pending; the carriers exist via `reference_assets` + lookup chain + `asset_attachment` and have been operationally tested across SKU + collection mode.
- **Zone 2 (abstraction and articulated conventions) is explicitly prose / operator-mediated at current depth.** This is not a deferred decision; it is the architecture's deliberate choice grounded in operational evidence. The only condition under which Zone 2's posture would change is scale-of-operation pressure that breaks operator continuity for prose-rich content specifically — and even then, the structural form would more likely be trace (Zone 6 carriers) than content carriers.
- **Hybrid (v1's Shape C) is already in operation at the brand-system layer.** Approved references via `reference_assets` (structural); abstraction via prose downstream (operator-mediated). The hybrid implementation is what the architecture already does. The structural decision was not awaiting commitment; it was awaiting the analytical clarification this artifact provides.
- **The residual open question is one sub-zone, not a multi-zone hybrid commitment.** Should brand-wide constants beyond approved references (color codes; typeface assignments; logo files as URLs; grid systems) earn a structural carrier? At current evidence depth, the answer is *not yet* — operational pressure has not surfaced a need; encoding cross-brand vocabulary unification is premature.

What remains held — unchanged or sharpened by this artifact:

- **Brand-system structural decision (residual form).** Narrowed to the Zone 1 sub-zone B question (brand-wide constants beyond approved references). Held; operational pressure not yet authorized.
- **Apex Named Limitation #1 (specific aesthetic-carrier schema).** The narrowing partially resolves the limitation by naming what's already operational and what's deliberate prose; the residual sub-zone question remains.
- **The four parallel decision surfaces (Zone 3 packet/slot constraints; Zone 4 governed-output continuity; Zone 5 reference-asset temporal-state; Zone 6 intake-time judgment trace).** Each is now named as a separate decision surface that interacts with brand-system content but is not a brand-system-layer carrier question. None is authorized; each has at least one named candidate operational test that would pressure it.
- **All paper-pressed structural-carrier candidates.** Sixteen-plus candidates aggregated through milestone 10. None promoted by this artifact.
- **Curation-premise architectural fork.** Bounded `refines` reading at PKT-CAMP-004 scope; held per milestone 9.
- **Other Apex Named Limitations.** #2 (precedence rule for inheritance and override) and #3 (cross-base / cross-category / cross-brand pressure) carried forward unchanged.
- **Validator integration; orchestration spec; structured IA v3.** Held per structured IA model v2's posture and per the architecture front door's machine-readable vs machine-usable boundary. The narrowing this artifact earns does not change schema readiness.
- **Architecture front-door wholesale rewrite.** Held; the narrowing this artifact earns may eventually inform a rewrite, but does not authorize one.

Whether any zone is now more than "hybrid likely":

- Yes, partially. **Hybrid is operationally already in place at the brand-system layer** for the two zones (1 + 2) that are properly brand-system-layer carrier questions. The hybrid commitment is no longer "likely"; it is what the architecture does. What remains "likely" is the structural-carrier candidate for Zone 1 sub-zone B — and that is one specific carrier-candidate question, not a hybrid-shape commitment.
- The conceptual commitment v1 declined to make ("hybrid most likely on current evidence; surface is laid; decision held") is now: hybrid is operative for the two brand-system-layer zones; the residual question is whether to extend Zone 1's structural coverage to constants beyond approved references; the four other zones in the five-or-six-zone framing are not brand-system-layer questions.

What this artifact explicitly does not do:

- Resolve the residual brand-system carrier question (Zone 1 sub-zone B); operational pressure not yet authorized
- Authorize any of the four named operational tests pressuring Zones 3, 4, 5, or 6
- Authorize the unnamed-but-implied operational test that would pressure Zone 1 sub-zone B
- Adjudicate any held candidate
- Promote any held carrier to structural form
- Mutate structured IA model v2's appendix
- Author structured IA v3, schema, JSON Schema, Pydantic, validator, or orchestration
- Modify `docs/architecture.md`, `docs/index.md`, `README.md`, `docs/method.md`, `AGENTS.md`, any milestone marker, or any prior artifact
- Modify the grounding note
- Author milestone 11 or any subsequent plateau marker
- Authorize Airtable mutation, schema mutation, or any operational test
- Author parallel decision surfaces for Zones 3, 4, 5, or 6 (each remains a candidate next-pressure surface)
- Author an architecture front-door wholesale rewrite

## Self-Superseding Clause

This artifact is v2 of the brand-system carrier decision surface. It should be superseded by:

- An operational test that pressures Zone 1 sub-zone B (brand-wide constants beyond approved references) and earns or deflates the carrier candidate
- A subsequent decision surface that resolves the residual brand-system carrier question
- One or more of the four parallel decision surfaces (Zone 3 packet/slot constraints; Zone 4 governed-output continuity; Zone 5 reference-asset temporal-state; Zone 6 intake-time judgment trace) authoring its own decision artifact at its proper architectural location
- An operational test that pressures Zone 2 in a way that breaks the prose / operator-mediated posture (a multi-operator scale condition specifically for abstraction and articulated conventions) — would re-open Zone 2's posture
- A structured IA model v3 that absorbs operational evidence from any of the above into the structured form
- A subsequent milestone marker that absorbs the narrowed brand-system carrier decision into a plateau
- The eventual rewrite of `docs/architecture.md` that consolidates the narrowing this artifact earns alongside any operational evidence into a single current-architecture document

It does not supersede v1 of the brand-system hybrid carrier decision surface (preserved as historical record at four-of-six deepening depth; informative for the analytical lineage), the apex definition-layer artifact, the predecessor architectural passes, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, the layered intake architecture v1, the cross-category synthesis v1, the layered reference and discretion architecture v1, the normative-force pass v1, the brand intake judgment-trace dry run v1, the operator-judgment protocol sketch v1, the structured IA model v2 (current canonical structured form), milestone 8, milestone 9, or milestone 10. Those remain authoritative for their content depth; v2 reads them at decision-surface-successor depth.

## Anchor Documents

### Direct predecessor

- [`docs/brand-system-hybrid-carrier-decision-surface-v1.md`](brand-system-hybrid-carrier-decision-surface-v1.md): v1 of the carrier decision surface; tested three live shapes against Phase 1 force-kind criterion at four-of-six deepening depth; surfaced the three-zone hybrid implication; preserved as historical record

### Substrate this artifact reads against

- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): current canonical structured form (PR #246); 17-key YAML appendix
- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau marker (PR #245); names the brand-system structural decision as held with the five-or-six-zone implication sharpened
- [`docs/architecture.md`](architecture.md): current architecture front door at milestone-10 + structured-v2 currency; §Brand-System Layer Status carries the five-or-six-zone implication this artifact narrows
- [`docs/brand-system-input-cross-category-synthesis-v1.md`](brand-system-input-cross-category-synthesis-v1.md): PR #244 cross-category synthesis; sharpened the hybrid implication from three zones (PR #241) to five-or-six zones
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 layered intake architecture; original three-zone hybrid implication

### Phase 2 input-category deepenings (evidence base — six-of-six)

- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): articulated visual conventions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): demonstrated visual evidence; the input category most directly served by existing structural carriers
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): non-visual articulation-only abstraction; concretizes Named Limitation #1 from abstraction angle
- [`docs/brand-system-input-visual-identity-system-to-ia-mapping-v1.md`](brand-system-input-visual-identity-system-to-ia-mapping-v1.md): hybrid-shape constants + applied conventions; concretizes Named Limitation #1 from concrete-constants angle (the Zone 1 sub-zone B residual question)
- [`docs/brand-system-input-application-guidelines-to-ia-mapping-v1.md`](brand-system-input-application-guidelines-to-ia-mapping-v1.md): operationalization-layer content; aspect-ratio-as-attribute and per-touchpoint approval-rule candidates paper-pressed (Zone 3)
- [`docs/brand-system-input-past-campaigns-to-ia-mapping-v1.md`](brand-system-input-past-campaigns-to-ia-mapping-v1.md): historical execution evidence; surfaces temporal-state trace (Zone 5) and contributes structurally-recognizable content at governed-asset layer (Zone 4)

### Architectural framing

- [`docs/normative-force-and-durable-layer-pressure-v1.md`](normative-force-and-durable-layer-pressure-v1.md): six-kind force-kind vocabulary used in the Section 4 pressure table
- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 reference-function taxonomy + nine-site discretion decomposition that v2's substrate reads against
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): six-layer fallback chain; sparse-articulation conditions Zone 2 carries gracefully
- [`docs/brand-intake-judgment-trace-dry-run-v1.md`](brand-intake-judgment-trace-dry-run-v1.md): five trace dimensions (Zone 6 candidates)
- [`docs/operator-judgment-protocol-sketch-v1.md`](operator-judgment-protocol-sketch-v1.md): operator-judgment protocol sketch
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): Apex Named Limitations carried forward; reuse / derivative governance held question (Zone 4)

### Operational evidence

- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): PKT-SKU-009 full-flow; Zone 1 sub-zone A operationally well-tested via REF-002 cross-packet reuse
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): PKT-SKU-010 full-flow
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): PKT-COLL-001 operational deflation; Zone 1 sub-zone A continued operational support
- [`docs/campaign-mode-fork-resolver-test-phase-d-findings-v1.md`](campaign-mode-fork-resolver-test-phase-d-findings-v1.md): PKT-CAMP-004 bounded `refines` reading; campaign-mode operational evidence
- [`docs/airtable-marketing-message-driven-cycle-1-findings-v1.md`](airtable-marketing-message-driven-cycle-1-findings-v1.md): PKT-MSG-001 structural-proof depth; Zone 3 candidate operational test would pressure marketing mode

### Plateau markers

- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): current plateau (this artifact reads against)
- [`docs/milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md`](milestones/milestone-9-curation-semantic-split-brand-system-decision-surface-plateau.md): prior plateau; named the brand-system structural decision originally
- [`docs/milestones/milestone-8-phase-2-structured-model-plateau.md`](milestones/milestone-8-phase-2-structured-model-plateau.md): milestone-8 plateau

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
