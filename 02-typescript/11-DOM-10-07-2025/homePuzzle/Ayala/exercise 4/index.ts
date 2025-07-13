//1
function updateImage(newSrc: string, newAlt: string, newWidth: number): void {
    try {

        const img = document.querySelector("#main-image");
        if (!img) throw new Error("img elemwnt not found");
        if (!(img instanceof HTMLImageElement)) throw new Error("img is not an image element");
        if (!newSrc || typeof newSrc != "string") throw new Error("enter a valid imge");
        if (!newAlt || typeof newAlt != "string") throw new Error("enter a valid alt imge");
        if (!newWidth || typeof newWidth != "number") throw new Error("enter a valid width");

        img.style.width = String(newWidth);
        img.alt = newAlt;
        img.src = newSrc;
    } catch (error) {
        console.error("error updating img", error);

    }
}
updateImage("https://picsum.photos/id/26/4209/2769", "new img", 100)

//2
function updateLink(newHref: string, newText: string): void {
    try {

        const link = document.querySelector("#main-link");
        if (!link) throw new Error("link elemwnt not found");
        if (!(link instanceof HTMLAnchorElement)) throw new Error("link is not a link element");
        if (!newHref || typeof newHref != "string") throw new Error("enter a valid herf");
        if (!newText || typeof newText != "string") throw new Error("enter a valid text");
        link.href = newHref;
        link.textContent = newText;
    } catch (error) {
        console.error("error updating link", error);

    }
}
updateLink("https://picsum.photos/images", "new link")

//3
function updateStatus(message: string, color: string): void {
    try {
        if (!color || typeof color != "string") throw new Error("enter a valid color");
        if (!message || typeof message != "string") throw new Error("enter a valid message");
        const status = document.querySelector("#status-display")
        if (!status) throw new Error("status-display elemwnt not found");
        if (!(status instanceof HTMLDivElement)) throw new Error("status-display not a div elemwnt ");

        status.style.color = String(color)
        status.textContent = "Status: " + message

    } catch (error) {
        console.error("error updating status", error);

    }
}
updateStatus("Set", "blue")