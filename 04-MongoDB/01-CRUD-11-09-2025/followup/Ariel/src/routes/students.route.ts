import express from 'express';
import { StudentModel } from '../model/student.model';

const router = express.Router();

router.get("/all-students", async (_req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).send({ students });
    } catch (error: any) {
        res.status(500).send({ error: `Failed to fetch students: ${error.message}` });
    }
});

router.post("/add-student", async (req, res) => {
    try {
        const { name, age } = req.body;
        
        const newStudent = new StudentModel({ name, age });
        await newStudent.save();
        
        res.status(201).send(`Student ${name} added successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Failed to add student: ${error.message}` });
    }
}); 

router.put("/update-student", async (req, res) => {
    try {
        const { age } = req.body;
        const id = req.query.id as string;
        
        console.log('Trying to update ID:', id); // debug
        
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { age },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${id} updated successfully`);
    } catch (error: any) {
        console.log('Update error:', error.message); // debug
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

router.delete("/delete-student", async (req, res) => {
    try {
        const id = req.query.id as string;
        
        console.log('Trying to delete ID:', id); // הוסף את השורה הזו!
        
        const deletedStudent = await StudentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${deletedStudent.name} deleted successfully`);
    } catch (error: any) {
        console.log('Delete error:', error.message); // הוסף גם את זה!
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

export default router;