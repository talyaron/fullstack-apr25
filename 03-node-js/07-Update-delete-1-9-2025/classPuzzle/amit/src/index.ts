import express from 'express';
import { movies } from './model/MoviesData';
import { Movie } from './model/MoviesModle';

const app = express();
const PORT = 3000;

app.use(express.json()); // use this line to parse request body
app.use(express.static('./src/public'));


//API route (for data)
app.get("/movies/get-all-movies", (_, res) => {
    try {
        if (!movies) {
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

        const newMovie: Movie = { 
            id: crypto.randomUUID(),
            title, 
            year, 
            genre, 
            rating, 
            poster, 
            description 
        };

        console.log("the new id is", newMovie.id);
        movies.push(newMovie);

        res.status(201).send({ message: 'Movie added successfully', movie: newMovie });
    } catch (error: any) {
        console.error('Error occurred while adding movie:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.delete("/movies/delete-movie", (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).send({ error: 'Movie ID is required' });
            return;
        }

        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) {
            res.status(404).send({ error: 'Movie not found' });
            return;
        }

        movies.splice(movieIndex, 1);
        res.status(200).send({ message: 'Movie deleted successfully' });
    } catch (error: any) {
        console.error('Error occurred while deleting movie:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.patch("/movies/update-movie-rating", (req, res) => {
    try {
        const { id, rating } = req.body;

        if (!id || rating === undefined) {
            res.status(400).send({ error: 'Invalid movie ID or rating' });
            return;
        }

        const movie = movies.find(movie => movie.id === id);
        if (!movie) {
            res.status(404).send({ error: 'Movie not found' });
            return;
        }

        const _rating = Number(rating);
        if (typeof _rating !== 'number' || _rating < 0 || _rating > 5) {
            res.status(400).send({ error: 'Invalid rating. Rating must be a number between 0 and 5.' });
            return;
        }

        movie.rating = _rating;

        res.status(200).send({ message: 'Movie rating updated successfully' });
    } catch (error: any) {
        console.error('Error occurred while updating movie rating:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
