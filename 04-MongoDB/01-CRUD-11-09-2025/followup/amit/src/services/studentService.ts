import { StudentModel } from "../model/student.model";
import { Student } from "../model/student.model";

export const getAllStudents = async (): Promise<Student[]> => {
    return await StudentModel.find();
};

export const addStudent = async (student: Student): Promise<Student> => {
    const newStudent = new StudentModel(student);
    return await newStudent.save();
};

export const updateStudent = async (id: number, age: number): Promise<Student | null> => {
    return await StudentModel.findOneAndUpdate({ id }, { age }, { new: true });
};

export const deleteStudent = async (id: number): Promise<Student | null> => {
    return await StudentModel.findOneAndDelete({ id });
};
