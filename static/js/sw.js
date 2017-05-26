/**
 * Created by sergey on 05.05.17.
 */

const APP_CACHE_NAME = 'fastball_cache_v1';
// ссылки на кэшируемые файлы
const cacheUrls = [
  '/',
  'dist/bundle.js',
  'static/css/preloader.css',
  'static/js/modules/threeJS/three.min.js',
  'static/js/modules/threeJS/Detector.js',
  'static/js/modules/threeJS/CanvasRenderer.js',
  'static/js/modules/threeJS/Projector.js',
  'static/js/modules/threeJS/KeyboardState.js',
  'static/js/modules/threeJS/OrbitControls.js',
  'dist/bundle.js'
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE_NAME).then(cache => cache.addAll(cacheUrls)),
  );
});

this.addEventListener('fetch', (event) => {
  let response;
  event.respondWith(caches.match(event.request).catch(() => fetch(event.request)).then((r) => {
    response = r;
    caches.open(APP_CACHE_NAME).then((cache) => {
      cache.put(event.request, response);
    });
    return response.clone();
  }));
});
