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

## Refresh Record

```text
2026-10-16  re-read against the connector's live tool schemas; read-only, nothing created or changed
            rechecked      Limitations #1, #2, #3; interface, page and automation tools (Notes B, C)
            not rechecked  Limitations #4, #5, #6 and the UI caveats under #2 and #3 (behavioral
                           or UI-only); Note A's aspect-ratio menu (needs a UI look at an AI image
                           field's Output options)
            method         tool schemas and tool descriptions; describe_page_type and
                           describe_page_element; get_create_automation_instructions, global and
                           for one prototype base; get_table_schema on one existing AI image field
            boundary       a type or option the schema accepts has not been exercised by this
                           refresh; its first real use confirms the behavior
```

## Known Limitations

### 1. Field type creation gap — narrowed (2026-10-16)

**Current state (2026-10-16; schema-accepted, not yet exercised).** The three types that blocked this project — `multipleLookupValues` (lookup fields), `rollup`, and `createdTime` — are now accepted by the connector's `create_field` tool, as are `count`, `autoNumber`, `lastModifiedTime`, `createdBy`, and `lastModifiedBy`. `lastModifiedTime` and `lastModifiedBy` take an optional `referencedFieldIds` list. Lookup, rollup, and count fields name their link field (and, for lookup and rollup, the field in the linked table) by name or ID; a rollup also takes its aggregation formula.

The full `create_field` union: singleCollaborator, multipleCollaborators, singleLineText, email, url, multilineText, phoneNumber, richText, barcode, multipleAttachments, checkbox, singleSelect, multipleSelects, number, percent, currency, duration, date, dateTime, rating, multipleRecordLinks, formula, count, multipleLookupValues, rollup, autoNumber, createdTime, lastModifiedTime, createdBy, lastModifiedBy, aiText (see Limitation #2).

**What remains:**

- `create_table` and `create_base` accept a narrower union: the May 2026 union below without `formula`, plus `autoNumber` (which may be the primary field). They do not accept `formula`, `count`, `multipleLookupValues`, `rollup`, `createdTime`, `lastModifiedTime`, `createdBy`, `lastModifiedBy`, or `aiText`. Computed fields are therefore added with `create_field` after their tables and link fields exist — a sequencing step, not a manual one.
- Types absent from every union, such as button fields, still need the Airtable UI, as does AI image-field configuration (Limitation #2).

**Original observation (May 2026):** the connector's `create_base`, `create_table`, and `create_field` tools accepted only the following field types in their union: singleCollaborator, multipleCollaborators, singleLineText, email, url, multilineText, phoneNumber, richText, barcode, multipleAttachments, checkbox, singleSelect, multipleSelects, number, percent, currency, duration, date, dateTime, rating, multipleRecordLinks, formula. `multipleLookupValues`, `rollup`, and `createdTime` were the observed blockers; `createdBy`, `lastModifiedTime`, and `lastModifiedBy` were also absent but not in this project's source schema.

**Surfaced during:** campaign-mode base setup Phase 1 preflight (May 2026). The merged Phase 1 plan ([`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md)) called for exact-mirror schema replication of the SKU-driven Furniture v1 base. The source schema includes 8 `multipleLookupValues` fields, 1 `rollup` field, and 1 `createdTime` field that the connector could not create at the time.

**Workaround:** current, pending first use — connector-only, in order: tables and link fields first, then computed fields through `create_field`. Hybrid execution (connector creates the supported portion; operator adds the remaining types in the Airtable UI) remains the path for any type outside the `create_field` union, and was the May 2026 path for lookups, rollups, and `createdTime`. Validation of the assembled schema happens after every portion completes.

**Affects:** any Airtable prototype that needs a field type outside the `create_field` union, or that tries to create computed fields in the same `create_table` / `create_base` call as their tables. Lookup fields remain load-bearing — they are how the architecture's "additive accumulation" Model A surfaces packet-level reference data onto slots — but as of 2026-10-16 they are no longer a connector blocker.

### 2. AI field-agent field creation gap — narrowed to image fields (2026-10-16)

**Current state (2026-10-16; schema-accepted, not yet exercised).** `create_field` accepts an AI text field type, `aiText`. Its only option is the prompt: an ordered array of plain-text strings and field-reference tokens, with at least one field reference. The tool's own description states that creating the field does not populate cells; that cell values are generated on demand by a user action in Airtable and no API call can trigger generation; that the prompt cannot be changed through the API after creation; and that the AI model is not configurable.

**What remains:**

- **AI image fields are not creatable.** No image-generating field type is in the `create_field` union. AI field-agent Image fields — the generation step in this project's slot-level prompt → image flow — must still be built in the Airtable UI.
- **AI image field configuration is not readable either.** `get_table_schema` reports the field Note A records as an AI field-agent Image field (`output_slots.slot_generated_image_v1` in base `app4sBiFw2tft17VF`) as `multipleAttachments`, with `{"isReversed": false}` as its only configuration — no prompt, model, inputs, or output options. The connector can neither create nor audit that configuration; the per-prototype configuration artifacts remain its record.
- **The API cannot change an `aiText` prompt after creation or set its model.** Whether the Airtable UI can edit a connector-created AI text field is unverified; where prompt revision or model choice matters, plan the field as Airtable UI work, as for image fields.

**Relationship to Limitation #6:** the no-population statement comes from the tool description. This refresh created no `aiText` field, so whether a connector-created AI text field avoids the automatic first run that #6 records for UI-created AI image fields is unverified.

**Separate automation path:** an image-generating automation action that acts on a record's attachment fields is creatable as a draft (Note C). It is a different surface from the AI field-agent Image field and does not create one.

**Original observation (May 2026):** the `create_field` union (enumerated under Limitation #1) included no AI field-agent type, text or image. AI field-agent fields of every kind had to be built manually in the Airtable UI, in the same hybrid-execution pattern then used for `multipleLookupValues` and `rollup` fields.

**UI mechanics caveat** (not rechecked 2026-10-16): the Airtable UI does not offer a type-conversion path from a static field type (e.g., `multipleAttachments`) to an AI field-agent field. This means an existing connector-created placeholder field cannot be promoted in place — the operator must delete the placeholder and create a fresh AI field-agent field. (This is distinct from Limitation #3, which describes connector-side type-conversion gaps; here the gap is that even the UI conversion path does not reach AI field-agent types.)

**Surfaced during:**

- SKU-driven Furniture v1 prototype (initial setup of `slot_generated_image_v1` AI field-agent on `output_slots`); the AI field-agent was created manually in the Airtable UI from inception, and the prior limitation was treated as known background rather than documented as a tool-capability gap in its own artifact.
- Campaign-mode base setup Phase 2B (May 2026). Phase 1 connector setup created `slot_generated_image_v1` as a static `multipleAttachments` placeholder (the closest connector-supported type). At Phase 2B, the operator must replace that placeholder with an AI field-agent Image field manually in the UI to enable image generation. This is the encounter that surfaced the limitation as worth consolidating into this doc.

**Workaround:** for AI image fields, unchanged — connector creates a placeholder static field of the closest supported type (or skips the field entirely) during base setup; operator creates the AI field-agent field manually in the Airtable UI as part of hybrid execution. Operator must use fresh field creation rather than UI type conversion. Configuration details (model, toggles, inputs, prose wrapper) live in their own per-prototype configuration artifacts. For AI text fields, pending first use, `create_field` with `aiText` serves when a prompt set once at creation and no API-side model choice are acceptable; otherwise the UI path above applies.

**Affects:** any Airtable prototype that uses AI field-agent fields for image generation, text generation, or other AI-driven content production. The image-generation use case is the primary load-bearing one for prototype work in this project — AI field-agent image fields are the actual generation step in the slot-level prompt → image flow.

### 3. Field type conversion gap

**The connector cannot programmatically convert one field type to another.** The `update_field` tool can only update name, description, and (for formula fields) the formula expression — reconfirmed 2026-10-16. It cannot mutate field type, and it cannot change an `aiText` field's prompt (Limitation #2).

**Surfaced during:** prior schema-fit work where converting a field's type would have been the cheapest path. The work-around was to add a new field of the desired type and migrate values manually.

**Workaround** (UI portion not rechecked 2026-10-16): in the Airtable UI, field type conversion is supported with built-in data migration **for the field types Airtable's UI exposes in its conversion menu**. AI field-agent types (see Limitation #2) are NOT reachable via UI conversion — the operator must delete the existing field and create a fresh AI field-agent field. For programmatic work, the workaround is to add a new field, migrate values via record-update calls, then optionally delete the old field via UI.

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

### 6. AI field-agent automatic first generation on field creation

**On AI field-agent field creation, the field automatically triggers a first generation run for all existing rows, regardless of whether "Automatic generation" is set to OFF.** The OFF setting governs subsequent generation triggers (e.g., input-field updates do not re-trigger generation); it does not suppress the initial run at the moment of field creation.

**Surfaced during:** SKU-driven Furniture v1 prototype (operator's prior encounter of this behavior, treated as known background) and reconfirmed at campaign-mode base setup Phase 2B (May 2026), where creating the AI field-agent Image field on `output_slots.slot_generated_image_v1` triggered an automatic first generation run on all 9 slot rows despite "Automatic generation" being configured OFF. The Phase 2B SCS records the empirical confirmation.

**Workaround:** none for suppressing the first run. Treat the auto-first-run output as a v0 batch the operator may discard or use as a baseline. Subsequent runs are operator-triggered per row. Plan implication: ensure all input data (slot prompts, lookup-resolved attachments, product images) is clean and stable before AI field-agent field creation, since the first run consumes a generation cycle per existing row at the moment of creation.

**Affects:** any AI field-agent field creation moment in a base with pre-existing rows. Cost implications at scale — one auto-run per existing row, charged at field-creation time. Content-discipline implication — input cleanliness should be settled before field creation, not after, because the operator cannot opt out of the first run.

## Known Capability Notes (planning-relevant)

These are not gaps, though each names the boundary of the capability it records. They are tool capabilities recorded because they resolve planning questions for prototype work — the complement to the limitations above.

### A. AI field-agent Image generation: aspect ratio + resolution are set in Output options, not the prompt

The in-base AI field-agent Image field constrains output framing directly, at parity with an external tool (e.g. Flow) on output control. Its **Output options** expose:

- **Aspect ratio** (menu as of June 2026; UI-surfaced, subject to change): Auto · Square (1:1) · Portrait (2:3) · Landscape (3:2) · Tall Portrait (3:4) · Standard (4:3) · Vertical (9:16) · Widescreen (16:9) · Ultra-wide (21:9)
- **Resolution:** Auto · 1K · 2K · 4K
- plus file type / format / file name

**Plan implication:** set aspect ratio and resolution in Output options, not in the prompt. `slot_prompt` carries composition and aesthetic only; output framing is a field setting. Default Auto may yield an unintended framing. Combined with native candidate accumulation in `slot_generated_image_v1`, in-base field-agent generation can support prototype-generated output candidates without external transport. External tools remain appropriate for synthetic inputs or when in-base generation lacks a needed capability documented for the run.

**Confirmed via:** integrated base `app4sBiFw2tft17VF` `output_slots.slot_generated_image_v1` field-agent setup; Phase 2c marketing-hero in-base generation (June 2026). Menu values are UI-surfaced and may evolve — refresh as tooling changes.

**Not rechecked 2026-10-16.** The menu above is the June 2026 reading. Confirming it needs a UI look at an AI image field's Output options; the connector does not expose that configuration (Limitation #2).

### B. Interfaces and pages are connector-buildable, within a page-level boundary

As of 2026-10-16 the connector exposes tools to create interfaces (`create_interface`), create pages (`create_page`), and publish an interface (`publish_interface`); none was exercised at this refresh. Page configuration shapes come from `describe_page_type` and `describe_page_element`.

- **Page types:** `visualization` pages (kanban, list, calendar, gallery, grid, timeline, recordReview); `dashboard` pages (sections, each backed by a source table, holding number and chart elements, pivot tables, and the visualization elements other than recordReview); and `recordDetail` pages, which are standalone — created without an interface — and can be opened from other pages' elements.
- **Record detail pages:** page-level `editability` (`editable` or `readOnly`); a layout of groups, up to three columns per group, and rows of up to six field elements; linked-record fields rendered as pills, cards, or an embedded visualization of the linked records (grid, list, gallery, kanban, calendar, or timeline). In the embedded-visualization mode, and only for `multipleRecordLinks` fields, `canLinkAndUnlinkRecords` lets end users link and unlink records even on a read-only page.
- **Scoping:** visualization pages and dashboard sections take `recordScopeFilters` — a builder-set filter end users cannot change — plus end-user tabs or dropdowns.
- **Publishing** promotes every page's working draft in the interface to live, including draft edits made outside the connector session; only pages whose publishing is disabled stay as drafts.

**Not in the schema (2026-10-16):** per-element read-only settings, visibility conditions, and buttons. Record detail pages accept only `field` elements; the visualization element schemas expose display, sort, group, and summary options but no editing permissions; and only record detail pages carry an editability setting. Interface work that needs those settings remains Airtable UI work.

### C. Automations are connector-creatable as drafts

As of 2026-10-16 the connector's `create_automation` tool, by its own description, saves an automation as a draft; none was created at this refresh. The automation stays off until a user reviews it and turns it on in the Airtable UI, so an automation built through the connector is hybrid by construction. `get_create_automation_instructions` returns the catalog of types, and the catalog varies by base: requested for one prototype base, it added a custom-script action card and catalog entry that the global catalog lacks. Request it with the target `baseId` during preflight.

- **Curated triggers** (documented with examples): recordCreated, recordUpdated, recordMatchesConditions, cron, formSubmitted, recordEntersView, genericWebhookReceived.
- **Curated actions:** createRecord, updateRecord, findRecords, sort; the send-email and messaging actions sendEmail, sendToSlack, gmailSendEmail, microsoftOutlookSendEmail; and the AI text actions aiGenerate and aiGenerateStructuredOutput. Repeating (for-each) and conditional groups structure the steps.
- **Creatable but uncurated:** further trigger and action types without worked examples, including **`aiGenerateImage`**. The catalog lists only the inputs the connector can set: prompt, table, record, attachment fields (it does not say whether these supply source images, receive output, or both), input fidelity, number of output images, size (auto, 1024x1024, 1536x1024, 1024x1536), quality, output filename, and output image type. Those size options are not the AI image field's aspect-ratio menu (Note A), and no model input is among them. Not exercised at this refresh.
- **No trigger is named for interface buttons.** One creatable trigger, `inputReceivedFromConnection`, has no connector-settable inputs and outputs a record plus the acting user; the catalog does not say what fires it.
- **Write shapes:** linked-record fields are written by record ID, with the primary-field value as a documented fallback. For record field maps (createRecord, updateRecord) the catalog groups attachment writes with the read-only and computed field families and documents attachments only as read and filter shapes, with no attachment value form; `aiGenerateImage` takes attachment fields through its own input instead. Computed and system fields must be omitted from writes.

## Implications For Future Airtable Prototype Building

When planning Airtable mutation work, the plan-before-execute step should include a **tool-capability check** in addition to the schema-fit check:

1. **Schema-fit check (existing AGENTS.md rule):** does the source schema express what the work needs?
2. **Tool-capability check (this doc's contribution):** for any planned mutation, can the connector tool actually create / mutate / write the field types, records, attachments, interface pages, automations, etc. in question? Read the live tool schemas, which this doc can lag, and request the automation catalog for the target base.

If the tool-capability check fails for any planned step, the plan must either:
- decompose into hybrid execution (connector portion + manual UI portion)
- be deferred until tooling supports the action
- adopt an alternative carrier (e.g., text pointer instead of URL, attachment-copy instead of URL writeback)

Naming the tool-capability constraint up front in the plan is what AGENTS.md schema-fit-first discipline maps to in the tool-layer dimension.

## What This Artifact Is NOT

- Not a comprehensive list of all Airtable API capabilities; only documents limitations and planning-relevant capabilities met in, or checked for, this project's prototype work
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
- [`docs/campaign-mode-base-setup-phase-2b-plan-v1.md`](campaign-mode-base-setup-phase-2b-plan-v1.md): plan-before-execute artifact that surfaces the AI field-agent field creation gap (Limitation #2) as the operative tool-capability constraint at Phase 2B; Phase 2B execution (operator-side UI configuration of the AI field-agent Image field on `output_slots.slot_generated_image_v1`) also empirically reconfirmed Limitation #6 — the automatic first generation run on field creation despite "Automatic generation" set to OFF. The Phase 2B SCS (forthcoming) will record the verbatim AI field-agent configuration applied and the auto-first-run outcomes.

### Workflow rules referenced

- `AGENTS.md` Airtable Schema-Fit Rule
- `AGENTS.md` Airtable Mutation Discipline rule (Plan-Before-Execute + Structured Change Summary)

### Active work where Limitations #1, #2, and #6 surfaced

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan that called for exact-mirror schema replication
- [`docs/campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md`](campaign-mode-base-setup-phase-1-tool-capability-amendment-v1.md): Phase 1 plan amendment adopting hybrid (connector + manual UI) execution per Limitation #1
- [`docs/campaign-mode-base-setup-phase-2b-plan-v1.md`](campaign-mode-base-setup-phase-2b-plan-v1.md): Phase 2B plan-before-execute artifact that operationalizes the Limitation #2 hybrid-execution workaround for the AI field-agent image-generation field; Phase 2B execution surfaced Limitation #6 empirically
