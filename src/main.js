import './styles/tokens.css';
import './styles/base.css';
import './styles/chrome.css';
import './styles/hero.css';
import './styles/sections.css';

import content from './content.js';
import { renderPage } from './render.js';
import { $$ } from './lib/dom.js';
import { createAnswerer } from './graph/answer.js';
import { initAgent } from './graph/agent.js';
import { initTheme, initHeader, initRail } from './features/chrome.js';
import { initSubgraphs, initTimeline } from './features/sections.js';
import { initSkills } from './features/skills.js';
import { initWork } from './features/work.js';
import { initArch } from './features/arch.js';
import { initCerts } from './features/certs.js';
import { initLog } from './features/log.js';
import { initContact } from './features/contact.js';

// skills may be written as plain strings or as { name, level, icon }
content.skills = (content.skills ?? []).map((g) => ({
  ...g,
  items: (g.items ?? []).map((s) => (typeof s === 'string' ? { name: s, level: null, icon: null } : s)),
}));

document.title = content.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);

document.getElementById('app').innerHTML = renderPage(content);

const visible = new Set($$('main > section').map((s) => s.id));
// the skills strip lives inside the hero, so it isn't a section of its own
if (document.getElementById('skills')) visible.add('skills');

initTheme();
initHeader();
initRail();
initAgent(createAnswerer(content, visible), content);
initSkills();
initArch();
initWork();
initSubgraphs();
initTimeline();
initCerts();
initLog();
initContact(content);
