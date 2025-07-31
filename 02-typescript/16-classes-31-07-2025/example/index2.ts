class Person {
  protected fullName: string;
  public yearOfBirth: number;
  public gender: "male" | "female" | "other" = "other"; // default value

  // constructor(name: string, age: number)  the is how we build a instance of a class
  constructor(fullName: string, yearOfBirth: number) {
    this.fullName = fullName;
    this.yearOfBirth = yearOfBirth;
  }

  age(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.yearOfBirth;
  }

  //methods (functions inside a class))
  greet() {
    console.log(
      `Hello, my name is ${this.fullName} and I am ${this.age()} years old.`
    );
  }

  // getter and setter are methods (functions) that allow us to access and modify properties of a class with =
  get Name(): string {
    try {
      return this.fullName;
    } catch (error) {
      console.error(error);
      return "Unknown";
    }
  }

  setGender(value: "male" | "female" | "other") {
    this.gender = value;
  }

  set Gender(value: "male" | "female" | "other") {
    this.gender = value;
  }
}

const youssi = new Person("Yossi", 2001);
const dana = new Person("Dana", 1998);

// inheritance
class Student extends Person {
  private studentId: string;
  private averageGrade: number = 0; // default value
  private grades: number[] = []; // array to hold grades

  constructor(fullName: string, yearOfBirth: number, studentId: string) {
    super(fullName, yearOfBirth); // call the parent class constructor
    this.studentId = studentId;
  }

  greet() {
    super.greet(); // call the parent class greet method
    console.log(`My student ID is ${this.studentId}.`);
  }

  addGrade(grade: number): void {
    try {
      if (grade < 0 || grade > 100)
        throw new Error("Grade must be between 0 and 100.");
      this.grades.push(grade);
      this.averageGrade = this.calculateAverage();
    } catch (error) {
      console.error(error);
    }
  }

  public calculateAverage(): number {
    if (this.grades.length === 0) return 0; // avoid division by zero
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
  }

  getName(): string {
    return this.fullName;
  }
}

const student1 = new Student("Alice", 2000, "S12345");
const student2 = new Student("Bob", 1999, "S67890");

student1.greet();
student2.greet();

student1.addGrade(85);
student1.addGrade(90);
student2.addGrade(75);
student2.addGrade(80);
console.log(
  `Average grade for ${student1.getName()}: ${student1.calculateAverage()}`
);
console.log(
  `Average grade for ${student2.getName()}: ${student2.calculateAverage()}`
);

console.log(student1);
console.log(student2);
console.log("Student 1's name:", student1.getName());
console.log("Student 2's name:", student2.getName());
console.log(youssi);
console.log(dana);
console.log("Yossi's name:", youssi.Name); //getter method to access fullName
console.log("Dana's name:", dana.Name);

dana.Gender = "female"; // setter
console.log("Dana's gender:", dana.gender);
youssi.setGender("male"); // using method
console.log("Yossi's gender:", youssi.gender);
