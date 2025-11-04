//exercise 1
let number: Array<number> = [1, 2, 3, 4, 5];
function processNumbers(number: Array<number>) {
    number.indexOf(3);
number.pop();
 return number.length;
}
console.log(processNumbers(number));

 //exercise 1.2
let person = {
  name: "zina",
  age: 35,
  city: "haifa",
  description: function() {
    return `${this.name} is ${this.age} years old and lives in ${this.city}.`;
  }
};
console.log(person.description());

//exercise 1.3
function printNumbers(n: number): void {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}
console.log("Numbers 1 to 5:");
printNumbers(5); 

//exercise 2.1

function sumArray(numbers: number[]): number {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4])); 

//exercise 2.2
function countPeople(people: {name: string, age: number}[]): number {
    return people.length;
}
let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
    {name: "Diana", age: 28}
];

console.log("Number of people:", countPeople(people)); 