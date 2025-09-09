export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  price: number;
}

export const Cars: Car[] = [
  { id: 1, brand: "Toyota", model: "Corolla", year: 2020, price: 20000 },
  { id: 2, brand: "Honda", model: "Civic", year: 2019, price: 22000 },
  { id: 3, brand: "Ford", model: "Mustang", year: 2021, price: 30000 },
];
