import express from 'express'
import { Student, students } from '../model/student.model';
const router = express.Router();

router.get("/all-students", (_req, res) => {
    console.log("GET /all-students called");
    res.status(200).send({ students });
});

router.post("/add-student", (req, res) => {
    console.log("Request Body:", req.body);
    const newStudent = req.body as Student;
    newStudent.id = students.length + 1; // Simple ID assignment

    students.push(newStudent);
    res.status(201).send(`Student ${newStudent.name} added successfully`);
});

router.patch("/update-age/:id", (req, res) => {
    try {
        const { id } = req.params;
        const age = req.body;
        if (!id) res.status(404).send({ error: "id not found" });

        const numericId = Number(id);
        const student = students.find(student => student.id === numericId)
        if (!student) {
            res.status(404).send({ error: "student not found" })
            return;
        };

        student.age = Number(age);
        res.status(200).send({ ok: true })

    } catch (error) {
        console.error(error, "initial server error")
        res.status(500).send({ error });
    }
})

export default router;
