console.log("exercise 1 -------- Basic Array Manipulation")

function manageShoppingList():any{
    let shopList:string[] = ["bread", "eggs", "cheese"]
    shopList.push("milk")
    shopList.pop()
    
    return (shopList.length + " is the length of the list")
    
}

console.log(manageShoppingList())

console.log("exercise 2 ------- Finding Elements")

function checkInventory():any{
    let inInventory:string[] = ["glue", "knife"]
    let inventoryCheck = inInventory.includes("glue");
    if (!inventoryCheck){
        return "Not Found";
    }
    
    let inventoryPosition = inInventory.indexOf("glue")
    return [inventoryCheck, "Glue is at the place of", inventoryPosition]
}
console.log(checkInventory())

console.log("exercise 3, ------- Filtering Data")

function filterNumbers():any{
    let numbers:number[]=[0,1,2,3,4,5,10,11,12,13,14,15]
    let bigNumbers = numbers.filter ( n => n >= 10 && n%2 === 0)
    return bigNumbers

}

console.log(filterNumbers())

console.log("Bonus")

function filterWords():any{
    let words:string[] = ["hi", "console", "digimon"]
    let filteredWords = words.filter( n => n.length > 5)
    return filteredWords
}
console.log(filterWords())



console.log("Exercise 4 ---------- Transforming and Combining")

function createEmailList():any {
    let firstNames:string[] = ["Yoel", "Tal", "Yatir", "Nativ"]
    let firstToLowerCase = firstNames.map(letter => letter.toLowerCase())
    let addEmailAddress = firstToLowerCase.map(eMail => eMail + "@school.edu")
    let addEmailAddresss = addEmailAddress.join(";")
    return addEmailAddresss
}

console.log(createEmailList())
