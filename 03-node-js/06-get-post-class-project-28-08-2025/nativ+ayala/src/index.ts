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

app.post(`/movies/add-movie`, (req, res) => {
  try {
    const body = req.body;
    const { title, year, genre, director, rating, poster } = body;

    if (!title || !year || !genre || !director || !rating||!poster) {
      res.status(400).send({ error: "missing product information" });
      console.error("missing movie information");
      return;
    }
    movies.push({ title, year, genre, director, rating , poster});
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error("Error occcured while adding movie: ", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(movies);
});
