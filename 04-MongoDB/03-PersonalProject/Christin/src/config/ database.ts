import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI לא מוגדר בקובץ .env');
    }
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB התחבר בהצלחה');
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ שגיאת MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB התנתק');
    });
    
  } catch (error) {
    console.error('❌ שגיאה בהתחברות ל-MongoDB:', error);
    process.exit(1);
  }
};