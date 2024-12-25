import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://mustafalazzawe.github.io/devil-fruit-database/",
  plugins: [react()],
});
