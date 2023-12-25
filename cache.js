const cache = new Map();

cache.set(1, "nour");

console.log(cache.get(1));
console.log(cache.get(2));

const express = require("express");

const app = express();

app.get("/x", (req, res) => {
  res.send("hi nour");
});

app.listen(4000);
