import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "assets/js",
    emptyOutDir: false,
    rollupOptions: {
      input: "assets/src/main.jsx",
      output: {
        entryFileNames: "airtable-interface.bundle.js",
        format: "iife",
      },
    },
  },
});
