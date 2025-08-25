// main controller
async function main(){
    try {
        const studentCount = await getNumberOfStudents();

        const studentCountElement = document.getElementById('number-of-students');
        if (!studentCountElement) throw new Error('Student count element not found');

        studentCountElement.textContent = studentCount.toString();

        const students = await getAllStudents();
        if (students.length > 0) {
            renderStudentList(students);
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
    }
}

main();
// Add student form logic
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-student-form') as HTMLFormElement | null;
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('student-name') as HTMLInputElement;
        const ageInput = document.getElementById('student-age') as HTMLInputElement;
        const emailInput = document.getElementById('student-email') as HTMLInputElement;
        const messageDiv = document.getElementById('form-message');
       
        if (!nameInput || !ageInput || !emailInput || !messageDiv) return;
       
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const email = emailInput.value.trim();
        if (!name || !email || isNaN(age) || age < 1) {
            messageDiv.textContent = 'Please fill all fields correctly.';
            messageDiv.style.color = '#b91c1c';
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/students/add-student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, //I will send in a json format
                body: JSON.stringify({ name, age, email }) //data in string format
            });
            const data = await res.json();
            if (res.ok) {
                messageDiv.textContent = 'Student added!';
                messageDiv.style.color = '#256029';
                nameInput.value = '';
                ageInput.value = '';
                emailInput.value = '';
                // Refresh student list and count
                main();
            } else {
                const error = data.error || 'Failed to add student.';
                messageDiv.textContent = error;
                messageDiv.style.color = '#b91c1c';
            }
        } catch (err) {
            messageDiv.textContent = 'Network/server error.';
            messageDiv.style.color = '#b91c1c';
        }
    });
});

interface StudentResponse {
    numberOfStudents: number;
    error?: string;
}

//services

async function getNumberOfStudents():Promise<number> {
    try {
        const response = await fetch('http://localhost:3000/students/number-of-students'); //get from API (on the internet) from the server

        const data: StudentResponse = await response.json() as StudentResponse; // Parse the JSON response to data object, that was returned from the server


        if (response.ok) {
            return data.numberOfStudents;
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
        return 0; // Return 0 or handle the error as needed
    }
}

interface Student {
    id: number;
    name: string;
    age: number;
    email: string;
}

interface StudentsResponse {
    students?: Student[];
    error?: string;
}

async function getAllStudents(): Promise<Student[]> {
    try {
        const response = await fetch('http://localhost:3000/students/get-all-students');

        const data: StudentsResponse = await response.json() as StudentsResponse;

        if (response.ok) {

            if (data.students && data.students.length > 0) {
                return data.students;
            } else {
                throw new Error('No students found');
            }
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching all students:', error);
        return [];
    }
}

//view
function renderStudentList(students: Student[]) {
    const listContainer = document.getElementById('list-of-students');
    if (!listContainer) throw new Error('List container not found');

    // Clear existing content
    listContainer.innerHTML = '';

    // Render each student
    students.forEach(student => {
        const studentElement = document.createElement('div');
        studentElement.className = 'student';
        studentElement.innerHTML = `
            <h2>${student.name}</h2>
            <p>Age: ${student.age}</p>
            <p>Email: ${student.email}</p>
        `;
        listContainer.appendChild(studentElement);
    });
}


