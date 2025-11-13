import express from 'express'
import IStudent, {Student} from '../model/student.model';
const router = express.Router();

router.get("/all-students", async (_req, res) => {
    try {
        const students = await IStudent.find({});
        res.status(200).send({ students });
    } catch (error: any) {
        res.status(500).send({ error: `Failed to fetch students: ${error.message}` });
    }
});


router.post("/add-student", async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const newStudent = req.body as Student;
        
        const student = new IStudent(newStudent);
        
        await student.save();
        console.log("Student saved to database");
        res.status(201).send(`Student ${newStudent.name} added successfully`);
    } catch (err: any) {
        console.error("Error saving student to database", err);
        res.status(500).send(`Error saving student to database: ${err.message}`);
    }
});

router.put("/update-student", async (req, res) => {
    try {
        const { age } = req.body;
        const id = req.query.id as string;
        console.log("id:", id, "age:", age);

        if (!id || typeof age !== 'number') {
            return res.status(400).send("Invalid request data, id and age must be provided");
        }

        const updatedStudent = await IStudent.findByIdAndUpdate(
            id,
            { age },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${updatedStudent.name} updated successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

router.delete("/delete-student", async (req, res) => {
    try {
        const id = req.query.id as string;

        if (!id) {
            return res.status(400).send("Invalid request data, id must be provided");
        }

        const deletedStudent = await IStudent.findByIdAndDelete(id);
        
        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${deletedStudent.name} deleted successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

export default router;  