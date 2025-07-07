interface Person {
    name: string;
    lastName: string;
    age: number;
}

let people: Person[]=[
    { name: "Razan", lastName: "Mani", age: 28},
    { name: "Nidal", lastName: "Hammoudeh", age: 34},
    { name: "Nadine", lastName: "Sultan", age: 29},
];

console.log(people);

let peopleUnder30 = people.sort((b, a) => a.age - b.age);
console.log(peopleUnder30)

let morePeople = people.push({name: "Yazan", lastName: "Mani", age: 26});
console.log(people);


let newArray = people.with(1, {name: "Anoud", lastName: "Awad", age: 28});
console.log(newArray);