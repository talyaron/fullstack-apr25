import mongoose, { Schema, Document } from 'mongoose';

export interface IConnections {
  north?: string;
  south?: string;
  east?: string;
  west?: string;
  up?: string;
  down?: string;
  [key: string]: string | undefined;
}

export interface IRoom extends Document {
  title: string;
  description: string;
  imageAsset: string;
  connections: IConnections;
  puzzles: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    imageAsset: {
      type: String,
      default: ''
    },
    connections: {
      type: Map,
      of: String,
      default: {}
    },
    puzzles: [{
      type: Schema.Types.ObjectId,
      ref: 'Puzzle'
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRoom>('Room', RoomSchema);
