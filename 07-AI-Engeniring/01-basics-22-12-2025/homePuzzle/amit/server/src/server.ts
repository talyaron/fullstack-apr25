import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import roomRoutes from './routes/roomRoutes';
import puzzleRoutes from './routes/puzzleRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.get('/api/health', (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Station Zero API is running',
    timestamp: new Date().toISOString()
  });
});

app.use((_, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
