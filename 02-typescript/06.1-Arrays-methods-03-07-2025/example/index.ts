let names:Array<string> = ["Alice", "Bob", "Charlie"];

let nameStrings:string = names.join(", "); // Join the array elements into a single string, separated by ", "
console.log(nameStrings);

let nameArray: Array<string> = nameStrings.split(", "); // Split the string back into an array using ", " as the separator
console.log(nameArray);

let name2: Array<string> = names.slice(0, 2); //copy the first two elements of the array // splice is used to extract elements from an array
console.log(name2);
console.log(names);

//find another just to copy alice and bob.

// normal function
function add(a: number, b: number): number {
    return a + b;
}

//arrow function
let multiply = (a: number, b: number): number => {
    return a * b;
}

//methods with callback
names.forEach((name: string, index:number) => {
    console.log(`${index}: ${name}` + " is a name in the array.");
});

let numbers: Array<number> = [1, 2, 3, 4, 5];

let multiplyByTwo = numbers.map((num: number) => {
    return num * 2;
});
console.log(multiplyByTwo);


let userData: Array<string> = [];

let userName = prompt("Enter your name: ");
if (userName) {
    userData.push(userName);
}

console.log(userData[0]) We'll kumaria police chamashadi would say that