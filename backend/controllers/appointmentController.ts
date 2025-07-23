import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { Notification } from '../models/Notification';
import { io, userSockets } from '../server';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patient_id, doctor_id, date, notes } = req.body;
    if (!patient_id || !doctor_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const appointment = await Appointment.create({
      patient_id,
      doctor_id,
      date: new Date(date),
      status: 'scheduled',
      notes
    });
    // Notify doctor
    const message = `New appointment scheduled for ${appointment.date}`;
    const notification = await Notification.create({
      user_id: doctor_id,
      message,
      type: 'appointment',
      read: false
    });
    const socketId = userSockets.get(doctor_id.toString());
    if (socketId) {
      console.log('Emitting notification to socket:', socketId, 'for doctorId:', doctor_id);
      io.to(socketId).emit('notification', {
        type: 'appointment_created',
        appointmentId: appointment.id,
        message
      });
    }
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error in createAppointment:', error);
    res.status(500).json({ error: 'Error creating appointment', details: error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error in getAppointments:', error);
    res.status(500).json({ error: 'Error fetching appointments', details: error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(parseInt(req.params.id));
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { date, status, notes } = req.body;
    if (!date && !status && !notes) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    const updates: any = {};
    if (date) updates.date = new Date(date);
    if (status) updates.status = status;
    if (notes) updates.notes = notes;

    const appointment = await Appointment.updateById(parseInt(req.params.id), updates);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error in updateAppointment:', error);
    res.status(500).json({ error: 'Error updating appointment', details: error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const deleted = await Appointment.deleteById(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    res.status(500).json({ error: 'Error deleting appointment', details: error });
  }
};