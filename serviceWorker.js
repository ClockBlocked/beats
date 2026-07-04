// sw.js – placed at https://mybeats.xo.je/sw.js

const CACHE_NAMES = {
  library: 'library-cache-v1',
  images: 'images-cache-v1',
  offline: 'offline-cache-v1',
};

// Important: use absolute URLs so there’s no ambiguity
const LIBRARY_URL = 'https://mybeats.xo.je/modules/library.js';
const OFFLINE_URL = 'https://mybeats.xo.je/offline.html';

const IMAGE_PREFIXES = [
  'https://mybeats.xo.je/content/albumCovers/',
  'https://mybeats.xo.je/content/artistPortraits/',
];

// ============================================================
// INSTALL – pre-cache the essential files
// ============================================================
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const libraryCache = await caches.open(CACHE_NAMES.library);
      await libraryCache.add(LIBRARY_URL);

      const offlineCache = await caches.open(CACHE_NAMES.offline);
      await offlineCache.add(OFFLINE_URL);

      // Immediately activate this version
      await self.skipWaiting();
    })()
  );
});

// ============================================================
// ACTIVATE – clean old caches (if you version them) and take control
// ============================================================
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Optional: delete previous versions of caches
      const validCaches = Object.values(CACHE_NAMES);
      const keys = await caches.keys();
      await Promise.all(
        keys.map(key => {
          if (!validCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      );
      // Take control of all clients immediately
      await self.clients.claim();
    })()
  );
});

// ============================================================
// FETCH – your custom strategy for each resource type
// ============================================================
self.addEventListener('fetch', event => {
  const { request } = event;

  // Handle navigation requests (e.g. HTML pages) with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try the network first
          const networkResponse = await fetch(request);
          return networkResponse;
        } catch (error) {
          // If offline, serve the cached offline page
          const offlineCache = await caches.open(CACHE_NAMES.offline);
          const cachedOffline = await offlineCache.match(OFFLINE_URL);
          return cachedOffline || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  // CSS files: never cache, always network-only
  if (request.destination === 'style' || request.url.endsWith('.css')) {
    event.respondWith(fetch(request));
    return;
  }

  // library.js – cache-first (updated via Periodic Sync or Push)
  if (request.url === LIBRARY_URL) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }
        // Fallback: fetch and cache (should rarely happen because we pre-cache)
        const networkResponse = await fetch(request);
        const libraryCache = await caches.open(CACHE_NAMES.library);
        await libraryCache.put(request, networkResponse.clone());
        return networkResponse;
      })()
    );
    return;
  }

  // Images from specific folders – cache-first (updated via Periodic Sync only)
  if (IMAGE_PREFIXES.some(prefix => request.url.startsWith(prefix))) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }
        // Not in cache yet: fetch and store
        const networkResponse = await fetch(request);
        const imagesCache = await caches.open(CACHE_NAMES.images);
        await imagesCache.put(request, networkResponse.clone());
        return networkResponse;
      })()
    );
    return;
  }

  // Everything else – network only (you can add a fallback if needed)
  event.respondWith(fetch(request));
});

// ============================================================
// PERIODIC SYNC – update caches in the background
// ============================================================
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-library') {
    event.waitUntil(updateLibraryCache());
  } else if (event.tag === 'update-images') {
    event.waitUntil(updateImageCache());
  }
});

async function updateLibraryCache() {
  const cache = await caches.open(CACHE_NAMES.library);
  const freshResponse = await fetch(LIBRARY_URL);
  if (freshResponse.ok) {
    await cache.put(LIBRARY_URL, freshResponse);
  }
}

async function updateImageCache() {
  // Simplest approach: clear the entire images cache.
  // Next time each image is requested, it will be re-fetched from the network.
  // For a more granular update, you could fetch a list of image URLs from an endpoint.
  const cache = await caches.open(CACHE_NAMES.images);
  const keys = await cache.keys();
  await Promise.all(keys.map(req => cache.delete(req)));
}

// ============================================================
// PUSH NOTIFICATIONS – optional instant update for library.js
// ============================================================
self.addEventListener('push', event => {
  if (!event.data) return;

  const payload = event.data.json();
  if (payload && payload.type === 'update-library') {
    event.waitUntil(updateLibraryCache());
  }
});