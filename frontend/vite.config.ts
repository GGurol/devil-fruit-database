import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // The 'base' option has been removed to allow local hosting.
  plugins: [react()],
  server: {
    // This ensures the server is accessible from outside the container
    host: '0.0.0.0',
    port: 5173
  }
});