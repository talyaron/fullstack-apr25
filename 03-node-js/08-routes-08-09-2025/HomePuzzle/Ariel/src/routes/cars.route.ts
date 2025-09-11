import express from "express";
import { Car, Cars } from "../model/car.model";
import {
  getAllCars,
  addCar,
  updateCarPriceByID,
} from "../controllers/cars.controllers";

// Create a router to handle car-related routes for server.ts
const router = express.Router();

router
  .get("/all-cars", getAllCars)
  .post("/add-car", addCar)
  .patch("/update-car", updateCarPriceByID);

export default router;
