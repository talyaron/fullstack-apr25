interface Student{
    id: number;
    name: string;
    avrScore: number;
    imageUrl?: string;
}
const christin: Student={
    id: 20847,
    name: "Christin Jeries",
    avgScore: 89,
    imageUrl:"./christin.jpg",

};

function htmlStudent(student: Student): string{
    return `
    <div class="student">
        ${student.imageUrl ? `<img src="${student.imageUrl}" alt="${student.name}" />` : ""}
        <h2>${student.name}</h2>
        <p>Average Score: ${student.avgScore}</p>
    </div>
`;
}
function renderStudents(student: Student): void {
    try {
        const studentRoot = document.getElementById("studentRoot");
        if (!studentRoot) throw new Error("studentRoot element not found");

        studentRoot.innerHTML = htmlStudent(student);

    } catch (error) {
        console.error("Error rendering student:", error);
    }
}

renderStudents(christin);