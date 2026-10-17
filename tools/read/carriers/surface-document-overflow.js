/* =========================================================================
   surface-document-overflow.js — OPTIONAL overflow-cue helper
   =========================================================================
   A companion to surface-document.css, loaded only by a surface that wants the
   overflow cue on its preformatted blocks and its document tables' boxes.
   Without it a .doc-pre or a .doc-table-scroll still scrolls inside its own box
   and shows no cue.

   IT ONLY REPORTS STATE. On every .doc-pre and .doc-table-scroll — a "block"
   below — it sets three attributes, and the stylesheet turns them into a
   right-edge fade and a small label naming the direction the block scrolls:

     data-overflow         the block is wider than its box
     data-overflow-start   hidden content lies to the left
     data-overflow-end     hidden content lies to the right

   A block that fits carries none of them. A difference of 1px or less is not
   overflow.

   WHEN IT MEASURES
     scrolling a block       a passive scroll listener on that block
     the block's box         a ResizeObserver on each block, so a container
                             resize or an opened disclosure re-measures; where
                             ResizeObserver is unavailable, the window resize
                             event instead. A later font change that leaves
                             the box size unchanged is not re-measured
     blocks added later      a MutationObserver on document.body
     webfonts                once more when document.fonts is ready

   WHAT IT NEVER DOES
     inject markup · set a tabindex · change text · shrink, wrap or reflow a
     block · expose a global
   ========================================================================= */
(function () {
  'use strict';

  var SELECTOR = '.doc-pre, .doc-table-scroll';
  var THRESHOLD = 1;
  var attached = new WeakSet();
  var resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(function (entries) {
        entries.forEach(function (entry) { update(entry.target); });
      })
    : null;

  function update(el) {
    var max = el.scrollWidth - el.clientWidth;
    var over = max > THRESHOLD;
    el.toggleAttribute('data-overflow', over);
    el.toggleAttribute('data-overflow-start', over && el.scrollLeft > THRESHOLD);
    el.toggleAttribute('data-overflow-end', over && el.scrollLeft < max - THRESHOLD);
  }

  function attach(el) {
    if (attached.has(el)) { update(el); return; }
    attached.add(el);
    el.addEventListener('scroll', function () { update(el); }, { passive: true });
    if (resizeObserver) resizeObserver.observe(el);
    update(el);
  }

  function attachWithin(node) {
    if (node.nodeType !== 1) return;
    if (node.matches(SELECTOR)) attach(node);
    Array.prototype.forEach.call(node.querySelectorAll(SELECTOR), attach);
  }

  function updateAll() {
    Array.prototype.forEach.call(document.querySelectorAll(SELECTOR), update);
  }

  function start() {
    attachWithin(document.body);

    if (typeof MutationObserver === 'function') {
      new MutationObserver(function (records) {
        records.forEach(function (record) {
          Array.prototype.forEach.call(record.addedNodes, attachWithin);
        });
      }).observe(document.body, { childList: true, subtree: true });
    }

    if (!resizeObserver) window.addEventListener('resize', updateAll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateAll);
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
}());
