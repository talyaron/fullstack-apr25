interface Data {
    color:string;
    text: string;
    date: string;
}

const data = {
    color: "white",
    text: "",
    date: "",

}

function handleColorChange(ev){
    try{
        console.log(ev);
        data.color = ev.target.value;

        console.log(data);
        document.body.style.background = data.color;
    } catch (error) {
    console.error(error)
}
}

function handleTextEnter(ev){
    try{
        const text = ev.target.value;
        console.log(text)
        data.text = text;
        const textOutput = document.getElementById("text-output");
        if(!textOutput){
            throw new Error("Text output element not found");
        }
        textOutput.innerText = data.text;
        console.log(data);
    }catch (error) {
        console.error(error)
    }
}

function handleDateEnter(ev) {
    try {
        const target = ev.target as HTMLInputElement;
        const date = target.value;
        console.log(date);
        data.date = date;
        
        const dateOutput = document.getElementById("date-output");
        if (!dateOutput) {
            throw new Error("Date output element not found");
        }
        dateOutput.innerText = `Selected date: ${data.date}`;
        
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}