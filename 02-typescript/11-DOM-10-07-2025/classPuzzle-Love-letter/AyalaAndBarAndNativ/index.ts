function printing() {
    const text = [
        "i", " ", "l", "o", "v", "e", " ",
        "t", "a", "l", " ", "y", "a", "r", "o", "n"
    ]
    const newText:Array<string> = []
    try {
        const title = document.getElementById("title");
        if (!title) throw new Error("Title element not found");
        // This line is incorrect and will cause an error
        for (let i = 0; i < text.length; i++) {
            setInterval(() => {
                newText.push(text[i])
            }, 1000);
            console.log( newText)

        }

    } catch (error) {
        console.error("Error updating title:", error);

    }

}

printing()

