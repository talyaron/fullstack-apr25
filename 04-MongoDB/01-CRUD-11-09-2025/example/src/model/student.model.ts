export interface Student {
    id?: number;
    name: string;
    age: number;
}

// export const students: Student[] = [
//     { id: 1, name: "Alice", age: 20 },
//     { id: 2, name: "Bob", age: 22 },
// ];

import { model, Schema } from "mongoose";


const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

const IStudent = model('Student', studentSchema); //collection name will be 'students' and the schema is studentSchema

export default IStudent;

// export const { Student } = module.exports;