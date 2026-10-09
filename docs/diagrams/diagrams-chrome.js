/* diagrams-chrome.js — design-system-ASK responsive diagram chrome (v1, 2026-09-28; room rule 2026-10-08)

   DS-OWNED SUPPORT FILE. Do not hand-edit in a consumer; re-vendor byte-identical.

   WHY THIS EXISTS
   The caption and the legend were two independently positioned corner panels. Neither
   reserved room for the other, so on a narrow or short canvas they landed on top of each
   other and over most of the drawing, under a header squeezed into a tall column.
   diagrams.css lays them out together inside .diagram-info; this file decides when that
   layout leaves the drawing too little of the canvas, and then gathers the information
   behind triggers in one control area at the bottom of the canvas.

   WHAT THIS DOES
   For each .diagram-info[data-diagram-chrome] on the page:
     1  DECIDE. The chrome is COMPACT when the canvas is narrower than NARROW, or when the
        panels, laid out open (the wide layout) and measured, would take more than a third
        of the canvas height, need more width than the canvas gives them, or leave the
        drawing less room between them and the HUD than diagrams-fit.js needs to keep it
        clear of both (MIN_DRAW plus a GUTTER on each side). Below that room the fit
        discards its reservation and the drawing runs under the open panels — a short
        landscape phone under a two-row header is the case — so the panels close behind
        their triggers instead. Otherwise it is WIDE. Every narrow screen starts compact;
        other constrained canvases are measured.
     2  WIDE. Every panel is visible, and the header keeps its subtitle and stamp; the
        triggers are hidden.
     3  COMPACT.
        - The header keeps identity, title and the page's illustrative cue. Its subtitle
          and stamp move into About, the panel the first trigger controls (the same
          authored nodes, not copies), and return to the header in wide.
        - A panel the page authors outside the block but controls from the trigger row
          (FLOW's explanatory panel) joins the block in compact and returns home in wide.
        - The triggers sit in the HUD's band at the bottom of the canvas: beside the HUD
          when the band has room for them, directly above it when it does not. At most one
          panel is open. It opens upward from the band and scrolls inside the region between
          the canvas top and the band; it is in the tab order, so it can be scrolled from
          the keyboard without a pointer. That region is exactly the space that exists: it
          is never clamped up to a minimum the canvas does not have.
        - Entering compact closes every panel, so the first view gives the drawing the
          canvas; while the page STAYS compact, a resize keeps the reader's choice and the
          open panel's scroll position. Escape anywhere in the block closes the open panel
          and leaves focus on its trigger.
   Each panel has ONE truthful state: its trigger's aria-expanded and its own hidden
   attribute, always set together here.

   STRUCTURE
   The block must be a direct child of .canvas-wrap, itself a direct child of .shell, as the
   templates author it — the structure diagrams.css keys its compact header on. Any other
   placement is left alone and stays in the wide layout. The mode is decided from the panels
   authored inside the block; a guest panel's content (an engine writes FLOW's on hover) never
   switches it.

   FOCUS ACROSS A MODE CHANGE
   Focus moves only when its current target would disappear: a focused trigger that the
   wide layout hides hands focus to the panel it controls; focus inside a panel that
   compact closes returns to that panel's trigger; a node the move takes out of the
   document for an instant gets its focus back. An ordinary resize moves no focus.

   FIT INTEGRATION
   In compact, the trigger row and the open panel declare data-diagram-fit-edge="bottom",
   so diagrams-fit.js reserves the whole control area, HUD included, as bottom chrome.
   After anything that changes that area or the header — a mode switch, a panel opening or
   closing, the band changing, the HUD changing size, the webfonts landing — this file dispatches
   `diagram-chrome-change` on the canvas wrap, one animation frame later so the change
   has laid out. What an engine writes into an open panel is not such a change: the drawing
   is placed when the panel opens and does not chase its content. A resize is handled one
   frame after the ResizeObserver reports it, so the header this file reshapes never
   resizes the observed canvas inside the observer's own callback. An engine refits on that event ONLY while its view is at Fit; a reader's
   own pan or zoom is left where it is. withoutOpenPanel() lets an engine measure the Fit
   the reader returns to when the open panel closes, and an engine's explicit Fit closes
   an open panel through close() below when that panel leaves the drawing no clear
   placement at that size.

   WHAT THIS IS NOT
   No pan, zoom or transform; no fit arithmetic (diagrams-fit.js); no export composition
   (export-png.js reads the same nodes wherever they sit); no second copy of any content;
   no animation.

   DISTRIBUTION
   Self-contained by convention, like diagrams-fit.js: a byte-identical copy lives in each
   static pattern directory. Load it after the page's chrome and before the engine. */
(function () {
  'use strict';

  var NARROW = 640;         // a canvas narrower than this is compact, whatever its panels measure
  var OPEN_SHARE = 1 / 3;   // wide: the open block may take at most this share of the canvas height
  var OPEN_CAP = 0.6;       // compact: an open panel never takes more than this share of the canvas height
  var EDGE = 18;            // the chrome's inset from the canvas edges (diagrams.css)
  var GAP = 8;              // the space between the band and an open panel, and between the HUD and a row above it
  var SIDE = 12;            // the space between the HUD and the triggers when they share the band
  var GUTTER = 26;          // diagrams-fit.js: the gutter every caller passes around a reserved panel
  var MIN_DRAW = 120;       // diagrams-fit.js: the least room it reserves into; below it the reservation is discarded

  function each(list, fn) { for (var i = 0; i < list.length; i++) fn(list[i], i); }
  function rendered(el) { return !!el && el.getClientRects().length > 0; }
  function focusQuietly(el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }

  function init(info) {
    var wrap = info.closest('.canvas-wrap') || info.parentElement;
    var shell = wrap.closest('.shell') || document;
    var row = info.querySelector('.diagram-info-triggers');
    if (!wrap || !wrap.classList.contains('canvas-wrap') || wrap !== info.parentElement ||
        !wrap.parentElement || !wrap.parentElement.classList.contains('shell')) return null;
    var pairs = [];
    each(info.querySelectorAll('.diagram-info-triggers [aria-controls]'), function (t) {
      var p = document.getElementById(t.getAttribute('aria-controls'));
      if (p && wrap.contains(p)) pairs.push({ t: t, p: p, guest: !info.contains(p) });
    });
    if (!pairs.length || !row) return null;
    var about = pairs[0].p;
    var bar = shell.querySelector('.bar');
    var subtitle = bar && bar.querySelector('.title-block .s');
    var stamp = bar && bar.querySelector('.stamp');
    var moved = [], meta = null, mode = null, sig = null;

    function notify() {
      var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
      raf(function () {
        var ev;
        try { ev = new CustomEvent('diagram-chrome-change', { bubbles: true, detail: { mode: mode } }); }
        catch (e) { ev = document.createEvent('CustomEvent'); ev.initCustomEvent('diagram-chrome-change', true, false, { mode: mode }); }
        wrap.dispatchEvent(ev);
      });
    }
    function setOpen(pair, on) {
      if (!on && pair.p.contains(document.activeElement)) focusQuietly(pair.t);
      pair.t.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) pair.p.removeAttribute('hidden'); else pair.p.setAttribute('hidden', '');
    }
    function openPair() {
      for (var i = 0; i < pairs.length; i++) if (!pairs[i].p.hidden) return pairs[i];
      return null;
    }

    /* The compact relocations, recorded so wide puts every node back exactly where it was. */
    function move(node, into, before) {
      moved.push({ node: node, parent: node.parentNode, next: node.nextSibling });
      into.insertBefore(node, before);
    }
    function relocate(compact) {
      if (compact) {
        if (moved.length || meta) return;
        each(pairs, function (x) {
          if (info.contains(x.p)) return;
          x.p.setAttribute('data-diagram-info-guest', '');
          move(x.p, info, null);
        });
        if (subtitle || stamp) {
          meta = document.createElement('div');
          meta.className = 'diagram-info-meta';
          about.insertBefore(meta, about.firstChild);
          if (subtitle) move(subtitle, meta, null);
          if (stamp) move(stamp, meta, null);
        }
      } else {
        for (var i = moved.length - 1; i >= 0; i--) {
          var m = moved[i];
          if (m.next && m.next.parentNode === m.parent) m.parent.insertBefore(m.node, m.next);
          else m.parent.appendChild(m.node);
          m.node.removeAttribute('data-diagram-info-guest');
        }
        moved = [];
        if (meta && meta.parentNode) meta.parentNode.removeChild(meta);
        meta = null;
      }
    }
    function markEdges(compact) {
      each([row].concat(pairs.map(function (x) { return x.p; })), function (el) {
        if (compact) el.setAttribute('data-diagram-fit-edge', 'bottom');
        else el.removeAttribute('data-diagram-fit-edge');
      });
    }

    /* Wide layout, every panel open, header whole: does it leave the drawing its canvas? */
    function needsCompact() {
      var wr = wrap.getBoundingClientRect();
      if (wr.width < NARROW) return true;
      relocate(false);
      markEdges(false);
      info.setAttribute('data-diagram-chrome', 'wide');
      each(pairs, function (x) { x.p.removeAttribute('hidden'); });
      wr = wrap.getBoundingClientRect();
      var ir = info.getBoundingClientRect();
      var tooWide = false;
      each(pairs, function (x) { if (!x.guest && x.p.scrollWidth > x.p.clientWidth + 1) tooWide = true; });
      var hud = wrap.querySelector('.hud');
      var floor = hud && rendered(hud) ? hud.getBoundingClientRect().top : wr.bottom;
      var room = (floor - GUTTER) - (ir.bottom + GUTTER);
      return tooWide || ir.height > wr.height * OPEN_SHARE || room < MIN_DRAW;
    }

    /* Compact geometry: the band beside or above the HUD, and the open panel's region. */
    function place() {
      var wr = wrap.getBoundingClientRect();
      var hud = wrap.querySelector('.hud');
      var hr = hud && rendered(hud) ? hud.getBoundingClientRect() : null;
      var rr = row.getBoundingClientRect();
      var beside = !!hr && (wr.right - EDGE - rr.width) >= hr.right + SIDE;
      var bottom = !hr ? EDGE : beside ? wr.bottom - hr.bottom : wr.bottom - hr.top + GAP;
      info.style.setProperty('--diagram-info-bottom', Math.round(bottom) + 'px');
      if (beside) info.style.setProperty('--diagram-info-band', Math.round(hr.height) + 'px');
      else info.style.removeProperty('--diagram-info-band');
      info.setAttribute('data-diagram-chrome-band', !hr ? 'alone' : beside ? 'beside' : 'above');
      rr = row.getBoundingClientRect();
      var room = rr.top - GAP - (wr.top + EDGE);
      var max = Math.max(0, Math.floor(Math.min(room, wr.height * OPEN_CAP)));
      info.style.setProperty('--diagram-info-open-max', max + 'px');
    }
    function unplace() {
      info.style.removeProperty('--diagram-info-bottom');
      info.style.removeProperty('--diagram-info-band');
      info.style.removeProperty('--diagram-info-open-max');
      info.removeAttribute('data-diagram-chrome-band');
    }
    /* Everything the fit depends on — the mode, the band, which panel is open (compact) or the
       laid-out block's height (wide), the HUD's size and the canvas; a change is announced once.
       The HUD is in it because the exporter adds its buttons after load: a HUD that grows under
       a drawing already placed must move the drawing, not just the triggers. */
    function signature() {
      var wr = wrap.getBoundingClientRect(), o = mode === 'compact' ? openPair() : null;
      var hud = wrap.querySelector('.hud'), hr = hud && rendered(hud) ? hud.getBoundingClientRect() : null;
      return [mode, info.getAttribute('data-diagram-chrome-band'), info.style.getPropertyValue('--diagram-info-bottom'),
              o ? o.p.id : '', mode === 'wide' ? Math.round(info.getBoundingClientRect().height) : 0,
              hr ? Math.round(hr.width) + 'x' + Math.round(hr.height) : '',
              Math.round(wr.width), Math.round(wr.height)].join('|');
    }
    function settle() {
      var s = signature();
      if (s !== sig) { sig = s; notify(); }
    }
    function keepFocus(fa) {
      if (!fa || fa === document.body || !document.contains(fa)) return;
      for (var i = 0; i < pairs.length; i++) {
        var x = pairs[i];
        if (x.t === fa && !rendered(fa)) { focusQuietly(x.p); return; }
        if (x.p !== fa && x.p.contains(fa) && x.p.hidden) { focusQuietly(x.t); return; }
        if (x.p === fa && x.p.hidden) { focusQuietly(x.t); return; }
      }
      if (document.activeElement !== fa && rendered(fa)) focusQuietly(fa);
    }

    function update() {
      if (!(wrap.getBoundingClientRect().height > 0)) return;
      var fa = document.activeElement;
      var before = mode;
      var open = pairs.map(function (x) { return x.t.getAttribute('aria-expanded') === 'true' && !x.p.hidden; });
      var o = before === 'compact' ? openPair() : null, top = o ? o.p.scrollTop : 0;
      if (needsCompact()) {
        info.setAttribute('data-diagram-chrome', 'compact');
        relocate(true);
        markEdges(true);
        each(pairs, function (x, i) { x.p.setAttribute('tabindex', '0'); setOpen(x, before === 'compact' && open[i]); });
        mode = 'compact';
        place();
        if (o && !o.p.hidden) o.p.scrollTop = top;
      } else {
        info.setAttribute('data-diagram-chrome', 'wide');
        unplace();
        each(pairs, function (x) { x.p.setAttribute('tabindex', '-1'); setOpen(x, true); });
        mode = 'wide';
      }
      keepFocus(fa);
      settle();
    }
    function toggle(pair) {
      if (mode !== 'compact') return;
      var on = pair.p.hidden;
      each(pairs, function (x) { setOpen(x, x === pair ? on : false); });
      place();
      settle();
    }
    function close() {
      var o = mode === 'compact' ? openPair() : null;
      if (!o) return false;
      setOpen(o, false);
      place();
      settle();
      return true;
    }
    function openPanel(p) {
      if (mode !== 'compact') return false;
      var pair = null;
      each(pairs, function (x) { if (x.p === p) pair = x; });
      if (!pair) return false;
      if (!pair.p.hidden) return true;
      toggle(pair);
      return true;
    }

    each(pairs, function (x) { x.t.addEventListener('click', function () { toggle(x); }); });
    /* Escape, from the open panel or from its trigger, closes the panel and leaves focus on
       its trigger: the direct way back to the drawing. */
    info.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape' || mode !== 'compact') return;
      var o = openPair();
      if (!o) return;
      setOpen(o, false); focusQuietly(o.t); place(); settle(); ev.preventDefault();
    });
    update();
    /* Resizes are handled one frame after they are reported (see FIT INTEGRATION). */
    var pending = false;
    function schedule() {
      if (pending) return;
      pending = true;
      (window.requestAnimationFrame || function (f) { return setTimeout(f, 16); })(function () { pending = false; update(); });
    }
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(schedule);
      ro.observe(wrap);
      /* The band follows the HUD, which grows when the exporter adds its buttons after load. */
      var hud = wrap.querySelector('.hud');
      if (hud) ro.observe(hud);
    } else {
      window.addEventListener('resize', schedule);
    }
    /* The panels and the header change size when the webfonts replace the fallback metrics. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { update(); notify(); }).catch(function () {});
    }
    /* Run `fn` with the open panel set aside from the fit: its edge declaration reads
       "none" for the call, so the fit helper measures the view the reader returns to when
       the panel closes. Nothing is hidden or laid out again. */
    function withoutOpen(fn) {
      var o = mode === 'compact' ? openPair() : null;
      if (!o) return fn();
      o.p.setAttribute('data-diagram-fit-edge', 'none');
      try { return fn(); } finally { o.p.setAttribute('data-diagram-fit-edge', 'bottom'); }
    }
    return {
      wrap: wrap,
      update: update,
      withoutOpen: withoutOpen,
      mode: function () { return mode; },
      openPanel: function () { var o = mode === 'compact' ? openPair() : null; return o ? o.p : null; },
      close: close,
      open: openPanel
    };
  }

  /* Loaded after the chrome markup, so the panels already exist: start at once, before an
     engine's first fit, and fall back to DOMContentLoaded for a page that loads it early. */
  var hosts = [], started = [];
  function start() {
    each(document.querySelectorAll('.diagram-info[data-diagram-chrome]'), function (info) {
      if (started.indexOf(info) >= 0) return;
      started.push(info);
      var h = init(info); if (h) hosts.push(h);
    });
  }
  function hostOf(el) {
    for (var i = 0; i < hosts.length; i++) if (el && (hosts[i].wrap === el || hosts[i].wrap.contains(el))) return hosts[i];
    return null;
  }
  start();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);

  window.DIAGRAM_CHROME = {
    VERSION: 1,
    /* Re-measure every host. */
    refresh: function () { each(hosts, function (h) { h.update(); }); },
    /* The open compact panel of the chrome around `el` (a canvas wrap or a node in it), or null. */
    openPanel: function (el) { var h = hostOf(el); return h ? h.openPanel() : null; },
    /* Close that open compact panel through the one state controller; true when one closed. */
    close: function (el) { var h = hostOf(el); return h ? h.close() : false; },
    /* Open `panel` in compact, closing any other; false in wide or for an unknown panel. */
    open: function (panel) { var h = hostOf(panel); return h ? h.open(panel) : false; },
    /* fn() evaluated as if the open compact panel were closed (see withoutOpen above). */
    withoutOpenPanel: function (el, fn) { var h = hostOf(el); return h ? h.withoutOpen(fn) : fn(); }
  };
})();
