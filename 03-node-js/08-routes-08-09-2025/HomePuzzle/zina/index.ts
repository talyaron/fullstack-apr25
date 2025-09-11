import express from 'express';
import carsRoutes from './routes/cars.routs';
import { loadCarsFromFile } from './model/car.model';

const app = express();
const PORT = 3000;

app.use(express.json());
loadCarsFromFile(); // Load cars from file on server start

// Middleware for logging requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/cars', carsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
