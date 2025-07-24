//Data
interface Student {
    fullName: string;
    imageUrl: string;
    avgScore: number;
}

const students: Student[] = [];

// Controllers

function handleSubmit(event: Event): void {
    try {
        event.preventDefault(); // Prevent the default form submission behavior of reloading page
        console.log('Form submitted');
        if (!(event.target instanceof HTMLFormElement)) {
            throw new Error('Event target is not a form');
        }
        const form = event.target;
        // console.log(form.imageUrl.value);
        // console.log(form.fullName.value);
        // console.log(form.avgScore.value);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log('Form data:', data);

        const student: Student = {
            fullName: data.fullName as string,
            imageUrl: data.imageUrl as string,
            avgScore: parseFloat(data.avgScore as string),
        };

        console.log(student)
        if (!student.fullName || !student.avgScore) {
            throw new Error('Full name and average score are required');
        }

        // model
        students.push(student);

        renderStudents(students);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

// View

function htmlStudent(student: Student): string {
    try {

        if (!student || !student.fullName) {
            throw new Error('Invalid student data');
        }

        return `
        <div class="student">
            ${student.imageUrl ? `<img src="${student.imageUrl}" alt="${student.fullName}" />` : ""}
            <h2>${student.fullName}</h2>
            <p>Average Score: ${student.avgScore}</p>
        </div>
    `;
    } catch (error) {
        console.error("Error generating HTML for student:", error);
        return `<div class="student-error">Error rendering student</div>`;

    }
}

function renderStudents(students: Student[]): void {
    try {
        const studentRoot = document.getElementById("studentRoot");
        if (!studentRoot) throw new Error("studentRoot element not found");

        studentRoot.innerHTML = students.map(student => htmlStudent(student)).join("");

    } catch (error) {
        console.error("Error rendering student:", error);
    }
}