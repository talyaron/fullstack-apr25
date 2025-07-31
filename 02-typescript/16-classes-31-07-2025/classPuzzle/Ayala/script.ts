const carBrands: string[] = [
    "Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Hyundai", "Kia", "Nissan", "Mazda", "Subaru", "Jeep", "Lexus", "Volvo", "Peugeot", "Renault", "Fiat", "Skoda", "Mitsubishi", "Tesla", "Porsche", "Land Rover", "Jaguar", "Suzuki", "Citroën", "Genesis", "Chrysler", "Buick", "GMC", "Dodge", "Ram", "Mini", "Alfa Romeo", "Ferrari", "Lamborghini", "Bentley", "Rolls-Royce", "Bugatti", "Maserati"
];
const currentYear = 2025;

class Car {
    public company: string;
    public model: string;
    public year: number;

    constructor(company: string, model: string, year: number) {
        try {
            if (!(carBrands.includes(company))) throw new Error("Car company invalid");
            if (year > currentYear) throw new Error("Year is invalid");
            this.company = company;
            this.model = model;
            this.year = year;

        }
        catch (error) {
            console.error("Error constacting car: ", error);
        }
    }
    public describe(): string {
        return `Your car is: ${this.year, this.company, this.model}`
    }
}

class fuelCar extends Car {
    public maxTank: number;
    protected fuelLevel: number;
    constructor(company: string, model: string, year: number, maxTank: number) {
        super(company, model, year)
        this.maxTank = maxTank
        this.fuelLevel = 0
    }

    public describe(): string {
        return `${super.describe()} with ${this.fuelLevel} battery level.`
    }

    public addFuel(amount): string {
        try {
            if (amount > 0) throw new Error("amount has to be bigger than zero");
            if (amount + this.fuelLevel > this.maxTank) throw new Error("you cant fill the tank over the max level");
            this.fuelLevel += amount
            return `You successfully filed the tank to ${this.fuelLevel}`
        } catch (error) {
            console.error("Error adding fuel", error);
            return ("Error adding fuel")
        }
    }
    public get FuelLevel(): number {
        return this.fuelLevel
    }
    public remainingRange():number{
        return (this.maxTank-this.fuelLevel)
    }
}

class ElectricCar extends Car {
    public maxBattery: number;
    protected batteryLevel: number;

    constructor(company: string, model: string, year: number, maxBattery: number) {
        super(company, model, year)
        this.maxBattery = maxBattery
        this.batteryLevel = 0
    }

    public describe(): string {
        return `${super.describe()} with ${this.batteryLevel} battery level.`
    }
    public charge(amount): string {
        try {
            if (amount > 0) throw new Error("amount has to be bigger than zero");
            if (amount + this.batteryLevel > this.maxBattery) throw new Error("you cant fill the battery over the max level");
            this.batteryLevel += amount
            return `You successfully charged the battery to ${this.batteryLevel}`
        } catch (error) {
            console.error("Error charging", error);
            return ("Error charging")
        }
    }
    public get BatteryLevel(): number {
        return this.batteryLevel
    }
    public remainingRange():number{
        return (this.maxBattery-this.BatteryLevel)
    }
}

