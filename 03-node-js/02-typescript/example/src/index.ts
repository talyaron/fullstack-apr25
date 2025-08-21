import StudentModel, { Student } from "./models/studentModel";

console.log('Hello, TypeScript with Node.js!');

const christine = new StudentModel({
  name: "Christine",
  age: 20,
  grade: "A"
});

const sahar: Student = {
  id: 1,
  name: "Sahar",
  age: 22,
  grade: "B"
};

const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting(christine.getName()));

console.log(greeting(sahar.name));

