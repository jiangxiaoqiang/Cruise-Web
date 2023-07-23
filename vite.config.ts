import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import { visualizer } from "rollup-plugin-visualizer";
import { dependencies } from './package.json'

const exclVendors = ['react', 'react-router-dom', 'react-dom'];
function renderChunks(deps: Record<string, string>) {
  let chunks = {}
  Object.keys(deps).forEach((key) => {
    if (exclVendors.includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "test.html",
      open:true 
    }) as PluginOption
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({})
      ],
    }
  },
  build: {
    sourcemap: false,
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies),
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  }
})
