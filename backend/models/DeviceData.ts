import mongoose, { Document, Schema } from 'mongoose';

export interface IDeviceData extends Document {
  userId: mongoose.Types.ObjectId;
  deviceType: string;
  readings: any;
  timestamp: Date;
}

const DeviceDataSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceType: { type: String, required: true },
  readings: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IDeviceData>('DeviceData', DeviceDataSchema); 