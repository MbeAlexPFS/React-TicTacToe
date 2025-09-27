import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow connections from Docker
    port: 5173, // Default Vite port
    watch: {
      usePolling: true, // Enable polling for file changes
    },
    hmr: {
      host: "localhost", // Use localhost for HMR
    },
  },
});
