
interface Person {
    name: any;
    lastName: any;
    age?: any;
}

let people: Person[] = [];

let isStop:boolean = false;
while (!isStop) {
   let name = prompt("Enter your name");
   let lastName = prompt("Enter your last name");
   let age = prompt("Enter your age (optional, press Enter to skip)");
    
   // add to array of people
    people.push({ name, lastName, age });

   let shouldStop = confirm("Do you want to stop? (OK to stop, Cancel to continue)");
   if (shouldStop) {
       isStop = true;
   } 

    // print in th console a list of persons in the array in the following format:
    // "Name: {name}, Last Name: {lastName}, Age: {age
    console.log("List of persons:");
    for (let person of people) {
      console.log(`Name: ${person.name}, Last Name: ${person.lastName}, Age: ${person.age || "Nan"}`);
    }
}

