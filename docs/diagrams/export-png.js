/* export-png.js — static-H / static-V / static-SEQ Class A PNG export.

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

   Chrome is laid out at PAGE SCALE (2026-06-11). The diagram content is scaled
   up to fill the 3840×2880 page, so the header / caveat / legend must be drawn
   at matching size — earlier versions drew them at on-screen pixel sizes, which
   read tiny next to the upscaled diagram. Panel widths are now MEASURED from
   their text (canvas.measureText + manual letter-spacing), the header subtitle
   wraps to the space left of the stamp, and legend sub-text wraps inside the
   panel — nothing overflows a panel edge and no fixed column offsets remain.

   Theme-aware: chrome colors read from CSS custom properties at click time.
*/
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var PAGE_W = 3840;
  var PAGE_H = 2880;
  var HEADER_H = 240;
  var M = 96;
  var OVERLAY_INSET = 48;
  var MONO = "'JetBrains Mono', ui-monospace, monospace";
  var SANS = 'Inter, system-ui, sans-serif';

  var xml = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
    });
  };
  var text = function (el) { return (el ? el.textContent : '').replace(/\s+/g, ' ').trim(); };

  /* ---------- font embedding (fixes right-edge clipping in the raster) ----------
     SVG-as-image rasterization (data:image/svg+xml → <img> → canvas) is
     font-isolated in Chromium: the SVG document cannot reach the *page's*
     @font-face web fonts. Referencing the fonts by family name only makes the
     raster fall back to a system font — a WIDER monospace than JetBrains Mono —
     so node text laid out for the narrower web font overflows its box on the
     right. Fix: inline the woff2 faces as base64 data-URI @font-face rules inside
     the exported SVG, so the raster resolves the same faces the boxes were
     measured for. Two sources, in preference order:
       (1) the DS-owned embedded-font carrier — window.DSA_EMBEDDED_FONTS, loaded
           from _dsa-tokens/fonts-embedded.js before this script. Base64 is already
           inlined, so NO fetch is needed: this is what lets a file:// page (double-
           clicked, no server) export a correct PNG, offline.
       (2) fetch the page's OWN declared @font-face woff2 (http only; Chromium
           blocks file:// fetch). Consumer-agnostic: embeds whatever the page serves.
     If NEITHER fully embeds — a file:// page with no carrier, or a short embed —
     exportPng FAILS CLOSED: it blocks the export rather than silently emitting a
     fallback-font (clipped) PNG. */
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
  // One @font-face rule string. Identical shape whether the base64 comes from the
  // carrier or a fetch, so a carrier-built block is byte-identical to a fetch-built
  // one (http export output is unchanged).
  function faceRule(family, style, weight, b64) {
    return '@font-face{font-family:' + family + ';font-style:' + style +
      ';font-weight:' + weight + ';src:url(data:font/woff2;base64,' + b64 + ') format("woff2");}';
  }
  /* Preference 1: the DS-owned embedded-font carrier (window.DSA_EMBEDDED_FONTS,
     generated by tools/gen-embedded-fonts.js, loaded from
     _dsa-tokens/fonts-embedded.js). Base64 is already inlined — NO fetch — so this
     is the path that works under file://. It is NOT trusted wholesale: it is
     validated against its own integrity manifest (window.DSA_EMBEDDED_FONTS_META —
     expected face count + required face keys), so an INCOMPLETE carrier fails the
     check even under file://, where the page CSS is unreadable and so cannot serve
     as the expected set. When the page CSS *is* readable (http), the carrier must
     additionally cover every face the page declares. Returns null when the carrier
     is absent, malformed, short of its manifest, or drifted behind the page's faces
     (→ fall through to the fetch path; under file:// the #61 floor then blocks). */
  function carrierCss(pageFaces) {
    var c = window.DSA_EMBEDDED_FONTS;
    var meta = window.DSA_EMBEDDED_FONTS_META;
    if (!Array.isArray(c) || !c.length) return null;
    if (!meta || !Array.isArray(meta.requiredKeys) || !meta.requiredKeys.length) return null; // no manifest → don't trust
    var css = '', have = {};
    for (var i = 0; i < c.length; i++) {
      var f = c[i];
      if (!f || !f.family || !f.b64) return null; // malformed — don't half-embed
      var style = f.style || 'normal', weight = f.weight || 'normal';
      have[f.family + '|' + style + '|' + weight] = true;
      css += faceRule(f.family, style, weight, f.b64);
    }
    // Integrity: works even when pageFaces is empty (file://). The carrier must
    // carry EXACTLY the expected count and EVERY required face — a short carrier
    // fails here → null → the #61 fail-closed floor blocks the export.
    if (c.length !== meta.expectedCount) return null;
    for (var k = 0; k < meta.requiredKeys.length; k++) {
      if (!have[meta.requiredKeys[k]]) return null;
    }
    // When the page's own @font-face ARE readable (http), also require coverage of
    // each — catches a carrier that has drifted behind the live CSS.
    for (var j = 0; j < pageFaces.length; j++) {
      var pf = pageFaces[j];
      if (!have[pf.family + '|' + (pf.style || 'normal') + '|' + (pf.weight || 'normal')]) return null;
    }
    return { css: css, count: c.length };
  }
  async function buildFontFaceStyle() {
    if (_fontStyleCache != null) return _fontStyleCache;
    var pageFaces = collectFontFaces();          // [] under file:// (page CSS unreadable)
    var carrier = carrierCss(pageFaces);
    if (carrier) {
      _fontStyleCache = { css: '<style>' + carrier.css + '</style>', expected: carrier.count, embedded: carrier.count };
      return _fontStyleCache;
    }
    var css = '', embedded = 0;                   // Preference 2: fetch + embed (http)
    for (var i = 0; i < pageFaces.length; i++) {
      var f = pageFaces[i];
      try {
        var resp = await fetch(f.url);
        if (!resp.ok) continue;
        var b64 = bufToBase64(await resp.arrayBuffer());
        css += faceRule(f.family, f.style, f.weight, b64);
        embedded++;
      } catch (e) { /* one font failed to fetch — skip it, keep the rest */ }
    }
    _fontStyleCache = { css: css ? '<style>' + css + '</style>' : '', expected: pageFaces.length, embedded: embedded };
    return _fontStyleCache;
  }

  /* ---------- text measurement (canvas + manual letter-spacing) ---------- */
  var measureCtx = document.createElement('canvas').getContext('2d');
  function textW(s, font, ls) {
    s = String(s == null ? '' : s);
    measureCtx.font = font;
    var w = measureCtx.measureText(s).width;
    if (ls) w += s.length * ls;
    return w;
  }
  /* Word-wrap to a pixel width. maxLines caps the result (rest joins onto the
     last line — a safeguard, not a layout feature). */
  function wrapToWidth(s, font, ls, maxW, maxLines) {
    if (!s) return [];
    if (textW(s, font, ls) <= maxW) return [s];
    var words = s.split(' ');
    var lines = [];
    var cur = '';
    for (var i = 0; i < words.length; i++) {
      var candidate = cur ? cur + ' ' + words[i] : words[i];
      if (cur && textW(candidate, font, ls) > maxW) { lines.push(cur); cur = words[i]; }
      else cur = candidate;
    }
    if (cur) lines.push(cur);
    if (maxLines && lines.length > maxLines) {
      lines = lines.slice(0, maxLines - 1).concat([lines.slice(maxLines - 1).join(' ')]);
    }
    return lines;
  }

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
    if (!cap) return { title: '', lines: [] };
    var b = cap.querySelector('b');
    var title = (b ? text(b) : '').toUpperCase();
    var html = cap.innerHTML;
    var after = html.replace(/^[\s\S]*?<\/b>/i, '').replace(/<br\s*\/?>/gi, '\n');
    var body = after.replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').trim();
    var explicit = body.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    if (explicit.length >= 2) return { title: title, lines: explicit.slice(0, 3) };
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
  // Resolved light/dark theme, matching the CSS precedence: an explicit
  // data-theme on <html> wins, otherwise the OS prefers-color-scheme. Used to
  // suffix the export filename (-light / -dark) so the two renders don't collide.
  function getThemeName() {
    var explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function buildSvg(T, fontStyle) {
    var svg = document.getElementById('svg');
    if (!svg) return null;
    var diagW = +svg.getAttribute('width');
    var diagH = +svg.getAttribute('height');
    if (!diagW || !diagH) return null;
    // The content coordinate system may not start at (0,0): the FLOW engine centers
    // content around x=0, so its viewBox origin is negative. Read it so the fit
    // transform can offset by it (H/V/SEQ have a 0,0 origin → minX/minY = 0, no-op).
    var vb = (svg.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    var minX = (vb.length === 4 && isFinite(vb[0])) ? vb[0] : 0;
    var minY = (vb.length === 4 && isFinite(vb[1])) ? vb[1] : 0;

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

    // Header content (read live, drawn with inline fonts).
    var mark = text(document.querySelector('.bar .mark'));
    var title = text(document.querySelector('.bar .title-block .t'));
    var subtitle = text(document.querySelector('.bar .title-block .s')).toUpperCase();
    var themeTag = getThemeTag();
    var stamp = getStamp(), stamp1 = stamp[0], stamp2 = stamp[1];
    var caveat = getCaveat();
    var legend = getLegendRows();

    /* ---------- header (laid out at page scale) ----------
       Repo mark on the left, the title-block (title + subtitle) to the RIGHT of
       it; stamp (and optional theme tag) right-anchored. The subtitle wraps to
       the space left of the right column instead of running under it. */
    var F_MARK   = '500 52px ' + SANS;
    var F_TITLE  = '400 56px ' + SANS;
    var F_SUB    = '300 26px ' + MONO,    LS_SUB    = 2.1;
    var F_STAMP1 = '500 34px ' + MONO,    LS_STAMP1 = 2.7;
    var F_STAMP2 = '300 28px ' + MONO,    LS_STAMP2 = 2.2;
    var F_TAG    = '400 22px ' + MONO,    LS_TAG    = 3.1;

    var titleX = M + Math.ceil(textW(mark, F_MARK)) + 88;

    var tagText = themeTag.toUpperCase();
    var tagW = themeTag ? Math.ceil(textW(tagText, F_TAG, LS_TAG)) + 48 : 0;
    var rightColW = Math.max(
      Math.ceil(textW(stamp1, F_STAMP1, LS_STAMP1)),
      Math.ceil(textW(stamp2, F_STAMP2, LS_STAMP2)),
      tagW
    );
    var stampY1 = themeTag ? 128 : 96;
    var stampY2 = stampY1 + 52;

    var subMaxW = (PAGE_W - M - rightColW) - titleX - 64;
    var subLines = wrapToWidth(subtitle, F_SUB, LS_SUB, subMaxW, 2);

    var themeTagSvg = themeTag ?
      '<rect x="' + (PAGE_W - M - tagW) + '" y="30" width="' + tagW + '" height="52" rx="10" fill="transparent" stroke="' + T.line1 + '"/>' +
      '<text x="' + (PAGE_W - M - tagW / 2) + '" y="56" text-anchor="middle" font-family="' + MONO + '" font-size="22" fill="' + T.fg2 + '" letter-spacing="3.1" dominant-baseline="middle">' + xml(tagText) + '</text>'
      : '';

    var headerSvg =
      '<line x1="0" y1="' + HEADER_H + '" x2="' + PAGE_W + '" y2="' + HEADER_H + '" stroke="' + T.line1 + '"/>\n' +
      '  <text x="' + M + '" y="104" font-family="' + SANS + '" font-size="52" font-weight="500" fill="' + T.fg1 + '">' + xml(mark) + '</text>\n' +
      '  <text x="' + titleX + '" y="104" font-family="' + SANS + '" font-size="56" font-weight="400" fill="' + T.fg1 + '">' + xml(title) + '</text>\n';
    subLines.forEach(function (line, li) {
      headerSvg += '  <text x="' + titleX + '" y="' + (158 + li * 44) + '" font-family="' + MONO + '" font-size="26" font-weight="300" fill="' + T.fg2 + '" letter-spacing="2.1">' + xml(line) + '</text>\n';
    });
    headerSvg +=
      '  ' + themeTagSvg + '\n' +
      '  <text x="' + (PAGE_W - M) + '" y="' + stampY1 + '" text-anchor="end" font-family="' + MONO + '" font-size="34" font-weight="500" fill="' + T.fg1 + '" letter-spacing="2.7">' + xml(stamp1) + '</text>\n' +
      '  <text x="' + (PAGE_W - M) + '" y="' + stampY2 + '" text-anchor="end" font-family="' + MONO + '" font-size="28" font-weight="300" fill="' + T.fg2 + '" letter-spacing="2.2">' + xml(stamp2) + '</text>\n';

    /* ---------- overlay panels (caption top-left, legend top-right) ----------
       Translucent + rounded — a glass approximation (true backdrop-filter blur
       cannot be reproduced in an SVG-as-image raster; over the dark, mostly-empty
       ground a translucent fill reads close). Panel widths are measured from
       their content so text never crosses a panel edge. */
    var PANEL_RX = 24, PANEL_OPACITY = '0.5', PAD = 56;
    var overlayY = HEADER_H + OVERLAY_INSET;

    var F_CAV_T = '500 28px ' + MONO, LS_CAV_T = 3.9;
    var F_CAV_B = '300 26px ' + MONO;
    var caveatSvg = '';
    var cavH = 0;
    if (caveat.title || caveat.lines.length) {
      var cavW = Math.ceil(Math.max.apply(null, [textW(caveat.title, F_CAV_T, LS_CAV_T)].concat(
        caveat.lines.map(function (l) { return textW(l, F_CAV_B); })
      ))) + PAD * 2;
      cavH = 160 + Math.max(0, caveat.lines.length - 1) * 52 + 56;
      caveatSvg =
        '<rect x="' + M + '" y="' + overlayY + '" width="' + cavW + '" height="' + cavH + '" fill="' + T.panelFill + '" fill-opacity="' + PANEL_OPACITY + '" stroke="' + T.line1 + '" rx="' + PANEL_RX + '"/>\n' +
        '  <text x="' + (M + PAD) + '" y="' + (overlayY + 92) + '" font-family="' + MONO + '" font-size="28" font-weight="500" fill="' + T.fg1 + '" letter-spacing="3.9">' + xml(caveat.title) + '</text>\n';
      caveat.lines.forEach(function (line, li) {
        caveatSvg += '  <text x="' + (M + PAD) + '" y="' + (overlayY + 160 + li * 52) + '" font-family="' + MONO + '" font-size="26" font-weight="300" fill="' + T.fg2 + '">' + xml(line) + '</text>\n';
      });
    }

    var legendBody = '';
    var legendH = 0;
    if (legend.length) {
      var F_LEG_H   = '400 26px ' + MONO, LS_LEG_H   = 4.2;
      var F_LEG_FIG = '500 26px ' + MONO, LS_LEG_FIG = 2.1;
      var F_LEG_LBL = '400 34px ' + SANS;
      var F_LEG_SUB = '300 26px ' + MONO, LS_LEG_SUB = 1.0;
      var SW_W = 68, SW_H = 40;
      var SUB_BUDGET = 1100; // max sub-text line width before wrapping

      var maxLblW = 0, maxSubW = 0;
      legend.forEach(function (row) {
        maxLblW = Math.max(maxLblW, textW(row.lbl, F_LEG_LBL));
        row.subLines = wrapToWidth(row.sub, F_LEG_SUB, LS_LEG_SUB, SUB_BUDGET, 3);
        row.subLines.forEach(function (l) { maxSubW = Math.max(maxSubW, textW(l, F_LEG_SUB, LS_LEG_SUB)); });
      });
      var swOff  = PAD;
      var lblOff = swOff + SW_W + 40;
      var subOff = lblOff + Math.ceil(maxLblW) + 36;
      var legendW = subOff + Math.ceil(maxSubW) + PAD;
      var legendX = PAGE_W - M - legendW;

      // Row centers: 96px per row plus 44px per extra wrapped sub line.
      var yOff = 152;
      legend.forEach(function (row) {
        row.cy = yOff;
        yOff += 96 + (row.subLines.length - 1) * 44;
      });
      var last = legend[legend.length - 1];
      legendH = last.cy + (last.subLines.length - 1) * 44 + 64;

      var header = document.querySelector('.legend .h');
      var headerLbl = header ? text(header.querySelector('span')) : 'Legend';
      var headerFig = header ? text(header.querySelector('.fig')) : (legend.length + ' states');
      legendBody =
        '<rect x="' + legendX + '" y="' + overlayY + '" width="' + legendW + '" height="' + legendH + '" fill="' + T.panelFill + '" fill-opacity="' + PANEL_OPACITY + '" stroke="' + T.line1 + '" rx="' + PANEL_RX + '"/>' +
        '<text x="' + (legendX + PAD) + '" y="' + (overlayY + 80) + '" font-family="' + MONO + '" font-size="26" fill="' + T.fg2 + '" letter-spacing="4.2">' + xml(headerLbl.toUpperCase()) + '</text>' +
        '<text x="' + (legendX + legendW - PAD) + '" y="' + (overlayY + 80) + '" text-anchor="end" font-family="' + MONO + '" font-size="26" font-weight="500" fill="' + T.fg1 + '" letter-spacing="2.1">' + xml(headerFig.toUpperCase()) + '</text>';
      legend.forEach(function (row) {
        var y = overlayY + row.cy;
        var swX = legendX + swOff;
        if (row.isSolid) {
          legendBody += '<rect x="' + swX + '" y="' + (y - SW_H / 2) + '" width="' + SW_W + '" height="' + SW_H + '" rx="6" fill="' + T.nodeFill + '" stroke="' + T.fg1 + '"/>';
        } else if (row.isDashed) {
          legendBody += '<rect x="' + swX + '" y="' + (y - SW_H / 2) + '" width="' + SW_W + '" height="' + SW_H + '" rx="6" fill="transparent" stroke="' + T.fg2 + '" stroke-dasharray="8 6"/>';
        } else if (row.isLegacy) {
          legendBody += '<text x="' + (swX + SW_W / 2) + '" y="' + y + '" text-anchor="middle" font-family="' + SANS + '" font-size="30" font-style="italic" font-weight="300" fill="' + T.fg2 + '" dominant-baseline="middle">legacy</text>';
        }
        legendBody += '<text x="' + (legendX + lblOff) + '" y="' + y + '" font-family="' + SANS + '" font-size="34" fill="' + T.fg1 + '" dominant-baseline="middle">' + xml(row.lbl) + '</text>';
        row.subLines.forEach(function (line, li) {
          legendBody += '<text x="' + (legendX + subOff) + '" y="' + (y + li * 44) + '" font-family="' + MONO + '" font-size="26" font-weight="300" fill="' + T.fg2 + '" letter-spacing="1" dominant-baseline="middle">' + xml(line) + '</text>';
        });
      });
    }

    /* ---------- fit the diagram content ----------
       Tall/portrait diagrams fill the whole width, so their top edge would run
       under the corner panels — they start BELOW the taller panel. LANDSCAPE
       diagrams (wider than tall) have empty top corners, so they can start just
       below the header and use near-full page height (bigger render) without
       colliding with the corner panels. (Computed after the panels.) */
    var panelBand = Math.max(cavH, legendH);
    var landscape = diagW >= diagH;
    var diagTop = overlayY + (landscape ? 120 : (panelBand ? panelBand + 48 : 0));
    var diagBot = PAGE_H - M, diagLeft = M, diagRight = PAGE_W - M;
    var availW = diagRight - diagLeft, availH = diagBot - diagTop;
    var scale = Math.min(availW / diagW, availH / diagH);
    var sw = diagW * scale, sh = diagH * scale;
    var sx = diagLeft + (availW - sw) / 2, sy = diagTop + (availH - sh) / 2;
    // offset by the viewBox origin so negative-origin (centered) content isn't clipped
    content.setAttribute('transform', 'translate(' + (sx - minX * scale) + ' ' + (sy - minY * scale) + ') scale(' + scale + ')');

    var serializer = new XMLSerializer();
    var contentStr = serializer.serializeToString(content);

    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<svg xmlns="' + NS + '" width="' + PAGE_W + '" height="' + PAGE_H + '" viewBox="0 0 ' + PAGE_W + ' ' + PAGE_H + '">\n' +
      '  <defs>\n' +
      '    ' + (fontStyle || '') + '\n' +
      '    <linearGradient id="pageBg" x1="0%" y1="100%" x2="100%" y2="0%">\n' +
      '      <stop offset="0%" stop-color="' + T.bgFrom + '"/>\n' +
      '      <stop offset="100%" stop-color="' + T.bgTo + '"/>\n' +
      '    </linearGradient>\n' +
      '    <style>text { font-family: ' + SANS + '; }</style>\n' +
      '  </defs>\n' +
      '  <rect width="100%" height="100%" fill="url(#pageBg)"/>\n' +
      '  ' + headerSvg + '\n' +
      '  ' + contentStr + '\n' +
      '  ' + caveatSvg + '\n' +
      '  ' + legendBody + '\n' +
      '</svg>';
  }

  /* ---------- diagram-only build (PNG diagram) ----------
     The engine authors its own SVG width / height / viewBox to include the node
     boxes, connectors, arrowheads, edge labels, the SEQ return-loop gutter, and any
     figure-specific landscape geometry. Trust that authored canvas as the diagram
     boundary — do NOT re-infer a tight getBBox, which would clip return loops,
     arrowheads, or custom offshoots.

     Reproduce the proven clean-render recipe EXACTLY — it is a TWO-step sizing:
       (1) size the viewport: viewport = round(svg × S) + 220, S capped at 1.1 and
           at 1500 / longest-edge;
       (2) rerun the engine's fit() into that viewport: 80px padding budget, scale
           capped at 1.2×, content centered.
     Earlier this collapsed to a single `S × raster` scale with flat padding, which
     reproduced the OUTER dimensions but under-scaled and over-padded the diagram
     WITHIN (v4 audit). The fit() step is what scales portrait figures up to fill.
     Header / caption / legend / HUD / ticks live OUTSIDE #svg, so cloning only the
     diagram content groups excludes them. */
  function buildDiagramSvg(T, fontStyle) {
    var svg = document.getElementById('svg');
    if (!svg) return null;
    var w = +svg.getAttribute('width'), h = +svg.getAttribute('height');
    if (!w || !h) return null;
    var vb = (svg.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    var minX = (vb.length === 4 && isFinite(vb[0])) ? vb[0] : 0;
    var minY = (vb.length === 4 && isFinite(vb[1])) ? vb[1] : 0;

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
    var liveGroups = svg.querySelectorAll(':scope > g');
    for (var i = 0; i < liveGroups.length; i++) {
      var clone = liveGroups[i].cloneNode(true);
      inlineStyles(liveGroups[i], clone);
      content.appendChild(clone);
    }
    // offset by the viewBox origin so negative-origin (centered) content isn't clipped
    content.setAttribute('transform', 'translate(' + (padX - minX * scale) + ' ' + (padY - minY * scale) + ') scale(' + scale + ')');

    var contentStr = new XMLSerializer().serializeToString(content);
    return {
      svg: '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg xmlns="' + NS + '" width="' + outW + '" height="' + outH + '" viewBox="0 0 ' + outW + ' ' + outH + '">\n' +
        '  <defs>\n' +
        '    ' + (fontStyle || '') + '\n' +
        '    <linearGradient id="pageBg" x1="0%" y1="100%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" stop-color="' + T.bgFrom + '"/>\n' +
        '      <stop offset="100%" stop-color="' + T.bgTo + '"/>\n' +
        '    </linearGradient>\n' +
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
    var T = resolveTheme();
    var fontInfo = await buildFontFaceStyle();
    // Fail closed: never ship a silent fallback-font (clipped) PNG. Fonts embed via
    // the carrier (window.DSA_EMBEDDED_FONTS — works under file://) or, absent it, an
    // http woff2 fetch. If neither fully embeds — a file:// page with no carrier
    // (fetch blocked, page CSS unreadable → expected 0) or a short embed — block with
    // guidance instead of exporting broken output.
    if (fontInfo.embedded < fontInfo.expected ||
        (fontInfo.expected === 0 && location.protocol === 'file:')) {
      alert('PNG export could not embed the diagram fonts, so it would fall back to system fonts (clipped / off-brand text).\n\nEither keep _dsa-tokens/fonts-embedded.js next to the diagram (it lets a file:// page export offline, no server), or serve the diagram over http (e.g.  python3 -m http.server 8432 ) and export from there.');
      return;
    }
    var fontStyle = fontInfo.css;

    var svgStr, OUT_W, OUT_H, slugTag;
    if (mode === 'diagram') {
      var built = buildDiagramSvg(T, fontStyle);
      if (!built) { alert('PNG export: diagram not ready.'); return; }
      svgStr = built.svg; OUT_W = built.w; OUT_H = built.h; slugTag = '-diagram-';
    } else {
      svgStr = buildSvg(T, fontStyle);
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
      cv.width = OUT_W;
      cv.height = OUT_H;
      cv.getContext('2d').drawImage(img, 0, 0, OUT_W, OUT_H);

      var versionParts = getVersionParts();
      var base = getFilenameBase().replace(/_source-v\d+_render-v\d+$/, '');
      var filename = base + (versionParts.length ? '_' + versionParts.join('_') : '') + slugTag + getThemeName() + '.png';

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
      btn.style.padding = '0 14px';
      btn.style.fontSize = '11px';
      btn.style.fontFamily = "'JetBrains Mono', monospace";
      btn.style.letterSpacing = '0.06em';
      btn.addEventListener('click', function () { exportPng({ mode: mode, button: btn }); });
      hud.appendChild(btn);
    };
    // id 'exportPng' retained for back-compat (the chromed page export).
    mkBtn('exportPng', 'PNG page', 'Export 3840×2880 chromed page PNG', 'page');
    mkBtn('exportPngDiagram', 'PNG diagram', 'Export diagram-only PNG — no chrome, natural aspect', 'diagram');
  }

  function checkAutoExport() {
    var params = new URLSearchParams(location.search);
    var p = params.get('export');
    if (p !== 'png' && p !== 'png-diagram') return;          // 'png' retained for back-compat (page)
    var id = p === 'png-diagram' ? 'exportPngDiagram' : 'exportPng';
    var tryRun = function () {
      var btn = document.getElementById(id);
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
