/* asset-pipeline-ASK_bounded-generativity.figure.js — AP instance (source-v1 // render-v2, ASK 2026-07-13)
   Derived from the method-ASK bounded-generativity topology @ 2e5d8c4. Per ASK apex ruling (2026-07-13),
   AP copy AND geometry are adapted for the commercial image-production surface under ASK authorization — the
   shared invariant is the TOPOLOGY, the semantic-role mapping (legislative/executive/judicial), the Three
   Functions treatment, and the governance boundary — NOT pixel-identical geometry. method-ASK need not adopt
   AP's geometry; future cross-repo conformance compares topology + semantics, not coordinates or rasters.
   AP-specific adaptations: (1) brief node = three-line box (carries creative intent · grants the aperture);
   (2) chamber + downstream + right frame shifted +14 so the brief->aperture gap = the 36px frame inset;
   (3) "permitted creative variance" raised to clear the aperture arrow; (4) the dotted authorized-judgment rail
   continued from the chamber to the selection ring (no arrowhead) — creative discretion is exercised in
   realization AND at selection (recovers the retired SEQ 2->4 "exercised at selection" relation).
   Consumes design-system-ASK Three Functions by reference (_dsa-tokens/three-functions.css @ DS 8fb82b7):
   legislative = creative-brief box · executive = the candidate-realization chamber (variance = negative cutouts)
   · judicial = selection ring + ratified node. Everything else neutral. */
(function () {
  /* FAIL CLOSED BEFORE ANY LAYOUT. diagrams-fit.js is a DS-owned support file that must be
     vendored alongside this figure and loaded immediately BEFORE it. Checked here, at the top
     of the builder, so a missing helper stops this file before the SVG is constructed — rather
     than leaving a half-built, unpositioned artifact. The message names the figure builder. */
  if (!window.DIAGRAM_FIT || typeof window.DIAGRAM_FIT.compute !== 'function') {
    throw new Error('Diagram fit support is missing. Load diagrams-fit.js before the figure builder.');
  }

  const M = {
    apex:   { label: 'source of intent', sub: 'normative apex supplies', note1: 'purpose + governing standard' },
    grammar:{ label: 'creative brief', note1: 'carries creative intent', note2: 'grants the aperture' },
    field:  { tag: 'candidate realization  ·  image-production span', apertureLo: 'aperture', apertureHi: 'permitted creative variance', variance: 'candidate image variance', judgment: '· · ·  creative discretion where present  · · ·' },
    select: { tag: 'curatorial selection + closure', note1: 'ratifies one candidate', note2: 'aperture closes' },
    govern: { label: 'artifact governance', note: 'binds the accepted result' },
    output: { label: 'governed asset', note: '+ governance record' },
    bracket:'bounded generativity',
  };

  const svgNS = 'http://www.w3.org/2000/svg';
  const W = 1600, H = 620, YM = 320;   // YM = main horizontal axis (source → grammar → aperture → chamber → selection)
  const svg = document.getElementById('svg');
  svg.setAttribute('width', W); svg.setAttribute('height', H);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  function el(name, attrs = {}, kids = []) {
    const e = document.createElementNS(svgNS, name);
    for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v);
    for (const c of kids) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    return e;
  }
  const edges = el('g', { class: 'edges' }), nodes = el('g', { class: 'nodes' });
  svg.append(edges, nodes);

  const AH = 9;
  const headR = (x, y) => el('path', { class: 'edge-arrowhead', d: `M ${x-AH} ${y-AH/1.6} L ${x-AH} ${y+AH/1.6} L ${x} ${y} Z` });
  const headD = (x, y) => el('path', { class: 'edge-arrowhead', d: `M ${x-AH/1.6} ${y-AH} L ${x+AH/1.6} ${y-AH} L ${x} ${y} Z` });
  const headU = (x, y) => el('path', { class: 'edge-arrowhead', d: `M ${x-AH/1.6} ${y+AH} L ${x+AH/1.6} ${y+AH} L ${x} ${y} Z` });
  const box = (x, y, w, h, cls='node-box') => el('rect', { x, y, width:w, height:h, rx:4, ry:4, class:cls });
  const line = (d, cls='edge', dash=null) => el('path', { class:cls, fill:'none', d, 'stroke-dasharray':dash });
  const lbl = (x, y, t, cls='node-label', a='start') => el('text', { x, y, class:cls, 'text-anchor':a }, [t]);
  const note = (x, y, t, a='start') => el('text', { x, y, class:'node-note', 'text-anchor':a }, [t]);
  const tag = (x, y, t, a='middle') => el('text', { x, y, class:'flow-tag', 'text-anchor':a }, [t]);

  /* ===== source of intent / normative apex — OUTSIDE the frame, left · NEUTRAL ===== */
  nodes.append(lbl(140, 250, M.apex.label));
  nodes.append(note(140, 268, M.apex.sub));
  nodes.append(note(140, 286, M.apex.note1));

  /* ===== bounded generativity frame · NEUTRAL ===== */
  const FX = 340, FY = 112, FW = 930, FH = 402;   // x 340-1270, y 112-514; AP widened frame +14 (916->930) so the brief->aperture gap = the 36px frame inset — ASK-authorized accommodation for the AP surface
  nodes.append(el('rect', { x:FX, y:FY, width:FW, height:FH, rx:14, ry:14, class:'flow-group' }));
  nodes.append(tag(FX + FW/2, FY - 14, M.bracket));

  /* ===== source beam · NEUTRAL → grammar/brief = LEGISLATIVE ===== */
  edges.append(line(`M 146 ${YM} L 372 ${YM}`));
  edges.append(headR(372, YM));
  nodes.append(box(376, YM-38, 164, 76, 'node-box fn-leg'));   // AP three-line node (150->164 w, 58->76 h) to carry the brief's two-part note without loss — ASK-authorized label-accommodation for the AP surface
  nodes.append(lbl(392, YM-18, M.grammar.label));
  nodes.append(note(392, YM, M.grammar.note1));
  nodes.append(note(392, YM+18, M.grammar.note2));

  /* ===== grammar/brief grants the aperture → beam · NEUTRAL → chamber = EXECUTIVE apparatus ===== */
  const CX = 590, CY = 184, CW = 428, CH = 250;    // chamber shifted +14 (576->590) so the aperture ↕ arrow (CX-14 = 576) sits 36px right of the widened brief box; top aligned to artifact-governance (y=184).
  edges.append(line(`M 540 ${YM} L 584 ${YM}`));   // brief box right (540) -> chamber; 36px gap to the aperture ↕ arrow at CX-14 (576)
  edges.append(headR(588, YM));

  /* variance glyph geometry — used twice: as black holes in the executive mask, and as neutral outlines on top */
  const glyphs = [   // 7 marks — plurality/heterogeneity/non-finality without a tidy matrix (top-left cube + one bottom circle removed per ASK)
    { t:'rect',   x:653, y:226, w:30, h:30, rx:2, rot:'rotate(45 668 241)' },   // diamond, top  (x +14)
    { t:'circle', cx:760, cy:244, r:15 },                                       // circle, top   (cx +14)
    { t:'path',   d:'M 852 230 L 870 260 L 834 260 Z' },                        // triangle, top (x +14)
    { t:'rect',   x:934, y:233, w:28, h:28, rx:4 },                             // square, top   (x +14)
    { t:'rect',   x:685, y:322, w:30, h:30, rx:4 },                             // cube, bottom  (x +14)
    { t:'rect',   x:797, y:326, w:26, h:26, rx:2, rot:'rotate(45 810 339)' },   // diamond, bottom (x +14)
    { t:'circle', cx:920, cy:337, r:13 },                                       // circle, bottom (cx +14)
  ];
  const glyphEl = (g, attrs) =>
    g.t === 'rect'   ? el('rect',   Object.assign({ x:g.x, y:g.y, width:g.w, height:g.h, rx:g.rx, ry:g.rx, transform:g.rot }, attrs)) :
    g.t === 'circle' ? el('circle', Object.assign({ cx:g.cx, cy:g.cy, r:g.r }, attrs)) :
                       el('path',   Object.assign({ d:g.d }, attrs));

  /* executive mask: chamber white (wash shows), glyphs black (punched out as holes) */
  const defs = el('defs');
  const mask = el('mask', { id:'exe-holes', maskUnits:'userSpaceOnUse', x:CX-4, y:CY-4, width:CW+8, height:CH+8 });
  mask.append(el('rect', { x:CX, y:CY, width:CW, height:CH, rx:8, ry:8, fill:'#fff' }));
  glyphs.forEach(g => mask.append(glyphEl(g, { fill:'#000' })));
  defs.append(mask);
  svg.insertBefore(defs, edges);

  /* chamber = the EXECUTIVE apparatus: executive fill (30%, from the consuming CSS) with the glyphs punched OUT as holes, + executive stroke */
  nodes.append(el('rect', { x:CX, y:CY, width:CW, height:CH, rx:8, ry:8, class:'fn-exe-wash', mask:'url(#exe-holes)' }));
  nodes.append(el('rect', { x:CX, y:CY, width:CW, height:CH, rx:8, ry:8, class:'flow-group fn-exe-chamber' }));
  nodes.append(el('text', { x: CX + CW/2, y: CY + CH + 20, class:'section-tag', 'text-anchor':'middle' }, [M.field.tag]));

  /* ---- aperture: opening in the chamber's LEFT edge · NEUTRAL geometry (a quantity, not an actor) ---- */
  const AP = 74;   // aperture half-height (opens AP above and below the entry)
  edges.append(line(`M ${CX-14} ${YM-AP} L ${CX-14} ${YM+AP}`));   // ↕ permitted-variance dimension
  edges.append(headU(CX-14, YM-AP));
  edges.append(headD(CX-14, YM+AP));
  edges.append(line(`M ${CX} ${YM-AP} L ${CX+18} ${YM-10}`));       // iris blade (upper)
  edges.append(line(`M ${CX} ${YM+AP} L ${CX+18} ${YM+10}`));       // iris blade (lower)
  // aperture / permitted variance — two labels flanking the arrow's centre (YM); the ↕ passes through the empty gap between them (no "·"), words held in place
  const apLoY = YM + 38, apHiY = YM - 100;   // AP: apHiY raised (-74 -> -100) so the longer "permitted creative variance" clears the ↕ arrow entry and the "aperture" label — matches method's flanking separation
  nodes.append(el('text', { x: CX-28, y: apLoY, class:'flow-tag', 'text-anchor':'middle',
    transform:`rotate(-90 ${CX-28} ${apLoY})` }, [M.field.apertureLo]));   // "aperture" (lower)
  nodes.append(el('text', { x: CX-28, y: apHiY, class:'flow-tag', 'text-anchor':'middle',
    transform:`rotate(-90 ${CX-28} ${apHiY})` }, [M.field.apertureHi]));   // "permitted variance" (upper)

  /* ---- variance candidates — NEGATIVE cutouts through the executive wash, neutral outlines
         (executive produces variance; the glyphs are content, NOT executive-function objects) ---- */
  glyphs.forEach(g => nodes.append(glyphEl(g, { class:'node-box fn-cut' })));
  nodes.append(tag(CX + CW/2, 208, M.field.variance));   // AP: centred in the chamber (was right-anchored) so the longer "candidate image variance" stays inside the box

  edges.append(line(`M 620 396 L 988 396`, 'edge', '1 5'));       // dotted authorized-judgment path · NEUTRAL (shifted +14 with the chamber)
  nodes.append(note(CX + CW/2, 390, M.field.judgment, 'middle'));

  /* ===== selection + closure = JUDICIAL — ring + ratified candidate ===== */
  const SC = { x: 1144, y: YM };   // shifted +14 with the chamber; centred under the governance box
  edges.append(line(`M ${CX+CW} ${YM} L ${SC.x-46} ${YM}`));
  edges.append(headR(SC.x-46, YM));
  edges.append(el('circle', { class:'edge fn-jud-ring', cx:SC.x, cy:SC.y, r:42, fill:'none' }));
  // AP (ASK apex ruling 2026-07-13): creative discretion is exercised in realization AND at selection —
  // dotted continuation of the judgment rail from the chamber to the ring's lower-left, NO arrowhead, NEUTRAL
  // (not a process flow into selection — the same authorized-judgment capacity at another site; recovers the retired SEQ 2->4 relation)
  edges.append(line(`M 988 396 L ${SC.x-30} ${SC.y+30}`, 'edge', '1 5'));
  nodes.append(box(SC.x-26, SC.y-26, 52, 52, 'node-box fn-jud'));
  nodes.append(tag(SC.x, 394, M.select.tag));
  nodes.append(note(SC.x, 412, M.select.note1, 'middle'));
  nodes.append(note(SC.x, 429, M.select.note2, 'middle'));

  /* ===== artifact governance — DOWNSTREAM, NEUTRAL (not a fourth color); two-line 58px node,
         top aligned to the chamber top (y=190) ===== */
  edges.append(line(`M ${SC.x} ${SC.y-42} L ${SC.x} 246`));
  edges.append(headU(SC.x, 242));
  nodes.append(box(1054, 184, 180, 58));   // shifted +14; width 180 (centre 1144 = selection axis) so the two-line subtext fits
  nodes.append(lbl(1070, 207, M.govern.label));
  nodes.append(note(1070, 225, M.govern.note));

  /* ===== governed artifact + record — OUTSIDE the frame · NEUTRAL; two-line 58px node,
         top-aligned to the artifact-governance box (y=190) ===== */
  edges.append(line(`M 1234 213 L 1298 213`));
  edges.append(headR(1298, 213));   // arrowhead to the governed box; the frame edge (1270) sits symmetric between governance (36px inside) and governed (36px outside)
  nodes.append(box(1306, 184, 150, 58));   // shifted +14; width 150 (tight to the label)
  nodes.append(lbl(1322, 207, M.output.label));
  nodes.append(note(1322, 225, M.output.note));

  /* ===== tighten the viewBox to the drawn content (+ uniform margin) so the figure
     FILLS the export frame instead of the fixed 1600×620 canvas with dead padding —
     the content is width-limited, so a tighter box scales it up (bigger diagram,
     page margins held constant) ===== */
  const VB_PAD = 28;
  const bb = svg.getBBox();
  const vbX = Math.floor(bb.x - VB_PAD), vbY = Math.floor(bb.y - VB_PAD);
  const vbW = Math.ceil(bb.width + 2*VB_PAD), vbH = Math.ceil(bb.height + 2*VB_PAD);
  svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
  svg.setAttribute('width', vbW);
  svg.setAttribute('height', vbH);

  /* ---- pan / zoom / fit + drag + wheel (interaction is local; FIT is DS-owned) ---- */
  const wrap = document.getElementById('canvasWrap'), stage = document.getElementById('stage'), pct = document.getElementById('zoomPct');
  if (wrap && stage) {
    let tx=0, ty=0, sc=1;
    /* Interaction floor. Ordinary zoom-out floor is this figure's historical 0.2 base, but the
       DS panel-aware fit can land BELOW it on a constrained viewport; a fixed floor above the
       fitted scale would make zoom-out ENLARGE the figure (direction reversal). So the live floor
       is the lower of the base and the most recent Fit, refreshed by fit() (initial, fonts.ready,
       resize). */
    const BASE_MIN_SCALE = 0.2;
    let fittedMinScale = BASE_MIN_SCALE;
    const apply = () => { stage.style.transform = `translate(${tx}px,${ty}px) scale(${sc})`; if (pct) pct.textContent = Math.round(sc*100)+'%'; };
    /* Fit comes from the design-system helper (diagrams-fit.js; presence checked at the top of
       this file). This figure previously carried its own copy of the DS fit arithmetic — which is
       exactly why the panel-band defect had to be fixed per-figure. The duplicated arithmetic is
       retired; the figure's caller-owned inputs are kept: 90px total clearance (DS default 80),
       1.3 max scale (DS default 1.2), and ZERO-origin bounds even though the tightened viewBox
       origin is negative — the transform target is the stage div, whose box starts at 0 in CSS
       space, so the viewBox origin never enters it. */
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
       the vendored faces use font-display:swap and the DS helper measures the LIVE caption / legend
       / HUD rectangles, which change size across the swap. */
    fit();
    const fonts = document.fonts;
    if (fonts && fonts.ready && typeof fonts.ready.then === 'function') {
      fonts.ready.then(fit).catch(() => {});
    }
    window.addEventListener('resize', fit);
    const zi=document.getElementById('zoomIn'), zo=document.getElementById('zoomOut'), zf=document.getElementById('zoomFit');
    if (zi) zi.onclick=()=>{sc=Math.min(sc*1.2,4);apply();};
    if (zo) zo.onclick=()=>{sc=Math.max(sc/1.2,fittedMinScale);apply();};
    if (zf) zf.onclick=fit;
    let dragging=false, px0=0, py0=0, tx0=0, ty0=0;
    wrap.addEventListener('pointerdown', (ev)=>{ if (ev.target.closest('.hud, .legend, .caption')) return;
      dragging=true; wrap.classList.add('dragging'); wrap.setPointerCapture(ev.pointerId); px0=ev.clientX; py0=ev.clientY; tx0=tx; ty0=ty; });
    wrap.addEventListener('pointermove', (ev)=>{ if(!dragging) return; tx=tx0+(ev.clientX-px0); ty=ty0+(ev.clientY-py0); apply(); });
    const endDrag=()=>{ dragging=false; wrap.classList.remove('dragging'); };
    wrap.addEventListener('pointerup', endDrag); wrap.addEventListener('pointercancel', endDrag);
    wrap.addEventListener('wheel', (ev)=>{ ev.preventDefault(); const r=wrap.getBoundingClientRect(), mx=ev.clientX-r.left, my=ev.clientY-r.top;
      const ns=Math.max(fittedMinScale, Math.min(4, sc*(ev.deltaY>0 ? 1/1.1 : 1.1))), k=ns/sc; tx=mx-(mx-tx)*k; ty=my-(my-ty)*k; sc=ns; apply(); }, { passive:false });
  }
})();
