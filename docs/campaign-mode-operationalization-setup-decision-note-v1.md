# Campaign Mode Operationalization // Setup Decision Note v1

## Purpose

This is a narrow setup-decision artifact for the campaign / editorial mode operationalization that was selected as the next D2 path in [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md). It defines the test shape, what base boundary is being pressured, what remains controlled, what architectural uncertainty the test pressures, what minimum operational depth is required to avoid under-depth, and what would count as success / partial / failure after the diagnostic caveat.

It is not the actual base setup. It does not author an Airtable base, schema, or any operational artifact. It does not pre-decide the specific brand archetype or campaign concept; the choice within the constraints below is held for ASK directional input as the next step.

## Posture

```text
one artifact
no airtable mutation
no schema creation
no prototype setup
no v2 apex
no rewrite of architecture.md / apex / predecessor passes / D2 decision note
no authorization for any next path beyond what is named here
```

The diagnostic caveat from [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md) is carried forward: any failure outcome requires diagnostic review before being interpreted as architecture pressure. Tooling limitation, under-specified setup, weak references, and insufficient operational depth must be separated from architectural failure. This is especially load-bearing here because campaign mode's high setup cost was named in the D2 decision note as the specific risk for under-depth absorbing effort.

## ASK Direction Recap

From the D2 decision note's directional fork, ASK has chosen **D2-Campaign + cross-base + cross-brand**, with **category held controlled** to reduce attribution noise. From the four separate-base pressure variants:

- not chosen: cross-base only (would not pressure brand-system aesthetic)
- not chosen: cross-base + cross-category (would pressure category instead of brand)
- **chosen: cross-base + cross-brand** (pressures brand-system aesthetic and base boundary; category held controlled)
- not chosen: full pressure (would generate too many simultaneous variables and make failure hard to diagnose)

The reasoning, summarized: campaign mode is the sharper aesthetic-inheritance test (per D2 decision note §Candidate Two leading paragraph and aesthetic-layering pass §10); cross-brand is necessary because brand-system aesthetic is one of the unresolved layer-shape concerns named in aesthetic-layering pass §1; category control reduces the number of simultaneous variables so failure remains diagnosable.

## Test Shape

The test operationalizes one campaign / editorial scenario in a new Airtable base, in a new brand context, in the controlled category. The scenario must contain enough structural pressure to test the architectural questions named below without absorbing operational effort in setup that does not pressure the architecture.

The scenario shape:

- **One campaign concept** that anchors the work. The concept is the Layer 2 fidelity anchor — what the family must remain faithful to — per the apex artifact's spine / fidelity-anchor framing. Products are peripheral to the concept (per cross-mode probe v1 brand-campaign findings).
- **Two to three packets** within the campaign. Multiple packets are required because cross-packet continuity is one of the architectural questions; a single-packet test cannot pressure it. Three packets is recommended; two is the minimum.
- **Three to five slots per packet** with mixed slot roles. Examples of campaign-mode slot roles named in the D2 decision note: HERO_WORLD, DETAIL_LIFESTYLE, OBJECT_VIGNETTE, EDITORIAL_PORTRAIT. The exact role list is held for the next step; what matters here is mixed roles within each packet to pressure family coherence at packet level.
- **A new brand context.** The brand-system aesthetic envelope (palette conventions, photography style, lighting language, surface-treatment conventions, restraint level) must differ meaningfully from the SKU-driven Furniture v1 base's implicit context. The specific brand archetype is held; the requirement is meaningful difference.
- **Same broad category** as the SKU-driven Furniture v1 base. Furniture or home-goods adjacent. The category is the control; specific category choice within "broad furniture / home-goods" is held.
- **Reference assets** at multiple layers. At minimum: brand-system-scope reference evidence, carried procedurally or through the setup artifact unless / until a structural carrier is explicitly earned (per aesthetic-layering pass §1: brand-system context is currently unmodeled); packet-level studio-world or atmospheric references; per-product `product_image` attachments where products are present.
- **Full governance arcs per packet.** Generation → curation → governed asset writeback completed for each packet, mirroring the Path B pattern from [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md).

The exact campaign concept, brand archetype, packet count within the 2–3 range, slot count within the 3–5 range, and slot role names are held for ASK as the next step. This artifact defines the *shape*; the *content* is the next decision.

## What Base Boundary Is Pressured

**Cross-base.** A new Airtable base. New schema namespace. New tenant-like boundary. The architecture's layered shape (the matrix from bounded modeling pass v1 §1, the carrier-boundary distinctions from vocabulary pass v1, the layer-shape sketch from aesthetic-layering pass v1) is being applied to a base that has not previously carried any of it. This pressures whether the layered shape is portable across bases or whether unspoken same-base assumptions exist that have not been named.

**Cross-brand.** A new brand-system aesthetic envelope. The brand-system context is currently unmodeled in the architecture (aesthetic-layering pass §1: "currently unmodeled"). Cross-brand pressure tests whether brand-system aesthetic emerges as a load-bearing first-class concern when forced to differ from the SKU-driven Furniture v1 base's implicit context, or whether it remains content-discipline navigable through packet-level prose and reference linkages.

The two boundaries together pressure the architecture's currently-implicit handling of brand-system context. If brand-system aesthetic was being silently carried by setup discretion at lower layers in the SKU + same-category-collection scope (because the brand context was implicit and uniform), the new brand context surfaces whatever brand-system carriers were missing.

## What Remains Controlled

- **Category.** Same broad category as the SKU-driven Furniture v1 base. This reduces attribution noise: a finding about brand-system aesthetic is not confounded by simultaneous category-shift pressure. Cross-category pressure remains held under apex Named Limitation #3.
- **Marketing / message-driven mode.** Not operationalized. Marketing remains paper-probed only per cross-mode probe v1.
- **Larger-scale composite anchors.** Slot-input plurality at large scale (10+, 20+, 40+ constituents) is not pressured. Where products appear in this campaign test, constituent counts per slot stay manageable.
- **Other directions in the apex Option 1/2/3/4 fork.** Continued aesthetic refinement (Option 2) is not run alongside this test. Apex v2 is not authored from this test alone.

## Architectural Uncertainty The Test Pressures

This test is designed to produce operational evidence on six architectural questions, organized into primary pressure surfaces (the test's load-bearing targets) and secondary / observed pressure surfaces (likely to surface but not the central design target).

### Primary pressure surfaces

1. **Does the v1 apex layered shape carry to cross-base + cross-brand for campaign mode?** Per apex Named Limitation #3. Outcome updates the apex's "scoped mode-independent" claim (vocabulary pass §4) with one more mode at operational depth across the cross-base + cross-brand boundary.
2. **Does brand-system aesthetic emerge as a load-bearing first-class concern?** Per aesthetic-layering pass §1 (currently unmodeled). Outcome may update Named Limitation #1 by either deflating the brand-system carrier need (if content-discipline carries) or earning specific carriers.
3. **Does Model A (implicit-additive accumulation) hold operationally for campaign mode at cross-brand pressure?** Per aesthetic-layering pass §8 and Named Limitation #2. Conflict scenarios (new brand-system aesthetic implied by reference vs packet-level creative_intent direction) become possible at cross-brand. Outcome may earn Model B (layered precedence with explicit override) or deflate it.

### Secondary / observed pressure surfaces

4. **Does cross-packet family-level continuity require structured representation?** Per cross-mode probe v1 brand-campaign findings and aesthetic-layering pass §3 carrier discussion. Outcome may earn first-class cross-packet linkage carriers (e.g., a `campaign_concept` carrier spanning packets) or carry by prose and per-packet reference linkages.
5. **Do review artifacts become first-class structurally for campaign mode?** Per [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md) and apex §First-Class Architectural Concerns / Curation Seam. Outcome may earn a higher-seam review-artifact structural surface or remain procedural.
6. **Does `products` peripherality require schema changes?** Per cross-mode probe v1 brand-campaign findings ("products becomes peripheral when the campaign concept is the fidelity anchor"). Outcome may earn restructuring of the products-link primacy or remain content-discipline.

The test does not need to settle all six questions; partial answers are valuable, especially across the secondary surfaces. The test is designed so that whichever questions surface operationally, the evidence is distinguishable from setup-noise.

## Minimum Operational Depth

To avoid under-depth absorbing effort and producing diagnostic-ambiguous "failure":

- **Packet count: minimum 2, recommended 3.** Cross-packet continuity is one of the load-bearing questions; a single-packet test cannot pressure it.
- **Slots per packet: minimum 3, recommended 3–5.** Family coherence within a packet is another load-bearing question; fewer than 3 slots per packet is a probe, not an operational test.
- **Mixed slot roles per packet.** Same-role slots within a packet do not pressure family coherence the way mixed roles do.
- **Full governance arcs.** Each packet completes generation → curation → governed asset writeback, mirroring the Path B pattern. A test that stops at generation does not pressure the curation seam or the review-artifact load.
- **At least one controlled inter-layer aesthetic tension surfaced.** The test should include one reviewable moment where brand-system-scope reference evidence, packet-level reference / creative intent, and slot-level prompt language could pull in different directions without becoming incoherent or intentionally contradictory. The point is to pressure whether Model A handles bounded tension or whether explicit override behavior is needed.
- **Cross-packet review-shaped coherence check.** Per-slot / per-packet curation still happens, but the curator also reviews the candidate family across packets to judge whether campaign-world continuity holds. This does not predefine a higher-level curation entity; it pressures whether one becomes earned.

If these minimums are not met, any "failure" outcome should be read as setup under-depth rather than as architectural pressure. The Diagnostic Caveat from the D2 decision note is the discipline this minimum-depth specification operationalizes.

## Success / Partial / Failure Criteria

Each outcome is conditioned on diagnostic review ruling out tooling limitation, under-specified setup, weak references, and insufficient operational depth — per the Diagnostic Caveat carried forward from the D2 decision note.

**Success.** If diagnostic review rules out non-architectural causes, success would mean: the v1 apex layered shape carries to cross-base + cross-brand for campaign mode without structural mutation. Brand-system aesthetic remains content-discipline navigable through packet-level prose and reference linkages. Cross-packet continuity carries by prose and per-packet references. Model A (implicit-additive accumulation) holds operationally. The apex's "scoped mode-independent" claim strengthens substantially; Named Limitation #3 partially resolves for the cross-base + cross-brand + campaign-mode subset.

**Partial.** If diagnostic review rules out non-architectural causes, partial would mean: some axes carry, others fail. The test identifies which pressures are operational vs paper-only. Possible findings — brand-system aesthetic needs minimal carriers (e.g., a brand-context note carrier at packet level, or a brand-defining-reference carrier); cross-packet continuity needs explicit linkage (e.g., a `campaign_concept` carrier linking packets); Model B is earned for one or two layers; review-artifact load earns a structural surface. Apex v2 would carry several earned schema mutations and revise multiple named limitations.

**Failure.** If diagnostic review rules out non-architectural causes, failure would mean: the architecture needs structural shifts at multiple layers — `campaign_concept` first-class carrier; brand-system aesthetic first-class carrier; cross-packet continuity first-class linkage; review-artifact structural surface at higher seam; aesthetic Model B (layered precedence with explicit override) earned because additive accumulation cannot resolve the layered conflicts campaign aesthetics produce at cross-brand. Apex v2 would be substantially different from v1.

## What This Artifact Is NOT

- Not the actual base setup. No Airtable base is created. No tables, fields, or records are specified.
- Not a schema specification. No carriers are proposed at field/table specificity.
- Not the specific campaign concept, brand archetype, or category choice within the controlled range. Those choices are held for ASK as the next step.
- Not a prototype direction. No prototype chain is opened until ASK directs the next step.
- Not a v2 apex definition-layer artifact.
- Not a rewrite of [`docs/architecture.md`](architecture.md), the apex artifact, predecessor passes, or the D2 decision note.
- Not authorization for the operationalization itself. The test shape is defined; the next step (specifying campaign concept, brand archetype, packet/slot specifics) is held for ASK.

## Anchor Documents

### Direct architectural anchors

- [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md): D2 decision note that surfaced the choice this artifact acts on; carries the Diagnostic Caveat for Outcomes that this artifact reaffirms
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex definition-layer artifact; Named Limitation #3 is what this test addresses for the cross-base + cross-brand + campaign-mode subset
- [`docs/architecture-aesthetic-layering-pass-v1.md`](architecture-aesthetic-layering-pass-v1.md): aesthetic-layering pass; brand-system carriers (§1) and Model A vs Model B (§8) are the load-bearing questions this test pressures
- [`docs/architecture-vocabulary-pass-v1.md`](architecture-vocabulary-pass-v1.md): vocabulary precision pass; scoped mode-independence framing (§4) updates with this test's evidence

### Operational pattern reference

- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): coordinated fresh-generation full-flow + asset_attachment writeback pattern; the operational arc shape this test mirrors per packet
- [`docs/collection-mode-operational-test-findings-v1.md`](collection-mode-operational-test-findings-v1.md): same-base same-category collection-mode operational test; demonstrates what an operationalization test looks like at depth (and why same-base wasn't enough — the boundary this test addresses)

### Cross-mode probe reference

- [`docs/cross-mode-probe-brand-campaign-editorial-v1.md`](cross-mode-probe-brand-campaign-editorial-v1.md): paper-only campaign-mode probe whose findings (`products` peripheral, campaign concept as fidelity anchor, family-level continuity, review-artifact load) this operational test pressures
- [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md): identifies campaign mode as the mode where review artifacts are most structurally load-bearing
