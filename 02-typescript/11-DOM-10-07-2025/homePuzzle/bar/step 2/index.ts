function addNewParafraph(message: string): void {
    const newParagraph = document.createElement("p");
    newParagraph.innerText = message;
    document.body.appendChild(newParagraph);
}

addNewParafraph("This paragraph was added with javascript!");