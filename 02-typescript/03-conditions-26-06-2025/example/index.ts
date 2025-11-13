//Conditions

console.log(2 == 3); // false
console.log(2 == 2); // true
console.log(2 < 3); // true
console.log(2 > 3); // false
console.log(2 <= 3); // true
console.log(2 >= 3); // false 
console.log(2 != 3); // true --> != not equal to

console.log(2 == "2"); // true --> == compares value, not type
console.log(2 === "2"); // false --> === compares value and type


let x = 8;
if(x %2 === 0) { //code block
    console.log(x + " is even");
} else {
    console.log(x + " is odd");
}