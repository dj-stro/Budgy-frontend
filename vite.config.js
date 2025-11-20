import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "logo192.png", "logo512.png"],
      manifest: {
        name: "Budgy App",
        short_name: "Budgy",
        description: "A simple budget management app",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1976d2",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache your app’s static assets
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "CacheFirst",
            options: {
              cacheName: "budgy-static-cache",
              expiration: { maxEntries: 50 },
            },
          },
          {
            // Cache API calls using NetworkFirst strategy
            urlPattern: /^http:\/\/192\.168\.10\.152:8080\/api\//, // your backend API
            handler: "NetworkFirst",
            options: {
              cacheName: "budgy-api-cache",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 50 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],

  optimizeDeps: {
    include: ["react-chartjs-2", "chart.js"], // pre-bundle Chart.js for Vite
  },

  server: {
    host: true,      // allow access from device on same network
    port: 3000,
    https: false,    // keep false for local dev
  },

  build: {
    rollupOptions: {
      // normally empty, but can add externals if needed
      external: [],
    },
  },
});
