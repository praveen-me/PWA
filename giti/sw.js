const CACHE_NAME = "cache-v1";
const URLS_TO_CACHE = ["/", "/main.js"];

console.log("hello world");

// Steps to install
// 1 - Open a cache
// 2 - Cache all files
// 3 - Confirm weather it cached successfully or not
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Fetches form cache
self.addEventListener("fetch", event => {
  console.log(event.request, "request");
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });

          return response;
        }
      });
    })
  );
});

self.addEventListener("activate", event => {
  const cacheWhiteList = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
