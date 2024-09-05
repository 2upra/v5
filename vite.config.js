import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5175,
        https: {
            key: fs.readFileSync('/etc/letsencrypt/live/2upra.com/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/2upra.com/fullchain.pem'),
        },
        hmr: {
            host: 'laravel.2upra.com',
            protocol: 'wss', // Utiliza WebSocket seguro
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
});