const initFilesToCache = [
  "/",
  "style/main.css",
  "images/still_life_medium.jpg",
  "index.html",
  "pages/offline.html",
  "pages/404.html"
];

let staticCacheName = "pages-cache-v1";

self.addEventListener("install", event => {
  console.log("Attempting to install service worker and cache static assets");

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(initFilesToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  const url = event.request.url;
  console.log("Fetch for : ", url);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          console.log("Found ", url, "in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request).then(response => {
          console.log(response.status, "status");
          if (response.status === 404) {
            return caches.match("pages/404.html");
          }
          return caches.open(staticCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        return caches.match("pages/offline.html");
      })
  );
});

self.addEventListener("activate", event => {
  console.log("Activating new service worker...");

  const cacheWhitelist = ["pages-cache-v2"];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      cacheNames.map(cacheName => {
        if (cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      });
    })
  );
});
