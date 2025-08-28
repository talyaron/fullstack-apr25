import express from "express";
import { products } from "./model/productsData";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.static("./src/public"));

//API
app.get(`/product/get-amount`, (_, res) => {
  try {
    if (!products || products.length === 0) {
      res.status(404).send({ error: "no products found" });
      console.error("no products found");
      return;
    }
    const productAmount = products.length;
    res.status(200).send({ productAmount });
  } catch (error) {
    console.error("Error occurred while fetching products count:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});
app.get(`/product/get-average-price`, (_, res) => {
  try {
    if (!products || products.length === 0) {
      res.status(404).send({ error: "no products found" });
      console.error("no products found");
      return;
    }
    const averegePrice = (products.reduce((a: number, b) => a + b.price, 0) / products.length).toFixed(2);
    res.status(200).send({ averegePrice });
  } catch (error) {
    console.error("Error occurred while fetching products count:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});
app.get(`/product/get-products`, (_, res) => {
  try {
    if (!products || products.length === 0) {
      res.status(404).send({ error: "no products found" });
      console.error("no products found");
      return;
    }

    res.status(200).send({ products });
  } catch (error) {
    console.error("Error occurred while fetching products:", error);
    res.status(500).send({ error: `Internal Server Error` });
  }
});
app.post(`/product/add-product`, (req, res) => {
  try {
    const { body } = req;
    const { name, price, category, img, stock } = body;

    if (!name || !price || !category || !img || !stock) {
      res.status(400).send({ error: "missing product information" });
      console.error("missing product information");
      return;
    }

    products.push({ name, stock, price, category, img });
    res.status(200).send({ok:true});
  } catch (error) {
    console.error("Error occurred while fetching from server add-product: ", error);
    res.status(500).send({ error: `Internal Server Error ` });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
