const x: number = 10; //global scoped variable
let count: number = 0; //global scoped variable

function exampleFunction() {
    const y: number = 20; // y is scoped to this function
    const z: number = 30; // z is also scoped to this function
    console.log("Inside function, x:", x, "y:", y, "z:", z);

}

// console.log("Outside function, x:", x, "y:", y, "z:", z); // y is not accessible here

exampleFunction(); // Output: Inside function, x: 10 y: 20


for (let i = 0; i < 5; i++) {
    console.log("Inside loop, i:", i); // i is scoped to this loop
}


console.log("Outside loop, i:", i); // i is not accessible here, will output "undefined"


function  getAverage(...numbers: number[]): number {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        let u = numbers[i]; // x is scoped to this loop
        sum += numbers[i];
    }
    console.log("Inside function, x:", u); // x is not accessible here, will output "undefined"
    return sum / numbers.length;
}

//pure function 

function pureFunction(x: number, y: number, count:number): number {
    return x + y + count; // This function does not modify any external state
};

pureFunction(5, 10, count); // Output: 15

function unPureFunction(x: number, y: number): number {
    count++;
    return x + y; // This function does not modify any external state
};

unPureFunction(5, 10); // Output: 15


