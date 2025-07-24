const data = {
    darkMode: false,
    fontSize: 16,
    text: ""
};

function handleDarkMode(ev) {
    try {
        data.darkMode = ev.target.checked;
        document.body.style.backgroundColor = data.darkMode ? "#222" : "#fff";
        document.body.style.color = data.darkMode ? "#fff" : "#000";
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

function handleFontSize(ev) {
    try {
        data.fontSize = ev.target.value;
        const output = document.getElementById("text-output");
        output.style.fontSize = data.fontSize + "px";
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

function handleTextInput(ev) {
    try {
        data.text = ev.target.value;
        const output = document.getElementById("text-output");
        output.innerText = data.text;
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
