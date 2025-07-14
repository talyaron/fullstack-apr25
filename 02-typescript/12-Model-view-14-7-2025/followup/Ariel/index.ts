//Data

// Create date PATTERN from user first! -->
interface Student {
    idNumber: number,
    firstName: string,
    lastName: string,
    averageScore: number,
    imageUrl?: string
}

const ArielIzraelov: Student = {
    idNumber: 12,
    firstName: `Ariel`,
    lastName: `Izraelov`,
    averageScore: 94.4,
    imageUrl: "./img/Ariel'simg.jpg"
};

//View functions
function htmlMakerStudent(student: Student): string {
    return `
        <div class="student">
            ${student.imageUrl ? `<img src="${student.imageUrl}" alt="${student.firstName}'s image" />` : ""}
            <h2>${student.firstName + " " + student.lastName}</h2>
            <p>Average Score: ${student.averageScore}</p>
        </div>
    `;
}

function renderStudent(student: Student): void {
    try {
        const studentRoot = document.getElementById("studentRoot")
        if (!studentRoot) throw new Error("studentRoot element not found");

        studentRoot.innerHTML = htmlMakerStudent(student)
    }
    catch (Errror) {
        console.error("Error rendering student:", Error);
    }
}

renderStudent(ArielIzraelov)