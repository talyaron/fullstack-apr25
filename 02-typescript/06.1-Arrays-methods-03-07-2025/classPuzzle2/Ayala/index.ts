

// let userNames: string = "Ayala, Osher, Noam, Oz"
let userNames: string | null = prompt("Enter the names you want, separate them with a comma (,).");
console.log(userNames);
if (userNames) {

    let namesArray: Array<string> = userNames.split(", ");
    namesArray.sort();
    console.log(namesArray);
    let filterArray: string[] = namesArray.filter((n) => n.length > 3)
    console.log(filterArray);


}
