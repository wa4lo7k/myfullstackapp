import mongoose, { Document, Schema } from 'mongoose';

export interface IHealthRecord extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  data: any;
  date: Date;
}

const HealthRecordSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema); 