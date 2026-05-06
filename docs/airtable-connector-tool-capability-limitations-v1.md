# Airtable Connector Tool Capability Limitations v1

## Purpose

This is a durable reference doc consolidating known Airtable connector tool capability limitations encountered during prototype work. The limitations documented here are tool-layer constraints — they are not architecture or schema decisions; they are gaps in what the Airtable connector tooling can do programmatically. They are likely to change as Airtable / connector tooling evolves; this doc should be refreshed when that happens.

The doc exists because limitations have been encountered repeatedly across the SKU-driven Furniture v1 prototype and are now being encountered again at the cross-base operationalization step. Each prior occurrence documented the limitation in a per-finding artifact; this doc consolidates them so future Airtable prototype building can consult one reference upfront rather than re-discovering during execution.

## Posture

```text
durable reference (until tooling evolves)
not a schema decision
not an architecture finding — strictly tool-layer gaps
not a workaround prescription — workarounds are noted but specific implementations live in their own artifacts
refreshable as tooling support changes
```

Limitations are described in tool-capability terms, not in architectural terms. When a limitation forces an architectural compromise, that compromise is its own decision-note artifact.

## Known Limitations

### 1. Field type creation gap

**The connector cannot programmatically create the following Airtable field types:**

Observed blockers in this project:

- `multipleLookupValues` (lookup fields)
- `rollup`
- `createdTime`

Also absent from the current connector-supported field-type union, but not present in this project's source schema (so not encountered as blockers in this work):

- `createdBy`
- `lastModifiedTime`
- `lastModifiedBy`

**Confirmed via:** the connector's `create_base`, `create_table`, and `create_field` tools accept only the following field types in their union: singleCollaborator, multipleCollaborators, singleLineText, email, url, multilineText, phoneNumber, richText, barcode, multipleAttachments, checkbox, singleSelect, multipleSelects, number, percent, currency, duration, date, dateTime, rating, multipleRecordLinks, formula. The unsupported types are not present in the union.

**Surfaced during:** campaign-mode base setup Phase 1 preflight (May 2026). The merged Phase 1 plan ([`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md)) called for exact-mirror schema replication of the SKU-driven Furniture v1 base. The source schema includes 8 `multipleLookupValues` fields, 1 `rollup` field, and 1 `createdTime` field that the connector cannot create.

**Workaround:** hybrid execution. Connector creates the schema portion it supports (text fields, attachments, links, formulas, singleSelect, etc.). Operator manually adds unsupported field types via the Airtable UI. Validation of the assembled schema happens after both the connector portion and the manual portion complete.

**Affects:** any Airtable prototype that requires lookup fields, rollups, or auto-populated time/identity fields. Lookup fields are particularly load-bearing because they are how the architecture's "additive accumulation" Model A surfaces packet-level reference data onto slots — without them, cross-layer data flow breaks.

### 2. Field type conversion gap

**The connector cannot programmatically convert one field type to another.** The `update_field` tool can only update name, description, and (for formula fields) the formula expression. It cannot mutate field type.

**Surfaced during:** prior schema-fit work where converting a field's type would have been the cheapest path. The work-around was to add a new field of the desired type and migrate values manually.

**Workaround:** in the Airtable UI, field type conversion is supported with built-in data migration. For programmatic work, the workaround is to add a new field, migrate values via record-update calls, then optionally delete the old field via UI.

### 3. Attachment URL writeback gap (milestone-5 thin-bridge limitation)

**The connector cannot write a raw Airtable attachment URL into a `url` field on a different record.** This was the limitation that forced the milestone-5 thin-bridge governance design.

**Surfaced during:** [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md) (April 2026). The plan was to capture a chosen `slot_generated_image_v1` attachment URL into `generated_assets.asset_uri`. The connector's safety / type-handling layer rejected raw Airtable attachment URLs as `url` field values.

**Workaround:** capture the attachment ID (a stable text string) into `generated_assets.source_attachment_id` (a `singleLineText` field) instead of URL into `asset_uri`. Path B (PKT-SKU-010 full-flow) later resolved the broader thin-bridge limitation by adding the `asset_attachment` field (`multipleAttachments` type) and copying the attachment object directly via attachment-copy writeback. The text-pointer `source_attachment_id` is still part of the curation provenance schema for cases where attachment-copy isn't applicable.

**Affects:** any prototype that wants to programmatically reference Airtable-internal attachment URLs by URL rather than by attachment object copy or attachment ID.

## Implications For Future Airtable Prototype Building

When planning Airtable mutation work, the plan-before-execute step should include a **tool-capability check** in addition to the schema-fit check:

1. **Schema-fit check (existing AGENTS.md rule):** does the source schema express what the work needs?
2. **Tool-capability check (this doc's contribution):** for any planned mutation, can the connector tool actually create / mutate / write the field types, records, attachments, etc. in question?

If the tool-capability check fails for any planned step, the plan must either:
- decompose into hybrid execution (connector portion + manual UI portion)
- be deferred until tooling supports the action
- adopt an alternative carrier (e.g., text pointer instead of URL, attachment-copy instead of URL writeback)

Naming the tool-capability constraint up front in the plan is what AGENTS.md schema-fit-first discipline maps to in the tool-layer dimension.

## What This Artifact Is NOT

- Not a comprehensive list of all Airtable API capabilities; only documents limitations encountered in this project's prototype work
- Not a schema or architecture decision
- Not a workaround prescription beyond the brief notes per limitation; specific workaround implementations belong in their own decision-note artifacts
- Not durable doctrine — refreshable as tooling evolves
- Not a substitute for live preflight; even with this doc, the tool-capability check still runs against the actual connector schema before mutation

## Related Documents

### Per-finding documentation of limitations encountered (chronological)

- [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md): documents the attachment URL writeback gap (Limitation #3); milestone-5 finding
- [`docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md`](capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md): the pause-and-document decision that responded to the thin-bridge limitation
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): documents the asset_attachment field that resolved the broader thin-bridge limitation via attachment-copy writeback

### Workflow rules referenced

- `AGENTS.md` Airtable Schema-Fit Rule
- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)

### Active work where Limitation #1 surfaced

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan that called for exact-mirror schema replication
- [`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md): Phase 1 plan amendment adopting hybrid (connector + manual UI) execution per Limitation #1
