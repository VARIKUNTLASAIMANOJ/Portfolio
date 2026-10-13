// Page chrome: theme toggle, floating nav, mobile menu, and the trace rail.
import { $, $$ } from '../lib/dom.js';

export function initTheme() {
  const btn = $('.theme-toggle');
  const root = document.documentElement;
  const label = () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', `Switch to ${next} theme`);
  };
  label();
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch {}
    label();
  });
  // follow the system until the visitor picks a theme themselves
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let saved = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {}
    if (!saved) {
      root.dataset.theme = e.matches ? 'dark' : 'light';
      label();
    }
  });
}

export function initHeader() {
  const header = $('.site-header');
  const menuBtn = $('.menu-toggle');
  const list = $('#nav-links');
  const onScroll = () => (header.dataset.scrolled = scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const close = () => {
    menuBtn.setAttribute('aria-expanded', 'false');
    header.dataset.menu = 'closed';
  };
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    header.dataset.menu = open ? 'open' : 'closed';
    if (open) $('a', list)?.focus();
  });
  list.addEventListener('click', (e) => e.target.closest('a') && close());
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.dataset.menu === 'open') {
      close();
      menuBtn.focus();
    }
  });
}

// The rail is the page's scrollbar and its run log: done steps stay filled,
// the active step holds the packet, upcoming steps are hollow. The packet
// glides node to node as sections change; dragging along the rail scrubs the
// page, and a click on the wire jumps there.
export function initRail() {
  const rail = $('.trace');
  const steps = $$('.trace-step');
  const segs = $$('.progress-seg');
  const packet = $('.trace-packet');
  const sections = steps.map((s) => document.getElementById(s.dataset.for));
  const line = () => innerHeight * 0.35;
  const docTop = (el) => el.getBoundingClientRect().top + scrollY;
  let active = -1;
  let dragging = false;

  // a dot's centre, measured from the top of the rail
  const dotY = (k) => {
    const d = $('.trace-dot', steps[k]).getBoundingClientRect();
    return d.top - rail.getBoundingClientRect().top + d.height / 2;
  };
  const placePacket = (y) => packet && (packet.style.transform = `translateY(${y}px)`);

  function setActive(i) {
    if (i === active) return;
    active = i;
    [steps, segs].forEach((group) =>
      group.forEach((el, k) => (el.dataset.state = k < i ? 'done' : k === i ? 'active' : 'upcoming')),
    );
    steps.forEach((el, k) => {
      const link = $('a', el);
      if (k === i) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    if (packet) packet.dataset.agent = steps[i].dataset.agent;
  }

  function update() {
    let i = 0;
    sections.forEach((s, k) => {
      if (s.getBoundingClientRect().top <= line()) i = k;
    });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) i = sections.length - 1;
    setActive(i);
    // the packet rests inside the active node
    if (!dragging && rail.getClientRects().length) placePacket(dotY(i));
  }

  // rail position -> page position, the inverse of the packet
  function scrubTo(clientY) {
    const ys = steps.map((_, k) => dotY(k));
    const y = Math.min(Math.max(clientY - rail.getBoundingClientRect().top, ys[0]), ys.at(-1));
    let k = 0;
    while (k < ys.length - 1 && y > ys[k + 1]) k++;
    const frac = k < ys.length - 1 ? (y - ys[k]) / (ys[k + 1] - ys[k]) : 0;
    placePacket(y);
    scrollTo({ top: Math.max(0, docTop(sections[k]) + frac * sections[k].offsetHeight - line() + 1), behavior: 'instant' });
  }

  let press = null;
  let swallowClick = false;
  rail.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    press = { y: e.clientY, id: e.pointerId, onLink: !!e.target.closest('a'), moved: false };
  });
  addEventListener('pointermove', (e) => {
    if (!press) return;
    if (!press.moved) {
      if (Math.abs(e.clientY - press.y) < 4) return;
      press.moved = true;
      dragging = true;
      rail.classList.add('is-dragging');
      rail.setPointerCapture?.(press.id);
    }
    e.preventDefault();
    scrubTo(e.clientY);
  });
  addEventListener('pointerup', (e) => {
    if (!press) return;
    const { moved, onLink } = press;
    press = null;
    if (moved) {
      dragging = false;
      rail.classList.remove('is-dragging');
      swallowClick = true;
      setTimeout(() => (swallowClick = false), 0);
      update();
    } else if (!onLink) {
      scrubTo(e.clientY); // a click on the wire jumps there
      update();
    }
  });
  rail.addEventListener('click', (e) => swallowClick && (e.preventDefault(), e.stopPropagation()), true);

  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', () => {
    active = -1;
    update();
  });
  document.fonts?.ready.then(update);
  update();
}
