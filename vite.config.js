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
                jsxRuntime: 'classic', // Usa el runtime clásico de React si hay problemas con el nuevo runtime
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
                // Alias para resolver problemas de exportación en @inertiajs/core y nprogress
                '@inertiajs/core': path.resolve(__dirname, 'node_modules/@inertiajs/core/dist/index.esm.js'),
                'nprogress': path.resolve(__dirname, 'node_modules/nprogress/nprogress.js'),
                'deepmerge': path.resolve(__dirname, 'node_modules/deepmerge/dist/umd.js'),
                'qs': path.resolve(__dirname, 'node_modules/qs/lib/index.js'),
                'lodash.isequal': path.resolve(__dirname, 'node_modules/lodash.isequal/index.js'), // Alias para lodash.isequal
            },
        },
        optimizeDeps: {
            include: [
                'tailwindcss', 
                'autoprefixer', 
                'deepmerge', 
                'qs', 
                'nprogress', 
                'lodash.isequal', // Incluir lodash.isequal en las dependencias optimizadas
                '@inertiajs/react' // Incluir @inertiajs/react en las dependencias optimizadas
            ],
            esbuildOptions: {
                define: {
                    global: 'globalThis',  // Manejar el uso de "global" en algunos paquetes.
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
                    /lodash.isequal/ // Incluir lodash.isequal en commonjsOptions
                ],
                namedExports: {
                    'nprogress': ['default'],  // Forzar la exportación predeterminada de nprogress.
                    'lodash.isequal': ['default'] // Forzar la exportación predeterminada de lodash.isequal
                },
            },
            rollupOptions: {
                external: ['react', 'react-dom'],
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