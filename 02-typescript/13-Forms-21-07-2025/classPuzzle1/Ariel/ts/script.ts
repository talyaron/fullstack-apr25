 function textInputName(): void {
   const textInput = document.getElementById("text") as HTMLInputElement
   const hodaa = document.getElementById("hodaa") as HTMLParagraphElement
  
   try {
    if(!textInput || !hodaa) throw new Error("HTML Element not found!");
    
    textInput.addEventListener('input', () => {
        const nameValue = textInput.value.trim()
        if (nameValue) {
            hodaa.textContent = `Hi ${nameValue}!` // השתמש ב-textContent במקום innerHTML
        } else {
            hodaa.textContent = ''
        }
    });
   }
   catch (error){
    console.error(error);
    
   }
}

textInputName()

// Number input
// function ageInput(): void {
//   const ageVar = document.getElementById("number")
//   const hodaaNumber = document.getElementById("hodaaNumber")

//   try{
//     if(!ageVar || !hodaaNumber) throw new Error("HTML Element not found!");

//     ageVar.addEventListener('input', () => {

//     })
//   }
// }