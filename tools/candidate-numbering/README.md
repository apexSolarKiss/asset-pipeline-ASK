# tools/candidate-numbering

`candidate-numbering.js` is the numbering automation for a candidate workspace (N2). It gives each genuine candidate its number within its shot, once. What the number promises, and where it sits in the pattern, is in the [Candidate Workspace UX Contract](../../docs/application/candidate-workspace-ux-contract.md), UX-05 and its Numbering binding. This file covers how the script works, how to install it, how to number existing candidates, how to retry, and what it does not support.

## How it works

- Each base has a hidden issued-numbers table. When a genuine candidate is admitted to its shot, the script adds one row for it: an autonumber that records the order rows were added, a link to the shot, and the candidate's record ID as text.
- The candidate's number is one more than the number of other candidates with an earlier row in the same shot. Numbers therefore follow issue order, the order rows were added, which can differ from the order candidates were created.
- The script adds a row for the candidate if it has none, reads the rows again, then writes the number on the candidate's first row and then on the candidate. Overlapping runs can add extra rows for a candidate; only its first row counts.
- The script writes only rows for the candidate it is numbering, and that candidate, and it writes a row's number once. Nothing else should write or remove rows. That is an operator rule: anyone with editor access to the base can still change them. So a repeated, overlapping, late or failed run gives the same number, and a deleted candidate's row stays, keeping its number issued.
- One run makes at most four table queries and three writes, and never waits.
- It relies on one assumption: a base applies its writes in one order, a read sees every write committed before it began, and an autonumber follows that order. The tests use it; nothing here proves it.

## Install

**Schema,** with each installation's own names:

- An issued-numbers table, on no interface page, with:
  - an autonumber primary field, the order;
  - a link to the shots table, which also adds a field to the shots table: keep that one off interface pages too;
  - a single-line text field for the candidate key;
  - a number field for the issued number.
- On the candidates table:
  - a number field, the number in the shot;
  - a checkbox used only to retry numbering.

**Automation:**

- **Trigger:** When a record matches conditions, on the candidates table: the shot is not empty, the test flag is not checked, the number is empty, and the retry checkbox is not checked.
- **Action:** Run a script, with the exact bytes of `candidate-numbering.js`.
- **Inputs,** as static text naming a table or field by ID or by name, except `recordId`:

| Input | Value | Field type |
|---|---|---|
| `recordId` | the trigger record's ID | |
| `candidatesTable` | the candidates table | |
| `shotField`, `testField`, `numberField` | its link to the shot, its test flag, its number field | link, checkbox, number |
| `issuedTable` | the issued-numbers table | |
| `orderField`, `rowShotField`, `candidateKeyField`, `issuedNumberField` | its autonumber, its link to the shot, its candidate key, its number field | autonumber, link, single line text, number |

- IDs survive renames; names make a binding readable. Before any read or write, the script stops if a binding does not resolve or a field has the wrong type.
- No other automation should watch the number field, the retry box or the issued-numbers table.
- On interface pages, show the number in the shot read-only, and keep the retry box, the shot link's editing and the issued-numbers table off them.
- The script needs a plan that runs scripts in automations. Every run, including one that stops, counts toward the plan's automation runs, and every row toward its record limit.

## Number existing candidates

This is the installation's migration, and its first run in Airtable. It needs no generation.

1. List the planned numbers: in each shot, its genuine candidates in record-number order, from 1.
2. Before the automation is turned on, check the retry box on every genuine candidate that has no number, so none matches the trigger.
3. Turn the automation on. A trigger does not act on records that already match when it is turned on.
4. In record-number order, one candidate at a time, clear its retry box and wait until its number appears. Compare it with the planned number, and stop on any difference that step 5 does not explain.
5. A candidate a person admits after step 3 is numbered when it arrives, and the planned numbers after it in its shot move up by one. Record the actual numbers; do not renumber.
6. Then find every genuine candidate with a shot, no number and the retry box clear, for example one admitted between steps 2 and 3, and retry it.

## Retry

- A candidate left without a number, because its run stopped or skipped: check its retry box, then clear it. The automation runs again. If the candidate already has a row, the run gives it the number that row fixed; if not, it gives the next number.
- A run skips a candidate linked to no shot or to two shots, and does not run again when the links are fixed: retry it.
- Clearing a candidate's number also runs the automation again. The candidate gets back the number its row holds, or, if it is a copied record without a row, a number of its own. A candidate marked as a test keeps its number; do not clear it, because no run restores a test's number.
- Before a retry, look at the automation's run history, and let a run still underway for the candidate finish. A second run for the same candidate gives the same number, but only the local tests show that, not Airtable.
- Never retry through the test flag. Marking a genuine candidate as a test hides it and removes it from the summaries.
- Airtable's Rerun of a past run repeats that run's settings. Use it only while the script bytes and inputs are unchanged.

## What it does not support

- **Changing a candidate's shot.** A candidate belongs to the shot it was made for: its kept inputs, and the image made from them, came from that shot. A run stops if the shot changes while it reads. A change after its last read, or to a candidate already numbered, carries the old shot's number into the new one; if that happens, set the shot back. To use a candidate's idea in another shot, request a new candidate there. A candidate made in the wrong shot stays there; delete it if it is not wanted, and its number stays issued.
- **Editing, removing or reordering rows,** including converting or re-creating the order field.
- **Typing or copying a number.** Airtable's Duplicate record and pasted rows copy the number in the shot, so the copy shows its source's number. No run detects this; a person notices the repeated title. Clear the copy's number: it is then admitted and given a number of its own.
- **Linking the shot before checking the test flag** on a hand-made test record. The record is admitted at once and keeps a production number. Check the test flag first, or make tests where it is set on creation.

## What stops a run

Each of these stops the run and writes no number. The candidate keeps its neutral title; fix the cause, then retry.

- a binding that does not resolve, or a field of the wrong type;
- a row in the shot whose autonumber reads empty;
- the candidate's own row not visible after it was added;
- its row holding a different number from the one its place gives, which means rows were removed or edited;
- the number already on another candidate's row, or shown on another candidate in the shot;
- the candidate deleted during the run, its shot changed during the run, or a different number on it already.

The script cannot detect a candidate deleted together with its row: that frees its number. Never remove rows.

## Copies

- Rows keep their links to the copied shots, so a copied base's next numbers stay above every number issued before the copy. This also assumes the copy keeps the rows' autonumbers and numbers new rows above them, which is not established.
- Whether a copy keeps record IDs is not established: one observed copy appeared to keep them, and Airtable's documentation says a copied base gets its own IDs. If record IDs are kept, a number cleared in the copy comes back as before. If they change, the rows' candidate keys still name the source's records, so a cleared number gives that candidate a new number, and the old one stays issued.
- Before turning the automation on in a copy, check that each binding resolves, and number one candidate as a check of both points above. The script stops before writing if a binding does not resolve.
- A copy that becomes a new installation, for other work, starts with an empty issued-numbers table: delete its copied shots, candidates and rows together before the automation is turned on there. "Never remove rows" applies within a running installation.

## Tests

```bash
node tools/candidate-numbering/candidate-numbering.test.mjs
```

The tests run the exact script bytes against a simulated base. By default it applies one table operation at a time, in an order each test picks, so each read sees exactly the writes before it, which is stronger than the assumption. A torn-read mode, in which a read may also miss rows committed while it is in flight, matches the assumption's wording; the overlap and admission cases also run in it. Record IDs are random, and unsorted queries return an arbitrary but stable order, as in Airtable.

The tests cover:
- the stale-write, failure and deletion regression from the first allocator's review;
- a failure at every point of a run;
- repeated and overlapping runs;
- deletion at any moment;
- simultaneous admissions;
- reads that miss rows committed while they are in flight;
- autonumbers that read empty for a while;
- every stop above;
- copied records and copied bases;
- the stated limits;
- negative controls, which remove each mechanism and show the check that guards it failing.

One control breaks the assumption itself and shows that the guarantees can then fail. `--n1 <path>` adds one more control, which runs the regression against the first allocator, N1; that script is not in this repository, and without it the tests report 54 checks. They were run on Node 22 and take several minutes. They cannot show that Airtable meets the assumption.
