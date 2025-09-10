export enum CarStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  RESERVED = "RESERVED",
}

export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  isAvailable: boolean;
  status: CarStatus;
}

export const Cars: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 20000,
    color: "Red",
    mileage: 15000,
    isAvailable: true,
    status: CarStatus.AVAILABLE,
  },

  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2019,
    price: 22000,
    color: "Blue",
    mileage: 12000,
    isAvailable: true,
    status: CarStatus.AVAILABLE,
  },
  {
    id: 3,
    brand: "Ford",
    model: "Mustang",
    year: 2021,
    price: 30000,
    color: "Black",
    mileage: 8000,
    isAvailable: false,
    status: CarStatus.SOLD,
  },
];
