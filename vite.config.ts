import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueTypeImports from "vite-plugin-vue-type-imports";
import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueTypeImports(), basicSsl(), VitePWA({
    registerType: 'prompt',
    srcDir: "src",
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
});
