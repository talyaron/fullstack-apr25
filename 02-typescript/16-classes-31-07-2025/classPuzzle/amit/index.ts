class Car {

    protected fuelLevel: number = 0;

    constructor(
        public company: string,
        public model: string | number,
        public yearOfProduction: number,
        public maxTank: number) { }

    set Company(value: string) {
        this.company = value;
    }
    set Model(value: string | number) {
        this.model = value;
    }
    set YearOfProduction(value: number) {
        const currentYear = new Date().getFullYear();
        if (value >= 1990 && value <= currentYear) {
            this.yearOfProduction = value;
        }
        else {
            throw new Error("The year must be between 1990 to 2025");
        }
    }
    set MaxTank(value: number) {
        if (value >= 0 && value <= 100) {
            this.maxTank = value;
        }
        else {
            throw new Error("Tank has to be between 0 - 100");
        }
    }

    getFuelLevel(): number {
        return this.fuelLevel;
    }

    addGas(amount: number): void {
        try {
            if (amount <= 0) {
                throw new Error("amount must be positive");
            }
            if (this.fuelLevel + amount > this.maxTank) {
                throw new Error("To much gas, the engine will over flow");
            }
            this.fuelLevel += amount;
        } catch (error) {
            console.error(error, "Error adding gas!")
        }
    }

    describe(): void {
        console.log(`This car is ${this.company}, the model is ${this.model}, produced in ${this.yearOfProduction}, with a tank size of ${this.maxTank} liters`)
    }

}


class ElectricCar extends Car {
    protected battery: number;
    private maxBattery: number


    constructor(
        company: string,
        model: string | number,
        yearOfProduction: number,
        battery: number,
        batteryCapacity: number
    ) {
        super(company, model, yearOfProduction, batteryCapacity);
        this.maxBattery = batteryCapacity
        this.battery = battery;
    }


    set batteryCapacity(value: number) {
        if (value >= 0 && value <= 100) {
            this.maxBattery = value;
        }
        else {
            throw new Error("Tank has to be between 0 - 100");
        }
    }

    getBatteryLevel(): number {
        return this.battery;
    }

    addElectricity(amount: number): void {
        try {
            if (amount <= 0) {
                throw new Error("amount must be positive");
            }
            if (this.battery + amount > this.maxBattery) {
                throw new Error("Too much electricity, the battery will overflow");
            }
            this.battery += amount;
        } catch (error) {
            console.error("Error adding electricity!", error)
        }
    }

    describe(): void {
        console.log(`This car is ${this.company}, the model is ${this.model}, produced in ${this.yearOfProduction}, with a battery capacity of ${this.maxBattery} kwh`);
    }
}

const amitCar = new Car("mazda", 3, 2014, 60);

amitCar.addGas(20);
amitCar.addGas(20);
amitCar.addGas(20);
amitCar.describe();

console.log(amitCar);

//////////////////////////////////////

const amitElectricCar = new ElectricCar("tesla", 3, 2024, 0, 890);

amitElectricCar.addElectricity(100);
amitElectricCar.addElectricity(100);
amitElectricCar.addElectricity(600);
amitElectricCar.describe();
console.log(amitElectricCar);