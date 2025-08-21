import express from 'express';
import { tshirts } from './model/tshirtData';

const app = express();
const PORT = 4000;



app.use(express.static('./src/public'));


//API route
app.get('/tshirtss/number-of-tshirts', (_, res) => {
    try {

        if(!tshirts || tshirts.length === 0) {
            res.status(404).send({ error: 'No students found' });

            return;
        }
        // Simulating some processing
        const numberOfTshirts = tshirts.length;
        res.status(200).send({ numberOfTshirts });
    } catch (error:any) {
        console.error('Error occurred while fetching student count:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
