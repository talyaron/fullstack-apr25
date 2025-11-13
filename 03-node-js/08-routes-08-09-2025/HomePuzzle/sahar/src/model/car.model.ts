export interface Car {
    id?: number;
    brand: string;
    model: string;
    price: number;
    year: number;
    color: string;
    mileage: number;
    isAvailable: boolean;
}

export const cars: Car[] = [
    {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        price: 95000,
        year: 2018,
        color: "White",
        mileage: 85000,
        isAvailable: true
    },
    {
        id: 2,
        brand: "Honda",
        model: "Civic",
        price: 105000,
        year: 2019,
        color: "Black",
        mileage: 60000,
        isAvailable: false
    },
    {
        id: 3,
        brand: "Tesla",
        model: "Model 3",
        price: 200000,
        year: 2021,
        color: "Red",
        mileage: 30000,
        isAvailable: true
    }
];