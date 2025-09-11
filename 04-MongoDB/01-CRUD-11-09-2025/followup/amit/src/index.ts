import express, { Express } from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app: Express = express();
const port = 3000;

mongoose.connect("mongodb+srv://Amit:Amitr585585467@atlascluster.ttupk.mongodb.net/Test").then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import studentRoutes from './routes/students.route';
app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});