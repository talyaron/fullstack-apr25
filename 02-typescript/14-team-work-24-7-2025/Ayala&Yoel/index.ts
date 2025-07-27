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


function handleSubmit(event) {
    try {
        event.preventDefault(); //*
        console.log('Form submitted');
        if (!(event.target instanceof HTMLFormElement)) throw new Error('Event target is not a form');
        const formData = new FormData(event.target);//*
        const data = Object.fromEntries(formData.entries());//*
        console.log('Form data:', data);//*
        const newProduct: Product = {
            url: data.urlImage as string,
            name: data.name as string,
            amountinStock: parseFloat(data.inStock as string) as number ,
            price: parseInt(data.price as string) as number
        };
         guitarsArray.push(newProduct);
            renderProducts(guitarsArray);
            event.target.reset();

    } catch (error) {
        console.error("error sumbiting: ", error);
   }
}

function displayForm(isVisable: boolean): void {
    try {
        const addNewGuitar = document.getElementById("addGuitar")
        if (!addNewGuitar) throw new Error("addGuitar element not found");
        addNewGuitar.style.display = isVisable ? "flex" : "none";
        const addButton = document.getElementById("addGuitarButton")
        if (!addButton) throw new Error("addGuitarButton element not found");
        addButton.style.display = isVisable ? "none" : "flex";
    } catch (error) {
        console.error("error displayForm", error)
    }
}


