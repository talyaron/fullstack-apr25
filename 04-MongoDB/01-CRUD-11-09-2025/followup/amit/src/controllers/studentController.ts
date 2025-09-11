import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).send({ students });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

export const addStudent = async (req: Request, res: Response) => {
    try {
        const newStudent = await studentService.addStudent(req.body);
        res.status(201).send(newStudent);
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.query.id as string, 10);
        const { age } = req.body;

        const updated = await studentService.updateStudent(id, age);
        if (!updated) return res.status(404).send("Student not found");

        res.status(200).send(updated);
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.query.id as string, 10);
        const deleted = await studentService.deleteStudent(id);

        if (!deleted) return res.status(404).send("Student not found");

        res.status(200).send(deleted);
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};
