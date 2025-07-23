import { Request, Response } from 'express';
import { DeviceData } from '../models/DeviceData';

export const addDeviceData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { device_type, data, timestamp } = req.body;
    if (!device_type || !data) {
      return res.status(400).json({ message: 'device_type and data are required' });
    }
    const deviceData = await DeviceData.create({
      user_id: userId,
      device_type,
      data,
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });
    res.status(201).json(deviceData);
  } catch (error) {
    res.status(500).json({ message: 'Error saving device data', error });
  }
};

export const getDeviceData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const data = await DeviceData.findByUserId(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device data', error });
  }
};