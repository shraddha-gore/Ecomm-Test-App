// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/Ecomm-Test-App/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                product: resolve(__dirname, 'product.html'),
                cart: resolve(__dirname, 'cart.html'),
                checkout: resolve(__dirname, 'checkout.html'),
            },
        },
    },
})