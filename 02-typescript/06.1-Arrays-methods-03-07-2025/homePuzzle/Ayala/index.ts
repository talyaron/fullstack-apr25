console.log("Exercise 1: Basic Array Manipulation (Easy)");


function manageShoppingList(list: Array<string>) {
    list.push("Milk")
    list.pop();
    return list.length;
}
console.log(manageShoppingList(["bread", "eggs", "cheese"]));


console.log("Exercise 2: Finding Elements (Easy-Medium)");
console.log("");
function checkInventory(productList: Array<string>, x: string) {
    if (productList.includes(x)) {
        return "Found at position " + productList.indexOf(x)
    }
    else {
        return "Not found"
    }
}
console.log(checkInventory(["apple", "banana", "orange"], "banana"));
console.log(checkInventory(["apple", "banana", "orange"], "grape"));


//should return "Found at position 1"
//should return "Not found"


console.log("");
console.log("Exercise 3: Filtering Data (Medium)");
function filterNumbers(numbers: Array<number>) {
    return numbers.filter((x) => x > 10 && x % 2 === 0)
}

console.log(filterNumbers([5, 12, 8, 16, 3, 20, 11]));

function filterWords(words: Array<string>) {
    return words.filter((x) => x.length > 5)
}

console.log(filterWords(["apple", "banana", "orange", "fig"]));

console.log("");
console.log("Exercise 4: Transforming and Combining (Medium-Hard)");
function createEmailList(names: Array<string>) {
    let emails = names.map((a) => a.toLowerCase() + "@school.edu")
    // console.log(emails);
    return (emails.join(";"));
}
console.log(createEmailList(["Ayala", "Noam", "Bob"]));

console.log("");
console.log("Exercise 5: Complex Data Processing (Very Challenging)");
function analyzeTestScores(scores: Array<number>) {
    let valid = scores.filter((x) => typeof x === "number" && x <= 100 && x >= 0)
    let result: Array<number> = [valid.length, 0, 0]
    // let passed = 0;
    // let highest = 0;
    let sum = 0;
    for (let i = 0; i < valid.length; i++) {
        if (valid[i] >= 60) {
            result[1]++;
            if (valid[i] > result[2]) result[2] = valid[i]
            sum += valid[i];
        }

    }
    console.log("The avarage passing score is: " + (sum / result[0]));
    return result;
}

console.log(analyzeTestScores([85, 92, 45, 67, 105, -5, 78, 55, 90]));
// console.log(analyzeTestScores([true, 10, 45, "67", 105, -5, "yes", 55, 90]));





