import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    allowedHosts: ['notes.jinitaimei1234.top'],
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate KaTeX into its own chunk
          'katex-vendor': ['katex', 'react-katex'],
          // Chemistry pages chunk
          'chemistry': ['./src/pages/Chemistry/12-ReactivitySeries.jsx'],
        },
      },
    },
  },
})
