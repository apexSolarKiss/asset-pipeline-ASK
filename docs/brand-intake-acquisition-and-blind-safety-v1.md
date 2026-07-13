# Brand-Intake Acquisition and Blind-Safety v1

## Posture

This is a thin **preflight discipline** for corpus construction — the checks a corpus
must pass, and the order to run them, before it is used to pressure-test the visual-payload
model. It is not a new architecture doctrine and not a brand-intake manifesto. It
articulates one layer the rest of the architecture assumed but never stated: a corpus is
*evidence*, and evidence has to be acquired and made identity-neutral before it can be trusted.

It reads against [`docs/visual-payload-architecture-v2.md`](visual-payload-architecture-v2.md)
(the model a corpus is built to pressure) and the foundational premise that references,
product truth, and output are different objects ([`docs/foundational-premises-v1.md`](foundational-premises-v1.md)).
It is aesthetic-agnostic and uses no real-brand examples.

## What This Artifact Attempts

A corpus brought in to test the model must first be **acquired** and then made **blind**.
These are different operations: a source can be trivial to acquire and still require strict
neutralization, or hard to acquire and trivial to neutralize once acquired. Treating them as
one question hides risk. On top of both sits a duty to **report what the corpus covers**
before its results are read. That is the whole shape — three checks, run in order:

1. **acquisition capability** — can the corpus be obtained, how, and at what provenance cost
2. **blind-safety** — can source/brand identity be removed, and *where* does identity live
3. **coverage adequacy** — what the corpus does and does not exercise

The load-bearing claim: **acquisition capability and blind-safety are orthogonal, and
fetchability does not equal corpus readiness.**

## 1. Acquisition Capability Check

Assess whether and how the corpus source can be acquired, *independently* of image quality.
Characterize: whether listing/detail surfaces are reachable; whether full-resolution assets
are reachable once located; and the resulting **acquisition mode** — automated, assisted, or
hybrid. A source that yields excellent imagery but only under heavy acquisition cost still
constrains everything downstream; record the constraint rather than letting image quality
mask it. Acquisition is bounded corpus construction, not open-ended collection.

## 2. Blind-Safety / Neutralization Check

Removing source/brand identity has a **floor** and a **conditional extension**.

- **Floor (always):** filename, embedded metadata, and surrounding-surface hygiene
  (page chrome, captions, viewer wrappers, marketing overlays). Re-encode to neutral
  identifiers, strip metadata, supply a neutral context manifest, and keep any
  identifier-to-source map *out* of the neutralized package.
- **Conditional (category-triggered):** an **in-pixel audit** is required when the product
  surface itself can carry identity — worn, on-body, packaged, labeled, or logo-bearing
  products. Filename and metadata hygiene cannot reach a mark that lives in the pixels of the
  depicted object; a third-party mark on the depicted object counts too.

## 3. Provenance-at-Acquisition Rule

Capture provenance **at the moment of acquisition** — source locator, original identifier,
timestamp, and the context that justified inclusion. Provenance reconstructed after the
acquisition context is gone is lossy and error-prone. This is the one check that is generic
dataset hygiene; it is included because the preflight fails without it.

## 4. Contamination-Location Heuristic

**Product-presentation mode predicts the first places to audit for identity leakage.**
When a product is shown *ambiently / staged in an environment*, identity tends to leak through
the **surrounding surfaces**. When it is shown *on the object itself* — worn, packaged,
labeled — identity migrates **into the pixels**. This is a **heuristic that orders the audit**,
not a law: it tells you where to look first, not where leakage is guaranteed to be or absent.

## 5. Crop-vs-Drop Rule

When a marker is found, **crop only when the marker is incidental and the image's evidentiary
role survives the crop; otherwise drop.** Cropping preserves evidentiary value while removing
contamination; dropping is correct when the crop would gut what the image was kept to show.

## 6. Coverage Adequacy Statement

**State what the corpus exercises and what it does not, before interpreting results.**
Distinguish *structural absence* (the category genuinely does not produce it), *acquisition gap*
(it exists but was not obtained), and *present-but-under-weighted*. A corpus is always a
partial sample; the preflight characterizes the sample rather than implying completeness.
(Deliberately a *statement*, not a promoted taxonomy axis — it earns axis status only if it
behaves consistently across further cases.)

## Boundaries / Non-Actions

- structure and discipline, not schema: no fields, validator, or structured-IA revision
- no model edit; this preflights the visual-payload model, it does not modify it
- no method-doctrine expansion; the `bounded generativity` primitive is untouched
- aesthetic-agnostic: no real-brand examples, no live-site mechanics, no case narratives
- acquisition is bounded corpus construction; a neutralized package carries only neutral
  identifiers and neutral context
- no runtime, orchestration, or package-consumer implication is asserted

## Self-Superseding Clause

This is the v1 articulation of the corpus-construction preflight. It is superseded by any later
version that revises the checks or promotes the coverage-adequacy statement to an axis. It does
not supersede the visual-payload model or any architecture document; it reads against them
and adds the preflight layer they assumed.

## Anchor Documents

- [`docs/visual-payload-architecture-v2.md`](visual-payload-architecture-v2.md) — the model a corpus is built to pressure-test; this artifact is the preflight before that test
- [`docs/foundational-premises-v1.md`](foundational-premises-v1.md) — references, product truth, and output are different objects
