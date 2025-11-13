import express from "express";
import { Student, students } from "../model/student.model";
import { connect } from "http2";
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

router.patch("/update-age-student", (req, res) => {
  try {
    const { id, age } = req.body;
    if (!id) {
      throw new Error("invalid id");
      return;
    }
    const studentUpdate = students.find((student) => student.id === id);
    if (!studentUpdate) {
      throw new Error("Error could now find student");
      return;
    }
    studentUpdate.age = age;
    res.json({ message: "Age updated", student: studentUpdate });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
export default router;
