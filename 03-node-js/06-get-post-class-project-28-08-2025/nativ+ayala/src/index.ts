import express from "express";
import { movies } from "./model/moviesData";

const app = express();
const PORT = 2000;
app.use(express.json());
app.use(express.static("./src/public"));

app.get(`/movies/get-movies-list`, (_, res) => {
  try {
    if (!movies) {
      res.status(404).send({ error: "no movies found" });
      console.error("no movies found");
      return;
    }
    res.status(200).send({ movies });
  } catch (error) {
    console.error("Error occurred while fetching movies:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(movies);
});
