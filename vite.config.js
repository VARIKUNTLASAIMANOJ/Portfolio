import { defineConfig, loadEnv } from 'vite';

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
