//   - `getAllCars`: Return all cars
//    - `addCar`: Add a new car with auto-generated ID
//    - `updateCarPrice`: Update car price by ID

import { cars , Car} from "../model/car.model";



export function getAllCars(req : any , res : any)
{
    res.status(200).send({cars})
}

export function  addCar (req:any,res:any){

    const newCar = req.body as Car;
    newCar.id  = cars.length+1;
    cars.push(newCar);
    res.status(201).send("car has been added succesfully")

}

export function updateCarPrice ( req:any,res:any ){

    try {
        const {id} = req.body;
        const {price} = req.body;
        if(typeof id == "number" || typeof price == "number")
        {
            const carIndex = cars.findIndex((i)=>i.id===id)
            cars[carIndex].price = price;
            res.status(200).send(`car id number - ${id}, has update the price`)
        }

    } catch (error:any) {res.status(400).send("not valid number")
        
    }

}


// const newLocal = 2. ** Add; New Controllers**:
//    - `getCarById`: Get specific car by ID
//    - `deleteCar`: Soft delete (mark as unavailable)
//    - `getAvailableCars`: Filter only available cars
//    - `searchCars`: Search by brand OR model (query parameters)

   
export function getCarById (req:any,res:any ){
    try {
        const{id}=req.body;
        if(typeof id =="number"){
            const carIndex = cars.findIndex((i)=>i.id===id)
            if (carIndex === -1){
               return res.status(400).send("there is not car with this id")
            }
            return res.send(cars[carIndex])

        }
        return  res.status(400).send( `id is not a number`);

    } catch (error:any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
        
    }
}


export function deleteCar (req:any,res:any ){

try {
        const{id}=req.body;
        if(typeof id =="number"){
            const carIndex = cars.findIndex((i)=>i.id===id)
            if (carIndex === -1){
               return res.status(400).send("there is not car with this id")
            }
            if(cars[carIndex].isAvailable === false)
            {return res.status(400).send ("cant delete unvailable car")}
            cars[carIndex].isAvailable = false;
            return res.status(200).send( `car number ${carIndex} has been deleted`);
        }
        return  res.status(400).send( `id is not a number`);

    }catch (error:any) {
            res.status(500).send({ error: `Internal Server Error: ${error.message}` });

    
}

}


export function getAvailableCars (req:any,res:any ){
    try {
        let availableArry: Car[] = [];
        let y =0;
        for(let i=0;i<cars.length;i++)
            {
            if(cars[i].isAvailable===true){
                availableArry[y]=cars[i];
                y++;
            }
            }
            if(availableArry.length>0){
                return res.status(200).send(availableArry)
            }
                return res.status(200).send("not available car right now :(")

    }catch (error:any) {
            res.status(500).send({ error: `Internal Server Error: ${error.message}` });
        
    }
}



export function searchCars (req:any,res:any ){
try {
    const carBrand = req.query.brand;
    const carModel = req.query.model;
    if(carBrand){
        let arryByBrand:Car[]=[];
        let yBrand=0;
        for(let i=0;i<cars.length;i++){
            if(cars[i].brand==carBrand){
                arryByBrand[yBrand]=cars[i];
                yBrand++;
            }
        }
        if(arryByBrand.length===0) return res.status(400).send("no available cars")
        return res.status(200).send(arryByBrand)
    }
     if(carModel){
        let arryByModel:Car[]=[];
        let yModel=0;
        for(let i=0;i<cars.length;i++){
            if(cars[i].model==carModel){
                arryByModel[yModel]=cars[i];
                yModel++;
            }
        }
        if(arryByModel.length===0) return res.status(400).send("no available cars")

        return res.status(200).send(arryByModel)
    }

        return res.status(400).send("no available cars")




} catch (error:any) {
            res.status(500).send({ error: `Internal Server Error: ${error.message}` });
        
    }
}


