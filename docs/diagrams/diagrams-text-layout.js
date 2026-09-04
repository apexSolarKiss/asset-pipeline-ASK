/* diagrams-text-layout.js

   AUTHORITATIVE SOURCE PATH
     patterns/_diagram-shared/diagrams-text-layout.js

   Copies under diagram-static-H / diagram-static-V / diagram-static-SEQ are
   generated mirrors. Identical bytes do not confer authority: a mirror is a
   transport artifact, never the pin target, and never hand-edited.

   The single text-layout contract shared by the H, V and SEQ static diagram
   engines.

   TARGET SET, declared here rather than implied by this folder's name:

     TARGETS             diagram-static-H · diagram-static-V · diagram-static-SEQ
     EXPLICITLY EXCLUDED diagram-static-FLOW · diagram-interactive-spine

   FLOW is the fourth Class A static sibling, not an omission. It publishes the
   SAME entry point — window.DIAGRAMS.render — and it DOES draw note and tag
   text: its grammar declares band.tag, carrier.note and field.tag, it emits
   `flow-tag` and `node-note` runs, and it inherits the byte-identical
   diagrams.css these role metrics were selected against. So "FLOW has nothing
   to cap" would be false.

   The difference is the record SHAPE the predicates dispatch on:

     H / V / SEQ   window.TREE_DIAGRAM · a KIND-TAGGED node
                   {kind, label, note?, tag?, status?, children?}
     FLOW          window.FLOW_DIAGRAM · POSITIONAL structure
                   band / carrier / rail / field / converge / spine

   roleFor, rendersNote and rendersTag all read node.kind, node.note and
   node.tag from a kind-tagged record. FLOW has no `kind` field for them to
   dispatch on, so serving it would mean designing a second, structurally
   different target contract — a mandate nobody granted, not a gap. The
   interactive spine takes no text-layout dependency at all. The
   `patterns/_diagram-shared/` plane keeps a generic name and confers no
   authority over every diagram pattern; each member declares its own targets.

   WHAT THIS OWNS
     line breaking   delimiter matching, longest-first, and force-break
     measurement     wrapped width and height for a given role cap
     role metrics    per-role cap, line height, and the has-note predicate
     tspan emission  the emitted text structure for a wrapped label or note

   An engine that keeps a private copy of any of those is the divergence this
   file exists to remove. That is why the caps and line heights live HERE and
   are requested by role, and why the rendered-secondary predicate is resolved
   HERE and is target-aware.

   The historical case, measured on the base engine rather than recalled: V's
   private predicate counted a note on ANY kind, and V drew one on neither a
   section nor a group. A note on a GROUP therefore selected BOX_H_NOTE and grew
   the box 26 -> 44px (+18px height, +511px band width). A note on a SECTION cost
   no height at all — a section takes SECTION_H / SECTION_H_TAG, never
   BOX_H_NOTE — but was still measured into the band, +434px of width for text
   nobody saw. Two different symptoms from one drifted predicate, which is why
   it is resolved once, here.

   WHAT IT DOES NOT OWN
     source grammar · topology · placement · connector geometry · anchoring ·
     the final SVG envelope · fonts and letter-spacing, which are CSS-derived
     and stay with the engine that owns the stylesheet.

   MEASUREMENT PARITY IS THE FIRST GATE. For a string that does not wrap, the
   returned width must equal what each engine's preMeasure produced before this
   file existed, letter-spacing compensation included — colMaxW is a max over
   those widths and colX accumulates them, so a sub-pixel difference relocates
   every column before placement is reached. The floor fails at measurement or
   not at all.
*/
(function () {
  'use strict';

  var VERSION = '2.0.0';

  var TARGETS = ['diagram-static-H', 'diagram-static-V', 'diagram-static-SEQ'];
  var EXCLUDED = ['diagram-static-FLOW', 'diagram-interactive-spine'];

  /* ROLE METRICS — owned here, requested by role.

     cap        maximum rendered text width in px before wrapping. A MAXIMUM,
                never a target: text is not padded toward it and lines are not
                balanced, so the same string at the same cap always produces the
                same lines regardless of what surrounds it.
     lineHeight line ADVANCE when a run wraps — the baseline-to-baseline step.
                Each value exceeds its role's rendered font-size, but font-size
                is not what governs collision; the glyph box is. Measured against
                the font's own bounding box (Inter / JetBrains Mono, as loaded):

                  role        advance   fontBox   margin
                  root           17        17        0
                  label          16        16        0
                  section        13        11       +2
                  sectionTag     12        10       +2
                  note           12        11       +1

                So `root` and `label` carry NO margin beyond the font box: an
                extreme pair — a descender directly above a ring or umlaut
                capital — can touch. Ordinary text clears by about a pixel. This
                is a chosen advance that clears typical content, NOT a proof that
                two lines cannot collide, and it should not be written up as one.
                (`diagrams.css` declares no line-height on these SVG classes; the
                advance lives here because only this file emits the tspans.)

     Selected on REAL RENDERS against both excess emptiness and fitted
     readability. `label` is deliberately loose: a tighter 420 was measured and
     rejected because these diagrams are height-constrained when fitted, so
     trading width for height loses. The fleet percentiles behind the selection
     belong in the PR evidence, not in runtime source. */
  var ROLE_METRICS = {
    root:       { cap: 420, lineHeight: 17 },
    section:    { cap: 400, lineHeight: 13 },
    sectionTag: { cap: 400, lineHeight: 12 },
    label:      { cap: 700, lineHeight: 16 },
    note:       { cap: 720, lineHeight: 12 }
  };

  /* Per-target shape. SEQ is a linear stacked run with no section branch: every
     non-root node renders as a label, and a `kind: 'section'` record there is an
     ordinary node that DOES render its note. H and V draw a section as
     label + rule + tag and never its note. That difference is the whole reason
     the predicate is target-aware rather than global. */
  var TARGET_SHAPE = {
    'diagram-static-H':   { sections: true },
    'diagram-static-V':   { sections: true },
    'diagram-static-SEQ': { sections: false }
  };

  function shapeOf(target) {
    var s = TARGET_SHAPE[target];
    if (!s) throw new Error('diagrams-text-layout: unknown target "' + target + '"');
    return s;
  }

  /* One canvas context for the life of the page. Creating one per call is the
     obvious cost, but the real reason to share it is determinism: a context
     carries its font state, and measurement must not depend on which caller
     touched it last — so every entry point sets .font before reading. */
  var ctx = document.createElement('canvas').getContext('2d');

  /* canvas.measureText DROPS CSS letter-spacing, which the SVG text then
     applies. The correction lives here so a vendored engine and this file
     cannot drift apart on it. ls is px-per-character, i.e. em x font-size,
     computed by the caller from diagrams.css. */
  function measure(text, font, ls) {
    if (text === null || text === undefined) return 0;
    var s = String(text);
    ctx.font = font;
    var w = ctx.measureText(s).width;
    if (ls) w += s.length * ls;
    return w;
  }

  function rtrim(s) { return s.replace(/\s+$/, ''); }

  /* ---------- the approved break contract ----------

     Delimiters are matched LONGEST-FIRST — `//` before `/` — breaking AFTER the
     delimiter; force-break only a single token that still exceeds its cap
     alone; an authored `\n` stays a hard break.

     A visual line boundary does not corrupt an identifier: no source character
     is inserted, removed, reordered or normalized. `segments` is the exact
     partition — `segments.join('') === source` holds, which is exact RUNTIME
     STRING equality and not a claim about file bytes, since different literal
     spellings or encodings can produce the same runtime string. `lines` is the
     rendered payload, which drops only trailing whitespace at a boundary so a
     `text-anchor: middle` run centres on its glyphs. Keeping the two apart is
     what lets the preservation gate assert exact identity without pushing stray
     whitespace into the DOM. */

  /* Atoms are the units a line is built from. An atom boundary is a legal break
     point AFTER that atom, so the delimiter or the whitespace stays with the
     line it ends — which is what "break after the delimiter" means, and what
     makes concatenation exact. */
  function atomize(s) {
    var atoms = [], cur = '', i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === '/') {
        if (s.charAt(i + 1) === '/') { cur += '//'; i += 2; }   // longest-first
        else { cur += '/'; i += 1; }
        atoms.push(cur); cur = '';
        continue;
      }
      if (/\s/.test(c)) {
        while (i < s.length && /\s/.test(s.charAt(i))) { cur += s.charAt(i); i++; }
        atoms.push(cur); cur = '';
        continue;
      }
      cur += c; i++;
    }
    if (cur !== '') atoms.push(cur);
    return atoms;
  }

  /* Force-break, applied ONLY to a single atom that still exceeds the cap on a
     line of its own. Greedy by character; a single character wider than the cap
     is placed anyway rather than looping forever.

     KNOWN LIMITS, recorded rather than fixed. Both preserve
     segments.join('') === source; both are follow-on hardening candidates, and
     neither has a case in the current fleet:

       1. this iterates UTF-16 CODE UNITS, so a long enough token could split
          between the two units of an astral character and render a broken
          glyph across the boundary;
       2. atomize glues a delimiter to the run before it, so an atom ending
          `//` that ALONE exceeds its cap can be force-broken BETWEEN the two
          slashes — `…/` ending one line and `/` starting the next. The
          longest-first rule governs where a break is CHOSEN; it does not bind
          the last-resort force-break inside one oversized atom. */
  function forceBreak(atom, font, ls, cap) {
    var out = [], cur = '';
    for (var i = 0; i < atom.length; i++) {
      var ch = atom.charAt(i);
      if (cur !== '' && measure(rtrim(cur + ch), font, ls) > cap) { out.push(cur); cur = ch; }
      else cur += ch;
    }
    if (cur !== '') out.push(cur);
    return out.length ? out : [atom];
  }

  function breakSegment(body, font, ls, cap) {
    var atoms = atomize(body), segs = [], cur = '';
    function place(a) {
      if (measure(rtrim(a), font, ls) > cap) {
        var pieces = forceBreak(a, font, ls, cap);
        for (var k = 0; k < pieces.length - 1; k++) segs.push(pieces[k]);
        cur = pieces[pieces.length - 1];
      } else cur = a;
    }
    for (var i = 0; i < atoms.length; i++) {
      var a = atoms[i];
      if (cur === '') { place(a); continue; }
      if (measure(rtrim(cur + a), font, ls) <= cap) cur = cur + a;
      else { segs.push(cur); place(a); }
    }
    if (cur !== '') segs.push(cur);
    return segs.length ? segs : [body];
  }

  function breakLines(text, font, ls, cap) {
    var s = String(text === null || text === undefined ? '' : text);
    if (!s) return { segments: [''], lines: [''], width: 0 };

    /* The no-wrap fast path returns the source VERBATIM — no atomizing, no
       trimming — so a string that does not wrap emits exactly the DOM it
       emitted before this file existed. */
    if (s.indexOf('\n') === -1) {
      var full = measure(s, font, ls);
      if (!cap || full <= cap) return { segments: [s], lines: [s], width: full };
    }

    /* Authored newlines are HARD breaks. The `\n` stays at the end of its own
       segment so the exact source is reconstructible by concatenation. */
    var parts = s.split('\n'), segs = [];
    for (var h = 0; h < parts.length; h++) {
      var body = parts[h];
      var sub = (!cap || measure(rtrim(body), font, ls) <= cap)
        ? [body] : breakSegment(body, font, ls, cap);
      if (h < parts.length - 1) sub[sub.length - 1] = sub[sub.length - 1] + '\n';
      for (var q = 0; q < sub.length; q++) segs.push(sub[q]);
    }

    var lines = [], widest = 0;
    for (var j = 0; j < segs.length; j++) {
      var ln = rtrim(segs[j]);
      lines.push(ln);
      var lw = measure(ln, font, ls);
      if (lw > widest) widest = lw;
    }
    return { segments: segs, lines: lines, width: widest };
  }

  /* ---------- role-aware entry points ---------- */

  function metricsFor(target, role) {
    shapeOf(target);
    var m = ROLE_METRICS[role];
    if (!m) throw new Error('diagrams-text-layout: unknown role "' + role + '"');
    return m;
  }

  /* The label role a node takes on a given target. */
  function roleFor(target, node) {
    var shape = shapeOf(target);          // resolve FIRST: unknown target throws
    var kind = (node && node.kind) || 'node';
    if (kind === 'root') return 'root';
    if (kind === 'section' && shape.sections) return 'section';
    return 'label';
  }

  /* Does this node actually RENDER a note / a tag on this target? These are the
     predicates that decide both measured width and granted box height, so a
     divergence between them and the render branch shows up as empty space
     nobody asked for. */
  function rendersNote(target, node) {
    var shape = shapeOf(target);          // resolve FIRST, even when the answer is false
    if (!node || !node.note) return false;
    return !(shape.sections && (node.kind || 'node') === 'section');
  }

  function rendersTag(target, node) {
    var shape = shapeOf(target);
    if (!node || !node.tag) return false;
    return !!(shape.sections && (node.kind || 'node') === 'section');
  }

  /* True when the node renders ANY secondary run beneath its label — the
     has-note predicate the engines used to each define for themselves. */
  function hasRenderedSecondary(target, node) {
    return rendersNote(target, node) || rendersTag(target, node);
  }

  /* The one call an engine makes per string.

       spec = { target, role, text, font, letterSpacing }

     Returns { lines, segments, count, width, addedHeight, lineHeight, cap, wrapped }.

     addedHeight is the height beyond a SINGLE line, not the total: an engine
     already knows what one line costs inside its own box model, and returning a
     total would make this file responsible for box geometry it does not own. At
     no wrap addedHeight is 0 and wrapped is false, which is what keeps the
     no-wrap path byte-identical.

     NOTE FOR CONSUMERS: because addedHeight is what the box GREW by, a run
     anchored to the box's bottom or centre must subtract its own addedHeight.
     Anchoring the FIRST baseline to a grown edge deposits the new height as
     dead space at one end and pushes the remaining lines out of the box at the
     other. That failure is silent — nothing collides, nothing leaves the
     viewBox — so only a containment assertion catches it. */
  function layoutRole(spec) {
    var m = metricsFor(spec.target, spec.role);
    var ls = spec.letterSpacing || 0;
    var r = breakLines(spec.text, spec.font, ls, m.cap);
    var count = r.lines.length;
    return {
      lines: r.lines,
      segments: r.segments,
      count: count,
      width: r.width,
      addedHeight: count > 1 ? (count - 1) * m.lineHeight : 0,
      lineHeight: m.lineHeight,
      cap: m.cap,
      wrapped: count > 1
    };
  }

  /* tspan emission. A single line is written as plain text content so the
     no-wrap DOM is identical to what the engines produced before — an
     unconditional tspan would change every diagram's markup to buy nothing.
     Multi-line uses one tspan per line, x re-declared on each (SVG does not
     inherit x across dy shifts) and dy 0 on the first so the first baseline
     stays exactly where the engine put it. */
  function emit(textEl, lines, opts) {
    var x = opts.x;
    var lh = opts.lineHeight || 0;
    if (!lines || lines.length <= 1) {
      textEl.textContent = lines && lines.length ? lines[0] : '';
      return textEl;
    }
    while (textEl.firstChild) textEl.removeChild(textEl.firstChild);
    for (var i = 0; i < lines.length; i++) {
      var t = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      t.setAttribute('x', x);
      t.setAttribute('dy', i === 0 ? 0 : lh);
      t.textContent = lines[i];
      textEl.appendChild(t);
    }
    return textEl;
  }

  window.DIAGRAM_TEXT_LAYOUT = {
    VERSION: VERSION,
    TARGETS: TARGETS,
    EXCLUDED: EXCLUDED,
    measure: measure,
    layoutRole: layoutRole,
    roleFor: roleFor,
    rendersNote: rendersNote,
    rendersTag: rendersTag,
    hasRenderedSecondary: hasRenderedSecondary,
    emit: emit
  };
})();
