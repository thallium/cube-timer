import react from "@vitejs/plugin-react";
import path from "path";
import { Plugin, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

function myPlugin(): Plugin {
  return {
    name: "remove meta.resolve",
    transform(code, id) {
      if (
        id.includes("cubing") &&
        code.includes('return import.meta.resolve("./search-worker-entry.js")')
      ) {
        code = code.replace(
          'return import.meta.resolve("./search-worker-entry.js")',
          "throw new Error();",
        );
      }

      return code;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    myPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "Tl Timer",
        description: "A cube timer",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        sourcemap: true,
      },
    }),
  ],
  define: { global: "window" },
  worker: {
    format: "es",
  },
});
