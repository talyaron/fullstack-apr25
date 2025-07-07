interface Person{
    name:string;
    lastName: string;
    age: number;
}

let people: Person[] = [
    {name: "Christin", lastName:"Jeries", age:32},
    {name: "Caroline", lastName:"Jeries", age:36},
    {name: "Nadine", lastName:"Jeries", age:38},
    {name: "Sharbel", lastName:"Jeries", age:28},
    {name: "Natli", lastName:"Jeries", age:26},

]

let peopleUnder30: Person[] = people.filter(person=> person.age <30);
console.log(peopleUnder30);
let sortedPeopleByAge: Person[] = people.sort((b, a) => a.age - b.age);
console.log(sortedPeopleByAge);

let jeries = people.find(person => person.lastName === "Jeries");
console.log(jeries);

let smithIndex = people.findIndex(person => person.lastName === "Jeries");
console.log(smithIndex);