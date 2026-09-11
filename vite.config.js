import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reasoning V2 repair verified; keep GitHub Pages deployment on the canonical Vite app.
export default defineConfig({
  base: '/Class-9-Learning-Hub/',
  plugins: [react()],
});
