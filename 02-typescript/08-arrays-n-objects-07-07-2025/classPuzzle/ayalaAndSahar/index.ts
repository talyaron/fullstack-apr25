type Student = {
  name: string;
  score: number;
};

let studentArry: Student[] = [
  { name: "name1", score: 80 },
  { name: "name2", score: 85 },
  { name: "name3", score: 90 },
];

function calculateAverageScore(students: Student[]): number {
  let sum: number = 0;
  for (let student of students) {
    sum += student.score;
  }
  console.log("sum" + sum);
  console.log("sum" + sum);
  return Math.floor(sum / students.length);
}

console.log(calculateAverageScore(studentArry));
