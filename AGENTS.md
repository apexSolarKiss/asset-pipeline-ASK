# AGENTS.md — asset-pipeline-ASK

This repo's `AGENTS.md` is a **resolved carrier**: the shared execution protocol (below, resolved from `control-surface/protocol/AGENTS.shared.md`) + the applicable `advisor-project-surface` profile + the standing upstream-conformance grant + the asset-pipeline-ASK-local delta. The shared block, profile, and grant are machine-maintained — do not hand-edit between the markers.

<!-- BEGIN carrier-metadata -->
CARRIER_TYPE: resolved-local
SHARED_BLOCK_SOURCE: apexSolarKiss/control-surface/protocol/AGENTS.shared.md
SHARED_BLOCK_PIN: 36888ff09ae028e7220863e2ac23ebebf9e10c5f
PROFILES: [advisor-project-surface]
GRANT_FRAGMENT: standing-upstream-conformance-grant@36888ff09ae028e7220863e2ac23ebebf9e10c5f
OPERATING_SURFACE: separately-operated
<!-- END carrier-metadata -->

<!-- BEGIN shared: AGENTS.shared.md -->
<!-- protocol/AGENTS.shared.md — distributable shared execution-protocol body (fixed, byte-identical text only). Owner explanation + authoring contract: apexSolarKiss/control-surface/protocol/README.md. This body is inserted verbatim between the BEGIN/END shared markers in each resolved AGENTS.md (the owner root and every consumer); it carries no owner-canonical H1, no project parameters, no coordinator orchestration, no consumer grant, and no repo-local delta. The rules are agent-agnostic — they apply to whoever is executing. -->

## Source-of-Truth Boundaries
<!-- rule-id: source-of-truth-boundaries -->

- **Repo** = project truth: artifacts, decisions, docs, templates, examples.
- **`AGENTS.md`** = workflow rules for repo execution, resolved as: this shared core + applicable profiles + opt-in fragments + repo-local delta.
- **Grounding note** (external) = repo-external context: intent, audience, philosophy, foundational premises, durable loose threads.
- **Per-conversation / task state** (ChatGPT thread history, task lists, in-flight session context) = ephemeral; does NOT belong in the grounding note.
- **Private agent memory** (e.g. Claude Code's MEMORY.md) = non-authoritative operator context. It MAY retain ASK-authorized incidents, anti-re-derivation pointers, worked examples, refusal/supersession records, tool/vendor occupancy, and other operator context **within that memory's authorized owning surface** — but it NEVER owns durable project truth or workflow protocol (see §Verification Claims). Wall-bound material remains on the owning side of the wall; this rule creates no cross-wall read, copy, or retention authority. Retention conditions and the authorization required for any memory write are governed by §Learning Disposition and §Private-Memory Write Gate.

### Aging-Rate Principle
<!-- rule-id: aging-rate-principle -->

The split between repo, `AGENTS.md`, grounding note, ephemeral per-conversation / task state, and non-authoritative private agent memory is separation by *aging rate*.

- A doc that *tracks state* ages fast and must be refreshed often.
- A doc that *points to state* ages slowly and stays useful across many sessions.
- A rules doc that contains rules only ages slowly.
- A context doc that contains context only ages slowly.
- A doc that mixes rules, context, and state ages at the rate of its fastest-aging contents — usually badly.

If a statement would become stale when a PR lands, a chain closes, or a next path changes, it does not belong in this file or in the grounding note.

---

## Learning Disposition
<!-- rule-id: learning-disposition -->

When a reusable learning appears — a correction, a discovered constraint, a convention, a calibration, a failure and its remedy — classify it **before** deciding where it is retained. Classify per claim limb: one observation often carries a shared rule, a local exception, current state, and historical provenance at once, and those limbs do not share a destination.

Route each limb to its visible durable owner:

- **shared workflow rule** → the owner canonical at `apexSolarKiss/control-surface/protocol/`; classify it as shared core, an applicable profile, an opt-in fragment, or an explicit hold before changing any resolved consumer
- **project-local workflow rule or exception** → the owning repo's `AGENTS.md` local delta
- **project truth, guidance, architecture, implementation contract, or maintained procedure** → the owning repo's code, tests, or docs
- **cross-surface maintenance state, pins, obligations, propagation, or currency** → the applicable operator ledger; ordinary project state remains with the owning repo
- **event, experiment, failure, review disposition, or closure evidence** → the owning surface's scratch, a PR record, or a named closure artifact
- **slow external intent, audience, or durable external constraint** → the owning grounding note
- **temporary task state** → current task state only, then no retention
- **an unearned generalization** → an explicit nomination or hold
- **material that earns no durable retention** → no retention

Private agent memory is not a durable owner, protocol-candidate inbox, state ledger, or pre-absorption staging surface. It becomes a candidate only after the visible-owner test establishes either:

1. a durable owner has intentionally omitted the non-operative residue; or
2. no visible owner is appropriate because the payload is machine-local, wall-bound, or deliberately non-operative.

The absence of a visible owner never authorizes memory to carry knowledge required for correctness.

Subject to §Private-Memory Write Gate, private memory may retain narrowly scoped origin or incident history, refusal or supersession evidence, worked examples, evidence of a local exception whose operative rule or constraint is visibly owned, machine-local calibration, machine-local or deliberately non-operative tool/vendor occupancy whose structural role and durable procedure are visibly owned, anti-re-derivation pointers, and wall-bound residue within the memory's authorized owning surface.

Removing private memory may make an executor slower. It must never make an executor wrong. If a decision cannot be made correctly without a memory entry, that entry carries operative knowledge and is in the wrong place.

A generic request to "remember this" requests durable retention, not a predetermined storage surface. Classify and propose the appropriate owner. Only a request that explicitly names private agent memory, followed by ASK's approval of the exact target and payload, authorizes that destination.

---

## Private-Memory Write Gate
<!-- rule-id: private-memory-write-gate -->

**Default deny.** A private-memory mutation is a separate approval unit. It may occur inside an explicitly scoped memory-maintenance operation, but it is never incidental to another task, inferred from another approval, or added during task closure.

For this rule, a **private persistent mutation** means creating, editing, or deleting any governed auto-memory, subagent-memory, user-instruction, user-rule, or gitignored local-instruction artifact. References below to a private-memory mutation use that broader meaning.

This gate governs **private persistent agent surfaces**: auto-memory stores and their indexes, subagent memory, and private instruction files that load across sessions without repo review — user-scope instructions and rules, and gitignored local instruction files. A checked-in repo adapter is not one of these: it is a visible carrier under ordinary diff and review gates.

A private persistent instruction imported from any other path is governed by this gate as well. It must not be used unless its exact path is declared, a matching `Edit(...)` ask rule is installed, and the active-session receipt classifies it as covered. A private import outside the standard guarded paths is a stop condition.

Any governed private persistent creation or edit requires all of:

1. the learning has been classified under §Learning Disposition and its visible owner has been named;
2. a stated reason the visible owner is insufficient for the residual payload;
3. the exact target and exact proposed mutation, shown before execution: full payload for creation; exact diff or replacement payload for an edit;
4. explicit ASK authorization of that exact target and exact mutation;
5. a recorded aging or review trigger.

Any governed private persistent deletion requires all of:

1. the artifact's current role and disposition have been classified, including its visible owner or a no-retention result;
2. a stated reason deletion is warranted — for example unauthorized creation, supersession, owner absorption, or expiry of its review trigger;
3. the exact path plus a pre-deletion size/hash receipt and, when restoring a prior state, the exact baseline bytes or diff;
4. explicit ASK authorization of that exact deletion;
5. a post-operation absence receipt, or exact restored-byte/hash verification when deletion is one step in a rollback.

Approval of a plan, a diff, a PR, a merge, or a task completion is **not** authorization of that private persistent mutation. Neither is advisor agreement.

**Authorization is per artifact.** Approval of a topic file does not authorize an index entry, and approval of an index entry does not authorize the topic file. Every created, modified, or deleted artifact requires its own displayed change or deletion receipt and its own ASK decision. Never select a session-wide or standing approval for a governed private persistent path, including "allow Claude to edit its own settings for this session."

**Live credentials, authorization tokens, private keys, and other secrets are never admissible payloads** for a private persistent surface or for any disposition record.

Specifically prohibited without the authorization above:

- banking "one durable note" at task close;
- using memory as a protocol-candidate inbox;
- post-merge memory mutation framed as cleanup;
- automatic index (`MEMORY.md`) updates.

Do not bypass the gate through Bash, Python, Node, another subprocess, a helper agent, or an alternate write tool. Subagents, census agents, staging agents, and read-only workers never perform private persistent mutations; they return the candidate learning and proposed disposition to the parent coordinator.

**Denial stops the mutation, not unrelated work.** When ASK denies, withholds, or has not supplied authorization for a private persistent mutation, do not retry it through another tool or surface. Omit that mutation and continue the unrelated task to the extent the task remains independently authorized and technically possible. Stop the broader task only when its completion actually depends on the prohibited mutation, and state that dependency explicitly. This narrows only the response to the denied mutation itself; every pre-flight coverage requirement and stop condition of this gate is unaffected.

Before memory-bearing work, confirm that the required ask rules are active and that every governed private persistent path — including the effective auto-memory root and every loaded private instruction import — is covered. Missing rules, unmatched rules, or an uncovered governed path are stop conditions.

Do not perform private persistent-context maintenance in a mode that disables the runtime's safety checks. This is defense in depth: explicit ask rules currently still apply in that mode, but the gate must not depend on one product carve-out while other checks are disabled.

Where the runtime enforces this gate with a permission prompt, treat the prompt as the technical gate only. The visible disposition above is the semantic gate, and a runtime status message is not evidence that a write did or did not persist — verify the filesystem.

---

## Required Reading Before Meaningful Work
<!-- rule-id: required-reading -->

Before any meaningful repo work, read:

- this repository's `README.md`;
- this `AGENTS.md` — the shared execution-protocol core and this repo's own Required Reads named in its local delta;
- the repo-local Required Reads and architecture docs that delta names.

For external context, read the grounding note. Then read whatever templates, prompts, examples, milestones, or findings are relevant to the task.

**A named-but-unread governing source is a defect, not a caveat.** Retrieve it before producing the governed output. If the active authority explicitly waives the read or the source is technically unavailable, state that fact, the reason, and the resulting limit in the same turn.

**A declared read order is not a cost-benefit input.** Skip it only on explicit waiver or unavoidable unavailability. Never silently substitute a live sufficiency judgment or close by proposing the required read as future work.

---

## Inbound Handoff TBI Marker
<!-- rule-id: inbound-tbi-marker -->

`-TBI` is human ASK's **terminal outstanding-feed-obligation overlay**. It answers one operator question from a directory listing: *does this exact artifact still need to be fed into an active recipient-project thread?* It means **the current feed obligation remains unsatisfied** — no attempt has yet succeeded for *this* obligation, whether because none has occurred or one failed to produce ingestion. It says nothing about earlier successful feeds or prior ingestion history. It is not a statement about disposition, repo ownership, or pending repo work. Copy + suffix do not authorize implementation.

**The overlay is orthogonal, not a lifecycle step.** `-TBI` sits above whatever the artifact already is — a fresh routed handoff, a provenance transcript, an ordinary report, a canonical carrier, or an artifact already carrying a durable disposition — and importing it borrows no other class's lifecycle. It is always the final token before `.md`, because it is the flag ASK scans a directory for.

**Route on approval; feed/ingest later.** Once ASK approves a recipient-facing handoff memo's substance, the origin routes the recipient `-TBI` copy immediately unless ASK explicitly directs that routing itself be held. Routing is complete when the exact copy exists at the declared intake path. Routing is not feeding or ingestion: it places the artifact in ASK's logical outstanding feed-obligation queue, and ASK separately decides when to feed it into the recipient's active surface. Do not defer routing until the recipient is ready, its workload clears, or a later operator pass. This timing rule expands no write authority: use a declared ingress aperture where one exists; otherwise return the exact recipient artifact to ASK immediately for routing.

**Four events, not two.** The full first-ingest-and-classify path for a **fresh routed handoff** distinguishes four distinct events, each with its own actor and its own evidence:

```text
routing     the origin makes material durably available in the recipient's intake
            — candidate availability, nothing more
feeding     ASK hands the material to the recipient's active surface — the operator-side act
ingestion   the recipient surface reads the exact artifact into active context —
            the resulting state when a feed succeeds, recorded by renaming
            `-TBI` to `-ingested`
disposition the recipient classifies the material and records the resulting durable
            disposition — absorption is one of them, not the name for all of them
```

A fresh routed handoff may instead exit before ingestion through `-supersededA`, either before feeding or after a feed that did not result in ingestion; the four-event path is what a fresh handoff traverses when it *is* ingested and classified, not an inevitability of routing. Anything not currently in that state never enters it — including a routed instance whose first ingestion already occurred — and resolves the overlay under §Resolving the feed-obligation overlay instead. Collapsing any adjacent pair of the four is the failure this rule corrects.

**Feeding and ingestion are paired but not atomic.** Feeding is ASK's act; ingestion is the recipient-side state that results when the feed succeeds. **Ingestion is not a proactive election by the surface** — the surface does not decide to ingest, it ingests because it was fed. A feed can fail, be deferred, or be superseded before the recipient acts. Feeding therefore expresses the *intent* to have the material ingested and is never itself ingestion evidence — **queue exit occurs on recipient-side ingestion, not on the feed attempt.** Ingestion is likewise not disposition, and disposition is not implementation authority.

**Feeding by value or by reference.** ASK feeds either by attaching or pasting the content, or by supplying the exact path, which the recipient then resolves through a connector or by reading the filesystem. Both are valid feeds; a bare exact path addressed to an active surface is a feed. Ingestion still requires the recipient to retrieve and read the artifact:

```text
path resolves    ≠ content read
content read     ≠ exact-byte identity proven
```

A failed retrieval, or a path resolving only to metadata, has not produced ingestion. A lossy or normalized view may constitute content read under a bounded fidelity claim; where the omitted portion could affect classification, obtain an adequate representation first.

**The relay envelope governs force and scope.** Feeding is a relay that carries an external payload, and the envelope — not the payload — determines whether the recipient is to read, classify, review, execute, hold, or otherwise act. Mere inclusion of an artifact does not make every proposition inside it operative intent.

**The state machine.**

```text
-TBI  →  -ingested                 ingested — content read into active context;
                                   the rename records it, it does not cause it
-TBI  →  -supersededA              ASK-side PRE-ingestion retirement disposition:
                                   retired before ingestion, never consumed
-ingested  →  terminal disposition -absorbed · -held · -declined · -withdrawn ·
                                   -routed · -no-route · -closed · -supersededP
```

For a **fresh routed handoff**, the recipient's first lifecycle mutation after successful content read — before any classification work begins — is the in-place rename from `-TBI` to `-ingested`. Rename only; it records nothing about what was later absorbed, held, declined, routed, or superseded. For anything not currently in that state, the same read removes only `-TBI`: a feed-obligation filename mutation, not a routed-instance lifecycle mutation.

**Disposition is not absorption.** Absorption is one possible disposition; `-held`, `-declined`, `-withdrawn`, `-routed`, `-no-route`, `-closed`, and `-supersededP` record different outcomes. ASK may retire a fresh routed handoff before ingestion; the recipient owns **post-ingestion** disposition.

**Resolving the feed-obligation overlay.** A successful content read **of the marked payload, by the intended active recipient surface, under ASK's feed** satisfies the current feed obligation. A source-side inspection — reading a governing record, verifying bytes, or consulting an inspection copy — does not satisfy it, though it may supply the identification or verification evidence the preflight below requires. The filename resolves once governed role and prior lifecycle state are established; the read and the rename are distinct events:

```text
verified fresh routed handoff awaiting first ingestion
    -TBI becomes -ingested

anything else with established role and prior state
    remove only -TBI; the underlying role and durable disposition survive unchanged

role or prior state unresolved
    stop before feeding
```

**Establish governed role and prior lifecycle state; do not infer either from the filename.** Stripping `-TBI` and finding no other suffix does **not** establish a fresh routed handoff, and neither does inbox residency. Role alone is not enough: a known routed handoff whose prior ingestion state is unresolved leaves the branch unresolved, because the discriminator is the fresh-awaiting-first-ingestion **state**, not the artifact class — `topic-absorbed-TBI.md → topic-absorbed.md` is a routed instance by class and still takes the removal branch. **An unresolved role or prior state is a stop condition**, and removal-only is not a safe default there, because the unresolved artifact might *be* a fresh routed handoff — and one may never become bare and unmarked. *Identify* and *establish* are the verbs for this operation; **classification** is reserved for the later recipient-owned disposition decision.

**Truth preservation and contractual locators.** An **in-place** overlay is valid only where resolving it leaves an underlying filename whose claims remain true and no contractual locator breaks. Two cases fail that test, and their remedies differ by which operation does the damage: a historical `-supersededA` artifact is falsified by the **recipient-surface read**, so preserve the original untouched and feed an addressed copy or a reference-bearing derivative — source-side verification and the copying needed to build it are unaffected; a **fixed-path carrier** (`_INDEX`, `_STATE.md`, a grounding-note canonical, any locator another surface resolves by exact path) is broken by the **rename**, so feed the original by reference at its stable path and leave its name alone.

**Already-read recovery.** If an unidentified marked artifact was read into the intended recipient surface anyway, the feed obligation is already satisfied and a retained `-TBI` no longer states it truthfully — but removing it and appending `-ingested` are both still unavailable, because either would assert a role or prior state that has not been established. **Record the successful read and the unresolved-role/state exception**, treat **terminal `-TBI` alone** as temporarily non-authoritative feed-obligation evidence, and resolve the overlay immediately once role and prior state are established. The demotion is confined to that axis: the underlying artifact identity and any truthful durable-state marker remain authoritative under their own rules. This is bounded error recovery, not a second normal path.

**A re-feed is a genuine new ingestion event.** It does not reopen, reclassify, erase, or advance the underlying durable disposition, and it converts no artifact class into another. Removing a satisfied feed obligation is not a disposition change.

**Canceled feed obligation.** ASK may **cancel** an overlay without any content read, by removing terminal `-TBI` alone. Cancellation is ASK-side and touches nothing but the flag: it is **not** ingestion, **not** a disposition, and **not** a `decline` — `decline` is the recipient's classification verb and maps to `-declined`. It is available **only where the underlying artifact already has an independently complete identity or durable state**. **A fresh routed handoff may never become bare and unmarked this way** — it still requires an explicit pre-ingestion disposition, and `-supersededA` remains the named-successor displacement case.

**Closure and the terminal rename are one bounded operation.** Every transition from `-ingested` to a terminal disposition suffix requires a durable disposition record made in the same operation — a dated scratch memo or an appended terminal section in an explicitly maintained program or status record; do not create an artifact solely to satisfy form. A rename is not a disposition record, and a record without the rename leaves the filename lying. `-supersededA` is the one exit needing no absorption closure, because no recipient absorption occurred — but it still requires an explicit lineage or current-status record naming the successor.

**Marker grammar.** Terminal `-TBI` is always the final token before `.md`. Everything else belongs to the underlying filename and precedes it — stem, `_vN` version index, artifact-role marker (`-PTX`), addressee marker (`-4ASK`, `-4TMK`), and durable lifecycle state:

```text
<otherwise-complete-underlying-filename>-TBI.md

topic-PTX-TBI.md        →  topic-PTX.md        role survives resolution
topic-PTX_v2-TBI.md     →  topic-PTX_v2.md     role + version survive
topic-absorbed-TBI.md   →  topic-absorbed.md   disposition survives
topic-handoff-TBI.md    →  topic-handoff-ingested.md   fresh handoff only
```

Within the underlying filename the lifecycle suffix is last, and an addressee marker precedes it and is never stacked after it. A `-PTX` **may** carry the overlay: feeding a transcript does not make it a routed handoff, and resolving the overlay returns it to its role marker unchanged. Ordinary disposition words are lower-case; supersession uses the lower-case `superseded` stem plus the ruled uppercase phase qualifier `A` or `P`.

**Structural artifacts inside a declared intent inbox.** Within a declared intent inbox, an artifact is exempt from the routed-instance lifecycle **only when the surface's current structural contract explicitly names it as structural. A leading `_` alone confers no exemption.** Before ingesting a routed artifact, the recipient surface reads and honors any current inbox-state carrier that contract declares. Structural artifacts take no handoff lifecycle suffix and are excluded from routed-artifact queue counts.

**This lifecycle grammar is prospective.** Historical filenames retain the conventions in force when they were created and are not normalized; legacy tokens do not acquire the meanings defined here.

**The queue is logical, not a folder.** The outstanding feed-obligation queue may occupy more than one physical location — an ASK-side staging area, an origin's scratch space, a transit surface, and the recipient's declared intake path. The `-TBI` marker attaches when the artifact **enters the queue**, wherever that is; relocation *within* the queue is not a lifecycle event and neither applies nor re-applies a marker. Arriving in the intake folder is a move within the queue, not an entry into it and not an exit from it. A fresh routed handoff leaves the queue by ingestion (`-TBI` → `-ingested`) or by pre-ingestion retirement (`-TBI` → `-supersededA`); any other artifact leaves it when the overlay is resolved or canceled, its underlying filename unchanged.

**Supersession has two phases, and the marker encodes which.** This applies to a **fresh routed handoff awaiting first ingestion**; anything not currently in that state exits the queue by overlay removal or cancellation, never by acquiring a supersession suffix. For such a handoff, ingestion is not the only exit: at any point before ingestion — including after a feed the recipient surface never ingested — ASK may instead retire it as `-supersededA`. A `-supersededA` artifact was never ingested and never absorbed; it carries no pending work and remains in the intake only as lineage, typically beside an active successor carrying its own `-TBI`. A `-supersededP` artifact *was* ingested — its lineage records that the recipient read it before a successor displaced it, which is a materially different history and is why the phase is encoded rather than flattened. Neither disposition authorizes implementation, and neither is reactivated, re-ingested, or renamed off merely because the file remains physically present in the intake.

**Historical body versus current disposition.** A received handoff body is byte-immutable: it is not edited on ingestion, on supersession, or at closure. A sender-authored in-body status line records the routing-time state and stays historical evidence; it is not rewritten because the recipient later ingested or superseded the artifact. Current evidence sits on two axes, and they are not interchangeable:

```text
underlying filename       artifact identity / role + PRIMARY durable-state marker
                          where the class has one — `-ingested` read-but-not-closed ·
                          terminal disposition suffix · `-supersededA`
                          retired-unconsumed · `-supersededP` ingested-then-displaced

terminal -TBI             INDEPENDENT, FASTER-AGING evidence of ASK's outstanding
                          feed obligation. Not a disposition; excluded from the
                          disposition-agreement check below

disposition / lineage     SECONDARY current evidence — must agree with the
record                    UNDERLYING DURABLE-STATE MARKER, never with terminal -TBI

received body             HISTORICAL — immutable, plus any sender routing-time status
```

Every current disposition carrier must agree with the **underlying durable-state marker** and with every other current carrier. Terminal `-TBI` neither participates in nor overrides that check — `topic-absorbed-TBI.md` asserts two simultaneously true things on two axes: durable disposition *absorbed*, feed obligation *outstanding*. An immutable body's historical routing-status string is not required to match a later recipient disposition; successor linkage belongs in a disposition or explicit lineage record, never in a post-receipt edit to the received body.

**Do not create a `-TBI` addressed to a surface the acting surface already operates — as a handoff marker.** Moving between repos inside one operating surface is a hard repo-boundary reset — read that repo's grounding note and `AGENTS.md`, verify live state, work under its own branch, diff, review, and merge gates. A handoff addressed back to the surface that authored it tracks nothing: the destination already has the material, so **no cross-surface handoff boundary was crossed**.

**Two boundaries, not one.** That prohibition is about the handoff, not the overlay:

```text
cross-surface handoff boundary   crossed when material moves between separately
                                 operated surfaces — what -TBI-as-handoff tracks

active-context ingestion         crossed when a particular active thread reads a
boundary                         payload into its context — what a feed produces
```

Same-surface movement crosses the first not at all. It may still require a feed into a particular active thread, and when that thread reads the payload under ASK's feed, **ordinary active-context ingestion occurs** — creating no handoff, no candidate source-of-intent relation, and no repo authority. ASK may therefore apply the orthogonal terminal `-TBI` overlay to an eligible same-surface artifact, or to an addressed copy of one, when that exact artifact still needs to be fed or re-fed.

Separate repo authority is real and unaffected by this rule. **It does not create a separate cross-surface handoff boundary.** Pending owner classification or repo action is repo state — carried by the closure, the relay, or task state — not `-TBI` state.

Method-altitude articulation: `method-ASK/docs/source-of-intent.md` §Inbound handoff TBI marker.

---

## Provenance Transcript PTX Marker
<!-- rule-id: ptx-marker -->

A filename ending in `-PTX.md` or `-PTX_vN.md` identifies an ASK-assembled **Provenance Transcript**: a record of a source conversation or cross-surface exchange, retained for lineage and later verification.

The `-PTX` segment is the artifact-role marker. An optional `_vN` suffix records the version of the transcript artifact itself. It does not make the artifact a model draft or draft-zero, and it confers no lifecycle state or authority.

A `-PTX` artifact is not a canonical, a model draft or model draft-zero, a versioned canonical snapshot, a handoff, an approval or execution instruction, or an ingestion-state marker.

- `-PTX.md` is an unversioned singleton transcript.
- `-PTX_vN.md` is a numbered member of an explicit transcript version lineage. `_v0` means the first numbered PTX version, not draft-zero.
- Infer version precedence only from an explicit `_vN`, never from the `-PTX` marker itself.
- Neither `-PTX` nor `_vN` establishes whether the transcript is still being assembled, complete, closed, or frozen. PTX lifecycle and version progression are ASK-owned; do not edit, extend, rename, close, freeze, or advance a PTX unless ASK explicitly directs the exact operation.
- The PTX files are themselves the lineage; do not create a separate canonical-plus-snapshot chain for them.
- Do not absorb a PTX as project truth without classification.
- If the transcript creates work for another surface, route a separate handoff for that work. A `-PTX` **may** itself carry the terminal `-TBI` overlay when ASK still owes a feed of that exact transcript, but doing so flags a feed — it does not turn the transcript into a routed handoff, and resolving the overlay removes only `-TBI`.
- The convention is prospective. Historical transcripts are not renamed for conformance, so the absence of `-PTX` does not establish that a file is a model draft — classify an unmarked artifact from the file and its scratch context before versioning or superseding it.

Forms:

```text
YYYY-MM-DD_<surface-or-subject>_<topic>-PTX.md
YYYY-MM-DD_<surface-or-subject>_<topic>-PTX_vN.md
```

`-TBI`, `-PTX`, and `_vN` do not share an axis: **`-TBI` is a terminal feed-obligation overlay** — for a fresh routed handoff its resolution is `-ingested`, or `-supersededA` on pre-ingestion retirement, and for every other artifact it is simply removed; `-PTX` is an **artifact role**, retained throughout any version lineage and through overlay resolution; `_vN` is an optional version index for the transcript artifact. Because they are separate axes, `topic-PTX-TBI.md` and `topic-PTX_v2-TBI.md` are **valid** — a transcript with a feed owed, not a routed handoff. Neither `-PTX` nor `_vN` confers state, authority, or canonical status.

---

## Cross-Surface Change Routing
<!-- rule-id: cross-surface-change-routing -->

Before choosing direct operation or `-TBI` routing, first establish whether the material crosses an operating-surface boundary at all. Only then classify the change's authority and the surface's write jurisdiction.

- **Destination inside the same operating surface** → **no `-TBI` as a handoff marker, under any authority class.** Change repo context through a hard repo-boundary reset and operate the owning repo directly under its own gates. Answer this test first; a `yes` disposes of the *routing* question on its own, and the authority and jurisdiction tests below never run. It does not dispose of feeding: ASK may still apply the orthogonal terminal `-TBI` overlay to a same-surface artifact that must be fed or re-fed into an active thread.
- **Candidate source-of-intent, project-specific direction, or other material whose recipient must classify** → preserve the origin record, route a recipient copy into the recipient's intent inbox — at the exact live path that surface's index declares, `intent-INbox/` being the target convention — with `-TBI`, and let the recipient surface own ingestion and post-ingestion disposition. This branch presumes the recipient is a *different* operating surface; recipient-owned classification inside one surface is a hat swap, not a handoff.
- **ASK-authorized conformance to a protocol owned upstream** → propagate directly only where the active surface has write jurisdiction over the consumer. Apply the change through the consumer repo's own branch, diff, PR, review, and merge gates. Do not create a `-TBI` handoff merely to carry an already-authoritative protocol update.
- **No direct write jurisdiction** → route to the owning surface even when the upstream protocol is authoritative. Protocol ownership does not pierce a wall, create a grant, or bypass a surface boundary.

Write jurisdiction may be standing or explicitly granted by ASK for the scoped conformance change. Neither protocol ownership, connector capability, nor this rule itself creates write jurisdiction over another surface.

**A declared ingress aperture plus ASK's exact relay is sufficient for the scoped placement.** Where a recipient surface's owner declares a create-only ingress aperture, ASK routes by relaying the exact routing operation to the authorized executor — the relay is the routing grant, and neither ASK nor the recipient owner is asked to authorize the same route again. Any ASK-operated origin surface — including a separately operated one — may use the aperture where the recipient's declaration covers that origin class. ASK relays authority and need not become the byte courier for a placement the aperture already authorizes. Aperture placement satisfies routing only: routing remains distinct from feeding, ingestion, disposition, and implementation authority, and the aperture confers nothing beyond the one exact create. The declaration's bounds govern payload class as well as origin class and operation shape: material outside the declared payload class — for example private-bearing content through a wall-safe-only aperture — is not covered, and routes through ASK or the recipient's own executor instead.

Direct propagation authorizes only the scoped conformance change. It does not authorize unrelated changes to the consumer's project truth, architecture, source of intent, or implementation.

**Conformance targets canonical state, not literal carrier strings.** Name the owner canonical by path — and SHA where available — as the authority. Quoted recipient text is a search anchor or illustration, not an exhaustive change target unless that carrier has been verified byte-identical to the owner. The acting or recipient surface reads its live carrier, corrects every materially equivalent occurrence within the explicitly named clause or section, and re-syncs that bounded scope to canonical substance without widening beyond the authorized rule. When the originating surface cannot inspect the recipient carrier — across a wall, for example — the handoff leads with the canonical re-sync instruction and marks any quoted find-and-replace text explicitly non-exhaustive.

Method-altitude articulation: `method-ASK/docs/source-of-intent.md` §Scope guard: handoff routing vs protocol conformance.

---

## Verification Claims and Evidence Boundaries
<!-- rule-id: verification-claims-evidence-boundaries -->

A verification statement is bounded by the evidence actually gathered.

- For claims such as `clean`, `complete`, `current`, `zero residue`, `byte-identical`, or `verified`, name the exact carrier set, path or query, ref or time boundary, and property actually tested.
- **Verify the measurement target at the point of execution.** A passing, failing, or zero-result check is not evidence until the command's repository or worktree, carrier or path set, ref or time boundary, and query or predicate are explicit and independently confirmed. Do not rely on inherited `cwd`, a preceding `cd` in a compound command, or an earlier attachment check in cross-repo or multi-root work. When the claim concerns change across a mutation, capture the baseline before editing; a clean post-edit result cannot establish the pre-edit state.
- **Verify execution completion and result semantics.** Confirm that a verification check actually executed before interpreting its output. Distinguish a valid no-match from an execution error; preserve the raw completion status before any pipe or transformation; quote or otherwise validate paths, globs, and input expansion. State whether a count measures files, matched lines, occurrences, records, or claim units. **Empty output from a failed or unrun check is no evidence.**
<!-- rule-id: verification-execution-completion -->
- **The boundary of a search is the boundary of the claim.** Absence from one folder, one pattern, one connector result, or one carrier class is not absence from the corpus.
- **A check verifies only its direct result.** Separate observation from inference; do not attach an inference to a checked fact and label the composite `verified`.
- Pattern lists are hypotheses about how a defect may appear, not exhaustive evidence. An exhaustive claim requires enumerating and dispositioning the actual occurrence or carrier set.
- Where coverage is partial, state the result as: `no unexplained findings in <exact set tested>`.
- **Frozen-record correction threshold.** If a **completed audit, closure, provenance record, or other frozen record** overstates its evidence in a way that can affect a future decision about action, authority, safety, recovery, or durable interpretation, preserve the original statement and append a correction — do not silently tidy the audit trail. A non-material imperfection — one below that threshold — is dispositioned in the current review or closure record as `NON-BLOCKING / NO ACTION` and does not reopen, append to, or generate a successor for the frozen object. A `MATERIAL NON-BLOCKING` finding is recorded once in the current record; append to the frozen object only where future readers materially depend on the corrected interpretation, not merely because the discrepancy exists.
- If a **live canonical or current instruction** overstates its evidence, correct the operative statement under that carrier's version and snapshot discipline, preserving the prior state in its lineage — rather than leaving a false current instruction in force.

**Blocking requires a named failure mode.** Classify each discrepancy: `BLOCKING` — it can change the authorized action, live state, authority, safety, recovery, or a durable interpretation another decision depends on; name the credible failure mode and correct it before proceeding. `MATERIAL NON-BLOCKING` — real and worth recording or scheduling, but it does not prevent the authorized action; record it once in the current record and continue. `NON-MATERIAL` — it cannot change the current decision or live result; disposition `NON-BLOCKING / NO ACTION`, creating no successor artifact, append, or seal whose only purpose is to document that none is needed. This classification governs discrepancies in *evidence about* an operation, which block only through it, never by default; a **materially misleading** frozen evidentiary claim remains governed by the frozen-record correction threshold above, and a false live canonical or current instruction by its carrier's version and snapshot correction discipline.

**Correction loops terminate.** Before any further correction or republication round, name: the decision or real-world failure mode the round can change; the genuinely new evidence or method it adds; and the exact operative object set it evaluates. If any of the three cannot be named, the round does not open. When a round's defects are predominantly introduced by the correction process itself, or two consecutive rounds fail to converge, stop carry-forward patching. After two correction rounds on the same object family, before a third cross-surface handoff: re-anchor to the current live owner or baseline, reconcile or rebuild only the operative set, reread the complete affected frame, validate derivative summaries against source data, run the internal challenge of §Structured Change Summary where available, and leave preserve-only generations immutable. Regenerating a whole package to repair a non-operative string is the defect, not the diligence.

Private agent memory may record an incident or point to this canonical rule **only when ASK explicitly authorizes that memory write**. This section does not itself authorize creating, extending, or revising memory. Private agent memory is not the owner of durable workflow protocol. Any retention under this clause remains subject to §Learning Disposition and §Private-Memory Write Gate.
<!-- rule-id: private-memory-not-owner -->

---

## Rule-to-Artifact Conformance Gate
<!-- rule-id: rule-to-artifact-conformance-gate -->

Before adding, materially revising, or applying a workflow rule that changes artifact naming, versioning, snapshots, routing, or lifecycle:

1. read the current canonical rule;
2. inspect the current artifacts, relevant lineage, and live citations the rule governs;
3. test the rule against the artifacts and the artifacts against the rule.

A long-standing written rule may have drifted. Repeated artifact practice may also be wrong. **If the rule and governed artifacts disagree, stop and obtain an ASK ruling before mutating either.**

Do not retroactively rename, normalize, or rewrite historical artifacts solely to force apparent conformance. After the ruling: **if the ruling changes the canonical rule**, update that rule first, then conform current active carriers within the authorized scope. **If the rule stands**, leave it unchanged and conform the current artifacts instead.

---

## Path Migration: Reverse-Consumer Enumeration
<!-- rule-id: path-migration-reverse-consumer-enumeration -->

Moving or renaming a canonical path breaks every surface that *points at* it, which is a strictly larger set than the surfaces that *move*. Enumerate consumers; do not reason about scope.

Before the cutover, list:

1. objects that move;
2. direct references inside the owning surface;
3. every external source index that maps the path;
4. downstream trackers, adapters, prompts, and routing instructions;
5. walled or private consumer indexes;
6. actual Project-source inventories and retrieval behavior — mounted Sources, Instructions, live connector paths, standing mounts, on-demand fallbacks, and any claim about which of those exists;
7. local launch configs, scripts, agent memory, aliases, symlinks;
8. human applications keyed to the path;
9. current locators versus historical event-time paths.

**A surface being out of scope for moving does not put it out of scope for referencing.** That inference is the characteristic failure: a downstream project keeps its own root, so it is excluded from the migration — and its index, trackers, and prompts keep pointing at an address that no longer exists.

**Post-cutover fail-closed claims apply §Verification Claims and Evidence Boundaries.** "No stale references remain" is a claim about what was scanned. Name the exact carrier set tested, or the result will be read as broader evidence than the check supports.

**Per-line disposition, never a blanket swap.** A current locator tells the reader where to find a retained artifact — update it. A historical record states where something lived at event time — leave it. A line doing both keeps its narrative and gets its locator corrected, or states both paths explicitly. Ambiguous function stops for an ASK ruling rather than a guess.

**A migration is also an audit.** Reading every consumer may surface drift that predates the move — stale bases, retired conventions, or declarations that disagree with disk or Project UI. Record it as adjacent. Repair it only when the active scope explicitly authorizes that correction and the acting surface has write jurisdiction; otherwise flag or route it under §Cross-Surface Change Routing.

---

## Repo Workflow Discipline

### Session-Start Discipline
<!-- rule-id: session-start-discipline -->

Before any new repo work in a session:

1. Confirm the working directory is the session-owned worktree or approved repo root for this session. Cross-worktree absolute paths are a known failure surface; verify before any edit, write, or cross-root `git -C` command.
2. Verify `HEAD` is attached to a named branch. Detached `HEAD` is a stop condition.
3. Verify the working tree is clean.
4. If the working tree is not clean, stop. Identify whether the changes belong to the current thread before touching anything. Inheriting another thread's uncommitted state is a stop condition until provenance is established.

This does not replace Branch Freshness or Default Verification. It is the session-entry gate before meaningful repo work begins.

### Branch Freshness
<!-- rule-id: branch-freshness -->

For repo implementation work, follow this sequence:

1. verify local repo attachment
2. verify clean working tree
3. `git fetch origin --prune`
4. `git checkout main`
5. `git pull --ff-only origin main`
6. create task branch from refreshed `main`
7. stop if any verification fails

Do not start meaningful repo work from a stale, dirty, detached, or ambiguous branch.

### Default Verification
<!-- rule-id: default-verification -->

Before meaningful work, verify:

```text
pwd
git rev-parse --show-toplevel
git remote get-url origin
git branch --show-current
git status --short
```

Stop if repo root, remote, branch, or working tree does not match the task requirements.

### Terminal-State Discipline — do not conflate
<!-- rule-id: terminal-state-do-not-conflate -->

Do not conflate distinct terminal states. Each is a separate, independently verifiable fact:

- local edits
- exact scoped diff
- local commit
- pushed branch
- PR created
- merged PR
- branch cleanup

A report that collapses two of these (e.g. "done" for a change that is only committed locally, or "merged" for a change only pushed) is a defect regardless of the vocabulary used.

### Terminal-State vocabulary
<!-- rule-id: terminal-state-vocabulary -->

Use these explicit terminal states by name:

```text
exact scoped diff ready for approval
committed locally only
pushed branch only
PR created
merged
merged branches cleaned up
```

### Explicit Artifact-Lifecycle Verbs
<!-- rule-id: explicit-artifact-lifecycle-verbs -->

Do not use `cut` as an operation verb for drafts, changes, files, versions, snapshots, handoffs, releases, or other artifacts. It is ambiguous between creation and destruction.

Name the actual operation instead: draft, write, revise, save, create a version, create a snapshot, copy at byte parity, rename, route, supersede, retire, or delete.

This rule applies to plans, instructions, handoffs, change summaries, and status reports. Historical quotations, provenance records, frozen artifacts, and unambiguous domain terms such as a film's rough cut are not rewritten solely to enforce it.

### Exact Scoped Diff Gate
<!-- rule-id: exact-scoped-diff-gate -->

Stop at exact scoped diff unless ASK has already approved commit / push / PR.

The default implementation terminal state is:

```text
exact scoped diff ready for approval
```

Exact scoped diff review is the mandatory approval checkpoint before meaningful write actions complete. Approval may be given inside the executor session after the diff is reviewed; once given, the executor may complete the remaining git workflow without separate manual GitHub UI ceremony. In the configured paired path, ASK's approval follows advisor Stage-1 review of the published minimum exact object unless ASK explicitly elects direct execution; approval authority does not make ASK the routine first-line reviewer (§Advisor-Readable Review Objects).

### Advisor-Readable Review Objects
<!-- rule-id: advisor-readable-review-objects -->

When exact-byte advisor review is required and the advisor cannot read the executor's session-local scratch, publish the minimum named review object to the narrowest authorized shared-scratch path mapped by the surface's source index (`_INDEX`). This is the normal transport surface for cross-surface exact review. **Use an already advisor-readable exact surface first:** a pushed PR is the review object for repo changes once it exists — do not create a duplicate shared-scratch packet merely because session-local scratch is unreadable. Session-local scratch remains appropriate for intermediate construction and for objects not intended for cross-surface review. Manual operator upload is a **last-resort** fallback only when the payload is already authorized for this advisor **and** either the exact mapped path does not resolve, or exact bytes remain unavailable after the bounded retrieval ladder below and ASK explicitly elects manual upload.

**Review-window routing — the relay is the request.** When an advisor surface is configured, pre-commit and pre-write review default to the advisor, and paired-path **Stage-1 readiness includes the minimum exact review object**: unless ASK has explicitly elected direct execution, do not report a unit as `exact scoped diff ready for approval` (or a proposal package as ready) while that minimum advisor-readable exact object remains session-local — publish it, or identify an already advisor-readable exact surface, and report its exact locator, baseline, byte size, and SHA-256 as part of the readiness receipt. Use the smallest exact patch or object that supports the decision; reuse an existing exact advisor-readable object rather than creating a duplicate packet; a bundle exists only where one exact object cannot carry the review. The normal paired path is: minimum exact object available → executor reports Stage 1 ready → ASK relays the readiness receipt or object into the advisor thread → the advisor reviews the exact object and returns a recommendation → ASK adjudicates and relays the decision. **ASK's act of relaying executor material into the advisor thread is itself the review request** — the mirror of the approval-relay rule; no additional request phrase is required, and an advisor must not return the review to ASK on the ground that no explicit request was uttered. **Missing-object recovery:** where a prose summary reaches the advisor without the exact object, the review is open — not declined — and Stage-1 readiness is incomplete; the advisor requests the missing minimum object from the executor through the normal relay, and no second ASK review-request phrase exists. **Direct execution requires an explicit ASK authorization for the named unit** — stated in the executor thread or through a `DIRECT EXECUTION` envelope; any clear ASK language of equivalent force suffices, and the executor proceeds only within that exact authorization. Other narrowed envelopes — including `FYI` and `HOLD` — also suppress an advisor Stage-1 verdict, but they authorize no direct execution and no write. Silence, omission, or failure to relay elects nothing and authorizes no commit or write. Reviewer ≠ authorizer: ASK remains the sole authorization apex at both windows, and speculative packet construction beyond what the review needs remains prohibited.

**Pre-PR publication condition.** A unit is not reported ready for exact-byte advisor review until the named proposal-only exact patch or bounded review object exists in the index-mapped shared scratch — or an already advisor-readable exact surface is identified by exact locator — **and** its exact path or locator, baseline, byte size, and SHA-256 have been reported. A session-local path, a prose summary, or a digest without the object does not satisfy this condition. Publication or identification of the minimum exact object is part of paired-path Stage-1 readiness; it is not gated on any further ASK utterance.

**Path authorization is not content authorization.** A mapped scratch path authorizes a retrieval route, not every payload that could travel it. Do not copy secrets, wall-bound material, or any payload the advisor is not authorized to read into shared scratch or into a manual upload. If the mapped path or the payload is outside the advisor's authorized read surface, stop and ask ASK to name an authorized review surface; upload does not cure an authorization boundary and never bypasses a wall.

A request to prepare an exact artifact for advisor review authorizes one declared proposal-only review object or bounded review bundle, provided its exact path(s), filename(s), role, and lifecycle (supersession trigger) are stated before creation. It does **not** authorize the target canonical, a version snapshot, a companion artifact, a repo commit, or a private-memory write — each of those remains a separate approval unit.

The review object carries its proposal status in its **scratch path, filename, and handoff**, never in wrapper text that would alter bytes intended to match a target. It takes one of three forms:

- **single-artifact exact-byte review** — the `-PROPOSED` object is byte-identical to the proposed target bytes;
- **single-file multi-target review** — one `-PROPOSED` packet carries the complete exact patch, the target file set, the baseline refs, the proposed hashes, and the declared role and lifecycle, **when the advisor can retrieve it completely**;
- **connector-bounded review bundle** — when raw-byte retrieval of a single packet is unavailable under the retrieval ladder below, or a target is not representable as a text patch, publish one declared bundle of ordered exact-object or exact-patch parts in mapped shared scratch. Its manifest records, per part: ordered path, `part_type` (`exact-object` | `exact-patch`), the target path or set, byte size, SHA-256, a baseline ref/hash where applicable, the reconstruction operation, and the proposed target hash — plus the complete target set, the package hash, role, and lifecycle. A text or repo diff is an `exact-patch` against a declared baseline; a binary or non-patch artifact (a PNG, a diagram export, any exact object) is carried as its exact proposed object bytes; a mixed package may contain both part types. Prefer one bounded part per target over arbitrary prose truncation, but never force binary target bytes into a text-extraction representation. The manifest itself and every part must be individually retrievable through the intended advisor path; every physical path is declared before creation; the bundle is one logical transport operation, not open-ended scratch authority.

**Partition every multi-object package by role.** Identify the **operative review set** — the exact current objects whose contents can affect the decision — and the **preserve-only set** — immutable prior generations, provenance, and historical evidence retained for identity and lineage. Preserve-only objects are verified for the exact property the decision uses, normally existence and identity; they are never regenerated or forced into semantic parity with the current proposal merely because they travel in the same package.

**Object reachability is distinct from representation quality.** Successful exact-path resolution establishes that the **path** is reachable. It does not establish that an extracted-text or rendered representation is byte-faithful. Extracted text, OCR, rendered previews, and connector-normalized content are **inspection views, not exact-byte evidence**. Markup stripping, Unicode transformation, truncation, or partial rendering is a **representation failure** — never proof that the underlying object is unreachable, and never grounds on its own for reporting a byte defect in the object.

**Retrieval order.** After resolving the exact mapped path, use the strongest available raw-file or file-byte retrieval route **before** changing the review representation. Where an extracted view preserves one portion of an object while stripping another — for example plain text surviving while an angle-bracketed markup tag disappears from the same line — the view is demonstrably lossy and must not be used to diagnose the object's bytes.

**ASK is the authority relay, not the byte courier.** Do not ask ASK to download, attach, re-upload, or otherwise manually shuttle an object **while its exact bytes remain retrievable through the authorized mapped route**. Metadata-only reachability, or a lossy inspection representation, does not establish exact-byte availability — the prohibition binds on retrievable bytes, not on a resolving path. ASK relays authority and adjudicates; moving bytes that the mapped route already carries is not that role.

**Bounded fallback.** If raw-byte retrieval is technically unavailable, publish **one** connector-bounded alternate representation in the same mapped shared scratch. If that representation also cannot be retrieved exactly, **stop and report both failures** — the exact locator, the retrieval modes attempted, and the failure of each. ASK may then elect manual upload **even where the original path still resolves** to metadata or a lossy view; a resolving path is not a reason to withhold that election. Manual upload occurs only on that explicit election. Do not create a serial repackaging cascade, and do not treat a lossy view as the trigger for the next package.

**Once its path and hash have been reported for review, a review object or bundle is immutable.** Never overwrite it in place. A revision receives a new unique dated or `_vN` `-PROPOSED` name, identifies its predecessor, and reports new hashes; the superseded object remains scratch provenance unless ASK separately authorizes retirement.

Report the target path(s), baseline ref/hash, and proposed hash in the handoff. A shared-scratch review object is an ordinary named operator-scratch artifact — a visible surface under normal proposal/scratch discipline, **not** a private persistent surface governed by §Private-Memory Write Gate.

### Structured Change Summary
<!-- rule-id: structured-change-summary -->

Meaningful changes require a structured change summary covering:

- why this change exists
- what changed
- what did not change
- what remains out of scope

If a PR is used, this belongs in the PR description. If no PR is used, the same summary must be produced in the executor handoff or approval record before write actions complete.

When the work surfaces a potentially reusable learning, include a one-line learning disposition: visible owner · nomination/hold · private-memory candidate pending separate authorization · or no retention. "Reusable" is not itself a destination.

**Executor preflight — read the finished object before handing it off.** Before reporting any meaningful artifact, report, or package ready for cross-surface review or approval — Stage-1-ready in the configured paired path, or ready for the exact-scoped-diff / approval handoff where no advisor surface is configured — reload the final bytes from disk and perform one end-to-end parent cold read of the deliverable and its surrounding frame — never the delta alone. Verify: the summary describes the object actually produced; affected headings, tables, manifests, and neighboring prose remain mutually consistent; every claim-bearing check actually executed against the intended target and its output means what the report says (paths, globs, expansion, counts, and locale-sensitive formatting not silently misread); cross-object identities and predicted relationships agree; lifecycle verbs and authority language conform; and no claim outruns the work performed. A **new or materially revised** checker must demonstrate one real negative or control case failing for the intended reason before its output gates a claim; an unchanged mature checker is not re-fixtured on every ordinary run.

**Triggered internal challenge.** Run one read-only, distinct-lens internal adversarial pass before the first cross-surface review or approval handoff (Stage 1 where an advisor surface is configured) when any of these applies: a multi-object package; a ledger, manifest, registry, or generated carrier; cross-object invariants; carry-forward generation; higher-consequence or hard-to-reverse work; a second correction round; or a prior frame/summary inconsistency in the same object family. The reviewer focuses on frame/summary consistency, chronology and authority, collisions and overwrite hazards, cross-object identities, stale carry-forward language, and omitted consequences; it returns findings only and writes nothing. **The parent verifies every internal finding** against the object and owner before acting on it — internal reviewers fail in both directions, and a false finding closes in-thread, earning no correction artifact unless the failure itself is materially reusable. Internal agreement is not certification, and internal-clean never replaces the external advisor. Where no internal reviewer is available, reload the final object and perform the parent cold read as though receiving it from another executor, report `UNAVAILABLE` plus the completed fallback, and do not block on the missing capability alone.

**Readiness receipt.** Every meaningful review or approval handoff — Stage-1 or otherwise — reports: `parent semantic self-review: COMPLETE` · `internal adversarial preflight: PERFORMED | NOT TRIGGERED | UNAVAILABLE` · one bounded trigger/lens-or-fallback line. These fields join, not replace, the identity fields §Advisor-Readable Review Objects requires of a paired-path readiness receipt (exact locator, baseline, byte size, SHA-256). A package additionally reports its operative review set and preserve-only set by exact paths and counts. No defect diary — report a pre-handoff catch only where it is materially useful.

### Operator-Side Voice Scan
<!-- rule-id: operator-side-voice-scan -->

Before presenting an exact scoped diff for approval, scan added prose for voice / surface-boundary risk against the project's named operator-side voice owner(s) and grounding-note voice guidance. Do not assume a private-memory artifact exists or owns those constraints. Any private-memory contribution must already have survived §Learning Disposition and remains subject to §Private-Memory Write Gate.

Flag any matches or concerns honestly in the structured change summary. Do not auto-sanitize: some apparent matches may be legitimate domain vocabulary that the project needs to name directly.

The scan rule may live in `AGENTS.md`; the token list, translation table, and protected domain-vocabulary list do not. Route those specifics to the narrowest authorized operator-side owner suited to their wall and cadence; do not copy them into repo-local artifacts. Private memory may retain only ASK-authorized machine-local, wall-bound, or deliberately non-operative residue under the two gates.

### Default: Hold or Carry Through Per Adversarial-Collaboration Preconditions
<!-- rule-id: default-hold-or-carry-through -->

When ASK has approved the scoped diff, the workflow continues through commit and push to PR creation.

If the project meets the preconditions for adversarial collaboration (per [*Adversarial Collaboration*](https://atomicspacekitten.substack.com/p/adversarial-collaboration)) — hardened backbone, active architectural uncertainty, configured advisor surface — hold at `PR created` until the advisor relay returns approval, then continue to merge. The pushed-not-merged PR is the advisor's structural review window.

ASK forwarding an advisor approval to the executor is the relay. Forwarding may be done by pasting the advisor's approval, summary, or equivalent review result. No additional approval phrase is required after the forwarding act.

Forwarding advisor notes that contain required fixes, blocking concerns, or open questions is not approval relay; it is fix-direction or question-forwarding.

If no advisor surface is configured, carry through to merged + cleanup once diff approval is given. The pattern is proportional to architectural uncertainty live at any moment.

### PR Creation
<!-- rule-id: pr-creation -->

When creating a PR, report:

- branch name
- commit SHA
- PR number
- PR URL
- actual base branch
- actual head branch
- validation performed
- terminal state: `PR created`

### Post-Merge Cleanup
<!-- rule-id: post-merge-cleanup -->

After merge, verify `main`, delete merged task branches where safe, verify remote branch state, and report:

- current main HEAD
- whether merge commit is present
- whether expected changes are present
- local branch cleanup
- remote branch cleanup
- final branches
- final working tree status
- terminal state: `merged branches cleaned up`

Post-merge cleanup never includes private-memory mutation unless a separately planned and explicitly authorized memory operation remains open.

### Direct Push to Main
<!-- rule-id: direct-push-to-main -->

Branch plus PR is the default for meaningful structure or rule changes. Narrow low-risk edits or explicitly scoped bootstrap tasks may allow direct push to `main` when scope is made explicit and approved.

---

## Session Topology / Single-Writer Discipline
<!-- rule-id: session-topology-single-writer -->

Multiple writer-capable sessions — for example parallel executor threads, subagents in separate worktrees, a human editor plus an executor, or another runtime occupying the executor role — can mutate the same repo files concurrently. This is a real failure mode, not a hypothetical.

Rules:

- **One writer at a time per branch.** A second operator session on the same branch must verify state freshly, treat the working tree as authoritative over its own memory, and not assume mid-flight context from another session.
- **Treat repo and remote as the audit trail.** When two sessions disagree about state, prefer `git status`, `git log`, and remote-branch state over either session's recollection.
- **Stop on suspected concurrent mutation.** If a working tree contains changes the current session did not make, do not overwrite. Re-orient against the repo before continuing.

This rule applies whether the second session is the same agent, a different agent, or a human editor.

---

## Scope Discipline
<!-- rule-id: scope-discipline -->

Match the unit of work to the level of the question.

For implementation and repo hygiene, prefer the smallest honest unit. Small bounded PRs are usually best. Avoid bundling, widening, or design-in-advance.

For conceptual architecture, prefer the largest tractable structural question. The smallest honest unit at the architecture layer is often a structural question or a model attempt against a concrete example, not another local prototype probe.

Do not let "smallest unit" become a rule that prevents zooming out to the right scale. A series of small honest units at the wrong layer can add up to ceremony without architectural progress.

Do not bundle unrelated work. Do not widen scope mid-task unless the widening is explicitly chosen. Do not create artifacts merely because a process pattern exists.

**Scale verification to the decision.** The evidentiary depth and blocking threshold for an operation scale with `reversibility × blast radius × cost of error × decision relevance` — a qualitative reasoning frame, not a numerical score. Whenever the frame is applied — in either direction — name the operation class in one sentence ("reversible operator-file maintenance with lineage retained"; "recovery-critical canonical migration"). Every claim then made remains bounded by §Verification Claims and Evidence Boundaries: what scales is how much evidence the operation must gather and what may block it, never how honestly the gathered evidence is stated.

**Proportionality never waives a gate.** It may reduce evidence depth or classify a discrepancy non-blocking; it never waives an ASK-owned authorization gate, a configured Stage-1 or Stage-2 review window, a wall or write-jurisdiction boundary, a required read, a lifecycle transition, a recovery or rollback requirement, or a safety or secrecy constraint.

---

## Plan-Before-Execute Rule
<!-- rule-id: plan-before-execute -->

Before executing a meaningful repo change, state the plan: what files will change, what scope is in vs out, what non-actions apply, what terminal state is expected.

The plan creates an inspectable reasoning object before mutation. It lets ASK, the executor, and any configured advisor challenge scope, assumptions, non-actions, and the intended terminal state before work becomes harder to unwind. This applies whether planning and execution occur in one session or across multiple surfaces. Do not collapse plan and execution into one opaque step.

Any proposed private persistent mutation must be named as a separate planned operation with its exact target, exact proposed mutation, visible-owner or no-retention disposition, and terminal state.

For a creation, include the full proposed payload. For an edit, include the exact diff or replacement payload. For a deletion, include the exact path, deletion warrant, pre-deletion size/hash receipt, and expected absence or restored-byte/hash receipt.

If the operation is absent from the approved plan, the private persistent mutation is out of scope.

---

## Tool-Dependent Workflow Rules
<!-- rule-id: tool-dependent-workflow-rules -->

When a project workflow depends on an external tool, vendor, model, rendering surface, extraction surface, diagram-generation surface, or other operator-supplied system whose identity may change, encode the repo-local rule tool-agnostically.

In `AGENTS.md`, name the structural role the tool plays, when it is invoked, what inputs and outputs it expects, the authority boundary, and any refresh cadence. Carry the current approved tool / vendor / surface identity, the substitution path, and any operational details that depend on the specific tool outside that repo rule.

The repo rule names the structural role. The current occupant, substitution path, and vendor-specific operating details belong in the narrowest visible or operator-side owner suited to their cadence. Private memory may cache only machine-local or deliberately non-operative residue, and only under §Learning Disposition and §Private-Memory Write Gate.

---

## Comments, Docs, and PR Roles
<!-- rule-id: comments-docs-pr-roles -->

- Comments belong in implementation artifacts only when local clarity needs them.
- Docs describe architecture, boundaries, operating contracts, and reusable guidance.
- Structured change summaries and PR descriptions hold change-specific framing.

Do not push PR-only explanation into permanent repo docs, and do not hide durable operating rules inside a PR or approval record.

---

## Refresh Cadences

### Grounding Note
<!-- rule-id: refresh-cadence-grounding-note -->

Refresh the grounding note only when external handoff context changes: new strategic direction, philosophical reframing, audience or positioning shift, foundational premises change, operating model changes.

Do not refresh for routine repo chronology. Possible future directions belong in the grounding note only as durable loose threads, not as recommended next paths.

### `AGENTS.md`
<!-- rule-id: refresh-cadence-agents-md -->

Refresh this file only when a workflow rule is added, removed, or materially revised.

Do not refresh because project state changed. Do not refresh because a PR landed. Do not refresh because the next direction changed.

If a proposed update says "the project currently should do X," it does not belong in this file.

---

## Defaults
<!-- rule-id: defaults-shared -->

- Prefer ASK reuse over world-scale abstraction.
- Prefer explicit structure over clever indirection.
- Prefer the smallest coherent scaffold that clarifies the workflow boundary.
- Use clean technical language. Avoid manifesto phrasing, speculative systems, or generic process bloat. *(Voice/register specifics route to the operator voice canonical, not to a second authority here.)*

---

## Short Version

- Verify repo state before meaningful work.
- Read repo-local truth and grounding note before responding.
- Stop at exact scoped diff before commit; carry through to merged + cleanup once approved.
- State the plan before executing.
- Single-writer per branch. Treat repo as audit trail.
- Match the unit of work to the level of the question.
- Refresh `AGENTS.md` only for rule changes.
- Keep this file workflow-only. Repo holds state. Grounding note holds external context.
- Bound every verification claim to the exact evidence gathered; separate checked facts from inferences, and test rules against the live artifacts they govern before applying them.
<!-- END shared -->

<!-- BEGIN profile: advisor-project-surface -->
## Advisor Project surface deployment

- Where this repo homes a configured advisor Project, that Project **must use the bootstrap-only deployment architecture**. The always-applied Instructions field carries only the pre-retrieval safety floor — what must bind before any fetch, and must still hold when every fetch fails. One mounted bootstrap carries the operative advisor contract and the exact live-index locator. The index and the canonicals are fetched live at the locators those carriers declare.
- **Do not place operative advisor protocol in the Instructions field.** A size-capped, always-applied carrier cannot grow: past its ceiling, each addition is paid for by compressing an existing requirement — a preservation judgment made at install time, under space pressure, with no record of what was dropped.
- **A requirement may leave a carrier only with a recorded disposition:** `MOVED` (naming the exact surviving carrier), `REVISED`, `RETIRED`, or `NOT-APPLICABLE`. `DROP-AS-DUPLICATE` without a named surviving carrier is deletion, not deduplication. A requirement no carrier holds and no disposition retired is unowned; unowned count must be zero. **The surface-overlay completion gate runs before a carrier is generated, not after it is installed** — an unowned requirement found at install time has already shipped.
- **One standing mount per surface.** Do not mount a shared core plus a separate overlay — two mounts is another synchronization seam, and it makes connector-failure behavior harder to reason about. Share at the authoring layer; be self-contained at the runtime layer.
- **Maintenance consequence.** An ordinary protocol change updates the bootstrap and remounts it. An ordinary index change updates the index canonical and remounts nothing. The Instructions field is repasted only when the invocation architecture itself changes.
- **Generating a carrier is not conformance.** A surface is conformant only after the applicable acceptance tests pass, and they must be *exercised* rather than inspected — reading a carrier and concluding it would behave correctly is not a test result. **A7, connector-failure behavior, is the gate:** a surface that has never been observed failing safely has not demonstrated the property the thin floor exists to guarantee.
- **Project UI mutation is ASK-owned.** Mounting or unmounting a Source, repasting the Instructions field, and changing Project settings are ASK's operations. The executor prepares exact carriers, installation steps, and rollback pairs; it does not perform the Project mutation. An advisor surface never mutates its own Project settings — that boundary is why the advisor is non-writing at all.
- Requirements true only of one surface live in that surface's generated bootstrap, never in a shared body. **A surface that must deviate from the owner records an explicit disposition against the owner registry**; undocumented local divergence is drift, and it is indistinguishable from the compression this profile exists to prevent.

Owner: `control-surface/docs/advisor-project-surface-architecture.md` — the normative requirement registry, placement contract, acceptance tests, and surface-overlay completion gate. Carriers are generated from `control-surface/templates/advisor-project-bootstrap.template.md`, `advisor-project-instructions.template.md`, and `_INDEX-project.template.md`. This profile binds the deployment shape; it does not restate the registry.
<!-- END profile: advisor-project-surface -->

<!-- BEGIN grant: standing-upstream-conformance-grant (OPTIONAL — separately-operated opt-in only) -->
## Standing upstream conformance grants

This repo grants the **active ASK control surface** standing write jurisdiction for **GREEN mechanical conformance** to merged upstream owner changes explicitly marked for propagation, under the control-surface propagation-wave protocol (`control-surface/AGENTS.md` §Cross-Repo Propagation Waves and `control-surface/prompts/cross-repo-propagation-wave.md`). "Active ASK control surface" is the executor; ecology-ASK is the coordination altitude and ledger; this repo remains the owner of its project truth.

### Design-system vendor maintenance

Covers: byte-identical re-vendoring of DS-owned files (engines, helper, exporter, CSS, font carrier); an owner-required support file and deterministic script load order; deterministic local pin / MANIFEST / README records; an existing, unambiguous source/render/date operation; and derived-artifact (raster/companion) regeneration where this repo's existing contract requires it.

### Execution-protocol maintenance

Covers: exact or substantively deterministic re-sync of inherited `control-surface` protocol clauses in declared carriers (`AGENTS.md`, templates, prompts); deterministic carrier additions/removals/load-order changes required by the merged protocol; and local provenance/pin/README/manifest updates recording the operation.

### Both lanes — bounds

**Covered:** preparation of a bounded branch and PR under this repo's normal diff / review / merge / cleanup gates.

**Not covered:** source of intent · product/domain decisions · project architecture · source data or diagram semantics · consumer-authored visual identity or geometry · bespoke adapters requiring design judgment · intentional local protocol exceptions · review/merge/release/sealing-policy changes · changes to this grant itself · unrelated cleanup.

**Active only when:** the upstream change is merged and its canonical path + SHA are identified; the affected carriers are confirmed at rest (human + machine, per the propagation-wave at-rest gate); the change is classified GREEN; repo-local deltas and intentional exceptions are preserved; and no unresolved interpretation or project-specific policy choice is required.

**On any stop condition** (active work, unexpected diff, locally-modified owner file, ambiguous mapping, ambiguous version/raster action, project-specific judgment, conflict with a local exception): do not improvise, do not merge, leave the obligation queued as re-sync due. Route a `-TBI` handoff only when recipient classification or a new grant is genuinely required — never as a deferred-task envelope.

Execution jurisdiction does not transfer artifact ownership. ASK may suspend or revoke this grant for a wave or for the repo.
<!-- END grant -->

<!-- BEGIN local-delta -->
## asset-pipeline-ASK-Local

These rules are the repo-local delta for `asset-pipeline-ASK` (a separately-operated ASK ecology consumer) on top of the resolved carrier above. This repo opts into the standing upstream-conformance grant (installed above). `asset-pipeline-ASK`'s local delta wins for `asset-pipeline-ASK` where an explicit conflict exists.

## Operating model (AP layer)

`asset-pipeline-ASK` runs the family's **adversarial-collaboration operating model** — an ASK-apexed advisor–executor topology: ASK is the source-of-intent and authorization apex and the relay across surfaces; a non-writing advisor surface supplies challenge, reconstruction, and verification from outside the execution thread; a repo-attached execution surface plans and performs authorized work under this file, single-writer-per-branch. **Direct execution** — ASK driving the executor without an advisor pass where a separate pass would not materially reduce uncertainty — is a bounded task-level path within this model, not a separate model.

## Source-of-Truth additions (AP layer)

Beyond the shared §Source-of-Truth Boundaries, `asset-pipeline-ASK` adds two project-truth sources:

- **Airtable** = live prototype truth when inspected directly.
- **Direct visual evidence** = image-fidelity truth.

## Required Reading Before Meaningful Work (AP layer)

Before any meaningful repo work, read:

- `README.md`
- `AGENTS.md` (this file)
- `docs/architecture.md`
- `docs/index.md`

Then read the latest milestone in `docs/milestones/` and any artifacts relevant to the task.

For Airtable prototype work, also read:

- `docs/airtable-connector-tool-capability-limitations-v1.md`

Before schema setup, field-agent setup, attachment handling, record mutation, generation/capture, or cross-base operationalization, confirm which steps are connector-supported and which require Airtable UI / manual hybrid execution. This is a pointer rule — the limitations doc remains the refreshable source for current tool-layer constraints; do not duplicate them here.

## Inbound handoff intake (AP layer)

The generic `-TBI` overlay, ingestion, resolution, and disposition mechanics
are owned by the shared §Inbound Handoff TBI Marker.

The exact AP intake destination is the current intent-inbox path declared by
`asset-pipeline-ASK-EXTERNAL/_INDEX-asset-pipeline-ASK.md`. Do not hard-code
or infer a different path from historical records.

## Direct Push to Main (AP layer)

The shared §Direct Push to Main governs the generic narrow-low-risk allowance. For `asset-pipeline-ASK` the branch-plus-PR default carries stronger AP-local force:

Branch plus PR is the default for meaningful architecture, ontology, or repo-structure changes.

## Scope Discipline additions (AP layer)

These extend the shared §Scope Discipline with AP-specific scope guards:

Do not widen from docs to schema, Airtable mutation, architecture rewrite, or production claims unless explicitly chosen.

When the repository is in an early design phase, prefer documenting constraints, boundaries, and open questions over prematurely defining systems that may later need to be undone.

## Architecture-Before-Prototype Rule

When ASK is trying to define conceptual information architecture, do not default to Airtable probes or repo evidence chains.

First identify:

- the architectural question
- the candidate model
- the scale of example needed to pressure-test it
- what uncertainty the prototype would resolve
- what the result would change about the architecture

Use prototypes to test architecture.

Do not let the prototype become the object of study instead of the pressure surface for studying the information architecture.

If the architectural question is not clear, do not open a prototype chain.

## Prototype-as-Pressure-Surface Rule

A prototype is a pressure surface, not the project center.

A prototype is justified when it exposes, tests, or falsifies a structural distinction in the information architecture.

A prototype is not justified merely because a tool behavior is available to test.

Before proposing prototype work, state:

```text
What architectural question does this prototype pressure?
What distinction would become clearer?
What would we know after the prototype that we do not know now?
```

If the answer is only "whether the tool can do X," stop unless that tool capability is strategically load-bearing.

## Attempt-Model-Before-Plan Rule

When the work is architectural, prefer attempting a rough model on a concrete example before creating a broad planning artifact.

Do not produce a planning document that only enumerates layers, questions, or future artifacts without attempting the model.

A useful architecture artifact should do at least one of these:

- apply a candidate model to a concrete example
- show inheritance / override behavior
- reveal where a model breaks
- compare how one structure behaves across workflow modes
- surface real architecture questions from collision with an example

Permission to be wrong is part of the method.

A sketch can be more valuable than a comprehensive plan.

## Self-Evident-Premise Stop Rule

If a prototype chain is mainly proving a premise ASK already treats as foundational, stop.

Consult the grounding note for current foundational premises.

Ask whether the finding is worth documenting, or whether the project should move to the next structural layer.

Do not keep proving accepted premises unless the new work materially refines the architecture.

## Ceremony Budget Rule

Before opening an options / decision / probe / findings chain, state what architectural uncertainty the chain resolves.

If the answer is only "whether Airtable can do X," do not proceed unless Airtable capability itself is strategically load-bearing.

Avoid artifact chains that document local friction without advancing the information architecture.

Repo artifacts are justified when they preserve:

- a durable structural decision
- a schema-relevant finding
- a proof outcome that changes the model
- a reopen trigger being acted on
- live prototype state that needs repo-visible explanation

Otherwise, continue in-thread or stop.

## Airtable Operating Rule

Airtable work uses the Airtable connector.

Use the connector for record / schema truth.

Use direct visual evidence in chat for image-fidelity judgment.

Do not speculate about Airtable record contents when the connector can answer directly.

### Public Airtable Links in Repo-Readable Surfaces

Any Airtable base linked from a repo-readable surface (README, docs) must be a public read-only "Share to web" link (the `/shr…` form), not a bare base URL (`/app…`). A bare base URL gates public readers behind Airtable sign-in, so a cold visitor following a repo link to such a base hits a login wall, not the evidence. Before committing an Airtable link, enable "Share to web" (read-only) on the base or view and verify the resulting `/shr…` link loads in a logged-out browser. Share-link creation is an Airtable-UI action; the connector cannot create or verify public share links. Because a full-base "Share to web" link exposes every table in that shared base, clear operator-side residue from the shared scope first.

### Generation State Model

Distinguish:

1. storage exists
2. AI field-agent behavior is configured
3. generation has been invoked
4. generated output has been captured / mapped

Do not collapse these states.

Examples:

- a connector-created attachment field means storage exists, not that AI field-agent behavior is configured
- a generated image on a raw output field means raw output exists, not that a governed asset exists
- a generated asset record means capture / governance has been invoked, not merely that generation happened

## Airtable Mutation Discipline

Airtable is a disposable prototype surface. The repo is the durable asset.

Airtable mutations rely on:

- **Plan-Before-Execute Rule** — state exact target, intended action, non-actions, and terminal stop point before mutation.
- **Structured Change Summary** — after mutation, capture why the change exists, what changed, what did not, and what remains out of scope.

This applies uniformly across schema mutation, field creation, field deletion, lookup-field creation, Airtable AI field-agent configuration, generation invocation, generated-asset creation, output-slot linking, and slot-status changes.

Per-action ASK authorization is not required when plan and change summary discipline is observed.

If a mutation reveals unexpected state, stop and re-propose.

Doctrine-touching mutations still warrant heavier care; see Prototype-Bounded vs Doctrine-Touching Mutation.

## Airtable Schema-Fit Rule

Before authoring or approving a probe plan for any Airtable schema-fit question, perform the cheapest available live schema inspection when the connector can answer it.

```text
check possibility first
design second
document last
```

If the current schema cannot express the proposed test, report the blocker directly.

Do not route an impossible schema-fit probe through a multi-artifact chain.

## Prototype-Bounded vs Doctrine-Touching Mutation

Distinguish:

- prototype-bounded schema mutation (cheap, reversible, affects only active prototype surface)
- doctrine-touching schema mutation (defines shared concepts, cross-mode framing, or long-term schema structure)

Prototype-bounded mutations may compress to a bounded probe-and-do path when authorized.

Doctrine-touching mutations require heavier discipline.

When in doubt, prefer the heavier path, but do not over-fit heavy ceremony to tiny prototype work.

## Artifact Discipline

Repo artifacts should be narrow, citable, and explicit about posture.

### Evidence-Chain Artifacts

Evidence-chain artifacts record historical claims about what was decided, observed, or executed at a specific point.

Do not retrofit evidence-chain artifacts.

When framing changes, add a new artifact that supersedes or refines.

### Navigation / Summary Artifacts

Navigation and summary artifacts help readers navigate the repo. These may receive additive retrofits when alignment is purely navigational.

Examples: README routing, `docs/index.md`, milestone notes, application README maps.

Do not rename established files unless explicitly chosen.

### Outcome-Class Reconciliation

When a findings note pre-registers outcome classes, reconcile observed outcomes to those classes, or explicitly state why a narrower label is being used.

### Visual-Evidence Attribution

When a repo artifact records role-fit, fidelity, or image-quality claims, attribute those claims to direct visual evidence, not Airtable metadata alone.

## Repo Content and Visual Discipline

This repo is primarily read by agents, operators, and future maintainers. Repo content should therefore remain machine-readable, diffable, grep-able, and durable as plain text.

Do not replace semantic repo content with binary visual assets ad-hoc. Diagrams, rendered maps, and other visual assets may supplement plain-text artifacts, but they are not substitutes for the canonical textual representation unless the work is explicitly scoped as a systematic presentation pass.

Content visuals belong only when they clarify a repo-local artifact without weakening inspectability. Human-facing presentation layers may be developed separately when the project reaches a show-don't-tell stage.

Existing repo identity imagery is out of scope; this rule concerns content visuals such as architectural diagrams, flow maps, matrices, and rendered explanatory graphics.

## Refresh Cadence Additions (AP layer)

### Grounding Note

Possible future directions belong in the grounding note only as non-binding loose threads, not as recommended next paths.

### `AGENTS.md`

Do not refresh because a chain closed.

## Diagram Surface Refresh Cadence

The repo's diagram surface under `docs/diagrams/` is a set of visual orientation artifacts, not depth artifacts. The prose docs are authoritative if a diagram and the prose diverge. The current diagram surfaces — architecture / IA orientation diagrams, illustrative companion diagrams, and an orientation / deconfliction atlas over the representation set — are rendered in-repo by shared static engines, bespoke `figure.js` renderers, and the interactive surface's own engine:

- **architecture tree** (`asset-pipeline-ASK_architecture-tree.html`) — repo architecture / artifact structure.
- **ontology tree** (`asset-pipeline-ASK_ontology-tree.html`) — Axis A: the kinds of information the definition layer structures.
- **inheritance spine** (`asset-pipeline-ASK_inheritance-spine.html`) — Axis B: where information lives and how it inherits.
- **interactive IA state spine** (`interactive/asset-pipeline-ASK_ia-state-spine.html`) — the architecture's maturity / evidence **state** surface.
- **bounded-generativity figure** (`asset-pipeline-ASK_bounded-generativity.html`) — an **illustrative doctrine diagram** (a distinct class, not an architecture-axis or state diagram): asset-pipeline-ASK's **bounded-generativity topology** — the commercial image-production instance of bounded generativity (a source of intent / normative apex sits outside the frame → the creative brief grants the aperture of permitted variance → realization fills it with candidate variance → creative discretion enters wherever an authorized decision-maker binds within scope → curatorial selection ratifies one candidate and closes the aperture → artifact governance binds the accepted result → the governed asset + governance record sits outside the frame). The five distinctions survive as a **function-order projection** (a reading order, `creative intent → creative discretion → variance → selection → governance`) and as the non-identity line **creative intent ≠ creative discretion ≠ variance ≠ selection ≠ governance** — not as the topology itself. It is a bespoke, method-inherited `figure.js` derived from the method-ASK bounded-generativity figure (not the retired SEQ engine). Basis: `docs/creative-discretion-doctrine-v1.md`.
- **visual payload architecture** (`asset-pipeline-ASK_visual-payload-architecture.html`) — an **illustrative architecture companion diagram** on the `diagram-static-FLOW` scaffold (convergence flow on a single full-chrome diagram HTML with a clean `PNG diagram` export): reference carrier → normative-source field → resolved slot spec → realization (candidate ‖ set) → conformance → selection/governance → governed asset → future-reference return loop. Basis: `docs/visual-payload-architecture-v2.md`.
- **architectural representation atlas** (`asset-pipeline-ASK_architectural-representation-atlas.html`) — an **orientation / deconfliction** surface over the representation set: for each representation above, the object it depicts, the question it answers, the live surface, and where that view's authority ends. A bespoke `figure.js` instance (not engine-rendered), reusing the shared `diagrams.css` / `export-png.js` on a neutral palette; it creates no second system model and does not collapse the axes. Basis: `docs/architecture.md` §Source-of-Truth Routing + `docs/diagrams/README.md`.

(Axis basis: `docs/layer-disambiguation-note-v1.md`. The static architecture diagrams assert no state; the interactive spine is the state surface; the bounded-generativity figure is doctrine; the visual-payload-architecture flow is an illustrative architecture companion; the architectural representation atlas is the **orientation / deconfliction** surface over the representation set — not an architecture-axis, state, doctrine, or architecture-companion-content diagram. None of these companions, nor the atlas, is itself an architecture-axis diagram or state surface.)

**Maintenance model.** The diagrams are repo-resident and rendered in-repo — by the shared static engines (`diagrams-static-H-engine.js`, `diagrams-static-V-engine.js`, and `diagrams-static-FLOW-engine.js`), bespoke `figure.js` renderers (the bounded-generativity figure and the architectural representation atlas), and the interactive surface's own engine. The executor maintains them **in-repo** — by editing the per-diagram source data + HTML chrome and validating the rendered output (light + dark) — not by regenerating them through an external rendering surface. Any operator-side exploration surface for diagrams not yet repo-absorbed, and any rendering-tool / vendor identity, remain operator-side context and are not encoded here.

**Refresh cadence by coupling.** Refresh is milestone-triggered, but per-diagram coupling differs — **do not refresh all diagrams by default just because one changed:**

- **architecture tree** — refresh when a plateau milestone marker lands, or when the architecture front door (`docs/architecture.md`), the docs tree, or routing is substantively reorganized.
- **ontology tree (Axis A)** — refresh only when the information-kind / ontology structure changes.
- **inheritance spine (Axis B)** — refresh only when the inheritance-layer set / structure changes.
- **interactive IA state spine** — refresh when milestone / evidence state assignments change (earned / held / deflated / proposed move); the most milestone-coupled of the set.
- **bounded-generativity figure** — refresh only when the doctrine (`docs/creative-discretion-doctrine-v1.md`) changes; **not** coupled to plateau milestones or architecture / IA structure changes (it depicts doctrine, not repo state). Its **one** committed PNG — `asset-pipeline-ASK_bounded-generativity-dark.png` (the dark full-page render the doctrine note embeds directly) — is a deliberate single-raster exception to the folder's otherwise HTML-only convention, kept for markdown/GitHub embedding; the light-page and chrome-free diagram variants remain available from the exporter's `PNG page` / `PNG diagram` buttons but are not committed. The HTML + source data remain canonical and the PNG is supplemental.
- **visual payload architecture** — refresh only when the **VPA topology** (`docs/visual-payload-architecture-v2.md`) changes; **not** coupled to plateau milestones (it is an illustrative architecture companion to that doc — topology-coupled, not plateau/repo-state-coupled). The diagram HTML is full-chrome (header / legend / HUD / caption + explanatory `#flowPanel` + both `PNG page` / `PNG diagram` controls). Its committed PNG is the chrome-free **dark** render from the exporter's `PNG diagram` export, embedded in the VPA doc (a deliberate exception to the HTML-only convention; HTML + source data remain canonical, PNG supplemental). Validate both light and dark whenever the FLOW scaffold or the VPA source changes. Both the FLOW scaffold and the shared static / interactive exporters are vendored by reference from [`design-system-ASK`](https://github.com/apexSolarKiss/design-system-ASK) and never forked locally; `docs/diagrams/README.md` owns their current pins and capability state. Re-vendor on upstream change.
- **architectural representation atlas** — orientation / deconfliction surface; refresh when a represented diagram or surface is added, retired, renamed, or relocated; when the represented object or authority boundary of a view changes; or when the representational taxonomy changes; not coupled to the plateau-milestone cadence.

Do not refresh between milestones or for routine PRs. Bounded absorption PRs ship a refresh into `docs/diagrams/`, update the README pointer and any cross-reference if needed, and update this file only if the cadence itself changes. Do not maintain in-repo version history (operator-side scratch external to the repo retains any version history).

**Substrate.** A static diagram may be hosted as a single self-contained HTML file or as a repo-native bundle (thin HTML shell + per-diagram source-data file + shared engine / CSS / export files + a `docs/diagrams/README.md` carrying the source-truth-vs-illustrative-snapshot boundary). The interactive state spine is its own artifact class — a self-contained interactive surface with its own engine and styling, distinct from the static scaffolds. Review guidance:

- **Bundle / source-data substrate** (current for all listed diagram surfaces): inspect the per-diagram source-data file for content changes; inspect the README or HTML shell for routing or authority-boundary changes; inspect shared engine / CSS / export files only when they are intentionally updated; check the rendered output when practical. These files are diffable text and produce meaningful git diffs. (The **bounded-generativity figure** and the **architectural representation atlas** are variants of this substrate: each `.figure.js` is both the source-data surface and its bespoke renderer, rather than a consumer of a shared layout engine. Both reuse `diagrams.css` and `export-png.js`; the bounded-generativity figure — method-inherited from method-ASK, not the retired SEQ engine — additionally consumes the Three Functions tokens, while the atlas uses the neutral shared diagram palette and does not consume Three Functions.)
- **Self-contained HTML** (a prior substrate; may recur if a rendering surface is later substituted): typically large (~1.7 MB) because such files bundle fonts and assets as base64. Git diffs on the body are not meaningful; treat the file as a binary asset and check the rendered output rather than the diff.

Either substrate is acceptable. The cadence rules above do not change with substrate.

## Short Version (AP layer)

- Verify repo state before meaningful work.
- Read repo-local truth and grounding note before responding.
- Stop at exact scoped diff before commit.
- State the plan before executing.
- Match the unit of work to the level of the question; do not let "smallest unit" prevent zooming out to architecture scale.
- State the plan before Airtable mutation; capture a structured change summary after.
- Attempt architecture models before opening planning chains.
- Consult the grounding note for foundational premises.
- Do not keep proving accepted premises.
- Do not open ceremony-heavy artifact chains unless they resolve architectural uncertainty.
- Use the prototype as a pressure surface, not as the project center.
- Keep this file workflow-only. Repo holds project state. Grounding note holds external context.
<!-- END local-delta -->
