/* diagrams-fit.js — design-system-ASK shared fit contract (v1, 2026-07-18)

   DS-OWNED SUPPORT FILE. Do not hand-edit in a consumer; re-vendor byte-identical.

   WHY THIS EXISTS
   Every diagram engine independently computed fit from the full canvasWrap and reserved
   no room for the caption / legend / HUD glass panels or a pattern's own side chrome. A
   wide, short figure therefore fit-scaled to width, centred vertically, and rendered its
   top band underneath the panels. The collision is between SVG content and HTML chrome,
   so no SVG bbox check sees it. Five engines carried the same defect because five
   independent fit implementations all treated the full wrap as available, without
   reserving the page chrome.

   WHAT THIS IS
   A pure measurement + arithmetic function returning the scale + translation to place
   the content. It runs in TWO PASSES:

     1  BASE CANDIDATE — compute the caller's fit with all panel bands zero. In the
        ordinary region this is the exact prior formula; on a constrained axis it uses the
        continuous-clearance rule below. Derive the content rectangle it produces and test
        it against the visible chrome (each panel inflated by `gutter`). If nothing
        intersects, RETURN THE BASE CANDIDATE UNCHANGED and report `reserved: false`.

     2  EDGE-AWARE RESERVED FIT — only on a demonstrated collision, reserve a band per
        EDGE from the panels actually anchored there, and fit into the safe rectangle
        that remains.

     The result is then re-tested and reported as `clear`. Reserving is not the same as
     succeeding: when a viewport is too cramped to hold a reservation, that reservation is
     discarded (`degradedX` / `degradedY`) and the placement may still be obstructed. The
     helper reports this rather than papering over it; choosing what to do about it is the
     ADAPTER's call, since only the adapter knows its own alternative classifications.

   Reservation is therefore overlap-gated and edge-aware. This matters: a full-width band
   can remove a collision by destroying legibility. A narrow right-hand side panel that a
   figure overlaps by 18px must not cost 40% of that figure's scale, and a figure that
   already clears every panel must not be shrunk at all.

   WHAT THIS IS NOT
   It installs no event handlers; owns no drag / wheel / zoom / resize state; never touches
   the stage, viewport group, or SVG; knows no H / V / SEQ / FLOW data grammar; owns no
   export composition. Each engine keeps its own interaction model and applies the result.

   It is also NOT a layout solver. There is no maximal-empty-rectangle search, no arbitrary
   obstacle avoidance, no iterative packing. The panel system is edge-anchored, so a
   four-edge safe rectangle covers it while staying deterministic and inspectable.

   LEGACY EQUIVALENCE — the binding contract, by region
   Fit behaviour is preserved exactly in the ordinary case and degrades continuously only
   where the old absolute-clearance model was itself broken:

     ORDINARY REGION — each available axis is at least TWICE its requested total clearance.
       The caller's prior fit formula is preserved exactly (`usable = avail - clearance`);
       when the base candidate already clears the chrome it is returned verbatim. No
       intentional geometry change; equivalent float evaluation orders may differ only at
       machine precision.

     CONSTRAINED-CLEARANCE REGION — an available axis is smaller than twice its clearance.
       Absolute clearance is meaningless here: a canvas shorter than its clearance made
       `avail - clearance` non-positive, which either tripped the degenerate-input guard
       (scale rewritten to ~maxScale, content thrown off canvas) or, just above the
       boundary, collapsed the scale toward zero. Both are broken. Total clearance therefore
       DEGRADES continuously — it may consume at most HALF a positive available axis
       (`effectiveClearance = min(clearance, avail/2)`), so content always keeps at least
       half the axis. For fixed content, clearance, maxScale, other-axis inputs, and
       panel-band classification, the per-axis scale contribution is monotonic: reducing an
       available axis cannot increase that axis's contribution. (This is an axis-arithmetic
       property, NOT a figure-level guarantee — `compute()` can still change the applied
       scale across viewports by switching reservation mode, e.g. clear->reserved or
       reserved->degraded.) Continuous at `avail == 2*clearance`, where both branches give
       `usable = clearance`. It intentionally changes some previously-positive near-clearance
       results, because those belonged to the same broken regime, not to healthy prior
       behaviour.

     PANEL-COLLISION REGION — overlap-gated edge reservation, as above.

   Three caller-owned inputs carry the differences between engines, because this utility
   normalizes none of them:
     - `clearanceX/Y` is TOTAL clearance (the value previously subtracted from the
       viewport), not per-side padding. An engine that instead EXPANDED its content by a
       per-side margin expresses that margin as expanded `bounds` with zero clearance.
     - `viewport` overrides the measured border box for engines that historically sized
       themselves from clientWidth/clientHeight rather than getBoundingClientRect().
     - the four edge selectors name each pattern's own chrome anatomy. Panel classes are
       NOT uniform across patterns — see the per-adapter comments.
   This file changes fit geometry in exactly two ways: reserving the panel band, and
   degrading clearance continuously on a constrained axis. Nothing else.

   DISTRIBUTION
   Self-contained by convention, like diagrams.css and export-png.js: a byte-identical copy
   lives in each pattern directory so a pattern stays independently copyable. There is no
   cross-directory runtime import and no build step. Load it immediately BEFORE the engine. */
(function () {
  'use strict';

  var DEFAULTS = {
    clearanceX: 80,
    clearanceY: 80,
    maxScale: 1.2,
    gutter: 26,
    topSelector: '.caption, .legend',
    bottomSelector: '.hud',
    leftSelector: null,
    rightSelector: null,
    minAvailable: 120
  };

  /* A panel counts only if it is actually rendered: display:none, visibility:hidden,
     opacity:0, and zero-area elements are ignored rather than reserving a phantom band. */
  function isVisible(el) {
    if (!el) return false;
    var cs = (el.ownerDocument.defaultView || window).getComputedStyle(el);
    if (!cs) return true;
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    if (parseFloat(cs.opacity) === 0) return false;
    return true;
  }

  /* Visible panels for one selector, as rectangles in WRAP-LOCAL coordinates. */
  function panelRects(wrap, wrapRect, selector) {
    if (!selector) return [];
    var els;
    try { els = wrap.querySelectorAll(selector); } catch (e) { return []; }
    var list = [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!isVisible(el)) continue;
      var r = el.getBoundingClientRect();
      if (!(r.width > 0) || !(r.height > 0)) continue;
      list.push({
        left:   r.left   - wrapRect.left,
        top:    r.top    - wrapRect.top,
        right:  r.right  - wrapRect.left,
        bottom: r.bottom - wrapRect.top
      });
    }
    return list;
  }

  /* Strict rectangle intersection against a panel inflated by `gutter`.
     BOUNDARY RULE: touching the inflated edge counts as CLEAR — the gutter has already
     supplied the separation, so `<` / `>` rather than `<=` / `>=`. Applied consistently
     to the gate here and to the band arithmetic below. */
  function intersects(rect, p, g) {
    return rect.left < (p.right + g) && rect.right  > (p.left - g)
        && rect.top  < (p.bottom + g) && rect.bottom > (p.top  - g);
  }

  function num(v, fallback) {
    var n = typeof v === 'number' ? v : parseFloat(v);
    return isFinite(n) ? n : fallback;
  }

  /* Clearance is BREATHING ROOM INSIDE the available space, so it degrades continuously as
     that space shrinks: it may consume at most HALF a positive available axis. Content
     therefore always keeps at least half the axis, and the per-axis scale contribution is
     monotonic (reducing an available axis cannot increase that axis's contribution) and
     continuous.

     Why this is needed. The prior model subtracted an ABSOLUTE clearance: `avail - clearance`.
     On a canvas smaller than its clearance that turned non-positive, and the degenerate-input
     guard below rewrote the scale to ~maxScale — throwing content off canvas. Observed on
     method-ASK's bounded-generativity figure (clearanceY 90, content height 479): an 84px
     canvas produced scale 1.0 and translate (-432, -197). Just ABOVE the boundary the same
     model collapsed the scale toward zero instead (a 91px canvas fit at 0.002). Both are the
     same broken regime — absolute clearance disproportionate to a tiny viewport.

     The fix: `effectiveClearance = min(clearance, avail/2)`.
       avail >= 2*clearance  ->  effectiveClearance = clearance   (EXACT prior formula)
       avail  < 2*clearance  ->  effectiveClearance = avail/2      (usable = avail/2)
       avail == 2*clearance  ->  both agree exactly (usable = clearance): continuous.
     This intentionally changes some previously-positive results in [clearance, 2*clearance],
     because those belonged to the broken regime, not to healthy prior behaviour. Every fit
     on an axis with `avail >= 2*clearance` is arithmetically identical to before.

     The guard below is retained for genuinely degenerate input (non-finite / zero content). */
  function axisScale(avail, clearance, content) {
    if (!(content > 0)) return Infinity;                    // let the other axis decide
    var effectiveClearance = Math.min(clearance, avail / 2);
    return (avail - effectiveClearance) / content;
  }

  function place(availX, availY, availW, availH, cw, ch, minX, minY, clearanceX, clearanceY, maxScale) {
    var scale = Math.min(axisScale(availW, clearanceX, cw), axisScale(availH, clearanceY, ch), maxScale);
    if (!isFinite(scale) || scale <= 0) scale = Math.min(1, maxScale);
    return {
      scale: scale,
      tx: availX + (availW - cw * scale) / 2 - minX * scale,
      ty: availY + (availH - ch * scale) / 2 - minY * scale
    };
  }

  /* compute({ wrap, viewport?:{width,height}, bounds:{minX,minY,maxX,maxY},
               clearanceX, clearanceY, maxScale, gutter,
               topSelector, bottomSelector, leftSelector, rightSelector })
     -> { scale, tx, ty, topBand, bottomBand, leftBand, rightBand,
           reserved,               // a band was applied (NOT a claim of success)
           clear,                  // the returned placement intersects no visible chrome
           degradedX, degradedY }  // a nonzero reservation was discarded under minAvailable
     A caller that must clear the chrome checks `clear`, not `reserved`. */
  function compute(opts) {
    opts = opts || {};
    var wrap = opts.wrap;
    var maxScale   = num(opts.maxScale,   DEFAULTS.maxScale);
    var clearanceX = num(opts.clearanceX, DEFAULTS.clearanceX);
    var clearanceY = num(opts.clearanceY, DEFAULTS.clearanceY);
    var gutter     = num(opts.gutter,     DEFAULTS.gutter);

    var bail = { scale: Math.min(1, maxScale), tx: 0, ty: 0,
                 topBand: 0, bottomBand: 0, leftBand: 0, rightBand: 0,
                 reserved: false, clear: true, degradedX: false, degradedY: false };
    if (!wrap || typeof wrap.getBoundingClientRect !== 'function') return bail;

    var b = opts.bounds || {};
    var minX = num(b.minX, 0), minY = num(b.minY, 0);
    var cw = num(b.maxX, 0) - minX;
    var ch = num(b.maxY, 0) - minY;
    if (!(cw > 0) || !(ch > 0)) return bail;   // degenerate bounds — never NaN out

    var rect = wrap.getBoundingClientRect();

    /* VIEWPORT SIZE IS CALLER-OWNED. Engines historically differ in how they measure
       the canvas: the static engines read getBoundingClientRect() (fractional), the
       interactive spine reads clientWidth/clientHeight (integer, border-box excluded).
       That distinction belongs to each engine, not to this utility — silently picking
       one source for all of them would be an unrelated render-contract change. So the
       caller may supply its own measurement; absent it, the border box is the default. */
    var vp = opts.viewport;
    var viewportWidth  = (vp && isFinite(vp.width))  ? +vp.width  : rect.width;
    var viewportHeight = (vp && isFinite(vp.height)) ? +vp.height : rect.height;
    if (!(viewportWidth > 0) || !(viewportHeight > 0)) return bail;

    /* ---------- pass 1: zero-band base candidate ----------
       Exact prior formula in the ordinary region; continuous-clearance arithmetic on a
       constrained axis. Not necessarily the exact prior transform — see place(). */
    var base = place(0, 0, viewportWidth, viewportHeight, cw, ch, minX, minY,
                     clearanceX, clearanceY, maxScale);
    var baseRect = {
      left:   minX * base.scale + base.tx,
      top:    minY * base.scale + base.ty,
      right:  (minX + cw) * base.scale + base.tx,
      bottom: (minY + ch) * base.scale + base.ty
    };

    var sel = function (k, d) { return opts[k] !== undefined ? opts[k] : d; };
    var top    = panelRects(wrap, rect, sel('topSelector',    DEFAULTS.topSelector));
    var bottom = panelRects(wrap, rect, sel('bottomSelector', DEFAULTS.bottomSelector));
    var left   = panelRects(wrap, rect, sel('leftSelector',   DEFAULTS.leftSelector));
    var right  = panelRects(wrap, rect, sel('rightSelector',  DEFAULTS.rightSelector));

    var all = top.concat(bottom, left, right);
    var collides = false;
    for (var i = 0; i < all.length; i++) {
      if (intersects(baseRect, all[i], gutter)) { collides = true; break; }
    }

    /* Already clear — no panel reservation is needed. Return the base candidate unchanged
       rather than shrinking a figure to avoid chrome it does not reach. */
    if (!collides) {
      return { scale: base.scale, tx: base.tx, ty: base.ty,
               topBand: 0, bottomBand: 0, leftBand: 0, rightBand: 0,
               reserved: false, clear: true, degradedX: false, degradedY: false };
    }

    /* ---------- pass 2: edge-aware reserved fit ---------- */
    function deepest(list, fn) {
      var d = 0;
      for (var i = 0; i < list.length; i++) {
        var v = fn(list[i]);
        if (isFinite(v) && v > d) d = v;
      }
      return d;
    }
    var topBand    = deepest(top,    function (p) { return p.bottom; });
    var bottomBand = deepest(bottom, function (p) { return viewportHeight - p.top; });
    var leftBand   = deepest(left,   function (p) { return p.right; });
    var rightBand  = deepest(right,  function (p) { return viewportWidth - p.left; });

    if (topBand    > 0) topBand    += gutter;
    if (bottomBand > 0) bottomBand += gutter;
    if (leftBand   > 0) leftBand   += gutter;
    if (rightBand  > 0) rightBand  += gutter;

    /* If reserving an axis would leave no usable room, reserving it would push content
       out of view — worse than the collision. Degrade that axis to the full viewport.
       Axes degrade independently: a crowded vertical stack must not discard a perfectly
       usable horizontal reservation.

       The flags record only a DISCARDED nonzero reservation, so a caller can distinguish
       "this axis had nothing to reserve" from "this axis could not fit what it needed". */
    var degradedY = false, degradedX = false;
    if (viewportHeight - topBand - bottomBand < DEFAULTS.minAvailable) {
      degradedY = topBand > 0 || bottomBand > 0;
      topBand = 0; bottomBand = 0;
    }
    if (viewportWidth - leftBand - rightBand < DEFAULTS.minAvailable) {
      degradedX = leftBand > 0 || rightBand > 0;
      leftBand = 0; rightBand = 0;
    }

    var out = place(leftBand, topBand,
                    viewportWidth  - leftBand - rightBand,
                    viewportHeight - topBand  - bottomBand,
                    cw, ch, minX, minY, clearanceX, clearanceY, maxScale);

    /* POST-PLACEMENT VALIDATION. `reserved: true` must not be read as "succeeded":
       when an axis degrades, the reservation that would have cleared the chrome is the
       one discarded, so the final placement can still be obstructed. Re-test it against
       the same gutter-inflated inventory the gate used, and report the honest answer. */
    var finalRect = {
      left:   minX * out.scale + out.tx,
      top:    minY * out.scale + out.ty,
      right:  (minX + cw) * out.scale + out.tx,
      bottom: (minY + ch) * out.scale + out.ty
    };
    var clear = true;
    for (var j = 0; j < all.length; j++) {
      if (intersects(finalRect, all[j], gutter)) { clear = false; break; }
    }

    return { scale: out.scale, tx: out.tx, ty: out.ty,
             topBand: topBand, bottomBand: bottomBand,
             leftBand: leftBand, rightBand: rightBand,
             reserved: true, clear: clear, degradedX: degradedX, degradedY: degradedY };
  }

  window.DIAGRAM_FIT = { compute: compute, VERSION: 1 };
})();
