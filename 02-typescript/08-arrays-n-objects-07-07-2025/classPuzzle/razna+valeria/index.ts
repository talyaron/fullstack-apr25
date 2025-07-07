type Student = {
    name: string;
    score: number;
};

let students: Student[] = [
    { name: "razan", score: 60 },
    { name: "valeria", score: 90 },
    { name: "bar", score: 85 }
];
console.log(students);


function calculateAverageScore(students: Student[]): number {
    let isSum: number = 0;
    for (let student of students) {
        isSum += student.score;
    }
    return (isSum/students.length);
}
console.log(calculateAverageScore(students));
