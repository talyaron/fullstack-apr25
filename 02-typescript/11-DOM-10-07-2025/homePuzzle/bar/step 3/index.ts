function styleSubtitle(): void {
    const subtitle = document.getElementById("subtitle");
    if (subtitle) {
        console.log(subtitle);
        subtitle.style.color = "blue";
        subtitle.style.fontSize = "24px";
        subtitle.style.fontStyle = "italic";
        subtitle.textContent = "DOM is fun!";
    } else {
        console.error("Subtitle element not found");
    }
}
styleSubtitle();
