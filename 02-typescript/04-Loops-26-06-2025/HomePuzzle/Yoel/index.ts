// -- exercise 1.1 -- //

const number: number = 12;

const divideBy3 = number / 3;
const divideBy4 = number / 4;
const divideBy5 = number / 5;

console.log("12 divided by 3 =", divideBy3);
console.log("12 divided by 4 =", divideBy4);
console.log("12 divided by 5 =", divideBy5);
console.log("~~~~~~~~~~~~~New Exercise~~~~~~~~~~~~~~~~~");
// -- exercise 1.2 -- //

let myAge: number = 25;
let birthYear: number = 1999;
let currentYear: number = myAge + birthYear;

console.log("My age is: " + myAge);
console.log("My birth year is: " + birthYear);
console.log("The current year is: " + currentYear);
console.log("~~~~~~~~~~~~~New Exercise~~~~~~~~~~~~~~~~~");
// -- Exercise 1.3 -- //

let a = 15;
let b = 4;

console.log("The sum of a and b is:", a + b);
console.log("The difference (a - b) is:", a - b);
console.log("The product of a and b is:", a * b);
console.log("a divided by b is:", a / b);
console.log("The remainder when a is divided by b is:", a % b);
console.log("a to the power of 2 is:", a ** 2);
console.log("~~~~~~~~~~~~~New Exercise~~~~~~~~~~~~~~~~~");
// -- Exercise 1.4 -- Checking if number is even or odd //

let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;

if (num1 % 2 === 0) {
  console.log(num1 + " is even");
} else {
  console.log(num1 + " is odd");
}
if (num2 % 2 === 0) {
  console.log(num1 + " is even");
} else {
  console.log(num1 + " is odd");
}
if (num3 % 2 === 0) {
  console.log(num1 + " is even");
} else {
  console.log(num1 + " is odd");
}
if (num4 % 2 === 0) {
  console.log(num1 + " is even");
} else {
  console.log(num1 + " is odd");
}
if (num5 % 2 === 0) {
  console.log(num1 + " is even");
} else {
  console.log(num1 + " is odd");
}

console.log("~~~~~~~~~~~~~New Exercise~~~~~~~~~~~~~~~~~");
// -- Level 2 -- //

for (let i = 1; i <= 21; i++) {
  if (i % 3 !== 0) console.log("Number:", i);
  else {
    console.log("Fizz");
  }
}
console.log("~~~~~~~~~~~~~New Exercise~~~~~~~~~~~~~~~~~");

for (let i = 1; i <= 51; i++) {
  if (i % 7 === 1)
    console.log("The number", i, "leaves a remainder of 1 when devided by 7");
}
console.log("~~~~~~~~~~~~~New Exercise~~~~~~~~~~~~~~~~~");

let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;

let testing = test5;

if (testing > 0) {
  if (testing % 2 === 0) console.log(testing, "is positive and even");
  else console.log(testing, "is positive and odd");
  if (testing % 5 === 0)
    console.log(testing, "is divisible by 5, and positive.");
  else console.log(testing, "is not divisble by 5 but is positive");
  console.log(testing, "is positive");
}
if (testing < 0) {
  console.log(testing, "is negative");
} else {
  console.log(testing, "is zero");
}
console.log(testing, " square is", testing ** 2);
console.log(testing, " cube is", testing ** 3);


// not done yet sadly //