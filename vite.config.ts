import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import autoprefixer from 'autoprefixer';
import { visualizer } from "rollup-plugin-visualizer";

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
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom';
            }
            return 'vendor';
          }
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
