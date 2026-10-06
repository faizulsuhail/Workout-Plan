/* Service worker for the 20-Week Training Plan.
   Bump VERSION whenever you change any file, so iPhones pick up the update. */
const VERSION = 'training20-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './fonts/azeret-mono-latin-500-normal.woff2',
  './fonts/azeret-mono-latin-700-normal.woff2',
  './fonts/bricolage-grotesque-latin-600-normal.woff2',
  './fonts/bricolage-grotesque-latin-800-normal.woff2',
  './fonts/figtree-latin-400-normal.woff2',
  './fonts/figtree-latin-500-normal.woff2',
  './fonts/figtree-latin-600-normal.woff2',
  './fonts/figtree-latin-700-normal.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // App page: answer instantly from the cache, refresh the copy in the background.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match('./index.html');
      const network = fetch(req).then(res => {
        if (res && res.ok) cache.put('./index.html', res.clone());
        return res;
      }).catch(() => null);
      return cached || (await network) || new Response('Offline', { status: 503 });
    })());
    return;
  }

  // Everything else (icons, fonts, launch screens): cache first, then network.
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    } catch (e) {
      return new Response('', { status: 504 });
    }
  })());
});
