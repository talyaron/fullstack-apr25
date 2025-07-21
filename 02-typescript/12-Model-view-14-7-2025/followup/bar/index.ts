//Data

interface Student {
    id: number;
    name: string;
    avgScore: number;
    imageUrl?: string; // Optional property for image URL
}

const bar: Student = {
    id: 1,
    name: "Bar Greenberg",
    avgScore: 92,
    imageUrl: "./bar.jpeg" // Example image URL
};

//View functions
function htmlStudent(student: Student): string {
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

renderStudents(bar);