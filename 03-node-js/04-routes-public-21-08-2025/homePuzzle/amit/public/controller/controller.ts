import { Student, StudentResponse } from '../model/model.js';
import { renderStudentList } from '../view/view.js';



export async function getNumberOfStudents(): Promise<number> {
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


export async function getAllStudents(): Promise<Student[]> {
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

export async function getAverageGrades() {
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

export async function main() {
    try {
        const studentCount = await getNumberOfStudents();
        
        const studentCountElement = document.getElementById('number-of-students');
        if (!studentCountElement) throw new Error('Student count element not found');
        
        studentCountElement.textContent = studentCount.toString();
        
        const students = await getAllStudents();
        if (students.length > 0) {
            await renderStudentList(students);
        }
    } catch (error) {
        console.error('Error occurred while fetching student count:', error);
    }
}

