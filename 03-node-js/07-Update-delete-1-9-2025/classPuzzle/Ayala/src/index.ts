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
    const { title, year, genre, director, rating, poster, color } = body;

    if (!title || !year || !genre || !director || !rating || !poster || !color) {
      res.status(400).send({ error: "missing product information" });
      console.error("missing movie information");
      return;
    }
    movies.push({
      id: crypto.randomUUID(),
      title, year, genre, director, rating, poster, color
    });

    res.status(200).send({ ok: true });
  } catch (error) {
    console.error("Error occcured while adding movie: ", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});
app.patch('/movies/change-movie-color', (req, res) => {
  try {
    const { id, color } = req.body
    console.log(id, color);

    if (!id || !color) {
      res.status(400).send({ error: 'Invalid movie ID or color' });
      return;
    }
    const movie = movies.find(movie => movie.id === id || movie.id === String(id));
    if (!movie) {
      res.status(404).send({ error: 'Movie not found' });
      return;
    }
    movie.color = color;
    console.log(movie.color);
    res.status(200).send({ ok: true });

  } catch (error) {
    console.error('Error occurred while updating movie bacground color:', error);
    res.status(500).send({ error: `Internal Server Error: ${error}` });
  }

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(movies);
});
