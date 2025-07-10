function updateTitle(newtitle: string) {
    try {
        const title = document.getElementById("title");
        
        if(!title) throw new Error("Title element not found");
      // This line is incorrect and will cause an error

        console.dir(title);

        title.innerText = newtitle;
        title.style.color = "red";
    } catch (error) {
        console.error("Error updating title:", error);

    }
}


updateTitle("New Title");