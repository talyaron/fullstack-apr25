// let names:Array<string> = ["Alice", "Bob", "Charlie"];

// let nameStrings:string = names.join(", "); // Join the array elements into a single string, separated by ", "
// console.log(nameStrings);

// let nameArray: Array<string> = nameStrings.split(", "); // Split the string back into an array using ", " as the separator
// console.log(nameArray);

// let name2: Array<string> = names.slice(0, 2); //copy the first two elements of the array // splice is used to extract elements from an array
// console.log(name2);
// console.log(names);

// //find another just to copy alice and bob.

// // normal function
// function add(a: number, b: number): number {
//     return a + b;
// }

// //arrow function
// let multiply = (a: number, b: number): number => {
//     return a * b;
// }

// //methods with callback
// names.forEach((name: string, index:number) => {
//     console.log(`${index}: ${name}` + " is a name in the array.");
// });

// let numbers: Array<number> = [1, 2, 3, 4, 5];

// let multiplyByTwo = numbers.map((num: number) => {
//     return num * 2;
// });
// console.log(multiplyByTwo);



////////////////////////////////////////////////////

// let nums: Array<number> = [1, 2, 3, 4, 5]

// // Filter:
// // filter out what i scan...

// let evens = nums.filter(n => n % 2 === 0);
// console.log(evens);

///////////////////////////////////////////////////
// const beasts: Array<string> = ["ant", "bison", "camel", "duck", "bison"];

// // indexOf:
// // figure out which place on the is it.
// // every array start from 0

// console.log(beasts.indexOf("bison"));
// // Expected output: 1

// // Start from index 2
// console.log(beasts.indexOf("bison", 2)); // there are two bisons so, there is option to look from specific place in the array, there is bison in place number 4.
// // Expected output: 4

// console.log(beasts.indexOf("giraffe")); // giraffe is'nt exist in the array, so the output will auto give us back -1.
// // Expected output: -1

// values:
// the iterator brings back every current VALUE of the array: (we can do it with next method, brings us back the info of value and done)
const array1 = ["a", "b", "c"];
const iterator = array1.values();

for (let value of iterator) {
  console.log(value);
//   console.log(iterator);
}



// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

// with next (without for loop):
// const arr = ["a","b","c"];
// const it = arr.values();

// console.log(it.next()); // { value: "a", done: false }
// console.log(it.next()); // { value: "b", done: false }
// console.log(it.next()); // { value: "c", done: false }
// console.log(it.next()); // { value: undefined, done: true } – כי אין עוד איברים