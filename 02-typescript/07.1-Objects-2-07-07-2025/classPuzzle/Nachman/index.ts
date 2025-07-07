let isStop: boolean = false;
let people: { name: string; lastName: string; age?: number }[] = [];

while (!isStop) {
    let name = prompt("Enter your name");
    let lastName = prompt("Enter your last name");
    let age = prompt("Enter your age");

    let shouldStop = confirm("Do you want to stop? (OK to stop, Cancel to continue)");
    if (shouldStop) {
        isStop = true;
    } else {
        if (name && lastName) {
            let person: { name: string; lastName: string; age?: number } = { name, lastName };
            if (age) {
                person.age = parseInt(age);
            }
            people.push(person);
        } else {
            console.log("Name and last name are required.");
        }
    }
    }
    
console.log("List of people:");
    people.forEach(person => {
        console.log(`Name: ${person.name}, Last Name: ${person.lastName}, Age: ${person.age !== undefined ? person.age : "Not provided"}`);
    });
