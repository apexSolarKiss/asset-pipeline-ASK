# Brand-Intake Artifact Contract (v1)

## Posture

```text
application-layer contract for the authored outputs of brand intake
three output artifacts · one placement rule · content kept apart from evidence, authority and review
not a generated-output grammar · not architecture front-door doctrine
not a new inheritance layer, scope position, workflow mode or IA layer
not schema · not carrier · not field set · not enum · not validator / runtime · not structured IA v3
not held-candidate adjudication
does not revise any existing artifact in place
does not authorize Airtable, prototype, package or production work
self-superseding when use with a second brand earns, narrows or refutes it
```

## What this is

Brand intake gathers everything a production needs at once. In one document or one conversation, a brand can state a visual direction, a recurring delivery requirement, a fact about one product or space, a permission, and a request about tooling. The intake record adds where each statement came from and how settled it is. When all of that is authored into one document, the document's category ("the brand guide") silently sets the scope and authority of every statement in it:
- a delivery count reads as brand identity;
- a fact about one space reads as brand doctrine;
- a review request reads as content.

This contract fixes the authored outputs of brand intake. It names three output artifacts, the rule that places each intake statement in one of them (or elsewhere), and the separation of a statement's content from its evidence, its authority and its review presentation. It works at a carrier boundary: which authored artifact carries which statements. The artifacts are prose carriers; the contract adds no layer, field or structural carrier.

The architecture already distinguishes these objects:
- [`visual-payload-architecture-v2.md`](../visual-payload-architecture-v2.md) separates the brand image system from product truth, context-profile specialization, output obligations and scoped prohibitions;
- [`brand-system-carrier-decision-surface-v2.md`](../brand-system-carrier-decision-surface-v2.md) places per-touchpoint requirements at packet and slot scope;
- [`brand-system-input-application-guidelines-to-ia-mapping-v1.md`](../brand-system-input-application-guidelines-to-ia-mapping-v1.md) separates brand-wide coherence principles from delivery requirements;
- [`brand-ingestion-authority-propagation-and-binding-v1.md`](../brand-ingestion-authority-propagation-and-binding-v1.md) separates transmission from adoption;
- [`authorized-transformation-and-target-specification-v1.md`](../authorized-transformation-and-target-specification-v1.md) separates baseline truth, authorized transformation and target specification.

What the architecture did not have is a contract for the artifacts intake authors, so that an executor can keep those objects apart without operator context.

## The three output artifacts

"Artifact role" here means what an authored artifact is for. It is not a slot role, a depiction role or an output role, and the three names are not an enum.

Lifecycle, per [`package-lifecycle-partition-v1.md`](../package-lifecycle-partition-v1.md):
- the production brief sits on the prospective-definition side;
- the image system and the image-production profile are brand-scope sources the brief draws on;
- an execution plan's intended configuration is prospective definition, and its actual settings are run state;
- review views, run state and governed records are none of the three.

Neighbors in this sub-tree:
- the production brief is not the workflow redesign brief of [`workflow-redesign-brief-template.md`](workflow-redesign-brief-template.md), which proposes a redesigned workflow;
- the fictive style spec in [`examples/sku-furniture-brand-style-spec-example.md`](examples/sku-furniture-brand-style-spec-example.md) is an earlier, combined analog of an image system with product-class guidance. It is not retrofitted.

### 1. Brand image system

**Job.** State what the brand's imagery looks like, and how it is made to look that way, at brand scope.

**Carries** the brand image grammar, plus the brand-scope prohibitions and references that go with it:
- visual center;
- styling vocabulary;
- palette and tonal treatment;
- light;
- composition, viewpoint and optics, as visible qualities;
- image registers and their roles;
- set-level visual relationships that define the brand's grammar: how the images of a set cohere, sequence, repeat or contrast;
- human-presence treatment;
- visual exclusions;
- brand-wide coherence principles across formats or channels;
- governance rules stated at brand scope, such as "depict the target state unless the brand authorizes a departure";
- illustrated references, each with what it demonstrates and its limits.

**Does not carry:**
- deliverable counts, or channel and format assignments;
- any one production's facts or planned outputs;
- permissions and production checks that are not about the look;
- implementation;
- review history, approval requests or status narrative.

**Maps to** three parts of `visual-payload-architecture-v2.md`:
- **the brand image system:** the brand-scope portion of the inherited scoped visual statements (group A), "a visual-domain subsystem housed within the brand-system scope … **not** an additional inheritance layer";
- **brand-scope scoped prohibitions** (group B). They keep their role as constraints during specification and as conformance predicates after generation; they are not one universal brand filter;
- **approved references** (group C). A reference's governing role is still assigned within each production ask.

It does not resolve the brand-system-layer structural decision.

**Declared domain-design extension.** An image system may carry explicitly scoped domain-design content when depicting the brand's product requires recognizing its design language. The pre-completion visualization case of `authorized-transformation-and-target-specification-v1.md` (case 3) is the kind of production where this arises: the images start from photographs of an unfinished space, so the image-maker must recognize the brand's recurring built design language to depict it faithfully. Furnishing and styling need no extension; they are already image-system content. The extension is bounded:
- it is declared, with its scope, at the head of the artifact;
- it is stated as recurring design language: directive or reference statements about depicted-world dimensions (subject, space and environment, material appearance). It is never stated as the product truth of any instance;
- a recurring element appears in an output only where the instance has it, or the instance's target includes it. Recurrence does not authorize adding it;
- category-typical conventions belong at category / product-class scope, not in one brand's image system;
- the extension is optional. It is not required content for every brand.

### 2. Image-production profile

Always write the full name, so it is not read as the `PROFILE` slot role.

**Job.** State how the brand ordinarily commissions and uses imagery: the recurring production program that uses the image system.

**Carries:**
- the recurring use context;
- the recurring deliverable shape, such as a default set and its register allocation;
- how often a visual treatment recurs across a set, and in which outputs (for example, the share of images that include a figure). How the treatment looks stays in the image system;
- the brand's channels or touchpoints, and their formats;
- the policy for adapting outputs across formats;
- what each production must specify;
- recurring production checks and permissions the brand states, including brand-independent conformance checks on generation defects;
- the production method (how changes are recorded), marked as method rather than brand direction.

**Does not carry:**
- visual grammar;
- any one production's facts or plan;
- implementation.

**Maps to:**
- application-guidelines content that resolves into packet and slot output obligations: per-channel rules, per-format adaptations, per-touchpoint constraints and production-context boundaries, in `brand-system-input-application-guidelines-to-ia-mapping-v1.md`;
- packet-template content, the recurring packet shapes of [`brand-discovery-digestion-layered-intake-architecture-v1.md`](../brand-discovery-digestion-layered-intake-architecture-v1.md);
- mode activation and the per-mode touchpoint inventory, where a brand has them.

Per-touchpoint constraints remain properties of the packet or slot (`brand-system-carrier-decision-surface-v2.md`, Zone 3). The profile is a source those obligations are resolved from, not a carrier at brand-system scope.

**It is not the context-profile specialization** of `visual-payload-architecture-v2.md`. That object specializes the inherited visual stack for a production context, and its IA home remains held. A profile statement that works as context specialization, such as a context-specific lighting setup, is marked as such. This contract does not decide where context profiles live. The profile is not a workflow mode or a scope position either.

### 3. Production brief

**Job.** State one production's ask.

**Carries:**
- purpose and scope;
- creative intent for this production, stated separately from its business purpose;
- the granted aperture: what may vary, bounded by what, anchored to what, and where selection closes it;
- the decision owner, and any authorized decision-maker with their delegated scope;
- the production anchor and commercial referent, in the vocabulary of `authorized-transformation-and-target-specification-v1.md`;
- the image system and image-production profile it uses, by version;
- the role each reference or input plays in this production;
- the product truth it relies on, with its source;
- the permission confirmations this production relies on;
- the depiction target: the state its outputs depict, with the authoritative source for each relevant feature, and, where the target differs from an applicable baseline, each authorized transformation with its changed features and scope (below). The baseline / transformation branch is conditional; a brief whose target is authored directly from source of intent is valid;
- the output plan: planned outputs, each with its image register or slot role, channels, formats and relevant inputs;
- revision direction during production, each item with its scope and authorization;
- open items.

**Does not carry:**
- brand-wide direction;
- the recurring program;
- implementation: fields, automations, model settings, candidate counts;
- run history.

**Maps to** the packet-scope production ask, on the prospective-definition side. Its intent and aperture content is the creative brief of [`creative-discretion-doctrine-v1.md`](../creative-discretion-doctrine-v1.md): it grants the aperture for that production, and is not a second brief.
- **Product truth** enters as an orthogonal input. The brief records it and its source but does not author it, and no default or inference fills it.
- **The output plan** is the required output set and the slot obligations.
- **Not a held candidate:** the brief is not the held `messages` / `briefs` candidate, and earns nothing for it.
- **Production anchor:** a SKU, a collection, a message or offer, or a campaign concept. A space or property is a commercial referent, and a project is an operational container, as that note has it. Whether a production organized around one space needs an anchor of its own is held.

**Depiction target and its sources.** A brief identifies the state its outputs should depict and the authoritative source for each relevant feature. Sources may each establish different features:

| Element | What it establishes |
|---|---|
| Photographs of an earlier or unfinished state | Geometry, openings, and the condition visible when photographed |
| Approved design specification | Intended finishes or alterations, within its stated scope |
| Resolved depiction target | The combination this production is authorized to depict |

In the vocabulary of `authorized-transformation-and-target-specification-v1.md`:
- the resolved depiction target is the **target specification**: what outputs are evaluated against;
- each source can serve as **baseline truth** for the features and the state it establishes. An approved specification may supply baseline truth: it is already product truth;
- where the target differs from an applicable baseline, the change is an **authorized transformation**, with its preserved and changed features, its scope and its decision path. The note's case 3 shows this shape: an early photograph governs geometry, and an approved design supplies finishes and furnishing intent.

These are not competing models. Whether an approved design is read as baseline truth for the features it covers, or as an already-authorized transformation of an earlier photographed state, the brief records the same three things: each source, with the features and state it establishes; each authorized transformation, where one applies; and the resolved target. Neither reading erases the other sources or the authority behind them. An already-approved target needs no redundant authorization merely because production begins. Input photographs are evidence of the state they record; they are not automatically the target.

A brand-facing artifact names these in plain words. For example, "target state" for the state the images should depict, and **exception** for a deliberate departure from it, authorized for one planned output or for the whole production. Depicting an approved specification that the brief names is not an exception: it is part of the target. An exception is a further authorized transformation; once bound, the target for that scope includes it.

The governance record's "authorized exception" is the downstream trace of an accepted result, not the same object.

## Placement rule

1. **Place each statement by what it governs and at what scope.** The document, meeting or input category it came from does not decide its place. One utterance can carry several limbs; split it where the meanings differ, as the authority note classifies "each limb, not the meeting".
2. **This rule governs placement, not traversal.** The intake architecture's stage-ordered extraction sequence is unchanged.
3. **Destinations:**

| Destination | Holds statements that … |
|---|---|
| Brand image system | say what the brand's imagery looks like, at brand scope, independent of any deliverable or instance |
| Image-production profile | say what the brand ordinarily commissions, for which channels and formats, or what every production must specify or check |
| Production brief | concern one production: its anchor, the facts or target it depicts, a change authorized for it, its planned outputs, its revision direction |
| Execution plan | say how a substrate or tool realizes the production: fields, automations, model settings, candidate counts, permission tests |
| Evidence-and-authority record | say where a statement came from, who said or confirmed it, what it rests on, how certain it is, and under which authorization it operates |
| Other Axis-B scope | belong at category / product-class scope: outside these three artifacts; carrier held. Mode activation and the per-mode touchpoint inventory stay in the profile and keep their mode-specific position |
| Review presentation | ask the reader to act, report review status, or narrate changes between versions. Transient; not content |
| Retired | earn no place. The reason is recorded |

4. **A statement that mentions formats is placed by what it governs.** "Keep the product's silhouette whole in every crop" is a brand-wide coherence principle (image system). "Deliver the lead image at 1:1 and 16:9" is an obligation: a profile default, or part of one brief.
5. **Treatment, allocation and set-level relationships are placed by function, not by the presence of a number.** How a visual treatment looks belongs in the image system. A recurring deliverable allocation belongs in the profile: how many outputs of each kind are commissioned, or how often a treatment is used across them, and in which outputs. A set-level visual relationship that defines the brand's grammar belongs in the image system, even when it is stated with a number: how the images of a set cohere, sequence, repeat or contrast. The test: an allocation says which outputs, or how many, carry a content, treatment or deliverable; a relationship says how the outputs relate to one another, such as what they share, repeat, vary or sequence.
6. **Brand-independent generation checks are production checks.** Warped geometry, doubled parts or garbled lettering belong in the profile. Brand-specific visual exclusions belong in the image system.
7. **A generation setting is not an adaptation policy.** How a tool makes an output (generate at one ratio, then trim) belongs in the execution plan. Which formats a selected output is adapted into belongs in the profile.
8. **A deviation for one production** is stated in its brief, never in the image system or the profile. This is consistent with the application-guidelines mapping, where deviation from steady-state application rules is articulated for the campaign or by the operator, not by the guidelines.
9. **Context specialization is placed by scope.** A statement that specializes the visual language for a production context is marked as such: if recurring, in the profile; if for one production, in the brief. Its IA home remains held.
10. **Evidence-ranking rules order content; they do not settle it.** Where prose and imagery diverge, the asset library carries, which orders candidate content for validation. Such rules settle no content and confer no authority.

## Content, evidence, authority and review

Four concerns, kept apart:
- **Content** is what the artifact states. It carries no attribution, interview chronology or status narrative.
- **Evidence** is what a statement rests on: its derivation trace. Zone 6 of the carrier decision surface and the Option F posture ([`option-f-trace-carrier-shape-design-surface-v1.md`](../option-f-trace-carrier-shape-design-surface-v1.md)) govern it.
- **Authority** is a relation established by an act (`brand-ingestion-authority-propagation-and-binding-v1.md`). It is a separate trace: authority trace is not derivation trace.
  - Moving a statement faithfully into the right artifact is authority-preserving transmission, when the statement was already operative under a locatable authority relation and its proposition, scope and limiting context are preserved.
  - The scope test runs against the scope the confirming act actually covered. Applying an already-authorized brand-scope rule to a production within that scope is use under the existing authority: a brief may cite or restate it, and no re-approval follows. Changing the rule's authorization scope is different: restating it so that it governs only one production, extending it beyond the scope confirmed, or relaxing it for one production is an authorization-bearing act that needs adoption. A move that only corrects the artifact category, without changing scope, is transmission.
  - A change of meaning is a proposal that needs adoption.
  - A cleaner artifact gains no authority by being cleaner: canonical-shaped is not canonical-authorized.
- **The evidence-and-authority record** keeps both traces, distinguishably, keyed to the content's statements.
- **Review presentation** is what a reviewer sees beyond the content: provenance annotations, the request, the status, the change list. It is composed from the content and the record, and never written into the content source.
  - **What a brand reviews** marks every statement whose decision-relevant meaning is not already operative under the brand's authority at that scope: a new proposition, a resolved ambiguity, or a changed meaning, permission or scope. Confirming an artifact then never adopts a proposal the reviewer could not see.
  - The test is what changed, not who handled the wording. A faithful relocation or normalization of the brand's own direction keeps its authority within its limits and is not marked as a proposal; a polished rewrite confers no authority either. Open questions are shown as open, not as proposals.
  - This does not exclude review-context content, which in campaign mode is IA content.

## One maintained source per artifact

- **One source.** Each artifact has one maintained semantic source. A brand-facing page, a review view with provenance annotations, or a structured export is a rendering of that source plus separately maintained inputs (the evidence-and-authority record; technical provenance). No renderer holds its own copy of substantive statements.
- **No rewording.** A rendering may show fewer statements; it may not reword them. Wording changes are made in the source, so a rendering transmits what it shows without loss. The authority note's distinction applies: a lossless normalization can carry authority, and one that resolves an ambiguity cannot. "Rendering" here is distinct from the selective projection of product truth into slot obligations.
- **Identifiers are resolved, not reworded.** Image references and statement keys are identifiers. A rendering may resolve them (show the image, hide the key) without rewording a statement.
- **Statement keys.** Stable statement keys let the record and the annotations attach to content without editing it. Any light convention will do. Keys are a review and rendering aid; they do not decide the granularity Option F holds.

## Dependencies and change impact

Dependencies run one way: production brief → image-production profile → brand image system. A brief names the versions it uses.

Profile defaults reach a brief as declared obligations. They converge at slot resolution with the other orthogonal inputs, as in `visual-payload-architecture-v2.md`; they do not form an inheritance chain. A brief departs from a default only explicitly.

| Change | Changes | Does not change |
|---|---|---|
| A correction to the visual language | The image system, as a new version; briefs that use it re-check | The profile, product truth |
| A delivery format or count | The profile (recurring) or one brief (one production) | The image system |
| A revision to one planned output | That brief | The profile, the image system, product truth |
| A new fact about the product or space, supplied by the brand | Its product-truth source; every brief relying on it re-checks | The image system, the profile |
| A trial direction in one version | That brief, as trial direction | The target, product truth, the profile, the image system |
| A correction that turns out to recur | The profile or image system, only by explicit authorization at that scope | Nothing by itself |

**Recurrence is evidence, not authority.** A result that recurs across outputs is diagnosed for its cause: the brief, the image system, the profile, or the generation. Its correction is then placed by what it governs. Recurrence alone neither selects the destination nor authorizes promotion to a broader scope. A brand-wide visual exclusion is added to the image system only when the brand adopts it as brand-wide direction. A tool defect is handled in the execution plan, and becomes a standing production check in the profile only when the brand states or adopts that check.

## Approval scope

- **What adoption means.** Adoption here is authority-conferring adoption and binding by an authorized actor, at a declared scope and period. It is not curation-seam governance, and not selection.
- **Each artifact is adopted by version, at its own scope.**
  - Adopting an image system does not adopt a profile, a brief, a permission or an implementation.
  - One decision may adopt several artifacts if it names them; the functions are not serial gates.
- **Open questions.** An open question in one artifact does not block adopting another, unless the other depends on the answer.
- **Adopting a brief** does not adopt the image system or profile it uses. Their unadopted statements remain proposals, unless the adopting decision names them.
- **Separate authorities.** Visual-direction authority is not release, licensing, synthetic-alteration or publication authority.
- **Effect.** When an artifact is adopted, its statements become operative within its scope, unless the adopter leaves a statement open or rejects it. Their origin stays in the evidence-and-authority record.
- **Before adoption,** a review copy says so in one status line. The content does not narrate its own approval process.

## Trial direction

During a production, the decision owner, or an authorized decision-maker within delegated scope, may ask to see a departure from the target tried in one version. The request authorizes that trial only:
- it is recorded in the brief as trial direction;
- it changes neither the target, product truth, the profile nor the image system;
- the trial version is not eligible for final selection until an authorized decision-maker (who may also be the decision owner) binds the departure as an authorized transformation, for that planned output or for the whole production;
- once the departure is bound, a version made before binding is observed again against the new target before it is eligible.

A requested change with no authorization behind it does not become creative discretion because a model can render it. The tested slot-resolution calculus resolves that condition to `authorization-required`; this is cited as corroboration, not canon.

## Skeletons

```text
BRAND IMAGE SYSTEM
  title · version · one status line
  [one-sentence visual center]
  scope: what this covers; [declared domain-design extension, if any, with its scope]
  1. visual center and reference set
  2. [domain-design extension, if declared]
  3. styling and furnishing vocabulary; what may change
  4. depiction: light, viewpoint, composition, optics (visible qualities)
  5. image registers: priority, roles, variety
  6. target-state governance at brand scope: how images treat the product's truth and its sources, and departures
  7. people
  8. visual exclusions
  9. [third-party works and cultural references, if relevant]
  10. references: what each demonstrates, and its limits
```

```text
IMAGE-PRODUCTION PROFILE
  title · version · one status line · image system used
  1. use context
  2. default deliverable shape
  3. channels / touchpoints and formats; adaptation policy; [open questions]
  4. what each production brief records
  5. during production: the brand's decisions · how changes are recorded (production method)
  6. production checks · permissions · operating assumptions
```

```text
PRODUCTION BRIEF
  title · version · one status line · image system and profile used, by version
  1. purpose and scope (production anchor; commercial referent)
  2. creative intent · granted aperture · decision owner and authorized decision-makers
  3. inputs and their roles in this production; related material and its role; permission confirmations
  4. depiction target: the state to depict · source for each relevant feature · [authorized transformations, with scope]
  5. output plan: planned outputs · image register or slot role · channels · formats · inputs · [unresolved]
  6. revision direction: item · scope · trial or authorized
```

## Boundary cases

[`brand-intake-artifact-contract-boundary-cases-v1.md`](brand-intake-artifact-contract-boundary-cases-v1.md) holds synthetic cases with expected placements. A reader places each case using this contract alone, without the companion; the placements are then compared with the expected ones. Because the expected placements are written down before the run, the cases can fail. The companion also defines the bounded composition-check procedure used for worked-artifact checks ([Checking a composed production ask](brand-intake-artifact-contract-boundary-cases-v1.md#checking-a-composed-production-ask)).

## Earned and held

- **Pressured at proposal depth:** the companion cases, placed in three isolated reader runs of this contract; and one composition check, in which a fresh reader worked through one planned output using this contract, a worked artifact set, and that set's accompanying evidence-and-authority record. The run results are recorded with the change that introduces this contract, not here. The worked set is held outside the repo and cannot be inspected from it.
- **Not earned:** reuse with a second brand; any operational benefit; any carrier.
- **Held:**
  - a carrier for any of this, and the form of the evidence-and-authority record, including the clause-level granularity Option F holds;
  - whether a production organized around one space needs a production anchor of its own;
  - the context profile's IA home;
  - Zone 3 carriers;
  - aspect-ratio-as-attribute;
  - per-touchpoint approval structure;
  - `messages` / `briefs`.

## What this contract does not do

- Adds no layer, scope position, mode, structural carrier, field, enum, schema, validator or runtime.
- Revises none of the following, each of which remains authoritative for its subject:
  - `visual-payload-architecture-v2.md`;
  - `brand-system-carrier-decision-surface-v2.md`;
  - `brand-system-input-application-guidelines-to-ia-mapping-v1.md`;
  - `brand-discovery-digestion-layered-intake-architecture-v1.md`;
  - `brand-ingestion-authority-propagation-and-binding-v1.md`;
  - `authorized-transformation-and-target-specification-v1.md`.
- Does not re-enumerate the six brand-system input categories.
- Adjudicates no held candidate.
- Is not a generated-output grammar, and does not fire the self-superseding triggers of [`implementation-roadmap-system-map-artifact-grammar-v1.md`](implementation-roadmap-system-map-artifact-grammar-v1.md) or [`artifact-grammar-consumer-pressure-v1.md`](artifact-grammar-consumer-pressure-v1.md).
- Authorizes no Airtable, prototype, package or production work.

## Self-superseding clause

Superseded by any of:
- use with a second brand that earns, narrows or refutes the three artifacts;
- a decision that earns a carrier for any of them;
- a later VPA version or carrier decision surface that absorbs the placement rule.

## Anchor documents

- [`visual-payload-architecture-v2.md`](../visual-payload-architecture-v2.md): the brand image system as a subsystem, not a layer; the orthogonal inputs; convergence at slot resolution.
- [`brand-system-carrier-decision-surface-v2.md`](../brand-system-carrier-decision-surface-v2.md): per-touchpoint requirements at packet and slot scope.
- [`brand-system-input-application-guidelines-to-ia-mapping-v1.md`](../brand-system-input-application-guidelines-to-ia-mapping-v1.md): brand-wide coherence principles versus delivery requirements.
- [`brand-discovery-digestion-layered-intake-architecture-v1.md`](../brand-discovery-digestion-layered-intake-architecture-v1.md): intake stages, packet-template content, and the non-authoritative-until-validated rule.
- [`brand-ingestion-authority-propagation-and-binding-v1.md`](../brand-ingestion-authority-propagation-and-binding-v1.md): transmission versus adoption; authority as a scoped relation established by an act.
- [`authorized-transformation-and-target-specification-v1.md`](../authorized-transformation-and-target-specification-v1.md): baseline truth, authorized transformation and target specification; product truth invariant within its declared state.
- [`creative-discretion-doctrine-v1.md`](../creative-discretion-doctrine-v1.md): the creative brief grants the aperture.
- [`package-lifecycle-partition-v1.md`](../package-lifecycle-partition-v1.md): prospective definition, execution-run state and governed record.
