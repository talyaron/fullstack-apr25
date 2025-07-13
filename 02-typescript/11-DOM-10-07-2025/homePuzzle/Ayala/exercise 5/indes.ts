function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateProductPrices(): void {
    try {
        const prices = document.querySelectorAll(".price")
        if (prices.length === 0) throw new Error("price element not found");
        prices.forEach(p => {
            if (p instanceof HTMLElement && p) {
                const current = p.textContent;
                const sale = Number(current.replace(/\$/g, ''));
                p.textContent = "Sale: $" + String(Math.floor(sale * 0.9))
                p.style.color = "red"
                console.log(`Updated price from ${current} to ${sale}`);
            }
        }
        );
    } catch (error) {
    console.error("Error update Product Prices: ",error);
        }
}
updateProductPrices()

function highlightProducts(): void {
    try {
        const productNmae = document.querySelectorAll(".product-name")
        if (productNmae.length === 0) throw new Error("product-name element not found");
        productNmae.forEach(p => {
            if (p instanceof HTMLElement && p) {
                p.textContent += "⭐";
                p.style.background = getRandomColor() 
            }
        }
        );
    } catch (error) {
    console.error("Error update Product Prices: ",error);
        }
}
highlightProducts()


