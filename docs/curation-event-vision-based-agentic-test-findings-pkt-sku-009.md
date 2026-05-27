# Curation Event Vision-Based Agentic Test Findings // PKT-SKU-009

## Purpose

This note records the vision-based agentic curation test on the SKU-driven Furniture v1 base — the richer counterpart to the metadata-based test in [#149](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/149). Three new `generated_assets` rows were created for the `PKT-SKU-009` HERO / PROFILE / DETAIL slots. The executor agent visually inspected all 21 candidate attachments, fetched both reference images (`product_image_lookup_lookup` for SKU-CHAIR-004 and `packet_reference_image_lookup` for REF-PKT-SKU-009-VISUAL-INVARIANT-002), and proposed per-slot selections.

The test required a methodology correction in flight (an initial thin-test pass was caught by ASK and redone properly with reference grounding and iteration-chronology tracking). The corrections themselves became load-bearing findings.

Outcome: **Supported.** REF-002 binding is achieved in the most recent iteration; vision-based proper test converges with the metadata-based pick from #149.

## Architectural Anchor

The article [The Creative Act of Selection](https://atomicspacekitten.substack.com/p/the-creative-act-of-selection) and grounding note v42 articulate two delegation patterns: authorship-bearing curation and confirmation-bearing approval. The metadata-based test in #149 prototyped the second pattern using metadata heuristics. This test prototypes the same delegation pattern using *vision-based agent proposal with reference grounding* — and surfaces the limit case where the agentic-narrowing layer may not exercise the full criterion set the architecture cares about, requiring human correction in flight.

The full criterion set the proper test exercises:

1. **Product fidelity** — bind candidates to `product_image_lookup_lookup` (SKU-CHAIR-004 reference)
2. **Studio-world fidelity** — bind candidates to `packet_reference_image_lookup` (REF-002 visual invariant)
3. **Slot-role fit** — match candidate framing to the slot's required role (HERO three-quarter; PROFILE side; DETAIL material/joinery emphasis)
4. **Family coherence** — pick a *combination* across slots that reads as one consistent set
5. **Iteration chronology** — recognize that the candidate set is layered iterations, not a flat pool; later iterations encode cumulative learning from prior rounds (B-test variants, retry rounds, attachment-lookup fix)

## Plan (Stated Before Execution)

**Target:** create 3 new `generated_assets` rows on `appoqJ25B6w4vSuX9`, one per `PKT-SKU-009` slot, with vision-based reference-grounded family-coherent agentic curation event recorded.

**Action:** download all 21 candidate attachments + both references, view candidates against references, propose per-slot selections under all five criteria above, present to ASK for ratification.

**Non-actions:** no AI field-agent configuration, no generation invocation, no other slots/packets, no existing rows modified, no promotion to `governed_output` (the metadata-based agentic rows from #149/#150 already hold `governed_output` for these slots).

**Terminal stop:** 3 new rows ratified by ASK with `governed_output_status = candidate` (parallel ratified curation event coexisting with the metadata-based promoted rows).

## Execution Record

### Methodology correction in flight

The executor agent's *initial* pass was a thin version of the test:

- Viewed candidates per slot independently, not against references
- Fetched the product reference only after ASK caught a wrong-anchor error (the agent had anchored on the placeholder example file's SKU description — `EFB-SF-214-OAT` sofa — rather than verifying the live SKU `SKU-CHAIR-004` chair)
- Did not fetch the packet reference REF-002 at all
- Treated the candidate set as a flat pool rather than chronologically-layered iterations
- Prioritized strict slot-role-fit (true 90° profile, tighter detail crop) over reference binding
- Picked from the April 30 06:19 batch on slot-role-fit grounds
- ASK declined to endorse the picks and asked clarifying questions that surfaced both errors

The agent then ran the proper methodology:

- Fetched both references
- Recognized the candidate set as iteration history (May 1 03:11 = most recent and REF-002-bound via the attachment-lookup fix; April 30 = earlier rounds before binding worked)
- Re-prioritized criteria: REF-002 binding first, family coherence second, slot-role-fit interpreted within the slot's stated definition
- Re-selected all three from May 1 03:11 batch
- Confirmed convergence with the metadata-based pick from #149

ASK ratified the corrected picks.

### Final selections

| Slot | Row ID | Source attachment | Filename | Same as #149's metadata pick |
|---|---|---|---|---|
| HERO | `recfFqzRz2sJzNpyP` | `attHhekFb8MWgcIFg` | `Image_May_1_2026_3_11_AM.jpeg` | ✅ |
| PROFILE | `rec7wPVVsGW7v0DOm` | `att7ZYkBhsCbDIGzj` | `Image_May_1_2026_3_11_AM.jpeg` | ✅ |
| DETAIL | `recTNmexj6IscCguj` | `attP5XhJ5un2heqNW` | `Image_May_1_2026_3_11_AM.jpeg` | ✅ |

All three: `governed_output_status = candidate` (not promoted; metadata-based agentic rows from #150 hold `governed_output`); `curation_pattern = agent-vision-proposed-human-ratified`; `curator = Claude (vision-based proposing); ASK (ratifying)`.

## Findings

### 1. REF-002 binding: Supported in the most recent iteration

The May 1 03:11 round achieves background coherence with REF-002 across all three slots. Earlier iterations did not. The architecture didn't require a different curation pattern to recover binding — it required the upstream chain (B-test variants on prompt input hierarchy and model sensitivity, then the attachment-lookup fix that finally landed reference binding, then retry-round prompt updates) to land first.

**The curation seam can only succeed when generation produces a candidate set that supports it.** Vision-based agentic curation surfaces this honestly because the agent can see what was actually generated.

### 2. Vision-based and metadata-based curation converge under proper criteria

When both delegation patterns prioritize the same load-bearing criterion (reference binding via the most-recent iteration), they pick the same source attachments. This refines the framing from #149's findings: the convergence is not a property of metadata-based or vision-based curation in isolation — it's a property of *both patterns applying the right criterion priority*.

The thin test's apparent divergence on PROFILE and DETAIL was artifactual, driven by the agent's misjudgment of criterion priority and iteration chronology, not by genuine architectural difference between the patterns.

### 3. Vision-based curation can verify product-truth and studio-world fidelity that metadata-based cannot

Vision-based curation lets the agent compare candidates against `product_image_lookup_lookup` (product fidelity) and `packet_reference_image_lookup` (studio-world fidelity). Metadata heuristics cannot do either. This is the load-bearing capability that justifies the delegation pattern.

The capability is real even when (as in the thin-test pass) the agent does not exercise it correctly. The fix is methodology discipline, not pattern abandonment.

### 4. Failure mode: agent anchoring on the wrong reference truth

The agent's initial pass anchored on the SKU furniture example file (`docs/application/examples/sku-furniture-workflow-packet-example.md`, which describes `EFB-SF-214-OAT` as a sofa) instead of verifying the live SKU record (`SKU-CHAIR-004`, a sculpted dining chair). ASK caught the error. The agent corrected by fetching the live SKU and product records.

The architecture's standing discipline — *verify repo claims directly before acting* — exists for this class of error. The lesson parallels grounding note v42's anchoring framing at a different layer: not anchoring on an algorithmic narrowing, but anchoring on the wrong reference truth.

### 5. Failure mode: agent reading model-architecture variance as aesthetic variance

The candidate set spans a controlled experiment: the Airtable image-generation model was switched from `gpt-image-1` to `Gemini 3 Pro Image` on April 30, framed in the prior chain as **B-test variant 2 // model sensitivity**. The April 30 and May 1 batches sit on either side of this switch with different file-size profiles. The agent read this as a quality differential when it was an experimental variable.

The structural finding: **vision-based agentic curation can mistake architectural variance for aesthetic variance unless the agent knows the experimental conditions.** Mitigation requires either providing experimental-conditions context to the agent, or accepting that vision-based agents will occasionally over-interpret rendering artifacts. Both have tradeoffs.

### 6. Failure mode: agent treating candidate set as flat pool rather than iteration history

The agent's initial methodology pass treated the 21 candidates as a flat candidate pool rather than as chronologically-layered iterations encoding cumulative chain learning. This led to picking from earlier rounds (April 30 06:19) on slot-role-fit grounds, ignoring that the May 1 03:11 round was the *most recent* iteration where REF-002 binding had finally been achieved.

The structural finding: **vision-based agentic curation requires iteration-chronology awareness when the candidate set spans an experimental progression.** Without it, the agent can pick "the prettiest framing" from a round that the upstream chain had specifically iterated past.

### 7. HERO cushion drift confirmed as early-round artifact

The cushion-thickening / pillow-style drift the prior chain documented under the PKT-SKU-009 retry round is visible in HERO 4 (`attXnIjtgzMseUkXD` / `Image_April_30_2026_2_42_PM.jpeg`) and HERO 6 (`attnYD2Io3104PdWu` / `Image_April_30_2026_5_03_AM.jpeg`). The May 1 03:11 round (HERO 1 / `attHhekFb8MWgcIFg`) does *not* show this drift — the iteration sequence resolved it. This corrects an earlier mischaracterization in this note's draft that framed the HERO cushion drift as a trade-off accepted in the May 1 selection; the May 1 round is clean on this axis.

### 8. The five-axis curation event provenance held under in-flight correction

`source_attachment_id`, `capture_reason`, `captured_at`, `curator`, and `curation_pattern` all updated cleanly when the methodology was corrected and the picks shifted. The schema's text-not-collaborator decision continued to earn its keep — the compound `Claude (vision-based proposing); ASK (ratifying)` value preserved both roles transparently after the correction.

### 9. Parallel ratified curation events coexist cleanly without competing promotion

The metadata-based agentic rows from #149/#150 already hold `governed_output` for these slots. The vision-based proper-test rows ratified by ASK for these same slots stay `candidate`. The architecture supports this because `governed_output_status` and `curation_pattern` are orthogonal — the same source attachment can be the elevated governed output once and the recorded subject of multiple ratified curation events. No promotion conflict.

## Cross-Test Comparison: Metadata-Based vs Vision-Based Agentic Curation (Corrected)

| Axis | Metadata-based ([#149](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/149)) | Vision-based proper test (this PR) |
|---|---|---|
| Inputs available to the agent | filenames, dimensions, sizes, timestamps, array order | actual image content + product reference + packet reference + slot role |
| Capability: slot-role awareness | implicit (defaults to first-in-array) | explicit (agent matches view-angle to slot, but interpretation may be too strict) |
| Capability: product-truth verification | none | yes, but vulnerable to wrong-reference-anchor failure |
| Capability: studio-world / REF-002 verification | none | yes, when methodology includes fetching the packet reference |
| Capability: iteration-chronology awareness | implicit (first-in-array == most recent in this dataset) | explicit but easy to miss |
| Final selections | HERO, PROFILE, DETAIL all `attHhekFb8MWgcIFg` / `att7ZYkBhsCbDIGzj` / `attP5XhJ5un2heqNW` | identical after methodology correction |
| Convergence with human curator | 3 of 3 ratified | 3 of 3 ratified after correction; 0 of 3 endorsed in thin-test pass |
| Resulting `curation_pattern` | `agent-proposed-human-ratified` | `agent-vision-proposed-human-ratified` |
| Governance outcome | rows promoted to `governed_output` | rows remain `candidate` (parallel ratified, not competing for promotion) |

The honest story: when both delegation patterns apply the right criteria, they converge on the same source attachments because the underlying generation produced a clear best-iteration set. The vision-based pattern adds verifiable capability but also adds new failure modes that require methodology discipline (reference fetching, chronology tracking, criterion priority).

## Structured Change Summary

**Why this change exists.** [#149](https://github.com/apexSolarKiss/asset-pipeline-ASK/pull/149) prototyped one kind of agentic delegation. The article and grounding note v42 framed agentic curation as a delegation pattern with multiple possible kinds. Vision-based agentic curation is the natural richer counterpart and the next item in the v1 sweep. The test exercised the load-bearing capabilities (reference grounding, family coherence) — though only after ASK caught the agent's initial methodology shortcuts and required a redo.

**What changed.** Three new `generated_assets` rows on the SKU-driven Furniture v1 base, one per `PKT-SKU-009` slot. All four provenance fields populated organically on row creation. New phase identifier `AGENTIC-VISION` added alongside `GATE2`, `GATE6`, and `AGENTIC`. New `curation_pattern` value `agent-vision-proposed-human-ratified` added to the dataset.

**What did not change.** No schema mutation. No existing rows touched outside this test's three rows. The metadata-based agentic rows from #149/#150 retain `governed_output` and `agent-proposed-human-ratified`. Other tables, modes, and bases untouched. AI field-agent configuration unchanged. No generation invocation. `AGENTS.md` and grounding note untouched.

**What remains out of scope.**

- Promotion of any of the three new rows
- Generation invocation followed by curation in a single end-to-end test (full-flow test, next on the v1 sweep)
- Re-running with fresh generation today
- Resolution of the `asset_uri` writeback blocker
- Cross-mode application
- Splitting `curation_pattern` into structured sub-fields
- Backfill of milestone-5 HERO row's `curation_pattern`
- D-probe on product-truth drift (the cushion drift is documented but not separately probed here)

## Open Questions / Next Pressure Points

1. **Full-flow test (generation + curation in one cycle).** Next item on the v1 sweep. Heavier; pulls in AI field-agent configuration.
2. **Whether vision-based agentic curation should be allowed (or required) to access experimental-conditions context.** Failure mode 5 (model-architecture variance) is mitigable by giving the agent context about the candidate set's history; both providing it and not providing it have tradeoffs.
3. **Whether iteration-chronology awareness should be a default discipline for vision-based agentic curation.** Failure mode 6 (flat-pool reading) suggests yes when the candidate set spans an experimental progression.
4. **Cross-mode application.** Final item in the v1 sweep.
5. **D-probe on product-truth drift.** The cushion drift is documented across PKT-SKU-009 retry-round notes; a separate D-probe to characterize and resolve it remains earned but not opened.

## What This Note Does Not Do

- promote any of the three new rows to `governed_output`
- backfill `curation_pattern` on the milestone-5 HERO row
- introduce any new schema field
- claim that vision-based agentic curation produces aesthetically correct picks by default — the methodology has to be applied correctly, and ASK's review remains load-bearing
- close the v1 sweep — full-flow generation+curation and cross-mode application remain

## Anchor Documents

- [`docs/curation-event-agentic-test-findings-pkt-sku-009.md`](curation-event-agentic-test-findings-pkt-sku-009.md): the metadata-based agentic test that this counterparts
- [`docs/curator-field-and-backfill-sku-driven-furniture-v1.md`](curator-field-and-backfill-sku-driven-furniture-v1.md): the prior move that completed the by-whom axis of curation event provenance
- [`docs/governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md`](governed-output-promotion-and-curation-pattern-findings-pkt-sku-009.md): the move that added `curation_pattern`
- [`docs/cross-mode-layered-input-model-and-curation-event-note.md`](cross-mode-layered-input-model-and-curation-event-note.md): the cross-mode v3 architecture sketch
- [`docs/milestones/milestone-6-curation-event-first-class-plateau.md`](milestones/milestone-6-curation-event-first-class-plateau.md): the plateau this builds from
- [`docs/field-agent-configuration-b-test-findings-pkt-sku-009.md`](field-agent-configuration-b-test-findings-pkt-sku-009.md): B-test variant 1 (instruction-canvas hierarchy) findings — Not supported
- [`docs/gate-2-image-bearing-reference-path-findings-pkt-sku-009.md`](gate-2-image-bearing-reference-path-findings-pkt-sku-009.md): the attachment-lookup path that finally landed REF-002 binding
- [`docs/url-visual-reference-recurrence-findings-pkt-sku-009.md`](url-visual-reference-recurrence-findings-pkt-sku-009.md): the PKT-SKU-009 retry-round findings that documented the HERO cushion drift
