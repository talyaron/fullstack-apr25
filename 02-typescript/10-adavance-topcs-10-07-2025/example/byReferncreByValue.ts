//primitives (by value))
let a: number = 10;
let y: number = a;
a = 40;
console.log("a:", a, "y:", y); // Output: x: 40

//objects (by reference)
// (objects are always passed by reference in JavaScript/TypeScript)
let b = {a: 10};
let c= b; //reference to the same object
b.a = 40;
console.log("b:", b.a, "c:", c.a); 


let ar1 = [1, 2, 3];
let ar2 = ar1; //reference to the same array
ar1[0] = 100;
console.log("ar1:", ar1, "ar2:", ar2);

let ar3 = [...ar1]; //copy of the array (shallow copy) spread operator
ar1[0] = 200;
console.log("ar1:", ar1, "ar2:", ar2, "ar3:", ar3);

//exercise
let q = 100;

function changeQ() {
    q++;
    console.log("q:", q);
}

changeQ(); // Output: q: 101
changeQ(); // Output: q: 102
console.log("q:", q); // Output: q: 102



const letters = ["a", "b", "c"];

function joinLetters(arr: string[]) {
    const newArr = [...arr]; // create a shallow copy of the array
    newArr.push("d");
    console.log("newArr:", newArr.join(", ")); // Output: newArr: a, b, c, d
}

joinLetters(letters); 

console.log("letters:", letters.join(", ")); // Output: letters: a, b, c, d