/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------
function showText(responseAsText) {
  console;
  const message = document.getElementById("message");
  message.textContent = responseAsText;
}

function responseAsText(response) {
  const log = response.json();
  return log;
}

function showImage(responseAsBlob) {
  const container = document.getElementById("img-container");
  const imgElm = document.createElement("img");
  container.appendChild(imgElm);
  const imageURL = URL.createObjectURL(responseAsBlob);
  imgElm.src = imageURL;
}

function readResponseAsBlob(response) {
  return response.blob();
}

function validateResult(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  var myHeaders = new Headers();
  console.log(myHeaders.get("Content-Length"));
  return response;
}

function readResponseAsJson(response) {
  return response.json();
}

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log("Looks like there was a problem:", error);
}

// Fetch JSON ----------

function fetchJSON() {
  // TODO
  fetch("examples/animals.json")
    .then(validateResult)
    .then(readResponseAsJson)
    .then(logResult)
    .catch(logError);
}
const jsonButton = document.getElementById("json-btn");
jsonButton.addEventListener("click", fetchJSON);

// Fetch Image ----------

function fetchImage() {
  // TODO
  fetch("examples/fetching.jpg")
    .then(validateResult)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
}
const imgButton = document.getElementById("img-btn");
imgButton.addEventListener("click", fetchImage);

// Fetch text ----------

function fetchText() {
  // TODO`
  fetch("/examples/words.txt")
    .then(validateResult)
    .then(responseAsText)
    .then(showText)
    .catch(logError);
}
const textButton = document.getElementById("text-btn");
textButton.addEventListener("click", fetchText);

// HEAD request ----------

function headRequest() {
  // TODO
  fetch("/examples/words.txt", {
    method: "HEAD"
  })
    .then(validateResult)
    .then(responseAsText)
    .then(showText)
    .catch(logError);
}
const headButton = document.getElementById("head-btn");
headButton.addEventListener("click", headRequest);

// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  // TODO
  fetch("http://localhost:5000/", {
    method: "POST",
    body: "name=david&message=hello"
  })
    .then(validateResult)
    .then(responseAsText)
    .then(showText)
    .catch(logError);
}
const postButton = document.getElementById("post-btn");
postButton.addEventListener("click", postRequest);
