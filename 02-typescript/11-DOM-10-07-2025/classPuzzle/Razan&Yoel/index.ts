function updateTitle(newTitle: string) {
    try {
        const title = document.getElementById("title");
        if(!title) throw new Error("Title element not found");
      // This line is incorrect and will cause an error

        console.dir(title);

        title.innerText = newTitle;

    } catch (error) {
        console.error("Error updating title:", error);

    }
}


updateTitle("New Title");

function updateH1Color(newColor:string) {
   try {
        const color = document.getElementById("title");
        if(!color) throw new Error("Title element not found");
      // This line is incorrect and will cause an error

        console.dir(color);

        color.style.color = newColor;

    } catch (error) {
        console.error("Error updating title:", error);

    }
    
}
updateH1Color("Yellow");
