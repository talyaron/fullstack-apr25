import { Student, students } from "../model/student.model";

export function getAllStudents(_req: any, res: any) {
    res.status(200).send({ students });
}

export function addStudent(req: any, res: any) {
    console.log("Request Body:", req.body);
    const newStudent = req.body as Student;
    newStudent.id = students.length + 1; // Simple ID assignment

    students.push(newStudent);
    res.status(201).send(`Student ${newStudent.name} added successfully`);
}

export function updateStudentById(req: any, res: any) {
    try {


        const { age, id } = req.body;

        if (typeof id !== 'number' || typeof age !== 'number') {
            return res.status(400).send("Invalid request data, id and age must be numbers");
        }

        const studentIndex = students.findIndex((s) => s.id === id);
        if (studentIndex === -1) {
            return res.status(404).send("Student not found");
        }

        students[studentIndex] = { ...students[studentIndex], age };

        res.status(200).send(`Student ${id} updated successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
}