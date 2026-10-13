// Projects: thumbnails are tabs. Picking one opens its details and its big
// preview, and a wire runs from the chosen thumbnail into the preview.
import { $, $$, reducedMotion } from '../lib/dom.js';
import { initArchIn } from './arch.js';

export function initWork() {
  const root = $('.work-browser');
  if (!root) return;
  const tabs = $$('.work-tab', root);
  const panels = $$('.work-panel', root);
  const previews = $$('.work-preview', root);
  const wire = $('.work-wire', root);
  const left = $('.work-left', root);
  let current = Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));

  function drawWire(animate) {
    const tab = tabs[current];
    const preview = previews[current];
    if (getComputedStyle(wire).display === 'none' || !tab || preview.hidden) return;
    const box = root.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const p = preview.getBoundingClientRect();
    const tabsBottom = $('.work-tabs', root).getBoundingClientRect().bottom;
    const panelsTop = $('.work-panels', root).getBoundingClientRect().top;
    const x1 = t.left + t.width / 2 - box.left;
    const y1 = t.bottom - box.top;
    const y = (tabsBottom + panelsTop) / 2 - box.top;
    const x2 = p.left - box.left;
    const bend = Math.min(16, (y - y1) / 2);
    const path = `M${x1} ${y1}V${y - bend}Q${x1} ${y} ${x1 + bend} ${y}H${x2}`;
    wire.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    $('.wire-base', wire).setAttribute('d', path);
    $('.wire-flow', wire).setAttribute('d', path);
    const end = $('.wire-end', wire);
    end.setAttribute('cx', x2);
    end.setAttribute('cy', y);
    wire.dataset.lane = tab.dataset.lane;
    if (animate && !reducedMotion()) {
      wire.classList.remove('is-drawing');
      void wire.getBoundingClientRect();
      wire.classList.add('is-drawing');
    }
  }

  function select(i, { focus = false, animate = true } = {}) {
    if (i < 0 || i >= tabs.length) return;
    current = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    panels.forEach((p, k) => (p.hidden = k !== i));
    previews.forEach((p, k) => (p.hidden = k !== i));
    if (focus) tabs[i].focus();
    for (const el of [panels[i], previews[i]]) {
      el.classList.remove('is-in');
      void el.offsetWidth;
      el.classList.add('is-in');
    }
    // the preview's diagram was hidden until now; lay it out and run it
    initArchIn(previews[i]);
    requestAnimationFrame(() => drawWire(animate));
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));
  $('.work-tabs', root).addEventListener('keydown', (e) => {
    const next = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select((next + tabs.length) % tabs.length, { focus: true });
  });

  // screenshot / architecture switch inside a preview
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.preview-switch button');
    if (!b) return;
    const fig = b.closest('.work-preview');
    fig.dataset.view = b.dataset.view;
    $$('.preview-switch button', fig).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (b.dataset.view === 'arch') initArchIn(fig);
  });

  // links like #project-… (from the agent or the skills board) open that project
  const fromHash = () => {
    const i = panels.findIndex((p) => `#${p.id}` === location.hash);
    if (i < 0) return;
    select(i, { animate: true });
    $('#projects').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
  };
  addEventListener('hashchange', fromHash);

  new ResizeObserver(() => drawWire(false)).observe(left);
  new ResizeObserver(() => drawWire(false)).observe(root);
  document.fonts?.ready.then(() => drawWire(false));
  if (location.hash) fromHash();
  else initArchIn(previews[current]);

  // the first wire draws itself when the section comes into view
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      drawWire(true);
    },
    { threshold: 0.35 },
  );
  io.observe(root);
}
