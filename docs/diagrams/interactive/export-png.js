/* export-png.js — 3840×2880 PNG export for the interactive IA state spine.

   design-system-ASK Class A *interactive* diagram pattern. Parity with the static
   diagrams' export-png.js (same page size, same "PNG" button in the .hud, same
   ?export=png auto-run hook, same filename grammar), adapted to the interactive
   surface: the diagram <svg> has no width/height attributes (it is CSS-sized and
   pan/zoomed via a #vp transform), and node color comes from the per-node
   --st → --state-* role rather than the static scaffold's --node-fill. So the
   content bounds are read from #vp.getBBox() and every presentation property (the
   resolved Spectral State colors, foundation chrome colors, fonts) is baked inline
   into a freshly serialized, self-contained SVG before it is rasterized — no
   external CSS, no var() left to resolve, theme correct at click time.

   Color encodes state only; this is a faithful snapshot of the rendered surface,
   not a re-interpretation of it.
*/
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var PAGE_W = 3840, PAGE_H = 2880, HEADER_H = 100, M = 56, OVERLAY_INSET = 24;

  var xml = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
    });
  };
  var text = function (el) { return (el ? el.textContent : '').replace(/\s+/g, ' ').trim(); };
  var cssVar = function (name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  };

  /* ---------- font embedding (fixes right-edge clipping in the raster) ----------
     SVG-as-image rasterization (data:image/svg+xml → <img> → canvas) is
     font-isolated in Chromium: the SVG document cannot reach the *page's*
     @font-face web fonts. Referencing the fonts by family name only makes the
     raster fall back to a system font — a WIDER monospace than JetBrains Mono —
     so node text laid out for the narrower web font overflows its box. Fix: read
     the page's OWN @font-face faces, fetch each woff2, and inline them as base64
     data-URI @font-face rules inside the exported SVG, so the raster resolves the
     same faces the live surface rendered with. Consumer-agnostic; degrades to the
     prior name-only behavior (never throws) if a font can't be fetched. */
  var _fontStyleCache = null;
  function collectFontFaces() {
    var faces = [], sheets = document.styleSheets;
    for (var s = 0; s < sheets.length; s++) {
      var rules;
      try { rules = sheets[s].cssRules; } catch (e) { continue; } // cross-origin sheet: skip
      if (!rules) continue;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (rule.type !== 5 /* CSSFontFaceRule */) continue;
        var m = /url\(\s*['"]?([^'")]+\.woff2)['"]?\s*\)/i.exec(rule.style.getPropertyValue('src'));
        if (!m) continue;
        var abs;
        try { abs = new URL(m[1], sheets[s].href || document.baseURI).href; } catch (e) { continue; }
        faces.push({
          family: rule.style.getPropertyValue('font-family'),
          weight: rule.style.getPropertyValue('font-weight') || 'normal',
          style: rule.style.getPropertyValue('font-style') || 'normal',
          url: abs,
        });
      }
    }
    var seen = {}, out = [];
    for (var i = 0; i < faces.length; i++) {
      var k = faces[i].url + '|' + faces[i].weight + '|' + faces[i].style;
      if (!seen[k]) { seen[k] = 1; out.push(faces[i]); }
    }
    return out;
  }
  function bufToBase64(buf) {
    var bytes = new Uint8Array(buf), bin = '', chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }
  async function buildFontFaceStyle() {
    if (_fontStyleCache != null) return _fontStyleCache;
    var faces = collectFontFaces();
    var css = '';
    for (var i = 0; i < faces.length; i++) {
      var f = faces[i];
      try {
        var resp = await fetch(f.url);
        if (!resp.ok) continue;
        var b64 = bufToBase64(await resp.arrayBuffer());
        css += '@font-face{font-family:' + f.family + ';font-style:' + f.style +
          ';font-weight:' + f.weight + ';src:url(data:font/woff2;base64,' + b64 + ') format("woff2");}';
      } catch (e) { /* one font failed to fetch — skip it, keep the rest */ }
    }
    _fontStyleCache = css ? '<style>' + css + '</style>' : '';
    return _fontStyleCache;
  }

  /* Presentation properties baked inline so the exported SVG is fully
     self-contained (no stylesheet, no custom-property resolution needed). */
  var INLINE_PROPS = [
    'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-dasharray',
    'stroke-opacity', 'opacity', 'font-family', 'font-size', 'font-weight',
    'font-style', 'letter-spacing', 'text-transform', 'dominant-baseline',
    'text-anchor',
  ];

  /* Walk a live subtree and its deep clone in lockstep (querySelectorAll('*')
     is document-order, identical for both), copying computed presentation
     style onto the clone and dropping classes. Bakes the resolved --state-*
     colors and fonts so the snapshot is theme-correct and CSS-free. */
  function inlineStyles(liveRoot, cloneRoot) {
    var live = [liveRoot].concat(Array.prototype.slice.call(liveRoot.querySelectorAll('*')));
    var clone = [cloneRoot].concat(Array.prototype.slice.call(cloneRoot.querySelectorAll('*')));
    for (var i = 0; i < live.length && i < clone.length; i++) {
      var cs = getComputedStyle(live[i]);
      var st = '';
      for (var p = 0; p < INLINE_PROPS.length; p++) {
        var v = cs.getPropertyValue(INLINE_PROPS[p]);
        if (v) st += INLINE_PROPS[p] + ':' + v + ';';
      }
      clone[i].setAttribute('style', st);
      clone[i].removeAttribute('class');
      // SVG-as-image does not always apply text-transform; bake it.
      if (cs.getPropertyValue('text-transform') === 'uppercase') {
        for (var c = 0; c < clone[i].childNodes.length; c++) {
          var ch = clone[i].childNodes[c];
          if (ch.nodeType === 3) ch.nodeValue = ch.nodeValue.toUpperCase();
        }
      }
    }
  }

  /* Reset the live surface to its unselected resting view so the snapshot is
     the neutral diagram (no dimmed/selected nodes, no transient edges). */
  function neutralize(svg) {
    var ex = svg.querySelectorAll('#edges .edge');
    for (var i = 0; i < ex.length; i++) ex[i].parentNode.removeChild(ex[i]);
    var sel = svg.querySelectorAll('.node.dim, .node.sel');
    for (var j = 0; j < sel.length; j++) sel[j].classList.remove('dim', 'sel');
  }

  function getStampParts() {
    return Array.prototype.slice
      .call(document.querySelectorAll('.bar .stamp .k'))
      .map(function (e) { return text(e); });
  }
  function getLegendRows() {
    return Array.prototype.slice.call(document.querySelectorAll('.legend .row')).map(function (r) {
      var sw = r.querySelector('.sw');
      return {
        color: sw ? getComputedStyle(sw).backgroundColor : 'currentColor',
        lbl: text(r.querySelector('.lbl')),
      };
    });
  }
  function getFilenameBase() {
    var file = location.pathname.split('/').pop() || 'diagram.html';
    return decodeURIComponent(file).replace(/\.html?$/i, '');
  }
  // Resolved light/dark theme, matching the CSS precedence: an explicit
  // data-theme on <html> wins, otherwise the OS prefers-color-scheme. Used to
  // suffix the export filename (-light / -dark) so the two renders don't collide.
  function getThemeName() {
    var explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function buildSvg(fontStyle) {
    var svg = document.getElementById('svg');
    neutralize(svg);
    var vp = svg.querySelector('#vp');
    var bb = vp.getBBox(); // content bounds in content space (vp's own transform excluded)
    if (!bb || !bb.width || !bb.height) return null;

    // Clone the content (edges + nodes), strip the pan/zoom transform, bake styles.
    var content = document.createElementNS(NS, 'g');
    var live = svg.querySelectorAll('#edges, #nodes');
    for (var i = 0; i < live.length; i++) {
      var clone = live[i].cloneNode(true);
      clone.removeAttribute('transform');
      inlineStyles(live[i], clone);
      content.appendChild(clone);
    }

    // Fit the content into the page below the header, centered.
    var diagTop = HEADER_H + 24, diagBot = PAGE_H - M, diagLeft = M, diagRight = PAGE_W - M;
    var availW = diagRight - diagLeft, availH = diagBot - diagTop;
    var scale = Math.min(availW / bb.width, availH / bb.height);
    var sw = bb.width * scale, sh = bb.height * scale;
    var sx = diagLeft + (availW - sw) / 2, sy = diagTop + (availH - sh) / 2;
    content.setAttribute(
      'transform',
      'translate(' + sx + ' ' + sy + ') scale(' + scale + ') translate(' + (-bb.x) + ' ' + (-bb.y) + ')'
    );

    // Resolve chrome palette at click time (theme-correct).
    var bgFrom = cssVar('--bg-from', '#D4C6E1');
    var bgTo = cssVar('--bg-to', '#E2D3F0');
    var fg1 = cssVar('--fg-1', '#6A637F');
    var fg2 = cssVar('--fg-2', '#827399');
    var line1 = cssVar('--line-1', 'rgba(255,255,255,0.45)');
    var panel = cssVar('--bg-from', '#D4C6E1');

    // Header chrome (mirrors the live .bar).
    var mark = text(document.querySelector('.bar .mark'));
    var title = text(document.querySelector('.bar .title-block .t'));
    var subtitle = text(document.querySelector('.bar .title-block .s'));
    var stamp = getStampParts();
    var stampLine = stamp.join(' // ').toUpperCase();
    var dateLine = text(document.querySelectorAll('.bar .stamp > div')[1]);

    // Overlay cards follow the static export poster grammar: caption top-left,
    // legend top-right. (The live interactive view positions these in the
    // bottom corners; the exported poster matches the cross-diagram static set.)
    var overlayY = HEADER_H + OVERLAY_INSET;

    // Legend card (top-right).
    var legend = getLegendRows();
    var legendW = 360, legendH = 56 + legend.length * 40 + 14;
    var legendX = PAGE_W - M - legendW, legendY = overlayY;
    var legendBody =
      '<rect x="' + legendX + '" y="' + legendY + '" width="' + legendW + '" height="' + legendH +
      '" rx="16" fill="' + panel + '" fill-opacity="0.5" stroke="' + line1 + '"/>' +
      '<text x="' + (legendX + 26) + '" y="' + (legendY + 34) +
      '" font-family="monospace" font-size="13" letter-spacing="2.4" fill="' + fg2 + '">STATE</text>';
    legend.forEach(function (row, i) {
      var y = legendY + 60 + i * 40;
      legendBody +=
        '<rect x="' + (legendX + 26) + '" y="' + (y - 9) + '" width="18" height="18" rx="4" fill="' + row.color + '"/>' +
        '<text x="' + (legendX + 58) + '" y="' + (y + 5) +
        '" font-size="18" fill="' + fg1 + '">' + xml(row.lbl) + '</text>';
    });

    // Caption card (top-left) — the live .caption line.
    var caption = text(document.querySelector('.caption'));
    var capW = 600, capH = 64, capX = M, capY = overlayY;
    var captionBody = caption ?
      '<rect x="' + capX + '" y="' + capY + '" width="' + capW + '" height="' + capH +
      '" rx="16" fill="' + panel + '" fill-opacity="0.5" stroke="' + line1 + '"/>' +
      '<text x="' + (capX + 26) + '" y="' + (capY + 39) +
      '" font-family="monospace" font-size="14" fill="' + fg2 + '">' + xml(caption) + '</text>'
      : '';

    var serializer = new XMLSerializer();
    var contentStr = serializer.serializeToString(content);

    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<svg xmlns="' + NS + '" width="' + PAGE_W + '" height="' + PAGE_H +
      '" viewBox="0 0 ' + PAGE_W + ' ' + PAGE_H + '">\n' +
      '  <defs>\n' +
      '    ' + (fontStyle || '') + '\n' +
      '    <linearGradient id="pageBg" x1="0%" y1="100%" x2="100%" y2="0%">\n' +
      '      <stop offset="0%" stop-color="' + bgFrom + '"/>\n' +
      '      <stop offset="100%" stop-color="' + bgTo + '"/>\n' +
      '    </linearGradient>\n' +
      '    <style>text { font-family: Inter, system-ui, sans-serif; }</style>\n' +
      '  </defs>\n' +
      '  <rect width="100%" height="100%" fill="url(#pageBg)"/>\n' +
      '  <line x1="0" y1="' + HEADER_H + '" x2="' + PAGE_W + '" y2="' + HEADER_H + '" stroke="' + line1 + '"/>\n' +
      '  <text x="' + M + '" y="44" font-size="24" font-weight="500" fill="' + fg1 + '">' + xml(mark) + '</text>\n' +
      '  <text x="' + M + '" y="74" font-size="20" font-weight="400" fill="' + fg1 + '">' + xml(title) + '</text>\n' +
      '  <text x="' + M + '" y="94" font-family="monospace" font-size="12" letter-spacing="0.8" fill="' + fg2 + '">' + xml(subtitle) + '</text>\n' +
      '  <text x="' + (PAGE_W - M) + '" y="44" text-anchor="end" font-family="monospace" font-size="14" font-weight="500" letter-spacing="1.1" fill="' + fg1 + '">' + xml(stampLine) + '</text>\n' +
      '  <text x="' + (PAGE_W - M) + '" y="68" text-anchor="end" font-family="monospace" font-size="12" letter-spacing="1.1" fill="' + fg2 + '">' + xml(dateLine) + '</text>\n' +
      '  ' + contentStr + '\n' +
      captionBody + '\n' +
      legendBody + '\n' +
      '</svg>';
  }

  /* ---------- diagram-only build (PNG diagram) ----------
     The interactive svg is CSS-sized with no width/height/viewBox, so the diagram
     bounds are the live content bounds of #vp — its full subtree (edges, nodes,
     labels, connectors), not a node-only box, the same bounds the page export uses.

     Reproduce the proven clean-render recipe EXACTLY — it is a TWO-step sizing:
       (1) size the viewport: viewport = round(bb × S) + 220, S capped at 1.1 and
           at 1500 / longest-edge;
       (2) rerun the engine's fit() into that viewport: 80px padding budget, scale
           capped at 1.2×, content centered.
     Earlier this collapsed to a single `S × raster` scale with flat padding, which
     reproduced the OUTER dimensions but under-scaled and over-padded the diagram
     WITHIN (v4 audit). The fit() step is what scales the diagram up to fill.
     Header / caption / legend / HUD live outside #edges/#nodes, so cloning only
     those excludes them. neutralize() gives the stable resting frame; per-node
     semantic state (--st → --state-*) is preserved by inlineStyles. */
  function buildDiagramSvg(fontStyle) {
    var svg = document.getElementById('svg');
    neutralize(svg);
    var vp = svg.querySelector('#vp');
    var bb = vp.getBBox();
    if (!bb || !bb.width || !bb.height) return null;
    var w = bb.width, h = bb.height;

    // (1) viewport sizing — the clean-shell recipe.
    var S = Math.min(1.1, 1500 / Math.max(w, h));
    var viewportW = Math.round(w * S) + 220;
    var viewportH = Math.round(h * S) + 220;
    // (2) engine fit() into that viewport: 80px padding budget, 1.2× cap, centered.
    var fitScale = Math.min((viewportW - 80) / w, (viewportH - 80) / h, 1.2);
    var RASTER = 2;
    var outW = viewportW * RASTER;
    var outH = viewportH * RASTER;
    var scale = fitScale * RASTER;
    var padX = ((viewportW - w * fitScale) / 2) * RASTER;
    var padY = ((viewportH - h * fitScale) / 2) * RASTER;

    var content = document.createElementNS(NS, 'g');
    var live = svg.querySelectorAll('#edges, #nodes');
    for (var i = 0; i < live.length; i++) {
      var clone = live[i].cloneNode(true);
      clone.removeAttribute('transform');
      inlineStyles(live[i], clone);
      content.appendChild(clone);
    }
    content.setAttribute('transform', 'translate(' + padX + ' ' + padY + ') scale(' + scale + ') translate(' + (-bb.x) + ' ' + (-bb.y) + ')');

    var bgFrom = cssVar('--bg-from', '#D4C6E1');
    var bgTo = cssVar('--bg-to', '#E2D3F0');
    var contentStr = new XMLSerializer().serializeToString(content);
    return {
      svg: '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg xmlns="' + NS + '" width="' + outW + '" height="' + outH + '" viewBox="0 0 ' + outW + ' ' + outH + '">\n' +
        '  <defs>\n' +
        '    ' + (fontStyle || '') + '\n' +
        '    <linearGradient id="pageBg" x1="0%" y1="100%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" stop-color="' + bgFrom + '"/>\n' +
        '      <stop offset="100%" stop-color="' + bgTo + '"/>\n' +
        '    </linearGradient>\n' +
        '    <style>text { font-family: Inter, system-ui, sans-serif; }</style>\n' +
        '  </defs>\n' +
        '  <rect width="100%" height="100%" fill="url(#pageBg)"/>\n' +
        '  ' + contentStr + '\n' +
        '</svg>',
      w: outW, h: outH,
    };
  }

  /* ---------- one rasterization path, page / diagram mode ---------- */
  async function exportPng(opts) {
    opts = opts || {};
    var mode = opts.mode === 'diagram' ? 'diagram' : 'page';
    var button = opts.button || null;

    var fontStyle = await buildFontFaceStyle();

    var svgStr, OUT_W, OUT_H, slugTag;
    if (mode === 'diagram') {
      var built = buildDiagramSvg(fontStyle);
      if (!built) { alert('PNG export: diagram not ready.'); return; }
      svgStr = built.svg; OUT_W = built.w; OUT_H = built.h; slugTag = '-diagram-';
    } else {
      svgStr = buildSvg(fontStyle);
      if (!svgStr) { alert('PNG export: diagram not ready.'); return; }
      OUT_W = PAGE_W; OUT_H = PAGE_H; slugTag = '-';
    }

    var originalText = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = '…'; }
    try {
      var img = new Image();
      await new Promise(function (resolve, reject) {
        img.onload = resolve;
        img.onerror = function () { reject(new Error('SVG image load failed')); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
      });

      var cv = document.createElement('canvas');
      cv.width = OUT_W; cv.height = OUT_H;
      cv.getContext('2d').drawImage(img, 0, 0, OUT_W, OUT_H);

      var parts = getStampParts();
      var base = getFilenameBase().replace(/_source-v\d+_render-v\d+$/, '');
      var filename = base + (parts.length ? '_' + parts.join('_') : '') + slugTag + getThemeName() + '.png';

      var blob = await new Promise(function (resolve) { cv.toBlob(resolve, 'image/png'); });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('PNG export failed: ' + err.message);
    } finally {
      if (button) { button.disabled = false; button.textContent = originalText; }
    }
  }

  function injectButton() {
    var hud = document.querySelector('.hud');
    if (!hud) return;
    var mkBtn = function (id, label, title, mode) {
      if (document.getElementById(id)) return;
      var btn = document.createElement('button');
      btn.id = id;
      btn.title = title;
      btn.textContent = label;
      btn.style.width = 'auto';
      btn.style.padding = '0 12px';
      btn.style.fontSize = '11px';
      btn.style.letterSpacing = '0.06em';
      btn.addEventListener('click', function () { exportPng({ mode: mode, button: btn }); });
      hud.appendChild(btn);
    };
    // id 'exportPng' retained for back-compat (the chromed page export).
    mkBtn('exportPng', 'PNG page', 'Export 3840×2880 chromed page PNG', 'page');
    mkBtn('exportPngDiagram', 'PNG diagram', 'Export diagram-only PNG — no chrome, natural aspect', 'diagram');
  }

  function checkAutoExport() {
    var p = new URLSearchParams(location.search).get('export');
    if (p !== 'png' && p !== 'png-diagram') return;          // 'png' retained for back-compat (page)
    var id = p === 'png-diagram' ? 'exportPngDiagram' : 'exportPng';
    var tryRun = function () {
      var btn = document.getElementById(id);
      var svg = document.getElementById('svg');
      if (!btn || !svg || !svg.querySelector('#nodes')) { setTimeout(tryRun, 50); return; }
      btn.click();
      setTimeout(function () { try { window.close(); } catch (e) {} }, 1800);
    };
    setTimeout(tryRun, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { injectButton(); checkAutoExport(); });
  } else {
    injectButton();
    checkAutoExport();
  }
})();
