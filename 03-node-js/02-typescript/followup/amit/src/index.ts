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