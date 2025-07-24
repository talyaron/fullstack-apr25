function bold(text: string): void {
    try {
        const boldParagraph = document.querySelector("#bold");
        if (!boldParagraph || boldParagraph instanceof HTMLParagraphElement === false) throw new Error("bold element not found");
        boldParagraph.textContent = text
        boldParagraph.style.fontWeight = 'bold';
    } catch (error) {
        console.error("Error changing sub-title:", error);
    }
}
bold("A bold paragraph")

function blue(): void {
    try {
        const blueParagraph = document.querySelector("#blue");
        if (!blueParagraph || blueParagraph instanceof HTMLParagraphElement === false) throw new Error("bold element not found");
        blueParagraph.textContent = 'white with blue background'
        blueParagraph.style.color = 'white';
        blueParagraph.style.background = "rgb(8, 75, 161)"
        blueParagraph.style.padding = "15px"
        blueParagraph.style.width = "30%"
        blueParagraph.style.textAlign = "center"
        blueParagraph.style.fontSize ="2rem"

    } catch (error) {
        console.error("Error changing sub-title:", error);
    }
}
blue()