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
        https: false,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
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
                protocol: 'wss',
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
                jsxRuntime: 'classic',
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
                '@inertiajs/core': path.resolve(__dirname, 'node_modules/@inertiajs/core/dist/index.esm.js'),
                '@inertiajs/react': path.resolve(__dirname, 'node_modules/@inertiajs/react/dist/index.esm.js'),
                'nprogress': path.resolve(__dirname, 'node_modules/nprogress/nprogress.js'),
                'deepmerge': path.resolve(__dirname, 'node_modules/deepmerge/dist/umd.js'),
                'qs': path.resolve(__dirname, 'node_modules/qs/lib/index.js'),
                'lodash.isequal': path.resolve(__dirname, 'node_modules/lodash.isequal/index.js'),
                'react': path.resolve(__dirname, 'node_modules/react/index.js'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom/index.js'),
                'react-dom/client': path.resolve(__dirname, 'node_modules/react-dom/client.js'),
            },
        },
        optimizeDeps: {
            include: [
                'tailwindcss', 
                'autoprefixer', 
                'deepmerge', 
                'qs', 
                'nprogress', 
                'lodash.isequal',
                '@inertiajs/react',
                'react',
                'react-dom',
                'react-dom/client',
            ],
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
            },
        },
        build: {
            sourcemap: true,
            commonjsOptions: {
                include: [
                    /tailwindcss/, 
                    /autoprefixer/, 
                    /deepmerge/, 
                    /qs/, 
                    /nprogress/, 
                    /lodash\.isequal/,
                    /react/,
                    /react-dom/,
                    /@inertiajs/,
                ],
                transformMixedEsModules: true,
            },
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
        },
    };
});