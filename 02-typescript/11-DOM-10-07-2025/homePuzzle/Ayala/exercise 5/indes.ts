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
            if (p instanceof HTMLElement) {
                const current = p.textContent;
                const sale = Number(current.replace(/\$/g, ''));
                p.textContent = "Sale: $" + String(Math.floor(sale * 0.9))
                p.style.color = "red"
                console.log(`Updated price from ${current} to ${sale}`);
            }
        }
        );
    } catch (error) {
        console.error("Error update Product Prices: ", error);
    }
}


function highlightProducts(): void {
    try {
        const productNmae = document.querySelectorAll(".product-name")
        if (productNmae.length === 0) throw new Error("product-name element not found");
        productNmae.forEach(p => {
            if (p instanceof HTMLElement) {
                p.textContent = "⭐ "+p.textContent;
                p.style.background = getRandomColor()
            }
        }
        );
    } catch (error) {
        console.error("Errorhighlighting Products: ", error);
    }
}


function generateSummary(): void {
    try {
        const products = document.querySelectorAll(".product-name")
        if (products.length === 0) throw new Error("product-name element not found");
        const prices = document.querySelectorAll(".price")
        if (prices.length === 0) throw new Error("price element not found");
        const summary = document.querySelector("#summary")
        if (!summary) throw new Error("summary element not found");
        let pricesSum = 0
        prices.forEach(x => {
            pricesSum += (Number(x.textContent?.replace(/\D/g, '')))
        })
        console.log(pricesSum);

        if (summary instanceof HTMLElement) {
            summary.textContent = (`There are ${products.length} product and the average price is: ${Math.floor(pricesSum / products.length)} `)
        }


    } catch (error) {
        console.error("Error summary: ", error);
    }
}


function applyRandomStyles(): void {
    try {
        const desc = document.querySelectorAll(".description")
        if (desc.length === 0) throw new Error("description element not found");
        desc.forEach(p => {
            if (p instanceof HTMLElement) {

                p.style.color = getRandomColor()
            }
        }
        );

        const productNmae = document.querySelectorAll(".product-name")
        if (productNmae.length === 0) throw new Error("product-name element not found");
        productNmae.forEach(p => {
            if (p instanceof HTMLElement) {

                p.style.padding = "0.5rem"
                p.style.textAlign = "center"
                p.style.width = "30%"
            }
        }
        );
    } catch (error) {
        console.error("Error description color: ", error);
    }
}
function setIntervalTitle() {
    try {
        const title = document.getElementById("page-title");
        if (!title) throw new Error("Title element not found");
        title.style.textAlign = "center"
        setInterval(() => { title.style.background = getRandomColor() }
            , 2000);
    } catch (error) {
        console.error("Error updating title:", error);
    }
}

updateProductPrices()
highlightProducts()
generateSummary()
applyRandomStyles()
setIntervalTitle()
