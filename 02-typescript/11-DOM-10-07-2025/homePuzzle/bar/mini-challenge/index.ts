function cycleTitleColors(): void {
    const colors = ["red", "blue", "green", "purple", "orange"];
    let currentIndex = 0;

    const title = document.getElementById("page-title");
    if (!title) {
        console.error("Page title element not found");
        return;
    }

    setInterval(() => {
        title.style.color = colors[currentIndex];
        currentIndex = (currentIndex + 1) % colors.length;
    }, 2000);
}  
cycleTitleColors();
