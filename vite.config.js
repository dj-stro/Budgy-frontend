import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // ensures users always get the latest version
      includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
      manifest: {
        name: 'Budgy App',
        short_name: 'Budgy',
        description: 'A simple budget management app',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'CacheFirst',
            options: {
              cacheName: 'budgy-static-cache',
              expiration: {
                maxEntries: 50,
              },
            },
          },
          {
            urlPattern: /^https:\/\/your-backend-domain\.com\/api\//, // <-- change to your API domain
            handler: 'NetworkFirst',
            options: {
              cacheName: 'budgy-api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],

  server: {
    port: 3000
  },
})
