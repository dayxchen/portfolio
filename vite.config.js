import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://dayxchen.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
