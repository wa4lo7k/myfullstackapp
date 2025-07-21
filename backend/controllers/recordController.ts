import { Request, Response } from 'express';
import HealthRecord from '../models/HealthRecord';
import Notification from '../models/Notification';
import { io, userSockets } from '../server';
import { randomBytes, hexlify } from 'ethers';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const record = new HealthRecord(req.body);
    await record.save();
    // Notify patient
    const userId = record.userId.toString();
    const message = `New test result uploaded: ${record.type}`;
    const notification = new Notification({ userId, message });
    await notification.save();
    const socketId = userSockets.get(userId);
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
    const records = await HealthRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
};

export const getRecordById = async (req: Request, res: Response) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record', error });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const record = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const record = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error });
  }
}; 