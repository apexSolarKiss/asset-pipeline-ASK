/* diagrams-static-FLOW-engine.js — static "convergence-flow diagram" Class A pattern.

   Convergence-flow engine for ASK-family diagrams. Measured text + automatic box
   sizing, DS typography/contrast, shared node/edge language, light/dark behavior,
   font-load gate, pan/zoom, and the geometry-agnostic PNG export — same as the
   H / V / SEQ siblings. Public contract: window.DIAGRAMS.render(DATA).

   Composition (top → down, centered on a single axis):
     - a CONTAINED dimensions RIBBON (measured strip of text, not floating pills);
     - a CARRIER in a left lane, joined by a typed-reference RAIL that runs in its
       own clear lane across the top of the field (short taps down into the field —
       it never crosses node text);
     - a single left-aligned normative-source FIELD (inputs recede);
     - many-to-one CONVERGENCE into an anchored resolved specification;
     - a process SPINE with parallel fan-out / reconverge;
     - a COMPACT conformance RAIL beside the conformance node (short taps, not
       full-gutter plumbing);
     - a SHORT return curl (closes the loop without framing the canvas).
   Hierarchy is weight/contrast only (anchor / recede tiers) — no new color.

   ONE shared source model, TWO render modes that cannot drift (read window.FLOW_MODE
   at render time: 'static' default | 'interactive'):
     - static/export: draws each node's `short` + topology ONLY; legible without interaction.
     - interactive:   identical topology + a hover/click side panel fed by `detail`.

   Data grammar (window.FLOW_DIAGRAM):
     band?:         { tag?, short?, perImage?:[…], setLevel?, detail? }   // optional dimensions ribbon
     carrier?:      { label, short?, note?, rail?, railTerms?, detail? }
     rail?:         { detail? }
     field:         { tag?, nodes:[ { id?, label, short?, status?, detail? }, … ] }
     converge:      { id?, label, short?, anchor?, detail? }
     spine:         [ { id?, label, short?, status?, anchor?, detail? } | { parallel:[ {…}, … ] } ]
     evalEdges?:    [ { from:'<id>', to:'<id>' }, … ]              // one compact rail per target
     futureCarrier?:{ from:'<id>', node, short?, edge?, detail? }  // the return loop
   Per node: label = full phrase (interactive panel title); short = the label drawn in the
   static figure; detail = { def, eg?, not? } shown in the interactive panel.
   status: earned (default) | held | legacy.  ids default f0.. / converge / s0.. / carrier.
*/
(function () {
  /* ---------- constants ---------- */
  const PAGE_PAD = 84;                                   // canvas padding
  const BOX_PAD_X = 20, BOX_H = 40, BOX_H_NOTE = 48;    // BIGGER boxes / more padding (ASK)
  const GROUP_PAD = 28, FIELD_GAP = 16, COL_GAP = 72, RAIL_LANE = 56;  // tighter vertical stacking inside the field
  const CARRIER_GAP = 280;                               // carrier / future-ref lane — pulled in a bit (ASK)
  const COL_TRUNK_GAP = 210;                             // gap between the single source column and the center trunk
  const RIBBON_PAD = 20, RIBBON_LH = 16, RIBBON_VPAD = 13, RIBBON_GAP = 54;
  const CONVERGE_GAP = 52, SPINE_GAP = 50, BRANCH_GAP_X = 620;          // (2-branch row uses field-aligned placement)
  const ERAIL_GAP = 104, ERAIL_LH = 18, BUS_CLEAR = 96; // conformance bus sits further out from the field (ASK)
  const ARROW_W = 9, ARROW_H = 8, CAP = 4;

  const F_LABEL = '400 13px "Inter", system-ui, sans-serif';
  const F_LABEL_LIGHT = '300 13px "Inter", system-ui, sans-serif';
  const F_NOTE = '300 10px "JetBrains Mono", monospace';
  const F_TAG = '300 9px "JetBrains Mono", monospace';
  const F_RIB = '300 9px "JetBrains Mono", monospace';
  const F_CHK = '300 11px "Inter", system-ui, sans-serif';
  const LS_NOTE = 0.2, LS_RIB = 0.36, LS_TAG = 1.44;

  const mctx = document.createElement('canvas').getContext('2d');
  function measure(t, font, ls = 0) { mctx.font = font; let w = mctx.measureText(t).width; if (ls) w += t.length * ls; return w; }
  function fontFor(n) { const s = n.status || 'earned'; return (s === 'held' || s === 'legacy') ? F_LABEL_LIGHT : F_LABEL; }

  const NS = 'http://www.w3.org/2000/svg';
  function el(name, attrs = {}, kids = []) {
    const e = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) if (v !== null && v !== undefined) e.setAttribute(k, v);
    for (const c of kids) { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); }
    return e;
  }

  function makeBox(node, id) {
    // STATIC figure draws the SHORT label only — descriptive burden (note / detail)
    // is carried by the interactive panel, never crammed into the box.
    const drawn = node.short || node.label;
    const labelW = measure(drawn, fontFor(node));
    const tier = node.anchor ? 'anchor' : (node.recede ? 'recede' : 'normal');
    const w = labelW + BOX_PAD_X * 2 + (tier === 'anchor' ? 10 : 0);
    return { id, label: node.label, drawn, note: node.note || null, detail: node.detail || null,
             status: node.status || 'earned', tier, hasNote: false, w, h: BOX_H };
  }
  function place(b, x, y) { b.x = x; b.y = y; b.cx = x + b.w / 2; b.cy = y + b.h / 2; b.left = x; b.right = x + b.w; b.top = y; b.bottom = y + b.h; return b; }
  function cls(base, b) { return base + (b.tier === 'anchor' ? ' anchor' : b.tier === 'recede' ? ' recede' : '') + (b.status === 'held' ? ' held' : b.status === 'legacy' ? ' legacy' : ''); }
  function drawBox(layer, b) {
    layer.appendChild(el('rect', { x: b.x, y: b.y, width: b.w, height: b.h, rx: b.tier === 'anchor' ? 6 : 4, ry: b.tier === 'anchor' ? 6 : 4, class: cls('node-box', b), 'data-id': b.id }));
    layer.appendChild(el('text', { x: b.cx, y: b.cy, 'text-anchor': 'middle', class: cls('node-label', b) }, [b.drawn]));
  }
  function tag(layer, t, x, y, anchor = 'start') { layer.appendChild(el('text', { x, y, 'text-anchor': anchor, class: 'flow-tag' }, [t])); }
  function arrowDown(layer, x, y1, y2, c) {
    layer.appendChild(el('path', { d: `M ${x} ${y1} L ${x} ${y2 - ARROW_H}`, class: c }));
    layer.appendChild(el('path', { d: `M ${x - ARROW_W / 2} ${y2 - ARROW_H} L ${x + ARROW_W / 2} ${y2 - ARROW_H} L ${x} ${y2} Z`, class: 'edge-arrowhead' }));
  }
  function ahDown(layer, x, yTip) { layer.appendChild(el('path', { d: `M ${x - ARROW_W / 2} ${yTip - ARROW_H} L ${x + ARROW_W / 2} ${yTip - ARROW_H} L ${x} ${yTip} Z`, class: 'edge-arrowhead' })); }
  function line(layer, x1, y1, x2, y2, c) { layer.appendChild(el('path', { d: `M ${x1} ${y1} L ${x2} ${y2}`, class: c })); }

  function render(DATA) {
    // render mode: 'static' (article/export, default) | 'interactive' (repo explanatory).
    // Read at render time (FLOW_MODE may be set after this script loads).
    const MODE = (typeof window !== 'undefined' && window.FLOW_MODE === 'interactive') ? 'interactive' : 'static';
    const byId = {};
    const bb = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    const grow = (x, y) => { if (x < bb.x0) bb.x0 = x; if (y < bb.y0) bb.y0 = y; if (x > bb.x1) bb.x1 = x; if (y > bb.y1) bb.y1 = y; };
    const growB = (b) => { grow(b.left, b.top); grow(b.right, b.bottom); };

    const svg = document.getElementById('svg');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const edges = el('g', { class: 'edges' }), frames = el('g', { class: 'frames' }), nodes = el('g', { class: 'nodes' });
    svg.appendChild(edges); svg.appendChild(frames); svg.appendChild(nodes);

    let y = PAGE_PAD;

    /* ---------- 1. dimensions ribbon (contained) ---------- */
    if (DATA.band) {
      // compact CHIP — just the dimension label; the full inventory lives in the
      // panel (interactive) so the static figure stays uncongested.
      const t = DATA.band.short || DATA.band.tag || 'visual dimensions';
      const tagW = measure(t, F_TAG, LS_TAG);
      const w = tagW + RIBBON_PAD * 2, h = RIBBON_LH + RIBBON_VPAD;
      const x = -w / 2;
      frames.appendChild(el('rect', { x, y, width: w, height: h, rx: 8, ry: 8, class: 'flow-ribbon', 'data-id': 'band' }));
      nodes.appendChild(el('text', { x: 0, y: y + h / 2, 'text-anchor': 'middle', class: 'flow-tag' }, [t]));
      byId['band'] = { id: 'band', label: DATA.band.tag || 'visual dimensions', detail: DATA.band.detail || null,
                       x, y, w, h, cx: 0, cy: y + h / 2, left: x, right: x + w, top: y, bottom: y + h };
      grow(x, y); grow(x + w, y + h);
      y += h + RIBBON_GAP;
    }

    /* ---------- 2. carrier + SINGLE-COLUMN field (stacked on one side) + rail lane ---------- */
    const fNodes = (DATA.field && DATA.field.nodes || []).map((n, i) => makeBox({ ...n, recede: true }, n.id || ('f' + i)));
    const colW = Math.max(0, ...fNodes.map((b) => b.w));
    const trunkX = 0;                                      // spine center — convergence trunk runs STRAIGHT down it
    const colRight = trunkX - COL_TRUNK_GAP;               // sources stacked to the LEFT of the trunk
    const colLeft = colRight - colW;
    const groupTop = y, groupLeft = colLeft - GROUP_PAD, groupRight = trunkX + GROUP_PAD;
    const groupW = groupRight - groupLeft;
    const railY = groupTop + RAIL_LANE / 2;
    const srcTop = groupTop + RAIL_LANE;
    let yCol = srcTop;
    fNodes.forEach((b) => { place(b, colLeft, yCol); byId[b.id] = b; yCol += b.h + FIELD_GAP; });  // LEFT-aligned (ASK)
    const groupBottom = yCol - FIELD_GAP + GROUP_PAD;
    const groupH = groupBottom - groupTop;

    frames.appendChild(el('rect', { x: groupLeft, y: groupTop, width: groupW, height: groupH, rx: 8, ry: 8, class: 'flow-group' }));
    if (DATA.field && DATA.field.tag) tag(frames, DATA.field.tag, groupLeft, groupTop - 16, 'start');
    grow(groupLeft, groupTop); grow(groupRight, groupBottom);

    // typed-reference rail = a LIGHT label lane at the top of the field (label + terms
    // only). No divider line spanning the canvas — the rail must read quieter than the
    // source boxes. The carrier sits outside the field and feeds this lane via a stub.
    const railLabel = (DATA.carrier && DATA.carrier.rail) || 'typed-reference rail';
    nodes.appendChild(el('text', { x: groupLeft + GROUP_PAD, y: groupTop + 22, 'text-anchor': 'start', class: 'flow-tag' }, [railLabel]));
    {
      const rw = measure(railLabel, F_TAG, LS_TAG);
      byId['rail'] = { id: 'rail', label: railLabel, detail: (DATA.rail && DATA.rail.detail) || null,
                       x: groupLeft + GROUP_PAD - 4, y: groupTop + 12, w: rw + 8, h: 16,
                       cx: groupLeft + GROUP_PAD + rw / 2, cy: groupTop + 20,
                       left: groupLeft + GROUP_PAD - 4, right: groupLeft + GROUP_PAD + rw + 4, top: groupTop + 12, bottom: groupTop + 28 };
    }

    let carrier = null;
    if (DATA.carrier) {
      carrier = makeBox(DATA.carrier, 'carrier');
      place(carrier, groupLeft - CARRIER_GAP - carrier.w, railY - carrier.h / 2);
      byId['carrier'] = carrier;
      // short stub: carrier's right edge → the field's left edge at the rail lane (arrowhead in).
      line(edges, carrier.right, railY, groupLeft - ARROW_H, railY, 'edge-rail');
      edges.appendChild(el('path', { d: `M ${groupLeft - ARROW_H} ${railY - ARROW_W / 2} L ${groupLeft - ARROW_H} ${railY + ARROW_W / 2} L ${groupLeft} ${railY} Z`, class: 'edge-arrowhead' }));
      drawBox(nodes, carrier);
    }

    /* ---------- 3. convergence → resolved spec (anchor, the central event) ---------- */
    const converge = makeBox(DATA.converge || { label: 'resolved', anchor: true }, (DATA.converge && DATA.converge.id) || 'converge');
    place(converge, -converge.w / 2, groupBottom + CONVERGE_GAP);
    byId[converge.id] = converge;
    // sources are stacked on ONE side; each taps RIGHT into the center trunk at x=0;
    // the trunk then runs STRAIGHT down into the resolved spec — one straight vertical
    // line, no kink, no box crossing (the trunk axis x=0 is clear of every source box).
    fNodes.forEach((b) => {
      line(edges, b.right, b.cy, trunkX, b.cy, 'converge');
    });
    const trunkTop = Math.min(...fNodes.map((b) => b.cy));
    line(edges, trunkX, trunkTop, converge.cx, converge.top - ARROW_H, 'converge');  // straight trunk → spec
    ahDown(edges, converge.cx, converge.top);
    fNodes.forEach((b) => drawBox(nodes, b));
    drawBox(nodes, converge);
    y = converge.bottom;

    /* ---------- 4. process spine ---------- */
    const rows = (DATA.spine || []).map((r, i) => r.parallel
      ? { boxes: r.parallel.map((n, j) => makeBox(n, n.id || ('s' + i + 'b' + j))) }
      : { boxes: [makeBox(r, r.id || ('s' + i))] });
    let prev = { boxes: [converge], cx: converge.cx, bottom: converge.bottom };
    rows.forEach((row) => {
      y += SPINE_GAP;
      if (row.boxes.length > 1) {
        const top = y; let hh = 0;
        if (row.boxes.length === 2) {
          // left branch LEFT-EDGE-ALIGNS with the source field; right branch mirrors its
          // center → the two stay symmetric/equidistant about the spine (ASK).
          const L = row.boxes[0], R = row.boxes[1];
          place(L, colLeft, top); byId[L.id] = L;
          place(R, -L.cx - R.w / 2, top); byId[R.id] = R;
          hh = Math.max(L.h, R.h);
        } else {
          const tot = row.boxes.reduce((s, b) => s + b.w, 0) + BRANCH_GAP_X * (row.boxes.length - 1);
          let bx = -tot / 2;
          row.boxes.forEach((b) => { place(b, bx, top); byId[b.id] = b; bx += b.w + BRANCH_GAP_X; hh = Math.max(hh, b.h); });
        }
        // ORTHOGONAL fan-out: stem down from prev center → a bus line → straight down into each box.
        const busY = (prev.bottom + top) / 2;
        line(edges, prev.cx, prev.bottom, prev.cx, busY, 'edge');
        const lcx = row.boxes[0].cx, rcx = row.boxes[row.boxes.length - 1].cx;
        line(edges, lcx, busY, rcx, busY, 'edge');
        row.boxes.forEach((b) => { line(edges, b.cx, busY, b.cx, b.top - ARROW_H, 'edge'); ahDown(edges, b.cx, b.top); });
        row.boxes.forEach((b) => drawBox(nodes, b));
        prev = { boxes: row.boxes, cx: 0, bottom: top + hh };
        y = top + hh;
      } else {
        const b = row.boxes[0]; place(b, -b.w / 2, y); byId[b.id] = b;
        if (prev.boxes.length > 1) {
          // ORTHOGONAL reconverge: each branch drops to a bus → into the box center.
          const busY = (prev.bottom + b.top) / 2;
          const lcx = prev.boxes[0].cx, rcx = prev.boxes[prev.boxes.length - 1].cx;
          prev.boxes.forEach((p) => line(edges, p.cx, p.bottom, p.cx, busY, 'edge'));
          line(edges, lcx, busY, rcx, busY, 'edge');
          line(edges, b.cx, busY, b.cx, b.top - ARROW_H, 'edge'); ahDown(edges, b.cx, b.top);
        } else arrowDown(edges, b.cx, prev.bottom, b.top, 'edge');
        drawBox(nodes, b);
        prev = { boxes: [b], cx: b.cx, bottom: b.bottom };
        y = b.bottom;
      }
    });

    /* ---------- 5. conformance evaluation — eval sources routed down a LEFT bus into conformance ---------- */
    // The same source nodes (product truth / output obligations / prohibitions) that fed the
    // resolved spec ALSO evaluate the realized result a second time, at conformance. Drawn as
    // real connectors: each taps left out of its box onto a shared bus that runs down into
    // conformance. Dotted/soft so it reads as secondary evaluation, not the primary spine.
    const byTarget = {};
    (DATA.evalEdges || []).forEach((e) => { (byTarget[e.to] = byTarget[e.to] || []).push(e.from); });
    Object.entries(byTarget).forEach(([toId, froms]) => {
      const T = byId[toId]; if (!T) return;
      const srcs = froms.map((f) => byId[f]).filter(Boolean);
      if (!srcs.length) return;
      const topY = Math.min(...srcs.map((s) => s.cy));
      // bus sits left of every box it travels past on the way down (sources + any branch box)
      const passed = Object.values(byId).filter((b) => b.left !== undefined && b.cy > topY - 1 && b.cy < T.cy + 1);
      const busX = Math.min(T.left, ...srcs.map((s) => s.left), ...passed.map((b) => b.left)) - BUS_CLEAR;
      srcs.forEach((s) => {
        line(edges, s.left, s.cy, busX, s.cy, 'edge-tap');                 // source taps left onto the bus
      });
      line(edges, busX, topY, busX, T.cy, 'edge-tap');                     // the bus runs down
      line(edges, busX, T.cy, T.left - ARROW_H, T.cy, 'edge-tap');         // bus → conformance
      edges.appendChild(el('path', { d: `M ${T.left - ARROW_H} ${T.cy - ARROW_W / 2} L ${T.left - ARROW_H} ${T.cy + ARROW_W / 2} L ${T.left} ${T.cy} Z`, class: 'edge-arrowhead' }));
      tag(edges, 'evaluated again at conformance', busX + 8, T.cy - 9, 'start');
      grow(busX - 8, topY);
    });

    /* ---------- 6. future reference carrier (a real chip; "later reused" edge) ---------- */
    if (DATA.futureCarrier && byId[DATA.futureCarrier.from]) {
      const F = byId[DATA.futureCarrier.from];
      const chip = makeBox({ label: DATA.futureCarrier.node, short: DATA.futureCarrier.short, recede: true, detail: DATA.futureCarrier.detail }, 'futureCarrier');
      // future reference lives on the FAR LEFT, in the same vertical lane as the carrier —
      // governed asset feeds it, it feeds back up to the carrier. One clean left-side loop.
      const laneCx = carrier ? carrier.cx : (F.left - 200);
      place(chip, laneCx - chip.w / 2, F.y);
      byId['futureCarrier'] = chip;
      // governed asset → future reference (one horizontal connector leftward)
      line(edges, F.left, F.cy, chip.right + ARROW_H, F.cy, 'edge-return');
      edges.appendChild(el('path', { d: `M ${chip.right + ARROW_H} ${F.cy - ARROW_W / 2} L ${chip.right + ARROW_H} ${F.cy + ARROW_W / 2} L ${chip.right} ${F.cy} Z`, class: 'edge-arrowhead' }));
      if (DATA.futureCarrier.edge) edges.appendChild(el('text', { x: (F.left + chip.right) / 2, y: F.cy - 10, 'text-anchor': 'middle', class: 'node-note' }, [DATA.futureCarrier.edge]));
      drawBox(nodes, chip);
      // future reference → reference carrier (STRAIGHT up the left lane)
      if (carrier) {
        edges.appendChild(el('path', { d: `M ${chip.cx} ${chip.top} L ${chip.cx} ${carrier.bottom + ARROW_H}`, class: 'edge-loop' }));
        edges.appendChild(el('path', { d: `M ${chip.cx - ARROW_W / 2} ${carrier.bottom + ARROW_H} L ${chip.cx + ARROW_W / 2} ${carrier.bottom + ARROW_H} L ${chip.cx} ${carrier.bottom} Z`, class: 'edge-arrowhead' }));
        edges.appendChild(el('text', { x: chip.cx + 8, y: (chip.top + carrier.bottom) / 2, 'text-anchor': 'start', class: 'node-note' }, ['reused as reference input']));
        grow(chip.cx, carrier.bottom);
      }
    }

    Object.values(byId).forEach(growB);

    /* ---------- finalize ---------- */
    const minX = bb.x0 - PAGE_PAD, minY = bb.y0 - PAGE_PAD;
    const width = (bb.x1 + PAGE_PAD) - minX, height = (bb.y1 + PAGE_PAD) - minY;
    svg.setAttribute('width', width); svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);

    /* ---------- interactive explanatory panel (mode = interactive only) ---------- */
    if (MODE === 'interactive') {
      const panel = document.getElementById('flowPanel');
      const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
      const hi = (id, on) => svg.querySelectorAll(`.node-box[data-id="${id}"], .flow-ribbon[data-id="${id}"]`).forEach((n) => n.classList.toggle('hi', on));
      const fill = (b) => {
        if (!panel) return;
        const d = b.detail || {};
        let h = `<div class="fp-title">${esc(b.label)}</div>`;
        if (d.def) h += `<div class="fp-def">${esc(d.def)}</div>`;
        if (d.eg) h += `<div class="fp-eg"><span class="fp-k">e.g.</span> ${esc(d.eg)}</div>`;
        if (d.not) h += `<div class="fp-not"><span class="fp-k">not</span> ${esc(d.not)}</div>`;
        panel.innerHTML = h; panel.classList.add('active');
      };
      const clear = () => { if (!panel) return; panel.classList.remove('active'); panel.innerHTML = panel.dataset.hint || ''; };
      let pinned = null;
      const hitLayer = el('g', { class: 'hit-layer' }); svg.appendChild(hitLayer);
      Object.values(byId).forEach((b) => {
        if (!b.detail) return;
        const r = el('rect', { x: b.left - 5, y: b.top - 5, width: (b.right - b.left) + 10, height: (b.bottom - b.top) + 10, class: 'node-hit', 'data-id': b.id });
        hitLayer.appendChild(r);
        r.addEventListener('mouseenter', () => { hi(b.id, true); if (!pinned) fill(b); });
        r.addEventListener('mouseleave', () => { if (pinned !== b.id) { hi(b.id, false); if (!pinned) clear(); } });
        r.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (pinned === b.id) { pinned = null; hi(b.id, false); clear(); }
          else { if (pinned) hi(pinned, false); pinned = b.id; fill(b); }
        });
      });
      if (panel) { panel.dataset.hint = panel.innerHTML; }
      svg.addEventListener('click', () => { if (pinned) { hi(pinned, false); pinned = null; clear(); } });
    }

    /* ---------- pan / zoom ---------- */
    const wrap = document.getElementById('canvasWrap'), stage = document.getElementById('stage'), pct = document.getElementById('zoomPct');
    let tx = 0, ty = 0, scale = 1;
    function apply() { stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`; if (pct) pct.textContent = Math.round(scale * 100) + '%'; }
    function fit() { const r = wrap.getBoundingClientRect(); const pad = 80; scale = Math.min((r.width - pad) / width, (r.height - pad) / height, 1.2); tx = (r.width - width * scale) / 2; ty = (r.height - height * scale) / 2; apply(); }
    fit(); window.addEventListener('resize', fit);
    const zi = document.getElementById('zoomIn'), zo = document.getElementById('zoomOut'), zf = document.getElementById('zoomFit');
    if (zi) zi.onclick = () => { scale = Math.min(scale * 1.2, 4); apply(); };
    if (zo) zo.onclick = () => { scale = Math.max(scale / 1.2, 0.15); apply(); };
    if (zf) zf.onclick = fit;
    let drag = false, sx0, sy0, tx0, ty0;
    wrap.addEventListener('pointerdown', (ev) => { if (ev.target.closest('.hud, .legend, .caption') || (ev.target.classList && ev.target.classList.contains('node-hit'))) return; drag = true; wrap.classList.add('dragging'); wrap.setPointerCapture(ev.pointerId); sx0 = ev.clientX; sy0 = ev.clientY; tx0 = tx; ty0 = ty; });
    wrap.addEventListener('pointermove', (ev) => { if (!drag) return; tx = tx0 + (ev.clientX - sx0); ty = ty0 + (ev.clientY - sy0); apply(); });
    wrap.addEventListener('pointerup', () => { drag = false; wrap.classList.remove('dragging'); });
    wrap.addEventListener('wheel', (ev) => { ev.preventDefault(); const r = wrap.getBoundingClientRect(); const mx = ev.clientX - r.left, my = ev.clientY - r.top; const f = ev.deltaY > 0 ? 1 / 1.1 : 1.1; const ns = Math.max(0.15, Math.min(4, scale * f)); const k = ns / scale; tx = mx - (mx - tx) * k; ty = my - (my - ty) * k; scale = ns; apply(); }, { passive: false });
  }

  function renderWhenFontsReady(DATA) {
    const fonts = (typeof document !== 'undefined') && document.fonts;
    if (!fonts || typeof fonts.load !== 'function') { render(DATA); return; }
    const needed = ['400 13px "Inter"', '300 13px "Inter"', '300 11px "Inter"', '300 10px "JetBrains Mono"', '300 9px "JetBrains Mono"'];
    Promise.all(needed.map((f) => fonts.load(f).catch(() => null))).then(() => render(DATA)).catch(() => render(DATA));
  }
  window.DIAGRAMS = { render: renderWhenFontsReady };
})();
