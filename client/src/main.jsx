import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { connectSocket } from "./socket/socket";
import "./index.css";

connectSocket();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);



