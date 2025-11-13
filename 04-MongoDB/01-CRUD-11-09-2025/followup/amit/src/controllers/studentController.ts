import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).send({ students });
    } catch (error: any) {
        res.status(500).send({ "Error, Can't find students please check getAllStudents function": error.message });
    }
};

export const getOlderThan20 = async (_req: Request, res: Response) => {
    try {
        const students = await studentService.olderThan20(20);
        res.status(200).send({ students });
    } catch (error: any) {
        console.error("Error, Can't find students with age 20 please check olderThan20 function", error.message);
    }
}

export const addStudent = async (req: Request, res: Response) => {
    try {
        const newStudent = await studentService.addStudent(req.body);
        res.status(201).send(newStudent);
    } catch (error: any) {
        res.status(500).send({ "Error, Can't add student please check addStudent function": error.message });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.query.id as string, 10);
        const { age } = req.body;

        const updated = await studentService.updateStudent(id, age);
        if (!updated) return res.status(404).send("Tried to update but didn't find student");

        res.status(200).send(updated);
    } catch (error: any) {
        res.status(500).send({ "Error, Can't update student please check updateStudent function": error.message });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.query.id as string, 10);
        const deleted = await studentService.deleteStudent(id);

        if (!deleted) return res.status(404).send("Tried to delete but didn't find student");

        res.status(200).send(deleted);
    } catch (error: any) {
        res.status(500).send({ "Error, Can't delete student please check deleteStudent function": error.message });
    }
};
