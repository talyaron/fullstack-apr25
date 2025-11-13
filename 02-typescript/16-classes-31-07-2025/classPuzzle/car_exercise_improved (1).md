# Object-Oriented Programming Exercise: Car and ElectricCar Classes

## Objective
Practice inheritance, encapsulation, and method overriding by creating a vehicle class hierarchy.

## Part 1: Create the Car Class

Create a `Car` class with the following specifications:

### Constructor Parameters
- `company` (string) - The car manufacturer
- `model` (string) - The car model name
- `year` (number) - Year of production
- `maxTank` (number) - Maximum fuel tank capacity in liters

### Properties
- Create a **protected** property `fuelLevel` (number) to track current fuel amount
- Initialize `fuelLevel` to 0 in the constructor

### Methods
1. **`describe()`** - Returns a string describing the car with company, model, year, and current fuel level
2. **`addFuel(amount)`** - Adds fuel to the tank
   - Parameter: `amount` (number) - liters of fuel to add
   - Ensure the tank doesn't exceed `maxTank` capacity
   - Return appropriate feedback about the fueling process
3. **`getFuelLevel()`** - Getter method that returns the current fuel level

## Part 2: Create the ElectricCar Class

Create an `ElectricCar` class that **extends** the `Car` class:

### Constructor Parameters
- `company` (string) - The car manufacturer
- `model` (string) - The car model name  
- `year` (number) - Year of production
- `maxBattery` (number) - Maximum battery capacity in kWh

### Additional Properties
- Create a **protected** property `batteryLevel` (number) to track current battery charge
- Initialize `batteryLevel` to 0 in the constructor

### Methods
1. **`describe()`** - Override the parent method to describe the electric car with company, model, year, and current battery level (instead of fuel level)
2. **`charge(amount)`** - Charges the battery
   - Parameter: `amount` (number) - kWh to add to battery
   - Ensure the battery doesn't exceed `maxBattery` capacity
   - Return appropriate feedback about the charging process
3. **`getBatteryLevel()`** - Getter method that returns the current battery level

## Challenge Requirements

- In the `ElectricCar` class, override the inherited `describe()` method to display battery information instead of fuel information
- Ensure proper encapsulation using protected properties
- Implement bounds checking in both `addFuel()` and `charge()` methods

## Bonus Points
- Add validation for negative amounts in fuel/charging methods
- Include error handling for invalid constructor parameters
- Add a method to calculate remaining range based on fuel/battery level