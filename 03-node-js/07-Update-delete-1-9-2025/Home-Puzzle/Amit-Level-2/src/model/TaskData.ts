import { Task } from "./TaskModel";

export let tasks: Task[] = [
    { id: crypto.randomUUID().slice(0, 8).replaceAll("-", ""), title: "Task 1", description: "Description 1", completed: false, priority: "medium", createdAt: new Date() },
    { id: crypto.randomUUID().slice(0, 8).replaceAll("-", ""), title: "Task 2", description: "Description 2", completed: true, priority: "medium", createdAt: new Date() },
    { id: crypto.randomUUID().slice(0, 8).replaceAll("-", ""), title: "Task 3", description: "Description 3", completed: false, priority: "medium", createdAt: new Date() }
];