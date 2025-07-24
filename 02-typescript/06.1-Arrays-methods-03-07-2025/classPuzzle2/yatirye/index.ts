let userData: Array<string> = [];

let userName = prompt("Enter your name: ");
if (userName) {
    userData.push(userName);
}

console.log(userData[0])

console.log(Array.of(userData));