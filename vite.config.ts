
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This injects the environment variable from the build environment (Netlify)
    // into the client-side code as process.env.API_KEY
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
