/* diagrams-fit.js — design-system-ASK shared fit contract (v3, 2026-10-08: opt-in placement; v2, 2026-09-28:
   declared edges; v1, 2026-07-18)

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
   four-edge safe rectangle covers it while staying deterministic and inspectable. The v3
   options below add one bounded, deterministic step: a vertical free-range calculation, and
   for `marks` a descending scale search over at most three horizontal centres.

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
   Without the v3 options below, this file changes fit geometry in exactly two ways:
   reserving the panel band, and degrading clearance continuously on a constrained axis.
   Nothing else.

   V3 PLACEMENT OPTIONS — opt-in per caller; a caller that passes none of them receives the
   v2 result above, unchanged
     balance           Centre the content VERTICALLY in the free range it occupies: the
                       range between the nearest chrome above it and the nearest chrome
                       below it (each kept at `gutter`), or the canvas margin where there is
                       none. Scale and horizontal position are the v2 result's (see
                       data-diagram-fit-max-height for which v2 pass). Before v3 a figure
                       that already cleared the panels stayed centred on the WHOLE canvas,
                       so a short wide figure sat closer to its top panels than to the HUD.
                       Only placements the panels actually bound move: a panel beside the
                       content, not above or below it, shapes the free range only where it
                       overlaps the content horizontally.
     marks             The content rectangles actually drawn (see marksOf), in bounds
                       coordinates. Collision is tested against these instead of the one
                       bounds rectangle, so a sparse figure whose empty corners sit under a
                       panel is not shrunk to clear chrome that covers nothing. When the
                       full-canvas candidate collides, scales are tried in 1% steps from it,
                       centred on the canvas or on a v2 pass's reserved rectangle, and the
                       first with a clear vertical position wins. Every drawn mark then keeps
                       `gutter` from every panel. The search stops at the scale of the larger
                       v2 pass whose placement has a clear vertical position against the same
                       marks and panels, and otherwise at 40% of the full-canvas scale or the
                       smaller pass's scale, whichever is lower. When none clears, that pass's
                       placement is used at its clear position; where no pass has one, the
                       declared-height pass's placement comes back reporting `clear: false`.
     data-diagram-fit-max-height
                       A bottom-anchored panel whose content changes after the fit — a
                       definition filled in on hover or pin — declares the tallest height it
                       reaches, measured up from its bottom edge. With either option above, the
                       panel counts at that height in the search and in every `clear` reported,
                       even while it is empty or hidden at rest, as long as it is laid out.
                       The options start from two v2 passes, one with the panels at their
                       declared heights and one at rest, each tested against the declared
                       heights, so a declared height does at least as well as the same panel
                       already that tall and never drops a placement the pass at rest keeps
                       clear of it. Nothing refits when the content changes, so the drawing
                       never moves under the reader's pointer, and while the result reports
                       `clear` no definition covers a mark. Without either option the
                       attribute is ignored.
     compactClearance  A cap on the total clearance per axis while the wrap's responsive
                       chrome (diagrams-chrome.js) is compact. The compact chrome already folds
                       the panels away, and a fixed 80-90px clearance cost a phone canvas a
                       fifth of its width. On its own it changes only the clearance: the result
                       is otherwise the v2 contract and does not read the declared heights.

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
    topSelector: '.caption:not([data-diagram-fit-edge]), .legend:not([data-diagram-fit-edge]), [data-diagram-fit-edge="top"]',
    bottomSelector: '.hud, [data-diagram-fit-edge="bottom"]',
    leftSelector: null,
    rightSelector: null,
    minAvailable: 120
  };

  /* A panel counts only if it is actually rendered: display:none, visibility:hidden,
     opacity:0, and zero-area elements are ignored rather than reserving a phantom band
     (the v3 placement also counts a laid-out panel that declares its height; see
     panelRects).
     Chrome may also declare the edge it is anchored to with data-diagram-fit-edge="top" or
     "bottom"; a declared caption or legend counts only at its declared edge. On a page
     using diagrams-chrome.js, the compact trigger row and open panel declare "bottom", so
     the control area they share with the HUD is reserved as one bottom band. Any other
     declared value ("none") takes a caption, legend or declared element out of both
     edges; the HUD is bottom chrome whatever it declares. With no declaration present,
     the defaults select exactly the panels they always did. VERSION 2 marks this
     contract: an engine driving diagrams-chrome.js requires it and fails closed on an
     older copy. VERSION 3 adds the opt-in placement options; it changes nothing for a
     caller that does not pass them, and a caller that passes them requires it. */
  function isVisible(el) {
    if (!el) return false;
    var cs = (el.ownerDocument.defaultView || window).getComputedStyle(el);
    if (!cs) return true;
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    if (parseFloat(cs.opacity) === 0) return false;
    return true;
  }

  /* Visible panels for one selector, as rectangles in WRAP-LOCAL coordinates. With `grow`
     (the v3 placement only), a panel that declares data-diagram-fit-max-height counts at
     that height, measured up from its bottom edge, and counts even while it is empty or
     hidden at rest, as long as it is laid out: the declared state is the one that matters. */
  function panelRects(wrap, wrapRect, selector, grow) {
    if (!selector) return [];
    var els;
    try { els = wrap.querySelectorAll(selector); } catch (e) { return []; }
    var list = [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var mh = grow ? parseFloat(el.getAttribute('data-diagram-fit-max-height')) : NaN;
      var declared = isFinite(mh) && mh > 0;
      if (!declared && !isVisible(el)) continue;
      var r = el.getBoundingClientRect();
      if (!(r.width > 0) || (!declared && !(r.height > 0))) continue;
      var top = r.top;
      if (declared && mh > r.height) top = r.bottom - mh;
      list.push({
        left:   r.left   - wrapRect.left,
        top:    top      - wrapRect.top,
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
     A caller that must clear the chrome checks `clear`, not `reserved`.
     This is the v2 contract; compute() below adds the v3 options on top of it. With `grow`
     (the v3 placement only) every panel counts at its declared height. */
  function computeV2(opts, grow) {
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
    var top    = panelRects(wrap, rect, sel('topSelector',    DEFAULTS.topSelector),    grow);
    var bottom = panelRects(wrap, rect, sel('bottomSelector', DEFAULTS.bottomSelector), grow);
    var left   = panelRects(wrap, rect, sel('leftSelector',   DEFAULTS.leftSelector),   grow);
    var right  = panelRects(wrap, rect, sel('rightSelector',  DEFAULTS.rightSelector),  grow);

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

  /* ---------- v3: opt-in placement ---------- */

  /* Allowed translateY ranges for `shapes` at scale `s` and translateX `tx`, inside
     [lo, hi]. A shape collides with a panel exactly when intersects() says so; for a shape
     that overlaps the gutter-inflated panel horizontally, that is an OPEN interval of ty,
     so a range may end exactly where a collision begins (touching is clear). */
  function freeRanges(shapes, s, tx, panels, g, lo, hi) {
    if (!(hi >= lo)) return [];
    var bad = [];
    for (var i = 0; i < shapes.length; i++) {
      var m = shapes[i];
      var x0 = m.minX * s + tx, x1 = m.maxX * s + tx;
      for (var j = 0; j < panels.length; j++) {
        var p = panels[j];
        if (x0 < p.right + g && x1 > p.left - g) bad.push([p.top - g - m.maxY * s, p.bottom + g - m.minY * s]);
      }
    }
    bad.sort(function (a, b) { return a[0] - b[0]; });
    var out = [], cur = lo;
    for (var k = 0; k < bad.length; k++) {
      var a = bad[k][0], b = bad[k][1];
      if (b <= cur) continue;
      if (a >= hi) break;
      if (a >= cur) out.push([cur, a]);
      if (b > cur) cur = b;
      if (cur > hi) break;
    }
    if (cur <= hi) out.push([cur, hi]);
    return out;
  }

  /* The range containing `t`, or else the nearest one. */
  function nearestRange(ranges, t) {
    var best = null, bd = Infinity;
    for (var i = 0; i < ranges.length; i++) {
      var r = ranges[i], d = t < r[0] ? r[0] - t : (t > r[1] ? t - r[1] : 0);
      if (d < bd) { bd = d; best = r; }
    }
    return best;
  }

  /* Whether the wrap's responsive chrome is in its compact mode. */
  function isCompact(wrap) {
    var info;
    try { info = wrap.querySelector('.diagram-info[data-diagram-chrome]'); } catch (e) { return false; }
    return !!(info && info.getAttribute('data-diagram-chrome') === 'compact');
  }

  function paints(v, op) {
    if (!v || v === 'none' || v === 'transparent' || /rgba\([^)]*,\s*0\)$/.test(v)) return false;
    return !(parseFloat(op) === 0);
  }

  /* marksOf(svg, bounds) -> [{minX,minY,maxX,maxY}] | null
     The rendered marks of `svg` in BOUNDS coordinates: every painted graphic element outside
     <defs>, measured from the screen and mapped back through the svg element's own box, so
     the stage transform in force at measurement time does not matter. Unpainted hit layers
     and a full-size background are left out; a path contributes its bounding box, which can
     only over-state what it covers. Measurement only: it changes nothing. */
  function marksOf(svg, bounds) {
    if (!svg || typeof svg.getBoundingClientRect !== 'function' || !bounds) return null;
    var sr = svg.getBoundingClientRect();
    if (!(sr.width > 0) || !(sr.height > 0)) return null;
    var minX = num(bounds.minX, 0), minY = num(bounds.minY, 0);
    var fx = (num(bounds.maxX, 0) - minX) / sr.width, fy = (num(bounds.maxY, 0) - minY) / sr.height;
    if (!(fx > 0) || !(fy > 0)) return null;
    var win = svg.ownerDocument.defaultView || window, out = [];
    var els = svg.querySelectorAll('rect, text, path, line, polyline, polygon, circle, ellipse, image, use');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.closest('defs, clipPath, mask, marker, pattern, symbol')) continue;
      var cs = win.getComputedStyle(el);
      if (!cs || cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
      var tag = el.tagName.toLowerCase();
      if (tag !== 'image' && tag !== 'use' &&
          !paints(cs.fill, cs.fillOpacity) && !(paints(cs.stroke, cs.strokeOpacity) && parseFloat(cs.strokeWidth) > 0)) continue;
      var r = el.getBoundingClientRect();
      if (!(r.width > 0) && !(r.height > 0)) continue;
      if (r.width >= sr.width * 0.98 && r.height >= sr.height * 0.98) continue;
      out.push({ minX: minX + (r.left - sr.left) * fx, minY: minY + (r.top - sr.top) * fy,
                 maxX: minX + (r.right - sr.left) * fx, maxY: minY + (r.bottom - sr.top) * fy });
    }
    return out.length ? out : null;
  }

  /* compute(opts) — the v2 contract, plus the v3 options `balance`, `marks` and
     `compactClearance` (see the header). Same result shape. */
  function compute(opts) {
    opts = opts || {};
    var compactC = num(opts.compactClearance, NaN);
    var useMarks = Array.isArray(opts.marks) && opts.marks.length > 0;
    if (!opts.balance && !useMarks && !isFinite(compactC)) return computeV2(opts);

    var wrap = opts.wrap;
    if (isFinite(compactC) && wrap && typeof wrap.querySelector === 'function' && isCompact(wrap)) {
      opts = Object.assign({}, opts, {
        clearanceX: Math.min(num(opts.clearanceX, DEFAULTS.clearanceX), compactC),
        clearanceY: Math.min(num(opts.clearanceY, DEFAULTS.clearanceY), compactC) });
    }
    if (!opts.balance && !useMarks) return computeV2(opts);
    /* Two v2 passes: one with every panel at its declared height, the inventory these options
       test, and one at rest. They differ only where a panel declares a height. Each is tested
       against the declared heights before it is used (clearTy below): the larger one that
       clears sets the search floor and the fallback, and both reserved centres are tried. A
       declared height therefore does at least as well as the same panel already that tall,
       and never drops a placement the pass at rest keeps clear of it. */
    var v2 = computeV2(opts, true), atRest = computeV2(opts);
    if (!wrap || typeof wrap.getBoundingClientRect !== 'function') return v2;

    var b = opts.bounds || {};
    var minX = num(b.minX, 0), minY = num(b.minY, 0), maxX = num(b.maxX, 0), maxY = num(b.maxY, 0);
    if (!(maxX - minX > 0) || !(maxY - minY > 0)) return v2;
    var rect = wrap.getBoundingClientRect();
    var vp = opts.viewport;
    var W = (vp && isFinite(vp.width)) ? +vp.width : rect.width;
    var H = (vp && isFinite(vp.height)) ? +vp.height : rect.height;
    if (!(W > 0) || !(H > 0)) return v2;
    var g = num(opts.gutter, DEFAULTS.gutter);
    var clearanceX = num(opts.clearanceX, DEFAULTS.clearanceX), clearanceY = num(opts.clearanceY, DEFAULTS.clearanceY);
    var sel = function (k, d) { return opts[k] !== undefined ? opts[k] : d; };
    var panels = panelRects(wrap, rect, sel('topSelector', DEFAULTS.topSelector), true)
      .concat(panelRects(wrap, rect, sel('bottomSelector', DEFAULTS.bottomSelector), true),
              panelRects(wrap, rect, sel('leftSelector', DEFAULTS.leftSelector), true),
              panelRects(wrap, rect, sel('rightSelector', DEFAULTS.rightSelector), true));
    var box = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    var shapes = useMarks ? opts.marks : [box];
    /* The canvas margin the base candidate keeps: half the effective clearance per side. */
    var mX = Math.min(clearanceX, W / 2) / 2, mY = Math.min(clearanceY, H / 2) / 2;
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    var tyRange = function (s, t) {
      return [Math.min(mY - minY * s, t), Math.max(H - mY - maxY * s, t)];
    };
    var place = function (s, tx, target) {
      var lim = tyRange(s, target);
      var r = nearestRange(freeRanges(shapes, s, tx, panels, g, lim[0], lim[1]), target);
      if (!r) return null;
      return opts.balance ? (r[0] + r[1]) / 2 : Math.min(r[1], Math.max(r[0], target));
    };
    /* The result describes the placement actually returned: the bands of the v2 pass it
       started from (its reserved centre or its fallback; zero otherwise), and `clear`
       re-tested on that placement against this inventory: the shapes, and every panel at its
       declared height. Below, v2 is returned as it is only where its own `clear`, tested
       against those same panels, is false (balance only) or the maxScale is degenerate. */
    var clearAt = function (s, tx, ty) {
      for (var i = 0; i < shapes.length; i++) {
        var m = shapes[i], r = { left: m.minX * s + tx, top: m.minY * s + ty, right: m.maxX * s + tx, bottom: m.maxY * s + ty };
        for (var j = 0; j < panels.length; j++) if (intersects(r, panels[j], g)) return false;
      }
      return true;
    };
    var done = function (s, tx, ty, from) {
      var r = from && from.reserved ? from : null;
      return { scale: s, tx: tx, ty: ty,
               topBand: r ? r.topBand : 0, bottomBand: r ? r.bottomBand : 0,
               leftBand: r ? r.leftBand : 0, rightBand: r ? r.rightBand : 0,
               reserved: !!r, clear: clearAt(s, tx, ty),
               degradedX: !!r && r.degradedX, degradedY: !!r && r.degradedY };
    };
    /* A v2 pass's placement moved to a clear vertical position against this inventory, or
       null where it has none. */
    var clearTy = function (p) {
      var t = place(p.scale, p.tx, p.ty);
      return t !== null && clearAt(p.scale, p.tx, t) ? t : null;
    };
    var passes = [v2];
    if (atRest.scale !== v2.scale || atRest.tx !== v2.tx || atRest.ty !== v2.ty || atRest.clear !== v2.clear ||
        atRest.reserved !== v2.reserved || atRest.leftBand !== v2.leftBand || atRest.rightBand !== v2.rightBand) passes.push(atRest);
    /* The larger pass, among those `ok` admits, whose placement has a clear position. */
    var best = function (ok) {
      var pick = null, ty = null;
      for (var k = 0; k < passes.length; k++) {
        if (!ok(passes[k])) continue;
        var t = clearTy(passes[k]);
        if (t !== null && (!pick || passes[k].scale > pick.scale)) { pick = passes[k]; ty = t; }
      }
      return pick ? { pass: pick, ty: ty } : null;
    };

    if (!useMarks) {
      /* balance only: keep a v2 pass's scale and horizontal position; move only vertically,
         and only from a pass that was already clear. Where neither clears, the pass at the
         declared heights comes back as it is. */
      var b0 = best(function (p) { return p.clear; });
      if (b0) return done(b0.pass.scale, b0.pass.tx, b0.ty, b0.pass);
      return v2.clear ? done(v2.scale, v2.tx, v2.ty, v2) : v2;
    }

    /* marks: the largest scale, in 1% steps from the full-canvas candidate, that has a clear
       vertical position at the canvas centre or at either pass's reserved centre. The search
       stops at the scale of the larger pass whose placement has a clear position (ref), and
       otherwise at 40% of the full-canvas scale or the smaller pass's scale, whichever is
       lower. */
    var maxScale = num(opts.maxScale, DEFAULTS.maxScale);
    var effX = Math.min(clearanceX, W / 2), effY = Math.min(clearanceY, H / 2);
    var s0 = Math.min((W - effX) / (maxX - minX), (H - effY) / (maxY - minY), maxScale);
    if (!isFinite(s0) || s0 <= 0) return v2;
    var ref = best(function () { return true; });
    var floor = s0 * 0.4;
    for (var k0 = 0; k0 < passes.length; k0++) floor = Math.min(floor, passes[k0].scale);
    if (ref) floor = ref.pass.scale;
    var centres = [{ x: W / 2, from: null }];
    for (var k = 0; k < passes.length; k++) {
      var p = passes[k];
      if (!p.reserved) continue;
      var rc = (p.leftBand + W - p.rightBand) / 2, seen = false;
      for (var q = 0; q < centres.length; q++) if (Math.abs(centres[q].x - rc) <= 0.5) seen = true;
      if (!seen) centres.push({ x: rc, from: p });
    }
    for (var i = 0; i < 100; i++) {
      var s = s0 * (1 - i * 0.01);
      if (s < floor - 1e-9) break;
      for (var c = 0; c < centres.length; c++) {
        var tx = centres[c].x - cx * s;
        tx = Math.min(W - mX - maxX * s, Math.max(mX - minX * s, tx));
        var ty = place(s, tx, H / 2 - cy * s);
        if (ty !== null && clearAt(s, tx, ty)) return done(s, tx, ty, centres[c].from);
      }
    }
    /* Nothing larger cleared: ref's placement at its clear position, or, where no pass has
       one, the pass at the declared heights as it is, reporting `clear: false`. */
    return ref ? done(ref.pass.scale, ref.pass.tx, ref.ty, ref.pass) : done(v2.scale, v2.tx, v2.ty, v2);
  }

  window.DIAGRAM_FIT = { compute: compute, marksOf: marksOf, VERSION: 3 };
})();
