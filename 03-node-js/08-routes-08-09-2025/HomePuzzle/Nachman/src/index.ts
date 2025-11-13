import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();
const port = 3005;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import carRoutes from './routes/cars.route';
app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
