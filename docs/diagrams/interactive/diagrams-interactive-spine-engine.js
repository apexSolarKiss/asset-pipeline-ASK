/* diagrams-interactive-spine-engine.js — interactive engine for the IA state spine.

   design-system-ASK Class A *interactive* diagram pattern — the interactive sibling
   of the static diagram-static-H / diagram-static-V scaffolds. Vanilla JS + SVG,
   self-contained, offline. A navigable, stateful information-architecture surface:
   a vertical spine of layers with mode / question / external branches, each node
   colored by its state, with hover/click selection, a state inspector, pan/zoom,
   and a legend.

   Consumes the ASK Spectral State role tokens (--state-*) by reference for node
   color (state only) and the design-system foundation tokens for chrome. The
   consuming project owns its source data (window.IA_STATE_SPINE) + HTML chrome;
   this engine / CSS / export are design-system-owned — do not edit them.

   Public: window.IA_SPINE.render(window.IA_STATE_SPINE)
           window.IA_SPINE.report()  a read-only account of the camera, the chrome arrangement
                                     and the last Fit (diagnostics and the behavior harness)
   Requires diagrams-fit.js and diagrams-pointer.js loaded before it (it fails closed otherwise).
*/
(function () {
  'use strict';
  /* FAIL-CLOSED on a partial re-vendor. diagrams-fit.js is a DS-owned support file that
     must be copied alongside this engine and loaded immediately BEFORE it. A silent
     legacy fallback is deliberately NOT provided: a consumer that vendored the engine
     without the helper would then look current while keeping the old panel-collision
     geometry. Fail visibly instead. */
  if (!window.DIAGRAM_FIT || typeof window.DIAGRAM_FIT.compute !== 'function') {
    throw new Error('Diagram fit support is missing. Load diagrams-fit.js before the diagram engine.');
  }
  /* FAIL-CLOSED likewise on the shared pointer controller. diagrams-pointer.js is the DS-owned
     generated mirror of patterns/_diagram-shared/diagrams-pointer.js and must load BEFORE this
     engine. No mouse-only fallback is kept: a consumer that re-vendored the engine without it
     would look current while touch could not pan or pinch the stage. */
  if (!window.DIAGRAM_POINTER || typeof window.DIAGRAM_POINTER.attach !== 'function') {
    throw new Error('Diagram pointer support is missing. Load diagrams-pointer.js before the diagram engine.');
  }
  var gestures = null;                                   // the live controller's AbortController
  var NS = 'http://www.w3.org/2000/svg';

  /* ---------- RESPONSIVE CHROME ----------
     The inspector, legend, caption and HUD share the canvas edges, and none of them reserved
     room for another: on a phone they landed on top of each other, and a populated inspector ran
     down over the legend. This adapter composes them as one arrangement. It follows the static
     patterns' responsive chrome (diagrams-chrome.js) in everything a reader meets: the trigger
     grammar, one panel open at a time, aria-expanded and hidden set together, Escape, the band
     beside or above the HUD, and an open panel that scrolls inside the room it has. It differs
     only where the spine's anatomy differs: the panels keep their own corners while the canvas
     holds them apart, and the decision measures that bottom row and the inspector's column.

       WIDE     every panel open in its place. The caption is centered in the slot between the HUD
                at its widest and the legend, and the inspector scrolls inside the room above the
                legend. It holds while that slot takes CAPTION_MIN, that room takes INSPECT_MIN,
                and keeping the panels open costs the drawing little: the wide Fit keeps at least
                WIDE_KEEP of the scale the compact arrangement would give it. On a tall, narrow
                window or a tablet held upright the inspector's lane would otherwise take most of
                the drawing's width while the canvas has height to spare.
       COMPACT  otherwise. The panels close behind About, Legend and Inspector triggers, which
                this adapter adds and which sit beside the HUD where the band has room and
                directly above it where it does not. At most one panel opens, upward from the
                band across the canvas, inside the room between the canvas top and the band
                (never more than OPEN_CAP of the canvas). Entering compact closes every panel, so
                the first view gives the drawing the canvas; staying compact keeps the reader's
                panel and its scroll position.

     The HUD at its widest is the widest it has been: the exporter adds its buttons after the
     first render, and a button's label shrinks while it exports. Measuring the widest keeps the
     arrangement from changing under an export. The panels stay the same authored elements in
     every state, so the PNG export reads them unchanged. */
  var EDGE = 18, GAP = 8, SIDE = 12, SLOT_GUTTER = 18;
  var CAPTION_MIN = 240, CAPTION_MAX = 420, INSPECT_MIN = 160, OPEN_CAP = 0.6, WIDE_KEEP = 0.8;
  var CLEAR_TOLERANCE = 0.5;                             // px of the Fit gutter (see fitResult)
  var PANELS = [['caption', 'About', 'spineCaption'], ['legend', 'Legend', 'spineLegend'], ['inspector', 'Inspector', 'inspector']];
  var chrome = null;                                     // the page's one chrome adapter

  function rendered(e) { return !!e && e.getClientRects().length > 0; }
  function focusQuietly(e) { try { e.focus({ preventScroll: true }); } catch (x) { e.focus(); } }

  function makeChrome(wrap) {
    var pairs = [];
    PANELS.forEach(function (d) {
      var p = wrap.querySelector(':scope > .' + d[0]);
      if (!p) return;
      if (!p.id) p.id = d[2];
      pairs.push({ p: p, word: d[1] });
    });
    if (!pairs.length) return null;
    var hud = wrap.querySelector(':scope > .hud');
    var legend = wrap.querySelector(':scope > .legend');
    var caption = wrap.querySelector(':scope > .caption');
    var row = wrap.querySelector(':scope > .spine-triggers');
    if (!row) { row = document.createElement('div'); row.className = 'spine-triggers'; wrap.appendChild(row); }
    pairs.forEach(function (x) {
      var t = row.querySelector('[aria-controls="' + x.p.id + '"]');
      if (!t) {
        t = document.createElement('button');
        t.type = 'button';
        t.className = 'spine-trigger surface-disclosure-trigger';
        t.setAttribute('aria-controls', x.p.id);
        t.setAttribute('aria-expanded', 'true');
        var l = document.createElement('span'); l.className = 'surface-disclosure-label'; l.textContent = x.word;
        var ind = document.createElement('span'); ind.className = 'surface-disclosure-indicator';
        ind.setAttribute('aria-hidden', 'true'); ind.textContent = '▼';
        t.appendChild(l); t.appendChild(ind); row.appendChild(t);
      }
      x.t = t;
    });
    var mode = null, hudMax = 0, listener = null, scorer = null;

    function setOpen(x, on) {
      if (!on && x.p.contains(document.activeElement)) focusQuietly(x.t);
      x.t.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) x.p.removeAttribute('hidden'); else x.p.setAttribute('hidden', '');
    }
    function openPair() {
      if (mode !== 'compact') return null;
      for (var i = 0; i < pairs.length; i++) if (!pairs[i].p.hidden) return pairs[i];
      return null;
    }
    function hudWidth() {
      if (!hud || !rendered(hud)) return 0;
      hudMax = Math.max(hudMax, hud.offsetWidth);
      return hudMax;
    }

    /* The compact band and the open panel's room. */
    function place() {
      var H = wrap.clientHeight, W = wrap.clientWidth;
      var hudH = hud && rendered(hud) ? hud.offsetHeight : 0;
      var rowW = 0;
      for (var i = 0; i < pairs.length; i++) rowW += pairs[i].t.offsetWidth + (i ? GAP : 0);
      var beside = hudH > 0 && (W - EDGE - rowW) >= EDGE + hudWidth() + SIDE;
      var bottom = !hudH || beside ? EDGE : EDGE + hudH + GAP;
      wrap.style.setProperty('--spine-row-bottom', bottom + 'px');
      if (beside) wrap.style.setProperty('--spine-row-band', hudH + 'px');
      else wrap.style.removeProperty('--spine-row-band');
      wrap.setAttribute('data-spine-chrome-band', !hudH ? 'alone' : beside ? 'beside' : 'above');
      var floor = H - bottom - row.offsetHeight;          // the band's top, in canvas coordinates
      var room = Math.max(0, Math.floor(Math.min(floor - GAP - EDGE, H * OPEN_CAP)));
      wrap.style.setProperty('--spine-panel-bottom', (H - floor + GAP) + 'px');
      wrap.style.setProperty('--spine-panel-max', room + 'px');
    }
    function signature() {
      var o = openPair();
      return [mode, wrap.getAttribute('data-spine-chrome-band'), wrap.style.getPropertyValue('--spine-row-bottom'),
              o ? o.p.id : '', wrap.style.getPropertyValue('--spine-caption-left'), wrap.style.getPropertyValue('--spine-caption-w'),
              wrap.style.getPropertyValue('--spine-inspector-max'), wrap.clientWidth, wrap.clientHeight].join('|');
    }
    function keepFocus(fa) {
      if (!fa || fa === document.body || !document.contains(fa)) return;
      for (var i = 0; i < pairs.length; i++) {
        var x = pairs[i];
        if (x.t === fa && !rendered(fa)) { focusQuietly(x.p); return; }
        if (x.p.contains(fa) && x.p.hidden) { focusQuietly(x.t); return; }
      }
    }

    /* Decide and lay out. Returns whether anything a Fit depends on changed. */
    function update() {
      var W = wrap.clientWidth, H = wrap.clientHeight;
      if (!(W > 0) || !(H > 0)) return false;
      var before = signature(), was = mode, fa = document.activeElement;
      var open = pairs.map(function (x) { return was === 'compact' && !x.p.hidden; });
      var o = openPair(), top = o ? o.p.scrollTop : 0;

      /* Measure the wide arrangement with every panel open. */
      wrap.setAttribute('data-spine-chrome', 'wide');
      wrap.removeAttribute('data-spine-chrome-band');
      pairs.forEach(function (x) { x.p.removeAttribute('hidden'); });
      var lw = legend ? legend.offsetWidth : 0, lh = legend ? legend.offsetHeight : 0;
      var slotL = EDGE + hudWidth() + SLOT_GUTTER, slotW = (W - EDGE - lw - SLOT_GUTTER) - slotL;
      var capW = Math.max(0, Math.floor(Math.min(CAPTION_MAX, slotW)));
      wrap.style.setProperty('--spine-caption-left', Math.round(slotL + (slotW - capW) / 2) + 'px');
      wrap.style.setProperty('--spine-caption-w', capW + 'px');
      var room = Math.floor(H - 2 * EDGE - lh - GAP);
      wrap.style.setProperty('--spine-inspector-max', Math.max(0, room) + 'px');
      /* The caption stands in the bottom row beside the legend; it must not rise past the
         legend's top, where the inspector's room ends. */
      var wide = slotW >= CAPTION_MIN && room >= INSPECT_MIN && (!caption || !legend || caption.offsetHeight <= lh);
      /* What keeping the panels open costs the drawing: the wide Fit against the compact one, every
         panel closed. The scorer is the engine's Fit for the arrangement on the canvas now; it
         moves nothing. */
      if (wide && scorer) {
        var sw = scorer();
        wrap.setAttribute('data-spine-chrome', 'compact');
        pairs.forEach(function (x) { x.p.setAttribute('hidden', ''); });
        place();
        var sk = scorer();
        wide = sw.clear ? (!sk.clear || sw.scale >= WIDE_KEEP * sk.scale) : !sk.clear;
        if (wide) {
          wrap.setAttribute('data-spine-chrome', 'wide');
          wrap.removeAttribute('data-spine-chrome-band');
          pairs.forEach(function (x) { x.p.removeAttribute('hidden'); });
        }
      }

      if (wide) {
        mode = 'wide';
        wrap.style.removeProperty('--spine-row-bottom');
        wrap.style.removeProperty('--spine-row-band');
        wrap.style.removeProperty('--spine-panel-bottom');
        wrap.style.removeProperty('--spine-panel-max');
        /* The wide inspector is a scroll container, so it stays in the tab order; the other wide
           panels take focus only when a trigger hands it to them. */
        pairs.forEach(function (x) { x.p.setAttribute('tabindex', x.p.id === 'inspector' ? '0' : '-1'); setOpen(x, true); });
      } else {
        mode = 'compact';
        wrap.setAttribute('data-spine-chrome', 'compact');
        pairs.forEach(function (x, i) { x.p.setAttribute('tabindex', '0'); setOpen(x, open[i]); });
        place();
        o = openPair();
        if (o) o.p.scrollTop = top;
      }
      keepFocus(fa);
      return signature() !== before;
    }
    function changed() { if (listener) listener(); }
    function toggle(x) {
      if (mode !== 'compact') return;
      var on = x.p.hidden;
      pairs.forEach(function (y) { setOpen(y, y === x ? on : false); });
      place();
      changed();
    }
    pairs.forEach(function (x) { x.t.addEventListener('click', function () { toggle(x); }); });
    /* Escape, from the open panel or the trigger row, closes the panel and leaves focus on its
       trigger: the direct way back to the drawing. */
    wrap.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape' || mode !== 'compact') return;
      var x = openPair();
      if (!x || !(x.p.contains(ev.target) || row.contains(ev.target))) return;
      setOpen(x, false); focusQuietly(x.t); place(); changed(); ev.preventDefault();
    });
    return {
      update: update,
      mode: function () { return mode; },
      openPanel: function () { var x = openPair(); return x ? x.p : null; },
      /* Open `panel` in compact, closing any other; false in wide. */
      open: function (panel) {
        if (mode !== 'compact') return false;
        for (var i = 0; i < pairs.length; i++) if (pairs[i].p === panel) { if (panel.hidden) toggle(pairs[i]); return true; }
        return false;
      },
      /* Close the open compact panel; true when one closed. */
      close: function () {
        var x = openPair();
        if (!x) return false;
        setOpen(x, false); place(); changed();
        return true;
      },
      /* fn() measured as if the open compact panel were closed: the Fit the reader returns to. */
      withoutOpen: function (fn) {
        var x = openPair();
        if (!x) return fn();
        x.p.setAttribute('data-spine-fit-skip', '');
        try { return fn(); } finally { x.p.removeAttribute('data-spine-fit-skip'); }
      },
      onChange: function (fn) { listener = fn; },
      /* fn() -> { scale, clear }: the Fit for whichever arrangement the canvas carries now. */
      scoreWith: function (fn) { scorer = fn; },
      band: function () { return wrap.getAttribute('data-spine-chrome-band'); }
    };
  }

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) { for (var k in attrs) e.setAttribute(k, attrs[k]); }
    if (parent) parent.appendChild(e);
    return e;
  }
  function wrap(label, maxChars) {
    var words = String(label).split(' '), lines = [], cur = '';
    for (var i = 0; i < words.length; i++) {
      var t = cur ? cur + ' ' + words[i] : words[i];
      if (t.length <= maxChars) { cur = t; }
      else { if (cur) lines.push(cur); cur = words[i]; }
    }
    if (cur) lines.push(cur);
    if (lines.length > 2) { lines = [lines[0], lines.slice(1).join(' ')]; }
    if (lines[1] && lines[1].length > maxChars) lines[1] = lines[1].slice(0, maxChars - 1) + '…';
    return lines;
  }

  function render(data) {
    var svg = document.getElementById('svg');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var vp = el('g', { id: 'vp' }, svg);
    var edgesG = el('g', { id: 'edges' }, vp);
    var nodesG = el('g', { id: 'nodes' }, vp);

    var nodes = data.nodes, states = data.states;
    var stateMean = {}; states.forEach(function (s) { stateMean[s.role] = s; });
    var byId = {}; nodes.forEach(function (n) { byId[n.id] = n; });

    // ---- layout ----
    var CX = 560, layout = {};
    function place(n, cx, cy, w, h) { layout[n.id] = { cx: cx, cy: cy, w: w, h: h }; }
    var root = nodes.find(function (n) { return n.group === 'root'; });
    var modes = nodes.filter(function (n) { return n.group === 'mode'; });
    var spine = nodes.filter(function (n) { return n.group === 'spine'; });
    var questions = nodes.filter(function (n) { return n.group === 'question'; });
    var external = nodes.find(function (n) { return n.group === 'external'; });

    if (root) place(root, CX, 50, 200, 42);
    modes.forEach(function (m, i) { place(m, CX - 300 + i * 200, 140, 176, 46); });
    var SY0 = 270, SDY = 84;
    spine.forEach(function (s, i) { place(s, CX, SY0 + i * SDY, 258, 54); });
    questions.forEach(function (q, i) { place(q, 185, 290 + i * 96, 256, 54); });
    if (external) place(external, CX, SY0 + spine.length * SDY + 18, 290, 48);

    // The dot (state chip) center of a node — edges anchor here, not the box center.
    // Mirrors the chip position drawn in drawNode (left of the box, vertically centered).
    function chip(id) { var L = layout[id]; return { x: L.cx - L.w / 2 + 14, y: L.cy }; }

    // backbone (behind nodes) — runs through the spine dots
    if (spine.length) {
      var sc0 = chip(spine[0].id), scN = chip(spine[spine.length - 1].id);
      el('line', { 'class': 'backbone', x1: sc0.x, y1: sc0.y, x2: scN.x, y2: scN.y }, edgesG);
    }

    // ---- draw nodes ----
    nodes.forEach(function (n) {
      var L = layout[n.id];
      var g = el('g', { 'class': 'node', 'data-id': n.id }, nodesG);
      g.style.setProperty('--st', 'var(--state-' + n.state + ')');
      el('rect', { 'class': 'box', x: L.cx - L.w / 2, y: L.cy - L.h / 2, width: L.w, height: L.h, rx: 9, ry: 9 }, g);
      el('circle', { 'class': 'chip', cx: L.cx - L.w / 2 + 14, cy: L.cy, r: 5 }, g);
      var gt = el('text', { 'class': 'grp', x: L.cx - L.w / 2 + 26, y: L.cy - L.h / 2 + 12 }, g);
      gt.textContent = n.group;
      var lines = wrap(n.label, Math.floor((L.w - 42) / 6.6));
      var tx0 = L.cx - L.w / 2 + 26;
      var t = el('text', { x: tx0, y: L.cy + (lines.length > 1 ? -2 : 4) }, g);
      lines.forEach(function (ln, i) {
        var ts = el('tspan', { x: tx0, dy: i === 0 ? 0 : 14 }, t);
        ts.textContent = ln;
      });
      g.addEventListener('click', function (e) { e.stopPropagation(); locked = n.id; selectNode(n, true); openInspector(n.id); });
      /* Hover previews for a mouse only, never mid-pan. A touch tap fires compatibility mouse events;
         previewing on them would re-render the inspector under the finger before the tap's click
         arrives, so on a phone the click would land on the inspector instead of the node. */
      g.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !locked && !(pointer && pointer.panning())) selectNode(n, false); });
      g.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && !locked) clearSel(); });
    });

    // ---- selection / dimming / inspector ----
    var locked = null, pointer = null;
    function relatedSet(n) {
      var set = {}; set[n.id] = 1;
      if (n.group === 'mode') {
        nodes.forEach(function (o) { if (o.modes && o.modes.indexOf(n.id) >= 0) set[o.id] = 1; });
      } else if (n.modes) {
        n.modes.forEach(function (mid) { set[mid] = 1; });
      }
      return set;
    }
    function clearSel() {
      var gs = nodesG.querySelectorAll('.node');
      for (var i = 0; i < gs.length; i++) { gs[i].classList.remove('sel', 'dim'); }
      var ex = edgesG.querySelectorAll('.edge');
      for (var j = 0; j < ex.length; j++) edgesG.removeChild(ex[j]);
      if (!locked) inspectorIdle();
    }
    function selectNode(n, lock) {
      clearSel();
      var rel = relatedSet(n);
      var gs = nodesG.querySelectorAll('.node');
      for (var i = 0; i < gs.length; i++) {
        var id = gs[i].getAttribute('data-id');
        if (id === n.id) gs[i].classList.add('sel');
        else if (!rel[id]) gs[i].classList.add('dim');
      }
      // edges from n to related — anchored at the dot (chip) centers, not the box centers
      var A = chip(n.id);
      Object.keys(rel).forEach(function (id) {
        if (id === n.id) return;
        var B = chip(id);
        el('line', { 'class': 'edge on', x1: A.x, y1: A.y, x2: B.x, y2: B.y }, edgesG);
      });
      inspectorShow(n);
    }

    var insp = document.getElementById('inspector');
    function inspectorIdle() {
      insp.style.removeProperty('--st');
      insp.innerHTML = '<div class="h">Inspector</div><div class="idle">Click any node to inspect its state and evidence. Hover to preview.</div>';
    }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
    function inspectorShow(n) {
      var sm = stateMean[n.state] || { label: n.state, meaning: '' };
      insp.style.setProperty('--st', 'var(--state-' + n.state + ')');
      var html = '<div class="h">' + esc(n.group) + '</div>';
      html += '<div class="name">' + esc(n.label) + '</div>';
      html += '<div class="state-row"><span class="dot"></span><span class="state-name">' + esc(sm.label) + '</span></div>';
      html += '<div class="state-mean">' + esc(sm.meaning) + '</div>';
      html += '<div class="field"><span class="lbl">evidence</span>' + esc(n.evidence) + '</div>';
      if (n.qualifier) html += '<div class="field"><span class="lbl">qualifier</span>' + esc(n.qualifier) + '</div>';
      if (n.modes && n.modes.length) {
        var ml = n.modes.map(function (mid) { return byId[mid] ? byId[mid].label : mid; }).join(' · ');
        html += '<div class="field"><span class="lbl">mode intersections</span>' + esc(ml) + '</div>';
      }
      html += '<div class="field"><span class="lbl">repo source (authoritative)</span><span class="ptr">' + esc(n.pointer) + '</span></div>';
      insp.innerHTML = html;
    }
    inspectorIdle();

    // ---- pan / zoom ----
    var tx = 0, ty = 0, sc = 1;

    /* Interaction floor. The ordinary zoom-out floor is this pattern's historical
       BASE_MIN_SCALE (0.25 here — the spine's own floor, NOT the static patterns' 0.15;
       each pattern keeps its own). The panel-aware fit can legitimately land BELOW it on
       a constrained viewport, and a fixed floor above the fitted scale makes "zoom out"
       INCREASE the scale — the control reverses direction. So the live floor is the lower
       of the base floor and the most recent Fit. Fit itself is never clamped: clamping it
       would restore the panel collision this engine exists to avoid. Both zoom buttons and
       the wheel funnel through zoomAt, so that one clamp is the whole surface. */
    var BASE_MIN_SCALE = 0.25;
    var fittedMinScale = BASE_MIN_SCALE;
    var stage = document.getElementById('stage');
    var wrapEl = document.getElementById('canvasWrap');
    var pctEl = document.getElementById('zoomPct');
    function applyVp() { vp.setAttribute('transform', 'translate(' + tx + ',' + ty + ') scale(' + sc + ')'); if (pctEl) pctEl.textContent = Math.round(sc * 100) + '%'; }
    function contentBounds() {
      var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
      nodes.forEach(function (n) { var L = layout[n.id]; minX = Math.min(minX, L.cx - L.w / 2); maxX = Math.max(maxX, L.cx + L.w / 2); minY = Math.min(minY, L.cy - L.h / 2); maxY = Math.max(maxY, L.cy + L.h / 2); });
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    }
    function fitResult() {
      /* Shared DS fit contract (diagrams-fit.js).

         TRANSFORM TARGET: the #vp group, in SVG user space — so the REAL content-bounds
         origin is passed. (The static engines transform an element box that starts at 0
         in CSS space and pass a zero origin instead. Transform target, not viewBox sign,
         decides this.)

         LEGACY PADDING: this pattern has always expanded the CONTENT by 60px per side
         (cw = width + 120) rather than shrinking the viewport. Those are NOT equivalent
         formulas. Expressing the margin as expanded bounds with zero subtractive
         clearance reproduces the prior scale and translation exactly — the ±60 terms
         cancel out of the centring arithmetic. Do not "simplify" this to clearance:120.

         LEGACY VIEWPORT MEASUREMENT: this engine has always sized itself from
         clientWidth/clientHeight (integer), while the static engines read
         getBoundingClientRect() (fractional). On a fractional layout those differ — a
         843.5px wrap reports clientHeight 844 — which would shift this pattern by a
         quarter pixel. Adopting the other measurement is a separate render-contract
         decision, not part of reserving the panel band, so the historical measurement is
         passed explicitly here. Do not drop `viewport` to "let the utility measure it". */
      var b = contentBounds(), legacyPad = 60, FIT_GUTTER = 26;
      function fitWith(edges) {
        var o = {
          wrap: wrapEl,
          viewport: { width: wrapEl.clientWidth, height: wrapEl.clientHeight },
          bounds: {
            minX: b.minX - legacyPad, minY: b.minY - legacyPad,
            maxX: b.maxX + legacyPad, maxY: b.maxY + legacyPad
          },
          clearanceX: 0, clearanceY: 0, maxScale: 1.4, gutter: FIT_GUTTER
        };
        for (var k in edges) o[k] = edges[k];
        return window.DIAGRAM_FIT.compute(o);
      }
      /* WHICH EDGE EACH PANEL COSTS. A panel reserves the band of the edge it is classified
         under (diagrams-fit.js), and that band spans the whole canvas: a panel in the right
         lane costs its width over the full height, one in the bottom band its height over the
         full width. Which costs the drawing less depends on the canvas, so every Fit evaluates
         a small fixed set of arrangements and applies the clear one with the larger scale; a
         tie keeps the earlier. Where none clears, the first stands.

         WIDE. The inspector is always a right lane: it grows down with its content into the
         room above the legend, and a lane bounded by its width is the only reservation that a
         populated inspector cannot outgrow. The caption is always bottom chrome. The HUD and
         the legend each take either edge they occupy:
             1  legend right, HUD bottom      the usual best
             2  legend bottom, HUD bottom     a narrow canvas with height to spare
             3  legend right, HUD left        a short, wide canvas
             4  legend bottom, HUD left
         The HUD was once always a left lane. With the exporter's buttons it is over 300px wide,
         and as a lane it reserved that width down the whole canvas for a control in its
         bottom-left corner — Fit then gave the drawing barely half the canvas width. It is now
         only one arrangement among four, chosen where it actually costs less.

         COMPACT. The HUD, the trigger row and any open panel are one control area at the
         bottom of the canvas, and reserve one bottom band. An open panel is measured only
         through fitAround below. */
      var INSP = '#inspector', LEG = '.canvas-wrap > .legend', CAP = '.canvas-wrap > .caption', HUD = '.canvas-wrap > .hud';
      var list = wrapEl.getAttribute('data-spine-chrome') === 'compact'
        ? [{ topSelector: null, leftSelector: null, rightSelector: null,
             bottomSelector: HUD + ', .canvas-wrap > .spine-triggers, ' + INSP + ':not([data-spine-fit-skip]), ' +
                             LEG + ':not([data-spine-fit-skip]), ' + CAP + ':not([data-spine-fit-skip])' }]
        : [{ topSelector: null, leftSelector: null, rightSelector: INSP + ', ' + LEG, bottomSelector: HUD + ', ' + CAP },
           { topSelector: null, leftSelector: null, rightSelector: INSP, bottomSelector: HUD + ', ' + CAP + ', ' + LEG },
           { topSelector: null, leftSelector: HUD, rightSelector: INSP + ', ' + LEG, bottomSelector: CAP },
           { topSelector: null, leftSelector: HUD, rightSelector: INSP, bottomSelector: CAP + ', ' + LEG }];
      var best = null;
      for (var i = 0; i < list.length; i++) {
        var r = fitWith(list[i]); r.arrangement = i + 1;
        if (!r.clear) r.clear = clearWithin(r, list[i]);
        if (!best || (r.clear && (!best.clear || r.scale > best.scale * (1 + 1e-9)))) best = r;
      }
      return best;

      /* A placement that fills its reserved axis exactly ends where the gutter begins, which the
         helper counts as clear — but its arithmetic can land a fraction of a pixel past it
         (749.5000000000001 against 749.5), and it then reports `clear: false` for a placement
         that touches nothing. Such a result would lose to a smaller one. So a result the helper
         calls obstructed is re-tested here against the same visible panels, allowing
         CLEAR_TOLERANCE of the gutter; a real overlap is far larger and still fails. */
      function clearWithin(r, edges) {
        var g = FIT_GUTTER - CLEAR_TOLERANCE;
        var x0 = (b.minX - legacyPad) * r.scale + r.tx, x1 = (b.maxX + legacyPad) * r.scale + r.tx;
        var y0 = (b.minY - legacyPad) * r.scale + r.ty, y1 = (b.maxY + legacyPad) * r.scale + r.ty;
        var sel = [edges.topSelector, edges.bottomSelector, edges.leftSelector, edges.rightSelector].filter(Boolean).join(', ');
        var els = sel ? wrapEl.querySelectorAll(sel) : [], wr = wrapEl.getBoundingClientRect();
        for (var j = 0; j < els.length; j++) {
          var cs = getComputedStyle(els[j]);
          if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
          var pr = els[j].getBoundingClientRect();
          if (!(pr.width > 0) || !(pr.height > 0)) continue;
          var l = pr.left - wr.left, t = pr.top - wr.top, rr = pr.right - wr.left, bb = pr.bottom - wr.top;
          if (x0 < rr + g && x1 > l - g && y0 < bb + g && y1 > t - g) return false;
        }
        return true;
      }
    }

    /* FIT MODE. The view is at Fit after a Fit and until the reader pans, pinches, wheels or
       zooms it, or a locked node is revealed above the compact inspector (openInspector below).
       Chrome that settles after the first render — the exporter's buttons, the webfonts, a header
       that wraps — and a reader opening or closing a panel move a view only while it is at Fit; a
       camera the reader moved stays where the reader left it. A window resize refits as it always
       has (the pattern's resize policy). */
    var atFit = true, lastFit = null;
    function applyFit(f) {
      /* The floor tracks the placement actually applied. */
      fittedMinScale = Math.min(BASE_MIN_SCALE, f.scale);
      sc = f.scale; tx = f.tx; ty = f.ty;
      atFit = true; lastFit = f;
      applyVp();
    }
    /* An open compact panel moves the drawing only where the drawing keeps its closed-panel
       size, and otherwise overlays the closed-panel Fit (the static engines' rule). */
    function panelOpen() { return !!(chrome && chrome.openPanel()); }
    function closedFit() { return chrome ? chrome.withoutOpen(fitResult) : fitResult(); }
    function keepsSize(f, c) { return f.clear && f.scale >= c.scale * (1 - 1e-6); }
    function fitAround() {
      var f = fitResult();
      if (!panelOpen()) return f;
      var c = closedFit();
      if (keepsSize(f, c)) { f.panel = 'reserved'; return f; }
      c.panel = 'overlay'; return c;                    // measured without the panel it lies under
    }
    /* The Fit control: a panel that would cover the drawing is closed, then the drawing fits. */
    function fit() {
      if (panelOpen()) {
        var f = fitResult();
        if (keepsSize(f, closedFit())) { f.panel = 'reserved'; applyFit(f); return; }
        chrome.close();
      }
      applyFit(fitResult());
    }
    function clampK(k) { return Math.max(fittedMinScale, Math.min(3, k)); }
    function zoomAt(cx, cy, factor) {
      var ns = clampK(sc * factor);
      if (ns === sc) return;
      var k = ns / sc;
      tx = cx - (cx - tx) * k; ty = cy - (cy - ty) * k; sc = ns; atFit = false; applyVp();
    }

    /* Pan, pinch and wheel come from the shared pointer controller (diagrams-pointer.js), one
       controller for mouse, pen and touch on Pointer Events. It recognizes gestures only; this
       engine keeps the camera (sc, tx, ty), its zoom range and every selection decision.
         one pointer    pans past the tap slop (4px mouse, 12px finger or pen), from anywhere on
                        the stage, a node included; a tap still reaches the stage as a click
         two pointers   pinch about their centroid, inside the same range as the HUD and wheel:
                        clampK, whose floor tracks the most recent Fit
         moved gesture  swallows the click that follows it, so a pan never selects or clears
         wheel          one 1.12 step about the pointer, this pattern's historical step; a
                        horizontal scroll (deltaY 0) does not zoom
       The stage carries touch-action: none (diagrams-interactive-spine.css), so the page does not
       scroll or zoom under a gesture on the stage; the panels sit outside the stage and keep their own taps. A node's
       hover preview answers a mouse only (the node listeners above), so a tap selects rather than previews.
       A gesture that moves the camera takes the view off Fit. A second render replaces the
       controller rather than stacking listeners, and drops any gesture still in flight. */
    if (gestures) { gestures.abort(); stage.classList.remove('panning'); }
    gestures = new AbortController();
    var signal = gestures.signal;
    pointer = window.DIAGRAM_POINTER.attach({
      stage: stage,
      signal: signal,
      wheelStep: 1.12,
      getView: function () { return { k: sc, x: tx, y: ty }; },
      setView: function (v) {
        /* A gesture that moves the camera takes the view off Fit; float noise from a still pinch does not. */
        if (Math.abs(v.k - sc) > 1e-9 * sc || Math.abs(v.x - tx) > 1e-6 || Math.abs(v.y - ty) > 1e-6) atFit = false;
        sc = v.k; tx = v.x; ty = v.y; applyVp();
      },
      zoomAt: function (factor, cx, cy) { zoomAt(cx, cy, factor); },
      clampK: clampK
    });
    stage.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.node')) return;
      locked = null; clearSel(); inspectorIdle();
    }, { signal: signal });

    /* The HUD, the resize refit and every listener below belong to this render: a second render
       replaces them rather than stacking them. */
    var zi = document.getElementById('zoomIn'), zo = document.getElementById('zoomOut'), zf = document.getElementById('zoomFit');
    if (zi) zi.addEventListener('click', function () { var r = wrapEl.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1.15); }, { signal: signal });
    if (zo) zo.addEventListener('click', function () { var r = wrapEl.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1 / 1.15); }, { signal: signal });
    if (zf) zf.addEventListener('click', fit, { signal: signal });

    /* SETTLED CHROME. The first render fits before the exporter has added its buttons to the HUD
       and before the webfonts replace the fallback metrics; a header that wraps resizes the
       canvas without a window resize. Each of these re-lays the chrome, then refits a view that
       is still at Fit. The canvas and the HUD are observed, the webfonts and the page load are
       awaited, and a window resize refits whatever the view. */
    /* While an export runs, its button is disabled and its label shortened; the HUD it narrows is
       not a change to fit to. The reconciliation after it restores the label finds nothing moved. */
    function exporting() { return !!wrapEl.querySelector('.hud button:disabled'); }
    function reconcile(resize) {
      if (signal.aborted || (!resize && exporting())) return;
      if (chrome) chrome.update();
      if (resize || atFit) applyFit(fitAround());
    }
    window.addEventListener('resize', function () { reconcile(true); }, { signal: signal });
    if (window.ResizeObserver) {
      var pending = false;
      var ro = new ResizeObserver(function () {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () { pending = false; reconcile(false); });
      });
      ro.observe(wrapEl);
      var hudEl = wrapEl.querySelector('.hud');
      if (hudEl) ro.observe(hudEl);
      signal.addEventListener('abort', function () { ro.disconnect(); });
    }
    if (document.readyState !== 'complete') window.addEventListener('load', function () { reconcile(false); }, { signal: signal });
    if (document.fonts) {
      if (document.fonts.ready) document.fonts.ready.then(function () { reconcile(false); }).catch(function () {});
      document.fonts.addEventListener('loadingdone', function () { reconcile(false); }, { signal: signal });
    }

    /* A tap or click that locks a node opens its inspector where the inspector sits behind its
       trigger (compact), through the chrome's one state controller. Where that sheet covers the
       node, the drawing moves up just enough to show it above the sheet, at the same scale. */
    function openInspector(id) {
      if (!chrome || chrome.mode() !== 'compact') return;
      chrome.open(insp);
      var o = chrome.openPanel(), L = layout[id];
      if (!o || !L) return;
      var top = EDGE, bottom = o.offsetTop - GAP;
      var nt = (L.cy - L.h / 2) * sc + ty, nb = (L.cy + L.h / 2) * sc + ty, dy = 0;
      if (bottom - top < nb - nt) dy = top - nt;          // taller than the room: its label shows
      else if (nb > bottom) dy = bottom - nb;
      else if (nt < top) dy = top - nt;
      if (!dy) return;
      ty += dy; atFit = false; applyVp();
    }

    // ---- legend ----
    var leg = document.getElementById('legendRows');
    if (leg) {
      while (leg.firstChild) leg.removeChild(leg.firstChild);   // a second render replaces the rows
      states.forEach(function (s) {
        var row = document.createElement('div'); row.className = 'row';
        var sw = document.createElement('span'); sw.className = 'sw';
        sw.style.background = s.role === 'neutral' ? 'var(--fg-1)' : 'var(--state-' + s.role + ')';
        var lbl = document.createElement('span'); lbl.className = 'lbl'; lbl.textContent = s.label;
        row.appendChild(sw); row.appendChild(lbl); leg.appendChild(row);
      });
    }

    if (!chrome) chrome = makeChrome(wrapEl);
    if (chrome) {
      chrome.onChange(function () { if (!signal.aborted && atFit) applyFit(fitAround()); });
      chrome.scoreWith(function () { var r = fitResult(); return { scale: r.scale, clear: r.clear }; });
      chrome.update();
    }
    applyFit(fitAround());

    report = function () {
      return {
        view: { k: sc, x: tx, y: ty }, atFit: atFit,
        chrome: chrome ? { mode: chrome.mode(), band: chrome.band(), open: chrome.openPanel() ? chrome.openPanel().id : null } : null,
        /* fit: the Fit last applied. `panel` says how an open compact panel entered it: 'reserved'
           (the drawing moved clear of it at its closed-panel scale) or 'overlay' (measured without
           it; the panel lies over the drawing). `clear` is judged against the chrome so measured. */
        fit: lastFit ? { scale: lastFit.scale, tx: lastFit.tx, ty: lastFit.ty, clear: lastFit.clear, reserved: lastFit.reserved,
                         arrangement: lastFit.arrangement, degradedX: lastFit.degradedX, degradedY: lastFit.degradedY,
                         panel: lastFit.panel || null } : null
      };
    };
  }

  var report = function () { return null; };
  window.IA_SPINE = { render: render, report: function () { return report(); } };
})();
