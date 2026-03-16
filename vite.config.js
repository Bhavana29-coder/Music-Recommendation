import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.au"],
  server: {
    proxy: {
      "/similar": "http://127.0.0.1:8000",
      "/features": "http://127.0.0.1:8000",
    },
  },
});
