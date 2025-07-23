import request from 'supertest';
import { app, server, io, userSockets } from '../server';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';
import { Notification } from '../models/Notification';
let runningServer: any;

beforeAll((done) => {
  runningServer = server.listen(3000, done);
});

afterAll((done) => {
  runningServer.close(done);
});

beforeEach(async () => {
  await User.deleteMany({});
  await Appointment.deleteMany({});
  await Notification.deleteMany({});
  userSockets.clear();
});

describe('Socket.IO Notifications', () => {
  it('should emit notification when appointment is created', async () => {
    // Register and login the user to get a token
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'patient',
      });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    const token = loginRes.body.token;
    const user = loginRes.body.user;

    // Connect to Socket.IO
    const socket = require('socket.io-client')('http://localhost:3000');
    
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Test timed out'));
      }, 40000);

      socket.on('connect', () => {
        console.log('Socket connected in test');
        
        // Register the user with the socket
        socket.emit('register', (user._id as any).toString());
        
        // Add a small delay to ensure registration is processed
        setTimeout(async () => {
          try {
            // Create an appointment that should trigger a notification
            const response = await request(app)
              .post('/api/appointments')
              .set('Authorization', `Bearer ${token}`)
              .send({
                patientId: user._id,
                doctorId: user._id, // Using same user as doctor for simplicity
                datetime: new Date().toISOString(),
                status: 'scheduled',
                reason: 'Test appointment'
              });

            expect(response.status).toBe(201);
            
            // Wait a bit for the notification to be emitted
            setTimeout(() => {
              socket.disconnect();
              clearTimeout(timeout);
              resolve();
            }, 1000);
          } catch (error) {
            clearTimeout(timeout);
            reject(error);
          }
        }, 500); // 500ms delay after registration
      });

      socket.on('notification', (data: any) => {
        console.log('Notification received:', data);
        expect(data).toBeDefined();
        expect(data.type).toBe('appointment_created');
        expect(data.appointmentId).toBeDefined();
        socket.disconnect();
        clearTimeout(timeout);
        resolve();
      });

      socket.on('connect_error', (error: any) => {
        console.error('Socket connection error:', error);
        clearTimeout(timeout);
        reject(error);
      });
    });
  }, 40000);
}); 