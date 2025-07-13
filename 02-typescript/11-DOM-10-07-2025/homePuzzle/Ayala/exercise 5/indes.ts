function updateProductPrices(): void {
    try {
        const prices = document.querySelectorAll(".price")
        if (prices.length === 0) throw new Error("price element not found");
        prices.forEach(p => {
            if (p instanceof HTMLElement && p) {
                
                const current = (p.textContent);
                const sale = (Number(current) * 0.9)
                p.textContent = "Sale: "+String(sale)
            }
        }

        );


    } catch (error) {

    }
}
updateProductPrices()