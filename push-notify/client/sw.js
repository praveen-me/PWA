console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();

  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "A sample push notification",
    icon: "https://image.flaticon.com/icons/svg/145/145859.svg"
  });
});
