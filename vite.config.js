import { resolve } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product_list: resolve(__dirname, "src/product-list/index.html"),
        header: resolve(__dirname, "src/partials/header.html"),
        footer: resolve(__dirname, "src/partials/footer.html"),
      },
    },
  },
  server: {
    proxy: {
      // Replace '/api' with your proxy prefix
      '/api': {
        // Replace 'http://your-http-server-url.com' with the actual URL
        target: 'http://server-nodejs.cit.byui.edu:3000',
        changeOrigin: true, // Crucial for changing the origin
        secure: false,      // Since it's an HTTP target
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
});
