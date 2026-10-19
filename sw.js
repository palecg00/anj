/* LinguaPath — service worker: caches all app files so the app works offline after the first visit (when served over http/https). */
const CACHE = 'linguapath-v1';
const FILES = [
    './',
    'css/styles.css',
    'icon.svg',
    'index.html',
    'js/app.js',
    'js/data/curriculum.js',
    'js/data/grammar-a.js',
    'js/data/grammar-b.js',
    'js/data/grammar-c.js',
    'js/data/placement.js',
    'js/data/scenarios.js',
    'js/data/texts-a.js',
    'js/data/texts-b.js',
    'js/data/texts-c.js',
    'js/data/vocabulary.js',
    'js/data/writing.js',
    'js/gen.js',
    'js/i18n.js',
    'js/pages/dashboard.js',
    'js/pages/goals.js',
    'js/pages/grammar.js',
    'js/pages/learn.js',
    'js/pages/onboarding.js',
    'js/pages/practice.js',
    'js/pages/progress.js',
    'js/pages/settings.js',
    'js/pages/tests.js',
    'js/pages/texts.js',
    'js/pages/vocab.js',
    'js/pages/writing.js',
    'js/quiz.js',
    'js/speech.js',
    'js/store.js',
    'js/ui.js',
    'manifest.webmanifest',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone();
    if (res.ok && new URL(e.request.url).origin === location.origin) caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match('./index.html'))));
});
