import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://dayxchen.github.io/portfolio/
// Each project details page is its own HTML entry, e.g. crave/index.html → /portfolio/crave/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        crave: resolve(import.meta.dirname, 'crave/index.html'),
        'flight-passport': resolve(import.meta.dirname, 'flight-passport/index.html'),
        'will-i-fly': resolve(import.meta.dirname, 'will-i-fly/index.html'),
      },
    },
  },
})
