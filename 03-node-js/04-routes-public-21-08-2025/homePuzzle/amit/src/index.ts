import express from 'express';
import { students } from './model/studentsData';

const app = express();
const PORT = 3000;



app.use(express.static('.//public'));


app.get('/students/number-of-students', (_, res) => {
    try {

        if (!students || students.length === 0) {
            res.status(404).send({ error: 'No students found' });

            return;
        }
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

app.get("/students/average-grade", (_, res) => {
    try {
        const averageGrades = students.map(student => {
            const total = student.grades.reduce((acc, grade) => acc + grade, 0);
            const avg = total / student.grades.length;
            const floorAverageGrades = Math.floor(avg);
            return { id: student.id, average: floorAverageGrades };
        });


        res.status(200).send({ averageGrades });

    } catch (error: any) {
        console.error('Error occurred while calculating average grade:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
