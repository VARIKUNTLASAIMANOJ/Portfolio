// Skills as one endless circuit. Every skill sits on a single unbroken
// trace that zig-zags on 45° bends; the trace changes colour where one skill
// group hands over to the next, and current flows along it without a break.
// The set is copied end to end and the last skill wires straight into the
// next copy's first, so the loop never shows a seam. Hovering stops the
// glide so a skill can be read, and a drag scrubs it.
import { $, $$, reducedMotion } from '../lib/dom.js';

// geometry: node radius, node-to-node step, the two rows, the strip height.
// Phones get a tighter board; the 45° bends still fit either way.
const PHONE = matchMedia('(max-width: 559px)').matches;
const { R, STEP, Y_TOP, Y_BOT, HEIGHT } = PHONE
  ? { R: 24, STEP: 128, Y_TOP: 52, Y_BOT: 98, HEIGHT: 168 }
  : { R: 28, STEP: 168, Y_TOP: 60, Y_BOT: 120, HEIGHT: 200 };
const SPEED = PHONE ? 28 : 34; // px per second

// 45° routing between two points; r trims the ends back to a node's edge
function route(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const s = Math.sign(dx) || 1;
  const x1 = a.x + s * a.r;
  const x2 = b.x - s * b.r;
  const diag = Math.abs(dy);
  if (Math.abs(x2 - x1) <= diag + 4) return [[x1, a.y], [x2, b.y]];
  const mid = (x1 + x2) / 2;
  return [[x1, a.y], [mid - (s * diag) / 2, a.y], [mid + (s * diag) / 2, b.y], [x2, b.y]];
}
const d = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
const through = (pts) => {
  // one path through point centres
  const line = [];
  pts.slice(1).forEach((b, i) => {
    const seg = route({ ...pts[i], r: 0 }, { ...b, r: 0 });
    line.push(...(i ? seg.slice(1) : seg));
  });
  return d(line);
};

// lay one copy of the circuit out left to right; returns its width
function layout(set) {
  const svg = $('.strip-svg', set);
  const nodes = $$('.skill-node', set);
  // an odd count gets a via at the end, so the zig-zag keeps its rhythm
  // across the seam (top, bottom, top, bottom… forever)
  const stops = nodes.map((n) => ({ n, g: n.dataset.group, lane: n.dataset.lane, r: R }));
  if (stops.length % 2) stops.push({ via: true, g: stops.at(-1).g, lane: stops.at(-1).lane, r: 0 });
  stops.forEach((p, k) => {
    p.x = STEP / 2 + k * STEP;
    p.y = k % 2 ? Y_BOT : Y_TOP;
  });
  const width = stops.length * STEP;
  const last = stops.at(-1);
  // the previous copy's last stop, wired into this copy's first
  const prev = { ...last, x: last.x - width };

  // copper: edge to edge, so lines meet the rings
  const chain = [prev, ...stops];
  const coppers = chain
    .slice(1)
    .map((b, i) => {
      const a = chain[i];
      return `<path class="copper" pathLength="1" data-lane="${a.lane}" data-group="${a.g}" d="${d(route(a, b))}"/>`;
    })
    .join('');

  // current: one run per group, from its first skill to the next group's
  // first; the run into the first skill comes in from the previous copy
  let currents = `<path class="current" data-lane="${prev.lane}" data-group="${prev.g}" d="${through([prev, stops[0]])}"/>`;
  let start = 0;
  for (let k = 1; k <= stops.length; k++) {
    if (k < stops.length && stops[k].g === stops[start].g) continue;
    const run = stops.slice(start, Math.min(k + 1, stops.length));
    if (run.length > 1) currents += `<path class="current" data-lane="${stops[start].lane}" data-group="${stops[start].g}" d="${through(run)}"/>`;
    start = k;
  }

  const vias = stops
    .filter((p) => p.via)
    .map((p) => `<circle class="via" data-lane="${p.lane}" data-group="${p.g}" cx="${p.x}" cy="${p.y}" r="5"/>`)
    .join('');

  for (const p of stops) {
    if (!p.n) continue;
    p.n.style.left = `${p.x - STEP / 2}px`;
    p.n.style.top = `${p.y - R}px`;
    p.n.style.width = `${STEP}px`;
    p.n.style.setProperty('--r', `${R}px`);
  }
  set.style.width = `${width}px`;
  set.style.height = `${HEIGHT}px`;
  svg.setAttribute('viewBox', `0 0 ${width} ${HEIGHT}`);
  svg.innerHTML = `<g>${coppers}</g><g>${currents}</g><g>${vias}</g>`;
  return width;
}

export function initSkills() {
  const strip = $('.strip');
  if (!strip) return;
  const view = $('.strip-view', strip);
  const track = $('.strip-track', strip);
  const set = $('.strip-set', track);
  const still = reducedMotion();
  const setW = layout(set);
  strip.dataset.mode = still ? 'still' : 'loop';
  // standing still, the strip scrolls sideways, so keyboards need to reach it
  if (still) {
    view.tabIndex = 0;
    view.setAttribute('aria-label', 'Skills, scroll sideways');
  }

  // enough copies to fill the widest screen, plus one to scroll into
  if (!still) {
    const copies = Math.max(2, Math.ceil(screen.width / setW) + 1);
    for (let k = 1; k < copies; k++) {
      // copies are for the eye; screen readers read the first set
      const clone = set.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    }
  }

  // ---- the loop ----

  let offset = 0;
  let last = 0;
  let raf = 0;
  const holds = new Set(); // reasons the strip is standing still
  const hold = (why, on) => (on ? holds.add(why) : holds.delete(why));
  const apply = () => (track.style.transform = `translate3d(${-offset}px,0,0)`);
  const tick = (now) => {
    const dt = last ? Math.min(64, now - last) : 0;
    last = now;
    if (!holds.size) {
      offset = (offset + (SPEED * dt) / 1000) % setW;
      apply();
    }
    raf = requestAnimationFrame(tick);
  };

  if (!still) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }).observe(strip);
    strip.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && hold('hover', true));
    strip.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && hold('hover', false));

    // drag to scrub, with any pointer
    let drag = null;
    view.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, from: offset };
      hold('drag', true);
    });
    addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      offset = (((drag.from - dx) % setW) + setW) % setW;
      apply();
    });
    addEventListener('pointerup', () => {
      if (!drag) return;
      drag = null;
      hold('drag', false);
    });
  }

  // draw the copper in the first time the strip is seen
  const reveal = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      reveal.disconnect();
      if (still) return;
      strip.dataset.state = 'drawing';
      setTimeout(() => (strip.dataset.state = 'ready'), 1100);
    },
    { threshold: 0.3 },
  );
  reveal.observe(strip);
}
