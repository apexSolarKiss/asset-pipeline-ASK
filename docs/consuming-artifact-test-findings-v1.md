# Consuming-Artifact Test — Findings (v1)

## Posture

```text
operational findings — the test pre-registered in the definition artifact, now run
controlling contract: consuming-artifact-test-definition-v1.md (scored strictly against its outcome classes and taxonomy)
inputs read as-is; no store mutation; no generated roadmap/system-map deliverable produced or committed
no hash+pointer carrier build
no real second-substrate run
no reference-rich / SKU visual-reference package
no runtime consumer
no package grammar
no schema / validator / structured IA model v3
no 1C reader-path / evaluator-screen work
no new generation proof
result is decision-bearing; it authorizes no downstream work
self-superseding when re-run with a different consumer / package / a different (package-shaped) consuming grammar
```

This artifact records the run of the consuming-artifact test [defined here](consuming-artifact-test-definition-v1.md). The definition is the controlling contract: the question, the allowed inputs, the citation rule, the per-section outcome classes, and the six-class insufficiency taxonomy were all fixed before this run; the scoring below does not redefine them.

## Setup

- **Consumer.** A fresh, independent general-purpose subagent with no session context, applying the grammar to the package store under a blind packet — the same blind-reader methodology used by the recovery test and the byte-boundary test.
- **Allowed inputs — exactly two.** The 2c worked package store ([`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/), all data files) and the application grammar ([`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`](application/implementation-roadmap-system-map-artifact-grammar-v1.md)). All other repo docs, thread context, the test-definition artifact, the byte-boundary artifacts, and external brand/domain knowledge were forbidden.
- **The citation rule + anti-improvisation guardrail.** For each grammar section the consumer had to cite the specific package file or grammar rule supplying each substantive claim; any content not traceable to an allowed input is scored as package-insufficiency, regardless of what a thread-aware executor would "know." The load-bearing instruction: **the run tests whether the package can support the artifact, not whether the consumer can improvise a plausible one** — gaps must be marked as insufficiency, not papered over.

## Per-section grid

The consumer attempted all ten sections (it did not author the deliverable; it assessed per-section sufficiency under the citation rule).

| § | Section | Score | Insufficiency class(es) | What the package could not supply |
|---|---|---|---|---|
| 1 | Executive read | FAIL | 1, 6 | A deployment's stated purpose; every headline is a roll-up of body sections that fail |
| 2 | Source inventory | FAIL | 1, 5 | ~9 of ~16 intake categories (channels, cadence, approval workflow, roles, QA, tools, rights, past campaigns) have no source; supplied items are a synthetic aesthetic scaffold, not deployment intake with attributable form |
| 3 | Current-state system map | FAIL | 1, 6 | A workflow state (teams, systems, handoffs, feedback loops); the package holds one asset's internal production chain, not an operational workflow |
| 4 | Layered diagnosis | FAIL | 1 | Workflow strain across layers; the package allows diagnosis only of one packet's articulation-completeness |
| 5 | Gap / risk map | FAIL | 1, 2 | Per-workflow-stage / governance-point risk; the gaps the package exposes are storage-substrate gaps (no bytes, no integrity/pointer carriers, held support slot) |
| 6 | Recommended target-state map | FAIL | 1, 6 | A target state for a deployment; the package is a record of what was produced, not a recommendation |
| 7 | Substrate recommendation | FAIL | 1, 6 | Diagnosed organizational capacity (team-skill, bandwidth, integration, tools); zero capacity intake exists in the package |
| 8 | Implementation roadmap | FAIL | 6, 1 | Current/target state, cadence, engagement effort — the three inputs a roadmap is built from |
| 9 | Decisions needed | FAIL | 1 | Deployment-side open decisions; the package's held items are creative-production holds inside one packet |
| 10 | Provenance / confidence appendix | FAIL | 1, 5 | Body claims to attribute — §10 is parasitic on §§1–9, which produced none |

**Counts: 0 PASS, 0 PARTIAL, 10 FAIL.**

## Aggregate readings

1. **The grid** (above): every section FAILs.
2. **Sections the package supports / cannot:** none supported (PASS/PARTIAL); all ten unsupported.
3. **Dominant insufficiency classes:**
   - **Class 1 — source-type mismatch — blocks all 10 sections.** The grammar consumes a *deployment's* brand-system + workflow / production / governance / capacity / cadence intake; the package is a single governed-output instance (one asset's intent → discretion → constraints → references → candidates → governed asset).
   - **Class 6 — implementation-roadmap ambiguity — blocks §§1, 3, 6, 7, 8.** No current state, no target state, no diagnosed capacity, no cadence, so the recommend/roadmap half is unsupportable.
   - Secondary: **Class 5 — package-grammar gaps** (§§2, 10: one instance, not a reusable intake shape); **Class 2 — carrier-completeness** (§5: the real gaps the package exposes are byte / integrity / pointer-carrier absences).
4. **Headline classification: category-mismatched source.** The grammar is the wrong consumer for a package instance. Every section fails on class-1 source-type mismatch — not a "fill the gaps" insufficiency but a category error: the grammar's consumer is a deployment intake stack; the package is one produced asset's definition-and-governance chain.

This confirms the definition's pre-registered primary hypothesis. The hypothesis was held falsifiable (the per-section grid could have shown the package serving as a partial mini-intake); the run did not overturn it — it confirmed it at every section.

## The citation rule held (methodological evidence)

The result is package-insufficiency, not consumer-incapacity. Without the anti-improvisation guardrail, a consumer could have produced a plausible-looking ten-section artifact by inventing a deployment (a fictional brand scaling its asset production). The consumer explicitly declined four such temptations, each recorded:

- **§§3 / 6** — declined to elaborate the packet's intent → discretion → variance → selection → governance chain into a fictional multi-team workflow with handoffs and feedback loops (none are in the two inputs).
- **§7** — declined to recommend "Airtable" from familiarity; the package's Airtable mentions describe *this exercise's* prior storage, not a deployment's diagnosed capacity.
- **§2** — declined to count the synthetic "Warm Restraint" scaffold as a brand-platform intake item (its own file marks it synthetic), and counted the ~9 missing intake categories as the finding.
- **§§1 / 10** — declined to treat the package's own provenance markers (`not_held`, `planned`, `authorship-bearing`) as satisfying the artifact's provenance requirement; those describe asset bytes and creative holds, not defensible workflow-diagnosis claims.

That the consumer marked insufficiency where improvisation was available is the evidence that the 10/10 FAIL measures the package, not the consumer.

## What this changes architecturally

The run is decision-bearing, and it lands the **larger** of the two outcomes the definition named:

- A package instance needs a **different consuming grammar** than this deployment-diagnostic implementation-roadmap / system-map grammar. The two are different objects: the grammar diagnoses a deployment and prescribes a roadmap; a package is a governed-output unit. The next architectural question on the consuming-artifact path is **what generated artifact a *package* (rather than a brand-system intake) is the right source for** — e.g., an artifact that reads a package's definition-and-governance chain, not a deployment's workflow.
- **Perfecting visual carriers is premature until the package's consumer is correctly identified.** The byte-boundary findings named carrier-completeness (hashes + durable pointers) and visual-auditability as the gaps the store-as-is leaves. This run shows those are *not* the gaps that block the one application-layer consumer the repo currently has — class-1 source-type mismatch blocks all ten sections before any carrier-completeness or visual-auditability gap is reached (class 2 appears once, secondarily). A real second-substrate run or a reference-rich run would deepen a carrier the current consumer never reaches; that is the proof-chain-gravity risk the run was meant to test for, and it confirms the risk is real.

So the diagnostic-upstream value held: rather than the project pre-committing to the visual-payload carrier work, the run shows the genuine next question is the identity of a package's consumer.

## Honest limits

- **One consumer, one package, one grammar.** Single blind consumer; the proven 2c marketing-hero package; one application grammar. No multi-consumer replication; no other package/mode; no other application grammar.
- **This grammar was authored for deployment intake.** The grammar states it produces its deliverable "by applying the repository's working ontology against a specific deployment context." The category-mismatch is therefore a finding about the *relationship between a package instance and this deployment-diagnostic grammar*, not a claim that the package is useless to every possible consumer. A different, package-shaped application grammar (not authored; not authorized) is exactly what the result points toward.
- **The package is explicitly synthetic.** Its brand-system layer is a prototype-aesthetic instance, self-marked as scaffolding. A non-synthetic package would still be a governed-output instance, not a deployment intake, so the source-type mismatch would persist; but the synthetic status is recorded.
- **Not counterfactual.** Unlike the byte-boundary Tier-2 overlay, this run used the real package store and the real grammar with a real consumer; the result is operational at one-consumer depth, bounded by replication rather than by hypothesis.

## What this run authorizes

Nothing downstream. The test is complete and its classification recorded. Authoring a package-shaped consuming grammar, building a hash+pointer carrier, a real second-substrate or reference-rich run, a runtime consumer, a package grammar, a schema, structured IA v3, or any 1C reader-path work each remain separate, unauthorized, fresh strategic decisions under threshold-pause discipline.

## Self-superseding clause

This findings artifact should be superseded by:

- a **re-run with a different consumer** (multi-consumer replication of the category-mismatch classification);
- a **different-package run** (SKU / collection / campaign) re-tested against the same grammar, to confirm source-type mismatch is a property of the package object, not the marketing mode;
- a **package-shaped consuming-grammar attempt** — a generated-artifact grammar whose source is a package instance rather than a deployment intake — which would convert this run's redirect into a positive consumer test;
- a subsequent milestone that absorbs the consuming-artifact finding into the architecture's application-layer claim discipline.

It does not supersede the test definition (its controlling contract), the application grammar, the worked package store, the byte-boundary artifacts, milestone 13, or any prior artifact; those remain authoritative for their subject matter.

## Anchor documents

- [`docs/consuming-artifact-test-definition-v1.md`](consuming-artifact-test-definition-v1.md) — the controlling test contract this run scores against
- [`docs/application/implementation-roadmap-system-map-artifact-grammar-v1.md`](application/implementation-roadmap-system-map-artifact-grammar-v1.md) — the grammar the consumer applied; its source-to-section mapping is what the package was tested against
- [`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/) — the package read as the source
- [`docs/byte-boundary-auditability-test-findings-v1.md`](byte-boundary-auditability-test-findings-v1.md) — the prior run; its carrier-completeness / visual-auditability gaps are the carriers this run shows the current consumer does not reach
- [`docs/milestones/milestone-13-portability-evidence-plateau.md`](milestones/milestone-13-portability-evidence-plateau.md) — the plateau; failable next-evidence standard ("test use, not readability") this run instances
- [`docs/architecture.md`](architecture.md) — §Application-Layer Outputs records the grammar as the first concrete internal consumer, consuming the structured IA conceptually not structurally
```
