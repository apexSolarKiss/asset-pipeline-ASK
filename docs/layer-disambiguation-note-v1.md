# Layer Disambiguation
### Reconciling the 3-, 5-, 7-, and 8-layer models

## Why this note exists

The word "layer" has been used in this project to mean four different things. Because several of those meanings have similar counts, the various "N-layer" framings (3, 5, 6, 7, 8) have never lined up one-to-one — and the current architecture's "eight IA layers" list quietly spans two of the meanings. This note names the four meanings so the word stops carrying ambiguity into the architecture docs and into any diagram built from them.

It is a deconfliction reference, not a new model. The architecture in [architecture.md](architecture.md) is unchanged; this note explains how to read its layer vocabulary.

## The four meanings of "layer"

"Layer" has been used for four orthogonal architectural dimensions:

**Axis A // Ontology — what *kinds* of information exist.**
intent (business / creative) · inputs · constraints · outputs · governance — and, in earlier framing, orchestration. This is the definition-layer grammar: the categories of information the system structures, independent of where they live or when they are produced. Counted as five, six, or seven depending on whether intent is split and whether orchestration and creative discretion are listed as their own items. Orientation aid: the ontology tree diagram ([`docs/diagrams/asset-pipeline-ASK_ontology-tree.html`](diagrams/asset-pipeline-ASK_ontology-tree.html)) draws this axis — illustrative only; this prose is authoritative.

**Axis B // Inheritance — *where* information lives, and how it inherits, overrides, and combines.**
brand-system → category / product-class → collection / mode-specific → packet → slot. This is the layered IA the current work foregrounds: what is shared upstream, what becomes specific downstream, and how downstream layers inherit from or override upstream ones across the four worked-example modes. Orientation aid: the inheritance spine diagram ([`docs/diagrams/asset-pipeline-ASK_inheritance-spine.html`](diagrams/asset-pipeline-ASK_inheritance-spine.html)) draws this axis — illustrative only; this prose is authoritative.

**Axis C // Variation — what is *shared versus what varies*.**
universal structure · workflow-stream variation · brand-specific overlay. An early three-part model. **Historical, not current doctrine.** The question it asked — what is mode-independent versus mode- or brand-specific — survives in the current position that the schema is mode-independent at the structural level, but the three-tier framing itself is superseded and is retained here only for continuity.

**Axis D // Runtime — *when* in the production flow.**
candidate generation → curation seam → governed asset — and, at the verification level, the ingest → transformation → output → release-readiness seams. These are stages in the generation-to-governance flow: not places where content lives, and not kinds of content.

## How the historical counts reconcile

- **3** = Axis C (universal structure / workflow-stream variation / brand-specific overlay).
- **5** = either Axis A in a five-part ontology framing (inputs / constraints / creative discretion / required outputs / decision ownership — the framing used in the public write-up that foregrounds creative discretion; see the article series linked from [README.md](../README.md)), **or** Axis B counted as brand / category / collection / packet / slot. These two "fives" are different dimensions that happen to share a count — the most common single source of the confusion.
- **6 / 7** = Axis A, with intent as one bucket (six) or split into business and creative intent (seven).
- **8** = the current architecture's "eight IA layers," which is **Axis B and Axis D combined** — five scope layers plus three runtime stages.

The five-part ontology framing and the six/seven-part one are the *same* dimension (Axis A) counted differently: foreground creative discretion as its own item, fold the two intents upward, drop orchestration — and seven becomes five. They were never in conflict.

## Current / historical / held

- **Axis A — current as a concept**, in matured form (the normative-force kinds and the reference-function taxonomy carry it); the early six/seven-part "universal schema" enumeration is historical phrasing.
- **Axis B — current and foregrounded** (the layered IA; the headline architectural work). Note its own evolution: the early "collection" layer generalized into the mode-specific layer.
- **Axis C — historical / superseded.** Retained for continuity; not current doctrine.
- **Axis D — current**, but presented inside the eight-layer list rather than as a separate dimension.

## Why the "eight IA layers" list is a mixed list

[architecture.md](architecture.md) lists eight IA layers. Five of them — brand-system, category / product-class, mode-specific, packet, slot — are **Axis B** (scope / inheritance). Three — candidate generation, curation seam, governed asset — are **Axis D** (runtime / process). The eight-layer count is preserved there for continuity; architecture.md now labels the two groups, and this note records why the single list spans two meanings.

## Implication for diagrams

A diagram of "the layers" should depict **one axis at a time**, and name which. Collapsing axes into a single figure reproduces exactly the ambiguity this note exists to remove. A scope / inheritance picture (Axis B) and an ontology picture (Axis A) are different diagrams; neither is "the" layer diagram.

## Status

Deconfliction reference. It does not change the architecture, introduce a new model, or migrate other conceptual content. It records how to read the existing layer vocabulary so the word "layer" stops meaning four things at once.
