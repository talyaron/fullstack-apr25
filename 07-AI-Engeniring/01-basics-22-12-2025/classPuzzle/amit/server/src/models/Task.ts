import mongoose, { Document, Schema } from 'mongoose';

export type Priority = 'low' | 'medium' | 'high';

export interface ITask extends Document {
  user_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: boolean;
  priority: Priority;
  due_date: Date | null;
  deleted_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  due_date: {
    type: Date,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Index for soft delete queries and sorting
taskSchema.index({ deleted_at: 1, user_id: 1, due_date: 1 });

export default mongoose.model<ITask>('Task', taskSchema);
