# Asset-Definition Package Map — 2c Marketing Hero (Worked Example)

## What this is

This is one **portable asset-definition package**, shown as a worked example.

The [README](../README.md) names the package as this project's reusable object — the substrate-independent definition layer for a commercial visual-asset workflow. This page makes that concrete by walking the simplest complete case the prototype has proven end to end: the *2c marketing hero*.

Read it as an example, not a spec. It shows what a package holds, how generation fills it, how a human closes it, and how governance records the result — using one real chain from packet to accepted asset.

**What this example is.** This worked package contains a completed hero record and a still-prospective held support obligation; it is not one undifferentiated approval object. A forward production decision applies to the prospective definition, including whether the support slot is released, remains held, or is retired. The closed hero is historical and should be read as a governed record. See [package lifecycle partition](package-lifecycle-partition-v1.md) for why the package's elements sit in three different lifecycle states, and the interpretive rule for reading its statuses.

## The package, instance by instance

The worked case is a "Spring Refresh" marketing hero for the prototype's synthetic D2C everyday-quality home-goods instance ("Warm Restraint"). One image: an offer-ready hero with clean space for a headline / offer copy overlay.

| Definition-layer element | In this package (the 2c marketing hero) |
|---|---|
| **Packet** (the brief) | `PKT-MSG-HG-001` |
| **Business intent** | Marketing / message-driven. A "Spring Refresh" seasonal offer; the anchor is the offer/message, not a single product — communicate renewal and transparent value within Warm Restraint. |
| **Creative intent** (the aim) | A message-bearing composition with room to carry an offer/headline; a warm daylit refresh feeling; products serve the message rather than being the subject. |
| **Creative discretion** (the aperture grant) | What may vary: which bath-textile pieces appear and how they are arranged; camera framing/crop; surface choice; the placement and extent of the copy-overlay space. Bounded by the constraints and references below. Decision owner: the marketing curator. The aperture closes at hero-slot selection. |
| **Constraints** (what may not vary) | Warm Restraint palette · daylit high-key lighting · natural-fiber material honesty · preserved copy-overlay negative space (`BC-WR-PALETTE` / `-LIGHTING` / `-MATERIAL` / `-NEGATIVE`). |
| **References** (visual anchors) | Brand-system and palette references (`REF-WR-BRANDSYS-01`, `REF-WR-PALETTE-01`). |
| **Required output** | One message-hero (offer-ready, copy space). The secondary support frame is held — see *What this does not prove*. |
| **Output slot** (the obligation) | `SLOT-MSG-HG-001-HERO`, role `message_hero`: an offer-ready hero with clean negative space for a headline / offer overlay. |
| **Slot prompt** (the generation instruction) | The composition-and-aesthetic instruction for this slot. It carries composition and aesthetic only; output framing (3:4 portrait) is a separate field setting, not prompt text. Remediated once after the first batch drifted (furniture at an odd angle / robe on a hook / obstructed copy field). |
| **Candidate set** (the variance) | Seven candidates generated and accumulated on the slot — six before the prompt remediation, one after. |
| **Selection** (closing the aperture) | The curator selected one candidate (the post-remediation take) as the one that best carries the offer within the envelope — an authorship-bearing choice made across the full candidate set, with the reason recorded. |
| **Governed asset** (the record) | `ASSET-MSG-HG-001-HERO-001` — the selected candidate, captured as a governed output with its curation reason, curator, and provenance; the output slot moved to *accepted*. |

The topology reads top to bottom as a function-order projection: **the brief opens an aperture → generation fills it with candidates → a human selects one and makes it true to the intent → governance records the result.**

### Reading the three lifecycle states

The rows above are not all the same *kind* of thing — they sit in three lifecycle states, and telling them apart is how a reader knows which decision the example supports:

- **Prospective definition** (what would drive a run): packet, business intent, creative intent, creative discretion, constraints, references, required output, the slot definitions, the slot prompt, and the *intended* generation configuration. The held **support slot** rests here — a still-prospective obligation, not yet run.
- **Execution / run state** (a run's log, not an instruction): the seven-candidate set, the *actual* per-candidate invocation settings, and the prompt-remediation event.
- **Governed record** (the closed run): the governed asset and the hero slot's *accepted* status, with the governance record carrying the selection rationale. (Selection itself is the transition from run state into the governed record, not a state of its own.)

The states become conceptually legible when read as separate definition and run/governance axes, but the current store does not encode that partition explicitly. In this worked example, `packet_status: draft` is read as the prospective definition's editorial state, not as a roll-up of slot execution or governance state. This is an interpretive rule, not a typed relationship in the current data. Full mapping and the rule: [package lifecycle partition](package-lifecycle-partition-v1.md).

## What Airtable demonstrates (and what is substrate-independent)

Everything in the table above is **package content** — the structured definition layer. None of it is specific to Airtable.

In this worked example the package is *held and run* in an Airtable base (the integrated four-workflow prototype). Airtable is **one substrate implementation**: it stores the fields, runs the in-base image generation, accumulates the candidates, and holds the governed-asset record. The candidates were generated inside the base and the selected one was captured into the governed-asset record **without leaving the system** — no external file import.

But the **package is the definition layer above the substrate.** The same intent / discretion / constraints / references / slot / candidate / selection / governance structure could be held in another tool, a document, or a data format. Airtable demonstrates the package working; it is not the package.

## What this proves

This one chain shows the full loop running inside the system:

- the **definition layer drives generation** — the slot prompt, constraints, and references shape what is produced;
- **candidates accumulate** as a set, not a single inevitable answer;
- **human selection closes the aperture** — one candidate is chosen and made true to the intent, against the alternatives;
- the **governed asset records the result** — what was chosen, by whom, for what reason, with provenance.

That is the portable package doing its job, demonstrated once, end to end, with no external import.

## What this does not prove

- **The support slot is still held.** `SLOT-MSG-HG-001-SUPPORT` was deliberately not generated; this example is the single message-hero, not the whole marketing mode.
- **This is not a four-mode comparison.** SKU, collection, and campaign modes are pressured at their own (uneven) evidence depth elsewhere; this is one mode's one slot.
- **This is not a schema mandate.** The field names here are how this prototype substrate happens to hold the package; they are not a required schema.
- **Not every package must populate every carrier.** The information kinds are *possible* carriers, inherited or expressed as each workflow needs them; a different package may omit, inherit, or defer some.

---

*A reader-facing worked example. The architecture docs ([`docs/architecture.md`](architecture.md), [`docs/index.md`](index.md)) carry the full model and evidence trail; the [README](../README.md) names the portable asset-definition package this example instances.*
