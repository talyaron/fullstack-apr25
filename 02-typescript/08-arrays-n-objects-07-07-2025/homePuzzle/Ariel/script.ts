// // 1.1
// function getArrayLength(arr: any[]): number {
//   return arr.length
// }

// console.log(`Length of [1, 2, 3]:`, getArrayLength([1, 2, 3]));

// // 1.2
// function getPersonName(person: {name: string, age: number}): string {
//     return person.name;
// }

// // Test it:
// let testPerson = {name: "Alice", age: 25};
// console.log("Person's name:", getPersonName(testPerson)); // Should be "Alice"

// // 1.3
// function printNumbers(n: number): void {
//   let result = "";

//     for (let i = 1; i <= n; i++){
//       result += i;
//       if (i < n) {
//         result += ", ";
//       }
//     }

//     console.log(result);
    
// }

// // Test it:
// console.log("Numbers 1 to 5:");
// printNumbers(5); // Should print 1, 2, 3, 4, 5

// // 2.1
// function sumArray(numbers: number[]): number {
//     let sum = 0;
//     for (let i = 0; i < numbers.length; i++) {
//       sum +=numbers[i]
//     }
//     return sum;
// }

// // Test it:
// console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4])); // Should be 10

// // 2.2
// function countPeople(people: {name: string, age: number}[]): number {
//     return people.length
// }

// // Test it:
// let people = [
//     {name: "Alice", age: 25},
//     {name: "Bob", age: 30},
//     {name: "Charlie", age: 35}
// ];
// console.log("Number of people:", countPeople(people)); // Should be 3

// // 2.3
// function findLargest(numbers: number[]): number {
//   let largest = numbers[0]

//   for (let i = 0; i < numbers.length; i++){
//     if (numbers[i] > largest) {
//       largest = numbers[i]
//     }
//   }
//   return largest;
// }

// // Test it:
// console.log("Largest in [5,2,9,1]:", findLargest([5, 2, 9, 1])); // Should be 9

// // 3.1
// function getEvenNumbers(numbers: number[]): number[] {
//     // Use a loop to collect only even numbers
//     let evens: number[] = [];

//     for (let i = 0; i < numbers.length; i++) {
//         if (numbers[i] % 2 === 0) {
//           evens.push(numbers[i])
//         }
//     }

//     // Your code here
//     return evens;
// }

// // Test it:
// console.log("Even numbers from [1,2,3,4,5,6]:", getEvenNumbers([1, 2, 3, 4, 5, 6])); 
// // Should be [2, 4, 6]

// 3.2
// function findPersonByName(
//     people: {name: string, age: number}[], 
//     searchName: string
// ): {name: string, age: number} | null {
//     // Use a loop to search for the person

//     for (let i = 0; i < people.length; i++) {
//         if (people[i].name === searchName){
//           return people[i]
//         }
//     }
//     // Return null if not found
//     return null;
// }

// const people = [
//     {name: "Alice", age: 25},
//     {name: "Bob", age: 30},
//     {name: "Charlie", age: 35},
//     {name: "Diana", age: 28}
// ];

// // Test it:
// console.log("Find Bob:", findPersonByName(people, "Bob")); // Should return Bob's object

// // 3.3
// function getSquares(numbers: number[]): number[] {
//     // Return a new array where each number is squared
//     let squares: number[] = [];
//     // Your code here
//     for (let i = 0; i < numbers.length; i++) {
//         squares.push(numbers[i] * numbers[i])
//     }

//     return squares;
// }

// // Test it:
// console.log("Squares of [1,2,3,4]:", getSquares([1, 2, 3, 4])); // Should be [1, 4, 9, 16]