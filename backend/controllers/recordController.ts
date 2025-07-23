import { Request, Response } from 'express';
import { HealthRecord } from '../models/HealthRecord';
import { Notification } from '../models/Notification';
import { io, userSockets } from '../server';
import { randomBytes, hexlify } from 'ethers';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { user_id, type, data, date } = req.body;
    const record = await HealthRecord.create({
      user_id,
      type,
      data,
      date: date ? new Date(date) : new Date()
    });
    // Notify patient
    const message = `New test result uploaded: ${record.type}`;
    const notification = await Notification.create({
      user_id: record.user_id,
      message,
      type: 'health_record',
      read: false
    });
    const socketId = userSockets.get(record.user_id.toString());
    if (socketId) {
      io.to(socketId).emit('notification', { message });
    }
    // Ethereum logging (mock)
    const dummyTxHash = hexlify(randomBytes(32));
    console.log(`Ethereum log: Health record created. TxHash: ${dummyTxHash}`);
    res.status(201).json({ record, ethereumTx: dummyTxHash });
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error });
  }
};

export const getRecords = async (req: Request, res: Response) => {
  try {
    const records = await HealthRecord.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
};

export const getRecordById = async (req: Request, res: Response) => {
  try {
    const record = await HealthRecord.findById(parseInt(req.params.id));
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record', error });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const record = await HealthRecord.updateById(parseInt(req.params.id), req.body);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const deleted = await HealthRecord.deleteById(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error });
  }
};