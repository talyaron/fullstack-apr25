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

function divide(a: number, b: number): number | undefined {
  try {
    //Edge case
    if (b === 0) throw new Error("Division by zero is not allowed");
    if (isNaN(b)) throw new Error("Invalid input: b is not a number");
    if (isNaN(a)) throw new Error("Invalid input: a is not a number");

    return a / b;
  } catch (e) {
    console.error("Error:", e);

    return undefined; // Return undefined if division by zero occurs
  }
}

console.log("divide:", divide(10, 2)); // Output: divide: 5
console.log("divide:", divide(10, 0)); // Output: divide: Infinity
console.log("divide 2:", divide(10,undefined)); // Output: divide: 2
