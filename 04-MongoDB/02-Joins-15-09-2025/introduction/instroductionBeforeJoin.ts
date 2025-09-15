interface Task{
    _id: string;
    title: string;
    description: string;
    done: boolean;
    level: number;
}

interface User{
    _id: string;
    name: string;
    email: string;
    tasks: Task[];
}