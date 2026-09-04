/* diagrams-static-V-engine.js
   Vertical placement engine for ASK-family system / architecture diagrams
   rendered as a top→down, horizontally-centered spine — ontology maps,
   inheritance chains, one-axis information-architecture diagrams, and similar.

   Sibling of diagrams-static-H-engine.js (the horizontal top-aligned cascade). Same
   public contract, same data grammar, same diagrams.css classes, same PNG
   export. ONLY the placement geometry differs: this engine lays the tree out
   as a centered vertical spine instead of a left→right cascade.

   Usage from page:
     window.DIAGRAMS.render(TREE);
   The page is expected to expose `.canvas-wrap`, `.stage > svg#svg`,
   and `.hud` with #zoomIn, #zoomOut, #zoomPct, #zoomFit. Style comes
   from diagrams.css (theme-aware via [data-theme]).

   Placement model (v1):
     - root at top center;
     - depth increases top→down; each depth is a horizontal band;
     - every node is centered horizontally over its own children
       (Reingold-Tilford-style: parent.cx = midpoint of its children);
     - a LINEAR chain (each node one child) collapses to a straight centered
       spine; a BRANCHING tree fans out symmetrically around the trunk.
   This is auto-placement: no data-authored side/column control. If a future
   consumer proves auto-placement cannot render legibly, the smallest addition
   would be an optional `side?: 'left'|'right'|'center'` field — deliberately
   NOT in v1.

   render() is font-aware: it waits for the Inter / JetBrains Mono specs it
   measures with to load before computing box widths, so text never overflows
   its box on first paint. See renderWhenFontsReady at the bottom.
*/
(function () {
  /* FAIL-CLOSED on a partial re-vendor. diagrams-fit.js is a DS-owned support file that
     must be copied alongside this engine and loaded immediately BEFORE it. A silent
     legacy fallback is deliberately NOT provided: a consumer that vendored the engine
     without the helper would then look current while keeping the old panel-collision
     geometry. Fail visibly instead. */
  if (!window.DIAGRAM_FIT || typeof window.DIAGRAM_FIT.compute !== 'function') {
    throw new Error('Diagram fit support is missing. Load diagrams-fit.js before the diagram engine.');
  }
  /* FAIL-CLOSED on the text-layout carrier, on the same terms as the fit carrier.
     The INTERFACE is checked, not merely the global: a stale mirror that predates a
     method would pass a truthiness test and then fail deep inside layout, where the
     error names nothing useful. The check covers every CALLABLE member plus the
     declared TARGETS, including members this engine never calls itself — `measure` is
     the contract's measurement primitive, and SEQ gates `rendersTag` although it
     renders no tags. A mirror missing any of them is incomplete, and an incomplete
     mirror should fail here rather than in whichever consumer does use the missing
     member. VERSION and EXCLUDED are published metadata, not gated: nothing branches
     on them, so failing closed on them would be ceremony. */
  if (!window.DIAGRAM_TEXT_LAYOUT
      || typeof window.DIAGRAM_TEXT_LAYOUT.measure !== 'function'
      || typeof window.DIAGRAM_TEXT_LAYOUT.layoutRole !== 'function'
      || typeof window.DIAGRAM_TEXT_LAYOUT.roleFor !== 'function'
      || typeof window.DIAGRAM_TEXT_LAYOUT.rendersNote !== 'function'
      || typeof window.DIAGRAM_TEXT_LAYOUT.rendersTag !== 'function'
      || typeof window.DIAGRAM_TEXT_LAYOUT.hasRenderedSecondary !== 'function'
      || typeof window.DIAGRAM_TEXT_LAYOUT.emit !== 'function') {
    throw new Error('Diagram text-layout support is missing or incomplete. Load diagrams-text-layout.js before the diagram engine.');
  }
  /* The helper DECLARES which patterns it serves. Check membership rather than
     trusting the filename: a mirror can be complete, load cleanly, and still be
     the wrong member — vendored from a sibling plane, or from a future version
     that dropped this pattern. That case passes an interface check and fails
     nowhere, so it is the one the metadata exists to catch. */
  if (!Array.isArray(window.DIAGRAM_TEXT_LAYOUT.TARGETS)
      || window.DIAGRAM_TEXT_LAYOUT.TARGETS.indexOf('diagram-static-V') === -1) {
    throw new Error('Diagram text-layout support does not declare diagram-static-V as a target'
      + ' (declared: ' + JSON.stringify(window.DIAGRAM_TEXT_LAYOUT.TARGETS) + ').'
      + ' Re-vendor diagrams-text-layout.js from patterns/_diagram-shared/.');
  }
  const TL = window.DIAGRAM_TEXT_LAYOUT;
  /* This engine's identity in the shared contract. Role caps, line heights and
     the rendered-secondary predicate are RESOLVED BY THE HELPER against it —
     this file deliberately keeps no copy of any of them. */
  const TARGET = 'diagram-static-V';

  /* Role caps and line heights are NOT defined here. They live in
     diagrams-text-layout.js and are requested by role, because three engines
     each holding their own copy is precisely the divergence the shared contract
     exists to remove. */
  /* ---------- layout constants ---------- */
  const DEPTH_GAP = 58;      // vertical gap between depth bands (room for edges)
  const SIB_GAP   = 30;      // min horizontal gap between sibling boxes
  const BOX_PAD_X = 14;
  const BOX_H = 26;
  const BOX_H_NOTE = 44;
  const ROOT_BOX_H = 50;
  const ROOT_PAD_X = 22;
  const SECTION_H = 30;      // section header (label + rule), no box
  const SECTION_H_TAG = 44;  // section header with a tag line
  const PAGE_PAD_X = 80;
  const PAGE_PAD_Y = 56;
  const SECTION_RULE_HALF = 26; // half-width of the centered rule under a section label

  const FONT_LABEL       = '400 13px "Inter", system-ui, sans-serif';
  const FONT_LABEL_LIGHT = '300 13px "Inter", system-ui, sans-serif';
  const FONT_LABEL_ROOT  = '500 14px "Inter", system-ui, sans-serif';
  const FONT_NOTE        = '300 10px "JetBrains Mono", monospace';
  const FONT_SECTION     = '500 10px "JetBrains Mono", monospace';
  const FONT_TAG         = '300 9px "JetBrains Mono", monospace';

  // CSS letter-spacing (em) the SVG text carries but canvas.measureText drops.
  // Each constant = letter-spacing(em) × the font-size it is measured at, and MUST
  // mirror diagrams.css. Change one there → change it here. (Same lesson as the
  // horizontal engine: unmeasured letter-spacing makes boxes too narrow.)
  const LS_SECTION = 1.8;   // .node-label.section  letter-spacing:0.18em × font-size:10px  (FONT_SECTION)
  const LS_TAG     = 1.44;  // .section-tag         letter-spacing:0.16em × font-size:9px   (FONT_TAG)
  const LS_NOTE    = 0.2;   // .node-note           letter-spacing:0.02em × font-size:10px  (FONT_NOTE)

  /* Text measurement lives ENTIRELY in diagrams-text-layout.js. This engine
     keeps no local canvas context and no local measure(): a second
     measurement path is exactly how a shared contract silently forks, and a
     dead one is worse than none because it reads as available. */

  /* ADDED height of a wrapped run — 0 when it did not wrap.

     boxH already carries this growth, so a run anchored to the box CENTRE or
     BOTTOM must subtract its own growth: anchoring the FIRST baseline to a
     grown edge deposits the new height as dead space on one side and pushes
     the run's remaining lines out the other. A label/note PAIR is centred as
     one block, so each is offset by half the pair's combined growth and the
     gap between them is preserved exactly. */
  const gLabel = (n) => (n.lay && n.lay.label ? n.lay.label.addedHeight : 0);
  const gNote  = (n) => (n.lay && n.lay.note  ? n.lay.note.addedHeight  : 0);
  const gPair  = (n) => (gLabel(n) + gNote(n)) / 2;

  function fontFor(node) {
    const status = node.status || 'earned';
    const kind = node.kind || 'node';
    if (kind === 'root') return FONT_LABEL_ROOT;
    if (kind === 'section') return FONT_SECTION;
    if (status === 'held' || status === 'legacy') return FONT_LABEL_LIGHT;
    return FONT_LABEL;
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  function el(name, attrs = {}, children = []) {
    const e = document.createElementNS(svgNS, name);
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== null && v !== undefined) e.setAttribute(k, v);
    }
    for (const c of children) {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    }
    return e;
  }

  function render(TREE) {
    /* ---------- build node list with measured box sizes + depth ---------- */
    const nodes = [];

    function build(node, depth, parentIdx) {
      const kind = node.kind || 'node';
      const status = node.status || 'earned';
      /* Resolved by the helper. This engine's own predicate used to count a note
         on ANY kind while drawing one on neither a section nor a group. Measured
         on the base engine: a GROUP note selected BOX_H_NOTE and grew the box
         26 -> 44px; a SECTION note cost no height — a section takes SECTION_H /
         SECTION_H_TAG — but was still measured into the band width. Two
         symptoms, one drifted predicate. */
      const hasNote = TL.hasRenderedSecondary(TARGET, node);

      // measured content width
      const padX = kind === 'root' ? ROOT_PAD_X : BOX_PAD_X;
      const displayLabel = kind === 'section' ? '/ ' + node.label.toUpperCase() : node.label;
      /* Measured through the shared helper. A non-wrapping string returns EXACTLY
         what the local measure() returned before, letter-spacing compensation
         included — that parity is what lets the no-wrap case prove identity. */
      const labelLay = TL.layoutRole({ target: TARGET, role: TL.roleFor(TARGET, node),
        text: displayLabel, font: fontFor(node),
        letterSpacing: kind === 'section' ? LS_SECTION : 0 });
      const labelW = labelLay.width;
      let noteW = 0, noteLay = null, tagLay = null;
      /* Only measure notes for kinds that actually render them. The section
         branch draws label + rule + tag and never a note, so measuring one
         here would widen the band and inflate boxH for text no reader ever
         sees. H guards the same case for the same reason. */
      if (TL.rendersNote(TARGET, node)) {
        noteLay = TL.layoutRole({ target: TARGET, role: 'note',
          text: node.note, font: FONT_NOTE, letterSpacing: LS_NOTE });
        noteW = noteLay.width;
      }
      if (TL.rendersTag(TARGET, node)) {
        tagLay = TL.layoutRole({ target: TARGET, role: 'sectionTag',
          text: '// ' + node.tag, font: FONT_TAG, letterSpacing: LS_TAG });
        noteW = Math.max(noteW, tagLay.width);
      }
      const contentW = Math.max(labelW, noteW);
      const lay = { label: labelLay, note: noteLay, tag: tagLay };
      /* Wrapped growth feeds this engine's OWN contract: band height takes the
         max boxH at a depth, and horizontal packing takes boxW. Both absorb the
         growth without any anchor solver — V has no same-depth vertical
         adjacency to solve, because every depth IS one horizontal band. */
      const grow = (labelLay.addedHeight) + (noteLay ? noteLay.addedHeight : 0) + (tagLay ? tagLay.addedHeight : 0);

      // box width / height per kind. Sections have no box; their footprint is
      // the wider of the centered label/tag and the centered rule.
      let boxW, boxH;
      if (kind === 'section') {
        /* The box geometry is this engine's; the QUESTION "does a tag render"
           is the shared contract's. A raw node.tag here would agree with the
           helper only by accident of sitting inside a section branch on a
           target whose shape declares sections — an equivalence nothing
           enforces, and exactly the silent coupling that let the note
           predicate drift. */
        boxW = Math.max(contentW, SECTION_RULE_HALF * 2);
        boxH = (TL.rendersTag(TARGET, node) ? SECTION_H_TAG : SECTION_H) + grow;
      } else {
        boxW = contentW + padX * 2;
        boxH = (kind === 'root' ? ROOT_BOX_H : (hasNote ? BOX_H_NOTE : BOX_H)) + grow;
      }

      const idx = nodes.length;
      nodes.push({
        ...node, kind, status, depth, hasNote, lay,
        boxW, boxH, cx: 0, cy: 0, childIndices: [],
      });
      if (parentIdx !== null && parentIdx !== undefined) {
        nodes[parentIdx].childIndices.push(idx);
      }
      for (const c of (node.children || [])) build(c, depth + 1, idx);
      return idx;
    }
    build(TREE, 0, null);

    /* ---------- vertical bands: one Y per depth ---------- */
    const maxDepth = nodes.reduce((m, n) => Math.max(m, n.depth), 0);
    const bandH = [];
    for (const n of nodes) bandH[n.depth] = Math.max(bandH[n.depth] || 0, n.boxH);
    const bandCenterY = [];
    let yCursor = PAGE_PAD_Y;
    for (let d = 0; d <= maxDepth; d++) {
      bandCenterY[d] = yCursor + bandH[d] / 2;
      yCursor += bandH[d] + DEPTH_GAP;
    }
    for (const n of nodes) n.cy = bandCenterY[n.depth];

    /* ---------- horizontal placement: pack leaves, center parents ----------
       cursorX walks left→right across leaves. Each parent is centered over its
       children. A parent wider than its children's span is kept in-bounds: if
       it would overflow on the left, its whole subtree is shifted right; if it
       overflows on the right, the cursor is advanced so the next sibling clears
       it. This is a lightweight contour guard — not full Reingold-Tilford
       contour merging — and is sufficient for linear chains and the shallow,
       branching trees this scaffold targets. See README "Known v1 limits". */
    let cursorX = PAGE_PAD_X;

    function shiftSubtree(idx, dx) {
      nodes[idx].cx += dx;
      for (const ci of nodes[idx].childIndices) shiftSubtree(ci, dx);
    }

    function place(idx) {
      const n = nodes[idx];
      if (n.childIndices.length === 0) {
        n.cx = cursorX + n.boxW / 2;
        cursorX = n.cx + n.boxW / 2;   // right edge
        return;
      }
      const startCursor = cursorX;
      n.childIndices.forEach((ci, i) => {
        if (i > 0) cursorX += SIB_GAP;
        place(ci);
      });
      const first = nodes[n.childIndices[0]];
      const last = nodes[n.childIndices[n.childIndices.length - 1]];
      n.cx = (first.cx + last.cx) / 2;

      // keep a wide parent within its subtree footprint
      const parentLeft = n.cx - n.boxW / 2;
      if (parentLeft < startCursor) {
        shiftSubtree(idx, startCursor - parentLeft);
      }
      const parentRight = n.cx + n.boxW / 2;
      if (parentRight > cursorX) cursorX = parentRight;
    }
    place(0);

    const width  = cursorX + PAGE_PAD_X;
    const height = bandCenterY[maxDepth] + bandH[maxDepth] / 2 + PAGE_PAD_Y;

    /* ---------- render ---------- */
    const svg = document.getElementById('svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const edgeLayer = el('g', { class: 'edges' });
    const nodeLayer = el('g', { class: 'nodes' });
    svg.appendChild(edgeLayer);
    svg.appendChild(nodeLayer);

    /* Comb connectors: per PARENT, one shared horizontal bus at a single Y.
       Parent stem drops to the bus; the bus spans all children; each child
       drops vertically from the bus to its own top. A single shared busY (not
       a per-edge midpoint) is what keeps the run clean when siblings differ in
       height — otherwise each sibling's elbow lands at a different Y and the
       bus staircases. Held / legacy styling rides the per-child drop, so the
       stem and bus stay solid. A single-child parent has no bus → the stem and
       drop form one straight vertical line (the spine). */
    function bottomY(n) {
      /* Derive from FINAL geometry, not the legacy constant. A tagless section
         grows boxH and moves its rule down when its label wraps; returning
         SECTION_H/2 - 4 pinned the stem to the unwrapped bottom, so the
         connector began ABOVE the rule and crossed it once the label took a
         second line (measured -3.5px at two lines, -10px at three). Using
         boxH/2 keeps the established 3px rule-to-stem gap at EVERY line count,
         and at no wrap boxH === SECTION_H so the result is unchanged. */
      if (n.kind === 'section') return n.cy + n.boxH / 2 - (TL.rendersTag(TARGET, n) ? 0 : 4);
      return n.cy + n.boxH / 2;
    }
    for (const p of nodes) {
      if (p.childIndices.length === 0) continue;
      const kids = p.childIndices.map((ci) => nodes[ci]);
      const childDepth = p.depth + 1;
      const bandTop = bandCenterY[childDepth] - bandH[childDepth] / 2;
      const pBot = bottomY(p);
      const busY = pBot + (bandTop - pBot) * 0.5;
      const xs = kids.map((k) => k.cx);
      const minX = Math.min(...xs), maxX = Math.max(...xs);

      // parent stem (solid)
      edgeLayer.appendChild(el('path', {
        d: `M ${p.cx} ${pBot} L ${p.cx} ${busY}`, class: 'edge',
      }));
      // horizontal bus across children (only when they span more than one column)
      if (maxX - minX > 0.5) {
        edgeLayer.appendChild(el('path', {
          d: `M ${minX} ${busY} L ${maxX} ${busY}`, class: 'edge',
        }));
      }
      // per-child vertical drop, carrying the child's status
      for (const c of kids) {
        const cTop = c.cy - c.boxH / 2;
        const cls = c.status === 'held' ? 'edge held'
                  : c.status === 'legacy' ? 'edge legacy'
                  : 'edge';
        edgeLayer.appendChild(el('path', {
          d: `M ${c.cx} ${busY} L ${c.cx} ${cTop}`, class: cls,
        }));
      }
    }

    for (const n of nodes) {
      const top = n.cy - n.boxH / 2;

      if (n.kind === 'section') {
        const labelY = TL.rendersTag(TARGET, n) ? top + 9 : n.cy - 3 - gLabel(n) / 2;
        const labelDrop = gLabel(n);   // rule + tag sit below the whole label block
        nodeLayer.appendChild(TL.emit(el('text', {
          x: n.cx, y: labelY,
          'text-anchor': 'middle',
          class: 'node-label section',
        }), n.lay.label.lines, { x: n.cx, lineHeight: n.lay.label.lineHeight }));
        nodeLayer.appendChild(el('line', {
          x1: n.cx - SECTION_RULE_HALF, y1: labelY + 11 + labelDrop,
          x2: n.cx + SECTION_RULE_HALF, y2: labelY + 11 + labelDrop,
          class: 'section-rule',
          'stroke-opacity': 0.4,
        }));
        if (TL.rendersTag(TARGET, n)) {
          nodeLayer.appendChild(TL.emit(el('text', {
            x: n.cx, y: labelY + 24 + labelDrop,
            'text-anchor': 'middle',
            class: 'section-tag',
          }), n.lay.tag.lines, { x: n.cx, lineHeight: n.lay.tag.lineHeight }));
        }
        continue;
      }

      if (n.kind === 'root') {
        nodeLayer.appendChild(el('rect', {
          x: n.cx - n.boxW / 2, y: top,
          width: n.boxW, height: n.boxH,
          rx: 4, ry: 4,
          class: 'node-box root',
        }));
        nodeLayer.appendChild(TL.emit(el('text', {
          x: n.cx, y: n.hasNote ? n.cy - 8 - gPair(n) : n.cy - gLabel(n) / 2,
          'text-anchor': 'middle',
          class: 'node-label root',
        }), n.lay.label.lines, { x: n.cx, lineHeight: n.lay.label.lineHeight }));
        if (TL.rendersNote(TARGET, n)) {
          nodeLayer.appendChild(TL.emit(el('text', {
            x: n.cx, y: n.cy + 12 + gLabel(n) - gPair(n),
            'text-anchor': 'middle',
            class: 'node-note',
          }), n.lay.note.lines, { x: n.cx, lineHeight: n.lay.note.lineHeight }));
        }
        continue;
      }

      if (n.kind === 'group') {
        /* A group carries the ordinary label/note PAIR geometry while keeping its
           own fill treatment. It also does not take the held/legacy status
           modifiers the generic branch applies — pre-existing on both this
           engine and H, unchanged here, and named so the omission reads as
           inherited rather than introduced. The public tree grammar permits `note` on a
           group, and the helper's predicate says a group note renders, so the
           build path measures it and grows the box for it — a branch that then
           emitted no note would reserve space for text no reader ever sees,
           which is the exact defect this shared contract exists to remove. */
        nodeLayer.appendChild(el('rect', {
          x: n.cx - n.boxW / 2, y: top,
          width: n.boxW, height: n.boxH,
          rx: 4, ry: 4,
          class: 'node-box',
          'fill-opacity': 0.5,
        }));
        nodeLayer.appendChild(TL.emit(el('text', {
          x: n.cx, y: n.hasNote ? n.cy - 7 - gPair(n) : n.cy - gLabel(n) / 2,
          'text-anchor': 'middle',
          class: 'node-label',
        }), n.lay.label.lines, { x: n.cx, lineHeight: n.lay.label.lineHeight }));
        if (TL.rendersNote(TARGET, n)) {
          nodeLayer.appendChild(TL.emit(el('text', {
            x: n.cx, y: n.cy + 9 + gLabel(n) - gPair(n),
            'text-anchor': 'middle',
            class: 'node-note',
          }), n.lay.note.lines, { x: n.cx, lineHeight: n.lay.note.lineHeight }));
        }
        continue;
      }

      const boxClass   = 'node-box'   + (n.status === 'held' ? ' held' : n.status === 'legacy' ? ' legacy' : '');
      const labelClass = 'node-label' + (n.status === 'held' ? ' held' : n.status === 'legacy' ? ' legacy' : '');
      nodeLayer.appendChild(el('rect', {
        x: n.cx - n.boxW / 2, y: top,
        width: n.boxW, height: n.boxH,
        rx: 4, ry: 4,
        class: boxClass,
      }));
      nodeLayer.appendChild(TL.emit(el('text', {
        x: n.cx, y: n.hasNote ? n.cy - 7 - gPair(n) : n.cy - gLabel(n) / 2,
        'text-anchor': 'middle',
        class: labelClass,
      }), n.lay.label.lines, { x: n.cx, lineHeight: n.lay.label.lineHeight }));
      if (TL.rendersNote(TARGET, n)) {
        const noteClass = 'node-note' + (n.status === 'legacy' ? ' legacy' : '');
        nodeLayer.appendChild(TL.emit(el('text', {
          x: n.cx, y: n.cy + 9 + gLabel(n) - gPair(n),
          'text-anchor': 'middle',
          class: noteClass,
        }), n.lay.note.lines, { x: n.cx, lineHeight: n.lay.note.lineHeight }));
      }
    }

    /* ---------- pan / zoom (identical behavior to the horizontal engine) ---------- */
    const canvasWrap = document.getElementById('canvasWrap');
    const stage = document.getElementById('stage');
    const zoomPct = document.getElementById('zoomPct');
    let tx = 0, ty = 0, scale = 1;

    /* Interaction floor. The ordinary zoom-out floor is this pattern's historical
       BASE_MIN_SCALE. But the panel-aware fit can legitimately land BELOW it on a
       constrained viewport (a tall diagram that collides with the chrome fits smaller
       than it used to), and a fixed floor above the fitted scale makes "zoom out"
       INCREASE the scale — the control reverses direction. So the live floor is the
       lower of the base floor and the most recent Fit. Fit itself is never clamped:
       clamping it would restore the panel collision this engine exists to avoid. */
    const BASE_MIN_SCALE = 0.15;
    let fittedMinScale = BASE_MIN_SCALE;
    function apply() {
      stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      zoomPct.textContent = Math.round(scale * 100) + '%';
    }
    function fit() {
      /* Shared DS fit contract (diagrams-fit.js): reserves the measured caption/legend
         and HUD bands, then centres in the remainder. With no visible panels both bands
         are 0 and this is arithmetically identical to the previous formula. clearance is
         TOTAL (the value formerly subtracted from the viewport), not per-side padding. */
      const f = window.DIAGRAM_FIT.compute({
        wrap: canvasWrap,
        bounds: { minX: 0, minY: 0, maxX: width, maxY: height },
        clearanceX: 80, clearanceY: 80, maxScale: 1.2, gutter: 26
      });
      fittedMinScale = Math.min(BASE_MIN_SCALE, f.scale);
      scale = f.scale; tx = f.tx; ty = f.ty;
      apply();
    }
    fit();
    window.addEventListener('resize', fit);

    document.getElementById('zoomIn').onclick  = () => { scale = Math.min(scale * 1.2, 4); apply(); };
    document.getElementById('zoomOut').onclick = () => { scale = Math.max(scale / 1.2, fittedMinScale); apply(); };
    document.getElementById('zoomFit').onclick = fit;

    let dragging = false, sx0, sy0, tx0, ty0;
    canvasWrap.addEventListener('pointerdown', (ev) => {
      if (ev.target.closest('.hud, .legend, .caption')) return;
      dragging = true;
      canvasWrap.classList.add('dragging');
      canvasWrap.setPointerCapture(ev.pointerId);
      sx0 = ev.clientX; sy0 = ev.clientY; tx0 = tx; ty0 = ty;
    });
    canvasWrap.addEventListener('pointermove', (ev) => {
      if (!dragging) return;
      tx = tx0 + (ev.clientX - sx0);
      ty = ty0 + (ev.clientY - sy0);
      apply();
    });
    canvasWrap.addEventListener('pointerup', () => {
      dragging = false;
      canvasWrap.classList.remove('dragging');
    });
    canvasWrap.addEventListener('wheel', (ev) => {
      ev.preventDefault();
      const rect = canvasWrap.getBoundingClientRect();
      const mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
      const factor = ev.deltaY > 0 ? 1 / 1.1 : 1.1;
      const newScale = Math.max(fittedMinScale, Math.min(4, scale * factor));
      const k = newScale / scale;
      tx = mx - (mx - tx) * k;
      ty = my - (my - ty) * k;
      scale = newScale;
      apply();
    }, { passive: false });
  }

  /* Public entry. Gate the first measure/layout on web-font load so per-box
     widths are computed against the ACTUAL fonts, not the fallback. Measuring
     before the fonts load underestimates text width, which lets long labels
     overflow their boxes on first paint. Same gate as the horizontal engine. */
  function renderWhenFontsReady(TREE) {
    const fonts = (typeof document !== 'undefined') && document.fonts;
    if (!fonts || typeof fonts.load !== 'function') { render(TREE); return; }
    const needed = [
      '400 13px "Inter"', '300 13px "Inter"', '500 14px "Inter"',
      '300 10px "JetBrains Mono"', '500 10px "JetBrains Mono"',
    ];
    Promise.all(needed.map((f) => fonts.load(f).catch(() => null)))
      .then(() => render(TREE))
      .catch(() => render(TREE));
  }

  window.DIAGRAMS = { render: renderWhenFontsReady };
})();
