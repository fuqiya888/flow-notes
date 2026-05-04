const CACHE = 'flow-v1';
const FILES = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  // 不缓存代理请求
  if (e.request.url.includes('/dav/')) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// 更新缓存策略：缓存优先，网络更新时同步最新版本
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});
