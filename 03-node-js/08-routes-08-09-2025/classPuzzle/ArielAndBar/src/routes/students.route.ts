import express from 'express'
// import { Student, students } from '../model/student.model';
import { addStudent, getAllStudents, updateStudentById } from '../controllers/students.controllers';
const router = express.Router();

router
    .get("/all-students", getAllStudents)
    .post("/add-student", addStudent)
    .patch("/update-student", updateStudentById);

export default router;  