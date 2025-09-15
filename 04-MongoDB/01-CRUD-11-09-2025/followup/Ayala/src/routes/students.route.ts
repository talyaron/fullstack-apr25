import express from 'express'
import { IStudent , Student} from '../model/student.model';
const router = express.Router();

router.get("/all-students", async (_req, res) => {
    try {
        const students = await IStudent.find({});
        res.status(200).send({ students });
    }
    catch (error){
        res.status(500).send({ error: `Failed to fetch students: ${error}` });
    }

});

router.post("/add-student", async (req, res) => {
    console.log("Request Body:", req.body);
    const newStudent = req.body as  Omit<Student, 'id'>;
    if(newStudent.age<20) return res.status(400).send({ error: `age is smaller than 20` });

    const student = new IStudent(newStudent)
    await student.save()
    res.status(201).send(`Student ${newStudent.name} added successfully`);
});

router.put("/update-student", async (req, res) => {
    try {
        const {age} = req.body;


        const id = req.query.id as string;
        console.log(id, age);
    if(age<20) return res.status(400).send({ error: `age is smaller than 20` });

        if ( !id||typeof age !== 'number') {
            return res.status(400).send("Invalid request data, id and age must be numbers");
        }
       const updateStudent = await IStudent.findByIdAndUpdate(
        id,
        {age},
         {new:true}
        );

        if (! updateStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(`Student ${id} updated successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

router.delete("/delete-student",async (req, res) => {
    try {
        const id =req.query.id as string;
        console.log(id);

        if (!id ) {
            return res.status(400).send("Invalid request data, id must be a number");
        }
 const deleteStudent = await IStudent.findByIdAndDelete({id} );

        if (! deleteStudent) {
            return res.status(404).send("Student not found");
        };
        res.status(200).send(`Student ${deleteStudent.name} deleted successfully`);
    } catch (error: any) {
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});


export default router;
