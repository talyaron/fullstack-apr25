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

app.post("/movies/add-movie",(req, res) =>{
    try {
        const body = req.body;
        if (!body) {
            console.error ("request body is missing");
            res.status(400).send({error: "request body is missing"})
            return;
        }
        const {name, image, genre, rating} = body;

        if (!name || !image || !genre || !rating) {
            console.error ("some or all of the needed information is missing!")
            res.status(400).send ({error: "Some or all the data is missing"})
            return;
        }

        movies.push({
            name, image, genre, rating, id:crypto.randomUUID()
        })
        res.send({ok:true})

    } catch (error:any) {
        console.error (error)
        res.status(500).send({error:error.message})
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
