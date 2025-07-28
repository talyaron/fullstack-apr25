interface Item {
  url: string;
  title: string;
  discreption: string;
  price: number;
  stock: any;
}

//view func
function htmlItem(item: Item): string {
  return `
      <div class="card cardContainer__item">
      <img src=${item.url} class="card-img-top" alt="..."
        id="cardContainerItemImgUrl">
      <div class="card-body">
      <p class="card-text" id="cardContainerItemText">${item.title}</p>
      <p class="card-text p-descripttion" id="cardContainerItemdiscreption">
      <i class="fa-solid fa-file-lines"></i>${item.discreption}</p>
      <p class="card-text" id="cardContainerItemPrice">
      <i class="fa-solid fa-dollar-sign"></i>Price :${item.price}$</p>
      <p class="card-text" id="cardContainerItemStock">
      <i class="fa-solid 
      ${
        item.stock == "out of stock"
          ? "fa-times-circle text-danger"
          : "fa-check-circle text-success"
      }"></i>In stock :${item.stock}</p>
      </div>
    </div>
    `;
}

function renderItems(item: Item): void {
  try {
    const itemRoot = document.getElementById("itemRoot");
    if (!itemRoot) throw new Error("there is nothing to render");
    itemRoot.innerHTML += htmlItem(item);
    console.log(item.url);
  } catch (error) {
    console.log("there is nothis to render", error);
  }
}

const form = document.getElementById("adminPanel__form") as HTMLFormElement;
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  console.log("submit pressed");
  const formData = new FormData(form);
  const itemToAdd: Item = {
    url: formData.get("photourl") as string,
    title: formData.get("title") as string,
    discreption: formData.get("discreption") as string,
    price: parseInt(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
  };
  if (itemToAdd.stock == 0) {
    itemToAdd.stock = "out of stock";
  }
  if(itemToAdd.price == 0 || isNaN(itemToAdd.price)){
    alert("the price is not valid")
    return;
  }
  console.log(itemToAdd.price)
  renderItems(itemToAdd);
  form.reset();
});
