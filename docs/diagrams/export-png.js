/* export-png.js
   adds a "PNG" button to the .hud bar; on click, renders the full diagram
   (header + caveat + legend + diagram) to a 3840×2880 PNG and triggers a
   browser download named <page-basename>_<version-stamp-parts>.png

   Theme-aware: reads CSS custom properties at click time, so light and dark
   variants export with the right palette. Falls back to the original
   pre-system lavender/white if no design-system-ASK variables are defined.
*/
(function () {
  const PAGE_W = 3840;
  const PAGE_H = 2880;
  const HEADER_H = 100;
  const M = 56;
  const OVERLAY_INSET = 24;

  const xml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  }[c]));

  const text = (el) => (el ? el.textContent : '').replace(/\s+/g, ' ').trim();

  /* ---------- theme resolution (read once per export) ---------- */
  function resolveTheme() {
    const cs = getComputedStyle(document.documentElement);
    const v = (name, fallback) => {
      const raw = cs.getPropertyValue(name).trim();
      return raw || fallback;
    };
    return {
      bgFrom:   v('--bg-from',     '#D4C6E1'),
      bgTo:     v('--bg-to',       '#E2D3F0'),
      fg1:      v('--fg-1',        '#FFFFFF'),
      fg2:      v('--fg-2',        'rgba(255,255,255,0.82)'),
      line1:    v('--line-1',      'rgba(255,255,255,0.45)'),
      nodeFill: v('--node-fill',   '#BFB3D4'),
      // For the export's overlay cards: a flat surface darker than the bg so they read as panels
      panelFill: v('--bg-from',    '#D4C6E1'),
    };
  }

  /* ---------- inspect current DOM for chrome content ---------- */
  function getStamp() {
    const stamp = document.querySelector('.bar .stamp');
    if (!stamp) return ['', ''];
    const divs = stamp.querySelectorAll(':scope > div');
    return [text(divs[0]).toUpperCase(), text(divs[1])];
  }
  function getCaveat() {
    const cap = document.querySelector('.caption');
    if (!cap) return { title: '', lines: ['', '', ''] };
    const b = cap.querySelector('b');
    const title = (b ? text(b) : '').toUpperCase();
    const html = cap.innerHTML;
    const after = html.replace(/^[\s\S]*?<\/b>/i, '').replace(/<br\s*\/?>/gi, '\n');
    const body = after.replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').trim();
    // Prefer explicit <br> splits up to 3 lines; otherwise wrap the body.
    const explicit = body.split('\n').map((s) => s.trim()).filter(Boolean);
    if (explicit.length >= 2) {
      const lines = explicit.slice(0, 3);
      while (lines.length < 3) lines.push('');
      return { title, lines };
    }
    // wrap by chars (~58 per line at 12px mono on a 380px caveat)
    const max = 58;
    const out = [];
    let rem = body;
    while (rem && out.length < 3) {
      if (rem.length <= max) { out.push(rem); break; }
      let cut = rem.lastIndexOf(' ', max);
      if (cut < 16) cut = max;
      out.push(rem.slice(0, cut));
      rem = rem.slice(cut + 1).trim();
    }
    while (out.length < 3) out.push('');
    return { title, lines: out };
  }
  function getLegendRows() {
    return Array.from(document.querySelectorAll('.legend .row')).map((r) => ({
      lbl: text(r.querySelector('.lbl')),
      sub: text(r.querySelector('.sub')),
      isSolid:  !!r.querySelector('.box-solid'),
      isDashed: !!r.querySelector('.box-dashed'),
      isLegacy: !!r.querySelector('.legacy-txt'),
    }));
  }
  function getVersionParts() {
    return Array.from(document.querySelectorAll('.bar .stamp .k')).map((e) => text(e));
  }
  function getFilenameBase() {
    const file = (location.pathname.split('/').pop() || 'diagram.html');
    return decodeURIComponent(file).replace(/\.html?$/i, '');
  }
  function getThemeTag() {
    const t = document.querySelector('.theme-tag, .bar .theme-tag');
    return t ? text(t).replace(/^\/+/, '').trim() : '';
  }

  /* ---------- diagram CSS slice (uses theme vars resolved per export) ---------- */
  function diagramCss(T) {
    return `
      .node-box { fill: ${T.nodeFill}; stroke: ${T.fg1}; stroke-width: 1; }
      .node-box.held { stroke: ${T.fg2}; stroke-dasharray: 4 3; fill: transparent; }
      .node-box.legacy { fill: transparent; stroke: ${T.fg2}; }
      .node-box.section { fill: transparent; stroke: none; }
      .node-label { font-family: Inter, system-ui, sans-serif; font-weight: 400; font-size: 13px; fill: ${T.fg1}; dominant-baseline: middle; }
      .node-label.held { fill: ${T.fg2}; font-weight: 300; }
      .node-label.legacy { fill: ${T.fg2}; font-weight: 300; font-style: italic; }
      .node-label.root { font-weight: 500; font-size: 14px; }
      .node-label.section { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; fill: ${T.fg1}; font-weight: 500; }
      .node-note { font-family: 'JetBrains Mono', monospace; font-size: 10px; fill: ${T.fg2}; dominant-baseline: middle; font-weight: 300; }
      .node-note.legacy { font-style: italic; }
      .section-rule { stroke: ${T.fg1}; stroke-width: 1; }
      .section-tag { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.16em; fill: ${T.fg2}; dominant-baseline: middle; font-weight: 300; }
      .edge { fill: none; stroke: ${T.fg1}; stroke-width: 1; }
      .edge.held { stroke: ${T.fg2}; stroke-dasharray: 4 3; }
      .edge.legacy { stroke: ${T.fg2}; }
      text.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
    `;
  }

  async function exportPNG(button) {
    const T = resolveTheme();
    const svgEl = document.getElementById('svg');
    if (!svgEl) return;
    const diagW = +svgEl.getAttribute('width');
    const diagH = +svgEl.getAttribute('height');

    // Serialize inner content of the diagram <svg>
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const inner = svgStr.replace(/^[\s\S]*?<svg[^>]*>/i, '').replace(/<\/svg>\s*$/i, '');

    const mark = text(document.querySelector('.bar .mark'));
    const title = text(document.querySelector('.bar .title-block .t'));
    const subtitle = text(document.querySelector('.bar .title-block .s')).toUpperCase();
    const themeTag = getThemeTag();
    const [stamp1, stamp2] = getStamp();
    const caveat = getCaveat();
    const legend = getLegendRows();

    // diagram placement
    const diagTop = HEADER_H + 24;
    const diagBot = PAGE_H - M;
    const diagLeft = M;
    const diagRight = PAGE_W - M;
    const availW = diagRight - diagLeft;
    const availH = diagBot - diagTop;
    const scale = Math.min(availW / diagW, availH / diagH);
    const sw = diagW * scale;
    const sh = diagH * scale;
    const sx = diagLeft + (availW - sw) / 2;
    const sy = diagTop  + (availH - sh) / 2;

    // overlay placement
    const caveatW = 380, caveatH = 150;
    const legendW = 440, legendH = 60 + legend.length * 42 + 16;
    const overlayY = HEADER_H + OVERLAY_INSET;
    const caveatX = M;
    const legendX = PAGE_W - M - legendW;
    const swX = legendX + 28;
    const lblX = swX + 60 + 16;
    const subOffset = 100;

    // legend rows
    let legendBody = `
      <rect x="${legendX}" y="${overlayY}" width="${legendW}" height="${legendH}" fill="${T.panelFill}" stroke="${T.line1}" rx="6"/>
      <text x="${legendX + 24}" y="${overlayY + 32}" class="mono" font-size="11" fill="${T.fg2}" letter-spacing="0.16em">LEGEND</text>
      <text x="${legendX + legendW - 24}" y="${overlayY + 32}" text-anchor="end" class="mono" font-size="11" font-weight="500" fill="${T.fg1}" letter-spacing="0.08em">${legend.length} STATES</text>`;

    legend.forEach((row, i) => {
      const y = overlayY + 60 + i * 42;
      if (row.isSolid) {
        legendBody += `\n<rect x="${swX + 16}" y="${y}" width="28" height="16" fill="${T.nodeFill}" stroke="${T.fg1}"/>`;
      } else if (row.isDashed) {
        legendBody += `\n<rect x="${swX + 16}" y="${y}" width="28" height="16" fill="transparent" stroke="${T.fg2}" stroke-dasharray="4 3"/>`;
      } else if (row.isLegacy) {
        legendBody += `\n<text x="${swX + 30}" y="${y + 8}" text-anchor="middle" font-size="13" font-style="italic" font-weight="300" fill="${T.fg2}" dominant-baseline="middle">legacy</text>`;
      }
      legendBody += `\n<text x="${lblX}" y="${y + 8}" font-size="15" fill="${T.fg1}" dominant-baseline="middle">${xml(row.lbl)}</text>`;
      legendBody += `\n<text x="${lblX + subOffset}" y="${y + 8}" class="mono" font-size="11" fill="${T.fg2}" dominant-baseline="middle">${xml(row.sub)}</text>`;
    });

    // theme tag pill (top-right header strip)
    const themeTagSvg = themeTag ? `
      <rect x="${PAGE_W - M - 120}" y="22" width="120" height="28" rx="6" fill="transparent" stroke="${T.line1}"/>
      <text x="${PAGE_W - M - 60}" y="36" text-anchor="middle" class="mono" font-size="11" fill="${T.fg2}" letter-spacing="0.14em" dominant-baseline="middle">${xml(themeTag.toUpperCase())}</text>
    ` : '';

    const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}">
  <defs>
    <linearGradient id="pageBg" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${T.bgFrom}"/>
      <stop offset="100%" stop-color="${T.bgTo}"/>
    </linearGradient>
    <style>
      text { font-family: Inter, system-ui, sans-serif; }
      ${diagramCss(T)}
    </style>
  </defs>

  <rect width="100%" height="100%" fill="url(#pageBg)"/>
  <line x1="0" y1="${HEADER_H}" x2="${PAGE_W}" y2="${HEADER_H}" stroke="${T.line1}"/>

  <text x="${M}" y="40" font-size="24" font-weight="500" fill="${T.fg1}">${xml(mark)}</text>
  <text x="${M}" y="72" font-size="22" font-weight="400" fill="${T.fg1}">${xml(title)}</text>
  <text x="${M}" y="92" class="mono" font-size="12" fill="${T.fg2}" letter-spacing="0.08em">${xml(subtitle)}</text>

  ${themeTagSvg}
  <text x="${PAGE_W - M - 140}" y="76" text-anchor="end" class="mono" font-size="14" font-weight="500" fill="${T.fg1}" letter-spacing="0.08em">${xml(stamp1)}</text>
  <text x="${PAGE_W - M - 140}" y="96" text-anchor="end" class="mono" font-size="12" fill="${T.fg2}" letter-spacing="0.08em">${xml(stamp2)}</text>

  <g transform="translate(${sx} ${sy}) scale(${scale})">
${inner}
  </g>

  <rect x="${caveatX}" y="${overlayY}" width="${caveatW}" height="${caveatH}" fill="${T.panelFill}" stroke="${T.line1}" rx="6"/>
  <text x="${caveatX + 24}" y="${overlayY + 36}" class="mono" font-size="13" font-weight="500" fill="${T.fg1}" letter-spacing="0.14em">${xml(caveat.title)}</text>
  <text x="${caveatX + 24}" y="${overlayY + 70}" class="mono" font-size="12" fill="${T.fg2}">${xml(caveat.lines[0] || '')}</text>
  <text x="${caveatX + 24}" y="${overlayY + 94}" class="mono" font-size="12" fill="${T.fg2}">${xml(caveat.lines[1] || '')}</text>
  <text x="${caveatX + 24}" y="${overlayY + 118}" class="mono" font-size="12" fill="${T.fg2}">${xml(caveat.lines[2] || '')}</text>

  ${legendBody}
</svg>`;

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = '…';

    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('SVG image load failed'));
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(fullSvg);
      });

      const cv = document.createElement('canvas');
      cv.width = PAGE_W;
      cv.height = PAGE_H;
      cv.getContext('2d').drawImage(img, 0, 0, PAGE_W, PAGE_H);

      const versionParts = getVersionParts();
      const base = getFilenameBase().replace(/_source-v\d+_render-v\d+$/, '');
      const filename = base
        + (versionParts.length ? '_' + versionParts.join('_') : '')
        + '.png';

      const blob = await new Promise((resolve) => cv.toBlob(resolve, 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
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
    const hud = document.querySelector('.hud');
    if (!hud) return;
    if (document.getElementById('exportPng')) return;
    const btn = document.createElement('button');
    btn.id = 'exportPng';
    btn.title = 'Export 3840×2880 PNG';
    btn.textContent = 'PNG';
    btn.style.width = 'auto';
    btn.style.padding = '0 14px';
    btn.style.fontSize = '11px';
    btn.style.fontFamily = "'JetBrains Mono', monospace";
    btn.style.letterSpacing = '0.06em';
    btn.addEventListener('click', () => exportPNG(btn));
    hud.appendChild(btn);
  }

  function checkAutoExport() {
    const params = new URLSearchParams(location.search);
    if (params.get('export') !== 'png') return;
    const tryRun = () => {
      const btn = document.getElementById('exportPng');
      const svg = document.getElementById('svg');
      if (!btn || !svg || !svg.getAttribute('width')) {
        setTimeout(tryRun, 50);
        return;
      }
      btn.click();
      setTimeout(() => { try { window.close(); } catch (e) {} }, 1800);
    };
    setTimeout(tryRun, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injectButton(); checkAutoExport(); });
  } else {
    injectButton();
    checkAutoExport();
  }
})();
