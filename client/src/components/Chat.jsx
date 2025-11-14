import React, { useState, useEffect, useRef } from "react";
import { getSocket, getUsername, getRoom } from "../socket/socket";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const socket = getSocket();
  const username = getUsername();
  const room = getRoom();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", (msg) => setMessages((prev) => [...prev, msg]));

    socket.on("typing", ({ username: typingUser, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping) return [...new Set([...prev, typingUser])];
        return prev.filter((u) => u !== typingUser);
      });
    });

    socket.on("message read", ({ messageId, username: reader }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, readBy: [...(msg.readBy || []), reader] } : msg
        )
      );
    });

    socket.on("message reacted", ({ messageId, reaction, username: reactor }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, reactions: { ...msg.reactions, [reactor]: reaction } }
            : msg
        )
      );
    });

    return () => {
      socket.off("chat message");
      socket.off("typing");
      socket.off("message read");
      socket.off("message reacted");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("chat message", message);
    socket.emit("read message", Date.now());
    setMessage("");
    socket.emit("typing", false);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", e.target.value.length > 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reactToMessage = (msg, reaction) => {
    socket.emit("react message", { messageId: msg.id, reaction });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="room-info">
          <h2 className="room-title">🌐 {room || "Chat Room"}</h2>
          <p className="user-info">Connected as: <strong>{username || "Guest"}</strong></p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start the conversation! 💬</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.username === username ? "own-message" : "other-message"}`}>
              <div className="message-bubble">
                <div className="message-header">
                  <span className="message-username">{msg.username}</span>
                  {msg.timestamp && <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>}
                </div>
                <div className="message-text">{msg.text || msg}</div>
                <div className="message-footer">
                  <div className="message-reactions">
                    <button
                      className="reaction-btn"
                      onClick={() => reactToMessage(msg, "👍")}
                      title="Like"
                    >
                      👍
                    </button>
                    <button
                      className="reaction-btn"
                      onClick={() => reactToMessage(msg, "❤️")}
                      title="Love"
                    >
                      ❤️
                    </button>
                    <button
                      className="reaction-btn"
                      onClick={() => reactToMessage(msg, "😂")}
                      title="Laugh"
                    >
                      😂
                    </button>
                    <button
                      className="reaction-btn"
                      onClick={() => reactToMessage(msg, "😮")}
                      title="Surprised"
                    >
                      😮
                    </button>
                  </div>
                  {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                    <div className="reactions-display">
                      {Object.entries(msg.reactions).map(([user, reaction]) => (
                        <span key={user} className="reaction-tag">
                          {reaction} <span className="reaction-user">{user}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  {msg.readBy && msg.readBy.length > 0 && (
                    <div className="read-status">✓ Read by: {msg.readBy.join(", ")}</div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            <span className="typing-text">{typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing</span>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          className="message-input"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Shift+Enter for new line)"
          rows="2"
        />
        <button className="send-btn" onClick={sendMessage} disabled={!message.trim()}>
          <span>Send</span>
          <span className="send-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default Chat;



