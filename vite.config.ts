import { URL, fileURLToPath } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/formula-editor/',
  plugins: [
    vue(),
    Unocss({
      configFile: path.resolve(__dirname, 'uno.config.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'docs',
  },
})
