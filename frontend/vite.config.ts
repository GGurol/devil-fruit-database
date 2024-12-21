import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/devil-fruit-database/', => https://username.github.io//devil-fruit-database/
  plugins: [react()],
});
