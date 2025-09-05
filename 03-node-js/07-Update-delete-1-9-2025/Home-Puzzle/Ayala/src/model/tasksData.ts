import { Task } from "./tasksModel";

export const tasks: Task[] = [
  { id: "1", title: "Buy groceries", completed: false, createdAt: new Date(), description: "Milk, eggs, bread" },
  { id: "2", title: "Finish homework", completed: false, createdAt: new Date(), description: "Math and science" },
  { id: "3", title: "Call mom", completed: true, createdAt: new Date() },
  { id: "4", title: "Clean room", completed: false, createdAt: new Date() },
  { id: "5", title: "Read a book", completed: true, createdAt: new Date(), description: "Fiction novel" },
 ];
