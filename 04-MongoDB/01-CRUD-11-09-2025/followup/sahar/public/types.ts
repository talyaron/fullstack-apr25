export interface Student {
    _id?: string;
    name: string;
    age: number;
}

export interface StudentsResponse {
    students: Student[];
}