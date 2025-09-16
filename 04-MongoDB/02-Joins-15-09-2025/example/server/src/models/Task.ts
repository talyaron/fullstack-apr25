import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  done: boolean;
  level: number;
  userId: Types.ObjectId;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  userId: {
    type: Schema.Types.ObjectId, // reference to User model
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ITask>('Task', TaskSchema); //collection name 'tasks'