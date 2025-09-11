import { Request, Response } from 'express';
import { Car, getCars, saveCarsToFile } from '../model/car.model';

export const getAllCars = (req: Request, res: Response) => {
    try {
        const cars = getCars();
        res.json({ cars });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error });
    }
};

export const addCar = (req: Request, res: Response) => {
    const { brand, model, year, price, color, mileage } = req.body;
    const newCar: Car = {
        id: Date.now(), // Auto-generated ID
        brand,
        model,
        year,
        price,
        color,
        mileage,
        isAvailable: true
    };

    try {
        const cars = getCars();
        cars.push(newCar);
        saveCarsToFile();
        res.status(201).json(`Car ${brand} ${model} added successfully`);
    } catch (error) {
        res.status(500).json({ message: 'Error adding car', error });
    }
};

export const updateCarPrice = (req: Request, res: Response) => {
    const { id, price } = req.body;
    try {
        const cars = getCars();
        const car = cars.find(car => car.id === id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        car.price = price;
        saveCarsToFile();
        res.json(`Car ${id} price updated successfully`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car price', error });
    }
};