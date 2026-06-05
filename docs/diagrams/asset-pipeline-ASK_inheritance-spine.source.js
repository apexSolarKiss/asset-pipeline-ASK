/* asset-pipeline-ASK_inheritance-spine.source.js
   Source data for the Inheritance diagram — Axis B.

   Renders WHERE information lives and how it inherits / overrides / combines:
   the layered IA as a normative hierarchy from the upstream-most brand-system
   layer down to the terminal slot. Conceptual basis:
   docs/layer-disambiguation-note-v1.md and docs/architecture.md.

   Rendered by the vertical spine engine (diagrams-spine-engine.js,
   window.DIAGRAMS.render). Axis B is a single-child inheritance chain, so it
   collapses into a straight centered top-to-bottom spine — the linear case the
   diagram-spine-static scaffold was designed for. The third layer varies by
   workflow mode; that variation lives in the node note so the chain stays
   linear (a branch there would fan the spine).

   STRUCTURAL map, not a maturity-state diagram: no `status` is asserted; the
   architectural nuance (brand-system unmodeled, category signaled-only, packet
   strongest carrier) rides in the notes, not in earned/held/legacy coloring.

   Illustrative, not source truth — repo prose (docs/architecture.md) is
   authoritative. Bump the source-v / render-v stamp in the HTML when topology
   or major content changes.

   Node shape: { kind: 'root'|'section'|'group'|'node', label, note?, tag?, children? }
*/

window.TREE_INHERITANCE = {
  kind: 'root',
  label: 'Layered IA · Inheritance',
  note: 'Axis B — where information lives, and how it inherits, overrides, and combines. Each layer carries normative authority over the layers downstream of it.',
  children: [
    {
      kind: 'node', label: 'brand-system layer',
      note: 'brand platform + visual identity system. Upstream-most; broadest authority. Currently unmodeled in IA — a named structural gap.',
      children: [
        {
          kind: 'node', label: 'category / product-class layer',
          note: 'signaled-only, not first-class. Inheritance from brand-system is partial: lighting register plausibly inherits cross-category; environment composition and product-class proportions are category-local.',
          children: [
            {
              kind: 'node', label: 'mode-specific layer',
              note: 'varies by workflow mode — SKU-driven (none) · collection / merchandising · marketing / message-driven · brand campaign / editorial (two: campaign concept + review-context). Sits between category and packet.',
              children: [
                {
                  kind: 'node', label: 'packet layer',
                  note: 'the strongest current carrier — business and creative intent, constraints, references, bounded creative discretion, required outputs.',
                  children: [
                    {
                      kind: 'node', label: 'slot layer',
                      note: 'role-specific narrowing; the terminal expected-output obligation that downstream generation and curation resolve.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
