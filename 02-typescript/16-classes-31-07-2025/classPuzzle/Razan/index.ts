class Car {
    public company: string;
    public model: string;
    public year: number;
    public maxTank: number;
    protected fuelLevel: number = 0;

    constructor(company: string, model: string, year: number, maxTank: number) {
        this.company = company;
        this.model = model;
        this.year = year;
        this.maxTank = maxTank;
    }

    getFuelLevel(): number {
        return this.fuelLevel;
    }

    describe() {
    console.log(
        `This car is a ${this.year} ${this.company} ${this.model}. Current fuel level: ${this.getFuelLevel()} liters. The remaining range of fuel is: ${this.remainingFuel()} liters.`
    );
    }

    addFuel(amount: number): string {
        try {
            if (amount < 0 || amount + this.getFuelLevel() > this.maxTank) {
                throw new Error("The amount of fuel added exceeds the maximum capacity of the tank");
            }
            this.fuelLevel += amount;
            return `Added ${amount} liters of fuel. Current fuel level: ${this.fuelLevel} liters.`;
        } catch (error) {
            console.error(error);
            return "Failed to add fuel.";
        }
    }
    remainingFuel(): number {
    return this.maxTank - this.fuelLevel;
    }
}

class ElectricCar extends Car {
    public maxBattery: number;
    protected batteryLevel: number = 0;
    constructor(company: string, model: string, year: number ,maxBattery: number) {
        super(company, model, year);
        this.maxBattery = maxBattery;
    }

    getBatteryLevel(): number {
        return this.batteryLevel;
    }
    describe() {
        console.log(
            `This car is a ${this.year} ${this.company} ${this.model}. Current battery level: ${this.getBatteryLevel()} kWh. The remaining range of battery is: ${this.remainingFuel()} kWh.`
        );
    }
    charge(amount: number): string {
        try {
            if (amount < 0 || amount + this.getBatteryLevel() > this.maxBattery) {
                throw new Error("The amount of charge exceeds the battery capacity");
            }
            this.batteryLevel += amount;
            return `Added ${amount} kWh. Current battery level: ${this.batteryLevel} kWh.`;;
        } catch (error) {
            console.error(error);
            return "Failed to add fuel.";
        }
    }
    remainingBattery(): number {
    return this.maxBattery - this.batteryLevel;
    }
}

const tesla = new ElectricCar("Tesla", "Model 3", 2024, 75);

tesla.describe();
console.log(tesla.charge(50));
console.log(tesla.charge(30)); 
tesla.describe();


const arona = new Car("Seat", "Arona", 2020, 50);

arona.describe();
console.log(arona.addFuel(20));
console.log(arona.addFuel(40)); 
arona.describe();
