class Car {
  // Properties
  protected company: string;
  protected model: string;
  protected year: number;
  private maxTankCapacity: number;
  private fuelLevel: number;
  // Constructor
  constructor(company: string, model: string, year: number, maxTankCapacity: number) {
    this.company = company;
    this.model = model;
    this.year = year;
    this.maxTankCapacity = maxTankCapacity;
    this.fuelLevel = 0;
  }

  describe/*AnyCar*/ (): string {
    return `Well, your car is: ${this.company} ${this.model} ${this.year}. `;
  }
  describeAccessoryFuel(): string {
    return `${this.describe()} Max fuel tank capacity: ${this.maxTankCapacity}, current tank fuel: ${this.fuelLevel}.`
  }

  addFuel(amount: number): void { // The name of the function is to just add and not to thorw you any explain to the log.
    try {
      if(amount <= 0) throw new Error("Cant add negative number or zero!.");
      
      if((this.fuelLevel + amount) > this.maxTankCapacity) {

        // const howMuchAdded = this.maxTankCapacity - this.fuelLevel
        // const overflow = (this.fuelLevel + amount) - this.maxTankCapacity  
      
        // this.fuelLevel = this.maxTankCapacity // it does the function is unpure!!
        
        // return `Fuel tank is full but addeed: ${howMuchAdded}, edge of fuel tank is ${this.maxTankCapacity}! ${overflow} is the overflow.`

        throw new Error("You have put too much fuel that over the maximum!");
      } else {
        this.fuelLevel = this.fuelLevel + amount
        // return `There are ${this.fuelLevel} liters, added ${amount} liters.`
      }
    }
    catch (error) {
      console.error(error);
    }
  }    

  get getFuelLevel() {
    return this.fuelLevel;
  }
}

const arielsCar = new Car(`Honda`, `Civic`, 2011, 50)
console.log(arielsCar);
console.log(arielsCar.describeAccessoryFuel());

console.log(arielsCar.addFuel(45));
console.log(arielsCar.getFuelLevel);

console.log(arielsCar.addFuel(10));
console.log(arielsCar.getFuelLevel);
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
class ElectricCar extends Car {
  public maxBatteryLevel: number;
  private batteryLevel: number;

  constructor (company, model, year, maxBatteryLevel: number){
    super (company, model, year, 0)
    this.maxBatteryLevel = maxBatteryLevel
    this.batteryLevel = 0
  }

  describeAccessoryBattery() {
    return super.describe() + `Max battery KWh capacity: ${this.maxBatteryLevel}, battery capacity: ${this.batteryLevel}.`
  }

  charge(amount: number): void { // -> KWh
    try {
      if(amount <= 0) throw new Error("Cant add negative number or zero!.");

      if((this.batteryLevel + amount) > this.maxBatteryLevel) {
         throw new Error("You have charged over the max battery KWh can handle!")
      } else {
        this.batteryLevel += amount
      }
    }
    catch (error){
      console.error(error);
    }
  }

  get getBatteryLevel() {
    return this.batteryLevel
  }
}

const TeslaModelTest = new ElectricCar(`Tesla`, `3`, 2024, 150)
console.log(TeslaModelTest);
console.log(TeslaModelTest.describeAccessoryBattery());

console.log(TeslaModelTest.charge(145));
console.log(TeslaModelTest.getBatteryLevel);

console.log(TeslaModelTest.charge(10));
console.log(TeslaModelTest.getBatteryLevel);