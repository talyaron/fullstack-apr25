import express from 'express';
import { movies } from './model/MoviesData';

const app = express();
const PORT = 3000;

app.use(express.json()); // use this line to parse request body
app.use(express.static('./src/public'));


//API route (for data)
app.get("/movies/get-all-movies", (_, res) => {
    try {
        if (!movies || movies.length === 0) {
            res.status(404).send({ error: 'No movies found' });
            return;
        }

        res.status(200).send({ movies });
    } catch (error: any) {
        console.error('Error occurred while fetching all movies:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.post("/movies/add-movie", (req, res) => {
    try {
        const { title, year, genre, rating, poster, description } = req.body;

        if (!title || !year || !genre || !rating || !poster || !description) {
            res.status(400).send({ error: 'All fields are required' });
            return;
        }

        const newMovie = { title, year, genre, rating, poster, description };
        movies.push(newMovie);

        res.status(201).send({ message: 'Movie added successfully', movie: newMovie });
    } catch (error: any) {
        console.error('Error occurred while adding movie:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
