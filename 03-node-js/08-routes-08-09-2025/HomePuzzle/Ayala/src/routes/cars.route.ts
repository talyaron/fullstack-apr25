import express from 'express'
import { Car, cars } from '../model/car.model.js';
import { getAllCars, addCar, updateCarPrice } from '../controllers/cars.controllers.js';
const router = express.Router();

router
    .get("/all-cars", getAllCars)
    .post("/add-car", addCar)
    .patch("/update-car-price", updateCarPrice);

export default router;
