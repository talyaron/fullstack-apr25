import { students } from "../model/student.model";
import { Response, Request } from "express";

export function getAllStudents(_req:Request, res:Response) {
    console.log("GET /all-students called");
    res.status(200).send({ students });
}
