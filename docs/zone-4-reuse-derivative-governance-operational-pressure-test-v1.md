# Zone 4 Reuse / Derivative Governance Operational Pressure Test v1

## Posture

```text
operational findings artifact
Zone 4 / reuse-time governance axis (post-milestone-11 axis switch from intake-reference-rationale)
follows PR #268 (Zone 4 governed-output continuity / reuse-derivative governance decision surface v1, design-surface depth)
fresh-reader test against mocked Z4-B + Z4-C + Z4-E + rejected/stale complement hybrid
not intake-time reference rationale (PR #263 / PR #266 axis; remains its own surface)
not Zone 6 trace (intake-time judgment trace; plateau at milestone 11)
not a symmetric Z4-C vs Z4-D comparison — only Z4-C was mocked
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
not authorization of any specific carrier shape (Z4-C vs Z4-D vs hybrid)
self-superseding when symmetric Z4-D-mocked test, multi-reader replication, cross-substrate test, growth-pressure substrate, multi-source-asset substrate, or specific carrier-shape implementation move absorbs it
```

This artifact records the Stage C findings of the Zone 4 reuse / derivative governance operational pressure test. The test pressures PR #268's structurally-suggested Z4-B + Z4-C + Z4-E + rejected/stale complement hybrid carrier-shape posture under a single-reader / single-substrate / mocked-shape condition. The test was designed to (a) demonstrate operational reconstructability of Zone 4 reuse-time governance and (b) generate a reader-judgment signal on whether the separate-event-record shape (Z4-C) feels structurally adequate or strained for multi-event reuse scenarios.

The artifact does NOT close PR #268's held carrier-shape choice. It reports operational support for the conceptual posture, names what the mocked shape supports, and surfaces the reader's carrier-shape pressure observation as a diagnostic signal that informs (without resolving) the Z4-C vs Z4-D question.

## What This Artifact Attempts

The artifact answers two questions:

1. **Does the mocked Z4-B + Z4-C + Z4-E + rejected/stale complement hybrid preserve reconstruction of Zone 4 reuse-time governance at one-reader / one-substrate / mocked-shape depth?**
2. **Does the test surface carrier-shape pressure that favors Z4-C (separate reuse / derivative event record), Z4-D (reference-linkage annotation), or the hybrid posture?**

PR #268 named Z4-B for asset-intrinsic state, Z4-C for event-level reuse trace, Z4-D for reference-linkage annotation, Z4-E for asset-family / lineage scope, and hybrid posture (Z4-B + Z4-C OR Z4-D + Z4-E + reuse-rejected complement) as structurally suggested. Z4-C and Z4-D were held pending operational pressure. This test mocked the Z4-C shape (not Z4-D) and asked the reader to judge whether Z4-C felt sufficient or strained, and whether Z4-D would have been more or less natural.

**Important framing constraint (preserved per the framing-correction discipline established in PR #266):** The test does NOT compare Z4-C vs Z4-D symmetrically. Only Z4-C was mocked; Z4-D is judged by reader extrapolation, not by direct operational pressure. The strongest claim the test can support is: **Z4-C is sufficient / strained / inconclusive at this substrate depth; Z4-D remains extrapolative, not directly tested.** The test cannot support "Z4-C beat Z4-D" or "Z4-D is unnecessary" or "Z4-D is required under any condition" or "Z4-C is the final carrier shape."

## Test Design

### Substrate

- **Base substrate:** kitchen-textiles context carried forward from PR #254 / #258 / #260 / #266. No new synthetic stack introduced.
- **Reuse-time overlay:** two prior governed outputs introduced — `GOV-KT-HOLIDAY-2025-HERO-001` (continuity anchor for `Kitchen Textiles Holiday 2025 Family`; current state; demonstrates calm warm-tone register + single-product breathing-room framing + soft daylit lighting + soft kitchen-surface treatment) and `GOV-KT-OBSOLETE-001` (member of superseded `Kitchen Textiles 2024 Family`; superseded at time T-1 by `GOV-KT-HOLIDAY-2025-HERO-001`).
- **New intake event:** `INTAKE-NEW` produces four packets, three of which reuse `GOV-KT-HOLIDAY-2025-HERO-001` in distinct roles, and one of which (incorrectly) cites the superseded `GOV-KT-OBSOLETE-001`.

### Four reuse events with structurally distinct shapes

- **RE-1: Continuity-anchor reuse** — PKT-NEW-001 joins Holiday 2025 Family with anchor authority; broad inheritance; non-derivative
- **RE-2: Dimensional citation** — PKT-NEW-002 cites for tone register ONLY; narrow authority; non-family-member; non-derivative
- **RE-3: Derivative generation** — PKT-NEW-003 = cranberry colorway variant; explicit derivative; partial-approval-required on variation dimension
- **RE-4: Superseded-asset reuse** — PKT-NEW-004 incorrectly cites obsolete asset; stale-requires-correction

The same source asset `GOV-KT-HOLIDAY-2025-HERO-001` plays three distinct roles across RE-1, RE-2, RE-3 — this cross-event same-asset-multi-role pattern was designed to pressure the Z4-C event-level shape directly.

### Mocked carriers (Z4-B + Z4-C + Z4-E + rejected/stale complement)

The mock implements PR #268's structurally-suggested hybrid posture:

- **Z4-B** (governed-output metadata extension) — asset-intrinsic state on source governed outputs: `continuity_anchor` flag; `family_memberships`; `supersession_state`; `derivative_children` list
- **Z4-C** (separate reuse / derivative event record) — ONE record per reuse event, each with `event_id`, `intake_event`, `source_governed_asset`, `downstream_target`, `reuse_type`, `source_authority_type`, `inherited_dimensions`, `non_inherited_dimensions`, `derivative_status`, `family_coherence_relationship`, `approval_implication`, `supersession_status`
- **Z4-E** (asset-family / lineage record) — family identity, members, family_rules, family_approval_state, for both the current `Kitchen Textiles Holiday 2025 Family` and the superseded `Kitchen Textiles 2024 Family`
- **Rejected/stale complement** — RE-4 itself is structured as the stale-reuse event with `supersession_status: source IS superseded; citation is itself a governance event requiring correction`

**Z4-D was NOT mocked.** The reader's Q-9 judgment generates the diagnostic signal for Z4-D as alternative event-level shape.

### Test instruments

The Stage A scratch instruments lived outside the repo to preserve test-integrity isolation:

- Blind reader packet: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-17_asset-pipeline-ASK_zone-4-reuse-derivative-governance-test-blind-reader-packet_v1.md`
- Ground-truth key: `asset-pipeline-ASK-EXTERNAL/scratch/2026-05-17_asset-pipeline-ASK_zone-4-reuse-derivative-governance-test-ground-truth-key_v1.md`

The fresh reader received only the blind packet; the ground-truth key was held by the test author.

### Question structure

- **Q-1 through Q-4:** per-event reconstruction (4 questions × 1.0 = 4.0)
- **Q-5:** same-asset multi-role cross-event pattern (1.0)
- **Q-6:** asset-intrinsic state reconstruction (1.0)
- **Q-7:** family-coherence relationships — cites-family-member vs joins-family distinction (1.0)
- **Q-8:** approval-implication classification per event (1.0)
- **Q-9:** carrier-shape pressure observation — **UNSCORED reader judgment**
- **Q-C1:** unreconstructable aspects (1.0)

Total scored: 9 questions × 1.0 = 9.0 maximum. Q-9 unscored.

## Per-Question Scoring

Each row reports the fresh reader's answer against the ground-truth key's success criteria. Scoring grid: Success = 1.0; Partial = 0.5; Failure = 0.0.

| Question | Reader response (concise) | Key expected | Score | Notes |
|---|---|---|---|---|
| Q-1 | continuity-anchor; broad anchor authority for Kitchen Textiles Holiday 2025 Family register; all 5 inherited dimensions listed; specific product non-inherited; not derivative | continuity-anchor + broad authority + 5 inherited + product non-inherited + not derivative | 1.0 Success | All five substantive fields match the key |
| Q-2 | dimensional-citation; narrow tone-only; register only inherited; framing/lighting/surface/family non-inherited; not derivative | dimensional-citation + narrow + register-only + multiple non-inherited + not derivative | 1.0 Success | Critical Q-1 vs Q-2 distinction (broad vs narrow authority) preserved |
| Q-3 | derivative-generation; derivative-with-specified-variation; register + framing + lighting + surface inherited; cranberry colorway as non-inherited; explicit derivative | derivative-generation + variation-specified + multiple inherited + color non-inherited + explicit derivative | 1.0 Success | Critical Q-1 vs Q-3 distinction (fresh family member vs derivative variant) preserved |
| Q-4 | superseded-asset-reuse; stale authority; supersession-by identified (GOV-KT-OBSOLETE-001 superseded by GOV-KT-HOLIDAY-2025-HERO-001 at T-1); stale-requires-correction | superseded-asset-reuse + stale + supersession-by relationship + correction-required | 1.0 Success | Supersession-detection dimension reconstructed including the supersession-by relationship |
| Q-5 | yes; all three roles for GOV-KT-HOLIDAY-2025-HERO-001 identified (anchor / dimensional / derivative-source) | yes + three roles | 1.0 Success | Same-asset multi-role pattern correctly reconstructed across events |
| Q-6 | continuity anchor + family memberships + supersession state with supersession-by all correct for both source governed outputs | all three sub-fields correct | 1.0 Success | Asset-intrinsic state reconstruction across both source assets |
| Q-7 | PKT-NEW-001 + PKT-NEW-003 joining; fresh-vs-derivative distinguished; **PKT-NEW-002 cites-but-doesn't-join EXPLICITLY captured** with rationale; reader also extended to address PKT-NEW-004's non-clean-joining status | PKT-NEW-001 + PKT-NEW-003 joining + Q-7c PKT-NEW-002 cites-but-doesn't-join captured | 1.0 Success | **Cites-vs-joins architectural distinction captured precisely** plus reader-side extension to PKT-NEW-004 |
| Q-8 | RE-1 informational; RE-2 informational; RE-3 partial approval-required; RE-4 stale-requires-correction; Q-8e RE-3 variation-dimension (cranberry color) + RE-4 correction-not-approval distinction explicit | all four classifications correct + variation dimension named + correction-vs-approval distinction | 1.0 Success | All four approval-implication classifications distinguished |
| Q-9 | UNSCORED — see Section: Q-9 Carrier-Shape Pressure Signal | n/a | n/a | Reader observation captured as diagnostic signal |
| Q-C1 | six unreconstructable aspects including schema-stability epistemic note + intake-time-rationale-separation note | ≥2 aspects | 1.0 Success | Exceeds threshold by 3×; reader's schema-stability observation is exactly the boundary PR #268 preserves |

**Aggregate raw count:** 9 Success / 0 Partial / 0 Failure (Q-9 not counted; reader-judgment).

**Aggregate score:** 9.0 / 9.0 = **100%**.

## Aggregate Result

Per the ground-truth key's threshold table:

- **Trace holds:** ≥ 7.2 (≥80%)
- **Trace partially holds:** 4.5–7.1 (50-79%)
- **Trace partially breaks:** 2.8–4.4 (31-49%)
- **Trace breaks:** < 2.8 (<31%)

The 9.0 aggregate score falls in the **trace holds** band (1.8 points above the 80% threshold).

## Per-Event Reconstruction Sub-Aggregate

Q-1 + Q-2 + Q-3 + Q-4 = 4 questions × 1.0 = 4.0 maximum.

**Per-event sub-aggregate score:** 4.0 / 4.0 = **100%**.

All four reuse-type distinctions reconstructed:
- **Continuity-anchor (RE-1)**: broad authority + family-member fresh-joining
- **Dimensional citation (RE-2)**: narrow authority + non-family-member tone-only borrowing
- **Derivative generation (RE-3)**: explicit derivative + family-member derivative-variant + variation-on-color
- **Superseded-asset reuse (RE-4)**: stale + supersession-by relationship + correction-not-approval

The reuse-type distinction sub-aggregate (Q-1a / Q-2a / Q-3a / Q-4a — the four `reuse_type` classification fields) is 4/4 perfect. The architecturally-distinct reuse types are reconstructable from the mocked carrier shape.

## Cross-Event Reconstruction Sub-Aggregate

Q-5 + Q-6 + Q-7 + Q-8 = 4 questions × 1.0 = 4.0 maximum.

**Cross-event sub-aggregate score:** 4.0 / 4.0 = **100%**.

Per cross-event sub-dimension:

- **Same-asset multi-role pattern (Q-5)**: SUCCESS — reader identified that `GOV-KT-HOLIDAY-2025-HERO-001` plays three distinct roles across RE-1 (anchor), RE-2 (dimensional), RE-3 (derivative-source). The Z4-C event-record shape's natural fit for cross-event same-asset patterns is demonstrated.
- **Asset-intrinsic state (Q-6)**: SUCCESS — continuity anchor identification, family memberships, and supersession state with supersession-by relationships all reconstructed across both source governed outputs.
- **Family-coherence cites-vs-joins distinction (Q-7)**: SUCCESS — the architecturally-critical distinction (PKT-NEW-002 cites family member but does NOT join the family because it is dimensional citation, not register-binding family inheritance) was captured precisely. Reader also extended to address PKT-NEW-004's non-clean-joining status (stale citation; would attempt to join a superseded family if uncorrected) beyond the key's explicit expectation.
- **Approval-implication classification (Q-8)**: SUCCESS — all four events classified distinctly (RE-1 + RE-2 informational; RE-3 partial-approval-required-on-variation; RE-4 stale-requires-correction); reader explicitly identified the variation dimension (color) requiring approval AND distinguished correction-not-approval for RE-4.

## Q-9 Carrier-Shape Pressure Signal (Unscored)

The reader's Q-9 response is the test's primary carrier-shape pressure signal. Reported verbatim:

**Q-9a (Z4-C sufficient or strained):**

> "Z4-C was sufficient and not meaningfully strained for this case. The separate event records made the distinction between continuity-anchor reuse, dimensional citation, derivative generation, and stale/superseded reuse easy to reconstruct."

**Q-9b (Z4-D alternative judgment):**

> "about the same for simple one-source-per-packet cases, but likely less natural once reuse events need explicit event identity, supersession status, approval implication, derivative lineage, and family-coherence relationships. Z4-D would be convenient at the packet-reference surface but could bury cross-event comparison."

**Q-9c (other observations):**

> "The hybrid posture is doing real work: Z4-B holds asset-intrinsic state, Z4-C holds event-level reuse governance, Z4-E holds family identity/rules, and the rejected/stale complement prevents obsolete references from looking like valid inheritance. The main strain signal is duplication risk across Z4-B, Z4-C, and Z4-E unless authority boundaries are kept explicit."

**Reader's optional notes (additional Q-9 framing):**

> "The packet strongly supports reconstruction of reuse-time governance. The clearest architectural distinction is that the `approved_reference_keys` IA view alone is insufficient: the same reference key can mean anchor continuity, tone-only citation, derivative generation, or stale citation. The Zone 4 carriers successfully preserve that semantic difference."

### Interpretation of the Q-9 signal

The reader's response carries four architecturally precise distinctions:

1. **"Z4-C was sufficient and not meaningfully strained."** Different from PR #266's R-D signal ("sufficient ... but visibly near the edge of structural strain"). Z4-C reads as comfortably accommodating this substrate's complexity, including the same-asset-multi-role pattern that PR #266's Z4-C-equivalent in intake-time framing did NOT need to handle.
2. **"Z4-D ... likely less natural once reuse events need explicit event identity, supersession status, approval implication, derivative lineage, and family-coherence relationships."** Conditional framing — Z4-D may work for simple one-source-per-packet cases (RE-1 alone, RE-2 alone, RE-3 alone, RE-4 alone read as packet-attached linkage data) but becomes less natural when the reuse event itself carries enough load to deserve its own structural identity. The reader's list of what "needs explicit event identity" (event identity, supersession status, approval implication, derivative lineage, family-coherence relationships) is exactly what Z4-C records in its sub-fields. The Z4-D linkage-annotation alternative would need to fold all five of these into per-linkage annotations on each packet's `approved_reference_keys`, distributing what Z4-C consolidates.
3. **"The hybrid posture is doing real work"** — each of Z4-B / Z4-C / Z4-E / rejected-complement carries a distinct architectural load (asset-intrinsic state; event-level governance; family identity-rules; obsolete-reference detection). Collapsing any of them would lose a distinct architectural concern.
4. **"Duplication risk across Z4-B, Z4-C, and Z4-E unless authority boundaries are kept explicit"** — sophisticated architectural caveat. The hybrid's three carriers each have authority over a different scope (asset-intrinsic / per-event / family-level), and the architecture must keep their authority boundaries explicit to prevent the same governance content from being expressed redundantly in multiple carriers.

Per the ground-truth key's carrier-shape pressure framing, this is **a "Z4-C sufficient at this substrate depth" signal with a more confident framing than PR #266's R-D-near-the-edge signal**. The Z4-C event-record shape's natural fit for multi-event same-source-asset patterns is operationally supported. Z4-D's plausibility under different (simpler) substrate conditions is reader-extrapolated and not directly tested.

The signal aligns with PR #268's stance that Z4-C vs Z4-D remains held pending operational pressure. This test generates pressure evidence consistent with **Z4-C as natural-fit for multi-event reuse scenarios** without closing the choice. Z4-D as alternative under different conditions remains materially plausible but has not been directly pressured.

## Per-Trace-Dimension Performance

| Trace dimension | Question coverage | Score | Status |
|---|---|---|---|
| Per-event reuse-type discrimination | Q-1a, Q-2a, Q-3a, Q-4a | 4.0 / 4.0 | SUCCESS — four distinct reuse types correctly distinguished |
| Source-authority-type characterization | Q-1b, Q-2b, Q-3b, Q-4b | 4.0 / 4.0 | SUCCESS — broad / narrow / derivative-with-variation / stale correctly characterized |
| Inherited dimensions per event | Q-1c, Q-2c, Q-3c, Q-4c | 4.0 / 4.0 | SUCCESS |
| Non-inherited dimensions per event | Q-1d, Q-2d, Q-3d, Q-4d | 4.0 / 4.0 | SUCCESS — particularly notable that REF-NEW-002's "tone only" narrow inheritance was preserved against REF-NEW-001's wide inheritance |
| Derivative status | Q-1e, Q-2e, Q-3e | 3.0 / 3.0 | SUCCESS — derivative vs non-derivative distinction preserved |
| Supersession detection (RE-4 specific) | Q-4c, Q-6c | 2.0 / 2.0 | SUCCESS — supersession-by relationships reconstructed at both per-event and asset-intrinsic levels |
| Same-asset multi-role pattern | Q-5 | 1.0 / 1.0 | SUCCESS — three distinct roles for one governed output reconstructed |
| Continuity-anchor identification | Q-6a | embedded in Q-6 | SUCCESS |
| Family memberships | Q-6b | embedded in Q-6 | SUCCESS |
| Cites-family-member vs joins-family distinction | Q-7c | embedded in Q-7 | SUCCESS — the architecturally-critical PKT-NEW-002 case captured |
| Approval-implication classification | Q-8a, Q-8b, Q-8c, Q-8d | embedded in Q-8 | SUCCESS — all four classifications distinguished |
| Variation-dimension identification (RE-3) | Q-8e | embedded in Q-8 | SUCCESS — color/cranberry explicitly named |
| Carrier-shape pressure observation | Q-9 | UNSCORED | Reader signal: Z4-C sufficient at this substrate depth; Z4-D plausible-but-less-natural-under-multi-dimensional-load |
| Epistemic honesty about reconstruction gaps | Q-C1 | 1.0 / 1.0 | SUCCESS — six aspects including schema-stability epistemic note |

All scored dimensions reconstructed without partial or failure marks.

## Where Z4-C Succeeded

- **Zone 4 conceptual posture is operationally supported** at this test depth. A fresh reader reconstructed all four reuse types, the same-asset multi-role pattern across three events, the asset-intrinsic state for both source governed outputs (including supersession-by relationships), the cites-family-member vs joins-family architectural distinction, and the per-event approval-implication classifications.
- **Reuse-type distinction sub-aggregate is perfect.** The four architecturally-distinct reuse types (continuity-anchor / dimensional-citation / derivative-generation / superseded-asset-reuse) were each correctly labeled. The PR #268-named scenario coverage is operationally supported.
- **Z4-C event-record shape is operationally adequate for multi-event reuse scenarios.** The reader characterized it as "sufficient and not meaningfully strained" — a more confident framing than PR #266's R-D-near-the-edge signal at the intake-time axis. The natural fit of separate event records for same-asset-multi-role patterns is empirically demonstrated.
- **Cites-family-member vs joins-family distinction held.** The architecturally-critical case (PKT-NEW-002 cites `GOV-KT-HOLIDAY-2025-HERO-001`, a family member, but does NOT join the family because it is dimensional citation) was captured precisely. The reader extended this reasoning to PKT-NEW-004's stale citation case (would attempt to join the superseded 2024 family if uncorrected) — exemplary architectural reasoning beyond the key's explicit expectation.
- **Supersession-detection dimension reconstructed.** RE-4's stale-reuse case was identified as architecturally distinct from the three valid reuse types. The supersession-by relationship was reconstructed at both per-event (Q-4c) and asset-intrinsic (Q-6c) levels.
- **Approval-implication classifications all four distinguished.** Informational (RE-1, RE-2) vs partial-approval-required (RE-3) vs stale-requires-correction (RE-4) all preserved. The reader specifically identified the variation dimension (cranberry color) requiring approval AND distinguished correction-not-approval for RE-4.
- **Reader's optional note explicitly identifies the architectural distinction.** The reader's framing — "the `approved_reference_keys` IA view alone is insufficient: the same reference key can mean anchor continuity, tone-only citation, derivative generation, or stale citation. The Zone 4 carriers successfully preserve that semantic difference" — exactly identifies the architectural pressure Zone 4 was designed to address.

## Where Z4-C Partially Succeeded

Nothing scored partial. The reader hit Success on all 9 scored questions.

## Where Z4-C Failed

Nothing failed at this test's depth.

## Where Z4-C May Be Sufficient Only At This Substrate Depth

The reader's "sufficient and not meaningfully strained" framing is encouraging but bounded. Specific test limits prevent generalization:

- **Single intake event.** This test had four reuse events but all from one `INTAKE-NEW`. Substrates with multiple intake events spanning weeks/months/years would pressure event-record cardinality across longer time spans.
- **One source governed output across most events.** Three of four reuse events share the same source (`GOV-KT-HOLIDAY-2025-HERO-001`). Substrates where each reuse event has a different source would test whether Z4-C's per-event records become unwieldy at higher source cardinality.
- **Convergent reuse scenarios.** The four reuse events have distinct types but the underlying register and family context are consistent. Substrates with conflicting register signals across reuse events (e.g., same source asset cited in incompatible downstream contexts) would pressure architectural seam coherence.
- **One asset family.** Holiday 2025 Family is the only active family; 2024 Family is superseded. Multi-family substrates with cross-family reuse would pressure Z4-E's family-coherence carrier under cross-family load.
- **Single supersession case.** Only one stale-reuse event (RE-4); substrates with multiple supersession events or chained supersessions (X superseded by X' superseded by X'') would pressure supersession-trace carrier durability.

At this substrate depth, Z4-C is sufficient. Whether Z4-C scales gracefully under any of those expansions remains held pending operational pressure.

## Where Z4-D Remains Materially Plausible

Z4-D (reference-linkage annotation — distributing the same reuse-event data across `approved_reference_keys` linkage points on each packet rather than collecting them in separate event records) was NOT mocked here. The reader's Q-9 judgment is extrapolation, not direct operational pressure. Per the framing-correction discipline:

**The test cannot support "Z4-D is unnecessary" or "Z4-D is required" or "Z4-C beat Z4-D."**

What the reader's signal DOES support:

- **Z4-D is "about the same for simple one-source-per-packet cases"** — for substrates where each packet has a single source reference with a single reuse type, the reuse-event content can fit on the linkage annotation without strain. RE-1 alone, RE-2 alone, RE-3 alone, RE-4 alone each fit that simple-case description.
- **Z4-D may be "less natural" when reuse events need explicit event identity** — five named load-bearing properties (event identity, supersession status, approval implication, derivative lineage, family-coherence relationships) collectively make the reuse event substantial enough to "deserve" its own structural identity rather than being annotation-attached to a packet.
- **Z4-D would "bury cross-event comparison"** — the reader's specific observation that Z4-D distributes information across multiple linkage points (one per packet) means cross-event same-asset patterns (like Q-5's three-role pattern) would require navigating multiple linkage points rather than reading a list of events sharing a source.

These observations directionally favor Z4-C for **multi-event, multi-dimensional-property, cross-event-comparison-requiring** substrates. They do NOT constitute a verdict. Z4-D remains materially plausible — particularly for simpler substrates without the load-bearing properties the reader named.

The Z4-C vs Z4-D choice from PR #268 is **sharpened by this test's reader signal but not closed**. Direct operational pressure on Z4-D would require a symmetric Z4-D-mocked test against the same substrate (or against a substrate where the reader-named load-bearing properties are not present).

## Where The Mocked Shape, Not The Zone 4 Conceptual Posture, May Be The Issue

The reader's Q-9c observation: "The main strain signal is duplication risk across Z4-B, Z4-C, and Z4-E unless authority boundaries are kept explicit." This is a hybrid-posture observation, not a Z4-C-specific observation.

Each carrier in the hybrid has a distinct architectural authority:

- **Z4-B**: asset-intrinsic state (what is this asset's continuity-anchor status; what families is it in; is it superseded; what derivatives flow from it)
- **Z4-C**: per-event reuse trace (what happened when this reuse event occurred; what authority was carried; what inherited; what didn't)
- **Z4-E**: family-level governance (what family rules apply; who are the members; what's the family approval state)
- **Rejected/stale complement**: obsolete-reference detection (was this citation stale; what's the supersession path)

The reader's concern: if these authority boundaries blur, the same governance content gets expressed redundantly across multiple carriers. For example, "is GOV-KT-HOLIDAY-2025-HERO-001 a continuity anchor" could be expressed in Z4-B (continuity_anchor flag) AND repeatedly in Z4-C event records (reuse_type: continuity-anchor) AND in Z4-E (family.anchor pointer). Coherent design must keep these architecturally non-redundant — Z4-B captures the asset's intrinsic state; Z4-C captures specific events; Z4-E captures family-level rules. The same fact in different carriers should mean different things.

This is a **design discipline observation, not a posture failure**. The mocked hybrid worked here because the boundaries were kept explicit. Real implementation would need the same discipline.

## Test Limits

The findings are honest about every limit:

- **One fresh reader.** Reader variability against this constraint set is unpressured. Multi-reader replication remains a candidate next surface.
- **One substrate.** Cross-substrate generalization is unpressured.
- **One intake event scale.** Four reuse events from one `INTAKE-NEW`; multi-intake-event substrates remain unpressured.
- **One primary source asset across most events.** Three of four reuse events share `GOV-KT-HOLIDAY-2025-HERO-001`; multi-source substrates remain unpressured.
- **One active asset family.** Multi-family substrates remain unpressured.
- **Single supersession case.** RE-4 is the only stale-reuse event; chained-supersession substrates remain unpressured.
- **No conflicting-evidence substrate.** The four reuse events are coherent across the substrate; substrates with mutually incompatible reuse-type claims for the same source remain unpressured.
- **Z4-D NOT mocked directly.** Only Z4-C was mocked; Z4-D judgment is reader extrapolation, not direct operational pressure.
- **Mocked carrier shape.** The Z4-B + Z4-C + Z4-E + rejected/stale complement hybrid is one of several possible operationalizations of PR #268's structurally-suggested constraints. The test does NOT earn the specific shape over alternatives.
- **No real implementation.** Pydantic / JSON Schema / Airtable / validator / orchestration not produced or tested.
- **No multi-reader replication.** Single reader; reader-specific facility not distinguished from robust posture.
- **No long-context / temporal-pressure.** Same-session reconstruction; time-gap durability not pressured.

## Earned vs Held

### Earned at this test depth

- **Zone 4 conceptual posture is operationally supported** at one-reader / one-substrate / four-event / mixed-reuse-type / one-supersession / mocked-shape depth. The trace dimension is reconstructable from the carriers alone.
- **Z4-B + Z4-C + Z4-E + rejected/stale complement hybrid posture is operationally adequate** at this case's complexity. The reader characterized Z4-C as "sufficient and not meaningfully strained."
- **Four architecturally-distinct reuse types (continuity-anchor / dimensional-citation / derivative-generation / superseded-asset-reuse) are reconstructable** from the mocked carrier shape.
- **Same-asset multi-role pattern is reconstructable.** The same governed output playing three distinct roles across three reuse events was correctly identified.
- **Cites-family-member vs joins-family architectural distinction is reconstructable** — the critical case (PKT-NEW-002 cites but doesn't join) was captured.
- **Supersession-detection dimension is reconstructable** at both per-event and asset-intrinsic levels.
- **Per-event approval-implication classification is reconstructable** — informational vs partial-approval-required vs stale-requires-correction all distinguished.
- **Asset-intrinsic state (continuity anchor; family memberships; supersession state with supersession-by) is reconstructable** from the Z4-B carrier.
- **Family-level governance (family rules; member set; family approval state) is reconstructable** from the Z4-E carrier.

### Not earned

- **Specific Z4-C vs Z4-D carrier-shape selection.** Only Z4-C was mocked; Z4-D judgment is reader extrapolation. The test signal is directional (Z4-C sufficient and not strained at this depth; Z4-D plausible-but-less-natural-under-multi-dimensional-load) but the choice remains held pending direct operational pressure on Z4-D.
- **Multi-event-from-multiple-intake-events generalization.** Single `INTAKE-NEW`; cross-intake-event reuse patterns remain unpressured.
- **Multi-source-asset substrate generalization.** Three of four events share one source; higher source cardinality remains unpressured.
- **Multi-family substrate generalization.** One active family; cross-family reuse remains unpressured.
- **Chained-supersession generalization.** Single supersession; X → X' → X'' chains remain unpressured.
- **Conflicting-evidence substrate generalization.** Coherent substrate; substrates with mutually incompatible reuse claims remain unpressured.
- **Multi-reader generalization.** Single reader.
- **Cross-substrate generalization.** Same kitchen-textiles base.
- **Long-context / temporal-pressure generalization.** Same-session.
- **Reuse-type vocabulary closure.** The four types named here are operationally supported but not closed; future substrates may surface additional types.
- **Authority-type vocabulary closure.** broad / narrow / derivative-with-variation / stale is a working set; refinement awaits operational pressure.
- **Family-rule vocabulary closure.** Held pending pressure.
- **Specific carrier-shape implementation / field design / structured IA v3 absorption.** Held; the architecture's "structure earns its keep when operational pressure surfaces a need" posture argues against premature implementation.
- **Validator / orchestration spec.** Held until an operational consumer surfaces the need.
- **Intake-time reference rationale axis (PR #263 / PR #266).** Remains adjacent and unrelated to Zone 4 scope; the two axes remain independent.

### Boundary preserved

- No schema / Airtable / JSON Schema / Pydantic / validator / orchestration earned
- No specific carrier-shape design (entity placement; field types; cross-entity relationships; rollup patterns) earned
- No structured IA v3 absorption move authored
- No milestone marker authored
- No held-candidate adjudication
- No Zone 1B / Zone 3 / Zone 5 pressure
- No intake-reference-rationale growth-pressure test
- No edits to `docs/architecture.md`, `docs/index.md`, `README.md`, `docs/method.md`, `AGENTS.md`, the grounding note, or any prior artifact in this Stage C scope (a separate orientation-layer absorption PR would route this finding)

## Whether Zone 4 Reuse-Time Governance Trace Holds, Partially Holds, Partially Breaks, or Breaks

**Holds at this test depth.** Aggregate 9.0 / 9.0 = 100%; per-event sub-aggregate 4.0 / 4.0; cross-event sub-aggregate 4.0 / 4.0. All scored dimensions reconstructed without partial or failure marks. The Zone 4 conceptual posture's four architecturally-distinct reuse types (continuity-anchor; dimensional-citation; derivative-generation; superseded-asset-reuse), the cross-event same-asset multi-role pattern, the cites-vs-joins family-coherence distinction, the supersession-detection dimension, and the per-event approval-implication classification are all reconstructable from the mocked Z4-B + Z4-C + Z4-E + rejected/stale complement hybrid carrier shape.

The trace holds at one-reader / one-substrate / four-event / one-primary-source / one-active-family / one-supersession / mocked-shape depth. It does NOT extend operationally to multi-reader / cross-substrate / multi-source-asset / multi-family / chained-supersession / conflicting-evidence / long-context conditions; those generalizations remain held.

## Whether Z4-C Is Sufficient, Strained, or Inconclusive At This Substrate Depth

**Sufficient and not meaningfully strained at this substrate depth.** Per the reader's Q-9a verbatim observation.

This is a different and more confident framing than PR #266's R-D signal at the intake-time axis. PR #266's reader observed R-D as "sufficient ... but visibly near the edge of structural strain"; this reader observed Z4-C as "sufficient and not meaningfully strained." The architectural reason the reader gave: Z4-C's separate event records "made the distinction between continuity-anchor reuse, dimensional citation, derivative generation, and stale/superseded reuse easy to reconstruct" — that is, the four-way reuse-type distinction is exactly the kind of structural distinction that benefits from per-event-record-as-first-class-object.

The conditional framing the reader added (Z4-C remains sufficient "for this case"; Z4-D becomes less natural under specific load-bearing conditions) suggests Z4-C's natural-fit zone is multi-event-with-multi-dimensional-properties substrates, while simpler substrates may not differentiate Z4-C from Z4-D.

This is the strongest claim the test supports. The test does NOT support "Z4-C is the right long-term shape" or "Z4-C scales to all substrates."

## Whether Z4-D Remains Materially Plausible

**Yes, materially plausible — particularly for simpler substrates where the reader-named load-bearing properties (event identity; supersession status; approval implication; derivative lineage; family-coherence relationships) do not all apply.**

The reader explicitly identified four scenarios where Z4-D may be "about the same" or different:

- **One-source-per-packet simple cases**: Z4-D "about the same" — the linkage annotation can carry the per-event content without strain
- **Multi-dimensional-property cases**: Z4-D "likely less natural" — the five load-bearing properties make the reuse event substantial enough to deserve its own structural identity
- **Cross-event comparison requirements**: Z4-D "could bury cross-event comparison" — distributing reuse data across linkage points on multiple packets makes same-asset cross-event patterns harder to navigate
- **Packet-reference surface convenience**: Z4-D "would be convenient at the packet-reference surface" — for surface-level questions ("what does this packet's reference do?"), linkage annotation reads well

These observations directionally favor Z4-C for multi-event multi-dimensional substrates and favor Z4-D for simpler single-event single-dimension substrates. The architecture has both kinds of cases (some packets cite a single source for a single reason; some intake events produce multiple packets with multi-dimensional reuse). The choice between Z4-C and Z4-D may eventually depend on which kind of case dominates at scale — which is not knowable from this test.

The Z4-C vs Z4-D choice from PR #268 remains held. This test sharpens the signal without closing the choice. The signal direction: **Z4-C is operationally supported for multi-event multi-dimensional substrates; Z4-D remains materially plausible for simpler substrates AND has not been directly pressured here.**

## Implications for Subsequent Pressure Surfaces

Implications only; no authorization.

- **Symmetric Z4-D-mocked test against the same substrate** would generate direct operational pressure on Z4-D and enable a symmetric Z4-C vs Z4-D comparison. Candidate; not authorized.
- **Multi-source-asset substrate test** would test Z4-C's per-event records under higher source cardinality. If Z4-C scales gracefully, the natural-fit-for-multi-event signal strengthens. Candidate; not authorized.
- **Multi-intake-event substrate test** would test reuse patterns spanning multiple intake events over time. Candidate; not authorized.
- **Multi-family substrate test** would pressure Z4-E's family-coherence carrier under cross-family reuse load. Candidate; not authorized.
- **Chained-supersession substrate test** would pressure the supersession-trace carrier under X → X' → X'' chains. Candidate; not authorized.
- **Conflicting-evidence substrate test** would pressure architectural seam coherence when reuse events make mutually incompatible claims about the same source asset. Candidate; not authorized.
- **Multi-reader replication of this test** would test reader variability against the mocked hybrid. Candidate; not authorized.
- **Cross-substrate generalization test** would pressure the hybrid posture beyond the kitchen-textiles base. Candidate; not authorized.
- **Long-context / temporal-pressure test** remains unpressured. Candidate; not authorized.
- **Combined intake-reference-rationale + Zone 4 carrier interaction test** would test architectural seam coherence between the two carrier families. The two seams are currently independent at test depth; combined pressure would test integration. Candidate; not authorized.
- **Specific Zone 4 carrier implementation / structured IA v3 absorption** is now stronger than before, with operational support from PR #266 (intake-reference-rationale) and this test (reuse-time governance). The carrier-shape selection between Z4-C and Z4-D remains held; implementation pressure would force the choice. Candidate; not authorized.

## Self-Superseding Clause

This artifact is a v1 finding of a single-reader / single-substrate / four-event / one-primary-source / one-active-family / one-supersession / Z4-C-mocked test. It should be superseded by:

- A symmetric Z4-D-mocked test against the same substrate that generates direct operational pressure on Z4-D.
- A multi-source-asset substrate test that pressures Z4-C's per-event records under higher source cardinality.
- A multi-intake-event substrate test that pressures cross-intake-event reuse patterns.
- A multi-family substrate test that pressures Z4-E's family-coherence carrier under cross-family load.
- A chained-supersession substrate test that pressures supersession-trace carrier durability.
- A conflicting-evidence substrate test that pressures architectural seam coherence.
- A multi-reader replication of this test that confirms or surfaces variability against the mocked hybrid.
- A cross-substrate generalization test (richer / sparser / multi-mode content) that pressures the hybrid posture under wider substrate variation.
- A combined intake-reference-rationale + Zone 4 carrier interaction test (architectural seam coherence between the two carrier families).
- A long-context / temporal-pressure test.
- A specific Zone 4 carrier implementation move that authors entity placement, field types, cross-entity relationships, and rollup patterns — informed by the Q-9 reader signal favoring Z4-C for multi-event multi-dimensional substrates.
- A structured IA model v3 that absorbs the Zone 4 operational support into the YAML appendix's held_questions list.
- A subsequent decision surface that resolves the Z4-C vs Z4-D selection based on operational evidence from a symmetric test or growth-pressure substrate.
- A subsequent milestone marker (milestone 12, etc.) that absorbs Zone 4 operational evidence into a plateau.
- The eventual wholesale rewrite of [`docs/architecture.md`](architecture.md) that consolidates Zone 4 evidence at greater depth.

It does not supersede the Zone 4 governed-output continuity / reuse-derivative governance decision surface v1 (PR #268; the constraint vocabulary this artifact reads against), the intake-reference-rationale carrier decision surface v1 (PR #263) or operational pressure test v1 (PR #266; the parallel intake-time axis remains its own surface), the milestone-11 plateau marker, the Option F trace carrier shape design surface v1 (PR #256), the Option F contradiction-present continuity-break test v1 (PR #258), the Option F multi-contradiction continuity-break test v1 (PR #260), the intake trace carrier decision surface v1 (PR #252), the continuity-breaking intake trace test v1 (PR #250), the brand-system carrier decision surface v2 (PR #248; which located Zone 4 as adjacent decision surface), the brand intake judgment-trace dry run v1, the layered reference and discretion architecture v1 (PR #239), the layered intake architecture v1 (PR #241), the past-campaigns deepening (PR #243), structured IA model v2, the apex definition-layer artifact, the Phase 1 mode sketches, the cross-mode synthesis, the six Phase 2 deepenings, milestone 8, milestone 9, milestone 10, or milestone 11. Those remain authoritative for their content depth; this artifact reads them at Zone-4-operational-pressure-test depth.

## Anchor Documents

### Direct conceptual predecessor (the design surface this test pressures)

- [`docs/governed-output-continuity-reuse-derivative-governance-decision-surface-v1.md`](governed-output-continuity-reuse-derivative-governance-decision-surface-v1.md): PR #268 design surface; named Z4-A REJECTED, Z4-B / Z4-C / Z4-D / Z4-E STRUCTURALLY SUGGESTED in distinct roles, rejected/stale complement, hybrid posture with Z4-C vs Z4-D HELD pending operational pressure (this test addresses that held question at one-reader / one-substrate / Z4-C-mocked depth)

### Parallel operational pressure test (intake-time axis)

- [`docs/intake-reference-rationale-operational-pressure-test-v1.md`](intake-reference-rationale-operational-pressure-test-v1.md): PR #266 operational pressure test at the intake-time axis; carrier-shape pressure signal pattern this artifact parallels at reuse-time scope (PR #266 mocked R-D + judged R-C; this test mocked Z4-C + judged Z4-D — symmetric inversion of which alternative is mocked at each axis)
- [`docs/intake-reference-rationale-carrier-decision-surface-v1.md`](intake-reference-rationale-carrier-decision-surface-v1.md): PR #263 intake-time design surface; carrier-shape vocabulary (R-A/B/C/D/E + hybrid + held-pending-pressure) PR #268 paralleled for reuse-time

### Substrate this artifact reads against

- [`docs/option-f-trace-carrier-shape-design-surface-v1.md`](option-f-trace-carrier-shape-design-surface-v1.md): PR #256 Option F constraint vocabulary
- [`docs/option-f-multi-contradiction-continuity-break-test-v1.md`](option-f-multi-contradiction-continuity-break-test-v1.md): PR #260 carrier-shape sharpened-not-closed framing this artifact adopts
- [`docs/brand-system-carrier-decision-surface-v2.md`](brand-system-carrier-decision-surface-v2.md): PR #248 located Zone 4 at governed-asset / reference-linkage layer
- [`docs/brand-system-input-past-campaigns-to-ia-mapping-v1.md`](brand-system-input-past-campaigns-to-ia-mapping-v1.md): PR #243 past-campaigns deepening; governed-output continuity as architectural concern
- [`docs/architecture.md`](architecture.md): Scale-of-Operation Held Question framing reads as premise

### Conceptual framing

- [`docs/layered-reference-and-discretion-architecture-v1.md`](layered-reference-and-discretion-architecture-v1.md): PR #239 nine-fold reference-function taxonomy + nine-site creative-discretion decomposition
- [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](brand-discovery-digestion-layered-intake-architecture-v1.md): PR #241 seven-stage extraction sequence
- [`docs/structured-ia-model-v2.md`](structured-ia-model-v2.md): held_questions list this artifact's signal maps to (without mutating)

### Plateau markers

- [`docs/milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md`](milestones/milestone-11-zone-6-option-f-carrier-shape-plateau.md): current plateau marker
- [`docs/milestones/milestone-10-phase-2-six-category-synthesis-plateau.md`](milestones/milestone-10-phase-2-six-category-synthesis-plateau.md): prior plateau marker

### Workflow framing

- [`AGENTS.md`](../AGENTS.md): repo-local workflow rules
