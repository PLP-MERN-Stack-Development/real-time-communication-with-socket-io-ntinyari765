import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
export const socket = io(URL, { autoConnect: false });

export function connectSocket() {
  if (!socket.connected) socket.connect();
  socket.on('connect', () => {
    console.log('connected to server:', socket.id);
    socket.emit('client:hello', { msg: 'hi server!', time: Date.now() });
  });
  socket.on('server:hello', (data) => {
    console.log('server says:', data);
  });
  socket.on('disconnect', (reason) => {
    console.log('socket disconnected:', reason);
  });
}
