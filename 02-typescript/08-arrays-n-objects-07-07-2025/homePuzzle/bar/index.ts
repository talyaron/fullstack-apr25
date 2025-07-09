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

//🟡 Exercise 2.2: Count Objects in an Array:
function countPeople(people: { name: string, age: number}[]): number {
 return people.length;   
}

let people = [
    { name: "Alice", age: 25},
    { name: "Bob", age: 30},
    { name: "Charlie", age: 35}
];

console.log("Number of people:", countPeople(people));
people.push({name: "Diana", age: 40});
console.log("After adding Diana", countPeople(people));

people.pop();
console.log("After removing the last person:", countPeople(people));

people.shift();
console.log("After removing the first person:", countPeople(people));

//🟡 Exercise 2.3: Find the Largest Number:
function findLargest(numbers: number[]): number {
    let largest = numbers [0]; 

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers [i];
        }
    }
    return largest;
}

console.log("Largest in [5, 2, 9, 1]:", findLargest([5, 2, 9, 1]));