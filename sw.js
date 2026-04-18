const CACHE = 'knuspikeks-v2';
const ASSETS = [
  '/Notebook/',
  '/Notebook/index.html',
  '/Notebook/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('firestore.googleapis.com') || url.includes('firebase') || url.includes('google-analytics')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match('/Notebook/index.html'))
  );
});
