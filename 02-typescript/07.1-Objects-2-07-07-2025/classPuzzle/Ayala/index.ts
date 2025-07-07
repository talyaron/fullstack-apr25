
let isStop: boolean = false;
interface Person {
    name: string;
    lastName: string;
    age?: number
}
let people: Array<Person> = []

while (!isStop) {

    let first = prompt("Enter your name");
    let last = prompt("Enter your last name");
    let ageinput = prompt("Enter your age (optional, press Enter to skip)");
    if (ageinput) {

        let current: Person = {
            name: "",
            lastName: "",
            age: 0
        }

        if (typeof first === "string") {
            current.name = first;
        }
        if (typeof last === "string") {
            current.lastName = last;
        }
        if (typeof ageinput === "number") {
            current.age = ageinput;
        }
        if (current.name && current.lastName && current.age) {
            people.push(current)
        }

    }
    else {

        let current: Person = {
            name: "",
            lastName: "",
        }

        if (typeof first === "string") {
            current.name = first;
        } if (typeof last === "string") {
            current.lastName = last;
        }
        if (current.name && current.lastName) {
            people.push(current)
        }
    }

    // add to array of people

    let shouldStop = confirm("Do you want to stop? (OK to stop, Cancel to continue)");
    if (shouldStop) {
        isStop = true;
    } {
        // print in th console a list of persons in the array in the following format:
        // "Name: {name}, Last Name: {lastName}, Age: {age
    }
    console.log(people);



}
for (let person of people) {
    if (person.age) {
        console.log(`Name: ${person.name},Last Name: ${person.lastName}, Age: ${person.age} `);
    }
    else {
        console.log(`Name: ${person.name},Last Name: ${person.lastName}`);
    }

}

