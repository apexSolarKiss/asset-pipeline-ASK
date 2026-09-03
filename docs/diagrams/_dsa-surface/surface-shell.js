/* =========================================================================
   surface-shell.js — OPTIONAL responsive-navigation runtime
   =========================================================================
   Part of the surface-shell pattern, and vendored only by surfaces that adopt
   navigation. It is a CARRIER TYPE, not an artifact class: the core shell is
   surface-shell.css plus the template, and this file is an addition a consuming
   surface opts into. A page that declines navigation ships no copy of it, and a
   repo with at least one adopting page may vendor one shared copy.

   ENABLEMENT IS AUTHORED, NOT INFERRED. The runtime does nothing at all unless
   the surface carries <template class="surface-nav-source">. Loading the script
   on a page without that source is inert — no panel, no trigger, no geometry,
   no state attribute — so the stylesheet's navigation-only declarations never
   engage either.

   WHAT IT BUILDS
     one panel      a native <dialog>, one content tree, two entrances
     one hierarchy  derived from the single authored breadcrumb — which owns
                    the COMPLETE current public path — plus the optional authored
                    local list, and a legacy configured root where one survives
     two placements one authored mark, upgraded in place, plus a derived seated
                    instance for the mobile handoff

   WHAT IT NEVER DOES
     author a second mark tree · author a second breadcrumb · synchronize
     browser-edge metadata (the foundation owns the edge through --bg-edge and
     the root color-scheme property) · leave two triggers operable at once
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var surface = doc.querySelector('.surface');
  if (!surface) return;

  var source = doc.querySelector('template.surface-nav-source');
  if (!source) return;                       /* this surface declines navigation */

  var mark = surface.querySelector('.surface-mark');
  if (!mark) return;                         /* the mark IS the disclosure */

  var PANEL_ID = 'surface-nav-panel';
  var cfg = source.dataset || {};
  var TRIGGER_LABEL = cfg.navTriggerLabel || 'Open navigation';
  var PANEL_LABEL   = cfg.navPanelLabel   || 'Navigation';
  var CLOSE_LABEL   = cfg.navCloseLabel   || 'close';

  /* NAVIGATION MODE is the driver's, not a raw width query — see the same note
     in surface-shell.css. Mobile is `narrow` OR `short and coarse`: a landscape
     phone at 844x390 is wider than the desktop breakpoint and still wants the
     lower-right mark, which is exactly what the short coarse-pointer override
     exists for. Width alone hands that device the desktop composition. */
  var mqNarrow = window.matchMedia('(max-width: 767px)');
  var mqShortCoarse = window.matchMedia(
    '(min-width: 768px) and (max-height: 499px) and (hover: none) and (pointer: coarse)');
  var mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function desiredMode() {
    return (mqNarrow.matches || mqShortCoarse.matches) ? 'mobile' : 'desktop';
  }
  var mode = desiredMode(), pendingMode = null;
  /* Everything downstream reads the COMMITTED mode, so geometry, operability
     and the stylesheet cannot disagree while a commit is deferred. */
  function MOBILE()  { return mode === 'mobile'; }
  function REDUCED() { return mqReduced.matches; }

  var SETTLE_RANGE = 24, SETTLE_TO = 24;     /* 64px -> 40px over the first 24px */

  /* ---------------------------------------------------------------- crumb --
     The visible header breadcrumb is the ONE authored source for the current
     path, so the panel derives its vertical path from it rather than restating
     it. Segments are delimited by the decorative `//` separators; a segment may
     be an anchor, a span, or a bare text node, and its destination is whatever
     the author gave it — the panel invents none. */
  /* Rewrite every id declared inside `el`, and every reference to those ids,
     with a suffix. Only ids DECLARED in the subtree are rewritten, so a
     reference out to a document-level def is left pointing where it pointed. */
  function uniquifyIds(el, suffix) {
    var map = {};
    Array.prototype.forEach.call(el.querySelectorAll('[id]'), function (n) {
      var old = n.getAttribute('id');
      if (!old || map[old]) return;
      map[old] = old + suffix;
      n.setAttribute('id', map[old]);
    });
    if (!Object.keys(map).length) return;
    var all = [el].concat(Array.prototype.slice.call(el.querySelectorAll('*')));
    all.forEach(function (n) {
      Array.prototype.forEach.call(n.attributes, function (attr) {
        var v = attr.value, name = attr.name;
        if (!v) return;
        var next = v;
        if (name === 'href' || name === 'xlink:href') {
          if (v.charAt(0) === '#' && map[v.slice(1)]) next = '#' + map[v.slice(1)];
        } else if (name === 'aria-labelledby' || name === 'aria-describedby' ||
                   name === 'aria-owns' || name === 'aria-controls' || name === 'for') {
          next = v.split(/\s+/).map(function (t) { return map[t] || t; }).join(' ');
        }
        /* url(#id) can appear in fill, stroke, clip-path, mask, filter, every
           marker-*, and inside a style attribute — so match the FORM, not a
           list of property names that would go stale. */
        next = next.replace(/url\((['"]?)#([^)'"]+)\1\)/g, function (m, q, id) {
          return map[id] ? 'url(' + q + '#' + map[id] + q + ')' : m;
        });
        if (next !== v) n.setAttribute(name, next);
      });
    });
  }

  function readCrumb(titleEl) {
    if (!titleEl) return [];
    var out = [], cur = { label: '', href: null, current: false };
    Array.prototype.forEach.call(titleEl.childNodes, function (n) {
      if (n.nodeType === 1 && n.classList && n.classList.contains('sep')) {
        if (cur.label.trim()) out.push(cur);
        cur = { label: '', href: null, current: false };
        return;
      }
      if (n.nodeType === 3) { cur.label += n.textContent; return; }
      if (n.nodeType !== 1) return;
      cur.label += n.textContent;
      if (n.tagName === 'A' && n.getAttribute('href')) cur.href = n.getAttribute('href');
      if (n.getAttribute('aria-current') === 'page') cur.current = true;
      var inner = n.querySelector && n.querySelector('a[href]');
      if (!cur.href && inner) cur.href = inner.getAttribute('href');
    });
    if (cur.label.trim()) out.push(cur);
    out.forEach(function (s) { s.label = s.label.replace(/\s+/g, ' ').trim(); });
    return out;
  }

  var titleEl = surface.querySelector('.surface-breadcrumb .surface-title')
             || surface.querySelector('.surface-title');
  var crumb = readCrumb(titleEl);
  if (crumb.length && !crumb.some(function (s) { return s.current; })) {
    crumb[crumb.length - 1].current = true;  /* a root title's last segment IS the surface */
  }

  /* ------------------------------------------------------------- building --
     Rows are list items in a nested list. Tier is carried by nesting and by the
     branch guide the stylesheet draws, not by a uniform pill — a stack of
     identical controls would flatten the structure the panel exists to show. */
  function row(seg) {
    var el;
    if (seg.href && !seg.current) {
      el = doc.createElement('a');
      el.setAttribute('href', seg.href);
    } else {
      el = doc.createElement('span');
    }
    el.className = 'surface-nav-row';
    el.textContent = seg.label;
    if (seg.current) el.setAttribute('aria-current', 'page');
    return el;
  }

  function level() {
    var ol = doc.createElement('ol');
    ol.className = 'surface-nav-level';
    return ol;
  }

  /* Optional OFF-PATH destinations, authored once in the panel-nav source. A
     breadcrumb cannot supply siblings it does not contain, so these are a
     second authored source rather than a second copy of the first. They are
     siblings and children only: the current path itself is never authored here,
     because the visible title already owns it end to end.

     THE CURRENT PAGE IS NEVER AUTHORED HERE. An `<li data-surface-nav-current>`
     is an inert POSITION marker: the consumer says where the current location
     sits among its siblings, and the runtime fills it with the segment derived
     from the visible breadcrumb. Authoring the label again — or a second
     aria-current — would give the panel an independent current-page source
     that could drift from the visible title, which is the failure the
     one-authored-path rule exists to prevent. A nested <ul> inside that <li>
     makes the current location the PARENT of its children rather than their
     sibling, which is the shape a root surface needs. */
  var localList = source.content.querySelector('.surface-nav-local');

  /* Render an authored <ul> as a level, preserving the author's order and
     nesting. Returns whether the current segment was placed anywhere inside. */
  function renderLocal(ul, currentSeg, placed) {
    var ol = level();
    Array.prototype.forEach.call(ul.children, function (li) {
      if (li.tagName !== 'LI') return;
      var out = doc.createElement('li');
      if (li.hasAttribute('data-surface-nav-current')) {
        if (!currentSeg) return;                 /* nothing to place; drop the marker */
        out.appendChild(row(currentSeg));
        placed.value = true;
      } else {
        var a = li.querySelector(':scope > a[href]');
        if (!a) return;
        out.appendChild(row({
          label: (a.textContent || '').replace(/\s+/g, ' ').trim(),
          href: a.getAttribute('href'),
          current: false
        }));
      }
      var sub = li.querySelector(':scope > ul');
      if (sub) {
        var subLevel = renderLocal(sub, currentSeg, placed);
        if (subLevel.children.length) out.appendChild(subLevel);
      }
      ol.appendChild(out);
    });
    return ol;
  }

  function buildTree() {
    var nav = doc.createElement('nav');
    nav.className = 'surface-nav-tree';
    nav.setAttribute('aria-label', PANEL_LABEL);

    var chain = [];
    /* LEGACY COMPATIBILITY, NOT CURRENT AUTHORING. A configured root predates the
       rule that the visible title carries the complete public ancestry, and it is
       honoured so a consumer authored before that rule is not broken merely by
       taking a newer build of this file. New surfaces put every public ancestor
       in the visible breadcrumb instead — authoring both makes the same root
       appear twice, since this prepends the configured one and then appends the
       whole visible chain. Removal is gated on the propagation census reaching
       zero live use, not on this comment. */
    if (cfg.navRootLabel) {
      chain.push({ label: cfg.navRootLabel, href: cfg.navRootHref || null, current: false });
    }
    var currentSeg = null;
    crumb.forEach(function (s) { if (s.current) currentSeg = s; else chain.push(s); });

    var top = level(), host = top;
    chain.forEach(function (seg) {
      var li = doc.createElement('li');
      li.appendChild(row(seg));
      host.appendChild(li);
      var next = level();
      li.appendChild(next);
      host = next;
    });

    var placed = { value: false };
    if (localList) {
      var localLevel = renderLocal(localList, currentSeg, placed);
      /* SNAPSHOT first. `children` is a live collection and appendChild MOVES
         the node out of it, so iterating the collection directly transplants
         only the first row and silently drops the rest. */
      Array.prototype.slice.call(localLevel.children)
        .forEach(function (li) { host.appendChild(li); });
    }
    /* Never lose the current page: a source with no placeholder still gets the
       crumb's own leaf, appended after whatever it authored. */
    if (!placed.value && currentSeg) {
      var leaf = doc.createElement('li');
      leaf.appendChild(row(currentSeg));
      host.appendChild(leaf);
    }

    nav.appendChild(top);
    /* the deepest chain link always allocates a child level; an empty one would
       render as a stray branch guide under the last row */
    Array.prototype.forEach.call(nav.querySelectorAll('.surface-nav-level'), function (ol) {
      if (!ol.children.length) ol.parentNode.removeChild(ol);
    });
    return nav;
  }

  var panel = doc.createElement('dialog');
  panel.className = 'surface-nav-panel';
  panel.id = PANEL_ID;
  panel.setAttribute('aria-label', PANEL_LABEL);

  var inner = doc.createElement('div');
  inner.className = 'surface-nav-panel-inner';

  /* MOBILE DRAG HANDLE. Presentational only: it carries no tab stop, no label
     and no role, because it is an ENHANCEMENT over a dismissal that already
     works. The explicit close button below remains the operable control, and a
     pointer that cannot drag (mouse, or any desktop-mode pointer) loses
     nothing. The handle is also the ONLY drag origin — capture starts here and
     nowhere else — which is what keeps ordinary content scrolling intact. */
  var handle = doc.createElement('div');
  handle.className = 'surface-nav-handle';
  handle.setAttribute('aria-hidden', 'true');

  var head = doc.createElement('div');
  head.className = 'surface-nav-head';
  /* The handle SHARES the close control's line rather than occupying a row of
     its own. A separate full-width strip above the head spent panel height and
     width on an affordance that only needs to be reachable, and pushed the
     hierarchy down for it. Inside the head it sits on the control line the
     panel already required. */
  head.appendChild(handle);
  head.appendChild(buildTree());

  /* An EXPLICIT close control, always. Outside dismissal and Escape are
     conveniences; neither is discoverable, and neither exists for every input. */
  var closeBtn = doc.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'surface-action surface-action--secondary surface-nav-close';
  closeBtn.textContent = CLOSE_LABEL;
  head.appendChild(closeBtn);
  inner.appendChild(head);

  var utilSrc = source.content.querySelector('.surface-nav-utilities');
  if (utilSrc) inner.appendChild(doc.importNode(utilSrc, true));

  panel.appendChild(inner);
  surface.appendChild(panel);

  /* --------------------------------------------------------------- marks --
     ONE authored payload. The anchor is upgraded IN PLACE into a button, and
     the seated instance is cloned from the result — so there is no second
     authored mark tree, and the two placements cannot drift apart. The home
     destination is retained as data for reference; a button has none, which is
     precisely why the unenhanced page keeps the anchor. */
  var trigger = doc.createElement('button');
  trigger.type = 'button';
  trigger.className = mark.className || 'surface-mark';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', PANEL_ID);
  trigger.setAttribute('aria-label', TRIGGER_LABEL);
  if (mark.tagName === 'A' && mark.getAttribute('href')) {
    trigger.setAttribute('data-surface-mark-home', mark.getAttribute('href'));
  }
  while (mark.firstChild) trigger.appendChild(mark.firstChild);
  mark.parentNode.replaceChild(trigger, mark);

  var seat = doc.createElement('div');
  seat.className = 'surface-nav-seat';
  var fade = doc.createElement('div'); fade.className = 'surface-nav-fade';
  var shield = doc.createElement('div'); shield.className = 'surface-nav-shield';
  var seatBtn = trigger.cloneNode(true);
  seatBtn.classList.add('surface-nav-trigger');
  seatBtn.removeAttribute('data-surface-mark-home');
  /* The pattern promises inline SVG as a valid mark payload, and a deep clone
     of one duplicates every id it declares. A gradient, clipPath, mask, filter
     or symbol referenced as url(#id) or href="#id" would then resolve against
     whichever copy the document happens to hit first — usually the wrong one,
     and always non-deterministically. Rewrite the clone's ids and every
     internal reference to them before it enters the document. */
  uniquifyIds(seatBtn, '-surface-nav-seat');
  /* The fade is a SIBLING of the seat, and deliberately so: it has to stand
     outside the seat's transform, or its gradient no longer matches the
     page's. The seat keeps what actually travels — the hit shield and the
     seated mark. surface-shell.css carries the reasoning. */
  seat.appendChild(shield); seat.appendChild(seatBtn);
  doc.body.appendChild(fade);
  doc.body.appendChild(seat);

  root.setAttribute('data-surface-nav', 'ready');
  root.setAttribute('data-surface-nav-mode', mode);
  surface.setAttribute('data-surface-nav', 'ready');

  /* ------------------------------------------------------------ geometry --
     Progress comes from the OPENING mark's own viewport exit, never from a
     percentage of the document: the terminal reserve changes the document's
     height, so a percentage-driven handoff would retime itself whenever the
     footer, the content length or the browser chrome moved. */
  var exitSpan = 0, markBlock = 0, isShort = false, isOpen = false;
  var scheduled = false, lastInvoker = null;

  function writeVar(name, value) {            /* only on material change */
    if (root.style.getPropertyValue(name) === value) return;
    root.style.setProperty(name, value);
  }

  function measure() {
    var r = trigger.getBoundingClientRect();
    var block = r.height;
    if (block && Math.abs(block - markBlock) >= 0.5) {
      markBlock = block;
      writeVar('--surface-nav-mark-block', markBlock.toFixed(2) + 'px');
    }
    /* the mark is in flow on mobile, so its document-space bottom is constant */
    exitSpan = MOBILE() ? (r.bottom + window.scrollY) : 0;
  }

  /* SHORT is measured to the FOOTER's bottom, never to the document's: the
     terminal reserve sits below the footer, so measuring scrollHeight would let
     the reserve manufacture the scrolling that summons the very unit the
     reserve exists to clear — the guard would defeat itself on exactly the
     pages it protects. */
  function shortPage() {
    var foot = surface.querySelector('.surface-footer');
    if (!foot) return false;
    return (foot.getBoundingClientRect().bottom + window.scrollY) <= window.innerHeight;
  }

  function progress() {
    if (!exitSpan) return 0;
    return Math.min(1, Math.max(0, window.scrollY / exitSpan));
  }

  function setOperable(el, on) {
    /* Never leave focus inside an element about to be hidden from the tree. */
    if (!on && el.contains(doc.activeElement)) {
      var other = (el === trigger) ? seatBtn : trigger;
      if (other && !other.disabled) other.focus();
      else el.blur();
    }
    el.disabled = !on;
    el.setAttribute('tabindex', on ? '0' : '-1');
    el.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  function visibleTrigger() {
    if (!MOBILE()) return trigger;
    return (!isShort && progress() > 0.999) ? seatBtn : trigger;
  }

  function frame() {
    scheduled = false;
    isShort = MOBILE() && shortPage();
    root.toggleAttribute('data-surface-nav-short', isShort);
    surface.toggleAttribute('data-surface-nav-short', isShort);

    var p = MOBILE() ? (isShort ? 0 : progress()) : 0;
    /* Reduced motion takes the SAME value, snapped — discrete states, never an
       interpolated slide and never two marks visible at once. */
    if (REDUCED()) p = p >= 1 ? 1 : 0;
    writeVar('--surface-nav-p', p.toFixed(4));

    if (!MOBILE()) {
      var s = Math.min(SETTLE_TO, Math.max(0, window.scrollY / SETTLE_RANGE * SETTLE_TO));
      if (REDUCED()) s = s >= SETTLE_TO ? SETTLE_TO : 0;
      writeVar('--surface-nav-settle', s.toFixed(2) + 'px');
    } else {
      writeVar('--surface-nav-settle', '0px');
    }

    /* Exactly one operable trigger, and its operability always matches what is
       on screen — a visible-but-inert mark is the defect this replaces.

       ORDER IS LOAD-BEARING: enable the INCOMING control before disabling the
       outgoing one. setOperable moves focus to the alternate only if that
       alternate is already enabled, so disabling first would blur a focused
       trigger to the body on the upward handoff and lose the keyboard position
       entirely — a defect in one direction only, which is exactly the kind that
       survives a one-directional test. */
    var seated = MOBILE() && !isShort && p > 0.999;
    if (seated) { setOperable(seatBtn, true);  setOperable(trigger, false); }
    else        { setOperable(trigger, true);  setOperable(seatBtn, false); }
  }

  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(frame); } }
  function remeasure() { measure(); frame(); }

  /* ----------------------------------------------------------- disclosure */
  function setExpanded(on) {
    trigger.setAttribute('aria-expanded', on ? 'true' : 'false');
    seatBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
  }

  /* The durable contract is that the background's scroll position stays
     INVARIANT while the panel is open; the mechanism is not the contract. The
     stylesheet's overflow lock is the first limb. This is the second: where a
     UA lets the page scroll beneath a modal anyway, the recorded position is
     restored. Deliberately not `position: fixed` on the body — that would make
     the body a containing block for fixed descendants and tear the seated mark
     off the viewport. */
  var lockedY = 0, locked = false, onLockScroll = null;
  function lockPageScroll() {
    if (locked) return;
    lockedY = window.scrollY || 0;
    root.setAttribute('data-surface-nav-locked', '');
    onLockScroll = function () {
      if (Math.abs((window.scrollY || 0) - lockedY) > 1) window.scrollTo(0, lockedY);
    };
    window.addEventListener('scroll', onLockScroll, { passive: true });
    locked = true;
  }
  function unlockPageScroll() {
    if (!locked) return;
    window.removeEventListener('scroll', onLockScroll);
    onLockScroll = null;
    root.removeAttribute('data-surface-nav-locked');
    window.scrollTo(0, lockedY);
    locked = false;
  }

  function restoreFocus() {
    var target = (lastInvoker && lastInvoker.isConnected && !lastInvoker.disabled)
      ? lastInvoker : visibleTrigger();
    lastInvoker = null;
    if (target && !target.disabled) target.focus();
  }

  /* The entrance is deferred by two frames — the first commits the closed
     transform, the second animates from it — and a deferred effect that nobody
     can cancel is a race. Dismissing before the second frame lands (Escape, the
     close control, an outside tap, a rotation) removes a class that is not there
     yet, and the queued callback then adds it AFTER the close began: the panel
     travels inward on a dismissed dialog, `finish` closes it with `is-open` still
     attached, and the next opening either appears already open or skips its
     entrance entirely.

     Both frames are therefore tracked AND stamped with a generation. Cancelling
     is the primary guard; the generation is the backstop for a callback already
     dequeued and running when the close arrives, which cancelAnimationFrame
     cannot reach. */
  /* INPUT MODALITY. Returning focus to the invoker is correct and stays; what
     is wrong is painting a keyboard indicator for a touch. iOS Safari treats
     programmatic focus as :focus-visible regardless of how the interaction
     began, so a tap-to-close leaves the trigger wearing the white ring.

     Tracked by MODALITY rather than by breakpoint or pointer media, because a
     hardware keyboard on an iPad is the case a coarse-pointer query would
     silently break. Capture phase, so it is recorded before any handler that
     might close the panel. */
  var lastModality = 'key';
  doc.addEventListener('pointerdown', function () { lastModality = 'pointer'; }, true);
  doc.addEventListener('keydown', function () {
    lastModality = 'key';
    /* any keyboard use restores the visible treatment immediately — on the
       trigger and inside the panel alike, before the key is processed */
    clearPointerFocus();
    clearPointerEntryFocus();
  }, true);

  function setPointerFocus(on) {
    [trigger, seatBtn].forEach(function (el) {
      if (!el) return;
      if (on) el.setAttribute('data-surface-nav-pointer-focus', '');
      else el.removeAttribute('data-surface-nav-pointer-focus');
    });
  }
  function clearPointerFocus() { setPointerFocus(false); }

  /* The same browser behavior on the way IN. Opening by touch still moves focus
     to the first destination — a modal needs an internal focus destination —
     but Safari paints that programmatic focus as :focus-visible, so the row
     wore a keyboard ring and implied a selection the user never made.

     A SEPARATE attribute from the trigger's, deliberately: the two are cleared
     by different events, and one clearing function for both would let a close
     wipe the entrance state or a keypress wipe the return state. */
  var entryFocused = null;
  function clearPointerEntryFocus() {
    if (!entryFocused) return;
    entryFocused.removeAttribute('data-surface-nav-pointer-entry-focus');
    entryFocused.removeEventListener('blur', clearPointerEntryFocus);
    entryFocused = null;
  }

  var openGen = 0, rafA = null, rafB = null;

  function cancelOpeningFrames() {
    if (rafA !== null) { cancelAnimationFrame(rafA); rafA = null; }
    if (rafB !== null) { cancelAnimationFrame(rafB); rafB = null; }
  }

  function openPanel(invoker) {
    if (isOpen) return;
    isOpen = true;
    cancelOpeningFrames();
    var gen = ++openGen;
    lastInvoker = invoker || visibleTrigger();
    lockPageScroll();
    if (typeof panel.showModal === 'function') panel.showModal();
    else panel.setAttribute('open', '');
    setExpanded(true);
    var first = panel.querySelector('a[href], button:not([disabled])');
    if (first) {
      clearPointerEntryFocus();
      if (lastModality === 'pointer') {
        entryFocused = first;
        first.setAttribute('data-surface-nav-pointer-entry-focus', '');
        first.addEventListener('blur', clearPointerEntryFocus);
      }
      first.focus();
    }
    rafA = requestAnimationFrame(function () {
      rafA = null;
      if (gen !== openGen || !isOpen) return;
      rafB = requestAnimationFrame(function () {
        rafB = null;
        if (gen !== openGen || !isOpen) return;
        if (!(panel.open || panel.hasAttribute('open'))) return;
        panel.classList.add('is-open');
      });
    });
  }

  var closeTimer = null;
  function closePanel() {
    if (!isOpen) return;
    isOpen = false;
    /* A dismissal from ANY source ends the gesture: the inline transform must
       not survive into the exit, or the sheet exits from wherever the finger
       left it and returns there on reopen. */
    if (typeof dragReset === 'function') dragReset(true);
    clearPointerEntryFocus();   /* the entrance state does not outlive the panel */
    /* Whether an EXIT is even possible has to be read BEFORE the class is
       removed. If the entrance never landed — a synchronous dismissal, or one
       between the two opening frames — the transform never left its closed
       value, so no transform transition can run and there is nothing to wait
       for. Waiting anyway leaves the dialog open in the top layer for the
       fallback duration: parked off-screen, background inert, page scroll
       locked, aria-expanded already false. The page looks normal and ignores
       every interaction for most of half a second. */
    var hadEntered = panel.classList.contains('is-open');
    /* Stamp the modality HERE, at close initiation, and never inside the focus
       path. Focus return is an accessibility behavior and this is a purely
       presentational suppression, so the two are kept physically separate: the
       stylesheet keys on the attribute, whichever trigger the existing
       restoreFocus() lands on, and restoreFocus() itself is untouched. */
    setPointerFocus(lastModality === 'pointer');
    openGen++;                 /* invalidate any opening callback already running */
    cancelOpeningFrames();     /* and drop the ones still queued */
    panel.classList.remove('is-open');
    setExpanded(false);

    /* The dialog stays OPEN and in the top layer for the whole exit, and
       close() is called on completion. The fallback duration is READ from the
       computed style rather than hard-coded, so it cannot drift out of step
       with the stylesheet; it is defensive only, and the motion — not an
       overlay transition — is what the correctness depends on. */
    function finish() {
      if (!panel.open && !panel.hasAttribute('open')) return;
      panel.classList.remove('is-open');   /* defensive: a frame may have landed */
      panel.removeEventListener('transitionend', onEnd);
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (typeof panel.close === 'function' && panel.open) panel.close();
      else panel.removeAttribute('open');
      unlockPageScroll();
      restoreFocus();
      if (pendingMode) { var m = pendingMode; pendingMode = null; commitMode(m); }
      schedule();
    }
    function onEnd(e) { if (e.target === panel && e.propertyName === 'transform') finish(); }

    /* Nothing to animate: reduced motion, or an entrance that never arrived. */
    if (REDUCED() || !hadEntered) { finish(); return; }
    panel.addEventListener('transitionend', onEnd);
    var cs = getComputedStyle(panel);
    var durs = (cs.transitionDuration || '0s').split(',').map(parseFloat);
    var dels = (cs.transitionDelay || '0s').split(',').map(parseFloat);
    var longest = 0;
    for (var i = 0; i < durs.length; i++) {
      longest = Math.max(longest, (durs[i] || 0) + (dels[i] || 0));
    }
    closeTimer = setTimeout(finish, Math.round(longest * 1000) + 60);
  }

  /* ------------------------------------------------------- swipe-to-close --
     A downward drag on the handle dismisses the mobile sheet. Two thresholds,
     either of which commits: a DISTANCE for a slow deliberate pull, and a
     VELOCITY for a short fast flick. One without the other makes a whole class
     of natural gesture fail — a quick flick never travels far, and a careful
     drag is never fast.

     Both are named constants in ONE place. This is deliberately not a physics
     model or a tuning surface: two numbers, read once, documented here. */
  var SWIPE_COMMIT_PX = 88;      /* distance alone commits, at any speed       */
  var SWIPE_COMMIT_VPX = 0.55;   /* px/ms downward at release alone commits    */
  var SWIPE_SAMPLE_MS = 120;     /* velocity window; older samples are dropped */

  var drag = null;

  /* SAMPLES CARRY SHEET DISPLACEMENT, NOT RAW POINTER Y. The sheet's travel is
     clamped at zero upward, so a finger that goes up and snaps back to its start
     produces a large raw-Y velocity while the sheet never moved at all — and the
     velocity arm would dismiss on a gesture with zero net displacement. The
     quantity that commits has to be the one the sheet actually performed.

     Drop samples that fall outside the release window, ALWAYS retaining one
     predecessor to measure against. Without the release sample appended this
     could never fire on a hold-then-flick — two samples remained, the stale
     pointerdown one among them, and the flick's speed was averaged across the
     whole stationary hold. That is the case the velocity arm exists for. */
  function trimSamples(samples, now) {
    while (samples.length > 2 && now - samples[0].t > SWIPE_SAMPLE_MS) samples.shift();
  }

  function dragReset(restore) {
    if (!drag) return;
    var id = drag.id;
    drag = null;
    panel.classList.remove('is-dragging');
    if (restore) panel.style.transform = '';
    try { if (handle.hasPointerCapture && handle.hasPointerCapture(id)) handle.releasePointerCapture(id); }
    catch (err) { /* capture already gone — nothing to release */ }
  }

  handle.addEventListener('pointerdown', function (e) {
    /* Mouse is excluded on purpose: a desktop drawer has no swipe affordance,
       and a mouse drag that dismissed it would be an undiscoverable action
       with no visible handle. Touch and pen only, primary pointer only. */
    if (!MOBILE() || !isOpen || drag) return;
    if (e.pointerType === 'mouse' || !e.isPrimary) return;
    drag = { id: e.pointerId, y0: e.clientY, x0: e.clientX, dy: 0, dx: 0,
             samples: [{ t: e.timeStamp, d: 0 }] };
    panel.classList.add('is-dragging');
    try { handle.setPointerCapture(e.pointerId); } catch (err) { /* non-fatal */ }
  });

  handle.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x0;
    /* Upward travel is CLAMPED, not tracked: the sheet is bottom-anchored, so
       following a pointer upward would lift it off its own edge. */
    drag.dy = Math.max(0, e.clientY - drag.y0);
    drag.samples.push({ t: e.timeStamp, d: drag.dy });
    trimSamples(drag.samples, e.timeStamp);
    panel.style.transform = 'translateY(' + drag.dy + 'px)';
  });

  function dragEnd(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    /* THE RELEASE ITSELF IS A SAMPLE. Movement between the last pointermove and
       pointerup is real travel, and reading only the move stream discards it
       from both arms of the decision. */
    if (e) {
      drag.dx = e.clientX - drag.x0;
      drag.dy = Math.max(0, e.clientY - drag.y0);
      drag.samples.push({ t: e.timeStamp, d: drag.dy });
      trimSamples(drag.samples, e.timeStamp);
    }
    var dy = drag.dy, dx = drag.dx, sm = drag.samples;
    var first = sm[0], last = sm[sm.length - 1];
    var dt = last.t - first.t;
    var v = dt > 0 ? (last.d - first.d) / dt : 0;   /* px/ms of SHEET travel */
    /* A horizontal-dominant gesture is a swipe ACROSS the handle, not down it. */
    var vertical = Math.abs(dy) >= Math.abs(dx);
    var commit = vertical && (dy >= SWIPE_COMMIT_PX || v >= SWIPE_COMMIT_VPX);

    if (commit) {
      /* Hand the inline transform back BEFORE closing so the exit transition
         runs from the stylesheet's own closed value, exactly as every other
         dismissal does. The gesture commits to the EXISTING lifecycle; it does
         not implement a second one. */
      dragReset(true);
      closePanel();
      return;
    }
    dragReset(true);   /* insufficient: return to the exact open position */
  }

  handle.addEventListener('pointerup', dragEnd);
  handle.addEventListener('pointercancel', function (e) { if (drag && e.pointerId === drag.id) dragReset(true); });
  handle.addEventListener('lostpointercapture', function (e) { if (drag && e.pointerId === drag.id) dragReset(true); });

  function toggle(e) { isOpen ? closePanel() : openPanel(e.currentTarget); }
  trigger.addEventListener('click', toggle);
  seatBtn.addEventListener('click', toggle);

  closeBtn.addEventListener('click', closePanel);

  /* Escape routes through the motion-completing path rather than the UA's
     immediate close. */
  panel.addEventListener('cancel', function (e) { e.preventDefault(); closePanel(); });

  /* Outside dismissal needs POINTER COORDINATES outside the panel rect.
     `event.target === panel` alone is insufficient: a tap on the panel's own
     padding also targets the panel, so that test would dismiss on a press
     inside the panel. Keyboard activation reports no useful coordinates and is
     excluded outright. */
  panel.addEventListener('click', function (e) {
    if (e.detail === 0) return;
    var r = panel.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right ||
        e.clientY < r.top  || e.clientY > r.bottom) closePanel();
  });

  /* Commit a mode: publish it, then re-derive everything that depends on it. */
  function commitMode(next) {
    mode = next;
    /* A rotation or a mode flip mid-drag changes which edge the sheet is
       anchored to. Any in-flight gesture is abandoned and the inline transform
       dropped, so the panel resolves to whatever the new mode's rules say. */
    dragReset(true);
    root.setAttribute('data-surface-nav-mode', mode);
    remeasure();
    var t = visibleTrigger();
    if (t && !t.disabled && doc.activeElement &&
        (doc.activeElement === trigger || doc.activeElement === seatBtn) &&
        t !== doc.activeElement) t.focus();
  }

  /* A mode change commits a different placement AND a different entrance. While
     the panel is open that would swap drawer geometry for sheet geometry
     mid-exit, so the change is DEFERRED: the panel closes under the geometry it
     opened with, and the new mode commits once the close completes. */
  /* `isOpen` goes false at the TOP of closePanel, because it tracks intent
     rather than the dialog's state — the element stays open and in the top
     layer for the whole exit. Deferral must therefore key on the DIALOG, or a
     second matching media query firing in the same tick (a rotation changes
     both the width and the short-coarse query) would see isOpen already false
     and commit the new geometry mid-exit — which is the exact swap this defers
     to prevent. */
  function panelActive() { return isOpen || panel.open || panel.hasAttribute('open'); }

  function onModeQueryChange() {
    var want = desiredMode();
    if (want === mode) { pendingMode = null; return; }   /* rotated back mid-exit */
    if (panelActive()) {
      pendingMode = want;
      if (isOpen) closePanel();
      return;
    }
    commitMode(want);
  }
  [mqNarrow, mqShortCoarse].forEach(function (mq) {
    if (mq.addEventListener) mq.addEventListener('change', onModeQueryChange);
    else if (mq.addListener) mq.addListener(onModeQueryChange);
  });
  if (mqReduced.addEventListener) mqReduced.addEventListener('change', schedule);
  else if (mqReduced.addListener) mqReduced.addListener(schedule);

  /* Observe the boxes whose SIZE changes. A footer pushed DOWN by content above
     it never resizes, so observing the footer alone would miss the case the
     reserve exists for; the header, the payload and the mark are what actually
     move it. .surface itself is not observed — its bottom padding is part of
     what these measurements feed. All of it batches into one scheduled frame. */
  if (typeof ResizeObserver === 'function') {
    var ro = new ResizeObserver(function () { measure(); schedule(); });
    [surface.querySelector('.surface-head'),
     surface.querySelector('.surface-payload'),
     surface.querySelector('.surface-footer'),
     trigger, seatBtn].forEach(function (el) { if (el) ro.observe(el); });
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', function () { onModeQueryChange(); remeasure(); });
  window.addEventListener('orientationchange', function () { onModeQueryChange(); remeasure(); });
  /* BFCache return restores the DOM but not the measurements: the viewport, the
     resolved mode, the mark's rendered box and the short-page verdict can all
     have changed while the page sat in the cache, and no scroll or resize event
     is guaranteed on the way back. */
  window.addEventListener('pageshow', function () { onModeQueryChange(); remeasure(); });
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(remeasure);
  remeasure();
})();
