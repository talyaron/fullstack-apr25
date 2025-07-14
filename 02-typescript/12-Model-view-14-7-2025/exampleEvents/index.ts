//Data

interface Student {
    id: number;
    name: string;
    avgScore: number;
    imageUrl?: string; // Optional property for image URL
}

const amit: Student = {
    id: 1,
    name: "Amit Reuveni",
    avgScore: 92,
    imageUrl: "./amit.jpeg" // Example image URL
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

renderStudents(amit);

//controller functions
function handleAdd(): void {
    //change data (model)
    amit.avgScore = updateStudentScore(amit, amit.avgScore + 1).avgScore // changed amit score
    console.log(amit);
    //re-render view (view)
    renderStudents(amit);
}

function handleReduce(): void {
    amit.avgScore = updateStudentScore(amit, amit.avgScore - 1).avgScore; // changed amit score
    renderStudents(amit);
}

function handleMouseEnter(): void {
    console.log("Mouse entered the student root element");
    // You can add more functionality here if needed
}

function handleMouseLeave(): void {
    console.log("Mouse left the student root element");
    // You can add more functionality here if needed
}


//models functions
function updateStudentScore(student: Student, newScore: number): Student {
    if (newScore < 0 || newScore > 100) return {...student}; // Validate score range}
    return { ...student, avgScore: newScore };
    // student.avgScore = newScore; // Directly update the score
}