interface Product {
  productName: string;
  productType: string;
  productDescription: string;
  productRating: number;
  productAmtRaters: number;
  productPrice: number;
  productImg: File | string;
}

const products: Product[] = [
  {
    productName: "GRASS",
    productType: "SHOWER GEL",
    productDescription: "Fresh, clean and green",
    productRating: 4.8,
    productAmtRaters: 83,
    productPrice: 11.0,
    productImg: "./assets/product1.png",
  },
  {
    productName: "OCEAN BREEZE",
    productType: "SHOWER GEL",
    productDescription: "Cool, crisp and aquatic",
    productRating: 4.6,
    productAmtRaters: 67,
    productPrice: 12.5,
    productImg: "./assets/product2.png",
  },
  {
    productName: "LAVENDER DREAM",
    productType: "BODY WASH",
    productDescription: "Relaxing lavender for nighttime",
    productRating: 4.9,
    productAmtRaters: 105,
    productPrice: 13.99,
    productImg: "./assets/product3.png",
  },
  {
    productName: "CITRUS BURST",
    productType: "SHOWER GEL",
    productDescription: "Bright, zesty and energizing",
    productRating: 4.7,
    productAmtRaters: 92,
    productPrice: 10.75,
    productImg: "./assets/product4.png",
  },
  {
    productName: "CHARCOAL CLEANSE",
    productType: "BODY WASH",
    productDescription: "Deep clean for active skin",
    productRating: 4.5,
    productAmtRaters: 58,
    productPrice: 14.25,
    productImg: "./assets/product5.png",
  },
  {
    productName: "ROSE PETAL",
    productType: "SHOWER GEL",
    productDescription: "Delicate and floral luxury",
    productRating: 4.9,
    productAmtRaters: 112,
    productPrice: 13.5,
    productImg: "./assets/product6.png",
  },
];

function handleSubmit(event: Event) {
  try {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) {
      throw new Error("Event target is not a form");
    }

    const form = event.target;
    const formData = new FormData(form);

    const productName = formData.get("productName") as string;
    const productType = formData.get("productType") as string;
    const productDescription = formData.get("productDescription") as string;

    const productRatingRaw = formData.get("productRating") as string;
    const productAmtRatersRaw = formData.get("productAmtRaters") as string;
    const productPriceRaw = formData.get("productPrice") as string;
    const productImg = formData.get("productImg") as File;

    const productRating = parseFloat(productRatingRaw);
    const productAmtRaters = parseInt(productAmtRatersRaw);
    const productPrice = parseFloat(productPriceRaw);

    if (isNaN(productRating) || productRating <= 0 || productRating > 5) {
      alert("Product rating must be a number between 0 and 5.");
      return;
    }

    if (isNaN(productAmtRaters) || productAmtRaters <= 0) {
      alert("Number of raters must be a non-negative number.");
      return;
    }

    if (isNaN(productPrice) || productPrice <= 0) {
      alert("Product price must be a non-negative number.");
      return;
    }

    const product: Product = {
      productName,
      productType,
      productDescription,
      productRating,
      productAmtRaters,
      productPrice,
      productImg,
    };

    products.push(product);
    console.log(products);
    renderYourItems(products);
    form.reset();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}
function htmlYourItems(products: Product[]) {
  try {
    return products
      .map((product, index) => {
        const imgURL =
          typeof product.productImg === "string"
            ? product.productImg
            : URL.createObjectURL(product.productImg);

        return `
          <div class="product-card" data-index="${index}">
            <button class="product-card__delete" data-index="${index}">×</button>
            <div class="product-card__image-wrapper">
              ${
                imgURL
                  ? `<img src="${imgURL}" alt="${product.productName}" class="product-card__image" />`
                  : `<div class="product-card__image product-card__image--placeholder"></div>`
              }
            </div>
            <div class="product-card__content">
              <h2 class="product-card__name">${product.productName}</h2>
              <p class="product-card__type">${product.productType}</p>
              <p class="product-card__desc">${product.productDescription}</p>
              <div class="product-card__rating">
                <span class="product-card__stars">★★★★★</span>
                <span class="product-card__score">${
                  product.productRating
                }</span>
                <span class="product-card__reviews">(${
                  product.productAmtRaters
                })</span>
              </div>
              <p class="product-card__price">From $${product.productPrice}</p>
              <p class="product-card__delivery">✔ Online delivery</p>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Error generating HTML:", error);
    return `<div class="error">Error rendering item</div>`;
  }
}
function renderYourItems(products: Product[]): void {
  try {
    const container = document.getElementById("productList");
    if (!container) throw new Error("Container element #productList not found");

    const cardsHTML = htmlYourItems(products);
    container.innerHTML = cardsHTML;
    
    const deleteButtons = container.querySelectorAll(".product-card__delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt((button as HTMLElement).dataset.index || "-1");
        if (index >= 0) {
          products.splice(index, 1);
          renderYourItems(products); // Re-render updated list
        }
      });
    });

  } catch (error) {
    console.error("Error rendering items:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderYourItems(products);
});
document.getElementById("sortPriceBtn")?.addEventListener("click", () => {

  products.sort((a, b) => a.productPrice - b.productPrice);

  renderYourItems(products);
});