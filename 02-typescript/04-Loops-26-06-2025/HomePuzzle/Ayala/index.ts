console.log("Level 1");

console.log("Exercise 1.1: Modulus Pattern Extension");
let num: number = 12;

for (let i = 3; i <= 5; i++) {
    console.log(num + " devided by " + i + " is: " + (num / i));
}
console.log("");
console.log("Exercise 1.2: Basic Variables");
let myAge: number = 21/* your age */;
let birthYear: number = 2004 /* your birth year */;
let currentYear: number = myAge + birthYear;

console.log("My age is- " + myAge);
console.log("My birth year is- " + birthYear);
console.log(currentYear + " is our current year.");

console.log("");
console.log("Exercise 1.3: Simple Arithmetic");
let a = 15;
let b = 4;
console.log("The result of " + a + "+" + b + " is: " + (15 + 4));
console.log("The result of " + a + "-" + b + " is: " + (15 - 4));
console.log("The result of " + a + "/" + b + " is: " + (15 / 4));
console.log("The remainder of " + a + "/" + b + " is: " + (15 % 4));
console.log("The result of " + a + " to the power of 2 is: " + (15 ** 2));

console.log("");
console.log("Exercise 1.4: Even/Odd Checker");
let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;

if (num1 % 2 === 0) {
    console.log(num1 + " is an even number.");
}
else {
    console.log(num1 + " is an odd number.");
}
if (num2 % 2 === 0) {
    console.log(num2 + " is an even number.");
}
else {
    console.log(num2 + " is an odd number.");
}
if (num3 % 2 === 0) {
    console.log(num3 + " is an even number.");
}
else {
    console.log(num3 + " is an odd number.");
}
if (num4 % 2 === 0) {
    console.log(num4 + " is an even number.");
}
else {
    console.log(num4 + " is an odd number.");
}
if (num5 % 2 === 0) {
    console.log(num5 + " is an even number.");
}
else {
    console.log(num5 + " is an odd number.");

}

console.log("");

console.log("Level 2");

console.log("Exercise 2.1: Modulus Applications");
console.log("A-modulu 3");

for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0) {
        console.log("Fizz");
    }
    else {
        console.log(i);

    }
}
console.log("");
console.log("B-modulu 7 = 1");

for (let i = 1; i <= 50; i++) {
    if (i % 7 === 1) {
        console.log(i + " devided by 7 is: " + (i / 7));
    }
}
console.log("");
console.log("Exercise 2.2: Number Analyzer");
let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;

if (test1 > 0) { console.log(test1 + " is positive"); }
else if (test1 < 0) { console.log(test1 + " is negative"); }
else { console.log(test1 + " is zero"); }

if (test2 > 0) { console.log(test2 + " is positive"); }
else if (test2 < 0) { console.log(test2 + " is negative"); }
else { console.log(test2 + " is zero"); }

if (test3 > 0) { console.log(test3 + " is positive"); }
else if (test3 < 0) { console.log(test3 + " is negative"); }
else { console.log(test3 + " is zero"); }

if (test4 > 0) { console.log(test4 + " is positive"); }
else if (test4 < 0) { console.log(test4 + " is negative"); }
else { console.log(test4 + " is zero"); }


if (test5 > 0) { console.log(test5 + " is positive"); }
else if (test5 < 0) { console.log(test5 + " is negative"); }
else { console.log(test5 + " is zero"); }
console.log("");

if (test2 % 2 === 0) {
    console.log(test2 + " is an even number.");
}
else {
    console.log(test2 + " is an odd number.");
}
if (test3 % 2 === 0) {
    console.log(test3 + " is an even number.");
}
else {
    console.log(test3 + " is an odd number.");
}
if (test4 % 2 === 0) {
    console.log(test4 + " is an even number.");
}
else {
    console.log(test4 + " is an odd number.");
}
if (test5 % 2 === 0) {
    console.log(test5 + " is an even number.");
}
else {
    console.log(test5 + " is an odd number.");

}
console.log("");

if (test1 % 5 === 0) {
    console.log(test1 + " is divisible by 5.");
}

if (test2 % 5 === 0) {
    console.log(test2 + " is divisible by 5.");
}

if (test3 % 5 === 0) {
    console.log(test3 + " is divisible by 5.");
}

if (test4 % 5 === 0) {
    console.log(test4 + " is divisible by 5.");
}

if (test5 % 5 === 0) {
    console.log(test5 + " is divisible by 5.");
}
console.log("");
for (let i = 0; i <= test1; i++) {

    if ((i ** 2) === test1 && (i ** 3) === test1) {
        console.log(test1 + " is square and cube.");
    }
    else if ((i ** 2) === test1) {
        console.log(test1 + " is square.");
    }
    else if ((i ** 3) === test1) {
        console.log(test1 + " is cube.");
    }
}

for (let i = 0; i > test2; i--) {


    if ((i ** 2) === test2 && (i ** 3) === test2) {
        console.log(test2 + " is square and cube.");
    }
    else if ((i ** 2) === test2) {
        console.log(test2 + " is square.");
    }
    else if ((i ** 3) === test2) {
        console.log(test2 + " is cube.");
    }
}

for (let i = 0; i < test3; i++) {

    if ((i ** 2) === test3 && (i ** 3) === test3) {
        console.log(test3 + " is square and cube.");
    }
    else if ((i ** 2) === test3) {
        console.log(test3 + " is square.");
    }
    else if ((i ** 3) === test3) {
        console.log(test3 + " is cube.");
    }
}

for (let i = 0; i < test4; i++) {

    if ((i ** 2) === test4 && (i ** 3) === test4) {
        console.log(test4 + " is square and cube.");
    }
    else if ((i ** 2) === test4) {
        console.log(test4 + " is square.");
    }
    else if ((i ** 3) === test4) {
        console.log(test4 + " is cube.");
    }
}

for (let i = 0; i < test5; i++) {

    if ((i ** 2) === test5 && (i ** 3) === test5) {
        console.log(test5 + " is square and cube.");
    }
    else if ((i ** 2) === test5) {
        console.log(test5 + " is square.");
    }
    else if ((i ** 3) === test5) {
        console.log(test5 + " is cube.");
    }
}
console.log("");
console.log("Exercise 2.3: Pattern Generator");

let text: string = "1"

for (let i = 2; i <= 6; i++) {
    console.log(text);
    text += (" " + i)

}

console.log("");
console.log("Exercise 2.4: Grade Calculator");


// Grade scale:
// A: 90-100
// B: 80-89
// C: 70-79
// D: 60-69
// F: below 60

let score1 = 95;
let score2 = 87;
let score3 = 76;
let score4 = 68;
let score5 = 52;
let score6 = 91;

if (score1 >= 90) {
    console.log(score1 + " is an A");
}
else if (score1 >= 80) {
    console.log(score1 + " is a B");
} else if (score1 >= 70) {
    console.log(score1 + " is a C");
} else if (score1 >= 60) {
    console.log(score1 + " is a D");
} else {
    console.log(score1 + " is a F");
}
if (score2 >= 90) {
    console.log(score2 + " is an A");
}
else if (score2 >= 80) {
    console.log(score2 + " is a B");
} else if (score2 >= 70) {
    console.log(score2 + " is a C");
} else if (score2 >= 60) {
    console.log(score2 + " is a D");
} else {
    console.log(score2 + " is a F");
}
if (score3 >= 90) {
    console.log(score3 + " is an A");
}
else if (score3 >= 80) {
    console.log(score3 + " is a B");
} else if (score3 >= 70) {
    console.log(score3 + " is a C");
} else if (score3 >= 60) {
    console.log(score3 + " is a D");
} else {
    console.log(score3 + " is a F");
}
if (score4 >= 90) {
    console.log(score4 + " is an A");
}
else if (score4 >= 80) {
    console.log(score4 + " is a B");
} else if (score4 >= 70) {
    console.log(score4 + " is a C");
} else if (score4 >= 60) {
    console.log(score4 + " is a D");
} else {
    console.log(score4 + " is a F");
}
if (score5 >= 90) {
    console.log(score5 + " is an A");
}
else if (score5 >= 80) {
    console.log(score5 + " is a B");
} else if (score5 >= 70) {
    console.log(score5 + " is a C");
} else if (score5 >= 60) {
    console.log(score5 + " is a D");
} else {
    console.log(score5 + " is a F");
}
if (score6 >= 90) {
    console.log(score6 + " is an A");
}
else if (score6 >= 80) {
    console.log(score6 + " is a B");
} else if (score6 >= 70) {
    console.log(score6 + " is a C");
} else if (score6 >= 60) {
    console.log(score6 + " is a D");
} else {
    console.log(score6 + " is a F");
}

console.log("");
console.log("Level 3");
console.log("Exercise 3.1: Prime Number Detector");
console.log("All the primery numbers between 1-100");

for (let i = 1; i <= 100; i++) {
    let isPrimery: boolean = true;
    for (let x = 2; x < i; x++) {
        if (i % x === 0) {
            isPrimery = false;
        }
    }
    if (isPrimery === true) {
        console.log(i);

    }
}

console.log("");
console.log("Exercise 3.2: Number Sequence Analyzer");
let firstNum = 2;
console.log("The fisrt number in the sequence is: " + firstNum);

let sum = firstNum
for (let i = 0; i < 15; i++) {
    firstNum = firstNum * 3;
    console.log("The next number in the sequence is: " + firstNum);
    sum += firstNum;
    if (firstNum % 9 === 0) {
        console.log(firstNum + " is divisible by 9.");
    }
}
console.log("The sum of all numbers in the sequence is: " + sum);
console.log("");

console.log("Exercise 3.3: Advanced FizzBuzz");

let decimal1 = 8;
let decimal2 = 15;
let decimal3 = 32;
let decimal4 = 47;
let decimal5 = 64;
let org1 = decimal1;
let org2 = decimal2;
let org3 = decimal3;
let org4 = decimal4;
let org5 = decimal5;
let result: string = "";

console.log("Calculating the bianry number of " + decimal1 + ":");
for (; (decimal1 / 2) > 0;) {

    console.log("The remaining of " + decimal1 + " devided by 2 is: " + decimal1 % 2);
    console.log("and we are deviding " + decimal1 + " by 2 and subtructing the remaining of the devisin and we get: " + (decimal1 - (decimal1 & 2)) / 2);
    result = decimal1 % 2 + result;
    decimal1 -= decimal1 % 2;
    decimal1 = decimal1 / 2;
}
console.log("new we have a number that is less then 1 so we stop.");
console.log("We get the bianry number of " + org1 + " is:" + result);
console.log("");

result = "";

console.log("Calculating the bianry number of " + decimal2 + ":");
for (; (decimal2 / 2) > 0;) {

    console.log("The remaining of " + decimal2 + " devided by 2 is: " + decimal2 % 2);
    console.log("and we are deviding " + decimal2 + " by 2 and subtructing the remaining of the devisin and we get: " + (decimal2 - (decimal2 & 2)) / 2);
    result = decimal2 % 2 + result;
    decimal2 -= decimal2 % 2;
    decimal2 = decimal2 / 2;
}
console.log("new we have a number that is less then 1 so we stop.");
console.log("We get the bianry number of " + org2 + " is:" + result);
console.log("");

result = "";

console.log("Calculating the bianry number of " + decimal3 + ":");
for (; (decimal3 / 2) > 0;) {

    console.log("The remaining of " + decimal3 + " devided by 2 is: " + decimal3 % 2);
    console.log("and we are deviding " + decimal3 + " by 2 and subtructing the remaining of the devisin and we get: " + (decimal3 - (decimal3 & 2)) / 2);
    result = decimal3 % 2 + result;
    decimal3 -= decimal3 % 2;
    decimal3 = decimal3 / 2;
}
console.log("new we have a number that is less then 1 so we stop.");
console.log("We get the bianry number of " + org3 + " is:" + result);
console.log("");

result = "";

console.log("Calculating the bianry number of " + decimal4 + ":");
for (; (decimal4 / 2) > 0;) {

    console.log("The remaining of " + decimal4 + " devided by 2 is: " + decimal4 % 2);
    console.log("and we are deviding " + decimal4 + " by 2 and subtructing the remaining of the devisin and we get: " + (decimal4 - (decimal4 & 2)) / 2);
    result = decimal4 % 2 + result;
    decimal4 -= decimal4 % 2;
    decimal4 = decimal4 / 2;
}
console.log("new we have a number that is less then 1 so we stop.");
console.log("We get the bianry number of " + org4 + " is:" + result);
console.log("");

result = "";

console.log("Calculating the bianry number of " + decimal5 + ":");
for (; (decimal5 / 2) > 0;) {

    console.log("The remaining of " + decimal5 + " devided by 2 is: " + decimal5 % 2);
    console.log("and we are deviding " + decimal5 + " by 2 and subtructing the remaining of the devisin and we get: " + (decimal5 - (decimal5 & 2)) / 2);
    result = decimal5 % 2 + result;
    decimal5 -= decimal5 % 2;
    decimal5 = decimal5 / 2;
}
console.log("new we have a number that is less then 1 so we stop.");
console.log("We get the bianry number of " + org5 + " is:" + result);
console.log("");

console.log("Bonus Challenge: Calculator Project");
console.log("לא הצלחתי לעשות");
