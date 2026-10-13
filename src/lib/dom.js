import { icon } from './icons.js';

// A value written as "[like this]" is an unfilled placeholder slot.
export const isSlot = (v) => typeof v === 'string' && /^\[[\s\S]*\]$/.test(v.trim());

// Present = worth rendering. null, '', and [] mean "hide it".
export const present = (v) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0);

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const projectId = (p, i) => `project-${slug(p.name) || 'item'}-${i}`;

// Turn a stored link value into an href. Email and phone get their schemes.
export function hrefFor(kind, value) {
  if (kind === 'email') return `mailto:${value}`;
  if (kind === 'phone') return `tel:${String(value).replace(/[^\d+]/g, '')}`;
  return value;
}

// A button-styled link. null hides it; a [slot] renders as a dead placeholder
// so the owner can see where the link goes without shipping a broken href.
export function linkButton(value, label, { cls = 'btn', iconName, kind, external = false, download = false } = {}) {
  if (!present(value)) return '';
  const inner = `${iconName ? icon(iconName) : ''}<span>${esc(label)}</span>`;
  if (isSlot(value)) {
    return `<span class="${cls} is-slot" role="link" aria-disabled="true" title="Placeholder: set ${esc(value)} in src/content.js">${inner}</span>`;
  }
  const attrs = [
    `class="${cls}"`,
    `href="${esc(hrefFor(kind, value))}"`,
    external ? 'target="_blank" rel="noopener"' : '',
    download ? 'download' : '',
  ].join(' ');
  return `<a ${attrs}>${inner}</a>`;
}
