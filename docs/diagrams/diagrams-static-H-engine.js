/* diagrams-static-H-engine.js
   Shared diagram engine for ASK-family system / architecture diagrams
   (architecture trees, topology maps, source-of-truth maps, and similar).
   Layout is horizontal, top-aligned cascade. Pan + zoom on the canvas.

   Usage from page:
     window.DIAGRAMS.render(TREE);
   The page is expected to expose `.canvas-wrap`, `.stage > svg#svg`,
   and `.hud` with #zoomIn, #zoomOut, #zoomPct, #zoomFit. Style comes
   from diagrams.css (theme-aware via [data-theme]).

   render() is font-aware: it waits for the Inter / JetBrains Mono specs it
   measures with to load before computing column widths, so text never bleeds
   between columns on first paint. See renderWhenFontsReady at the bottom.
*/
(function () {
  /* ---------- layout constants ---------- */
  const GAP_WITHIN  = 6;    // vertical gap between sibling boxes of the SAME parent (within a group)
  const GAP_BETWEEN = 18;   // vertical gap at a group / section boundary (parent change) — keeps groups distinct
  const GAP_COL = 36;
  const BOX_PAD_X = 14;
  const BOX_H = 26;
  const BOX_H_NOTE = 44;
  const ROOT_BOX_H = 50;
  const ROOT_PAD_X = 22;
  const PAGE_PAD_X = 64;
  const PAGE_PAD_Y = 48;

  const FONT_LABEL       = '400 13px "Inter", system-ui, sans-serif';
  const FONT_LABEL_LIGHT = '300 13px "Inter", system-ui, sans-serif';
  const FONT_LABEL_ROOT  = '500 14px "Inter", system-ui, sans-serif';
  const FONT_NOTE        = '300 10px "JetBrains Mono", monospace';
  const FONT_SECTION     = '500 10px "JetBrains Mono", monospace';
  const FONT_TAG         = '300 9px "JetBrains Mono", monospace';

  // CSS letter-spacing (em) the SVG text carries but canvas.measureText drops.
  // Each constant = letter-spacing(em) × the font-size it is measured at, and MUST
  // mirror diagrams.css. Change one there → change it here.
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
    /* ---------- pre-measure per-depth widths ---------- */
    const colMaxW = {};
    function preMeasure(node, depth) {
      const kind = node.kind || 'node';
      const padX = kind === 'root' ? ROOT_PAD_X : BOX_PAD_X;
      const displayLabel = kind === 'section' ? '/ ' + node.label.toUpperCase() : node.label;
      const labelW = measure(displayLabel, fontFor(node), kind === 'section' ? LS_SECTION : 0);
      // Only measure notes for kinds that actually render them. The section branch
      // renders label + tag + rule but NOT the note, so a section note must not affect
      // column width — otherwise an invisible note stretches the column and its connector
      // spans (see the regression case in diagram-static-H.source.js). Section tags ARE
      // rendered, so they are still measured just below.
      let noteW = (node.note && kind !== 'section') ? measure(node.note, FONT_NOTE, LS_NOTE) : 0;
      if (kind === 'section' && node.tag) {
        noteW = Math.max(noteW, measure('// ' + node.tag, FONT_TAG, LS_TAG));
      }
      const contentW = Math.max(labelW, noteW);
      const totalW = contentW + padX * 2;
      colMaxW[depth] = Math.max(colMaxW[depth] || 0, totalW);
      for (const c of (node.children || [])) preMeasure(c, depth + 1);
    }
    preMeasure(TREE, 0);

    const maxDepth = Math.max(...Object.keys(colMaxW).map(Number));
    const colX = {};
    let xCursor = PAGE_PAD_X;
    for (let d = 0; d <= maxDepth; d++) {
      colX[d] = xCursor;
      xCursor += colMaxW[d] + GAP_COL;
    }
    const width  = xCursor + PAGE_PAD_X - GAP_COL;

    /* ---------- place nodes (top-aligned cascade) ----------
       Vertical positions come from a LEAF CURSOR, not a uniform row pitch: each
       leaf advances the cursor by its own height plus a gap, and that gap is
       GAP_WITHIN between siblings of the same parent but GAP_BETWEEN whenever the
       parent changes (a group / section boundary). So clustered siblings sit
       tight while groups open up — the groups read as distinct. Internal nodes
       stay top-aligned to their first child. */
    const nodes = [];
    const edges = [];
    let yCursor = PAGE_PAD_Y;
    let prevLeafParent;            // parent idx of the previously placed leaf (undefined before the first)
    function place(node, depth, parent) {
      const kind = node.kind || 'node';
      const status = node.status || 'earned';
      const hasNote = !!(node.note || (kind === 'section' && node.tag));
      const boxH = kind === 'root' ? ROOT_BOX_H : (hasNote ? BOX_H_NOTE : BOX_H);
      const boxW = colMaxW[depth];
      const x = colX[depth];

      const idx = nodes.length;
      const rec = {
        ...node, depth, x, boxW, boxH, hasNote,
        status, kind, childIndices: [], centerY: 0, y: 0,
      };
      nodes.push(rec);
      if (parent !== null && parent !== undefined) {
        edges.push({ from: parent, to: idx });
        nodes[parent].childIndices.push(idx);
      }

      if (!node.children || node.children.length === 0) {
        // leaf — advance the cursor; tight within a group, wider across a boundary
        if (prevLeafParent !== undefined) {
          yCursor += (parent === prevLeafParent) ? GAP_WITHIN : GAP_BETWEEN;
        }
        rec.y = yCursor;
        rec.centerY = yCursor + boxH / 2;
        yCursor += boxH;
        prevLeafParent = parent;
      } else {
        for (const c of node.children) place(c, depth + 1, idx);
        rec.centerY = nodes[rec.childIndices[0]].centerY;   // top-aligned to first child
        rec.y = rec.centerY - boxH / 2;
      }
      return idx;
    }
    place(TREE, 0, null);
    const height = yCursor + PAGE_PAD_Y;

    /* ---------- render ---------- */
    const svg = document.getElementById('svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const edgeLayer = el('g', { class: 'edges' });
    const nodeLayer = el('g', { class: 'nodes' });
    svg.appendChild(edgeLayer);
    svg.appendChild(nodeLayer);

    for (const e of edges) {
      const p = nodes[e.from];
      const c = nodes[e.to];
      const pX = p.x + p.boxW;
      const pY = p.centerY;
      const cX = c.x;
      const cY = c.centerY;
      const midX = (pX + cX) / 2;
      const cls = c.status === 'held' ? 'edge held'
                : c.status === 'legacy' ? 'edge legacy'
                : 'edge';
      edgeLayer.appendChild(el('path', {
        d: `M ${pX} ${pY} L ${midX} ${pY} L ${midX} ${cY} L ${cX} ${cY}`,
        class: cls,
      }));
    }

    for (const n of nodes) {
      if (n.kind === 'section') {
        nodeLayer.appendChild(el('text', {
          x: n.x + BOX_PAD_X,
          y: n.hasNote ? n.y + 14 : n.centerY,
          class: 'node-label section',
        }, ['/ ' + n.label.toUpperCase()]));
        if (n.tag) {
          nodeLayer.appendChild(el('text', {
            x: n.x + BOX_PAD_X,
            y: n.y + n.boxH - 12,
            class: 'section-tag',
          }, ['// ' + n.tag]));
        }
        nodeLayer.appendChild(el('line', {
          x1: n.x, y1: n.y + n.boxH,
          x2: n.x + n.boxW, y2: n.y + n.boxH,
          class: 'section-rule',
          'stroke-opacity': 0.4,
        }));
        continue;
      }

      if (n.kind === 'root') {
        nodeLayer.appendChild(el('rect', {
          x: n.x, y: n.y,
          width: n.boxW, height: n.boxH,
          rx: 4, ry: 4,
          class: 'node-box root',
        }));
        nodeLayer.appendChild(el('text', {
          x: n.x + ROOT_PAD_X,
          y: n.hasNote ? n.y + 19 : n.centerY,
          class: 'node-label root',
        }, [n.label]));
        if (n.note) {
          nodeLayer.appendChild(el('text', {
            x: n.x + ROOT_PAD_X,
            y: n.y + n.boxH - 12,
            class: 'node-note',
          }, [n.note]));
        }
        continue;
      }

      if (n.kind === 'group') {
        nodeLayer.appendChild(el('rect', {
          x: n.x, y: n.y,
          width: n.boxW, height: n.boxH,
          rx: 4, ry: 4,
          class: 'node-box',
          'fill-opacity': 0.5,
        }));
        nodeLayer.appendChild(el('text', {
          x: n.x + BOX_PAD_X, y: n.centerY,
          class: 'node-label',
        }, [n.label]));
        continue;
      }

      const boxClass   = 'node-box'   + (n.status === 'held' ? ' held' : n.status === 'legacy' ? ' legacy' : '');
      const labelClass = 'node-label' + (n.status === 'held' ? ' held' : n.status === 'legacy' ? ' legacy' : '');
      nodeLayer.appendChild(el('rect', {
        x: n.x, y: n.y,
        width: n.boxW, height: n.boxH,
        rx: 4, ry: 4,
        class: boxClass,
      }));
      nodeLayer.appendChild(el('text', {
        x: n.x + BOX_PAD_X,
        y: n.hasNote ? n.y + 16 : n.centerY,
        class: labelClass,
      }, [n.label]));
      if (n.note) {
        const noteClass = 'node-note' + (n.status === 'legacy' ? ' legacy' : '');
        nodeLayer.appendChild(el('text', {
          x: n.x + BOX_PAD_X,
          y: n.y + n.boxH - 10,
          class: noteClass,
        }, [n.note]));
      }
    }

    /* ---------- pan / zoom ---------- */
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

  /* Public entry. Gate the first measure/layout on web-font load so per-column
     widths are computed against the ACTUAL fonts, not the fallback. Measuring
     before the fonts load underestimates text width, which lets long first-level
     (section) labels bleed into the next column. The specific font specs the
     engine measures with are loaded explicitly, then render proceeds — with a
     safe fallback if the Font Loading API is unavailable. */
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
