interface Item {
  url: string;
  title: string;
  discreption: string;
  price: number;
  stock: number;
}

//view func
function htmlItem (item : Item):string{
  return `
      <div class="card cardContainer__item">
      <img src=${item.url} "
        class="card-img-top" alt="..." id="cardContainerItemImgUrl">
      <div class="card-body">
        <p class="card-text" id="cardContainerItemText">${item.title}</p>
        <p class="card-text" id="cardContainerItemPrice">Price :${item.price}$</p>
        <p class="card-text" id="cardContainerItemStock">In stock :${item.stock}</p>
      </div>
    </div>
    `
}

function renderItems(item:Item):void{
  try {
    const itemRoot = document.getElementById("itemRoot")
    if (!itemRoot) throw new Error("there is nothing to render")
    itemRoot.innerHTML+= htmlItem(item);
  } catch (error) {console.log("there is nothis to render",error)
    
  }
}