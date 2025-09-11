import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const port = 3000;

mongoose.connect('').then(() => {
  console.log("Connected to MongoDB");
}).catch(err =>{
  console.error("Failed to connect to MongoDB", err);
})

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import studentRoutes from './routes/students.route';
app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});