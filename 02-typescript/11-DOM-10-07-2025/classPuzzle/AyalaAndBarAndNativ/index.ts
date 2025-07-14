function updateTitle(newTitle: string) {
    try {
        const title = document.getElementById("title");
        if (!title) throw new Error("Title element not found");
        // This line is incorrect and will cause an error

        console.dir(title);

        title.innerText = newTitle;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}
function changingColor() {
    try {
        const title = document.getElementById("title");
        if (!title) throw new Error("Title element not found");
        // This line is incorrect and will cause an error

        console.dir(title);

        title.style.color = "rgb(8, 75, 161)"
        title.style.background = "rgb(102, 210, 230)"
        title.style.border = "2px solid black"
         title.lang = "Hebrew"




    } catch (error) {
        console.error("Error updating title:", error);

    }

}

changingColor();