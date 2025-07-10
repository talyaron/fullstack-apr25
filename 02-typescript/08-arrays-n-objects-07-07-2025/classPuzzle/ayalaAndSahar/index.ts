type Student = {
  name: string;
  score: number;
};

// let studentArray: Student[] = [
//   { name: "name1", score: 80 },
//   { name: "name2", score: 85 },
//   { name: "name3", score: 90 },
// ];

let studentArray: Student[] = [];
for (let i = 0; i < 10000000; i++) {
  studentArray.push({
    name: `name${i + 1}`,
    score: Math.floor(Math.random() * 101),
  });
}

function calculateAverageScore(students: Student[]): number {
  let sum: number = 0;
  for (let student of students) {
    sum += student.score;
  }

  return Math.floor(sum / students.length);
}

// function calculateAverageScore(students: Student[]): number {
//  let sum: number = students.reduce((sum, student) => {
//     return sum + student.score;
//   }, 0);
//   return Math.floor(sum / students.length);
// }

console.time("calculateAverageScore");
console.log(calculateAverageScore(studentArray));
console.timeEnd("calculateAverageScore");
