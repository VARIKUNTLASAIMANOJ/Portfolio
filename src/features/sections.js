// Behavior for the content sections: role subgraphs, and checkpoints that
// tick as they're validated into view.
import { $, $$, reducedMotion } from '../lib/dom.js';

// ---------- subgraph: one packet walks the steps ----------

export async function runSubgraph(graph) {
  if (graph.dataset.running) return;
  graph.dataset.running = 'true';
  const nodes = $$('.sg-node', graph);
  const edges = $$('.sg-edge', graph);
  const instant = reducedMotion();
  for (const [i, n] of nodes.entries()) {
    n.dataset.state = 'active';
    if (!instant) await new Promise((r) => setTimeout(r, 160));
    n.dataset.state = 'done';
    const edge = edges[i];
    if (!edge) break;
    edge.dataset.state = 'active';
    if (!instant) {
      await $('.sg-packet', edge).animate([{ transform: 'translateX(0)' }, { transform: 'translateX(37px)' }], {
        duration: 420,
        easing: 'cubic-bezier(.65,0,.35,1)',
      }).finished;
    }
    edge.dataset.state = 'done';
  }
  delete graph.dataset.running;
}

const onceInView = (els, fn, threshold = 0.6) => {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        fn(e.target);
      }
    },
    { threshold },
  );
  els.forEach((el) => io.observe(el));
};

export function initSubgraphs() {
  onceInView($$('.subgraph'), runSubgraph);
}

// ---------- checkpoints tick one by one ----------

// Checkpoints: the timeline's line draws left to right the first time it's
// seen, and each milestone arrives as the line reaches it.
export function initTimeline() {
  const tl = $('.tl');
  if (!tl) return;
  if (reducedMotion()) return (tl.dataset.state = 'in');
  onceInView([tl], () => (tl.dataset.state = 'in'), 0.25);
}

// Experience: a glowing blob travels down the timeline with the reader, the
// line fills behind it, and each role's dot lights up as the blob reaches it.
export function initRolePath() {
  const roles = $('.roles');
  if (!roles) return;
  const blob = document.createElement('span');
  blob.className = 'roles-blob';
  blob.setAttribute('aria-hidden', 'true');
  roles.append(blob);
  const dots = $$('.role-dot', roles);
  const TOP = 18; // where the line starts, inside the list
  let ticking = false;
  const update = () => {
    ticking = false;
    const box = roles.getBoundingClientRect();
    const y = Math.min(Math.max(innerHeight * 0.45 - box.top, TOP), box.height - 10);
    roles.style.setProperty('--blob', `${y.toFixed(1)}px`);
    dots.forEach((d) => d.classList.toggle('is-reached', d.closest('.role').offsetTop + d.offsetTop + d.offsetHeight / 2 <= y + 1));
  };
  const queue = () => ticking || ((ticking = true), requestAnimationFrame(update));
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();
}
