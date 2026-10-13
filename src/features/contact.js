// Contact form: validation and sending through EmailJS.
// A sent message clears the form; errors say what failed and keep everything
// the visitor typed.
import { $, isSlot, present } from '../lib/dom.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// EmailJS sends the message to the owner and, if a template is set, an
// auto-reply to the visitor. The IDs come from .env.local (see README); the
// public key is meant to live in the browser.
const EMAILJS = {
  service: import.meta.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  template: import.meta.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  autoreply: import.meta.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID,
  publicKey: import.meta.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

async function sendWithEmailJS(data, owner) {
  const { send } = await import('@emailjs/browser');
  const params = {
    name: data.name,
    email: data.email,
    message: data.message,
    reply_to: data.email,
    to_name: owner,
    time: new Date().toLocaleString(),
  };
  await send(EMAILJS.service, EMAILJS.template, params, {
    publicKey: EMAILJS.publicKey,
    blockHeadless: true,
    limitRate: { id: 'contact', throttle: 10000 },
  });
  // the auto-reply is a courtesy: if it fails, the message has still arrived
  if (EMAILJS.autoreply) send(EMAILJS.service, EMAILJS.autoreply, params, { publicKey: EMAILJS.publicKey }).catch(() => {});
}

export function initContact(c) {
  const section = $('#contact');
  if (!section) return;
  const form = $('.contact-form', section);
  const send = $('.send', form);
  const label = $('span', send);
  const statusEl = $('.form-status', form);
  let resetTimer = 0;

  // ⌘↵ on a Mac, Ctrl↵ elsewhere, sends from any field
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (mac ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  const fields = {
    name: { el: $('#cf-name'), check: (v) => (v.trim() ? '' : 'Add your name so I know who to reply to.') },
    email: {
      el: $('#cf-email'),
      check: (v) => (!v.trim() ? 'Add your email so I can reply.' : EMAIL.test(v.trim()) ? '' : 'That email looks incomplete. Check for a missing @ or domain.'),
    },
    message: { el: $('#cf-message'), check: (v) => (v.trim().length >= 2 ? '' : 'Write a short message first.') },
  };

  function validate() {
    let first = null;
    for (const f of Object.values(fields)) {
      const msg = f.check(f.el.value);
      const err = document.getElementById(`${f.el.id}-err`);
      err.textContent = msg;
      err.hidden = !msg;
      f.el.setAttribute('aria-invalid', String(!!msg));
      if (msg) f.el.setAttribute('aria-describedby', err.id);
      else f.el.removeAttribute('aria-describedby');
      if (msg && !first) first = f.el;
    }
    return first;
  }

  Object.values(fields).forEach((f) => f.el.addEventListener('input', () => f.el.getAttribute('aria-invalid') === 'true' && validate()));

  function setButton(state, text) {
    send.dataset.state = state;
    send.disabled = state === 'sending';
    label.textContent = text;
  }
  function say(text, state = '') {
    statusEl.dataset.state = state;
    statusEl.textContent = text;
  }

  async function deliver(data) {
    if (EMAILJS.service && EMAILJS.template && EMAILJS.publicKey) return sendWithEmailJS(data, c.person?.name ?? '');
    const endpoint = c.contact?.endpoint;
    if (!present(endpoint) || isSlot(endpoint)) {
      // unconfigured: preview the flow in dev (clearly marked, nothing is
      // sent), fail honestly in production
      if (import.meta.env.DEV) {
        console.warn('[contact] No EmailJS IDs loaded, so nothing was sent. Fill .env.local and reload the page.');
        await new Promise((r) => setTimeout(r, 700));
        return 'simulated';
      }
      throw new Error('unconfigured');
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  }

  const fallback = () => {
    const email = c.links?.email;
    return present(email) && !isSlot(email) ? ` Email me directly at ${email} instead.` : ' Please try again in a minute.';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (send.dataset.state === 'sending') return;
    clearTimeout(resetTimer);
    const bad = validate();
    if (bad) {
      bad.focus();
      return;
    }
    setButton('sending', 'Sending…');
    say('');
    try {
      const how = await deliver(Object.fromEntries(Object.entries(fields).map(([k, f]) => [k, f.el.value.trim()])));
      if (how === 'simulated') {
        setButton('', 'Send message');
        say('Development preview: this message was not sent. Add your EmailJS IDs to .env.local and reload the page.', 'error');
        return;
      }
      // sent: clear the form so it's ready for another message
      form.reset();
      setButton('sent', 'Message sent');
      say('Thanks, your message reached me. I’ll reply by email.');
      resetTimer = setTimeout(() => setButton('', 'Send message'), 4000);
    } catch (err) {
      console.error('[contact] Send failed:', err?.status ?? '', err?.text ?? err);
      setButton('', 'Try again');
      say(
        err?.status === 429
          ? 'You sent a message a moment ago. Wait a few seconds, then try again.'
          : (navigator.onLine ? 'Your message didn’t send. Nothing was lost; it’s still in the form.' : 'You look offline, so the message didn’t send. It’s still in the form.') + fallback(),
        'error',
      );
    }
  });
}
