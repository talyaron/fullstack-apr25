import { Student, students } from "../model/student.model";

export function findAll(): Student[] {
  return students;
}

export function create(data: Omit<Student, "id">): Student {
  const newStudent: Student = {
    ...data,
    id: students.length + 1,
  };
  students.push(newStudent);
  return newStudent;
}

export function findById(id: number): Student | null {
  const student = students.find((s) => s.id === id);
  return student || null;
}

export function updateAge(id: number, age: number): Student | null {
  const student = students.find((s) => s.id === id);
  if (!student) return null;
  student.age = age;
  return student;
}
