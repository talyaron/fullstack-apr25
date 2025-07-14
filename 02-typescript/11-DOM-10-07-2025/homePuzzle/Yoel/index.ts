console.log("-------Exercise number _1_ -----------");

function updateMainTitle(newTitle: string): void {
  try {
    const title = document.getElementById("main-title") as HTMLElement;
    if (!title) throw new Error("Title element not found");

    console.dir(title);
    title.textContent = newTitle;
  } catch (error) {
    console.error("Error updating title:", error);
  }
}

function updateSubTitle(newSubTitle: string): void {
  try {
    const subTitle = document.querySelector("#sub-title") as HTMLElement;
    if (!subTitle) throw new Error("subTitle not found");

    console.dir(subTitle);
    subTitle.textContent = newSubTitle;
  } catch (error) {
    console.error("Error updating sub-Title", error);
  }
}

updateMainTitle("aaaaaaaaaaaaaaa");
updateSubTitle("bbbbbbbbbbbbbbb");
console.dir(updateMainTitle);

console.log("-------Exercise number _2_ -----------");

function getRandomColorr(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateColorItems(aColor: string): void {
  try {
    const myColors = document.querySelectorAll(".color-item");
    if (myColors.length === 0) throw new Error("myColors element not found");
    if (myColors.length > 0)
    myColors.forEach((colorItem, index) => {
      if (colorItem instanceof HTMLParagraphElement) {
        const existingText = colorItem.textContent ?? ""; 
        const newText = `${index + 1}. ${aColor} - `; 
        colorItem.textContent = existingText + newText ;
        colorItem.style.background = existingText;
        colorItem.style.color = getRandomColorr()
      }
    });

  } catch (error) {
    console.error("Error in myColors", error);
  }
}

updateColorItems("");

console.log("-------Exercise number _3_ -----------");

function styleHighlightText(): void{
  
}



console.log("-------Exercise number __ -----------");
console.log("-------Exercise number __ -----------");
console.log("-------Exercise number __ -----------");
console.log("-------Exercise number __ -----------");
console.log("-------Exercise number __ -----------");
console.log("-------Exercise number __ -----------");
console.log("-------Exercise number __ -----------");
