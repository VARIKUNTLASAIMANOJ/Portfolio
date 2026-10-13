// The cast. Each agent owns one job, one color and one glyph, everywhere.
export const AGENTS = {
  router: { name: 'Router', glyph: 'diamond', job: 'Reads your question and picks a path.' },
  retriever: { name: 'Retriever', glyph: 'circle', job: 'Pulls matching work from this page.' },
  validator: { name: 'Validator', glyph: 'hexagon', job: 'Checks the answer is backed by a real section.' },
  writer: { name: 'Writer', glyph: 'square', job: 'Writes the reply and links you to the source.' },
  human: { name: 'Human', glyph: 'ring', job: 'Steps in when you want to talk. That part is me.' },
};

// Sections in page order, each owned by the agent whose job it echoes.
export const SECTIONS = [
  { id: 'top', label: 'Start', agent: 'router', nav: false },
  { id: 'about', label: 'About', agent: 'writer' },
  { id: 'skills', label: 'Skills', agent: 'router' },
  { id: 'projects', label: 'Projects', agent: 'retriever' },
  { id: 'log', label: 'Activity', agent: 'validator', title: 'Activity trace', nav: false },
  { id: 'experience', label: 'Experience', agent: 'retriever' },
  { id: 'checkpoints', label: 'Checkpoints', agent: 'validator', nav: false },
  { id: 'certs', label: 'Certificates', agent: 'validator' },
  { id: 'contact', label: 'Contact', agent: 'human', nav: false },
];

const SHAPES = {
  diamond: '<path d="M8 1.2 14.8 8 8 14.8 1.2 8Z"/>',
  circle: '<circle cx="8" cy="8" r="6.4"/>',
  hexagon: '<path d="M8 1.1 14 4.55v6.9L8 14.9 2 11.45v-6.9Z"/>',
  square: '<rect x="2" y="2" width="12" height="12" rx="1.6"/>',
  ring: '<circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" stroke-width="2.6"/>',
};

export function glyph(agent, cls = '') {
  const shape = SHAPES[AGENTS[agent].glyph];
  return `<svg class="glyph ${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${shape}</svg>`;
}

// The page's own agent: a friendly robot with a glossy head, a visor with
// glowing eyes, an antenna, and a waving arm. Gradients live once in
// mascotDefs() so every copy on the page can share them.
export function mascotDefs() {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <linearGradient id="mb-head" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="#8fb0ff"/><stop offset="0.55" stop-color="#6a7bff"/><stop offset="1" stop-color="#5a46e0"/></linearGradient>
    <linearGradient id="mb-body" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#7a8cff"/><stop offset="1" stop-color="#4b37c9"/></linearGradient>
    <radialGradient id="mb-ball" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stop-color="#e4ecff"/><stop offset="1" stop-color="#7c95ff"/></radialGradient>
    <radialGradient id="mb-visor" cx="0.5" cy="0.35" r="0.8"><stop offset="0" stop-color="#1e2456"/><stop offset="1" stop-color="#0b0d26"/></radialGradient>
  </defs></svg>`;
}

export function mascot(cls = '') {
  return `<svg class="mascot ${cls}" viewBox="0 0 120 132" aria-hidden="true" focusable="false">
    <ellipse class="m-shadow" cx="60" cy="125" rx="24" ry="4.5"/>
    <g class="m-bot">
      <path class="m-stalk" d="M60 30V17"/>
      <circle class="m-ball" cx="60" cy="13" r="6"/>
      <ellipse class="m-ear" cx="25" cy="52" rx="6" ry="9.5"/>
      <ellipse class="m-ear" cx="95" cy="52" rx="6" ry="9.5"/>
      <rect class="m-neck" x="51" y="74" width="18" height="8" rx="3"/>
      <path class="m-body" d="M41 86c0-5 3-8 8-8h22c5 0 8 3 8 8l-3 20c-1 6-6 10-16 10s-15-4-16-10Z"/>
      <ellipse class="m-arm m-arm-l" cx="37" cy="96" rx="6.5" ry="13" transform="rotate(28 37 96)"/>
      <g class="m-wave"><ellipse class="m-arm" cx="86" cy="84" rx="6.5" ry="13" transform="rotate(-38 86 84)"/></g>
      <rect class="m-head" x="25" y="27" width="70" height="51" rx="23"/>
      <ellipse class="m-shine" cx="43" cy="34.5" rx="10" ry="3.6" transform="rotate(-14 43 34.5)"/>
      <rect class="m-visor" x="33" y="38" width="54" height="30" rx="14"/>
      <g class="m-eyes"><ellipse cx="48.5" cy="51" rx="5" ry="6.2"/><ellipse cx="71.5" cy="51" rx="5" ry="6.2"/></g>
      <path class="m-smile" d="M54 59.5q6 4.5 12 0"/>
    </g>
  </svg>`;
}
