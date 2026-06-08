/* export-png.js — static-H / static-V Class A PNG export.

   Ported to the interactive-spine exporter model (2026-06). The previous version
   rebuilt a fresh SVG and relied on a <style> class-rule block (.node-label,
   .node-box, …) plus web-font @font-face for the diagram, header, legend, and
   caveat. SVG-as-image rasterization (data:image/svg+xml → <img> → canvas)
   applies <style> class rules and @font-face web fonts UNRELIABLY, so on dense
   diagrams the export dropped fonts, box styling, and header layout while the
   live browser render stayed correct.

   This version exports the artifact the browser actually rendered: it clones the
   live diagram <svg> content and inlines getComputedStyle onto every element
   (fill, stroke, font, letter-spacing, …), and builds the header / legend /
   caveat chrome with inline presentation attributes — no class rules, no var()
   left to resolve. Mirrors patterns/diagram-interactive-spine/export-png.js.

   Theme-aware: chrome colors read from CSS custom properties at click time.
*/
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var PAGE_W = 3840;
  var PAGE_H = 2880;
  var HEADER_H = 120;
  var M = 56;
  var OVERLAY_INSET = 24;
  var MONO = "'JetBrains Mono', ui-monospace, monospace";
  var SANS = 'Inter, system-ui, sans-serif';

  var xml = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
    });
  };
  var text = function (el) { return (el ? el.textContent : '').replace(/\s+/g, ' ').trim(); };

  /* ---------- computed-style inlining (ported from the interactive exporter) ----------
     Walk a live subtree and its deep clone in lockstep (querySelectorAll('*') is
     document-order, identical for both), copying computed presentation style onto
     the clone and dropping classes, so the snapshot is self-contained and CSS-free. */
  var INLINE_PROPS = [
    'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-dasharray',
    'stroke-opacity', 'opacity', 'font-family', 'font-size', 'font-weight',
    'font-style', 'letter-spacing', 'text-transform', 'dominant-baseline',
    'text-anchor',
  ];
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

  /* ---------- theme resolution (chrome colors; read once per export) ---------- */
  function resolveTheme() {
    var cs = getComputedStyle(document.documentElement);
    var v = function (name, fallback) {
      var raw = cs.getPropertyValue(name).trim();
      return raw || fallback;
    };
    return {
      bgFrom:    v('--bg-from',   '#D4C6E1'),
      bgTo:      v('--bg-to',     '#E2D3F0'),
      fg1:       v('--fg-1',      '#FFFFFF'),
      fg2:       v('--fg-2',      'rgba(255,255,255,0.82)'),
      line1:     v('--line-1',    'rgba(255,255,255,0.45)'),
      nodeFill:  v('--node-fill', '#BFB3D4'),
      panelFill: v('--bg-from',   '#D4C6E1'),
    };
  }

  /* ---------- chrome readers ---------- */
  function getStamp() {
    var stamp = document.querySelector('.bar .stamp');
    if (!stamp) return ['', ''];
    var divs = stamp.querySelectorAll(':scope > div');
    return [text(divs[0]).toUpperCase(), text(divs[1])];
  }
  function getCaveat() {
    var cap = document.querySelector('.caption');
    if (!cap) return { title: '', lines: ['', '', ''] };
    var b = cap.querySelector('b');
    var title = (b ? text(b) : '').toUpperCase();
    var html = cap.innerHTML;
    var after = html.replace(/^[\s\S]*?<\/b>/i, '').replace(/<br\s*\/?>/gi, '\n');
    var body = after.replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').trim();
    var explicit = body.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    if (explicit.length >= 2) {
      var lines = explicit.slice(0, 3);
      while (lines.length < 3) lines.push('');
      return { title: title, lines: lines };
    }
    var max = 58;
    var out = [];
    var rem = body;
    while (rem && out.length < 3) {
      if (rem.length <= max) { out.push(rem); break; }
      var cut = rem.lastIndexOf(' ', max);
      if (cut < 16) cut = max;
      out.push(rem.slice(0, cut));
      rem = rem.slice(cut + 1).trim();
    }
    while (out.length < 3) out.push('');
    return { title: title, lines: out };
  }
  function getLegendRows() {
    return Array.prototype.slice.call(document.querySelectorAll('.legend .row')).map(function (r) {
      return {
        lbl: text(r.querySelector('.lbl')),
        sub: text(r.querySelector('.sub')),
        isSolid: !!r.querySelector('.box-solid'),
        isDashed: !!r.querySelector('.box-dashed'),
        isLegacy: !!r.querySelector('.legacy-txt'),
      };
    });
  }
  function getVersionParts() {
    return Array.prototype.slice.call(document.querySelectorAll('.bar .stamp .k')).map(function (e) { return text(e); });
  }
  function getFilenameBase() {
    var file = (location.pathname.split('/').pop() || 'diagram.html');
    return decodeURIComponent(file).replace(/\.html?$/i, '');
  }
  function getThemeTag() {
    var t = document.querySelector('.theme-tag, .bar .theme-tag');
    return t ? text(t).replace(/^\/+/, '').trim() : '';
  }

  function buildSvg(T) {
    var svg = document.getElementById('svg');
    if (!svg) return null;
    var diagW = +svg.getAttribute('width');
    var diagH = +svg.getAttribute('height');
    if (!diagW || !diagH) return null;

    /* Clone the live diagram content groups and bake computed styles inline — a
       faithful snapshot of what the browser rendered, not a reconstruction.
       (Pan/zoom lives on the #stage div, not the SVG content, so the engine
       coordinates need no un-transform.) */
    var content = document.createElementNS(NS, 'g');
    var liveGroups = svg.querySelectorAll(':scope > g'); // edges layer, nodes layer
    for (var i = 0; i < liveGroups.length; i++) {
      var clone = liveGroups[i].cloneNode(true);
      inlineStyles(liveGroups[i], clone);
      content.appendChild(clone);
    }

    // Fit the content into the page below the header, centered.
    var diagTop = HEADER_H + 24, diagBot = PAGE_H - M, diagLeft = M, diagRight = PAGE_W - M;
    var availW = diagRight - diagLeft, availH = diagBot - diagTop;
    var scale = Math.min(availW / diagW, availH / diagH);
    var sw = diagW * scale, sh = diagH * scale;
    var sx = diagLeft + (availW - sw) / 2, sy = diagTop + (availH - sh) / 2;
    content.setAttribute('transform', 'translate(' + sx + ' ' + sy + ') scale(' + scale + ')');

    // Header content (read live, drawn with inline fonts).
    var mark = text(document.querySelector('.bar .mark'));
    var title = text(document.querySelector('.bar .title-block .t'));
    var subtitle = text(document.querySelector('.bar .title-block .s')).toUpperCase();
    var themeTag = getThemeTag();
    var stamp = getStamp(), stamp1 = stamp[0], stamp2 = stamp[1];
    var caveat = getCaveat();
    var legend = getLegendRows();

    // Mirror the live header's horizontal bar: repo mark on the left, the
    // title-block (title + subtitle) to the RIGHT of it — not stacked under it.
    // Measure the mark at its export font size to find the title column.
    var hctx = document.createElement('canvas').getContext('2d');
    hctx.font = '500 32px ' + SANS;
    var titleX = M + Math.ceil(hctx.measureText(mark).width) + 88;

    // Overlay placement (caption top-left, legend top-right). Panels are
    // translucent + rounded — a glass approximation (true backdrop-filter blur
    // cannot be reproduced in an SVG-as-image raster; over the dark, mostly-empty
    // ground a translucent fill reads close).
    var PANEL_RX = 16, PANEL_OPACITY = '0.5';
    var caveatW = 480, caveatH = 168;
    var legendW = 520, legendH = 64 + legend.length * 48 + 20;
    var overlayY = HEADER_H + OVERLAY_INSET;
    var caveatX = M;
    var legendX = PAGE_W - M - legendW;
    var swX = legendX + 28;
    var lblX = swX + 74 + 18;
    var subOffset = 116;

    var legendBody =
      '<rect x="' + legendX + '" y="' + overlayY + '" width="' + legendW + '" height="' + legendH + '" fill="' + T.panelFill + '" fill-opacity="' + PANEL_OPACITY + '" stroke="' + T.line1 + '" rx="' + PANEL_RX + '"/>' +
      '<text x="' + (legendX + 28) + '" y="' + (overlayY + 38) + '" font-family="' + MONO + '" font-size="13" fill="' + T.fg2 + '" letter-spacing="2.34">LEGEND</text>' +
      '<text x="' + (legendX + legendW - 28) + '" y="' + (overlayY + 38) + '" text-anchor="end" font-family="' + MONO + '" font-size="13" font-weight="500" fill="' + T.fg1 + '" letter-spacing="1.04">' + legend.length + ' STATES</text>';
    legend.forEach(function (row, i) {
      var y = overlayY + 66 + i * 48;
      if (row.isSolid) {
        legendBody += '<rect x="' + (swX + 16) + '" y="' + (y - 10) + '" width="34" height="20" rx="3" fill="' + T.nodeFill + '" stroke="' + T.fg1 + '"/>';
      } else if (row.isDashed) {
        legendBody += '<rect x="' + (swX + 16) + '" y="' + (y - 10) + '" width="34" height="20" rx="3" fill="transparent" stroke="' + T.fg2 + '" stroke-dasharray="4 3"/>';
      } else if (row.isLegacy) {
        legendBody += '<text x="' + (swX + 33) + '" y="' + y + '" text-anchor="middle" font-family="' + SANS + '" font-size="16" font-style="italic" font-weight="300" fill="' + T.fg2 + '" dominant-baseline="middle">legacy</text>';
      }
      legendBody += '<text x="' + lblX + '" y="' + y + '" font-family="' + SANS + '" font-size="18" fill="' + T.fg1 + '" dominant-baseline="middle">' + xml(row.lbl) + '</text>';
      legendBody += '<text x="' + (lblX + subOffset) + '" y="' + y + '" font-family="' + MONO + '" font-size="13" fill="' + T.fg2 + '" dominant-baseline="middle">' + xml(row.sub) + '</text>';
    });

    var themeTagSvg = themeTag ?
      '<rect x="' + (PAGE_W - M - 120) + '" y="22" width="120" height="28" rx="6" fill="transparent" stroke="' + T.line1 + '"/>' +
      '<text x="' + (PAGE_W - M - 60) + '" y="36" text-anchor="middle" font-family="' + MONO + '" font-size="11" fill="' + T.fg2 + '" letter-spacing="1.54" dominant-baseline="middle">' + xml(themeTag.toUpperCase()) + '</text>'
      : '';

    var serializer = new XMLSerializer();
    var contentStr = serializer.serializeToString(content);

    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<svg xmlns="' + NS + '" width="' + PAGE_W + '" height="' + PAGE_H + '" viewBox="0 0 ' + PAGE_W + ' ' + PAGE_H + '">\n' +
      '  <defs>\n' +
      '    <linearGradient id="pageBg" x1="0%" y1="100%" x2="100%" y2="0%">\n' +
      '      <stop offset="0%" stop-color="' + T.bgFrom + '"/>\n' +
      '      <stop offset="100%" stop-color="' + T.bgTo + '"/>\n' +
      '    </linearGradient>\n' +
      '    <style>text { font-family: ' + SANS + '; }</style>\n' +
      '  </defs>\n' +
      '  <rect width="100%" height="100%" fill="url(#pageBg)"/>\n' +
      '  <line x1="0" y1="' + HEADER_H + '" x2="' + PAGE_W + '" y2="' + HEADER_H + '" stroke="' + T.line1 + '"/>\n' +
      '  <text x="' + M + '" y="60" font-family="' + SANS + '" font-size="32" font-weight="500" fill="' + T.fg1 + '">' + xml(mark) + '</text>\n' +
      '  <text x="' + titleX + '" y="60" font-family="' + SANS + '" font-size="42" font-weight="400" fill="' + T.fg1 + '">' + xml(title) + '</text>\n' +
      '  <text x="' + titleX + '" y="92" font-family="' + MONO + '" font-size="18" fill="' + T.fg2 + '" letter-spacing="1.44">' + xml(subtitle) + '</text>\n' +
      '  ' + themeTagSvg + '\n' +
      '  <text x="' + (PAGE_W - M) + '" y="56" text-anchor="end" font-family="' + MONO + '" font-size="20" font-weight="500" fill="' + T.fg1 + '" letter-spacing="1.6">' + xml(stamp1) + '</text>\n' +
      '  <text x="' + (PAGE_W - M) + '" y="88" text-anchor="end" font-family="' + MONO + '" font-size="17" fill="' + T.fg2 + '" letter-spacing="1.36">' + xml(stamp2) + '</text>\n' +
      '  ' + contentStr + '\n' +
      '  <rect x="' + caveatX + '" y="' + overlayY + '" width="' + caveatW + '" height="' + caveatH + '" fill="' + T.panelFill + '" fill-opacity="' + PANEL_OPACITY + '" stroke="' + T.line1 + '" rx="' + PANEL_RX + '"/>\n' +
      '  <text x="' + (caveatX + 28) + '" y="' + (overlayY + 42) + '" font-family="' + MONO + '" font-size="14" font-weight="500" fill="' + T.fg1 + '" letter-spacing="1.96">' + xml(caveat.title) + '</text>\n' +
      '  <text x="' + (caveatX + 28) + '" y="' + (overlayY + 80) + '" font-family="' + MONO + '" font-size="13" fill="' + T.fg2 + '">' + xml(caveat.lines[0] || '') + '</text>\n' +
      '  <text x="' + (caveatX + 28) + '" y="' + (overlayY + 106) + '" font-family="' + MONO + '" font-size="13" fill="' + T.fg2 + '">' + xml(caveat.lines[1] || '') + '</text>\n' +
      '  <text x="' + (caveatX + 28) + '" y="' + (overlayY + 132) + '" font-family="' + MONO + '" font-size="13" fill="' + T.fg2 + '">' + xml(caveat.lines[2] || '') + '</text>\n' +
      '  ' + legendBody + '\n' +
      '</svg>';
  }

  async function exportPNG(button) {
    var T = resolveTheme();
    var fullSvg = buildSvg(T);
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
      cv.width = PAGE_W;
      cv.height = PAGE_H;
      cv.getContext('2d').drawImage(img, 0, 0, PAGE_W, PAGE_H);

      var versionParts = getVersionParts();
      var base = getFilenameBase().replace(/_source-v\d+_render-v\d+$/, '');
      var filename = base + (versionParts.length ? '_' + versionParts.join('_') : '') + '.png';

      var blob = await new Promise(function (resolve) { cv.toBlob(resolve, 'image/png'); });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
    if (!hud) return;
    if (document.getElementById('exportPng')) return;
    var btn = document.createElement('button');
    btn.id = 'exportPng';
    btn.title = 'Export 3840×2880 PNG';
    btn.textContent = 'PNG';
    btn.style.width = 'auto';
    btn.style.padding = '0 14px';
    btn.style.fontSize = '11px';
    btn.style.fontFamily = "'JetBrains Mono', monospace";
    btn.style.letterSpacing = '0.06em';
    btn.addEventListener('click', function () { exportPNG(btn); });
    hud.appendChild(btn);
  }

  function checkAutoExport() {
    var params = new URLSearchParams(location.search);
    if (params.get('export') !== 'png') return;
    var tryRun = function () {
      var btn = document.getElementById('exportPng');
      var svg = document.getElementById('svg');
      if (!btn || !svg || !svg.getAttribute('width')) { setTimeout(tryRun, 50); return; }
      btn.click();
      setTimeout(function () { try { window.close(); } catch (e) {} }, 1800);
    };
    setTimeout(tryRun, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { injectButton(); checkAutoExport(); });
  } else {
    injectButton();
    checkAutoExport();
  }
})();
