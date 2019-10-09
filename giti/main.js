// Registering service worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", event => {
    navigator.serviceWorker.register("./sw.js").then(
      registration => {
        console.log(
          "Service worker registered successfully",
          registration.scope
        );
      },
      err => {
        console.log("Service Worker registration failed", err);
      }
    );
  });
}

const INITIAL_API_URI = "https://api.github.com/users";

// Fetching API DATA
const userName = document.getElementById("username");
const submitBtn = document.getElementById("get-user");
const root = document.getElementById("root");
const form = document.querySelector("form");
let userData = {};

const displayData = data => `
	<div>
		<p>Login - ${data.login}</p>
		<p>Name - ${data.name}</p>
		<p>Bio - ${data.bio}</p>
		<img src="${data.avatar_url}"/>
	</div>
`;

const getUserData = async event => {
  event.preventDefault();
  root.innerHTML = "";
  const userNameValue = userName.value;

  const response = await fetch(`${INITIAL_API_URI}/${userNameValue}`);
  userData = await response.json();

  root.innerHTML = displayData(userData);
};

submitBtn.addEventListener("submit", getUserData);
form.addEventListener("submit", getUserData);
