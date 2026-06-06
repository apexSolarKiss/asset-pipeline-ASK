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
*/
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

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
      g.addEventListener('click', function (e) { e.stopPropagation(); locked = n.id; selectNode(n, true); });
      g.addEventListener('mouseenter', function () { if (!locked) selectNode(n, false); });
      g.addEventListener('mouseleave', function () { if (!locked) clearSel(); });
    });

    // ---- selection / dimming / inspector ----
    var locked = null;
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
    var stage = document.getElementById('stage');
    var wrapEl = document.getElementById('canvasWrap');
    var pctEl = document.getElementById('zoomPct');
    function applyVp() { vp.setAttribute('transform', 'translate(' + tx + ',' + ty + ') scale(' + sc + ')'); if (pctEl) pctEl.textContent = Math.round(sc * 100) + '%'; }
    function contentBounds() {
      var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
      nodes.forEach(function (n) { var L = layout[n.id]; minX = Math.min(minX, L.cx - L.w / 2); maxX = Math.max(maxX, L.cx + L.w / 2); minY = Math.min(minY, L.cy - L.h / 2); maxY = Math.max(maxY, L.cy + L.h / 2); });
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    }
    function fit() {
      var b = contentBounds(), pad = 60;
      var vw = wrapEl.clientWidth, vh = wrapEl.clientHeight;
      var cw = (b.maxX - b.minX) + pad * 2, ch = (b.maxY - b.minY) + pad * 2;
      sc = Math.min(vw / cw, vh / ch, 1.4);
      tx = (vw - (b.maxX + b.minX) * sc) / 2;
      ty = (vh - (b.maxY + b.minY) * sc) / 2;
      applyVp();
    }
    function zoomAt(cx, cy, factor) {
      var ns = Math.max(0.25, Math.min(3, sc * factor));
      var k = ns / sc;
      tx = cx - (cx - tx) * k; ty = cy - (cy - ty) * k; sc = ns; applyVp();
    }

    var panning = false, moved = false, sx = 0, sy = 0, otx = 0, oty = 0;
    stage.addEventListener('mousedown', function (e) {
      if (e.target.closest && e.target.closest('.node')) return;
      panning = true; moved = false; sx = e.clientX; sy = e.clientY; otx = tx; oty = ty; stage.classList.add('panning');
    });
    window.addEventListener('mousemove', function (e) {
      if (!panning) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      tx = otx + dx; ty = oty + dy; applyVp();
    });
    window.addEventListener('mouseup', function () { if (panning) { panning = false; stage.classList.remove('panning'); } });
    stage.addEventListener('click', function (e) {
      if (moved) return;
      if (e.target.closest && e.target.closest('.node')) return;
      locked = null; clearSel(); inspectorIdle();
    });
    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      var r = wrapEl.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });

    var zi = document.getElementById('zoomIn'), zo = document.getElementById('zoomOut'), zf = document.getElementById('zoomFit');
    if (zi) zi.addEventListener('click', function () { var r = wrapEl.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1.15); });
    if (zo) zo.addEventListener('click', function () { var r = wrapEl.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1 / 1.15); });
    if (zf) zf.addEventListener('click', fit);
    window.addEventListener('resize', fit);

    // ---- legend ----
    var leg = document.getElementById('legendRows');
    if (leg) {
      states.forEach(function (s) {
        var row = document.createElement('div'); row.className = 'row';
        var sw = document.createElement('span'); sw.className = 'sw';
        sw.style.background = s.role === 'neutral' ? 'var(--fg-1)' : 'var(--state-' + s.role + ')';
        var lbl = document.createElement('span'); lbl.className = 'lbl'; lbl.textContent = s.label;
        row.appendChild(sw); row.appendChild(lbl); leg.appendChild(row);
      });
    }

    fit();
  }

  window.IA_SPINE = { render: render };
})();
