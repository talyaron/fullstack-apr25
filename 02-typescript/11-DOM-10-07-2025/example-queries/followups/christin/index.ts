function updateParagraphs(newText: string): void{
    try{
        const paragraph = document.querySelectorAll("p");
        if(paragraph.length === 0) throw new Error("No paragraph");

        paragraph.forEach((paragraph , index) =>{
            if(paragraph instanceof HTMLParagraphElement){
                paragraph.textContent = "Paragraph " + (index + 1) + ": " + newText;
                paragraph.style.color = getRandomColor();


            }
        });

    
} catch (error) {
    console.error("Error updating paragraphs:", error);


}
}
updateParagraphs("New paragraph text");

function getRandomColor(): string{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

}
