
function nameHtml(name): string {
    return `
<div>
Hello ${name}</div>
`
}

function handleName(event) {
    try {
        const output = document.getElementById("nameRoot")
        if (!output) throw new Error("nameRoot element not found");
        const input = event.target.value
        if (!input) throw new Error("no value");
        output.innerHTML = nameHtml(input)


    } catch (error) {
        console.error(error);

    }
}
//Challenge 1.1.2

function handleColorChange(event) {
    try {
  const color = event.target.value ;
  if(!color)throw new Error("no value");
  const cahngeDivColor = document.getElementById("ChangingBackgroundColor") ;
  if(!cahngeDivColor)throw new Error("ChangingBackgroundColor element not found");
  cahngeDivColor.style.background = color;
  
    } catch (error) {
        console.error(error);

    }
}