import express from 'express';
import initiatives from './model/initiatives data';
const app = express();
const PORT = 3000;

console.log(initiatives)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(express.static('./src/public'));
app.get('/', (_, res) => {
    res.send('Hello, World!');
});
// API CODE
app.get('/initiatives/get-initiatives', (_, res) => {
    try {
        if (!initiatives ) {
            res.status(404).send({ error: `Error, initiatives not found` });

            return;
        }
        
        res.status(200).send({ initiatives});
    } catch (error: any) {
        console.error(`Error, internal server error ${error}`)
        res.status(500).send({error: `Error , ${error.message} `})
    }
});
app.get('/initiatives/get-all-projects', (_, res) => {
    try {
        if (!initiatives) {
            res.status(404).send({ error: `Error, initiatives not found` });
            return;
        }
        res.status(200).send({ initiatives });
    } catch (error: any) {
        console.error(`Error, internal server error ${error}`);
        res.status(500).send({ error: `Error, ${error.message}` });
    }
});