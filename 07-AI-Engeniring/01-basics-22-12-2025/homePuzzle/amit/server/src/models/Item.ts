import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  type?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'tool'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IItem>('Item', ItemSchema);
