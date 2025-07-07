let names:Array<string> = ["Alice", "Bob", "Charlie"];
console.log(names);


let nameStrings:string = names.join(", שדד"); // Join the array elements into a single string, separated by ", "
console.log(nameStrings);

let nameArray: Array<string> = nameStrings.split(", שדד"); // Split the string back into an array using ", " as the separator
console.log(nameArray);

let name2: Array<string> = names.slice(0, 2);
console.log(name2);
console.log(names);

//find another just to copy alice and bob.