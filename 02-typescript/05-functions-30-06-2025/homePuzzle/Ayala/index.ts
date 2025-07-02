console.log("Functions and Try-Catch Coding Challenges");
console.log("Challenge 1: Create Your First Greeting Function");

function greetings(name: string): string {
    return `Hi ${name}, nice to meet you!`;
}

console.log(greetings("Ayala"));
console.log(greetings("Tal"));
console.log(greetings("Ori"));

console.log("");
console.log("Challenge 2: Build a Simple Math Function");

function sum(a: number, b: number): number {
    return a + b;
}

let x = 3
let y = 8
console.log("The sum of 2+5 is: " + sum(2, 5));
console.log(`The sum of ${x}+${y} is: ${sum(x, y)}`);

console.log("");
console.log(" Challenge 3: Discover What Happens When Things Go Wrong");

function multiplyError(a: number, b: number): number {
    return a * b;
}
//test to see what will happen in case of a wrong type input.
// console.log(multiplyError(5, "tt"));

console.log("");
console.log("Challenge 4: Your First Safety Net with Try-Catch");

function devisionFixed(a: number, b: number): number | undefined {
    try {

        if (b == 0) throw new Error("You cant devide a number by 0!");

        return a / b;
    } catch (error) {
        console.error(error);
        return undefined
    }

}
console.log(devisionFixed(10, 2));
console.log(devisionFixed(5, 0));

console.log("");
console.log(" Challenge 5: Input Validation Master");

function square(a: number): number | undefined {
    try {
        // if (typeof a != 'number' || Number.isNaN(a) || a === Infinity || a === -Infinity) {
        if (!Number.isFinite(a)) {
            throw new Error("You have to Enter a valid number!");
        }
        return a ** 2;
    } catch (error) {
        console.error(error);
        return undefined
    }
}
console.log(square(-3));
console.log(square(61467));
console.log(square(NaN));
// console.log(square("Hello"));

console.log("");
console.log("Challenge 6: Real-World Data Validation");
function login(name: string, age: number) {
    try {
        if (typeof name != "string" || name.trim().length == 0) {
            throw new Error("Your user name is not valid, try again");
        }
        if (!Number.isFinite(age) || age <= 0 || age > 120) {
            throw new Error("You have to Enter a valid age!");
        }

        return (`Hello ${name}, we see that you are already ${age}, welcome to our website!`);

    } catch (error) {
        console.error(error);
        return undefined;
    }
}
//testing
console.log(login("Ayala", 21));
console.log(login("Noam", 55));
// console.log(login(true, " 55"));
console.log(login("  ", 155));
console.log(login("132", -10));

console.log("");
console.log("Final Challenge: Build a Comprehensive Calculator");
function calc(x: number, y: number, operator: string) {
    let operatorList: string[] = ["+", "-", "/", "*"]
    try {
        if (!Number.isFinite(x)) {
            throw new Error(x + " is not a valid number, try again.");
        }
        if (!Number.isFinite(y)) {
            throw new Error(y + " is not a valid number, try again.");
        }
        if (!operatorList.includes(operator)) {
            throw new Error(operator + " is not valid as an operator, try again.");
        }
        if (operator === "/" && y === 0) throw new Error("You cant devide a number by 0!");


        if (operator === "+") {
            return (x + " plus " + y + ` is: ` + (x + y))
        }
        if (operator === "-") {
            return (x + " minus " + y + ` is: ` + (x - y))
        }
        if (operator === "*") {
            return (x + " multiplied by " + y + ` is: ` + (x * y))
        }
        if (operator === "/") {
            return (x + " devided by " + y + ` is: ` + (x / y))
        }

    } catch (error) {
        console.error(error);

    }

}
//testing
console.log(calc(5, 6, "/"));
console.log(calc(5, 6, "+"));
console.log(calc(5, 6, "-"));
console.log(calc(5, 6, "*"));
// console.log(calc("N", 6, "S"));
console.log(calc(3, 6, "S"));
console.log(calc(5, 0, "/"));




console.log("");
