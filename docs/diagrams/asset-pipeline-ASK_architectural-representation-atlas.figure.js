/* asset-pipeline-ASK_architectural-representation-atlas.figure.js — bespoke orientation figure (source-v1 // render-v1, 2026-07-14)
   An architecture-DECONFLICTION artifact, not another architecture model. It maps the repo's EXISTING
   architectural representations so a reader can tell, per view: the object it depicts, the question it
   answers, the live surface that carries it, and where that view's authority ends. Flat and non-causal —
   containment and labels, not flow arrows; named cards with restrained geometry cues, not reproductions.

   Four represented objects (the top-level taxonomy; prose home = docs/architecture.md §Source-of-Truth
   Routing + docs/diagrams/README.md):
     1  governed visual-payload information architecture  (the domain architecture asset-pipeline-ASK develops/delivers)
          principal payload views : ontology / Axis A · visual payload architecture
          supporting orthogonal    : inheritance / Axis B
          runtime / Axis D         : prose + lifecycle artifacts — no dedicated axis diagram at present
     2  generative-governance system model  (the topology it instantiates) : bounded generativity
     3  project / repository information architecture       : architecture tree
     4  architecture state                                  : interactive IA state spine
     muted historical note : Axis C / shared-versus-variable — historical / superseded, no live diagram

   Self-contained renderer (no shared layout engine, not engine-rendered) on the model's bespoke-figure
   substrate; reuses the shared diagrams.css / export-png.js only. Neutral palette — no Three Functions
   (this figure is classificatory, not causal). Bounded generativity remains the sole live system-model
   topology; this atlas does not create a second one, and does not collapse the architectural axes. */
(function () {
  /* FAIL CLOSED BEFORE ANY LAYOUT. diagrams-fit.js is a DS-owned support file that must be
     vendored alongside this figure and loaded immediately BEFORE it. Checked here, at the top
     of the builder, so a missing helper stops this file before the SVG is constructed. The
     message names the figure builder. */
  if (!window.DIAGRAM_FIT || typeof window.DIAGRAM_FIT.compute !== 'function') {
    throw new Error('Diagram fit support is missing. Load diagrams-fit.js before the figure builder.');
  }

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('svg');
  const W = 1680, H = 880;
  svg.setAttribute('width', W); svg.setAttribute('height', H);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  function el(name, attrs = {}, kids = []) {
    const e = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v);
    for (const c of kids) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    return e;
  }
  const g = el('g', { class: 'atlas' });
  svg.append(g);

  const rect = (x, y, w, h, cls = 'node-box', rx = 6) => el('rect', { x, y, width: w, height: h, rx, ry: rx, class: cls });
  const line = (d, cls = 'edge', dash = null) => el('path', { class: cls, fill: 'none', d, 'stroke-dasharray': dash });
  const circle = (cx, cy, r, cls) => el('circle', { cx, cy, r, class: cls });
  const txt = (x, y, t, cls = 'node-label', a = 'start') => el('text', { x, y, class: cls, 'text-anchor': a }, [t]);

  /* ---------- regions ---------- */
  function region(r) {
    g.append(rect(r.x, r.y, r.w, r.h, 'flow-group', 14));
    g.append(txt(r.x + 22, r.y + 30, r.num, 'section-tag'));
    g.append(txt(r.x + 46, r.y + 31, r.title, 'node-label'));
    g.append(txt(r.x + 46, r.y + 51, r.sub, 'node-note'));
  }

  /* ---------- cards ---------- */
  function card(c) {
    // uniform border weight across all live cards; dashed only for the no-live-diagram (absent) card
    const cls = c.kind === 'absent' ? 'node-box held' : 'node-box';
    g.append(rect(c.x, c.y, c.w, c.h, cls, 6));
    const nameCls = c.kind === 'absent' ? 'node-label held' : 'node-label';
    g.append(txt(c.x + 20, c.y + 28, c.name, nameCls));
    g.append(txt(c.x + c.w - 18, c.y + 26, c.tagRight, 'flow-tag', 'end'));
    let qy = c.y + 56;
    for (const ql of c.q) { g.append(txt(c.x + 20, qy, ql, 'node-note')); qy += 18; }
    if (c.path) g.append(txt(c.x + 20, c.y + c.h - 16, c.path, 'atlas-path'));
    else if (c.absentNote) g.append(txt(c.x + 20, c.y + c.h - 16, c.absentNote, 'node-note legacy'));
    // silhouette — restrained geometry cue, right side, drawn AFTER the card fill so it reads on top
    const sx = c.x + c.w - 62, sy = c.y + c.h / 2 + 8;
    (SIL[c.sil] || (() => {}))(sx, sy);
  }

  /* ---------- restrained geometry silhouettes (cues, not reproductions) ---------- */
  const SIL = {
    tree(cx, cy) {
      const rootX = cx - 40, brX = cx - 2, leafX = cx + 24;
      g.append(rect(rootX, cy - 7, 14, 14, 'atlas-sil', 2));
      g.append(line(`M ${rootX + 14} ${cy} L ${brX} ${cy}`, 'atlas-sil'));
      g.append(line(`M ${brX} ${cy - 18} L ${brX} ${cy + 18}`, 'atlas-sil'));
      [-18, 0, 18].forEach(dy => {
        g.append(line(`M ${brX} ${cy + dy} L ${leafX} ${cy + dy}`, 'atlas-sil'));
        g.append(rect(leafX, cy + dy - 5, 15, 10, 'atlas-sil', 2));
      });
    },
    flow(cx, cy) {
      const lX = cx - 40, mX = cx + 26;
      g.append(circle(lX + 5, cy - 18, 5, 'atlas-sil'));
      g.append(rect(lX, cy - 5, 11, 11, 'atlas-sil', 1));
      g.append(el('path', { class: 'atlas-sil', fill: 'none', d: `M ${lX + 5} ${cy + 12} L ${lX + 12} ${cy + 24} L ${lX - 2} ${cy + 24} Z` }));
      [-18, 0, 18].forEach(dy => g.append(line(`M ${lX + 14} ${cy + dy} L ${mX} ${cy}`, 'atlas-sil')));
      g.append(rect(mX, cy - 9, 18, 18, 'atlas-sil', 2));
    },
    ladder(cx, cy) {
      g.append(line(`M ${cx} ${cy - 26} L ${cx} ${cy + 26}`, 'atlas-sil'));
      [[-24, 50], [-8, 42], [8, 34], [24, 26]].forEach(([dy, w]) =>
        g.append(rect(cx - w / 2, cy + dy - 5, w, 11, 'atlas-sil', 2)));
    },
    topology(cx, cy) {
      g.append(rect(cx - 40, cy - 24, 80, 48, 'atlas-sil-soft', 8));
      g.append(rect(cx - 22, cy - 12, 22, 24, 'atlas-sil', 3));
      g.append(line(`M ${cx - 26} ${cy - 8} L ${cx - 26} ${cy + 8}`, 'atlas-sil'));   // aperture tick
      g.append(line(`M ${cx} ${cy} L ${cx + 14} ${cy}`, 'atlas-sil'));
      g.append(circle(cx + 24, cy, 8, 'atlas-sil'));
    },
    spine(cx, cy) {
      g.append(line(`M ${cx - 38} ${cy} L ${cx + 38} ${cy}`, 'atlas-sil'));
      [[-30, 'atlas-dot'], [-10, 'atlas-sil'], [10, 'atlas-dot'], [30, 'atlas-dot']].forEach(([dx, k]) =>
        g.append(circle(cx + dx, cy, 4.5, k)));
    },
    absent(cx, cy) {
      g.append(rect(cx - 38, cy - 20, 76, 40, 'atlas-sil-soft', 6));
      g.append(line(`M ${cx - 16} ${cy} L ${cx + 16} ${cy}`, 'atlas-sil-soft', '2 4'));
    },
  };

  /* =========================================================================
     LAYOUT — two aligned bands on one shared left/right margin (x 48 → 1632).
     Band A: the governed visual-payload IA across the full width — 4 cards in one
     row, tops aligned. Band B: the three other objects side by side — 3 cards in
     one row, tops aligned. Card top-edges line up within each band; the bands and
     the bottom statement share the same margins.
     ========================================================================= */
  // ===== BAND A — Region 1: governed visual-payload information architecture (full width) =====
  region({ num: '1', x: 48, y: 96, w: 1584, h: 300,
    title: 'governed visual-payload information architecture',
    sub: 'the domain architecture asset-pipeline-ASK develops and delivers' });
  g.append(txt(70, 192, 'principal payload views', 'flow-tag'));
  g.append(txt(872, 192, 'supporting orthogonal views', 'flow-tag'));
  const AY = 214, AH = 150, AW = 358;
  card({ x: 70,   y: AY, w: AW, h: AH, kind: 'principal', sil: 'tree',
    name: 'Ontology', tagRight: 'AXIS A',
    q: ['what kinds of information does', 'the definition layer structure?'],
    path: 'asset-pipeline-ASK_ontology-tree.html' });
  card({ x: 452,  y: AY, w: AW, h: AH, kind: 'principal', sil: 'flow',
    name: 'Visual Payload Architecture', tagRight: 'PAYLOAD VIEW',
    q: ['what an image / set carries, how', 'sources converge, across the', 'spec → governance lifecycle?'],
    path: 'asset-pipeline-ASK_visual-payload-architecture.html' });
  card({ x: 872,  y: AY, w: AW, h: AH, kind: 'support', sil: 'ladder',
    name: 'Inheritance', tagRight: 'AXIS B',
    q: ['where does information live,', 'inherit, override, and combine?'],
    path: 'asset-pipeline-ASK_inheritance-spine.html' });
  card({ x: 1254, y: AY, w: AW, h: AH, kind: 'absent', sil: 'absent',
    name: 'Runtime', tagRight: 'AXIS D',
    q: ['when does information arise or', 'change role in the flow?'],
    absentNote: 'prose + lifecycle · no axis diagram' });

  // ===== BAND B — Regions 2/3/4 side by side (three objects, one aligned row) =====
  const BY = 420, BRH = 240, BCY = 506, BCH = 134, BW = 509, BCW = 465;
  region({ num: '2', x: 48,   y: BY, w: BW,  h: BRH,
    title: 'generative-governance system model',
    sub: 'the topology asset-pipeline-ASK instantiates' });
  region({ num: '3', x: 585,  y: BY, w: BW,  h: BRH,
    title: 'project / repository information architecture',
    sub: 'the structure of asset-pipeline-ASK as a repo' });
  region({ num: '4', x: 1122, y: BY, w: 510, h: BRH,
    title: 'architecture state',
    sub: 'current maturity + evidence, not structure' });
  card({ x: 70,   y: BCY, w: BCW, h: BCH, kind: 'support', sil: 'topology',
    name: 'Bounded Generativity', tagRight: 'SYSTEM-MODEL TOPOLOGY',
    q: ['how is generative execution bounded, its', 'aperture filled with variance, then judged,', 'selected, closed, and governed?'],
    path: 'asset-pipeline-ASK_bounded-generativity.html' });
  card({ x: 607,  y: BCY, w: BCW, h: BCH, kind: 'support', sil: 'tree',
    name: 'Architecture tree', tagRight: 'REPOSITORY VIEW',
    q: ['where do documents, artifacts,', 'surfaces, and plateau structure live?'],
    path: 'asset-pipeline-ASK_architecture-tree.html' });
  card({ x: 1144, y: BCY, w: BCW, h: BCH, kind: 'support', sil: 'spine',
    name: 'Information architecture — state', tagRight: 'STATE · INTERACTIVE',
    q: ['what is earned, held, or deflated', '— and where?'],
    path: 'interactive/asset-pipeline-ASK_ia-state-spine.html' });

  /* ---------- bottom band: purpose line, governing statement, muted historical note ---------- */
  g.append(line('M 48 692 L 1632 692', 'atlas-rule'));
  g.append(txt(52, 714, 'for each representation — the object it depicts · the question it answers · its live surface · where its authority ends', 'flow-tag'));
  const gov = [
    'asset-pipeline-ASK is represented through several orthogonal views of different objects: the governed visual-payload',
    'architecture it develops, the bounded-generativity topology it instantiates, the project / repository architecture that',
    'carries the work, and the current evidence state of that architecture.',
    'No single diagram is the master picture.',
  ];
  let gy = 742;
  gov.forEach((t, i) => { g.append(txt(52, gy, t, i === 3 ? 'atlas-gov-em' : 'atlas-gov')); gy += 21; });
  g.append(txt(52, 828, 'historical / superseded  —  Axis C · shared vs variable  —  no live diagram', 'flow-tag'));

  /* ---------- tighten viewBox to content + pan / zoom / fit (mirrors the shared figures) ---------- */
  const VB_PAD = 30;
  const bb = svg.getBBox();
  const vbX = Math.floor(bb.x - VB_PAD), vbY = Math.floor(bb.y - VB_PAD);
  const vbW = Math.ceil(bb.width + 2 * VB_PAD), vbH = Math.ceil(bb.height + 2 * VB_PAD);
  svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
  svg.setAttribute('width', vbW); svg.setAttribute('height', vbH);

  const wrap = document.getElementById('canvasWrap'), stage = document.getElementById('stage'), pct = document.getElementById('zoomPct');
  if (wrap && stage) {
    let tx = 0, ty = 0, sc = 1;
    /* Interaction floor. Ordinary zoom-out floor is this figure's historical 0.2 base, but the
       DS panel-aware fit can land BELOW it on a constrained viewport; a fixed floor above the
       fitted scale would make zoom-out ENLARGE the figure (direction reversal). So the live floor
       is the lower of the base and the most recent Fit, refreshed by fit() (initial, fonts.ready,
       resize). */
    const BASE_MIN_SCALE = 0.2;
    let fittedMinScale = BASE_MIN_SCALE;
    const apply = () => { stage.style.transform = `translate(${tx}px,${ty}px) scale(${sc})`; if (pct) pct.textContent = Math.round(sc * 100) + '%'; };
    /* Fit comes from the design-system helper (diagrams-fit.js; presence checked at the top of
       this file). The figure previously carried its own copy of the DS fit arithmetic; the
       duplicated arithmetic is retired and its caller-owned inputs kept: 90px total clearance
       (DS default 80), 1.3 max scale (DS default 1.2), and ZERO-origin bounds even though the
       tightened viewBox origin is negative — the transform target is the stage div, whose box
       starts at 0 in CSS space, so the viewBox origin never enters it. */
    const fit = () => {
      const f = window.DIAGRAM_FIT.compute({
        wrap,
        bounds: { minX: 0, minY: 0, maxX: vbW, maxY: vbH },
        clearanceX: 90, clearanceY: 90, maxScale: 1.3, gutter: 26
      });
      fittedMinScale = Math.min(BASE_MIN_SCALE, f.scale);
      sc = f.scale; tx = f.tx; ty = f.ty; apply();
    };
    /* Fit immediately so the figure is never left unpositioned, then refit once the webfonts land:
       font-display:swap changes the caption / legend / HUD metrics the DS helper measures. */
    fit();
    const fonts = document.fonts;
    if (fonts && fonts.ready && typeof fonts.ready.then === 'function') {
      fonts.ready.then(fit).catch(() => {});
    }
    window.addEventListener('resize', fit);
    const zi = document.getElementById('zoomIn'), zo = document.getElementById('zoomOut'), zf = document.getElementById('zoomFit');
    if (zi) zi.onclick = () => { sc = Math.min(sc * 1.2, 4); apply(); };
    if (zo) zo.onclick = () => { sc = Math.max(sc / 1.2, fittedMinScale); apply(); };
    if (zf) zf.onclick = fit;
    let dragging = false, px0 = 0, py0 = 0, tx0 = 0, ty0 = 0;
    wrap.addEventListener('pointerdown', (ev) => { if (ev.target.closest('.hud, .legend, .caption')) return;
      dragging = true; wrap.classList.add('dragging'); wrap.setPointerCapture(ev.pointerId); px0 = ev.clientX; py0 = ev.clientY; tx0 = tx; ty0 = ty; });
    wrap.addEventListener('pointermove', (ev) => { if (!dragging) return; tx = tx0 + (ev.clientX - px0); ty = ty0 + (ev.clientY - py0); apply(); });
    const endDrag = () => { dragging = false; wrap.classList.remove('dragging'); };
    wrap.addEventListener('pointerup', endDrag); wrap.addEventListener('pointercancel', endDrag);
    wrap.addEventListener('wheel', (ev) => { ev.preventDefault(); const r = wrap.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
      const ns = Math.max(fittedMinScale, Math.min(4, sc * (ev.deltaY > 0 ? 1 / 1.1 : 1.1))), k = ns / sc; tx = mx - (mx - tx) * k; ty = my - (my - ty) * k; sc = ns; apply(); }, { passive: false });
  }
})();
