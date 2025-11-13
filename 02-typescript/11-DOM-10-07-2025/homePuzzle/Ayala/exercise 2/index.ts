//## Exercise 2: Working with Multiple Elements and Styling
function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateColorItems(): void {

    try {
        const coloredItems = document.querySelectorAll(".color-item")
        if (coloredItems.length < 1) throw new Error("color-item elements not found");
        // console.log(coloredItems);
        
        let index = 1
        coloredItems.forEach(p => {
            if (p instanceof HTMLParagraphElement) {
                p.style.background = String(p.textContent)
                p.textContent = (`color ${index}: `) + p.textContent;
                p.style.color = getRandomColor()
                
                index++
            }

        });

    } catch (error) {
        console.error("Error updating the color: ", error);

    }
}

updateColorItems()