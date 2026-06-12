# Byte-Boundary Auditability Test — Definition (v1)

## Posture

```text
test DEFINITION / pre-registration only — the test is NOT run here
defines a failable byte-boundary test against the existing 2c worked package store
no new package store
no SKU visual-reference package
no image-byte storage
no runtime consumer
no package grammar
no schema / validator / structured IA model v3
no 1C reader-path work
no new generation proof
no store mutation (the store is read as-is)
stops at exact scoped diff
self-superseding when the test is run and a findings artifact lands, or when the definition is revised before a run
```

This artifact pre-registers a test so that the test, when run, can fail in an informative way and cannot move its own goalposts after the fact. It is the next pressure surface the active frontier (translation / portability / instantiation) authorizes as its first *failable* instrument — chosen because the portability evidence to date measures **recoverability**, not **use**, and the strongest portability artifact ([the worked package store](worked-package-store-2c-marketing-hero/)) holds **no image bytes**.

## The question

> **The test must determine what breaks when the package must support visual auditability without carrying image bytes.**

That sentence is the test's load-bearing line. It is deliberately not a readability or recovery question.

The [worked package store recovery test](worked-package-store-2c-marketing-hero/_recovery-test.md) already answered the readability question: a fresh reader recovered the full intent → discretion → variance → selection → governance chain from the store alone (8/8, PASS). But that test recorded its own boundary: *"the visual truth of the 'most-true-to-intent' selection cannot be verified from the store — only the recorded textual rationale."* Recoverability of the chain does not establish that a reader or consumer can **audit the visual judgment** the chain records.

**Auditability ≠ readability.** Readability is: can a reader reconstruct what was decided? Auditability is: can a reader or consuming artifact independently verify that the decision is true to what the package claims — that the selected candidate really is the most-true-to-intent take, that the governed output really satisfies each constraint, that a reference really anchors what its note says? Those tasks may require the pixels. This test isolates exactly which of them break when the pixels are absent.

## Why this test is failable (the anti-ceiling guard)

The recovery-test genre reached a measurement ceiling: a competent reader recovering a well-keyed file bundle is close to a cannot-fail instrument, because chain-reconstruction does not need bytes. This test is constructed to be able to fail on the dimension that matters:

- The store holds **no image bytes** for any visual carrier. So any audit task that genuinely requires inspecting or integrity-checking pixels **must** return a non-PASS unless a non-byte carrier (a content hash, a durable pointer) can stand in for the bytes.
- Failure criteria are pre-registered **here, before any run**. The eventual run scores against this artifact; it does not get to redefine PASS after seeing results.
- The test's whole purpose is to find the break, not to certify a pass. A run that found "everything auditable without any visual carrier" would be the surprising result — and would argue *against* reopening the image-byte boundary.

## Visual-carrier inventory in the 2c store (read as-is)

The package's visual carriers and their current byte status, read from the store data files:

| Carrier | Count | Current state in store | Had bytes in worked substrate? |
|---|---|---|---|
| References (`references.yaml`) — brand-system master + palette board | 2 | `image: null`, `byte_status: not_held`, `status: image-pending` | No — image-pending in the original run; prose `slot_prompt` carried the anchoring |
| Candidates (`candidates.yaml`) — the variance | 7 | `content_hash: null`, `byte_status: not_held`; only a quarantined `legacy_airtable_attachment_id` per candidate | **Yes** — each was a real in-base take; the bytes lived in Airtable and are not held in the store |
| Governed output (`governed-assets.yaml`) | 1 | no byte field of its own; resolves to the selected candidate (`CAND-MSG-HG-001-HERO-POST-01`); a quarantined `legacy_worked_substrate.airtable_source_attachment_id` | **Yes** — its visual truth is the selected candidate's bytes (not held) |

The sharp fact: for the **variance** and the **output** — the carriers an auditor would most need to see — the store currently holds **no portable visual carrier at all**: not bytes, not a hash, not a durable pointer. The only visual trace is a quarantined worked-substrate id that, by the store's own rule, is "NEVER a link key" and has no meaning outside Airtable. The references are honestly `image_absent`; the candidates and output are visually represented by **prose rationale alone**.

## Byte-status vocabulary for the test

The test uses a five-value vocabulary (the four values named in the operator-side decision plus one for the store's actual worst case). This is working test vocabulary, not schema:

- **`image_stored`** — the package holds the image bytes directly. *Out of scope this phase* (raw image bytes are out of package scope); included only as the tier the test measures the absence of.
- **`image_hashed_not_stored`** — the package holds a content hash (and optionally a durable pointer) but not the bytes. Identity and integrity are verifiable; visual inspection requires fetching via the pointer.
- **`image_external`** — the image exists outside the package, reachable only by a durable pointer / URL / DAM reference the package carries. Inspection requires the pointer to resolve.
- **`image_absent`** — no image was produced for this carrier in this instance (the references: image-pending).
- **`legacy_provenance_only`** — the only visual trace is a quarantined worked-substrate id (the candidates' and output's Airtable attachment-ids). Not a portable carrier: not bytes, not a hash, not a resolvable pointer. The store's current worst case for the variance and the output.

The test reads each visual carrier in the store, assigns it a value from this vocabulary, and then runs the auditability tasks against that assignment.

## The three carrier tiers the test compares

The auditability tasks are scored against three hypothetical carrier tiers, so the test can locate **where** the break sits rather than only **that** one exists:

- **Tier 1 — prose only (the store as-is).** Visual carriers are `image_absent` or `legacy_provenance_only`; the only visual evidence is recorded textual rationale.
- **Tier 2 — prose + content hash + durable pointer (no in-package bytes).** Every visual carrier carries `image_hashed_not_stored` and/or `image_external` — a hash for integrity/identity and a durable pointer for fetch-on-demand. **No bytes are stored in the package.**
- **Tier 3 — in-package bytes (`image_stored`).** Out of scope this phase; the baseline the other tiers are measured against.

The load-bearing comparison is **Tier 1 vs Tier 2**: does adding hashes + durable pointers (but not bytes) close the auditability gap that prose-only leaves open?

## Visual-auditability tasks (pre-registered)

An auditor — a method-user or a consuming artifact (per the next-consumer decision: the consuming-artifact path) — must attempt each task from the package and its declared carriers. At Tier 1, the declared carriers are prose-only. At Tier 2, the declared carriers include content hashes and durable pointers, but no in-package bytes. The auditor may fetch a Tier-2 pointer only if the package itself carries the pointer and the fetched image can be checked against the package-carried identity/integrity evidence. Each task is the kind of verification a creative-ops owner or an implementation-artifact generator would need to trust the package's visual claims.

- **A — Selection defensibility.** Verify that the selected candidate (`POST-01`) is more true-to-intent than the six rejected pre-remediation candidates. (The package asserts `authorship-bearing` selection across the full set.)
- **B — Constraint satisfaction.** Verify that the governed output actually satisfies each of the four constraints — `BC-WR-PALETTE`, `BC-WR-LIGHTING`, `BC-WR-MATERIAL`, `BC-WR-NEGATIVE` (the unobstructed upper-left copy field).
- **C — Reference anchoring.** Verify that each reference anchors what its note claims (e.g., that the palette board actually shows the warm-neutral palette `BC-WR-PALETTE` names).
- **D — Rejection-reason verification.** Verify that the six rejected candidates failed for the stated reasons (orthogonal bench / robe on a hook / obstructed copy field).
- **E — Output↔candidate identity.** Verify that the governed output is the same image as the selected candidate — i.e., that governance recorded the take selection actually chose, with no substitution.
- **F — Integrity / drift detection.** Detect whether a carried image has been substituted, corrupted, or drifted across substrate moves or time.

## Pre-registered outcome classes

Each task, at each tier, is scored as one of:

- **PASS** — independently verifiable from the carriers present at that tier (no recourse to bytes the tier does not carry).
- **PARTIAL** — supported only by the package's recorded textual rationale; the reader can read *that a claim was made* but cannot *independently verify* it. (Tier 1's expected ceiling for any pixel-dependent task.)
- **FAIL** — not verifiable at that tier; requires a carrier the tier does not provide.

Aggregate readings the run must report:

1. The per-task PASS / PARTIAL / FAIL grid across Tiers 1 and 2.
2. The set of tasks that are **PARTIAL or FAIL at Tier 1 but PASS at Tier 2** — the gap that hashes + pointers close *without* bytes.
3. The set of tasks that **remain PARTIAL or FAIL even at Tier 2** — the gap that only in-package bytes (Tier 3) could close.

## The reopen-trigger determination (pre-registered)

The raw-image-byte boundary is held with a falsifiable reopen trigger: *reopen only if byte-boundary pressure shows that references / hashes / durable pointers cannot support visual auditability.* This test pre-registers exactly how its result maps onto that trigger:

- **Reopen trigger DOES NOT trip** if every auditability task that is PARTIAL/FAIL at Tier 1 becomes PASS at Tier 2 — i.e., hashes + durable pointers fully close the gap. The conclusion would be: the package supports visual auditability without storing bytes; the image-byte boundary stays held; the gap is a carrier-completeness gap (the store should carry hashes + pointers), not a byte-storage gap.
- **Reopen trigger TRIPS** if one or more auditability tasks remain PARTIAL/FAIL **even at Tier 2** after the package supplies both identity/integrity evidence and durable fetchable visual carriers. The conclusion is not automatically "store bytes": it is that the no-byte boundary must reopen for that audit class, because hashes + durable pointers *as defined* did not support the audit. Whether the remedy is in-package bytes, a stronger pointer/hash design, or a different carrier is a downstream decision the reopen surfaces, not one this test pre-concludes.

Either way the result is decision-bearing, not another ceiling-scoring pass: it either closes the byte question (hashes + pointers suffice) or names the precise audit class that forces the no-byte boundary open — without pre-deciding the remedy.

## What running the test would require (named, not authorized)

Running this test is a **separate gate**. It would, at minimum: assign each store carrier a byte-status value; construct the Tier-2 mock (hashes + durable pointers, no bytes) as a read-only overlay or scratch annotation, not a store mutation; have an auditor (method-user or consuming artifact) attempt tasks A–F at each tier; and score against the outcome classes above into a findings artifact. None of that is performed here, and none of it is authorized by this definition landing. In particular, constructing the Tier-2 mock must not store image bytes and must not mutate the committed store.

## Scope guards

This definition does not: run the test; mutate or extend the worked package store; build a new package store; build a SKU visual-reference package; store image bytes anywhere; author a runtime consumer, a package grammar, a schema, a validator, or structured IA model v3; perform 1C reader-path work; or run any new generation proof. It reads the existing store as-is and pre-registers a falsifiable test.

## Anchor documents

- [`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/) — the store this test reads; `references.yaml`, `candidates.yaml`, `governed-assets.yaml`, `_substrate.yaml` carry the visual-carrier byte status
- [`docs/worked-package-store-2c-marketing-hero/_recovery-test.md`](worked-package-store-2c-marketing-hero/_recovery-test.md) — the recovery test whose recorded boundary ("visual truth cannot be verified from the store, only the textual rationale") this test pressures
- [`docs/portable-package-extraction-2c-marketing-hero-v1.md`](portable-package-extraction-2c-marketing-hero-v1.md) — the #319 extraction walk; its honesty markers (references image-pending; selection link substrate-shaped) and instantiation-plan capabilities frame the visual-carrier gap
- [`docs/milestones/milestone-13-portability-evidence-plateau.md`](milestones/milestone-13-portability-evidence-plateau.md) — the plateau that names visual-payload portability and the failable next-evidence standard as held; this test is the first failable instrument under that standard
- [`docs/architecture.md`](architecture.md) — §Portability / Extractability records the narrow earned claim and the no-runtime-consumer / no-image-byte boundary this test holds to
```
