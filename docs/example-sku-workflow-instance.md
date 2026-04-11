# Example SKU Workflow Instance

This example illustrates one abstract workflow instance using the repository's current working ontology. It is intended to pressure-test the model against a modular, repeatable SKU-driven workflow without introducing brand-specific assumptions.

## Intent

Describe what the workflow is meant to achieve and how that purpose is meant to be expressed.

### Business Intent

- Produce a repeatable asset set for a large set of item variants with consistent coverage, predictable quality, and efficient turnaround.
- Ensure that each item record is represented accurately enough for comparison, selection, and downstream reuse across more than one generic commerce or catalog surface.
- Minimize unnecessary variation so outputs remain scalable, auditable, and easy to validate across the full set.

### Creative Intent

- Maintain a clean, consistent, visually credible presentation standard across the full asset set.
- Allow only limited visual interpretation where it improves clarity, legibility, or fit to format without undermining uniformity.
- Preserve enough aesthetic coherence that the set feels intentionally produced rather than mechanically inconsistent.

## Inputs

Describe what is supplied to the workflow as material, parameters, and context.

### Source Materials

- A structured pool of approved source images or renderable item views.
- Reusable background, framing, and layout components suitable for repeated application.
- Supporting descriptive records associated with each item instance.

### Supplied Parameters

- Item-level identifiers and variant attributes.
- Required output sizes, aspect classes, and asset counts per item.
- Priority distribution surfaces and required coverage rules.

### Contextual Instructions

- Favor consistency, comparability, and legibility over expressive differentiation.
- Treat variation as a controlled response to item differences rather than as an independent creative opportunity.
- Preserve a neutral presentation standard that can scale across a large set.

## Constraints

Describe what the workflow must remain within, including non-negotiables, bounded freedom, and explicit exclusions.

### Hard Requirements

- Every required item and variant must receive the required asset coverage.
- Outputs must preserve accurate item representation and required identifying information.
- Asset dimensions, framing rules, and delivery formats must remain within the approved target set.

### Bounded Discretion

- Minor adjustments to crop, scale, spacing, or emphasis are allowed when needed to preserve clarity across differing item shapes or proportions.
- Presentation may adapt slightly to item-specific visual needs so long as the system-level standard remains intact.
- Small interpretive choices are acceptable only when they improve consistency of outcome rather than increase stylistic variance.

### Exclusion Rules

- Do not introduce item-to-item stylistic drift that weakens comparability.
- Do not omit required variants, identifiers, or mandatory asset views.
- Do not use improvisational treatments that make one item appear to belong to a different presentation system than the rest.

## Orchestration

Describe the major flow of work, transformations, or handoffs at a high level.

- Assemble the structured item set and required parameters.
- Apply the approved presentation system across the item set.
- Generate outputs for each required item and variant combination.
- Validate coverage, representation, and format conformity across the batch.
- Route flagged exceptions for review and finalize the approved output set.

## Outputs

Describe the intended governed outputs of the workflow.

- A repeatable set of still-image assets covering the required items and variants across more than one generic commerce or catalog surface.
- A complete output set with predictable formatting, consistent representation, and comparable presentation across the batch.
- Exception cases separated clearly enough for review without disrupting the main asset run.

## Governance

Describe how the workflow is validated, approved, and exceptionally overridden when needed.

### Validation

- Check that required coverage has been completed for every item and required variant.
- Check that outputs conform to approved dimensions, framing rules, and representation standards.
- Check that item-to-item consistency remains within the intended system and that exceptions are explicitly identified.

### Approval

- Human review confirms that the presentation standard is being applied consistently and that exceptions are legitimate rather than accidental drift.
- Human review confirms that the batch is complete enough and accurate enough for release to the intended surfaces.
- Final approval is granted only after missing coverage or flagged representation issues are resolved.

### Override

- If a specific item cannot meet the standard presentation pattern without loss of clarity, it may be routed for explicit exception approval.
- If required coverage cannot be completed under normal conditions, the missing scope may be explicitly deferred rather than silently omitted.
- Any override must be recorded as a controlled exception to the repeatable system rather than an informal deviation.
