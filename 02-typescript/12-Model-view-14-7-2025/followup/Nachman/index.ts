interface Student {
    name: string;
    age: number;
    AvgScore: string;
    imageUrl?: string;
}

const Nachman: Student = {
    name: "Nachman",
    age: 19,
    AvgScore: "95",
    imageUrl: "./nachman.jpg" }

function htmlStudent(student: Student): string {
    return `
        <div class="student">
            ${student.imageUrl ? `<img src="${student.imageUrl}" alt="${student.name}" />` : ""}
            <h2>${student.name}</h2>
            <p>Age: ${student.age}</p>
            <p>Average Score: ${student.AvgScore}</p>
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

renderStudents(Nachman);   