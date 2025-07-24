function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateColorItems(newText: string): void{
    try {
        const colorItems = document.querySelectorAll("p");
        if (colorItems.length === 0) throw new Error("No paragraphs found");

        colorItems.forEach((color, index) => {
            if (color instanceof HTMLParagraphElement) {
                color.textContent = `color ${index + 1}: ${newText}`;
                color.style.color = getRandomColor();
            }

        });
        const backgroundColors = ['#ffebee', '#e3f2fd', '#e8f5e8', '#fff3e0', '#f3e5f5'];

    } catch (error) {
        console.error("Error updating paragraphs:", error);
    }
}
updateColorItems("new");


console.log('Random color example:', getRandomColor());