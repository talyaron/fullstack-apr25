function changeSubTitle(newSubTitle: string): void {
    try {
        const subTitleElement = document.querySelector("#sub-title");
        if (!subTitleElement) throw new Error("Sub-title element not found");

        subTitleElement.textContent = newSubTitle;
    } catch (error) {
        console.error("Error changing sub-title:", error);
    }
}

changeSubTitle("New Sub-Title");

function updateParagraphs(newText: string): void {
    try {
        const paragraphs = document.querySelectorAll("p");
        if (paragraphs.length === 0) throw new Error("No paragraphs found");

        paragraphs.forEach((paragraph, index) => {
            if (paragraph instanceof HTMLParagraphElement) {
                paragraph.textContent = `Paragraph ${index + 1}: ${newText}`;
                paragraph.style.color = getRandomColor();
            }

        });
    } catch (error) {
        console.error("Error updating paragraphs:", error);
    }
}

updateParagraphs("New paragraph text");

function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const big = document.querySelector("#big");
if (big && big instanceof HTMLElement) {
   
    big.style.fontSize = "2em";
   
}

const pNumber3 = document.querySelector("#pNumber3")
if (pNumber3 && pNumber3 instanceof HTMLElement) {
    pNumber3.style.fontFamily = "Tahoma"
    pNumber3.style.fontStyle = "italic"
}