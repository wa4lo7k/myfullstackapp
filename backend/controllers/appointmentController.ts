import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Notification from '../models/Notification';
import { io, userSockets } from '../server';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patientId, doctorId, datetime, reason } = req.body;
    if (!patientId || !doctorId || !datetime || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const appointment = new Appointment(req.body);
    await appointment.save();
    // Notify doctor
    const doctorIdStr = appointment.doctorId.toString();
    const message = `New appointment scheduled for ${appointment.datetime}`;
    const notification = new Notification({ userId: doctorIdStr, message });
    await notification.save();
    const socketId = userSockets.get(doctorIdStr);
    if (socketId) {
      console.log('Emitting notification to socket:', socketId, 'for doctorId:', doctorIdStr);
      io.to(socketId).emit('notification', {
        type: 'appointment_created',
        appointmentId: appointment._id,
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
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error in getAppointments:', error);
    res.status(500).json({ error: 'Error fetching appointments', details: error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { reason, datetime, status, notes } = req.body;
    if (!reason && !datetime && !status && !notes) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error in updateAppointment:', error);
    res.status(500).json({ error: 'Error updating appointment', details: error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    res.status(500).json({ error: 'Error deleting appointment', details: error });
  }
}; 