import express from "express";
import { tasks } from "./model/TaskData";
import { authenticateApiKey } from "./middlewares/authentication";
import crypto from "crypto";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("./src/public"));
app.use(authenticateApiKey);

app.get("/tasks", (req, res) => {
  try {
    let filteredTasks = [...tasks];

    if (req.query.completed) {
      const isCompleted = req.query.completed === "true";
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    if (req.query.priority) {
      const requestedPriority = req.query.priority as "low" | "medium" | "high";
      filteredTasks = filteredTasks.filter(task => task.priority === requestedPriority);
    }

    if (req.query.search) {
      const searchKeyword = (req.query.search as string).toLowerCase();
      filteredTasks = filteredTasks.filter(
        task =>
          task.title.toLowerCase().includes(searchKeyword) ||
          task.description.toLowerCase().includes(searchKeyword)
      );
    }

    if (req.query.sortBy) {
      const sortField = req.query.sortBy as string;
      const sortOrder = req.query.order === "asc" ? 1 : -1;

      filteredTasks.sort((taskOne, taskTwo) => {
        if (sortField === "priority") {
          const priorityLevels: Record<string, number> = { low: 1, medium: 2, high: 3 };
          return (priorityLevels[taskOne.priority] - priorityLevels[taskTwo.priority]) * sortOrder;
        }

        const valueOne = (taskOne as any)[sortField];
        const valueTwo = (taskTwo as any)[sortField];
        return (valueOne > valueTwo ? 1 : -1) * sortOrder;
      });
    } else {
      filteredTasks.sort((taskOne, taskTwo) => (taskOne.createdAt > taskTwo.createdAt ? -1 : 1));
    }

    res.status(200).json({ tasks: filteredTasks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/tasks/:id", (req, res) => {
    try {
        const { id } = req.params;
        const task = tasks.find(t => t.id === id);
        if (task) {
            res.status(200).send({ task });
        } else {
            res.status(404).send({ error: "Task not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/tasks/add-task", (req, res) => {
    try {
        const { title, description, completed, priority } = req.body;
        if (!title || !description || typeof completed !== "boolean" || !priority) {
            res.status(400).send({ error: "Invalid task data" });
            return;
        }

        const newTask = {
            id: crypto.randomUUID().slice(0, 8).replaceAll("-", ""),
            title,
            description,
            completed,
            priority: priority ?? "medium",
            createdAt: new Date()
        };
        tasks.push(newTask);
        res.status(201).send({ task: newTask });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.put("/tasks/update-task/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed, priority } = req.body;

        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            res.status(404).send({ error: "Task not found" });
            return;
        }

        const updatedTask = {
            ...tasks[taskIndex],
            title,
            description,
            priority: priority ?? "medium",
            completed
        };
        tasks[taskIndex] = updatedTask;
        res.status(200).send({ updatedTask });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.patch("/tasks/toggle-status/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            res.status(404).send({ error: "Task not found" });
            return;
        }

        tasks[taskIndex].completed = completed;
        res.status(200).send({ updatedTask: tasks[taskIndex] });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete("/tasks/:id", (req, res) => {
    try {
        const { id } = req.params;
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            res.status(404).send({ error: "Task not found" });
            return;
        }
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        res.status(200).send({ deletedTask });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
