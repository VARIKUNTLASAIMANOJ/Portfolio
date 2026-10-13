// The floating assistant. Questions go to /api/chat, where a Groq model
// answers from kb/knowledge.md; when that endpoint isn't set up (no API key,
// static hosting) the page answers on its own from the site content. Each
// reply shows a small run (router -> retriever -> validator -> writer) while
// it's being worked out, then streams in with links to the page.
import { SECTIONS, glyph } from '../lib/agents.js';
import { $, $$, esc, isSlot, reducedMotion } from '../lib/dom.js';
import { segmentsHtml, plainText } from './answer.js';

const STEPS = ['router', 'retriever', 'validator', 'writer'];
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

// links an answer may use: anchors on this page, URLs from the content, and
// knowledge-base URLs the server reports alongside an answer
function allowlist(content) {
  const urls = new Set();
  const walk = (v) => {
    if (typeof v === 'string') {
      if (/^(https?:|mailto:)/.test(v) && !isSlot(v)) urls.add(v.replace(/\/$/, ''));
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(content);
  const email = content.links?.email;
  if (email && !isSlot(email)) urls.add(`mailto:${email}`);
  const gh = content.log?.githubUser;
  if (gh && !isSlot(gh)) urls.add(`https://github.com/${gh}`);
  return urls;
}

// a small, safe markdown subset: paragraphs, "- " lists, **bold**, [links](…)
function markdown(text, allowed) {
  const inline = (s) =>
    esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
        const raw = href.replace(/&amp;/g, '&');
        if (raw.startsWith('#') && document.getElementById(raw.slice(1))) return `<a href="${href}">${label}</a>`;
        if (allowed.has(raw.replace(/\/$/, ''))) {
          return raw.startsWith('mailto:') ? `<a href="${href}">${label}</a>` : `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
        }
        return label; // a link we can't vouch for stays plain text
      });
  const out = [];
  let list = null;
  for (const line of String(text).split('\n')) {
    const item = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)/);
    if (item) {
      (list ??= []).push(`<li>${inline(item[1])}</li>`);
      continue;
    }
    if (list) out.push(`<ul>${list.join('')}</ul>`), (list = null);
    if (line.trim()) out.push(`<p>${inline(line.trim())}</p>`);
  }
  if (list) out.push(`<ul>${list.join('')}</ul>`);
  return out.join('');
}

// wrap every word in a .tok span so the reply can stream in
function tokenize(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) frag.append(part);
      else {
        const span = document.createElement('span');
        span.className = 'tok';
        span.textContent = part;
        frag.append(span);
      }
    }
    node.replaceWith(frag);
  }
  return $$('.tok', root);
}

export function initAgent(answerLocally, content) {
  const dock = $('.agent-dock');
  if (!dock) return;
  const panel = $('.agent-panel', dock);
  const launch = $('.agent-launch', dock);
  const hello = $('.agent-hello', dock);
  const log = $('.agent-log', dock);
  const form = $('.agent-form', dock);
  const input = $('#agent-input');
  const allowed = allowlist(content);
  const endpoint = content.ask?.endpoint === undefined ? '/api/chat' : content.ask.endpoint;
  let remote = endpoint ? 'unknown' : 'off'; // becomes 'ok' or 'off' after the first try
  const history = [];
  let returnFocus = null;
  let busy = false;

  // ---- open / close ----

  function open(from) {
    returnFocus = from ?? document.activeElement;
    panel.hidden = false;
    dock.dataset.open = 'true';
    launch.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => input.focus());
  }
  function close() {
    panel.hidden = true;
    dock.dataset.open = 'false';
    launch.setAttribute('aria-expanded', 'false');
    returnFocus?.focus?.();
  }
  launch.addEventListener('click', () => (panel.hidden ? open(launch) : close()));
  $('.agent-close', dock).addEventListener('click', close);
  $$('.ask-open').forEach((b) => b.addEventListener('click', () => open(b)));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });
  // on phones the panel covers the page, so following a link closes it
  log.addEventListener('click', (e) => {
    if (e.target.closest('a') && matchMedia('(max-width: 767px)').matches) close();
  });

  // the "Hello!" bubble always sits beside the robot; it opens the chat too
  hello.addEventListener('click', () => open(launch));

  // ---- answering ----

  async function askModel() {
    if (remote === 'off') return null;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-8) }),
        signal: AbortSignal.timeout(45000),
      });
      const isJson = (res.headers.get('content-type') ?? '').includes('application/json');
      const data = isJson ? await res.json() : {};
      if (res.ok && data.answer) {
        remote = 'ok';
        (Array.isArray(data.links) ? data.links : []).forEach((u) => typeof u === 'string' && allowed.add(u.replace(/\/$/, '')));
        dock.dataset.ai = 'true';
        return data.answer;
      }
      // not deployed or not configured: stop asking, answer from the page
      if (!isJson || data.error === 'not_configured' || [404, 405].includes(res.status)) remote = 'off';
      return null;
    } catch {
      return null;
    }
  }

  async function ask(q) {
    q = q.trim();
    if (!q || busy) return;
    busy = true;
    input.value = '';
    history.push({ role: 'user', content: q });
    log.insertAdjacentHTML('beforeend', `<li class="msg from-you"><p>${esc(q)}</p></li>`);
    const msg = document.createElement('li');
    msg.className = 'msg from-agent is-thinking';
    msg.innerHTML = `<ol class="mini-run" aria-hidden="true">${STEPS.map((a, k) => `<li data-agent="${a}" style="--k:${k}">${glyph(a)}</li>`).join('')}</ol><div class="msg-text" aria-hidden="true"><p class="msg-wait">Thinking…</p></div>`;
    log.append(msg);
    log.scrollTop = log.scrollHeight;

    const instant = reducedMotion();
    const [reply] = await Promise.all([askModel(), pause(instant ? 0 : 650)]);

    const text = $('.msg-text', msg);
    let plain;
    let ok = true;
    let sources = [];
    if (reply) {
      text.innerHTML = markdown(reply, allowed);
      plain = reply;
    } else {
      const res = answerLocally(q);
      text.innerHTML = `<p>${segmentsHtml(res.segments)}</p>`;
      plain = plainText(res.segments);
      ok = res.ok;
      sources = res.ok ? res.sources : [];
    }
    history.push({ role: 'assistant', content: plain });

    msg.classList.remove('is-thinking');
    $$('.mini-run li', msg).forEach((s) => (s.dataset.state = !ok && s.dataset.agent === 'validator' ? 'warning' : 'done'));
    const toks = reply ? tokenize(text) : $$('.tok', text);
    if (!instant) {
      toks.forEach((t) => t.classList.add('is-pending'));
      for (const t of toks) {
        t.classList.remove('is-pending');
        log.scrollTop = log.scrollHeight;
        await pause(14);
      }
    }
    text.removeAttribute('aria-hidden');
    if (sources.length) {
      const links = sources
        .slice(0, 3)
        .map((s) => {
          const agent = SECTIONS.find((x) => x.id === s.section)?.agent ?? 'writer';
          return `<li><a class="source" href="${esc(s.href)}" data-agent="${agent}">${glyph(agent)}<span>${esc(s.title)}</span></a></li>`;
        })
        .join('');
      msg.insertAdjacentHTML('beforeend', `<ul class="sources" aria-label="Sources">${links}</ul>`);
    }
    msg.dataset.state = ok ? 'done' : 'warning';
    msg.setAttribute('aria-label', plain);
    log.scrollTop = log.scrollHeight;
    busy = false;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
  });
  $('.agent-chips', dock).addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) ask(chip.textContent);
  });
}
