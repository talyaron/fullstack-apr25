import express from 'express';
import { movies } from './model/movieData';

const app = express();
const PORT = 3000;

app.use(express.json()); // use this line to parse request body
app.use(express.static('./src/public'));


app.get("/movies/get-all-movies", (_, res) =>{
    try {
        if (!movies || movies.length === 0) {
            res.status(404).send({ error: 'No movies found' });
            return;
        }
        res.status(200).send(movies);
    } catch (error: any) {
        console.error('Error occurred while fetching all movies:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
