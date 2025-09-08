import { Student, students } from "../model/student.model";
import { Response, Request } from "express";

export function getAllStudents(_req:Request, res:Response) {
    res.status(200).send({ students });
}

export function addStudent (req: Request, res: Response) {
    const newStudent = req.body as Student;
    newStudent.id = students.length + 1; // Simple ID assignment

    students.push(newStudent);
    res.status(201).send(`Student ${newStudent.name} added successfully`);
}

export function getStudentId  (req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) throw new Error("can't find id");

        const numericId = Number(id);
        const studentId = students.find(s => s.id === numericId);
        if(!studentId) {
            throw new Error("student id not found");
        }

        res.status(200).send({ studentId })

    } catch (error) {
        console.error(error, "initial server error");
        res.status(500).send({ error })
    }
}

export function updateStudent (req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { age } = req.body;
        if (!id && !age) {
            res.status(404).send({ error: "id or age not found" });
            return
        }

        const numericId = Number(id);
        const student = students.find(student => student.id === numericId)
        if (!student) {
            res.status(404).send({ error: "student not found" })
            return;
        };


        student.age = Number(age);

        res.status(200).send({ ok: true, student })

    } catch (error) {
        console.error(error, "initial server error")
        res.status(500).send({ error });
    }
}
