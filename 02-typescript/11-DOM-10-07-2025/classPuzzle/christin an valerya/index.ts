function updateTitle(newTitle: string) {
    try {
        const title = document.getElementById("title");
        if(!title) throw new Error("Title element not found");
      // This line is incorrect and will cause an error

        console.dir(title);

        title.innerText = newTitle;
        title.style.color = "green";
        title.style.backgroundColor = "blue";
        title.style.border = "3px solid black";

    } catch (error) {
        console.error("Error updating title:", error);

    }
}


updateTitle("New Title");