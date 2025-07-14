function styleHighlightText(): void {
    try {
        const highlight = document.querySelector("#highlight-text")
        if (!highlight) throw new Error("highlight elemwnt not found");
        if (highlight instanceof HTMLElement === false) throw new Error("highlight not an elemwnt ");
        highlight.style.background = "yellow"
        highlight.style.fontWeight = "bold"

    } catch (error) {
        console.error("error highlighting", error);

    }

}

styleHighlightText()
function enlargeText(fontSize: string): void {
    try {
        if (!fontSize) throw new Error("enter valid font size");

        const bigText = document.querySelector("#big-text")
        if (!bigText) throw new Error("big Text elemwnt not found");
        if (bigText instanceof HTMLElement === false) throw new Error("big Text not an elemwnt ");

        bigText.style.fontSize = String(fontSize) + "rem"

    } catch (error) {
        console.error("error highlighting", error);

    }

}

enlargeText("2")

function colorizeText(textColor: string, bgColor: string = "white"): void {
    try {
        if (!textColor || typeof textColor != "string") throw new Error("enter a valid color");
        if (typeof bgColor != "string") throw new Error("enter a valid bg color");
        const coloredText = document.querySelector("#colored-text")
        if (!coloredText) throw new Error("big Text elemwnt not found");
        if (coloredText instanceof HTMLElement === false) throw new Error("big Text not an elemwnt ");

        coloredText.style.color = String(textColor)
        coloredText.style.background = String(bgColor)

    } catch (error) {
        console.error("error colosizing text", error);

    }

}

colorizeText("green")//works

colorizeText("green", "black")
function infoBox(): void {
    try {
        
        const info = document.querySelector("#info-box")
        if (!info) throw new Error("info elemwnt not found");
        if (info instanceof HTMLDivElement === false) throw new Error("info Text not a div elemwnt ");

        info.style.background = "rgb(126, 248, 232)";
        info.style.fontFamily ="'Courier New', Courier, monospace";
        info.style.padding = "1rem"
        info.style.textAlign = "center"
        info.style.fontStyle = "bold"
        info.style.width = "50%"

    } catch (error) {
        console.error("error colosizing text", error);

    }

}
infoBox()