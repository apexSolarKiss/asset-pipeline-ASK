# Pipeline I/O

This document describes the current working input/output contract of the repo-local pipeline.

## Inputs

### Source Materials

- assets or materials the pipeline works on or from
- treated as substantive inputs

### Supplied Parameters

- explicit values, settings, or requested constraints passed into execution
- treated as structured input

### Contextual Instructions

- framing or guidance that influences interpretation or application
- treated as informative input rather than automatically deterministic rule

These three input categories differ in role: source materials provide the working substance, supplied parameters provide explicit structure, and contextual instructions provide bounded interpretive guidance.

## Outputs

### Governed Outputs

- outputs the pipeline is meant to produce and release or hand off
- treated as primary deliverables

### Review Artifacts Or Intermediates

- bounded artifacts created to support checking, comparison, or approval
- treated as secondary outputs rather than the final purpose of the pipeline

These two output categories differ in purpose: governed outputs are the intended end products, while review artifacts or intermediates exist to support evaluation and controlled progression.

## Current Limits

- exact schema is not fixed yet
- format and transport details are not fixed yet
- required versus optional fields are not yet fully specified

The current contract is provisional and will sharpen before schema or code.
