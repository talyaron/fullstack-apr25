// import { Product } from "../model/productModel";

async function main() {
  try {
    const productsAmount = await showAmount();
    console.log(productsAmount);
    const elementInHTML = document.querySelector("#products-amount");
    if (!elementInHTML) throw new Error("products-amount elemet not found");
    elementInHTML.innerHTML = productsAmount.toString();
    const products = await getProducts();
    if (!products) throw new Error("Error geting products list in main function");
    renderProducts(products);
  } catch (error) {
    console.error("error: ", error);
  }
}
main();

interface AmountResponse {
  productAmount: number;
  error?: string;
}

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
//view
async function renderProducts(products: Product[]) {
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
        <div class="product_image"  ></div>
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
function productsHtml(product: Product): string {
  return `
 <div class="product">
        <div class="product_image" style="background-image: url(${product.img})"></div>
        <div class="product_name">${product.name}</div>
        <div class="product_price">${product.price} $</div>
        <div class="product_category">${product.category}</div>
        <div class="product_stock">${product.stock} in stock</div>
      </div>
`;
}
