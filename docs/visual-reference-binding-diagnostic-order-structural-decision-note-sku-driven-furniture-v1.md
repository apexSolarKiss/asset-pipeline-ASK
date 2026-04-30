# Visual-Reference Binding Diagnostic Order Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

It chooses the diagnostic ordering after the `PKT-SKU-009` recurrence finding.

It is a diagnostic-order decision.

It is not a probe plan, schema mutation plan, execution record, Airtable mutation record, generation plan, or production doctrine.

It does **not** authorize Airtable mutation.
It does **not** authorize schema mutation.
It does **not** authorize field-agent configuration changes.
It does **not** authorize generation invocation.
It does **not** authorize `generated_assets` capture.
It does **not** authorize output-slot linking.
It does **not** authorize `slot_status` mutation.

It does not refresh or replace prior findings.

It does not establish final D1 / D2 doctrine.

It does not claim production readiness or cross-mode generalization.

This note is bounded to SKU-driven Furniture v1 evidence.

## Decision Context

The current evidence chain is:

- text-only shared invariant prompt probe landed as Partial success
- `PKT-SKU-008` URL visual-reference set generation landed as Supported
- `PKT-SKU-009` URL visual-reference recurrence landed as Partial, not Supported

The `PKT-SKU-009` retry improved role separation but left two distinct pressures:

1. visual-reference fidelity weakness
2. product-truth fidelity drift

The chain is no longer at:

- URL reference Supported, Gate 2 deferred

It is now at:

- URL reference is useful but not reliably binding across packets

That shift does not select a response by itself.

It creates a diagnostic ordering question.

## Load-Bearing Diagnostic Question

The next load-bearing question is not "should Gate 2 happen?"

The next load-bearing question is:

`Which failure-mode hypothesis best explains the PKT-SKU-009 Partial recurrence result?`

### A. Reference-Binding Weakness

Hypothesis:

- The URL-reference path is inherently too weak to bind the visual invariant.

Natural response if supported:

- consider Gate 2 image-bearing attachment reference path

### B. Field-Agent Input Weighting / Configuration Weakness

Hypothesis:

- The URL reference might be sufficient, but the current field-agent configuration or input weighting does not force the model to use it.

Natural response if supported:

- investigate field-agent configuration before schema mutation

### C. Reference-Image Specificity / Quality Weakness

Hypothesis:

- The particular reference image may not be specific, strong, or role-fit enough to act as a binding studio-world reference.

Natural response if supported:

- test a more specific reference image before changing schema

### D. Product-Truth Drift

Hypothesis:

- Separate from visual-reference fidelity, the product-truth image lookup may not reliably constrain object truth under generation.

Natural response if supported:

- run an orthogonal product-truth drift probe

This is not automatically solved by Gate 2.

### E. Accept Bounded Limitation / Pause

Hypothesis:

- URL reference may be useful as suggestive context but not binding structure.

Natural response if chosen:

- pause the visual-reference chain and record the v1 limitation rather than continuing probe escalation

## Decision

Decision:

- Run cheaper diagnostic discrimination before Gate 2.

Recommended order:

1. C-test // reference-image specificity test
2. B-test // field-agent configuration / input weighting investigation
3. A // Gate 2 image-bearing attachment reference path only if C and B do not resolve the binding problem
4. D // product-truth drift investigation as an orthogonal probe, not as part of Gate 2
5. E // pause if cheaper diagnostics and/or Gate 2 do not materially improve binding enough to justify further work

Rationale:

- C is cheapest and most reversible: same schema, same packet family, different reference image, one generation pass.
- B is also prototype-bounded and cheaper than schema mutation, though it may require manual Airtable UI configuration.
- A is heavier because it implies image-bearing attachment reference path / schema or field-path work.
- D is a different pressure and must not be collapsed into A.
- E remains a valid disciplined stop if the system is proving that URL reference is only suggestive.

This decision chooses diagnostic order only.

It does not execute any diagnostic.

## Explicit Non-Decision

Gate 2 is more strongly earned as a decision surface, but it is not selected for immediate execution.

Product-truth drift is not treated as evidence for Gate 2.

This note does not choose a specific reference image.

This note does not choose a specific field-agent configuration.

This note does not authorize generation.

## Diagnostic Probe Definitions

These are decision-level definitions only.

They are not implementation plans.

### C-test // Reference-Image Specificity

Question:

- Does a more specific / more binding studio-world reference image improve visual-reference fidelity without schema mutation?

Expected mutation class:

- Prototype-bounded Airtable record / reference update or reference selection.
- No schema mutation.

Pre-registered outcome classes:

- Supported: same packet / same field paths / stronger reference image materially improves background and studio-world fidelity while preserving role separation and product truth.
- Partial: improves some visual-system aspects but leaves visible background drift or product-truth drift.
- Not supported: no material improvement over `PKT-SKU-009` retry.
- Inconclusive: reference update or generation evidence is insufficient to isolate the effect.

### B-test // Field-Agent Configuration / Input Weighting

Question:

- Does changing how Airtable AI field-agent inputs are configured or described improve use of the existing URL reference?

Expected mutation class:

- Manual Airtable UI configuration or input selection review.
- No schema mutation unless separately authorized.

Pre-registered outcome classes:

- Supported: changed configuration materially improves use of `packet_reference_asset_uri_lookup` and visual-reference fidelity.
- Partial: role separation or general coherence improves, but reference fidelity remains weak.
- Not supported: configuration change does not materially improve reference binding.
- Inconclusive: connector / UI limitations prevent knowing whether configuration actually changed.

### A // Gate 2 Image-Bearing Attachment Reference Path

Question:

- Is an image-bearing reference path needed because URL reference remains suggestive rather than binding?

Expected mutation class:

- Heavier schema / field-path or attachment-reference path work.
- Requires a separate plan and explicit authorization.

Pre-registered outcome classes:

- Supported: image-bearing reference path materially improves binding to the visual invariant beyond C / B.
- Partial: improves visual binding but introduces new product-truth, role, or capture-mapping issues.
- Not supported: image-bearing path does not materially improve binding.
- Inconclusive: image-bearing path cannot be configured or observed cleanly.

### D // Product-Truth Drift Investigation

Question:

- Does product-truth drift occur independently of the visual-reference question?

Expected mutation class:

- Orthogonal probe, likely generate from product-truth image without visual-reference pressure or compare against a controlled baseline.
- Do not fold into Gate 2.

Pre-registered outcome classes:

- Supported: product-truth drift appears even without visual-reference complexity.
- Partial: drift appears only under certain slots or prompt conditions.
- Not supported: product truth holds when visual-reference pressure is removed.
- Inconclusive: outputs do not isolate product-truth pressure.

### E // Pause / Accept Bounded Limitation

Question:

- Has SKU-driven Furniture v1 learned enough to record URL reference as useful but non-binding?

Outcome:

- Pause is earned if C / B / A either fail, are not worth their cost, or if ASK chooses the v1 limitation as sufficient for the repo's current thesis.
- Pause should preserve that URL reference can improve coherence without claiming it governs binding.

## Recommended Next Move

The next artifact or action should be C-test planning / proposal, not Gate 2 execution.

D should remain available as a separate orthogonal probe, especially because `PKT-SKU-009` exposed product-truth drift.

Gate 2 should remain earned as candidate, not authorized.

## Non-Actions

This decision note does not authorize:

- further Airtable mutation
- schema mutation
- lookup-field creation
- AI field-agent configuration changes
- generation invocation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- production-readiness claims
- cross-mode generalization
- final D1 / D2 doctrine

## Evidence Attribution

This decision relies on prior repo-local findings and direct visual evidence already recorded in the evidence-chain artifacts.

It does not refresh the visual evidence, replace prior findings, or reinterpret Airtable metadata as visual proof.
