const CACHE_NAME = 'class9-learning-hub-v4';
const APP_SCOPE = '/Class-9-Learning-Hub/';
const APP_ICON = `${APP_SCOPE}app-icon.png?v=20260916`;
const APP_MANIFEST = `${APP_SCOPE}manifest.webmanifest?v=20260916`;
const APP_SHELL = [
  APP_SCOPE,
  APP_MANIFEST,
  APP_ICON
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('class9-learning-hub-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Keep authenticated/API data out of the offline cache.
  if (url.pathname.includes('/rest/v1/') || url.pathname.includes('/auth/v1/')) return;

  // Navigation: prefer the network so the live app and its auth/routing state stay current.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match(APP_SCOPE)))
    );
    return;
  }

  // Static assets: cache after the first successful network response.
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {});
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
