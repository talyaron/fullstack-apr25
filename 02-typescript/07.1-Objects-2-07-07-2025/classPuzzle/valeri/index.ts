interface People {
    name: string;
    lastName: string;
    age: number;
}

let peopleList: People[] = []

let isStop: boolean = false;

while (!isStop) {
    let name = prompt("Enter your name");
    let lastName = prompt("Enter your last name");
    let age = prompt("Enter your age (optional, press Enter to skip)");
    if (name === null || lastName === null || age === null) {
        console.log("Name and last name are required.");
        continue; // Skip this iteration if name or last name is not provided
    }
    age = age ? parseInt(age) : 0; // Convert age to number or set as undefined if not provided

    peopleList.push({ name: name, lastName: lastName, age:age } as People);
    console.log(peopeleIlist)

    let shouldStop = confirm("Do you want to stop? (OK to stop, Cancel to continue)");
    if (shouldStop) {
        isStop = true;
    } 
}


console.log("Final list of people:", peopleList);

