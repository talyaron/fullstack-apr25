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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
