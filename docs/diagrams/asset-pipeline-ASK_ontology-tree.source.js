/* asset-pipeline-ASK_ontology-tree.source.js
   Source data for the Ontology diagram — Axis A.

   Renders the KINDS of information the definition layer structures, independent
   of where they live (Axis B / inheritance) or when they are produced
   (Axis D / runtime). Conceptual basis: docs/layer-disambiguation-note-v1.md.

   Rendered by the horizontal diagram-tree engine (diagrams-engine.js,
   window.DIAGRAMS.render) — the same top-aligned left-to-right cascade as the
   architecture tree. A classification (a wide branching tree, not a chain)
   reads best as a horizontal cascade.

   This is a STRUCTURAL map, not a maturity-state diagram: no `status` is
   asserted on any node. Do not introduce earned/held/legacy here — that is the
   v9-class interactive surface's job, on a different axis.

   Illustrative, not source truth — repo prose (README.md, docs/architecture.md)
   is authoritative. Bump the source-v / render-v stamp in the HTML when
   topology or major content changes.

   Node shape: { kind: 'root'|'section'|'group'|'node', label, note?, tag?, children? }
*/

window.TREE_ONTOLOGY = {
  kind: 'root',
  label: 'Definition Layer · Ontology',
  note: 'Axis A — the kinds of information the definition layer structures. The interface is a view on top of it.',
  children: [
    {
      kind: 'section', label: 'Intent',
      children: [
        { label: 'business intent', note: 'the commercial objective the asset serves' },
        { label: 'creative intent', note: 'the creative framing and idea' },
      ],
    },
    {
      kind: 'section', label: 'Inputs',
      children: [
        { label: 'product truth', note: 'source facts about the product' },
        { label: 'visual references / invariant anchors', note: 'high-bandwidth visual guidance prose cannot encode' },
      ],
    },
    {
      kind: 'section', label: 'Constraints',
      children: [
        { label: 'structural', note: 'asset types · shot grid · composition / crop' },
        { label: 'aesthetic', note: 'style-guide rules · approved references acting as constraint' },
        { label: 'technical', note: 'resolution · formats · naming · DAM' },
      ],
    },
    {
      kind: 'section', label: 'Creative discretion',
      note: 'the bounded zone of allowed variation',
      children: [
        { label: 'where freedom enters', note: 'scene · styling · narrative, within bounds' },
        { label: 'bounded by constraints', note: 'discretion operates inside the constraint envelope' },
        { label: 'validated at governance', note: 'choices ratified at the curation / approval seam' },
      ],
    },
    {
      kind: 'section', label: 'Required outputs',
      children: [
        { label: 'required asset set / derivatives', note: 'the deliverable shape' },
        { label: 'slot-specific variation', note: 'per-slot output obligations' },
      ],
    },
    {
      kind: 'section', label: 'Governance',
      children: [
        { label: 'decision ownership', note: 'who owns each decision' },
        { label: 'approval / override boundaries', note: 'auto-approved vs reviewed; where human judgment supersedes' },
        { label: 'capture / governance rules', note: 'elevation of raw generation into a governed asset' },
        { label: 'reuse / derivative / family-coherence rules', note: 'how governed outputs reuse and cohere' },
      ],
    },
  ],
};
