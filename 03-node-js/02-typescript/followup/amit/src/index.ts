console.log('Hello, TypeScript with Node.js!');

const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting('World...4434634564'));


for (let i = 1; i <= 10; i++) {
  console.log(i);
}

for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

function filterdUsers() {
  const users = [
    {name: "amit", age: 24},
    {name: "sagiv", age: 32},
    {name: "tamir", age: 26},
    {name: "stav", age: 50}
  ]
  const filteredUser = users.filter(user => user.age > 30);
  console.log(filteredUser);
}

filterdUsers();

function filter() {
  const numbers = [1, 10, 20, 30, 300, 500]
  const filteredNumbers = numbers.filter(f => f > 50);
  console.log(filteredNumbers);
}

filter();

function find() {
  const names = ["amit", "sagiv", "tamir", "stav"];
  const foundNames = names.find(f => f === "amit");
  console.log(foundNames);
}

find();

function sort() {
  const nums = [102, 34, 3, 56, 23, 1, 45, 6];
  const sortedNums = nums.sort((a, b) => a - b);
  console.log(sortedNums);
}

sort();

function decSort() {
  const nums = [102, 34, 3, 56, 23, 1, 45, 6];
  const sortedNums = nums.sort((a, b) => b - a);
  console.log(sortedNums);
}

decSort();

function mapNumbers() {
  const nums = [10, 20, 30, 40 ,50];
  const doubledNums = nums.map(n => n * 2);
  console.log(doubledNums);
}

mapNumbers();

const arr = [5, 2, 1];
arr.sort((a, b) => a - b);
console.log(arr);


function reduceNums() {
  const nums = [10, 20, 30, 40];
  const reducedNums = nums.reduce((acc, curr) => acc + curr, 0);
  console.log(reducedNums);
}

reduceNums();

function sliceMethod() {
  const letters = ["a", "b", "c", "d", "e"];
  const sliced = letters.slice(1, 3);
  console.log(sliced);
}

sliceMethod();

function spliceMethod() {
  const arr = ["dog", "rabbit"];
  arr.splice(1, 1);
  console.log(arr);
}

spliceMethod();

// challenge 1

const names = ["Amit", "Sagiv", "Tamir", "Stav"];
names.forEach((u) => console.log("Hello " + u));

// challenge 2

const numbers = [10, 20, 30, 40];
const reduceNumbers = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(reduceNumbers);

// challenge 3

const letters = ["a", "b", "c", "d", "e", "f"];
const slicedLettters = letters.slice(2, 5);
console.log(slicedLettters);

// challenge 4

const fruits = ["apple", "banana", "cherry", "orange"];
const splicedFruits = fruits.splice(1, 1, "Mango");
console.log(splicedFruits);
