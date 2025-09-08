import express from 'express';
import { tasks } from './models/TaskData';
import { Task } from './models/Task';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('./src/public'));

// helper to generate unique IDs
const generateId = () => crypto.randomUUID();

/**
 * GET /tasks/get-all
 */
app.get("/tasks/get-all", (_req, res) => {
  try {
    if (!tasks || tasks.length === 0) {
      res.status(404).send({ error: "No tasks found" });
      return;
    }
    res.status(200).send({ tasks });
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
});

/**
 * POST /tasks/add
 */
app.post("/tasks/add", (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      res.status(400).send({ error: "Title is required and must be non-empty" });
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: new Date(),
    };

    tasks.push(newTask);

    res.status(201).send({ message: "Task added successfully", task: newTask });
  } catch (error: any) {
    console.error("Error adding task:", error);
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
});

/**
 * DELETE /tasks/delete
 */
app.delete("/tasks/delete", (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).send({ error: "Task ID is required" });
      return;
    }

    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    tasks.splice(index, 1);
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting task:", error);
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
});

/**
 * PATCH /tasks/update
 */
app.patch("/tasks/update", (req, res) => {
  try {
    const { id, title, description, completed } = req.body;

    if (!id) {
      res.status(400).send({ error: "Task ID is required" });
      return;
    }

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        res.status(400).send({ error: "Title must be a non-empty string" });
        return;
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    res.status(200).send({ message: "Task updated successfully", task });
  } catch (error: any) {
    console.error("Error updating task:", error);
    res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
