# Brand-System Input // Brand Platform → IA Mapping v1

## Posture

```text
Phase 2 deepening artifact
brand platform input category only
on-paper IA mapping
not an intake form
not a UI
not Airtable
not schema mutation
not brand-specific
not milestone-8
not architecture.md rewrite
self-superseding once Phase 2 produces a fuller model
```

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md) and [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md), this artifact deepens the brand platform input category into an IA mapping. It is the third Phase 2 deepening artifact, after the visual-input pair: [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md) and [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md).

The visual-input pair demonstrated Phase 2's deepening pattern across two related-but-distinct visual-input shapes. Brand platform is the cross-domain generalization test: a non-visual, articulation-only, abstraction-heavy input category that pressures the unmodeled brand-system layer most directly.

## Why Brand Platform Is the Next Deepening Surface

Two reasons brand platform is the right next move:

1. **Cross-domain generalization test.** The visual-input pair are two halves of one domain — both about visual evidence, differing in articulation form. A more rigorous test of the deepening pattern's generalization is whether it survives a non-visual input category. Brand platform is the most non-visual category in the Phase 2 opening sketch's six-category set.

2. **Pressures the unmodeled brand-system layer most directly.** Phase 1 named the brand-system layer as currently unmodeled across all four worked-example modes. The visual artifacts touched this layer interpretively (asset library's collective gestalt; photography style at brand-level constants). Brand platform content lives *primarily* at the brand-system layer — values, voice, stance are inherently brand-system-level concerns. Articulating the mapping forces a confrontation with the layer's unmodeled status.

Brand platform also positions sparse-articulation fallback pressure (a candidate next-or-after move) to be meaningfully sharper, because three input categories give the pressure test more substance to pressure against than two.

## What Counts as Brand Platform Input

Brand platform content is the brand's articulation of what it *is* — its propositional identity. Eight components are conceptually distinct, even when a particular brand collapses several into one document or articulates none in structured form at all.

### Values

Declared principles the brand stands for. Often listed as 3–7 short statements. Range from highly abstract ("authenticity"; "craft") to operationally concrete ("we never use stock imagery"; "we always show the maker").

### Voice

How the brand speaks — tone register, vocabulary preferences, rhythm conventions, formality level, humor handling, declarative vs interrogative posture. Often articulated as voice principles ("we are warm but not sentimental") plus do/don't pairs.

### Stance

The brand's posture toward its subject. Not what the brand DOES but how it RELATES to what it does. Whether it treats its category as everyday, aspirational, technical, ceremonial, etc. Often the most under-articulated brand platform component because it operates beneath conscious articulation.

### Audience / use context

Who the brand makes its work for, in what situations, with what expectations. Distinct from market segmentation (which is operator-side strategy); audience here is articulated in terms of how the work meets the audience's relationship to the subject.

### Promise / value proposition

What the brand commits to delivering. Often articulated as a single core promise ("everyday quality at honest pricing") plus supporting commitments. Distinct from features or product attributes; the promise is the brand's relationship to delivery.

### Authority / decision posture

Where the brand holds firm and where it defers. Which kinds of decisions the brand brings explicit authority to (often: voice; visual identity; flagship campaign work) versus which it leaves to operator latitude (often: routine product photography; merchandising-driven layout). Articulates the brand's actual governance shape.

### Narrative themes

Recurring motifs, story patterns, conceptual returns the brand makes. Distinct from campaign concepts (which are mode-specific instantiations); narrative themes are brand-level patterns that surface across many campaigns.

### Exclusion boundaries

What the brand explicitly refuses — categories of imagery, voice, framing, or claim that are off-message. The negative-evidence side of brand platform articulation; often more decisive than positive articulation because exclusion is easier to render explicit than inclusion.

The eight components overlap in practice. Values typically imply voice; voice carries stance; stance shapes exclusion boundaries. The components are conceptually distinct so intake can address each separately when needed; in operation they often resolve as a coherent posture or fail coherently together.

## How Brand Platform Differs from Visual-Input Categories

This is the load-bearing distinction for understanding brand platform's IA mapping.

### Articulation-only rather than visual evidence

Photography style guide articulates conventions but typically pairs articulation with reference imagery. Asset library is visual evidence with metadata. Brand platform is *purely* propositional — text articulating intent without visual artifacts to ground in. There is no asset library equivalent for brand platform; intake cannot fall back on "show me what the brand actually does at the values level" because values don't have direct visual demonstrations.

### Upstream rather than directly generative

Visual inputs feed the IA layers that directly produce assets — photography style guide content lands in slot_prompt prose; asset library content lands in `reference_assets`. Brand platform content does *not* land in the assets; it shapes the *upstream conditions* under which the assets are authored. Brand platform is the most upstream input category — it influences everything else but doesn't directly become anything in the IA's output.

### High abstraction, low operational specificity

Photography style guide content is operationally specific ("use generous side-light"; "crop tight on detail"). Asset library content is operationally concrete ("here are 200 approved images"). Brand platform content is operationally abstract ("we are warm but not sentimental"; "we treat our subject as everyday"). The translation from brand platform articulation to operational decisions requires interpretive judgment at every downstream layer.

### Strongest pressure on the unmodeled brand-system layer

Phase 1 named the brand-system layer as currently unmodeled. Visual artifacts touched this layer secondarily — most of their content distributed to lower layers with structural carriers. Brand platform content is *primarily* brand-system-layer content. The mapping forces the question: where does brand platform content GO when its target layer has no first-class carriers? Answer: it flows downstream as operator-interpretive guidance into prose carriers at lower layers. The brand-system layer remains unmodeled; brand platform deepening surfaces this gap concretely rather than as an abstract Named Limitation.

### Most likely to be ghostwritten or aspirational

Brand platform documents are often the result of strategic workshops, executive committees, or external agency engagements. The articulated form is itself a downstream representation of underlying intent — and the underlying intent may not be coherent. Intake architecture should expect brand platform articulation to be partial, performative, or aspirational rather than descriptive of the brand's operating reality. The visual-as-fidelity-strategy claim from the apex aesthetic-layering pass extends here: when articulated values diverge from demonstrated behavior (in the asset library or in past campaigns), the demonstrated behavior is the honest read.

## Mapping to IA Layers

Brand platform content distributes across IA layers in a sharply asymmetric way — concentrated at the brand-system layer (which is unmodeled) and at the curation seam (where it shapes judgment criteria). Lower layers receive *derived* content rather than original brand-platform content.

### Brand-system layer (currently unmodeled in IA)

**Receives:** the bulk of brand platform content. Values, voice, stance, narrative themes, exclusion boundaries, and authority / decision posture all live conceptually at this layer.

**Resolution shape:** brand-system layer is currently unmodeled. Brand platform content has no first-class carrier; it flows downstream as operator-interpretive guidance that shapes packet-level authoring, slot prompt authoring, and curation criteria. **This is the most concrete instantiation of Named Limitation #1's gap surfaced anywhere in Phase 1 + Phase 2 work.** Visual inputs interact with this layer secondarily; brand platform IS this layer's primary content.

### Category / product-class layer (currently signaled-only in IA)

**Receives:** typically nothing brand-platform-specific. Brand platform content is usually category-invariant (the same values apply across all categories the brand operates in; the same voice carries across all categories). Where category variation exists (e.g., a brand has different voice register for kids' products vs adult products), it surfaces here as a category-conditional brand-platform overlay — but this is uncommon in practice.

**Resolution shape:** typically empty for brand platform input. The category layer's IA content comes mostly from category-specific photography style and asset library segments, not from brand platform.

### Mode-specific layer (varies per mode)

**Receives:** *derived* brand platform content. Voice register at brand-system level shapes campaign-mode editorial voice; values shape collection-mode grouping conventions; stance shapes marketing-mode message articulation. The mode-specific layer does not receive original brand-platform content; it receives mode-specific *expressions* of brand platform that the operator has interpreted from upstream.

**Resolution shape:** mode-specific layer carriers are mode-bound. Brand platform content reaches them through interpretation rather than through direct flow. This is the layer where abstract brand platform values become operationally specific per mode.

### Packet layer (the strongest current carrier)

**Receives:** brand platform content translated into packet-instance specificity. `business_intent` at the packet level typically encodes brand-platform-derived purpose; `creative_intent` encodes brand-platform-derived voice and stance for the packet's specific case; `bounded_creative_discretion` encodes brand-platform-derived constraints (especially exclusion boundaries).

**Resolution shape:** packet-level prose carriers (`business_intent`, `creative_intent`, `bounded_creative_discretion` text fields) carry the operationally-translated brand platform content. **This is the layer where brand platform content meets concrete operational pressure.** Per the Phase 1 finding that the packet layer is currently over-loaded with aesthetic + intent + (mode-specific overlay) responsibility — brand platform deepening sharpens this finding by adding *brand-system-layer translation* to the packet's responsibilities. Splitting packet responsibilities into separate carriers is paper-pressed in multiple Phase 1 / Phase 2 surfaces; not earned by brand platform deepening alone.

### Slot layer (the role-specific narrowing carrier)

**Receives:** rarely direct brand platform content. Slot_prompt prose may carry voice or framing language derived from brand platform, but the content is usually mediated through the packet level. Slot-role-specific brand-platform translation is uncommon at sketch depth.

**Resolution shape:** brand platform content reaches the slot layer through inheritance from the packet, not through direct authoring. Slot prompts express brand-platform-derived role-specific framing where relevant.

### Curation / governance layer

**Receives:** brand platform values + voice + exclusion boundaries shape curation criteria directly. `capture_reason` and `capture_notes` text frequently carry brand-platform-derived judgment ("this candidate doesn't carry our voice"; "this composition violates our exclusion boundary on overt narrative"; "this aligns with our restraint stance"). Authority / decision posture content shapes which `curation_pattern` value applies (more authority to operator → more agent-proposed-human-ratified; more authority held centrally → more human-cross-round-authorship-bearing-curation).

**Resolution shape:** curation provenance is structurally explicit per Phase 1 (five-axis provenance + `curator` + `curation_pattern`). Brand platform content reaches this layer through the prose carriers (`capture_reason` / `capture_notes`) and through the operator's selection of `curation_pattern`. The structural carriers are present; the brand-platform-derived *content* is text-carried.

## Cross-Mode Implications

Brand platform applies fairly uniformly across all four modes — values, voice, stance hold whether the work is product photography, collection merchandising, marketing communication, or campaign editorial. But mode-specific intensification varies.

### SKU-driven mode

Brand platform shapes baseline conventions (product-photography lighting register; framing posture; retouching latitude). Lowest intensification — SKU-mode work is the most operationally specific and brand-platform content shapes it indirectly through accumulated convention.

### Collection / merchandising mode

Brand platform shapes grouping logic (which combinations read as on-stance; which arrangements carry voice). Per Phase 1's collection-mode operational evidence, prose discipline carries the work. Brand platform content shapes the *content* of that prose discipline. Moderate intensification.

### Marketing / message-driven mode

Brand platform shapes message articulation directly. Voice and exclusion boundaries are the dominant brand-platform components for marketing-mode work. The message-bearing-element content the cross-mode probe identified is brand-platform-derived. Higher intensification.

### Brand campaign / editorial mode

Brand platform IS the campaign's coherence axis. Per Phase 1's campaign-mode sketch, editorial voice is structurally load-bearing in a way it is not in other modes — voice is brand-system-level brand platform content. Maximum intensification.

**The campaign-mode connection is sharper than the visual-input artifacts surfaced.** Per the cross-mode synthesis, the campaign-mode curation-premise pressure question (carried forward from B4 / B5) asks whether campaign-concept selection is upstream setup, a different runtime creative-discretionary act, or a premise that fragments. Brand platform deepening clarifies the upstream stack: campaign-concept selection draws on brand platform content; brand platform content lives at the unmodeled brand-system layer. *If* campaign-concept selection is upstream creative work (the premise-holds outcome), then brand platform articulation is the upstream-of-upstream content shaping that creative work. The premise pressure compounds — campaign mode pressures the curation premise; brand platform deepening pressures the source material the upstream creative work draws on.

This artifact does not resolve the premise pressure. It surfaces that brand platform articulation is structurally load-bearing for the question's resolution, regardless of which outcome the premise eventually reaches operationally.

## Fallbacks and Conflict Handling

Brand platform content presents distinct conflict patterns from visual input. Six recurring patterns plus the across-input fallback that connects brand platform to the visual evidence.

### Brand platform vs visual evidence

**Default fallback:** visual evidence carries. The foundational visual-as-fidelity-strategy / prose-as-fallback claim from the apex aesthetic-layering pass extends to this case: when the brand says X about itself and the asset library demonstrates Y, the demonstrated Y is the honest read of what the brand actually IS in operation.

**Why this fallback:** brand platform articulation is most prone to being aspirational or performative. The asset library is the brand's accumulated operational reality. Where they diverge, operating reality is the truth that downstream work must engage with.

### Brand platform vs past campaign behavior

**Default fallback:** past campaign behavior typically carries. Past campaigns are brand platform in operation; articulated platform may lag operating reality.

**Why this fallback:** brand platforms get rewritten less frequently than brands launch campaigns. The campaigns reflect what the brand has actually been comfortable doing; the platform may articulate older self-understanding.

### Abstract values vs concrete product / category needs

**Default fallback:** concrete needs carry within their scope. A brand value of "we don't use overt narrative" might bend for a category that requires explanatory imagery; specificity wins where it surfaces.

**Why this fallback:** abstract values are guides, not enforcement rules. Where a concrete category genuinely requires deviation, the deviation is operationally honest; the value is preserved by being held as the default outside the deviating category.

### Voice statements vs actual asset library voice

**Default fallback:** asset library voice carries. Same as the visual-input pair fallback; brand platform articulation of voice is an abstraction; the library demonstrates voice in operation.

**Why this fallback:** completes the load-bearing relationship the visual-input pair established. The same fallback applies whether the prose articulation is "photography style" or "voice" — articulated abstraction defers to demonstrated behavior.

### Missing or generic brand platform language

**Default fallback:** derive from asset library + past campaigns; mark as inferred-not-stated. Brand platform is the most commonly-missing input category — many brands have minimal explicit platform articulation.

**Why this fallback:** sparse brand platform articulation is common (early-stage brands; long-established brands with implicit posture; brands recently rebranded with platform in flux). Demanding articulation up front would block intake. Inferred-not-stated content from operational evidence is honest about its derivation.

### Conflicting values or unresolved tradeoffs

**Default fallback:** mark conflict; surface to operator; do not auto-resolve. Brand platforms sometimes contain genuinely conflicting values that require resolution at the packet level when concrete tradeoffs surface ("approachable AND premium"; "innovative AND timeless"; "warm AND restrained").

**Why this fallback:** resolved tradeoffs in brand platform are often false resolutions. Operationally, the tradeoff is real and gets adjudicated case-by-case. Surfacing the conflict honestly at intake preserves the real adjudication burden rather than papering over it.

## Prose-Carried Now vs Eventually Earning Structural Carriers

Brand platform content presents the most extreme prose-vs-structure asymmetry of any Phase 2 input category articulated so far.

### Structurally explicit now (across all four modes)

Almost nothing brand-platform-specific. The IA does not currently carry brand platform content directly. The structural carriers that exist (`business_intent` text, `creative_intent` text, `bounded_creative_discretion` text, `capture_reason` text, `capture_notes` text) are *prose surfaces*, not structural representation of brand-platform content.

The closest case: `curation_pattern` enum encodes part of authority / decision posture indirectly (the five values describe delegation patterns that brand authority shapes). But this is a thin connection; brand-platform authority content is not what `curation_pattern` was designed to carry.

### Prose-carried now (across all four modes; held)

- values (carried in `bounded_creative_discretion` and packet `creative_intent` text)
- voice (carried in `creative_intent` text and slot_prompt prose)
- stance (carried implicitly in packet text; rarely articulated directly)
- audience / use context (carried in `business_intent` text; rarely structured)
- promise / value proposition (carried in `business_intent` text)
- authority / decision posture (carried implicitly in `curation_pattern` selection; partially in `capture_reason` text)
- narrative themes (carried in packet text and reference linkage)
- exclusion boundaries (carried in `bounded_creative_discretion` text)

This is the longest "prose-carried now" row across any Phase 2 input category. Brand platform content lands almost entirely in prose carriers because the brand-system layer that should structurally carry it is unmodeled.

### Structurally suggested but not earned

- a `brand_platforms` first-class entity carrying values / voice / stance / etc. as structured fields
- a `brand_values` first-class entity for declared principles
- a `brand_voice_principles` structured field set
- structured `exclusion_boundaries` representation
- audience / use-context structured representation
- `narrative_themes` first-class linkable entity
- the unified brand-system-layer carriers question (Named Limitation #1) — sharpened most acutely by brand platform deepening because brand platform content has nowhere structural to go

These are paper-pressed across Phase 1 + Phase 2 work but unearned by any operational pressure. Brand platform deepening *concretizes* the gap (the IA has nowhere structural for brand platform content to live) without earning the resolution. The gap is real; the schema move is not yet justified by operational pressure.

### Operationally deflated

Nothing brand-platform-specific. The visual-input pair's deflation findings (collection-mode prose discipline carrying 1:N constituents; cross-axis curation tradeoff text-field carrying) don't extend cleanly to brand platform content because brand platform hasn't been operationally pressured at full-flow depth in any mode.

### Operationally untested

Most. Brand platform content has not been operationally pressured at full-flow depth in any mode. The campaign-mode premise pressure question implicates brand platform directly but remains held. Whether prose-discipline-only carrying of brand platform content holds operationally — or whether the brand-system-layer gap becomes an operational blocker — is unprobed.

## Open Questions

1. **How does intake handle brand platform articulation that is partial, performative, or aspirational?** Brand platform is the most commonly ghostwritten input category. The fallback model defaults to deriving from asset library + past campaigns when articulation is missing or generic. But "missing or generic" is a different shape from "richly articulated but performative." The performative case is harder — the brand has articulation, it just isn't operationally honest. Unprobed.

2. **How does the architecture handle brand platform updates over time?** Rebrands, voice refinements, values updates, post-acquisition platform evolution, executive-driven repositioning. Whether intake should re-trigger at the brand-system layer when platform updates, what supersedes vs accumulates, how operating-reality lag is reconciled — all unprobed.

3. **When brand platform conflicts with asset library, which segments of the library carry authority?** Recent campaign work may itself reflect the brand evolving away from older platform articulation. Older library work may reflect prior platform articulation. Defaulting to "library carries" is right at the macro level; at the segment level, *which* library evidence carries is a finer-grained question. Unprobed.

4. **What is the relationship between brand platform's authority / decision posture content and curation `curation_pattern` selection?** Authority content is operational; `curation_pattern` enum captures part of it indirectly. Whether structured representation of authority/decision-posture should become first-class — or whether `curation_pattern` selection plus `curator` field is sufficient — is unprobed at full-flow depth.

5. **How does the campaign-mode curation-premise pressure question (from B4 / B5) interact with brand platform deepening?** Brand platform deepening sharpens the question's stakes — campaign-concept selection draws on brand platform content; brand platform content lives at the unmodeled brand-system layer. *If* the premise refines or fragments under operational pressure, brand platform articulation becomes structurally load-bearing for the resolution. *If* the premise holds, brand platform remains upstream-setup content. Either way, brand platform articulation is the source material; the premise pressure resolution shapes how that material flows through the IA.

6. **Does brand platform deepening earn the brand-system-layer's structural carriers?** Honest answer: no. It concretizes the gap (the IA has nowhere structural for brand platform content to live) but does not surface operational pressure that earns schema mutation. Named Limitation #1 remains held; brand platform deepening is one more piece of evidence for *why* the limitation matters, not evidence that resolves it. A future operational test that pressures the unmodeled layer (brand platform content not flowing cleanly through the prose carriers) could earn the resolution; that test does not exist yet.

7. **How does brand platform interact with sub-brand or product-line architecture?** Same question as the Phase 2 opening sketch's open question 3, sharpened. A parent brand may have a coherent platform; a sub-brand may have a derivative platform with overrides. Whether sub-brand platforms are inheritance-modified copies, separate-but-related platforms, or scoped overlays is unprobed.

8. **Does the deepening pattern generalize across domains?** The visual-input pair tested generalization within the visual domain. Brand platform tests generalization across domains (visual → non-visual). Honest finding from this artifact: the pattern *partially* generalizes — define / map / cross-mode / fallback / carrier-status structure holds; the substance is differently distributed (concentrated at brand-system layer; almost nothing operationally deflated; almost nothing structurally explicit). The pattern absorbs the asymmetry; the artifact's shape adapts to it. This is the cross-domain generalization-test result.

## Self-Superseding Clause

This artifact is a Phase 2 deepening surface. It should be superseded by:

- subsequent Phase 2 deepening artifacts on the remaining three brand-system input categories (visual identity system; application guidelines; past campaigns), or by a sparse-articulation pressure note that pressures the deepening pattern across the categories
- a Phase 2 milestone synthesis when the deepening surfaces accumulate enough material
- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs and any operational evidence
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, and any operational evidence
- any operational test that earns or refutes the brand-system-layer's structural-carrier question (Named Limitation #1)

It does not supersede the Phase 2 opening sketch, the visual-input pair, the Phase 1 cross-mode synthesis, the four Phase 1 mode sketches, the apex artifact, or its predecessor passes. Those remain authoritative for their subject matter; this artifact reads them at brand platform column depth and articulates the IA mapping there.

## Anchor Documents

### Phase 2 framing

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; names brand platform as one of six brand-system input categories; this artifact deepens that category
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): first Phase 2 deepening artifact (visual-input pair, articulated-conventions side)
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): second Phase 2 deepening artifact (visual-input pair, demonstrated-evidence side); the visual-as-fidelity-strategy / prose-as-fallback claim it carries extends to brand platform's prose-vs-asset-library / prose-vs-past-campaign fallbacks
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that frames Phase 2 as the implementation entry surface where brand-system input enters the layered IA

### Phase 1 outputs (the IA layer model the brand platform mapping feeds into)

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; identifies stable shared layers, mode-specific layers, carrier-status matrix; carries the curation-premise pressure question that brand platform deepening sharpens
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode IA content
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode IA content
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content; editorial voice as structurally load-bearing axis directly anchored on brand platform's voice content; surfaces the curation-premise pressure question that brand platform deepening connects to upstream

### Apex and architectural-pass predecessors (load-bearing for foundational claims)

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitation #1 (specific aesthetic-carrier schema for brand-system / mode-category / product-class) is what brand platform deepening makes most concrete without resolving
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback claim that grounds the brand-platform-vs-visual-evidence and brand-platform-vs-past-behavior fallbacks

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
