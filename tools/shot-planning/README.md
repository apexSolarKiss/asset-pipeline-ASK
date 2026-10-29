# tools/shot-planning

This folder holds the seven automation scripts that plan and apply product-page images in the AP-ASK demo base's four-workflow extension (S1–S7), with their tests. They put into the base the model in [Shot Guides, Fulfillment and Asset Applications](../../docs/shot-guides-fulfillment-and-asset-applications-v1.md):

- a shot guide is adopted as a whole definition;
- an output slot, a shot and an asset application are three different records;
- an acceptance covers the slots its stated use names, and any further use takes a use decision;
- which image a slot uses is a separate question from whether that image still holds.

This file covers the schema the scripts run on, the text of every formula the unit adds or changes, each script's trigger, inputs and writes, the install order, retry, what stops a run, what is unsupported, and the tests.

**The specification** is the build proposal, v6, the plan for this extension. It is kept with the operator's records, outside the repository. Section references (§) below are to it, and so are test IDs (T…, U…), counterexamples (CX…) and build checks (K…). Where v6 is silent or ambiguous, the source takes a reading, and [Choices made in the source](#choices-made-in-the-source) lists each one. Three clarifications from the reviewer's Stage-1 pass are built in and tested as GPT-A, GPT-B and GPT-C ([Clarifications built in](#clarifications-built-in)).

**Contents:** [The scripts](#the-scripts) · [How it works](#how-it-works) · [The hand-edit detector](#the-hand-edit-detector) · [Schema](#schema) · [Formula texts](#formula-texts) · [Scripts: triggers, inputs and writes](#scripts-triggers-inputs-and-writes) · [Install](#install) · [Retry](#retry) · [What stops a run](#what-stops-a-run) · [What it does not support](#what-it-does-not-support) · [Clarifications built in](#clarifications-built-in) · [Choices made in the source](#choices-made-in-the-source) · [Tests](#tests) · [What the local tests do not show](#what-the-local-tests-do-not-show)

## The scripts

| | Script | File | Runs from | Writes |
|---|---|---|---|---|
| S1 | Make product slots | `s1-make-product-slots.js` | the Make product slots button on a request | new product-page slots, each with its kept slot plan; the request's Slot planning note |
| S2 | Make shots | `s2-make-shots.js` | the Make shots button on a request | new shots; a slot's Shot link, when it joins or is relinked; the request's Shot planning note |
| S3 | Replan | `s3-replan.js` | the Replan button on a shot, and on a product-page slot (installed twice) | kept slot plans; a shot's Lines in shot; a collection shot's Kept guide plan; a detached slot's Shot link and Detach log; Replan result |
| S4 | Apply acceptance | `s4-apply-acceptance.js` | an accepted image whose Record complete reads Complete, and its Retry applications button (installed twice) | new applications; the accepted record's Application progress and Applications done |
| S5 | Apply use decision | `s5-apply-use-decision.js` | the Apply this decision button on a use decision | the decision's Decided basis, Decided selection, Decided at, Decision label, Ended slots, Result and Applied; new applications; Current, Current set at, Replaced by and Replaced at on applications it takes out of use |
| S6 | Adopt guide | `s6-adopt-guide.js` | the Adopt this definition button on a shot guide | Adopted definition, Adopted version, Adopted at, Decided content, Adoption log, Adoption result |
| S7 | Record decision | `s7-record-decision.js` | the Record decision button on a product, and on a product-page slot (installed twice) | Decided content, Decision recorded at and the Recorded fields; Record result |

Each script is a standalone automation script, in the style of [`tools/candidate-numbering`](../candidate-numbering/README.md):
- it has no imports and reads `input.config()` once;
- it takes every table and field from its inputs, by ID or by name;
- it checks each binding's field type before any read or write;
- it ends with `await main();`.

## How it works

**Decisions are entered, then recorded.** Four record types carry a decision: a guide's adoption, a product's assignment, a slot's planning decision and a use decision.
- Each has a decision record: Decided by, Decision source and Entered by.
- A **Decision content** formula joins the decided fields and that record. The press that records the decision copies it into **Decided content**, or, for a use decision, **Decided basis**, with the time it was recorded. S6 records an adoption, S7 an assignment or a planning decision, and S5 a use decision.
- **What operates is what was recorded.** The rest of the base reads the recorded form: a guide's Adopted definition, a product's Recorded guide and its ID, a slot's Recorded fulfillment and Recorded not needed, a use decision's Decided basis and Decided selection.
- The editable fields are the draft of the next decision. An edit to them reads "A change waits for its decision record" and blocks new work on its slot, or S1's new slots for its product, but waives, reopens, departs and reassigns nothing until a press records it (CX6).

**Plans are kept by value.**
- S1 copies each slot's plan from the live guide slot when it creates the slot, including the guide slot's Definition line, the guide's Adopted version, the position, placement label, view, requirement and fill rule. Nothing live changes a kept plan.
- A slot is **In adopted plan** while its guide's Adopted definition still contains its kept line, its product is still assigned that guide and still the line's product, and its request isn't superseded.
- When an adopted change rewrites a slot's line, the slot leaves the plan, **Stale by adoption**, and S3 refreshes it. S3 works from **Replan reach**, never from Active: a Replan limited to active slots could never bring a stale slot back (CX5).

**Shots follow the recorded fulfillment.**
- S2 gives each Make slot its own shot, and each group of Share slots with one share signature one shot. A slot whose recorded fulfillment is "An accepted image" gets no shot.
- Where the products of a Share group differ in their facts, S2 shares nothing, and its note names the difference (CX3).
- An existing shot counts only while it fills an active slot and isn't Withdrawn (GPT-B).

**Applications.** An application is one slot's use of one accepted image.
- **Current**, written only by S4 and S5, says which application a slot uses.
- **Eligibility**, a formula, says whether that use still holds.
- **Placement state** reads Settled only when exactly one application is in use and its State reads In use.
- S4 makes an acceptance's applications, one per slot in the candidate's Slots kept.
- S5 applies a use decision.
  - **It is fixed when applied.** Decided basis and Decided selection are written once, before any application.
  - **It is applied resumably.** A run that stops is finished by pressing again.
  - **Under Replace,** the replacing application is written first, so an interrupted replacement leaves two in use, never none.
  - **A later use stands.** A slot where a later decision or acceptance has put another image in use since the decision was fixed is superseded, not overwritten (CX7). Where that application, outside the decision's Decided selection, reads Edited by hand, the slot waits instead (GPT-C).
  - **A final failure ends the slot for this decision.** S5 records it in Ended slots at once, so the slot stays ended on a later press even when its cause has cleared, while another slot waits.

**Level 0** (`AGENTS.md` §Write Guarantee Levels).
- Each script reads the records it needs once, writes only what is missing, and takes no lock.
- Presses one after another never duplicate.
- Two overlapping runs can duplicate a slot, a shot or an application key, or both put an application in use on one slot. The pair-check views (§7.3, §7.7) show each case; a duplicate is marked Withdrawn, and a conflict is resolved by a use decision with Replace. A Withdrawn shot doesn't count as its slots' shot, so ticking Withdrawn is enough: its slots needn't be unlinked from it.
- Airtable gives no transaction across writes. S4 and S5 order their writes so that a stop between two writes is finished by pressing again.

**Refusals are results, not errors.** A refused press writes its message to one field and nothing else:

| Script | Its message goes to |
|---|---|
| S1 | the request's Slot planning note |
| S2 | the request's Shot planning note |
| S3 | Replan result, on the shot or on the slot pressed |
| S4 | the accepted record's Application progress |
| S5 | the use decision's Result |
| S6 | the guide's Adoption result |
| S7 | Record result, on the product or on the slot |

**Times.** Each script writes its "written at" time with the run's current time, in the same update as the fields it guards:
- Kept plan written at, by S1 and S3;
- Decision recorded at, by S7;
- Adopted at, by S6;
- Decided at, by S5;
- Current set at, by S4 and S5.

## The hand-edit detector

It is a **limited detector of hand edits**, not proof that a field was written by a script (§6). Each watched set has a last-modified-time field and a formula that compares it with the script's own time:

| Formula | Table | Watches | Against |
|---|---|---|---|
| Adopted definition check | Shot guides | Adopted definition, Adopted version, Decided content | Adopted at |
| Record check | Products | Decided content, Recorded guide, Recorded guide ID | Decision recorded at |
| Record check | Product-page slots | Decided content, Recorded fulfillment, Recorded not needed, Recorded summary | Decision recorded at |
| Kept plan check | Product-page slots | the twelve kept-plan fields, Kept definition line to Plan kept | Kept plan written at |
| Current check | Applications | Current | Current set at |
| Record intact | Use decisions | Decided basis, Decided selection (its last-modified time also watches Decided at) | Decided at |

- **It flags** a watched value changed more than 60 seconds after the script's time, and a watched value with no script time at all, which no script wrote.
- **It misses** an edit within those 60 seconds, an edit by someone who also rewrites the time beside it, and any field it doesn't watch, such as an application's Kept destination or a candidate's Slots kept.
- **Where it flags, the record is held.** A held slot isn't waived, ok or Settled, its shot isn't Planned, Replan and detaching refuse it, and S4 and S5 wait for it. It stays held until its own press records it again: S7 on the slot or the product, S6 on the guide. A flagged kept slot plan can't be recorded again; the remedy is a new version of the request.
- **A use decision whose own record is flagged** writes no new application: S5 ends it "Applied in part". **An application whose Current is flagged** reads Edited by hand, and a use decision with Replace resolves its slot.
- **Where it misses, the edit operates** as if a script had written it.
- **A press is never flagged,** whether or not Airtable moves a last-modified time on an unchanged write. The tests run both models (T37-local, T37-s3, T37-s4s5).
- Field editing permissions, if the build copy shows they can keep these fields to automations, are the stronger guard. The copy records which applies (T37).

## Schema

The tables and fields below are the schema the scripts and formulas run on, as [`sim/schema.mjs`](sim/schema.mjs) declares it, field by field and in its order. The new fields' names are the demo's, and an installation binds its own by ID or name. The existing fields carry the live base's names, types and configurations.

**Status:**
- **New:** added by this unit. Besides the fields v6 §6 names, this includes:
  - helper fields, so each condition reads one formula (§6's rule for automation conditions);
  - five result fields v6 doesn't name: Adoption result, Record result on Products and on Product-page slots, and Replan result on Product-page slots and on Shots;
  - a Product facts lookup on Product-page slots, for S5's legacy map.
- **Changed:** an existing field this unit changes, and how.
- **Existing:** a live field this unit reads and doesn't change. Its name, type and configuration (link and its pair, lookup or rollup field and link, last-modified field, select choices) are the build copy's, from its schema read of 2026-10-28, whose schema is the live base's (§9.1). An existing formula's text is the live text ([Formula texts](#formula-texts)).
- **Primary (new):** the primary field of a new table whose primary is a formula. The connector creates a table's primary only as a stored field, so it is created as Single line text "Name" and converted to its formula in the UI ([Install](#install)).

The build's reconcile reads the live schema before any change (§9.1 step 2) and stops on an Existing field that is absent, of another type or configured otherwise. A rollup's aggregation isn't in the connector's schema read, so for the two existing rollups (Shots › Acceptance coverage, Accepted images › Candidate is test) it isn't checked; the sim's aggregation gives what their readers need ([Choices](#choices-made-in-the-source)).

**Creating the fields:**
- A link lists both of its fields: creating one in Airtable creates the other, which is then renamed as listed. A link to its own table gets a paired field too: the build copy showed Airtable creating one. The three self-links' paired fields (Duplicated by, Named in Replaces, Named in Replaced by) are mirrors that no formula or script reads.
- Lookups, rollups, counts and last-modified times are created by connector, like formulas (§6).
- The two repoints, the buttons and the three formula primaries (Product lines, Applications and Use decisions › Name) need the Airtable UI (§9.3).

<details><summary><b>Shot guides</b> (new table, 29 fields and 1 button)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | New |
| Destination | Single select: Product page / Collection | New |
| Guide ID | Formula (below) | New |
| Guide slots | Link to Guide slots; paired with Guide slots › Guide | New |
| Products | Link to Products; paired with Products › Shot guide | New |
| Products (recorded) | Link to Products; paired with Products › Recorded guide | New |
| Requests | Link to Briefs; paired with Briefs › Shot guide (collection) | New |
| Test | Checkbox | New |
| Slot definitions | Rollup of Definition line through Guide slots: `ARRAYJOIN(values, "\n")` | New |
| Definition | Formula (below) | New |
| Adopted definition | Long text | New |
| Adopted version | Number | New |
| Adopted at | Date, with time | New |
| Adoption log | Long text | New |
| Decided by | Single line text | New |
| Decision source | Single line text | New |
| Entered by | Single line text | New |
| Decision content | Formula (below) | New |
| Decided content | Long text | New |
| Adoption note | Long text | New |
| Adoption result | Long text | New |
| Adopted definition changed at | Last modified time of: Adopted definition, Adopted version, Decided content | New |
| Adopted definition check | Formula (below) | New |
| Active slots | Rollup of Is active through Guide slots: `SUM(values)` | New |
| Slots incomplete | Rollup of Is incomplete through Guide slots: `SUM(values)` | New |
| Incomplete slot names | Rollup of Incomplete name through Guide slots: `ARRAYJOIN(ARRAYCOMPACT(values), ", ")` | New |
| Complete | Formula (below) | New |
| Status | Formula (below) | New |
| Guide check | Formula (below) | New |
| Adopt this definition | Button: runs S6 | New |

</details>

<details><summary><b>Guide slots</b> (new table, 20 fields)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | New |
| Guide | Link to Shot guides; paired with Shot guides › Guide slots | New |
| Position | Number | New |
| Placement label | Single line text | New |
| View | Long text | New |
| Required | Single select: Always / As needed | New |
| Fill rule | Single select: Made for each product / Shared across sizes of one style and color / An accepted image that shows the product | New |
| Includes | Single select: All products in the request / Choose | New |
| Choose count | Number | New |
| Retired | Checkbox | New |
| Test | Checkbox | New |
| Guide ID (from Guide) | Lookup of Guide ID through Guide | New |
| Guide ID | Formula (below) | New |
| Guide-slot ID | Formula (below) | New |
| Definition line | Formula (below) | New |
| Is active | Formula (below) | New |
| Is incomplete | Formula (below) | New |
| Incomplete name | Formula (below) | New |
| Product-page slots | Link to Product-page slots; paired with Product-page slots › Guide slot | New |
| Shots | Link to Shots; paired with Shots › From guide slot | New |

</details>

<details><summary><b>Products</b> (changed table, 46 fields and 1 button)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | Existing |
| Image | Attachment | Existing |
| Test | Checkbox | New |
| Style | Single line text | New |
| Color | Single line text | New |
| Size | Single line text | New |
| Must stay true | Long text | Existing |
| Material | Single line text | Existing |
| Finish | Single line text | Existing |
| Image updated | Last modified time of: Image | Existing |
| Product ID | Formula (below) | New |
| Product facts | Formula (below) | Existing |
| Prompt line | Formula (below) | Existing |
| Product share key | Formula (below) | New |
| Facts without size | Formula (below) | New |
| Share signature | Formula (below) | New |
| Product facts (lines) | Formula (below) | New |
| Shared facts line | Formula (below) | New |
| Prompt line (lines) | Formula (below) | New |
| Shared prompt line | Formula (below) | New |
| Has image | Formula (below) | New |
| Shot guide | Link to Shot guides; paired with Shot guides › Products | New |
| Assignment basis | Long text | New |
| Decided by | Single line text | New |
| Decision source | Single line text | New |
| Entered by | Single line text | New |
| Shot guide ID | Lookup of Guide ID through Shot guide | New |
| Decision content | Formula (below) | New |
| Decided content | Long text | New |
| Decision recorded at | Date, with time | New |
| Recorded guide | Link to Shot guides; paired with Shot guides › Products (recorded) | New |
| Recorded guide ID | Single line text | New |
| Record result | Long text | New |
| Record changed at | Last modified time of: Decided content, Recorded guide, Recorded guide ID | New |
| Record check | Formula (below) | New |
| Record intact | Formula (below) | New |
| Assignment check | Formula (below) | New |
| Assigned guide ID | Formula (below) | New |
| Recorded guide adopted definition | Lookup of Adopted definition through Recorded guide | New |
| Recorded guide check | Lookup of Adopted definition check through Recorded guide | New |
| Recorded guide complete | Lookup of Complete through Recorded guide | New |
| Recorded guide status | Lookup of Status through Recorded guide | New |
| Recorded guide name | Lookup of Name through Recorded guide | New |
| Briefs | Link to Briefs; paired with Briefs › Products | Existing |
| Product lines | Link to Product lines; paired with Product lines › Product | New |
| Product-page slots | Link to Product-page slots; paired with Product-page slots › Product | New |
| Record decision | Button: runs S7, kind "product" | New |

</details>

<details><summary><b>References</b> (changed table, 11 fields)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | Existing |
| Role | Single select: Light / Palette / Material / Restraint / Atmosphere | Existing |
| Applies to | Single select: Whole brand / This brief | Existing |
| What it may decide | Long text | Existing |
| Image | Attachment | Existing |
| Test | Checkbox | New |
| Image updated | Last modified time of: Image | Existing |
| Reference line | Formula (below) | Existing |
| Prompt line | Formula (below) | Existing |
| Has image | Formula (below) | New |
| Briefs | Link to Briefs; paired with Briefs › References | Existing |

</details>

<details><summary><b>Briefs</b> (changed table, 34 fields and 2 buttons)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | Existing |
| Workflow | Single select: Product pages / Collection / Marketing / Campaign / Walkthrough | New |
| Purpose | Long text | Existing |
| Direction | Long text | Existing |
| What may vary | Long text | Existing |
| Products | Link to Products; paired with Products › Briefs | Existing |
| References | Link to References; paired with References › Briefs | Existing |
| Shot guide (collection) | Link to Shot guides; paired with Shot guides › Requests | New |
| Message to carry | Long text | New |
| Slot planning note | Long text | New |
| Shot planning note | Long text | New |
| Supersedes | Link to Briefs; paired with Briefs › Superseded by | New |
| Test | Checkbox | New |
| Request ID | Formula (below) | New |
| Guide ID | Lookup of Guide ID through Shot guide (collection) | New |
| Guide complete | Lookup of Complete through Shot guide (collection) | New |
| Superseded | Count of Superseded by | New |
| Line count | Count of Product lines | New |
| Reference has image | Lookup of Has image through References | New |
| References complete | Formula (below) | New |
| Product facts | Lookup of Product facts through Products | Existing |
| Reference lines | Lookup of Reference line through References | Existing |
| Product prompt | Lookup of Prompt line through Products | Existing |
| Reference prompts | Lookup of Prompt line through References | Existing |
| Reference images | Lookup of Image through References | Existing |
| Brief standard | Formula (below) | Existing |
| Brief prompt | Formula (below) | Existing |
| Request standard | Formula (below) | New |
| Request prompt | Formula (below) | New |
| Reference prompt | Formula (below) | New |
| Superseded by | Link to Briefs; paired with Briefs › Supersedes | New |
| Product lines | Link to Product lines; paired with Product lines › Request | New |
| Product-page slots | Link to Product-page slots; paired with Product-page slots › Request | New |
| Shots | Link to Shots; paired with Shots › Brief | Existing |
| Make product slots | Button: runs S1 | New |
| Make shots | Button: runs S2 | New |

</details>

<details><summary><b>Product lines</b> (new table, 26 fields)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Formula (below) | Primary (new): created by connector as Single line text, then converted to this formula in the UI (Install) |
| Request | Link to Briefs; paired with Briefs › Product lines | New |
| Product | Link to Products; paired with Products › Product lines | New |
| Test | Checkbox | New |
| Line ID | Formula (below) | New |
| Request ID | Lookup of Request ID through Request | New |
| Request name | Lookup of Name through Request | New |
| Request workflow | Lookup of Workflow through Request | New |
| Request superseded | Lookup of Superseded through Request | New |
| Product ID | Lookup of Product ID through Product | New |
| Product name | Lookup of Name through Product | New |
| Assigned guide ID | Lookup of Assigned guide ID through Product | New |
| Product share key | Lookup of Product share key through Product | New |
| Share signature | Lookup of Share signature through Product | New |
| Product facts (lines) | Lookup of Product facts (lines) through Product | New |
| Facts without size | Lookup of Facts without size through Product | New |
| Shared facts line | Lookup of Shared facts line through Product | New |
| Prompt line (lines) | Lookup of Prompt line (lines) through Product | New |
| Shared prompt line | Lookup of Shared prompt line through Product | New |
| Size | Lookup of Size through Product | New |
| Image | Lookup of Image through Product | New |
| Has image | Lookup of Has image through Product | New |
| Product basis line | Formula (below) | New |
| Live slot keys | Rollup of Live key through Product-page slots: `ARRAYJOIN(ARRAYCOMPACT(values), "¦")` | New |
| Product-page slots | Link to Product-page slots; paired with Product-page slots › Line | New |
| Shots | Link to Shots; paired with Shots › Lines in shot | New |

</details>

<details><summary><b>Product-page slots</b> (new table, 135 fields and 2 buttons)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | New |
| Line | Link to Product lines; paired with Product lines › Product-page slots | New |
| Guide slot | Link to Guide slots; paired with Guide slots › Product-page slots | New |
| Product | Link to Products; paired with Products › Product-page slots | New |
| Request | Link to Briefs; paired with Briefs › Product-page slots | New |
| Kept definition line | Long text | New |
| Kept guide ID | Single line text | New |
| Kept product ID | Single line text | New |
| Kept guide version | Number | New |
| Kept guide name | Single line text | New |
| Kept slot name | Single line text | New |
| Kept position | Number | New |
| Kept placement label | Single line text | New |
| Kept view | Long text | New |
| Kept required | Single line text | New |
| Kept fill rule | Single line text | New |
| Plan kept | Checkbox | New |
| Kept plan written at | Date, with time | New |
| Fulfillment | Single select: Make / Share / An accepted image | New |
| Fulfillment reason | Long text | New |
| Not needed | Checkbox | New |
| Not needed reason | Long text | New |
| Decided by | Single line text | New |
| Decision source | Single line text | New |
| Entered by | Single line text | New |
| Decision content | Formula (below) | New |
| Decided content | Long text | New |
| Decision recorded at | Date, with time | New |
| Recorded fulfillment | Single line text | New |
| Recorded not needed | Checkbox | New |
| Recorded summary | Single line text | New |
| Record result | Long text | New |
| Withdrawn | Checkbox | New |
| Duplicate of | Link to Product-page slots; paired with Product-page slots › Duplicated by | New |
| Shot | Link to Shots; paired with Shots › Slots filled | New |
| Detach log | Long text | New |
| Test | Checkbox | New |
| Slot ID | Formula (below) | New |
| Line ID | Lookup of Line ID through Line | New |
| Line request ID | Lookup of Request ID through Line | New |
| Line product ID | Lookup of Product ID through Line | New |
| Line live keys | Lookup of Live slot keys through Line | New |
| Request ID | Lookup of Request ID through Request | New |
| Request superseded | Lookup of Superseded through Request | New |
| Request shot planning note | Lookup of Shot planning note through Request | New |
| Guide-slot ID | Lookup of Guide-slot ID through Guide slot | New |
| Guide slot definition line | Lookup of Definition line through Guide slot | New |
| Guide slot guide ID | Lookup of Guide ID through Guide slot | New |
| Guide slot required | Lookup of Required through Guide slot | New |
| Guide slot fill rule | Lookup of Fill rule through Guide slot | New |
| Product name | Lookup of Name through Product | New |
| Assigned guide ID | Lookup of Assigned guide ID through Product | New |
| Product record intact | Lookup of Record intact through Product | New |
| Guide adopted definition | Lookup of Recorded guide adopted definition through Product | New |
| Guide adoption check | Lookup of Recorded guide check through Product | New |
| Guide complete | Lookup of Recorded guide complete through Product | New |
| Share signature | Lookup of Share signature through Line | New |
| Size | Lookup of Size through Line | New |
| Live shot count | Count of Shot, only linked records where Not withdrawn is 1 | New |
| Duplicate of count | Count of Duplicate of | New |
| Shot made as | Lookup of Made as through Shot, only linked records where Not withdrawn is 1 | New |
| Shot name | Lookup of Name through Shot, only linked records where Not withdrawn is 1 | New |
| Shot accepted count | Lookup of Accepted count through Shot, only linked records where Not withdrawn is 1 | New |
| Shot accepted slots kept | Lookup of Accepted slots kept through Shot, only linked records where Not withdrawn is 1 | New |
| Shot active slots filled | Lookup of Active slots filled through Shot, only linked records where Not withdrawn is 1 | New |
| Shot active products | Lookup of Active slot products through Shot, only linked records where Not withdrawn is 1 | New |
| Decided content changed at | Last modified time of: Decided content | New |
| Record changed at | Last modified time of: Decided content, Recorded fulfillment, Recorded not needed, Recorded summary | New |
| Kept plan changed at | Last modified time of: Kept definition line, Kept guide ID, Kept product ID, Kept guide version, Kept guide name, Kept slot name, Kept position, Kept placement label, Kept view, Kept required, Kept fill rule, Plan kept | New |
| Slot key | Formula (below) | New |
| Live key | Formula (below) | New |
| Key count | Formula (below) | New |
| Record check | Formula (below) | New |
| Kept plan check | Formula (below) | New |
| Record intact | Formula (below) | New |
| Held | Formula (below) | New |
| Has decision | Formula (below) | New |
| Pending use decisions | Rollup of Pending fixed through Use decisions: `SUM(values)` | New |
| Carries decision | Formula (below) | New |
| Duplicate key | Lookup of Slot key through Duplicate of | New |
| Duplicate withdrawn | Lookup of Withdrawn through Duplicate of | New |
| Duplicate held | Lookup of Held through Duplicate of | New |
| Duplicate has decision | Lookup of Has decision through Duplicate of | New |
| Duplicate decided at | Lookup of Decided content changed at through Duplicate of | New |
| Withdrawal | Formula (below) | New |
| Validly withdrawn | Formula (below) | New |
| Fill rule fulfillment | Formula (below) | New |
| Operative fulfillment | Formula (below) | New |
| Departure | Formula (below) | New |
| Change pending | Formula (below) | New |
| In adopted plan | Formula (below) | New |
| Stale by adoption | Formula (below) | New |
| Obligation unchanged | Formula (below) | New |
| Waived | Formula (below) | New |
| Replan reach | Formula (below) | New |
| Active | Formula (below) | New |
| Matches its shot | Formula (below) | New |
| Shot accepted | Formula (below) | New |
| Covered | Formula (below) | New |
| Slot ok | Formula (below) | New |
| Shot-guide check | Formula (below) | New |
| Pickup ok | Formula (below) | New |
| Receiving basis | Formula (below) | New |
| Receiving basis without size | Formula (below) | New |
| Basis line | Formula (below) | New |
| Shot basis line | Formula (below) | New |
| Kept destination now | Formula (below) | New |
| Lineage line | Formula (below) | New |
| Active slot ID | Formula (below) | New |
| Active line ID | Formula (below) | New |
| Active share signature | Formula (below) | New |
| Active product name | Formula (below) | New |
| Active placement label | Formula (below) | New |
| Active view | Formula (below) | New |
| Active guide-slot ID | Formula (below) | New |
| Active definition line | Formula (below) | New |
| Active operative fulfillment | Formula (below) | New |
| Not ok | Formula (below) | New |
| Guide changed | Formula (below) | New |
| In use count | Rollup of In use flag through Applications: `SUM(values)` | New |
| In-use states | Rollup of In use state through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| In-use bases | Rollup of In use basis through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| In-use replaces | Rollup of In use replaces through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| In-use titles | Rollup of In use title through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| In-use labels | Rollup of In use label through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| In-use eligibility | Rollup of In use eligibility through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| Alternate titles | Rollup of Alternate title through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), ", ")` | New |
| Settled image | Rollup of Settled source image through Applications: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| Placement state | Formula (below) | New |
| Status | Formula (below) | New |
| Replan result | Long text | New |
| Product facts | Lookup of Product facts through Product | New |
| Duplicated by | Link to Product-page slots; paired with Product-page slots › Duplicate of | New |
| Applications | Link to Applications; paired with Applications › Slot | New |
| Use decisions | Link to Use decisions; paired with Use decisions › Slots | New |
| Record decision | Button: runs S7, kind "slot" | New |
| Replan | Button: runs S3, kind "slot" | New |

</details>

<details><summary><b>Shots</b> (changed table, 87 fields and 1 button)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Single line text | Existing |
| Brief | Link to Briefs; paired with Briefs › Shots | Existing |
| Lines in shot | Link to Product lines; paired with Product lines › Shots | New |
| From guide slot | Link to Guide slots; paired with Guide slots › Shots | New |
| Made as | Single select: Make / Share / Collection | New |
| Placement | Single line text | Existing |
| Shot direction | Long text | Existing |
| Products confirmed | Checkbox | New |
| Kept guide plan | Long text | New |
| Pair key | Single line text | New |
| Exception | Long text | New |
| Exception reason | Long text | New |
| Exception set by | Single line text | New |
| Exception set at | Date, with time | New |
| Withdrawn | Checkbox | New |
| Note | Long text | New |
| Test | Checkbox | New |
| Shot ID | Formula (below) | New |
| Not withdrawn | Formula (below) | New |
| Confirmed at | Last modified time of: Products confirmed | New |
| Lines changed at | Last modified time of: Lines in shot | New |
| Brief count | Count of Brief | New |
| Lines in shot count | Count of Lines in shot | New |
| Workflow | Lookup of Workflow through Brief | New |
| Request superseded | Lookup of Superseded through Brief | New |
| Request line count | Lookup of Line count through Brief | New |
| Request ID | Lookup of Request ID through Brief | New |
| Brief standard | Lookup of Brief standard through Brief | Existing |
| Brief prompt | Lookup of Brief prompt through Brief | Existing |
| Request standard | Lookup of Request standard through Brief | New |
| Request prompt | Lookup of Request prompt through Brief | New |
| Reference prompt | Lookup of Reference prompt through Brief | New |
| References complete | Lookup of References complete through Brief | New |
| Reference images | Lookup of Reference images through Brief | Existing |
| Collection guide ID | Lookup of Guide ID through Brief | New |
| Collection guide complete | Lookup of Guide complete through Brief | New |
| Guide slot definition line | Lookup of Definition line through From guide slot | New |
| Guide slot guide ID | Lookup of Guide ID through From guide slot | New |
| Guide slot includes | Lookup of Includes through From guide slot | New |
| Guide slot choose count | Lookup of Choose count through From guide slot | New |
| Line IDs | Lookup of Line ID through Lines in shot | New |
| Line request IDs | Rollup of Request ID through Lines in shot: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Line share signature | Lookup of Share signature through Lines in shot | New |
| Line facts | Lookup of Product facts (lines) through Lines in shot | New |
| Line shared facts | Lookup of Shared facts line through Lines in shot | New |
| Line prompt lines | Lookup of Prompt line (lines) through Lines in shot | New |
| Line shared prompt lines | Lookup of Shared prompt line through Lines in shot | New |
| Line product has image | Lookup of Has image through Lines in shot | New |
| Line product basis | Lookup of Product basis line through Lines in shot | New |
| Product image | Lookup of Image through Lines in shot | Changed: repointed in the UI to look up Image through Lines in shot (today through Brief) |
| Active slots filled | Rollup of Active through Slots filled: `SUM(values)` | New |
| Held slots | Rollup of Held through Slots filled: `SUM(values)` | New |
| Slots not ok | Rollup of Not ok through Slots filled: `SUM(values)` | New |
| Slots guide changed | Rollup of Guide changed through Slots filled: `SUM(values)` | New |
| Active slot lines | Rollup of Active line ID through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Share signatures | Rollup of Active share signature through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Active slot products | Rollup of Active product name through Slots filled: `ARRAYJOIN(ARRAYCOMPACT(values), ", ")` | New |
| Active placement labels | Rollup of Active placement label through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Active views | Rollup of Active view through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Active guide-slot IDs | Rollup of Active guide-slot ID through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Active definition lines | Rollup of Active definition line through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Active fulfillments | Rollup of Active operative fulfillment through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "¦")` | New |
| Active lineage | Rollup of Lineage line through Slots filled: `ARRAYJOIN(ARRAYUNIQUE(ARRAYCOMPACT(ARRAYFLATTEN(values))), "\n")` | New |
| Slot IDs | Rollup of Active slot ID through Slots filled: `ARRAYJOIN(ARRAYCOMPACT(values), ", ")` | New |
| Current slot basis | Rollup of Shot basis line through Slots filled: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| Accepted count | Rollup of Is accepted through Candidates: `SUM(values)` | New |
| Accepted slots kept | Rollup of Accepted slots kept through Candidates: `ARRAYJOIN(ARRAYCOMPACT(values), "\n")` | New |
| Title | Formula (below) | Existing |
| Acceptance coverage | Rollup of Coverage through Accepted images: `ARRAYJOIN(values, "\|")` (the build copy's field settings) | Existing |
| Sharing check | Formula (below) | New |
| Current product basis | Formula (below) | New |
| Effective placement | Formula (below) | New |
| Prompt placement | Formula (below) | New |
| Effective direction | Formula (below) | New |
| Lineage | Formula (below) | New |
| Confirmation current | Formula (below) | New |
| Plan check | Formula (below) | New |
| Planned | Formula (below) | New |
| Shot-guide check | Formula (below) | New |
| Current standard | Formula (below) | Changed: a Workflow branch; the default branch keeps today's text |
| Current prompt | Formula (below) | Changed: a Workflow branch; the default branch keeps today's text |
| Decision | Formula (below) | Changed: reads Effective placement instead of Placement |
| Can generate | Formula (below) | Changed: requires Planned = 1 |
| Replan result | Long text | New |
| Slots filled | Link to Product-page slots; paired with Product-page slots › Shot | New |
| Candidates | Link to Candidates; paired with Candidates › Shot | Existing |
| Accepted images | Link to Accepted images; paired with Accepted images › Shot | Existing |
| Replan | Button: runs S3, kind "shot" | New |

</details>

<details><summary><b>Candidates</b> (changed table, 33 fields)</summary>

| Field | Type | Status |
|---|---|---|
| Record no. | Autonumber | Existing |
| Shot | Link to Shots; paired with Shots › Candidates | Existing |
| Number in shot | Number | Existing |
| Test | Checkbox | Existing |
| Image | Attachment | Existing |
| Generated at | Last modified time of: Image | Existing |
| Generate when ready | Checkbox | Existing |
| Generate requested | Checkbox | Existing |
| Standard used | Long text | Existing |
| Prompt used | Long text | Existing |
| Intended use | Single line text | Existing |
| Product image used | Attachment | Existing |
| Reference images used | Attachment | Existing |
| Input check | Long text | Existing |
| Slots kept | Long text | New |
| Products kept | Long text | New |
| Shot name | Lookup of Title through Shot | Existing |
| Current standard | Lookup of Current standard through Shot | Existing |
| Shot planned values | Rollup of Planned through Shot: `SUM(values)` | New |
| Shot count | Count of Shot | New |
| Shot withdrawn | Rollup of Withdrawn through Shot: `OR(values)` | New |
| Current slot basis | Lookup of Current slot basis through Shot | New |
| Current product basis | Lookup of Current product basis through Shot | New |
| Current intended use | Lookup of Effective placement through Shot | Changed: repointed in the UI to look up Effective placement |
| Title | Formula (below) | Existing |
| Has image | Formula (below) | Existing |
| Shot planned | Formula (below) | New |
| Standard check | Formula (below) | Existing |
| Ready | Formula (below) | Changed: two held labels for a candidate that has never had an image; the standard label also needs a non-empty Standard check (a departure from v6 §7.6, for review) |
| Status | Formula (below) | Changed: one held branch, after its first branch |
| Is accepted | Formula (below) | New |
| Accepted slots kept | Formula (below) | New |
| Accepted images | Link to Accepted images; paired with Accepted images › Candidate record no. | Existing |

</details>

<details><summary><b>Accepted images</b> (changed table, 24 fields and 1 button)</summary>

| Field | Type | Status |
|---|---|---|
| Recorded as | Single line text | Existing |
| Candidate record no. | Link to Candidates; paired with Candidates › Accepted images | Existing |
| Shot | Link to Shots; paired with Shots › Accepted images | Existing |
| Image | Attachment | Existing |
| Approved for | Single line text | Existing |
| Standard | Long text | Existing |
| Accepted by | Single line text | Existing |
| Accepted by ID | Single line text | Existing |
| Accepted at | Created time | Existing |
| Test | Checkbox | Existing |
| Record complete | Formula (below) | Existing |
| Candidate is test | Rollup of Test through Candidate record no.: `OR(values)` (the build copy's field settings) | Existing |
| Shot standard now | Lookup of Current standard through Shot | Existing |
| Coverage | Formula (below) | Existing |
| Candidate title now | Lookup of Title through Candidate record no. | Existing |
| Current title | Formula (below) | Existing |
| Applications done | Checkbox | New |
| Application progress | Long text | New |
| Accepted ID | Formula (below) | New |
| Slots kept | Lookup of Slots kept through Candidate record no. | New |
| Products kept | Lookup of Products kept through Candidate record no. | New |
| Source current | Formula (below) | New |
| Applications | Link to Applications; paired with Applications › Accepted image | New |
| Use decisions | Link to Use decisions; paired with Use decisions › Accepted image | New |
| Retry applications | Button: runs S4; on no public page | New |

</details>

<details><summary><b>Applications</b> (new table, 60 fields)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Formula (below) | Primary (new): created by connector as Single line text, then converted to this formula in the UI (Install) |
| Accepted image | Link to Accepted images; paired with Accepted images › Applications | New |
| Slot | Link to Product-page slots; paired with Product-page slots › Applications | New |
| Application key | Single line text | New |
| Basis | Single select: Accepted for this use / Use decision | New |
| Use decision | Link to Use decisions; paired with Use decisions › Applications | New |
| Kept destination | Long text | New |
| Kept receiving basis | Long text | New |
| Kept label | Single line text | New |
| Recorded at | Date, with time | New |
| Account | Single line text | New |
| Current | Checkbox | New |
| Current set at | Date, with time | New |
| Replaces | Link to Applications; paired with Applications › Named in Replaces | New |
| Replaced by | Link to Applications; paired with Applications › Named in Replaced by | New |
| Replaced at | Date, with time | New |
| Withdrawn | Checkbox | New |
| Test | Checkbox | New |
| Application ID | Formula (below) | New |
| Current changed at | Last modified time of: Current | New |
| Product | Lookup of Product name through Slot | New |
| Position | Lookup of Kept position through Slot | New |
| Slot name | Lookup of Name through Slot | New |
| Slot active | Lookup of Active through Slot | New |
| Slot held | Lookup of Held through Slot | New |
| Slot waived | Lookup of Waived through Slot | New |
| Slot in adopted plan | Lookup of In adopted plan through Slot | New |
| Slot kept slot name | Lookup of Kept slot name through Slot | New |
| Slot kept destination | Lookup of Kept destination now through Slot | New |
| Slot receiving basis | Lookup of Receiving basis through Slot | New |
| Slot receiving basis without size | Lookup of Receiving basis without size through Slot | New |
| Slot in use count | Lookup of In use count through Slot | New |
| Slot in-use replaces | Lookup of In-use replaces through Slot | New |
| Slot plan changed | Lookup of Kept plan changed at through Slot | New |
| Source complete | Lookup of Record complete through Accepted image | New |
| Source ID | Lookup of Accepted ID through Accepted image | New |
| Source title | Lookup of Current title through Accepted image | New |
| Source image | Lookup of Image through Accepted image | New |
| Source applications done | Lookup of Applications done through Accepted image | New |
| Decision applied | Lookup of Applied through Use decision | New |
| Decision record intact | Lookup of Record intact through Use decision | New |
| Replaced by name | Lookup of Name through Replaced by | New |
| Replaces IDs | Lookup of Application ID through Replaces | New |
| Replaces in use | Lookup of In use flag through Replaces | New |
| Current check | Formula (below) | New |
| Eligibility | Formula (below) | New |
| Basis finished | Formula (below) | New |
| State | Formula (below) | New |
| Delivery name | Formula (below) | New |
| In use flag | Formula (below) | New |
| In use state | Formula (below) | New |
| In use basis | Formula (below) | New |
| In use replaces | Formula (below) | New |
| In use title | Formula (below) | New |
| In use label | Formula (below) | New |
| In use eligibility | Formula (below) | New |
| Alternate title | Formula (below) | New |
| Settled source image | Formula (below) | New |
| Named in Replaces | Link to Applications; paired with Applications › Replaces | New |
| Named in Replaced by | Link to Applications; paired with Applications › Replaced by | New |

</details>

<details><summary><b>Use decisions</b> (new table, 30 fields and 1 button)</summary>

| Field | Type | Status |
|---|---|---|
| Name | Formula (below) | Primary (new): created by connector as Single line text, then converted to this formula in the UI (Install) |
| Accepted image | Link to Accepted images; paired with Accepted images › Use decisions | New |
| Slots | Link to Product-page slots; paired with Product-page slots › Use decisions | New |
| Replace | Checkbox | New |
| Conditions | Long text | New |
| Facts reviewed | Checkbox | New |
| Decided by | Single line text | New |
| Decision source | Single line text | New |
| Entered by | Single line text | New |
| Decided basis | Long text | New |
| Decided at | Date, with time | New |
| Decided selection | Long text | New |
| Decision label | Single line text | New |
| Result | Long text | New |
| Ended slots | Long text; written only by S5 | New |
| Applied | Checkbox | New |
| Test | Checkbox | New |
| Decision ID | Formula (below) | New |
| Source ID | Lookup of Accepted ID through Accepted image | New |
| Source title | Lookup of Current title through Accepted image | New |
| Slot basis lines | Rollup of Basis line through Slots: `ARRAYJOIN(values, "\n")` | New |
| Record changed at | Last modified time of: Decided basis, Decided selection, Decided at | New |
| Application count | Count of Applications | New |
| Slot count | Count of Slots | New |
| Live basis | Formula (below) | New |
| Record intact | Formula (below) | New |
| Basis check | Formula (below) | New |
| Pending fixed | Formula (below) | New |
| Progress | Formula (below) | New |
| Applications | Link to Applications; paired with Applications › Use decision | New |
| Apply this decision | Button: runs S5 | New |

</details>

**Payloads that Snapshot keeps,** and that S4 and S5 parse (§6, §7.6). Snapshot copies them verbatim, and its change is outside this folder:
- **Slots kept** is the shot's Current slot basis: one line per active slot the shot fills, `slot ID ‖ Kept definition line ‖ product ID ‖ receiving basis`. A shot that fills more than one slot keeps the receiving basis without the size: `share signature ⟨size omitted⟩`, otherwise `share signature ⟨size: Size⟩`.
- **Products kept** is the shot's Current product basis: one line per line in the shot, `product ID | share key | Facts without size | Size | size shown` (or `size omitted`).

## Formula texts

Each text below is the `airtable` text of one formula in [`sim/formulas.mjs`](sim/formulas.mjs), one for one, in its order. The sim computes each formula with the JavaScript function beside that text, not from the text itself.

**Change both or neither.** When a formula changes, change its text here, its text in `sim/formulas.mjs` and its function there together.

**Status:**
- **New:** install the text as written.
  - **New; proposal:** v6 names the field and what it holds, not its text, so the text is this source's. The Request texts carry v3 §4's content.
- **Primary (new):** a new table's primary field: created as Single line text "Name", then converted in the UI to this text ([Install](#install)).
- **Changed:** replace the live formula with this exact text, after saving the old text as its rollback (§7.8). Each is the live text plus only v6's change, which its status names: nothing is spliced into the live text at install.
- **Existing, not changed: the live text:** the live formula this unit reads and leaves alone, with field names for field IDs. **Don't install it.**

The live texts are read from the build copy, whose schema is the live base's: `sim/formulas.mjs` holds them as `LIVE`, and each Changed text is built from its `LIVE` text. Eight of them (Product facts, Prompt line, Current standard, Current prompt, Decision, Can generate, Ready and Status) were also read from the live base itself, and are the same.

**What has been checked:**
- SCHEMA-refs checks that every `{field}` a text names exists in its table, and that no text holds a placeholder. Its control shows a misspelt field caught.
- LIVE-unchanged checks that each existing formula is its `LIVE` text, and LIVE-changed that each Changed text is its `LIVE` text with only its change: the default branch of Current standard and Current prompt, Decision's one field, Ready's wrapper and Status's one branch.
- LIVE-7.8 checks, on a walkthrough shot and its candidates, that the Changed formulas' JavaScript gives the values the live texts give, written out by hand (§7.8), and that the held labels apply only to an imageless candidate. CTRL-LIVE-ready is its control.
- Nothing in the tests checks a text against its JavaScript function in general, or runs a text in Airtable. The build copy is the first place they run (§9.1 step 4).
- TEXT-readme checks that every text here is its `sim/formulas.mjs` text, character for character, and that every formula there has its text here. CTRL-TEXT-readme is its control.

<details><summary><b>Shot guides</b> (7 formulas)</summary>

**Shot guides › Guide ID** · New

```text
RECORD_ID()
```

**Shot guides › Definition** · New

```text
{Guide ID} & " · " & {Destination} & "\n" & {Slot definitions}
```

**Shot guides › Decision content** · New

```text
"Definition:\n" & {Definition} & "\nDecided by: " & {Decided by} & "\nDecision source: " & {Decision source} & "\nEntered by: " & {Entered by}
```

**Shot guides › Adopted definition check** · New

```text
IF(IF({Adopted at} = BLANK(), OR({Adopted definition}, {Adopted version}, {Decided content}), AND({Adopted definition changed at} != BLANK(), DATETIME_DIFF({Adopted definition changed at}, {Adopted at}, 'seconds') > 60)), "Edited by hand", "")
```

**Shot guides › Complete** · New

```text
IF(AND({Adopted definition} != "", {Adopted definition check} = "", {Definition} = {Adopted definition}, {Active slots} >= 1, {Slots incomplete} = 0), 1, 0)
```

**Shot guides › Status** · New

```text
IF(AND({Adopted definition} = "", {Adopted version} = BLANK()), "Proposed",
IF({Adopted definition check}, "Edited by hand: adopt the guide again",
IF({Active slots} < 1, "Incomplete: no active slot",
IF({Slots incomplete} > 0, "Incomplete: " & {Incomplete slot names} & " needs a placement label and a view",
IF({Complete}, "Adopted, version " & {Adopted version}, "Changed since adoption: adopt again")))))
```

**Shot guides › Guide check** · New

```text
{Status}
```

</details>

<details><summary><b>Guide slots</b> (6 formulas)</summary>

**Guide slots › Guide ID** · New

```text
ARRAYJOIN({Guide ID (from Guide)})
```

**Guide slots › Guide-slot ID** · New

```text
RECORD_ID()
```

**Guide slots › Definition line** · New

```text
"⟦" & {Guide ID} & " | " & {Guide-slot ID} & " | " & {Name} & " | " & {Position} & " | " & {Placement label} & " | " & {Required} & " | " & {Fill rule} & " | " & {Includes} & " | " & {Choose count} & " | " & IF({Retired}, "retired", "active") & " | " & {View} & "⟧"
```

**Guide slots › Is active** · New

```text
IF({Retired}, 0, 1)
```

**Guide slots › Is incomplete** · New

```text
IF(AND(NOT({Retired}), OR({Placement label} = "", {View} = "")), 1, 0)
```

**Guide slots › Incomplete name** · New

```text
IF({Is incomplete}, {Name}, "")
```

</details>

<details><summary><b>Products</b> (16 formulas)</summary>

**Products › Product ID** · New

```text
RECORD_ID()
```

**Products › Product facts** · Existing, not changed: the live text; don't install it

```text
{Name} & ". Must stay true: " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & ". Product image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."
```

**Products › Prompt line** · Existing, not changed: the live text; don't install it

```text
{Name} & ". " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & "."
```

**Products › Product share key** · New

```text
{Style} & " / " & {Color}
```

**Products › Facts without size** · New; proposal: today's Product facts text without the product's name, its image time and its size (v6 §3); checked against the live text

```text
"Must stay true: " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & "."
```

**Products › Share signature** · New

```text
{Product share key} & " | " & {Facts without size}
```

**Products › Product facts (lines)** · New; proposal: ends with the live Product facts' image time

```text
{Product share key} & ": " & {Facts without size} & IF({Size}, " Size: " & {Size} & ".", "") & " Product image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."
```

**Products › Shared facts line** · New; proposal: ends with the live Product facts' image time

```text
{Product share key} & ": " & {Facts without size} & " Product image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."
```

**Products › Prompt line (lines)** · New; proposal: today's Prompt line text, with the size (v3 §5.1)

```text
{Name} & ". " & {Must stay true} & " Material: " & {Material} & ". Finish: " & {Finish} & "." & IF({Size}, " Size: " & {Size} & ".", "")
```

**Products › Shared prompt line** · New; proposal: style and color with no product name and no size (§7.1), then Facts without size

```text
{Style} & ", " & {Color} & ". " & {Facts without size}
```

**Products › Has image** · New

```text
IF(AND({Image}, FIND(",", {Image} & "") = 0), 1, 0)
```

**Products › Decision content** · New

```text
"Shot guide: " & ARRAYJOIN({Shot guide ID}, ", ") & "\nAssignment basis: " & {Assignment basis} & "\nDecided by: " & {Decided by} & "\nDecision source: " & {Decision source} & "\nEntered by: " & {Entered by}
```

**Products › Record check** · New

```text
IF(IF({Decision recorded at} = BLANK(), OR({Decided content}, {Recorded guide}, {Recorded guide ID}), AND({Record changed at} != BLANK(), DATETIME_DIFF({Record changed at}, {Decision recorded at}, 'seconds') > 60)), "Edited by hand", "")
```

**Products › Record intact** · New

```text
IF({Record check} = "", 1, 0)
```

**Products › Assignment check** · New

```text
IF({Decided content} = "", "Assignment not recorded", IF({Decision content} = {Decided content}, "Recorded", "Recorded; a change waits for its decision record"))
```

**Products › Assigned guide ID** · New

```text
{Recorded guide ID}
```

</details>

<details><summary><b>References</b> (3 formulas)</summary>

**References › Reference line** · Existing, not changed: the live text; don't install it

```text
{Name} & " (" & {Role} & ", " & {Applies to} & "): " & {What it may decide} & " Image as of " & IF({Image updated}, DATETIME_FORMAT({Image updated}, 'YYYY-MM-DD HH:mm:ss'), "(no image)") & " UTC."
```

**References › Prompt line** · Existing, not changed: the live text; don't install it

```text
{Role} & " reference: " & {What it may decide}
```

**References › Has image** · New

```text
IF(AND({Image}, FIND(",", {Image} & "") = 0), 1, 0)
```

</details>

<details><summary><b>Briefs</b> (7 formulas)</summary>

**Briefs › Request ID** · New

```text
RECORD_ID()
```

**Briefs › References complete** · New

```text
IF(AND(COUNTA({References}) > 0, MIN({Reference has image}) = 1), 1, 0)
```

**Briefs › Brief standard** · Existing, not changed: the live text; don't install it

```text
"Purpose: " & {Purpose} & "\nDirection: " & {Direction} & "\nWhat may vary: " & {What may vary} & "\nProduct: " & ARRAYJOIN({Product facts}, " ") & "\nReferences:\n" & ARRAYJOIN({Reference lines}, "\n")
```

**Briefs › Brief prompt** · Existing, not changed: the live text; don't install it

```text
"Direction: " & {Direction} & "\n\nWhat may vary: " & {What may vary} & "\n\nThe first attached image is the product image. It is the authority for the product: " & ARRAYJOIN({Product prompt}, " ") & " Do not redesign, substitute, embellish or alter the product.\n\nThe remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\n" & ARRAYJOIN({Reference prompts}, "\n")
```

**Briefs › Request standard** · New; proposal: v3 §4's content (purpose, direction, what may vary, the message to carry, the workflow, the references' lines), in the live Brief standard's wording

```text
"Purpose: " & {Purpose} & "\nDirection: " & {Direction} & "\nWhat may vary: " & {What may vary} & IF({Message to carry}, "\nMessage to carry: " & {Message to carry}, "") & "\nWorkflow: " & {Workflow} & "\nReferences:\n" & ARRAYJOIN({Reference lines}, "\n")
```

**Briefs › Request prompt** · New; proposal: v3 §4's content (direction, what may vary, the message to carry), in the live Brief prompt's wording

```text
"Direction: " & {Direction} & "\n\nWhat may vary: " & {What may vary} & IF({Message to carry}, "\n\nMessage to carry: " & {Message to carry}, "")
```

**Briefs › Reference prompt** · New; proposal: v3 §4's references paragraph, worded as the live Brief prompt words it

```text
"The remaining attached images are references, in this order. Use each one only for its role. None of them may change the product.\n" & ARRAYJOIN({Reference prompts}, "\n")
```

</details>

<details><summary><b>Product lines</b> (3 formulas)</summary>

**Product lines › Name** · Primary (new): created by connector as Single line text, then converted to this formula in the UI (Install)

```text
ARRAYJOIN({Request name}) & " · " & ARRAYJOIN({Product name})
```

**Product lines › Line ID** · New

```text
RECORD_ID()
```

**Product lines › Product basis line** · New

```text
ARRAYJOIN({Product ID}) & " | " & ARRAYJOIN({Product share key}) & " | " & ARRAYJOIN({Facts without size}) & " | " & ARRAYJOIN({Size})
```

</details>

<details><summary><b>Product-page slots</b> (48 formulas)</summary>

**Product-page slots › Slot ID** · New

```text
RECORD_ID()
```

**Product-page slots › Slot key** · New

```text
ARRAYJOIN({Line ID}) & "/" & {Kept product ID} & "/" & {Kept guide ID} & "/" & ARRAYJOIN({Guide-slot ID})
```

**Product-page slots › Live key** · New

```text
IF({Validly withdrawn}, "", {Slot key})
```

**Product-page slots › Key count** · New

```text
(LEN(ARRAYJOIN({Line live keys})) - LEN(SUBSTITUTE(ARRAYJOIN({Line live keys}), {Slot key}, ""))) / LEN({Slot key})
```

**Product-page slots › Record check** · New

```text
IF(IF({Decision recorded at} = BLANK(), OR({Decided content}, {Recorded fulfillment}, {Recorded not needed}, {Recorded summary}), AND({Record changed at} != BLANK(), DATETIME_DIFF({Record changed at}, {Decision recorded at}, 'seconds') > 60)), "Edited by hand", "")
```

**Product-page slots › Kept plan check** · New

```text
IF(IF({Kept plan written at} = BLANK(), OR({Kept definition line}, {Kept guide ID}, {Kept product ID}, {Kept guide version}, {Kept guide name}, {Kept slot name}, {Kept position}, {Kept placement label}, {Kept view}, {Kept required}, {Kept fill rule}, {Plan kept}), AND({Kept plan changed at} != BLANK(), DATETIME_DIFF({Kept plan changed at}, {Kept plan written at}, 'seconds') > 60)), "Edited by hand", "")
```

**Product-page slots › Record intact** · New

```text
IF(AND({Record check} = "", {Kept plan check} = ""), 1, 0)
```

**Product-page slots › Held** · New

```text
IF(OR({Record intact} = 0, AND(COUNTA({Product record intact}) > 0, MIN({Product record intact}) = 0), FIND("Edited by hand", ARRAYJOIN({Guide adoption check})) > 0), 1, 0)
```

**Product-page slots › Has decision** · New

```text
IF({Decided content} != "", 1, 0)
```

**Product-page slots › Carries decision** · New

```text
IF(OR({Has decision}, {Pending use decisions} > 0), 1, 0)
```

**Product-page slots › Withdrawal** · New

```text
IF(NOT({Withdrawn}), "",
IF(OR({Duplicate of count} != 1, ARRAYJOIN({Duplicate key}) != {Slot key}, SUM({Duplicate withdrawn}) > 0), "Withdrawal not valid: name the record it duplicates",
IF(OR({Held}, SUM({Duplicate held}) > 0), "Withdrawal not valid: a record is edited by hand; record it again first",
IF(AND({Carries decision}, OR({Pending use decisions} > 0, SUM({Duplicate has decision}) = 0, IS_BEFORE(ARRAYJOIN({Duplicate decided at}), {Decided content changed at}))), "Withdrawal not valid: this record carries a decision; record it on the other first",
"Valid"))))
```

**Product-page slots › Validly withdrawn** · New

```text
IF({Withdrawal} = "Valid", 1, 0)
```

**Product-page slots › Fill rule fulfillment** · New

```text
SWITCH({Kept fill rule}, "Made for each product", "Make", "Shared across sizes of one style and color", "Share", "An accepted image that shows the product", "An accepted image", "")
```

**Product-page slots › Operative fulfillment** · New

```text
IF({Decided content} != "", {Recorded fulfillment}, {Fill rule fulfillment})
```

**Product-page slots › Departure** · New

```text
IF(OR({Operative fulfillment} != {Fill rule fulfillment}, AND({Recorded not needed}, {Kept required} = "Always")), 1, 0)
```

**Product-page slots › Decision content** · New

```text
"Fulfillment: " & {Fulfillment} & "\nFulfillment reason: " & {Fulfillment reason} & "\nNot needed: " & IF({Not needed}, "yes", "no") & "\nNot needed reason: " & {Not needed reason} & "\nDecided by: " & {Decided by} & "\nDecision source: " & {Decision source} & "\nEntered by: " & {Entered by}
```

**Product-page slots › Change pending** · New

```text
IF(IF({Decided content} != "", {Decision content} != {Decided content}, OR({Fulfillment} != {Fill rule fulfillment}, {Not needed})), "A change waits for its decision record", "")
```

**Product-page slots › In adopted plan** · New

```text
IF(AND({Kept guide ID} != "", {Kept guide ID} = ARRAYJOIN({Assigned guide ID}), {Kept product ID} = ARRAYJOIN({Line product ID}), {Kept definition line} != "", FIND({Kept definition line}, ARRAYJOIN({Guide adopted definition})) > 0, FIND(" | active | ", {Kept definition line}) > 0, SUM({Request superseded}) = 0), 1, 0)
```

**Product-page slots › Stale by adoption** · New

```text
IF(AND({Kept guide ID} != "", {Kept guide ID} = ARRAYJOIN({Assigned guide ID}), {Kept product ID} = ARRAYJOIN({Line product ID}), SUM({Request superseded}) = 0, ARRAYJOIN({Guide slot guide ID}) = {Kept guide ID}, FIND(ARRAYJOIN({Guide slot definition line}), ARRAYJOIN({Guide adopted definition})) > 0, FIND(" | active | ", ARRAYJOIN({Guide slot definition line})) > 0, FIND({Kept definition line}, ARRAYJOIN({Guide adopted definition})) = 0), 1, 0)
```

**Product-page slots › Obligation unchanged** · New

```text
IF(AND({Kept required} = ARRAYJOIN({Guide slot required}), {Kept fill rule} = ARRAYJOIN({Guide slot fill rule})), 1, 0)
```

**Product-page slots › Waived** · New

```text
IF(AND({Recorded not needed}, {Held} = 0), 1, 0)
```

**Product-page slots › Replan reach** · New

```text
IF(AND({Validly withdrawn} = 0, {Waived} = 0, {Held} = 0, OR({In adopted plan}, AND({Stale by adoption}, {Obligation unchanged}))), 1, 0)
```

**Product-page slots › Active** · New

```text
IF(AND({In adopted plan}, {Validly withdrawn} = 0, {Waived} = 0), 1, 0)
```

**Product-page slots › Matches its shot** · New

```text
IF(OR({Live shot count} = 0, ARRAYJOIN({Shot made as}) = {Operative fulfillment}), 1, 0)
```

**Product-page slots › Shot accepted** · New

```text
IF(SUM({Shot accepted count}) > 0, 1, 0)
```

**Product-page slots › Covered** · New

```text
IF(AND({Shot accepted}, FIND({Slot ID}, ARRAYJOIN({Shot accepted slots kept})) > 0), 1, 0)
```

**Product-page slots › Slot ok** · New

```text
IF(AND({Active}, OR({Operative fulfillment} = "Make", {Operative fulfillment} = "Share"), {Change pending} = "", {Held} = 0, {Key count} = 1, {Matches its shot}, ARRAYJOIN({Line request ID}) = ARRAYJOIN({Request ID})), 1, 0)
```

**Product-page slots › Shot-guide check** · New

```text
IF(AND({Kept definition line} = ARRAYJOIN({Guide slot definition line}), COUNTA({Guide complete}) > 0, MIN({Guide complete}) = 1, {In adopted plan}), "Same", "The shot guide changed since this was planned")
```

**Product-page slots › Pickup ok** · New

```text
IF(AND({Active}, {Operative fulfillment} = "An accepted image", {Change pending} = "", {Held} = 0, {Key count} = 1, {Plan kept}, {Shot-guide check} = "Same", {In use count} = 0), 1, 0)
```

**Product-page slots › Receiving basis** · New

```text
ARRAYJOIN({Share signature}) & " ⟨size: " & ARRAYJOIN({Size}) & "⟩"
```

**Product-page slots › Receiving basis without size** · New

```text
ARRAYJOIN({Share signature}) & " ⟨size omitted⟩"
```

**Product-page slots › Basis line** · New

```text
{Slot ID} & " ‖ " & {Kept definition line} & " ‖ " & {Kept product ID} & " ‖ " & {Receiving basis}
```

**Product-page slots › Shot basis line** · New

```text
IF({Active}, {Slot ID} & " ‖ " & {Kept definition line} & " ‖ " & {Kept product ID} & " ‖ " & IF(SUM({Shot active slots filled}) > 1, {Receiving basis without size}, {Receiving basis}), "")
```

**Product-page slots › Kept destination now** · New

```text
{Kept definition line} & " ‖ " & {Kept product ID}
```

**Product-page slots › Lineage line** · New

```text
IF({Active}, "Shot guide: " & {Kept guide name} & ", version " & {Kept guide version} & ", " & {Kept slot name} & " (guide " & {Kept guide ID} & ", guide slot " & ARRAYJOIN({Guide-slot ID}) & ").", "")
```

**Product-page slots › Active slot ID** · New

```text
IF({Active}, {Slot ID}, "")
```

**Product-page slots › Active line ID** · New

```text
IF({Active}, ARRAYJOIN({Line ID}), "")
```

**Product-page slots › Active share signature** · New

```text
IF({Active}, ARRAYJOIN({Share signature}), "")
```

**Product-page slots › Active product name** · New

```text
IF({Active}, ARRAYJOIN({Product name}), "")
```

**Product-page slots › Active placement label** · New

```text
IF({Active}, {Kept placement label}, "")
```

**Product-page slots › Active view** · New

```text
IF({Active}, {Kept view}, "")
```

**Product-page slots › Active guide-slot ID** · New

```text
IF({Active}, ARRAYJOIN({Guide-slot ID}), "")
```

**Product-page slots › Active definition line** · New

```text
IF({Active}, {Kept definition line}, "")
```

**Product-page slots › Active operative fulfillment** · New

```text
IF({Active}, {Operative fulfillment}, "")
```

**Product-page slots › Not ok** · New

```text
IF(AND({Active}, {Slot ok} = 0), 1, 0)
```

**Product-page slots › Guide changed** · New

```text
IF(AND({Active}, {Shot-guide check} != "Same"), 1, 0)
```

**Product-page slots › Placement state** · New

```text
IF(AND({In use count} = 1, {In-use states} = "In use"), "Settled",
IF(FIND("Unfinished", {In-use states}), "Unfinished",
IF(FIND("Replacement unfinished", {In-use states}), "Replacement unfinished",
IF(OR(FIND("Conflict", {In-use states}), {In use count} > 1), "Conflict",
IF(FIND("Needs review", {In-use states}), "Needs review", "")))))
```

**Product-page slots › Status** · New

```text
IF({Validly withdrawn}, "Withdrawn",
IF(LEFT({Withdrawal}, 20) = "Withdrawal not valid", {Withdrawal},
IF({Held}, IF({Kept plan check}, "Edited by hand: plan it in a new version of the request", IF({Record check}, "Edited by hand: check this slot's decision, then press Record decision to record it again", IF(AND(COUNTA({Product record intact}) > 0, MIN({Product record intact}) = 0), "Edited by hand: check the product's assignment, then press Record decision on the product", "Edited by hand: adopt the guide again"))),
IF({Waived}, "Not needed: " & {Recorded summary} & IF({Change pending}, ", and a change waits for its decision record", ""),
IF({Key count} > 1, "Another record has this slot's key: see the slot pair check",
IF(NOT({In adopted plan}), "Not in the adopted plan: " & IF(SUM({Request superseded}) > 0, "the request was superseded",
  IF({Kept guide ID} != ARRAYJOIN({Assigned guide ID}), "the product was reassigned",
  IF({Kept product ID} != ARRAYJOIN({Line product ID}), "the line's product was changed",
  IF(ARRAYJOIN({Guide slot guide ID}) != {Kept guide ID}, "the guide moved this image to another guide",
  IF(AND(FIND(ARRAYJOIN({Guide slot definition line}), ARRAYJOIN({Guide adopted definition})) > 0, FIND(" | retired | ", ARRAYJOIN({Guide slot definition line})) > 0), "the guide retired this image",
  IF({Stale by adoption}, "the guide changed it: " & IF({Obligation unchanged} = 0, "plan it in a new version of the request", IF(OR({Live shot count} = 0, {Shot accepted}), "press Replan on this slot", "press Replan on its shot")), "the guide changed it: adopt the guide's current definition, then replan")))))),
IF({Change pending}, "A change waits for its decision record: press Record decision to record it, or undo it",
IF(AND(NOT({Matches its shot}), {Covered}, NOT(AND({Operative fulfillment} = "An accepted image", {In use count} > 0, FIND("Use decision", {In-use bases}) > 0))), IF({Operative fulfillment} = "An accepted image", "An accepted image of its shot covers this slot, and its recorded fulfillment is \"An accepted image\": apply a use decision with Replace to use another image here.", "An accepted image covers this slot. Set Fulfillment back and record it. To use another image here, record a use decision with Replace; to make a new one, plan it in a new version of the request."),
IF(AND(NOT({Matches its shot}), NOT({Covered})), "Fulfillment changed after its shot was made: press Replan on this slot to detach it, or set it back and record it",
IF(AND({Matches its shot}, {Live shot count} > 0, {Shot accepted}, NOT({Covered})), "Its shot was accepted without it: press Replan on this slot to plan it apart, or make and accept a new image of the shot for all its slots",
IF({Shot-guide check} != "Same", "The shot guide changed: replan",
IF({Placement state} = "Unfinished", REGEX_EXTRACT({In-use states}, "Unfinished[^\n]*"),
IF({Placement state} = "Replacement unfinished", REGEX_EXTRACT({In-use states}, "Replacement unfinished[^\n]*"),
IF({Placement state} = "Conflict", "Conflict: " & {In use count} & " images in use. Resolve with a use decision with Replace",
IF({Placement state} = "Needs review", REGEX_EXTRACT({In-use eligibility}, "Needs review[^\n]*"),
IF({Placement state} = "Settled", IF({In-use bases} = "Use decision", "Has its image: used again from " & {In-use titles} & ", " & {In-use labels}, "Has its image: " & {In-use titles} & ", made for this page" & IF(REGEX_REPLACE(REGEX_REPLACE(SUBSTITUTE(", " & ARRAYJOIN({Shot active products}) & ",", ", " & ARRAYJOIN({Product name}) & ",", ","), "^, ?", ""), ",$", "") != "", ", shared with " & REGEX_REPLACE(REGEX_REPLACE(SUBSTITUTE(", " & ARRAYJOIN({Shot active products}) & ",", ", " & ARRAYJOIN({Product name}) & ",", ","), "^, ?", ""), ",$", ""), "")) & IF({Alternate titles}, ". Also accepted: " & {Alternate titles}, ""),
IF({In use count} > 0, "Edited by hand: an application's Current was changed by hand; undo it, or resolve the slot with a use decision with Replace",
IF({Live shot count} > 0, "Being made: " & ARRAYJOIN({Shot name}),
IF(AND({Operative fulfillment} = "Share", FIND("Nothing was shared", ARRAYJOIN({Request shot planning note})) > 0, FIND(ARRAYJOIN({Product name}), ARRAYJOIN({Request shot planning note})) > 0), "Not shared: the products' facts differ (see the Shot planning note)",
IF(OR({Operative fulfillment} = "Make", {Operative fulfillment} = "Share"), "Waiting for Make shots",
"Needs an image: a use decision for an accepted image that shows this product"))))))))))))))))))))
```

</details>

<details><summary><b>Shots</b> (17 formulas)</summary>

**Shots › Shot ID** · New

```text
RECORD_ID()
```

**Shots › Not withdrawn** · New; proposal: the condition on the slot's Shot lookups and Live shot count, so a Withdrawn shot doesn't count as a slot's shot (§7.3)

```text
IF({Withdrawn}, 0, 1)
```

**Shots › Sharing check** · New

```text
IF({Made as} = "Share", IF(AND({Share signatures} != "", FIND("¦", {Share signatures}) = 0, {Share signatures} = ARRAYJOIN({Line share signature})), "Same facts for every product", "The products this image would be shared by differ: " & SUBSTITUTE({Share signatures}, "¦", " / ")), "")
```

**Shots › Current product basis** · New

```text
IF(COUNTA({Lines in shot}) = 0, "", SUBSTITUTE(ARRAYJOIN({Line product basis}, "\n"), "\n", IF({Active slots filled} > 1, " | size omitted", " | size shown") & "\n") & IF({Active slots filled} > 1, " | size omitted", " | size shown"))
```

**Shots › Effective placement** · New

```text
IF(ARRAYJOIN({Workflow}) = "Product pages", IF({Active slot products} = "", "", {Active slot products} & " " & IF({Active slots filled} > 1, SUBSTITUTE({Active placement labels}, "product page", "product pages"), {Active placement labels})),
IF(ARRAYJOIN({Workflow}) = "Collection", REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "Placement: [^\n]*"), "^Placement: ", ""), {Placement}))
```

**Shots › Prompt placement** · New

```text
IF(ARRAYJOIN({Workflow}) = "Product pages", {Active placement labels}, {Effective placement})
```

**Shots › Effective direction** · New

```text
IF(ARRAYJOIN({Workflow}) = "Product pages", {Active views} & IF({Active slots filled} > 1, " This image is used for more than one size: nothing in it may show the product's size.", ""),
IF(ARRAYJOIN({Workflow}) = "Collection", REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "View: [^\n]*"), "^View: ", ""), {Shot direction}))
& IF(AND(ARRAYJOIN({Workflow}) != "Walkthrough", ARRAYJOIN({Workflow}) != "", {Exception}, {Exception reason}), " Exception: " & {Exception}, "")
```

**Shots › Lineage** · New

```text
IF(ARRAYJOIN({Workflow}) = "Product pages", {Active lineage}, IF(ARRAYJOIN({Workflow}) = "Collection", REGEX_REPLACE(REGEX_EXTRACT({Kept guide plan}, "Lineage: [^\n]*"), "^Lineage: ", ""), ""))
```

**Shots › Confirmation current** · New

```text
IF(AND({Products confirmed}, OR({Lines changed at} = BLANK(), NOT(IS_BEFORE({Confirmed at}, {Lines changed at})))), 1, 0)
```

**Shots › Plan check** · New

```text
IF({Brief count} != 1, "Not planned: it needs one request",
IF({Withdrawn}, "Not planned: withdrawn",
IF(SUM({Request superseded}) > 0, "Not planned: its request is superseded",
IF(ARRAYJOIN({Workflow}) = "Product pages",
  IF({Active slots filled} < 1, "Not planned: it fills no active slot",
  IF({Held slots} > 0, "Not planned: a slot it fills is edited by hand (see its Status)",
  IF({Slots not ok} > 0, "Not planned: a slot it fills isn't ok (see its Status)",
  IF({Slots guide changed} > 0, "Not planned: the shot guide changed since this was planned",
  IF(OR(FIND("¦", {Active guide-slot IDs}) > 0, FIND("¦", {Active definition lines}) > 0), "Not planned: its slots don't share one guide slot",
  IF(OR({Lines in shot count} != 1, FIND(ARRAYJOIN({Line IDs}), {Active slot lines}) = 0), "Not planned: Lines in shot must be the line of one of its active slots",
  IF({Made as} = "Make", IF({Active slots filled} != 1, "Not planned: a made shot fills exactly one slot", IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned"))),
  IF({Made as} = "Share", IF({Active fulfillments} != "Share", "Not planned: every slot a shared shot fills must be Share", IF({Sharing check} != "Same facts for every product", "Not planned: " & {Sharing check}, IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned")))),
  "Not planned: Made as must be Make or Share")))))))),
IF(ARRAYJOIN({Workflow}) = "Collection",
  IF({Kept guide plan} = "", "Not planned: no kept guide plan",
  IF(SUM({Collection guide complete}) != 1, "Not planned: the collection guide isn't Complete",
  IF(FIND(ARRAYJOIN({Guide slot definition line}), {Kept guide plan}) = 0, "Not planned: the shot guide changed since this was planned",
  IF(ARRAYJOIN({Guide slot guide ID}) != ARRAYJOIN({Collection guide ID}), "Not planned: its guide isn't the request's collection guide",
  IF(AND({Lines in shot count} > 0, {Line request IDs} != ARRAYJOIN({Request ID})), "Not planned: it may include only its request's products",
  IF(ARRAYJOIN({Guide slot includes}) = "Choose",
    IF(OR({Lines in shot count} != SUM({Guide slot choose count}), NOT({Confirmation current})), "Not planned: choose the products and confirm them", IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned"))),
    IF({Lines in shot count} != SUM({Request line count}), "Not planned: it must include all the request's products", IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned"))))))))),
  IF(OR({Placement} = "", {Shot direction} = ""), "Not planned: it needs a Placement and a Shot direction",
  IF(AND({Lines in shot count} > 0, {Line request IDs} != ARRAYJOIN({Request ID})), "Not planned: it may include only its request's products",
  IF(OR({Lines in shot count} = 0, NOT({Confirmation current})), "Not planned: confirm its products",
  IF(OR(ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"), IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned")), IF(OR(COUNTA({Line product has image}) = 0, MIN({Line product has image}) != 1, SUM({References complete}) != 1), "Not planned: a source image is missing",
    IF({Exception} != "", "Not planned: Exceptions aren't used on walkthrough shots; edit Shot direction.",
    IF(AND({Exception} != "", {Exception reason} = ""), "Not planned: an exception needs its reason", "Planned"))))))))))))
```

**Shots › Planned** · New

```text
IF({Plan check} = "Planned", 1, 0)
```

**Shots › Shot-guide check** · New

```text
IF(ARRAYJOIN({Workflow}) = "Product pages", IF({Slots guide changed} = 0, "Same", "The shot guide changed since this was planned"),
IF(ARRAYJOIN({Workflow}) = "Collection", IF(AND(FIND(ARRAYJOIN({Guide slot definition line}), {Kept guide plan}) > 0, SUM({Collection guide complete}) = 1), "Same", "The shot guide changed since this was planned"), ""))
```

**Shots › Current standard** · Changed: replace the live text with this text. Its default branch is the live text, character for character; the Workflow branch is v3 §5.1's composition with v6 §7.1's changes

```text
IF(OR(ARRAYJOIN({Workflow}) = "Product pages", ARRAYJOIN({Workflow}) = "Collection", ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"),
ARRAYJOIN({Request standard}, "") & "\nProducts, in image order:\n" & IF({Active slots filled} > 1, ARRAYJOIN({Line shared facts}, "\n"), ARRAYJOIN({Line facts}, "\n")) & "\nShot: " & {Name} & ", for " & {Effective placement} & ". " & {Effective direction} & IF({Lineage}, "\n" & {Lineage}, "") & IF(AND({Exception}, {Exception reason}), "\nException reason: " & {Exception reason} & ". Set by: " & {Exception set by} & ".", ""),
ARRAYJOIN({Brief standard}, "") & "\nShot: " & {Name} & ", for " & {Placement} & ". " & {Shot direction})
```

**Shots › Current prompt** · Changed: replace the live text with this text. Its default branch is the live text, character for character; the Workflow branch is v3 §5.1's composition with v6 §7.1's changes

```text
IF(OR(ARRAYJOIN({Workflow}) = "Product pages", ARRAYJOIN({Workflow}) = "Collection", ARRAYJOIN({Workflow}) = "Marketing", ARRAYJOIN({Workflow}) = "Campaign"),
"Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\n\nShot: " & {Name} & ", for " & {Prompt placement} & ". " & {Effective direction} & "\n\n" & ARRAYJOIN({Request prompt}, "") & "\n\nThe first attached images are the products, one each, in this order. Each is the authority for its product. Do not redesign, substitute, embellish or alter any product.\n" & IF({Active slots filled} > 1, ARRAYJOIN({Line shared prompt lines}, "\n"), ARRAYJOIN({Line prompt lines}, "\n")) & "\n\n" & ARRAYJOIN({Reference prompt}, ""),
"Generate one single commercial photograph. Not a grid, collage, contact sheet or multi-image layout.\n\nShot: " & {Name} & ", for " & {Placement} & ". " & {Shot direction} & "\n\n" & ARRAYJOIN({Brief prompt}, ""))
```

**Shots › Decision** · Changed: replace the live text with this text: the live text with {Placement} replaced by {Effective placement}

```text
IF(FIND("Current standard", {Acceptance coverage}),
  "Accepted for " & {Effective placement} &
    IF(LEN({Acceptance coverage}) - LEN(SUBSTITUTE({Acceptance coverage}, "Current standard", "")) > 16,
      " · " & (LEN({Acceptance coverage}) - LEN(SUBSTITUTE({Acceptance coverage}, "Current standard", ""))) / 16 & " images", ""),
  IF(FIND("Earlier standard", {Acceptance coverage}), "Accepted under an earlier standard", "No accepted image yet"))
```

**Shots › Can generate** · Changed: replace the live text with this text, which v6 §6 gives

```text
IF(AND({Planned} = 1, COUNTA({Product image}) > 0, COUNTA({Reference images}) > 0), 1, 0)
```

**Shots › Title** · Existing, not changed: the live text; don't install it

```text
{Name}
```

</details>

<details><summary><b>Candidates</b> (8 formulas)</summary>

**Candidates › Title** · Existing, not changed: the live text; don't install it

```text
ARRAYJOIN({Shot name}, "") & IF({Number in shot}, " // candidate " & {Number in shot}, IF({Test}, " // test record " & {Record no.}, " // new candidate"))
```

**Candidates › Has image** · Existing, not changed: the live text; don't install it

```text
IF({Image}, 1, 0)
```

**Candidates › Shot planned** · New

```text
IF(AND({Shot count} = 1, {Shot planned values} = 1), 1, 0)
```

**Candidates › Standard check** · Existing, not changed: the live text; don't install it

```text
IF({Standard used}="", "", IF(ARRAYJOIN({Current standard}, "")={Standard used}, "Same standard as when this image was made", "The standard has changed since this image was made"))
```

**Candidates › Ready** · Changed: replace the live text with this text: the two held labels (§7.6) around the live text, which is kept as each default. One departure from v6 §7.6's predicate, awaiting the reviewer's approval: the standard label also needs `{Standard check} != ""` (Choices: Ready's held standard label)

```text
IF(AND({Has image} = 0, {Generated at} = BLANK()), IF({Shot planned} != 1, "Held: the shot isn't planned now. See its Plan check.", IF(AND({Standard check} != "", LEFT({Standard check}, 4) != "Same"), "Held: the standard changed since this candidate was kept.", IF(AND(COUNTA({Shot}) > 0, {Standard used}, {Prompt used}, {Intended use}, {Product image used}, {Reference images used}), "Ready to generate", "Preparing…"))), IF(AND(COUNTA({Shot}) > 0, {Standard used}, {Prompt used}, {Intended use}, {Product image used}, {Reference images used}), "Ready to generate", "Preparing…"))
```

**Candidates › Status** · Changed: replace the live text with this text: the live text with one held branch directly after its first branch (§7.6)

```text
IF({Has image} = 1, "Image ready", IF(LEFT({Ready}, 5) = "Held:", "Held // the shot changed." & IF({Generate when ready}, " If it is planned again with the same standard, a pending request continues automatically; contact ASK to cancel it.", ""), IF({Generate requested}, "Image requested // contact ASK if it appears stuck", IF({Generate when ready}, IF(LEFT({Input check}, 13) = "Would request", "Dry run // the image would have been requested", IF(OR(LEFT({Input check}, 8) = "Missing:", LEFT({Input check}, 19) = "Not a usable image:", LEFT({Input check}, 14) = "Not requested:", LEFT({Input check}, 14) = "Still copying:", {Standard check} = "The standard has changed since this image was made"), "Needs attention // contact ASK before trying again", "Preparing inputs // this request will continue automatically; contact ASK if it appears stuck")), IF({Standard used} = "", "Preparing inputs", IF({Ready} = "Ready to generate", "Not requested // contact ASK to generate this candidate", "Can't generate: its inputs are incomplete"))))))
```

**Candidates › Is accepted** · New

```text
IF(COUNTA({Accepted images}) > 0, 1, 0)
```

**Candidates › Accepted slots kept** · New

```text
IF({Is accepted}, {Slots kept}, "")
```

</details>

<details><summary><b>Accepted images</b> (5 formulas)</summary>

**Accepted images › Record complete** · Existing, not changed: the live text; don't install it

```text
IF(AND({Image}, COUNTA({Candidate record no.}) > 0, {Approved for}, {Standard}, {Accepted by ID}), "Complete", "Incomplete")
```

**Accepted images › Coverage** · Existing, not changed: the live text; don't install it

```text
IF(OR({Test}, {Record complete} != "Complete", {Candidate is test}), "", IF(ARRAYJOIN({Shot standard now}, "") = {Standard}, "Current standard", "Earlier standard"))
```

**Accepted images › Current title** · Existing, not changed: the live text; don't install it

```text
ARRAYJOIN({Candidate title now}, "")
```

**Accepted images › Accepted ID** · New

```text
RECORD_ID()
```

**Accepted images › Source current** · New

```text
IF(ARRAYJOIN({Shot standard now}, "") = {Standard}, 1, 0)
```

</details>

<details><summary><b>Applications</b> (16 formulas)</summary>

**Applications › Name** · Primary (new): created by connector as Single line text, then converted to this formula in the UI (Install)

```text
ARRAYJOIN({Slot name}) & " ← " & ARRAYJOIN({Source title})
```

**Applications › Application ID** · New

```text
RECORD_ID()
```

**Applications › Current check** · New

```text
IF(IF({Current set at} = BLANK(), OR({Current}), AND({Current changed at} != BLANK(), DATETIME_DIFF({Current changed at}, {Current set at}, 'seconds') > 60)), "Edited by hand", "")
```

**Applications › Eligibility** · New

```text
IF(SUM({Slot active}) = 0, IF(SUM({Slot waived}) > 0, "Needs review: the slot is marked not needed", IF(SUM({Slot in adopted plan}) = 0, "Needs review: the slot is no longer in the adopted plan", "Needs review: the slot is withdrawn")),
IF(ARRAYJOIN({Slot kept destination}) != {Kept destination}, "Needs review: the slot was replanned since this image was applied",
IF(AND({Kept receiving basis} != ARRAYJOIN({Slot receiving basis}), {Kept receiving basis} != ARRAYJOIN({Slot receiving basis without size})), "Needs review: the product's facts changed since this image was applied",
IF(ARRAYJOIN({Source complete}) != "Complete", "Needs review: its source record isn't complete",
IF(AND({Basis} = "Use decision", COUNTA({Use decision}) = 0), "Needs review: its decision record is missing",
IF(SUM({Slot held}) > 0, "Needs review: the slot is edited by hand",
IF(AND({Basis} = "Use decision", SUM({Decision record intact}) = 0), "Needs review: its decision's record was edited by hand",
"Holds")))))))
```

**Applications › Basis finished** · New

```text
IF({Basis} = "Use decision", IF(SUM({Decision applied}), 1, 0), IF(SUM({Source applications done}), 1, 0))
```

**Applications › State** · New

```text
IF({Withdrawn}, "Withdrawn duplicate",
IF({Current check}, "Edited by hand",
IF(AND(NOT({Current}), COUNTA({Replaced by})), "Replaced by " & ARRAYJOIN({Replaced by name}),
IF(NOT({Current}), "Alternate",
IF(NOT({Basis finished}), IF({Basis} = "Use decision", "Unfinished: press Apply this decision again", "Unfinished: press Retry applications on the accepted image"),
IF(FIND({Application ID}, ARRAYJOIN({Slot in-use replaces})), "Replacement unfinished: press Apply this decision again on the replacing decision",
IF(SUM({Slot in use count}) - 1 - SUM({Replaces in use}) > 0, "Conflict",
IF({Eligibility} != "Holds", {Eligibility}, "In use"))))))))
```

**Applications › Delivery name** · New

```text
LOWER(SUBSTITUTE(ARRAYJOIN({Product}), " ", "-")) & "_" & ARRAYJOIN({Position}) & "_" & LOWER(SUBSTITUTE(ARRAYJOIN({Slot kept slot name}), " ", "-")) & "_from-accepted-" & ARRAYJOIN({Source ID}) & ".jpg"
```

**Applications › In use flag** · New

```text
IF(AND({Current}, NOT({Withdrawn})), 1, 0)
```

**Applications › In use state** · New

```text
IF({In use flag}, {State}, "")
```

**Applications › In use basis** · New

```text
IF({In use flag}, {Basis}, "")
```

**Applications › In use replaces** · New

```text
IF({In use flag}, ARRAYJOIN({Replaces IDs}, ","), "")
```

**Applications › In use title** · New

```text
IF({In use flag}, ARRAYJOIN({Source title}), "")
```

**Applications › In use label** · New

```text
IF({In use flag}, {Kept label}, "")
```

**Applications › In use eligibility** · New

```text
IF({In use flag}, {Eligibility}, "")
```

**Applications › Alternate title** · New

```text
IF(AND(NOT({Current}), NOT({Withdrawn}), COUNTA({Replaced by}) = 0), ARRAYJOIN({Source title}), "")
```

**Applications › Settled source image** · New

```text
IF({State} = "In use", ARRAYJOIN({Source image}), "")
```

</details>

<details><summary><b>Use decisions</b> (7 formulas)</summary>

**Use decisions › Name** · Primary (new): created by connector as Single line text, then converted to this formula in the UI (Install)

```text
ARRAYJOIN({Source title}) & " → " & {Slot count} & " slots"
```

**Use decisions › Decision ID** · New

```text
RECORD_ID()
```

**Use decisions › Live basis** · New

```text
"Source: " & ARRAYJOIN({Source ID}) & "\n" & {Slot basis lines} & "\n" & IF({Replace}, "replace", "add") & "\nFacts reviewed: " & IF({Facts reviewed}, "yes", "no") & "\nConditions: " & {Conditions} & "\nDecided by: " & {Decided by} & "\nDecision source: " & {Decision source} & "\nEntered by: " & {Entered by}
```

**Use decisions › Record intact** · New

```text
IF(IF(IF({Decided at} = BLANK(), OR({Decided basis}, {Decided selection}), AND({Record changed at} != BLANK(), DATETIME_DIFF({Record changed at}, {Decided at}, 'seconds') > 60)), "Edited by hand", "") = "", 1, 0)
```

**Use decisions › Basis check** · New

```text
IF({Decided basis} = "", "Not applied yet", IF({Live basis} = {Decided basis}, "As decided", "Edited after it was decided: what was decided stands; a different use is a new decision"))
```

**Use decisions › Pending fixed** · New

```text
IF(AND({Decided basis} != "", NOT({Applied})), 1, 0)
```

**Use decisions › Progress** · New

```text
IF({Decided basis} = "", "Not applied", IF({Applied}, IF(LEFT({Result}, 15) = "Applied in part", "Applied in part", "Applied"), "Applied to " & {Application count} & " of " & (LEN({Decided selection}) - LEN(SUBSTITUTE({Decided selection}, "\n", "")) + 1) & " slots: press Apply this decision again to finish"))
```

</details>

## Scripts: triggers, inputs and writes

**All seven:**
- Inputs are static text, naming a table or field by ID or by name, except `recordId`, which is the trigger record's ID.
- Before any read or write, a script stops if an input is missing, a binding doesn't resolve, or a field has the wrong type.
- IDs survive renames; names make a binding readable.
- The tables below are generated from each script's own `bind(…)` calls and the demo values in `BINDINGS` (`sim/schema.mjs`).
- A field type "lookup or rollup or formula" accepts any of them, so a helper can be a lookup in one installation and a formula in another.

**Triggers.**
- A button is an interface button whose automation starts "When a button is clicked", and passes the button's record as `recordId`.
- Buttons don't run on the read-only public shares (§11).
- S4's trigger condition reads one scalar field, Record complete, never a lookup or a rollup, as §6 requires of every trigger.

### S1 Make product slots

- **Trigger:** the Make product slots button on a request (Briefs).
- **Does:** on a Product pages request that isn't superseded, for each line whose product's assignment is recorded, intact and assigned to a Complete guide, it creates one slot for each active guide slot in the adopted definition that has no record with its Slot key. The kept slot plan, Kept plan written at, Fulfillment from the Fill rule and Test go in the create call.
- **Writes:** new Product-page slots; the request's Slot planning note.
  - The note lists what it made.
  - It also lists each line or key it made nothing for, with the next step: no recorded assignment, a waiting assignment change, an edited-by-hand record, a guide not Complete, a key kept as not needed, a key whose records are all withdrawn, two records for one key, a held slot, or a slot stale by adoption.
  - On a new version of a request, it adds the earlier version's waivers and departures, to be decided again.
- **Never:** substitutes a grid, remakes a key that has a record, changes an existing slot, or carries a decision over.

| Input | Value in the demo schema | Field type |
|---|---|---|
| `recordId` | the record the button or trigger acts on | |
| `requestsTable` | Briefs | table |
| `requestWorkflowField` | Workflow | single select |
| `requestSupersededField` | Superseded | count or rollup or formula |
| `requestSupersedesField` | Supersedes | link |
| `requestLinesField` | Product lines | link |
| `requestNameField` | Name | single line text or long text |
| `requestTestField` | Test | checkbox |
| `slotPlanningNoteField` | Slot planning note | long text |
| `linesTable` | Product lines | table |
| `lineProductField` | Product | link |
| `lineTestField` | Test | checkbox |
| `productsTable` | Products | table |
| `productNameField` | Name | single line text or long text |
| `assignedGuideIdField` | Assigned guide ID | formula |
| `assignmentCheckField` | Assignment check | formula |
| `productRecordIntactField` | Record intact | formula |
| `guidesTable` | Shot guides | table |
| `guideNameField` | Name | single line text or long text |
| `guideCompleteField` | Complete | formula |
| `guideStatusField` | Status | formula |
| `adoptedDefinitionField` | Adopted definition | long text |
| `adoptedVersionField` | Adopted version | number |
| `guideSlotsTable` | Guide slots | table |
| `gsNameField` | Name | single line text or long text |
| `gsGuideField` | Guide | link |
| `gsPositionField` | Position | number |
| `gsPlacementField` | Placement label | single line text or long text |
| `gsViewField` | View | single line text or long text |
| `gsRequiredField` | Required | single select |
| `gsFillRuleField` | Fill rule | single select |
| `gsRetiredField` | Retired | checkbox |
| `gsDefinitionLineField` | Definition line | formula |
| `slotsTable` | Product-page slots | table |
| `slotNameField` | Name | single line text |
| `slotLineField` | Line | link |
| `slotGuideSlotField` | Guide slot | link |
| `slotProductField` | Product | link |
| `slotRequestField` | Request | link |
| `keptDefinitionLineField` | Kept definition line | single line text or long text |
| `keptGuideIdField` | Kept guide ID | single line text |
| `keptProductIdField` | Kept product ID | single line text |
| `keptGuideVersionField` | Kept guide version | number |
| `keptGuideNameField` | Kept guide name | single line text |
| `keptSlotNameField` | Kept slot name | single line text |
| `keptPositionField` | Kept position | number |
| `keptPlacementField` | Kept placement label | single line text |
| `keptViewField` | Kept view | single line text or long text |
| `keptRequiredField` | Kept required | single line text |
| `keptFillRuleField` | Kept fill rule | single line text |
| `planKeptField` | Plan kept | checkbox |
| `keptPlanWrittenAtField` | Kept plan written at | date, with time |
| `fulfillmentField` | Fulfillment | single select |
| `slotTestField` | Test | checkbox |
| `slotKeyField` | Slot key | formula |
| `withdrawnField` | Withdrawn | checkbox |
| `validlyWithdrawnField` | Validly withdrawn | formula |
| `heldField` | Held | formula |
| `waivedField` | Waived | formula |
| `staleField` | Stale by adoption | formula |
| `obligationUnchangedField` | Obligation unchanged | formula |
| `slotLiveShotCountField` | Live shot count | count or rollup or formula |
| `shotAcceptedField` | Shot accepted | formula |
| `slotStatusField` | Status | formula |
| `recordedNotNeededField` | Recorded not needed | checkbox |
| `departureField` | Departure | formula |
| `recordedSummaryField` | Recorded summary | single line text or long text |

### S2 Make shots

- **Trigger:** the Make shots button on a request.
- **Does, on a Product pages request:**
  - a slot that isn't ok is listed in the note with its Status, whether or not it has a shot, and gets no shot (§7.3). Only an ok slot with a shot that counts is counted as already planned;
  - each active Make slot that is ok and has no shot that counts gets its own shot, with Made as Make, its line, its Pair key and the slot, all in the create call. A slot still linked to a Withdrawn shot is relinked to the new shot by an update of its own, after the create;
  - active Share slots that are ok are grouped by guide slot and share key, and a group with one share signature gets one shot, or joins its existing shot where the signatures are equal and that shot has no accepted image;
  - a group whose facts differ gets none.
- **Does, on a Collection request:** one shot per active guide slot of the request's adopted, Complete collection guide that has no shot, with its Kept guide plan, Made as Collection and Pair key.
- **Does, on other workflows:** a note that the request's shots are written in it.
- **Writes:** new Shots, created with their slots (the "Slots filled" side of the link); a slot's own Shot link where it joins a shot or is relinked from a Withdrawn one; the request's Shot planning note.
- **Never:** writes an existing shot's own fields, joins an accepted shot, shares across differing facts, or changes a fulfillment or a decision.

| Input | Value in the demo schema | Field type |
|---|---|---|
| `recordId` | the record the button or trigger acts on | |
| `requestsTable` | Briefs | table |
| `requestWorkflowField` | Workflow | single select |
| `requestSupersededField` | Superseded | count or rollup or formula |
| `requestLinesField` | Product lines | link |
| `requestNameField` | Name | single line text or long text |
| `requestTestField` | Test | checkbox |
| `requestNoteField` | Shot planning note | long text |
| `requestCollectionGuideField` | Shot guide (collection) | link |
| `linesTable` | Product lines | table |
| `lineProductField` | Product | link |
| `lineShareKeyField` | Product share key | lookup or rollup or formula |
| `lineFactsField` | Facts without size | lookup or rollup or formula |
| `productsTable` | Products | table |
| `productNameField` | Name | single line text or long text |
| `productStyleField` | Style | single line text or long text |
| `productColorField` | Color | single line text or long text |
| `guidesTable` | Shot guides | table |
| `guideNameField` | Name | single line text or long text |
| `guideCompleteField` | Complete | formula |
| `guideStatusField` | Status | formula |
| `guideAdoptedDefinitionField` | Adopted definition | long text |
| `guideAdoptedVersionField` | Adopted version | number |
| `guideSlotsTable` | Guide slots | table |
| `gsNameField` | Name | single line text or long text |
| `gsGuideField` | Guide | link |
| `gsPositionField` | Position | number |
| `gsPlacementField` | Placement label | single line text or long text |
| `gsViewField` | View | single line text or long text |
| `gsIncludesField` | Includes | single select |
| `gsChooseCountField` | Choose count | number |
| `gsRetiredField` | Retired | checkbox |
| `gsDefinitionLineField` | Definition line | formula |
| `slotsTable` | Product-page slots | table |
| `slotNameField` | Name | single line text |
| `slotLineField` | Line | link |
| `slotRequestField` | Request | link |
| `slotShotField` | Shot | link |
| `slotActiveField` | Active | formula |
| `slotOkField` | Slot ok | formula |
| `slotOperativeField` | Operative fulfillment | formula |
| `slotGuideSlotIdField` | Guide-slot ID | lookup or rollup or formula |
| `slotShareSignatureField` | Share signature | lookup or rollup or formula |
| `slotPositionField` | Kept position | number |
| `slotKeptSlotNameField` | Kept slot name | single line text |
| `slotStatusField` | Status | formula |
| `slotWaivedField` | Waived | formula |
| `slotWithdrawnField` | Validly withdrawn | formula |
| `slotTestField` | Test | checkbox |
| `shotsTable` | Shots | table |
| `shotNameField` | Name | single line text |
| `shotBriefField` | Brief | link |
| `shotLinesField` | Lines in shot | link |
| `shotFromGuideSlotField` | From guide slot | link |
| `shotMadeAsField` | Made as | single select |
| `shotKeptGuidePlanField` | Kept guide plan | long text |
| `shotPairKeyField` | Pair key | single line text |
| `shotWithdrawnField` | Withdrawn | checkbox |
| `shotTestField` | Test | checkbox |
| `shotSlotsFilledField` | Slots filled | link |
| `shotAcceptedCountField` | Accepted count | rollup or count or formula |
| `shotLineShareSignatureField` | Line share signature | lookup or rollup or formula |

### S3 Replan

- **Trigger:** the Replan button on a shot (`kind` "shot") and on a product-page slot (`kind` "slot"). These are two automations with the same bytes.
- **Does, on a product-page shot without an accepted image:**
  - it visits each linked slot that isn't validly withdrawn or waived, and refreshes those in Replan reach;
  - it reports the rest, and why;
  - it then repoints Lines in shot if its line is no longer an active slot's line.
  - A Held slot refuses the whole shot.
- **Does, on a slot:** it refreshes that slot's kept plan if it is in reach. A slot whose recorded fulfillment no longer matches its shot, or that its accepted shot's acceptances don't cover, is detached first, with its Detach log, in the same update. On an unaccepted shot that still matches, it points to the shot's Replan.
  - **The slot's shot** is its linked shot that isn't Withdrawn. A slot linked only to Withdrawn shots is treated as having no shot: it is refreshed if in reach, and S2 relinks it.
  - **GPT-A's route:** a slot that an acceptance of its shot covers, whose recorded fulfillment is "An accepted image", is never detached. It stays on its shot, is refreshed if in reach, and its result repeats the route's guidance: apply a use decision with Replace. Any other covered slot whose fulfillment no longer matches is refused (§7.5).
- **Does, on a collection shot without an accepted image:** it refreshes the Kept guide plan.
- **Writes:**
  - the refreshed kept-plan fields, with Kept plan written at;
  - Lines in shot on a product-page shot;
  - Kept guide plan on a collection shot;
  - Shot and Detach log on a detached slot;
  - Replan result on the record pressed, and on each slot a shot's Replan refreshes.
- **Refuses:** a written or walkthrough shot, a withdrawn shot or slot, a Held slot, an accepted shot (use the slot's Replan), and, for each slot it doesn't refresh, a guide not Complete, a retired or moved guide slot, a reassigned or replaced product, a superseded request or a changed obligation.

| Input | Value (on Shots) | Value (on Product-page slots) | Field type |
|---|---|---|---|
| `recordId` | the record the button or trigger acts on | the record the button or trigger acts on | |
| `kind` | `shot` | `slot` | |
| `requestsTable` | Briefs | Briefs | table |
| `requestLinesField` | Product lines | Product lines | link |
| `requestCollectionGuideField` | Shot guide (collection) | Shot guide (collection) | link |
| `requestSupersededField` | Superseded | Superseded | count or rollup or formula |
| `linesTable` | Product lines | Product lines | table |
| `lineNameField` | Name | Name | formula or single line text or long text |
| `guidesTable` | Shot guides | Shot guides | table |
| `guideNameField` | Name | Name | single line text or long text |
| `guideCompleteField` | Complete | Complete | formula |
| `guideStatusField` | Status | Status | formula |
| `guideAdoptedVersionField` | Adopted version | Adopted version | number |
| `guideSlotsTable` | Guide slots | Guide slots | table |
| `gsNameField` | Name | Name | single line text or long text |
| `gsGuideField` | Guide | Guide | link |
| `gsPositionField` | Position | Position | number |
| `gsPlacementField` | Placement label | Placement label | single line text or long text |
| `gsViewField` | View | View | single line text or long text |
| `gsRequiredField` | Required | Required | single select |
| `gsFillRuleField` | Fill rule | Fill rule | single select |
| `gsIncludesField` | Includes | Includes | single select |
| `gsChooseCountField` | Choose count | Choose count | number |
| `gsRetiredField` | Retired | Retired | checkbox |
| `gsDefinitionLineField` | Definition line | Definition line | formula |
| `slotsTable` | Product-page slots | Product-page slots | table |
| `slotNameField` | Name | Name | single line text |
| `slotLineField` | Line | Line | link |
| `slotRequestField` | Request | Request | link |
| `slotGuideSlotField` | Guide slot | Guide slot | link |
| `slotShotField` | Shot | Shot | link |
| `slotKeptDefinitionLineField` | Kept definition line | Kept definition line | single line text or long text |
| `slotKeptGuideIdField` | Kept guide ID | Kept guide ID | single line text |
| `slotKeptProductIdField` | Kept product ID | Kept product ID | single line text |
| `slotKeptGuideVersionField` | Kept guide version | Kept guide version | number |
| `slotKeptGuideNameField` | Kept guide name | Kept guide name | single line text |
| `slotKeptSlotNameField` | Kept slot name | Kept slot name | single line text |
| `slotKeptPositionField` | Kept position | Kept position | number |
| `slotKeptPlacementField` | Kept placement label | Kept placement label | single line text |
| `slotKeptViewField` | Kept view | Kept view | single line text or long text |
| `slotPlanKeptField` | Plan kept | Plan kept | checkbox |
| `slotKeptPlanWrittenAtField` | Kept plan written at | Kept plan written at | date, with time |
| `slotDetachLogField` | Detach log | Detach log | long text |
| `slotResultField` | Replan result | Replan result | single line text or long text |
| `slotProductNameField` | Product name | Product name | lookup or rollup or formula |
| `slotAssignedGuideIdField` | Assigned guide ID | Assigned guide ID | lookup or rollup or formula |
| `slotLineProductIdField` | Line product ID | Line product ID | lookup or rollup or formula |
| `slotRequestSupersededField` | Request superseded | Request superseded | lookup or rollup or formula |
| `slotGuideSlotGuideIdField` | Guide slot guide ID | Guide slot guide ID | lookup or rollup or formula |
| `slotWithdrawnField` | Validly withdrawn | Validly withdrawn | formula |
| `slotWaivedField` | Waived | Waived | formula |
| `slotHeldField` | Held | Held | formula |
| `slotRecordCheckField` | Record check | Record check | formula |
| `slotKeptPlanCheckField` | Kept plan check | Kept plan check | formula |
| `slotProductRecordIntactField` | Product record intact | Product record intact | lookup or rollup or formula |
| `slotInPlanField` | In adopted plan | In adopted plan | formula |
| `slotStaleField` | Stale by adoption | Stale by adoption | formula |
| `slotObligationField` | Obligation unchanged | Obligation unchanged | formula |
| `slotReachField` | Replan reach | Replan reach | formula |
| `slotActiveField` | Active | Active | formula |
| `slotMatchesField` | Matches its shot | Matches its shot | formula |
| `slotCoveredField` | Covered | Covered | formula |
| `slotShotAcceptedField` | Shot accepted | Shot accepted | formula |
| `slotChangePendingField` | Change pending | Change pending | formula |
| `slotOperativeField` | Operative fulfillment | Operative fulfillment | formula |
| `shotsTable` | Shots | Shots | table |
| `shotNameField` | Name | Name | single line text |
| `shotBriefField` | Brief | Brief | link |
| `shotLinesField` | Lines in shot | Lines in shot | link |
| `shotFromGuideSlotField` | From guide slot | From guide slot | link |
| `shotKeptGuidePlanField` | Kept guide plan | Kept guide plan | long text |
| `shotWithdrawnField` | Withdrawn | Withdrawn | checkbox |
| `shotAcceptedCountField` | Accepted count | Accepted count | rollup or count or formula |
| `shotWorkflowField` | Workflow | Workflow | lookup or rollup or formula |
| `shotSlotsFilledField` | Slots filled | Slots filled | link |
| `shotResultField` | Replan result | Replan result | single line text or long text |

### S4 Apply acceptance

- **Trigger:** two automations with the same bytes and inputs:
  - "When a record matches conditions" on Accepted images: Record complete is "Complete". Accept creates complete records in one step, so this is a record's first matching state;
  - the Retry applications button, which is on no public page.
- **Does:**
  - For each line of the candidate's Slots kept, in order, it creates the slot's application, keyed `acc:` + accepted record ID + `/` + slot ID. Current is true if the slot has no application in use, otherwise false: an alternate.
  - It skips an existing key, a slot whose request is superseded, and a slot no longer active, and says why.
  - It leaves a Held slot waiting.
  - After the last line, it writes Application progress and ticks Applications done, the last write.
- **Writes:**
  - new Applications: Accepted image, Slot, Application key, Basis "Accepted for this use", the Kept destination and Kept receiving basis from the Slots kept line, Kept label "made for this page", Recorded at from Accepted at, Account, Current, Current set at, and Test from the candidate;
  - Application progress and Applications done on the accepted record. No other field of an accepted record is written.

| Input | Value in the demo schema | Field type |
|---|---|---|
| `recordId` | the record the button or trigger acts on | |
| `acceptedTable` | Accepted images | table |
| `accRecordCompleteField` | Record complete | formula |
| `accSlotsKeptField` | Slots kept | lookup or rollup or formula or count or long text |
| `accCandidateTestField` | Candidate is test | lookup or rollup or formula or count |
| `accAcceptedAtField` | Accepted at | created time, or date, with or without time |
| `accDoneField` | Applications done | checkbox |
| `accProgressField` | Application progress | single line text or long text |
| `slotsTable` | Product-page slots | table |
| `slotNameField` | Name | single line text |
| `slotActiveField` | Active | formula |
| `slotHeldField` | Held | formula |
| `slotRequestSupersededField` | Request superseded | lookup or rollup or formula or count |
| `slotInPlanField` | In adopted plan | formula |
| `slotWaivedField` | Waived | formula |
| `slotWithdrawnField` | Validly withdrawn | formula |
| `slotRecordCheckField` | Record check | formula |
| `slotKeptPlanCheckField` | Kept plan check | formula |
| `slotProductRecordIntactField` | Product record intact | lookup or rollup or formula or count |
| `applicationsTable` | Applications | table |
| `appBasisField` | Basis | single select |
| `appKeyField` | Application key | single line text |
| `appSlotField` | Slot | link |
| `appAcceptedImageField` | Accepted image | link |
| `appKeptDestinationField` | Kept destination | single line text or long text |
| `appKeptReceivingBasisField` | Kept receiving basis | single line text or long text |
| `appKeptLabelField` | Kept label | single line text or long text |
| `appRecordedAtField` | Recorded at | date, with or without time |
| `appAccountField` | Account | single line text or long text |
| `appCurrentField` | Current | checkbox |
| `appCurrentSetAtField` | Current set at | date, with time |
| `appWithdrawnField` | Withdrawn | checkbox |
| `appTestField` | Test | checkbox |
| `faultAfterWrites` | tests only: empty in the live base (K16) | |
| `account` | optional: the account that pressed, from the trigger, kept as Account; not evidence of who decided | |

### S5 Apply use decision

- **Trigger:** the Apply this decision button on a use decision.
- **Does,** in v6 §7.7's five steps:
  1. An applied decision does nothing. A decision whose own record was edited by hand is ended "Applied in part", after finishing any replacement it had started.
  2. The first press checks the decision as entered. A refusal writes only the Result, naming each refused slot.
  3. It fixes the decision: Decided basis, Decided selection, Decided at and Decision label, in one update.
  4. It applies one slot at a time, keyed `ud:` + decision ID + `/` + slot ID, deciding for each slot whether it is applied, superseded, ended (final) or waiting. A superseded or ended slot is recorded in Ended slots at once, and a later press reports it from there without checking it again.
  5. Unless a slot waits, it writes the Result and ticks Applied, the last write.
- **Writes:**
  - those use-decision fields, and Ended slots, one line per slot a final failure ended;
  - new Applications: Basis "Use decision", the decision link, Kept destination and Kept receiving basis from the Decided basis, Kept label from the Decision label, Recorded at from Decided at, Account, Current true, Current set at, Replaces and Test;
  - on each application it takes out of use: Current false, Current set at, and Replaced by and Replaced at, unless it already has a Replaced by.

| Input | Value in the demo schema | Field type |
|---|---|---|
| `recordId` | the record the button or trigger acts on | |
| `decisionsTable` | Use decisions | table |
| `udAcceptedImageField` | Accepted image | link |
| `udSlotsField` | Slots | link |
| `udReplaceField` | Replace | checkbox |
| `udConditionsField` | Conditions | single line text or long text |
| `udFactsReviewedField` | Facts reviewed | checkbox |
| `udDecidedByField` | Decided by | single line text or long text |
| `udDecisionSourceField` | Decision source | single line text or long text |
| `udEnteredByField` | Entered by | single line text or long text |
| `udDecidedBasisField` | Decided basis | long text |
| `udDecidedAtField` | Decided at | date, with time |
| `udDecidedSelectionField` | Decided selection | long text |
| `udLabelField` | Decision label | single line text or long text |
| `udResultField` | Result | single line text or long text |
| `udAppliedField` | Applied | checkbox |
| `udLiveBasisField` | Live basis | formula |
| `udRecordIntactField` | Record intact | formula |
| `udBasisCheckField` | Basis check | formula |
| `udEndedSlotsField` | Ended slots | long text |
| `acceptedTable` | Accepted images | table |
| `accRecordCompleteField` | Record complete | formula |
| `accProductsKeptField` | Products kept | lookup or rollup or formula or count or long text |
| `accSlotsKeptField` | Slots kept | lookup or rollup or formula or count or long text |
| `accCandidateTestField` | Candidate is test | lookup or rollup or formula or count |
| `accSourceCurrentField` | Source current | formula |
| `accTitleField` | Current title | lookup or rollup or formula or count or single line text |
| `slotsTable` | Product-page slots | table |
| `slotNameField` | Name | single line text |
| `slotActiveField` | Active | formula |
| `slotPickupOkField` | Pickup ok | formula |
| `slotChangePendingField` | Change pending | formula |
| `slotHeldField` | Held | formula |
| `slotKeyCountField` | Key count | formula |
| `slotOperativeField` | Operative fulfillment | formula |
| `slotPlanKeptField` | Plan kept | checkbox |
| `slotShotGuideCheckField` | Shot-guide check | formula |
| `slotInPlanField` | In adopted plan | formula |
| `slotRequestSupersededField` | Request superseded | lookup or rollup or formula or count |
| `slotTestField` | Test | checkbox |
| `slotKeptDefinitionLineField` | Kept definition line | single line text or long text |
| `slotKeptProductIdField` | Kept product ID | single line text |
| `slotReceivingBasisField` | Receiving basis | formula |
| `slotShareSignatureField` | Share signature | lookup or rollup or formula or count |
| `slotSizeField` | Size | lookup or rollup or formula or count |
| `slotProductFactsField` | Product facts | lookup or rollup or formula or count |
| `slotStatusField` | Status | formula |
| `slotRecordCheckField` | Record check | formula |
| `slotKeptPlanCheckField` | Kept plan check | formula |
| `slotProductRecordIntactField` | Product record intact | lookup or rollup or formula or count |
| `applicationsTable` | Applications | table |
| `appBasisField` | Basis | single select |
| `appKeyField` | Application key | single line text |
| `appSlotField` | Slot | link |
| `appAcceptedImageField` | Accepted image | link |
| `appUseDecisionField` | Use decision | link |
| `appKeptDestinationField` | Kept destination | single line text or long text |
| `appKeptReceivingBasisField` | Kept receiving basis | single line text or long text |
| `appKeptLabelField` | Kept label | single line text or long text |
| `appRecordedAtField` | Recorded at | date, with or without time |
| `appAccountField` | Account | single line text or long text |
| `appCurrentField` | Current | checkbox |
| `appCurrentSetAtField` | Current set at | date, with time |
| `appReplacesField` | Replaces | link |
| `appReplacedByField` | Replaced by | link |
| `appReplacedAtField` | Replaced at | date, with time |
| `appWithdrawnField` | Withdrawn | checkbox |
| `appTestField` | Test | checkbox |
| `appStateField` | State | formula |
| `appNameField` | Name | formula or single line text or long text |
| `legacyMap` | JSON, accepted record ID → { "product": product record ID, "facts": the facts its kept Standard states }; checked by K17 | |
| `refuseEarlierStandard` | empty, "no" or "false" (the P12 default), or "yes" or "true" (P12's alternative) | |
| `faultAfterWrites` | tests only: empty in the live base (K16) | |
| `account` | optional: the account that pressed, from the trigger, kept as Account; not evidence of who decided | |

### S6 Adopt guide

- **Trigger:** the Adopt this definition button on a shot guide.
- **Does:** it adopts the Definition as read at the press as a new version, in one update.
- **Refuses:** a guide with no active slot or an incomplete one; a missing decision record; a Decision source equal to the last adoption's; a Definition already adopted. The last doesn't apply where the Adopted definition reads Edited by hand: S6 then adopts again, and its log line says so.
- **Writes:** Adopted definition, Adopted version, Adopted at, Decided content (the guide's Decision content), the Adoption log with one appended line, and Adoption result.

| Input | Value in the demo schema | Field type |
|---|---|---|
| `recordId` | the record the button or trigger acts on | |
| `guidesTable` | Shot guides | table |
| `definitionField` | Definition | formula |
| `adoptedDefinitionField` | Adopted definition | long text |
| `adoptedVersionField` | Adopted version | number |
| `adoptedAtField` | Adopted at | date, with time |
| `adoptionLogField` | Adoption log | long text |
| `decidedByField` | Decided by | single line text |
| `decisionSourceField` | Decision source | single line text |
| `enteredByField` | Entered by | single line text |
| `decisionContentField` | Decision content | formula |
| `decidedContentField` | Decided content | long text |
| `adoptedDefinitionCheckField` | Adopted definition check | formula |
| `activeSlotsField` | Active slots | rollup or count or formula |
| `slotsIncompleteField` | Slots incomplete | rollup or formula |
| `incompleteNamesField` | Incomplete slot names | rollup or formula |
| `resultField` | Adoption result | long text or single line text |
| `account` | optional: the account that pressed, from the trigger, kept as Account; not evidence of who decided | |

### S7 Record decision

- **Trigger:** the Record decision button on a product (`kind` "product") and on a product-page slot (`kind` "slot"). These are two automations with the same bytes.
- **Does:** it records what the record shows at the press, with its decision record, in one update. It checks the values it is about to record, never the last record.
- **Refuses, on a product:** a missing decision record; not exactly one Shot guide link; no Assignment basis.
- **Refuses, on a slot:**
  - a missing decision record;
  - a kept plan that reads Edited by hand, or no kept plan;
  - an empty Fulfillment;
  - Share where the kept Fill rule isn't the share rule;
  - a departure from the Fill rule without a Fulfillment reason;
  - Not needed on an Always slot without a reason.
- **Writes, on a product:** Decided content, Decision recorded at, Recorded guide, Recorded guide ID and Record result.
- **Writes, on a slot:** Decided content, Decision recorded at, Recorded fulfillment, Recorded not needed, Recorded summary and Record result.

| Input | Value (on Products) | Value (on Product-page slots) | Field type |
|---|---|---|---|
| `recordId` | the record the button or trigger acts on | the record the button or trigger acts on | |
| `kind` | `product` | `slot` | |
| `table` | Products | Product-page slots | table |
| `decidedByField` | Decided by | Decided by | single line text |
| `decisionSourceField` | Decision source | Decision source | single line text |
| `enteredByField` | Entered by | Entered by | single line text |
| `decisionContentField` | Decision content | Decision content | formula |
| `decidedContentField` | Decided content | Decided content | long text |
| `decisionRecordedAtField` | Decision recorded at | Decision recorded at | date, with time |
| `resultField` | Record result | Record result | long text or single line text |
| `shotGuideField` | Shot guide |  | link |
| `assignmentBasisField` | Assignment basis |  | long text or single line text |
| `recordedGuideField` | Recorded guide |  | link |
| `recordedGuideIdField` | Recorded guide ID |  | single line text |
| `fulfillmentField` |  | Fulfillment | single select |
| `fulfillmentReasonField` |  | Fulfillment reason | long text or single line text |
| `notNeededField` |  | Not needed | checkbox |
| `notNeededReasonField` |  | Not needed reason | long text or single line text |
| `recordedFulfillmentField` |  | Recorded fulfillment | single line text |
| `recordedNotNeededField` |  | Recorded not needed | checkbox |
| `recordedSummaryField` |  | Recorded summary | single line text or long text |
| `keptFillRuleField` |  | Kept fill rule | single line text |
| `keptRequiredField` |  | Kept required | single line text |
| `planKeptField` |  | Plan kept | checkbox |
| `keptPlanCheckField` |  | Kept plan check | formula |

## Install

**The route** (§9.1): source, then the build copy, then the source PR, then the live base.

1. **Source:** these files, tested locally ([Tests](#tests)).
2. **Build copy:**
   - Duplicate the base privately, "AP-ASK demo // build copy".
   - Confirm it has no base or page share.
   - Confirm it kept the IDs that G2a, Snapshot, Accept and G1 hard-code.
   - Set G2a to `dry-run` (K14), and save the copy's own §7.8 values.
3. **Build and test in the copy:**
   - Apply the full change set in the live order below.
   - Install S1–S7 from this branch's committed bytes (K15), with the copy's bindings.
   - Run the Copy and Both tests of §10.1, with faults injected through `faultAfterWrites`, and K11c.
   - A fix is made here in the source, committed, reinstalled and retested, so what was tested is what is committed.
4. **The source PR:** these files and the copy's results. It is merged before the live base changes. If review changes a script, it is reinstalled in the copy and the affected tests run again first.
5. **Live:**
   - Pass the gate of §9.1 step 6.
   - Re-baseline (step 7).
   - Apply the change set in the live order, with the merged bytes, live bindings and `faultAfterWrites` empty (K15, K16).
   - Run K17 on the legacy map before S5 is turned on.
   - Read every new or changed automation back (K0), with no test records.

**The live order** (§7.8). Every intermediate state keeps the §7.8 values equal to today's. Read them after each step (K11), and save each replaced formula's text first, as its rollback.

1. Add the new tables and fields ([Schema](#schema)), with no change to existing formulas.
   - Create Product lines, Applications and Use decisions with the primary field "Name", Single line text. Once the fields their Name formulas read exist, convert each Name in the UI to its formula ([Formula texts](#formula-texts): Product lines › Name, Applications › Name, Use decisions › Name). Nothing is written to those Name fields before the conversion.
   - The other three new tables are created with their first listed field as the primary.
2. Set the existing brief's Workflow to Walkthrough.
3. Add the vessel's line to the existing brief, link the three existing shots to it, then tick Products confirmed.
4. Repoint the two lookups in the UI: Shots › Product image to Image through Lines in shot, and Candidates › Current intended use to Effective placement (K10).
5. Replace Current standard, Current prompt, Decision, Can generate, Ready and Status, each with its Changed text above, exactly as written. Save each live text first: it is the `LIVE` text in `sim/formulas.mjs`, with field names, and a difference stops the step.
6. Change Snapshot, Accept and G1 as §7.6 says. Their texts are not in this folder; the build record keeps their before and after texts.
7. **This unit's automations:** the ten automations of S1–S7, two each for S3, S4 and S7, each with the exact bytes of its file and its bindings. Turn each on (K0).
   - v6 places them in the change set without fixing their step, and this list puts them last ([Choices](#choices-made-in-the-source)).
   - None of them changes a §7.8 value.
   - None runs until pressed, except S4, which runs when an acceptance becomes Complete.

**After installing:**
- No other automation should watch the fields these scripts write.
- On interface pages, keep the kept-plan fields and Issued numbers on no page, and Retry applications on no public page. The Product pages view shows Settled images only (K9, §11).
- The Shots gallery's cards show Effective placement and Effective direction, and it leaves out shots whose Withdrawn is ticked. The Candidates gallery leaves out candidates whose Shot withdrawn is 1 (K9, §11). Both are page settings, made in the UI.
- The scripts need a plan that runs scripts in automations. Every run, including one that stops or refuses, counts toward the plan's automation runs.

## Retry

| Script | To retry | What a retry does |
|---|---|---|
| S1 | press Make product slots again | Makes only what is missing: a line added, a guide adopted or assigned later, a partial run. It never remakes a key that has a record. |
| S2 | press Make shots again | Makes only what is missing. A slot planned since gets nothing new. A shot left filling no slot, by a stop between a create and its relink, stays as it is: withdraw it after the pair check (§7.3). |
| S3 | press Replan again | Re-reads and refreshes what is in reach. A shot whose run stopped partway is finished by the next press; a slot refreshed already is refreshed again from the same live line, with a new Kept plan written at. |
| S4 | press Retry applications on the accepted record | Skips every existing key and finishes the rest. A Held slot is applied once it is recorded again. A Retry after Applications done still runs, and writes only if it creates an application. |
| S5 | press Apply this decision again | Finishes the same decision from its Decided basis. It adds no decision, writes no second application for any key, and doesn't rewrite Decided at. An Applied decision does nothing. |
| S6 | fix what the Adoption result names, then press again | It writes one update; a refused press writes only its result. |
| S7 | fix what the Record result names, then press again | As S6. |

- **Before a retry,** look at the automation's run history, and let a run still underway for the same record finish. An overlapping run can duplicate (Level 0).
- **A use decision part-way through** waits for a draft edit on one of its slots. Record or undo the draft, then press again (§7.7).
- **To stop a partly applied decision:** make its remaining slots not qualify by a recorded decision, then press again. They end "Applied in part".
- Airtable's Rerun of a past run repeats that run's settings. Use it only while the script bytes and inputs are unchanged.

## What stops a run

Each of these throws, writes nothing after it, and shows in the automation's run history. A refusal is not among them: it is a result ([How it works](#how-it-works)).

- **Every script:** an input missing, a binding that doesn't resolve, or a field of the wrong type. Each is found before any read or write.
- **S3 and S7:** `kind` isn't one of its two values.
- **S4 and S5:**
  - `faultAfterWrites` isn't empty or a whole number;
  - the application Basis select lacks the choice the script writes.
  - Each is found before any read or write.
- **S4 and S5, tests only:** the fault itself. N stops the run immediately after its Nth application write, which is a create or a change to Current. N = 0 stops S4 before its first application write, and S5 after its freeze, before any application write. S5's freeze is not counted.
- **S4:** a Slots kept line that isn't `slot ‖ definition line ‖ product ‖ receiving basis`.
- **S5:**
  - `legacyMap` that isn't a JSON object of record IDs, each naming a product record ID and its facts;
  - `refuseEarlierStandard` other than empty, no, false, yes or true;
  - a Live basis that doesn't name the source and slots as read, or a Decided basis that names none. These are internal invariants, and nothing is written.
- **Any write** that Airtable rejects, or a run that times out. The next press finishes it ([Retry](#retry)).

## What it does not support

- **Deleting records** in Guide slots, Product-page slots, Applications or Use decisions (§7.5). Where a deletion shows, it shows as Needs review, for example "its decision record is missing". Retiring a whole guide isn't built: a guide stops applying to a product when the product is assigned to another guide.
- **Hand edits beyond the detector.** These are unsupported, and nothing detects them:
  - editing a script-written field the detector doesn't watch, such as an application's Application key, Kept destination, Kept receiving basis, Kept label or Replaces, a shot's Pair key, Made as or Kept guide plan, or a candidate's Slots kept or Products kept;
  - editing a watched field within a minute of the script's write, or together with its time;
  - changing a slot's Line, Guide slot, Product or Request link.

  A hand edit the detector flags is held, not supported: it is cleared by the record's own press.
- **Overlapping runs.** Two presses together can duplicate a slot, a shot or an application key, or both put an application in use on one slot. The pair-check views find them (§7.3, §7.7). The executor withdraws the duplicate that carries nothing, and a conflict is resolved by a use decision with Replace. T2b, T3b and U8 record what Airtable actually does.
- **The Level 0 limits.**
  - The checks are observed-state checks, with no exclusion.
  - A change made after a run's read and before its write isn't seen by that run. Movement after a run's final read is seen only by the formulas and the next press.
  - Nothing is all-or-nothing across two writes.
- **Reordering a guide's slot links.** The Slot definitions rollup follows link order, so a reorder reads as a change and unadopts the guide, which is the fail-safe direction. Whether the rollup can be sorted by position is for the build to find (T24).
- **Outside this unit:** technical renditions, creative derivatives, export or delivery, assignment by rule or agent, and applications for collection, marketing or campaign destinations (§0).

## Clarifications built in

The reviewer's Stage-1 pass on v6 asked for three bounded clarifications. Each is in the source, the Status texts and the tests.

- **GPT-A: the accepted-image replacement route.**
  - A Make slot covered by its shot's acceptance can record a departure to "An accepted image", then take another shot's image through S5 with Replace.
  - While it waits, Status and S3's slot refusal say "apply a use decision with Replace" (`TEXT.coveredPickup`), rather than telling the operator to set Fulfillment back.
  - Once a use decision's application is in use on the slot, Status gives that application's state: "Unfinished" or "Replacement unfinished" while a Replace is interrupted, "Needs review" after a facts change. Settled, it reads "Has its image: used again from [title], [label]".
  - S3 never detaches such a slot. After a later adopted guide change it refreshes the slot on its shot when it is in Replan reach, and a new use decision with Replace settles it again.
  - Cases: GPT-A, GPT-A-later, TEXT-s3. The control is CTRL-GPT-A.
- **GPT-B: S2's existing-shot lookup respects membership.**
  - A Make slot's shot, a Share group's shot and a Pair key count only when the shot is not Withdrawn and fills an active slot, the same rule as the pair checks.
  - Cases: T24/GPT-B-make, T24/GPT-B-share, T35/GPT-B-make, T35/GPT-B-share and GPT-B-withdrawn. The control is CTRL-GPT-B.
- **GPT-C: a hand-edited Current, one predicate.**
  - In S5's selection check, an in-use application outside this decision's Decided selection whose State reads "Edited by hand" makes the slot wait, not superseded.
  - A fresh Replace decision fixed while it is in use captures it in its own selection, and applies. The older decision's next press then ends that slot as superseded.
  - Case: GPT-C. The control, CTRL-GPT-C, widens the predicate to any flagged Current and shows the recovery failing.

## Choices made in the source

Where v6 is silent or ambiguous, the source takes the reading below, the one most consistent with v6's stated principles.

**Schema, formulas and texts**
- **Result fields.** Refusals and results go to fields v6 doesn't name:
  - Adoption result on Shot guides (S6);
  - Record result on Products and on Product-page slots (S7);
  - Replan result on Shots and on Product-page slots (S3).

  T26's "nothing written" is read as nothing but that result field.
- **Two installations from one script.** S3 (`kind` shot or slot) and S7 (`kind` product or slot) are each one script installed twice. S4 is installed twice too, for its trigger and its Retry applications button.
- **Last-modified times.** The sim's default moves a last-modified time only when a watched value changes. `World({ lmtOnUnchangedWrite: true })` gives the other model. A create stamps every watched field it writes, empty values included, such as S4's alternate created with Current unticked. Whether Airtable leaves a blank last-modified time there is unknown, so every detector reads a blank last-modified time as not edited. v6 accepts either model, and the detector cases run both.
- **The guide's detector** (Adopted definition check) watches Adopted definition, Adopted version and Decided content against Adopted at. S6's adopt-over-a-hand-edit exception keys on it.
- **Withdrawal validity.**
  - Duplicate of must name one record with the same Slot key whose Withdrawn box is unticked.
  - A held record on either side reads "Withdrawal not valid: a record is edited by hand; record it again first".
  - A record named by a fixed, unapplied use decision can't be validly withdrawn.
  - Otherwise "recorded no earlier" compares the last-modified times of the two records' Decided content.
- **Slot Status.**
  - GPT-A: a Covered slot whose recorded fulfillment is "An accepted image" points to "apply a use decision with Replace" until an application of basis Use decision is in use on it. From then on the Placement state branches answer: Unfinished, Replacement unfinished, Conflict, Needs review, and, Settled, "Has its image: used again from [title], [label]".
  - **A slot's shot** is its linked shot that isn't Withdrawn. Live shot count and the slot's Shot lookups (Shot made as, Shot name, Shot accepted count, Shot accepted slots kept, Shot active slots filled, Shot active products) take only linked shots whose Not withdrawn is 1, the same rule as S2's. So a duplicate shot is only ticked Withdrawn (§7.3), and the slot it shares reads its kept shot alone. Where a slot's only shot is Withdrawn, the step reads "press Replan on this slot".
  - Added messages:
    - "the guide moved this image to another guide";
    - a fallback, "the guide changed it: adopt the guide's current definition, then replan";
    - an Edited-by-hand line for a slot whose in-use application's Current was ticked by hand.
- **Basis-line formats.**
  - A basis line joins its fields with ` ‖ `: slot ID, Kept definition line, product ID, receiving basis.
  - A receiving basis reads `share signature ⟨size: X⟩`, or `share signature ⟨size omitted⟩` without the size.
  - A Kept destination reads `Kept definition line ‖ product ID`.
- **Collection shots.** The formulas read the Kept guide plan's lines that begin `Placement: `, `View: ` and `Lineage: `, and find the guide slot's Definition line in it. S2 writes six lines in that form: Placement, View, Lineage, Includes, Choose count and Definition.
- **Product facts.**
  - Facts without size is the live Product facts text without the product's name, its "Product image as of" time and its size: `Must stay true: … Material: …. Finish: ….`. The name and the image time differ between two sizes of one style and color, so they can't be in the Share signature.
  - Product facts (lines) is the share key, `: `, Facts without size, ` Size: <Size>.` and the live Product facts' closing clause, ` Product image as of <time> UTC.`.
  - The standard uses Shared facts line, the share key, Facts without size and the same image clause, when Active slots filled > 1.
  - So a new-workflow standard carries the time of each product image the shot attaches, as the live Product facts does (v3 §5.1, "each line's product facts"). Replacing that image changes the standard, so its candidates' Standard check reads "The standard has changed since this image was made", which Accept refuses on (§7.6, as T36 for a color change). A shared shot's Lines in shot holds its input line only, so the time is the input product's; another size's image isn't attached and doesn't change it. v6 is silent on this, and the reviewer is asked to confirm it. Case: STD-image; its control is CTRL-STD-image.
- **Prompt lines.** Prompt line (lines) is the live Prompt line with ` Size: <Size>.` (v3 §5.1's prompt line: name, Must stay true, material, finish). Shared prompt line is style and color, then Facts without size, so a shared prompt carries the facts with no product name and no size (§7.1).
  - Including Facts without size (Must stay true, Material, Finish) goes beyond v6 §6's "style and color without the product name or size". It follows v3 §5.1 item 4, where each product's prompt line carries those facts. The reviewer is asked to confirm it.
  - The sim's demo products have no Material or Finish, so their lines read `Material: . Finish: .`. Enter Material and Finish on the new catalog products (v3 §1: "natural-fiber terry or waffle weave") before the live steps.
- **The request texts** (v3 §4), in the live brief texts' wording:
  - Request standard: Purpose, Direction, What may vary, the Message to carry when there is one, the Workflow, and the references' lines. The products come from the shot's lines (§7.1), not from the request.
  - Request prompt: Direction, What may vary, and the Message to carry when there is one.
  - Reference prompt: the live references paragraph, with each reference's prompt line. Shots look it up as Reference prompt.
- **The new standard and prompt** (§7.1, v3 §5.1):
  - The standard: the request standard; "Products, in image order:" and each line's facts; "Shot: name, for" the Effective placement, and the Effective direction; the Lineage; and, for a complete exception, "Exception reason: … Set by: …." (its text is in the Effective direction).
  - The prompt: the live opening sentence; "Shot: name, for" the Prompt placement, and the Effective direction; the request prompt; v3 §5.1's products paragraph and each line's prompt line; the reference prompt.
- **Ready's held standard label** needs a kept standard. The live Standard check is empty until Snapshot writes Standard used, so a new candidate reads "Preparing…", not "Held: the standard changed …", while it waits for Snapshot. v6's predicate was written against a Standard check that is never empty.
  - This adds a condition to an installed formula's text that v6 §7.6's literal predicate doesn't have. It needs the reviewer's approval; if approved, the build record lists it with the other Changed-formula departures. LIVE-7.8 ("a new candidate … not held") and CTRL-LIVE-ready exercise it.
- **The live field names** (the build copy's schema read):
  - a candidate's kept standard is Standard used, and the shot's current standard as the candidate sees it is its Current standard lookup;
  - Shot name looks up Shots › Title, a formula `{Name}`;
  - an accepted record's candidate link is Candidate record no. (its pair on Candidates is Accepted images); its primary is Recorded as, the candidate's title when it was accepted, written by Accept; its Current title is a formula over Candidate title now;
  - an accepted record's image is its own Image, an attachment Accept copies, so Applications › Source image reads that copy;
  - "the shot's current standard" on an accepted record is Shot standard now, a lookup through the record's own Shot link, which Accept writes with the candidate's shot; Coverage and Source current both read it;
  - "the candidate is Test" on an accepted record is Candidate is test, a rollup of the candidate's Test (a number); S4 and S5 read it as truthy;
  - Accepted at is a created time, and Generated at the last-modified time of the candidate's Image: neither is written, and S4 accepts a created time for Accepted at.
- **Existing rollups' aggregations.** The connector's schema read doesn't give a rollup's aggregation, so the build copy's field settings were read in its UI (2026-10-29): Shots › Acceptance coverage is `ARRAYJOIN(values, "|")` over Accepted images › Coverage, and Accepted images › Candidate is test is `OR(values)` over Candidate record no. › Test, neither with conditions or sorting. The sim gives them the same. Decision counts each "Current standard" (16 characters), so the separator doesn't change its value. Both are only read, never created here.
- **Counting links and files.** In the build copy a formula's COUNTA reads a link or attachment field as one value: Use decisions › Name read "→ 1 slots" with three slots linked, and a collection shot with all three of its request's lines read "it must include all the request's products" (U2, T6, T7). So a count comes from a Count field (Brief count and Lines in shot count on Shots, Duplicate of count on Product-page slots, Slot count on Use decisions), and COUNTA of a link or attachment field only tests for emptiness: `> 0`, `= 0`, or the COUNTA itself as a truth value. TEXT-counta checks every text for it, and CTRL-TEXT-counta is its control. A lookup is a list, so a lookup's COUNTA isn't affected.
- **Has image** (Products, References) is 1 for exactly one file (v3, K8). A formula reads an attachment field as its files' text, joined by commas, so one file is a non-empty field with no comma in it. That is v3's reason for comma-free filenames (K8), and a file whose name has a comma reads 0, which stops its shot planning rather than passing a second file. The build copy showed COUNTA give 1 for two files (K8), so it isn't used. K8-has-image checks the sim's function.
- **Candidates › Shot withdrawn** is a rollup of the shot's Withdrawn, `OR(values)`, which the Candidates page filters on (§11: "a filter that drops candidates on withdrawn shots"). v6 names the filter, not a field, and the live Candidates table has nothing to filter on.
- **Membership belongs to the request.** v6 §7.2's membership row names the count rules only ("v3: All, or Choose with a current confirmation"), but T7 is "as v3", and v3's T7 and §5.2 also require every line in the shot to be one of its request's lines. So a collection or written shot isn't Planned while a line from another request is in it: "Not planned: it may include only its request's products". It compares the lines' Request IDs, made unique (Line request IDs), with the shot's Request ID, before the count rules. A product-page shot already holds only its slot's line (T7-membership).
- **Test checkboxes.** Products, References and Briefs have no Test field in the live base, so each gets a new checkbox.
- **New tables with a formula primary.** Product lines, Applications and Use decisions keep v6's display, a formula Name, as the primary. The connector can create a primary only as a stored field and can't change a field's type, so each table is created with "Name" as Single line text and the field is converted to its formula in the UI (Install, step 1). Applications and Use decisions list Name first for that reason.
- **Held** reads the slot's own Product link, the kept product, for the product's Record intact and for its recorded guide's Adopted definition check. In adopted plan compares Kept product ID with the line's current product.
- **Formula values.** Lookups drop empty values. An unticked checkbox reads null, as in Airtable scripting. A formula's empty text reads null through the API.
- **Live texts.** Every existing formula the new formulas read, and every Changed formula's unchanged part, is the live text ([Formula texts](#formula-texts)). None is a stand-in.
- **Pair keys** are plain concatenations with no separator:
  - line ID + guide-slot ID;
  - request ID + guide-slot ID + share signature;
  - request ID + guide-slot ID.
- **Install position.** v6 places S1–S7 in the live change set without fixing their step among §7.8's. This README puts them after step 6, since none changes a §7.8 value.

**S1 Make product slots**
- **"Every record is withdrawn"** is said when every record for the key has Withdrawn ticked, valid or not, so T28's "withdraw every record" case reads as v6 says. Otherwise S1 counts the records that aren't validly withdrawn.
- **What the note lists.**
  - A held slot reads `<Product> · <position>: <the slot's Status>`.
  - A product whose record reads Edited by hand, or whose assignment change waits, is listed before its guide is checked.
  - An earlier version's waivers and departures are sorted by slot name, so product by product.

**S2 Make shots**
- **GPT-B's predicate.** A shot counts when it isn't Withdrawn and at least one slot linked to it, in any request, has Active = 1. The same predicate decides a Make slot's shot, a Share group's shot and a Pair key.
  - A slot linked only to a shot that doesn't count gets a new shot, and is relinked to it alone.
  - A Pair key held by a shot that counts stops S2 for that slot, and the note reports it.
- **A Share group's existing shot.**
  - It is a Share shot of this request, linked from any slot of the group in any state, that counts. A group is its slots' guide-slot ID and share key.
  - "The shot's share signature" is its input line's.
  - More than one such shot is reported, not joined.
- **Links.** New shots are created with their slots in the create call, through Slots filled. Joins, and a slot still linked to a Withdrawn shot, write the slot's own Shot link by an update after the create. A run that stops between that create and the relink leaves a shot that fills no slot, which the view of shots that fill none shows (§7.3).
- **Names.**
  - A Share shot takes the first slot's product Style and Color: "Terry towel, white · 1 Folded".
  - A Make shot is `<product> · <Kept position> <Kept slot name>`.
  - A collection shot is `<request name> · <guide slot name>`.
- **Test.** A new shot's Test is ticked when its request or any of its slots is Test.
- **The note.**
  - It lists every Make or Share slot of the request that isn't ok and isn't waived or validly withdrawn, with its Status, whether or not it has a shot: a held slot, or one whose recorded fulfillment no longer matches its shot, is listed, not counted as planned. Slots that left the plan are included.
  - "Already planned" counts only ok slots with a shot that counts.
  - Differing facts are quoted.
  - For a Share group whose shot has an accepted image, it offers a departure to "An accepted image" with a use decision, or a departure to Make and a new press.
- **Collection shots.**
  - Lines in shot is all the request's lines, in request order, for Includes "All products in the request". It is empty for Choose, and the note asks for the choice and its confirmation.
  - S2 makes nothing without an adopted, Complete collection guide.
  - A collection pair is found by Pair key or by From guide slot, among the request's shots that aren't Withdrawn. GPT-B's active-slot filter doesn't apply, since a collection shot fills no product-page slot.

**S3 Replan**
- **What a refresh writes:**
  - Kept definition line, Kept guide version (the Adopted version), Kept guide name, Kept slot name, Kept position, Kept placement label, Kept view and Plan kept;
  - Kept plan written at, the time of the write.

  It doesn't rewrite Kept required, Kept fill rule, Kept guide ID or Kept product ID, which reach guarantees unchanged.
- **Refusals and their order.** A slot whose guide isn't Complete is refused even in reach, and reported per slot. A slot outside reach gets the first reason that applies:
  1. request superseded;
  2. product reassigned;
  3. product replaced on the line;
  4. guide slot moved;
  5. guide not Complete;
  6. guide slot retired;
  7. obligation changed, which compares Required and Fill rule, and on a collection shot also the Includes and Choose count lines with the live guide slot;
  8. otherwise "adopt the guide, then replan".
- **A Held slot** linked to a shot refuses the whole shot, with no refresh and no repoint. The remedy depends on what was edited:

  | Edited | Remedy |
  |---|---|
  | the kept plan | a new version of the request |
  | the slot's record | "record [slot]'s decision again first" |
  | the product's record | "record [product]'s assignment again first" |
  | the guide's adoption | "adopt [guide] again first" |
- **The active slots after a shot's Replan** are those Active before or refreshed now. Lines in shot is repointed when it isn't exactly one active slot's line. An existing active line is kept where there is one; otherwise it takes the first active slot's line in request order.
- **Slot-level Replan:**
  - On a shot without an accepted image whose fulfillment still matches: "This slot is planned with its shot: press Replan on the shot."
  - With a recorded mismatch, or on an accepted shot whose acceptances don't cover the slot: it detaches the slot, then refreshes it if it is in reach, in one update. While a change waits, it refuses: "Record the decision for this change first."
  - Covered and matching: it refreshes only.
  - Covered with a recorded mismatch: it refuses with the §7.5 text. Where the recorded fulfillment is "An accepted image" (GPT-A's route), it doesn't detach: it refreshes the slot when it is in reach, as on any accepted shot, and adds GPT-A's text to the result. S3 keeps these two texts as constants, and TEXT-s3 checks they equal the Status texts.
  - The slot's shot is its linked shot that isn't Withdrawn. A slot linked only to Withdrawn shots is treated as having no shot: it is refreshed if in reach, and S2 relinks it.
- **The Detach log line** is "Detached from <shot name> on <ISO time>, Fulfillment now <operative fulfillment>". It adds "; its shot was accepted without it" when the slot matched but wasn't covered. Lines are appended.
- **Other refusal texts.**
  - A collection shot with an accepted image: "Not replanned: this collection shot has an accepted image; its kept plan stays as it was accepted."
  - Written and walkthrough shots get one refusal text, naming product-page and collection shots.

**S4 Apply acceptance**
- **Applications done is a latch S4 never clears.** A Retry after it is ticked still runs: it skips existing keys, and writes only if it creates an application. A kept slot skipped while it was waived, then reopened, can then get its application, which v6 offers no other way to do. v6 gives S5's Applied an explicit "nothing happens" rule, and says nothing similar for S4.
- **`account`** is an optional input to S4 and S5, as to S6.

**S5 Apply use decision**
- **Step 4's order.** First the selection. An in-use application outside the slot's Decided selection ends the slot as superseded, unless its State reads "Edited by hand"; the slot then waits (GPT-C). Only applications outside the selection count. Then:

  | Order | Condition | Result |
  |---|---|---|
  | 1 | the request is superseded | final |
  | 2 | the slot is Held | waiting |
  | 3 | the slot isn't active; its fulfillment no longer qualifies; its kept line, product or receiving basis changed; the source isn't Complete; Test-to-Test fails | final |
  | 4 | a change waits for its record; an unadopted guide edit; Key count isn't 1; anything else | waiting |

  A waiting slot leaves Applied unticked, and the remaining slots are still processed in the same press.
- **Ended slots.** A superseded or final slot is recorded at once in Ended slots, one line `slot ID: what ended it`, written only by S5, which never removes a line. A later press reports a slot listed there without checking it again, so a slot ended while another waited stays ended once its cause clears (v6 §7.7 step 4: a final failure "ends the slot for this decision"). The detector doesn't watch Ended slots: a line removed by hand lets the next press check that slot again.
- **`faultAfterWrites`.**
  - It counts application creates and Current changes. S5's freeze isn't counted.
  - S4 with N = 0 stops before its first application write. S5 with N = 0 stops after the freeze, and, in the edited-record branch, where no freeze happens, before writing.
  - Any value that isn't empty or a whole number throws before any read.
- **Extra inputs.**
  - `legacyMap` is JSON, `{ "<accepted ID>": { "product": "<product ID>", "facts": "<facts>" } }`. Its facts are compared with the receiving product's existing Product facts text, through the Product facts lookup on slots.
  - `refuseEarlierStandard` is empty, no or false (the default), or yes or true, P12's alternative.
- **Facts reviewed** relaxes only the facts comparison, on the legacy route too. Membership still holds by product ID, or by share key where the source omits size, and size isn't compared.
- **Comparing a slot's basis.** Step 4 compares the slot's Kept definition line and Receiving basis, read as their formulas give them, with the parts of its line in the Decided basis, untrimmed. A product with no style or color has a receiving basis that begins with a space, and a trimmed read ended its slot as "its product's facts changed" in the run that fixed the decision (the build copy, U9). U9-unstyled covers it, and CTRL-U9 is its control.
- **By share key** applies only where every Products kept line reads "size omitted". The application's Kept receiving basis is then written in the `⟨size omitted⟩` form, and step 4 compares receiving bases without size.
- **Decided selection** is one line per slot, `slotID: appA, appB` with the IDs sorted, or `slotID: none`.
- **What the application keeps.** Kept label is computed from the Decided basis's "Decided by:" line, as decided. Recorded at is Decided at.
- **Replace** takes out of use only applications in the selection that are in use: Current and not Withdrawn. It keeps an existing Replaced by, but still writes Current = false and Current set at.
- **"Edited after it was decided"** appears in the Result only when the decision's own part of the basis changed: its source, the slot list, replace or add, Facts reviewed, Conditions or the decision record. A replanned slot or changed facts also move Basis check, and are reported per slot instead.
- **Result formats:**
  - "Applied to N slot(s).";
  - "Applied in part: N of M; [slot] not applied: [reason]; [slot] superseded by [application name].";
  - on a wait, "Not finished: applied to N of M slots." and bullet lines.

  The edited-record branch writes v6's text, and takes M from the Decided basis.
- **Step 2's refusal order:**
  1. Test-to-Test;
  2. Held;
  3. change pending;
  4. not active;
  5. Key count;
  6. no kept plan;
  7. shot guide changed;
  8. fulfillment and in-use, on the Replace path;
  9. product basis.

  So U30's draft departure reads "a change waits for its decision record".
- **Script details.**
  - Lookups are read with a helper that accepts plain arrays or `{ linkedRecordId, value }` items.
  - S4 and S5 check that the Basis select has the choice they write before any write.

**S6 Adopt guide**
- **The Account** in the Adoption log comes from an optional `account` input, meant for the button trigger's clicking user.
- **The last adoption's Decision source** is read from the last "Decision source:" line of Decided content.

**S7 Record decision**
- **Refusals on a slot,** beyond v6's: a kept plan that reads Edited by hand ("plan it in a new version of the request"), a slot with no kept plan, and an empty Fulfillment.

## Tests

```bash
node tools/shot-planning/run-tests.mjs            # every case
node tools/shot-planning/run-tests.mjs T22 CX6    # cases whose ID or file name contains a filter
```

**The runner.**
- It runs every `tests/*.test.mjs` and prints one PASS or FAIL line per case, with any failed check under it.
- It ends with a total, and exits 1 on any failure.
- A case passes only if it runs to the end, makes at least one check, and every check holds.
- It runs on Node 22 in a few seconds.

**What the tests run.**
- They run the exact bytes of each script against the simulated base in [`sim/world.mjs`](sim/world.mjs). It is generalised from `tools/candidate-numbering`'s, and not imported from it.
- Record IDs are random, and unsorted queries return an arbitrary but stable order.
- One table operation is applied at a time, in an order a test can script, which is how the double-press cases force an overlap.
- The sim's clock is controlled, which places a hand edit more than a minute after a script's write, or within it.
- The formulas are the JavaScript functions in `sim/formulas.mjs`, computed on read.
- `tests/fixtures.mjs` holds the demo catalog and the presses. It stands in for Snapshot and Accept with setup writes of what v6 says they write.
- The sim also has N2's crash injection and torn-read mode. No case uses either: interruption is tested through `faultAfterWrites`, and overlap through scripted interleavings.

**Local and copy-only rows.** v6 §10.1 marks each row Local, Copy or Both. In a Both row, the local run checks the scripts' decisions against simulated formula values. The formulas' own values, and what a page shows, are checked only in the build copy.

| v6 row | Local cases |
|---|---|
| T1, T2, T4, T4b, T5, T8b, T14, T25, T26, T30b, T33, T42 | the same IDs (T25's row is Copy; its local case checks Complete) |
| T3 | T3, T3-collection |
| T4c | T4c, T4c-s3 |
| T8c | T8c, T8c-s2 |
| T9, T39 (CX5) | T9/CX5, T39/CX5, T39-s1 |
| T10, T11 | T10, T11 |
| T22 (CX1) | T22/CX1, T22-s3 |
| T23 | T23-adopt, T23-replan |
| T24 | T24-R1, T24/GPT-B-make, T24/GPT-B-share (the link reorder is copy-only) |
| T27 (CX2) | T27/CX2 |
| T28 | T28, T28-s2 |
| T29 | T29, T29-s2 |
| T31 (CX3) | T31/CX3 |
| T35 | T35-s1, T35/GPT-B-make, T35/GPT-B-share |
| T40 (CX6) | T40/CX6, T40-apps |
| U2, U3, U4, U5, U6, U7a, U7b, U7c, U10, U12, U14, U16, U17, U18, U19, U20, U21, U23, U27 | the same IDs |
| U25 | U25, U25-final |
| U30 | U30, U30b |
| U15 (CX4) | U15/CX4 |
| U24 | U24-s7, U24-s5 |
| U26 (CX7) | U26/CX7 |

**Copy rows with a local part:**

| v6 row | Local part | What stays copy-only |
|---|---|---|
| T2b | T2b-local, a forced double press of S1 | what a real double press does |
| T3b | T3b-local, a forced double press of S2; T3b-withdrawn, its duplicate only ticked Withdrawn | what a real double press does |
| T12, U1 | T12-s4, S4's part | Accept, Approved for, the pages |
| T20 | T20-s1, S1's part and the formulas | the shots, G1, Accept and pages |
| T21, U22 | U22-local | the guide edit in Airtable, the pages |
| T30 | T30-local, S3's logic | the shot's candidates and pages |
| T37 | T37-local, T37-s3, T37-s4s5 | real last-modified behaviour, the within-a-minute limit in Airtable, field permissions |
| T41 | T41-local | the clearing in Airtable, the pages |
| U13 | U13-local | Accept's alternates in Airtable |

**Copy only, with no local test:** T3c, T6, T7, T8, T8d, T13, T16, T17, T18, T19, T32, T34, T36, T38, U8, U9, U11, U28 and U29. Each needs Airtable's own formulas, lookups, automations, pages or concurrency. U9's legacy-map logic is exercised locally by U23.

**Other cases:**
- **GPT-A, GPT-A-later, GPT-B-withdrawn, GPT-C:** the clarifications above. GPT-B-withdrawn-stale is a slot whose only shot is Withdrawn, made stale by an adopted change: its step reads "press Replan on this slot", and slot-level Replan refreshes it.
- **Negative controls,** each a mutated copy of a script or formula, showing the check that guards a mechanism failing for the reason it exists:

  | Control | What it disables | Guard that fails |
  |---|---|---|
  | CTRL-CX5 | Replan reach (S3 reads Active) | T39 |
  | CTRL-CX6 | Waived from the recorded field (it reads the editable box) | T40 |
  | CTRL-CX7 | the Decided-selection subset check (it compares exact identity) | U26's earlier-decision case |
  | CTRL-DRAFT | the waiting/final split (a draft ends the slot) | U25: a draft latches Applied |
  | CTRL-R1 | the guide in the slot key (S1's key and the Slot key formula) | T24-R1 |
  | CTRL-GPT-B | GPT-B's membership filter | the GPT-B guards |
  | CTRL-GPT-C | GPT-C's predicate (widened to any flagged Current) | GPT-C's recovery |
  | CTRL-GPT-A | S3's refresh on GPT-A's route (it refuses outright) | GPT-A-later |
  | CTRL-FINAL | Ended slots (not read on a later press) | U25-final |
  | CTRL-U30b | the Held term of step 2's Replace-path checks | U30b's held case |
  | CTRL-WITHDRAWN-S3 | S3's Withdrawn filter on a slot's shot (it takes the first linked shot) | GPT-B-withdrawn-stale |
  | CTRL-S2-OK | S2's Slot ok check before "already planned" | S2-guards |
  | CTRL-LIVE-ready | Ready's "has never had an image" guard (held labels on every candidate) | LIVE-7.8: an image candidate stays "Ready to generate" |
  | CTRL-STD-image | the product image's time in Product facts (lines) and Shared facts line | STD-image: a candidate made from a replaced image reads changed |
  | CTRL-U9 | S5's untrimmed read of a slot's receiving basis (it trims) | U9-unstyled: a slot whose product has no style or color is applied |

  Each control also checks something only a mutated run that finished produces: that the script ran to the end, or the result text it writes. So a crash or a stall can't pass for the guard failing.

  SCHEMA-refs carries its own control, a misspelt field. TEXT-counta's control, CTRL-TEXT-counta, shows the texts the build copy showed wrong flagged and their emptiness tests passed. TEXT-readme's, CTRL-TEXT-readme, shows a one-character change and a missing text flagged.
- **Binding and hygiene cases:**
  - BIND-* stops a run before any read or write for a wrong or missing binding or input;
  - BIND-ids* shows each script bound by table and field IDs behaving as when bound by name;
  - HYGIENE checks no import, require, Node API or top-level return, one `input.config()`, and `await main();` last;
  - SCHEMA-refs is described under Formula texts.
- **Text and guard cases:**
  - LIVE-unchanged, LIVE-changed, LIVE-7.8 and LIVE-new-branch check the existing and Changed formulas against the live texts, and the new standard's and prompt's composition (Formula texts);
  - STD-image checks that replacing the product image a new-workflow shot attaches changes its standard, and that on a Share shot only the input product's image counts (Choices: Product facts);
  - TEXT-s3 and TEXT-s4s5 check the scripts' copies of Status texts against `sim/formulas.mjs`;
  - TEXT-counta checks that no formula counts a link or attachment field with COUNTA, and TEXT-readme that the README's formula texts are `sim/formulas.mjs`'s (Formula texts; Choices: Counting links and files);
  - K8-has-image checks Has image's one-file rule, T7-membership a line from another request, and K9-candidates-filter the Candidates page's filter field (Choices);
  - S4-guards covers S4's own refusals;
  - S2-guards covers S2's note for a slot that isn't ok but has a shot.

## What the local tests do not show

The tests show the scripts' logic on a simulated base. They don't show what Airtable does. In particular, none of these is observed here:

- **The formula texts.** None has been run in Airtable, including REGEX_EXTRACT and REGEX_REPLACE in the slot Status and in Shots › Effective placement, Effective direction and Lineage, IS_BEFORE in Withdrawal, and the detector's `DATETIME_DIFF(…, 'seconds') > 60` with its blank-time guard. Nothing checks a text against its JavaScript mirror. The copy checks, among others, a collection shot's Current standard ("for Collection grid", without the label), and that an alternate S4 creates with Current unticked reads Alternate.
- **Conditional lookups.** Live shot count and the slot's Shot lookups take only linked shots whose Not withdrawn is 1. The sim models Airtable's "only include linked records that meet conditions"; the copy checks it.
- **Last-modified times.** Whether Airtable moves one on an unchanged write is unknown, and T28 depends on it. Under the other model, re-recording a withdrawn record's unchanged decision moves its Decided content time past the kept record's, which makes the withdrawal invalid ("carries a decision"). T28 runs in the default model only; T37 records which model Airtable follows.
- **Links.** Writing a link from its inverse side ("Slots filled") in a create call, and appending to an existing link, are modelled, not observed. So are lookups through deleted records, and the order of a link and of its inverse. In the sim, a new inverse link is appended at the end, and Slot definitions follows the guide's link order.
- **The cell shapes scripts read.** S2 and S3 read lookups and rollups with `getCellValueAsString`, assuming comma-joined text. S4 and S5 accept plain values or `{ value }` items.
- **The button trigger.** Whether it can pass the clicking user as `account` is unverified.
- **Snapshot, Accept and G1.** Their behaviour here is the fixtures' stand-ins, not the automations: the Planned gate, the kept payloads (Standard used, Prompt used, Intended use, the image copies, Slots kept, Products kept), and Accept's record (Recorded as, Candidate record no., Shot, Image, Approved for, Standard, Accepted by and its ID). That Accept writes the accepted record's Shot as its candidate's shot, which Shot standard now reads, is the copy's to confirm.
- **The two existing rollups' aggregations** (Acceptance coverage, Candidate is test) aren't in the connector's schema read. The copy's UI shows them ([Choices](#choices-made-in-the-source)), and the sim now gives the same. Its records show each existing shot with one acceptance, its Acceptance coverage "Current standard", and Candidate is test 0 on both accepted records.
- **A newline in a guide slot's View** would break the line-based parsing of Slots kept and Products kept. S4 throws on a malformed line; S5 tolerates it in Decided basis.
- **Noted for review:**
  - S2's note also lists slots that left the plan, which is noisy, and an old slot can share a name with its new slot.
  - Replan copies the guide's current Adopted version even when a slot's line is unchanged, so a version-only refresh changes the shot's lineage, and its earlier candidates read "changed".
  - After a slot-level Replan on an accepted shared shot, its slots can hold different kept versions, so the shot's Lineage shows two lines.
  - Basis check reads "Edited after it was decided" after a replan or a facts change, not only after an edit to the decision, as v6's Live basis defines it.
  - In T37's within-a-minute case, the missed hand tick operates as a real application in use, which a pending Replace decision would then end as superseded. That is v6's stated limit, recorded rather than counted as a pass.
