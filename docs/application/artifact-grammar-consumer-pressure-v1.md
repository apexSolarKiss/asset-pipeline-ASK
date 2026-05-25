# Artifact Grammar Consumer Pressure v1

## Posture

```text
application-consumer pressure pass
scoped to PR #274 implementation-roadmap + system-map artifact grammar
reads the consumer's demands back into the architecture
not architecture.md rewrite
not schema
not structured IA v3
not validator / orchestration
not held-candidate adjudication map
not universal across all future application grammars
not a candidate-next-pressure-surface enumeration
self-superseding when a second application grammar surfaces and a cross-consumer pass becomes appropriate
```

This pass reads the implementation-roadmap + system-map artifact grammar landed in PR #274 back into the architecture. The intent is bounded hardening at one consumer's depth, not a universal architecture-front-door response or a held-candidate adjudication. The consumer is one application-layer substrate among several possible; the observations below are scoped to it.

## Consumer Named

The consumer is the artifact grammar at [`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`](implementation-roadmap-system-map-artifact-grammar-v1.md): the first generated-output substrate of the asset-pipeline-ASK layered IA. The substrate is a hybrid implementation roadmap + system map deliverable produced by applying the repository's working ontology against a specific deployment context.

The grammar consumes repository concepts as author-side reasoning substrate. It does not consume them as a structured runtime feed, a validator specification, or a schema commitment. The reading register is conceptual: the grammar takes the architecture's working concepts and applies them in producing instances of the generated artifact.

This pass reads each repository concept the grammar touches and sorts it by the form of the consumer's pull: cleanly consumed; consumed only as translated or author-side substrate; not consumed (parked relative to this consumer).

## Concepts Consumed Cleanly

The grammar consumes these concepts directly. The architecture's investment in each survives the consumer-pressure test at this consumer's depth.

### Brand discovery / digestion architecture

Drives the grammar's Section 2 source inventory and the layered diagnosis in Section 4. The grammar's intake structure is the brand-discovery-digestion model: per-category elicitation, fallback under sparsity, provenance marking for what was supplied versus inferred. Source-artifact depth-authority lives at [`docs/brand-discovery-digestion-layered-intake-architecture-v1.md`](../brand-discovery-digestion-layered-intake-architecture-v1.md).

### Six-category synthesis

The six brand-system input categories (brand platform; visual identity system; photography / image style guide; asset library; application guidelines; past campaigns) structure the grammar's source-inventory categories and the intake-ordering logic. Source-artifact depth-authority lives at [`docs/brand-system-input-cross-category-synthesis-v1.md`](../brand-system-input-cross-category-synthesis-v1.md).

### Fallback chain

Handles sparse articulation across the intake categories. Surfaces in the grammar as the discipline for marking content as inferred and naming which fallback step produced the inference. The chain's ordering is consumed; its semantics surfaces in the generated artifact's provenance fields.

### Layered IA model

The five-layer skeleton (brand layer; category / product-class layer; channel-or-mode layer; project layer; per-asset layer) is the structural skeleton of the grammar's current-state and target-state system maps. Each layer's typical content guides what the grammar instances populate. Source-artifact depth-authority lives at [`docs/architecture.md`](../architecture.md).

### Reference-function taxonomy

The nine-fold taxonomy of reference functions characterizes how reference assets appear in the grammar's system maps and how reference-selection rationale gets surfaced in the provenance carrier. The taxonomy is consumed as conceptual structure; specific taxonomy labels do not surface in the generated artifact's prose (they are translated). Source-artifact depth-authority lives at [`docs/layered-reference-and-discretion-architecture-v1.md`](../layered-reference-and-discretion-architecture-v1.md).

### Curation semantic split

The distinction between authorship-bearing discretion (variable site by mode and packet) and governance-bearing curation (always at the curation seam) shapes the grammar's governance-layer diagnosis. The split is consumed as the structural reason why "where decisions happen" and "where assets become approved" surface as separate fields in the system maps. The label "curation semantic split" does not surface in the generated artifact; the underlying conceptual cut does.

### Carrier types

The five carrier types (prose; structural; visual; governance; held) describe how current-state and target-state map content is held in a deployment context. The grammar uses carrier-type vocabulary as author-side reasoning to characterize what's at each layer ("the brand layer is currently prose-carried; the recommended target state would add a structural carrier for brand-wide constants").

### Operator-authored versus inferred-not-stated distinction

The PR #239 / PR #241 distinction between content the operator authored as judgment and content inferred from evidence under sparsity drives the grammar's provenance carrier's `supplied` / `inferred` / `unresolved` marker. This is one of the grammar's most active conceptual borrowings: the distinction's value is operational, not just theoretical.

### Confidence / provenance logic

The provenance-and-confidence reasoning from the post-milestone-9 trace work feeds the grammar's Section 10 appendix and the inline provenance tags. The reasoning is consumed conceptually: what counts as a source; what justifies a confidence level; how to mark held questions. Specific trace-dimension labels from the source artifacts do not surface as label vocabulary in the generated artifact (they are translated).

## Concepts Consumed Only as Translated or Author-Side Substrate

The architecturally interesting category. The concepts in this section earned their keep internally — they shaped the architecture's understanding of what trace, rationale, and authority matter — but they do not become consumer-facing vocabulary commitments. The labels stay author-side; the underlying concepts surface in translated form.

This category does not yet have a name in the architecture. Surfacing it is one of this pass's main observations.

### Normative-force labels

The six force kinds (descriptive; directive; constraint; reference; judgment; governance) from [`docs/normative-force-and-durable-layer-pressure-v1.md`](../normative-force-and-durable-layer-pressure-v1.md) inform how the grammar's layered diagnosis characterizes the authority of each piece of information at each layer. But the labels themselves do not surface in the generated artifact. The grammar's translation rules render the underlying concept as "authority type" / "role of information" / "what kind of authority this carries"; specific force-kind labels stay author-side.

The architecture's investment in the normative-force vocabulary survives — but as conceptual substrate, not as consumer-facing vocabulary. This is the conceptual-vs-vocabular split.

### Trace concepts (presence-of-inspection; articulation-state; derivation-basis)

The trace-dimension vocabulary from the post-milestone-9 carrier-shape work informs how the grammar's provenance carrier marks what was inspected, what was articulated, and on what basis content was derived. The grammar uses the concepts: the inline-tag fields (`supplied` / `inferred` / `unresolved`) compress the derivation-basis five-value enumeration into three audience-readable categories; the appendix table surfaces presence-of-inspection through the source attribution field.

The trace-dimension labels themselves do not surface. `presence_of_inspection`, `articulation_state`, and `derivation_basis` are author-side reasoning vocabulary, not consumer-facing field names.

### Carrier-shape labels (Option F; R-A through R-E; Z4-A through Z4-E)

None of these labels surface in the grammar or the generated artifact. The carrier-shape arc taught the architecture what kinds of trace, rationale, and governance carriers might be needed for various pressures; the consumer of PR #274's grammar does not currently pressure any specific carrier-shape choice. The labels are conceptual scaffolding; the consumer reads through them, not at them.

This bucket category is the most pronounced case of the conceptual-vs-vocabular split: an entire labeled vocabulary that earned its keep through architectural learning but produces no consumer-facing commitment at this grammar.

### Structured IA model v2 YAML appendix keys

The grammar consumes the conceptual content the YAML appendix enumerates (eight IA layers; four worked-example modes; six brand-system input categories; six-layer fallback chain; force-kind vocabulary; reference-function taxonomy; carrier-status values; held-question markers) — but it consumes the content in prose form, not as a structured feed. The YAML appendix's specific keys, their data types, and their structural relationships are not consumed.

The YAML form is author-side. The concepts the YAML encodes are consumer-facing through translation. This is a particularly clean instance of the category: the architecture made the conceptual content structurally legible without yet earning a consumer for the structural form.

### Post-milestone-9 vocabulary generally

The arc's vocabulary (curation semantic split; layered reference and discretion architecture; layered intake architecture; six-category synthesis; force-kind pass; carrier-shape design surfaces; operational pressure tests; the multi-axis recurrence pattern) is consumed in mixed form. Some labels surface translated (the semantic-split concept becomes the governance-layer diagnosis's structural distinction). Other labels do not surface at all (the multi-axis recurrence pattern from milestone 12 has no consumer at this grammar). The conceptual content shaped the architecture's understanding; consumer-facing vocabulary commitments are selective.

## Concepts Not Consumed / Parked

Parking is conditional, not deletion. The items below have no consumer pull from this grammar. They remain held for other potential consumers; a different application grammar or a structurally different consumer could re-pressurize any of them.

### R-C vs R-D closure (intake-time reference rationale carrier shape)

The grammar uses prose rationale in Section 10 for reference selection; structured per-reference rationale carriers (the R-C vs R-D held question from PR #263 / PR #266) are not consumed. A future grammar that demands structured per-reference rationale at scale would re-pressurize this choice.

### Z4-C vs Z4-D closure (reuse-time governed-output governance carrier shape)

The grammar's first-pass output stops at recommendation; it does not reach actual generated outputs becoming reused governed assets. Z4-C versus Z4-D (from PR #268 / PR #270) is not consumed. A future grammar that operates on reuse-time governance (perhaps an Airtable-base grammar that includes asset reuse tracking) would re-pressurize this choice.

### Option F contradiction-resolution carrier-shape closure

The three structurally-suggested alternatives from PR #256 (sub-field on intake decision record; separate `contradiction_log` entity; annotation on inspection log entry) are not consumed. The grammar handles contradictions in prose within the provenance appendix. A future grammar with multi-author engagement continuity demands could re-pressurize this choice.

### Symmetric remock tests of any axis

Symmetric R-C remock at the intake-reference-rationale substrate; symmetric Z4-D remock at the Zone 4 substrate; cross-substrate variations of any axis. Not consumed by this grammar; consumer pull for these tests would require a grammar that depends on direct comparative pressure between specific carrier-shape alternatives.

### Universal cross-deployment brand schema

No grammar commits to a universal schema for brand content across deployment contexts. Each deployment context produces its own articulation shape. A cross-deployment universal schema would conflict with the aesthetic-agnostic stance the architecture maintains.

### Validator / runtime / orchestration consumer

The grammar's consumer is the artifact author, not a runtime. A validator that reads the structured IA model v2 YAML appendix and enforces schema constraints would be a structurally different consumer. Not pressured by this grammar.

### Structured IA model v3 absorption

A v3 absorption would author specific carrier shapes against the held vocabularies from the three carrier-shape axes. No current grammar pressures the structured form to absorb these shapes; the YAML appendix's stable enumeration remains sufficient for the conceptual content this grammar consumes.

### Held items from the architecture front door's Apex Named Limitations

The three Apex Named Limitations (specific aesthetic-carrier schema for brand-system, mode / category, or product-class; precedence rule for inheritance and override; cross-base / cross-category / cross-brand pressure plus full-flow operational evidence for marketing and campaign modes) remain held. Apex Named Limitation #1 has substantial movement through Zone 1A's structural earning and Zones 3-6's rerouting per PR #248; Apex Named Limitations #2 and #3 are not pressured by this grammar.

## Architecture-Hardening Implications

Observational. This section does not enumerate next moves.

### The conceptual-vs-vocabular split is a real architectural category

The architecture currently produces both concepts and labeled vocabularies. Some labeled vocabularies become consumer-facing (the layered IA layer names appear translated in the grammar's system maps). Other labeled vocabularies do not (force-kind labels; carrier-shape labels; trace-dimension labels). The labels in the second group still earned their keep — they shaped the architecture's reasoning — but they do not produce consumer-facing vocabulary commitments at this consumer.

The architecture does not currently name this category. Naming it would discipline future content placement: content that is reasoning substrate versus content that becomes vocabulary commitment. The two categories may merit different durability, different revision cadences, and different surfacing in the architecture's entry surfaces.

This pass does not propose a naming. It surfaces the category as a real architectural distinction.

### The post-milestone-9 carrier-shape arc's consumer contribution is conceptual, not vocabular

The arc taught the architecture what kinds of trace, rationale, and governance carriers matter under various pressure shapes. The teaching is consumed in the grammar's reasoning structure (the provenance carrier's design; the layered diagnosis's authority distinctions; the governance-layer's separation of authorship from elevation). The specific carrier-shape labels the arc produced (Option F; R-A through R-E; Z4-A through Z4-E) do not surface in the grammar.

Architecturally, this means the arc's value is preserved through translation. The labels remain available in source artifacts for other potential consumers; they do not need to close, schema-absorb, or front-door-promote on the basis of this consumer's needs alone.

### The structured IA model v2 YAML appendix awaits a structured consumer

The grammar reads the conceptual content the appendix enumerates but does not consume the appendix's structural form. The YAML keys, their data types, and their interrelationships are not pulled by this consumer. The appendix's claim — that the architecture can be expressed in structured form — survives the consumer-pressure test because the prose articulations of the same content are consumed. The structural form's distinctive value awaits a structurally distinct consumer.

This is not a critique of the structured form. It is an honest description of its consumer surface at present.

### The grammar's translation discipline is itself architecturally significant

The grammar specifies translation rules: which repository labels surface in audience-facing prose; which stay author-side; what the audience-readable equivalents are. The discipline is content rule, not style preference. Future application grammars may surface different translation rules; the meta-discipline of maintaining the translation discipline as a content rule may become a sibling concern across the application sub-tree.

This pass does not propose codifying the translation discipline. It surfaces the discipline as a category the architecture now exhibits in practice.

### Parking is consumer-conditional, not architectural closure

Items in the "not consumed / parked" section above remain available for other consumers. Parking is a sort against one consumer's demands, not adjudication. The architecture's held inventory remains held; this pass sorts a subset of it relative to one application surface.

This matters because held-candidate adjudication is a separate move that this pass explicitly does not perform. Sorting is application-consumer-distance; closure is something a different artifact would do.

### The grammar consumes Phase 1 + Phase 2 conceptual work most heavily

The cleanly-consumed bucket above is dominated by Phase 1 (the layered IA's structural skeleton) and Phase 2 (the brand-discovery-digestion architecture; the six-category synthesis; the layered intake architecture). The post-milestone-9 normative-force pass and the post-milestone-9 carrier-shape arc contribute conceptually but produce mostly translated-or-author-side vocabulary.

This is consistent with the post-milestone-12 reset memo's recontextualization: the carrier-shape arc is coherent sub-activity, not the architecture's new center; the Phase 1 + Phase 2 work remains the structural backbone. The consumer-pressure test corroborates that read.

### This pass may inform later routing

This pass surfaces observations the architecture may want to absorb in future moves. It does not enumerate or pre-commit to those moves. Each architectural surface that might evolve in response to these observations — the front door's compression; the structured form's consumer surface; the held inventory's sort; the entry surfaces' navigability — is a discretionary move whose authorization belongs elsewhere.

## What This Pass Does Not Do

- No `docs/architecture.md` rewrite.
- No schema. No commitment to any held schema candidate.
- No structured IA model v3 absorption.
- No validator or orchestration specification.
- No Airtable mutation.
- No grounding-note v59 opening.
- No memory write.
- No `design-system-ASK` implementation.
- No held-candidate adjudication map.
- No candidate-next-pressure-surface enumeration. Future moves the architecture might earn in response to this pass's observations remain discretionary; this pass does not pre-commit to any specific one.
- No claim that the observations above generalize across all future application grammars. A second application grammar (an Airtable-base grammar; a Python-scaffold grammar; an operating-documentation grammar) may surface different consumer pressure. Cross-consumer hardening would be a different pass.

## Scope marker

This pass is one application-consumer-distance reading against one consumer. Its observations are scoped accordingly. When a sibling application grammar surfaces, a cross-consumer pass may become appropriate. That pass would be different in shape from this one — its job would be reading across multiple consumers, not against one.

Until then, the architecture-hardening implications surfaced here remain scoped to PR #274's artifact grammar.
