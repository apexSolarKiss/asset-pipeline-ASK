# Multi-Output Slot Representation Structural Decision Note // SKU-Driven Furniture v1

## Decision Posture

This is a structural decision note.

This is the first structural decision note in the repo that resolves at chosen direction, no mutation.

It is not:

- a hold decision note
- an options note
- a schema-fit note
- an implementation plan

This note does **not** authorize Airtable mutation.
It does **not** authorize schema creation.
It does **not** authorize implementation.

## Structural Decision

Structural decision:

- first-class expected output slots are chosen as the multi-output representation direction for multi-output SKU-driven generation / capture

That is a structural-concept decision.

It is **not** yet an implementation-surface decision.

This note does **not** decide whether expected output slots should be represented as:

- a new `output_slots` table or layer
- an extension of `generated_assets`
- another Airtable / repo-local surface

That representation choice is deferred to the implementation plan.

## Why This Decision Exists Now

This decision is grounded in the structure test findings, not in general intuition.

The fired design trigger was:

- `multi-output burden cannot be preserved from prompt to generated asset capture without slot-level representation`

That trigger was reached through the bounded structure test findings note, not through the schema-fit note.

## Evidence Basis

The clean evidence source remains `PKT-SKU-007`.

That packet remains:

- a fresh product
- a fresh packet
- a clean first-pass run

It required a three-view output set:

- front three-quarter hero view
- profile / side supporting view
- detail crop focused on construction or material character

Airtable produced one generated image.

The generated image corresponded most closely to the profile / side supporting view.

The hero and detail crop were missing.

That preserved:

- `fresh-run counter-pressure`

The structural decision here is therefore an output-side decision.

## Why First-Class Expected Output Slots Were Chosen

The structure test findings showed:

- Representation A, current packet-only structure, can declare the three-view burden but cannot preserve it cleanly as separately governable units
- Representation B, packet plus `generated_assets` interpretation, improves asset adjacency but still blurs expected output obligation versus actual generated asset
- Representation C, explicit expected-output-slot structure, resolves the expected-slot versus actual-asset distinction most cleanly at the conceptual level

That does **not** make Representation C an implementation answer.

It does make first-class expected output slots the chosen structural direction.

The key distinction is not whether the packet can mention multiple expected views.

The key distinction is whether the system can preserve:

- separate addressability before generation
- separate evaluability after generation
- governed-output attachment to the right unit
- downstream mapping legibility
- clear distinction between what is owed and what was actually produced

The bounded findings record says current packet-only and packet-plus-`generated_assets` concepts did not preserve that burden cleanly enough.

## Two Decisions, Kept Separate

This note separates two decisions.

### Decision 1

Whether expected output slots should exist as a first-class concept.

Decision:

- yes

### Decision 2

Whether expected output slots should be implemented as a separate table / layer, an extension of `generated_assets`, or another surface.

Decision:

- not yet decided

The implementation plan must choose among those representation surfaces using the schema-fit note as input.

## Relationship To Prior Options

This note explicitly accounts for the prior options from the options note.

### Option A // Hold

Option A is no longer sufficient because the design trigger likely fired.

Hold no longer remains the output-side structural posture.

Implementation is still held.

Structural direction is no longer held.

### Option B // Separate Attachment Fields Per Expected Output Role

Option B is not chosen as the structural direction because separate capture fields may separate final files, but they do not by themselves establish expected output slots as pre-generation obligations.

Field-level separation may still appear later inside implementation details.

It is not the structural decision.

### Option C // Separate Packet-Local Generation Runs Per Expected Output Role

Option C is not chosen as the structural direction because separate runs can help orchestration, but they do not by themselves solve expected-slot versus actual-asset identity.

Separate runs may still appear later as execution mechanics.

### Option D // Separate Generation Containers Per Output Role

Option D is not chosen as the structural direction because separate containers can help generation routing, but they do not by themselves define expected output obligations and post-generation evaluation units.

Separate containers may still appear later as implementation or execution mechanics.

### Option E // First-Class Output-Slot Table / Output-Slot Layer

Option E is chosen at the structural-concept level only.

That choice should be phrased here as:

- first-class expected output slots

It should **not** yet be phrased as commitment to a specific Airtable table or layer shape.

### Option F // Another Explicit Output-Set Orchestration Pattern

Option F remains available only if implementation planning reveals a smaller honest surface.

It is not the current decision.

## No-Mutation Boundary

This structural decision does not authorize Airtable mutation.

This structural decision does not create a schema.

This structural decision does not choose:

- field names
- table names
- migration sequence
- Airtable automation behavior

Those belong in the implementation plan.

The implementation plan must be drafted, reviewed, and approved before any mutation.

## Relationship To The Schema-Fit Note

The schema-fit note is relevant input for the implementation plan.

The schema-fit note should not be treated as the reason for the structural decision.

The structural decision is justified by:

- the structure test findings
- the fired design trigger

The schema-fit note helps determine what implementation surfaces might carry the chosen direction.

If repo-local spec and live Airtable observations diverge, reconciliation remains a separate pre-implementation concern.

## Current Project-State Update

The output-side thread now moves from:

- hold with typed reopen triggers
- schema-fit mapped
- structure test planned

to:

- design trigger fired
- first-class expected output slots chosen as structural direction
- implementation plan required
- no mutation authorized

## Next Artifact

The next artifact should be:

- `docs/multi-output-slot-representation-implementation-plan-sku-driven-furniture-v1.md`

That file is not created here.

The implementation plan should later decide:

- whether expected output slots are represented through a new table / layer, `generated_assets` extension, or another surface
- whether Airtable live schema and repo-local spec require reconciliation first
- what exact fields or records would be touched
- what order any schema mutation would follow
- how evidence / result recording would be handled
- what stop points and approval gates are required

## Conclusion

- structural decision: first-class expected output slots are chosen as the multi-output representation direction
- implementation surface: not yet chosen
- Airtable mutation: not authorized
- schema creation: not authorized
- next artifact: implementation plan
- no direct mutation may occur before the implementation plan is reviewed and approved
