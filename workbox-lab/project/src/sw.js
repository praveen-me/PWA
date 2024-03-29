importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

if (workbox) {
  console.log("Yay! Workbox is loaded 🥳.");
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    /images(.*)\.(?:jpg|png|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAge: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    /images\/icon\/*/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "icon-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 5,
          maxAge: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  const renderValidResponse = response => {
    if (!response) {
      return caches.match("pages/offline.html");
    } else if (response.status === 404) {
      return caches.match("pages/404.html");
    }
    return response;
  };

  const articleHandler = workbox.strategies.networkFirst({
    cacheName: "articles-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ]
  });

  workbox.routing.registerRoute(/(.*)article(.*)\.html/, args =>
    articleHandler.handle(args).then(response => renderValidResponse(response))
  );

  const postHandler = workbox.strategies.networkFirst({
    cacheName: "posts-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ]
  });

  workbox.routing.registerRoute(/(.*)post(.*)\.html/, args =>
    postHandler.handle(args).then(response => renderValidResponse(response))
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
