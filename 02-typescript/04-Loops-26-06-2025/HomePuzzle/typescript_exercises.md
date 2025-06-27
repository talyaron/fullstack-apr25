# TypeScript Programming Exercises

## Level 1: Simple (Follow-up Exercises)

### Exercise 1.1: Modulus Pattern Extension
Write code that divide number 12 by 3, 4, and 5, and print the results:


### Exercise 1.2: Basic Variables
Create variables and perform operations:
```typescript
// Create variables for your age and birth year
let myAge: number = /* your age */;
let birthYear: number = /* your birth year */;
let currentYear: number = myAge + birthYear;

// Log all three variables with descriptive messages
// Example: console.log("My age is: " + myAge);
```

### Exercise 1.3: Simple Arithmetic
Given these variables, calculate and log the results:
```typescript
let a = 15;
let b = 4;

// Calculate and log:
// - The sum of a and b
// - The difference (a - b)
// - The product of a and b
// - a divided by b
// - The remainder when a is divided by b
// - a to the power of 2
```

### Exercise 1.4: Even/Odd Checker
Write code to check if these numbers are even or odd:
```typescript
let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;

// For each number, write an if statement to check if it's even or odd
// Example: if(num1 % 2 === 0) { console.log(num1 + " is even"); } else { console.log(num1 + " is odd"); }
```

---

## Level 2: Medium (Think a Little)

### Exercise 2.1: Modulus Applications
```typescript
// Use loops and modulus to solve these:

// A) Print numbers 1-20, but replace multiples of 3 with "Fizz"
// Example output: 1, 2, Fizz, 4, 5, Fizz, 7, 8, Fizz...

// B) Check which numbers from 1-50 leave a remainder of 1 when divided by 7
// Print both the number and the division result
```

### Exercise 2.2: Number Analyzer
```typescript
// Create code that analyzes these numbers and tells you:
// - If it's positive, negative, or zero
// - If it's even or odd (only for non-zero numbers)
// - If it's divisible by 5
// - Its square and cube

let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;

// Analyze each number using if statements
// Example for test1:
// if(test1 > 0) { console.log(test1 + " is positive"); }
// else if(test1 < 0) { console.log(test1 + " is negative"); }
// else { console.log(test1 + " is zero"); }
```

### Exercise 2.3: Pattern Generator
```typescript
// Use nested loops to create this pattern:
// 1
// 1 2
// 1 2 3
// 1 2 3 4
// 1 2 3 4 5

// Hint: Use one loop for rows and another for columns
```

### Exercise 2.4: Grade Calculator
```typescript
// Calculate letter grades based on numeric scores
let score1 = 95;
let score2 = 87;
let score3 = 76;
let score4 = 68;
let score5 = 52;
let score6 = 91;

// Grade scale:
// A: 90-100
// B: 80-89
// C: 70-79
// D: 60-69
// F: below 60

// For each score, print the number and corresponding letter grade
// Example: if(score1 >= 90) { console.log(score1 + " is an A"); }
```

---

## Level 3: Hard (Challenging)

### Exercise 3.1: Prime Number Detector
```typescript
// Write code to find all prime numbers between 1 and 100
// A prime number is only divisible by 1 and itself

// Steps:
// 1. Loop through numbers 2 to 100
// 2. For each number, check if it has any divisors other than 1 and itself
// 3. Use the modulus operator to check divisibility
// 4. Print all prime numbers found

// Bonus: Count how many primes you found
```

### Exercise 3.2: Number Sequence Analyzer
```typescript
// Given this sequence: 2, 6, 18, 54, 162...
// 1. Figure out the pattern
// 2. Generate the next 10 numbers in the sequence using variables and loops
// 3. Calculate the sum of all numbers in your sequence
// 4. Find which numbers in your sequence are divisible by 9

let firstNum = 2;
let secondNum = 6;
let thirdNum = 18;
let fourthNum = 54;
let fifthNum = 162;

// Use variables and loops to continue the pattern
// Hint: Look at how each number relates to the previous one
```

### Exercise 3.3: Advanced FizzBuzz
```typescript
// Create an enhanced FizzBuzz for numbers 1-100:
// - Multiples of 3: "Fizz"
// - Multiples of 5: "Buzz"  
// - Multiples of 7: "Bang"
// - Multiples of both 3 and 5: "FizzBuzz"
// - Multiples of both 3 and 7: "FizzBang"
// - Multiples of both 5 and 7: "BuzzBang"
// - Multiples of 3, 5, and 7: "FizzBuzzBang"
// - All other numbers: print the number

// Count how many of each type you printed
```

### Exercise 3.4: Number System Converter
```typescript
// Convert decimal numbers to binary using only arithmetic operations
// (Don't use built-in methods like toString(2))

let decimal1 = 8;
let decimal2 = 15;
let decimal3 = 32;
let decimal4 = 47;
let decimal5 = 64;

// For each decimal number:
// 1. Convert to binary using division by 2 and modulus
// 2. Display the conversion process step by step
// 3. Show the final binary result

// Example for decimal1 (8):
// 8 ÷ 2 = 4 remainder 0
// 4 ÷ 2 = 2 remainder 0  
// 2 ÷ 2 = 1 remainder 0
// 1 ÷ 2 = 0 remainder 1
// Binary: 1000 (reading remainders bottom to top)

// Use loops and variables to implement this for each number
```

---

## Bonus Challenge: Calculator Project
```typescript
// Create a simple calculator that can:
// 1. Take two numbers and an operation (+, -, *, /, %, **)
// 2. Perform the calculation
// 3. Handle division by zero
// 4. Show the calculation history
// 5. Calculate running totals

// Use everything you've learned: variables, operators, conditions, and loops!
```

---

## Solutions Strategy Tips:
- **Simple Level**: Follow the patterns shown in the examples directly
- **Medium Level**: Combine multiple concepts (loops + conditions, variables + operators)
- **Hard Level**: Break complex problems into smaller steps, use nested loops, think about algorithms

Remember to:
- Use proper TypeScript typing
- Add comments explaining your logic
- Test your code with different inputs
- Practice console.log for debugging