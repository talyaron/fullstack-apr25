import express from "express";
import { tasks } from "./model/TaskData";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("./src/public"));

app.get("/tasks/all-tasks", (_, res) => {
    try {
        res.status(200).send({ tasks });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
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
        const { title, description, completed } = req.body;
        if (!title || !description || typeof completed !== "boolean") {
            res.status(400).send({ error: "Invalid task data" });
            return;
        }

        const newTask = {
            id: String(tasks.length + 1),
            title,
            description,
            completed,
            createdAt: new Date()
        };
        tasks.push(newTask);
        res.status(201).send({ task: newTask });
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
