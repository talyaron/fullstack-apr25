export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

class StudentModel {
  private name: string;
  private age: number;
  private grade: string;

  constructor({
    name,
    age,
    grade
  }: {
    name: string;
    age: number;
    grade: string;
  }) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getGrade(): string {
    return this.grade;
  }
}

export default StudentModel;
