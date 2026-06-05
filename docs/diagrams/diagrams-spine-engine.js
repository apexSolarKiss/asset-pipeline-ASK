/* diagrams-spine-engine.js
   Vertical placement engine for ASK-family system / architecture diagrams
   rendered as a top→down, horizontally-centered spine — ontology maps,
   inheritance chains, one-axis information-architecture diagrams, and similar.

   Sibling of diagrams-engine.js (the horizontal top-aligned cascade). Same
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

  const measureCtx = document.createElement('canvas').getContext('2d');
  function measure(text, font, ls = 0) {
    measureCtx.font = font;
    let w = measureCtx.measureText(text).width;
    if (ls) w += text.length * ls;  // canvas.measureText ignores CSS letter-spacing
    return w;
  }

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
      const hasNote = !!(node.note || (kind === 'section' && node.tag));

      // measured content width
      const padX = kind === 'root' ? ROOT_PAD_X : BOX_PAD_X;
      const displayLabel = kind === 'section' ? '/ ' + node.label.toUpperCase() : node.label;
      const labelW = measure(displayLabel, fontFor(node), kind === 'section' ? LS_SECTION : 0);
      let noteW = node.note ? measure(node.note, FONT_NOTE, LS_NOTE) : 0;
      if (kind === 'section' && node.tag) {
        noteW = Math.max(noteW, measure('// ' + node.tag, FONT_TAG, LS_TAG));
      }
      const contentW = Math.max(labelW, noteW);

      // box width / height per kind. Sections have no box; their footprint is
      // the wider of the centered label/tag and the centered rule.
      let boxW, boxH;
      if (kind === 'section') {
        boxW = Math.max(contentW, SECTION_RULE_HALF * 2);
        boxH = node.tag ? SECTION_H_TAG : SECTION_H;
      } else {
        boxW = contentW + padX * 2;
        boxH = kind === 'root' ? ROOT_BOX_H : (hasNote ? BOX_H_NOTE : BOX_H);
      }

      const idx = nodes.length;
      nodes.push({
        ...node, kind, status, depth, hasNote,
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
      if (n.kind === 'section') return n.cy + (n.tag ? n.boxH / 2 : SECTION_H / 2 - 4);
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
        const labelY = n.tag ? top + 9 : n.cy - 3;
        nodeLayer.appendChild(el('text', {
          x: n.cx, y: labelY,
          'text-anchor': 'middle',
          class: 'node-label section',
        }, ['/ ' + n.label.toUpperCase()]));
        nodeLayer.appendChild(el('line', {
          x1: n.cx - SECTION_RULE_HALF, y1: labelY + 11,
          x2: n.cx + SECTION_RULE_HALF, y2: labelY + 11,
          class: 'section-rule',
          'stroke-opacity': 0.4,
        }));
        if (n.tag) {
          nodeLayer.appendChild(el('text', {
            x: n.cx, y: labelY + 24,
            'text-anchor': 'middle',
            class: 'section-tag',
          }, ['// ' + n.tag]));
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
        nodeLayer.appendChild(el('text', {
          x: n.cx, y: n.hasNote ? n.cy - 8 : n.cy,
          'text-anchor': 'middle',
          class: 'node-label root',
        }, [n.label]));
        if (n.note) {
          nodeLayer.appendChild(el('text', {
            x: n.cx, y: n.cy + 12,
            'text-anchor': 'middle',
            class: 'node-note',
          }, [n.note]));
        }
        continue;
      }

      if (n.kind === 'group') {
        nodeLayer.appendChild(el('rect', {
          x: n.cx - n.boxW / 2, y: top,
          width: n.boxW, height: n.boxH,
          rx: 4, ry: 4,
          class: 'node-box',
          'fill-opacity': 0.5,
        }));
        nodeLayer.appendChild(el('text', {
          x: n.cx, y: n.cy,
          'text-anchor': 'middle',
          class: 'node-label',
        }, [n.label]));
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
      nodeLayer.appendChild(el('text', {
        x: n.cx, y: n.hasNote ? n.cy - 7 : n.cy,
        'text-anchor': 'middle',
        class: labelClass,
      }, [n.label]));
      if (n.note) {
        const noteClass = 'node-note' + (n.status === 'legacy' ? ' legacy' : '');
        nodeLayer.appendChild(el('text', {
          x: n.cx, y: n.cy + 9,
          'text-anchor': 'middle',
          class: noteClass,
        }, [n.note]));
      }
    }

    /* ---------- pan / zoom (identical behavior to the horizontal engine) ---------- */
    const canvasWrap = document.getElementById('canvasWrap');
    const stage = document.getElementById('stage');
    const zoomPct = document.getElementById('zoomPct');
    let tx = 0, ty = 0, scale = 1;
    function apply() {
      stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      zoomPct.textContent = Math.round(scale * 100) + '%';
    }
    function fit() {
      const rect = canvasWrap.getBoundingClientRect();
      const padding = 80;
      const sx = (rect.width - padding) / width;
      const sy = (rect.height - padding) / height;
      scale = Math.min(sx, sy, 1.2);
      tx = (rect.width - width * scale) / 2;
      ty = (rect.height - height * scale) / 2;
      apply();
    }
    fit();
    window.addEventListener('resize', fit);

    document.getElementById('zoomIn').onclick  = () => { scale = Math.min(scale * 1.2, 4); apply(); };
    document.getElementById('zoomOut').onclick = () => { scale = Math.max(scale / 1.2, 0.15); apply(); };
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
      const newScale = Math.max(0.15, Math.min(4, scale * factor));
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
