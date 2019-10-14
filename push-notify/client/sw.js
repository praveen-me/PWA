console.log("Service Worker Loaded");

self.addEventListener("push", event => {
  const data = event.data.json();

  console.log("Push received...");

  self.registration.showNotification({
    body: "This is a push notification",
    icon: "https://image.flaticon.com/icons/svg/145/145859.svg"
  });
});
