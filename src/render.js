import { SECTIONS, glyph, mascot, mascotDefs } from './lib/agents.js';
import { esc, present, isSlot, linkButton, hrefFor, projectId } from './lib/dom.js';
import { icon } from './lib/icons.js';

// Pastel lanes give each project and skill group its own color identity.
export const LANES = ['violet', 'lime', 'peach', 'sky'];
const lane = (i) => LANES[i % LANES.length];

const sectionMeta = (id) => SECTIONS.find((s) => s.id === id);
const skillAttr = (skills = []) => esc(skills.join('|'));
const initials = (s) =>
  String(s ?? '')
    .replace(/[[\]]/g, '')
    .split(/[\s·\-_/]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '··';

// An icon is a Simple Icons slug ('tensorflow') or a path/URL to an image.
export const iconSrc = (v) => (!present(v) || isSlot(v) ? null : /^(\/|https?:)/.test(v) ? v : `https://cdn.simpleicons.org/${encodeURIComponent(v)}`);

// ---------- shared pieces ----------

export function subgraph(steps, label) {
  const edge = `<span class="sg-edge" aria-hidden="true"><svg viewBox="0 0 40 12"><path d="M1 6h36"/><path class="sg-arrow" d="M33 2.5 37 6l-4 3.5"/><circle class="sg-packet" cx="0" cy="6" r="3.2"/></svg></span>`;
  return `<div class="subgraph" role="img" aria-label="${esc(label)}: ${esc(steps.join(', then '))}">
    ${steps.map((s, i) => `${i ? edge : ''}<span class="sg-node">${esc(s)}</span>`).join('')}
  </div>`;
}

function sectionHead(id, lead, title) {
  const s = sectionMeta(id);
  return `<header class="section-head">
    <h2 id="${id}-h">${glyph(s.agent)}<span>${esc(title ?? s.title ?? s.label)}</span></h2>
    ${lead ? `<p class="section-lead">${esc(lead)}</p>` : ''}
  </header>`;
}

// ---------- header, rail, footer ----------

function header(c, sections) {
  const nav = sections
    .filter((s) => s.nav !== false)
    .map((s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`)
    .join('');
  return `<header class="site-header">
    <nav class="nav-pill" aria-label="Main">
      <a class="brand" href="#top">
        <span class="brand-mark" aria-hidden="true">${esc(c.person.initials)}</span><span class="brand-name">${esc(c.person.name)}</span><span class="visually-hidden">, back to top</span>
      </a>
      <ul class="nav-links" id="nav-links">${nav}</ul>
      <div class="nav-actions">
        <button class="icon-btn theme-toggle" type="button" aria-label="Switch theme">${icon('sun', 'i-sun')}${icon('moon', 'i-moon')}</button>
        ${sections.some((s) => s.id === 'contact') ? `<a class="btn btn-primary btn-small" href="#contact">Let’s talk</a>` : ''}
        <button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Sections menu">${icon('menu', 'i-menu')}${icon('close', 'i-close')}</button>
      </div>
    </nav>
  </header>`;
}

function rail(sections) {
  const steps = sections
    .map(
      (s, k) => `<li class="trace-step" data-agent="${s.agent}" data-for="${s.id}" data-state="upcoming" style="--i:${k}">
        <a href="#${s.id}">
          <span class="trace-dot" aria-hidden="true"></span>
          <span class="trace-tip">
            <span class="trace-label">${esc(s.label)}</span>
          </span>
        </a>
      </li>`,
    )
    .join('');
  const bar = sections
    .map((s) => `<span class="progress-seg" data-agent="${s.agent}" data-for="${s.id}" data-state="upcoming"></span>`)
    .join('');
  return `<nav class="trace" aria-label="Page trace"><ol>${steps}</ol><span class="trace-packet" aria-hidden="true"></span></nav>
    <div class="progress" aria-hidden="true">${bar}</div>`;
}

function footer(c) {
  return `<footer class="site-footer container">
    <p>© ${new Date().getFullYear()} ${esc(c.person.name)}. All rights reserved.</p>
    <div class="footer-links">
      ${linkButton(c.links.source, 'View source', { cls: 'text-link', iconName: 'code', external: true })}
      <a class="text-link" href="#top">Back to top</a>
    </div>
  </footer>`;
}

// ---------- hero ----------

function portrait(p) {
  if (!present(p.photo)) return '';
  const tags = (p.photoTags ?? []).filter(present);
  return `<figure class="portrait${isSlot(p.photo) ? ' is-empty' : ''}">
    <span class="portrait-frame">
      ${isSlot(p.photo) ? `<span class="portrait-slot">${esc(p.photo)}</span>` : `<img src="${esc(p.photo)}" alt="${esc(p.name)}" width="480" height="600" decoding="async" fetchpriority="high">`}
    </span>
    ${tags.map((t, i) => `<span class="portrait-tag" data-pos="${i}">${i === 0 ? icon('pin') : glyph('router')}${esc(t)}</span>`).join('')}
  </figure>`;
}

function hero(c) {
  const p = c.person;
  return `<section id="top" class="hero" data-agent="router" aria-labelledby="top-h">
    <div class="hero-inner container${present(p.photo) ? '' : ' no-photo'}">
      <div class="hero-copy">
        <h1 id="top-h"><span class="h1-name">I’m ${esc(p.name)},</span> <span class="h1-role">${esc(p.role)}.</span></h1>
        ${present(p.intro) ? `<p class="hero-intro">${esc(p.intro)}</p>` : ''}
        ${present(p.status) ? `<p class="status-pill"><span class="live-dot" aria-hidden="true"></span>${esc(p.status)}</p>` : ''}
      </div>
      ${portrait(p)}
    </div>
    ${skillStrip(c)}
  </section>`;
}

// ---------- about ----------

function about(c) {
  const p = c.person;
  if (!present(p.about)) return '';
  const facts = (p.facts ?? []).filter((f) => present(f.value));
  return `<section id="about" class="section about" data-agent="writer" aria-labelledby="about-h">
    <div class="container about-grid">
      <h2 id="about-h" class="about-title">${esc(p.aboutTitle ?? 'About')}</h2>
      <div class="about-copy">
        <div class="about-text">${p.about.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
        ${facts.length ? `<dl class="facts">${facts.map((f) => `<div><dt class="mono">${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>` : ''}
      </div>
    </div>
  </section>`;
}

// ---------- skills: an endless circuit strip under the hero ----------

function skillStrip(c) {
  const groups = (c.skills ?? []).filter((g) => present(g.items));
  if (!groups.length) return '';
  const nodes = groups
    .flatMap((g, gi) =>
      g.items.map((s) => {
        const src = iconSrc(s.icon);
        return `<li class="skill-node" data-lane="${lane(gi)}" data-group="${gi}">
          <span class="skill-face" aria-hidden="true">${src ? `<img src="${esc(src)}" alt="" loading="lazy" decoding="async">` : `<span class="skill-mono">${esc(initials(s.name))}</span>`}</span>
          <span class="skill-label">${esc(s.name)}</span>
        </li>`;
      }),
    )
    .join('');
  return `<div class="container skills-strip" id="skills" data-agent="router" aria-labelledby="skills-h">
    <h2 id="skills-h" class="visually-hidden">Skills</h2>
    <div class="strip">
      <div class="strip-view">
        <div class="strip-track">
          <div class="strip-set">
            <svg class="strip-svg" aria-hidden="true" focusable="false"></svg>
            <ul class="strip-nodes" aria-label="Skills">${nodes}</ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ---------- projects: thumbnails, details, and a wired preview ----------

function architecture(layers, name) {
  const norm = (layers ?? []).map((l) => (Array.isArray(l) ? l : [l])).filter((l) => l.length);
  if (!norm.length) return '';
  const nodeHtml = (s) => {
    const [label, sub] = String(s).split(/\s+·\s+/);
    return `<span class="arch-node"><span>${esc(label)}</span>${sub ? `<small>${esc(sub)}</small>` : ''}</span>`;
  };
  const flat = norm.map((l) => l.map((s) => String(s).split(/\s+·\s+/)[0]).join(' and ')).join(', then ');
  return `<div class="arch" role="img" aria-label="${esc(name)} architecture: ${esc(flat)}">
    <svg class="arch-edges" aria-hidden="true" focusable="false"></svg>
    ${norm.map((l) => `<div class="arch-layer">${l.map(nodeHtml).join('')}</div>`).join('')}
  </div>`;
}

function projects(c) {
  const list = c.projects ?? [];
  if (!list.length) return '';
  const first = Math.max(0, list.findIndex((p) => p.featured));
  const media = (p) => (p.media && !isSlot(p.media) && p.media.src ? p.media : null);

  const tabs = list
    .map((p, i) => {
      const id = projectId(p, i);
      const m = media(p);
      return `<button class="work-tab" type="button" role="tab" id="${id}-tab" aria-controls="${id}" aria-selected="${i === first}" tabindex="${i === first ? 0 : -1}" data-lane="${lane(i)}">
        <span class="work-thumb">${m ? `<img src="${esc(m.src)}" alt="" loading="lazy" decoding="async">` : `<span class="thumb-art"><span>${esc(initials(p.name))}</span></span>`}</span>
        <span class="work-tab-name">${esc(p.name)}</span>
      </button>`;
    })
    .join('');

  const panels = list
    .map((p, i) => {
      const id = projectId(p, i);
      const links = [
        linkButton(p.code, 'Code', { cls: 'pill-link', iconName: 'github', external: true }),
        linkButton(p.demo, 'Live demo', { cls: 'pill-link', iconName: 'arrow', external: true }),
      ].join('');
      return `<div class="work-panel" role="tabpanel" id="${id}" aria-labelledby="${id}-tab" tabindex="0" data-lane="${lane(i)}" data-skills="${skillAttr(p.skills)}" data-title="${esc(p.name)}"${i === first ? '' : ' hidden'}>
        ${present(p.signature) ? `<p class="signature mono">${esc(p.signature)}</p>` : ''}
        <div class="work-title">
          <h3>${esc(p.name)}</h3>
          <p class="status mono" data-status="${esc(p.status)}"><span class="status-dot" aria-hidden="true"></span>${esc(p.status)}</p>
        </div>
        <p class="work-summary">${esc(p.summary)}</p>
        ${present(p.tags) ? `<ul class="tags" aria-label="Tags">${p.tags.slice(0, 6).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        ${links.trim() ? `<div class="work-links">${links}</div>` : ''}
      </div>`;
    })
    .join('');

  const previews = list
    .map((p, i) => {
      const id = projectId(p, i);
      const m = media(p);
      const arch = architecture(p.architecture, p.name);
      const views = [m ? 'shot' : null, arch ? 'arch' : null].filter(Boolean);
      return `<figure class="work-preview" data-for="${id}" data-lane="${lane(i)}" data-view="${views[0] ?? 'none'}"${i === first ? '' : ' hidden'}>
        ${
          views.length > 1
            ? `<div class="preview-switch" role="group" aria-label="${esc(p.name)} view"><button type="button" data-view="shot" aria-pressed="true">Preview</button><button type="button" data-view="arch" aria-pressed="false">Architecture</button></div>`
            : `<figcaption class="preview-cap mono">${m ? 'preview' : 'architecture'}</figcaption>`
        }
        ${m ? `<img class="preview-shot" src="${esc(m.src)}" alt="${esc(m.alt ?? `${p.name} screenshot`)}" loading="lazy" decoding="async">` : ''}
        ${arch ? `<div class="preview-arch">${arch}</div>` : ''}
        ${views.length ? '' : `<span class="preview-empty">${esc(p.name)}</span>`}
      </figure>`;
    })
    .join('');

  return `<section id="projects" class="section work" data-agent="retriever" aria-labelledby="projects-h">
    <div class="container">
      ${sectionHead('projects', 'Pick a project to see what it does and how it’s wired.')}
      <div class="work-browser">
        <div class="work-left">
          <div class="work-tabs" role="tablist" aria-label="Projects">${tabs}</div>
          <div class="work-panels">${panels}</div>
        </div>
        <div class="work-previews">${previews}</div>
        <svg class="work-wire" aria-hidden="true" focusable="false"><path class="wire-base" pathLength="1"/><path class="wire-flow"/><circle class="wire-end" r="4"/></svg>
      </div>
    </div>
  </section>`;
}

// ---------- activity ----------

function log(c) {
  const user = c.log?.githubUser;
  if (!present(user)) return '';
  // an unfilled username previews sample data in dev and stays hidden in production
  if (isSlot(user) && !import.meta.env.DEV) return '';
  const profile = isSlot(user) ? null : `https://github.com/${encodeURIComponent(user)}`;
  return `<section id="log" class="section" data-agent="validator" aria-labelledby="log-h">
    <div class="container">
      ${sectionHead('log', 'A year of commits, pull requests and reviews. One square per day.')}
      <div class="log-card" data-user="${esc(user)}">
        <div class="log-top">
          <span class="log-mark">${icon('github')}</span>
          <p class="log-count"><strong class="log-total">…</strong><span class="mono log-sub">loading contributions</span></p>
          <div class="log-years" role="group" aria-label="Year"></div>
        </div>
        <div class="log-scroll"><div class="log-grid" role="img" aria-label="GitHub contributions"></div></div>
        <div class="log-foot">
          <dl class="log-stats">
            <div><dt class="mono">Current streak</dt><dd class="log-current">–</dd></div>
            <div><dt class="mono">Longest streak</dt><dd class="log-longest">–</dd></div>
            <div><dt class="mono">Busiest day</dt><dd class="log-busiest">–</dd></div>
          </dl>
          <p class="log-legend mono" aria-hidden="true">Less<span data-l="0"></span><span data-l="1"></span><span data-l="2"></span><span data-l="3"></span><span data-l="4"></span>More</p>
        </div>
        ${profile ? '' : '<p class="log-note">Sample data. Set <code>log.githubUser</code> in <code>src/content.js</code> to show your real activity.</p>'}
      </div>
    </div>
  </section>`;
}

// ---------- experience ----------

function experience(c) {
  const list = c.experience ?? [];
  if (!list.length) return '';
  const products = (c.products ?? []).filter((p) => present(p.name));
  const roles = list
    .map(
      (job, j) => `<li class="role" aria-labelledby="role-${j}-h">
        <span class="role-dot" aria-hidden="true"></span>
        <header class="role-head">
          <h3 id="role-${j}-h">${esc(job.role)}</h3>
          <p class="role-org">${esc(job.org)}</p>
          <p class="role-meta mono">${[job.dates, [job.location, job.mode].filter(present).join(' · ')]
            .filter(present)
            .map((m) => `<span>${esc(m)}</span>`)
            .join('')}</p>
        </header>
        ${present(job.summary) ? `<div class="role-summary">${[job.summary].flat().join('\n').split(/\n+/).filter((t) => t.trim()).map((t) => `<p>${esc(t.trim())}</p>`).join('')}</div>` : ''}
        <div class="role-items">
          ${(job.items ?? [])
            .map(
              (it) => `<div class="role-item" data-skills="${skillAttr(it.skills)}" data-title="${esc(job.role)} · ${esc(job.org)}">
                <h4>${esc(it.title)}</h4>
                ${(it.bullets ?? []).map((b) => `<p>${esc(b)}</p>`).join('')}
                ${present(it.steps) ? `<div class="subgraph-panel">${subgraph(it.steps, `How ${it.title} worked`)}</div>` : ''}
                ${present(it.metrics) ? `<ul class="metrics" aria-label="Results">${it.metrics.slice(0, 3).map((m) => `<li><strong>${esc(m.value)}</strong> ${esc(m.label)}</li>`).join('')}</ul>` : ''}
              </div>`,
            )
            .join('')}
        </div>
        ${job.link ? linkButton(job.link.href, job.link.label ?? 'View', { cls: 'text-link', iconName: 'arrow', external: true }) : ''}
      </li>`,
    )
    .join('');
  return `<section id="experience" class="section" data-agent="retriever" aria-labelledby="experience-h">
    <div class="container exp-grid">
      <aside class="exp-side">
        ${sectionHead('experience')}
        ${
          products.length
            ? `<p class="exp-sub">Products I worked on</p>
              <ul class="products">${products
                .map(
                  (p, i) => `<li class="product" data-lane="${lane(i)}">
                    <h3>${esc(p.name)}</h3>
                    <p class="product-kind">${esc(p.kind)}</p>
                    <p>${esc(p.detail)}</p>
                    ${linkButton(p.link, 'Visit', { cls: 'text-link', iconName: 'arrow', external: true })}
                  </li>`,
                )
                .join('')}</ul>`
            : ''
        }
      </aside>
      <ol class="roles">${roles}</ol>
    </div>
  </section>`;
}

// ---------- checkpoints ----------

// ---------- checkpoints: a horizontal timeline ----------

// each type keeps one icon and one lane everywhere
const CP = {
  education: { label: 'Education', icon: 'cap', lane: 'sky', link: 'View' },
  award: { label: 'Award', icon: 'trophy', lane: 'peach', link: 'View' },
  publication: { label: 'Publication', icon: 'doc', lane: 'violet', link: 'Read paper' },
  certification: { label: 'Certification', icon: 'badge', lane: 'lime', link: 'View credential' },
};

function checkpoints(c) {
  const list = (c.checkpoints ?? []).filter((cp) => present(cp.title));
  if (!list.length) return '';
  const yearOf = (d) => +(String(d ?? '').match(/\d{4}/) ?? [0])[0];
  // oldest on the left, so the line reads forward in time. content.js lists
  // newest first, so within one year the later entry is the earlier event.
  const items = list
    .map((cp, i) => ({ cp, i, y: yearOf(cp.date) }))
    .sort((a, b) => a.y - b.y || b.i - a.i)
    .map(({ cp }, k) => {
      const t = CP[cp.type] ?? CP.award;
      return `<li class="tl-item" data-lane="${t.lane}" data-side="${k % 2 ? 'below' : 'above'}" style="--k:${k};grid-column:${k + 1}">
        <div class="tl-card">
          <p class="tl-type"><span class="tl-icon" aria-hidden="true">${icon(t.icon)}</span>${t.label}${present(cp.date) ? `<span class="tl-when">${esc(cp.date)}</span>` : ''}</p>
          <h3>${esc(cp.title)}</h3>
          ${present(cp.detail) ? `<p class="tl-detail">${esc(cp.detail)}</p>` : ''}
          ${linkButton(cp.link, t.link, { cls: 'pill-link', iconName: 'arrow', external: true })}
        </div>
        <span class="tl-node" aria-hidden="true">${present(cp.date) ? `<span class="tl-year">${esc(cp.date)}</span>` : ''}</span>
      </li>`;
    })
    .join('');
  return `<section id="checkpoints" class="section" data-agent="validator" aria-labelledby="checkpoints-h">
    <div class="container">
      ${sectionHead('checkpoints', 'Education, awards and papers, from the first to the latest.')}
      <div class="tl-scroll">
        <ol class="tl" style="--n:${list.length}" data-state="idle">${items}</ol>
      </div>
    </div>
  </section>`;
}

// ---------- certificates: a carousel wired card to card ----------

function certs(c) {
  const list = (c.certifications ?? []).filter((x) => present(x.name));
  if (!list.length) return '';
  const slides = list
    .map((x, i) => {
      const face = present(x.image) && !isSlot(x.image)
        ? `<img src="${esc(x.image)}" alt="${esc(x.name)} certificate" loading="lazy" decoding="async">`
        : `<span class="cert-paper" data-lane="${lane(i)}">
            <span class="cert-ribbon">${
              iconSrc(x.logo)
                ? `<span class="cert-seal has-logo"><img src="${esc(iconSrc(x.logo))}" alt="" decoding="async"></span>`
                : `<span class="cert-seal">${esc(initials(x.issuer))}</span>`
            }</span>
            <span class="cert-body">
              <span class="cert-from">${esc(x.issuer)}</span>
              <span class="cert-title">${esc(x.name)}</span>
              <span class="cert-when">${esc(x.date ?? '')}</span>
              <span class="cert-lines" aria-hidden="true"><i></i><i></i><i></i></span>
            </span>
          </span>`;
      return `<li class="cert-slide" data-i="${i}" data-pos="${i === 0 ? 'center' : i === 1 ? 'next' : i === list.length - 1 ? 'prev' : 'hidden'}">
        <button class="cert-card" type="button"><span class="visually-hidden">Certificate ${i + 1} of ${list.length}: </span>${face}</button>
      </li>`;
    })
    .join('');
  const captions = list
    .map(
      (x, i) => `<div class="cert-cap" data-i="${i}"${i ? ' hidden' : ''}>
        <h3>${esc(x.name)}</h3>
        <p>${esc(x.issuer)}${present(x.date) ? ` · ${esc(x.date)}` : ''}</p>
        ${linkButton(x.link, 'View credential', { cls: 'pill-link', iconName: 'arrow', external: true })}
      </div>`,
    )
    .join('');
  return `<section id="certs" class="section certs" data-agent="validator" aria-labelledby="certs-h">
    <div class="container">
      ${sectionHead('certs', 'Credentials from courses and programs. Bring one forward to read it.')}
      <div class="cert-stage" aria-roledescription="carousel" aria-label="Certificates">
        <svg class="cert-wires" aria-hidden="true" focusable="false"></svg>
        <ul class="cert-track">${slides}</ul>
      </div>
      <div class="cert-foot">
        <div class="cert-caps" aria-live="polite">${captions}</div>
        ${
          list.length > 1
            ? `<div class="cert-controls">
                <button class="icon-btn cert-prev" type="button" aria-label="Previous certificate">${icon('chevron', 'i-left')}</button>
                <span class="cert-dots" aria-hidden="true">${list.map((_, i) => `<i data-i="${i}"${i ? '' : ' data-on'}></i>`).join('')}</span>
                <button class="icon-btn cert-next" type="button" aria-label="Next certificate">${icon('chevron', 'i-right')}</button>
              </div>`
            : ''
        }
      </div>
    </div>
  </section>`;
}

// ---------- contact ----------

function contact(c) {
  const first = esc(String(c.person.name).replace(/[[\]]/g, '').split(/\s+/)[0] || 'me');
  const bare = (v) => String(v).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const rows = [
    ['email', 'Email', c.links.email, (v) => v],
    ['linkedin', 'LinkedIn', c.links.linkedin, bare],
    ['github', 'GitHub', c.links.github, bare],
    ['phone', 'Phone', c.links.phone, (v) => v],
    ['resume', 'Résumé', c.links.resume, () => 'View'],
  ]
    .filter(([, , v]) => present(v))
    .map(([k, label, v, show]) => {
      const value = isSlot(v)
        ? `<span class="contact-value is-slot">${esc(v)}</span>`
        : `<a class="contact-value" href="${esc(hrefFor(k, v))}"${['email', 'phone'].includes(k) ? '' : ' target="_blank" rel="noopener"'}>${esc(show(v)).replace(/\//g, '/<wbr>').replace(/@/g, '<wbr>@')}</a>`;
      return `<li><span class="contact-label mono">${label}</span>${value}</li>`;
    })
    .join('');
  const field = (id, label, control) => `<div class="field">
            <label class="mono" for="cf-${id}">${label}</label>
            ${control}
            <p class="field-error" id="cf-${id}-err" hidden></p>
          </div>`;
  return `<section id="contact" class="section contact" data-agent="human" aria-labelledby="contact-h">
    <div class="container">
      <h2 id="contact-h">Let’s talk.</h2>
      ${present(c.contact?.lead) ? `<p class="contact-lead">${esc(c.contact.lead)}</p>` : ''}
      <div class="contact-grid">
        <form class="contact-form" novalidate aria-label="Send ${first} a message">
          ${field('name', 'Name', '<input id="cf-name" name="name" type="text" autocomplete="name" required maxlength="120">')}
          ${field('email', 'Email', '<input id="cf-email" name="email" type="email" autocomplete="email" required maxlength="200">')}
          ${field('message', 'Message', '<textarea id="cf-message" name="message" rows="4" required maxlength="4000"></textarea>')}
          <div class="form-foot">
            <button class="btn btn-primary btn-large send" type="submit"><span>Send message</span>${icon('forward')}</button>
            <p class="form-status" role="status"></p>
          </div>
        </form>
        ${rows ? `<ul class="contact-list" aria-label="Other ways to reach me">${rows}</ul>` : ''}
      </div>
    </div>
  </section>`;
}

// ---------- the floating agent ----------

function agentDock(c) {
  const first = esc(String(c.person.name).replace(/[[\]]/g, '').split(/\s+/)[0] || 'my');
  const named = present(c.ask?.name) && !isSlot(c.ask.name);
  const bot = named ? esc(c.ask.name) : `${first}’s assistant`;
  return `<div class="agent-dock" data-open="false">
    <section class="agent-panel" id="agent-panel" role="dialog" aria-modal="false" aria-labelledby="agent-title" hidden>
      <header class="agent-head">
        <span class="agent-avatar">${mascot()}</span>
        <p><strong id="agent-title">${bot}</strong><span class="agent-status"><span class="live-dot" aria-hidden="true"></span>Ask me anything about ${first}’s work</span></p>
        <button class="icon-btn agent-close" type="button" aria-label="Close chat">${icon('close')}</button>
      </header>
      <ol class="agent-log" aria-live="polite">
        <li class="msg from-agent"><p>Hi! I’m ${named ? `${bot}, ${first}’s assistant` : bot}. Ask me about ${first}’s projects, experience, skills, education, or how to get in touch, and I’ll point you to the right part of the page.</p></li>
      </ol>
      <ul class="chips agent-chips" aria-label="Suggested questions">${c.ask.suggestions.map((q) => `<li><button class="chip" type="button">${esc(q)}</button></li>`).join('')}</ul>
      <form class="agent-form" autocomplete="off">
        <label class="visually-hidden" for="agent-input">Ask ${bot}</label>
        <input id="agent-input" type="text" placeholder="Ask about ${first}’s work…" maxlength="500" enterkeyhint="send">
        <button class="btn btn-primary" type="submit" aria-label="Send">${icon('send')}</button>
      </form>
    </section>
    <p class="agent-hello" aria-hidden="true">Hello!</p>
    <button class="agent-launch" type="button" aria-expanded="false" aria-controls="agent-panel" aria-label="Chat with ${bot}">${mascot('mascot-launch')}</button>
  </div>`;
}

// ---------- page ----------

// skills live inside the hero now, so the section itself renders nothing
const RENDER = { top: hero, about, skills: () => '', projects, log, experience, checkpoints, certs, contact };

// Content as written may use shortcuts (skills as plain strings); settle them
// once, for both the browser and the build-time prerender.
export function prepare(c) {
  c.skills = (c.skills ?? []).map((g) => ({
    ...g,
    items: (g.items ?? []).map((s) => (typeof s === 'string' ? { name: s, level: null, icon: null } : s)),
  }));
  return c;
}

export function renderPage(c) {
  const html = {};
  for (const s of SECTIONS) html[s.id] = RENDER[s.id](c);
  const visible = SECTIONS.filter((s) => html[s.id]);
  return `<a class="skip-link" href="#main">Skip to content</a>
    ${mascotDefs()}
    ${header(c, visible)}
    ${rail(visible)}
    <main id="main">${visible.map((s) => html[s.id]).join('')}</main>
    ${footer(c)}
    ${agentDock(c)}`;
}
