import express, { Express, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
// import recipeRoutes from './routes/recipeRouts';

dotenv.config();

const MONGODB = process.env.mongodburl
const app: Express = express();
const port = 3005;

mongoose.connect(`${MONGODB}fs-apr25`).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
})

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
