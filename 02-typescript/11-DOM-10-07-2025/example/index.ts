//DOM - Document Object Model

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

function updateTitleColor(newColor: string, backgroundColor: string = "white") {
    try {
        const title = document.getElementById("title");
        if(!title) throw new Error("Title element not found");

        title.style.color = newColor;
        title.style.backgroundColor = backgroundColor;

    } catch (error) {
        console.error("Error updating title color:", error);
    }
}

updateTitleColor("blue", "lightblue");

function showCounter() {
   try {
        const counter = document.getElementById("counter");
        if(!counter) throw new Error("Counter element not found");

        let count = 0;
        setInterval(() => {
            count++;
            counter.innerText = "Counter: " + count.toString();
        }, 1000);

    } catch (error) {
        console.error("Error showing counter:", error);
    }
}
showCounter();
