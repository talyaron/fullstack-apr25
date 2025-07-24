let isStop: boolean = false;

interface Person {
    name: string;
    lastName: string;
    age?: number | undefined | string; // optional property
}

let people: Person[] = [];

while (!isStop) {
    let name: string | null = prompt("Enter your name");
    let lastName: string | null = prompt("Enter your last name");
    let age: string | number | undefined | null = prompt("Enter your age (optional, press Enter to skip)");

    if (!name || !lastName) {
        console.log("Name and last name are required.");
        continue; // skip to the next iteration if name or last name is not provided
    }

    if (age) {
        age = Number(age);
    }

    let person: Person = {
        name: name,
        lastName: lastName,
        age: age || undefined // set age to undefined if not provided
    };

    people.push(person);

    // add to array of people



    let shouldStop = confirm("Do you want to stop? (OK to stop, Cancel to continue)");
    if (shouldStop) {
        isStop = true;
    } 
}

console.log(people);

people.forEach((person) => {
    console.log(`Name: ${person.name}, Last Name: ${person.lastName}, Age: ${person.age !== undefined ? person.age : "Not provided"}`);
});


console.log(christin.name);
for (let key in christin.address) {

    console.log(key, christin.address[key]); 
}


