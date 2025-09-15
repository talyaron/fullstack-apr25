import express from 'express'
import { Student, students } from '../model/student.model';
const router = express.Router();

router.get("/all-students", (_req, res) => {
    res.status(200).send({ students });
});

router.post("/add-student", (req, res) => {
    console.log("Request Body:", req.body);
    const newStudent = req.body as Student;
    newStudent.id = students.length + 1; // Simple ID assignment

    students.push(newStudent);
    res.status(201).send(`Student ${newStudent.name} added successfully`);
});

router.put("/update-student", (req, res) => {
    try {

        const { age } = req.body;
        const id = parseInt(req.query.id as string, 10);



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
});

router.delete("/delete-student", (req, res) => {
    try {
        const id = parseInt(req.query.id as string, 10);

        if (!id || typeof id !== 'number') {
            return res.status(400).send("Invalid request data, id must be a number");
        }

        const studentIndex = students.findIndex((s) => s.id === id);
        if (studentIndex === -1) {
            return res.status(404).send("Student not found");
        }

        const deletedStudent = students.splice(studentIndex, 1);
        res.status(200).send(`Student ${deletedStudent[0].name} deleted successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

export default router;  