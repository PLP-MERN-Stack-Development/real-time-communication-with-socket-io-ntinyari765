import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Store rooms and user info
const users = {};

io.on("connection", (socket) => {
  const { username, room } = socket.handshake.query;
  users[socket.id] = { username, room: room || "General" };
  console.log(`${username} connected: ${socket.id}`);

  // Join room
  socket.join(users[socket.id].room);

  // Notify users
  io.to(users[socket.id].room).emit(
    "chat message",
    `${username} has joined ${users[socket.id].room}`
  );

  // Handle chat messages
  socket.on("chat message", (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    io.to(users[socket.id].room).emit(
      "chat message",
      { text: msg, username: username, timestamp, id: Date.now(), reactions: {} }
    );
  });

  // Typing indicator
  socket.on("typing", (isTyping) => {
    socket.to(users[socket.id].room).emit("typing", { username, isTyping });
  });

  // Read receipt
  socket.on("read message", (messageId) => {
    socket.to(users[socket.id].room).emit("message read", { messageId, username });
  });

  // Add reaction
  socket.on("react message", ({ messageId, reaction }) => {
    socket.to(users[socket.id].room).emit("message reacted", { messageId, reaction, username });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
    io.to(users[socket.id].room).emit(`${username} has left ${users[socket.id].room}`);
    delete users[socket.id];
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});


