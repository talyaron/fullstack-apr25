// exercise 1
let items:Array<string>=["milk","bread","eggs"];
function manageShoppingList(items:Array<string>){
items.push("milk");
items.pop();
return items.length
}
console.log(manageShoppingList(items));
// exercise 2
let products:Array<string>=["laptop","phone","tablet","monitor"];
function checkInventory(products:Array<string>){
if (products.indexOf("phone") == 2) {
    return "Found at position " + products.indexOf("phone");
} else {
    return "Not found";
}
}
console.log(checkInventory(products) )

// exercise 3