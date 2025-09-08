import express from 'express'
import { Student, students } from '../model/student.model';
const router = express.Router();

router.get("/all-students", (_req, res) => {
    res.status(200).send({ students });
});

router.post("/add-student", (req, res) => {
    console.log("Request Body:", req.body);
    const newStudent = req.body as Student;
    newStudent.id = students.length + 1; 

    students.push(newStudent);
    res.status(201).send(`Student ${newStudent.name} added successfully`);
});

router.patch("/update-student/:id", (req, res) => {
    try {
        const numericId = Number(req.params.id);
        const student = students.find(student => student.id === numericId);
        
        if (!student) {
            res.status(404).send({ error: "student not found" });
            return;
        }


        if (req.body.age !== undefined) {
            student.age = Number(req.body.age);
        }
        if (req.body.name !== undefined) {
            student.name = req.body.name;
        }

        
        res.status(200).send({ ok: true, student: student });
        
    } catch (error) {
        console.error(error, "initial server error");
        res.status(500).send({ error: true });
    }
});
export default router;  