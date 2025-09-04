import { EnhancedTask } from "./taskModle";
import { randomUUID } from 'crypto';

export const tasks: EnhancedTask[] = [
 {
   id: randomUUID(),
   title: "דוגמא ראשונה",
   completed: false,
   priority: 'medium',
   createdAt: new Date(),
   dueDate: new Date('2025-09-15')
 },
 
 {
   id: randomUUID(),
   title: "דוגמא שניה",
   description: "ביאור המשימה",
   completed: true,
   priority: 'high',
   createdAt: new Date(),
   dueDate: new Date('2025-09-10')
 },
 
 {
   id: randomUUID(),
   title: "דוגמא שלישית",
   description: "ביאור המשימה",
   completed: false,
   priority: 'low',
   createdAt: new Date()
 },

 {
   id: randomUUID(),
   title: "דוגמא רביעית",
   description: "ביאור המשימה",
   completed: true,
   priority: 'medium',
   createdAt: new Date(),
   dueDate: new Date('2025-09-20')
 }  
];