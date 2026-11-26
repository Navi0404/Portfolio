import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

declare const process: { env: Record<string, string | undefined>; cwd(): string };

// Serves /api/chat during `npm run dev` with the same handler Vercel runs in production.
const devApi = (): Plugin => ({
  name: 'dev-api-chat',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      let body = '';
      for await (const chunk of req) body += chunk;
      const { default: handler } = await server.ssrLoadModule('/api/chat.ts');
      const response: Response = await handler(
        new Request('http://localhost/api/chat', {
          method: req.method,
          headers: { 'Content-Type': 'application/json' },
          body: req.method === 'POST' ? body : undefined,
        })
      );
      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(await response.text());
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load OLLAMA_* from .env for the dev API only. These are never exposed to the browser.
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'OLLAMA_'));

  return {
    plugins: [react(), devApi()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
