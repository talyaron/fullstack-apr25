import express from 'express';
import { students } from './model/studentsData';

const app = express();
const PORT = 3000;



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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/students/average-of-students', (_, res) => {
    try {
        if (!students || students.length === 0) {
            res.status(404).send({ error: 'No students found' });
            return;
        }

        const averageOfStudents = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
        res.status(200).send({ averageGrade: averageOfStudents }); 
    } catch (error: any) {
        console.error('Error occurred while fetching student average:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

