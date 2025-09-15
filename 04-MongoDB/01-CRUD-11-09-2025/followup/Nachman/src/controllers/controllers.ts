import { Request, Response } from 'express';
import { StudentModel } from '../model/student.model';

// READ - Get all students
export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).json({ students });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE - Add new student
export const addStudent = async (req: Request, res: Response) => {
    try {
        const { name, age } = req.body;
        const newStudent = new StudentModel({ name, age });
        await newStudent.save();
        res.status(201).send(`Student ${newStudent.name} added successfully`);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE - Update student by ID
export const updateStudentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { age } = req.body;

        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { age },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${updatedStudent.name} updated successfully`);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - Delete student by ID
export const deleteStudentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedStudent = await StudentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${deletedStudent.name} deleted successfully`);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};