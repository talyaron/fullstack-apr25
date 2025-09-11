import express from 'express';
import { getAllStudents, addStudent, updateStudentById, deleteStudentById } from '../controllers/student.controller';

const router = express.Router();

// Clean CRUD Routes
router
    .get("/all-students", getAllStudents)
    .post("/add-student", addStudent)
    .patch("/update-student/:id", updateStudentById)
    .delete("/delete-student/:id", deleteStudentById);

export default router;