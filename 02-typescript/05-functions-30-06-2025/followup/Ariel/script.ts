function average(a: number, b: number, c: number) {
  const index = (a + b + c) / 3;
  return Math.floor(index);
}

alert(`Give me 3 numbers of your 3 last exams`)

let userInput1: any = Number(prompt(`Give me 3 numbers of your 3 last exams`));


let userInput2: any = Number(prompt(`Another one`));


let userInput3: any = Number(prompt(`Last one pls`));

console.log(`your average is ${average(userInput1, userInput2, userInput3)}.`);

console.log(typeof(userInput1));
console.log(typeof(userInput2));
console.log(typeof(userInput3));

