import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig(({ mode }) => {
    // Configuración para modo local
    let serverConfig = {
        host: '0.0.0.0',
        port: 5175,
        https: false, // No usar HTTPS en desarrollo local
        hmr: {
            host: 'localhost', // Host local
            protocol: 'ws', // Usar WebSocket estándar
        },
    };

    // Si estamos en modo de producción, sobreescribir configuración HTTPS
    if (mode === 'production') {
        serverConfig = {
            host: '0.0.0.0',
            port: 5175,
            https: {
                key: fs.readFileSync('/etc/letsencrypt/live/2upra.com/privkey.pem'),
                cert: fs.readFileSync('/etc/letsencrypt/live/2upra.com/fullchain.pem'),
            },
            hmr: {
                host: 'laravel.2upra.com',
                protocol: 'wss', // Utilizar WebSocket seguro
            },
        };
    }

    return {
        server: serverConfig,
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
                    tailwindcss,
                    autoprefixer,
                ],
            },
        },
        resolve: {
            alias: {
                'deepmerge': path.resolve(__dirname, 'node_modules/deepmerge/dist/umd.js'),
                'qs': path.resolve(__dirname, 'node_modules/qs/lib/index.js'),
            },
        },
        optimizeDeps: {
            include: ['tailwindcss', 'autoprefixer', 'deepmerge', 'qs'],
        },
        build: {
            commonjsOptions: {
                include: [/tailwindcss/, /autoprefixer/, /deepmerge/, /qs/],
            },
        },
    };
});