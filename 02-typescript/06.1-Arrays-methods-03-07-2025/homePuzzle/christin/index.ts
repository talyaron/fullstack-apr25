//1
function manageShoppingList(items){
    items.push("milk");
    items.pop();
    return items.length;
}

console.log(manageShoppingList(["bread", "eggs", "cheese"]));

//2

function checkInventory(products:string,searchProduct: string):string{
    if (products.includes(searchProduct)) {
        let position = products.indexOf(searchProduct);
        return "Found at position " + position;
      } else {
        return "Not found";
      }

}
console.log(checkInventory(["apple", "banana", "orange"], "banana"));
console.log(checkInventory(["apple", "banana", "orange"], "grape"));

//3
function filterNumbers(numbers){
    let result = numbers.filter((number)=> number >= 10);
    return result;
}
console.log(filterNumbers([5, 12, 8, 16, 3, 20, 11]));

function filterWords(characters){
    let result = characters.filter((characters)=> characters.length > 5);
    return result;
}
console.log(filterWords(["spray", "elite", "exuberant", "destruction", "present"]));

//4

function createEmailList(names){
    let email = names.map(name => {
        return name.toLowerCase()+ "@school.edu"});
        return email.join(";");
    }

console.log(createEmailList(["John", "Mary", "Alex"]));

//5

function analyzeTestScores(scores){
    let result = scores.filter((scores)=> scores <=100 && scores >=0);
    let passResult = result.filter((result)=> result>=60);
    let highResult = passResult.length > 0 ? Math.max(...passResult) : 0;
              
    return [result, passResult,highResult];
    


}
console.log(analyzeTestScores([85, 92, 45, 67, 105, -5, 78, 55, 90]));
