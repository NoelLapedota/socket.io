const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const chat = require("./routing/chat.js");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = {};

io.on("connection", (socket) => {
  // Event listener for new user connection
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  // Event listener for user disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });

  // Emit a chat message to the current socket
  socket.emit("chat-message", "Hi");

  // Event listener for sending chat messages
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
});

app.use("/api/v1", chat);

module.exports = server;
