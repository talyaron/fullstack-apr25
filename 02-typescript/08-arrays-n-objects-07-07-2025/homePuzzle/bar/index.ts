//🟢 Exercise 1.1:
function getArrayLength(arr: any[]): number {
    return arr.length;
}

console.log("Length of [1, 2, 3]:", getArrayLength([1,2,3]));

//🟢 Exercise 1.2: Simple Object Function
function getPersonName(person: { name: string; age: number}): string {
  return person.name;  
}

let testPerson = {name: "Alice", age: 25};
console.log("Person's name:", getPersonName(testPerson));

//🟢 Exercise 1.3: Simple Loop Function
function printNumbers(n: number): void {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

console.log("Numbers 1 to 5:");
printNumbers(5);

//🟡 LEVEL 2: Easy Functions

//Exercise 2.1: Sum Array Elements:
function sumArray(numbers: number[]): number {
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4]));
