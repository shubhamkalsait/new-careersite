import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '3.148.244.239',
    port: 5173,
    strictPort: true,
    cors: true
  }
})
