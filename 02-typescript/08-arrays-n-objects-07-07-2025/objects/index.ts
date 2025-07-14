interface Student {
    name: string;
    age?: number;
}

let students: Student[] = [
    { name: "Alice", age: 20 },
    { name: "Bob" },
    { name: "Charlie", age: 22 }
];


function averageAge(students: Student[]): number {
    let totalAge = 0;
    let count = 0;

    for (let student of students) {

            totalAge += student.age ? student.age : 0;
            count += student.age ? 1 : 0;
      
    }

    return count > 0 ? totalAge / count : 0;
}