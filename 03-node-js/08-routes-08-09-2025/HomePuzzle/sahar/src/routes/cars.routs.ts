import express from 'express'
import { addCar, deleteCar, getAllCars, getAvailableCars, getCarById, searchCars, updateCarPrice } from '../controllers/cars.controllers';
const router = express.Router();

router.get("/all-cars", getAllCars);
router.post('/add-car', addCar);
router.put('/update-car', updateCarPrice);
router.get("/car-details" , getCarById);
router.delete("/car-delete" , deleteCar);
router.get("/available-cars" , getAvailableCars );
router.get("/search-cars",searchCars)

export default router;  