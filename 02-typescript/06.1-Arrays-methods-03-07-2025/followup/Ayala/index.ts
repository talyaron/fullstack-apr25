let numbersArray = [1, 2, 3, 4, 5];
console.log(Array.isArray(numbersArray));
let firstNum =numbersArray.shift();
console.log(numbersArray);
console.log(firstNum);




let animals: Array<string> = ["dog", "cat", "giraff"]
console.log(animals);
animals.forEach((animal:string)=>{
console.log(animal);

})

console.log(animals.fill("horse"));
