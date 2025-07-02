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
