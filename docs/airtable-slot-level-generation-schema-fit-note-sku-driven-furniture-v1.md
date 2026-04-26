# Airtable Slot-Level Generation Schema-Fit Note // SKU-Driven Furniture v1

## Artifact Posture

This is a schema-fit / prototype finding.

It records Airtable tool-surface constraints and slot-level generation behavior observed in the SKU-driven Furniture v1 Airtable prototype.

It does **not** authorize schema changes.
It does **not** authorize additional generation.
It does **not** authorize `generated_assets` creation.
It does **not** authorize `slot_status` changes.
It does **not** establish final schema doctrine.

This is not a chain.

It is not a five-doc structural arc.

It is a bounded schema-fit / prototype finding.

## Why This Exists

This is no longer just operational trivia.

It is schema-fit evidence.

It affects what the prototype can and cannot auto-build.

It bears directly on the project thesis:

- the system can define the structure
- Airtable-specific execution still has configuration seams

## Evidence Context

PR #106 landed the Gate 6 execution record and findings for `PKT-SKU-007`.

PR #107 surfaced those Gate 6 artifacts in `README.md`.

`PKT-SKU-007` showed packet-level generation plus post-hoc mapping pressure.

`PKT-SKU-008` was used as a second SKU-driven Furniture v1 recurrence probe.

`PKT-SKU-008` packet-level generation produced only 2 images from a 3-slot obligation.

`PKT-SKU-008` packet-level generation was invoked as an in-thread recurrence probe rather than under a separate Gate plan; this note records that event for chain transparency.

This repeated the packet-level mapping pressure surfaced by `PKT-SKU-007`.

The relevant reopen trigger from the `PKT-SKU-007` findings was that a second packet exhibits the same mapping ambiguity.

`PKT-SKU-008` fired that trigger.

`PKT-SKU-008` then became the test surface for slot-level generation on `output_slots`.

The pre-registered outcome classes from the `PKT-SKU-007` generation execution plan covered packet-level capture.

This probe tested a different architecture surface:

- slot-level generation on `output_slots`

Therefore those classes do not apply directly.

The closest analog is `Slot-Aware Capture Path Holds` extended to slot-driven invocation, but this note uses narrower schema-fit / prototype language.

## Connector / Airtable Schema-Fit Findings

Observed connector / Airtable schema-fit findings:

- ChatGPT / Airtable connector can create normal fields.
- ChatGPT / Airtable connector can create normal attachment fields.
- ChatGPT / Airtable connector cannot create Airtable lookup fields, including lookup fields such as `slot_product_image_lookup`.
- ChatGPT / Airtable connector cannot configure Airtable AI field-agent behavior.
- `output_slots.slot_prompt` could be created by connector.
- `output_slots.slot_generated_image_v1` could be created by connector only as a plain attachment field.
- the connector-created `slot_generated_image_v1` attachment field did not expose Airtable AI image-generation behavior.
- a normal Airtable attachment field could not simply be converted into an Airtable AI field-agent field in the UI.
- manual delete/recreate in Airtable UI was required for `slot_generated_image_v1` to become an AI image-generation field agent.
- manual Airtable UI setup was required for product image lookup support.

## Manual Airtable UI Setup That Worked

ASK manually configured:

- `slot_generated_image_v1` as an Airtable AI image-generation field agent on `output_slots`
- prompt source = `output_slots.slot_prompt`
- product image source = `product_image_lookup_lookup` or equivalent product-image lookup from packet / product context

The manually recreated AI field agent could use:

- `slot_prompt`
- `product_image_lookup_lookup`

`product_image_lookup_lookup` is the literal Airtable field name created during the manual lookup setup; the doubled suffix reflects lookup-of-lookup naming, not a typo.

## PKT-SKU-008 Slot-Level Generation Result

Observed prototype milestone:

- `SLOT-PKT-SKU-008-HERO` generated at HERO slot
- `SLOT-PKT-SKU-008-PROFILE` generated at PROFILE slot
- `SLOT-PKT-SKU-008-DETAIL` generated at DETAIL slot

Milestone language:

- hero generated at hero slot
- profile generated at profile slot
- detail generated at detail slot

### `SLOT-PKT-SKU-008-HERO`

- `slot_prompt`: populated
- `slot_generated_image_v1`: generated
- generated image: `attBhsY0LAnmaPXMT` / `Image_April_26_2026_7_18_PM.jpeg`
- `generated_assets`: none
- `slot_status`: `planned`

### `SLOT-PKT-SKU-008-PROFILE`

- `slot_prompt`: populated
- `slot_generated_image_v1`: generated
- generated image: `attz3KHWORLJ3KMKB` / `Image_April_26_2026_7_29_PM.jpeg`
- `generated_assets`: none
- `slot_status`: `planned`

### `SLOT-PKT-SKU-008-DETAIL`

- `slot_prompt`: populated
- `slot_generated_image_v1`: generated
- generated image: `attkOBU15YchOTlra` / `Image_April_26_2026_7_36_PM.jpeg`
- `generated_assets`: none
- `slot_status`: `planned`

Visual role-fit observations:

Visual role-fit observations are based on direct images surfaced in the control-surface thread, not Airtable connector metadata alone.

- Detail slot generation produced a clear detail crop: upholstery / back curve / seat edge visible, matching the detail-slot intent.
- Profile slot generation produced a side / profile view, matching the profile-slot intent.
- Hero slot generation produced a front three-quarter / full-chair product view, matching the hero-slot intent.

All three `slot_status` values remained `planned`.

No `generated_assets` mapping was performed for `PKT-SKU-008` packet-level outputs.

No `generated_assets` records were created for the slot-level outputs in this probe.

## Interpretation

Packet-level generation asks for a three-output set but returns a shared attachment bucket requiring post-hoc role mapping.

Slot-level generation lets each expected output obligation carry its own prompt and generated image.

This is the actual show-don't-tell Airtable prototype milestone.

On this bounded probe, slot-level generation preserved slot identity end-to-end where packet-level generation did not.

This is materially stronger evidence for the SKU-driven Furniture v1 Airtable prototype, but it is not generalized doctrine.

This probe suggests a useful working distinction: for this bounded prototype, `slot_generated_image_v1` functioned as raw slot-level generation output, while `generated_assets` appears better treated as a downstream candidate / review / governance / delivery capture layer.

This note does not formalize that rule.

A future structural decision should decide whether the distinction should become durable schema doctrine.

The observed / possible distinction is:

- `output_slots` = expected obligations
- `slot_prompt` = slot-level generation instruction
- `slot_generated_image_v1` = raw generated image for that slot
- `generated_assets` = promoted / captured asset record for review, acceptance / rejection, release-readiness, or delivery

## Boundaries / Non-Claims

This note makes no claim that this is final schema.

It makes no claim that this is production-ready.

It makes no claim that `generated_assets` is obsolete.

No `slot_status` lifecycle decision is made.

No `generated_assets` capture rule is chosen.

No generalized cross-mode conclusion is established.

No screenshots or image files are committed to the repo.

## Out Of Scope

This note does not authorize:

- `slot_status` lifecycle decision
- `generated_assets` capture rule
- retry plan
- `PKT-SKU-003` work
- README update
- architecture rewrite
- final schema doctrine
- screenshots or generated images committed to the repo

## Next Questions Left Open

- When should `slot_generated_image_v1` be promoted / captured into `generated_assets`?
- Should `generated_assets` be created only after review selection, candidate acceptance, or delivery / governance need?
- Should `slot_status` remain `planned` after slot-level generation, or does slot-level generation require a new lifecycle state?
- Can the manual Airtable AI field-agent setup be automated outside the current connector limits?
