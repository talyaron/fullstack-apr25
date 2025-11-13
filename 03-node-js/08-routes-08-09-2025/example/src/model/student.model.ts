export interface Student {
    id?: number;
    name: string;
    age: number;
}

export const students: Student[] = [
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 22 },
];