// Challenge 1: Create Your First Greeting Function
// let userNameInput: string = prompt(`Hello there!, what's your name?`) || "";
// function userName(userNameInput) {
//   console.log(`Hello, ${userNameInput}! Welcome to programming!`);
// }
// userName(userNameInput)

// Challenge 2: Build a Simple Math Function
// let num1: number = Number(prompt(`number 1!`));
// let num2: number = Number(prompt(`number 2!`));
// function sumFunction(a: number, b: number): number {
//   return a + b
// }
// console.log(sumFunction(num1, num2));

// Challenge 3: Discover What Happens When Things Go Wrong
// let num1: number = Number(prompt(`number 1!`));
// let num2: number = Number(prompt(`number 2!`));
// function multiplyFunction(a: number, b: number): number {
//   return a * b;
// }

// console.log(multiplyFunction(num1, num2));

// Challenge 4: Your First Safety Net with Try-Catch
// let num1: number = Number(prompt(`number 1!`));
// let num2: number = Number(prompt(`number 2!`));
// function divisionFunction(a: number, b: number): number | undefined {
//   try {
//     if (b === 0) throw new Error("Division by zero is not allowed");
  
//     return a / b;
//   } catch (e) {
//     console.error(`${e}`);
    
//     return undefined; // Return undefined if division by zero occurs
//   }
// }
// console.log(divisionFunction(num1, num2));

// Challenge 5: Input Validation Master
// let num1Input = Number(prompt(`Give me a number to square!`))
// function squareFunction(a: number){
//   try {
//   if (typeof a !== "number" || isNaN(a) || !isFinite(a)) throw new Error("is not a number, invalid input!");

//   return a * a
//   } catch (e) {
//     console.error(e);
    
//     return undefined
//   }
// }

// console.log(squareFunction(num1Input));

// Challenge 6: Real-World Data Validation
let nameUserInput = prompt(`Wha'ts your name?`) || "";
let ageUserInput = Number(prompt(`What's your age?`))

function userDetailsCheckValidetion(name , age) {
  try {
    if (typeof name !== "string" || name.length === 0 || name.trim().length === 0) throw new Error("Invalid name!");

    if ( typeof age !== "number" || isNaN(age) || !isFinite(age) || age < 0 || age > 150) throw new Error("Invalid age. Please enter a number between 0 and 150.");
    
    
    return `Hello ${name.trim()}! age...${age}`;
    
  } catch (e) {
    console.error(e);
    
    return undefined
  }
}

console.log(userDetailsCheckValidetion(nameUserInput, ageUserInput));