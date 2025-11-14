# 💬 Real-Time Chat Application with Socket.io

A modern, fully-styled real-time chat application built with React and Socket.io. This application enables instant bidirectional communication between clients with a beautiful purple-themed interface.

## ✨ Features

### Core Features
- **Real-Time Messaging**: Instant message delivery using Socket.io WebSocket connections
- **Typing Indicators**: See when other users are typing with animated indicators
- **Read Receipts**: Track which users have read your messages
- **Emoji Reactions**: React to messages with emoji reactions (👍, ❤️, 😂, 😮)
- **User Presence**: Display connected users and their status
- **Multiple Chat Rooms**: Join different chat rooms for organized conversations

### UI/UX Features
- **Modern Purple Theme**: Beautiful dark purple color scheme with gradient accents
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Auto-Scroll**: Messages automatically scroll to the latest message
- **Smooth Animations**: Polished transitions and interactive feedback
- **Professional Layout**: Clean header, message area, and input section

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 7** - Fast build tool and dev server
- **Socket.io Client** - Real-time communication
- **CSS3** - Modern styling with CSS variables and gradients

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication

## 📁 Project Structure

```
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx            # Main chat component
│   │   │   └── Chat.css            # Chat styling
│   │   ├── socket/
│   │   │   └── socket.js           # Socket.io configuration
│   │   ├── App.jsx                 # App component
│   │   ├── App.css                 # App styling
│   │   ├── index.css               # Global styles & theme
│   │   ├── main.jsx                # React entry point
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── server.js                   # Express server & Socket.io setup
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-communication-with-socket-io
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   node server.js
   # Server runs on http://localhost:3001
   ```

2. **Start the client (in a new terminal)**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173 (or next available port)
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` and start chatting!

## 🎨 Theme Customization

The application uses CSS variables for easy theme customization. Edit `client/src/index.css` to change:

```css
:root {
  --primary-color: #a855f7;      /* Main purple */
  --primary-light: #d946ef;      /* Light purple */
  --primary-dark: #9333ea;       /* Dark purple */
  --bg-primary: #1a0b2e;         /* Dark background */
  --bg-secondary: #2d1b4e;       /* Secondary background */
  --text-primary: #f3e8ff;       /* Light text */
  /* ... more colors ... */
}
```

## 📱 Usage

1. **Enter a username and room** (configured on socket connection)
2. **Type your message** in the input field
3. **Press Enter** to send (or Shift+Enter for new line)
4. **React to messages** using the emoji reaction buttons
5. **See typing indicators** when others are typing
6. **View read receipts** to know who read your message

## 🔧 Socket.io Events

### Client → Server
- `chat message` - Send a new message
- `typing` - Notify when typing
- `read message` - Mark message as read
- `react message` - Add emoji reaction to message

### Server → Client
- `chat message` - Receive new message
- `typing` - Receive typing notification
- `message read` - Receive read receipt
- `message reacted` - Receive reaction update

## 🎯 Component Overview

### Chat Component (`Chat.jsx`)
Main component handling:
- Message display and rendering
- Input handling and message sending
- Socket event listeners
- Typing indicators and read receipts
- Emoji reactions

### Socket Configuration (`socket.js`)
Manages:
- Socket.io connection initialization
- Event handlers for real-time updates
- Connection state management

## 🌟 Advanced Features

✅ **Typing Indicators** - See when users are actively typing
✅ **Read Receipts** - Know when messages have been read
✅ **Emoji Reactions** - Express emotions with quick reactions
✅ **Smooth Animations** - Professional transitions and effects
✅ **Responsive Design** - Works on all device sizes
✅ **Modern UI** - Beautiful purple theme with gradients

## 📝 Built By

Created as a MERN Stack Development assignment - Week 5: Real-Time Communication with Socket.io

## 📄 License

This project is part of PLP Academy's MERN Stack Development course.
