function styleHighlightText(): void {
    try {
        const highLight = document.getElementById("highlight-text");
        if(!highLight) throw new Error("Highlight element not found");

        console.dir(highLight);

        highLight.style.backgroundColor = "yellow";
        highLight.style.fontWeight = "bold";

    } catch (error) {
        console.error("Error updating title:", error);

    }
}
styleHighlightText();

function enlargeText(fontSize: string): void {
    try {
        const enlarge = document.getElementById("big-text");
        if(!enlarge) throw new Error("Enlarged element not found");

        console.dir(enlarge);

        enlarge.style.fontSize = fontSize;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}
enlargeText("2rem");

function colorizeText(textColor: string, bgColor: string = "white"): void {
    try {
        const colorized = document.getElementById("colored-text");
        if(!colorized) throw new Error("Colorized element not found");

        console.dir(colorized);

        colorized.style.color = textColor;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}
colorizeText("purple");

function customizedBox(): void {
    try {
        const box = document.getElementById("info-box");
        if(!box) throw new Error("Box element not found");

        console.dir(box);

        box.style.borderStyle = "double";
        box.style.borderWidth = "2rem";
        box.style.borderColor = "black";
        box.style.padding = "2rem";
        box.style.margin = "10px";

    } catch (error) {
        console.error("Error updating title:", error);

    }
}
customizedBox();



