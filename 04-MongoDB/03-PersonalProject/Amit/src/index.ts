import express, { Express } from 'express';
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import factRoutes from "./routes/fact.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app: Express = express();
const port = 3000;


const mongooseUri = process.env.mongodbUri;

if (!mongooseUri) {
  throw new Error("MongoDB connection string is not defined in environment variables");
}

mongoose.connect(`${mongooseUri}Fact`).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

app.use((req, _, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use('/api/facts', factRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});