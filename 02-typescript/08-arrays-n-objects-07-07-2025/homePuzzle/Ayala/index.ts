console.log(" LEVEL 1: Super Easy Functions");

console.log("Exercise 1.1: Simple array function");

function getArrayLength(arr: any[]): number {
    // Return the length of the array
    return arr.length;
}

// Test it:
console.log("Length of [1,2,3]:", getArrayLength([1, 2, 3])); // Should be 3

console.log("Exercise 1.2: Simple object function");


function getPersonName(person: { name: string, age: number }): string {
    return person["name"];
}

// Test it:
let testPerson = { name: "Alice", age: 25 };
console.log("Person's name:", getPersonName(testPerson)); // Should be "Alice"

console.log("Exercise 1.3: Simple loop function");
function printNumbers(n: number): void {
    let result: Array<number> = [];
    for (let i: number = 1; i <= n; i++) {
        result.push(i)
    }
    console.log(result.join(","));
}

// Test it:
console.log("Numbers 1 to 5:");
printNumbers(5); // Should print 1, 2, 3, 4, 5

console.log(" LEVEL 2: Easy Functions");
console.log("Exercise 2.1: Sum array elements");

function sumArray(numbers: number[]): number {
    let sum = 0;
    numbers.forEach(x => sum += x)
    return sum;
}

// Test it:
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4])); // Should be 10
console.log("Exercise 2.2: Count objects in array");

function countPeople(people: { name: string, age: number }[]): number {

    return people.length;
}

// Test it:
let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 85 },
    {name:"Eli", age:8}

];
console.log("Number of people:", countPeople(people)); // Should be 3

console.log('Exercise 2.3: Find largest number');

function findLargest(numbers: number[]): number {
    let biggest = 0
    for (let x of numbers) {
        if (x > biggest) biggest = x
    }
    return biggest;
}
//test it
console.log("Largest in [5,2,9,1]:", findLargest([5, 2, 9, 1])); // Should be 9

console.log(" LEVEL 3: Medium Functions");
console.log("Exercise 3.1: Filter array by condition");

function getEvenNumbers(numbers: number[]): number[] {
    // Use a loop to collect only even numbers
    let evens: number[] = []//numbers.filter(x=>x%2===0);
    for (let x of numbers)
        if (x % 2 === 0) {
            evens.push(x)
        }
    return evens;
}

// Test it:
console.log("Even numbers from [1,2,3,4,5,6]:", getEvenNumbers([1, 2, 3, 4, 5, 6]));
// Should be [2, 4, 6]

console.log('Exercise 3.2: Find person by name');

function findPersonByName(people: { name: string, age: number }[], searchName: string): { name: string, age: number } | null {
    for (let person of people) {
        if (person.name === searchName) return person;
    }
    return null;
}

// Test it:
console.log("Find Bob:", findPersonByName(people, "Bob")); // Should return Bob's object


console.log("Exercise 3.3: Create array of squares");
function getSquares(numbers: number[]): number[] {
    // Return a new array where each number is squared
    let squares: number[] = numbers.map(x => x ** 2)
    // Your code here
    return squares;
}

// Test it:
console.log("Squares of [1,2,3,4]:", getSquares([1, 2, 3, 4])); // Should be [1, 4, 9, 16]

console.log(" LEVEL 4: Challenging Functions");
console.log("Exercise 4.1: Group people by age range");

function groupByAge(people: { name: string, age: number }[]): {
    young: { name: string, age: number }[],
    older: { name: string, age: number }[]
} {
    let result = {
        young: [] as { name: string, age: number }[],
        older: [] as { name: string, age: number }[]
    };
    for (let person of people) {
        if (person.age < 30) {
            result.young.push(person)
        }
        else {
            result.older.push(person)
        }
    }
    // Use a loop to categorize each person
    // Add to "young" if age < 30, "older" if age >= 30

    return result;
}

// Test it:
console.log("Grouped by age:", groupByAge(people));

console.log("Exercise 4.2: Calculate object properties");
function calculateAverageAge(people: { name: string, age: number }[]): number {
    if (people.length === 0) {
        return 0;
    }
    let sum = people.reduce((sum, person) => { return sum + person.age }, 0)
    console.log(people);
    return sum / people.length;

}

// Test it:
console.log("Average age:", calculateAverageAge(people));
console.log("Exercise 4.3: Transform objects");

function addAgeCategory(people: { name: string, age: number }[]): {
    name: string,
    age: number,
    category: string
}[] {
    let result: { name: string, age: number, category: string }[] = people.map(person => {
        let category: string;
        if (person.age < 18) {
            category = "child"

        }
        else if (person.age < 65) {
            category = "adult"

        }
        else {
            category = "senior"

        }
        return {
            ...person,
            category: category
        };
    });




    // For each person, add a "category" property:
    // "child" if age < 18
    // "adult" if age 18-64
    // "senior" if age 65+

    return result;
}

// Test it:

console.log("People with categories:", addAgeCategory(people));










