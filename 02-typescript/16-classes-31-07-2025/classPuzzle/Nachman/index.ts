// part 1 car class
class car {
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


    describe(): string {
        return `${this.company} ${this.model} (${this.year}) - Fuel: ${this.fuelLevel}L`;
    }

        addFuel(amount: number): void {
        if (this.fuelLevel + amount > this.maxTank) {
            this.fuelLevel = this.maxTank;
        } else {
            this.fuelLevel += amount;
        }
    }
getFuelLevel(): number {    
        return this.fuelLevel;
    }
}
// part 2 electricCar class
class electricCar extends car {
public maxBattery: number;
protected batteryLevel: number = 0;


constructor(company: string, model: string, year: number, maxBattery: number) {
super(company, model, year, 0);
this.maxBattery = maxBattery;
}

 describe(): string {
        return `${this.company} ${this.model} (${this.year}) - Battery: ${this.batteryLevel}kWh`;
    }

charge(amount: number): void {
        if (this.batteryLevel + amount > this.maxBattery) {
            this.batteryLevel = this.maxBattery;
        } else {
            this.batteryLevel += amount;
        }
    }
    getBatteryLevel(): number {
        return this.batteryLevel;
    }
}

const car1 = new car("hyundai", "Elantra", 2019, 50);
const electricCar1 = new electricCar("Tesla", "Model 3", 2020, 75);

console.log(car1.describe());
car1.addFuel(30);
console.log(car1.describe());

console.log(electricCar1.describe());
electricCar1.charge(50);
console.log(electricCar1.describe());