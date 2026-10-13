import './styles/tokens.css';
import './styles/base.css';
import './styles/chrome.css';
import './styles/hero.css';
import './styles/sections.css';

import content from './content.js';
import { renderPage, prepare } from './render.js';
import { $$ } from './lib/dom.js';
import { createAnswerer } from './graph/answer.js';
import { initAgent } from './graph/agent.js';
import { initTheme, initHeader, initRail } from './features/chrome.js';
import { initSubgraphs, initTimeline, initRolePath } from './features/sections.js';
import { initSkills } from './features/skills.js';
import { initWork } from './features/work.js';
import { initArch } from './features/arch.js';
import { initCerts } from './features/certs.js';
import { initLog } from './features/log.js';
import { initContact } from './features/contact.js';

prepare(content);
document.title = content.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);

// production builds arrive with the page already rendered into the HTML (see
// vite.config.js), so it paints before any script runs; dev renders it here
const app = document.getElementById('app');
if (!app.firstElementChild) app.innerHTML = renderPage(content);

const visible = new Set($$('main > section').map((s) => s.id));
// the skills strip lives inside the hero, so it isn't a section of its own
if (document.getElementById('skills')) visible.add('skills');

// what's on screen first starts now; everything further down waits until the
// browser is idle, so the first paint isn't held up
initTheme();
initHeader();
initRail();
initAgent(createAnswerer(content, visible), content);
initSkills();
const later = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 150));
later(() => {
  initArch();
  initWork();
  initSubgraphs();
  initTimeline();
  initRolePath();
  initCerts();
  initLog();
  initContact(content);
});
