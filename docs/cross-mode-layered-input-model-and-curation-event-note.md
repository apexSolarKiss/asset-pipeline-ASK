# Cross-Mode Layered-Input Model And Curation Event Note

## Purpose

This is a working architecture note from a cross-mode model attempt against the four worked-example workflow modes now present on `main`. It pressure-tests a layered-input model that holds two architectural questions together:

- how creative and production intent are represented across layers (brand, mode, fidelity anchor, packet, slot)
- how the curation event is modeled as a first-class governance act

It is a sketch, not doctrine. It does not authorize schema mutation, taxonomy settlement, runtime language, or validator design.

## Architectural Question

Can layered creative / production intent be represented in a shape that survives across asset families and workflow modes, with the curation event modeled as a first-class governance act?

This is the architecturally-relevant direction at the current plateau, after the SKU-driven Furniture v1 prototype reached its layered prototype state at milestone 5.

The architectural framing this sketch builds on is articulated across three external pieces. [From Brand Rules to Creative Discretion](https://atomicspacekitten.substack.com/p/from-brand-rules-to-creative-discretion) establishes the upstream framing — *creative discretion as the bounded zone of allowed variation inside a governed system* — and names five structural categories (product / business inputs, creative / technical constraints, creative discretion, required outputs, decision ownership). [The Beautiful Picture is Not the…](https://atomicspacekitten.substack.com/p/the-beautiful-picture-is-not-the) records the realization that slot outputs were inconsistent without higher-level inputs aligning the slots across a packet — the pressure that this cross-mode model directly addresses via the fidelity-bearing layer 2 and explicit family-coherence framing. [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection) extends the framing to the curation seam where bounded creative discretion becomes operationally recordable as a governance act. The cross-mode model below assumes all three pieces as background.

## The Layered Model

The sketch identifies six layers and one transition seam. The seam between layers 5 and 6 is the **curation event** — the moment where bounded creative discretion is exercised and a candidate is elevated to a governed asset with provenance.

| Layer | Carries (mode-uniform) | Owner |
|---|---|---|
| **0 — Brand system** | Tonal vocabulary, material restraint, continuity rule | Brand owner |
| **1 — Mode / category** | The kind of governing pressure | Creative ops |
| **2 — Fidelity anchor + rules** | What the work must remain faithful to and the rules that govern that fidelity | Category lead |
| **3 — Packet** | Business and creative intent, bounded discretion declaration, approved references, required output set | Packet owner |
| **4 — Slot** | Expected output obligation, slot role, slot prompt, slot-specific reference binding | Slot resolver |
| **5 — Candidates (transient)** | Raw generation outputs | — |
| **— Curation event seam —** | **Per-slot curation plus review-shaped coherence verification** | **Curator** |
| **6 — Governed asset** | Post-curation identity carrying upstream provenance | (post-curation) |

Lower layers inherit from upper layers. Lower layers may override an upper-layer value only when the override is explicit, bounded, and reviewable.

## Cross-Mode Pressure-Test Summary

The model was pressure-tested against the four worked-example packets on current `main`:

- [`docs/application/examples/sku-furniture-workflow-packet-example.md`](application/examples/sku-furniture-workflow-packet-example.md) — SKU-driven product imagery
- [`docs/application/examples/collection-merchandising-workflow-packet-example.md`](application/examples/collection-merchandising-workflow-packet-example.md) — collection / merchandising
- [`docs/application/examples/marketing-message-driven-workflow-packet-example.md`](application/examples/marketing-message-driven-workflow-packet-example.md) — marketing / message-driven
- [`docs/application/examples/campaign-workflow-packet-example.md`](application/examples/campaign-workflow-packet-example.md) — brand campaign / editorial

| Layer | SKU | Collection | Marketing | Campaign |
|---|---|---|---|---|
| 1 — Mode pressure | Single-item truth, comparability | Relational truth, adjacency | Message-bearing signal persistence | Campaign coherence, bounded latitude |
| 2 — Fidelity anchor | Unitary (one product) | Composite (constituent items + grouping archetype + relational rules) | Composite (subject + message archetype) | Unitary (scene archetype) |
| 3 — Bounded discretion vocabulary | Scene simplification, lighting balance, hero view angle | Arrangement, framing tightness, item visual emphasis | Composition, crop, tonal emphasis, message foregrounding strength | Composition, crop, tonal balance, pacing, seasonal cue strength |
| 4 — Slot input plurality | Singular product reference | Plural product references (one per constituent) | Singular subject plus plural message-bearing elements | Singular subject plus family-level continuity references |
| Curation event | Per-slot plus light coherence verification | Per-slot plus heavier coherence verification | Per-slot plus heavier coherence verification | Per-slot plus heaviest coherence verification |
| 6 — Governed asset subject identity | Item | Grouped set | Message-bearing subject | Scene or moment in family |

The structural pattern at the curation seam is uniform across the four modes. What varies is the *weight* of cross-output coherence pressure, not the *mechanism*.

## Load-Bearing Findings

1. **The same six-layer shape applies across all four modes.** Differences are in content per layer, not in layer count or sequence.

2. **Layer 1 governing pressure is mode-shaped.** Four distinct pressure types are now visible in the worked examples: single-item truth, relational truth, message-bearing signal persistence, and campaign coherence.

3. **Layer 2 is the fidelity-bearing layer.** It declares the *fidelity anchor* (what the work must remain faithful to) and the *fidelity rules* (what governs that fidelity). The anchor can be unitary or composite; composite anchors have named composition kinds — a grouping archetype with relational rules in collection mode, and a subject combined with a message archetype in marketing mode.

4. **Aesthetic representation varies on two axes:** per-layer (different forms at the brand layer versus the slot layer) and per-mode (different vocabularies across SKU, collection, marketing, and campaign modes).

5. **Bounded discretion vocabulary is mode-shaped.** The kinds of creative choice that count as legitimate discretion differ across modes, even when the inheritance and override structure is uniform.

6. **Slot input plurality is a general pattern with mode-specific contents.** Slot reference-binding can be plural, and the plural contents differ by mode — multiple product references for collection mode, product reference plus message-bearing elements for marketing mode.

7. **The curation event is uniform at the packet level across all four modes:** per-slot curation plus review-shaped coherence verification. Coherence pressure weight varies by mode; the structural mechanism does not.

8. **Selection-from-selections recursion is architecturally possible at higher organizational levels** (brand-system, portfolio, program-of-campaigns) but is not pressured by the current four mode packets. Treating curation as recursive at the packet level would over-fit.

9. **Governed-asset subject identity is mode-dependent.** The "what is this asset of" question resolves to different kinds of subject across modes — item, grouping, scene, or message-bearing subject — without disturbing the structural pattern.

## How The Curation-Depth Claim Evolved Through The Pressure-Test

The cross-mode pressure-test caused the claim about curation-event depth to evolve through three iterations. Recording that evolution is part of the method.

- **v1 (after SKU and campaign comparison):** "Curation can be recursive in some modes." Framed as binary, with campaign mode treated as nested curation.
- **v2 (after collection added):** Refined to a "depth dimension" with three patterns — per-slot only, per-slot plus cross-output coherence verification (review-shaped), and per-slot plus family-level event (nested-event-shaped).
- **v3 (after marketing added):** Contracted. Re-reading the campaign packet showed the same review-board pattern as the other three modes. The recursion the v1 framing imagined would only fire at organizational levels above the packet (brand-system curator, portfolio curator). At the packet level, curation is uniform across all four modes.

The contraction from v1 and v2 to v3 is the result of running the pressure-test honestly. Sometimes pressure-testing reveals less mode-dependent structure than initially claimed.

## Schema Implications

The pressure-test surfaced the following schema implications. None are authorized; recording them here is documentation, not a mutation plan.

- **Plural slot-input fields.** Collection-mode and marketing-mode slots benefit from plural reference inputs. The current `output_slots.product_image_lookup_lookup` is singular; collection-mode plural rollup is a probe question, not a model break.
- **Named message-bearing-element fields.** Marketing-mode slots would benefit from structured message elements (offer text, brand identifier presence, callout emphasis) rather than relying on freeform `slot_prompt` text.
- **Explicit constituent-SKU provenance for collection-mode governed assets.** Currently `generated_assets.asset_role` carries this implicitly via the packet to multi-SKU path; explicit linkage is a possible refinement.
- **Curation-event provenance.** Milestone 5's deferred fields (`capture_reason`, `captured_at`, `source_attachment_id`, `capture_notes`) earn their keep as the load-bearing record of the uniform packet-level curation event — not as differentiation for nested curation.

These implications do not authorize schema mutation. They define what a future schema move could address if and when one is opened.

## What This Note Does Not Do

- finalize a layer ontology
- harden the four worked-example modes into a closed taxonomy
- authorize schema mutation
- introduce runtime, orchestration, or validator language
- close the architecture
- supersede the existing `docs/architecture.md` working model
- claim production-readiness for any mode

## Anchor Documents

- [`docs/architecture.md`](architecture.md): high-level architecture stance and current ontology direction
- [`docs/four-mode-truth-and-constraint-pressure-note.md`](four-mode-truth-and-constraint-pressure-note.md): four-mode pressure comparison
- [`docs/shared-vs-mode-weighted-pressure-note.md`](shared-vs-mode-weighted-pressure-note.md): shared versus mode-weighted pressure comparison
- [`docs/review-artifacts-optional-vs-load-bearing-note.md`](review-artifacts-optional-vs-load-bearing-note.md): review artifact optional versus load-bearing comparison
- [`docs/cross-mode-constraint-layering-note.md`](cross-mode-constraint-layering-note.md): planning-level constraint layering comparison
- [`docs/milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md`](milestones/milestone-5-sku-driven-furniture-v1-prototype-plateau.md): SKU-driven Furniture v1 prototype plateau
