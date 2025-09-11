import { Student, StudentsResponse } from './types.js';

const API_BASE_URL = '/api/students';

export class StudentAPI {
    static async getAllStudents(): Promise<Student[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/all-students`);
            if (!response.ok) {
                throw new Error(`Failed to fetch students: ${response.statusText}`);
            }
            const data: StudentsResponse = await response.json();
            return data.students;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    }

    static async addStudent(student: Omit<Student, 'id'>): Promise<string> {
        try {
            const response = await fetch(`${API_BASE_URL}/add-student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) {
                throw new Error(`Failed to add student: ${response.statusText}`);
            }

            return await response.text();
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
        }
    }

    static async updateStudent(id: number, age: number): Promise<string> {
        try {
            const response = await fetch(`${API_BASE_URL}/update-student?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ age }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update student: ${response.statusText}`);
            }

            return await response.text();
        } catch (error) {
            console.error('Error updating student:', error);
            throw error;
        }
    }

    static async deleteStudent(id: number): Promise<string> {
        try {
            const response = await fetch(`${API_BASE_URL}/delete-student?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete student: ${response.statusText}`);
            }

            return await response.text();
        } catch (error) {
            console.error('Error deleting student:', error);
            throw error;
        }
    }
}