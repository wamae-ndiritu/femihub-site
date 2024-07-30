import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {},
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@emotion/react": "@emotion/react/dist/emotion-react.cjs.js",
    },
  },
});
