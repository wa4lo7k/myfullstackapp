import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import appointmentsRoutes from './routes/appointments';
import recordsRoutes from './routes/records';
import notificationsRoutes from './routes/notifications';
import devicesRoutes from './routes/devices';
import aiRoutes from './routes/ai';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Map to store userId <-> socketId
const userSockets = new Map<string, string>();

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('register', (userId: string) => {
    console.log('Register event for userId:', userId, 'socket:', socket.id);
    userSockets.set(userId, socket.id);
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
    for (const [userId, sockId] of userSockets.entries()) {
      if (sockId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/devices', devicesRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.get('/', (req, res) => {
  res.send('Welcome to the HealthSync Healthcare System API!');
});

if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app, server, io, userSockets }; 