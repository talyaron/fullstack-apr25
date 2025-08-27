interface Student {
    id: number;
    name: string;
    age: number;
    email: string;
    imageUrl: string;
}

interface StudentResponse {
    numberOfStudents: number;
    students?: Student[];
    error?: string;
}



async function renderStudentList(students: Student[]) {
    const listContainer = document.getElementById('list-of-students');
    if (!listContainer) throw new Error('List container not found');

    const averages = await getAverageGrades();

    listContainer.innerHTML = '';

    students.forEach(student => {
        const avgObj = averages.find((a: any) => a.id === student.id);
        const avgText = avgObj ? avgObj.average.toFixed(2) : 'N/A';
        const studentElement = document.createElement('div');
        studentElement.className = 'student';
        studentElement.innerHTML = `
        <img src="${student.imageUrl}" alt="${student.name}">
        <h2>${student.name}</h2>
        <p>Age: ${student.age}</p>
        <p>Email: ${student.email}</p>
        <p>Average Grade: ${avgText}</p>
        `;
        listContainer.appendChild(studentElement);
    });
}


async function getNumberOfStudents(): Promise<number> {
    try {
        const response = await fetch('http://localhost:3000/students/number-of-students');

        const data: StudentResponse = await response.json() as StudentResponse;


        if (response.ok) {
            return data.numberOfStudents;
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
        return 0;
    }
}


async function getAllStudents(): Promise<Student[]> {
    try {
        const response = await fetch('http://localhost:3000/students/get-all-students');

        const data: StudentResponse = await response.json() as StudentResponse;

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

async function getAverageGrades() {
    try {
        const response = await fetch('http://localhost:3000/students/average-grade');

        const data: any = await response.json();

        if (!response.ok) throw new Error(data.error || 'Unknown error');
        return data.averageGrades;


    } catch (error) {
        console.error('Error occurred while fetching average grades:', error);
        return [];
    }
}

async function main() {
    try {
        const studentCount = await getNumberOfStudents();

        const studentCountElement = document.getElementById('number-of-students');
        if (!studentCountElement) throw new Error('Student count element not found');

        studentCountElement.textContent = studentCount.toString();

        const students = await getAllStudents();
        if (students.length < 0) throw new Error('No students found');
            await renderStudentList(students);
            
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
    }
}

main();