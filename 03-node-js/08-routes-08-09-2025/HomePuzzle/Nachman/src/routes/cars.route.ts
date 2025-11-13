import express from 'express';
import { 
    fetchAllVehicles, 
    getVehicleById, 
    getInStockVehicles, 
    filterVehicles,
    addNewVehicle,
    updateVehiclePrice,
    updateVehicleValues,
    removeVehicle
} from '../controllers/cars.controllers';

const vehicleRouter = express.Router();

// GET routes
vehicleRouter.get('/inventory', fetchAllVehicles);
vehicleRouter.get('/available-stock', getInStockVehicles);
vehicleRouter.get('/vehicle/:id', getVehicleById);
vehicleRouter.get('/filter', filterVehicles);

// POST routes
vehicleRouter.post('/new-vehicle', addNewVehicle);

// PATCH routes
vehicleRouter.patch('/update-pricing', updateVehiclePrice);
vehicleRouter.patch('/depreciate-values', updateVehicleValues);

// DELETE routes
vehicleRouter.delete('/remove/:id', removeVehicle);

export default vehicleRouter;