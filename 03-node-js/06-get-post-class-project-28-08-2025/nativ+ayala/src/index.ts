import express from "express";
import { movies } from "./model/moviesData";

const app = express();
const PORT = 2000;
app.use(express.json());
app.use(express.static("./src/public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(movies);
});
