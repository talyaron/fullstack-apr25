class Car {
    company: string; //properties
    model: string;
    year: number;
    protected fuelLevel: number;
    maxTank: number;

    constructor(company: string, model: string, year: number, maxTank: number) {
    if (maxTank <= 0 || year < 1886) {
        throw new Error("Invalid car specs.");
    } 
    this.company = company;
    this.model = model;
    this.year = year;
    this.maxTank = maxTank;
    this.fuelLevel = 0; 
    }
     describe(): string {
    return `${this.company} ${this.model} (${this.year}) - Fuel Level: ${this.fuelLevel}L`;
}

 addFuel(amount: number): string {
    if (amount <= 0) return "Please add a valid amount of fuel.";

    const potential = this.fuelLevel + amount;

    if (potential > this.maxTank) {
      const added = this.maxTank - this.fuelLevel;
      this.fuelLevel = this.maxTank;
      return `Tank full. Only added ${added}L out of ${amount}L.`;
    } else {
      this.fuelLevel += amount;
      return `Successfully added ${amount}L of fuel.`;
    }
  }

  getFuelLevel(): number {
    return this.fuelLevel;
  }
}
const myCar = new Car("Toyota", "Corolla", 2020, 50);
console.log(myCar.describe());            // Toyota Corolla (2020) - Fuel Level: 0L
console.log(myCar.addFuel(30));           // Successfully added 30L of fuel.
console.log(myCar.getFuelLevel());        // 30
console.log(myCar.addFuel(25));           // Tank full. Only added 20L out of 25L.
console.log(myCar.describe());            // ...Fuel Level: 50L

//ElectricCar (extends Car)
class ElectricCar extends Car {
    maxBattery: number;
    protected batteryLevel: number;

    constructor(company: string, model: string, year: number, maxBattery: number) {
     super(company, model, year, 0);
     if (maxBattery <= 0) {
        throw new Error("Invalid battery capacity.");
     } 

     this.maxBattery = maxBattery;
     this.batteryLevel = 0;
    }
    override describe(): string {
        return `${this.company} ${this.model} (${this.year}) - Battery Level: ${this.batteryLevel}kwh`;
    }

    charge(amount: number): string {
        if (amount <= 0) return "please provide a valid charging amount.";
    
    const potential = this.batteryLevel + amount;

    if (potential > this.maxBattery) {
      const added = this.maxBattery - this.batteryLevel;
      this.batteryLevel = this.maxBattery;
      return `Battery full. Only added ${added}kwh out of ${amount}kwh.`;
    } else {
      this.batteryLevel += amount;
      return `Successfully charged ${amount}kwh.`;
    }
    }
    getBatteryLevel(): number {
      return this.batteryLevel;
    }
}

const myEV = new ElectricCar("Tesla", "Model 3", 2023, 75);

console.log(myEV.describe());               // Tesla Model 3 (2023) - Battery Level: 0kWh
console.log(myEV.charge(50));               // Successfully charged 50kWh.
console.log(myEV.getBatteryLevel());        // 50
console.log(myEV.charge(30));               // Battery full. Only added 25kWh out of 30kWh.
console.log(myEV.describe());               // Battery Level: 75kWh
