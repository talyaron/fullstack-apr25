// TypeScript Programming Exercises

// Level 1: Simple (Follow-up Exercises)
// Exercise 1.1: Modulus Pattern Extension
console.log(`12 / 3 = ${12 / 3} \n12 / 4 = ${12 / 4} \n12 / 5 = ${12 / 5}`);

// Exercise 1.2: Basic Variables
let myAge: number = 23;
let birthYear: number = 2001;
let currentYear: number = 2025;
console.log(
  `My age is: ${myAge}, \nmy birth year is: ${birthYear}, \nand the current year is: ${currentYear}.`
);

// Exercise 1.3: Simple Arithmetic
let a: number = 15;
let b: number = 4;
console.log(
  `The sum is: ${a + b}, \nThe difference is: ${a - b}, \nThe product is: ${
    a * b
  }, \nThe division is: ${a / b}, \nThe remainder: ${
    a % b
  }, \nThe power of 2: ${a ** 2}.`
);

// Exercise 1.4: Even/Odd Checker
let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;

// if (num1 % 2 === 0) {
//   console.log(num1 + " is even");
// } else {
//   console.log(num1 + " is odd");
// }

// With array
let numbers = [num1, num2, num3, num4, num5];

for (let n of numbers) {
  if (n % 2 === 0) {
    console.log(n + " is even");
  } else {
    console.log(n + " is odd");
  }
}