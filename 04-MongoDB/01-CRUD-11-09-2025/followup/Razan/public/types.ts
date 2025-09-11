export interface Student {
    id?: number;
    name: string;
    age: number;
}

export interface StudentsResponse {
    students: Student[];
}