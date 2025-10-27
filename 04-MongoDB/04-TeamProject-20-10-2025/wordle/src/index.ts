import express, { Express } from 'express';
import path from "path";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import dataRoutes from './routes/dataRoutes';
import wordsRoutes from './routes/wordsRoutes'


dotenv.config();
const MONGODB = process.env.mongodburl
const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

mongoose.connect(`${MONGODB}fs-apr25`).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
})

app.use((req, _, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use('/user', userRoutes);
app.use('/data', dataRoutes);
app.use('/words', wordsRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





