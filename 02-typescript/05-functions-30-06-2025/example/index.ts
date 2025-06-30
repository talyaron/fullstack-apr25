// Functions

// Functions are blocks of code that perform a specific task.
// They can take inputs (parameters) and return outputs (return values).

function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string): string {
    return "Hello, " + name + "!";
}
function multiply(a: number, b: number): number {
    return a * b;
}

let sum = add(5, 10);
let greeting = greet("Alice");
let product = multiply(5, 10);

console.log("sum:", sum); // Output: sum: 15
console.log("greeting:", greeting); // Output: greeting: Hello, Alice!
console.log("product:", product); // Output: product: 50
console.log("Sahar:", greet("Sahar")); // Output: Sahar: Hello, Sahar!