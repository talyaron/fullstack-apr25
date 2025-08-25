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
    grade: number;
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
            <p>Grade: ${student.grade}</p>
        `;
        listContainer.appendChild(studentElement);
    });
}


