interface Task{
    _id: string;
    title: string;
    description: string;
    done: boolean;
    level: number;
    userId: string;
}

interface User{
    _id: string;
    name: string;
    email: string;
}

const nachaman: User = {
    _id: "1",
    name: "Nachaman",
    email: "nachaman@example.com",   
};