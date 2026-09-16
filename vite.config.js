import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Keep GitHub Pages on the canonical subpath, while allowing Capacitor to load
// the bundled web assets from its local WebView origin.
const isCapacitorBuild = process.env.VITE_CAPACITOR_BUILD === '1';

export default defineConfig({
  base: isCapacitorBuild ? './' : '/Class-9-Learning-Hub/',
  plugins: [react()],
});
