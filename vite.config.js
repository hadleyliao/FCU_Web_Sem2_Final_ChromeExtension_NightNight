import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',          // 輸出到 dist/（Chrome 載入這個）
    emptyOutDir: true,       // 每次 build 先清空 dist
  },
  // ⚠️ Chrome Extension 用到的 HTML/JS 不能 hash，否則 manifest.json 找不到
  esbuild: {
    legalComments: 'none',
  }
})
