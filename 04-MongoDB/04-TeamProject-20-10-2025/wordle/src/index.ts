import express, { Express } from 'express';
import path from "path";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';


dotenv.config();

const app: Express = express();
const port = 3000;



app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

app.use((req, _, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});