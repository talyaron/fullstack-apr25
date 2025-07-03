let userData: array<string> = [];

let userName = prompt("Enter participants names: ");
if (userName) {
    userData.push(userName);
}
console.log(userName);

let nameArray: string[] = userName.split(", ");
nameArray.sort();
console.log(nameArray);

let finalArray = nameArray.filter((word) => word.length > 3);
console.log(finalArray);

