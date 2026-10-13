// Certificates: one in focus, its neighbours dimmed either side, and wires
// running card to card. Arrows, dots, keys, swipe, or a click on a neighbour
// bring the next one forward.
import { $, $$, reducedMotion } from '../lib/dom.js';

// an elbow with rounded corners: across, down/up, across
function elbow(x1, y1, x2, y2, r = 14) {
  const mx = (x1 + x2) / 2;
  const sy = Math.sign(y2 - y1) || 1;
  const sx = Math.sign(x2 - x1) || 1;
  const rr = Math.min(r, Math.abs(y2 - y1) / 2, Math.abs(mx - x1));
  if (rr < 1) return `M${x1} ${y1}H${x2}`;
  return `M${x1} ${y1}H${mx - sx * rr}Q${mx} ${y1} ${mx} ${y1 + sy * rr}V${y2 - sy * rr}Q${mx} ${y2} ${mx + sx * rr} ${y2}H${x2}`;
}

export function initCerts() {
  const stage = $('.cert-stage');
  if (!stage) return;
  const section = stage.closest('section');
  const slides = $$('.cert-slide', stage);
  const caps = $$('.cert-cap', section);
  const dots = $$('.cert-dots i', section);
  const wires = $('.cert-wires', stage);
  const n = slides.length;
  let i = 0;
  let timer = 0;

  const posOf = (k) => {
    const d = (((k - i) % n) + n) % n;
    if (d === 0) return 'center';
    if (d === 1) return 'next';
    if (d === n - 1) return 'prev';
    return d <= n / 2 ? 'after' : 'before';
  };

  function drawWires() {
    const box = stage.getBoundingClientRect();
    const rect = (pos) => slides.find((s) => s.dataset.pos === pos)?.querySelector('.cert-card').getBoundingClientRect();
    const c = rect('center');
    const p = rect('prev');
    const nx = rect('next');
    let html = '';
    if (c && p && getComputedStyle(slides.find((s) => s.dataset.pos === 'prev')).opacity !== '0') {
      const x1 = p.right - box.left;
      const y1 = p.top + p.height / 2 - box.top;
      const x2 = c.left - box.left;
      const y2 = c.top + c.height * 0.55 - box.top;
      html += `<path class="wire wire-in" d="${elbow(x1, y1, x2, y2)}"/><circle class="wire-dot" cx="${x1}" cy="${y1}" r="5"/>`;
    }
    if (c && nx && getComputedStyle(slides.find((s) => s.dataset.pos === 'next')).opacity !== '0') {
      const x1 = c.right - box.left;
      const y1 = c.top + c.height * 0.72 - box.top;
      const x2 = nx.left - box.left;
      const y2 = nx.top + nx.height / 2 - box.top;
      html += `<path class="wire wire-out" pathLength="1" d="${elbow(x1, y1, x2, y2)}"/><circle class="wire-ring" cx="${x1}" cy="${y1}" r="9"/>`;
    }
    wires.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    wires.innerHTML = html;
    stage.dataset.wired = 'true';
  }

  function go(k, { focus = false } = {}) {
    i = (((k % n) + n) % n);
    stage.dataset.wired = 'false';
    slides.forEach((s, j) => {
      const pos = posOf(j);
      s.dataset.pos = pos;
      const btn = $('.cert-card', s);
      btn.tabIndex = pos === 'center' || pos === 'prev' || pos === 'next' ? 0 : -1;
      btn.setAttribute('aria-current', String(pos === 'center'));
    });
    caps.forEach((cap, j) => (cap.hidden = j !== i));
    dots.forEach((d, j) => d.toggleAttribute('data-on', j === i));
    if (focus) $('.cert-card', slides[i]).focus();
    clearTimeout(timer);
    timer = setTimeout(drawWires, reducedMotion() ? 0 : 560);
  }

  slides.forEach((s, j) =>
    $('.cert-card', s).addEventListener('click', () => {
      const pos = s.dataset.pos;
      if (pos === 'prev' || pos === 'next') return go(j, { focus: true });
      // the focused certificate opens its credential, when there is one
      const link = $(`.cert-cap[data-i="${j}"] a.pill-link`, section);
      if (link) window.open(link.href, '_blank', 'noopener');
    }),
  );
  $('.cert-prev', section)?.addEventListener('click', () => go(i - 1));
  $('.cert-next', section)?.addEventListener('click', () => go(i + 1));
  section.addEventListener('keydown', (e) => {
    if (!e.target.closest('.cert-stage, .cert-controls')) return;
    if (e.key === 'ArrowRight') go(i + 1, { focus: e.target.closest('.cert-stage') !== null });
    if (e.key === 'ArrowLeft') go(i - 1, { focus: e.target.closest('.cert-stage') !== null });
  });

  // swipe
  let x0 = null;
  stage.addEventListener('pointerdown', (e) => (x0 = e.clientX));
  stage.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? i + 1 : i - 1);
  });

  new ResizeObserver(() => drawWires()).observe(stage);
  go(0);
}
