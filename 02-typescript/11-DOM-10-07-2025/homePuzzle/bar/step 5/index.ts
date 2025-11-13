function styleSubtitle(): void {
    try {
        const subtitle = document.getElementById("subtitle");
        if (!subtitle) throw new Error("Subtitle element not found");

        console.dir(subtitle); // Inspect the element

        subtitle.style.color = "blue";
        subtitle.style.fontSize = "24px";
        subtitle.style.fontStyle = "italic";
        subtitle.textContent = "DOM is fun!";

        const newParagraph = document.createElement("p");
        newParagraph.textContent = "This paragraph was added with TypeScript!";
        document.body.appendChild(newParagraph);

    } catch (error) {
        console.error("Error in styleSubtitle:", error);
    }
}

styleSubtitle();
