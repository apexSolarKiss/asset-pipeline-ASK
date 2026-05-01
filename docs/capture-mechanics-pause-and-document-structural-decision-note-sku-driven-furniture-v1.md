# Capture Mechanics Pause And Document Structural Decision Note // SKU-Driven Furniture v1

## Artifact Posture

This is a structural decision note.

It accepts and documents the `PKT-SKU-009` capture-mechanics thin bridge for now.

It pauses further capture-mechanics work until a concrete reopen trigger fires.

It is not a findings note.

It is not a plan.

It is not an execution record.

It is not an Airtable mutation authorization.

It is not a schema mutation plan.

It is not production doctrine.

It is not cross-mode generalization.

It does **not** authorize Airtable mutation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize output-slot / generated-asset linking.
It does **not** authorize `slot_status` mutation.
It does **not** authorize schema changes.
It does **not** authorize generation invocation.
It does **not** authorize a product-truth D-probe.

## Context

Gate 2 image-bearing reference path landed as Supported for `PKT-SKU-009`.

Capture / governance became the next primary chain.

`docs/capture-mechanics-plan-sku-driven-furniture-v1.md` defined the operational bridge:

```text
raw slot output -> review / capture action -> generated_assets record -> slot_status relationship
```

The thin-bridge proof was executed and recorded in `docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`.

## Findings Basis

The findings basis is:

- bridge identity sub-result: Supported
- `asset_uri` sub-result: Blocked at tool layer
- overall result: Partial with specific tool-layer blocker

The current schema can express minimal governed asset identity.

The current schema is weak for fuller explicit provenance.

The `asset_uri` blocker recurs the PR #106 pattern.

The finding does not authorize further mutation.

## Candidate Next Paths

The thin-bridge findings note earned five candidate next paths:

1. Accept and document the thin bridge for now.
2. Open schema mutation options for fuller provenance.
3. Use a manual UI workaround for `asset_uri`.
4. Use an alternate capture mechanism outside the connector.
5. Pause capture mechanics until a real review / governance need requires fuller provenance.

## Decision

Decision:

- accept and document the thin bridge for now
- pause further capture-mechanics work

The empirical bridge question has been answered for SKU-driven Furniture v1: minimal governed asset identity can be represented from a raw slot output through an explicit review / capture action into a `generated_assets` record, while preserving the separate `slot_status` relationship.

Further provenance / schema work is earned, but it is not yet justified by a concrete governance use case.

Immediate schema mutation would be design-in-advance.

A manual `asset_uri` workaround is not needed unless URL capture becomes load-bearing.

An alternate capture mechanism is too heavy without connector friction becoming load-bearing.

Pause protects the evidence trail from unnecessary prototype churn.

## Reopen Triggers

Reopen schema mutation for fuller provenance if a real governance use case requires explicit capture provenance, such as:

- downstream consumer needs
- audit trail
- multi-author review
- repeat capture events
- durable review handoff

Reopen a manual UI workaround for `asset_uri` if `asset_uri` becomes load-bearing for near-term delivery, export, downstream retrieval, or review handoff.

Reopen an alternate capture mechanism outside the connector if connector friction becomes load-bearing across packets or modes.

Reopen a `generated_assets` attachment-field path if URL durability proves insufficient for preserved evidence.

Reopen capture mechanics if another packet or workflow mode exposes capture / governance pressure that the thin bridge cannot carry.

## Pause Scope

This decision pauses capture / governance mechanics only.

It does not pause or forbid:

- product-truth drift D-probe as a separate orthogonal chain
- cross-mode work
- v32 navigation / map-polish items
- external positioning / demo work
- future repo milestone work, though milestone work is deferred here

## Stable Plateau

The current layered SKU-driven Furniture v1 plateau is:

- slot-level generation works better than packet-level generation for role-specific outputs
- image-bearing attachment reference is the visual binding surface for SKU-driven Furniture v1
- thin governed-asset identity bridge works
- `asset_uri` is tool-layer-limited for raw Airtable attachment URLs
- fuller provenance remains unchosen / deferred

## Non-Actions

This decision does not authorize:

- Airtable mutation
- `generated_assets` creation
- output-slot / generated-asset linking
- `slot_status` mutation
- schema mutation
- generation invocation
- product-truth D-probe execution
- production-readiness claims
- cross-mode generalization
- retrofit of prior evidence-chain artifacts
- deferred polish items
- milestone note creation
- external grounding-note refresh

## Next Recommended Posture

Treat capture mechanics as paused unless a reopen trigger fires.

If ASK wants more repo work next, choose deliberately among product-truth D-probe, cross-mode work, or small navigation-polish PRs.

Do not continue capture / governance by inertia.
