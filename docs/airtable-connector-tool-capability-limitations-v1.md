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

### 2. AI field-agent (image / text generation) field creation gap

**The connector cannot programmatically create AI field-agent fields** (Image type, Text type, or any other AI-generation field-agent variant). The accepted field-type union for `create_field` (enumerated under Limitation #1) does not include AI field-agent types.

**The practical implication is the same posture as Limitation #1:** when using the connector to build out base fields, AI field-agent fields must be built manually upfront in the Airtable UI, in the same hybrid-execution pattern as `multipleLookupValues` and `rollup` fields. The connector cannot stand them up programmatically; the operator must.

**UI mechanics caveat:** the Airtable UI does not offer a type-conversion path from a static field type (e.g., `multipleAttachments`) to an AI field-agent field. This means an existing connector-created placeholder field cannot be promoted in place — the operator must delete the placeholder and create a fresh AI field-agent field. (This is distinct from Limitation #3, which describes connector-side type-conversion gaps; here the gap is that even the UI conversion path does not reach AI field-agent types.)

**Surfaced during:**

- SKU-driven Furniture v1 prototype (initial setup of `slot_generated_image_v1` AI field-agent on `output_slots`); the AI field-agent was created manually in the Airtable UI from inception, and the prior limitation was treated as known background rather than documented as a tool-capability gap in its own artifact.
- Campaign-mode base setup Phase 2B (May 2026). Phase 1 connector setup created `slot_generated_image_v1` as a static `multipleAttachments` placeholder (the closest connector-supported type). At Phase 2B, the operator must replace that placeholder with an AI field-agent Image field manually in the UI to enable image generation. This is the encounter that surfaced the limitation as worth consolidating into this doc.

**Workaround:** connector creates a placeholder static field of the closest supported type (or skips the field entirely) during base setup; operator creates the AI field-agent field manually in the Airtable UI as part of hybrid execution. Operator must use fresh field creation rather than UI type conversion. Configuration details (model, toggles, inputs, prose wrapper) live in their own per-prototype configuration artifacts.

**Affects:** any Airtable prototype that uses AI field-agent fields for image generation, text generation, or other AI-driven content production. The image-generation use case is the primary load-bearing one for prototype work in this project — AI field-agent image fields are the actual generation step in the slot-level prompt → image flow.

### 3. Field type conversion gap

**The connector cannot programmatically convert one field type to another.** The `update_field` tool can only update name, description, and (for formula fields) the formula expression. It cannot mutate field type.

**Surfaced during:** prior schema-fit work where converting a field's type would have been the cheapest path. The work-around was to add a new field of the desired type and migrate values manually.

**Workaround:** in the Airtable UI, field type conversion is supported with built-in data migration **for the field types Airtable's UI exposes in its conversion menu**. AI field-agent types (see Limitation #2) are NOT reachable via UI conversion — the operator must delete the existing field and create a fresh AI field-agent field. For programmatic work, the workaround is to add a new field, migrate values via record-update calls, then optionally delete the old field via UI.

### 4. Attachment URL writeback gap (milestone-5 thin-bridge limitation)

**The connector cannot write a raw Airtable attachment URL into a `url` field on a different record.** This was the limitation that forced the milestone-5 thin-bridge governance design.

**Surfaced during:** [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md) (April 2026). The plan was to capture a chosen `slot_generated_image_v1` attachment URL into `generated_assets.asset_uri`. The connector's safety / type-handling layer rejected raw Airtable attachment URLs as `url` field values.

**Workaround:** capture the attachment ID (a stable text string) into `generated_assets.source_attachment_id` (a `singleLineText` field) instead of URL into `asset_uri`. Path B (PKT-SKU-010 full-flow) later resolved the broader thin-bridge limitation by adding the `asset_attachment` field (`multipleAttachments` type) and copying the attachment object directly via attachment-copy writeback. The text-pointer `source_attachment_id` is still part of the curation provenance schema for cases where attachment-copy isn't applicable.

**Affects:** any prototype that wants to programmatically reference Airtable-internal attachment URLs by URL rather than by attachment object copy or attachment ID.

### 5. Local file upload gap

**The connector cannot upload a local file as an attachment directly.** No multipart-upload endpoint is exposed; attachment fields (`multipleAttachments`) accept values only as `[{url, filename}]` arrays where the URL is fetched at write time by Airtable's backend.

**Surfaced during:** Phase 2A-i mutation ([`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md), May 2026). 16 imagery attachments needed to land on `products.product_image` and `reference_assets.reference_image` from local Dropbox-synced files; the connector accepted only URL-based attachment values.

**Workaround: external URL fetch + Airtable CDN caching.** Make each file publicly accessible at a fetchable URL, then pass `[{url, filename}]` to `create_records_for_table` / `update_records_for_table`. Airtable's backend fetches and caches the file on its CDN (`airtableusercontent.com`); the source URL is no longer load-bearing after caching and can be revoked. The Path B `asset_attachment` pattern (copying an existing Airtable attachment object via attachment-copy writeback) sidesteps this gap for governed-asset captures from raw slot attachments, but the gap stands for fresh uploads from outside Airtable.

For Dropbox-synced files, a one-time programmatic batch via the Dropbox API:

1. **Generate a short-lived Dropbox API access token.** In the Dropbox developer portal (`https://www.dropbox.com/developers/apps`), create a Scoped-access app with `sharing.write` and `files.metadata.read` permissions (Full Dropbox access type when the files live outside an app-scoped folder). Generate a session access token; the default 4-hour expiration is sufficient for one-time batch use; revoke the token or delete the app immediately after the batch.

2. **For Dropbox Business / team workspaces, use the team namespace header on every API call.** The default user namespace does not see team-shared content. Set `Dropbox-API-Path-Root: {".tag": "namespace_id", "namespace_id": "<TEAM_NS_ID>"}` on every request. Retrieve the team `namespace_id` from `POST /2/users/get_current_account` → `root_info.root_namespace_id`.

3. **Batch-generate share links per file.** `POST /2/sharing/create_shared_link_with_settings` with `{"path": "/team/path/to/file", "settings": {"audience": "public", "access": "viewer", "allow_download": true}}`. Convert each returned URL to raw-fetch form by replacing `?dl=0` with `?raw=1` (or appending `&raw=1` if no `dl=0` query string). If a share link already exists for a file, the API returns 409 conflict; fall back to `POST /2/sharing/list_shared_links` with `{"path": "...", "direct_only": true}` to retrieve the existing link.

4. **Verify one URL** by curl-fetching the first 16 bytes and confirming the file's magic bytes (e.g., `ffd8 ffe0` for JPEG). Cheap catch for the case where Dropbox serves an HTML preview page instead of raw file bytes due to mis-set link settings.

5. **Pass the URLs to the connector** as `[{url, filename}]` per attachment field. Airtable fetches each one synchronously during the record write and caches.

6. **Revoke the Dropbox token** in the developer portal after the batch completes (or delete the app entirely). Airtable's cached copies are durable and do not depend on the source URL.

**Affects:** any Airtable mutation that uploads attachments from outside Airtable — `products.product_image`, `reference_assets.reference_image`, fresh uploads to `generated_assets.asset_attachment`, and any other `multipleAttachments` writes where the source is a local file or a non-Airtable-cached URL.

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

- [`docs/capture-mechanics-thin-bridge-findings-pkt-sku-009.md`](capture-mechanics-thin-bridge-findings-pkt-sku-009.md): documents the attachment URL writeback gap (Limitation #4); milestone-5 finding
- [`docs/capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md`](capture-mechanics-pause-and-document-structural-decision-note-sku-driven-furniture-v1.md): the pause-and-document decision that responded to the thin-bridge limitation
- [`docs/full-flow-path-b-findings-pkt-sku-010.md`](full-flow-path-b-findings-pkt-sku-010.md): documents the asset_attachment field that resolved the broader thin-bridge limitation via attachment-copy writeback
- [`docs/campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md`](campaign-mode-base-setup-phase-2a-i-structured-change-summary-v1.md): documents the local file upload gap (Limitation #5) — Phase 2A-i mutation; 16 imagery attachments via Dropbox-shared-URL fetch + Airtable CDN caching; Dropbox API token + team-namespace header pattern
- [`docs/campaign-mode-base-setup-phase-2b-plan-v1.md`](campaign-mode-base-setup-phase-2b-plan-v1.md): plan-before-execute artifact that surfaces the AI field-agent field creation gap (Limitation #2) as the operative tool-capability constraint at Phase 2B; the Phase 2B SCS (forthcoming) will record the verbatim AI field-agent configuration applied in the campaign base

### Workflow rules referenced

- `AGENTS.md` Airtable Schema-Fit Rule
- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)

### Active work where Limitations #1 and #2 surfaced

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan that called for exact-mirror schema replication
- [`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md): Phase 1 plan amendment adopting hybrid (connector + manual UI) execution per Limitation #1
- [`docs/campaign-mode-base-setup-phase-2b-plan-v1.md`](campaign-mode-base-setup-phase-2b-plan-v1.md): Phase 2B plan-before-execute artifact that operationalizes the Limitation #2 hybrid-execution workaround for the AI field-agent image-generation field
