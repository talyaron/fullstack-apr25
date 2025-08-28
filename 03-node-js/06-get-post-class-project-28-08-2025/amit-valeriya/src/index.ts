import express from 'express';
import { movies } from './model/moviesData';

const app = express();
const PORT = 3000;

app.use(express.static('./src/public'));

app.get("/valeriya", (_, res) => {
    try {
        res.send({ "List of movies": movies });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/movies/:id", (req, res) => {
    try {
        const { id } = req.params;
        const movie = movies.find(m => m.id === Number(id));
        if (!movie) {
            res.status(404).send("Movie not found");
            return;
        }
        res.send({ "Movie id": movie });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
