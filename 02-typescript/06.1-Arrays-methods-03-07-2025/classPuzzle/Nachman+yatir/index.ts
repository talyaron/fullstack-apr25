let fruits1: string[] = ['apple', 'banana', 'orange'];
let fruits2: string[] = ['grape', 'kiwi', 'watermelon'];

let allFruits = fruits1.concat(fruits2);
console.log(allFruits);


let months1: string[] = ['march', 'july', 'november'];
let months2: string[] = ['april', 'august', 'december'];

let allmonths = months1.concat(months2);


console.log(allmonths);

allmonths.sort();
console.log(allmonths);

let numbers1 = [1, 3025, 5231, 5234, 8212];

let found = numbers1.find((num) => num > 5233);
console.log(found);

