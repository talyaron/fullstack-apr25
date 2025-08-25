export interface Student {
    id: number;
    name: string;
    age: number;
    email: string;
}

export interface StudentResponse {
    numberOfStudents: number;
    students?: Student[];
    error?: string;
}
