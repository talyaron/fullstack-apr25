type Student = {
    name: string;
    score: number;
  };
let students: Student[] = [
    { name: "John",  score: 80 },
    { name: "Jane",  score: 90 },
    { name: "Alice",  score: 85 },
    { name: "Bob",  score: 60 },
    { name: "Charlie",  score: 70 },
    { name: "Eve",  score: 75 },
    { name: "Frank", score: 80 },
]
let sumScore = 0;
function calculateAverageScore(students: Student[]): number {
   
    for(let i = 0; i < students.length ; i++){

        
        sumScore = sumScore + students[i].score;
    }

    return sumScore/students.length;
  }

  console.log(calculateAverageScore(students));


function calculateAverageSecond(students: Student[]): number {
    let sumScore = students.reduce((sum,students)=> sum + students.score, 0);
    return sumScore/students.length;

}
console.log(calculateAverageSecond(students));