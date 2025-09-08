import express from 'express'
const router = express.Router();
import { addStudent, getAllStudents, getStudentId, updateStudent } from '../controllers/students.controllers';

router
    .get("/all-students", getAllStudents)
    .post("/add-student", addStudent)
    .get("/student/:id", getStudentId)
    .patch("/update-age/:id", updateStudent);

export default router;
