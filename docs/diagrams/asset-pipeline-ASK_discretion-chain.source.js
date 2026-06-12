/* asset-pipeline-ASK_discretion-chain.source.js
   Source data for the Creative-Discretion Chain diagram.

   Renders the five-link chain the architecture exists to keep distinct and in
   order: creative intent → creative discretion → variance → selection →
   governance. Conceptual basis: docs/creative-discretion-doctrine-v1.md and
   the article "Creative Discretion Is Not Creative Intent".

   Rendered by the canonical sequence engine (diagrams-static-SEQ-engine.js,
   window.DIAGRAMS.render), vendored from design-system-ASK at 28aeb2d.
   The chain is strictly linear (each node one child) and ordered, so it reads
   as a left-aligned top→down sequence joined by arrows: succession, not a tree.

   Steps are numbered deliberately: the diagram's job is to make the chain
   countable at a glance, against the two collapses the article names —
   "creative direction" (fusing 1+2) and "the image is done" (fusing 4+5).

   STRUCTURAL map, no maturity state asserted. ILLUSTRATIVE doctrine diagram,
   not source truth — the doctrine note and article prose are authoritative.
   This is a doctrine aid (refreshes when the doctrine chain changes), distinct
   from the milestone-coupled architecture / IA orientation diagrams. Bump the
   source-v / render-v stamp in the HTML when content changes.

   Node shape: { kind: 'root'|'section'|'group'|'node', label, note?, tag?, children? }

   ORIGIN: operator-side scratch exploration (2026-06-11), then repo-absorbed
   after design-system-ASK graduated the SEQ scaffold as a canonical Class A
   static pattern. This file is AP-owned source data; the SEQ engine / CSS /
   exporter are design-system-owned scaffold files vendored by reference.
*/

window.SPINE_DISCRETION_CHAIN = {
  kind: 'root',
  label: 'Creative Discretion · The Chain',
  note: 'the aim, the aperture, and the variance a brief allows — kept distinct, end to end',
  children: [
    {
      kind: 'node', label: '1 · creative intent',
      note: 'the aim — what the asset is meant to express · the brief legislates',
      children: [
        {
          kind: 'node', label: '2 · creative discretion',
          note: 'the bounded judgment that opens the aperture — later exercised at selection',
          children: [
            {
              kind: 'node', label: '3 · variance',
              note: 'generation fills the aperture with candidates · execution, not judgment',
              children: [
                {
                  kind: 'node', label: '4 · selection',
                  note: 'one candidate made true · aperture closes · authorship becomes recordable',
                  children: [
                    {
                      kind: 'node', label: '5 · governance',
                      note: 'the durable, accountable record · a generated image is not yet a governed asset',
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
