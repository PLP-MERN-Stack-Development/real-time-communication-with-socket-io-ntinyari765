import React from "react";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">💬 Chat Room</h1>
          <p className="app-subtitle">Real-Time Communication</p>
        </div>
      </header>
      <main className="app-main">
        <Chat />
      </main>
    </div>
  );
}

export default App;


