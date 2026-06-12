/* diagrams-static-SEQ-engine.js — static "sequence diagram" Class A pattern.
   Sequence engine for ASK-family diagrams: an ORDERED top→down sequence of
   steps, as distinct from a tree (no hierarchy implied — succession is the
   relation, drawn with arrows).

   Derived from diagrams-static-V-engine.js (2026-06-11). Same public contract
   (window.DIAGRAMS.render(TREE)), same data grammar, same diagrams.css classes,
   same PNG export. The engine FLATTENS the node tree depth-first into a linear
   run, so the same .source.js renders in the V engine (as a spine) or in this
   engine (as a sequence). Geometry differences:

     1. the ROOT box stands alone — no connector to the first step;
     2. steps are joined by vertical ARROWS (sequence, not tree relationship);
     3. everything is LEFT-ALIGNED: boxes share a left edge, text inside boxes
        is left-aligned, and the connector runs at a small indent from the
        left edge rather than down a horizontal center.

   Expects a linear chain (each node at most one child). A branching tree fed
   to this engine renders in depth-first order with a documented warning —
   use the V or H engine for trees.

   Arrowheads are explicit <path class="edge-arrowhead"> triangles (not SVG
   markers) so theme vars + the PNG exporter's computed-style inlining apply
   reliably. Style rule lives in the shared diagrams.css:
   .edge-arrowhead { fill: var(--diagram-line); stroke: none; }

   Graduated from the asset-pipeline-ASK reference implementation (handoff
   2026-06-11). This design-system-ASK copy is canonical; consumers vendor it
   by reference, never fork.
*/
(function () {
  /* ---------- layout constants ---------- */
  const LEFT_PAD      = 80;   // page left padding = shared left edge of all boxes
  const PAGE_PAD_Y    = 56;
  const PAGE_PAD_R    = 80;
  const ROOT_GAP      = 64;   // gap below the standalone root (visibly larger; no line)
  const STEP_GAP      = 46;   // vertical gap between sequence steps (room for the arrow)
  const EDGE_INDENT   = 26;   // connector x = left edge + this indent
  const ARROW_W       = 9;    // arrowhead width
  const ARROW_H       = 8;    // arrowhead height
  const BOX_PAD_X     = 14;
  const BOX_H         = 26;
  const BOX_H_NOTE    = 44;
  const ROOT_BOX_H    = 50;
  const ROOT_PAD_X    = 22;

  const FONT_LABEL       = '400 13px "Inter", system-ui, sans-serif';
  const FONT_LABEL_LIGHT = '300 13px "Inter", system-ui, sans-serif';
  const FONT_LABEL_ROOT  = '500 14px "Inter", system-ui, sans-serif';
  const FONT_NOTE        = '300 10px "JetBrains Mono", monospace';
  const LS_NOTE = 0.2;  // letter-spacing(em)×size — mirrors diagrams.css .node-note

  const measureCtx = document.createElement('canvas').getContext('2d');
  function measure(text, font, ls = 0) {
    measureCtx.font = font;
    let w = measureCtx.measureText(text).width;
    if (ls) w += text.length * ls;
    return w;
  }

  function fontFor(node) {
    const status = node.status || 'earned';
    const kind = node.kind || 'node';
    if (kind === 'root') return FONT_LABEL_ROOT;
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
    /* ---------- flatten the tree depth-first into a linear run ---------- */
    const seq = [];
    let branched = false;
    (function walk(node) {
      seq.push(node);
      const kids = node.children || [];
      if (kids.length > 1) branched = true;
      for (const c of kids) walk(c);
    })(TREE);
    if (branched) {
      console.warn('[SEQ engine] input branches; rendering depth-first order. Use the V/H engine for trees.');
    }

    /* ---------- measure boxes ---------- */
    const nodes = seq.map((node) => {
      const kind = node.kind || 'node';
      const status = node.status || 'earned';
      const hasNote = !!node.note;
      const padX = kind === 'root' ? ROOT_PAD_X : BOX_PAD_X;
      const labelW = measure(node.label, fontFor(node));
      const noteW = node.note ? measure(node.note, FONT_NOTE, LS_NOTE) : 0;
      const boxW = Math.max(labelW, noteW) + padX * 2;
      const boxH = kind === 'root' ? ROOT_BOX_H : (hasNote ? BOX_H_NOTE : BOX_H);
      return { ...node, kind, status, hasNote, padX, boxW, boxH, top: 0 };
    });

    /* ---------- vertical placement: stacked, left-aligned ---------- */
    let y = PAGE_PAD_Y;
    nodes.forEach((n, i) => {
      n.top = y;
      y += n.boxH + (i === 0 ? ROOT_GAP : STEP_GAP);
    });
    const height = y - (nodes.length ? STEP_GAP : 0) + PAGE_PAD_Y;
    const width = LEFT_PAD + Math.max(...nodes.map((n) => n.boxW), 0) + PAGE_PAD_R;

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

    /* Arrowed connectors between consecutive STEPS only (the root stands
       alone — sequence starts at nodes[1]). The connector runs at a small
       indent from the shared left edge; the arrowhead lands on the next
       step's top edge. */
    const edgeX = LEFT_PAD + EDGE_INDENT;
    for (let i = 1; i < nodes.length - 1; i++) {
      const a = nodes[i], b = nodes[i + 1];
      const y1 = a.top + a.boxH;
      const y2 = b.top;
      const cls = b.status === 'held' ? 'edge held'
                : b.status === 'legacy' ? 'edge legacy'
                : 'edge';
      edgeLayer.appendChild(el('path', {
        d: `M ${edgeX} ${y1} L ${edgeX} ${y2 - ARROW_H}`, class: cls,
      }));
      edgeLayer.appendChild(el('path', {
        d: `M ${edgeX - ARROW_W / 2} ${y2 - ARROW_H} L ${edgeX + ARROW_W / 2} ${y2 - ARROW_H} L ${edgeX} ${y2} Z`,
        class: 'edge-arrowhead',
      }));
    }

    for (const n of nodes) {
      const left = LEFT_PAD;
      const textX = left + n.padX;

      if (n.kind === 'root') {
        nodeLayer.appendChild(el('rect', {
          x: left, y: n.top, width: n.boxW, height: n.boxH,
          rx: 4, ry: 4, class: 'node-box root',
        }));
        nodeLayer.appendChild(el('text', {
          x: textX, y: n.hasNote ? n.top + n.boxH / 2 - 8 : n.top + n.boxH / 2,
          'text-anchor': 'start', class: 'node-label root',
        }, [n.label]));
        if (n.note) {
          nodeLayer.appendChild(el('text', {
            x: textX, y: n.top + n.boxH / 2 + 12,
            'text-anchor': 'start', class: 'node-note',
          }, [n.note]));
        }
        continue;
      }

      const boxClass   = 'node-box'   + (n.status === 'held' ? ' held' : n.status === 'legacy' ? ' legacy' : '');
      const labelClass = 'node-label' + (n.status === 'held' ? ' held' : n.status === 'legacy' ? ' legacy' : '');
      nodeLayer.appendChild(el('rect', {
        x: left, y: n.top, width: n.boxW, height: n.boxH,
        rx: 4, ry: 4, class: boxClass,
      }));
      nodeLayer.appendChild(el('text', {
        x: textX, y: n.hasNote ? n.top + n.boxH / 2 - 7 : n.top + n.boxH / 2,
        'text-anchor': 'start', class: labelClass,
      }, [n.label]));
      if (n.note) {
        const noteClass = 'node-note' + (n.status === 'legacy' ? ' legacy' : '');
        nodeLayer.appendChild(el('text', {
          x: textX, y: n.top + n.boxH / 2 + 9,
          'text-anchor': 'start', class: noteClass,
        }, [n.note]));
      }
    }

    /* ---------- pan / zoom (identical to the V engine) ---------- */
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

  /* Public entry — same font-load gate as the sibling engines. */
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
