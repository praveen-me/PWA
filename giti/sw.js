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
