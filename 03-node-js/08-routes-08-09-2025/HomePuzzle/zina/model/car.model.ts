import { writeFileSync, readFileSync, existsSync } from 'fs';

export enum CarStatus {
    AVAILABLE = 'AVAILABLE',
    SOLD = 'SOLD',
    RESERVED = 'RESERVED'
}

export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    color: string;
    mileage: number;
    isAvailable: boolean;
}

let cars: Car[] = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2020, price: 24000, color: 'Red', mileage: 15000, isAvailable: true },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019, price: 22000, color: 'Blue', mileage: 20000, isAvailable: true },
    { id: 3, brand: 'Ford', model: 'Focus', year: 2021, price: 26000, color: 'Black', mileage: 5000, isAvailable: true }
];

export function saveCarsToFile() {
    try {
        writeFileSync('./data/cars.json', JSON.stringify(cars, null, 2));
    } catch (error) {
        console.error('Error saving cars to file:', error);
    }
}

export function loadCarsFromFile() {
    if (existsSync('./data/cars.json')) {
        try {
            const data = readFileSync('./data/cars.json', 'utf-8');
            cars = JSON.parse(data);
        } catch (error) {
            console.error('Error loading cars from file:', error);
        }
    }
}

export function getCars() {
    return cars;
}