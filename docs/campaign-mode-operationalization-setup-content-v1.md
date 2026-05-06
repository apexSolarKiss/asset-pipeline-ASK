# Campaign Mode Operationalization // Setup Content v1

## Purpose

This artifact commits the content specifics for the campaign-mode operational test whose shape was defined in [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md). It translates operator-side brand-archetype and campaign-concept decisions into abstract-qualities text suitable for the repo, per the grounding-note brand-name-avoidance rule.

It does not create the Airtable base. It does not specify slot prompt drafts or product SKU values. Those would come only if ASK authorizes the actual base-setup step, as a separate scoped diff with its own plan + structured change summary per the AGENTS.md Airtable Mutation Discipline rule.

## Posture

```text
one artifact
no airtable mutation
no schema creation
no prototype setup
no v2 apex
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note
no slot prompt drafts
no specific product SKU values
no authorization for the base setup itself
```

Brand names stay operator-side per the grounding-note brand-name-avoidance section. Abstract qualities are what go in repo. The diagnostic caveat from the setup-decision artifact is carried forward: any failure outcome requires diagnostic review before being interpreted as architecture pressure.

## ASK Direction Recap

Within the setup-decision artifact's directional fork (D2-Campaign + cross-base + cross-brand, category controlled to broad furniture / home-goods), ASK has committed to the following content:

- **Brand archetype:** D2C everyday-quality home-goods archetype (operator-side reference held in memory, not in repo)
- **Campaign concept:** "Less, but Better"
- **Packet trio:** bedroom / table / bath
- **Slot role inventory per packet:** HERO_WORLD / LIFE_IN_USE / OBJECT_VIGNETTE
- **Product range:** ~6–8 products total across the campaign, intentionally minimal per concept
- **Operational depth:** 3 packets × 3 slots = 9 governed assets via full governance arcs

These commit specific instances within the setup-decision's ranges (2–3 packets → 3; 3–5 slots → 3; meaningfully different brand context → D2C everyday-quality vs Furniture v1's implicit luxury-mid-century-modern).

## Brand Archetype

A direct-to-consumer everyday-quality home-goods brand whose core proposition is **transparent value + material honesty + design restraint + accessible everyday register**. Brand voice carried implicitly via material visibility, natural light, human-presence cues, and design restraint *without* aspirational/museum-grade signaling.

This archetype differs meaningfully from the SKU-driven Furniture v1 base's implicit context (luxury mid-century modern + contemporary architectural restraint per the grounding-note prototype aesthetic): different formality register (accessible everyday vs aspirational refined), different lighting register (natural-light-leaning vs studio-controlled), different human-presence register (visible in-use vs minimal/absent), different commercial register (D2C transparent value vs heritage refined-living).

Per the grounding-note brand-name-avoidance section: the archetype is described by its abstract qualities. It is informed by public-reference brands in the D2C home-goods space without naming them in this artifact. The operator-side brand-archetype reference is held in operator memory, not in repo.

## Campaign Concept // "Less, but Better"

**Concept anchor:** *fewer things, better things, room to breathe.*

The campaign foregrounds what the brand chooses NOT to include as much as what it does. Restraint discipline is visible in every packet, every slot, every composition. The concept is the Layer 2 fidelity anchor — what the family must remain faithful to. Products are peripheral to the concept; the same concept could be carried by many product mixes if restraint discipline is held.

**Why this concept fits the brand archetype:** restraint IS the brand's value proposition. The D2C everyday-quality archetype's transparent-value pricing and material honesty rest on the discipline of choosing fewer, better things. The campaign concept makes that brand-value proposition the explicit subject of the campaign work.

**Why this concept is architecturally sharp:** restraint is hard to fake. The brand-system aesthetic envelope must *embody* restraint at every layer, not just feature restraint as a topic. This sharpens the brand-system aesthetic-emergence pressure (setup-decision Q2) more than a less-discipline-dependent concept would.

## Packet Inventory

Three packets, each a different surface where the restraint discipline lives:

### Packet 1 // Bedroom

The restrained bedroom: one bed, well-made, no extras. No decorative pillow tower, no styling clutter, no over-layered textiles. The bed is the subject; the breathing room around it is part of the composition.

Restraint articulation: bedding restraint, surface restraint, palette restraint. Soft natural light. The room reads as one well-considered space, not a styled set.

### Packet 2 // Table

The restrained table: a meal for two, no centerpiece, no over-styling. Plate, glass, cup, serving piece — the elements of an actual meal, no decorative additions. The table reads as set for use, not staged for display.

Restraint articulation: place-setting restraint, table-surface restraint, no-extras discipline. Soft midday light. Human presence implied (a meal about to begin or in progress).

### Packet 3 // Bath

The restrained bath: towels and one ceramic vessel, otherwise empty surfaces. No clustered toiletries, no decorative arrangement. The bath reads as a clean working surface, not a styled vignette.

Restraint articulation: surface restraint, towel-arrangement restraint, palette restraint. Soft afternoon light. The objects breathe in the empty space.

## Slot Role Inventory

Three slots per packet, each pressuring restraint at a different register:

### HERO_WORLD

Establishing shot showing the surface or room in its restrained state. Light and breathing room are foreground as much as the objects. The empty area in the frame matters as much as the products. Restraint at the *compositional* register — what's not in frame is part of the composition.

### LIFE_IN_USE

Closer-in human presence with the products in restrained active use. Examples: making the bed in soft morning light; lifting a cup mid-meal; drying off after a bath. Restraint visible even while in motion. Preserves the brand-archetype's human-presence signature. Restraint at the *behavioral* register — minimal gesture, no over-styling of the human moment.

### OBJECT_VIGNETTE

Single object close-up. Restraint in framing as much as in subject — one object, generous negative space, light-and-material as the subject. Restraint at the *focal* register — close attention to one thing rather than a styled composition of several. Material visibility is foreground.

## Product Selection

Per packet, ~2–3 products max — the concept enforces selectivity at the product layer, not just the visual layer:

| Packet | Products |
|---|---|
| 1 // Bedroom | One bedsheet set (sheets + pillowcases), one throw or extra pillow at most |
| 2 // Table | Two plates, two glasses, two ceramic mugs, one serving piece — meal for two, no extras |
| 3 // Bath | Two bath towels, one hand towel, one ceramic vessel |

Total: ~6–8 products across the campaign. Restraint discipline enforced at the product-selection layer, not just the visual layer. Specific product SKU values held for the base-setup step.

## Restraint As The Architectural Mechanism

"Less, but Better" is not just a campaign topic. Restraint is the load-bearing architectural mechanism the test uses to pressure the setup-decision's primary questions, operating at four layers simultaneously:

- **Product-selection layer.** Few products per packet, deliberate omissions. The product list is intentionally minimal so that the campaign's discipline is enforced at the input layer, not just the rendering layer.
- **Packet layer.** Bedroom, table, and bath each interpret restraint differently — bedding restraint differs from place-setting restraint differs from surface restraint — but all three share the brand-system-level "warm-restraint" envelope. Cross-packet continuity is carried by the discipline being recognizably the same across surfaces.
- **Slot layer.** Compositional restraint per role. HERO_WORLD foregrounds negative space; LIFE_IN_USE foregrounds minimal gesture; OBJECT_VIGNETTE foregrounds single subject. Each role enforces restraint in a different register.
- **Curation layer.** The curator's judgment criteria reject *both* clutter and sterile coldness. A candidate that violates restraint by including too much fails curation; a candidate that interprets restraint as sterile-minimalism (cold, austere, museum-grade) also fails curation. The curator's task is to enforce the warm-restraint envelope at the seam — restraint is the *positive* discipline, not the negation of warmth.

Restraint operating at all four layers simultaneously is what makes the test sharp on the setup-decision's primary questions — Q2 (brand-system aesthetic emergence) and Q3 (Model A vs Model B inheritance/override). If restraint were only campaign copy, the test would be much weaker; it would be possible to satisfy "Less, but Better" through visual-layer styling alone, and the architecture's layered carriers would not be pressured. Because restraint is the mechanism *across* layers, the architecture has to actually carry it through all of them coherently — which is what stresses the brand-system carrier need and the inheritance/override behavior.

## Inter-Layer Aesthetic Tension Surface

The setup-decision artifact's minimum operational depth requires at least one *controlled* inter-layer aesthetic tension surfaced. With "Less, but Better," the natural tension surface is sharp because *restraint* is the cross-cutting constraint that every layer has to interpret:

- **Brand-system context (operator-side):** restraint as *accessible and warm* — not aspirational coldness, not sterile minimalism, not museum-grade austerity. Material visibility, natural light, human presence.
- **Packet-level reference / creative intent:** restraint as breathing room *in this specific space* — bedroom restraint differs in feel from table restraint differs from bath restraint, but all three share the brand-system-level "warm-restraint" envelope.
- **Slot-level slot_prompt language:** restraint as *compositional discipline* — single subject, generous negative space, role-shaped framing.

**The natural tension:** the brand-system context pulls toward "restrained but warm." Slot-level compositional restraint can drift toward "restrained = austere/cold" if the brand-system envelope is not carrying the warmth signal effectively. If the architecture's layered model handles this without explicit override (Model A wins), the warmth signal carries by additive accumulation across layers. If the assets drift into sterile-minimalism territory unless something explicitly enforces "warm" against the slot-level cold-restraint pull (Model B becomes earned), that's the architectural finding the test is designed to surface.

This is a *controlled* tension, not artificial contradiction — the layers can pull in subtly different directions without becoming incoherent. The point is to pressure whether Model A handles bounded tension or whether explicit override behavior is needed.

## How This Maps To Setup-Decision Requirements

Cross-walk to the setup-decision artifact's framing:

### Architectural questions the test pressures (from setup-decision §Architectural Uncertainty The Test Pressures)

| Question | How "Less, but Better" pressures it |
|---|---|
| **Q1 (Primary):** Does v1 apex layered shape carry to cross-base + cross-brand for campaign mode? | Pressured by the operational test running in a new base, with the new brand archetype, executing the campaign concept end-to-end through generation → curation → governed asset writeback for each of three packets |
| **Q2 (Primary):** Does brand-system aesthetic emerge as a load-bearing first-class concern? | Pressured sharply by the restraint discipline — restraint IS the brand-system signature, hard to absorb implicitly through packet-level prose alone, may earn explicit brand-system carrier need |
| **Q3 (Primary):** Does Model A hold operationally, or does Model B become earned? | Pressured by the restraint-as-warm vs restraint-as-cold tension surface; if the model drifts toward sterile-minimalism, Model B explicit-override behavior may be earned |
| **Q4 (Secondary):** Does cross-packet family-level continuity require structured representation? | Pressured by the three-packet structure — bedroom, table, bath must read as one campaign world while differentiating by surface |
| **Q5 (Secondary):** Do review artifacts become first-class structurally for campaign mode? | Pressured by cross-packet review-shaped coherence check during curation — judging restraint discipline across all 9 governed assets |
| **Q6 (Secondary):** Does products peripherality require schema changes? | Pressured by the deliberately minimal product selection — products are subordinate to the concept; the same concept could carry different products |

### Minimum operational depth (from setup-decision §Minimum Operational Depth)

| Requirement | How this content meets it |
|---|---|
| Packet count: minimum 2, recommended 3 | **3 packets** (bedroom / table / bath) ✓ |
| Slots per packet: minimum 3, recommended 3–5 | **3 slots** per packet (HERO_WORLD / LIFE_IN_USE / OBJECT_VIGNETTE) ✓ |
| Mixed slot roles per packet | **3 distinct role types** per packet ✓ |
| Full governance arcs | Generation → curation → governed asset writeback per packet, mirroring Path B pattern ✓ |
| At least one controlled inter-layer aesthetic tension surfaced | **Restraint-as-warm vs restraint-as-cold** tension surface (§Inter-Layer Aesthetic Tension Surface above) ✓ |
| Cross-packet review-shaped coherence check | Curator reviews the 9-asset family across packets to judge whether the restraint discipline holds across bedroom / table / bath ✓ |

### Outcomes (from setup-decision §Success / Partial / Failure Criteria)

The setup-decision's outcome framing carries forward unchanged. Each outcome is conditioned on diagnostic review ruling out tooling limitation, under-specified setup, weak references, and insufficient operational depth.

For "Less, but Better" specifically:

- **Success** would mean the layered shape carries the restraint discipline to cross-base + cross-brand without structural mutation; brand-system aesthetic stays content-discipline navigable through packet-level restraint articulation; Model A holds operationally; the warm-restraint signal carries by additive accumulation
- **Partial** would mean specific axes carry while others fail — e.g., restraint discipline holds within packets but cross-packet continuity drifts; or warmth signal is preserved at packet level but slot-level compositional restraint drifts cold without explicit override
- **Failure** would mean the architecture needs structural shifts at multiple layers — e.g., brand-system aesthetic carrier earned because warm-restraint cannot be carried by additive accumulation alone; Model B (layered precedence with explicit override) earned for the warm vs cold-restraint tension; cross-packet continuity carrier earned

## What This Artifact Is NOT

- Not the actual base setup. No Airtable base is created; no tables, fields, or records specified.
- Not a schema specification. No carriers proposed at field/table specificity.
- Not slot prompt drafts. The slot_prompt text per slot is held for the base-setup step.
- Not specific product SKU values. The product list is rough; specific SKUs (with material notes, finish notes, identifying details) are held for the base-setup step.
- Not specific reference evidence. Brand-system-scope reference evidence, packet-level references, and role-specific reference instructions are held for the base-setup step; direct slot-specific reference linkage is not presupposed (per setup-decision: brand-system-scope reference evidence carried procedurally or through the setup artifact unless / until a structural carrier is explicitly earned).
- Not a v2 apex artifact.
- Not a rewrite of [`docs/architecture.md`](architecture.md), the apex artifact, predecessor passes, the D2 decision note, or the setup-decision note.
- Not authorization for the base setup itself.

## What Comes After

If ASK authorizes the next step, the next scoped artifact / mutation plan is actual base setup — a separate scope of work with its own plan + structured change summary per the AGENTS.md Airtable Mutation Discipline rule. That step would:

- create the new Airtable base
- specify the schema (likely mirroring the SKU-driven Furniture v1 base's schema, since the setup-decision's primary architectural questions assume the same layered shape carries)
- create the workflow_packets records (3 packets: bedroom / table / bath)
- create the output_slots records (9 slots: 3 per packet)
- create the products records (~6–8 products)
- create the reference_assets records (brand-system-scope + packet-level)
- draft the slot_prompt text per slot
- begin the generation → curation → governance arcs per packet

The base-setup step is held; this artifact precedes it.

## Anchor Documents

### Direct architectural anchors

- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision artifact this content commits within
- [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md): D2 decision note that surfaced the choice path
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex; Named Limitation #3 is what this test addresses
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic-layering pass; brand-system carriers (§1) and Model A vs Model B (§8) are the load-bearing questions this content's restraint-discipline pressure tests

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): the operational arc shape per packet
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-base same-category operational test demonstrating what an operationalization at depth looks like

### Cross-mode probe reference

- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): paper-only campaign-mode probe; this operationalization carries forward the campaign concept-as-fidelity-anchor + family-level continuity + review-artifact load + aesthetic inheritance pressures, applied to a D2C everyday-quality home-goods archetype rather than the heritage refined-living archetype the probe used
- [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md): identifies campaign mode as the mode where review artifacts are most structurally load-bearing
