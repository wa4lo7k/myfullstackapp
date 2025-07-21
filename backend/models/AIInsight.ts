import mongoose, { Document, Schema } from 'mongoose';

export interface IAIInsight extends Document {
  userId: mongoose.Types.ObjectId;
  summary: string;
  recommendations: string;
  createdAt: Date;
}

const AIInsightSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  summary: { type: String, required: true },
  recommendations: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAIInsight>('AIInsight', AIInsightSchema); 