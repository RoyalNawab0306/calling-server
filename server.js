const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("call-user", (data) => {
    io.to(data.to).emit("incoming-call", data);
  });

  socket.on("answer-call", (data) => {
    io.to(data.to).emit("call-answered", data);
  });

  socket.on("ice-candidate", (data) => {
    io.to(data.to).emit("ice-candidate", data);
  });

});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
