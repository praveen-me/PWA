const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKeys =
  "BD6MMsPdgwNqjdCLi2rq83Eav-kaDm-Fbgzh55rJjE0cJQcNYuDs6KOaoGIBohjlGvJx7_-iUOmbjJF3_4oAjR8";
const privateVapidKeys = "NaE7Jf5UP6nRLYnwFb4tKh2shXBsryKYpRDWOwuQvDI";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKeys,
  privateVapidKeys
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Push Test"
  });

  webpush.sendNotification(subscription, payload).catch(e => console.log(e));
});

app.listen(3005, () => {
  console.log("http://localhost:3005");
});
