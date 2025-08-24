import express from 'express';

const app = express();
const PORT = 3010;

app.use(express.static('./src/public'));










app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});