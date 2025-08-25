import express from "express";
import { products } from "./model/productsData";

const app = express();
const PORT = 5000;

app.use(express.static("./src/public"));

//API
app.get(`/product/get-amount`, (_, res) => {
  try {
    if (!products || products.length === 0) {
      res.status(404).send({ error: "no products found" });
      throw new Error("no products found");
    }
    const productAmount = products.length;
    res.status(200).send({ productAmount });
  } catch (error) {
    console.error("Error occurred while fetching products count:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

app.get(`/product/get-products`, (_, res) => {
  try {
    if (!products || products.length === 0) {
      res.status(404).send({ error: "no products found" });
      throw new Error("no products found");
    }

    res.status(200).send({ products });
  } catch (error) {
    console.error("Error occurred while fetching products:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
