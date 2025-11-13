console.log("Exercise 1: Create Your First Array");
function firstArray(a: number, b: number, c: number): number[] {
    let arr: number[] = [a, b, c]
    return (arr)
}

console.log(firstArray(10, 20, 30));

console.log("");
console.log("Exercise 2: Access Elements by Their Position");
function animals(arr: string[]): string {
    return arr[1]
}
console.log(animals(["dog", "cat", "lizard"]));

console.log("");
console.log("Exercise 3: Add New Items with Push");
function food(): string[] {
    let arr: string[] = [];
    arr.push("pizza");
    arr.push("sushi");
    arr.push("pasta");


    return arr;
}
console.log(food());


console.log("");
console.log("Exercise 4: Count What's in Your Array");
function color() {
    let arr = ["Red", "Blue", "black", "white", "grey"]
    return (`There are ${arr.length} colors in the array`)

}
console.log(color());

console.log("");
console.log("Exercise 5: Use a Loop to Look at Every Item");
function looping() {
    let arr = [5, 4, 6, 10];
    for (let i = 0; i < arr.length; i++) {
        console.log(`${arr[i]} in the power of 2 is: ${arr[i] ** 2}`);
    }
}
console.log(looping());

console.log("");
console.log("Exercise 6: Find a Specific Item");
function names(name: string): boolean {
    let arr = ["Or", "Ayala", "Davia", "Shay", "Noam"];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === name) {
            return true;
        }
    }
    return false;
    // return arr.includes(name);


}
console.log(names("Ayala"));
console.log(names("Shir"));

console.log("");
console.log("Exercise 7: Build an Array Step by Step");
function seven() {
    let arr: number[] = [];
    for (let i = 1; i <= 5; i++) {
        arr.push(i)
    }
    return arr
}
console.log(seven());

console.log("");
console.log("Final Exercise: Put It All Together");
function final() {
    let arr: number[] = [-5, 6, 10];
    console.log(arr);
    
    
    arr.push(3)
    arr.push(33)
    for (let i = 0; i < arr.length; i++) {
        console.log(`In position ${i} the number is: ${arr[i]}`);
    }
}
console.log(final());






