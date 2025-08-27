// import { Product } from "../model/productModel";
//main controller
async function main() {
  try {
    const form = document.getElementById("add-product");
    if (!form) throw new Error("add-product form element not found");
    form.addEventListener("submit", handleSubmit);

    const productsAmount = await showAmount();

    const amountElement = document.querySelector("#products-amount");
    if (!amountElement) throw new Error("products-amount elemet not found");
    amountElement.innerHTML = productsAmount.toString();

    const products = await getProducts();
    if (!products) throw new Error("Error geting products list in main function");
    renderProducts(products);

    const avragePriceElement = document.querySelector("#average-price");
    if (!avragePriceElement) throw new Error("average-price elemet not found");
    const averageResponse = await getAvaragePrice();
    avragePriceElement.innerHTML = averageResponse.toString();
  } catch (error) {
    console.error("error: ", error);
  }
}
main();

//control
async function handleSubmit(event: Event) {
  try {
    event.preventDefault(); //*
    console.log("Form submitted");
    if (!(event.target instanceof HTMLFormElement)) throw new Error("Event target is not a form");
    const formData = new FormData(event.target); //*
    // const data = Object.fromEntries(formData.entries()); //*
const name = formData.get("name")
const stock = formData.get("stock")
const price = formData.get("price")
const category = formData.get("category")
const image = formData.get("image")

// const response = await fetch("")

    // const dataname = String(formData.get("name") ?? "");
    // const datastock = Number(formData.get("stock"));
    // const dataprice = Number(formData.get("price"));
    // const datacategory = String(formData.get("category") ?? "");
    // const dataimg = String(formData.get("img") ?? "");
    // if (!dataimg || !dataname || !datacategory || !datastock || isNaN(datastock) || !dataprice || isNaN(dataprice))
    //   throw new Error("Invalid form data");

    // const newProduct: Product = {
    //   name: dataname,
    //   stock: datastock,
    //   price: dataprice,
    //   category: datacategory,
    //   img: dataimg,
    // };

  } catch (error) {
    console.error("Error handeling submit form add-produts: ", error);
  }
}

interface AmountResponse {
  productAmount: number;
  error?: string;
}
//service
async function showAmount(): Promise<number> {
  try {
    const response = await fetch("http://localhost:5000/product/get-amount");

    const data: AmountResponse = (await response.json()) as AmountResponse;
    console.log(data);

    if (!response.ok || data.error) throw new Error(data.error || "Error");

    return data.productAmount;
  } catch (error) {
    console.error("Error occurred while fetching student count:", error);
    return 0; // Return 0 or handle the error as needed
  }
}
interface Product {
  name: string;
  stock: number;
  price: number;
  category: string;
  img: string;
}

interface ProductsResponse {
  products?: Product[];
  error?: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("http://localhost:5000/product/get-products");
    const data: ProductsResponse = (await response.json()) as ProductsResponse;
    console.log(data);

    if (!response.ok || data.error) throw new Error(data.error || "Error");
    if (data.products) return data.products;
    else throw new Error("Error fetching products");
  } catch (error) {
    console.error("Error occurred while fetching student count:", error);
    return [];
  }
}
interface AverageResponse {
  averegePrice: number;
  error?: string;
}

async function getAvaragePrice(): Promise<number> {
  try {
    const response = await fetch("http://localhost:5000/product/get-average-price");

    const data: AverageResponse = (await response.json()) as AverageResponse;
    console.log(data);

    if (!response.ok || data.error) throw new Error(data.error || "Error");

    return data.averegePrice;
  } catch (error) {
    console.error("Error occurred while fetching student count:", error);
    return 0; // Return 0 or handle the error as needed
  }
}
//view
function renderProducts(products: Product[]) {
  try {
    const productsContainer = document.getElementById("productsContainer");
    if (!productsContainer) throw new Error("productsContainer element not found.");
    // productsContainer.innerHTML = (products.map((p) => productsHtml(p))).join();
    products.forEach((p) => {
      const productelement = document.createElement("div");
      productelement.className = "product";
      const stockClass = p.stock > 10 ? "in-stock" : p.stock === 0 ? "out-of-stock" : "low-stock";
      const stock = p.stock > 10 ? "In Stock" : p.stock === 0 ? "Out of Stock" : "Low Stock";
      productelement.innerHTML = `
        <div class="product_image" style="background-image: url(${p.img})"></div>
        <div class="product_name">${p.name}</div>
        <div class="product_price">${p.price} $</div>
        <div class="product_category">${p.category}</div>
        <div class="product_stock ${stockClass}"> ${stock}</div>
        `;
      console.log(p.img);

      productsContainer.appendChild(productelement);
    });
  } catch (error) {
    console.error("Error rendering products: ", error);
  }
}

//model- view
// function productsHtml(product: Product): string {
//   return `
//  <div class="product">
//         <div class="product_image" style="background-image: url(${product.img})"></div>
//         <div class="product_name">${product.name}</div>
//         <div class="product_price">${product.price} $</div>
//         <div class="product_category">${product.category}</div>
//         <div class="product_stock">${product.stock} in stock</div>
//       </div>
// `;
// }

// async function getAvaragePrice(products: Product[]): Promise<number> {
//   try {
//     if (!products || products.length === 0) throw new Error("no products found");
//     return parseFloat((products.reduce((a: number, b) => a + b.price, 0) / products.length).toFixed(2));
//   } catch (error) {
//     console.error("Error clac arevage price: ", error);
//     return 0;
//   }
// }
