//Challenge 1: Personalized Greeting Function
function greet(name: string): string {
    return `Hello, ${name}! Welcome to programming!`;
}

console.log(greet("Bar"));
console.log(greet("Alice"));
console.log(greet("Bob"));

//Challenge 2: Build a Simple Math Function
function addNumbers(a: number, b: number): number {
    return a + b;
}

console.log(addNumbers(5, 2));
console.log(addNumbers(10, 5));
console.log(addNumbers(-2, 7)); 

//Challenge 3: Discover What Happens When Things Go Wrong
function multiply(a: number, b: number): number {
    return a * b;
}
console.log(multiply(5, 2));
console.log(multiply(5, "hello"));
console.log(multiply(7));
console.log(multiply("8", 2));

//Challenge 4: Your First Safety Net with Try-Catch
function safeDivide(a: number, b: number): number | string {
    try{
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return a / b;
    } catch (error) {
        return (error as Error).message;
    }
}

console.log(safeDivide(10, 2));
console.log(safeDivide(8, 0));

//Challenge 5: Input Validation Master
function square(input: any): number | string {
    try{
        if (typeof input !== "number") {
            throw new Error("input is not a number.");
        }
        if (isNaN(input) || !isFinite(input)) {
            throw new Error("input must be valid, finite number.");
        }
        return input ** 2;
    } catch (error) {
        return (error as Error).message;
    }
}

console.log(square(4));         // 16
console.log(square("hello"));   // Input is not a number.
console.log(square(true));      // Input is not a number.
console.log(square(undefined)); // Input is not a number.
console.log(square(NaN));       // Input must be a valid, finite number.


//✅ Final Challenge: Comprehensive Calculator
function calculate(operation: string, num1: any, num2: any): number | string {
 try {
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        throw new Error("Both inputs must be numbers.");
    }

    if (operation === "divide" && num2 === 0) {
        throw new Error ("Division by zero is not allowed.");
    }

    if (operation === "divide" && num2 === 0) {
        throw new Error ("Division by zero is not allowed.");
    }

    switch (operation) {
        case "add":
            return num1 + num2;
            case "subtract":
                return num1 - num2;
                case "multiply":
                return num1 * num2;
                case "divide":
                return num1 / num2;
                default: 
                throw new Error("Unsupported operation. Try add, subtract, multiply, or divide.");
    }
 } catch (error) {
    return (error as Error).message;
 }
}

console.log(calculate("add", 5, 3));        // 8
console.log(calculate("subtract", 10, 4));  // 6
console.log(calculate("multiply", 6, 7));   // 42
console.log(calculate("divide", 12, 3));    // 4
console.log(calculate("divide", 5, 0));     // "Division by zero is not allowed."
console.log(calculate("power", 2, 3));      // "Unsupported operation..."
console.log(calculate("add", "hi", 5));     // "Both inputs must be numbers."