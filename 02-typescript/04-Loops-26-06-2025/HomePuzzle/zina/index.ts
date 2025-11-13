const year =12
console.log (+(year/3));
console.log(+(year/4));
console.log(+(year/5));

    
   let myAge:number=35;
   let birthYear:number=1990;
   let currentYear: number = myAge + birthYear;

console.log("my Age :"+myAge);
console.log("my birthYear:"+birthYear);
console.log("my currentYear:"+ currentYear);


let a=15
let b=4
function add(a:number, b:number): number{return a+b;}
let sum=add(15,4)
console.log("sum",sum)
function difference(a:number,b:number):number{return a-b;}
let minus=difference(15,4)
console.log("minus",minus);
function multiply(a:number,b:number):number{return a*b};
let product=multiply(15,4)
console.log("product",product)
 function result(a:number,b:number):number{return a/b;}
let divide = result(15,4);
console.log("result", divide);
function getReminder(a:number,b:number):number{return a%b}
let reminder = getReminder(15,4);
console.log("remider", getReminder);
let squared=a**a;
console.log("a squared is:",squared);



let num1 = 7;
let num2 = 12;
let num3 = 23;
let num4 = 30;
let num5 = 45;
if(num1 % 2 === 0) { console.log(num1 + " is even"); }
 else { console.log(num1 + " is odd"); }
if (num2 % 2 === 0) { console.log(num2  + "is even"); }
else {console.log(num2+"is odd")}
if(num3 % 2 === 0) { console.log(num3 + " is even"); }
 else { console.log(num3+ " is odd"); }
if (num4 % 2 === 0) { console.log(num4  + "is even"); }
else {console.log(num4+"is odd")}
if(num5 % 2 === 0) { console.log(num5 + " is even"); }
 else { console.log(num5 + " is odd"); }
 if (num2 % 4===0) {console.log(num2+"is even");}
 else {console.log(num2+"is odd")}




 ///level 2
let i: number;
 for(i=1; i<=20; i++)
 {if(i%3===0){console.log("fizz")}
else{console.log(i)}}

for (let i = 1; i <= 50; i++) {
  if (i % 7 === 1) {
    let divisionResult = i / 7;
    console.log(`${i} leaves remainder 1 when divided by 7 → ${divisionResult.toFixed(2)}`);
  }
}



let test1 = 0;
let test2 = -8;
let test3 = 15;
let test4 = 24;
let test5 = -7;
if(test1 > 0) { console.log(test1 + " is positive"); }
else if(test1 < 0) { console.log(test1 + " is negative"); }
 else { console.log(test1 + " is zero"); }
 if(test2 > 0) { console.log(test2 + " is positive"); }
else if(test2 < 0) { console.log(test2 + " is negative"); }
 else { console.log(test2 + " is zero"); }
 if(test3 > 0) { console.log(test3 + " is positive"); }
else if(test3 < 0) { console.log(test3 + " is negative"); }
 else { console.log(test3 + " is zero"); }

if(test4 > 0) { console.log(test4 + " is positive"); }
else if(test4 < 0) { console.log(test4 + " is negative"); }
 else { console.log(test4 + " is zero"); }
 if(test5 > 0) { console.log(test5 + " is positive"); }
else if(test5 < 0) { console.log(test5 + " is negative"); }
 else { console.log(test5 + " is zero"); }


 for (let row = 1; row <= 5; row++) {
  let line = "";
  for (let col = 1; col <= row; col++) {
    line += col + " ";
  }
  console.log(line.trim());
}


let scores = [95, 87, 76, 68, 52, 91];

for (let score of scores) {
  let grade = "";

  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  console.log(`${score} is a ${grade}`);
}



let primeCount = 0;

for (let num = 2; num <= 100; num++) {
  let isPrime = true;

for (let i = 2; i < num; i++) {
  if (num % i === 0) {
    isPrime = false;
    break;
  }
}

  if (isPrime) {
    console.log(num + " is a prime number");
    primeCount++;
  }
}

console.log(`Total prime numbers between 1 and 100: ${primeCount}`);


let sequence: number[] = [2, 6, 18, 54, 162];

for (let i = 0; i < 10; i++) {
  let nextNum = sequence[sequence.length - 1] * 3;
  sequence.push(nextNum);
}
let x = 0;
for (let num of sequence) {
  x += num;
}
console.log("Sum of sequence:", sum);
console.log("Numbers divisible by 9:");
for (let num of sequence) {
  if (num % 9 === 0) {
    console.log(num);
  }
}