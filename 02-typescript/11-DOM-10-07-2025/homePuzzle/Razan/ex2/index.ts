function getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateColorTitle(): void {
    try {
        const subTitle = document.querySelectorAll(".color-item");
        if(!subTitle) throw new Error("Sub-Title element not found");

        console.dir(subTitle);

        subTitle.forEach((title, index) => {
            const ti = title as HTMLElement;
            const originalText = ti.innerText;
            ti.innerText = "Color" + (index +1) + ":" + originalText;
        });

    } catch (error) {
        console.error("Error updating title:", error);

    }
}
updateColorTitle();

function updateColorItems(): void {
    try {
        const colorItems = document.querySelectorAll(".color-item");
        if(!colorItems) throw new Error("No color items found");

        const colors = ["green", "red", "blue", "purple", "yellow"];
        colorItems.forEach((item, index) => {
            const el = item as HTMLElement;
            el.style.color = getRandomColor();
            el.style.backgroundColor = colors[index];
        });

    } catch (error) {
        console.error("Error updating title color:", error);
    }
}

setInterval(updateColorItems, 1000);