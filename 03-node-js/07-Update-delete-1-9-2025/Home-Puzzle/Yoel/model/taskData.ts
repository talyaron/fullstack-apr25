// interface Task {
//     id : string,
//     title : string,
//     description? : string,
//     completed : boolean,
//     createdAt : Date,
// }

import { Task } from "./taskModel";
import { randomUUID } from 'crypto';

export const tasks: Task[] = [
    {
        id: randomUUID(),
        title: "First Title",
        description: "go hunt",
        completed: false,
        createdAt: new Date()
    },
    {
        id: randomUUID(),
        title: "Second Title",
        description: "go fish",
        completed: false,
        createdAt: new Date()
    },
    {
        id: randomUUID(),
        title: "Third Title",
        description: "go sleep",
        completed: true,
        createdAt: new Date()
    },
    {
        id: randomUUID(),
        title: "Fourth Title",
        description: "go code",
        completed: false,
        createdAt: new Date()
    }];