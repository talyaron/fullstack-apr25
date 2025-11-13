import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import eventRouter from './routes/event.routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static client
app.use(express.static(path.join(__dirname, '..', 'public')));

// API
app.use('/api/events', eventRouter);

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

async function start() {
  const uri = process.env.MONGO_URI!;
  if (!uri) throw new Error('MONGO_URI is required');
  await mongoose.connect(uri);
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`EventSpark listening on :${PORT}`));
}

start().catch((e) => {
  console.error('Failed to start:', e);
  process.exit(1);
});
