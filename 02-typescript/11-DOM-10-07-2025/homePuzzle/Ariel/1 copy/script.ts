function updateColorItems(): void {
  const colorItems = document.querySelectorAll(".color-item")
  
  try {
    if(colorItems.length === 0) throw new Error("No elements to work with!");
    
    colorItems.forEach(function(element, index) {
      // check if it's p element 
      if (element instanceof HTMLParagraphElement){
        // update element text
        element.innerText = "Color " + (index + 1) + ": " + element.innerText;

        // upadate element background
        element.style.backgroundColor = "lightblue"
        // element.style.display = "inline"
        element.style.color = getRandomColor()
      }
    })
  
    
  }
  catch (e) {
    console.error(e);
    
  }
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

updateColorItems()