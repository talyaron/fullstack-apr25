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

router.put("/update-age/:id", (req, res)=>{
    const {id} = req.params;
    const age = req.body;
    if(!id) return
    const numericId = Number(id);
    const student = students.find(student => student.id === numericId)
    if(!student) return
    student.age = Number(age);
    res.status(200).send({ok:true})
})

export default router;
