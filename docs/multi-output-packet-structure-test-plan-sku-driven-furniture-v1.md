# Multi-Output Packet Structure Test Plan // SKU-Driven Furniture v1

## Purpose

This is a planning / test-plan note only.

It defines a bounded no-mutation design test.

This note does **not** authorize implementation.
It does **not** authorize Airtable mutation.
It does **not** authorize schema creation.
It does **not** authorize image generation.

The multi-output generation / capture decision note still holds.

The schema-fit note did not fire a trigger by itself.

This test plan exists only to determine whether a later findings note may conclude that a design-type trigger likely fired.

This test plan itself does not fire a trigger.

## Test Question

The bounded test question is:

- can a multi-output SKU-driven packet preserve a three-view output obligation from planning through generation / capture / evaluation using current packet and `generated_assets` concepts, or does it require first-class expected output slots

## Evidence Source

Use `PKT-SKU-007` only as the evidence source.

The `PKT-SKU-007` evidence to preserve is:

- fresh product / fresh packet / clean first-pass run
- required three-view output set:
- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character
- Airtable produced one generated image
- the generated image corresponded most closely to the profile / side supporting view
- hero and detail crop were missing
- outcome pressure: `fresh-run counter-pressure`

## Adjacent Context

The schema-fit note is adjacent context only.

The schema-fit note asks what existing schema surfaces might carry if implementation were later earned.

This test plan asks whether implementation appears structurally necessary.

The schema-fit note must not turn this test plan into schema mechanics.

This plan stays focused on representational sufficiency.

## Confirmation-Bias Guard

The project already has Option E as a leading candidate under escalation.

This test must not assume Option E is correct.

Each representation must be evaluated against all criteria before any later findings note makes a comparative judgment.

The later findings note must not collapse:

- `Representation C handles criterion X cleanly`

into:

- `Representation C is best`

unless A and B have also been evaluated against the same criterion.

A representation can fail a descriptive criterion without that failure being enough to fire a design trigger.

Only trigger-bearing criteria can support a design-trigger finding.

## Equal-Depth Representation Rule

Representations A, B, and C should be modeled at the same conceptual depth.

Representation C should not be elaborated more deeply than A or B.

Each representation should receive the same basic structure:

- one short description of where the three-view obligation lives
- one short description of where captured results would live
- one short description of what ambiguity remains

Representation C must not become an implementation sketch.

## Representation A

Current packet-only structure.

### Where The Three-View Obligation Lives

The three-view obligation lives in `workflow_packets.required_output_set` and `workflow_packets.composed_prompt_output`.

### Where Captured Results Would Live

Captured results are read back through the packet-level generation/capture surface, especially the single generated-image container associated with the packet.

### What Ambiguity Remains

The packet can declare a three-view burden, but the burden may remain too dependent on prompt text and packet-level interpretation rather than on separately addressable units.

## Representation B

Current packet plus `generated_assets` interpretation.

### Where The Three-View Obligation Lives

The three-view obligation still begins at the packet level, while `generated_assets` is interpreted as the adjacent conceptual surface for carrying expected roles and later captured assets without adding new fields.

### Where Captured Results Would Live

Captured results would live across `workflow_packets` plus linked `generated_assets`, with the packet carrying declared burden and `generated_assets` carrying the actual asset-facing records.

### What Ambiguity Remains

This interpretation may improve legibility, but it may still blur whether `generated_assets` represents expected role obligation, actual asset capture, or both at once.

## Representation C

Explicit expected-output-slot structure.

### Where The Three-View Obligation Lives

The three-view obligation lives in first-class expected output slots that exist before generation as explicit hero / profile / detail obligations.

### Where Captured Results Would Live

Captured results would live as actual generated assets after generation, with expected slots and actual assets treated as different conceptual units.

### What Ambiguity Remains

This representation may reduce obligation-versus-asset ambiguity, but it is still only a conceptual test surface here and not an earned implementation path.

## Evaluation Criteria

Each representation should be assessed against the same criteria.

### Trigger-Bearing Criteria

- can each expected view be separately addressed before generation
- can each expected view be separately evaluated after generation
- can governed-output status attach to the right unit
- can downstream destination mapping distinguish hero, profile, and detail
- can the system distinguish expected output slot from actual generated asset
- can the packet remain legible without relying on prompt text alone

### Descriptive Criteria

- can a missing hero view be recorded without ambiguity
- can a missing detail crop be recorded without ambiguity
- can retries or appended outputs avoid corrupting asset identity

Descriptive criteria are still useful.

But they should not by themselves fire a design trigger unless they expose failure in a trigger-bearing criterion.

## Test Method

The later findings note should apply the same bounded method to each representation:

1. restate where the three-view obligation lives
2. restate where captured results live
3. assess each trigger-bearing criterion
4. assess each descriptive criterion
5. record whether the result supports:
- no trigger fired
- design trigger likely fired
- insufficient evidence

This keeps the later findings note from mixing structural sufficiency, Airtable behavior, and generation behavior without naming which layer actually failed.

## Outcome Classes

### No Trigger Fired

Current structure remains sufficient for planning-level multi-output burden.

Implementation remains held.

### Design Trigger Likely Fired

Current packet / `generated_assets` concepts cannot preserve the three-view obligation under one or more trigger-bearing criteria.

The next artifact should be an implementation plan or narrower structural decision note.

### Insufficient Evidence

The test cannot distinguish whether the issue is packet representation, generated asset capture, Airtable field behavior, or generation behavior.

The next artifact should be another bounded evidence test.

## Required Conclusion

This test plan does not fire a trigger.

This test plan does not choose an implementation path.

The next artifact should be a findings note that applies this structure test.

Only the findings note can determine whether a design trigger likely fired.

If a design trigger fires, Airtable should not be mutated immediately.

An implementation plan should come first.

If the result is insufficient evidence, the next artifact should be another bounded evidence test rather than implementation.

## Out Of Scope

This note does not authorize:

- implementation
- Airtable mutation
- schema creation
- rerunning `PKT-SKU-003`
- rerunning `PKT-SKU-007`
- image generation
- choosing Representation C in advance
- turning the schema-fit note into an implementation sketch
