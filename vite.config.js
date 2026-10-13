import { defineConfig, loadEnv } from 'vite';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const escAttr = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Build only: render the page into index.html, so it paints (and the portrait
// starts loading) before any script runs. main.js sees the markup and skips
// rendering; it only wires up behaviour.
const prerender = {
  name: 'portfolio-prerender',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    async handler(html, ctx) {
      const load = (file) => import(`${pathToFileURL(resolve(file)).href}?t=${Date.now()}`);
      const { default: content } = await load('src/content.js');
      const { renderPage, prepare } = await load('src/render.js');
      prepare(content);
      const m = content.meta ?? {};
      const abs = (p) => (m.url && p && p.startsWith('/') ? m.url.replace(/\/$/, '') + p : p);
      // link previews (LinkedIn, WhatsApp, X) and a canonical address
      const social = [
        m.url && `<link rel="canonical" href="${escAttr(m.url)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${escAttr(m.title)}" />`,
        `<meta property="og:description" content="${escAttr(m.description)}" />`,
        m.url && `<meta property="og:url" content="${escAttr(m.url)}" />`,
        m.image && `<meta property="og:image" content="${escAttr(abs(m.image))}" />`,
        `<meta name="twitter:card" content="${m.image ? 'summary_large_image' : 'summary'}" />`,
      ]
        .filter(Boolean)
        .join('\n    ');
      // the stylesheet is small; inlining it saves a blocking round trip
      for (const file of Object.values(ctx.bundle ?? {})) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue;
        const link = new RegExp(`<link rel="stylesheet"[^>]*href="/${file.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`);
        html = html.replace(link, () => `<style>${file.source}</style>`);
      }
      return html
        .replace('<div id="app"></div>', () => `<div id="app">${renderPage(content)}</div>`)
        .replace('<title>Portfolio</title>', `<title>${escAttr(m.title)}</title>`)
        .replace('<meta name="description" content="" />', `<meta name="description" content="${escAttr(m.description)}" />`)
        .replace('<!--social-->', () => social);
    },
  },
  // a sitemap that follows meta.url
  async generateBundle() {
    const { default: content } = await import(`${pathToFileURL(resolve('src/content.js')).href}?t=${Date.now()}`);
    const url = content.meta?.url;
    if (!url) return;
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escAttr(url.replace(/\/$/, '') + '/')}</loc></url>\n</urlset>\n`,
    });
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${url.replace(/\/$/, '')}/sitemap.xml\n` });
  },
};

// In development, serve the chat endpoint from the dev server so the agent
// works locally. Keys live in .env.local (never committed).
export default defineConfig(({ mode }) => {
  // Server-only keys from the .env files (GROQ_API_KEY) reach the chat
  // handler through process.env. Vite prefers process.env over the files, so
  // clear what was set last time; otherwise an edited .env.local would keep
  // its old values when Vite restarts on the change.
  for (const key of globalThis.__portfolioEnvKeys ?? []) delete process.env[key];
  const env = loadEnv(mode, process.cwd(), '');
  const serverKeys = Object.keys(env).filter((k) => !(k in process.env) && !/^(VITE_|NEXT_PUBLIC_)/.test(k));
  for (const key of serverKeys) process.env[key] = env[key];
  globalThis.__portfolioEnvKeys = serverKeys;
  return {
    // NEXT_PUBLIC_* (the EmailJS IDs) reach the browser; everything else,
    // like GROQ_API_KEY, stays on the server
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [
      prerender,
      {
        name: 'portfolio-chat-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            let body = '';
            for await (const chunk of req) body += chunk;
            const { handleChat } = await server.ssrLoadModule('/server/chat.js');
            const response = await handleChat(
              new Request('http://localhost/api/chat', {
                method: req.method,
                headers: { 'content-type': 'application/json', 'x-forwarded-for': req.socket.remoteAddress ?? 'local' },
                body: req.method === 'POST' ? body : undefined,
              }),
            );
            res.statusCode = response.status;
            response.headers.forEach((value, key) => res.setHeader(key, value));
            res.end(await response.text());
          });
        },
      },
    ],
  };
});
