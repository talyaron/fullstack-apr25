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
router.get("/student/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("can't find id");

        const numericId = Number(id);
        const studentId = students.find(s => s.id === numericId);
        if(!studentId) {
            throw new Error("student id not found");
        }
    
        res.status(200).send({ studentId })
        
    } catch (error) {
        console.error(error, "initial server error");
        res.status(500).send({ error })
    }
})

router.patch("/update-age/:id", (req, res) => {
    try {
        const { id } = req.params;
        const age = req.body;
        if (!id) {
            res.status(404).send({ error: "id not found" });
            return
        }

        const numericId = Number(id);
        const student = students.find(student => student.id === numericId)
        if (!student) {
            res.status(404).send({ error: "student not found" })
            return;
        };
        console.log(age);
        student.age = Number(age);

        res.status(200).send({ ok: true, student })

    } catch (error) {
        console.error(error, "initial server error")
        res.status(500).send({ error });
    }
})

export default router;
