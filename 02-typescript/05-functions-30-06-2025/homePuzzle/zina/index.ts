function greet(name: string): string {
  return "שלום " + name + "! איזה כיף לראות אותך 😊";
}
console.log(greet("זינה"));
console.log(greet("דני")); 


function addNumbers(a: number, b: number): number {
  return a + b;
}
console.log(addNumbers(5, 3));   
console.log(addNumbers(10, 15)); 
console.log(addNumbers(-2, 7));  




function multiply(a: number, b: number): number {
  return a * b;
}
console.log(multiply(4, 5));   
console.log(multiply(2, -3));  


function safeDivide(a: number, b: number): number | string {
  try {
    if (b === 0) {
      throw new Error("error");
    }
    return a / b;
  } catch (error) {
    return (error as Error).message;
  }
}
console.log(safeDivide(10, 2));  
console.log(safeDivide(9, 3));  
console.log(safeDivide(7, 0));  
console.log(safeDivide(0, 0));   



function safeSquare(input: any): number | string {
  try {

    if (typeof input !== "number") {
      throw new Error("error");
    }

    if (isNaN(input) || !isFinite(input)) {
      throw new Error("error");
    }

    return input ** 2;
  } catch (error) {
    return (error as Error).message;
  }
}
console.log(safeSquare(4));         // 16
console.log(safeSquare("hello")); 


function validateUser(name: any, age: any): string {

  if (typeof name !== "string") {
    return "error";
  }

  if (name.trim().length === 0) {
    return "error";
  }

  if (typeof age !== "number") {
    return "error";
  }

  if (isNaN(age) || !isFinite(age)) {
    return "error";
  }

  if (age < 0 || age > 150) {
    return "error";
  }
}
