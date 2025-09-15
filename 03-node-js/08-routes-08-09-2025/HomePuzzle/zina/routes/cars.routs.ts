import { Router } from 'express';
import { getAllCars, addCar, updateCarPrice } from '../controllers/cars.controlles';

const router = Router();

router.get('/all-cars', getAllCars);
router.post('/add-car', addCar);
router.patch('/update-price', updateCarPrice);

export default router;
