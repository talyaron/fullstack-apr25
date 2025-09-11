// Define the Student interface
export interface Student {
    id?: number;
    name: string;
    age: number;
}

// Create the Mongoose schema
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
    name: string;
    age: number;
}

const StudentSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});