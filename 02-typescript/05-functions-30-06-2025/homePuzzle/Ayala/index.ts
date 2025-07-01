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

function suma(a: number, b: number): number {
    return a + b;
}
let x = 3
let y = 8
console.log("The sum of 2+5 is: " + suma(2, 5));
console.log(`The sum of ${x}+${y} is: ${suma(x, y)}`);

console.log("");
console.log(" Challenge 3: Discover What Happens When Things Go Wrong");

function multiplyError(a: number, b: number): number {
    return a * b;
}
//test to see what will happen in case of a wrong type input.
// console.log(multiplyError(5, "tt"));


function multiplyFixed(a: number, b: number): number | undefined {
    try {
        if (typeof a != 'number' || typeof b != 'number') {
            throw new Error("You have to Enter a number!");
        }
        return a * b;
    } catch (error) {
        console.error("Error:", error);
        return undefined
    }
}
