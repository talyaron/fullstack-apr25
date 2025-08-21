import express from "express";
import { products } from "./model/productsData";
const app = express();
const PORT = 5000;

app.use(express.static("./src/public"));

app.get(`/product`, (_, res) => {
  try {
    const productAmount = products.length;
    res.status(200).send(productAmount);
  } catch (error) {
    console.error("Error occurred while fetching student count:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
