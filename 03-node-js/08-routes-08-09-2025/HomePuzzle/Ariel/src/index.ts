import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import router from './routes/cars.route';
app.use('/api/Cars', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});