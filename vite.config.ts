import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Nexa-ai/',
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
