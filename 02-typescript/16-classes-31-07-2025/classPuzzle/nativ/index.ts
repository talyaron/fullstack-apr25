class Car {
  protected company: string;
  public model: string;
  public year: number;
  public readonly maxTank: number;
  protected tankFuelLevel: number;

  constructor(company: string, model: string, year: number, maxTank: number) {
    this.company = company;
    this.model = model;
    this.year = year;
    this.maxTank = maxTank;
    this.tankFuelLevel = 0;
  }

  get Company(): string {
    try {
      return this.company;
    } catch (error) {
      console.error(error);
      return "Unknown";
    }
  }
  describe() {
    return `This is a ${this.year} ${this.company} ${this.model} with a maximum tank of ${this.maxTank} liters. Current fuel level: ${this.tankFuelLevel} liters.`;
  }
  addGas(liters: number) {
    try {
      if (liters <= 0) {
        throw new Error("You must add a positive amount of fuel.");
      }

      const newLevel = this.tankFuelLevel + liters;

      if (newLevel > this.maxTank) {
        throw new Error(`Tank can only go to ${this.maxTank} liters.`);
      }

      this.tankFuelLevel = newLevel;
      console.log(`Added ${liters} liters to the tank.`);
    } catch (error) {
      console.error(error);
    }
  }
}
class ElectricCar extends Car {
  protected battery: number;

  constructor(company: string, model: string, year: number, battery: number) {
    super(company, model, year, 0);
    if (battery < 0 || battery > 100) {
      throw new Error("Initial battery level must be between 0 and 100.");
    }
    this.battery = battery;
  }

  describe(): string {
    return `This is a ${this.year} ${this.Company} ${this.model}, battery level: ${this.battery}%.`;
  }

  chargeBattery(amount: number) {
    try {
      if (amount <= 0) {
        throw new Error("You must charge a positive amount.");
      }

      const newLevel = this.battery + amount;

      if (newLevel > 100) {
        throw new Error(`battery level will be overcharged`);
      }

      this.battery = newLevel;
      console.log(
        `Charged battery by ${amount}%. Current level: ${this.battery}%.`
      );
    } catch (error) {
      console.error("Failed to charge battery:", error);
    }
  }

  get BatteryLevel(): number {
    return this.battery;
  }
}
