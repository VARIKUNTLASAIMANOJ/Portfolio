// Answers questions from this page's own content. No network, no model:
// the Router picks an intent, the Retriever scores content items, the
// Validator's checks are real, and the Writer assembles text from the data.
import { SECTIONS } from '../lib/agents.js';
import { isSlot, present, projectId } from '../lib/dom.js';

const STOP = new Set(
  'a an the and or of to in on for with at by from is are was were be been am i you your my me we our it its this that what which whom how why when where do does did can could would should will have has had tell show give any some there their them they as into than then so if not no yes please more most much many one'.split(
    ' ',
  ),
);

const stem = (w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
const words = (s) =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(stem);
const keywords = (s) => words(s).filter((w) => !STOP.has(w));
// placeholder slots never count as evidence
const real = (v) => (present(v) && !isSlot(v) ? v : '');

const INTENTS = {
  experience: 'intern internship experience work worked job role company companies employer team',
  projects: 'project built build side proud proudest app demo made look first best architecture',
  log: 'github commit commits contribution contributions activity shipping ship streak code',
  skills: 'tool skill stack language framework tech technology technologies use using know',
  checkpoints: 'award achievement publication paper research education degree university college school study studied graduate',
  certs: 'certificate certification certified credential course coursera udemy badge',
  contact: 'contact reach email hire hiring available availability phone linkedin talk call message',
  about: 'who about yourself background bio introduce based location',
};
const INTENT_WORDS = Object.fromEntries(Object.entries(INTENTS).map(([k, v]) => [k, new Set(words(v))]));

const title = (id) => {
  const s = SECTIONS.find((x) => x.id === id);
  return s.title ?? s.label;
};
const link = (id) => ({ link: `#${id}`, label: title(id), agent: SECTIONS.find((x) => x.id === id).agent });
const list = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`);
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

// ---------- the content index the Retriever searches ----------

function buildIndex(c) {
  const items = [];
  (c.projects ?? []).forEach((p, i) =>
    items.push({
      title: p.name,
      section: 'projects',
      href: `#${projectId(p, i)}`,
      head: keywords(real(p.name)),
      tags: keywords([...(p.tags ?? []), ...(p.skills ?? [])].map(real).join(' ')),
      body: keywords([p.summary, p.signature, ...(p.architecture ?? []).flat()].map(real).join(' ')),
    }),
  );
  (c.experience ?? []).forEach((job, j) =>
    (job.items ?? []).forEach((it) =>
      items.push({
        title: `${job.role} · ${job.org}`,
        section: 'experience',
        href: '#experience',
        head: keywords([job.role, job.org, it.title].map(real).join(' ')),
        tags: keywords((it.skills ?? []).map(real).join(' ')),
        body: keywords([...(it.bullets ?? []), ...(it.steps ?? [])].map(real).join(' ')),
      }),
    ),
  );
  (c.checkpoints ?? []).forEach((cp) =>
    items.push({
      title: cp.title,
      section: 'checkpoints',
      href: '#checkpoints',
      head: keywords(real(cp.title)),
      tags: [],
      body: keywords(real(cp.detail)),
    }),
  );
  (c.skills ?? []).forEach((g) =>
    (g.items ?? []).forEach((s) =>
      items.push({ title: s.name, section: 'skills', href: '#skills', head: keywords(real(s.name)), tags: keywords(real(g.group)), body: [] }),
    ),
  );
  (c.certifications ?? []).forEach((x) =>
    items.push({ title: x.name, section: 'certs', href: '#certs', head: keywords([x.name, x.issuer].map(real).join(' ')), tags: [], body: [] }),
  );
  return items;
}

function retrieve(q, index) {
  const qs = keywords(q);
  return index
    .map((it) => {
      let score = 0;
      for (const w of qs) {
        if (it.head.includes(w)) score += 3;
        else if (it.tags.includes(w)) score += 2;
        else if (it.body.includes(w)) score += 1;
      }
      return { ...it, score };
    })
    .filter((it) => it.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ---------- the Writer's templates, filled from content ----------

const WRITE = {
  experience(c) {
    const jobs = c.experience ?? [];
    const roles = jobs.map((j) => `${j.role} at ${j.org}`);
    return {
      segments: [
        jobs.length === 1 ? `I did one internship, ${roles[0]}. ` : `I've done ${plural(jobs.length, 'internship')}: ${list(roles)}. `,
        'Each one has a step-by-step trace of the work and its results in ',
        link('experience'),
        '.',
      ],
      sources: jobs.map((j) => ({ title: `${j.role} · ${j.org}`, href: '#experience', section: 'experience' })),
    };
  },
  projects(c) {
    const ps = c.projects ?? [];
    const i = Math.max(0, ps.findIndex((p) => p.featured));
    const f = ps[i];
    return {
      segments: [
        `Start with ${f.name}. ${f.summary} `,
        ps.length > 1 ? `The other ${ps.length - 1} are in ` : 'It lives in ',
        link('projects'),
        ', and each one opens into its architecture.',
      ],
      sources: [ps[i], ...ps.filter((_, k) => k !== i)].map((p) => ({
        title: p.name,
        href: `#${projectId(p, ps.indexOf(p))}`,
        section: 'projects',
      })),
    };
  },
  skills(c) {
    const gs = (c.skills ?? []).filter((g) => present(g.items));
    return {
      segments: [
        `My tools fall into ${plural(gs.length, 'group')}: ${list(gs.map((g) => g.group))}. Point at any tool in `,
        link('skills'),
        ' to see the projects and internships that used it.',
      ],
      sources: gs.map((g) => ({ title: g.group, href: '#skills', section: 'skills' })),
    };
  },
  checkpoints(c) {
    const cps = c.checkpoints ?? [];
    const edu = cps.find((x) => x.type === 'education');
    const others = cps.filter((x) => x !== edu);
    return {
      segments: [
        edu ? `${edu.title}. ` : '',
        others.length ? `Plus ${plural(others.length, 'award or publication', 'awards and publications')} in ` : 'Details are in ',
        link('checkpoints'),
        '.',
      ],
      sources: cps.map((x) => ({ title: x.title, href: '#checkpoints', section: 'checkpoints' })),
    };
  },
  contact(c) {
    const email = c.links?.email;
    return {
      segments: [
        present(email) ? 'Email is fastest: ' : 'The quickest way is the form in ',
        present(email) ? (isSlot(email) ? email : { link: `mailto:${email}`, label: email }) : link('contact'),
        present(email) ? '. Or leave a message in ' : '',
        present(email) ? link('contact') : '',
        '.',
      ],
      sources: [{ title: 'Contact form', href: '#contact', section: 'contact' }],
    };
  },
  certs(c) {
    const xs = c.certifications ?? [];
    const top = xs.slice(0, 2).map((x) => `${x.name} from ${x.issuer}`);
    return {
      segments: [`I hold ${plural(xs.length, 'certification')}, including ${list(top)}. Browse them in `, link('certs'), '.'],
      sources: xs.map((x) => ({ title: x.name, href: '#certs', section: 'certs' })),
    };
  },
  log(c) {
    const user = c.log?.githubUser;
    return {
      segments: [
        'My day-to-day commits, pull requests and reviews are charted in ',
        link('log'),
        isSlot(user) ? '.' : `, straight from GitHub (${user}).`,
      ],
      sources: [{ title: 'GitHub activity', href: '#log', section: 'log' }],
    };
  },
  about(c) {
    const first = [c.person?.intro, c.person?.about?.[0]].filter(Boolean).join(' ');
    return {
      segments: [`${first} `, 'There is more in ', link('about'), '.'],
      sources: [{ title: c.person.name, href: '#about', section: 'about' }],
    };
  },
};

function fromTemplate(text) {
  // "More in {projects}." -> ['More in ', link('projects'), '.']
  return text.split(/(\{[a-z]+\})/).map((part) => {
    const id = part.match(/^\{([a-z]+)\}$/)?.[1];
    return id && SECTIONS.some((s) => s.id === id) ? link(id) : part;
  });
}

function fromHits(q, hits) {
  const top = hits.slice(0, 3);
  const segs = [`On this page, “${q.trim()}” turns up `];
  top.forEach((h, i) => {
    segs.push({ link: h.href, label: h.title, agent: SECTIONS.find((s) => s.id === h.section).agent });
    segs.push(` in ${title(h.section)}`);
    segs.push(i < top.length - 2 ? ', ' : i === top.length - 2 ? ' and ' : '.');
  });
  return { segments: segs, sources: top.map((h) => ({ title: h.title, href: h.href, section: h.section })) };
}

// ---------- the run ----------

export function createAnswerer(c, visibleIds) {
  const index = buildIndex(c).filter((it) => visibleIds.has(it.section));
  const custom = (c.ask?.answers ?? []).map((a) => ({ ...a, words: new Set((a.match ?? []).flatMap(words)) }));

  return function answer(q) {
    const ws = words(q);
    let route;
    let out;

    const own = custom.find((a) => ws.some((w) => a.words.has(w)));
    const hits = retrieve(q, index);
    const intentScores = Object.entries(INTENT_WORDS)
      .filter(([id]) => visibleIds.has(id))
      .map(([id, set]) => [id, ws.filter((w) => set.has(w)).length])
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);

    if (own) {
      route = 'custom';
      out = { segments: fromTemplate(own.text), sources: (own.sources ?? []).map((id) => ({ title: title(id), href: `#${id}`, section: id })) };
      if (!out.sources.length) out.sources = out.segments.filter((s) => s.link).map((s) => ({ title: s.label, href: s.link, section: s.link.slice(1) }));
    } else if (hits.length && hits[0].score >= 2) {
      route = 'retrieval';
      out = fromHits(q, hits);
    } else if (intentScores.length) {
      route = intentScores[0][0];
      out = WRITE[route](c);
    } else if (hits.length) {
      route = 'retrieval';
      out = fromHits(q, hits);
    } else {
      route = 'none';
      out = { segments: [], sources: [] };
    }

    const sources = out.sources.filter((s) => visibleIds.has(s.section));
    const cites = out.segments.some((s) => s && s.link);
    const resolves = (href) => !href.startsWith('#') || !!document.getElementById(href.slice(1));
    const checks = [sources.length > 0, sources.length > 0 && sources.every((s) => resolves(s.href)), cites];
    const ok = checks.every(Boolean);
    if (!ok) {
      out.segments = [
        'That isn’t in my sources yet. Try one of the questions below, or ask me directly in ',
        visibleIds.has('contact') ? link('contact') : 'an email',
        '.',
      ];
    }
    return { q, route, ok, checks, sources, segments: out.segments.filter((s) => s !== '') };
  };
}

export const CHECK_LABELS = ['sources found', 'links resolve', 'answer cites a section'];

// Answer segments -> HTML. Words become .tok spans so they can stream in.
export function segmentsHtml(segments) {
  const words = (t) =>
    String(t)
      .replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])
      .split(/(\s+)/)
      .map((w) => (w.trim() ? `<span class="tok">${w}</span>` : w))
      .join('');
  return segments
    .map((s) => {
      if (typeof s === 'string') return words(s);
      const agent = s.agent ? ` data-agent="${s.agent}"` : '';
      return `<a href="${s.link.replace(/"/g, '&quot;')}"${agent}>${words(s.label)}</a>`;
    })
    .join('');
}

export const plainText = (segments) => segments.map((s) => (typeof s === 'string' ? s : s.label)).join('');
