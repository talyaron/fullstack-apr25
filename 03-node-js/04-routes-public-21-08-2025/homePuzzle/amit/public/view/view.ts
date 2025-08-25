import { Student, StudentResponse } from '../model/model.js';
import { getAverageGrades } from '../controller/controller.js';


export async function renderStudentList(students: Student[]) {
    const listContainer = document.getElementById('list-of-students');
    if (!listContainer) throw new Error('List container not found');
    
    const averages = await getAverageGrades();
    
    // Clear existing content
    listContainer.innerHTML = '';
    
    
    // Render each student
    students.forEach(student => {
        const avgObj = averages.find((a: any) => a.id === student.id);
        const avgText = avgObj ? avgObj.average.toFixed(2) : 'N/A';
        const studentElement = document.createElement('div');
        studentElement.className = 'student';
        studentElement.innerHTML = `
        <h2>${student.name}</h2>
        <p>Age: ${student.age}</p>
        <p>Email: ${student.email}</p>
        <p>Average Grade: ${avgText}</p>
        `;
        listContainer.appendChild(studentElement);
    });
}