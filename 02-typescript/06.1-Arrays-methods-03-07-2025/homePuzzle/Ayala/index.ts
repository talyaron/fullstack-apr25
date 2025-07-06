console.log("Exercise 1: Basic Array Manipulation (Easy)");


function manageShoppingList() {
    let list: Array<string> = ["Eggs", "Cheese", "Bread", "Soup"]
    console.log(list);

    list.pop();
    console.log(list);

    list.push("Milk")
    console.log(list);

    console.log(list.length);
}
console.log(manageShoppingList());


console.log("Exercise 2: Finding Elements (Easy-Medium)");
console.log("");
function checkInventory(productList: Array<string>, x: string) {
    if (productList.includes(x)) {
        return "Found at position " + productList.indexOf(x)
    }
    else {
        return "Not found "
    }
}
console.log(checkInventory(["apple", "banana", "orange"], "banana"));
console.log(checkInventory(["apple", "banana", "orange"], "grape"));


//should return "Found at position 1"
//should return "Not found"


console.log("");
console.log("Exercise 3: Filtering Data (Medium)");
function filterNumbers(numbers: Array<number>) {
    return numbers.filter((x) => x > 10)
}

console.log(filterNumbers([5, 12, 8, 16, 3, 20, 11]));

function filterWords(words: Array<string>) {
    return words.filter((x) => x.length > 5)
}

console.log(filterWords(["apple", "banana", "orange", "fig"]));

console.log("");
console.log("Exercise 4: Transforming and Combining (Medium-Hard)");
function createEmailList(names: Array<string>) {
    let emails = names.map((a) => a + "@school.edu")
    // console.log(emails);
    console.log(emails.join(";"));


}
console.log(createEmailList(["Ayala", "Noam", "Bob"]));

console.log("");
console.log("Exercise 5: Complex Data Processing (Very Challenging)");
function analyzeTestScores(scores: Array<number>) {
    let valid = scores.filter((x) => typeof x === "number" && x <= 100 && x > 0)
    let passed = 0;
    let highest = 0;
    for (let i = 0; i < valid.length; i++) {
        if (valid[i] >= 60) passed++;
        if (valid[i] > highest) highest = valid[i]
    }
console.log([valid.length, passed, highest]);


}

console.log(analyzeTestScores([85, 92, 45, 67, 105, -5, 78, 55, 90]));
// console.log(analyzeTestScores([true, 10, 45, "67", 105, -5, "yes", 55, 90]));






