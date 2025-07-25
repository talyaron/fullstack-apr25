//Data

interface Product {
    url: string;
    name: string;
    amountinStock: number;
    price: number;
}

const guitarsArray: Product[] = []
let showForm = false

//view functions
function htmlProduct(product: Product): string {
    return `
    <div class="product">
        <div class="product__url"><img src=${product.url} alt="guitarImg"></div>
        <div class="product__name">${product.name}</div> 
        <div class="product__price">${product.price}$</div> 
        <div class="product__stock">${product.amountinStock > 0 ? product.amountinStock + "In Stock" : "Out Of Stock"}</div>
    </div>
    `
}

function renderProducts(guitars: Array<Product>) {
    try {
        const guitarGrid = document.getElementById("guitarsRoot")
        if (!guitarGrid) throw new Error("guitarsRoot element not found");
        guitarGrid.innerHTML = guitars.map((guitar) => htmlProduct(guitar)).join("")

    } catch (error) {
        console.error("error rendering guitars", error);
    }
}
//control functions

window.addEventListener("DOMContentLoaded", () => {
    try {
        const button = document.getElementById("addGuitarButton");
        if (!button) throw new Error("addGuitarButton button not found");
        showForm = true
        button.addEventListener("click", () => displayForm(showForm));
        
        const submitButton = document.getElementById("submitButton");
        if (!submitButton) throw new Error("submitButton not found");
        submitButton.addEventListener("submit", (event) => {
            //לבדוק אם עובד 
            // "submit",
            //  אם לא  לשנות ל"
            // click"
            event.preventDefault();
            handleSubmit(event);
        });

    } catch (error) {
        console.error("error events: ", error)


    }
})



//model functions
function displayForm(isVisable: boolean): void {
    try {
        const addNewGuitar = document.getElementById("addGuitar")
        if (!addNewGuitar) throw new Error("addGuitar element not found");
        addNewGuitar.style.display = isVisable ? "flex" : "none";
    } catch (error) {
        console.error("error displayForm", error)
    }
}


