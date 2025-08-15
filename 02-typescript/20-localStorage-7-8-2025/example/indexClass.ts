class Student {
    public name: string;
    public lastName: string;
    constructor(name: string, lastName: string) {
        this.name = name;
        this.lastName = lastName;
    }

    greet(): string {
        return `Hello, my name is ${this.name} ${this.lastName}.`;
    }

}

interface StudentObject {
    name: string;
    lastName: string;
}

const _students: StudentObject[] = sessionStorage.getItem("students") ? JSON.parse(sessionStorage.getItem("students")!) : [];
const students: Student[] = _students.map((s) => new Student(s.name, s.lastName));
console.log(students)

function getStudents(): boolean {
    const newStudentName = prompt("Enter student name:");
    const newStudentLastName = prompt("Enter student last name:");
    if (newStudentName && newStudentLastName) {
        students.push(new Student(newStudentName, newStudentLastName));
        console.log(`Student ${newStudentName} ${newStudentLastName} added.`);
        console.log("Current students:", students);
        sessionStorage.setItem("students", JSON.stringify(students));
        return true;
    } else {
        console.log("No student name entered.");
        return false;
    }
}

while (getStudents()) {
    // Loop continues until getStudents returns false
}