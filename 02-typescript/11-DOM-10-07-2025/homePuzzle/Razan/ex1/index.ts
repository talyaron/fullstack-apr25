function updateMainTitle(newTitle: string): void {
    try {
        const mainTitle = document.getElementById("main-title");
        if(!mainTitle) throw new Error("Main Title element not found");

        console.dir(mainTitle);

        mainTitle.innerText = newTitle;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}

function updateSubTitle(newSubTitle: string): void {
    try {
        const subTitle = document.querySelector("#sub-title");
        if(!subTitle) throw new Error("Sub-Title element not found");

        console.dir(subTitle);

        subTitle.innerText = newSubTitle;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}

updateMainTitle("Hii");
updateSubTitle("Here is the new subtitle");

