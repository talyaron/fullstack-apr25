import express from 'express'
import { Student, students } from '../model/student.model';
import { CLIENT_RENEG_LIMIT } from 'tls';
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

router.put("/edit-student" , (req,res)=>{
    try{
        const { id } = req.body;
        const { age } = req.body;
        if(typeof id !== "number" || typeof age !== "number" ){
        return res.status(400).send("invalid value , age or id not a numebr")
        }
        else{
            const studentId = students.findIndex((i)=>i.id  === id)
            students[studentId].age = age;
            return res.status(201).send(`student ${id} has updated`)
        }
    }

catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }


});

export default router;  

//return res.status(400).send("Invalid request data, id and age must be numbers");
