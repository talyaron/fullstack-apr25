//1.1
let x: number = 3;
let y: number = 4;
let z: number = 5;
let a: number = 12;

console.log("12 / 3 is:" + (a/x));
console.log("12 / 4 is:" + (a/y));
console.log("12 / 5 is:" + (a/z));
//1.2
let myAge: number = 32;
let birthYear: number = 1993;
let currentYear: number = myAge + birthYear;
 console.log("My age is:" + myAge);
 console.log("Current year is:" + currentYear);
 //1.3
let a = 15;
let b = 4;
console.log("a + b is:" + (a+b));
console.log("a - b is:" + (a-b));
console.log("a * b is:" + (a*b));
console.log("a / b is:" + (a/b));
console.log("a % b is:" + (a%b));
console.log("a ** 2 is:" + (a**2));
//1.4
let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;

if(num1 % 2 ===0){
    console.log(num1 + " is even"); 
} 
    else 
    { console.log(num1 + " is odd"); 
}
if(num2 % 2 ===0){
    console.log(num2 + " is even"); 
} 
    else 
    { console.log(num2 + " is odd"); 
}
if(num3 % 2 ===0){
    console.log(num3 + " is even"); 
} 
    else 
    { console.log(num3 + " is odd"); 
}
if(num4 % 2 ===0){
    console.log(num4 + " is even"); 
} 
    else 
    { console.log(num4 + " is odd"); 
}
if(num5 % 2 ===0){
    console.log(num5 + " is even"); 
} 
    else 
    { console.log(num5 + " is odd"); 
}
//2.1 A
for (let i = 1; i <= 20; i++) {
    if(i%3 === 0) {
        console.log("Fizz");
    }
    else{
        console.log(i);
    }
}
//2.1 B
for (let i = 1; i <= 50; i++) {
    if(i%7 === 1) {
        console.log(i+ "%7= " + (i%7));
    }
    
}
//2.2
let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;
if(test1>0){
    console.log(test1 + "is positive");
}
else if (test1<0){
    console.log(test1 + " is negative");
}
else (test1 ===0){
    console.log(test1 + " is zero");
}
if(test1!==0){
    if(test1 % 2 === 0){
        console.log (test1 + " is even");
    }
    else{
        console.log(test1 + " is odd");
    }
}
else{
    console.log(test1 + " is zero");
}
if(test3%5===0){
    console.log(test3 + " is divisible by 5");
}
else{
    console.log(test3 + " is not divisible by 5");
}
console.log("Square of " + test5 + " is: " + (test5 ** 2));
console.log("Cube of " + test5 + " is: " + (test5 ** 3));

//2.3
let numberOfRows:number = 8;
for (let i = 1; i <= numberOfRows; i++) {
    let rowOutput: string = ''; 
    for (let j = 1; j <= i; j++) {
        
        rowOutput += j;
        if (j !== i) {
            rowOutput += ' ';
        }
    }
    console.log(rowOutput); 
}
//2.4
let score1 = 95;
let score2 = 87;
let score3 = 76;
let score4 = 68;
let score5 = 52;
let score6 = 91;

if (score1 >= 90) {
    console.log(score1 + " is an A");
} else if (score1 >= 80) {
    console.log(score1 + " is a B");
} else if (score1 >= 70) {
    console.log(score1 + " is a C");
} else if (score1 >= 60) {
    console.log(score1 + " is a D");
} else {
    console.log(score1 + " is an F");
}

//3.2
let firstNum = 2;
let secondNum = 6;
let thirdNum = 18;
let fourthNum = 54;
let fifthNum = 162;
//the pattern is each number *3

