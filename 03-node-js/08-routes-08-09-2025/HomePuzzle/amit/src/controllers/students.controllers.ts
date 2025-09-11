import { Request, Response } from "express";
import * as studentService from "../services/service.js";

export function getAllStudents(_req: Request, res: Response) {
  const list = studentService.findAll();
  res.status(200).json({ students: list });
}

export function addStudent(req: Request, res: Response) {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Missing name or age" });
  }
  const student = studentService.create({ name, age });
  res.status(201).json({ message: "created", student });
}

export function getStudentId(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  const student = studentService.findById(id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  res.status(200).json({ student });
}

export function updateStudent(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { age } = req.body;
  if (isNaN(id) || !age) {
    return res.status(400).json({ error: "Invalid ID or age" });
  }

  const updated = studentService.updateAge(id, Number(age));
  if (!updated) return res.status(404).json({ error: "Student not found" });

  res.status(200).json({ message: "updated", student: updated });
}
