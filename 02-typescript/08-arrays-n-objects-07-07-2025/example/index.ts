interface Person {
    name: string;
    lastName: string;
    age: number;
}
let love = ["i"," ","L","o","v","e"," ","t","a","l"," ","y","a","r","o","n"]
let people: Person[] = [
    { name: "John", lastName: "Doe", age: 25 },
    { name: "Jane", lastName: "Smith", age: 30 },
    { name: "Alice", lastName: "Johnson", age: 25 },
    { name: "Bob", lastName: "Brown", age: 40 },
    { name: "Charlie", lastName: "Davis", age: 30 },
    { name: "Eve", lastName: "White", age: 35 },
    { name: "Frank", lastName: "Green", age: 28 }

];

let peopleUnder30: Person[] = people.filter(person => person.age < 30);

console.log(peopleUnder30);

let sortedPeopleByAge: Person[] = people.sort((b, a) => a.age - b.age);
console.log(sortedPeopleByAge);

let doe = people.find(person => person.lastName === "Doe");
console.log(doe);

let smithIndex = people.findIndex(person => person.lastName === "Smith");
console.log(smithIndex);

