function styleSubtitle(): void {
    const subtitle = document.getElementById("subtitle");
    if (subtitle) {
        console.log(subtitle);
        subtitle.style.color = "blue";
        subtitle.style.fontSize = "24px";
        subtitle.style.fontStyle = "italic";
        subtitle.textContent = "DOM is fun!";

        const newParagraph = document.createElement("p");
        newParagraph.textContent = "This paragraph was added with TypeScript!";
        document.body.appendChild(newParagraph);
    } else {
        console.error("Subtitle element not found");
    }
}

styleSubtitle();
