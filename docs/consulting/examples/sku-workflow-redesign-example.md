# SKU Workflow Redesign Example

This example applies the workflow redesign brief to the abstract SKU workflow diagnosis case.

## Redesign Aim

- Strengthen the repeatable workflow core while making limited item-specific adjustments more explicit and governable
- Preserve consistency, comparability, and scalable validation without treating every variation as a system failure

## Proposed Target-State Shape

### Intent

- Keep business intent dominant around coverage and consistency while making the narrower role of creative intent explicit as presentation quality within a repeatable system

### Inputs

- Separate reusable source materials, structured parameters, and contextual instructions more clearly so operational inputs do not blur into hidden constraints

### Constraints

- Keep hard requirements firm while defining bounded discretion more explicitly around acceptable item-specific adjustment

### Orchestration

- Preserve the batch-oriented flow, but make the transition from standard processing to exception routing more explicit

### Outputs

- Treat the primary output set as a governed, comparable batch and distinguish exception cases more clearly from normal deliverables

### Governance

- Separate validation, approval, and override more clearly so the repeatable system remains legible even when exceptions occur

## Key Shifts From Current State

- Repeatable processing should remain the default, but the criteria for leaving the standard path should become clearer
- Structured parameters that effectively behave as requirements should be made explicit as constraints rather than left implicit as inputs
- Exception handling should move from reactive patching toward a more stable governance boundary

## Expected Benefits

- Stronger consistency and comparability across the standard output set
- Cleaner handling of edge cases without weakening the repeatable core
- Better visibility into where the workflow truly needs discretion versus where it needs clearer rules

## Design Tradeoffs

- More explicit exception boundaries may surface more cases for review in the short term
- Stronger separation between standard flow and exception flow may reduce informal flexibility
- Clearer constraint definition may make some previously tolerated variance feel more tightly governed

## Preconditions / Dependencies

- Agreement is needed on what qualifies as acceptable item-specific adjustment inside the standard path
- The workflow needs clearer shared definitions for batch sufficiency, exception status, and release readiness
- Recurring exception patterns need to be observed closely enough to distinguish structural gaps from isolated cases

## Open Design Questions

- At what point should repeated exception types reshape the standard workflow rather than remain exceptions?
- How much bounded discretion is genuinely necessary to protect output quality across item variation?
- Which governance checks should remain human judgment calls, and which should become more explicitly defined?
