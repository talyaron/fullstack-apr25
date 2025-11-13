import mongoose, { Document, Schema, Model } from 'mongoose';

// Book interface
export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  year?: number;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type SeedBook = {
  title: string;
  author: string;
  description?: string;
  year?: number;
};

// Book Schema
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title must be at least 1 character long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters long'],
      maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    year: {
      type: Number,
      min: [0, 'Year must be a positive number'],
      max: [new Date().getFullYear() + 10, 'Year cannot be too far in the future'],
      validate: {
        validator: Number.isInteger,
        message: 'Year must be an integer'
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const initialBooks: SeedBook[] = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel",
    year: 1925
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian social science fiction novel",
    year: 1949
  }
];

// Compound index for user-specific queries
bookSchema.index({ userId: 1, createdAt: -1 });
bookSchema.index({ userId: 1, title: 1 });

// Remove __v from JSON output
bookSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;