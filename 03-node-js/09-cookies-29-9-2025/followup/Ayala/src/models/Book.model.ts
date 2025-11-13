import mongoose, { Schema, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  genre: string;
  userId: Types.ObjectId;
}

const BookSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model<IBook>('Book', BookSchema);