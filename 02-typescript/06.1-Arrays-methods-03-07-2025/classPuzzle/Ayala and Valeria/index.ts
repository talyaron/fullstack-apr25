let numbers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(numbers.pop());
console.log(numbers);
console.log("");

console.log(numbers.unshift(-1, 0));//
console.log(numbers);


console.log("");

let names: Array<string> = ["Or", "Alice", "Valeria", "Noam", "Bob"]
console.log(names);
console.log(names.sort());

let fruits = ['apple', 'banana', 'orange'];
console.log(fruits);
for (let x of fruits) {
    console.log(x);

}
console.log("");


let isEven =[5,7,10]
function even(x:number) {
    return x%2===0
    
}
console.log(isEven.some(even));



// let iterator = fruits.values();

// for (let value of iterator) {
//     console.log(value);
// }