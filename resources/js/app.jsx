import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { cn } from '@/lib/utils';
import { DialogProvider } from './Components/DialogContext';

const appName = import.meta.env.VITE_APP_NAME || '2upra';

createInertiaApp({
    
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Envolver App en el DialogProvider
        root.render(
            <DialogProvider>
                <App {...props} />
            </DialogProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
