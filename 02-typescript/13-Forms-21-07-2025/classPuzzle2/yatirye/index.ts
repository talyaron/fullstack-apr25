//Data

interface Student {
    id: number;
    name: string;
    avgScore: number;
    imageUrl?: string; // Optional property for image URL
}

const student: Student = {
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

function handelimageUrlChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newImageUrl = input.value;

        if (!newImageUrl) {
            throw new Error("Image URL cannot be empty");
        }

        student.imageUrl = newImageUrl;
        renderStudents(student);
    } catch (error) {
        console.error("Error handling image URL change:", error);
    }
}

function handelNameChange(ev: Event): void {
    try {  
        const input = ev.target as HTMLInputElement;
        const newName = input.value;

        if (!newName) {
            throw new Error("Name cannot be empty");
        }

        student.name = newName;
        renderStudents(student);
    } catch (error) {
        console.error("Error handling name change:", error);
    }
}

function handelScoreChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newAvgScore = parseFloat(input.value);

        if (isNaN(newAvgScore) || newAvgScore < 0 || newAvgScore > 100) {
            throw new Error("Average score must be a number between 0 and 100");
        }

        student.avgScore = newAvgScore;
        renderStudents(student);
    }
    catch (error) {
        console.error("Error handling average score change:", error);
    }
}

renderStudents(student);