import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  rank?: string;
  unit?: string;
  role: 'soldier' | 'commander' | 'admin';
  controlCenter?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    rank: {
      type: String,
    },
    unit: {
      type: String,
    },
    role: {
      type: String,
      enum: ['soldier', 'commander', 'admin'],
      default: 'soldier',
    },
    controlCenter: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;