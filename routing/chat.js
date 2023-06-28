const express = require("express");

const router = express.Router();
const path = require("path");

const chat = router.get("/chat", async (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

module.exports = chat;
