import request from 'supertest';
import { app } from '../server'; // Adjust path
import User from '../models/User'; // Use default import for User model
import Appointment from '../models/Appointment'; // Use default import for Appointment model

describe('Appointments API', () => {
  let patientToken: string;
  let patientId: string;
  let doctorId: string;

  beforeEach(async () => {
    await User.deleteMany({});
    await Appointment.deleteMany({});

    // Register a patient
    const patientRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Patient User',
        email: 'patient@example.com',
        password: 'password123',
        role: 'patient',
      });
    patientToken = patientRes.body.token;
    patientId = patientRes.body.user._id;

    // Register a doctor
    const doctorRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Doctor User',
        email: 'doctor@example.com',
        password: 'password123',
        role: 'doctor',
      });
    doctorId = doctorRes.body.user._id;
  });

  it('should create an appointment successfully', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        patientId,
        doctorId,
        datetime: new Date().toISOString(),
        reason: 'Routine Checkup',
        status: 'scheduled',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('reason', 'Routine Checkup');
    expect(response.body.patientId).toBe(patientId);
    expect(response.body.doctorId).toBe(doctorId);
  });

  it('should fail to create appointment without authentication', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .send({
        patientId,
        doctorId,
        datetime: new Date().toISOString(),
        reason: 'Routine Checkup',
        status: 'scheduled',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should fetch appointments for authenticated user', async () => {
    await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        patientId,
        doctorId,
        datetime: new Date().toISOString(),
        reason: 'Routine Checkup',
        status: 'scheduled',
      });

    const response = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('reason', 'Routine Checkup');
  });

  it('should update an appointment successfully', async () => {
    const createResponse = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        patientId,
        doctorId,
        datetime: new Date().toISOString(),
        reason: 'Routine Checkup',
        status: 'scheduled',
      });

    const appointmentId = createResponse.body._id;

    const response = await request(app)
      .put(`/api/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        reason: 'Updated Checkup',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('reason', 'Updated Checkup');
  });

  it('should delete an appointment successfully', async () => {
    const createResponse = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        patientId,
        doctorId,
        datetime: new Date().toISOString(),
        reason: 'Routine Checkup',
        status: 'scheduled',
      });

    const appointmentId = createResponse.body._id;

    const response = await request(app)
      .delete(`/api/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${patientToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
}); 