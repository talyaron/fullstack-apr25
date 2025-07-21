//Data

interface Student {
    id: number;
    name: string;
    avgScore: number;
    imageUrl?: string;
}

const student: Student = {
    id: 1,
    name: "Amit Reuveni",
    avgScore: 92,
    imageUrl: "./amit.jpeg"
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

function handleChangeName (ev) {
    try {
        const newName = ev.target.value;
        if(!newName) throw new Error("Can't find any value");
        student.name = newName;

        renderStudents(student);
        
    } catch (error) {
        console.error(error);
    }
}

function handleChangeAvgScore(ev) {
    try {
        const newAvgScore = ev.target.value;
        if(!newAvgScore && isNaN(newAvgScore)) throw new Error("Error");
        student.avgScore = newAvgScore;

        renderStudents(student);
        

    } catch (error) {
        console.error(error);
    }
}

function handleChangeUrl(ev) {
    try {       
        const newUrl = ev.target.value;
        if(!newUrl) throw new Error("Error");
        student.imageUrl = newUrl;

        renderStudents(student);

    } catch (error) {
        console.error(error);
    }
}

renderStudents(student);