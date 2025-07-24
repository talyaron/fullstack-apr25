let names = prompt("Please state a few names here") || "";

let arrayNames = names.split(" ")
arrayNames.sort()
let namesFiltered = arrayNames.filter ( filtered => filtered.length > 3)
        




console.log(namesFiltered)
