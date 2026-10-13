// Activity trace: a GitHub contribution graph, loaded in the visitor's
// browser from a public contributions API. An unfilled username shows
// labeled sample data (dev only; render.js hides the section in production).
import { $, esc, isSlot } from '../lib/dom.js';

const API = (user) => `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=all`;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const iso = (d) => d.toISOString().slice(0, 10);
const fmt = (s) => new Date(`${s}T00:00:00Z`).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });

function sample() {
  // deterministic, weekday-heavy, with a few busy bursts
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const out = [];
  const year = new Date().getUTCFullYear();
  for (let d = new Date(Date.UTC(year - 1, 0, 1)); d <= new Date(); d.setUTCDate(d.getUTCDate() + 1)) {
    const weekday = d.getUTCDay() % 6 !== 0;
    const burst = rand() < 0.04 ? 6 + rand() * 14 : 0;
    const count = rand() < (weekday ? 0.55 : 0.2) ? Math.round(1 + rand() * 5 + burst) : 0;
    out.push({ date: iso(d), count });
  }
  return out;
}

async function fetchDays(user) {
  const res = await fetch(API(user));
  if (!res.ok) throw new Error(`status ${res.status}`);
  const json = await res.json();
  return (json.contributions ?? []).map(({ date, count }) => ({ date, count }));
}

const levelOf = (count, max) => (count === 0 ? 0 : Math.min(4, Math.ceil((count / Math.max(1, max)) * 4)));

function streaks(days, today) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // current: count back from today (or yesterday, if today is still empty)
  let current = 0;
  const past = days.filter((d) => d.date <= today);
  let i = past.length - 1;
  if (i >= 0 && past[i].count === 0 && past[i].date === today) i--;
  for (; i >= 0 && past[i].count > 0; i--) current++;
  return { longest, current };
}

export async function initLog() {
  const card = $('.log-card');
  if (!card) return;
  const user = card.dataset.user;
  const grid = $('.log-grid', card);
  const years = $('.log-years', card);
  let all;
  try {
    all = isSlot(user) ? sample() : await fetchDays(user);
  } catch {
    $('.log-total', card).textContent = '—';
    $('.log-sub', card).textContent = 'couldn’t load GitHub activity right now';
    card.dataset.state = 'error';
    return;
  }

  const byYear = new Map();
  for (const d of all) {
    const y = d.date.slice(0, 4);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y).push(d);
  }
  const list = [...byYear.keys()].sort().reverse().slice(0, 4);
  const today = iso(new Date());

  function show(year) {
    const counts = new Map(byYear.get(year).map((d) => [d.date, d.count]));
    const start = new Date(Date.UTC(+year, 0, 1));
    const end = new Date(Date.UTC(+year, 11, 31));
    const days = [];
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) days.push({ date: iso(d), count: counts.get(iso(d)) ?? 0, dow: d.getUTCDay(), month: d.getUTCMonth() });
    const max = Math.max(...days.map((d) => d.count));
    const total = days.reduce((n, d) => n + d.count, 0);
    const offset = days[0].dow; // weeks start on Sunday, like GitHub
    const weeks = Math.ceil((days.length + offset) / 7);

    let html = '';
    days.forEach((d, i) => {
      const col = Math.floor((i + offset) / 7) + 2;
      // label each month above the week holding its first day
      if (d.date.endsWith('-01')) html += `<span class="log-month mono" style="grid-column:${col} / span 4">${MONTHS[d.month]}</span>`;
      const future = d.date > today;
      const label = future ? '' : `${d.count === 0 ? 'No' : d.count} contribution${d.count === 1 ? '' : 's'} on ${fmt(d.date)}`;
      html += `<span class="log-cell" style="grid-column:${col};grid-row:${d.dow + 2}" data-l="${future ? 'f' : levelOf(d.count, max)}"${label ? ` title="${label}"` : ''}></span>`;
    });
    ['Mon', 'Wed', 'Fri'].forEach((name, k) => {
      html += `<span class="log-day mono" style="grid-row:${k * 2 + 3}">${name}</span>`;
    });
    grid.style.setProperty('--weeks', weeks);
    grid.innerHTML = html;

    const s = streaks(days.filter((d) => d.date <= today), today);
    const busiest = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);
    $('.log-total', card).textContent = total.toLocaleString('en');
    $('.log-sub', card).textContent = `contributions in ${year}${isSlot(user) ? ' (sample)' : ''}`;
    $('.log-current', card).textContent = year === today.slice(0, 4) ? `${s.current} day${s.current === 1 ? '' : 's'}` : '–';
    $('.log-longest', card).textContent = `${s.longest} day${s.longest === 1 ? '' : 's'}`;
    $('.log-busiest', card).textContent = busiest.count ? `${busiest.count} on ${fmt(busiest.date)}` : '–';
    grid.setAttribute('aria-label', `${total} GitHub contributions in ${year}. Longest streak ${s.longest} days.`);
    years.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.year === year)));
    // phones scroll the grid; start at the latest weeks
    const scroller = $('.log-scroll', card);
    scroller.scrollLeft = year === today.slice(0, 4) ? scroller.scrollWidth : 0;
  }

  years.innerHTML = list.map((y) => `<button type="button" data-year="${esc(y)}" aria-pressed="false">${esc(y)}</button>`).join('');
  years.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) show(b.dataset.year);
  });
  show(list[0]);
}
