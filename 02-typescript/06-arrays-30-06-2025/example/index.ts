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