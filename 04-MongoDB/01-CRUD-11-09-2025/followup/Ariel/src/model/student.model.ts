import mongoose, { Schema, Document } from 'mongoose';

// Interface נשאר אותו דבר - לTypeScript
export interface Student {
    id?: number;
    name: string;
    age: number;
}

// Interface חדש למונגו
export interface IStudent extends Document {
    name: string;
    age: number;
}

// Schema - זה מה שמגדיר איך הנתונים נראים במונגו
const studentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    }
});

// Model - זה מה שנשתמש בו לפעולות על הDB
export const StudentModel = mongoose.model<IStudent>('Student', studentSchema);

// מוחקים את ה-array הישן
// export const students: Student[] = [...]  <- זה יוצא!