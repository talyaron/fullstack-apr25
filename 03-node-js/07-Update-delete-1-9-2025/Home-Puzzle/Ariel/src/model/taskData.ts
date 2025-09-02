import { Task } from "./taskModle";
import { randomUUID } from 'crypto';

export const tasks: Task[] = [
  {
    id: randomUUID(),
    title: "דוגמא ראשונה",
    
    completed: false,
    createdAt: new Date()
  },
  
  {
    id: randomUUID(),
    title: "דוגמא שניה",
    description: "ביאור המשימה",
    completed: true,
    createdAt: new Date()
  },
  
  {
  id: randomUUID(),
    title: "דוגמא שלישית",
    description: "ביאור המשימה",
    completed: false,
    createdAt: new Date()
  },

  {
    id: randomUUID(),
    title: "דוגמא רביעית",
    description: "ביאור המשימה",
    completed: true,
    createdAt: new Date()
  }  
];
