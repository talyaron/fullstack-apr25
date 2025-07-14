function updateMainTitle(newTitle: string): void {
  const mainTitle = document.getElementById("main-title")

  try {
    if (mainTitle == null) throw new Error("Element is'nt found in HTML file!");
    
    mainTitle.innerText = newTitle
    // newTitle = mainTitle.innerHTML -> inncorrect!!!
  }
  catch (Error) {
    console.error(Error);
  }
  console.dir(mainTitle)
}

function updateSubTitle(newSubTitle: string): void {
  const subTitle = document.querySelector("#sub-title") as HTMLElement

  try {
    if (subTitle == null) throw new Error("Element is'nt found in HTML file!");
    
    subTitle.innerText = newSubTitle
  }
  catch (Error) {
    console.error(Error);
  }
  console.dir(subTitle)
}

updateMainTitle("הוחלפתי")
updateSubTitle("גם אני!")
