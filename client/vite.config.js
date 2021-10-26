import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), WindiCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
