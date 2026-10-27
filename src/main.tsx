import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// Manage Service Worker cleanly:
// In production builds, enable PWA caching & offline support.
// In development & preview environments, unregister any conflicting or stale service workers
// so that hot reloads and iframe asset requests are never blocked or hung.
if (import.meta.env.PROD && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({ immediate: true });
    })
    .catch((err) => {
      console.warn('PWA service worker registration notice:', err);
    });
} else if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Clear any existing stale or broken service workers from prior sessions
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  }).catch(() => {});
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
