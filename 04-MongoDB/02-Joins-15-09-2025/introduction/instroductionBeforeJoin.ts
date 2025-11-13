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

const nachaman: User = {
    _id: "1",
    name: "Nachaman",
    email: "nachaman@example.com",
    tasks: [
        {
            _id: "t1",
            title: "Learn MongoDB",
            description: "Study the basics of MongoDB",
            done: false,
            level: 1
        },
        {
            _id: "t2",
            title: "Practice Joins",
            description: "Understand how to perform joins in MongoDB",
            done: false,
            level: 2
        }
    ]
};