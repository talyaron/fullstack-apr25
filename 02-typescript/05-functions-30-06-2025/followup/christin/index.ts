function add(c: number, d: number): number{
    return c + d;
}
function calculateArea(length :number, width: number): number {
    return length * width;
  }

function person(name: string): string {
    return "My name is " + name +"!";
}
let sum = add(6,7);
let area = calculateArea(6,10);
let myself = person("Christin");

console.log("sum:",sum);
console.log("area:",area);
console.log("myself:",myself);
