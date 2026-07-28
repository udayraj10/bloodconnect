import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { qrcode } from "vite-plugin-qrcode"

export default defineConfig({
  plugins: [react(), qrcode()],
  base: "/bloodconnect/",
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
