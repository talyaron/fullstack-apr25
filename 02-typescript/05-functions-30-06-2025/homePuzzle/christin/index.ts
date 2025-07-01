//cha 1
function greet(name: string): string {
    return "Hello, " + name + "!";
  }
  let greeting = greet("Christin");
  console.log("greeting:", greeting);

//cha 2
function sumNum(a: number , b: number): number{
    return a + b;

}
let sum = sumNum (4,7);
console.log("sum:" , sum);

//cha 3
function multiNum(a: number , b: number): number{
    return a * b;

}
let multi = multiNum ("HELLO",7);
console.log("Multiply:" , multi);

//cha4
function divideNum(a: number, b: number): number | undefined {
    try {
      if (b === 0) throw new Error("Division by zero is not allowed");
  
      return a / b;
    } catch (e) {
      console.error("Error:", e);
  
      return undefined; // Return undefined if division by zero occurs
    }
  }
  let divideZero = divideNum (5,0);
  let divide = divideNum (5,1);
  console.log("Divide:" , divide);

  //cha5
  function squareNum(b: number): number | undefined {
    try {
      if (b === "hello") throw new Error("b is not a number");
  
      return b ** 2;
    } catch (e) {
      console.error("Error:", e);
  
      return undefined; // Return undefined if division by zero occurs
    }
  }
  let square = squareNum (2);
  console.log("Square:" , square);
  let square = squareNum ("hello");
  console.log("Square:" , square);

  //cha6
  function ageNum(b: number): number | undefined {
    try {
      if (b <= 0) throw new Error("Age can not be negative or zero");
  
      return b;
    } catch (e) {
      console.error("Error:", e);
  
      return undefined; 
    }
  }
  function personName(a: string): string | undefined {
    try {
      if (a==="") throw new Error("Name can not be empty");
  
      return a;
    } catch (e) {
      console.error("Error:", e);
  
      return undefined; 
    }
  }
  let age = ageNum (-40);
  let name = personName("");
  console.log("My age is:" , age);
  console.log("My name is:" , name);
  let age = ageNum (15);
  let name = personName("Christin");
  console.log("My age is:" , age);
  console.log("My name is:" , name);

  //final
  function sumNum(a: number , b: number): number{
    try {
        if (typeof a!== 'number' || typeof b!== 'number') throw new Error("String can not be part of the sum function");
    
        return a + b;
      } catch (e) {
        console.error("Error:", e);
    
        return undefined; 
      }
    

}
let sum = sumNum (4,"hello");
console.log("sum:" , sum);
let sum = sumNum (4,5);
console.log("sum:" , sum);