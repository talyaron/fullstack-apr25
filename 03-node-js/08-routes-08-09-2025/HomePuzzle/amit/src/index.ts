import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import studentRoutes from './routes/students.route';
app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});