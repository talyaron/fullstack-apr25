
interface Response {
  amount: number;
  error?: string;
}
async function showAmount():Promise<number> {
  try {
    const response = await fetch("http://localhost:5000/product");

    const data: Response = await response.json() as Response;
    console.log(data);
    
    if (!response.ok || typeof data === "string") throw new Error(data.error || "Error");

    return data.amount;
  } catch (error) {
    console.error("Error occurred while fetching student count:", error);
    return 0; // Return 0 or handle the error as needed
  }
}

async function main() {
  try {
const productsAmount =await showAmount()
console.log(productsAmount);

if(!productsAmount) throw new Error("no product amount");

const elementInHTML = document.querySelector("#products-amount")
if(!elementInHTML)throw new Error("products-amount elemet not found");
elementInHTML.innerHTML = productsAmount.toString()
  } catch (error) {
    console.error("error: ", error);
  }
}
main()
