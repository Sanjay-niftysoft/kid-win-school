import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/demo/kidwin-preschool/',
  plugins: [
    {
      name: 'redirect-base-missing-slash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = req.url.split('?')[0];
          if (urlPath === '/demo/kidwin-preschool') {
            const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
            res.writeHead(301, { Location: '/demo/kidwin-preschool/' + query });
            res.end();
            return;
          }
          next();
        });
      }
    },
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Forward /api/* requests to your PHP backend server during development
      // Change the target port if your PHP server runs on a different port
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Rewrite: /api/admission.php -> /admission.php (PHP server is rooted at backend/api)
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
