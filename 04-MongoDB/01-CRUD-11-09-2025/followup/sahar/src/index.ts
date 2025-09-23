import express, { Express, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 3000;


const MONGODB_URI = `mongodb+srv://sahar14s:SahaR132455@fullstack.zwb00jx.mongodb.net`;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
}


mongoose.connect(`${MONGODB_URI}/students`).then(() => {
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