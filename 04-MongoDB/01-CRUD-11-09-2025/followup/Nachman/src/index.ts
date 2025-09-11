import express, { Express, Request, Response } from 'express';
import path from 'path';
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://matania1231:thevigil10@cluster0.ajj8bmb.mongodb.net/test').then(() => {
    console.log("Connected to MongoDB");
}).catch((err: Error) => {
    console.error("Error connecting to MongoDB:", err);
});



const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import studentRoutes from './routes/students.route';
app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});