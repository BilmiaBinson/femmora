import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Prefer VITE_ prefixed env vars for Vite (safer convention). Keep a
      // fallback to GEMINI_API_KEY for backward compatibility during transition.
      // NOTE: Be careful — any value injected here will be baked into the client
      // bundle. Do NOT put production secrets in client-side code. Prefer a
      // server-side proxy for calls that require private API keys.
      define: {
        'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
