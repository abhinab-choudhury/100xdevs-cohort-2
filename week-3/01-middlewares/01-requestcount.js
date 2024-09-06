const request = require("supertest");
const assert = require("assert");
const express = require("express");

const app = express();
let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

app.use((_req, _res, next) => {
  requestCount++;
  next();
});
app.use(express.json());

app.get("/", function (_req, res) {
  res.send("Server is Healthy");
});

app.get("/user", function (_req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  const { username } = req.body;
  res.status(200).json({ user: username });
});

app.get("/requestCount", function (_req, res) {
  res.status(200).json({ requestCount });
});

// Global Catch
app.use((err, req, res, next) => {
  console.log("Error :", err);
  res.send(500).json({ message: "Internal Server Error" });
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});

module.exports = app;
