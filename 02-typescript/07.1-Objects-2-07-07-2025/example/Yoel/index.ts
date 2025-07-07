interface Person {
  name: string;
  lastName: string;
  age: number;
}
let personList: Person[] = [];

let shouldStop: boolean = false;
while (!shouldStop) {
  let name = prompt("Enter your Name");
  let lastName = prompt("Enter your last name");
  let ageInput = prompt("Enter your age");
  let age = Number(ageInput);

  let newPerson: Person = {
    name: name || "",
    lastName: lastName || "",
    age: isNaN(age) ? 0 : age,
  };
  personList.push(newPerson);

  for (let person of personList) {
    console.log(
      "Name: " + person.name + " Last Name " + person.lastName + " Age " + person.age
    );
  }
  

  let stahp = confirm(
    "Do you wish to stop the register process? press Ok to stop"
  );
  if (stahp) {
    shouldStop = true;
  }
}

console.log (personList)
