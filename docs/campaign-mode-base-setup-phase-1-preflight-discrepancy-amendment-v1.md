# Campaign Mode Base Setup // Phase 1 Preflight Discrepancy Amendment v1

## Purpose

This amendment narrows one element of the merged Phase 1 structural plan ([`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md)) in response to a preflight discrepancy surfaced when the live SKU base schema was re-inspected before any mutation. The execution guardrail in the merged plan said: stop and return with a structured discrepancy summary if live schema differs from captured schema; do not silently correct the plan during mutation. Preflight surfaced exactly that case.

The amendment changes one specific item: the singleSelect option lists for two `constraint_rules` fields will use a **clean intentional mirror** (the documented intended option vocabulary) rather than a **raw exact mirror** (which would propagate accidental data-entry pollution from the live SKU base into the new campaign base).

It is not a rewrite of the merged Phase 1 plan. All other elements — table count, table names, field counts, field names, field types, field descriptions, all other singleSelect option lists, record creation specifics, validation method, terminal state, two-step authorization framing — remain exactly as merged.

## Posture

```text
one artifact (this amendment)
no airtable mutation in this artifact
no mutation to the existing SKU base
no campaign base creation
no rewrite of the merged Phase 1 plan (PR #181 stands as the historical plan record; this amendment narrows one element)
no rewrite of architecture.md / apex / predecessor passes / D2 decision note / setup-decision note / setup-content artifact
no v2 apex
no authorization for Phase 1 mutation; re-authorization required after this amendment merges
```

## ASK Direction Recap

ASK has directed: use a **clean intentional mirror** for the two affected `constraint_rules` fields. Do NOT propagate the accidental options. Do NOT mutate the existing SKU base in this step. Document the discrepancy and the resolution as a narrow plan amendment before any campaign base creation.

## The Discrepancy

Preflight schema check on the SKU-driven Furniture v1 base (`appoqJ25B6w4vSuX9`) confirmed that 8 tables exist, all field counts match the merged plan (11 / 9 / 7 / 21 / 10 / 17 / 7 / 14), and all field names / types / descriptions match. Most singleSelect option lists also match either the field descriptions or the documented schema intent.

Two `constraint_rules` singleSelect fields, however, contain accidental option additions that look like data-entry mistakes from prior project work, not intentional schema doctrine.

### `constraint_rules.scope_type` — live options

Field description: `"product, category, product_class, brand_context"`

Live options actually include those four PLUS four additional entries:

| Option name | Assessment |
|---|---|
| `product` | intended ✓ |
| `category` | intended ✓ |
| `product_class` | intended ✓ |
| `brand_context` | intended ✓ |
| `early_autumn_reset` | accidental — looks like a workflow-instance value created as an enum option |
| `output_requirement` | accidental — `output_requirement` is a `rule_type` value, not a `scope_type` value |
| `Required outputs must include one hero asset, two companion assets, and one side-by-side review board with light annotation sufficient to judge family coherence.` | accidental — full sentence used as an option name, clear data-entry mistake |
| `2` | accidental — number "2" as an option name, clear data-entry mistake |

### `constraint_rules.rule_type` — live options

Field description: `"See enum vocabularies"` (no values listed in description)

Live options:

| Option name | Assessment |
|---|---|
| `hard_requirement` | intended ✓ |
| `fidelity_rule` | intended ✓ |
| `presentation_rule` | intended ✓ |
| `output_requirement` | intended ✓ |
| `Required outputs must include one hero asset, two companion assets, and one side-by-side review board with light annotation sufficient to judge family coherence.` | accidental — same long-sentence mistake as on `scope_type` |
| `2` | accidental — same number-as-option mistake as on `scope_type` |

### Why the merged plan didn't catch this in advance

The merged plan stated "exact mirror" + "all enum options mirror as-is" without enumerating every singleSelect field's options. The plan's captured option lists were only for the 5 fields explicitly used by Phase 1 records (none of which are on `constraint_rules`). The preflight schema check — required by the merged plan's execution guardrail — caught this by enumerating ALL singleSelect option lists before mutation.

## The Amendment

The campaign base mirror for these two fields uses the **clean intentional mirror** option set, not the raw polluted live option set:

### `constraint_rules.scope_type` — campaign base mirror

Options created in the campaign base (in this order):

- `product`
- `category`
- `product_class`
- `brand_context`

Accidental options (`early_autumn_reset`, `output_requirement`, the long sentence, `2`) are explicitly excluded.

### `constraint_rules.rule_type` — campaign base mirror

Options created in the campaign base (in this order):

- `hard_requirement`
- `fidelity_rule`
- `presentation_rule`
- `output_requirement`

Accidental options (the long sentence, `2`) are explicitly excluded.

### Why this is a clean intentional mirror, not silent correction

The merged plan's execution guardrail required stopping if live schema differed from captured schema. Preflight stopped. This amendment surfaces the discrepancy in repo-visible form, names the resolution explicitly, and lands as a scoped diff for review BEFORE any mutation. The mutation that eventually executes (after re-authorization) will follow the amended plan, not silently deviate from the original. The discipline the guardrail protects — "do not silently correct the plan during mutation" — is preserved.

## What This Amendment Does NOT Do

- Does not mutate the existing SKU-driven Furniture v1 base. Cleaning the SKU base's polluted options is a separate scope of work, deferrable.
- Does not create the new campaign base. Phase 1 mutation remains held pending re-authorization against the amended plan.
- Does not change any other element of the merged Phase 1 plan. Table count, field counts, field names, field types, all other singleSelect option lists, record creation specifics (3 packets / 9 slots / 8 products), validation method, terminal state, and two-step authorization framing all remain exactly as merged.
- Does not extend Phase 1 scope. Records-to-create remain identical; the discrepancy is in schema mirror only.
- Does not change the Phase 2 hold posture.
- Does not authorize Phase 1 mutation. After this amendment merges, ASK re-authorization against the amended plan is required before any Airtable mutation.

## What Comes After

If ASK approves this amendment and merges it, then re-authorizes Phase 1 mutation against the amended plan, the next step is Phase 1 mutation execution as previously planned, with the only deviation being:

- When creating the `constraint_rules.scope_type` and `constraint_rules.rule_type` singleSelect fields in the new campaign base, use the clean intentional option lists from this amendment, not the raw live SKU base option lists.

All other steps in the Phase 1 mutation sequence (preflight re-confirmation if needed, base creation, table creation, field creation with mirrored types and descriptions, all other singleSelect option lists mirroring exactly, record creation per the plan's identity-records spec, 11-point validation method, structured change summary artifact after validation passes) remain as the merged plan specifies.

A separate future scope of work — not authorized by this amendment — could clean the polluted options on the SKU base itself. That would be a small mutation to the existing SKU base (removing four accidental options each from `scope_type` and `rule_type`), with its own plan-before-execute and structured change summary discipline. Out of scope for this amendment.

## Anchor Documents

- [`docs/campaign-mode-base-setup-phase-1-structural-plan-v1.md`](campaign-mode-base-setup-phase-1-structural-plan-v1.md): merged Phase 1 plan this amendment narrows one element of
- [`docs/campaign-mode-operationalization-setup-content-v1.md`](campaign-mode-operationalization-setup-content-v1.md): setup-content artifact carrying the campaign-mode content commitments
- [`docs/campaign-mode-operationalization-setup-decision-note-v1.md`](campaign-mode-operationalization-setup-decision-note-v1.md): setup-decision artifact defining the test shape
- [`docs/non-sku-mode-operationalization-decision-note-v1.md`](non-sku-mode-operationalization-decision-note-v1.md): D2 decision note that surfaced the choice path
- [`docs/architecture-apex-definition-layer-v1.md`](architecture-apex-definition-layer-v1.md): v1 apex; Named Limitation #3 is what this test (when Phase 1 mutates) addresses
- SKU-driven Furniture v1 base (`appoqJ25B6w4vSuX9`): the source schema being mirrored; live state inspected during preflight that surfaced this discrepancy
