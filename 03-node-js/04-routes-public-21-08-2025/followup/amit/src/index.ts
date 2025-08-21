import express from "express";
import { students } from "./model/StudentData";

const app = express();
const port = 3000;

app.use(express.static("./src/public"))


app.get("/students", (_, res) => {
    try {
        if (!students || students.length === 0) {
            res.status(404).send({ error: `Error`});

            return;
        }
        const studentsLength = students.length;
        res.status(200).send({ studentsLength});
    } catch (error: any) {
        console.error(`Error, internal server error ${error}`)
        res.status(500).send({error: `Error , ${error.message} `})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})