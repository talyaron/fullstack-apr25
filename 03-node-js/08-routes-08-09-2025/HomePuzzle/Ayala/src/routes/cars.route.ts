import express from 'express'
import { Car, cars } from '../model/car.model.js';
import { addCar, deleteCar, getAllCars, getAvailableCars, getCarById, searchCars, updateCarPrice, updateValue } from '../controllers/cars.controllers';

const router = express.Router();

router
    .get("/all-cars", getAllCars)
    .get("/available", getAvailableCars)
    .get("/id/:id", getCarById)
    .get("/search", searchCars)
    .post("/add-car", addCar)
    .patch("/update-car-price", updateCarPrice)
    .patch("/inventory-value", updateValue)
    .delete("/:id", deleteCar)
export default router;
