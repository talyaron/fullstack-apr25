import { Car, Cars } from "../model/car.model";

export function getAllCars(_req: any, res: any) {
  res.status(200).send({ Cars });
}

export function addCar(req: any, res: any) {
  try {
    console.log("Request Body:", req.body);

    const { brand, model, year, price } = req.body;

    const newCar: Car = {
      id: Cars.length + 1,
      ...req.body,
    };

    Cars.push(newCar);
    res
      .status(201)
      .send(`Car ${newCar.brand} ${newCar.model} added successfully`);
  } catch (error: any) {
    console.error("Error in addCar:", error);
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
}

export function updateCarPriceByID(req: any, res: any) {
  try {
    const { id, price } = req.body;

    if (typeof id !== "number" || typeof price !== "number") {
      return res
        .status(400)
        .send("Invalid request data, id and price must be numbers");
    }

    const carIndex = Cars.findIndex((s) => s.id === id);
    if (carIndex === -1) {
      return res.status(404).send("Car not found");
    }

    Cars[carIndex] = { ...Cars[carIndex], price };

    res.status(200).send(`Car ${id} updated successfully`);
  } catch (error: any) {
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
}
