# Candidate Workspace UX Contract

**Release:** r1

## Posture

The application-layer contract for an operational candidate workspace: an interface where people request candidate images for a shot, follow each request, and review the results. It is the shared blueprint for that workspace: which views people use, what each shows and allows, what its actions do, and what an update must preserve. It applies the architecture to one task; it is not a schema, a generator, a design-system module, a workflow engine, an approval mechanism or a register of installations, and it confers no authority.

## Owners

- **Vocabulary:** [Domain-Facing Vocabulary](../method.md#domain-facing-vocabulary). A shot is the requested image; a candidate is one attempt at it; an accepted image is a candidate accepted for a stated use.
- **Review roles and their colours:** design-system-ASK's [Review Semantics](https://github.com/apexSolarKiss/design-system-ASK/blob/main/review-semantics.md). This contract maps interface states onto its roles. It mints no role and no colour.
- **Decisions:** each installation's own decision records (an acceptance record, or a preference). The interface displays them. A display never makes a decision.
- **Numbering implementation:** [`tools/candidate-numbering/`](../../tools/candidate-numbering/README.md), its script, tests, installation and recovery.
- **This document:** the views, the requirements, the variants, the Airtable binding, and how installations take a release.

The reference demonstration base shows the experience working; this document records the rule. The bases demonstrate the contract; they do not own it.

## Views

Each view is a responsibility, not a required page: an installation may combine views on one page, and may add a page of its own for a real task, such as a start page.

| View | What people see and can do | Primary action | When empty or refused | Leads to | Serves |
|---|---|---|---|---|---|
| Shots | Every requested image, each with its chosen-result coverage in words | Open a shot | A shot without a chosen result says so in words | Shot | slot |
| Shot | The governing brief and standard, the direction people may edit, then the candidates: chosen results first, then newer alternatives | Generate new candidate image | No candidates yet, or a refused request explained on the shot | Candidate | slot context, candidate generation |
| Candidates | Attempts across shots, each with its shot visible and filterable | Open a candidate | No candidates yet | Candidate | candidate generation |
| Candidate | The image, its plain status, its kept inputs and its decision state | Accept for this use; or Preferred, with feedback | No image yet, in a plain status; a refused review action explained on the candidate | its shot | candidate, curation seam |
| Accepted images (formal acceptance only) | What was accepted, for which use, by whom, when, and against which standard | None | No accepted image yet | the candidate | governed asset, decision record |

An installation's record names the page that carries each view, and where its records, editable fields, actions or empty states differ from this table. The reference demonstration supplies the visual realization. There is no pixel specification and no screenshot archive.

## Requirements

Each requirement has a stable ID for installation records.

**UX-01 // One deliberate request action.**
- A person asks for a new candidate image with one action on the shot, labelled by its outcome: **Generate new candidate image**, with no article.
- The confirmation names any spend.
- Internal steps, such as making the record, copying its inputs and checking files, are not user tasks.

**UX-02 // Truthful progress, in plain words.**
- Each candidate shows one plain-language status: its current state, and anything it needs from the person.
- A status claims only what is observed. A requested image reads as requested, not as generating.
- Recovery instructions and diagnostics sit in a secondary detail area. A refusal is explained where the refused action is.
- Copy is plain, active and literal, without idioms.

**UX-03 // Every decision state is visible; colour distinguishes it.**
- Every state stays visible in words, including the absence of a decision. Colour reinforces the words and never replaces them.
- Colour follows the state's Review Semantics role:

| State | Words in the reference implementation | Review Semantics role | Colour |
|---|---|---|---|
| No decision recorded | Not accepted | `none` | neutral |
| Decision being recorded | Recording acceptance… | no role: a system step | neutral |
| Accepted for a use | Accepted for [use] | `accepted` | green |
| Declined, only where a workflow records a decline | Declined | `declined` | red |

- An implementation may use its users' own words for a state, provided they name the same state (Domain-Facing Vocabulary).
- Absence is not refusal. Nothing is shown as declined unless a decline is recorded.
- Preference is not acceptance. A preference keeps its own word and control, and takes neither the accepted colour, as a candidate or shot accent, nor its meaning. A control's own native styling, such as a checkbox's colour, is not a review-state colour.
- Currency is a separate dimension. An acceptance made against an earlier standard remains an acceptance, at its scope; whether it still matches the current standard is shown beside it, not by changing its state.
- A displayed state is derived from the decision record. Any coloured field or projection is read-only and downstream of that record, never a second way to make or change a decision.
- A displayed value that another rule or automation consumes as a control value is not reworded for display alone. Rewording it is a dependency migration of every consumer together.

**UX-04 // Chosen results first; new work stays discoverable.**
- On a shot, chosen candidates come first: accepted ones, or preferred ones in the preference variant. The others follow, newest first.
- A new request appears first among the others. It stays on the first page while the chosen results are fewer than a page.
- Several chosen results may coexist. Requesting another candidate never displaces a choice.
- The shot shows in words whether it has a chosen result, such as "Accepted for Website hero" or "No accepted image yet". Test and incomplete records never make a shot look covered.
- Shot coverage means coverage of the current ask. A shot whose only acceptance was made against an earlier standard says so, such as "Accepted under an earlier standard", and takes no accepted colour.
- A list that spans shots keeps each candidate's shot visible and filterable.

**UX-05 // Stable shot-local numbering.**
- A candidate's visible title is [shot] // candidate [number within that shot].
- The number is fixed when the candidate is admitted to its shot and never changes. Sorting, filtering, acceptance, preference, deletion and later candidates never renumber a candidate.
- A number once issued in a shot is never issued again there. Gaps are allowed, for example where a candidate was deleted; they are not filled.
- An attempt that fails to produce an image keeps its number. It was an attempt.
- Until its number is written, a candidate's title is neutral, "[shot] // new candidate", never a guessed or duplicated number.
- The base-wide record number stays visible in details as the legacy reference. Records made before shot-local numbering cite candidates by it.

**UX-06 // Fixtures stay out.**
- Test records are excluded from galleries, shot summaries, ordering and the production number sequence.
- A test is marked as a test when it is created. A record marked as a test after it was numbered keeps its number, which is not issued again.
- Testing the production path creates genuine candidates.

**UX-07 // Saved context survives presentation changes.**
- What made a candidate (its kept inputs and standard) and every decision record (who, when, for which use, against which standard) are shown read-only and never rewritten for display.
- Where a current display identity differs from a recorded one, the interface shows the current identity through the preserved relationship and keeps the recorded value in details.

**UX-08 // Verified publication; no incidental changes.**
- Every change is checked on the published page people use, not only in the editor.
- Interface work changes no sharing, invitation, collaborator, spending allowance or creative decision as a side effect.
- A preview of an unpublished interface can still run a live paid action. A probe never uses a spending control.

## Variants

- **Formal acceptance.** Acceptance is a recorded decision for a stated use, and UX-03's accepted row applies. The AP demonstration base is the reference implementation.
- **Preference.** A reviewer marks preferred candidates and leaves feedback. There is no acceptance record and no Accepted images view. UX-04 applies with "preferred" in place of "accepted", and UX-03's accepted colour does not apply to preference. The preference control keeps its existing native styling. A client pilot implements this variant.

A difference between variants is not nonconformance.

## Airtable Binding

How the requirements are built in Airtable. Current connector capability is in [`airtable-connector-tool-capability-limitations-v1.md`](../airtable-connector-tool-capability-limitations-v1.md); this section does not restate it.

### Decision display (UX-03)

- The decision text is a formula over the decision record: for acceptance, whether a linked acceptance record exists and is complete. Its words are the visible state.
- Colour comes from the interface's record coloring by conditions on each candidate gallery, keyed on that formula's words: Airtable's bright green when it reads "Accepted for…", and no colour otherwise. It marks the card with a coloured accent, which each implementation confirms on its published pages. It needs no extra field and no automation, so it cannot drift from the record.
- Bright green is the nearest native value to Review Semantics `accepted`. It is an approximation in a native substrate, not Review Semantics conformance, whose composition applies to documents that carry its classes.
- Record coloring is a paid-plan feature. Without it, the words, the order and an accepted-images section carry every state.
- Fallback, only for a layout that colours by a select field alone: a single-select display field with fixed options, written only by an automation from the decision record, never editable in any interface, and checked against its source. It is not used where conditions work.
- Ranking formulas, colour conditions and summaries key on the decision formula's words, as acceptance guards may. Changing those words changes every one of them together.

### Order and shot summaries (UX-04)

- A numeric rank formula on the candidate, chosen first, is the gallery's first sort key. The record number, newest first, is its second: it follows creation order and has no ties.
- A shot's coverage is computed from its decision records, counting only complete, non-test records of non-test candidates, and comparing each record's kept standard with the shot's current standard.
- The shot summary is a formula over that coverage. The shots gallery colours a covered shot by the same condition as candidates.

### Numbering (UX-05)

- Each base has a hidden issued-numbers table. When a genuine candidate is admitted to its shot, the numbering automation adds a row for it, linked to the shot and keyed to the candidate, and writes the row's number once. In this binding, a candidate is admitted when its first row is added.
- A candidate's number is one more than the number of other candidates with an earlier row in its shot, so numbers follow the order rows were added. Overlapping runs can add extra rows for a candidate; only its first row counts.
- A candidate's place depends only on earlier rows. Nothing but the automation writes rows, and nothing removes them: an operator rule, since anyone with editor access to the base can still change them. A repeated, overlapping, late or failed run therefore gives the same number, and a deleted candidate's row keeps its number issued.
- The script is the same in every base. Each automation's inputs bind it to that base's tables and fields.
- This holds on one assumption: a base applies its writes in one order, a read sees every write committed before it began, and an autonumber follows that order. The tests exercise the script under that assumption, and each installation's first numbering runs it in Airtable. Neither proves the assumption.
- Supported: admission; a retry through a field used only for numbering, never the test flag; clearing a number, which gives the same number back in the same base, or a copied record a number of its own; deleting a candidate; marking a numbered candidate as a test.
- Not supported: changing a candidate's shot, since its kept inputs came from that shot; editing, removing or reordering rows; typing or copying a number. A run stops without writing a number when one of these collides with the number it is about to write or moves a row it relies on. It cannot detect a copied or typed number equal to one already issued, a shot change after its last read or on a candidate already numbered, or a candidate deleted together with its row.
- Existing candidates are numbered at installation by the automation itself, one at a time in record-number order. The installation keeps the resulting crosswalk of record, record number, shot and number. Decision records made before the change keep their recorded names.
- Installation, migration, retry, the stops and copies: [`tools/candidate-numbering/README.md`](../../tools/candidate-numbering/README.md).

### Saved context (UX-07)

- A decision record keeps the title it copied when the decision was made. An accepted-images display shows the candidate's current title through the candidate link, and keeps the recorded title in details.
- The base-wide record number is named "Record no." and shown in candidate details.
- A link to a candidate shows its record number, the primary field. Where such a link is displayed, its label says it is a record number, so it is not read as the shot-local number.

### Publishing (UX-08)

- Element settings, such as sorts, colour conditions and card fields, are editor work. Publishing promotes every page's draft in the interface, including edits made outside the current session.
- Before publishing, account for every pending draft on every page of the interface, not only the intended ones. An editor change that is undone can leave the interface marked as changed; compare each element with its published version before relying on such a draft. An unexplained draft is not overwritten or reset; publishing waits.
- On a page that holds a spending control, select elements through headings and the settings panel, and never through the control.

## Installations

### How an installation inherits

- **Shared source.** Code that is genuinely shared, such as the numbering script, is copied exactly from this repository, with each installation's tables and fields in its configuration. Shared code holds no private IDs, credentials or client content.
- **Built to this specification.** Native pages, sorts, colour conditions, read-only fields and state words implement the views and requirements. Verification establishes the behaviour, not byte identity with another base's editor settings; a formula can keep shared logic while naming different fields.
- **Local specialization.** The variant, the users' own words and any client-only additions belong to the installation and are declared in its record. Declaring a difference makes it visible; it does not make a broken requirement conform. The preference variant is a specialization; relabelling a preference as an acceptance is not.

### Releases

- A release is this document, its Airtable binding included, and the shared source it names, at one repository commit. The label at the top of this document is an alias for that commit, not a separate version scheme.
- A pull request that changes a rule here or the shared source changes the label, even when only the source changed. It says what changed, which variants and components it affects, what it means for compatibility, and what an installation must do: copy which source, change which settings, or nothing.

### The installation record

Each installation keeps one short block in its own maintained build or working record:

```text
release        label and exact commit
variant        formal acceptance or preference; where its bindings are set
views          the page that carries each view, and any difference from the Views table
differences    local additions, pending items and bounded exceptions
verification   where its baseline check is recorded, and any open limits
update owner   who maintains this installation, and under what arrangement
```

- **Baseline first, then differences.** The first check against a release records evidence for every requirement once. Later records name the exceptions and point at that baseline. An absent exception proves nothing on its own.
- Evidence keeps three claims apart: configured, tested locally, and exercised in Airtable.
- Record an installed script's SHA-256, so that a copy that differs from the release can be detected. Live counts, record IDs, plan state, collaborators and base status belong in the installation's record, not here.

### Starting and updating

- A separate base needs a real reason: isolation, ownership, lifecycle or workflow. Within one client, assignments and interfaces are reused where workflow and permissions allow.
- A new installation starts from a copy of an approved reference generation where its variant and structure fit. It then gets its own configuration, data isolation, verified bindings and a deliberate activation. A copy is not current because it is a copy.
- Develop in an authorized working context. Before representing a change as a reusable release, reconcile this document, the shared source and the reference demonstration. Identify the affected installations and update them under their own authority and maintenance scope.
- An installation on an earlier release is behind, not drifting. Drift is unexplained divergence from the release and variant it claims, or an unmet maintenance commitment.
- A security, integrity or compatibility defect can call for a targeted update of every affected installation. A cosmetic change does not.
- Copies made from the open repository receive release notes and migration steps; they are not tracked here.
