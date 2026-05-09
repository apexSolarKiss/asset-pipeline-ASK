# Brand Discovery / Digestion // Sparse-Articulation Fallback Pressure v1

## Posture

```text
Phase 2 fallback-pressure artifact
on-paper architecture pressure test
tests sparse / contradictory / absent brand-system input across multiple categories simultaneously
not a new input-category deepening
not an intake form
not a UI
not Airtable
not schema mutation
not brand-specific
not milestone-8
not architecture.md rewrite
self-superseding once Phase 2 produces a fuller model
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md) and [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md), this artifact pressure-tests Phase 2's fallback model against sparse / contradictory / absent input conditions across multiple input categories simultaneously. It does not deepen a fourth input category. It uses the three deepened categories already on main as its test surface.

## Why Sparse-Articulation Pressure Is Next

The three Phase 2 deepenings already on main (photography style guide; asset library; brand platform) demonstrated that the deepening pattern generalizes structurally across distinct input-category shapes — articulated visual conventions, demonstrated visual evidence, non-visual articulation-only.

But each deepening tested its own category under reasonably-articulated conditions. None tested:

- What happens when one category is sparse and another is rich
- What happens when two categories contradict
- What happens when the visual-input pair contradicts brand platform
- What happens when all three are sparse
- How the fallback chains compose when multiple fallbacks apply simultaneously

Sparse-articulation pressure is the next architectural pressure-test before structured IA modeling because it tests the *model under stress* rather than the *model on cleanest cases*. If the model breaks under sparse / contradictory / absent input, structured form would prematurely freeze the broken state. If the model holds, structured form can commit to the holds-cases with operator-judgment-clearly-marked for the strain-cases.

## What This Artifact Pressures

This artifact pressures **the Phase 2 fallback model and the cross-category interaction surface**, not a particular input category's depth. The boundary is:

- In scope: how the fallback chains compose; where the IA can resolve sparseness; where operator judgment becomes load-bearing; what remains prose-carried under stress; what might eventually earn structural carriers
- Out of scope: deepening any input category further; proposing schema mutations; resolving any apex Named Limitation; operationalizing any case

## Test Matrix Across the Three Input Categories

Five conditions, each pressuring a different shape of articulation incompleteness. None describes any specific brand; the conditions are conceptual.

### Condition 1 — Brand platform sparse / photography rich / asset library rich

**Setup:** brand has weak abstract articulation (values vague or absent; voice undescribed; stance implicit). Photography style guide is well-articulated. Asset library is rich.

**Fallback chain:**
- Brand-system layer content derives from asset library's collective gestalt + photography style guide's brand-level constants
- Voice register: derivable from library + style guide
- Stance: partially derivable (visual posture demonstrates stance toward subject); decisively unrecoverable for non-visual stance components
- Values: most lossy — values are abstract; visual evidence demonstrates values *in operation* but doesn't articulate them
- Audience / promise / authority: not directly recoverable from visual evidence

**What the IA resolves:** voice register; visual posture; aesthetic stance.

**Where it strains:** values articulation; authority / decision posture; promise. These remain operator-derived from contextual interpretation that the IA cannot anchor in the visual evidence alone.

**Mark inferred-not-stated:** values; authority; promise; audience-as-articulated. The visual-rich → brand-platform-derived path works for visual-adjacent content; non-visual brand platform components cannot be derived this way.

### Condition 2 — Brand platform rich / photography sparse / asset library rich

**Setup:** brand has articulated values + voice + stance + exclusion boundaries. Photography style guide is minimal (no formal style document or thin one). Asset library is rich and demonstrates conventions implicitly.

**Fallback chain:**
- Photography style guide content derives from asset library's collective gestalt
- Cross-validation: library should align with brand platform; if divergent, library carries (visual-as-fidelity)
- Operator labor: deriving role-typical conventions per slot role from library segments

**What the IA resolves:** photography conventions per role; brand platform content directly; reference linkage from library to packets.

**Where it strains:** cross-slot consistency for prose-only constituents (collection-mode finding) — verbatim repetition is needed; if photography style guide is sparse, the operator must derive role-typical conventions per role from library segments. Labor-intensive but tractable.

**Mark inferred-not-stated:** photography conventions where the library is thin in a specific role. Brand platform content stays as-articulated.

This is the cleanest condition. Visual-as-fidelity-strategy carries.

### Condition 3 — Brand platform rich / photography rich / asset library sparse

**Setup:** brand has articulated values + photography style guide. Asset library is thin (early-stage brand; recent rebrand; or sparse archive maintenance).

**Fallback chain:**
- Prose articulations populate IA carriers directly
- No operational validation available — the visual-as-fidelity claim's resolution mechanism (library carries when prose contradicts) is unavailable here
- Packet-level reference linkage: limited by library availability; brand may need to generate references from prose-only inputs

**What the IA resolves:** prose articulations flow into prose-carrier-shaped IA surfaces (`bounded_creative_discretion`, `creative_intent`, `business_intent`, `slot_prompt`, `capture_reason`).

**Where it strains:** packet-level references — `approved_reference_keys` may be empty or thin if no library imagery exists; the implementation goal vs conceptual goal distinction (Path A finding) becomes hard to verify pre-generation; library demonstrates conceptual goal achievement; without it, only generation cycles can validate alignment with prose articulation.

**Mark inferred-not-stated:** nothing brand-platform-specific (it's articulated). What gets marked is *operational validation gap* — the operator must trust prose absent visual confirmation.

This is the condition where the architecture's reliance on visual evidence becomes most pressed. Brand has to bootstrap visual grounding through generation rather than through library reference. The architecture holds; the operational burden shifts to first-generation cycles that establish library-shaped grounding through curation events.

### Condition 4 — Brand platform generic / photography contradictory / asset library divergent

**Setup:** brand platform articulation is bland or generic ("authentic"; "premium"; "approachable" — values that could describe many brands). Photography style guide contradicts itself across sections, or contradicts the library. Asset library has divergent registers (different stylistic eras; different sub-team work; rebrand mid-evolution).

**Fallback chain:**
- Library contradicts photography → library carries (visual-as-fidelity)
- Library has divergent registers → operator identifies which register is current / operational; treats older as continuity reference, not authority
- Brand platform is generic → derive from library; mark inferred-not-stated; the generic articulation provides little authoring signal beyond "don't violate it"
- Photography guide contradicts itself → newer carries; older as continuity

**What the IA resolves:** layered authority chain — library-carries-over-prose; newer-carries-over-older; specific-carries-over-generic. The fallback model gives the operator structured options for resolution at each conflict point.

**Where it strains:** the operator's burden becomes substantial. Generic brand platform doesn't usefully constrain authoring; contradictory style guide sections require operator interpretation to resolve; divergent library registers require operator judgment about which register is the brand's current self.

**Mark inferred-not-stated:** brand platform inferences; current-vs-historical library register distinctions; resolved-from-contradictory-prose conventions.

This is the operationally messiest condition. Real brands at scale or in transition often look like this. The architecture HOLDS in the sense that the fallback model surfaces options at every conflict point. It STRAINS in that operator judgment is load-bearing — the IA cannot auto-resolve.

### Condition 5 — All three sparse

**Setup:** brand platform missing or generic; photography style guide minimal or absent; asset library thin (early-stage brand; recent rebrand with platform in flux; brand operating across categories without consolidated visual articulation).

**Fallback chain:**
- Cross-category derivation impossible (every source is sparse)
- Default to Phase 1 worked-example patterns: HERO / PROFILE / DETAIL slot roles; warm-neutral architectural studio-world; per-mode role taxonomies; the cleanest-case mappings from B1–B5
- Operator authors substantial brand-system content from scratch using systemic patterns
- Mark everything as inferred-not-stated or default-not-specified

**What the IA resolves:** brand-agnostic baseline. The Phase 1 worked-example defaults give the IA structural shape and conventional content; nothing brand-distinctive flows through automatically.

**Where it strains:** brand-distinctive content is missing entirely; operational result becomes brand-system-shaped only through operator authoring discipline, not through intake.

**Mark inferred-not-stated:** essentially everything. The IA's output without operator authoring would be generic systemic-pattern work, not brand-distinctive work.

The architecture holds in that nothing structurally breaks. It strains in that the IA's value-add when brand-system input is sparse is limited to operational scaffolding — which is real value, but distinct from carrying brand-distinctive identity.

## Fallback Chaining Patterns

The five conditions surface a layered fallback chain. The chain composes in a definable order across the three input categories.

1. **Asset library carries when prose contradicts.** Visual-as-fidelity-strategy from the apex aesthetic-layering pass; reciprocally established by the visual-input pair (photography style guide ↔ asset library deepenings). Holds across conditions 1–4 where library is non-empty.

2. **Photography style guide carries when library is sparse.** Prose articulation populates IA carriers directly when demonstrated evidence isn't available. Holds in condition 3.

3. **Brand platform carries for non-visual content when visual evidence is ambiguous.** Values, voice, stance, audience, promise content that visual evidence doesn't anchor cleanly comes from brand platform articulation. Holds in conditions 1, 4 (partially), 5 (when articulation exists at all).

4. **Within-category recency / specificity carries.** Newer over older; specific-to-category over brand-wide; current campaign over evergreen (within campaign scope). These intra-category fallbacks compose with the across-category chain.

5. **Phase 1 worked-example defaults carry when all brand-system inputs are sparse.** The architecture's brand-agnostic baseline. Operator authors brand-distinctive content layered over the defaults. Holds in condition 5.

6. **Operator marks inferred-not-stated where derivation is necessary but evidence is thin.** Prose convention; not currently a structural carrier. Surfaces the gap honestly.

The chain composes in this order: asset library → photography style guide → brand platform → intra-category recency / specificity → Phase 1 worked-example defaults → operator-marked inferred-not-stated.

When multiple sources are present and aligned, the chain is redundant (cross-validating). When sources are sparse or contradictory, the chain provides structured fallback paths the operator can apply.

## Where the Model Holds

- **Visual-as-fidelity-strategy fallback** — holds across conditions 1, 2, 4 (where library is non-empty). The reciprocal articulation from the visual-input pair makes this fallback robust.
- **Cross-category derivation between visual sources** — photography ↔ library derivation works in both directions when one is rich.
- **Phase 1 worked-example defaults as deepest fallback** — holds in condition 5. Provides operational scaffolding even when brand-distinctive input is absent.
- **Intra-category recency / specificity fallbacks** — hold within each category in conditions 4 and below. Generic-vs-specific and newer-vs-older are tractable resolutions.
- **Inferred-not-stated marking** — holds as a discipline across all conditions. Surfaces gaps honestly without blocking intake.

## Where the Model Strains

- **Non-visual brand platform components when brand platform is sparse and visual sources are rich** (condition 1) — values, authority / decision posture, promise / value proposition cannot be derived from visual evidence. Operator judgment becomes load-bearing.
- **Operational validation when asset library is sparse** (condition 3) — the visual-as-fidelity claim is unavailable; operator must trust prose articulation absent visual confirmation; first-generation cycles bear validation burden.
- **Operator-judgment burden when articulation is generic / contradictory** (condition 4) — fallback model surfaces options but doesn't auto-resolve; the operator's authoring labor scales with sparseness × contradiction.
- **Brand-distinctiveness when all sources are sparse** (condition 5) — defaults to brand-agnostic Phase 1 worked-example patterns; brand-distinctive content requires operator authoring layered over the defaults; the IA's value-add is operational scaffolding rather than brand identity.
- **Inferred-not-stated as prose convention rather than structural carrier** — works as discipline; would benefit from structural representation if sparse-articulation cases scale operationally; not earned yet.

## What Remains Prose-Carried

Under sparse-articulation pressure, the prose-carried row from the carrier-status matrix grows:

- All the prose-carried content from each input category's carrier-status matrix (already articulated in the deepenings)
- **Inferred-not-stated marking convention** — surfaces in `capture_reason` / `capture_notes` text and in operator authoring of packet-level fields; not structural
- **Operator-resolved-from-contradictory-prose annotations** — where the operator chose between conflicting articulated sources, that decision lives in `capture_notes` text or in working operator memory; not structural
- **Phase-1-worked-example-defaults-bootstrap annotations** — when the operator authors content from systemic defaults, that derivation lives in operator practice; not structural
- **Sparse-articulation aware curation criteria** — when the curator is judging candidates against partial brand-system anchors, the criteria selection process involves operator awareness of which fallback chain applies; not structural

## What Might Eventually Earn Structural Carriers

The pressure test surfaces structural-carrier candidates beyond what the per-category deepenings surfaced:

- **`articulation_state` flag on input-category records** — distinguishing rich / sparse / generic / contradictory articulation states. Would be useful if brand-system layer becomes first-class; depends on Named Limitation #1 resolution.
- **`derivation_basis` field on packet-level / slot-level prose carriers** — recording whether content is articulated, derived from visual evidence, derived from defaults, or operator-authored. Would surface inferred-not-stated state structurally rather than as prose convention.
- **`fallback_chain_position` annotation on resolved content** — tracking which level of the fallback chain a content piece came from. Aids audit and revision.
- **A `worked_example_defaults` first-class carrier** — explicit articulation of the Phase 1 worked-example baselines as a structural fallback layer. Would let intake explicitly pull from defaults when brand-system input is sparse.
- **`contradiction_log` first-class entity** — tracking where contradictory articulated sources were resolved by operator judgment. Aids future re-intake when articulation evolves.

None of these is earned by current operational pressure. All are paper-pressed by sparse-articulation pressure as candidates the model could eventually accommodate. The pressure test concretizes the candidates without authorizing them.

## What This Means for Structured IA Model Timing

The pressure test bears explicitly on whether structured IA modeling is the right next move.

**For doing it now:**
- Translation to machine-readable form would itself test internal consistency
- The model holds across the five test conditions; structured form could capture the holds-cases cleanly

**Against doing it now:**
- The pressure test surfaces operator-judgment burden as load-bearing in conditions 4 and 5. A structured IA model would have to either (a) capture only the IA-resolves-this content, leaving operator-judgment paths as unstructured, or (b) attempt to structure operator-judgment paths, which would be designing-ahead-of-pressure exactly what the v51 doctrine warns against.
- The test surfaces five new structural-carrier candidates (articulation_state; derivation_basis; fallback_chain_position; worked_example_defaults; contradiction_log). None earned operationally; structured-form would have to choose how to handle them — include speculatively, or exclude and lose representation, or mark as held.
- The Phase 1 worked-example defaults that act as deepest fallback aren't currently structural anywhere. Structured form would have to articulate them.

**Honest read:** the pressure test makes the case for delaying structured IA modeling at least one more move. Specifically:

- If structured IA model is authored next, it should explicitly mark *what the IA can resolve structurally* and what *remains operator judgment* — translating the pressure test's findings into structural shape
- Or: structured IA model is folded into milestone-8 synthesis, which absorbs both the pressure test and the structured form together
- Or: another small artifact addresses the inferred-not-stated / fallback-chain-position questions surfaced here before structured form is committed

The structured IA model's timing question shifts from "now or later?" to "what shape does it take given the pressure-test findings?" That's a different question than the one the candidate's threshold criteria asked.

The pressure test does not authorize structured IA modeling next. It also does not block it. It surfaces that the structured form, when authored, will need to carry the operator-judgment-burden findings honestly, which means it can't be a clean machine-readable representation of just the prose synthesis; it has to also represent the model's own limits.

## Open Questions

1. **Does the architecture need structural representation of inferred-not-stated content?** Currently a prose convention; sparse-articulation pressure makes the case for structural form (status flag; derivation-basis field). Not earned operationally; surfaced as a candidate.

2. **What happens when articulation is in active flux (mid-rebrand; pivot stage)?** The fallback chain assumes a relatively stable brand-system source. When the source is itself evolving, intake architecture becomes versioning architecture — held.

3. **How does sparse-articulation interact with the curation-premise pressure question?** When brand platform is sparse, campaign-concept selection (the upstream creative act) has thinner upstream input. Whether the premise pressure compounds or attenuates under sparse brand platform is unprobed.

4. **Should the Phase 1 worked-example defaults have a structural carrier?** Currently they're worked-example evidence in B1–B5 prose; intake's deepest fallback. If intake routinely falls back here for early-stage or sparse brands, articulating defaults as structural baseline content might earn its keep — held.

5. **How does the architecture handle multiple brand-posture variants in one base** (condition 4's divergent library registers case)? Currently treated as operator judgment about which register is current. Whether the architecture should support multi-register brand-system content — sub-brand handling adjacent — is held.

6. **Does sparse-articulation pressure transfer to operational pressure when Phase 3 demonstrates the IA in action?** This pressure test is paper-only. Phase 3 (held) would test whether sparse-articulation conditions break in practice or hold. Not authorized; flagged as the eventual operational pressure that would either deflate or sharpen the test's findings.

7. **What's the right shape of the next Phase 2 artifact, given the pressure-test findings?** Three candidates surface: structured IA model (with operator-judgment paths explicitly marked); a small artifact specifically on inferred-not-stated content carriers; another input-category deepening (visual identity system as the most distinct remaining shape). Sequencing held for ASK direction.

## Self-Superseding Clause

This artifact is a Phase 2 fallback-pressure surface. It should be superseded by:

- whatever next Phase 2 artifact ASK authorizes (structured IA model with pressure-test findings folded in; or a small inferred-not-stated artifact; or another input-category deepening)
- the Phase 2 milestone synthesis when produced
- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs and any operational evidence
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, and any operational evidence
- any operational test that earns or refutes the fallback model's stress-case findings

It does not supersede the Phase 2 opening sketch, the three deepening artifacts, the Phase 1 sketches or cross-mode synthesis, the apex artifact, or its predecessor passes. Those remain authoritative for their subject matter; this artifact pressure-tests the model they articulate.

## Anchor Documents

### Phase 2 framing

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; original fallback model that this artifact pressures
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): photography style guide deepening — articulated visual conventions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset library deepening — demonstrated visual evidence
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening — non-visual articulation-only
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that frames Phase 2

### Phase 1 outputs (the IA layer model the pressure test reads against)

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; carrier-status matrix that this artifact extends
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode IA content; cross-slot consistency finding referenced in condition 2
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode IA content
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content; curation-premise pressure question referenced in open question 3
- [`docs/full-flow-path-a-findings-pkt-sku-009.md`](full-flow-path-a-findings-pkt-sku-009.md): SKU-driven Path A; implementation-vs-conceptual goal distinction referenced in condition 3

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitation #1 carried forward; "structure earns its keep over prose by observed operational pressure" rule applied to structured IA model timing
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback claim that grounds the asset-library-carries fallback in conditions 1, 2, 4

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
