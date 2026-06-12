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

  function buildSvg() {
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

  async function exportPNG(button) {
    var fullSvg = buildSvg();
    if (!fullSvg) { alert('PNG export: diagram not ready.'); return; }

    button.disabled = true;
    var originalText = button.textContent;
    button.textContent = '…';
    try {
      var img = new Image();
      await new Promise(function (resolve, reject) {
        img.onload = resolve;
        img.onerror = function () { reject(new Error('SVG image load failed')); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(fullSvg);
      });

      var cv = document.createElement('canvas');
      cv.width = PAGE_W; cv.height = PAGE_H;
      cv.getContext('2d').drawImage(img, 0, 0, PAGE_W, PAGE_H);

      var parts = getStampParts();
      var base = getFilenameBase().replace(/_source-v\d+_render-v\d+$/, '');
      var filename = base + (parts.length ? '_' + parts.join('_') : '') + '-' + getThemeName() + '.png';

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
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  function injectButton() {
    var hud = document.querySelector('.hud');
    if (!hud || document.getElementById('exportPng')) return;
    var btn = document.createElement('button');
    btn.id = 'exportPng';
    btn.title = 'Export 3840×2880 PNG';
    btn.textContent = 'PNG';
    btn.style.width = 'auto';
    btn.style.padding = '0 12px';
    btn.style.fontSize = '11px';
    btn.style.letterSpacing = '0.06em';
    btn.addEventListener('click', function () { exportPNG(btn); });
    hud.appendChild(btn);
  }

  function checkAutoExport() {
    if (new URLSearchParams(location.search).get('export') !== 'png') return;
    var tryRun = function () {
      var btn = document.getElementById('exportPng');
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
