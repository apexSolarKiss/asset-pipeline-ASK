/* asset-pipeline-ASK_visual-payload-architecture.source.js
   AP-owned source data (Tier 3 content) for the Visual Payload Architecture diagram,
   rendered on design-system-ASK `diagram-static-FLOW`, currently vendored by reference
   at design-system-ASK@98d6074. AP owns this source data; the FLOW engine / shared CSS /
   exporter remain DS-owned and are never forked locally.

   Illustrative, not source truth — docs/visual-payload-architecture-v2.md is authoritative.

   ONE shared source model, TWO engine render modes (cannot drift):
     - static/export mode: draws each node's `short` label + topology ONLY; legible
       without interaction — this is what the exporter's `PNG diagram` export captures.
     - interactive/explanatory mode (the repo-native full-chrome HTML, FLOW_MODE='interactive'):
       same topology; descriptive burden moves into the hover/click side panel fed by each node's `detail`.

   Per node:
     label  = full phrase (interactive panel title)
     short  = stripped label drawn in the static figure
     detail = { def, eg?, not? } shown in the interactive side panel
   The static figure must read on `short` + structure ALONE — no hover required. */

window.FLOW_DIAGRAM = {
  // NOTE: the "visual dimensions" band was removed from this figure (ASK flagged it as
  // redundant/confusing next to the source field). The payload dimensions (subject ·
  // lighting · color · composition · …) are defined in prose; if diagrammed separately,
  // they should live in a separate payload-attribute matrix, not in this convergence-flow
  // figure. Re-add a `band: {...}` here to restore the ribbon if needed.
  carrier: {
    label: 'reference image / carrier',
    short: 'reference carrier',
    note: 'input',
    rail: 'typed-reference rail',
    railTerms: 'anchor · evidence · constrain',
    detail: {
      def: 'A supplied input image that sits OUTSIDE the normative-source field. The pipeline anchors to, takes evidence from, or constrains against it.',
      not: 'Not itself a normative statement — it qualifies the field, it is not part of it.',
    },
  },
  rail: {
    detail: {
      def: 'Typed-reference rail: how a carrier qualifies the source field — as an anchor, as evidence, or as a constraint.',
      eg: 'anchor · evidence · constrain',
    },
  },
  field: {
    tag: 'normative-source field',
    nodes: [
      { id: 'scoped', label: 'scoped visual statements', short: 'scoped statements',
        detail: { def: 'The inherited visual instruction resolved down the scope chain to this slot.', eg: 'brand » category » mode » packet » slot' } },
      { id: 'truth', label: 'product truth', short: 'product truth',
        detail: { def: 'The non-negotiable facts of the actual product the payload must remain faithful to.' } },
      { id: 'context', label: 'context-profile specialization', short: 'context profile', status: 'held',
        detail: { def: 'Context-specific overrides (channel, market, surface).', not: 'IA home still held — where this lives in the information architecture is not yet decided.' } },
      { id: 'oblig', label: 'output obligations', short: 'output obligations',
        detail: { def: 'Required deliverable properties the realized output must satisfy.' } },
      { id: 'prohib', label: 'scoped prohibitions', short: 'prohibitions',
        detail: { def: 'What is disallowed within this scope — boundaries the payload may not cross.' } },
    ],
  },
  converge: { id: 'resolved', label: 'resolved slot visual specification', short: 'resolved spec', anchor: true,
    detail: { def: 'The single composed specification for this slot — every source input converged into one resolved instruction the generator works from.' } },
  spine: [
    { id: 'gen', label: 'generation / production', short: 'generation',
      detail: { def: 'The slot specification is realized into actual images.' } },
    { parallel: [
      { id: 'candidate', label: 'candidate image(s) · realized per-image payload', short: 'candidate payload',
        detail: { def: 'A produced image and the per-image visual payload it actually realized.' } },
      { id: 'set', label: 'realized set relationships', short: 'set relations',
        detail: { def: 'How the images relate across the set — consistency, variation, sequence.', not: 'A set-level property, NOT per-image payload. The two are realized in parallel.' } },
    ] },
    { id: 'conform', label: 'candidate + set conformance', short: 'conformance',
      detail: { def: 'The realized result is evaluated against the source obligations a second time.', eg: 'faithful to truth? · fits slot? · respects prohibitions? · coheres with set?' } },
    { id: 'select', label: 'selection judgment', short: 'selection',
      detail: { def: 'The creative-discretion act: choosing among conforming candidates.', not: 'Distinct from governance — selection chooses, governance records.' } },
    { id: 'govern', label: 'governance', short: 'governance',
      detail: { def: 'Artifact governance binds the accepted output to its claim, use, and answerability.', not: 'Distinct from selection — the governance record is its durable trace, not where authorship is created.' } },
    { id: 'asset', label: 'governed asset / accepted output', short: 'governed asset', anchor: true,
      detail: { def: 'The accepted, governed output of the pipeline.' } },
  ],
  // truth / obligations / prohibitions judge the realized result a SECOND time (not feedback)
  evalEdges: [
    { from: 'truth', to: 'conform' },
    { from: 'oblig', to: 'conform' },
    { from: 'prohib', to: 'conform' },
  ],
  // governed asset can later re-enter as a reference carrier (the loop)
  futureCarrier: { from: 'asset', node: 'future reference', short: 'future reference', edge: 'later reused',
    detail: { def: 'A governed asset can later be supplied as a reference carrier input to a new run — closing the loop.' } },
};
