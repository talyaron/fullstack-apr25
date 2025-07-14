function updateColorItems(): void {
    try {
        const getAll = document.querySelectorAll(".color-item");
        if (getAll.length <= 0) throw new Error("No <p> elements found!");
        getAll.forEach((paragraph, index) => {
            if (paragraph instanceof HTMLParagraphElement) {
                paragraph.style.color = getRandomColor();
                paragraph.style.backgroundColor = getRandomColor();
                paragraph.textContent = `color${index + 1}: ${paragraph.textContent}`
            }
        })


    } catch (error) {
        console.error("Opps, Something went wrong!");
    }
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

updateColorItems();