// Data
interface Data {
    color: string;
    text: string;
}

const data = {
    color: "white",
    text: ""
}

//controllers
function handleColorChange(ev) {
    try {
        console.log(ev)
        data.color = ev.target.value

        console.log(data)

        document.body.style.backgroundColor = data.color
    } catch (error) {
        console.error(error)
    }

}

function handleTextEnter(ev) {
    try {
        const text = ev.target.value;
        console.log(text)
        data.text = text;
        
        const textOutput = document.getElementById("text-output");
        if (!textOutput) {
            throw new Error("Text output element not found");
        }
        textOutput.innerText = data.text;
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}