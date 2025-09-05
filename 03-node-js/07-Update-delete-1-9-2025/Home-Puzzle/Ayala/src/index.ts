import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { tasks } from "./model/tasksData";
const app = express();
const PORT = 2500;
app.use(express.json());
app.use(express.static("./src/public"));
app.get('/tasks/get-all-tasks', (_, res) => {
  try {
    if (!tasks) {
      console.error("Server: no tasks found");
      res.status(500).send({ error: `no tasks fon=und` })
      return
    }
    res.status(200).send({ tasks })
  } catch (error) {
    console.error("Server: Error while fetching all tasks from server");
    res.status(500).send({ error: `Internal Server Error` })

  }
})

app.get("/tasks/get-task/:id", (req, res) => {
  try {
    const { id } = req.params; // get the id from the URL
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.error(`Server: task with id ${id} not found`);
      res.status(404).send({ error: `Task with id ${id} not found` });
      return;
    }
    res.status(200).send({ task });
  } catch (error) {
    console.error("Server: Error while fetching task by id", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/tasks/add-task", (req, res) => {
  try {
    const body = req.body

    const { title, description, completed, createdAt } = body
    // const cuurentDate = new Date().toLocaleDateString();
    const id = uuidv4()
    if (!id || !title || !createdAt) {
      res.status(400).send({ error: "missing task information" });
      console.error("missing task information");
      return;
    }
    tasks.push({ id, title, description, completed, createdAt })
    res.status(200).send({ ok: true })
  } catch (error) {
    console.error("Server: Error while adding a new task", error);
    res.status(500).send({ error: 'Internal server error' })
  }
})

app.patch('/tasks/mark-complete', (req, res) => {
  try {
    const { id, isComplete } = req.body
    console.log(id, isComplete);

    if (!id) {
      res.status(400).send({ error: 'Invalid task id' });
      return;
    }
    const task = tasks.find(task => task.id === id || task.id === String(id));
    if (!task) {
      res.status(404).send({ error: 'task not found' });
      return;
    }
    task.completed = isComplete;

    res.status(200).send({ ok: true });

  } catch (error) {
    console.error('Server: Error occurred while updating task complete:', error);
    res.status(500).send({ error: `Internal Server Error: ${error}` });
  }

})

app.delete('tasks/delete-task', (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).send({ error: 'Invalid task id' });
      return;
    }
    const taskIndex = tasks.findIndex(task => task.id === id || task.id === String(id));
    if (!taskIndex) {
      res.status(404).send({ error: 'task not found' });
      return;
    }
    tasks.splice(taskIndex, 1)
    res.status(200).send({ ok: true });

  } catch (error) {
    console.error('Server: Error occurred while deleting a task:', error);
    res.status(500).send({ error: `Internal Server Error: ${error}` });
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(movies);
});
