//✅ Exercise 1: Basic Element Selection and Text Content
function updateMainTitle(newTitle: string): void {
    try {
        const mainTitle = document.getElementById("main-title");
        if (!mainTitle) throw new Error("Main title element not found");
        mainTitle.innerText = newTitle;
    } catch (err) {
        console.error("Error updating main title:", err);
    }
}

function updateSubTitle(newSubTitle: string): void {
    const subTitle = document.querySelector("#sub-title");
    if (subTitle instanceof HTMLElement) {
        subTitle.innerText = newSubTitle;
    } else {
        console.error("Subtitle element not found or not valid");
    }
}
updateMainTitle("Hello from DOM!");
updateSubTitle("Updated subtitle 🎯");

const infoElement = document.getElementById("info");
console.dir(infoElement);