import express, { Express } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/students.route';
dotenv.config();

const app: Express = express();
const port = 3000;

const mongooseUri = process.env.mongodbUri;

if (!mongooseUri) {
  throw new Error("MongoDB connection string is not defined in environment variables");
}

mongoose.connect(`${mongooseUri}/Test`).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});