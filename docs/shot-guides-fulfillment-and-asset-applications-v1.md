# Shot Guides, Fulfillment and Asset Applications (v1)

## Posture

```text
bounded architecture note
decides: the shot guide as a supplied or adopted input, adopted as a whole definition ·
  output slot ≠ shot ≠ asset application · pickup ≠ technical rendition ≠ creative derivative ·
  what an acceptance covers when one image fills several slots · which image a slot uses ≠ whether it still holds
acts on the leverage / pickup reopen triggers of the asset-family coherence and reuse pressure note
narrows the domain-facing alias "an output slot is presented as a shot" where slots share an image (method.md)
tightens, for shot guides, the fallback chain's worked-example-default position: a default grid is a proposal until adopted
refines the Zone 4 surface's illustrative derivative list; leaves that surface's held vocabularies held
not schema · not field set · not enum · not structured IA v3 · not validator / runtime
does not earn the category / product-class aesthetic carrier (Named Limitation #1)
does not revise in place the reuse pressure note, the Zone 4 surface, the brand-intake contract
  or the candidate workspace contract
does not authorize Airtable, prototype or production work
self-superseding when an implementation, or a second brand's grid, earns, narrows or refutes it
```

## Why this exists

Product-driven image production usually starts from a grid. Merchandising classifies each product, and the classification says which images its product page needs: a front view, an angled view, a detail, an image in a setting. Two consequences follow:

- **The grid is an input.** It cannot be inferred from the brand's visual language or from the product facts. The architecture already says this in general form: a delivery requirement is not visual identity, and a drafted statement is a proposal until adopted. This note applies it to grids keyed by a product classification.
- **A required image is not necessarily a new image.** One capture or generation often serves several products: a detail of one size can serve every size of a style, and a collection image can appear on the page of each product in it. The [asset-family coherence and reuse pressure note](asset-family-coherence-and-reuse-pressure-note-sku-driven-furniture-v1.md) named this leverage / pickup ("multiple `output_slots` -> 1 `generated_asset`") and left it open.
  - A pipeline that makes one image per required position duplicates production and invites inconsistency.
  - One that copies images without a record loses which image was made, for what, and who allowed its further use.

This note acts on three of that note's reopen triggers. The pressure note itself is not revised. The triggers:
- "leveraged pickup / multi-SKU reuse becomes required in the Airtable prototype";
- "`generated_assets` needs to map one asset to multiple output obligations";
- "downstream delivery requires asset-family or derivative lineage".

## 1. The shot guide is an input

A **shot guide** states, for one product classification, the recurring set of required images. For each image it states:
- its position on the destination, such as a product page;
- its view: what the image shows and what must read in it, such as "a side or angled view in which the arm profile reads";
- whether it is always required or only as needed;
- its fill rule, meaning how it may be filled: made for each product; shared across sizes or colors of one style, where the view does not show the difference; or taken from an image accepted for a collection, campaign or editorial use.

The classification is a merchandising classification ("bath textile", "dining table"), not the category alone. Several merchandising subclasses may share one guide, and one category may need several.

**Placement,** in the terms of the [brand-intake artifact contract](application/brand-intake-artifact-contract-v1.md):
- **The guide is deliverable shape.**
  - Positions, views, counts, formats and fill rules are image-production profile content: "the recurring deliverable shape, such as a default set and its register allocation". Boundary case 2 places "Every product needs three images: a hero, a side or angled view, and a detail" there.
  - A shot guide is that shape keyed by a product classification. The key does not move it to the contract's "Other Axis-B scope" row, which holds category / product-class content and whose carrier is held. It stays in the profile, as mode activation and the per-mode touchpoint inventory do under that same row.
  - A guide may be a separately maintained source the profile names, adopted by version at its own scope. The contract is unchanged.
- **What an image must show is guide content; how it looks is not.**
  - A view names what the image shows and what must read in it, including the viewpoint and framing that requirement depends on: front on, at three-quarter, close on the surface, hung full length.
  - How the image looks stays with the brand image system, the references and the brief: lighting, surfaces and atmosphere, and composition, viewpoint and optics as visible qualities of the brand. Where they are class-specific, they sit at category / product-class scope.
  - A supplied guide is taken as supplied. One that also states a look is a combined artifact, as the contract already says of the fictive style spec, and it is not stripped to fit this split: each of its statements is read under its own authority and scope, a slot's requirement as deliverable shape and a lighting instruction as visual treatment.
- **What is true of a product stays product truth.** A guide may say a view must show the weave; it does not say what the weave is.
- **The classification creates no category or product-class carrier.** It keys an output obligation. The aesthetic carrier that Named Limitation #1 holds stays held.

**Authority:**
- **A guide operates only under an authorization.** A supplied guide, such as one merchandising issues, operates under the authority that supplied it, when that authority is locatable. A drafted guide, from evidence, an operator or a model, is a proposal until an authorized decision-maker adopts it, at a declared scope and by version.
- **Adoption identifies the whole definition:** which images the guide requires, their positions, what each requires and how each may be filled, and the scope it is adopted for. Adding, removing, retiring or moving an image, or changing its position or requirement, changes the definition. The changed definition does not operate until it is adopted, by an act of its own; until then, the adopted definition is what operates. A change of status is not an adoption. Work already planned or accepted under the earlier definition keeps the definition it was planned under.
- **Assigning a product to an existing, adopted classification is use under that authority.** The contract's rule is that applying an already-authorized rule within the scope it was adopted for is use. This note applies that rule to class-keyed guides.
  - A person may assign, and so may a deterministic rule or an agent applying adopted criteria, provided the assignment records its basis: who or what assigned it, when, and on what criteria.
  - A case the criteria do not settle calls for interpretation. Its result is a proposal until an authorized decision-maker decides it; current model sampling does not meet the doctrine's functional test.
- **Authoring is authorization-bearing.** Writing a classification, changing its slots, or excepting one product or one production from them is an act of an authorized decision-maker, recorded with the actor and the reason. An exception applies to its own product or production only.
- **Deciding and recording are separate.** The authorized decision-maker settles an adoption, an exception or a use. An operator may record the decision on the decision-maker's relay, within its scope. The record names who decided, what was decided, where the decision was made and who entered it, and it holds only while what it decided is unchanged. A signed-in account shows which account made an edit: it is not evidence of who decided, nor, where an operator works under the decision-maker's account, of who entered it. One decision may cover several guides, assignments or destinations.
- **A missing guide is shown as missing.** Where no adopted guide applies, the product's required images are reported as undefined; no generic grid is substituted. The architecture's fallback chain lists "Phase 1 worked-example defaults" among its positions. For shot guides, this note tightens that position: a default grid may be offered as a proposal, and it does not operate until adopted.

## 2. Output slot, shot and asset application

Three objects, kept apart:

```text
output slot        a required image at a destination: "Bath Sheet product page, image 1"
                   resolved from the guide and the product's assignment, or written in a brief
                   the obligation; its position is part of it

shot               the requested image: one target specification that candidates answer
                   fills one or more output slots; acceptance accepts one candidate for its stated use

asset application  one accepted image bound to one output slot, with its basis:
                   the acceptance itself, or a use decision
                   destination-specific delivery treatment (file name, format) belongs here
```

**The fulfillment plan comes before generation.** Each output slot is given one of three fulfillments:
- **made:** a shot of its own;
- **shared:** one shot that also fills other slots, where the guide's fill rule allows sharing, more than one slot shares it, and what the view shows is true of every product it fills (§3);
- **picked up:** an image already accepted, or to be accepted, for another use.

A slot grid defines the outputs the pipeline must deliver. The fulfillment plan determines how each output is delivered: made, shared, or picked up. Expanding the grid directly into shots creates a duplicate-generation plan.

**Who plans.** A fulfillment within the guide's fill rule is planning use, decided by the production's planner under the brief's decision owner. A fulfillment that departs from it is an exception under §1, by an authorized decision-maker, with the actor and the reason recorded. Making a slot the guide would share, or picking up an image for a slot the guide says to make, are both departures. Sharing is never chosen against the fill rule, because the rule is what asserts the view does not show the difference.

**A decision about an obligation is kept.** Marking a slot not needed is a decision, not an absence. Planning again, to repair or extend a plan, makes only the slots that are missing, and leaves a waived slot waived with its reason; reopening it is a decision of its own. A new version of a request is a new set of obligations: the earlier version's decisions are listed for it, not carried into it silently.

**A change of fulfillment after a shot exists is replanning.** The slot leaves the shot that was to fill it. The shot's candidates stay with it; since its stated use has changed, they no longer match its standard. Once an accepted image covers the slot, the image in use there changes only by a use decision (§4).

**The domain-facing alias narrows.** "An output slot is presented as a shot" ([method](method.md#domain-facing-vocabulary)) holds where every slot is made for itself. Where slots share an image, the shot and the slots it fills are presented separately: the shot is still the requested image, one target specification, and the slots are where it goes. The candidate workspace contract's view mapping of a shot to the slot it serves reads as the one-slot case.

**What stays as it is:**
- A candidate stays with the shot it was made for. It is not moved to another shot to serve another slot.
- An accepted image is not copied into a new candidate.
- The relations in this section carry reuse; the candidate and acceptance records do not change.

## 3. Pickup, technical rendition and creative derivative

| | What changes | What it needs |
|---|---|---|
| **Pickup** | Nothing in the image. A use is added. | A basis for the new use (§4), and depicted facts that are true for the receiving product |
| **Technical rendition** | The format: a crop to a ratio, a size, an encoding, for the same view and use. Its frame may also leave out what the shot's or slot's requirements exclude (below) | The profile's adaptation policy, and conformance with the image system's format-spanning principles and the target format's obligations. It belongs to the application; its operation and file are file lineage under the image's fabrication record |
| **Creative derivative** | Depicted content, beyond what a rendition's frame leaves out, or the view: another colorway, another product state, a detail cut from a wider view, a retouched variant | Its own target specification, with an authorized transformation where it changes a depicted product fact or state, such as a colorway. Its source is recorded, and it is accepted for its own use. Which of the source's approvals carry over to it stays Zone 4's held question (Scenario 5) |

**Sharing and pickup are legitimate only where the depicted facts hold for the receiving product.** The receiving product must appear in the image as it is, or share every fact the image shows of a product that does. A detail made for one size, showing no size, serves the other sizes of its style and color. A collection image serves a product's page only if that product, its color, material and construction, is in it. Product truth is not made context-dependent ([authorized transformation](authorized-transformation-and-target-specification-v1.md)).

**A shared shot is planned on that basis for every product it fills,** not only for the product its inputs come from. A common style and color label is not enough: two towels labelled white terry, one with a plain edge band and one fringed, do not share a view that shows the edge. The basis is recorded with the shot and with its candidates, so what was judged can be reconstructed. A later change to any receiving product's facts ends that eligibility: before acceptance the shot cannot go ahead, and after it the product's application needs review, until the facts agree again, an authorized use decision confirms the same image against the corrected facts, or the slot is given another image.

**A crop is classified by what it does, not by the operation.** A crop made to fit a format, for the same view and use, is a rendition, including one whose frame also leaves out what the shot's or slot's requirements exclude (below). A crop that serves a different view, such as a detail cut from a front view to fill a detail slot, is a derivative: a new depiction for a different requirement.

**A rendition can be what makes an image deliverable.** A crop to a format's frame can also leave out what the shot's or slot's requirements exclude from that frame, such as an object at the edge of a wider picture. It is still a rendition while the view and use stay the same. The source image is then accepted for that use only through its approved rendition, and the acceptance records that condition. The uncropped source is not accepted for the use on its own, and only the rendition, approved where its application holds it, is delivered.

**Relation to Zone 4.** This refines the illustrative list in the [Zone 4 surface](governed-output-continuity-reuse-derivative-governance-decision-surface-v1.md)'s Scenario 5, which names "cropping variation; resolution variant" among derivatives: a crop or resolution change for the same view and use is a rendition. Zone 4's object, a governed output re-entering production as a reference for new work, is a different relation from pickup, and remains that surface's.

## 4. What an acceptance covers

- **Acceptance is a recorded decision for a stated use.** When a shot is planned to fill several slots, its stated use names all of them, so one acceptance covers each of their applications: the shared use was part of what was judged.
- **An image accepted for one use is not thereby accepted for another.** Applying it to further slots takes a **use decision**: an authorized decision-maker extends its use to named slots, under stated conditions. A use decision is a permitted-use act within artifact governance; the carrier for permitted use and rights stays held.
- **The system checks the conditions it can, and refuses where they fail.** It checks that:
  - each receiving product is among the products the image was made from, or shares every fact it shows, judged against the facts recorded when the image was made;
  - the source acceptance stands;
  - the receiving slot's plan is current, and it is planned to be filled this way.

  The decision-maker answers for what the system cannot check, such as whether a size shows, whether the image meets the receiving slot's requirement, or whether a later change to a product's recorded facts still leaves the image true of it.
- **A source is assessed on its recorded basis.** An image accepted under an earlier brief remains a legitimate historical asset. A later change to the brief of the shot that made it does not by itself bar its use elsewhere; the standard it was accepted under stays visible with it, and the decision-maker assesses it against the receiving destination's facts and requirements.
- **One decision may cover many slots.** It need not be one action per product, but the slots it covers are named. If any slot is refused when the decision is checked, nothing in it is applied, and each refusal is reported.
- **A decision is fixed when it is applied.** Its source, its slots, its conditions and who decided it are kept as decided. A later edit does not change what was applied; a different use is a new decision.
- **Applying is resumable.** Each application is identified by its decision and its slot, so a run that stops partway is finished by running the same decision again, which adds no second decision and no duplicate. Finishing applies only what still holds: a slot that no longer qualifies is left out and reported, and the decision is recorded as applied in part. Where the substrate gives no transaction across writes, checking before writing is not all-or-nothing, and an unfinished decision is shown as unfinished.
- **Which image a slot uses is not the same as whether it still holds.** The application in use is a selection. Whether it still holds, with the slot still in the adopted plan, and its plan and the product's facts as they were when the use was judged, is its eligibility. A slot whose application no longer holds, that has more than one application in use, or whose decision is unfinished, is shown as needing attention, not as filled. The application and the acceptance behind it stay in the record.
- **Reuse does not rewrite history.** The source acceptance, its standard and its image stay as recorded. An application records what was applied, to which slot, when and on what basis.
- **An image in use changes only deliberately.** A later acceptance for a slot that already has its image is recorded as an alternate. The image in use changes only by a use decision that says it replaces it, and the earlier application stays in the record. An interrupted replacement never leaves the slot with no image in use, and finishing it never undoes a later decision.

In the SKU-driven Furniture v1 prototype, slot-level acceptance is the one-slot case of acceptance for a stated use; that prototype's slot lifecycle stands.

## 5. Provenance

One image has one fabrication record. A pickup or a rendition adds applications. It creates no candidate and no generation record, and it does not present the image as made for the receiving product. A rendition's operation and file belong to the image's file lineage, carried with its application.

The application names its source, so a delivered file can be traced to the image and to the decision behind its use. In practice the same pixels often ship under a file name per product and position. The record must not depend on the file name to keep its source.

## 6. Worked example

A synthetic bath catalog, planned for the AP demonstration base:
- **Products:** a ceramic vessel; a white terry towel in two sizes, bath and sheet; an oat waffle hand towel.
- **Two product-page guides,** each with four images:
  - Ceramic vessel: front; three-quarter; glaze detail; in a setting, as needed;
  - Bath textile: folded and weave detail, both shared across sizes of one style and color; hanging, made for each product, since full length shows the size; in a setting, as needed.

| Product page | Image 1 | Image 2 | Image 3 | Image 4 (as needed) |
|---|---|---|---|---|
| Bath Vessel | made | made | picked up: an accepted close study | picked up: an accepted editorial image |
| Bath Towel | shared: terry white, folded | made | shared: terry white, weave detail | picked up: the collection image |
| Bath Sheet | shared: terry white, folded | made | shared: terry white, weave detail | not needed |
| Hand Towel | made (no other size to share it) | made | made (no other size to share it) | picked up: the collection image |

**The count.** Sixteen output slots, of which fifteen are taken up, are filled by twelve images:
- nine made for these pages, two of them shared by the bath and sheet sizes, so the nine fill eleven slots;
- three accepted for other uses, picked up into four slots, each under a use decision.

Expanded directly into shots, the same grid would ask for sixteen new images.

**Where acceptance and authority sit:**
- **The shared folded and weave-detail images:** the bath and sheet sizes share them because every fact those views show agrees: white terry, the same pile, a plain woven edge band. Their sizes differ, and neither view shows size. Each image's acceptance covers both slots, because its stated use names both.
- **The collection image:** it reaches the two towel pages only through a use decision; its acceptance was for the collection page.
- **The bath sheet's image 4** is marked not needed. The slot is required only as needed, and the collection image shows the bath size beside other products, where a different size could read. Planning again, for example after a fifth product is added, leaves it not needed.
- **The close study and the editorial image:**
  - Both were accepted, for a product-page detail and a website hero, before these guides existed, so their stated uses name no slot. Their records are unchanged; the use decisions add applications.
  - Filling the vessel's glaze detail, which its guide says to make, by pickup is a departure from the fill rule. It is recorded with its actor and reason.

## What this note does not do

- **No schema, carrier, enum, validator or runtime.** A demonstration build may bind these relations one way; that would not define the binding.
- **No resolution of the held vocabularies.**
  - The reuse-type, authority-type, approval-recurrence and family-rule vocabularies of the Zone 4 surface stay held, including what a derivative inherits.
  - The carrier for reuse as a reference stays Zone 4's.
  - The authorized-transformation note holds "explicit rights and permitted-use carriers inside governance": release, territory, duration, exclusivity, synthetic-alteration permission, likeness, reference licensing and publication. They stay held. A use decision extends a permitted use within the brand's own production; it is not a release or licensing record.
- **No category or product-class aesthetic carrier.** Named Limitation #1 stays held. The precedence question of Named Limitation #2 is not settled: a product exception is scoped to its product, and no wider precedence rule is introduced.
- **No colorway-generation workflow.** A colorway made from another image is a creative derivative, as above. Whether a brand generates each colorway or derives it is a production choice this note does not make.
- **No transaction or workflow framework.** Resumable application asks only for stable identities, decisions kept as decided, and states that say what is unfinished.
- **No change to the candidate workspace contract.** Its views, numbering, saved context and acceptance rule are unchanged. Delivery and asset applications sit downstream of it.

## Reopen triggers

- an implementation, or a second brand's grid, needs a fulfillment the three kinds do not cover
- a brand's guide carries rules this note's guide shape cannot hold, such as conditional slots keyed by a product state
- a use decision needs rights or release conditions beyond the brand's own production use
- delivery requires renditions to be governed separately from their application
- an agent-assigned classification is challenged and the basis record does not answer it
