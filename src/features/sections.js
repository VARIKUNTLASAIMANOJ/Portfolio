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
