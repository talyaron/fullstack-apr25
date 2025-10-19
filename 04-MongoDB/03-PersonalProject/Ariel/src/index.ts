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
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CRITICAL: Set correct MIME types
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.type('text/css');
  } else if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use('/auth', express.static(path.join(__dirname, 'auth/dist')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', express.static(path.join(__dirname, 'auth')));

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


