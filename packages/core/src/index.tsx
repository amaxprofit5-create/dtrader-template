/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { createRoot } from 'react-dom/client';

import App from 'App/app.jsx';
import initStore from 'App/initStore';
// eslint-disable-next-line
import registerServiceWorker from 'Utils/PWA';

import AppNotificationMessages from './App/Containers/app-notification-messages.jsx';

if (
    !!window?.localStorage.getItem?.('debug_service_worker') || // To enable local service worker related development
    !window.location.hostname.startsWith('localhost')
) {
    registerServiceWorker();
}

const initApp = async () => {
    try {
        // For simplified authentication, we don't need to pass accounts to initStore
        // The authentication will be handled by temp-auth.js and client-store.js
        // initStore is now async to perform whoami check before WebSocket connection
        const root_store = await initStore(AppNotificationMessages);

        const wrapper = document.getElementById('derivatives_trader');
        if (wrapper) {
            const root = createRoot(wrapper);
            root.render(<App root_store={root_store} />);
        } else {
            // eslint-disable-next-line no-console
            console.error('[v0] Wrapper element not found!');
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[v0] Fatal error during app initialization:', error);
        const wrapper = document.getElementById('derivatives_trader');
        if (wrapper) {
            wrapper.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace;"><h2>Error Loading Application</h2><p>${
                error instanceof Error ? error.message : String(error)
            }</p></div>`;
        }
    }
};

initApp();
