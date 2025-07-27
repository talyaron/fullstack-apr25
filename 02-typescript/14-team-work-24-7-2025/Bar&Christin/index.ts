interface Product {
    Id: number;
    Name: string;
    Price: number;
    Image: string;
    InStock: boolean;
    amountInStock: number;
}
const products: Product[] = [
    {
        Id: 1,
        Name: "adidas Originals ballet fine knit t-shirt in cream",
        Price: 345,
        Image: "./top3-1.jpeg",
        InStock: true,
        amountInStock: 100
    },
    {
        Id: 2,
        Name: "Beauty of Joseon Relief Rice & Probiotics Sun Cream SPF 50 50ml",
        Price: 100,
        Image: "./top3-2.jpeg",
        InStock: true,
        amountInStock: 50
    },
    {
        Id: 3,
        Name: "ASOS DESIGN slim oval sunglasses in tort",
        Price: 80,
        Image: "./top3-3.jpeg",
        InStock: true,
        amountInStock: 60
    }
];

let nextId = 4;

//view function
function htmlProduct(product: Product): string {
    return `
        <div class="topsales__top3__item" data-product-id="${product.Id}">
            <img src="${product.Image}" alt="${product.Name}"    
            <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #333;">${product.Name}</h3>
            <p style="font-size: 16px; color: #007bff; font-weight: bold; margin-bottom: 8px;">₪${product.Price}</p>
            <p style="font-size: 14px; color: ${product.InStock ? '#28a745' : '#dc3545'}; margin-bottom: 5px;">
                ${product.InStock ? '✓ In Stock' : '✗ Out of Stock'}
            </p>
            <p style="font-size: 14px; color: #666;">Quantity: ${product.amountInStock}</p>
        </div>
    `;
}

function renderProducts(): void {
    try {
        const topSalesContainer = document.getElementById("topSalesContainer");
        if (!topSalesContainer) throw new Error("topSalesContainer element not found");

        topSalesContainer.innerHTML = products.map(product => htmlProduct(product)).join('');

    } catch (error) {
        console.error("Error rendering products:", error);
    }
}

//control function
function handleAddProduct(): void {
    const imageUrlElement = document.getElementById('imageUrl') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const priceElement = document.getElementById('price') as HTMLInputElement;
    const inStockElement = document.getElementById('inStock') as HTMLInputElement;
    const quantityElement = document.getElementById('quantity') as HTMLInputElement;

    const productData = {
        Name: nameElement.value,           
        Price: parseFloat(priceElement.value),
        Image: imageUrlElement.value,      
        InStock: inStockElement.checked,
        amountInStock: parseInt(quantityElement.value),
    };

    const newProduct = addProduct(products, productData);
    console.log('Added product:', newProduct);
    renderProducts();
}
//model function
function addProduct(productsArray: Product[], productData: Omit<Product, 'Id'>): Product {
    const newProduct: Product = {
        Id: nextId++,
        Name: productData.Name,
        Price: productData.Price,
        Image: productData.Image,
        InStock: productData.InStock,
        amountInStock: productData.amountInStock
    };
    
    productsArray.push(newProduct);
    return newProduct;
}
function initializeApp(): void {
    
    renderProducts();
    
    const addBtn = document.getElementById('addProductBtn') as HTMLButtonElement;
    if (addBtn) {
        addBtn.addEventListener('click', function(e: Event): void {
            e.preventDefault();
            handleAddProduct();
        });
    }
    
    console.log('Product management system initialized');
}
document.addEventListener('DOMContentLoaded', initializeApp);