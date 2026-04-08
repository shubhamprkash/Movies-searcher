const CACHE_NAME = "movies-searcher-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/static/css/main.css",
  "/static/js/main.js",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Network first strategy for API calls, Cache first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // For API calls, use network first strategy
  if (request.url.includes("omdbapi.com")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request);
        })
    );
  } else {
    // For other requests (assets), use cache first strategy
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});
