import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "/mng/",
  build: { outDir: "dist" },
  server: { port: 5173, strictPort: true },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@css": path.resolve(__dirname, "css"),
      "@utils": path.resolve(__dirname, "utils"),
      "@features": path.resolve(__dirname, "features"),
      "@lib": path.resolve(__dirname, "lib"),
      "@view": path.resolve(__dirname, "view"),
      "@api": path.resolve(__dirname, "api"),
    },
  },
});
