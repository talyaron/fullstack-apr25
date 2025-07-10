//Boolean

let x: boolean = true;
let y: boolean = false;

if(x) {
    console.log("x is true");
}
if(y) {
    console.log("y is true");
}

if( 3%2 === 0) {
    console.log("3 is even");
}

interface Person {
    name: string;
    age: number;
    isStudent: boolean;
}

const people:Person[]= [
    { name: "Alice", age: 25, isStudent: true },
    { name: "Bob", age: 30, isStudent: false },
    { name: "Charlie", age: 22, isStudent: true },
    { name: "David", age: 28, isStudent: false }
];

for (let person of people) {
   if(person.isStudent) {
        console.log(`${person.name} is a student.`);
    }
}