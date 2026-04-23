# First-Live-Run Invocation-Container Provisioning Note v1

## Purpose

This note records one bounded decision needed before the first end-to-end live run of `asset-pipeline-ASK // SKU-Driven Furniture v1`.

It resolves a narrow ambiguity that became visible during execution preparation:

- the execution plan keeps broader Airtable configuration revision out of scope
- but the chosen Airtable-native invocation path still requires one concrete native invocation container

This note authorizes that one bounded provisioning move only.

It does **not** reopen the invocation-surface decision.
It does **not** authorize broader Airtable configuration drift.

## Decision

For the first bounded live run, the owned Airtable base is authorized to provision exactly one native Airtable invocation container as follows:

- base: `asset-pipeline-ASK // SKU-Driven Furniture v1`
- table: `workflow_packets`
- field to add: `live_generated_image_v1`
- container class: Airtable field agent
- output role: generated hero-image output field for the first live run only

The authoritative prompt source for that field agent should be:

- `workflow_packets.composed_prompt_output`

`workflow_packets.composed_prompt_output` must remain a plain authoritative prompt-bearing field.
It must **not** itself be converted into the field agent.

## Why This Gate Exists

The execution plan kept `Airtable configuration revision` out of scope in order to prevent uncontrolled drift in the proof record graph and in the bounded first-run shape.

That prohibition was authored before execution preparation had confirmed where the native Airtable invocation container would actually live.

During execution preparation, the owned base surfaced a viable Airtable field-agent provisioning path in `workflow_packets`, but the exact invocation container was not already provisioned.

This created a narrow ambiguity:

- whether adding that one enabling field-agent container would count as prohibited configuration drift
- or whether it should be treated as an allowed enabling move required by the already-chosen Airtable-native invocation path

This note resolves that ambiguity in favor of one tightly bounded enabling move.

## Authorized Provisioning Move

The authorized provisioning move is:

1. add one new field in `workflow_packets` named `live_generated_image_v1`
2. convert that field into an Airtable field agent
3. configure it to generate one image using `workflow_packets.composed_prompt_output` as the authoritative prompt source
4. keep the generated image result in `workflow_packets.live_generated_image_v1` as the native invocation/output container for the first live run

If the native field-agent setup honestly supports one product-truth supporting image input without broader configuration expansion, that supporting input may be used from the already-carried packet burden for `PKT-SKU-005`.

If it does not, this note does **not** authorize widening scope to add more tooling surfaces merely to simulate that support.

## Bounded Scope

This note authorizes only:

- one new field
- in one table
- in one owned base
- for one first bounded live run
- for one packet-centered run anchored on `PKT-SKU-005`
- using one Airtable field-agent container only

This note does **not** authorize any broader Airtable reconfiguration.

## What This Does Not Authorize

This note does **not** authorize:

- converting `workflow_packets.composed_prompt_output` into the field agent
- adding a second native invocation container
- adding Automations-based invocation instead
- adding a separate Interface-only invocation path
- expanding AI-field or agent use across other tables
- changing the seven-table proof record graph
- changing schema docs
- general Airtable AI buildout
- multi-mode container provisioning
- post-run container changes without a separate decision

## Relationship To Existing Artifacts

This note should be read as bounded clarification alongside:

- `docs/first-live-run-invocation-surface-decision-note-v1.md`
- `docs/end-to-end-live-model-run-execution-plan-v1.md`

It preserves both prior decisions:

- Airtable-native invocation remains the chosen path
- the owned Airtable base remains the canonical packet / seam / evidence surface

It narrows only one point:

- the specific provisioning move allowed so that the chosen native invocation path can actually be executed

## Next Step

After this note is landed, the next honest move is:

1. provision `workflow_packets.live_generated_image_v1` exactly as authorized here
2. continue the first bounded live run using the already-declared packet `PKT-SKU-005`
3. write seam-trail and evidence records back into the owned base per the execution plan
