class Car{
    company : string;
    model : string;
    year: number;
    maxTank : number;
    protected fuelLevel:number

    constructor (company : string, model:string, year:number, maxTank:number, fuelLevel : 0){
        this.company = company;
        this.model = model;
        this.year = year;
        this.maxTank = maxTank;
        this.fuelLevel = fuelLevel;
    }
        describe() {
            console.log(`The car company is ${this.company} and the model is ${this.model}. The year of the car is ${this.year} and it can hold up to ${this.maxTank}`)
        }

        addFuel(fuel:number){
            try {
               if (typeof fuel !== "number" || isNaN(fuel)){
                throw new Error ("non number given")
               }
            
            let spilled : number = 0
            this.fuelLevel += fuel
            if(this.fuelLevel > this.maxTank){
                spilled = this.fuelLevel - this.maxTank;
                this.fuelLevel = this.maxTank;
             console.log(`${fuel} liters of fuel has been added. sadly - ${spilled} liters got spilled :()`)}
             else
                console.log(`${fuel} liters of fuel has been added.`)
            } catch (error) {
                console.error(error.message)
            }
        }

        getFuelLevel():number {
            return this.fuelLevel
        }
}

const yoel = new Car ("Mitsubishi", "Attrage", 2016, 42, 0)

yoel.addFuel(43)

class electricCar extends Car{
    maxBattery : number;
    protected batteryLevel:number = 0

    constructor (company:string, model:string, year:number, maxTank, fuelLevel, maxBattery:number){
        super(company, model, year,  maxTank, fuelLevel)
        this.maxBattery = maxBattery
        
    }
    
    desribe() {
        console.log(`The car company is ${this.company} and the model is ${this.model}. The year of the car is ${this.year} and it runs on electricity. The battery limit is ${this.maxBattery}`)
    }
    charge(kwh:number){
        let tooMuch : number = 0;
        this.batteryLevel += kwh
        
        if (this.batteryLevel > this.maxBattery){
            tooMuch = this.batteryLevel - this.maxBattery
            console.log(`overheating! ${tooMuch}, kwH over the top!`)
            this.batteryLevel = this.maxBattery
        }
        else {
            console.log(`${kwh} kwH has been added to the battery.`)
        }
        
    }
    getBatteryLevel():number {
        return this.batteryLevel
    }

}

