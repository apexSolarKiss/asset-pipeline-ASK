# Brand-System Input // Photography / Image Style Guide → IA Mapping v1

## Posture

```text
Phase 2 deepening artifact
photography / image style guide input category only
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

Per [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md) and [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md), this artifact deepens *one* of the six brand-system input categories from the Phase 2 opening sketch — photography / image style guide — into an IA mapping. It does not re-articulate the whole brand discovery / digestion architecture; it does not deepen the other five input categories.

This is a structural mapping artifact. It articulates what kinds of photography / image style guide content live where in the layered IA, what stays prose-carried, what could eventually earn structural carriers, and how the foundational visual-as-fidelity-strategy / prose-as-fallback claim from the apex aesthetic-layering pass shapes the fallback behavior when prose and image evidence diverge.

## Why Photography / Image Style Guide Is the First Deepening Surface

Of the six brand-system input categories named in the Phase 2 opening sketch (brand platform; visual identity system; photography / image style guide; asset library; application guidelines; past campaigns), photography / image style guide is the closest Phase 2 equivalent to the project's core visual-production problem.

It directly pressures:

- **Visual references** — the apex artifact's primary high-bandwidth aesthetic carrier
- **Aesthetic carriers** — Named Limitation #1 of the apex (specific schema for brand-system / mode-category / product-class aesthetic carriers)
- **Brand-system layer** — Phase 1 named this layer as currently unmodeled across all four modes; photography style is one of its most legible content surfaces
- **Category / product-class variation** — photography style typically adapts per category (furniture vs apparel vs food); intake must resolve the brand's category-specific style
- **Packet / slot specificity** — slot_prompt prose currently carries role-specific composition / lighting language; photography style guide is the source for that prose
- **Fallbacks when prose and image evidence diverge** — the foundational visual-as-fidelity-strategy claim resolves this; photography style guide is the surface where this divergence most often surfaces

Brand platform is upstream but more philosophical. Asset library is powerful but could become operational / curatorial too quickly. Photography / image style guide is the cleanest bridge between brand-system input and visual asset production IA at this evidence depth.

## What Counts as Photography / Image Style Guide Input

Photography / image style guide content typically articulates the brand's conventions across ten dimensions, partially in prose, partially in reference imagery, partially implicit in the asset library's collective gestalt. Each dimension is conceptually distinct even when a particular brand collapses several into one section or none into structured form at all.

### Lighting

Direction (top, side, three-quarter, back), quality (soft / hard / diffused), intensity, time-of-day proxies (golden hour, midday, blue hour), shadow geometry, generosity (generous / restrained / dramatic).

### Composition

Framing conventions, rule-of-thirds vs symmetry, negative space treatment, focal-point hierarchy, balance, rhythm.

### Camera distance / angle

Close / medium / wide; eye-level / high / low; front-facing vs three-quarter vs profile; flat vs perspective.

### Cropping

Tight / loose / full-frame conventions; per-role cropping rules (HERO loose vs DETAIL tight); edge treatment.

### Background / environment

Studio backdrop conventions; lifestyle context settings; natural environment treatment; architectural set conventions; backdrop-vs-context rules.

### Material and surface treatment

Texture rendering fidelity, finish accuracy (matte / satin / gloss), color rendering of materials, edge-treatment of materials, reflective-surface conventions.

### Styling / prop logic

What other objects appear in frame; their hierarchy relative to subject; period / category-typical props; styling-as-context vs styling-as-distraction rules.

### Model or human-presence rules where relevant

Whether humans appear; how (full body / partial / hands-only); posture and gestural conventions; eye contact conventions; cropping of body parts; model-direction rules; demographic representation conventions where the brand articulates them.

### Post-production / color treatment

Color grade direction, contrast level, saturation level, retouching conventions, blemish handling, sharpening / softening rules, atmospheric adjustments.

### Channel or touchpoint adaptations

How the style adapts per touchpoint — wider crops for banners; tighter for social tiles; specific aspect-ratio rules; attention-budget adjustments; copy-overlay tolerance.

The ten dimensions overlap in practice. A brand's lighting articulation may be inseparable from its post-production articulation; cropping may be inseparable from composition; styling rules may live inside a section called "scene" rather than "styling." The dimensions are conceptually distinct so intake can address each separately when needed; in operation they often resolve as a coherent posture.

## Mapping to IA Layers

Photography / image style guide content does not map 1:1 to IA layers. Each style dimension contributes to multiple layers, and each layer draws from multiple dimensions. The mapping below names where each dimension typically resolves at this evidence depth.

### Brand-system layer (currently unmodeled in IA)

**Receives:** brand-level photography conventions — the constants that hold across categories, modes, packets, and slots. Typically: lighting register (warm / cool / neutral baseline); generosity vs restraint stance; post-production grade direction; model-direction posture; demographic representation conventions.

**Resolution shape:** brand-system layer is currently unmodeled. Photography style content at this layer flows downstream as constraints on lower-layer content, but has no first-class carrier. Phase 1 carried this gap; Phase 2 inherits it without resolving.

What populates this layer is the brand's most stable photography conventions — the ones that survive across packets, slots, modes, and categories. A brand with strong visual identity has substantial brand-system-layer photography content; a brand with weak articulation has thinner content here.

### Category / product-class layer (currently signaled-only in IA)

**Receives:** category-typical photography adaptations of the brand-system constants. Typically: category-specific cropping rules (furniture full-set vs detail-only); category-specific styling logic (apparel on figure vs apparel flat-lay); category-typical environments (food on neutral surface vs furniture in lifestyle context); category-specific composition conventions.

**Resolution shape:** category presence is signaled per-SKU and via worked-example naming in current IA. Photography style content at this layer typically lives in style-guide sections like "Photographing the Furniture Line" or "Apparel Photography Conventions." Intake resolves the brand's category-specific photography conventions and feeds them into the category layer's signaled-only carriers; first-class category-aesthetic carriers remain unearned.

### Mode-specific layer (varies per mode)

**Receives:** mode-specific photography adaptations. Per Phase 1's mode-specific layer findings: collection / merchandising mode has grouping-aesthetic photography conventions (multi-subject framing; relational composition); marketing / message-driven mode has touchpoint-aspect-ratio adaptations (hero / tight / supporting variants); brand campaign / editorial mode has campaign-world coherence conventions (light direction; generosity register; voice continuity); SKU-driven mode has the cleanest case (per-SKU framing without mode-specific overlay).

**Resolution shape:** mode-specific layer carriers are mode-bound. Intake identifies which photography adaptations the brand's style guide covers per mode the brand operates in. Style-guide sections typically map to mode-specific layer content as: "Editorial Photography" → campaign mode; "Email Hero Imagery" → marketing mode; "Catalog Pages" → SKU mode; "Lookbook / Capsule" → collection mode. The mapping is not literal across brands; intake interprets the section structure.

### Packet layer (the strongest current carrier)

**Receives:** packet-level photography conventions specific to a recurring packet shape. Typically: packet-typical reference images (the brand's "house" lighting set; a recurring studio-world reference like REF-002 in the Phase 1 evidence); packet-level bounded creative discretion phrasing about photography; packet-level environment defaults.

**Resolution shape:** packet layer is the strongest current carrier per Phase 1. Photography style content at this layer flows into `packet-level reference linkage` (visual carrier), `bounded_creative_discretion` text (prose carrier), and `creative_intent` text (prose carrier). The packet over-load on aesthetic responsibility named in Phase 1 is sharpest here — packet-level photography content carries brand-level conventions plus category-level adaptations plus mode-specific overlays plus packet-recurring conventions.

### Slot layer (the role-specific narrowing carrier)

**Receives:** role-specific photography rules. Typically: per-slot-role cropping (HERO loose vs DETAIL tight); per-slot composition conventions; per-slot copy-overlay tolerance; per-slot subject framing rules.

**Resolution shape:** slot_prompt prose currently carries this content directly. The four-mode synthesis identified slot_prompt as the role-specific narrowing carrier across all four modes. Photography style content at this layer becomes slot_prompt text — composition / lighting / framing language specific to the role.

### Curation / governance layer

**Receives:** curation criteria the brand applies to photography — what counts as on-style; how strictly conventions enforce; where curator latitude exists. Typically: review-board criteria for fidelity / coherence / voice; sign-off chains for photography deliverables; override authority for style exceptions.

**Resolution shape:** curation layer is structurally explicit (five-axis provenance + curator + curation_pattern) per Phase 1. Photography style content at this layer flows into the *content* of curation judgment — `capture_reason` / `capture_notes` text describing why a candidate carries the brand's photography conventions or fails them. The five-pattern `curation_pattern` value space is mode-independent; photography style content does not earn a new pattern value.

## Cross-Mode Implications

Photography / image style guide content resolves differently per mode. Each mode pressures different style dimensions, and intake should expect the brand's style guide to cover modes asymmetrically — a brand with rich SKU photography may have thin campaign articulation, and vice versa.

### SKU-driven mode

Photography style content concentrates at the slot layer (HERO / PROFILE / DETAIL framing rules) plus the packet layer (per-product reference images carrying material / surface / finish fidelity). Per Phase 1's SKU-driven mode sketch, the SKU is the anchor; per-product `product_image` carries fidelity. Photography style guide tells intake what conventions the brand uses for product-anchored imagery: studio environment defaults, framing rules per role, retouching conventions, scale and proportion rules. Cleanest case for photography style mapping; most operational evidence available.

### Collection / merchandising mode

Photography style content concentrates at the mode-specific (collection / grouping) layer plus the packet layer. Per Phase 1's collection-mode evidence, grouping coherence is achievable through slot_prompt-anchored consistency. Photography style guide tells intake: how the brand groups multiple products in frame; relational composition rules (which constituent subject vs peripheral); cross-slot continuity for prose-only constituents (when product_image is absent). The collection-mode operational deflation showed prose discipline carries; photography style guide is the source of that prose discipline.

### Marketing / message-driven mode

Photography style content concentrates at the mode-specific (message / offer / communication) layer plus the slot layer. Per Phase 1's marketing-mode sketch, evidence depth is operationally weaker — message-bearing element rendering is paper-only. Photography style guide tells intake: how the brand renders message-carrying imagery; copy-overlay tolerance per touchpoint; aspect-ratio adaptations across email / social / banner; product-credibility rules when message is the asset's purpose. Photography style content here is paper-supported, not operationally tested.

### Brand campaign / editorial mode

Photography style content concentrates at the brand-system layer plus the mode-specific (campaign concept) layer plus the review-context / campaign-world coherence layer. Per Phase 1's campaign-mode sketch, editorial voice is structurally load-bearing in a way it is not in other modes — voice is brand-system property carried through photography style. Photography style guide tells intake: light direction conventions; generosity / restraint posture; gesture / human-presence rules; campaign-world continuity carriers; review-board criteria for voice + arc + continuity verification. The implementation-vs-conceptual goal distinction (sharpest in campaign mode per Phase 1) lives most acutely here — photography style guide must cover both the technical conventions (implementation) and the voice / world / arc continuity criteria (conceptual).

## Fallbacks and Conflict Handling

Photography / image style guide content rarely arrives complete. The Phase 2 opening sketch's fallback model applies; photography style adds five mode-specific divergence patterns.

### Prose guide vs asset library conflict

**Default fallback:** asset library carries. Per the foundational visual-as-fidelity-strategy / prose-as-fallback claim from the apex aesthetic-layering pass, visual is the strategic primitive; prose is fallback and pressure-relief. When prose says one thing about lighting and the asset library demonstrates another, the library is the honest read of the brand's actual photography conventions.

**Why this fallback:** prose articulations of photography style are abstractions of the photography itself. The work the brand has actually approved IS the brand's photography conventions in operation. Where they diverge, the doing is the truth.

### General style guide vs category-specific examples

**Default fallback:** category-specific examples carry within their category; general guide carries across categories where category-specific guidance is absent. Granularity wins where it exists; breadth wins where granularity is absent.

**Why this fallback:** photography conventions adapt per category. A brand's general "use generous side-light" rule may be category-overridden by "for jewelry, use direct top-light to render gemstone fire." Within jewelry, the category-specific rule is the operational rule.

### Channel guideline vs campaign precedent

**Default fallback:** context-dependent. For recurring channels (email hero, web banner, social tile), the channel guideline is the operational rule. For campaign-anchor work where a campaign concept defines the photography posture, the campaign precedent is the operational rule for assets in that campaign's world.

**Why this fallback:** channel guidelines and campaign precedents address different scopes. A campaign that adopts an unusual lighting register for arc / voice reasons does not invalidate the channel's general lighting convention for non-campaign work.

### Absent photography guidance

**Default fallback:** derive from asset library; mark as inferred-not-stated. Asset library is the brand's accumulated photography conventions in implicit form even where prose articulation is sparse.

**Why this fallback:** photography guidance absence is common; demanding articulation up front would block intake. Inferred-not-stated content is honest about its evidence basis and reversible when the brand articulates explicitly later.

### Contradictory reference images

**Default fallback:** newer / more-specific reference carries; older / more-general reference is held as continuity reference, not authority. Flag the conflict for operator review.

**Why this fallback:** photography style evolves. Contradiction between older and newer reference imagery typically reflects evolution rather than inconsistency. The newer reference is closer to the brand's current posture; the older reference may still carry continuity value but should not authoritatively conflict with current work.

## Prose-Carried Now vs Eventually Earning Structural Carriers

Photography style content sits at multiple positions on the prose-vs-structure boundary across the Phase 1 carrier-status matrix.

### Prose-carried now (across all four modes; held)

- lighting direction / quality / intensity language
- composition rules and conventions
- cropping conventions per role
- styling / prop logic descriptions
- model-direction conventions
- post-production / color grade direction
- channel / touchpoint adaptation rules

These flow into `slot_prompt` text, packet `bounded_creative_discretion` text, packet `creative_intent` text, and `capture_reason` / `capture_notes` curation text. The Phase 1 evidence (especially collection-mode operational deflation) showed prose discipline carries this content cleanly under operational pressure for the modes operationally tested. Marketing and campaign modes are not yet operationally tested at full-flow depth.

### Structurally explicit now (across all four modes)

- packet-level reference linkage (visual carriers; the brand's "house" reference images flow here)
- per-product `product_image` (product fidelity carrier; per-SKU material / surface / finish rendering)
- slot-level lookup chain to packet references (`packet_reference_image_lookup`)
- `slot_role` enum (signals role-typical photography burden per mode; cropping / composition burden differs by role)

These carriers existed before Phase 2 began; they flow visual content from the brand-system input directly into the IA's structurally-explicit surfaces.

### Structurally suggested but not earned

- a structured tag on `reference_assets` classifying the reference type (lighting reference / composition reference / styling reference / continuity reference / product reference) — surfaced in the cross-mode probe series; not earned by operational pressure
- per-mode role-typical aesthetic constraints attached to `slot_role` — surfaced in Phase 1 mode sketches; not earned
- brand-system / mode-category / product-class aesthetic carriers — Named Limitation #1 of the apex; not earned
- aspect-ratio-as-attribute on slots — surfaced in Phase 1 marketing- and campaign-mode sketches; paper-only

These are paper-pressed across multiple Phase 1 sketches. Photography style content would *fit* these carriers if they were earned. They remain held; photography style intake does not earn them on its own.

### Operationally deflated (collection mode)

- prose enumeration of multi-constituent photography conventions in slot_prompt (subject vs peripheral framing; cross-slot verbatim repetition)
- prose-only fidelity for constituents without per-product images
- cross-axis curation tradeoff carrying via `capture_reason` / `capture_notes` text (lead-product lighting vs family coherence vs framing cleanliness vs exclusion fidelity)

Collection-mode operational pressure showed photography style content at these positions can be carried by prose discipline.

### Operationally untested

- prose carrying of message-bearing photography conventions (marketing mode)
- prose carrying of editorial-voice photography conventions (campaign mode)
- prose carrying of campaign-arc photography continuity (campaign mode)
- prose carrying of review-board criteria for voice + arc + continuity (campaign mode review-context layer)

Photography style intake provides source material for these positions; whether prose carries them operationally is the same open question the four-mode synthesis surfaced. Photography style intake does not earn the deflation; subsequent operational testing in those modes would.

## Open Questions

1. **How does photography style at the brand-system level resolve when category-specific or mode-specific style differs?** The mapping above states defaults (category-specific carries within category; mode-specific carries within mode). The harder case is when brand-system content is itself partial and conflicts surface only at lower-layer specificity. Intake architecture handles this by flagging inferred-not-stated content; whether that fallback scales when the brand has substantial implicit photography style across the asset library is unprobed.

2. **When does a photography style element escape "prose-carried" into structural representation?** Per the apex's *structure earns its keep when observed operational pressure surfaces a need*, the answer is: when prose discipline breaks operationally. The four-mode evidence has not yet broken prose discipline for any photography style element. Marketing and campaign mode operational testing (held) are the surfaces where breakage might surface.

3. **How does photography style interact with the implementation-vs-conceptual goal distinction?** The distinction is sharpest in campaign mode per Phase 1. Photography style guide is the source of both implementation conventions (technical: lighting / composition / framing) and conceptual conventions (voice / world / arc continuity). Whether intake should articulate these as separate carriers or treat them as facets of one style is unprobed.

4. **Are some style elements always at brand-system level vs always at slot level vs always context-dependent?** Brand-level constants (palette / type / mark) are clearly brand-system layer. Specific framing for one slot is clearly slot layer. Lighting register is *typically* brand-system but campaign-mode editorial voice may override it. Composition is typically slot-specific but a brand may have brand-system composition principles. The mapping is empirically variable; intake handles each brand's actual articulation.

5. **How does intake handle photography style updates over time?** Photography style evolves with brand evolution; new campaigns introduce style extensions; visual systems get refreshed. The opening sketch flagged this as Phase 2 question 2. For photography specifically: when a brand introduces new lighting conventions for one campaign, does that update the brand-system layer, the campaign-mode layer, or stay isolated as the campaign's deviation? Operational pressure on this question is unprobed.

6. **What is the relationship between photography / image style guide and asset library as separate input categories?** Photography style guide is the brand's articulation of its photography conventions; asset library is the brand's accumulated photography work. The fallback model says asset library carries when prose contradicts (visual-as-fidelity claim). But the two categories are not redundant: prose guide articulates intent; asset library demonstrates execution. Intake handles them as separate categories with shared content surfaces; the precise relationship is held for the asset library deepening artifact when it is produced.

7. **Does this mapping generalize across brand archetypes?** The mapping above is shaped by Phase 1's worked-example evidence (furniture brand Furniture v1; D2C apparel archetype in the cross-mode probes; heritage refined-living archetype in the campaign probe). Whether it generalizes to brands in spaces the Phase 1 evidence did not cover (food / beverage; cosmetics; technology; service brands without product photography burden) is unprobed.

## Self-Superseding Clause

This artifact is a Phase 2 deepening surface. It should be superseded by:

- subsequent Phase 2 deepening artifacts on the other five brand-system input categories (brand platform; visual identity system; asset library; application guidelines; past campaigns) when produced
- a fuller Phase 2 milestone synthesis when the deepening surfaces accumulate enough material
- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs
- the eventual `docs/architecture.md` rewrite that consolidates the apex artifact, the Phase 1 sketches, the Phase 2 artifacts, and any operational evidence

It does not supersede the Phase 2 opening sketch, the Phase 1 cross-mode synthesis, the four Phase 1 mode sketches, the apex artifact, or the apex aesthetic-layering pass. Those remain authoritative for their subject matter; this artifact reads them at photography / image style guide column depth and articulates the IA mapping there.

## Anchor Documents

### Phase 2 framing

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch; names photography / image style guide as one of six brand-system input categories; this artifact deepens that category
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): the redirection note that frames Phase 2 as the implementation entry surface where brand-system input enters the layered IA

### Phase 1 outputs (the IA layer model the photography mapping feeds into)

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; identifies stable shared layers, mode-specific layers, carrier-status matrix
- [`docs/ia-layered-content-sketch-sku-driven-mode-v1.md`](ia-layered-content-sketch-sku-driven-mode-v1.md): SKU-driven mode IA content; cleanest photography mapping case (per-SKU `product_image` as fidelity carrier)
- [`docs/ia-layered-content-sketch-collection-mode-v1.md`](ia-layered-content-sketch-collection-mode-v1.md): collection / merchandising mode IA content; operational deflation evidence for prose-discipline carrying of multi-constituent photography conventions
- [`docs/ia-layered-content-sketch-marketing-mode-v1.md`](ia-layered-content-sketch-marketing-mode-v1.md): marketing / message-driven mode IA content; paper-only carrying of message-bearing photography conventions
- [`docs/ia-layered-content-sketch-campaign-mode-v1.md`](ia-layered-content-sketch-campaign-mode-v1.md): brand campaign / editorial mode IA content; editorial voice as structurally load-bearing photography axis

### Apex and architectural-pass predecessors (load-bearing for the mapping's foundational claims)

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitation #1 (specific aesthetic-carrier schema) is what the photography style intake provides source material for without resolving
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic layer-shape sketch; visual-as-fidelity-strategy / prose-as-fallback claim that grounds the prose-vs-asset-library conflict resolution
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; the *structure earns its keep when operational pressure surfaces a need* boundary that bounds when photography style content escapes prose into schema

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
