# Byte-Boundary Auditability Test — Findings (v1)

## Posture

```text
operational findings — the test pre-registered in the definition artifact, now run
controlling contract: byte-boundary-auditability-test-definition-v1.md (scored strictly against its outcome classes)
the store was read as-is; no store mutation
the Tier-2 mock was an audit overlay for scoring carrier-class sufficiency — NOT a committed carrier, NOT a prototype
no new package store
no SKU visual-reference package
no image-byte storage
no runtime consumer
no package grammar
no schema / validator / structured IA model v3
no 1C reader-path work
no new generation proof
result is decision-bearing and remedy-neutral; it authorizes no downstream work
self-superseding when re-run with a different auditor / package / a real second substrate carrying actual pointers
```

This artifact records the run of the failable byte-boundary test [defined here](byte-boundary-auditability-test-definition-v1.md). The definition is the controlling contract: tasks, tiers, byte-status vocabulary, and PASS / PARTIAL / FAIL outcome classes were all fixed before this run, and the scoring below does not redefine them.

## Setup

- **Auditor.** A fresh, independent general-purpose subagent with no session context, given a blind packet. This mirrors the worked-package-store recovery test's fresh-reader methodology and avoids the definition's author marking their own homework.
- **Blind packet.** Only the nine store data files (`README.md`, `package.yaml`, `references.yaml`, `constraints.yaml`, `slots.yaml`, `candidates.yaml`, `governed-assets.yaml`, `brand-system.yaml`, `_substrate.yaml`). Explicitly excluded: `_recovery-test.md` and the test-definition artifact. The auditor attempted tasks A–F from the store alone and scored each at Tier 1 and Tier 2.
- **Tier-2 mock (audit overlay only).** Tier 2 was scored as a hypothetical overlay in which every *existing* image carrier additionally carries a content hash + a durable resolvable pointer, but **no in-package bytes**. No file was written, no store record was changed; the overlay exists only as the auditor's scoring assumption. Per the run's guardrail, the question was whether hashes + durable pointers are sufficient **as a carrier class**, not what the final carrier should be.
- **Counterfactual honesty.** The store holds no real images and no real durable pointers (the candidates' only image trace is a quarantined Airtable attachment-id the store declares is "NEVER a link key"). So Tier-2 PASS scores are **carrier-class sufficiency judgments** — "if a hash + resolvable pointer existed, the task would be verifiable" — not visual audits performed on real bytes. This is exactly the carrier-class question the guardrail scoped; it is not a claim that the pixels were inspected.

## Per-carrier byte-status (store as-is / Tier 1)

| Carrier | Count | Byte status |
|---|---|---|
| References (brand-system master; palette board) | 2 | **`image_absent`** — `image: null`, image-pending; never produced |
| Candidates (the variance) | 7 | **`legacy_provenance_only`** — no bytes, no hash; only a quarantined Airtable attachment-id (not a durable/resolvable pointer; no meaning off-Airtable) |
| Governed output | 1 | **`legacy_provenance_only`** — substrate-neutral `selected_candidate` link + quarantined attachment-id; no bytes, no hash |

The auditor independently declined to classify the candidates as `image_external`, on the precise ground that the Airtable attachment-id is not a durable resolvable pointer — it is quarantined provenance. The store's portable visual carriers are therefore: two absent reference images and zero hashes/pointers for the variance or the output.

## Per-task grid

| Task | Tier 1 | Tier 2 | Tier-2 residual cause (if non-PASS) |
|---|---|---|---|
| **A** — selection defensibility | PARTIAL | **PASS** | — |
| **B** — constraint satisfaction | PARTIAL | **PASS** | — |
| **C** — reference anchoring | FAIL | FAIL | **image-absent** — references were never produced; nothing to hash or point to |
| **D** — rejection-reason verification | PARTIAL | PARTIAL | **prose-granularity** — rejection reasons recorded only at batch level, never mapped reason→candidate |
| **E** — output↔candidate identity | PARTIAL | **PASS** | — |
| **F** — integrity / drift detection | FAIL | **PASS** | — |

Per-task reasoning (auditor, condensed):

- **A.** Tier 1: rationale asserts POST-01 is most-true-to-intent but nothing lets the claim be checked. Tier 2: pointers to all seven candidates + hashes to confirm provenance let an inspector compare and judge → PASS.
- **B.** Tier 1: constraints are precise text but the output image cannot be checked against them. Tier 2: a pointer to the governed output lets it be checked against each carried constraint → PASS.
- **C.** Tier 1: both references are `image: null` — only a prose note. Tier 2: **cannot populate a carrier for a non-existent image** → still FAIL, but the cause is image-absence, not carrier-class insufficiency.
- **D.** Tier 1: rejection reasons are aggregate prose. Tier 2: the six rejected images become inspectable, but the store never maps a reason to a specific candidate id → still PARTIAL, on a prose-granularity gap, not a carrier-class insufficiency.
- **E.** Tier 1: the substrate-neutral `selected_candidate` link is traceable but byte-identity is unprovable. Tier 2: comparing the candidate's and the output's content hashes proves identity with no pixels → PASS.
- **F.** Tier 1: `content_hash: null` everywhere — substitution/corruption is undetectable. Tier 2: a content hash on each existing image makes drift detectable → PASS.

## Aggregate reading 1 — the grid

Tier 1: 0 PASS, 4 PARTIAL (A, B, D, E), 2 FAIL (C, F). Tier 2: 4 PASS (A, B, E, F), 1 PARTIAL (D), 1 FAIL (C). The store as-is supports **no** visual-auditability task at PASS; recoverability (8/8 in the prior recovery test) did not carry over to auditability, confirming the definition's auditability-≠-readability premise.

## Aggregate reading 2 — gaps that hashes + durable pointers close

The four genuinely **byte/pixel-dependent** tasks all reach PASS at Tier 2:

- **Identity / integrity (E, F)** close on the **content hash alone** — fully mechanical, no fetch and no human judgment required.
- **Pixel-judgment (A, B)** close on a **durable pointer** — conditional on the pointer resolving and an inspector (method-user or vision-capable consuming artifact) actually fetching and looking.

This gradient is itself a finding: hashes settle identity/integrity audits outright; durable pointers settle pixel-judgment audits *contingently*. If a pointer later fails to resolve (pointer rot), A and B re-break — while E/F's hash still correctly reports that the bytes are no longer verifiable. Carrier-class sufficiency for A/B therefore carries a durability dependency that E/F do not.

## Aggregate reading 3 — Tier-2 residual set (candidate boundary-reopen cases)

Tasks non-PASS even at Tier 2: **{C (FAIL), D (PARTIAL)}**. Per the definition, this is the *candidate* boundary-reopen set: the gap not closed by hashes + durable pointers as defined. The reopen determination below adjudicates whether either is genuinely a hash+pointer insufficiency.

## Reopen determination (carrier-class / counterfactual; remedy-neutral)

The held image-byte boundary reopens only if a task remains non-PASS even at Tier 2 **because hashes + durable pointers as defined did not support the audit** — and the conclusion, if it trips, is remedy-neutral (it names the audit class that forces the boundary open; it does not pre-decide that in-package byte storage is the answer).

Adjudicating the two candidates:

- **C does not trip the byte boundary.** Tier 2 could not even *supply* a hash or pointer for the references, because the reference images do not exist in this instance (image-pending). This is not a case of "hashes + pointers were supplied and failed"; it is "there was no image to carry." The gap is **image-production completeness**, an adjacent boundary, not the image-byte-storage boundary.
- **D does not trip the byte boundary.** Tier 2 *did* supply the carriers and they worked — the six rejected images became inspectable. The residual is that the store never records which rejection reason maps to which candidate. The gap is **rejection-reason individuation (prose-granularity)**, a different carrier, not a hash+pointer insufficiency.

**No task remains non-PASS at Tier 2 because hashes + durable pointers as defined were insufficient.** The candidate boundary-reopen set, filtered to genuine carrier-class insufficiencies, is **empty**.

**Determination: at carrier-class / counterfactual Tier-2 depth, the no-byte boundary does NOT reopen.** Hashes + durable pointers are sufficient as a carrier class to support visual auditability of this package's existing images, without storing image bytes. The gap the store-as-is leaves — every byte-dependent task scoring PARTIAL/FAIL at Tier 1 — is a **carrier-completeness gap** (the store should carry hashes + durable pointers for its existing images), **not a byte-storage gap**. The raw-image-byte boundary stays held at this evidence depth, with its falsifiable reopen trigger intact.

## Adjacent gaps surfaced (named, not authorized)

The run surfaced two real gaps that are **out of scope of the byte boundary** and are recorded as findings only — no work is authorized:

1. **Image-production completeness (from C).** This package's references were image-pending; visual auditability of *reference anchoring* cannot be exercised on an instance whose references carry no image. A reference-rich instance (e.g., a SKU package with real curated reference imagery) would be the substrate that actually pressures reference-anchoring auditability. This is the same boundary the visual-reference portability test (held, not pre-authorized) would address.
2. **Rejection-reason individuation (from D).** Selection defensibility is fully auditable at Tier 2, but *per-candidate rejection-reason* trace is a prose-granularity gap independent of bytes. Whether rejection reasons should be individuated per candidate is a trace-carrier question adjacent to the discretion/selection seam, not a byte question.

## Honest limits

- **Single auditor, single package, single mode, single slot.** One fresh auditor; the proven 2c marketing-hero hero slot. No multi-auditor replication; no cross-mode or cross-package generalization.
- **Tier 2 is counterfactual.** The store holds no real images and no real durable pointers, so Tier-2 PASS scores are carrier-class sufficiency judgments, not visual audits performed on real bytes. A real second substrate carrying actual hashes + resolvable pointers would convert this analytical sufficiency into operational evidence.
- **C under-exercised by construction.** Because the references were image-pending, reference-anchoring auditability could not be positively demonstrated even at Tier 2 — only shown to be blocked by absence. This is an instance limitation, recorded as adjacent gap #1.
- **Durability untested.** Pointer-rot risk (aggregate reading 2) is reasoned, not tested; no time-gap or resolution-failure was simulated.

## What this run authorizes

Nothing downstream. The test is complete and its boundary determination is recorded. Building a hash+pointer carrier into the store, a reference-rich visual-auditability test, a rejection-reason-individuation carrier, a runtime consumer, a package grammar, schema, or any 1C reader-path work each remain separate, unauthorized, fresh strategic decisions under threshold-pause discipline.

## Self-superseding clause

This findings artifact should be superseded by:

- a **re-run with a different auditor** (multi-auditor replication of the sufficiency judgment);
- a **real second-substrate run** that carries actual content hashes + durable pointers, converting the counterfactual Tier-2 sufficiency into operational evidence;
- a **reference-rich package run** that positively exercises reference-anchoring auditability (Task C) rather than finding it blocked by image-absence;
- a subsequent milestone that absorbs the byte-boundary determination into the architecture's portability claim discipline.

It does not supersede the test definition (its controlling contract), the worked package store, the package-extraction or extraction-attempt legs, milestone 13, or any prior artifact; those remain authoritative for their subject matter.

## Anchor documents

- [`docs/byte-boundary-auditability-test-definition-v1.md`](byte-boundary-auditability-test-definition-v1.md) — the controlling test contract this run scores against
- [`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/) — the store read as-is; `references.yaml`, `candidates.yaml`, `governed-assets.yaml`, `_substrate.yaml` carry the byte status assigned above
- [`docs/worked-package-store-2c-marketing-hero/_recovery-test.md`](worked-package-store-2c-marketing-hero/_recovery-test.md) — the recovery test (8/8 readability) whose recorded visual-verification boundary this run pressured
- [`docs/portable-package-extraction-2c-marketing-hero-v1.md`](portable-package-extraction-2c-marketing-hero-v1.md) — the #319 extraction walk; its image-pending honesty markers frame adjacent gap #1
- [`docs/milestones/milestone-13-portability-evidence-plateau.md`](milestones/milestone-13-portability-evidence-plateau.md) — names visual-payload portability and the failable next-evidence standard this run instances
- [`docs/architecture.md`](architecture.md) — §Portability / Extractability; the no-image-byte boundary this run holds
