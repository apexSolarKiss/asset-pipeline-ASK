# Structured IA Model // Options Note v1

## Posture

```text
Phase 2 / post-pressure options note
on-paper architecture decision surface
not the structured IA model itself
not JSON / YAML / Pydantic implementation
not schema mutation
not Airtable
not milestone-8
not architecture.md rewrite
self-superseding once ASK chooses whether and how to author structured form
```

This artifact is a narrow options note. It does not author a structured IA model. It evaluates whether and how a structured IA model should be authored after Phase 1 + Phase 2 pressure.

The sparse-articulation fallback pressure note ([`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md)) reframed the structured-IA-model question from *"now or later?"* to *"what shape, given operator-judgment burden in stress conditions?"* This note answers the shape question; it does not implement.

## Why This Question Is Now Earned

The candidate's threshold criteria (B2 complete or B5 cross-mode synthesis in motion) are decisively past. Phase 1 closed; Phase 2 has produced opening sketch + three input-category deepenings + sparse-articulation fallback pressure. The v51 grounding-note doctrine ("structure earns its keep over prose by observed operational pressure") still applies, but its premature-restraint phase has ended.

Two pressure points specifically push this question to the surface:

1. **Translation is its own stress-test.** Forcing the prose synthesis into machine-readable form would surface internal-consistency findings that absorption reviews can miss.
2. **The pressure note's structured-IA-model timing reframe.** The sparse-articulation pressure surfaced operator-judgment burden, fallback-chain position, inferred-not-stated content, and held schema candidates as content the structured form would have to carry. That changes what a structured form looks like, not just whether to author one.

## What the Structured IA Model Would Need to Represent

Aggregated across the Phase 1 + Phase 2 outputs, the model has surfaces in seven distinct categories. Each one carries a different representational burden.

### Stable shared layers

The packet, slot, candidate generation, curation seam, and governed asset layers — present across all four worked-example modes per the cross-mode synthesis. Stable shape; well-articulated content per layer; relatively easy to represent structurally.

### Mode-specific layers

Collection / grouping (B2); message / offer / communication (B3); campaign concept (B4); review-context / campaign-world coherence (B4). Mode-bound; each carries distinct content. Representable as per-mode schema variants or as a polymorphic carrier.

### Carrier-status matrix dimensions

Five categories from the Phase 1 cross-mode synthesis (prose-carried; structurally explicit; structurally suggested but not earned; operationally deflated; operationally untested), extended by Phase 2 deepenings. Each carrier has a distribution across these states that varies by input category.

### Prose-carried content

The largest row in the carrier-status matrix. Description-heavy; flows into IA prose surfaces (`bounded_creative_discretion`, `creative_intent`, `business_intent`, `slot_prompt`, `capture_reason`, `capture_notes`). Structurally representing prose-carried content as data is awkward — the content's value is in being prose.

### Structurally explicit content

The shortest row in the carrier-status matrix for most input categories, except asset library (where it's the longest). Maps directly to existing IA carriers (`reference_assets`, lookup chains, `asset_attachment`, etc.). The cleanest case for structural representation.

### Inferred-not-stated content

A status, not content. The pressure note surfaced this as a discipline currently carried as prose convention; structural representation would be a `derivation_basis` flag or status enum. Held candidate; not earned.

### Fallback-chain position

Six-layer fallback chain from the sparse-articulation pressure note (asset library → photography style guide → brand platform → intra-category recency / specificity → Phase 1 worked-example defaults → operator-marked inferred-not-stated). Position in the chain is metadata about how content arrived, not content itself.

### Operator-judgment burden

The sparse-articulation pressure note's load-bearing finding: in conditions 4 and 5, operator judgment is structurally load-bearing. Operator judgment is procedural — operator does X based on context Y — and doesn't fit cleanly in data structures.

### Held / unearned candidates

Aggregated across Phase 1 + Phase 2: composite-anchor mutations (collection deflated; marketing held; campaign held + sharper); structured slot-message-element fields; selection_axis enum; reference-type tag (with two divergent category proposals from the visual pair); brand-platform first-class entity; approval-state metadata on reference_assets; rejected_assets entity; articulation_state flag; derivation_basis field; fallback_chain_position annotation; worked_example_defaults carrier; contradiction_log entity. Held and explicitly not earned across all five Phase 2 artifacts.

### Curation-premise pressure question

The B4 / B5 architectural concern carried forward through Phase 2. Three operational outcomes named (premise holds; refines; fragments). Resolution unauthored; pressure live.

### Apex Named Limitations

#1 (specific aesthetic-carrier schema), #2 (inheritance / override precedence), #3 (cross-base / marketing / campaign operational evidence). Carried forward across all artifacts; resolution unauthored.

## Options

Five options for how to handle structured-form-of-the-IA-model authoring.

### Option A — Custom YAML / JSON document

A flat or nested data document (likely YAML for readability) representing the IA model's stable content. Plausible top-level structure: layers, modes, mode-specific layers, brand-system input categories, fallback chain. Authored as a single document or split by concern.

**Pros:** flexible; readable; comment-friendly (especially YAML); can carry status fields explicitly; doesn't couple to any language.

**Cons:** no validation by default — the document can drift from any explicit shape; "machine-readable" only in the sense of parseable; programmatic interrogation requires writing code against it.

### Option B — Pydantic model

Python class definitions for each layer, mode, carrier, etc. Native to the existing `src/asset_pipeline_ask/` codebase. Generates JSON Schema via Pydantic for cross-language consumption.

**Pros:** type-safe; integrates with existing validators; docstrings carry semantic content alongside types.

**Cons:** couples representation to Python; less readable to non-developers; tends toward premature hardening because Pydantic's value IS the rigor of types — *Optional* + status enum scaffolding for held content adds design burden and reads as architectural commitment.

### Option C — JSON Schema

Standardized validation form. Specifies what a valid IA model document looks like; doesn't carry the model content itself (a separate document would).

**Pros:** standardized; cross-language; cross-tool support.

**Cons:** verbose; less readable than data instances; specifically designed for validation, not for documentation; tends toward premature hardening (the schema's job is to harden); awkward for held / unearned content (deprecated annotations, conditional schemas).

### Option D — Hybrid prose + structured appendix

A primary prose document carrying the narrative, uncertainty, operator-judgment paths, held candidates, fallback semantics, and the curation-premise pressure question. A secondary structured appendix (YAML or JSON; possibly Pydantic if validator integration is wanted) carrying the parts that are stable enough to commit — IA layer enumeration, mode taxonomy, worked-example role conventions, carrier types.

**Pros:** prose absorbs uncertainty; structure carries only what's earned; honest about what's stable vs negotiable; evolvable incrementally — appendix grows as content earns structural form.

**Cons:** two surfaces to maintain; risk of drift between prose and appendix; less rigorous than fully structured forms; "structured appendix" still has to pick a format (YAML / JSON / Pydantic / etc.).

### Option E — Defer until milestone-8

No structured form authored yet. Milestone-8 (held) absorbs both the prose synthesis and the structured-form decision when it lands.

**Pros:** doesn't commit to a form prematurely; honors v51 doctrine ("structure earns its keep over prose by observed operational pressure"); avoids ceremonial structure that doesn't yet have an operational consumer.

**Cons:** delays machine-readability indefinitely; milestone-8 may end up with too much to absorb; doesn't surface translation-as-stress-test findings.

## Evaluation Criteria

Seven criteria, weighted by what the post-pressure findings reveal about what the form has to handle.

1. **Clarity** — how readable is the resulting artifact across audiences (operator; future Claude session; external reader)
2. **Machine readability** — can validators consume it; can it be queried programmatically; can it generate other formats (Airtable schema; documentation; other)
3. **Resistance to premature hardening** — does the form allow held / unearned content to be carried without forcing commitment
4. **Ability to represent held / unearned candidates explicitly** — can paper-pressed-not-earned content be carried with its status visible
5. **Ability to represent operator judgment** — can procedural content (operator does X based on Y) live in the form
6. **Fit with existing repo validators** — does the form integrate with `src/asset_pipeline_ask/`
7. **Maintenance burden over time** — how much work is required to keep the form aligned with project evolution

## Comparative Evaluation Table

| Criterion | A: YAML/JSON | B: Pydantic | C: JSON Schema | D: Hybrid | E: Defer |
|---|---|---|---|---|---|
| Clarity | high | moderate | low | high | n/a |
| Machine readability | moderate | high | high | partial | none |
| Resistance to premature hardening | high | low–moderate | low | highest | highest |
| Held / unearned candidates | high | moderate | low–moderate | high | n/a |
| Operator judgment | moderate | low | low | high | n/a |
| Validator fit | low | high | moderate | partial | n/a |
| Maintenance burden | low–moderate | moderate–high | moderate | moderate (two surfaces) | zero |

## Recommendation

**Option D — hybrid prose + structured appendix — is the honest pick at this evidence depth.**

Reasoning:

- The pressure note's findings make pure structural form (Options B and C) read as designing-ahead-of-pressure exactly what the v51 doctrine warns against. Operator-judgment burden, inferred-not-stated content, fallback-chain position, and held candidates don't fit cleanly in pure data; encoding them anyway would commit the architecture to a meta-level it hasn't pressured.
- Pure prose (Option E, defer) is defensible but loses the translation-as-stress-test opportunity. Phase 1 + Phase 2's prose synthesis has accumulated enough stable content that machine-readable representation of the stable parts has value: the IA layer enumeration; the mode taxonomy; the worked-example role conventions; the carrier types; the input-category-to-layer mapping summaries.
- Pure data (Option A, YAML/JSON) is cleaner than B or C but doesn't carry the prose-shaped content (operator-judgment; fallback semantics; the curation-premise pressure question) at appropriate density. A YAML document with extensive comment fields starts to read as a hybrid anyway.
- Hybrid takes the rigor where it's earned and leaves the prose where it isn't. The appendix can grow as content earns structural form; the prose absorbs evolution.

**Recommended hybrid shape:**

The prose document (this kind of artifact, but the model itself rather than an options note) carries:
- Layer-by-layer narrative description (mostly absorbed from B5 cross-mode synthesis + Phase 2 deepenings)
- Carrier-status matrix discussion
- Operator-judgment paths and inferred-not-stated semantics
- Fallback-chain narrative
- Held / unearned candidates with status reasoning
- Curation-premise pressure question
- Apex Named Limitations carried forward
- Cross-mode synthesis findings

The structured appendix (YAML, with comments preserved) carries:
- IA layer enumeration (the seven-to-nine layers)
- Mode taxonomy (the four worked-example modes)
- Worked-example role conventions per mode (HERO / PROFILE / DETAIL / etc.)
- Carrier types (`reference_assets`; lookup chains; `asset_attachment`; five-axis provenance)
- Brand-system input category set + each category's layer-mapping summary
- Fallback chain ordering (as data; semantics still in prose)

**Optional Pydantic layer:** if validator integration is wanted, a Pydantic model can be derived from the YAML appendix as a separate concern. This decouples the model authoring from the validator integration; the appendix is the canonical model content; Pydantic is one of multiple consumers.

**Format for the structured appendix:** YAML over JSON. Reasons: comment-friendly (held / unearned status can be annotated inline); more readable for a hand-authored architecture artifact; convertible to JSON for programmatic consumers without losing content.

## Honest Case for Option E (Defer)

The recommendation above is hybrid, but the case for defer is honest enough to surface explicitly:

- No code path or workflow currently consumes the structured form. Phase 3 (held) is the operational consumer; until Phase 3 opens, the appendix has no operational pressure pushing on its shape
- Milestone-8 (also held) would absorb the prose synthesis comprehensively; folding structured-form authoring into milestone-8 gives one consolidated artifact rather than two
- The v51 doctrine's strict criterion (operational pressure surfaces a need) is not met by either translation-as-stress-test or by paper-pressed-but-stable content

If ASK weights doctrine purity over translation-as-stress-test, defer is the right move. The recommendation toward hybrid weights the translation opportunity slightly above the doctrine's strict reading; ASK's actual call may differ.

## What Is Explicitly Not Authorized Yet

- Authoring of the structured IA model itself (under any option)
- Creation of any YAML / JSON / Pydantic file
- Modification of `src/asset_pipeline_ask/` validators
- Resolution of any held schema candidate (including the structural-carrier candidates surfaced by the sparse-articulation pressure note)
- Resolution of any apex Named Limitation
- Resolution of the curation-premise pressure question
- Any Airtable mutation
- Architecture.md rewrite
- Milestone-8 synthesis

This note's job is the shape decision. Authoring follows ASK's choice.

## Open Questions

1. **If hybrid, where does the structured appendix live?** Same file as the prose model, separate file, or in a `schemas/` directory? Maintenance burden differs by placement.

2. **If hybrid, how does the structured appendix interact with `src/asset_pipeline_ask/` validators?** Direct consumption (validators load the YAML), Pydantic-derivation (Pydantic model is built from the YAML), or independent (validators stay as they are; appendix is documentation-only). Each has different coupling consequences.

3. **When should the structured appendix grow?** Per the v51 doctrine, when content earns structural form by operational pressure. The pressure note surfaced five candidates as paper-pressed-not-earned; would these be in the appendix or the prose? Honest answer: prose (with their held status named); appendix grows when one of them earns.

4. **Does the prose part of the hybrid eventually become the architecture.md rewrite content?** The architecture.md rewrite is held until milestone-8 lands. If the hybrid prose document is authored next, it becomes a candidate input to that rewrite — possibly reducing the rewrite's scope to consolidation rather than fresh authoring.

5. **What is the relationship between this note's authored structured form and the existing Airtable spec markdown?** Per the candidate memory entry: "It would not replace the Airtable spec markdown. The Airtable spec is the implementation guide for instantiating the model in a specific Airtable base. The structured IA model would be the canonical model itself — abstract, mode-aware, multi-instance." Held; the relationship is described but not yet exercised.

6. **Does the recommended hybrid shape risk being a smaller version of the architecture.md rewrite?** Honest concern: if the prose part of the hybrid carries layer-by-layer narrative + carrier-status matrix + operator-judgment paths + held candidates + curation-premise pressure question + Named Limitations, that's most of what milestone-8 / architecture.md rewrite would absorb. The hybrid might collapse the milestone-8 / rewrite work earlier than expected. This may be a feature (one consolidating artifact instead of two) or a scope-creep risk. The ASK-side call.

7. **If defer is chosen, what triggers re-opening this question?** Phase 3 opening (Airtable demonstration needs structured form for code consumption); milestone-8 authoring (consolidates whatever has accumulated); a Phase 2 milestone synthesis (consolidates Phase 2 specifically). Held.

## Self-Superseding Clause

This artifact is a narrow options note. It should be superseded by:

- ASK's choice of option (the structured form's authoring follows; this note's job ends)
- whatever option-A-through-D artifact is authored if ASK selects one (the artifact replaces this note's evaluative function)
- the milestone-8 synthesis if ASK selects defer; milestone-8 absorbs the structured-form decision then
- whatever later milestone-8 synthesis absorbs the redirection alongside Phase 1 + Phase 2 outputs and any operational evidence
- the eventual `docs/architecture.md` rewrite

It does not supersede the Phase 2 deepenings, the sparse-articulation pressure note, the Phase 1 cross-mode synthesis, the apex artifact, or the operator-memory candidate entry. Those remain authoritative for their subject matter; this note evaluates the structured-form-authoring shape question against their content.

## Anchor Documents

### Phase 2 outputs (the substantive content the structured form would carry)

- [`docs/brand-discovery-digestion-architecture-sketch-v1.md`](brand-discovery-digestion-architecture-sketch-v1.md): Phase 2 opening sketch
- [`docs/brand-system-input-photography-style-guide-to-ia-mapping-v1.md`](brand-system-input-photography-style-guide-to-ia-mapping-v1.md): photography style guide deepening — articulated visual conventions
- [`docs/brand-system-input-asset-library-to-ia-mapping-v1.md`](brand-system-input-asset-library-to-ia-mapping-v1.md): asset library deepening — demonstrated visual evidence
- [`docs/brand-system-input-brand-platform-to-ia-mapping-v1.md`](brand-system-input-brand-platform-to-ia-mapping-v1.md): brand platform deepening — non-visual articulation-only
- [`docs/brand-discovery-sparse-articulation-fallback-pressure-v1.md`](brand-discovery-sparse-articulation-fallback-pressure-v1.md): sparse-articulation fallback pressure note; reframed the structured-IA-model timing question

### Phase 1 outputs (the IA model the structured form would represent)

- [`docs/ia-layered-content-cross-mode-synthesis-v1.md`](ia-layered-content-cross-mode-synthesis-v1.md): cross-mode synthesis; carrier-status matrix; the most consolidated prose source for the structured form
- [`docs/ia-layered-content-redirection-note-v1.md`](ia-layered-content-redirection-note-v1.md): redirection note
- The four Phase 1 mode sketches (B1–B4)

### Apex and architectural-pass predecessors

- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): apex definition-layer artifact; Named Limitations the structured form would carry forward; the "structure earns its keep over prose" doctrine that the recommendation engages

### Plateau marker

- [`docs/milestones/milestone-7-v1-sweep-closure-plateau.md`](milestones/milestone-7-v1-sweep-closure-plateau.md): the operational plateau the Phase 1 + Phase 2 work reads against
