let userData: Array<string> = [];

let userName = prompt("Enter your name: ");
if (userName) {
    userData.push(userName);
}

console.log(userData[0])

let userDataArray: Array<string> = userData.split(", "); 
console.log(userDataArray);

console.log(userData.sort());
console.log(userData.filter((word) => word.length > 3));
