//primitive types

let x:number = 45;
let y:boolean = true;
let z:string = "hello world";
let a: null = null;
let b: undefined = undefined;


// array - > a list of variables.
let myData: any[] = [1, "hello", true, null, undefined, 45.6];

console.log(myData);

console.log(myData[0]); // 1
console.log(myData[1]); // "hello"

let myNumbers: number[] = [1, 2, 3, 4, 5];
let myStrings: string[] = ["hello", "world", "typescript"];
let myBooleans: boolean[] = [true, false, true];    

myNumbers.push(6); // add a number to the end of the array
myStrings.push("new string"); // add a string to the end of the array
myStrings.push("42"); // add another string to the end of the array

//Methods on arrays
console.log(myNumbers.length); // 6 - the length of the array
console.log(myStrings.indexOf("hello")); // 0 - the index of the string "hello" in the array
console.log(myNumbers.indexOf(4)); // 3 - the index of the number 4 in the array
console.log(myStrings.includes("world")); // true - check if the string "world" is in the array
console.log(myBooleans.includes(false)); // true - check if the boolean false is in
console.log(myNumbers.slice(1, 3)); // [2, 3] - get a slice of the array from index 1 to index 3 (not inclusive)