import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'שם המוצר הוא שדה חובה'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'מחיר הוא שדה חובה'],
    min: [0, 'המחיר חייב להיות חיובי']
  },
  quantity: {
    type: Number,
    required: [true, 'כמות היא שדה חובה'],
    min: [0, 'הכמות חייבת להיות חיובית'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'קטגוריה היא שדה חובה'],
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// אינדקס לחיפוש מהיר
productSchema.index({ userId: 1, name: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);