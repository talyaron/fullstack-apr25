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

const Ayla: User = {
    _id: "2",
    name: "Ayla",
    email: "ayla@example.com",
};

const tasks: Task[] = [
    {
        _id: "t1",
        title: "Learn MongoDB",
        description: "Study the basics of MongoDB",
        done: false,
        level: 1,
        userId: "1"
    },
    {
        _id: "t2",
        title: "Practice Joins",
        description: "Understand how to perform joins in MongoDB",
        done: false,
        level: 2,
        userId: "1"
    },
    {
        _id: "t3",
        title: "Explore Aggregation",
        description: "Learn about aggregation pipelines in MongoDB",
        done: false,
        level: 3,
        
    }
];

// Function to get tasks for a specific user
const getTasksForUser = (userId: string): Task[] => {
    return tasks.filter(task => task.userId === userId);
};