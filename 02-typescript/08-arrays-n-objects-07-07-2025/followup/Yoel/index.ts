interface Person {
    name : string;
    lastName : string;
    age : number;
}


let peoples : Person[] = [
    {name : "Britney", lastName : "Spears", age: 40},
    {name : "Bob", lastName : "Dilan", age: 55},
    {name : "Cillian", lastName : "Murphy", age: 45},
    {name : "Ashton", lastName : "Kucher", age: 42},
    {name : "Michael", lastName : "Jackson", age: 47},
];

let peopleUnder43 : Person[] = peoples.filter(person => person.age < 43)

console.log(peopleUnder43);

let sortByAge : Person[] = people.sort ((a,b) => a.age - b.age);
console.log(sortByAge);

let dilan = peoples.find(people => people.lastName === "Dilan");
console.log(dilan)

let findIndexOfMichael = peoples.findIndex(peoples => peoples.lastName === "Jackson");
console.log(findIndexOfMichael);