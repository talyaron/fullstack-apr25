function greet(name: string): string {
  return "Hello " + name + ", nice to meet you!";
}

function calculate(a: number, b: number): number {
  return ((a + b) * a * b - (a - b)) ** 3;
}

let greeting = greet("Yoel");

let calculator = calculate(7, 8);

console.log(greeting);
console.log(calculator);
