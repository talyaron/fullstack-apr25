

let userNames: string = prompt("Enter the names you want, separate them with a comma (,).");

console.log(userNames);
let namesArray: Array<string> = userNames.split(",");
namesArray.sort();
console.log(namesArray.forEach((n) => {
    if (n.length > 2) {
        console.log(n);
    }
}
))


