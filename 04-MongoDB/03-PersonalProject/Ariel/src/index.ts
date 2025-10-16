import express, { Express, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Ari7:ZWd9YPpQVhtUBIXb@cluster0.y0awkmn.mongodb.net/idigitaly?retryWrites=true&w=majority';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware - סדר חשוב!
app.use(cookieParser());  // 🍪 ראשון!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use('/auth', express.static(path.join(__dirname, 'auth')));
app.use('/auth', express.static(path.join(__dirname, 'auth/dist')));

// Routes
import authRouter from './routes/auth.route';
app.use('/api/auth', authRouter);

// Route לדף הבית
app.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes לתיקיית public
app.get('/public/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/public', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route לדף auth/login
app.get('/auth/login.html', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, 'auth', 'login.html'));
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any): void => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

app.listen(port, (): void => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});