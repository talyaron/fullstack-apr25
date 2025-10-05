import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import bookRoutes from './routes/bookRoutes';
import { anonymousUserMiddleware } from './middleware/userMiddlware';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

//add cookie parser




app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());


app.use('/api', userRoutes);
app.use('/api', anonymousUserMiddleware, taskRoutes);
app.use('/api/books', anonymousUserMiddleware, bookRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  app.get('/cookies', (req, res) => {
    res.cookie('exampleCookie', 'this is Tal', { httpOnly: true, maxAge: 1000*60*60*24 });
    res.send('Cookie has been set');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });