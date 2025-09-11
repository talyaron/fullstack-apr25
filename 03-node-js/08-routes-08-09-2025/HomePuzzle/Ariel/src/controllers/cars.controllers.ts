import { CarStatus, Car, Cars } from "../model/car.model";

export function getAllCars(_req: any, res: any) {
  res.status(200).send({ cars: Cars });
}

export function addCar(req: any, res: any) {
  try {
    console.log("Request Body:", req.body);

    // const { brand, model, year, price } = req.body;

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

// Of level 2 
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

export function getCarById(req: any, res: any) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).send("Invalid ID format");
    }
    
    const car = Cars.find(car => car.id === id);
    
    if (!car) {
      return res.status(404).send("Car not found");
    }
    
    res.status(200).send(car);
  } catch (error: any) {
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
}

export function deleteCar(req: any, res: any) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).send("Invalid ID format");
    }
    
    const carIndex = Cars.findIndex(car => car.id === id);
    
    if (carIndex === -1) {
      return res.status(404).send("Car not found");
    }
    
    Cars[carIndex].isAvailable = false;
    Cars[carIndex].status = CarStatus.SOLD;
    
    res.status(200).send(`Car ${id} marked as unavailable`);
  } catch (error: any) {
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
}

export function getAvailableCars(req: any, res: any) {
  try {
    const availableCars = Cars.filter(car => car.isAvailable === true);
    
    res.status(200).send({ 
      availableCars: availableCars,
      count: availableCars.length 
    });
  } catch (error: any) {
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
}