let names:Array<string> = ["Alice", "Bob", "Charlie"];

let nameStrings:string = names.join(", "); // Join the array elements into a single string, separated by ", "
console.log(nameStrings);

let nameArray: Array<string> = nameStrings.split(", "); // Split the string back into an array using ", " as the separator
console.log(nameArray);

let name2: Array<string> = names.slice(0, 2); //copy the first two elements of the array // splice is used to extract elements from an array
console.log(name2);
console.log(names);

//find another just to copy alice and bob.