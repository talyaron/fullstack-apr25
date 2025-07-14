//Data

interface Student {
    id: number;
    name: string;
    avgScore: number;
    edu: string,
    imageUrl?: string;
}

const razan: Student = {
    id: 1,
    name: "Razan Mani",
    avgScore: 92,
    edu: "Hebrew University",
    imageUrl: "./razan.jpg"
};

//View functions
function htmlStudent(student: Student): string {
    return `
        <div class="student">
            ${student.imageUrl ? `<img src="${student.imageUrl}" alt="${student.name}" />` : ""}
            <h2>${student.name}</h2>
            <p>Average Score: ${student.avgScore}</p>
            <p>University: ${student.edu}</p>
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

renderStudents(razan);