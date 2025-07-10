// TypeScript Programming Exercises

// Level 1: Simple (Follow-up Exercises)
// Exercise 1.1: Modulus Pattern Extension
// console.log(`12 / 3 = ${12 / 3} \n12 / 4 = ${12 / 4} \n12 / 5 = ${12 / 5}`);

// Exercise 1.2: Basic Variables
// let myAge: number = 23;
// let birthYear: number = 2001;
// let currentYear: number = 2025;
// console.log(
//   `My age is: ${myAge}, \nmy birth year is: ${birthYear}, \nand the current year is: ${currentYear}.`
// );

// Exercise 1.3: Simple Arithmetic
// let a: number = 15;
// let b: number = 4;
// console.log(
//   `The sum is: ${a + b}, \nThe difference is: ${a - b}, \nThe product is: ${
//     a * b
//   }, \nThe division is: ${a / b}, \nThe remainder: ${
//     a % b
//   }, \nThe power of 2: ${a ** 2}.`
// );

// Exercise 1.4: Even/Odd Checker
// let num1 = 7;
// let num2 = 12;
// let num3 = 23;
// let num4 = 30;
// let num5 = 45;

// if (num1 % 2 === 0) {
//   console.log(num1 + " is even");
// } else {
//   console.log(num1 + " is odd");
// }

// With array
// let numbers = [num1, num2, num3, num4, num5];

// for (let n of numbers) {
//   if (n % 2 === 0) {
//     console.log(n + " is even");
//   } else {
//     console.log(n + " is odd");
//   }
// }

// Level 2: Medium (Think a Little)
// Exercise 2.1: Modulus Applications

// A
// for (let i = 1; i <= 20; i++) {
//   if (i % 3 === 0) {
//     console.log(`fizz`);
//   }
//   else {
//     console.log(i);
//   }
// }

// B
// for (let i = 1; i < 51; i++) {

//   if (i % 7 === 1) {
//     console.log(`${i} result remainder is, and result is ${i / 7}`);
//   } else {
//     console.log(`${i} request was denied.!`);
//   }
// }

// Exercise 2.2: Number Analyzer
// let test1 = 0;
// let test2 = -8;
// let test3 = 15;
// let test4 = 24;
// let test5 = -7;

// let arrayTests = [test1, test2, test3, test4, test5];

// for (let n of arrayTests) {
//   // a
//   if (n > 0) console.log(`${n} is positive number.`);
//   else if (n < 0) console.log(`${n} is negative number.`);
//   else console.log(`${n} is zero.`);

//   // b
//   if (n % 2 === 0) console.log(`${n} is even number.`);
//   else console.log(`${n} is odd number.`);

//   // c
//   if (n % 5 === 0) console.log(`Yes! divisible by 5!`);
//   else console.log(`Not divisible by 5!`);
  

//   // d
//   console.log(n ** 2);
//   console.log(n ** 3);
  
// }
