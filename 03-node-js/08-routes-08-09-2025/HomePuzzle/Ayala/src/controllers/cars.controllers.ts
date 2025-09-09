import { Car, cars } from "../model/car.model.js";
import { Request, Response } from "express";

export function getAllCars(_req: Request, res: Response) {
    try {
        if (!cars) return res.status(404).send({ error: "no cars found in data" })
        res.status(200).send({ cars });
    } catch (error) {
        res.status(500).send({ error: "unknown error in getAllCars" });
    }
}

export function addCar(req: Request, res: Response) {
    try {
        console.log("Request Body:", req.body);
        const newCar = req.body as Car;
        newCar.id = cars.length + 1;
        if (!newCar.brand || typeof newCar.brand !== "string"
            || !newCar.model || typeof newCar.model !== "string"
            || !newCar.year || typeof newCar.year !== "number"
            || !newCar.price || typeof newCar.price !== "number") {
            return res.status(400).send({ error: "Invalid car data" });
        }
        cars.push(newCar);
        res.status(201).send(`Student ${newCar} added successfully`);

    } catch (error) {
        res.status(500).send({ error: "unknown error in addCar" });
    }
}
export function updateCarPrice(req: Request, res: Response) {
    try {
        const { id, price } = req.body;

        if (typeof id !== 'number' || typeof price !== 'number') {
            return res.status(400).send("Invalid request data, id and price must be numbers");
        }

        const carIndex = cars.findIndex((c) => c.id === id);
        if (carIndex === -1) {
            return res.status(404).send("car not found");
        }

        cars[carIndex] = { ...cars[carIndex], price };

        res.status(200).send(`car ${id} updated successfully`);
    } catch (error) {
        res.status(500).send({ error: `unknown error in update price` });
    }
}
