import express, { Express, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app: Express = express();
const port = 3000;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Ari7:newpassword123@cluster0.y0awkmn.mongodb.net/idigitaly?retryWrites=true&w=majority');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist')));

// Routes
import authRouter from './routes/auth.route';
app.use('/api/auth', authRouter);

// Route לדף הבית
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});