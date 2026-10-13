// Project architecture diagrams: boxes laid out in layers by CSS, edges drawn
// here from the boxes' real positions, so the diagram reflows (left-to-right
// on wide cards, top-to-bottom on narrow ones) and the wiring follows.
import { $$, reducedMotion } from '../lib/dom.js';

const NS = 'http://www.w3.org/2000/svg';
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
let uid = 0;

function draw(arch) {
  const svg = arch.querySelector('.arch-edges');
  const layers = $$('.arch-layer', arch).map((l) => $$('.arch-node', l));
  const box = arch.getBoundingClientRect();
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cx: r.left - box.left + r.width / 2, cy: r.top - box.top + r.height / 2 };
  };
  const first = layers[0]?.[0];
  const second = layers[1]?.[0];
  const horizontal = !second || rect(second).l >= rect(first).r - 1;
  arch.dataset.flow = horizontal ? 'h' : 'v';

  svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
  svg.setAttribute('width', box.width);
  svg.setAttribute('height', box.height);
  const id = (arch.dataset.uid ??= `arch-${++uid}`);
  let paths = `<defs><marker id="${id}-a" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M1.5 1.5 8.5 5 1.5 8.5"/></marker></defs>`;
  layers.forEach((layer, i) => {
    const next = layers[i + 1];
    if (!next) return;
    for (const a of layer) {
      for (const b of next) {
        const A = rect(a);
        const B = rect(b);
        let d;
        if (horizontal) {
          const x1 = A.r, y1 = A.cy, x2 = B.l - 2, y2 = B.cy, dx = (x2 - x1) / 2;
          d = `M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
        } else {
          const x1 = A.cx, y1 = A.b, x2 = B.cx, y2 = B.t - 2, dy = (y2 - y1) / 2;
          d = `M${x1} ${y1}C${x1} ${y1 + dy} ${x2} ${y2 - dy} ${x2} ${y2}`;
        }
        paths += `<path class="arch-edge" data-layer="${i}" d="${d}" marker-end="url(#${id}-a)"/>`;
      }
    }
  });
  svg.innerHTML = paths + '<g class="arch-packets"></g>';
  if (arch.dataset.done) $$('.arch-edge', svg).forEach((e) => e.classList.add('is-done'));
}

function travel(path, ms) {
  const len = path.getTotalLength();
  const dot = document.createElementNS(NS, 'circle');
  dot.setAttribute('r', '4');
  dot.setAttribute('class', 'arch-packet');
  path.ownerSVGElement.querySelector('.arch-packets').append(dot);
  const t0 = performance.now();
  return new Promise((resolve) => {
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms);
      const p = path.getPointAtLength(ease(t) * len);
      dot.setAttribute('cx', p.x);
      dot.setAttribute('cy', p.y);
      if (t < 1 && document.visibilityState === 'visible') return requestAnimationFrame(step);
      dot.remove();
      path.classList.add('is-done');
      resolve();
    };
    requestAnimationFrame(step);
  });
}

// one packet wave walks the diagram, layer by layer
async function run(arch) {
  if (arch.dataset.running || arch.dataset.done) return;
  arch.dataset.running = 'true';
  const layers = $$('.arch-layer', arch).map((l) => $$('.arch-node', l));
  const instant = reducedMotion();
  for (const [i, layer] of layers.entries()) {
    layer.forEach((n) => (n.dataset.state = 'active'));
    const edges = $$(`.arch-edge[data-layer="${i}"]`, arch);
    if (instant || !edges.length) {
      edges.forEach((e) => e.classList.add('is-done'));
      if (!instant) await new Promise((r) => setTimeout(r, 220));
    } else {
      await Promise.all(edges.map((e) => travel(e, 480)));
    }
    layer.forEach((n) => (n.dataset.state = 'done'));
  }
  arch.dataset.done = 'true';
  delete arch.dataset.running;
}

export function initArch() {
  const archs = $$('.arch');
  if (!archs.length) return;
  const ro = new ResizeObserver((entries) => entries.forEach((e) => draw(e.target)));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        run(e.target);
      }
    },
    { threshold: 0.55 },
  );
  archs.forEach((a) => {
    draw(a);
    ro.observe(a);
    io.observe(a);
  });
  // fonts change box sizes; redraw once they land
  document.fonts?.ready.then(() => archs.forEach(draw));
}

// redraw diagrams that just became visible (a newly chosen project, a view switch)
export function initArchIn(el) {
  if (!el) return;
  requestAnimationFrame(() => $$('.arch', el).forEach(draw));
}
