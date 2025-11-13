// Local Storage

const animals: string[] = [];

function addAnimal(): boolean {
    const newAnimal = prompt("Please enter an animal name:");
    if (newAnimal) {
        animals.push(newAnimal);
        localStorage.setItem("animals", JSON.stringify(animals));
        console.log(`Animal ${newAnimal} added successfully.`);
        return true;
    }
    return false;
}
console.log("Current animals in storage:", animals);

while (addAnimal()) {

};

