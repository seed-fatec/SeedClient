import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), Components({ dts: 'src/components.d.ts' })],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@icons',
        replacement: fileURLToPath(
          new URL('./src/assets/icons', import.meta.url)
        ),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(
          new URL('./src/assets', import.meta.url)
        ),
      },
    ],
  },
})
