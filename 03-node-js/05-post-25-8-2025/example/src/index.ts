import express from 'express';
import { students } from './model/studentsData';

const app = express();
const PORT = 3000;

app.use(express.json()); // use this line to parse request body
app.use(express.static('./src/public'));


//API route (for data)
app.get('/students/number-of-students', (_, res) => {
    try {

        if (!students || students.length === 0) {
            res.status(404).send({ error: 'No students found' });

            return;
        }
        // Simulating some processing
        const numberOfStudents = students.length;

        res.status(200).send({ numberOfStudents });

    } catch (error: any) {
        console.error('Error occurred while fetching student count:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.get("/students/get-all-students", (_, res) => {
    try {
        if (!students || students.length === 0) {
            res.status(404).send({ error: 'No students found' });
            return;
        }

        res.status(200).send({ students });
    } catch (error: any) {
        console.error('Error occurred while fetching all students:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.post("/students/add-student", (req, res) => {
    try {
        const { name, age, email } = req.body;

        if (!name || !age || !email) {
            res.status(400).send({ error: 'All fields are required' });
            return;
        }

        const newStudent = { id: students.length + 1, name, age, email };
        students.push(newStudent);

        res.status(201).send({ message: 'Student added successfully', student: newStudent });
    } catch (error: any) {
        console.error('Error occurred while adding student:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
