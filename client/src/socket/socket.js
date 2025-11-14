import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
let socket;
let username = "";
let room = "";

export const connectSocket = () => {
  username = prompt("Enter your username") || "Anonymous";
  room = prompt("Enter room name") || "General";
  socket = io(URL, { query: { username, room } });

  socket.on("connect", () => 
    console.log("Connected as", username, "to room", room)
  );
};

export const getSocket = () => socket;
export const getUsername = () => username;
export const getRoom = () => room;


