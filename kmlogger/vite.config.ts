import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: true,
    https: {
      key: undefined,
      cert: undefined,
    }
  },
  css: {
    devSourcemap: true
  }
})