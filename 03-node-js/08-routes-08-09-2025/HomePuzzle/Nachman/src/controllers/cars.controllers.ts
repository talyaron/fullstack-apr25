import { Vehicle, vehicleInventory } from "../model/car.model";
import { Request, Response } from "express";

const currentYear = new Date().getFullYear();

export function fetchAllVehicles(_req: Request, res: Response) {
    try {
        if (!vehicleInventory) return res.status(404).send({ error: "no vehicles in inventory" })
        res.status(200).send({ vehicles: vehicleInventory });
    } catch (error) {
        res.status(500).send({ error: "unknown error in fetchAllVehicles" });
    }
}

export function getVehicleById(req: Request, res: Response) {
    try {
        const vehicleId = parseInt(req.params.id, 10);
        if (isNaN(vehicleId)) return res.status(400).send({ error: "invalid vehicle id" })
        const vehicle = vehicleInventory.find(v => v.carId === vehicleId)
        if (!vehicle) return res.status(404).send({ error: "vehicle not found" })
        res.status(200).send({ vehicle })
    } catch (error) {
        res.status(500).send({ error: "unknown error in getVehicleById" });
    }
}

export function getInStockVehicles(_req: Request, res: Response) {
    try {
        if (!vehicleInventory) return res.status(404).send({ error: "no vehicles in inventory" })
        const availableVehicles = vehicleInventory.filter(v => v.inStock)
        res.status(200).send(availableVehicles ? { availableVehicles } : { message: "no vehicles available" });
    } catch (error) {
        res.status(500).send({ error: "unknown error in getInStockVehicles" });
    }
}

export function filterVehicles(req: Request, res: Response) {
    try {
        const vehicleMake = req.query.make;
        if (!vehicleMake) return res.status(400).send({ error: "invalid vehicle make" });
        const filteredVehicles = vehicleInventory.filter(v => v.make === vehicleMake);
        res.status(200).send(filteredVehicles ? { filteredVehicles } : { message: `no ${vehicleMake} vehicles` });
    } catch (error) {
        res.status(500).send({ error: "unknown error in filterVehicles" });
    }
}

export function addNewVehicle(req: Request, res: Response) {
    try {
        const { make, modelName, manufacturingYear, currentPrice, paintColor, totalMiles, inStock } = req.body;
        const vehicleId = vehicleInventory.length + 1;
        
        if (!make || typeof make !== "string") return res.status(400).send({ error: "Invalid vehicle make" });
        if (!modelName || typeof modelName !== "string") return res.status(400).send({ error: "Invalid model name" });
        if (manufacturingYear > currentYear || manufacturingYear < 1900 || typeof manufacturingYear !== "number") return res.status(400).send({ error: "Invalid year" });
        if (currentPrice < 0 || typeof currentPrice !== "number") return res.status(400).send({ error: "Invalid price" });
        if (totalMiles < 0) return res.status(400).send({ error: "Invalid mileage" });

        const newVehicle: Vehicle = { carId: vehicleId, make, modelName, manufacturingYear, currentPrice, paintColor, totalMiles, inStock };
        vehicleInventory.push(newVehicle);
        res.status(201).send(`vehicle ${newVehicle.carId} added successfully`);
    } catch (error) {
        res.status(500).send({ error: "unknown error in addNewVehicle" });
    }
}

export function updateVehiclePrice(req: Request, res: Response) {
    try {
        if (!vehicleInventory) return res.status(404).send({ error: "no vehicles in inventory" })
        const { carId, currentPrice } = req.body;

        if (typeof carId !== 'number' || typeof currentPrice !== 'number') {
            return res.status(400).send("Invalid data, carId and price must be numbers");
        }

        const vehicleIndex = vehicleInventory.findIndex((v) => v.carId === carId);
        if (vehicleIndex === -1) {
            return res.status(404).send("vehicle not found");
        }

        vehicleInventory[vehicleIndex] = { ...vehicleInventory[vehicleIndex], currentPrice };
        res.status(200).send(`vehicle ${carId} price updated successfully`);
    } catch (error) {
        res.status(500).send({ error: `unknown error in update price` });
    }
}

export function updateVehicleValues(_req: Request, res: Response) {
    try {
        if (!vehicleInventory) return res.status(404).send({ error: "no vehicles in inventory" })

        vehicleInventory.forEach(vehicle => {
            const age = currentYear - vehicle.manufacturingYear;
            let depreciatedPrice = vehicle.currentPrice * (1 - 0.06 * age);
            const mileageFactor = Math.floor(vehicle.totalMiles / 12000) * 0.03;
            depreciatedPrice *= (1 - mileageFactor);
            if (age > 6) depreciatedPrice *= 0.88;
            return Math.max(depreciatedPrice, 0);
        });
        res.status(200).send(`values updated`);
    } catch (error) {
        res.status(500).send({ error: `unknown error in update values` });
    }
}

export function removeVehicle(req: Request, res: Response) {
    try {
        const vehicleId = parseInt(req.params.id, 10);
        if (isNaN(vehicleId)) return res.status(400).send({ error: "invalid vehicle id" })
        const vehicleIndex = vehicleInventory.findIndex(v => v.carId === vehicleId)
        if (vehicleIndex === -1) return res.status(404).send({ error: "vehicle not found" })
        vehicleInventory.splice(vehicleIndex, 1)
        res.status(200).send({ success: true })
    } catch (error) {
        res.status(500).send({ error: "unknown error in removeVehicle" });
    }
}