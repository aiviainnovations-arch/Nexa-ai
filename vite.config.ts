import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set VITE_BASE=/your-repo/ when deploying to a sub-path (e.g. GitHub Pages).
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
