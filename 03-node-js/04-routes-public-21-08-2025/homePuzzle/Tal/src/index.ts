import express from 'express';
import { students } from './model/studentsData';

const app = express();
const PORT = 3000;


app.use(express.json())
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

app.get('/students/students-average', (_, res) => {
    try {
        if (!students || students.length === 0) {
            res.status(404).send({ error: 'No students found' });
            return;
        }

        const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
        const averageGrade = totalGrades / students.length;
        if (isNaN(averageGrade)) {
            res.status(500).send({ error: 'Error calculating average grade' });
            return;
        }
        const roundedAverage = Math.round(averageGrade * 100) / 100;

        res.status(200).send({ averageGrade: roundedAverage });
    } catch (error: any) {
        console.error('Error occurred while fetching student average:', error);
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

app.post("/students/add-student",(req, res)=>{
    try {
        const body = req.body;

        if(!body) {
            console.error("Request body is missing");
            res.status(400).send({error:"Request body is missing"});
            
            return;
        }

        const {age, email, name, grade, imageUrl} = body;

        if(!age || !email || !name || !grade || !imageUrl){
            console.error("Some of the data is missing")
            res.status(400).send({error:"Some or all the data is missing"})
            return;
        } 

        students.push({
            age, name, grade, email, imageUrl, id: crypto.randomUUID()
        })

        res.send({ok:true})
        
    } catch (error:any) {
        console.error(error)
        res.status(500).send({error:error.message})
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
