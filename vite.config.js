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
            host: 'localhost',
            protocol: 'ws', // Usar WebSocket estándar
        },
    };

    // Configuración para producción con HTTPS
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
            react({
                jsxRuntime: 'automatic', // Cambiado a 'automatic' para usar el nuevo runtime de React
            }),
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
                // Puedes comentar o ajustar este alias si es necesario
                // '@inertiajs/core': path.resolve(__dirname, 'node_modules/@inertiajs/core/dist/index.esm.js'),
            },
        },
        optimizeDeps: {
            include: [
                'react',
                'react-dom',
                '@inertiajs/react',
                'tailwindcss',
                'autoprefixer',
                'deepmerge',
                'qs',
                'nprogress',
                'lodash.isequal',
            ],
            esbuildOptions: {
                define: {
                    global: 'globalThis', // Manejar el uso de "global" en algunos paquetes.
                },
            },
        },
        build: {
            sourcemap: true, // Para facilitar la depuración.
            commonjsOptions: {
                include: [
                    /tailwindcss/, 
                    /autoprefixer/, 
                    /deepmerge/, 
                    /qs/, 
                    /nprogress/, 
                    /lodash.isequal/,
                ],
            },
            rollupOptions: {
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
        },
    };
});