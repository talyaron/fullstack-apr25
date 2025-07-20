function updateMainTitle(newTitle: string): void {
  const mainTitle = document.getElementById("main-title")

  try {
    if (mainTitle == null) throw new Error("HTML element not found!");
  
    mainTitle.innerHTML = newTitle
  }
  catch (e){
    console.error(e);
    
  }
}


function updateSubTitle(newTitle: string): void {
  const subTitle = document.querySelector("#sub-title")

  try {
    if (subTitle == null) throw new Error("HTML element not found!");
    
    subTitle.innerHTML = newTitle
  }  
  catch (e) {
    console.error(e);
    
  }
}
  
updateMainTitle(`well`)
updateSubTitle(`done!`)

console.dir(document.querySelector("#main-title"))