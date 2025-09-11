import { model, Schema } from "mongoose";

export interface Student {
    id?: number;
    name: string;
    age: number;
}

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
});

export const StudentModel = model("Student", studentSchema);