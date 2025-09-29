import { Student } from "./studentModel";

export const students: Student[] = [
  { 
    name: "John Doe", 
    age: 20, 
    grade: "A",
    subjects: ["Math", "Science"],
    img: "../assets/student-images/john-doe.png" 
  },
  {
    name: "Jane Smith",
    age: 22,
    grade: "B",
    subjects: ["English", "History"],
    img: "../assets/student-images/jane-smith.png",
  },
  {
    name: "Alice Johnson",
    age: 19,
    grade: "A",
    subjects: ["Biology", "Chemistry"],
    img: "../assets/student-images/alice-johnson.png",
  },
  {
    name: "Bob Brown",
    age: 21,
    grade: "C",
    subjects: ["Math", "Physical Education"],
    img: "../assets/student-images/bob-brown.png",
  },
  {
    name: "Charlie Davis",
    age: 23,
    grade: "B",
    subjects: ["Computer Science", "Mathematics"],
    img: "../assets/student-images/charlie-davis.png",
  },
];