function styleHighlightText(): void {
  const highlightText = document.querySelector("#highlight-text")

  try {
    if (highlightText == null) throw new Error("HTML Element not found!");
    
    if (highlightText instanceof HTMLElement){
      highlightText.style.backgroundColor = "yellow"
      highlightText.style.fontWeight = "bold"
    } 
    else {
      console.error(`Not HTML Element!`);
    }
  }
  catch (e) {
    console.error(e);
    
  }
}


function enlargeText(fontSize: string): void{
  const bigText = document.querySelector("#big-text")
  
  try {
    if(bigText == null) throw new Error("HTML Element not found!");
    
    
    if(bigText instanceof HTMLElement){
      bigText.style.fontSize = fontSize 
    }
  }
  catch (e) {
    console.error(e);
  }
}

function colorizeText(textColor: string, bgColor: string = "white"): void{
  const coloredText = document.querySelector("#colored-text")

  try {
    if(coloredText == null) throw new Error("HTML Element not found!");

    if(coloredText instanceof HTMLElement){
      coloredText.style.color = textColor
      coloredText.style.backgroundColor = bgColor
    }
    else {
      console.error(`Not HTML Element!`);
    }
  }
  catch(e){
    console.error(e);
    
  }
}

function transformInfobox(): void {
  const infoBox = document.querySelector("#info-box")

  try {
    if(infoBox == null) throw new Error("HTML Element not found!");
    
    if(infoBox instanceof HTMLElement){
      infoBox.style.border = "black 3px solid"
      infoBox.style.padding = "0.35rem"
      infoBox.style.margin = "0.5rem"
      infoBox.style.borderRadius = "4px"
    }
  }
  catch(e){
    console.error(e);
    
  }
}

styleHighlightText()
enlargeText("2em")
colorizeText(getRandomColor(), `blue`)
transformInfobox()


function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}