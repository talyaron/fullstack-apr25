//Level 1
//Exrecise 1.1:
let x = 12;
console.log("12 % 3 =" + (x % 3));
console.log("12 % 4 =" + (x % 4));
console.log("12 % 5 =" + (x % 5));

//Exrecise 1.2:
let myAge: number = 26;
let birthYear: number = 1999:
let currentYear: number = myAge + birthYear;

console.log("My age is: "+ myAge);
console.log("My birth year is: "+ birthYear);
console.log("The current year is: "+currentYear);

//Exrecise 1.3:
let a = 15;
let b = 4;

let sum = a + b;
let difference = a - b;
let product = a * b; 
let quotient = a / b;
let remainder = a % b;
let power = a ** 2;

console.log("Sum: " + sum);
console.log("Difference: " + difference);
console.log("Product: " + product);
console.log("Quotient: "+ quotient);
console.log("remainder: " + remainder);
console.log("a to the power of 2: " + power);

//Exrecise 1.4:
let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;

if (num1 % 2 ===0) {
    console.log(num1 + "is even");
} else {
    console.log(num1 + "is odd");
}

//Level 2
//Exrecise 2.1:
for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0) { 
        console.log("Fizz");
    }else{ 
        console.log(i);
    }
}

//Exrecise 2.1 B:
for (let i = 1; i <=50; i++) {
    if (i % 7 === 1) {
        console.log(i + "leaves a remainder of 1 when devided by 7");
    }
}

//Exrecise 2.2:
const test = 'some value';
let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;


let test1 = 0;

if (test1 > 0) {
    console.log(test1 + "is positive");
} else if (test1 < 0) {
    console.log(test1 + "is negative");
} else {
    console.log(test1 + "is zero");
}

if (test1 !==0) {
    if (test1 % 2===0) {
        console.log(test1 + "is even");
    } else {
        console.log(test1 + "is odd");
    }
}

if (test % 5=== 0) {
    console.log(test1 + "is divisible by 5");
}

console.log("Square of" + test1 + "is:" + (test1 ** 2));
console.log("Cube of" + test1 + "is:" + (test1 ** 3));


let test2 = -8;

if (test2 > -8) {
    console.log(test2 + "is positive");
} else if (test2 < -8) {
    console.log(test2 + "is negative");
} else {
    console.log(test2 + "is zero");
}

if (test2 !==-8) {
    if (test1 % 2===-8) {
        console.log(test2 + "is even");
    } else {
        console.log(test2 + "is odd");
    }
}

if (test2 % 5=== -8) {
    console.log(test2 + "is divisible by 5");
}

console.log("Square of" + test2 + "is:" + (test2 ** 2));
console.log("Cube of" + test2 + "is:" + (test2 ** 3));


let test3 = 15;

if (test3 > 15) {
    console.log(test3 + "is positive");
} else if (test3 < 0) {
    console.log(test3 + "is negative");
} else {
    console.log(test3 + "is zero");
}

if (test3 !==15) {
    if (test3 % 2===15) {
        console.log(test1 + "is even");
    } else {
        console.log(test1 + "is odd");
    }
}

if (test % 5=== 15) {
    console.log(test3 + "is divisible by 5");
}

console.log("Square of" + test3 + "is:" + (test3 ** 2));
console.log("Cube of" + test3 + "is:" + (test3 ** 3));


let test4 = 24;

if (test4 > 0) {
    console.log(test4 + "is positive");
} else if (test4 < 0) {
    console.log(test4 + "is negative");
} else {
    console.log(test4 + "is zero");
}

if (test4 !==0) {
    if (test4 % 2===0) {
        console.log(test4 + "is even");
    } else {
        console.log(test4 + "is odd");
    }
}

if (test % 5=== 24) {
    console.log(test4 + "is divisible by 5");
}

console.log("Square of" + test4 + "is:" + (test4 ** 2));
console.log("Cube of" + test4 + "is:" + (test4 ** 3));


let test5 = -7;

if (test5 > 0) {
    console.log(test5 + "is positive");
} else if (test5 < 0) {
    console.log(test5 + "is negative");
} else {
    console.log(test5 + "is zero");
}

if (test5 !==0) {
    if (test5 % 2===0) {
        console.log(test5 + "is even");
    } else {
        console.log(test5 + "is odd");
    }
}

if (test % 5=== 0) {
    console.log(test5 + "is divisible by 5");
}

console.log("Square of" + test5 + "is:" + (test5 ** 2));
console.log("Cube of" + test5 + "is:" + (test5 ** 3));

//Exrecise 2.3:
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5

for (let row = 1; row <= 5; row++) {
    let line = " ";

    for (let num = 1; num <= row; num++) {
        line += num + " ";
    }
    console.log(line);
}

//Exrecise 2.4:
//You have a list of numeric scores,
//For each one, print its letter grade using this scale:

//Score Range	Grade
//90–100	      A
//80–89	          B
//70–79	          C
//60–69	          D
//< 60	          F
let score1 = 95;
let score2 = 87;
let score3 = 76;
let score4 = 68;
let score5 = 52;
let score6 = 91; 

let score1 = 95;

if (score1  >=90) {
    console.log(score1 + "is an A");
}  else if (score1 >=80) {
    console.log(score1 + "is an B");
}  else if (score1 >=70) {
    console.log(score1 + "is an C");
}  else if (score1 >=60) {
    console.log(score1 + "is a D");
}  else {
    console.log(score1 + "is an F");
}

//Exrecise 3.1:
for (let num = 2; num <= 100; num++) {
    let isPrime = true;

    for (let i = 2; i <num; i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
}
   if (isPrime) {
    console.log(num + "is a prime number");

    let count=0;

    count++;

    console.log("Total primes found;" + count);
   }
}

//Exrecise 3.2:
let current = 2;
let sequence = [current];

for (let i = 0; i < 10; i++) {
    current = current *3;
    sequence.push(current);
}

console.log("Full sequence:" + sequence);

let sum= 0;

for (let i= 0; i < sequence.length; i++) {
    sum+= sequence[i];
}
console.log("Sum of all the numbers: " + sum);

//Exrecise 3.3:
let fizzCount = 0;
let buzzCount = 0;
let bangCount = 0;
let fizzBuzzCount = 0;
let fizzBangCount = 0;
let buzzBangCount = 0;
let fizzBuzzBangCount = 0;
let numberCount = 0;

for (let i = 1; i <= 100; i++) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    if (i % 7 === 0) output += "Bang";

    if (output === "Fizz") fizzCount++;
    else if (output === "Buzz") buzzCount++;
    else if (output === "Bang") bangCount++;
    else if (output === "FizzBuzz") fizzBuzzCount++;
    else if (output === "BuzzBang") buzzBangCount++;
    else if (output === "FizzBuzzBang") fizzBuzzBangCount++;
    else numberCount++;

    console.log(output || i);
}

//Exrecise 3.4:
let decimal = 8;
let binary = "";

while (decimal > 0) {
    let remainder = decimal % 2;
    binary = remainder + binary;
    decimal = Math.floor (decimal / 2);
}

console.log("Binary: " + binary);

let numbers = [8, 15, 32, 47, 64];

for (let i = 0; i < numbers.length; i++) {
    let decimal = numbers[i];
    let binary = "";

    while (decimal > 0) {
        let remainder = decimal % 2;
        binary = remainder + binary;
        decimal = Math.floor (decimal / 2);
    }

    console.log(numbers[i] + "in binary is: " + binary);
}

//Bonus challenge: Calculator Project;

let num1 = 10;
let num2 = 5;
let operator = "+";
let result: number;

if (operator === "+") {
    result = num1 + num2;
} else if (operator === "-") {
    result = num1 - num2;
} else if (operator === "*") {
    result = num1 * num2;
} else if (operator === "/") {
    if (num2 === 0) {
        console.log("Error: Cannot divide by 0");
    } else {
        result = num1 / num2;
    } else {
        console.log("Invalide operator");
    }

    if (result !== undefined) {
        console.log('result: ${num1} ${operator} ${num2} = ${result}');
    }
