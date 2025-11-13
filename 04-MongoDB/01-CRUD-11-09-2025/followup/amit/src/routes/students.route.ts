import express from "express";
import * as studentController from "../controllers/studentController";

const router = express.Router();

router.get("/all-students", studentController.getAllStudents);
router.get("/older-than-20", studentController.getOlderThan20);
router.post("/add-student", studentController.addStudent);
router.patch("/update-student", studentController.updateStudent);
router.delete("/delete-student", studentController.deleteStudent);

export default router;
