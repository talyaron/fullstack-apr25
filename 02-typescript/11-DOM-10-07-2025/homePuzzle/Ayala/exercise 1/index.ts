
//## Exercise 1: Basic Element Selection and Text Content

function updateMainTitle(newTitle: string): void {
    try {
        if (!newTitle || typeof newTitle != "string") throw new Error("enter a valid input");
        const title = document.getElementById("main-title");
        if (!title) throw new Error("Main title element not found");
        title.innerText = newTitle;
        console.dir(title)
        console.log("Title changed successfully");

    } catch (error) {
        console.error("Error updating the title: ", error);

    }
}
function updateSubTitle(newSubTitle: string): void {
    try {
        if (!newSubTitle || typeof newSubTitle != "string") throw new Error("enter a valid input");
        const subTitle = document.querySelector("#sub-title");
        if (!subTitle) throw new Error("Sub title element not found");
        subTitle.textContent = newSubTitle;
        console.log("Sub title changed successfully");

    } catch (error) {
        console.error("Error updating the title: ", error);

    }
}
// updateMainTitle() //showing error
// updateSubTitle(123) //showing error
updateMainTitle("Hi, nice to meet you")
updateSubTitle("welcome")




