import { Request, Response } from 'express';
import DeviceData from '../models/DeviceData';

export const addDeviceData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { deviceType, readings, timestamp } = req.body;
    if (!deviceType || !readings) {
      return res.status(400).json({ message: 'deviceType and readings are required' });
    }
    const deviceData = new DeviceData({ userId, deviceType, readings, timestamp: timestamp || new Date() });
    await deviceData.save();
    res.status(201).json(deviceData);
  } catch (error) {
    res.status(500).json({ message: 'Error saving device data', error });
  }
};

export const getDeviceData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const data = await DeviceData.find({ userId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device data', error });
  }
}; 