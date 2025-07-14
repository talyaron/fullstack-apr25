//1
function updateMainTitle(newTitle: string): void{
    try {
        const title = document.getElementById("main-title");
        if(title === null) throw new Error("Title element not found");
        console.dir(title);
        title.innerText = newTitle;
        

    } catch (error) {
        console.error("Error updating title:", error);

    }
}



function updateSubTitle(newSubTitle: string): void{
    try {
        const subTitleElement = document.querySelector("#sub-title");
        if (!subTitleElement) throw new Error("Sub-title element not found");

        subTitleElement.textContent = newSubTitle;
    } catch (error) {
        console.error("Error changing sub-title:", error);
    }
}

updateMainTitle("Welcome to Our Amazing Website!");
updateSubTitle("Your journey starts here");


