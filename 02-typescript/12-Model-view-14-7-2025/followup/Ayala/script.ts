//data
interface Product {
    name: string;
    price: number;
    img?: string;//
}

const computer: Product = {
    name: "computer",
    price: 500,
    img: "./computerImg.png"
}
function htmlUpdate(product: Product): string {
    const imageSrc = product.img || "./img.png";
    return `
   <div class="product">
        <img src=${imageSrc} alt="product img">
        <h4>${product.name}</h4>
        <h5>price: $${product.price}</h5>
    </div>

    `
}
function productUpdate(product: Product): void {
    try {
        const currentProduct = document.querySelector(".productRoot")
        if (!currentProduct) throw new Error("product root element not fount");
        if (currentProduct instanceof HTMLElement) {
            currentProduct.innerHTML = htmlUpdate(product)

        }
    } catch (error) {
        console.error("error updating ptodct: ", error);

    }

}
productUpdate(computer)