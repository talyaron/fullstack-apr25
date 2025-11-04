import { Schema, model, Document } from 'mongoose';

export interface Initiative extends Document {
  title: string;
  description: string;
  createdAt?: Date;
}

const initiativesSchema = new Schema<Initiative>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Initiatives = model<Initiative>('Initiatives', initiativesSchema);

export default Initiatives;