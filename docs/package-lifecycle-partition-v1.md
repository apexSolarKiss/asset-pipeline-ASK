# Package Lifecycle Partition (v1)

## What this is

A conceptual, reader-facing clarification of a distinction the worked 2c marketing-hero package holds but does not currently make legible: a portable asset-definition package spans **three temporal states**, and a flat presentation of one package fuses them. This note names the partition, maps the 2c package onto it, gives the *interpretive rule* for reading the package's statuses, and specifies the reader-facing calibration the package's surfaces need. It is explicit that the current store does **not** encode this partition at the status level — the rule is how a reader recovers it, not a property the data asserts.

It reasons from the 2c package's own content (the [package map](asset-definition-package-map-2c-marketing-hero-v1.md) and the [worked package store](worked-package-store-2c-marketing-hero/)). It is a clarification of how the package is *read*, not a change to what it holds.

## Posture

```text
conceptual / reader-facing clarification only
changes the package's conceptual lifecycle boundary and first-reader map — not its data
names a defect (the store does not encode the partition at the status level); does NOT claim it resolved
NOT schema / fields / validator / package grammar / structured IA model v3 / runtime
NOT an Airtable or store-data mutation (no YAML data file is changed)
NOT a new evidence claim and NOT a milestone
one model attempt against the concrete 2c package, not an options matrix
self-superseding when a subsequent package, a second substrate, or a consumer earns a sharper partition
```

## The problem this resolves

Presented as one flat surface — a single table, or a single packet record — the 2c worked example reads as one object with one status. But it actually contains three different *kinds* of content, each true at a different point in the workflow's life:

- a **forward-looking definition** that would drive a (re)run;
- a **record of one run that already happened** (seven candidates, a selection);
- a **governed output** that closes that run.

A first reader given the flat surface cannot tell which of three decisions the example asks them to make — *approve a definition to run*, *ratify a completed run*, or *release the held support-slot obligation into execution*. The package's own status fields point in different directions at once: a packet marked `draft`, a hero slot marked `accepted` with a governed asset, and a support slot marked `planned`. In the flat presentation, the status-level partition is absent: nothing in the current package data explicitly encodes which lifecycle state each piece is in. Disentangling them is an interpretive act this note supplies; it is not something the store currently does.

## The three states

| State | What it is | When it is authoritative |
|---|---|---|
| **Prospective definition** | The structured statement that would drive a run: intent, the bounded discretion aperture, constraints, references, required outputs, slot definitions, and the *intended* generation configuration. | *Before* execution. This is the object a "ready to run?" decision is actually about. |
| **Execution / run state** | The variance a run accumulates: the candidate set, the *actual* per-candidate invocation settings, and the events (e.g. prompt remediation) that produced it. Mutable / append-only during a run. | *During* a run. A log, not an instruction. |
| **Governed record** | The durable record of a closed run: the selected candidate elevated to governed asset, with its selection rationale, governance record, curator, pattern, and provenance. | *After* governance closes. A record, not a brief. |

The partition is **semantic, not a storage prescription.** It says nothing about fields, tables, or entities; it says only that a reader (and any consumer) ought to be able to tell which state a given piece of the package is in — and, in this worked example, the data does not let them without the interpretive rule below.

## The 2c package, mapped

| Package element (2c marketing hero) | Lifecycle state |
|---|---|
| `business_intent`, `creative_intent` | prospective definition |
| `creative_discretion` (latitude · bounded_by · anchored_to · decision_owner · closes_at) | prospective definition |
| `constraints` (`BC-WR-PALETTE` / `-LIGHTING` / `-MATERIAL` / `-NEGATIVE`) | prospective definition |
| `references` (`REF-WR-BRANDSYS-01`, `REF-WR-PALETTE-01`) | prospective definition |
| `required_output_set`; the two slot definitions (`role`, `expected`); `slot_prompt`; the **intended** generation configuration (the slot's `generation` block) | prospective definition |
| the 7-candidate set; the **actual** per-candidate invocation settings (the per-candidate `generation` blocks); the `prompt_remediation` event | execution / run state |
| `ASSET-MSG-HG-001-HERO-001`; the hero slot's `status: accepted`; `selection_rationale`; `governance_record`; `curation_pattern`; `captured_at`; the selected-candidate link | governed record |
| the support slot's `status: planned` | prospective definition **held** (a still-prospective obligation, not yet run) |

Intended generation configuration (carried on the slot) and the actual per-candidate invocation settings (carried per candidate) occupy *different* lifecycle roles even though, in this instance, their values coincide (3:4, Gemini 3 Pro Image, in-base). The 2c package is therefore not a single-state object: its hero slot has traversed all three states (defined → run → governed); its support slot rests at the first (defined, held); and its prospective definition may evolve for a later run, but the definition that governed a closed run must remain traceable — later change cannot silently rewrite the governed record.

## Reading the statuses (an interpretive rule, not a typed relationship)

`packet_status: draft`, an `accepted` hero slot, a `governed_output` asset, and a `planned` support slot can be read coherently once two axes are separated:

- **Editorial axis** — whether the *definition* is still being edited.
- **Run / governance axis** — whether a *run* has happened and been governed (per-slot `accepted` / `planned`; per-asset `governed_output`).

The states become conceptually legible when read as separate definition and run/governance axes, but the current store does not encode that partition explicitly. In this worked example, `packet_status: draft` is read as the prospective definition's editorial state, not as a roll-up of slot execution or governance state. This is an interpretive rule, not a typed relationship in the current data.

What the forward decision actually covers: this worked package contains a completed hero record and a still-prospective held support obligation; it is not one undifferentiated approval object. A forward production decision applies to the prospective definition, including whether the support slot is released, remains held, or is retired. The closed hero is historical and should be read as a governed record.

## Selection remains distinct from governance

Selection is the adjudicative transition from run state to governed record. Its rationale may be carried in the governed record; governance is the durable recording and elevation of the selected candidate. Co-location in one carrier does not collapse the event into the record. The 2c package's own `co_location_note` marks this: the shape carries both `selection_rationale` (the makes-true adjudication) and `governance_record` (the durable record), and does not preclude their separation (campaign-mode evidence separated upstream authorship from the seam).

## Reader-facing calibration (what the package's surfaces should carry)

To prevent first-reader decision ambiguity at the points a reader enters the package:

1. **Name what the worked example is.** This worked package contains a completed hero record and a still-prospective held support obligation; it is not one undifferentiated approval object. A forward production decision applies to the prospective definition, including whether the support slot is released, remains held, or is retired. The closed hero is historical and should be read as a governed record.
2. **Label each element by lifecycle state** on the human-readable surfaces (the package map; the store's file map), so prospective definition, run state, and governed record are visible as distinct at a glance — including that one file (`slots.yaml`) carries elements of more than one state.
3. **Show the two status axes separately** wherever a packet-level status appears next to slot/asset statuses, and be explicit that the store does not encode the partition — the separation is an interpretive reading, not a typed relationship in the current data.

This calibration lands in the [package map](asset-definition-package-map-2c-marketing-hero-v1.md) and the [worked package store README](worked-package-store-2c-marketing-hero/README.md). Front-door (`README.md`) calibration is deferred to a later front-of-house pass.

## What this does not do

- It authors no schema, fields, validator, package grammar, structured IA model v3, runtime, or Airtable mutation.
- It mutates no store YAML data file; the package's data is unchanged, and it does not claim the data encodes the partition — that absent typed relationship is named, not closed.
- It does not retrofit evidence-chain artifacts (e.g. [`portable-package-extraction-2c-marketing-hero-v1.md`](portable-package-extraction-2c-marketing-hero-v1.md)); it refines how the package is read, and that artifact remains authoritative for its own portability claim.
- It opens no visual-portability run and marks no milestone.

## Anchor documents

- [`docs/asset-definition-package-map-2c-marketing-hero-v1.md`](asset-definition-package-map-2c-marketing-hero-v1.md) — the human-facing worked example this note calibrates.
- [`docs/worked-package-store-2c-marketing-hero/`](worked-package-store-2c-marketing-hero/) — the package held as data; the file map this note calibrates.
- [`docs/creative-discretion-doctrine-v1.md`](creative-discretion-doctrine-v1.md) — the intent → discretion → variance → selection → governance chain whose tail (selection as the transition into the governed record) this note keeps legible.
