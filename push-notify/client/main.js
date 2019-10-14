const publicVapidKeys =
  "BD6MMsPdgwNqjdCLi2rq83Eav-kaDm-Fbgzh55rJjE0cJQcNYuDs6KOaoGIBohjlGvJx7_-iUOmbjJF3_4oAjR8";

if ("serviceWorker" in navigator) {
  send().catch(err => console.log(err));
} else {
  console.log("There's no service worker. ☹️");
}

async function send() {
  console.log("Registering Service Worker...");
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/"
  });

  console.log("Service worker registered.");

  console.log("Registering Push");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKeys)
  });

  console.log("Push Registered.");

  console.log("Send Push Notification");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });

  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
