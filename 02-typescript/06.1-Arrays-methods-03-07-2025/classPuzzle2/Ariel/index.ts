let userNames = prompt(`Waht's your name?`);

let userData: any = [];

if (userNames) {
  userData.push(userNames);  
}
console.log(userData);


userData.sort(userData);  

let moreThanThreeChar = userData.filter(name => userData.length > 3);

if (moreThanThreeChar) {
  console.log(userData);
  
}

// let userData1: Array<string> = [];

// let userName1 = prompt("Enter your name: ");
// if (userName1) {
//     userData.push(userName1);
// }

// console.log(userData1[0]) We'll kumaria police chamashadi would say that