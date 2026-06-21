const CACHE = 'carothina-v1';
const ASSETS = [
  '/Thina-Meal/',
  '/Thina-Meal/index.html',
  '/Thina-Meal/manifest.json',
  '/Thina-Meal/icon-192.png',
  '/Thina-Meal/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
