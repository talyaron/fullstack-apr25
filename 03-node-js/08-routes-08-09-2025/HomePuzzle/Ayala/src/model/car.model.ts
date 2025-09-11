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

export enum Status {
    AVAILABLE = "Available",
    SOLD = "Sold",
    RESERVED = "Reserved"

}
export const cars: Car[] = [
    { id: 1, brand: "Toyota", model: "Camry", year: 2020, price: 24000, color: "Red", mileage: 15000, isAvailable: true },
    { id: 2, brand: "Honda", model: "Civic", year: 2019, price: 22000, color: "Blue", mileage: 20000, isAvailable: false },
    { id: 3, brand: "Ford", model: "Mustang", year: 2021, price: 26000, color: "Black", mileage: 10000, isAvailable: true }
];
