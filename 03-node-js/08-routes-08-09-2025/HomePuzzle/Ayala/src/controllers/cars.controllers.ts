import { Car, cars } from "../model/car.model";
import { Request, Response } from "express";

const currentYear = new Date().getFullYear();
//get
export function getAllCars(_req: Request, res: Response) {
    try {
        if (!cars) return res.status(404).send({ error: "no cars found in data" })
        res.status(200).send({ cars });
    } catch (error) {
        res.status(500).send({ error: "unknown error in getAllCars" });
    }
}

export function getCarById(req: Request, res: Response) {
    try {
        const carId = parseInt(req.params.id, 10);
        if (isNaN(carId)) return res.status(400).send({ error: "invalid car id" })
        const car = cars.find(c => c.id === carId)
        if (!car) return res.status(404).send({ error: "could not find car" })
        res.status(200).send({ car })
    } catch (error) {
        res.status(500).send({ error: "unknown error in getCarById" });
    }
}
export function getAvailableCars(_req: Request, res: Response) {
    try {
        if (!cars) return res.status(404).send({ error: "no cars found in data" })
        const availableCars = cars.filter(car => car.isAvailable)
        res.status(200).send(availableCars ? { availableCars } : { noCars: "no availble cars" });
    } catch (error) {
        res.status(500).send({ error: "unknown error in getAllCars" });
    }
}
export function searchCars(req: Request, res: Response) {
    try {
        const carBrand = req.query.brand;
        if (!carBrand) return res.status(400).send({ error: "invalid car brand" });
        const brandedCars = cars.filter(car => car.brand === carBrand);
        res.status(200).send(brandedCars ? { brandedCars } : { noCars: `no ${carBrand} cars` });
    } catch (error) {
        res.status(500).send({ error: "unknown error in searchCars" });

    }
}
//post
export function addCar(req: Request, res: Response) {
    try {
        console.log("Request Body:", req.body);
        const { brand, model, year, price, color, mileage, isAvailable } = req.body;
        // const newCar = req.body as Car;
        const carid = cars.length + 1;
        if (!brand || typeof brand !== "string") return res.status(400).send({ error: "Invalid car brand" });
        if (!model || typeof model !== "string") return res.status(400).send({ error: "Invalid car model" });
        if (year > currentYear || year < 1900 || typeof year !== "number") return res.status(400).send({ error: "Invalid car year" });
        if (price < 0 || typeof price !== "number") return res.status(400).send({ error: "Invalid car price" });
        if (mileage < 0) return res.status(400).send({ error: "Invalid car mileage" });
        // {
        //     return res.status(400).send({ error: "Invalid car data" });
        // }
        const newCar: Car = { id: carid, brand, model, year, price, color, mileage, isAvailable };
        cars.push(newCar);
        res.status(201).send(`car ${newCar.id} added successfully`);
        console.log(newCar);

    } catch (error) {
        res.status(500).send({ error: "unknown error in addCar" });
    }
}

//patch
export function updateCarPrice(req: Request, res: Response) {
    try {
        if (!cars) return res.status(404).send({ error: "no cars found in data" })

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

//put
export function updateValue(_req: Request, res: Response) {
    try {
        if (!cars) return res.status(404).send({ error: "no cars found in data" })

        cars.forEach(car => {
            const age = currentYear - car.year;
            let depreciatedPrice = car.price * (1 - 0.05 * age);
            const mileageFactor = Math.floor(car.mileage / 10000) * 0.02;
            depreciatedPrice *= (1 - mileageFactor);
            if (age > 5) depreciatedPrice *= 0.9;
            return Math.max(depreciatedPrice, 0);
        });
        res.status(200).send(`updated`);

    } catch (error) {
        res.status(500).send({ error: `unknown error in update value` });
    }
}

//delete
export function deleteCar(req: Request, res: Response) {
    try {
        const carId = parseInt(req.params.id, 10);
        if (isNaN(carId)) return res.status(400).send({ error: "invalid car id" })
        const carIndex = cars.findIndex(c => c.id === carId)
        if (!carIndex) return res.status(404).send({ error: "could not find car" })
        cars.splice(carIndex, 1)
        res.status(200).send({ ok: true })
    } catch (error) {
        res.status(500).send({ error: "unknown error in deleteCar" });
    }
}
