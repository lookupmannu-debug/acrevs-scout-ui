// ACREVS Zero-Trust Service Worker
const CACHE_NAME = 'acrevs-v1-zero-trust';

self.addEventListener('install', (event) => {
    // सिर्फ कोर UI स्ट्रक्चर को कैशे में रखना है
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './patient_portal.html',
                './manifest.json'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // 🛡️ ZERO PERSISTENCE POLICY: क्लिनिकल डेटा को फोन की मेमोरी में कभी सेव नहीं होने देना है
    // हर रिक्वेस्ट सीधे नेटवर्क से टकराएगी
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
