// These two events only fire when there's be a byte difference in new and old service worker.

// Install Service Worker
self.addEventListener("install", evt => {
  console.log("Service worker installing");
  self.skipWaiting();
});

// When service worker get activated
self.addEventListener("activate", event => {
  console.log("Service worker activating.");
});

// Intercept network requests
self.addEventListener("fetch", evt => {
  console.log(evt.request.url, "url");
});
