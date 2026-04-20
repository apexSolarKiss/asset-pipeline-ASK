# Airtable Manual Test Findings // SKU-Driven Furniture v1

## Purpose

This document records the first live manual Airtable cycle against the `SKU-driven product imagery` proof build.

Its purpose is to capture what happened in the live base, what carried cleanly, what did not, and what the first manual run revealed about the current proof surface. It is a findings artifact, not an architecture rewrite.

## What Was Tested

The first live manual cycle tested whether the current Airtable proof could carry one bounded SKU-driven furniture packet through the intended manual sequence without widening the build beyond v1.

The cycle covered the current record graph in live use:

- `products`
- `constraint_rules`
- `reference_assets`
- `workflow_packets`
- `seam_runs`
- `generated_assets`
- `review_gates`

The manual run also exercised the intended seam sequence:

1. `ingest_validation`
2. `transformation_check`
3. first `output_validation`
4. bounded revision loop through a second `transformation_check`
5. second `output_validation`
6. `release_readiness`

The run therefore tested the most important v1 burden: whether one bounded packet could move through the deterministic seam chain, fail once at `output_validation`, recover through one narrow revision loop, and arrive at an approval-facing gate without needing a broader architecture move.

## What Worked Cleanly

The live base was able to carry one real manual cycle across the intended tables without requiring extra tables or a wider record graph.

The core records were created in the live run:

- one governed product record
- three active constraint-rule records
- three linked reference-asset records, including supporting and approved directional reference material
- one workflow packet
- six seam runs covering ingest, transformation, output, revision, and release-readiness
- three generated-asset records spanning candidate and later governed output use
- one approval-facing gate record

The seam order remained legible in the live base. The first `output_validation` could fail without collapsing the packet, and the packet could then continue through one bounded revision loop rather than requiring a more elaborate branching structure.

The governed-output distinction also held. The run did not need to collapse candidate assets and governed outputs into the same meaning in order to advance.

The approval-facing gate also remained separate from seam execution. The gate could be opened only after release-readiness rather than being absorbed into the earlier seam records.

The packet lifecycle also remained legible in live use. Packet status could move from `ready_for_ingest` to `in_verification` and then to `release_ready` without requiring extra state machinery outside the current v1 posture.

## What Failed

The first `output_validation` failed. That failure was not abstract; it materialized as the first concrete live proof that the v1 build needed a bounded revision loop rather than a straight-through happy path.

That failure did not invalidate the seam model, but it did show that the first acceptable output set did not emerge from the first transformation pass. The first output failure was specifically that the required output set was incomplete.

The run therefore required:

- one failed first `output_validation`
- one additional bounded `transformation_check`
- one second `output_validation`

The second transformation pass produced the missing supporting view needed to complete the required output set.

This means the first live cycle did not behave like a trivial pass-through record demo. It behaved like a real bounded verification chain with one explicit correction loop.

## Connector Or Platform Limitations

The live manual cycle surfaced connector or platform limitations around URL safety and field-type behavior.

URL handling was one concrete limitation. The first attempt to use placeholder external URLs was blocked before Airtable received the request. That should be treated as platform URL-safety behavior rather than as a schema or record-graph failure.

Field-type behavior was another platform-facing limitation. Some Airtable field behaviors did not cleanly express the intended distinction between carried meaning and convenient display shape, which created friction at the level of Airtable configuration rather than at the level of the proof model itself.

These limitations matter because they affect how faithfully the proof can be instantiated in Airtable. They do not, by themselves, show that the current seam model or record graph failed.

## Airtable-Specific Compromises

The live run required Airtable-specific compromises in order to keep the build narrow.

The proof already allowed some flexibility in field posture, and the manual cycle confirmed that this flexibility was necessary. Some fields had to be treated more pragmatically than ideally in order to preserve a workable live base.

The most visible compromise was that Airtable field behavior sometimes forced the build toward usability-first choices rather than perfectly expressive structure. That included compromises around how URL-bearing fields and other field types behaved in practice.

Another compromise was that the build remained intentionally manual. The first live cycle did not try to solve connector behavior, stronger generated logic, or wider automation gaps inside the base itself.

These are Airtable-specific compromises rather than proof-level failures.

## Where Meaning Became Ambiguous

The first live cycle surfaced ambiguity in a few narrow places.

First, some live-field behavior made it harder than intended to keep source material, linked evidence, and convenient working references as clearly separated as the proof prose would ideally like.

Second, the live run confirmed that manual record creation can make some statuses and field values feel more operational than conceptual. That does not break the proof, but it does blur the line between a record that carries meaning and a record that merely helps a builder keep the base usable.

Third, the run reinforced that review-facing material and governed outputs remain related but distinct. The live cycle did not collapse them, but it did show that Airtable can make the distinction feel thinner in practice than it does in prose if the build stays intentionally minimal.

## Predicted Pressure Points That Materialized

Several pressure points predicted in the build documents did materialize in the first live cycle.

The first predicted pressure point was the need for one bounded revision loop. That materialized immediately through the failed first `output_validation` and the subsequent second transformation pass.

The second predicted pressure point was richer handling pressure around generated assets. That did not yet force a schema expansion, but the live cycle did confirm that candidate-versus-governed distinction carries real weight in the base.

The third predicted pressure point was Airtable field behavior itself. URL safety and field-type behavior proved to be real platform-facing constraints rather than hypothetical inconveniences.

The fourth predicted pressure point was the burden of findings capture. The live cycle did not show a current repo note failing to carry its burden, but it did show that the repo needed a findings artifact of this kind in order to preserve what the first live run actually taught.

## Predicted Pressure Points That Did Not Materialize Yet

Several predicted pressure points did not materialize yet in this first cycle.

The run did not force a wider record graph.

It did not force a generalized multi-mode schema.

It did not force a richer revision-graph design beyond the one bounded loop already anticipated.

It did not force approval-policy automation.

It did not show a current repo-local architecture note visibly failing to carry the burden. The most immediate gap that materialized was build/findings capture, not architecture failure.

## Narrow Conclusions

The first live Airtable manual cycle counts as a real execution proof rather than a paper-only build plan.

The live base could carry the intended records, run the seam sequence in order, survive one failed first `output_validation`, complete one bounded revision loop, and arrive at a release-facing gate without needing a broader conceptual rewrite.

In concrete terms, the live run ended with one product, three constraint rules, three reference assets, one workflow packet, six seam runs, three generated assets, and one review gate recorded in the base. The final governed output count ended at `2`, and the gate state ended at `ready_for_review`.

That means the live cycle not only stayed conceptually legible, but also arrived at the intended narrow end state: a release-ready packet with a complete required output set and one approval-facing gate still kept separate from approval itself.

The main limitations that surfaced were not architecture-collapse signals. They were build-surface findings:

- live URL safety friction
- Airtable field-type behavior compromises
- the need to capture empirical build findings explicitly

The narrow conclusion is therefore that the current proof surface held, while the live burden shifted from planning-only documentation to build/findings capture.

## Follow-On Questions Before Cycle 2

- Which URL-handling constraints should be treated as Airtable/platform facts versus builder-workflow conventions?
- Which field-type compromises are acceptable temporary v1 pragmatism, and which ones would create misleading meaning if repeated?
- How much generated-asset handling can stay narrow before candidate-versus-governed distinction becomes too thin in the live base?
- What is the smallest repeatable findings template the repo should use for later manual cycles?
- Which cycle-2 questions belong to Airtable build refinement, and which would actually justify repo-local architecture pressure?
