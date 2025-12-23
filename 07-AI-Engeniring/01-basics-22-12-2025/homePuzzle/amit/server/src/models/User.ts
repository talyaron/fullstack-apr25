import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  currentRoom: mongoose.Types.ObjectId;
  score: number;
  inventory: mongoose.Types.ObjectId[];
  completedPuzzles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    currentRoom: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      default: null
    },
    score: {
      type: Number,
      default: 0,
      min: 0
    },
    inventory: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],
    completedPuzzles: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
