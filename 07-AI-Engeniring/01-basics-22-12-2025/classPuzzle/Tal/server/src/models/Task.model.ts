import mongoose, { Document, Schema } from 'mongoose';
import type { ResultsSettings } from '@space-task/shared';

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
  settings?: ResultsSettings;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    default: '',
    maxlength: 2000,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  settings: {
    resultsBy: {
      type: String,
      enum: ['priority', 'dueDate', 'createdAt'],
      default: 'createdAt',
    },
    cutoffNumber: {
      type: Number,
      default: 10,
      min: 1,
      max: 100,
    },
    cutoffBy: {
      type: String,
      enum: ['count', 'date'],
      default: 'count',
    },
    sortOrder: {
      type: String,
      enum: ['asc', 'desc'],
      default: 'desc',
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

taskSchema.index({ userId: 1, createdAt: -1 });

export const Task = mongoose.model<ITask>('Task', taskSchema);
