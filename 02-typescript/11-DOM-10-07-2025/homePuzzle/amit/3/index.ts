function styleHighlightText(): void {
    try {
        const text = document.getElementById("highlight-text");
        if (!text) throw new Error;
        
        if (text instanceof HTMLElement) {
            text.style.fontWeight = "bold";
            text.style.backgroundColor = "yellow";
        }
    } catch (error) {
        console.error("Opps, Something went wrong!");      
    }
}

styleHighlightText();