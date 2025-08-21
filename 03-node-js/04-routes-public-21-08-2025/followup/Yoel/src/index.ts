import express from 'express';
import { accounts } from './info/password';

const app = express();
const PORT = 3000;



app.use(express.static('./src/info'));


//API route
app.get('/passwords', (_, res) => {
    try {

        if(!accounts || accounts.length === 0) {
            res.status(404).send({ error: 'No accounts found' });

            return;
        }
        // Simulating some processing
        const passwords: string[] = accounts.map(account => account.password);
        res.status(200).send({ passwords });
    } catch (error:any) {
        console.error('Error occurred while fetching account passwords:', error);
        res.status(500).send({ error: `Internal Server Error: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
