import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { connectSocket } from './socket/socket'

connectSocket() // connect as app boots

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

