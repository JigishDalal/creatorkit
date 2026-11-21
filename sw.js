/* =============================================
   sw.js — CreatorKit Progressive Web App Service Worker
   100% Offline Capability, Instant Local Shell Caching
   ============================================= */
'use strict';

var CACHE_NAME = 'creatorkit-v1.0.1';

var STATIC_ASSETS = [
  './',
  'index.html',
  'index.css',
  'app.js',
  'poster.js',
  'carousel.js',
  'appstore.js',
  'bgremover.js',
  'brandkit.js',
  'infographic.js',
  'resizer.js',
  'invoice.js',
  'barcode.js',
  'thumbnail.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

var CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

/* Install: Pre-cache local app shell */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cache core assets
      return cache.addAll(STATIC_ASSETS).then(function() {
        // Try caching CDN assets opportunistically (non-blocking if offline during build)
        return Promise.allSettled(
          CDN_ASSETS.map(function(url) {
            return cache.add(url).catch(function(err) {
              console.warn('[SW] Optional CDN cache skipped for:', url, err);
            });
          })
        );
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* Activate: Purge stale caches */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing deprecated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* Fetch: Cache-First for static assets, Network-First for dynamic/fonts */
self.addEventListener('fetch', function(event) {
  var request = event.request;

  // Ignore non-GET requests or browser extension requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request).then(function(cachedResponse) {
      if (cachedResponse) {
        // Stale-while-revalidate for CDN assets in background
        if (request.url.includes('cdn') || request.url.includes('cdnjs')) {
          fetch(request).then(function(networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(request, networkResponse);
              });
            }
          }).catch(function() {});
        }
        return cachedResponse;
      }

      // If not in cache, fetch from network and cache
      return fetch(request).then(function(networkResponse) {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }

        var responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          // Cache Google fonts and third-party scripts dynamically
          if (request.url.includes('fonts.googleapis.com') || 
              request.url.includes('fonts.gstatic.com') ||
              request.url.includes('cdn') ||
              request.url.includes('cdnjs')) {
            cache.put(request, responseToCache);
          }
        });

        return networkResponse;
      }).catch(function(err) {
        // Fallback for navigation requests when offline
        if (request.mode === 'navigate') {
          return caches.match('index.html');
        }
        throw err;
      });
    })
  );
});

/* Message handler for manual update triggers */
self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});